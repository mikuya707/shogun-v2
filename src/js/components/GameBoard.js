'use strict';

import React from 'react/addons';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';
//import ChessPieces from '../constants/ChessPieces';
//import onGameChange from '../mixins/onGameChange';
//import maybeReverse from '../mixins/maybeReverse';
import omit from 'lodash.omit';
import cx from 'classnames';

const GameBoard = React.createClass({
	propTypes: {

	},
	mixins: [],
	getInitialState() {
		return null;
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
			{cellArray.map((row) => 
				<tr>
					{row.map((cell) =>
						<td>
							<Cell />
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
	mixins: [],
	render(){
		return (
			<div>
			
		</div>
		);
	}

});

export default {Board: GameBoard, Cell: Cell};