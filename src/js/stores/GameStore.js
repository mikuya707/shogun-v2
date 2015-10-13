'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter2 as EventEmitter} from 'eventemitter2';
import GameConstants from '../constants/GameConstants';
import ChessPieces from '../constants/ChessPieces';
import {Chess} from 'chess.js';
import {List, Map, OrderedMap, Set} from 'immutable';
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

var _board = {};

setInitialState();

const GameStore = Object.assign({}, EventEmitter.prototype, {
    getState() {
        return {
            gameOver: _gameOver,
            promotion: _promotion,
            turn: _turn,
            check: _check
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
            setup: _board
        }
    },


    getValidMoves(square) {
        return square ? Set(
            _chess.moves({
                square: square,
                verbose: true
            }).map(move => move.to)) : Set();
    },

    addChangeListener: function(cb) {
      this.on(CHANGE_EVENT, cb);
    },

    removeChangeListener: function(cb) {
      this.removeChangeListener(CHANGE_EVENT, cb);
    }



});

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
    _chess = new Chess();

    _board = {
        '[1, 0]': {unit: 'Footman', color: 'black'},
        '[2, 0]': {unit: 'Duke', color: 'black'},
        '[3, 0]': {unit: 'Footman', color: 'black'},
        '[2, 5]': {unit: 'Footman', color: 'white'},
        '[3, 5]': {unit: 'Duke', color: 'white'},
        '[4, 5]': {unit: 'Footman', color: 'white'}
    };
}

function draw() {

}

function makeMove(from, to, capture, emitMove) {
    const move = _chess.move({
        from: from,
        to: to,
        promotion: _promotion
    });

    if (!move) {
        // move is not valid, return false and don't emit any event.
        return false;
    }

    _turn = _chess.turn();
    _check = _chess.in_check();
    _lastMove = _lastMove.set('from', from).set('to', to);
    _moves = _moves.isEmpty() || _moves.last().size === 2 ?
        _moves.push(List([move.san])) :
        _moves.update(_moves.size - 1, list => list.push(move.san));

    if (capture || move.flags === 'e') {
        const capturedPiece = capture ||
            ChessPieces[_turn === 'w' ? 'P' : 'p']; // en passant

        _capturedPieces = _capturedPieces
            .update(_turn, list => list.push(capturedPiece));
    }

    if (_chess.game_over()) {
        const type = _chess.in_checkmate() ? 'checkmate' :
            _chess.in_stalemate() ? 'stalemate' :
            _chess.in_threefold_repetition() ? 'threefoldRepetition' :
            _chess.insufficient_material() ? 'insufficientMaterial' :
            _chess.in_draw() ? 'draw' : null;

        gameOver({
            winner: _turn === 'b' ? 'White' : 'Black',
            type: type
        });
    }

    if (emitMove) {
        GameStore.emit(MOVE_EVENT, {
            from: from,
            to: to,
            capture: capture,
            gameOver: _chess.game_over()
        });
    }

    return true;
}

function showMoves(unit, from, inRange) {
  console.log(unit);
    console.log(from);

    return inRange.filter(range => {
      return isValidMove(unit, range);
    })
    // console.log('valid Moves:')
    // console.log(validMoves);

    //console.log(`inRange: ${inRange}`);
    //console.log(`utils: ${Utils.showme()}`);
}

function isOnBoard(coords) {
  if (!coords.x || !coords.y) return false;
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

        case GameConstants.SHOW_MOVES:
            emitEvent = showMoves(action.unit, action.from, action.inRange);
            break;

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
