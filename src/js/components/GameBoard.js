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
	render() {
		var {state} = this, {setup} = state;

		console.log("setup ", setup);
		var cellArray = [];
		for (var i=0; i<6; i++) {
			var row = [];
			for (var j=0; j<6; j++) {
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
							<Cell position={`[${idx2}, ${idx1}]`} unit={setup[`[${idx2}, ${idx1}]`]?  setup[`[${idx2}, ${idx1}]`]: null}/>
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
    	 return null;
  	},
  	componentDidMount() {

		 console.log("position is ", this.props.position);
		
	},

	componentWillMount() {
		
		
		
	},
	mixins: [],

	_onClickSquare() {
		const {unit} = this.props;
		if (unit) {
			console.log(`hi ${unit}!`);
			console.log(behavior[unit]);
		}
	},

	render(){
		var {unit} = this.props;

		var cxObj = {
			unit: !!unit,
		};
		if (unit) cxObj[unit] = true;
		
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