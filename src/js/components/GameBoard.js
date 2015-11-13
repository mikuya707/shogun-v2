'use strict';

import React from 'react/addons';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';
//import onGameChange from '../mixins/onGameChange';
import behavior from '../game/behavior';
import utils from '../game/utils';
import omit from 'lodash.omit';
import cx from 'classnames';
import ai from '../ai';




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
		if (color === 'black') board = utils.reverseBoard(board);
		var dukePosition = Object.keys(board).find(pos => (board[pos] && board[pos].unit === "Duke" && board[pos].color === color));
		var dukePosArr = JSON.parse(dukePosition);

		var droppableTiles = {};
		[[0,1], [0,-1], [1,0], [-1,0]].forEach(adj => {
			var adjX = dukePosArr[0]+adj[0], adjY = dukePosArr[1]+adj[1];
			if (utils.isOnBoard({x: adjX, y: adjY}) && !board[`[${adjX}, ${adjY}]`]) 
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

		GameStore.on('thinking', function(data) {
			console.log('AI is thinking...');
		})

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
			if (e.keyCode === 122) { // z
				// e.preventDefault();
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

	},

	componentWillUnmount() {
		GameStore.removeChangeListener(this._onChange);
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
		const {io, token, color} = this.props,
			{board, turn, lastMove} = this.state;

		if (token === 'ai') {
			if (move.gameOver) {
				setTimeout(function() {
					GameActions.gameOver({
					  type: 'defeat',
					  winner: turn === 'w' ? 'White' : 'Black'
					});
					GameStore.emit('gameover-alert', {
						iWin: turn === color.charAt(0)
					})
				}, 1000);
			}
			else if (turn === color.charAt(0)) {
				GameStore.emit('request-ai-move', { board, lastMove, color });
			}
		}
		else {
			io.emit('new-move', { token, move, color });
		}
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

		if (color === 'black') board = utils.reverseBoard(board);

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
		const {color} = this.props, {board} = this.state;
		this.setState({
			selected: position,
			lightup: utils.getValidMoves(position, inRange, color, board).movableTiles,
			strike: utils.getValidMoves(position, inRange, color, board).strikableTiles
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
				position = utils.reversePosition(position);
				selected = utils.reversePosition(selected);
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
			if (position) position = utils.reversePosition(position);
			if (selected) selected = utils.reversePosition(selected);
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

	render(){
		const {unit, color, litup, strikable, canDrop, side, colorSide, lastMove, playerColor, position, selected} = this.props;

		let to = lastMove.get('to'), from = lastMove.get('from');
		if (playerColor === 'black') {
			if (to) to = utils.reversePosition(to);
			if (from) from = utils.reversePosition(from);
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