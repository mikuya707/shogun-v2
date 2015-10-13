'use strict';

import React from 'react/addons';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';
import {Board, Cell} from '../components/GameBoard';


const Utils = {
	//console.log('this is the board:', board);
	isOnBoard(coords) {
		if (!coords.x || !coords.y) return false;
		//return coords.x >= 0 && coords.y >= 0 && coords.x < boardSize && coords.y < boardSize;
	},
	showme() {
		console.log('this is the board:', Board);
	}

};

export default Utils;