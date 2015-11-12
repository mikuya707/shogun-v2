/** Include methods that define basic rules of the game here
	Public file that can be accessed by anyone

*/


const Utils = {

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

	isOnBoard: function({x, y}) {
	  return x >= 0 && y >= 0 && x < 6 && y < 6;
	},

	getValidMoves: function(position, moves, playerColor, board) {
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

		// Filter out tiles that are occupied by allied units or not on the board,
		// then organize by movable and strikable tiles
		inRange.filter(range => {
			let targetUnit = theBoard[`[${range.x}, ${range.y}]`];
			if (targetUnit && theBoard[position].color === targetUnit.color) return false;
			return this.isOnBoard(range);
		}).forEach(range => {
			if (range.type === 'move') movableTiles[`[${range.x}, ${range.y}]`] = true;
			else if (range.type === 'strike') strikableTiles[`[${range.x}, ${range.y}]`] = true;
		});

		return { movableTiles, strikableTiles };
	},

}

export default Utils;