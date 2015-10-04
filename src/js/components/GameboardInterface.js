'use strict';

import React from 'react/addons';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';
import onGameChange from '../mixins/onGameChange';
import Chessboard from './Chessboard';
import {Board} from './GameBoard';
import CapturedPieces from './CapturedPieces';
import TableOfMoves from './TableOfMoves';
import omit from 'lodash.omit';

/* the state of the gameboard is managed by GameStore */

const GameboardInterface = React.createClass({

	propTypes: {

	},
	mixins: [],
	getInitialState() {
		return GameStore.getState();
	},
	getDefaultProps() {

	},
	componentDidUpdate(prevProps) {

	},
	render() {
		const {promotion, turn, gameOver, check} = this.state
		return (
			<div id="board-moves-wrapper" className="clearfix">
				<div id="board-wrapper">

					<CapturedPieces />

					<Board />

				</div>

				<span className="feedback">
					{!gameOver.get('status') ?
						<span>
							{`${turn==='w' ? 'White' : 'Black'} to move.`}
						</span> :
						<strong>
							<span className="icon">
							  {gameOver.get('winner') === 'White' ? 'F' : 'f'}
							</span>
							{this._getGameOverMessage()}
						</strong>
					}
				</span>


			</div>
		)
	},

	_onGameChange() {
		this.setState(GameStore.getState());
	},

	_getGameOverMessage() {
		return `you lose`;
	}

});

export default GameboardInterface;