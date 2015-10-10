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
		console.log("state? ", this.state.setup);
		return this.state;
		// {
		// 	setup: state.setup;
		// }
	},
	componentDidMount() {
		

	},
	componentWillUnmount() {

	},
	_onCellClick() {
		console.log('cell clicked');
	},
	render() {
		var {state, props} = this, {setup} = state, {size} = props;

		console.log("setup ", setup);
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
								unit={setup[`[${idx2}, ${idx1}]`] ? setup[`[${idx2}, ${idx1}]`][0]: null} 
								color={setup[`[${idx2}, ${idx1}]`] ? setup[`[${idx2}, ${idx1}]`][1]: null}
								onClick={this._onCellClick}/>
						</td>
					)}
				</tr>
				)}
		</table>
		);
	}

});


const Cell = React.createClass({
	propTypes: {
	},
	getInitialState: function() {
    	 return {
    	 	side: 'front',
    	 	highlighted: false
    	 };
  	},
  	componentDidMount() {

		 //console.log("position is ", this.props.position);
		
	},

	componentWillMount() {
		
		
		
	},
	mixins: [],

	_onClickSquare() {
		const {unit, position, color} = this.props;
		const {side} = this.state;
		if (unit) {
			var ranges = [];
			var moves = behavior[unit][side];
			var pos = JSON.parse(position);
			Object.keys(moves).map(function(move){
				move = JSON.parse(move);
				var y =  pos[0] + move[0], 
					x =  pos[1] + move[1];
				ranges.push({x: x, y: y});
				//console.log("what is refs", this.refs);
			});
			console.log('range:', ranges);
			console.log(`hi ${unit}!`);
			console.log(behavior[unit]);
			GameActions.showMoves(pos, ranges);
			this._flip();
		}
	},

	_flip() {
		this.setState({ side: (this.state.side === 'front') ? 'back' : 'front' });
	},

	render(){
		var {unit, color} = this.props;
		var {side} = this.state;

		var cxObj = {	
			unit: !!unit,
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