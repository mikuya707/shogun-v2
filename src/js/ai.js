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




		var from, to, moveType, decision;
		let moved = false;

		// Invoke AI behavior method here
		// This controls how AI decides what move to make

		if (ai_level === 1) {
			let rn = Math.random();
			if (rn < 0.33 || Object.keys(ai_units).length <= 2) {
				drawAndPlace('random');
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
					drawAndPlace('random');
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



		// draw a new unit and place on board according to drawBehavior
		// 'random': place on a random available tile adjacent to duke
		// 'block': place on a tile that will block an enemy attack
		function drawAndPlace(drawBehavior) {
			if (moved || !ai_deck.length) return;

			const duke = findUnit('Duke'),
				dukePosArr = JSON.parse(duke.position),
				theBoard = (ai_color === 'black') ? utils.reverseBoard(board) : board;

			let droppableTiles = {};
			[[0,1], [0,-1], [1,0], [-1,0]].forEach(adj => {
				var adjX = dukePosArr[0]+adj[0], adjY = dukePosArr[1]+adj[1];
				if (utils.isOnBoard({x: adjX, y: adjY}) && !theBoard[`[${adjX}, ${adjY}]`]) 
					droppableTiles[`[${adjX}, ${adjY}]`] = true;
			})

			let options = Object.keys(droppableTiles);
			if (!options.length) return;



			const randomIndex = Math.floor(Math.random()*ai_deck.length),
				drawnUnit = ai_deck.splice(randomIndex, 1)[0],
				unitToPlace = { unit: drawnUnit, color: ai_color, side: 'front' };

			if (drawBehavior === 'block') {
				options = options.filter(option => !wouldExposeDuke(null, option, unitToPlace));
				if (!options.length) return;
				console.log('blocked by drawing');
			}
			const placeHere = options[Math.floor(Math.random()*options.length)];

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

			let ableUnits = allCoords(ai_moves).filter(pos => {
				return !!allCoords(ai_moves[pos].strikableTiles).length ||
					!!allCoords(ai_moves[pos].movableTiles).length;
			});

			if (!ableUnits.length) return null;

			randomFrom = ableUnits[Math.floor(Math.random()*ableUnits.length)];
			return new Unit(randomFrom, ai_units[randomFrom], board);			
		}


		// Choose a valid move completely at random, from a randomly chosen AI-controlled unit
		function chooseRandomMove() {
			if (moved) return;
			let enemy = utils.theColorNot(ai_color),
				perspective = ai_color;

			let safeToMove = allCoords(ai_moves).filter(pos => {
				if (allCoords(ai_moves[pos].strikableTiles).length) return true;
				let safeMoves = allCoords(ai_moves[pos].movableTiles).filter(tile => {
					return !wouldExposeDuke(pos, tile, ai_units[pos]);
				});
				return !!safeMoves.length;
			});

			if (!safeToMove.length) {
				let randomUnit = selectRandomUnit();
				if (!randomUnit) {
					drawAndPlace('random');
					if (!moved) {
						console.log('wtf i literally cant do anything');
						let nothing = allCoords(ai_moves)[0];
						decision = {from: nothing, to: nothing, moveType: 'move'};
						moved = true;
					}
					return;				
				}
				decision = randomUnit.selectRandomMove();
				console.log('lel im screwed');
				moved = true;
				return;
			}

			let randomFrom = safeToMove[Math.floor(Math.random()*safeToMove.length)],
				randomUnit = new Unit(randomFrom, ai_units[randomFrom], board);

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


		function wouldExposeDuke(from, to, movedUnit) {
			let perspective = ai_color, enemy = utils.theColorNot(ai_color);
			let changes = {[to]: movedUnit};
			if (from) changes[from] = null;

			const hypotheticalBoard = utils.previewBoardState(board, changes, {perspective});
			return utils.findPositionOfUnit('Duke', ai_color, hypotheticalBoard, {perspective})
				.isUnderAttackBy(enemy, hypotheticalBoard, {perspective});
		}


		// given a specific position, if an enemy unit is there and can be attacked, kill it
		// if a move that kills the enemy would put AI duke in danger, don't do it
		function targetSpecificEnemy(position) {
			if (moved) return;
			const vulnerable = findVulnerableEnemies(),
				iSeeEnemyHere = Object.keys(vulnerable)
					.find(pos => pos === position);
			if (iSeeEnemyHere) {
				let enemy = vulnerable[iSeeEnemyHere], killer;

				let safeAttacks = enemy.attackedBy.filter(unit => {
					return unit.moveType === 'strike' || !wouldExposeDuke(unit.position, iSeeEnemyHere, unit.unit);
				});

				if (safeAttacks.length) {
					killer = safeAttacks[Math.floor(Math.random()*safeAttacks.length)];
				} else return;
					
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
		// 3. block line of attack by drawing a piece and putting it in the way, or moving an existing piece in the way

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

				decision = duke.selectRandomSafeMove();	
				if (decision) {
					moved = true;
					console.log('duke ran away');
				}
				else {
					console.log('shit he is trapped');

					drawAndPlace('block');
					if (moved) return;

					let blockingMoves = [];
					allCoords(ai_moves).forEach(from => {
						let movableTiles = allCoords(ai_moves[from].movableTiles);
						if (movableTiles.length) {
							movableTiles.forEach(to => {
								if (!wouldExposeDuke(from, to, ai_units[from])) {
									blockingMoves.push({from, to});
								}
							});
						}
					});

					const guardedMoves = blockingMoves.filter(move => {
						let hypotheticalBoard = utils.previewBoardState(board, {[move.from]: null}, {perspective: ai_color});
						return move.to.isUnderAttackBy(ai_color, hypotheticalBoard, {perspective: ai_color});
					});
					if (guardedMoves.length) blockingMoves = guardedMoves;
					if (blockingMoves.length) {
						let theMove = blockingMoves[Math.floor(Math.random()*blockingMoves.length)];
						decision = {from: theMove.from, to: theMove.to, moveType: 'move'};	
						moved = true;
						console.log('but a bro comes to the rescue!');				
					}
					// else drawAndPlace('block');

				}







			}

		}




	}


	setup();


})();
