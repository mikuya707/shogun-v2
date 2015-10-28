'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter2 as EventEmitter} from 'eventemitter2';
import GameConstants from '../constants/GameConstants';
import ChessPieces from '../constants/ChessPieces';
import {Chess} from 'chess.js';
import {List, Map, OrderedMap, Set} from 'immutable';
import behavior from '../game/behavior';
import omit from 'lodash.omit';

const CHANGE_EVENT = 'change';
const MOVE_EVENT = 'new-move';

var _gameOver;
var _capturedPieces;
var _moves;
var _moved;
var _turn;
var _check;
var _lastMove;
var _chess;

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
            check: _check,
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
            moved: _moved,
            deck: _deck,
            pendingDraw: _pendingDraw
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
    _moved = false;
    _check = false;
    _lastMove = Map();
    _selected = null;
    _pendingDraw = null;
    //_chess = new Chess();

    _lightup = {};
    _strike = {};
    _drop = {};

    _board = {
        // '[1, 2]': {unit: 'Wizard', color: 'black', side: 'front'},
        // '[2, 0]': {unit: 'Duke', color: 'black', side: 'front'},
        // '[2, 1]': {unit: 'Pikeman', color: 'black', side: 'front'},
        // '[1, 3]': {unit: 'Assassin', color: 'white', side: 'front'},
        // '[2, 4]': {unit: 'Longbowman', color: 'white', side: 'back'},
        // '[3, 5]': {unit: 'Footman', color: 'white', side: 'back'},
        // '[4, 5]': {unit: 'Footman', color: 'white', side: 'back'},
        // '[4, 4]': {unit: 'Ranger', color: 'black', side: 'back'},
        // '[3, 4]': {unit: 'Dragoon', color: 'white', side: 'front'},
        // '[1, 5]': {unit: 'Duke', color: 'white', side: 'front'}

        
        '[1, 0]': {unit: 'Footman', color: 'black', side: 'front'},
        '[2, 0]': {unit: 'Duke', color: 'black', side: 'front'},
        '[3, 0]': {unit: 'Footman', color: 'black', side: 'front'},
        '[2, 5]': {unit: 'Footman', color: 'white', side: 'front'},
        '[3, 5]': {unit: 'Duke', color: 'white', side: 'front'},
        '[4, 5]': {unit: 'Footman', color: 'white', side: 'front'},
        
    };

    _deck = [...Object.keys(omit(behavior, 'Duke')), 'Pikeman', 'Pikeman'];
    //console.log(_deck);
}

function moveToBoard() {


    if (emitMove) {
        GameStore.emit(MOVE_EVENT, {
            to: to,
            capture: capture,
            type: type,
            board: _board    
            //gameOver: _chess.game_over()
        });
    }

    return true;
}

function updateBoard(from, to, type) {

    // if called by a move event, the from parameter will be a position on the board (i.e. a string)
    // if called by a draw event, the from parameter will be an actual unit (i.e. an object)

    if (typeof from === 'object') {         // draw event
        _board[to] = from;
        _drop = {};
        _pendingDraw = null;
    }

    else if (typeof from === 'string') {    // move event

        let unit = _board[from];

        unit.side = (unit.side === 'front') ? 'back' : 'front';

        if (type === 'move') {
          _board[from] = null;
          _board[to] = unit;
        }
        else if (type === 'strike') {
          _board[to] = null;
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
            // board: _board    
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
    if (dukes.length === 1) {
        let winner = dukes[0];
        if (winner = 'white') winner = 'White';
        else if (winner = 'black') winner = 'Black';
        swal({
            title: `You win!`,
            text: 'Would you like to request a rematch?',
            type: 'success',
            showCancelButton: true,
            confirmButtonColor: "#00FFD2",
            confirmButtonText: "Yeah! :)",
            cancelButtonText: "Fuck that",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                swal("Nice!", "A rematch request has been sent (not really tho).", "success");
            } else {
                swal("Okay", "don't forget to donate", "success");
            }
        });
        GameStore.emit('swal-endgame', { winner });
    }
    


    return false;
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
