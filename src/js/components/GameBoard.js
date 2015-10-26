'use strict';

import React from 'react/addons';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';
//import onGameChange from '../mixins/onGameChange';
import maybeReverse from '../mixins/maybeReverse';
import behavior from '../game/behavior';
import omit from 'lodash.omit';
import cx from 'classnames';
import swal from 'sweetalert';



const GameBoard = React.createClass({
	propTypes: {

	},
	mixins: [maybeReverse],
	getInitialState() {
		this.state = GameStore.getGameboardState();
		console.log("state? ", this.state);
		return this.state;
	},

	// _getValidDrops(position, inRange){

	// },

	_onButtonClick(){

		// assume white player for now (so racist)

		const {board} = this.state;
		var dukePosition = Object.keys(board).find(pos => (board[pos] && board[pos].unit === "Duke" && board[pos].color === 'white'));
		var dukePosArr = JSON.parse(dukePosition);

		var droppableTiles = {};
		[[0,1], [0,-1], [1,0], [-1,0]].forEach(adj => {
			var adjX = dukePosArr[0]+adj[0], adjY = dukePosArr[1]+adj[1];
			if (this._isOnBoard({x: adjX, y: adjY}) && !board[`[${adjX}, ${adjY}]`]) 
				droppableTiles[`[${adjX}, ${adjY}]`] = true;
		})
		if (!Object.keys(droppableTiles).length) {
			//alert('No available tiles adjacent to the Duke - cannot draw new unit');
			swal('No available tiles adjacent to the Duke - cannot draw new unit')
		}
		else{
		this._setDroppable(droppableTiles);
		this._setDrawable(null);
		//alert('what are droppableTiles', droppableTiles);

			this._setSelected("[-1, -1]", droppableTiles);
			//var element = document.getElementById('drawnUnit');
			//console.log('what is element here?', element);
			GameStore.draw();
			//console.log(result);
			var drawnUnit = GameStore.getGameboardState().drawUnit;
			console.log(drawnUnit);
			var drawn = drawnUnit[Object.keys(drawnUnit)[0]];
			this._setDrawable(drawn);
		}

		
	},
	_onDrawCellClick(){
		console.log("i clicked!!");
		var newDrawn;
		if(this.state.drawn.side==='front'){
			newDrawn = this.state.drawn;
			newDrawn.side='back';


	// _onDrawnUnitClick(){

	// 	var element = document.getElementById('drawnUnit');
	// 	if (element.classList.contains("front")) {
	// 		element.classList.remove("front");
	// 	 	element.classList.add("back");
		}
		else if (this.state.drawn.side==='back'){
			newDrawn = this.state.drawn;
			newDrawn.side='front';
		}
		console.log(newDrawn);
		this.setState({
				drawn: newDrawn
			});
	},

	componentDidMount() {

		const {io, token} = this.props;

		GameStore.on('change', this._onGameChange);
		GameStore.on('new-move', this._onNewMove);

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
			turn: state.turn
		}, cb);
	},

	_onNewMove(move) {
		const {io, token} = this.props;
		io.emit('new-move', { token, move });
	},

	render() {
		let {state, props} = this, 
			{size, color} = props,
			{board, selected, lightup, strike, drop, turn, drawn} = state;

		if (color === 'black') board = this._reverseBoard();

		let cellArray = [];
		for (let i=0; i<size; i++) {
			let row = [];
				row.push({x:j, y:i})
			}
			cellArray.push(row);
		}

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
											turn={turn}
											setSelected={this._setSelected}
											setDrawable={this._setDrawable} 
											setDroppable={this._setDroppable} />
									</td>
								)
							}
						)}
					</tr>
				)}
				</table>
				<div id="draw">
					<button className="btn" onClick={this._onButtonClick}>DRAW</button>
					<div id="draw">
						<button className="btn" onClick={this._onButtonClick}>DRAW</button>
						<DrawnComponent position='[-1, -1]' unit={drawn? drawn.unit : null} color={drawn? drawn.color : null} side={drawn? drawn.side : null} drawAUnit={this._onDrawCellClick}></DrawnComponent>
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


	_setDroppable(tiles) {
		this.setState({
			drop: tiles
		})

	},

	_setDrawable(tile) {
		this.setState({
			drawn: tile
		})

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

	// getInitialState() {
 //    	 return {
 //    	 	//side: 'front',
 //    	 	isSelected: false
 //    	 };
 //  	},

  	componentDidMount() {
		
	},

	componentWillMount() {
			
	},

	mixins: [],

	_onClickSquare() {

		const {unit, color, setSelected, litup, strikable, canDrop, side, playerColor, turn} = this.props;

		let {position, selected} = this.props;
		
		// only let the player act when it is their turn
		if (turn !== playerColor.charAt(0)) return;

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
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', '');

		const {unit, position, color, selected, setSelected, litup, strikable, side, canDrop, playerColor} = this.props;
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

		const {unit, color, setSelected, setDroppable, setDrawable, litup, strikable, canDrop, side, playerColor} = this.props;
		let {position, selected} = this.props;

		if (playerColor === 'black') {
			position = this._reversePosition(position);
			selected = this._reversePosition(selected);
		}
		if (this.props.litup) {
			let capture = unit && color !== playerColor;
			GameActions.makeMove(selected, position, capture, 'move', true);
		}		
		else if (this.props.strikable && unit){
			GameActions.makeMove(selected, position, true, 'strike', true);
		}
		else if(this.props.canDrop){
			GameActions.makeMove(selected, position, false, 'move', true);
			var drawUnit = GameStore.getGameboardState().drawUnit;
			setDrawable(null);
		}
		setSelected(null, []);

		setDroppable({});

		this.setState({
				drawn: null
			});

	},

	_reversePosition(pos) {
		let posArr = JSON.parse(pos);
		return `[${5-posArr[0]}, ${5-posArr[1]}]`;
	},

	render(){
		const {unit, color, litup, strikable, canDrop, side, playerColor} = this.props;
		
		return (
			<div className={cx({
					cellContainer: true,
					[side]: true
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
						})}
						onClick={this._onClickSquare}
						onDragStart={this._onDragStart}
						draggable />
					<figure className={cx({"front-face": true, opponent: color && color !== playerColor})} />
					<figure className={cx({"back-face": true, opponent: color && color !== playerColor})} />
					<figure className="left-face" />
					<figure className="right-face" />
					<figure className="top-face" />
					<figure className="bottom-face" />
			</div>

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


  	// onPropsChanged: function() {
   // 		 //console.log(this.state.drawn); // it is ALWAYS true
 	 // },
	// componentWillReceiveProps: function(nextProps) {
 //  		this.setState({
 //   		 likesIncreasing: nextProps.likeCount > this.props.likeCount
 //  		});
	// },

	// _onChange() {
	
	// 	this.setState({
	// 		lightup: GameStore.getGameboardState().lightup
	// 	});
	// },

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
	// _onDrop(e) {
	// 	e.preventDefault();
	// 	const {position, unit, color, selected, litup} = this.props;

	// 		//GameActions.makeMove(position, false, 'move', true);
	// 		console.log("is this where i am dropping it?", position);
	// 		//GameActions.moveToBoard(position);


	// },
	
	// _onDrawnUnitClick(){
	// 	this.setState({
	// 		drawn: drawn
	// 	});
		// this.setState({

		// });
		// var element = document.getElementById('drawnUnit');
		// if (element.classList.contains("front")) {
		// 	element.classList.remove("front");
		//  	element.classList.add("back");
		// }
		// else if(element.classList.contains("back")){
		// 	element.classList.remove("back");
		//  	element.classList.add("front");
		// }
	//},



	render(){
		var {unit, color, draggable, side, drawAUnit, position} = this.props;



		//<div draggable="true" id="drawnUnit" onClick={this._onDrawnUnitClick}></div>x



				// 				<div id="drawnUnit"
				// onDragOver={this._onDragOver}
				// onDrop={this._onDrop} draggable className={cx(cxObj)} 
				// >
				// 	<a className={cx(cxObj)}
				// 		onClick={drawAUnit}
				// 		onDragStart={this._onDragStart}
				// 		draggable>
				// 	</a>

				// </div>
		
		return (
			<div id="drawnUnit" draggable 
				className={cx({	
					unit: !!unit
					[unit]: true,
					[color]: true,
					[side]: true
				})}
				 onClick={drawAUnit}>
					<a 
					//onDragOver={this._onDragOver}
					//className={cx(cxObj)}
						onClick={drawAUnit}
						// onDragStart={this._onDragStart}
						draggable>
					</a>
				</div>

			);
		}

	});

export default {Board: GameBoard, Cell: Cell, DrawnComponent: DrawnComponent};