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
		// {
		// 	board: state.board;
		// }
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
								//flip = {this._flip}
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

	_getValidMoves(position, inRange) {
		if (!inRange) return;
		var output = {};
		inRange.filter(range => {
			// is on board
			if (!this._isOnBoard(range)) return false;

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

	_flip() {
		console.log('everyday im flippin');
		//this.setState({ side: (this.state.side === 'front') ? 'back' : 'front' });
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

		 //console.log("position is ", this.props.position);
		
	},

	componentWillMount() {
		
		
		
	},
	mixins: [],

	_onClickSquare() {

		const {unit, position, color, selected, setSelected, litup, side} = this.props;

		const {isSelected} = this.state;
		var boardState = GameStore.getGameboardState();
		//var {board, lightup} = boardState;

		//console.log("what things are before click: ", "unit ", unit, "position ", position, 'color ', color, 'side ', side, "isSelected ", isSelected, "selected", selected);
		if (unit) {
			if (!selected) {
				console.log('board select')

				var ranges = [];
				var moves = behavior[unit][side];
				var pos = JSON.parse(position);
				Object.keys(moves).map(function(move){
					move = JSON.parse(move);
					var x =  pos[0] + move[0], 
						y =  pos[1] + move[1];
					ranges.push({x: x, y: y});
				});
				setSelected(position, ranges);

			}
			else {
				console.log('board deselect')
				setSelected(null, []);
			}
			//GameActions.showMoves({ unit: unit, color: color }, pos, ranges);
			//this._flip();
		}
		//this is the condition where the player selects its own unit, and try to move to existing valid position
		else {
			if (selected && this.props.litup) {
				GameActions.makeMove(selected, position, false, true);
				setSelected(null, []);;
			}
		}
	},

	_flip() {
		//this.setState({ side: (this.state.side === 'front') ? 'back' : 'front' });
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