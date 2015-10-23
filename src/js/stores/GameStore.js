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
    _strike = [],
    _drop = [],
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
            strike: _strike,
            drop: _drop,
            selected: _selected,
            drawUnit: _result
        }
    },

    draw() {
        //'[1, 0]': {unit: 'Footman', color: 'black', side: 'front'},
        var units = [];
           
        Object.keys(behavior).forEach(function(unit){
            // console.log("what is the key of behavior?", unit);
            // console.log("what am i adding again??", behavior[`${unit}`]);
            if(_drawn.indexOf(behavior[`${unit}`]) === -1 && unit !== 'Duke'){
                var unitObj = {};
                unitObj[`${unit}`] = behavior[`${unit}`];
                units.push(unitObj);
            }
            else{
                var pikeCounts = 0;
                _drawn.forEach(function(unit){
                     
                    if(Object.keys(unit)[0] === 'Pikeman'){
                        pikeCounts += 1;
                    }
                })
                if(unit === 'Pikeman' && pikeCounts < 3){
                    var i = 3 - pikeCounts;
                    while(i > 0){
                        var unitObj = {};
                         unitObj[`${unit}`] = behavior[`${unit}`];
                         units.push(unitObj);
                         i--;
                    }
                }
            }
        });
        var result = units[Math.floor(Math.random()*units.length)];
        _drawn.push(result);
        var resultToReturn = {};
        resultToReturn['[-1, -1]'] = {unit: `${Object.keys(result)[0]}`, color: 'white', side: 'front'};
        _result = resultToReturn;
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
    _promotion = 'q';
    _turn = 'w';
    _check = false;
    _lastMove = Map();
    _selected = null;
    //_chess = new Chess();

    _lightup = {};
    _strike = {};
    _drop = {};

    _board = {
        '[1, 0]': {unit: 'Footman', color: 'black', side: 'front'},
        '[2, 0]': {unit: 'Duke', color: 'black', side: 'front'},
        '[3, 0]': {unit: 'Footman', color: 'black', side: 'front'},
        '[2, 5]': {unit: 'Footman', color: 'white', side: 'front'},
        '[3, 5]': {unit: 'Duke', color: 'white', side: 'front'},
        '[4, 5]': {unit: 'Footman', color: 'white', side: 'front'}
    };

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
    console.log("where is from", from);
    console.log("where is to", to);
     var unit;
    if(from === '[-1, -1]'){
         console.log("what is unit after drop?", _result);
         console.log("what is unit after drop?", _result[from]);
         _result[from].side = 'front';
         _board[to] = _result[from];

         //unit = _result;

     // _board[from] = null;
     // _board[to] = unit;
    //console.log("what are the true drops ?", _drop);
    _drop = null;
    _selected = null;
    return _board;
    
    }
    else{
         unit = _board[from];

    
    //console.log("what is unit after drop?", unit);
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

    if (emitMove) {
        GameStore.emit(MOVE_EVENT, {
            from: from,
            to: to,
            capture: capture,
            type: type,
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
                action.from, action.to, action.capture, action.type, action.emitMove);
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
