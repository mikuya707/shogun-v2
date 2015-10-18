'use strict';

import React from 'react/addons';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';
//import ChessPieces from '../constants/ChessPieces';
//import onGameChange from '../mixins/onGameChange';
//import maybeReverse from '../mixins/maybeReverse';
import behavior from '../game/behavior';
import omit from 'lodash.omit';
import cx from 'classnames';

const GameBoard = React.createClass({
	propTypes: {

	},
	mixins: [],
	getInitialState() {
		//return null;
		this.state = GameStore.getGameboardState();
		console.log("state? ", this.state);
		return this.state;
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
			{board, selected} = state;

		var lightup = this.state.lightup;
		var cellArray = [];
		for (var i=0; i<size; i++) {
			var row = [];
			for (var j=0; j<size; j++) {
				row.push({x:j, y:i})
			}
			cellArray.push(row);
		}

		return (

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
								selected = {selected}
								setSelected={this._setSelected}
								onClick={this._onCellClick}/>
						</td>
					)}
				</tr>
			)}
			</table>
		);
	},

	_setSelected(position, inRange) {
		this.setState({
			selected: position,
			lightup: this._getValidMoves(position, inRange)
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
			if (moves[move] === 'move') {
				var x =  posArr[0] + moveArr[0], 
					y =  posArr[1] + moveArr[1];
				inRange.push({x: x, y: y});					
			}
			else if (moves[move] === 'slide' || moves[move] === 'jump slide') {
				console.log('theBoard');
				console.log(theBoard);
				console.log('me');
				console.log(theBoard[position]);
				if (moveArr[0] < 0) {	// slide left
					for (let i=posArr[0]-1; i>=0; i--) {
						var unitInTheWay = theBoard[`[${i}, ${posArr[1]}]`];
						if (unitInTheWay) {
							if (unitInTheWay.color !== theBoard[position].color) {
								console.log(`ran into a bad guy at ${i}, ${posArr[1]}`);
								inRange.push({x: i, y: posArr[1]});
							}
							break;
						}
						else inRange.push({x: i, y: posArr[1]});
					}
				}
				else if (moveArr[0] > 0) {	// slide right
					for (let i=posArr[0]+1; i<6; i++) {
						var unitInTheWay = theBoard[`[${i}, ${posArr[1]}]`];
						if (unitInTheWay) {
							if (unitInTheWay.color !== theBoard[position].color) {
								console.log(`ran into a bad guy at ${i}, ${posArr[1]}`);
								inRange.push({x: i, y: posArr[1]});
							}
							break;
						}
						else inRange.push({x: i, y: posArr[1]});
					}
				}
				else if (moveArr[1] < 0) {	// slide up
					for (let i=posArr[1]-1; i>=0; i--) {
						var unitInTheWay = theBoard[`[${posArr[0]}, ${i}]`];
						if (unitInTheWay) {
							if (unitInTheWay.color !== theBoard[position].color) {
								console.log(`ran into a bad guy at ${posArr[0]}, ${i}`);
								inRange.push({x: posArr[0], y: i});
							}
							break;
						}
						else inRange.push({x: posArr[0], y: i});
					}
				}
				else if (moveArr[1] > 0) {	// slide down
					for (let i=posArr[1]+1; i<6; i++) {
						var unitInTheWay = theBoard[`[${posArr[0]}, ${i}]`];
						if (unitInTheWay) {
							if (unitInTheWay.color !== theBoard[position].color) {
								console.log(`ran into a bad guy at ${posArr[0]}, ${i}`);
								inRange.push({x: posArr[0], y: i});
							}
							break;
						}
						else inRange.push({x: posArr[0], y: i});
					}
				}
			}
		});

		inRange.filter(range => {
			// is on board
			if (!this._isOnBoard(range)) return false;

			// for slide, stop range at closest unit in the way


			// no unit of the same color on square
			var coordsStr = `[${range.x}, ${range.y}]`;
			var targetUnit = this.state.board[coordsStr];
			if (targetUnit) {
				if (this.state.board[position].color === targetUnit.color) return false;
			}

			return true;
		}).forEach(range => {
			output[`[${range.x}, ${range.y}]`] = true;
		})
		return output;
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

		 //console.log("position is ", this.props.position);
		
	},

	componentWillMount() {
		
		
		
	},
	mixins: [],

	_onClickSquare() {

		const {unit, position, color, selected, setSelected, litup, side} = this.props;

		const {isSelected} = this.state;
		var boardState = GameStore.getGameboardState();

		//console.log("what things are before click: ", "unit ", unit, "position ", position, 'color ', color, 'side ', side, "isSelected ", isSelected, "selected", selected);
		

		// if there is no currently selected unit, click a unit to select it
		if (!selected) {
			if (unit) {
				var ranges = [];
				var moves = behavior[unit][side];
				console.log(`show me ya moves, ${unit}`);
				console.log(moves);
				//var pos = JSON.parse(position);
				// Object.keys(moves).map(function(move){
				// 	var moveArr = JSON.parse(move);
				// 	if (moves[move] === 'move') {
				// 		var x =  pos[0] + moveArr[0], 
				// 			y =  pos[1] + moveArr[1];
				// 		ranges.push({x: x, y: y, type: 'move'});					
				// 	}
				// 	else if (moves[move] === 'slide' || moves[move] === 'jump slide') {
				// 		if (moveArr[0] < 0) {	// slide left
				// 			for (let i=pos[0]-1; i>=0; i--) {
				// 				ranges.push({x: i, y: pos[1], type: 'slide'});
				// 			}
				// 		}
				// 		else if (moveArr[0] > 0) {	// slide right
				// 			for (let i=pos[0]+1; i<6; i++) {
				// 				ranges.push({x: i, y: pos[1], type: 'slide'});
				// 			}
				// 		}
				// 		else if (moveArr[1] < 0) {	// slide up
				// 			for (let i=pos[1]-1; i>=0; i--) {
				// 				ranges.push({x: pos[0], y: i, type: 'slide'});
				// 			}
				// 		}
				// 		else if (moveArr[1] > 0) {	// slide down
				// 			for (let i=pos[1]+1; i<6; i++) {
				// 				ranges.push({x: pos[0], y: i, type: 'slide'});
				// 			}
				// 		}
				// 	}
				// });
				setSelected(position, moves);
			}
		}
		// if there is currently a selected unit on the board, can do one of the following:
		else {
			if (this.props.litup) {
				// move to a square with an opposite color unit to capture it
				if (unit) {
					GameActions.makeMove(selected, position, true, true);
				}

				// move to an unoccupied square
				else {
					GameActions.makeMove(selected, position, false, true);
				}

				setSelected(null, []);
			}
			// deselect the current unit by clicking on it
			else if (selected === position) {
				setSelected(null, []);
			}
		}



		// if (unit) {
		// 	if (!selected) {
		// 		console.log('board select')

		// 		var ranges = [];
		// 		var moves = behavior[unit][side];
		// 		var pos = JSON.parse(position);
		// 		Object.keys(moves).map(function(move){
		// 			move = JSON.parse(move);
		// 			var x =  pos[0] + move[0], 
		// 				y =  pos[1] + move[1];
		// 			ranges.push({x: x, y: y});
		// 		});
		// 		setSelected(position, ranges);

		// 	}
		// 	else {
		// 		console.log('board deselect')
		// 		setSelected(null, []);
		// 	}
		// 	//GameActions.showMoves({ unit: unit, color: color }, pos, ranges);
		// }
		// //this is the condition where the player selects its own unit, and try to move to existing valid position
		// else {
		// 	if (selected && this.props.litup) {
		// 		GameActions.makeMove(selected, position, false, true);
		// 		setSelected(null, []);;
		// 	}
		// }
		
	},

	render(){
		var {unit, color, litup, side} = this.props;


		var cxObj = {	
			unit: !!unit,
			litup: litup
		};
		cxObj[side] = true;
		if (unit) {
			cxObj[unit] = true;
			cxObj[color] = true;
		}
		
		return (
			<div>
				<div className={cx(cxObj)}
					onClick={this._onClickSquare}>
				</div>
			</div>
		);
	}

});

export default {Board: GameBoard, Cell: Cell};