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
		//return null;
		this.state = GameStore.getGameboardState();
		 //this.result;
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
		if (!Object.keys(droppableTiles).length) console.log('No available tiles adjacent to the Duke - cannot draw new unit');
		this._setDroppable(droppableTiles);
		// this.setState({
		// 	drop: droppableTiles
		// });
		console.log('what are droppableTiles', droppableTiles);
		this._setSelected("[-1, -1]", droppableTiles);
		//var element = document.getElementById('drawnUnit');
		//console.log('what is element here?', element);
		GameStore.draw();
		//console.log(result);
		var drawnUnit = GameStore.getGameboardState().drawUnit;
		console.log(drawnUnit);
		var drawn = drawnUnit[Object.keys(drawnUnit)[0]];
		this.setState({
			drawn: drawn
		});
<<<<<<< HEAD
		// console.log(this.state.drawUnit);
=======

		var element = document.getElementById('drawnUnit');
		element.className = "";
		GameStore.draw();
		this.state.drawUnit = GameStore.getGameboardState().drawUnit;
		console.log(this.state.drawUnit);
>>>>>>> master
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
		GameStore.addChangeListener(this._onChange);
	},
	componentWillUnmount() {
		GameStore.removeChangeListener(this._onChange);
	},
	_onChange() {
	
		this.setState({
			lightup: GameStore.getGameboardState().lightup
		});
	},
	render() {
		var {state, props} = this, 
			{size} = props,
			{board, selected, lightup, strike, drop, drawn} = state;

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
								side={board[`[${idx2}, ${idx1}]`] ? board[`[${idx2}, ${idx1}]`].side : null}
								litup={lightup[`[${idx2}, ${idx1}]`]}
								strikable={strike[`[${idx2}, ${idx1}]`]}
								canDrop={drop[`[${idx2}, ${idx1}]`]}
								selected = {selected}
								setSelected={this._setSelected}
								setDroppable={this._setDroppable}
								onClick={this._onCellClick}/>
						</td>
					)}
				</tr>
			)}
			</table>
			<div id="draw">
				<button className="btn" onClick={this._onButtonClick}>DRAW</button>
<<<<<<< HEAD
				<DrawnComponent selected="[-1, -1]" position="[-1, -1]" unit={drawn? drawn.unit : null} color={drawn? drawn.color : null} side={drawn? drawn.side : null} drawAUnit={this._onDrawCellClick} ></DrawnComponent>
=======
				<div id="drawnUnit" draggable onClick={this._onDrawnUnitClick} onDragStart={this._onDrawnDragStart}></div>
>>>>>>> master
			</div>
			</div>
		);
	},

	_onDrawnDragStart(e) {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', '');

		const {unit, position, color, selected, setSelected, litup, strikable, droppable, side} = this.props;
		setSelected('[-1,-1]', 'draw');
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

	_getValidMoves(position, moves) {
		if (!moves) return;
		var output = {};

		var inRange = [];
		var posArr = JSON.parse(position);
		var theBoard = this.state.board;

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
		inRange.filter(range => {
			// is on board
			if (!this._isOnBoard(range)) return false;

			// no unit of the same color on square
			let coordsStr = `[${range.x}, ${range.y}]`;
			let targetUnit = this.state.board[coordsStr];
			if (targetUnit) {
				if (this.state.board[position].color === targetUnit.color) return false;
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

		const {unit, position, color, selected, setSelected, litup, strikable, canDrop, side} = this.props;

		const {isSelected} = this.state;
		var boardState = GameStore.getGameboardState();

		//console.log("what things are before click: ", "unit ", unit, "position ", position, 'color ', color, 'side ', side, "isSelected ", isSelected, "selected", selected);
		

		// if there is no currently selected unit, click a unit to select it
		if (!selected) {
			if (unit) {
				var moves = behavior[unit][side];
				setSelected(position, moves);
			}
		}
		// if there is currently a selected unit on the board, can do one of the following:
		else {
			if (this.props.litup) {
				// move to a square with an opposite color unit to capture it
				if (unit) {
					GameActions.makeMove(selected, position, true, 'move', true);
				}

				// move to an unoccupied square
				else {
					GameActions.makeMove(selected, position, false, 'move', true);
				}

				setSelected(null, []);
			}
			else if (this.props.strikable && unit) {
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

		const {unit, position, color, selected, setSelected, litup, strikable, canDrop, side} = this.props;
		setSelected(position, behavior[unit][side]);
	},
	_onDragOver(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	},
	_onDrop(e) {
		e.preventDefault();
<<<<<<< HEAD
		console.log("i am dropping draw unit");
		const {position, unit, color, selected, setSelected, setDroppable} = this.props;
		console.log("what's in position", position);
		//console.log("what's in drop", this.state.drop);
		//setSelected(null, []);
		
		console.log("what is the state now", this.state);
		if (selected !== position) {
			GameActions.makeMove(selected, position, false, 'move', true);
			
=======
		const {unit, position, color, selected, setSelected, litup, strikable, droppable, side} = this.props;
		if (this.props.litup) {
			if (unit) GameActions.makeMove(selected, position, true, 'move', true);
			else GameActions.makeMove(selected, position, false, 'move', true);
>>>>>>> master
		}
		else if (this.props.strikable && unit)
			GameActions.makeMove(selected, position, true, 'strike', true);
		setSelected(null, []);
<<<<<<< HEAD
		setDroppable({});

		// this.setState({
		// 		drawn: null
		// 	});

=======
>>>>>>> master
	},

	render(){
		var {unit, color, litup, strikable, canDrop, side} = this.props;

		var cxObj = {	
			unit: !!unit,
			litup: litup,
			strikable: strikable,
			canDrop: canDrop
		};
		cxObj[side] = true;
		if (unit) {
			cxObj[unit] = true;
			cxObj[color] = true;
		}
		
		return (
				<div 
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


	// _onDragStart(e) {
	// 	e.dataTransfer.effectAllowed = 'move';
	// 	e.dataTransfer.setData('text/plain', '');

	// 	const {unit, position, color, side} = this.props;
	// },
	// _onDragOver(e) {
	// 	e.preventDefault();
	// 	e.dataTransfer.dropEffect = 'move';
	// },
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
		
		return (
				// <div>
				// 	<div id="drawnUnit" draggable className={cx(cxObj)} 
				// 		onClick={drawAUnit}> 
				// 	</div>
				<div id="drawnUnit" draggable className={cx(cxObj)}
				onDragOver={this._onDragOver} onClick={drawAUnit}>
					<a className={cx(cxObj)}
						onClick={drawAUnit}
						onDragStart={this._onDragStart}
						draggable>
					</a>
				</div>
					
				//</div>
			);
		}

	});

export default {Board: GameBoard, Cell: Cell, DrawnComponent: DrawnComponent};