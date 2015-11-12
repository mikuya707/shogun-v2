'use strict';

import GameActions from './actions/GameActions';
import GameStore from './stores/GameStore';
import behavior from './game/behavior';
import utils from './game/utils';
import omit from 'lodash.omit';

const THINKING_TIME = 3000;

export default (function() {

	var ai_color, ai_deck, ai_units, ai_moves;

	function setup() {

		ai_deck = [...Object.keys(omit(behavior, 'Duke', 'Oracle')), 'Pikeman', 'Pikeman'];

		// setup means of communication with game
		GameStore.on('request-ai-move', makeMove);

	}

	function makeMove(data) {
		let {board, lastMove, color} = data;

		ai_color = ai_color || (color === 'white' ? 'black' : 'white');

		// if (ai_color === 'black') board = utils.reverseBoard(board);
		// GameStore.emit('thinking', { board, lastMove, color });

		console.log('AI is thinking...')


		//console.log('\nWhere are my units?');
		ai_units = {};
		const apparentBoard = ai_color === 'black' ? utils.reverseBoard(board) : board;
		Object.keys(apparentBoard).forEach(pos => {
			if (apparentBoard[pos] && apparentBoard[pos].color === ai_color) ai_units[pos] = apparentBoard[pos];
		})
		// console.log('ai_units:')
		// console.log(ai_units);
		if (!Object.keys(ai_units).length) {
			swal('AI has run out of units!')
			return;
		}

		//console.log('\nWhere can my units move?');
		ai_moves = {};
		Object.keys(ai_units).forEach(pos => {
			const ai_unit = ai_units[pos],
				{unit, side} = ai_unit;

			// console.log(`${unit} at ${pos}:`);
			// console.log(utils.getValidMoves(pos, behavior[unit][side], ai_color, board));
			ai_moves[pos] = utils.getValidMoves(pos, behavior[unit][side], ai_color, board);
		})
		// console.log('ai_moves:')
		// console.log(ai_moves);

		//console.log('\nChoose a random valid move lol');
		let randomFrom, numPositions = Object.keys(ai_moves).length;
		do {
			randomFrom = Object.keys(ai_moves)[Math.floor(Math.random()*numPositions)];
		} while (!ai_moves[randomFrom] ||
			!(Object.keys(ai_moves[randomFrom].strikableTiles).length ||
			Object.keys(ai_moves[randomFrom].movableTiles).length));

		let randomTo,
			strikable = Object.keys(ai_moves[randomFrom].strikableTiles),
			movable = Object.keys(ai_moves[randomFrom].movableTiles);
		if (strikable.length) 
			randomTo = strikable[Math.floor(Math.random()*strikable.length)];
		else if (movable.length)
			randomTo = movable[Math.floor(Math.random()*movable.length)];

		if (ai_color === 'black') {
			randomFrom = utils.reversePosition(randomFrom);
			randomTo = utils.reversePosition(randomTo);
		}

		// console.log(`from ${randomFrom} to ${randomTo}`);

		var from = randomFrom,
			to = randomTo;
		var capture = false;

		setTimeout(function emitMove() {
			GameActions.makeMove(from, to, capture, 'move', true);
		}, THINKING_TIME);
	}


	setup();


})();
