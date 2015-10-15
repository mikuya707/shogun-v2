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
		// 	setup: state.setup;
		// }
	},
	componentDidMount() {
		GameStore.addChangeListener(this._onChange);
	},
	componentWillUnmount() {
		GameStore.removeChangeListener(this._onChange);
	},
	_onChange() {
		console.log('hai karen-chan');
		//console.log(GameStore.getGameboardState().lightup);
		console.log(GameStore.getGameboardState());
		console.log(this);
		// function foo(state, self){
		// 	//var self = this;
		// 	baz(self);
		// 	if(state.lightup.length === 0){
		// 		self.setState({
		// 			lightup: GameStore.getGameboardState().lightup
		// 		},baz(self));
				
		// 	}
		// }
		
		this.setState({
			lightup: GameStore.getGameboardState().lightup
		});
	},
	_onCellClick() {
		console.log('cell clicked');
	},
	render() {
		var {state, props} = this, {setup} = state, {size} = props;
		var {setup, lightup} = state;
		console.log('HOW ABOUT DIS STATE');

		console.log(lightup);

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
								unit={setup[`[${idx2}, ${idx1}]`] ? setup[`[${idx2}, ${idx1}]`].unit : null} 
								color={setup[`[${idx2}, ${idx1}]`] ? setup[`[${idx2}, ${idx1}]`].color : null}
								litup={lightup[`[${idx2}, ${idx1}]`]}
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
				var x =  pos[0] + move[0], 
					y =  pos[1] + move[1];
				ranges.push({x: x, y: y});
			});
			console.log('range:', ranges);
			console.log(`hi ${unit}!`);
			console.log(behavior[unit]);
			GameActions.showMoves({ unit: unit, color: color }, pos, ranges);

			//this._flip();
		}
	},

	_flip() {
		this.setState({ side: (this.state.side === 'front') ? 'back' : 'front' });
	},

	render(){
		var {unit, color, litup} = this.props;

		var {side} = this.state;


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