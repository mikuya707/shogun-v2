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
		this.setState({
			drop: droppableTiles
		});

		var element = document.getElementById('drawnUnit');
		element.className = "";
		GameStore.draw();
		this.state.drawUnit = GameStore.getGameboardState().drawUnit;
		console.log(this.state.drawUnit);
		// console.log(Object.keys(this.state.drawUnit)[0]);
		var unit = Object.keys(this.state.drawUnit)[0];

		element.classList.add(`${unit}`);
		element.classList.add("white");
		element.classList.add("front");

		
	},
	_onDrawnUnitClick(){

		var element = document.getElementById('drawnUnit');
		if (element.classList.contains("front")) {
			element.classList.remove("front");
		 	element.classList.add("back");
		}
		else if(element.classList.contains("back")){
			element.classList.remove("back");
		 	element.classList.add("front");
		}
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
			{size} = props,
			{board, selected, lightup, strike, drop, turn} = state;

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
								playerColor={this.props.color}
								side={board[`[${idx2}, ${idx1}]`] ? board[`[${idx2}, ${idx1}]`].side : null}
								litup={lightup[`[${idx2}, ${idx1}]`]}
								strikable={strike[`[${idx2}, ${idx1}]`]}
								droppable={drop[`[${idx2}, ${idx1}]`]}
								selected={selected}
								turn={turn}
								setSelected={this._setSelected}
								onClick={this._onCellClick}/>
						</td>
					)}
				</tr>
			)}
			</table>
			<div id="draw">
				<button className="btn" onClick={this._onButtonClick}>DRAW</button>
				<div id="drawnUnit" draggable onClick={this._onDrawnUnitClick} onDragStart={this._onDrawnDragStart}></div>
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

		const {unit, position, color, selected, setSelected, litup, strikable, droppable, side, playerColor, turn} = this.props;

		const {isSelected} = this.state;
		var boardState = GameStore.getGameboardState();

		//console.log("what things are before click: ", "unit ", unit, "position ", position, 'color ', color, 'side ', side, "isSelected ", isSelected, "selected", selected);
		
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

		const {unit, position, color, selected, setSelected, litup, strikable, droppable, side, playerColor} = this.props;
		if (!selected) {
			if (unit && color === playerColor) {
				var moves = behavior[unit][side];
				setSelected(position, moves);
			}
		}
		//setSelected(position, behavior[unit][side]);
	},
	_onDragOver(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	},
	_onDrop(e) {
		e.preventDefault();
		const {unit, position, color, selected, setSelected, litup, strikable, droppable, side} = this.props;
		if (this.props.litup) {
			if (unit) GameActions.makeMove(selected, position, true, 'move', true);
			else GameActions.makeMove(selected, position, false, 'move', true);
		}
		else if (this.props.strikable && unit)
			GameActions.makeMove(selected, position, true, 'strike', true);
		setSelected(null, []);
	},

	render(){
		var {unit, color, litup, strikable, droppable, side} = this.props;


		var cxObj = {	
			unit: !!unit,
			litup: litup,
			strikable: strikable,
			droppable: droppable
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

export default {Board: GameBoard, Cell: Cell};