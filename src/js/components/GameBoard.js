'use strict';

import React from 'react/addons';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';
//import ChessPieces from '../constants/ChessPieces';
//import onGameChange from '../mixins/onGameChange';
import maybeReverse from '../mixins/maybeReverse';
import behavior from '../game/behavior';
import omit from 'lodash.omit';
import cx from 'classnames';



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
		var dukePosition = Object.keys(board).filter(pos => (board[pos] && board[pos].unit === "Duke" && board[pos].color === 'white'))[0];
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

		// var element = document.getElementById('drawnUnit');
		// element.className = "";
		// GameStore.draw();
		// this.state.drawUnit = GameStore.getGameboardState().drawUnit;
		// console.log(this.state.drawUnit);

		// console.log(Object.keys(this.state.drawUnit)[0]);
		// var position = Object.keys(this.state.drawUnit)[0];
		// var unit = this.state.drawUnit[position].unit;
		// var color = this.state.drawUnit[position].color;
		// var side = this.state.drawUnit[position].side;

		//element.classList.add(`${unit}`);
		//element.classList.add("white");
		//element.classList.add("front");

		
	},
	_onDrawCellClick(){
		console.log("i clicked!!");
		var newDrawn;
		if(this.state.drawn.side==='front'){
			newDrawn = this.state.drawn;
			newDrawn.side='back';
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
		//GameStore.addChangeListener(this._onChange);

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
	// _onChange() {
	
	// 	this.setState({
	// 		lightup: GameStore.getGameboardState().lightup
	// 	});
	// },
	_reversePosition(pos) {
		const {size} = this.props;
		let posArr = JSON.parse(pos);
		return `[${size-1-posArr[0]}, ${size-1-posArr[1]}]`;
	},

	_reverseBoard() {
		const {board} = this.state;
		let newBoard = {}, self = this;
		Object.keys(board).forEach(function(pos) {
			// let posArr = JSON.parse(pos);
			// newBoard[`[${size-1-posArr[0]}, ${size-1-posArr[1]}]`] = board[pos];
			newBoard[self._reversePosition(pos)] = board[pos];
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

		io.emit('new-move', {
			token: token,
			move: move
		})

	},
	render() {
		var {state, props} = this, 
// <<<<<<< HEAD
// 			{size} = props,
// 			{board, selected, lightup, strike, drop, drawn} = state;
// =======
			{size, color} = props,
			{board, selected, lightup, strike, drop, turn, drawn} = state;

		if (color === 'black') board = this._reverseBoard();


		var cellArray = [];
		for (var i=0; i<size; i++) {
			var row = [];
			for (var j=0; j<size; j++) {
				row.push({x:j, y:i})
			}
			cellArray.push(row);
		}

		return (
		<div>
			<table className="board">
			{cellArray.map((row, idx1) => 
				<tr>
					{row.map((cell, idx2) =>
						<td position={`[${idx2}, ${idx1}]`}>
							<Cell ref={`[${idx2}, ${idx1}]`}								
							 position={`[${idx2}, ${idx1}]`} 
								unit={board[`[${idx2}, ${idx1}]`] ? board[`[${idx2}, ${idx1}]`].unit : null} 
								color={board[`[${idx2}, ${idx1}]`] ? board[`[${idx2}, ${idx1}]`].color : null}
								playerColor={color} side={board[`[${idx2}, ${idx1}]`] ? board[`[${idx2}, ${idx1}]`].side : null}
								litup={lightup[`[${idx2}, ${idx1}]`]}
								strikable={strike[`[${idx2}, ${idx1}]`]} canDrop={drop[`[${idx2}, ${idx1}]`]}
								selected = {selected} turn={turn} setSelected={this._setSelected}
								setDrawable={this._setDrawable} 
								setDroppable={this._setDroppable}
								onClick={this._onCellClick}/>
						</td>
					)}
				</tr>
			)}
			</table>
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


		//const {unit, position, color, selected, setSelected, litup, drop, strikable, droppable, side} = this.props;
		//setSelected('[-1,-1]', 'draw');

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
		const playerColor = this.props.color;
		var output = {};

		var inRange = [];
		var posArr = JSON.parse(position);
		var theBoard = playerColor === 'black' ? this._reverseBoard() : this.state.board;

		Object.keys(moves).map(function(move){
			var moveArr = JSON.parse(move);

			if (moves[move] === 'move' || moves[move] === 'jump') {
				let x =  posArr[0] + moveArr[0], 
					y =  posArr[1] + moveArr[1];
				inRange.push({x: x, y: y, type: 'move'});					
			}
			else if (moves[move] === 'slide' || moves[move] === 'jump slide') {

				let deltaX = moveArr[0] ? moveArr[0]/Math.abs(moveArr[0]) : moveArr[0], 
					deltaY = moveArr[1] ? moveArr[1]/Math.abs(moveArr[1]) : moveArr[1];

				let i = posArr[0] + deltaX, j = posArr[1] + deltaY;
				while (i>=0 && i<6 && j>=0 && j<6) {
					let unitInTheWay = theBoard[`[${i}, ${j}]`];
					if (unitInTheWay && moves[move] === 'slide') {
						if (unitInTheWay.color !== theBoard[position].color) {
							inRange.push({x: i, y: j, type: 'move'});
						}
						break;						
					}
					else inRange.push({x: i, y: j, type: 'move'});
					i += deltaX;
					j += deltaY;
				}
			}
			else if (moves[move] === 'strike') {
				let x = posArr[0] + moveArr[0],
					y = posArr[1] + moveArr[1];
				inRange.push({x: x, y: y, type: 'strike'});
			}		
		});

		var movableTiles = {}, strikableTiles = {};
		//let board = playerColor === 'black' ? this._reverseBoard() : this.state.board;
		inRange.filter(range => {
			// is on board
			if (!this._isOnBoard(range)) return false;

			// no unit of the same color on square
			let coordsStr = `[${range.x}, ${range.y}]`;
			let targetUnit = theBoard[coordsStr];
			if (targetUnit) {
				if (theBoard[position].color === targetUnit.color) return false;
			}

			return true;
		}).forEach(range => {
			if (range.type === 'move')
				movableTiles[`[${range.x}, ${range.y}]`] = true;
			else if (range.type === 'strike')
				strikableTiles[`[${range.x}, ${range.y}]`] = true;
		});

		return {
			movableTiles: movableTiles,
			strikableTiles: strikableTiles
		};
	},

	_isOnBoard(coords) {
	  return coords.x >= 0 && coords.y >= 0 && coords.x < 6 && coords.y < 6;
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
	getInitialState: function() {
    	 return {
    	 	//side: 'front',
    	 	isSelected: false
    	 };
  	},
  	componentDidMount() {

		
	},

	componentWillMount() {
		
	
	},

	mixins: [],

	
	_onClickSquare() {


		// const {unit, position, color, selected, setSelected, litup, strikable, canDrop, side} = this.props;

		// const {isSelected} = this.state;
		var boardState = GameStore.getGameboardState();
// =======
	const {unit, color, setSelected, litup, strikable, canDrop, side, playerColor, turn} = this.props;
// >>>>>>> master

		var {position, selected} = this.props;
		
		if (turn !== playerColor.charAt(0)) return;

		// if there is no currently selected unit, click a unit (of the same color) to select it
		if (!selected) {
			if (unit && color === playerColor) {
				var moves = behavior[unit][side];
				setSelected(position, moves);
			}
		}
		// if there is currently a selected unit on the board, can do one of the following:
		else {
			if (playerColor === 'black') {
				position = this._reversePosition(position);
				selected = this._reversePosition(selected);
			}

			if (this.props.litup) {
				// move to a square with an opposite color unit to capture it
				if (unit && color !== playerColor) {
					GameActions.makeMove(selected, position, true, 'move', true);
				}

				// move to an unoccupied square
				else {
					GameActions.makeMove(selected, position, false, 'move', true);
				}

				setSelected(null, []);
			}
			else if (this.props.strikable && unit && color !== playerColor) {
				GameActions.makeMove(selected, position, true, 'strike', true);
				setSelected(null, []);
			}
			// deselect the current unit by clicking on it
			else if (selected === position) {
				setSelected(null, []);
			}
		}
		
	},

	_onDragStart(e) {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', '');

// <<<<<<< HEAD
// 		const {unit, position, color, selected, setSelected, litup, strikable, canDrop, side} = this.props;
// 		setSelected(position, behavior[unit][side]);
// =======
		const {unit, position, color, selected, setSelected, litup, strikable, side, canDrop, playerColor} = this.props;
		if (!selected) {
			if (unit && color === playerColor) {
				var moves = behavior[unit][side];
				setSelected(position, moves);
			}
		}
		//setSelected(position, behavior[unit][side]);
// >>>>>>> master
	},
	_onDragOver(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	},
	_onDrop(e) {
		e.preventDefault();
// <<<<<<< HEAD

		// console.log("i am dropping draw unit");
		// //const {position, unit, color, selected, setSelected, setDroppable} = this.props;
		// const {unit, position, color, selected, setSelected, litup, setDroppable, canDrop, strikable, droppable, side} = this.props;

		// console.log("what's in position", position);
		// //console.log("what's in drop", this.state.drop);
		// //setSelected(null, []);
		
		// console.log("what is selected?", selected, "what is position", position);
		// if (selected !== position) {
		// 	//GameActions.makeMove(selected, position, false, 'move', true);
		// 	console.log("what is drop???", this.props.drop);
		// 	if (this.props.litup) {
		// 		if (unit) GameActions.makeMove(selected, position, true, 'move', true);
		// 		else GameActions.makeMove(selected, position, false, 'move', true);

		// 	}
		// 	if(this.props.canDrop){
		// 		GameActions.makeMove(selected, position, false, 'move', true);
		// 		//this.setState({drawn: null});
		// 	}
			
// =======
		const {unit, color, setSelected, setDroppable, setDrawable, litup, strikable, canDrop, side, playerColor} = this.props;
		var {position, selected} = this.props;
		if (playerColor === 'black') {
			position = this._reversePosition(position);
			selected = this._reversePosition(selected);
		}
		if (this.props.litup) {
			if (unit) GameActions.makeMove(selected, position, true, 'move', true);
			else GameActions.makeMove(selected, position, false, 'move', true);
// >>>>>>> master
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
		//const {size} = this.props;
		let posArr = JSON.parse(pos);
		return `[${5-posArr[0]}, ${5-posArr[1]}]`;
	},

	render(){
// <<<<<<< HEAD
// 		var {unit, color, litup, strikable, canDrop, side} = this.props;
// =======
		var {unit, color, litup, strikable, canDrop, side, playerColor} = this.props;


		var cxObj = {	
			unit: !!unit,
			litup: litup,
			strikable: strikable,
			canDrop: canDrop,
			opponent: color !== playerColor
		};
		cxObj[side] = true;
		if (unit) {
			cxObj[unit] = true;
			cxObj[color] = true;
		}
		
		return (


			<div className="cellContainer"

				onDragOver={this._onDragOver}
				onDrop={this._onDrop}
				>
					<a className={cx(cxObj)}
						onClick={this._onClickSquare}
						onDragStart={this._onDragStart}

						draggable>
					</a>

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



		//<div draggable="true" id="drawnUnit" onClick={this._onDrawnUnitClick}></div>

		var cxObj = {	
			unit: !!unit
		};
		cxObj[side] = true;
		if (unit) {
			cxObj[unit] = true;
			cxObj[color] = true;
		}



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
			<div id="drawnUnit" draggable className={cx(cxObj)}
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