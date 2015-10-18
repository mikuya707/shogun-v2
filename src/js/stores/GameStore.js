'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter2 as EventEmitter} from 'eventemitter2';
import GameConstants from '../constants/GameConstants';
import ChessPieces from '../constants/ChessPieces';
import {Chess} from 'chess.js';
import {List, Map, OrderedMap, Set} from 'immutable';
import behavior from '../game/behavior';
//import Utils from '../game/utils';
// import behavior from '../game/behavior';

const CHANGE_EVENT = 'change';
const MOVE_EVENT = 'new-move';

var _gameOver;
var _capturedPieces;
var _moves;
var _promotion;
var _turn;
var _check;
var _lastMove;
var _chess;

var _board = {},
    _lightup = [],
    _selected,
    _drawn = [],
    _result;



setInitialState();

var GameStore = Object.assign({}, EventEmitter.prototype, {
    addChangeListener: function(cb) {
      this.on(CHANGE_EVENT, cb);
    },

    removeChangeListener: function(cb) {
      this.removeChangeListener(CHANGE_EVENT, cb);
    },
    getState() {
        return {
            gameOver: _gameOver,
            promotion: _promotion,
            turn: _turn,
            check: _check,
        };
    },
    getCapturedPieces() {
        return _capturedPieces;
    },
    getMoves() {
        return _moves;
    },
    getChessboardState() {
        return {
            fen: _chess.fen(),
            lastMove: _lastMove,
            check: _check
        };
    },


    getGameboardState() {
        return {
            board: _board,
            lightup: _lightup,
            selected: _selected,
            drawUnit: _result
        }
    },
    draw() {
        var units = [];

        Object.keys(behavior).forEach(function(unit){
            // console.log("what is the key of behavior?", unit);
            // console.log("what am i adding again??", behavior[`${unit}`]);
            if(_drawn.indexOf(behavior[`${unit}`]) === -1){
                var unitObj = {};
                unitObj[`${unit}`] = behavior[`${unit}`];
                units.push(unitObj);
            }
        });
        var result = units[Math.floor(Math.random()*units.length)];
        _drawn.push(result);
        _result = result;
    },

    getValidMoves(square) {
        return square ? Set(
            _chess.moves({
                square: square,
                verbose: true
            }).map(move => move.to)) : Set();
    },

    // showMoves(unit, from, inRange) {
    //      if (!Object.keys(_lightup).length) {
    //       inRange.filter(range => {
    //           return isValidMove(unit, range);
    //       }).forEach(move => {
    //           var coordsStr = `[${move.x}, ${move.y}]`;
    //           _lightup[coordsStr] = true;
    //       })
    //       _selected = {position: from, unit: unit};
    //     }
    //     else {
    //       console.log('else');
    //       _lightup = [];
    //       _selected = null;
    //     }
    //     //this.setState({_lightup: validMoves});

    //     return true;
    //     //console.log(this.getState());
    //     // console.log('valid Moves:')
    //     // console.log(validMoves);

    // }


});

function isOnBoard(coords) {
  if (!coords.hasOwnProperty('x') || !coords.hasOwnProperty('y')) return false;
  var coordsStr = `[${coords.y}, ${coords.x}]`
  //console.log('coordsStr:', coordsStr);
  //console.log('_board:', _board);
  // console.log(`on tile ${coordsStr}`, _board[coordsStr]);
  return coords.x >= 0 && coords.y >= 0 && coords.x < 6 && coords.y < 6;
}

function isValidMove(unit, coords) {
  var coordsStr = `[${coords.x}, ${coords.y}]`;
  var targetUnit = _board[coordsStr];

  if (targetUnit) {
    //console.log(`unit.color: ${unit.color}`);
    console.log(`targetUnit.color: ${targetUnit.color}`);
    if (unit.color === targetUnit.color) return false;
  }
  return isOnBoard(coords);
}

function setInitialState() {
    _gameOver = Map({
        status: false,
        type: null,
        winner: null
    });
    _capturedPieces = OrderedMap([
        ['w', List()],
        ['b', List()]
    ]);
    _moves = List();
    _promotion = 'q';
    _turn = 'w';
    _check = false;
    _lastMove = Map();
    _selected = null;
    //_chess = new Chess();

    _lightup = {};

    _board = {
        '[1, 0]': {unit: 'Footman', color: 'black', side: 'front'},
        '[2, 0]': {unit: 'Duke', color: 'black', side: 'front'},
        '[3, 0]': {unit: 'Footman', color: 'black', side: 'front'},
        '[2, 5]': {unit: 'Footman', color: 'white', side: 'front'},
        '[3, 5]': {unit: 'Duke', color: 'white', side: 'front'},
        '[4, 5]': {unit: 'Footman', color: 'white', side: 'front'}
    };

    for(var b in board){
        _drawn.push(b);
    }
}



function updateBoard(from, to) {
    var unit = _board[from];
    unit.side = (unit.side === 'front') ? 'back' : 'front';

    _board[from] = null;
    _board[to] = unit;
    _selected = null;

    return _board;
}

function makeMove(from, to, capture, emitMove) {
   
    updateBoard(from, to);

    if (emitMove) {
        GameStore.emit(MOVE_EVENT, {
            from: from,
            to: to,
            capture: capture,
            board: _board    
            //gameOver: _chess.game_over()
        });
    }

    return true;
}


function gameOver(options) {
    _gameOver = _gameOver
        .set('status', true)
        .set('winner', options.winner)
        .set('type', options.type);
}

AppDispatcher.register(payload => {
    const action = payload.action;
    let emitEvent = true;

    switch (action.actionType) {
        case GameConstants.MAKE_MOVE:
            emitEvent = makeMove(
                action.from, action.to, action.capture, action.emitMove);
            break;

        // case GameConstants.SHOW_MOVES:
        //     emitEvent = GameStore.showMoves(action.unit, action.from, action.inRange);
        //     break;

        case GameConstants.CHANGE_PROMOTION:
            _promotion = action.promotion;
            break;

        case GameConstants.DRAW:

            break;

        case GameConstants.GAME_OVER:
            gameOver(action.options);
            break;

        case GameConstants.REMATCH:
            setInitialState();
            break;

        default:
            return true;
    }

    if (emitEvent) {
        GameStore.emit(CHANGE_EVENT);
    }
    return true;
});

export default GameStore;
