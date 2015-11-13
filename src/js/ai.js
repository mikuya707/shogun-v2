'use strict';

import GameActions from './actions/GameActions';
import GameStore from './stores/GameStore';
import behavior from './game/behavior';
import utils from './game/utils';
import omit from 'lodash.omit';

const THINKING_TIME = 3000;

export default (function() {

	var ai_color, ai_deck, ai_units, ai_moves;

	const ai_level = 1;

	function setup() {

		ai_deck = [...Object.keys(omit(behavior, 'Duke', 'Oracle')), 'Pikeman', 'Pikeman'];

		// setup means of communication with game
		GameStore.on('request-ai-move', makeMove);

	}

	function allCoords(collection) {
		if (typeof collection !== 'object') return;
		return Object.keys(collection);
	}

	function makeMove(data) {
		let {board, lastMove, color} = data;

		ai_color = ai_color || (color === 'white' ? 'black' : 'white');

		// console.log('AI is thinking...')


		// Find where AI's units are
		// If AI is Black, flip board temporarily to calculate moves
		// then flip back to normal before emitting move event
		ai_units = {};
		const apparentBoard = ai_color === 'black' ? utils.reverseBoard(board) : board;
		allCoords(apparentBoard).forEach(pos => {
			if (apparentBoard[pos] && apparentBoard[pos].color === ai_color) ai_units[pos] = apparentBoard[pos];
		})
		if (!allCoords(ai_units).length) {
			swal('AI has run out of units!')
			return;
		}

		// Determine all valid moves that AI's units can make
		ai_moves = {};
		allCoords(ai_units).forEach(pos => {
			const ai_unit = ai_units[pos],
				{unit, side} = ai_unit;
			ai_moves[pos] = utils.getValidMoves(pos, behavior[unit][side], ai_color, board);
		})

		var from, to;

		// Invoke AI behavior method here
		// This controls how AI decides what move to make
		if (ai_level === 1) chooseRandomMove();





		if (ai_color === 'black') {
			from = utils.reversePosition(from);
			to = utils.reversePosition(to);
		}
		var capture = false;

		setTimeout(function emitMove() {
			GameActions.makeMove(from, to, capture, 'move', true);
		}, THINKING_TIME);



		/** Define AI behaviors below **/

		// Choose a valid move completely at random (level 1 behavior)
		function chooseRandomMove() {
			let randomFrom, numPositions = allCoords(ai_moves).length;
			do {
				randomFrom = allCoords(ai_moves)[Math.floor(Math.random()*numPositions)];
			} while (!ai_moves[randomFrom] ||
				!(allCoords(ai_moves[randomFrom].strikableTiles).length ||
				allCoords(ai_moves[randomFrom].movableTiles).length));

			let randomTo,
				strikable = allCoords(ai_moves[randomFrom].strikableTiles),
				movable = allCoords(ai_moves[randomFrom].movableTiles);
			if (strikable.length) 
				randomTo = strikable[Math.floor(Math.random()*strikable.length)];
			else if (movable.length)
				randomTo = movable[Math.floor(Math.random()*movable.length)];

			from = randomFrom;
			to = randomTo;
		}

	}


	setup();


})();
