'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter2 as EventEmitter} from 'eventemitter2';
import GameConstants from '../constants/GameConstants';
import {List, Map, OrderedMap, Set} from 'immutable';
import behavior from '../game/behavior';
import omit from 'lodash.omit';

const CHANGE_EVENT = 'change';
const MOVE_EVENT = 'new-move';

var _gameOver;
var _capturedPieces;
var _moves;
var _turn;
var _lastMove;

var _board, _lightup, _strike, _drop, _selected, _drawn = [], _result, _deck, _pendingDraw;


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
            turn: _turn,
        };
    },
    getCapturedPieces() {
        return _capturedPieces;
    },
    getMoves() {
        return _moves;
    },

    getGameboardState() {
        return {
            board: _board,
            lightup: _lightup,
            strike: _strike,
            drop: _drop,
            selected: _selected,
            drawUnit: _result,
            turn: _turn,
            lastMove: _lastMove,
            deck: _deck,
            pendingDraw: _pendingDraw,
            gameover: _gameOver
        }
    },

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
    _turn = 'w';
    _lastMove = Map();
    _selected = null;
    _pendingDraw = null;

    _lightup = {};
    _strike = {};
    _drop = {};

    _board = {
        '[1, 0]': {unit: 'Footman', color: 'black', side: 'front'},
        '[2, 0]': {unit: 'Duke', color: 'black', side: 'front'},
        '[3, 0]': {unit: 'Footman', color: 'black', side: 'front'},
        '[2, 5]': {unit: 'Footman', color: 'white', side: 'front'},     
        '[3, 5]': {unit: 'Duke', color: 'white', side: 'front'},
        '[4, 5]': {unit: 'Footman', color: 'white', side: 'front'},  
        // '[1, 5]': {unit: 'Footman', color: 'white', side: 'front'}, 
        // '[2, 5]': {unit: 'Wizard', color: 'white', side: 'back'},
        // '[3, 5]': {unit: 'Duke', color: 'black', side: 'front'},
        // '[5, 5]': {unit: 'Duke', color: 'white', side: 'back'}
    };

    _deck = [...Object.keys(omit(behavior, 'Duke', 'Oracle')), 'Pikeman', 'Pikeman'];
}

function updateBoard(from, to, type) {

    // if called by a move event, the from parameter will be a position on the board (i.e. a string)
    // if called by a draw event, the from parameter will be an actual unit (i.e. an object)

    if (typeof from === 'object') {         // draw event
        _board[to] = from;
        _drop = {};
        _pendingDraw = null;
        _lastMove = _lastMove.set('from', null);
        _lastMove = _lastMove.set('to', to);
    }

    else if (typeof from === 'string') {    // move event

        let unit = _board[from];
        _lastMove = _lastMove.set('from', from);

        unit.side = (unit.side === 'front') ? 'back' : 'front';

        if (type === 'move') {
          _board[from] = null;
          _board[to] = unit;
          _lastMove = _lastMove.set('to', to);
        }
        else if (type === 'strike') {
          _board[to] = null;
          _lastMove = _lastMove.set('to', from);
        }
        
        _selected = null;
        return _board;
    }
}

function makeMove(from, to, capture, type, emitMove) {
   
    updateBoard(from, to, type);

    _turn = _turn === 'w' ? 'b' : 'w';

        if (emitMove) {
            GameStore.emit(MOVE_EVENT, {
                from: from,
                to: to,
                capture: capture,
                type: type,   
                gameOver: isDukeDead()
            });
        }

    return true;
}



function draw() {
    let randomIndex = Math.floor(Math.random()*_deck.length);
    _pendingDraw = _deck.splice(randomIndex, 1)[0];       
    return true;
}

function isDukeDead() {
    let dukes = Object.keys(_board).filter(pos => _board[pos] && _board[pos].unit === "Duke")
        .map(pos => _board[pos].color);
    return dukes.length === 1;
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
                action.from, action.to, action.capture, action.type, action.emitMove);
            break;

        case GameConstants.DRAW:
            emitEvent = draw();
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
