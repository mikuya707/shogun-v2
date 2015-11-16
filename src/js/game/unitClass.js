import behavior from './behavior';
import utils from './utils';


class Unit {

	// instantiate a Unit object based on the '[x, y]': {unit, color, side}
	// key-value pair found in a board or unit collection
	// Also pass in the board so the unit is aware of his surroundings
	constructor(position, value, board) {
		this.name = value.unit;
		this.color = value.color;
		this.side = value.side;
		this.position = position;
		this.board = board;
	}

	maybeReverse(thing) {
		if (this.color === 'white') return thing;
		else if (typeof thing === 'string') return utils.reversePosition(thing);
		else if (typeof thing === 'object') return utils.reverseBoard(thing);
	}

	getAllies() {
		return Object.keys(this.board)
			.filter(pos => this.board[pos] && this.board[pos].color === this.color)
			.map(pos => new Unit(pos, this.board[pos], this.board));
	}

	get allies() {
		return this.getAllies();
	}

	allCoords(collection) {
		if (typeof collection !== 'object') return;
		return Object.keys(collection);
	}

	getAllMoves() {
		const {name, color, side, position, board} = this;
		return utils.getValidMoves(position, behavior[name][side], color, board, false);
	}

	canMove() {
		return !!(this.getMovableTiles(true).length);
	}
	getRandomMoveTile() {
		return this.getMovableTiles().getRandomTile();
	}

	canStrike() {
		return !!(this.getStrikableTiles(true).length);
	}
	getRandomStrikeTile() {
		return this.getStrikableTiles().getRandomTile();
	}



	/** Chainable methods **/
	getStrikableTiles(stop) {
		this.tiles = Object.keys(this.getAllMoves().strikableTiles)
			.filter(tile => !!this.maybeReverse(this.board)[tile]);
		return stop ? this.tiles : this;
	}

	getMovableTiles(stop) {
		this.tiles = Object.keys(this.getAllMoves().movableTiles);
		return stop ? this.tiles : this;
	}





	isUnderAttack() {
		let enemy = utils.theColorNot(this.color);
		const perspective = this.color;
		let underAttack = utils.getTilesUnderAttackBy(enemy, this.board, {perspective});
		return underAttack[this.position];
	}

	selectRandomMove() {
		if (this.canStrike()) {
			return { from: this.position, to: this.getRandomStrikeTile(), moveType: 'strike' };
		}
		else if (this.canMove())
			return { from: this.position, to: this.getRandomMoveTile(), moveType: 'move' };
	}

	selectRandomSafeMove() {
		// If unit can strike an enemy and is not currently in danger, snipe somebody
		// Otherwise, try to move to a valid tile that is not under attack

		if (this.canStrike() && !this.isUnderAttack())
			return { from: this.position, to: this.getRandomStrikeTile(), moveType: 'strike' };
		else if (this.canMove()) {
			let destination,
				enemy = utils.theColorNot(this.color),
				board = this.board,
				perspective = this.color;	

			this.tiles = this.getMovableTiles(true)
				.filter(tile => {
					// console.log(`can i move to ${tile}? Whos attacking it?`);
					// console.log(utils.getTilesUnderAttackBy(enemy, board, {perspective})[tile]);
					return !tile.isUnderAttackBy(enemy, board, {perspective})
				});

			return this.tiles.length 
				? { from: this.position, to: this.getRandomTile(), moveType: 'move' } : null;

		}
	}


	getRandomTile() {
		return this.tiles[Math.floor(Math.random()*this.tiles.length)];
	}





}

export default Unit;