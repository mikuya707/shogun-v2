import behavior from './behavior';

/** Include utility methods that define basic rules of the game here
	Public file that can be accessed by anyone

*/



const Utils = {

	theColorNot: function(color) {
		return color === 'white' ? 'black' : 'white';
	},

	colorCapitalized: function(color) {
		return color === 'white' ? 'White' : 'Black';
	},

	reversePosition: function(pos) {
		let posArr = JSON.parse(pos);
		if (!Array.isArray(posArr)) return;
		return `[${5-posArr[0]}, ${5-posArr[1]}]`;
	},

	reverseBoard: function(board) {
		let newBoard = {};
		Object.keys(board).forEach(pos => {
			newBoard[this.reversePosition(pos)] = board[pos];
		})
		return newBoard;
	},

	// returns a collection of units *from the matching color player's perspective*
	getAllUnitsOfColor: function(playerColor, board, {perspective}) {
		let units = {};
		const apparentBoard = playerColor === 'black' ? this.reverseBoard(board) : board;
		Object.keys(apparentBoard).forEach(pos => {
			if (apparentBoard[pos] && apparentBoard[pos].color === playerColor)
				units[pos] = apparentBoard[pos];
		});
		return playerColor === perspective ? units : this.reverseBoard(units);
	},

	isOnBoard: function({x, y}) {
	  	return x >= 0 && y >= 0 && x < 6 && y < 6;
	},

	//* countAllies is an optional parameter
	// if set to true, moves will be counted even if an ally is on the observed tile
	//* The position passed in will always be from the perspective of the player
	//* The returned object will also be from the perspective of the player
	getValidMoves: function(position, moves, playerColor, board, countAllies) {
		if (!moves) return;
		let inRange = [], movableTiles = {}, strikableTiles = {},
			posArr = JSON.parse(position),
			theBoard = playerColor === 'black' ? this.reverseBoard(board) : board;

		// Store all tiles within range of the unit's behavior
		Object.keys(moves).forEach(move => {
			let moveArr = JSON.parse(move), moveName = moves[move],
				// (x, y): coordinates of the marked tile
				x = posArr[0] + moveArr[0], 
				y = posArr[1] + moveArr[1];

			// strike and jump are straightforward; simply store the marked tile
			// if (moveName === 'command') inRange.push({x: x, y: y, type: 'strike'});
			if (moveName === 'strike') inRange.push({x: x, y: y, type: 'strike'});
			else if (moveName === 'jump') inRange.push({x: x, y: y, type: 'move'});
			else {
				let deltaX = Math.sign(moveArr[0]), 
					deltaY = Math.sign(moveArr[1]),
					i = posArr[0] + deltaX, 
					j = posArr[1] + deltaY;

				// loop through all tiles on board in a straight path between starting tile and marked tile
				while (this.isOnBoard({x: i, y: j})) {
					// sliding units can land on any tile within a straight path
					// non-sliding units can only land on the marked tile
					if (moveName.includes('slide') || (x === i && y === j))
						inRange.push({x: i, y: j, type: 'move'});

					// if unit can't jump and there is a unit in the way, break
					let unitInTheWay = theBoard[`[${i}, ${j}]`];
					if (unitInTheWay && !moveName.includes('jump')) break;

					i += deltaX; j += deltaY;
				}
			}
		});

		// Filter out tiles that are occupied by allied units (unless countAllies = true) or not on the board,
		// then organize by movable and strikable tiles
		inRange.filter(range => {
			let targetUnit = theBoard[`[${range.x}, ${range.y}]`];
			if (!countAllies && targetUnit && theBoard[position].color === targetUnit.color) return false;
			return this.isOnBoard(range);
		}).forEach(range => {
			if (range.type === 'move') movableTiles[`[${range.x}, ${range.y}]`] = true;
			else if (range.type === 'strike') strikableTiles[`[${range.x}, ${range.y}]`] = true;
		});

		return { movableTiles, strikableTiles };
	},

	// countAllies: boolean whether moves landing on ally-occupied tiles should count
	getAllMovesForColor: function(playerColor, board, {perspective}, {countAllies}) {
		let moves = {};
		const units = this.getAllUnitsOfColor(playerColor, board, {perspective});
		Object.keys(units).forEach(pos => {
			const aUnit = units[pos],
				{unit, side} = aUnit;
			moves[pos] = this.getValidMoves(pos, behavior[unit][side], playerColor, board, countAllies);
		});
		return playerColor === perspective ? moves : {
			movableTiles: this.reverseBoard(moves.movableTiles),
			strikableTiles: this.reverseBoard(moves.strikableTiles)
		};
	},

	getTilesUnderAttackBy: function(playerColor, board, {perspective}) {
		// playerColor: the player who is attacking said tiles
		// {perspective}: perspective of requesting player
		// 1. Get apparent valid moves from the perspective of playerColor
		// 2. If requesting player is opposite playerColor, flip the moves collection
		// 3. Returned tiles object matches the perspective of the requesting player 

		let tiles = {};
		const units = this.getAllUnitsOfColor(playerColor, board, {perspective: playerColor});
		Object.keys(units).forEach(pos => {
			const aUnit = units[pos],
				{unit, side} = aUnit;
			let moves = this.getValidMoves(pos, behavior[unit][side], playerColor, board, true);
			
			if (playerColor !== perspective) {
				moves = {
					movableTiles: this.reverseBoard(moves.movableTiles),
					strikableTiles: this.reverseBoard(moves.strikableTiles)
				}
			}

			Object.keys(moves).forEach(tileType => {
				Object.keys(moves[tileType]).forEach(tile => {
					let moveType = (tileType === 'strikableTiles') ? 'strike' : 'move',
						threat = {position: pos, unit: aUnit, moveType: moveType};
					if (!tiles[tile]) tiles[tile] = [threat];
					else tiles[tile].push(threat);
				});
			});
		});
		return tiles;
	},

};

String.prototype.isUnderAttackBy = function(playerColor, board, {perspective}) {
	if (!Array.isArray(JSON.parse(this))) return;
	return Utils.getTilesUnderAttackBy(playerColor, board, {perspective})[this];
}

export default Utils;