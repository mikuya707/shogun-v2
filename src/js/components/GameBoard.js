'use strict';

import React from 'react/addons';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';
//import onGameChange from '../mixins/onGameChange';
import behavior from '../game/behavior';
import omit from 'lodash.omit';
import cx from 'classnames';




const GameBoard = React.createClass({
	propTypes: {

	},
	mixins: [],
	getInitialState() {
		this.state = GameStore.getGameboardState();
		return this.state;
	},

	_onButtonClick(){
		const {color} = this.props,
			{turn, deck} = this.state;

		if (turn !== color.charAt(0) || this.state.pendingDraw) return;

		let {board} = this.state;
		if (color === 'black') board = this._reverseBoard(board);
		var dukePosition = Object.keys(board).find(pos => (board[pos] && board[pos].unit === "Duke" && board[pos].color === color));
		var dukePosArr = JSON.parse(dukePosition);

		var droppableTiles = {};
		[[0,1], [0,-1], [1,0], [-1,0]].forEach(adj => {
			var adjX = dukePosArr[0]+adj[0], adjY = dukePosArr[1]+adj[1];
			if (this._isOnBoard({x: adjX, y: adjY}) && !board[`[${adjX}, ${adjY}]`]) 
				droppableTiles[`[${adjX}, ${adjY}]`] = true;
		})

		if (!Object.keys(droppableTiles).length) {
			swal("Can't let you draw that", 'No available tiles adjacent to the Duke!', 'error');
		}
		else{
			if (deck.length) {
				GameActions.draw();
				let theDrawnUnit = GameStore.getGameboardState().pendingDraw;
				this.setState({
					drop: droppableTiles,
					pendingDraw: {
						unit: theDrawnUnit,
						color: this.props.color,
						side: 'front'
					}
				});					
			}
			else 
				swal("Can't let you draw that", 'No units left to draw!', 'error');
		}		
	},

	_onDrawCellClick(){
		var newDrawn;
		let drawnUnit = document.getElementById("drawnUnit");
		let classes = drawnUnit.className;

		if (classes.includes('front')) {
			drawnUnit.classList.remove('front');
			drawnUnit.classList.add('back');
		}
		else {
			drawnUnit.classList.remove('back');
			drawnUnit.classList.add('front');
		}
	},

	componentDidMount() {

		const {io, token, gameover} = this.props;

		GameStore.on('change', this._onGameChange);
		GameStore.on('new-move', this._onNewMove);
		GameStore.on('swal-endgame', this._onGameOver);

		io.on('move', data => {
			GameActions.makeMove(data.from, data.to, data.capture, data.type, false);

			if (!data.gameOver) {
			  this._runClock();
			}

			if (document.hidden) {
			  let title = document.getElementsByTagName('title')[0];
			  title.text = '* ' + title.text;

			  window.addEventListener('focus', this._removeAsteriskFromTitle);
			}
		});

		document.body.addEventListener('keypress', e => {
			if (e.keyCode === 32) { // space
				e.preventDefault();
				const coords = JSON.parse(this.state.selected);
				if (!coords) return;
				const selected = document.getElementsByClassName('tile')[coords[1]*6+coords[0]];
				if (selected.className.includes('flip')) return;
				selected.classList.add('flip');
				setTimeout(function removeFlip() {
					selected.classList.remove('flip');
				}, 3000)
			}
		})

		// io.on('swal-gameover', data => {
		// 	let winner = data.winner;
		// 	swal({
		// 		title: 'You lose!',
		// 		text: 'Better luck next time!',
		// 		//imageUrl: 'http://vignette2.wikia.nocookie.net/dickfigures/images/d/d0/Troll-Face-Dancing1.jpg/revision/latest?cb=20121112150543'
		// 		imageUrl: 'https://iampierremenard.files.wordpress.com/2014/02/sad-dog.jpg'
		// 	});
		// })
	},

	componentWillUnmount() {
		GameStore.removeChangeListener(this._onChange);
	},

	_reversePosition(pos) {
		const {size} = this.props;
		let posArr = JSON.parse(pos);
		return `[${size-1-posArr[0]}, ${size-1-posArr[1]}]`;
	},

	_reverseBoard() {
		const {board} = this.state;
		let newBoard = {};
		Object.keys(board).forEach(pos => {
			newBoard[this._reversePosition(pos)] = board[pos];
		})
		return newBoard;
	},

	_onGameChange(cb) {
		const state = GameStore.getGameboardState();
		this.setState({
			board: state.board,
			lightup: state.lightup,
			strike: state.strike,
			drop: state.drop,
			selected: state.selected,
			drawUnit: state.drawUnit,
			lastMove: state.lastMove,
			turn: state.turn,
			pendingDraw: state.pendingDraw
		}, cb);
	},

	_onNewMove(move) {
		const {io, token, color} = this.props;
		io.emit('new-move', { token, move, color });
	},

	_onGameOver({winner}) {
		const {io, token} = this.props;
		var {gameover} = this.props;
		io.emit('swal-endgame', { token, winner });
	},

	render() {
		let {state, props} = this, 
			{size, color, gameover} = props,
			{board, selected, lightup, strike, drop, turn, lastMove, drawn, pendingDraw} = state;

		if (color === 'black') board = this._reverseBoard();

		let cellArray = [];
		for (let i=0; i<size; i++) {
			let row = [];
			for (let j=0; j<size; j++) {
				row.push({x:j, y:i})
			}
			cellArray.push(row);
		}

		const colorSide = board[selected] ? `${board[selected].color}-${board[selected].side}` : null;

		return (
			<div>
				<table className="board">
				{cellArray.map((row, idx1) => 
					<tr>
						{row.map((cell, idx2) => {
								let coords = `[${idx2}, ${idx1}]`;
								return (
									<td position={coords}>
										<Cell ref={coords}								
										 position={coords} 
											unit={board[coords] ? board[coords].unit : null} 
											color={board[coords] ? board[coords].color : null}
											playerColor={color}
											side={board[coords] ? board[coords].side : null}
											litup={lightup[coords]}
											strikable={strike[coords]}
											canDrop={drop[coords]}
											selected={selected}
											colorSide={lightup[coords] ? colorSide : null}
											lastMove={lastMove}
											turn={turn}
											pendingDraw={pendingDraw}
											setSelected={this._setSelected}
											setDrawable={this._setDrawable} 
											setDroppable={this._setDroppable}
											setGamePoint={this._setGamePoint}
											gameover={gameover? false: gameover}
											/>
									</td>
								)
							}
						)}
					</tr>
				)}
				</table>
				<div id="draw">
					<button className="btn" onClick={this._onButtonClick}>DRAW</button>
					<DrawnComponent position='[-1, -1]' 
						unit={pendingDraw? pendingDraw.unit : null} 
						color={pendingDraw? pendingDraw.color : null} 
						side={pendingDraw? pendingDraw.side : null} 
						drawAUnit={this._onDrawCellClick}
						playerColor={color} />
				</div>
			</div>
		);
	},

	_onDrawnDragStart(e) {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', '');

		const {unit, position, color, selected, setSelected, litup, strikable, droppable, side} = this.props;
		this._setSelected('[-1,-1]', 'draw');

	},

	_setSelected(position, inRange) {
		this.setState({
			selected: position,
			lightup: this._getValidMoves(position, inRange).movableTiles,
			strike: this._getValidMoves(position, inRange).strikableTiles
		})
	},

	_setDrawnUnit(tile) {
		this.setState({
			pendingDraw: {
				unit: tile,
				color: this.props.color,
				side: 'front'
			}
		})

	},
	_setGamePoint(){
		this.setState({
			gameover: true
		});
	},

	_getValidMoves(position, moves) {
		if (!moves) return;
		const {color: playerColor} = this.props;
		let inRange = [], movableTiles = {}, strikableTiles = {},
			posArr = JSON.parse(position),
			theBoard = playerColor === 'black' ? this._reverseBoard() : this.state.board;

		// Store all tiles within range of the unit's behavior
		Object.keys(moves).forEach(move => {
			let moveArr = JSON.parse(move), moveName = moves[move],
				// (x, y): coordinates of the marked tile
				x = posArr[0] + moveArr[0], 
				y = posArr[1] + moveArr[1];

			// strike and jump are straightforward; simply store the marked tile
			// if (moveName === 'command') inRange.push({x: x, y: y, type: 'strike'});
			if (moveName === 'strike') inRange.push({x: x, y: y, type: 'strike'});
			else if (moveName === 'jump') inRange.push({x: x, y: y, type: 'move'});
			else {
				let deltaX = Math.sign(moveArr[0]), 
					deltaY = Math.sign(moveArr[1]),
					i = posArr[0] + deltaX, 
					j = posArr[1] + deltaY;

				// loop through all tiles on board in a straight path between starting tile and marked tile
				while (this._isOnBoard({x: i, y: j})) {
					// sliding units can land on any tile within a straight path
					// non-sliding units can only land on the marked tile
					if (moveName.includes('slide') || (x === i && y === j))
						inRange.push({x: i, y: j, type: 'move'});

					// if unit can't jump and there is a unit in the way, break
					let unitInTheWay = theBoard[`[${i}, ${j}]`];
					if (unitInTheWay && !moveName.includes('jump')) break;

					i += deltaX; j += deltaY;
				}
			}
		});

		// Filter out tiles that are occupied by allied units or not on the board,
		// then organize by movable and strikable tiles
		inRange.filter(range => {
			let targetUnit = theBoard[`[${range.x}, ${range.y}]`];
			if (targetUnit && theBoard[position].color === targetUnit.color) return false;
			return this._isOnBoard(range);
		}).forEach(range => {
			if (range.type === 'move') movableTiles[`[${range.x}, ${range.y}]`] = true;
			else if (range.type === 'strike') strikableTiles[`[${range.x}, ${range.y}]`] = true;
		});

		return { movableTiles, strikableTiles };
	},

	_isOnBoard({x, y}) {
	  return x >= 0 && y >= 0 && x < 6 && y < 6;
	},

	_runClock() {
	  const {io, token, color} = this.props;

	  io.emit('clock-run', {
	    token: token,
	    color: color
	  });
	},
	_removeAsteriskFromTitle() {
	  let title = document.getElementsByTagName('title')[0];
	  title.text = title.text.replace('* ', '');
	  window.removeEventListener('focus', this._removeAsteriskFromTitle);
	}

});


const Cell = React.createClass({
	propTypes: {

	},

  	componentDidMount() {
	
	},

	componentWillMount() {
			
	},

	mixins: [],

	_onClickSquare(e) {

		const {unit, color, setSelected, litup, strikable, canDrop, side, playerColor, turn, pendingDraw} = this.props;

		let {position, selected} = this.props;

		var gameover = GameStore.getGameboardState().gameover;
		if(gameover.get('status')) return;

		// only let the player act when it is their turn
		// if player drew a unit, don't let them make a normal move

		if ( (turn !== playerColor.charAt(0)) || pendingDraw ) return;

		// if there is no currently selected unit, click a unit (of the same color) to select it
		if (!selected && unit && color === playerColor) {
			let moves = behavior[unit][side];
			setSelected(position, moves);
		}
		// if there is currently a selected unit on the board
		else {
			// when emitting a move event, send the "real" position (i.e. if black, the reverse of the rendered view) 
			if (playerColor === 'black') {
				position = this._reversePosition(position);
				selected = this._reversePosition(selected);
			}

			// can do one of the following:

			// 1. move to a tile glowing red
			if (this.props.litup) {
				let capture = unit && color !== playerColor;
				GameActions.makeMove(selected, position, capture, 'move', true);
				setSelected(null, []);
			}

			// 2. attack a unit on a tile glowing yellow, without moving
			else if (this.props.strikable && unit && color !== playerColor) {
				GameActions.makeMove(selected, position, true, 'strike', true);
				setSelected(null, []);
			}

			// 3. deselect the current unit by clicking on it
			else if (selected === position) {
				setSelected(null, []);
			}
		}		
	},

	_onDragStart(e) {
		const {unit, position, color, selected, setSelected, litup, strikable, side, canDrop, playerColor, turn, pendingDraw} = this.props;
		
		var gameover = GameStore.getGameboardState().gameover;
		if(gameover.get('status')) return;

		if ( (turn !== playerColor.charAt(0)) || pendingDraw ) return;

		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', '');

		if (!selected && unit && color === playerColor) {
			let moves = behavior[unit][side];
			setSelected(position, moves);
		}
	},
	_onDragOver(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	},
	_onDrop(e) {
		e.preventDefault();

		const {unit, color, setSelected, setDroppable, setDrawable, litup, strikable, canDrop, side, playerColor, pendingDraw} = this.props;
		let {position, selected} = this.props;

		if (playerColor === 'black') {
			if (position) position = this._reversePosition(position);
			if (selected) selected = this._reversePosition(selected);
		}
		if (this.props.litup) {
			let capture = unit && color !== playerColor;
			GameActions.makeMove(selected, position, capture, 'move', true);
		}		
		else if (this.props.strikable && unit){
			GameActions.makeMove(selected, position, true, 'strike', true);
		}
		else if(this.props.canDrop){
			GameActions.makeMove(pendingDraw, position, false, 'move', true);
		}
		setSelected(null, []);

	},

	_reversePosition(pos) {
		let posArr = JSON.parse(pos);
		if (!Array.isArray(posArr)) return;
		return `[${5-posArr[0]}, ${5-posArr[1]}]`;
	},

	render(){
		const {unit, color, litup, strikable, canDrop, side, colorSide, lastMove, playerColor, position, selected} = this.props;

		let to = lastMove.get('to'), from = lastMove.get('from');
		if (playerColor === 'black') {
			if (to) to = this._reversePosition(to);
			if (from) from = this._reversePosition(from);
		}

		return (
			<section className={cx({
				cellContainer: true,
				lastMovedFrom: from === position
				// selected: position === selected
			})}>
				<div className={cx({
					selected: position === selected,
					[side]: true,
				})}>
					<div className={cx({
							tile: true,
							// selected: position === selected,
							[side]: true,
							[color]: true,
							[colorSide]: true,
							// flip: flip
						})}
						onDragOver={this._onDragOver}
						onDrop={this._onDrop}
					>
							<a className={cx({
									unit: !!unit,
									litup: litup,
									strikable: strikable,
									canDrop: canDrop,
									opponent: color && color !== playerColor,
									[side]: true,
									[unit]: true,
									[color]: true,
									lastMovedTo: to === position
								})}
								onClick={this._onClickSquare}
								onDragStart={this._onDragStart}
								draggable />
							<figure className={cx({"front-face": true, opponent: color && color !== playerColor})} />
							<figure className={cx({"back-face": true, opponent: color && color !== playerColor})} />
							<figure className="left-face" />
							<figure className="right-face" />
							{
							// <figure className="top-face" />
							// <figure className="bottom-face" />
							}
						
					</div>
				</div>
			</section>

		);
	}

});

const DrawnComponent = React.createClass({
	propTypes: {
	},
	getInitialState: function() {
    	 return {
    	 	//side: 'front',
    	 	drawn: null
    	 };
  	},
  	componentDidMount() {

		
	},

	componentWillMount() {
		
	
	},

	mixins: [],


	_onDragStart(e) {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', '');

		const {unit, position, color, side} = this.props;
	},
	_onDragOver(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	},

	render(){
		var {unit, color, side, draggable, drawAUnit, position, playerColor} = this.props;

		return (
			<div id="drawnUnit" draggable 
				className={cx({	
					tile: true,
					[unit]: true,
					[color]: true,
					[side]: true
				})} >
					<a className={cx({
							unit: !!unit,
							opponent: color && color !== playerColor,
							[side]: true,
							[unit]: true,
							[color]: true,
						})}
						onClick={drawAUnit}
						// onDragStart={this._onDragStart}
						draggable>
					</a>
					<figure className={cx({"front-face": true, "draw-preview": true, opponent: color && color !== playerColor})} />
					<figure className={cx({"back-face": true, "draw-preview": true,  opponent: color && color !== playerColor})} />
					<figure className={cx({"left-face": true, "draw-preview": true})} />
					<figure className={cx({"right-face": true, "draw-preview": true})} />
					<figure className={cx({"top-face": true, "draw-preview": true})} />
					<figure className={cx({"bottom-face": true, "draw-preview": true})} />
			</div>

			);
		}

	});

export default {Board: GameBoard, Cell: Cell, DrawnComponent: DrawnComponent};