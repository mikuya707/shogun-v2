'use strict';

import GameActions from './actions/GameActions';
import GameStore from './stores/GameStore';
import behavior from './game/behavior';
import utils from './game/utils';
import omit from 'lodash.omit';
import Unit from './game/unitClass';

const THINKING_TIME = 3000;

export default (function() {

	var ai_color, ai_deck, ai_units, ai_moves;

	const ai_level = 2;

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

		ai_units = utils.getAllUnitsOfColor(ai_color, board, {perspective: ai_color});

		// Determine all valid moves that AI's units can make

		ai_moves = utils.getAllMovesForColor(ai_color, board, {perspective: ai_color}, {countAllies: false});
		// console.log('ai_moves');
		// console.log(ai_moves);
		// var ai_attackable = utils.getTilesUnderAttackBy(ai_color, board);
		// console.log('ai_attackable');
		// console.log(ai_attackable);



		var from, to, moveType, decision;
		let moved = false;

		// Invoke AI behavior method here
		// This controls how AI decides what move to make

		if (ai_level === 1) {
			let rn = Math.random();
			if (rn < 0.33 || Object.keys(ai_units).length <= 2) {
				drawAndPlaceRandomly();
				chooseRandomMove();
			}
			else chooseRandomMove();
		}
		else if (ai_level === 2) {
			targetEnemyDuke();
			protectDuke();
			killRandomVulnerableEnemy();

			if (!moved) {
				let rn = Math.random();
				if (rn < 0.5 || Object.keys(ai_units).length <= 2) {
					drawAndPlaceRandomly();
					chooseRandomMove();
				}
				else chooseRandomMove();
			}
		}


		from = decision.from;
		to = decision.to;
		moveType = decision.moveType;


		if (ai_color === 'black') {
			if (typeof from === 'string')
				from = utils.reversePosition(from);
			to = utils.reversePosition(to);
		}
		var capture = false;

		setTimeout(function emitMove() {
			GameActions.makeMove(from, to, capture, moveType, true);
		}, THINKING_TIME);



		/** Define AI behaviors below **/

		// draw a new unit and place on a random available space adjacent to duke
		function drawAndPlaceRandomly() {
			if (moved) return;

			const duke = findUnit('Duke'),
				dukePosArr = JSON.parse(duke.position),
				theBoard = (ai_color === 'black') ? utils.reverseBoard(board) : board;

			let droppableTiles = {};
			[[0,1], [0,-1], [1,0], [-1,0]].forEach(adj => {
				var adjX = dukePosArr[0]+adj[0], adjY = dukePosArr[1]+adj[1];
				if (utils.isOnBoard({x: adjX, y: adjY}) && !theBoard[`[${adjX}, ${adjY}]`]) 
					droppableTiles[`[${adjX}, ${adjY}]`] = true;
			})

			const options = Object.keys(droppableTiles);
			if (!options.length) return;

			const randomIndex = Math.floor(Math.random()*ai_deck.length),
				drawnUnit = ai_deck.splice(randomIndex, 1)[0],
				unitToPlace = { unit: drawnUnit, color: ai_color, side: 'front' },
				placeHere = options[Math.floor(Math.random()*options.length)];

			decision = { from: unitToPlace, to: placeHere, moveType: 'move' };
			moved = true;
			console.log('drew a new unit');
		}


		// return the AI-controlled unit on the board that corresponds to the specified unit name
		// If multiple of these units exist on the board, return one of them
		function findUnit(name) {
			const unitPosition = allCoords(ai_units).find(pos => ai_units[pos].unit === name);
			const theUnit = ai_units[unitPosition];
			return theUnit ? new Unit(unitPosition, theUnit, board) : null;
		}


		// return a random AI-controlled unit on the board
		function selectRandomUnit() {
			let randomFrom, numPositions = allCoords(ai_moves).length;
			do {
				randomFrom = allCoords(ai_moves)[Math.floor(Math.random()*numPositions)];
			} while (!ai_moves[randomFrom] ||
				!(allCoords(ai_moves[randomFrom].strikableTiles).length ||
				allCoords(ai_moves[randomFrom].movableTiles).length));
			return new Unit(randomFrom, ai_units[randomFrom], board);			
		}


		// Choose a valid move completely at random, from a randomly chosen AI-controlled unit
		function chooseRandomMove() {
			if (moved) return;
			let randomUnit = selectRandomUnit();
			decision = randomUnit.selectRandomSafeMove()
				|| randomUnit.selectRandomMove();
			moved = true;

			console.log('moved randomly');
		}


		// returns a collection of vulnerable enemies from the perspective of the AI
		function findVulnerableEnemies() {
			let vulnerable = {};

			const attackedByAI = utils.getTilesUnderAttackBy(ai_color, board, {perspective: ai_color});

			let enemy = utils.theColorNot(ai_color),
				enemyUnits = utils.getAllUnitsOfColor(enemy, board, {perspective: ai_color}),
				apparentBoard = (ai_color === 'black') ? utils.reverseBoard(board) : board;

			Object.keys(enemyUnits).forEach(pos => {
				if (attackedByAI[pos]) {
					vulnerable[pos] = {
						identity: apparentBoard[pos],
						attackedBy: attackedByAI[pos]
					};
				}
			});

			return vulnerable;
		}

		// checks if enemy Duke is under attack, and immediately goes for the kill if so
		// this action will generally take highest priority, as it results in an automatic win
		function targetEnemyDuke() {
			if (moved) return;
			const vulnerable = findVulnerableEnemies(),
				iSeeDukeHere = Object.keys(vulnerable)
					.find(pos => vulnerable[pos].identity.unit === "Duke");
			if (iSeeDukeHere) {
				let duke = vulnerable[iSeeDukeHere],
					killer = duke.attackedBy[Math.floor(Math.random()*duke.attackedBy.length)];
				decision = { from: killer.position, to: iSeeDukeHere, moveType: killer.moveType };
				moved = true;
				console.log('assassinated enemy duke');
			}
		}


		// given a specific position, if an enemy unit is there and can be attacked, kill it
		// if the enemy can be killed by AI duke, but doing so would put AI duke in danger, don't do it
		function targetSpecificEnemy(position) {
			if (moved) return;
			const vulnerable = findVulnerableEnemies(),
				iSeeEnemyHere = Object.keys(vulnerable)
					.find(pos => pos === position);
			if (iSeeEnemyHere) {
				let enemy = vulnerable[iSeeEnemyHere],
					killer = enemy.attackedBy[Math.floor(Math.random()*enemy.attackedBy.length)];

				while (killer.unit.unit === 'Duke' && 
						iSeeEnemyHere.isUnderAttackBy(utils.theColorNot(ai_color), board, {perspective: ai_color})) {
					if (enemy.attackedBy.length > 1)
						killer = enemy.attackedBy[Math.floor(Math.random()*enemy.attackedBy.length)];
					else return;
				}
					
				decision = { from: killer.position, to: iSeeEnemyHere, moveType: killer.moveType };
				moved = true;
			}
		}

		// look for any vulnerable enemies and bring them down
		function killRandomVulnerableEnemy() {
			if (moved) return;
			Object.keys(findVulnerableEnemies()).forEach(pos => targetSpecificEnemy(pos));
			if (moved) console.log('killed a random fool');
		}


		// protect the AI-controlled duke. 
		// if AI duke is under attack, try the following actions, in this order:
		// 1. capture the threatening enemy unit (using somebody other than the duke, if possible)
		// 2. have the duke move to a safe location

		function protectDuke() {
			if (moved) return;
			const duke = findUnit('Duke');

			let dukeTargeters = duke.isUnderAttack();

			if (dukeTargeters) {
				console.log('Duke is under attack. Oh noes!');

				const targeterPositions = dukeTargeters
					.map(targeter => utils.reversePosition(targeter.position));

				targeterPositions.forEach(pos => {
					targetSpecificEnemy(pos);
					if (moved) console.log('shot down assassination attempt.')
				});
				if (moved) return;


				if (!duke.canMove()) console.log('shit he is trapped');
				else {
					decision = duke.selectRandomSafeMove();						
					if (decision) moved = true;

					console.log('duke ran away');
				}
			}

		}




	}


	setup();


})();
