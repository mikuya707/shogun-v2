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
		return null;
		// const state = GameStore.getGameboardState();
		// return {
		// 	config: state.config;
		// }
	},
	componentDidMount() {
		

	},
	componentWillUnmount() {

	},
	render() {

		
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
							<Cell position={`[${idx2}, ${idx1}]`} unit={behavior ? 1 : 0}/>
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
	render(){
		
		return (
			<div>
			
			</div>
		);
	}

});

export default {Board: GameBoard, Cell: Cell};