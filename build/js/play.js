(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/js/play.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

require("es6-shim");

var React = _interopRequire(require("react"));

var io = _interopRequire(require("./io"));

var GameInterface = _interopRequire(require("./components/GameInterface"));

var params = window.location.pathname.replace("/play/", "").split("/");
params[1] = parseInt(params[1], 10);
params[2] = parseInt(params[2], 10);

React.render(React.createElement(GameInterface, { io: io, params: params }), document.getElementById("container"));

},{"./components/GameInterface":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\GameInterface.js","./io":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\io.js","es6-shim":"es6-shim","react":"react"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\browserify\\node_modules\\os-browserify\\browser.js":[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

},{}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\browserify\\node_modules\\process\\browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\classnames\\index.js":[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

function classNames() {
	var classes = '';
	var arg;

	for (var i = 0; i < arguments.length; i++) {
		arg = arguments[i];
		if (!arg) {
			continue;
		}

		if ('string' === typeof arg || 'number' === typeof arg) {
			classes += ' ' + arg;
		} else if (Object.prototype.toString.call(arg) === '[object Array]') {
			classes += ' ' + classNames.apply(null, arg);
		} else if ('object' === typeof arg) {
			for (var key in arg) {
				if (!arg.hasOwnProperty(key) || !arg[key]) {
					continue;
				}
				classes += ' ' + key;
			}
		}
	}
	return classes.substr(1);
}

// safely export classNames for node / browserify
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}

// safely export classNames for RequireJS
if (typeof define !== 'undefined' && define.amd) {
	define('classnames', [], function() {
		return classNames;
	});
}

},{}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\react\\lib\\invariant.js":[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if ("production" !== "development") {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

},{}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\react\\lib\\keyMirror.js":[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyMirror
 * @typechecks static-only
 */

'use strict';

var invariant = require("./invariant");

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function(obj) {
  var ret = {};
  var key;
  ("production" !== "development" ? invariant(
    obj instanceof Object && !Array.isArray(obj),
    'keyMirror(...): Argument must be an object.'
  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;

},{"./invariant":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\react\\lib\\invariant.js"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\actions\\ChatActions.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var ChatConstants = _interopRequire(require("../constants/ChatConstants"));

var AppDispatcher = _interopRequire(require("../dispatcher/AppDispatcher"));

var ChatActions = {
  toggleVisibility: function toggleVisibility() {
    AppDispatcher.handleViewAction({
      actionType: ChatConstants.TOGGLE_VISIBILITY
    });
  },
  submitMessage: function submitMessage(message, className, received) {
    AppDispatcher.handleViewAction({
      actionType: ChatConstants.SUBMIT_MESSAGE,
      message: message,
      className: className,
      received: received
    });
  }
};

module.exports = ChatActions;

},{"../constants/ChatConstants":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\constants\\ChatConstants.js","../dispatcher/AppDispatcher":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\dispatcher\\AppDispatcher.js"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\actions\\GameActions.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var GameConstants = _interopRequire(require("../constants/GameConstants"));

var AppDispatcher = _interopRequire(require("../dispatcher/AppDispatcher"));

var GameActions = {
  makeMove: function makeMove(from, to, capture, type, emitMove) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.MAKE_MOVE,
      from: from,
      to: to,
      capture: capture,
      type: type,
      emitMove: emitMove
    });
  },
  showMoves: function showMoves(unit, from, inRange) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.SHOW_MOVES,
      unit: unit,
      from: from,
      inRange: inRange
    });
  },
  draw: function draw() {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.DRAW
    });
  },
  rematch: function rematch() {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.REMATCH
    });
  },
  gameOver: function gameOver(options) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.GAME_OVER,
      options: options
    });
  },
  changePromotion: function changePromotion(promotion) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.CHANGE_PROMOTION,
      promotion: promotion
    });
  }
};

module.exports = GameActions;

},{"../constants/GameConstants":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\constants\\GameConstants.js","../dispatcher/AppDispatcher":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\dispatcher\\AppDispatcher.js"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\CapturedPieces.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react/addons"));

var GameStore = _interopRequire(require("../stores/GameStore"));

var onGameChange = _interopRequire(require("../mixins/onGameChange"));

var CapturedPieces = React.createClass({
  displayName: "CapturedPieces",

  mixins: [React.addons.PureRenderMixin, onGameChange],

  getInitialState: function getInitialState() {
    return {
      capturedPieces: GameStore.getCapturedPieces()
    };
  },
  render: function render() {
    var cp = this.state.capturedPieces;

    return React.createElement(
      "div",
      { id: "captured-pieces" },
      cp.map(function (pieces, color) {
        return React.createElement(
          "ul",
          { key: color },
          pieces.map(function (piece, i) {
            return React.createElement(
              "li",
              { key: i },
              piece
            );
          }).toArray()
        );
      }).toArray()
    );
  },
  _onGameChange: function _onGameChange() {
    this.setState({
      capturedPieces: GameStore.getCapturedPieces()
    });
  }
});

module.exports = CapturedPieces;

},{"../mixins/onGameChange":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\mixins\\onGameChange.js","../stores/GameStore":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\stores\\GameStore.js","react/addons":"react/addons"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\Chat.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react/addons"));

var ChatStore = _interopRequire(require("../stores/ChatStore"));

var ChatActions = _interopRequire(require("../actions/ChatActions"));

var Chat = React.createClass({
  displayName: "Chat",

  propTypes: {
    io: React.PropTypes.object.isRequired,
    token: React.PropTypes.string.isRequired,
    color: React.PropTypes.oneOf(["white", "black"]).isRequired,
    // soundsEnabled: React.PropTypes.bool.isRequired,
    isOpponentAvailable: React.PropTypes.bool.isRequired,
    openModal: React.PropTypes.func.isRequired
  },
  mixins: [React.addons.PureRenderMixin],

  getInitialState: function getInitialState() {
    var state = ChatStore.getState();
    return {
      isChatHidden: state.isChatHidden,
      messages: state.messages,
      message: "" };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    this.props.io.on("receive-message", function (data) {
      ChatActions.submitMessage(data.message, data.color + " left", true);
      _this._maybePlaySound();
    });
    ChatStore.on("change", this._onChatStoreChange);

    if (window.innerWidth > 1399) ChatActions.toggleVisibility();
  },
  componentWillUnmount: function componentWillUnmount() {
    ChatStore.off("change", this._onChatStoreChange);
  },
  render: function render() {
    return React.createElement(
      "div",
      { id: "chat-wrapper",
        className: this.state.isChatHidden ? "hidden" : null },
      React.createElement(
        "h4",
        null,
        "Chat"
      ),
      React.createElement(
        "a",
        { className: "close",
          onClick: ChatActions.toggleVisibility },
        "x"
      ),
      React.createElement(
        "audio",
        { preload: "auto", ref: "msgSnd" },
        React.createElement("source", { src: "/snd/message.mp3" })
      ),
      React.createElement(
        "ul",
        { id: "chat-list", ref: "chat" },
        this.state.messages.map(function (message, i) {
          return React.createElement(
            "li",
            { key: i, className: message.get("className") },
            message.get("message")
          );
        }).toArray()
      ),
      React.createElement(
        "span",
        null,
        "Write your message:"
      ),
      React.createElement(
        "form",
        { id: "chat-form",
          onSubmit: this._submitMessage },
        React.createElement("input", { type: "text",
          ref: "message",
          className: this.props.color,
          required: true,
          value: this.state.message,
          onChange: this._onChangeMessage })
      )
    );
  },
  _onChatStoreChange: function _onChatStoreChange() {
    this.setState(ChatStore.getState(), this._scrollChat);
  },
  _onChangeMessage: function _onChangeMessage(e) {
    this.setState({ message: e.target.value });
  },
  _submitMessage: function _submitMessage(e) {
    e.preventDefault();
    var _props = this.props;
    var io = _props.io;
    var token = _props.token;
    var color = _props.color;
    var isOpponentAvailable = _props.isOpponentAvailable;

    var message = this.state.message;

    if (!isOpponentAvailable) {
      this.refs.message.getDOMNode().blur();
      this.props.openModal("info", "Sorry, your opponent is not connected. " + "You can‘t send messages.");
      return;
    }

    ChatActions.submitMessage(message, color + " right", false);
    this.setState({ message: "" });

    io.emit("send-message", {
      message: message,
      color: color,
      token: token
    });
  },
  _scrollChat: function _scrollChat() {
    var chatNode = this.refs.chat.getDOMNode();
    chatNode.scrollTop = chatNode.scrollHeight;
  },
  _maybePlaySound: function _maybePlaySound() {}
});

module.exports = Chat;

// if (this.props.soundsEnabled) {
//   this.refs.msgSnd.getDOMNode().play();
// }

},{"../actions/ChatActions":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\actions\\ChatActions.js","../stores/ChatStore":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\stores\\ChatStore.js","react/addons":"react/addons"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\Chessboard.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = _interopRequire(require("react/addons"));

var GameStore = _interopRequire(require("../stores/GameStore"));

var GameActions = _interopRequire(require("../actions/GameActions"));

var ChessPieces = _interopRequire(require("../constants/ChessPieces"));

var onGameChange = _interopRequire(require("../mixins/onGameChange"));

var maybeReverse = _interopRequire(require("../mixins/maybeReverse"));

var omit = _interopRequire(require("lodash.omit"));

var cx = _interopRequire(require("classnames"));

var _immutable = require("immutable");

var Seq = _immutable.Seq;
var Repeat = _immutable.Repeat;
var List = _immutable.List;
var Set = _immutable.Set;

var FILES = Seq.Indexed("abcdefgh");
var RANKS = Seq.Indexed("12345678");

var Chessboard = React.createClass({
  displayName: "Chessboard",

  propTypes: {
    io: React.PropTypes.object.isRequired,
    token: React.PropTypes.string.isRequired,
    maybePlaySound: React.PropTypes.func.isRequired,
    color: React.PropTypes.oneOf(["white", "black"]).isRequired,
    gameOver: React.PropTypes.bool.isRequired,
    isOpponentAvailable: React.PropTypes.bool.isRequired
  },
  mixins: [React.addons.PureRenderMixin, maybeReverse],

  getInitialState: function getInitialState() {
    var state = GameStore.getChessboardState();

    return {
      fen: state.fen,
      moveFrom: null,
      lastMove: state.lastMove,
      kingInCheck: false
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var _props = this.props;
    var io = _props.io;
    var token = _props.token;

    GameStore.on("change", this._onGameChange);
    GameStore.on("new-move", this._onNewMove);

    io.on("move", function (data) {
      GameActions.makeMove(data.from, data.to, data.capture, false);
      _this.props.maybePlaySound();

      if (!data.gameOver) {
        _this._runClock();
      }

      if (document.hidden) {
        var title = document.getElementsByTagName("title")[0];
        title.text = "* " + title.text;

        window.addEventListener("focus", _this._removeAsteriskFromTitle);
      }
    });

    io.on("rematch-accepted", function () {
      return _this.setState({ moveFrom: null });
    });
  },
  componentWillUnmount: function componentWillUnmount() {
    GameStore.off("change", this._onGameChange);
    GameStore.on("new-move", this._onNewMove);
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var color = _props.color;
    var isOpponentAvailable = _props.isOpponentAvailable;
    var gameOver = _props.gameOver;
    var _state = this.state;
    var fen = _state.fen;
    var moveFrom = _state.moveFrom;
    var lastMove = _state.lastMove;
    var kingInCheck = _state.kingInCheck;

    var fenArray = fen.split(" ");
    var placement = fenArray[0];
    var isItMyTurn = fenArray[1] === color.charAt(0);
    var rows = this._maybeReverse(placement.split("/"));
    var ranks = this._maybeReverse(RANKS, "white");

    return React.createElement(
      "table",
      { className: "chessboard" },
      rows.map(function (placement, i) {
        return React.createElement(Row, {
          key: i,
          rank: ranks.get(i),
          placement: placement,
          color: color,
          isMoveable: isItMyTurn && isOpponentAvailable && !gameOver,
          moveFrom: moveFrom,
          lastMove: lastMove,
          setMoveFrom: _this._setMoveFrom,
          kingInCheck: kingInCheck,
          validMoves: GameStore.getValidMoves(moveFrom) });
      })
    );
  },
  _onGameChange: function _onGameChange(cb) {
    var state = GameStore.getChessboardState();
    this.setState({
      fen: state.fen,
      lastMove: state.lastMove,
      kingInCheck: state.check && (state.fen.split(" ")[1] === "w" ? "K" : "k")
    }, cb);
  },
  _setMoveFrom: function _setMoveFrom(square) {
    this.setState({
      moveFrom: square
    });
  },
  _onNewMove: function _onNewMove(move) {
    var _props = this.props;
    var io = _props.io;
    var token = _props.token;

    io.emit("new-move", {
      token: token,
      move: move
    });

    setTimeout(this.props.maybePlaySound, 0);
  },
  _runClock: function _runClock() {
    var _props = this.props;
    var io = _props.io;
    var token = _props.token;
    var color = _props.color;

    io.emit("clock-run", {
      token: token,
      color: color
    });
  },
  _removeAsteriskFromTitle: function _removeAsteriskFromTitle() {
    var title = document.getElementsByTagName("title")[0];
    title.text = title.text.replace("* ", "");
    window.removeEventListener("focus", this._removeAsteriskFromTitle);
  }
});

var Row = React.createClass({
  displayName: "Row",

  propTypes: {
    rank: React.PropTypes.oneOf(["1", "2", "3", "4", "5", "6", "7", "8"]).isRequired,
    placement: React.PropTypes.string.isRequired,
    color: React.PropTypes.oneOf(["white", "black"]).isRequired,
    isMoveable: React.PropTypes.bool.isRequired,
    moveFrom: React.PropTypes.string,
    lastMove: React.PropTypes.object,
    setMoveFrom: React.PropTypes.func.isRequired,
    kingInCheck: React.PropTypes.oneOf([false, "K", "k"]).isRequired,
    validMoves: React.PropTypes.instanceOf(Set).isRequired
  },
  mixins: [maybeReverse],

  render: function render() {
    var _this = this;

    var _props = this.props;
    var rank = _props.rank;
    var placement = _props.placement;
    var color = _props.color;

    var files = this._maybeReverse(FILES);
    var pieces = this._maybeReverse(placement.length < 8 ? Seq(placement).flatMap(function (piece) {
      return /^\d$/.test(piece) ? Repeat("-", parseInt(piece, 10)) : piece;
    }).toArray() : placement.split(""));

    return React.createElement(
      "tr",
      null,
      pieces.map(function (piece, i) {
        return React.createElement(Column, _extends({
          key: i,
          square: files.get(i) + rank,
          piece: piece
        }, omit(_this.props, "rank", "placement")));
      })
    );
  }
});

var Column = React.createClass({
  displayName: "Column",

  propTypes: {
    square: React.PropTypes.string.isRequired,
    piece: React.PropTypes.string.isRequired,
    color: React.PropTypes.oneOf(["white", "black"]).isRequired,
    isMoveable: React.PropTypes.bool.isRequired,
    moveFrom: React.PropTypes.string,
    lastMove: React.PropTypes.object,
    setMoveFrom: React.PropTypes.func.isRequired,
    kingInCheck: React.PropTypes.oneOf([false, "K", "k"]).isRequired,
    validMoves: React.PropTypes.instanceOf(Set).isRequired
  },

  render: function render() {
    var _props = this.props;
    var moveFrom = _props.moveFrom;
    var lastMove = _props.lastMove;
    var square = _props.square;
    var color = _props.color;
    var isMoveable = _props.isMoveable;
    var kingInCheck = _props.kingInCheck;
    var validMoves = _props.validMoves;

    var piece = ChessPieces[this.props.piece];
    var rgx = color === "white" ? /^[KQRBNP]$/ : /^[kqrbnp]$/;
    var isDraggable = rgx.test(this.props.piece);
    var isDroppable = moveFrom && validMoves.has(square);

    return React.createElement(
      "td",
      { className: cx({
          selected: moveFrom === square && !validMoves.isEmpty(),
          from: lastMove.get("from") === square,
          to: lastMove.get("to") === square,
          droppable: isDroppable
        }),
        onClick: !piece ? this._onClickSquare : null,
        onDragOver: isDroppable ? this._onDragOver : null,
        onDrop: isDroppable ? this._onDrop : null },
      piece ? React.createElement(
        "a",
        { className: kingInCheck === this.props.piece ? "in-check" : null,
          onClick: this._onClickSquare,
          onDragStart: this._onDragStart,
          draggable: isDraggable && isMoveable },
        piece
      ) : null
    );
  },
  _onClickSquare: function _onClickSquare() {
    var _props = this.props;
    var isMoveable = _props.isMoveable;
    var color = _props.color;
    var moveFrom = _props.moveFrom;
    var square = _props.square;
    var piece = _props.piece;

    var rgx = color === "white" ? /^[KQRBNP]$/ : /^[kqrbnp]$/;

    if (!isMoveable || !moveFrom && !rgx.test(piece)) {
      return;
    } else if (moveFrom && moveFrom === square) this.props.setMoveFrom(null);else if (rgx.test(piece)) this.props.setMoveFrom(square);else GameActions.makeMove(moveFrom, square, ChessPieces[piece], true);
  },
  _onDragStart: function _onDragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    // setData is required by firefox
    e.dataTransfer.setData("text/plain", "");

    this.props.setMoveFrom(this.props.square);
  },
  _onDragOver: function _onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  },
  _onDrop: function _onDrop(e) {
    e.preventDefault();
    var _props = this.props;
    var moveFrom = _props.moveFrom;
    var square = _props.square;
    var piece = _props.piece;

    GameActions.makeMove(moveFrom, square, ChessPieces[piece], true);
  }
});

module.exports = Chessboard;

},{"../actions/GameActions":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\actions\\GameActions.js","../constants/ChessPieces":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\constants\\ChessPieces.js","../mixins/maybeReverse":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\mixins\\maybeReverse.js","../mixins/onGameChange":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\mixins\\onGameChange.js","../stores/GameStore":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\stores\\GameStore.js","classnames":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\classnames\\index.js","immutable":"immutable","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\ChessboardInterface.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = _interopRequire(require("react/addons"));

var GameStore = _interopRequire(require("../stores/GameStore"));

var GameActions = _interopRequire(require("../actions/GameActions"));

var onGameChange = _interopRequire(require("../mixins/onGameChange"));

var Chessboard = _interopRequire(require("./Chessboard"));

var CapturedPieces = _interopRequire(require("./CapturedPieces"));

var TableOfMoves = _interopRequire(require("./TableOfMoves"));

var omit = _interopRequire(require("lodash.omit"));

var ChessboardInterface = React.createClass({
  displayName: "ChessboardInterface",

  propTypes: {
    io: React.PropTypes.object.isRequired,
    token: React.PropTypes.string.isRequired,
    soundsEnabled: React.PropTypes.bool.isRequired,
    color: React.PropTypes.oneOf(["white", "black"]).isRequired,
    gameOver: React.PropTypes.object.isRequired,
    isOpponentAvailable: React.PropTypes.bool.isRequired
  },
  mixins: [React.addons.PureRenderMixin, onGameChange],

  getInitialState: function getInitialState() {
    return GameStore.getState();
  },
  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (this.props.gameOver.get("status") && !prevProps.gameOver.get("status")) {
      this.props.openModal("info", this._getGameOverMessage());
    }
  },
  render: function render() {
    var _state = this.state;
    var promotion = _state.promotion;
    var turn = _state.turn;
    var gameOver = _state.gameOver;
    var check = _state.check;

    return React.createElement(
      "div",
      { id: "board-moves-wrapper", className: "clearfix" },
      React.createElement(
        "audio",
        { preload: "auto", ref: "moveSnd" },
        React.createElement("source", { src: "/snd/move.mp3" })
      ),
      React.createElement(
        "audio",
        { preload: "auto", ref: "checkSnd" },
        React.createElement("source", { src: "/snd/check.mp3" })
      ),
      React.createElement(
        "div",
        { id: "board-wrapper" },
        React.createElement(CapturedPieces, null),
        React.createElement(Chessboard, _extends({}, omit(this.props, "soundsEnabled", "gameOver"), {
          gameOver: gameOver.get("status"),
          maybePlaySound: this._maybePlaySound }))
      ),
      React.createElement(TableOfMoves, null),
      React.createElement(
        "span",
        { className: "promotion" },
        React.createElement(
          "label",
          null,
          React.createElement(
            "span",
            null,
            "Promotion: "
          ),
          React.createElement(
            "select",
            { value: promotion,
              onChange: this._onPromotionChange },
            React.createElement(
              "option",
              { value: "q" },
              "Queen"
            ),
            React.createElement(
              "option",
              { value: "r" },
              "Rook"
            ),
            React.createElement(
              "option",
              { value: "b" },
              "Bishop"
            ),
            React.createElement(
              "option",
              { value: "n" },
              "Knight"
            )
          )
        )
      ),
      React.createElement(
        "span",
        { className: "feedback" },
        !gameOver.get("status") ? React.createElement(
          "span",
          null,
          React.createElement(
            "span",
            { className: "icon" },
            turn === "w" ? "F" : "f"
          ),
          "" + (turn === "w" ? "White" : "Black") + " to move.",
          check ? React.createElement(
            "strong",
            null,
            " Check."
          ) : null
        ) : React.createElement(
          "strong",
          null,
          React.createElement(
            "span",
            { className: "icon" },
            gameOver.get("winner") === "White" ? "F" : "f"
          ),
          this._getGameOverMessage()
        )
      )
    );
  },
  _onGameChange: function _onGameChange() {
    this.setState(GameStore.getState());
  },
  _onPromotionChange: function _onPromotionChange(e) {
    GameActions.changePromotion(e.target.value);
  },
  _maybePlaySound: function _maybePlaySound() {
    if (this.props.soundsEnabled) {
      this.refs[this.state.check ? "checkSnd" : "moveSnd"].getDOMNode().play();
    }
  },
  _getGameOverMessage: function _getGameOverMessage() {
    var type = this.props.gameOver.get("type");
    var winner = this.props.gameOver.get("winner");
    var loser = winner === "White" ? "Black" : "White";

    return type === "checkmate" ? "Checkmate. " + winner + " wins!" : type === "timeout" ? "" + loser + "‘s time is out. " + winner + " wins!" : type === "resign" ? "" + loser + " has resigned. " + winner + " wins!" : type === "draw" ? "Draw." : type === "stalemate" ? "Draw (Stalemate)." : type === "threefoldRepetition" ? "Draw (Threefold Repetition)." : type === "insufficientMaterial" ? "Draw (Insufficient Material)" : "";
  }
});

module.exports = ChessboardInterface;
/* F -> white king, f -> black king*/

},{"../actions/GameActions":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\actions\\GameActions.js","../mixins/onGameChange":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\mixins\\onGameChange.js","../stores/GameStore":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\stores\\GameStore.js","./CapturedPieces":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\CapturedPieces.js","./Chessboard":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\Chessboard.js","./TableOfMoves":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\TableOfMoves.js","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\Clock.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var React = _interopRequire(require("react/addons"));

var GameActions = _interopRequire(require("../actions/GameActions"));

var PureRenderMixin = React.addons.PureRenderMixin;

var Clock = React.createClass({
  displayName: "Clock",

  propTypes: {
    io: React.PropTypes.object.isRequired,
    params: React.PropTypes.array.isRequired
  },
  mixins: [PureRenderMixin],

  getInitialState: function getInitialState() {
    var _props$params = _slicedToArray(this.props.params, 3);

    var _ = _props$params[0];
    var time = _props$params[1];
    var inc = _props$params[2];

    return {
      white: time * 60,
      black: time * 60,
      inc: inc,
      countdown: null
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var io = this.props.io;

    io.on("countdown", function (data) {
      return _this.setState((function () {
        var _setState = {};

        _defineProperty(_setState, data.color, data.time);

        _defineProperty(_setState, "countdown", data.color);

        return _setState;
      })());
    });

    io.on("countdown-gameover", function (data) {
      _this.setState({ countdown: null });
      GameActions.gameOver({
        type: "timeout",
        winner: data.color === "black" ? "White" : "Black"
      });
    });

    io.on("rematch-accepted", function () {
      _this.setState({
        white: _this.props.params[1] * 60,
        black: _this.props.params[1] * 60
      });
    });
  },
  render: function render() {
    return React.createElement(
      "ul",
      { id: "clock" },
      React.createElement(Timer, {
        color: "white",
        time: this.state.white,
        countdown: this.state.countdown }),
      React.createElement(Timer, {
        color: "black",
        time: this.state.black,
        countdown: this.state.countdown })
    );
  }
});

var Timer = React.createClass({
  displayName: "Timer",

  mixins: [PureRenderMixin],

  render: function render() {
    var _props = this.props;
    var time = _props.time;
    var color = _props.color;
    var countdown = _props.countdown;

    var min = Math.floor(time / 60);
    var sec = time % 60;
    var timeLeft = "" + min + ":" + (sec < 10 ? "0" + sec : sec);

    return React.createElement(
      "li",
      { className: color + (color === countdown ? " ticking" : "") },
      timeLeft
    );
  }
});

module.exports = Clock;

},{"../actions/GameActions":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\actions\\GameActions.js","react/addons":"react/addons"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\GameBoard.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var React = _interopRequire(require("react/addons"));

var GameStore = _interopRequire(require("../stores/GameStore"));

var GameActions = _interopRequire(require("../actions/GameActions"));

//import onGameChange from '../mixins/onGameChange';

var maybeReverse = _interopRequire(require("../mixins/maybeReverse"));

var behavior = _interopRequire(require("../game/behavior"));

var omit = _interopRequire(require("lodash.omit"));

var cx = _interopRequire(require("classnames"));

var GameBoard = React.createClass({
	displayName: "GameBoard",

	propTypes: {},
	mixins: [maybeReverse],
	getInitialState: function getInitialState() {
		this.state = GameStore.getGameboardState();
		return this.state;
	},

	_onButtonClick: function _onButtonClick() {
		var _this = this;

		var color = this.props.color;var _state = this.state;
		var turn = _state.turn;
		var deck = _state.deck;

		if (turn !== color.charAt(0) || this.state.pendingDraw) {
			return;
		}var board = this.state.board;

		if (color === "black") board = this._reverseBoard(board);
		var dukePosition = Object.keys(board).find(function (pos) {
			return board[pos] && board[pos].unit === "Duke" && board[pos].color === color;
		});
		var dukePosArr = JSON.parse(dukePosition);

		var droppableTiles = {};
		[[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(function (adj) {
			var adjX = dukePosArr[0] + adj[0],
			    adjY = dukePosArr[1] + adj[1];
			if (_this._isOnBoard({ x: adjX, y: adjY }) && !board["[" + adjX + ", " + adjY + "]"]) droppableTiles["[" + adjX + ", " + adjY + "]"] = true;
		});

		if (!Object.keys(droppableTiles).length) {
			swal("Can't let you draw that", "No available tiles adjacent to the Duke!", "error");
		} else {
			if (deck.length) {
				GameActions.draw();
				var theDrawnUnit = GameStore.getGameboardState().pendingDraw;
				this.setState({
					drop: droppableTiles,
					pendingDraw: {
						unit: theDrawnUnit,
						color: this.props.color,
						side: "front"
					}
				});
			} else swal("Can't let you draw that", "No units left to draw!", "error");
		}
	},

	_onDrawCellClick: function _onDrawCellClick() {
		var newDrawn;
		var drawnUnit = document.getElementById("drawnUnit");
		var classes = drawnUnit.className;

		if (classes.includes("front")) {
			drawnUnit.classList.remove("front");
			drawnUnit.classList.add("back");
		} else {
			drawnUnit.classList.remove("back");
			drawnUnit.classList.add("front");
		}
	},

	componentDidMount: function componentDidMount() {
		var _this = this;

		var _props = this.props;
		var io = _props.io;
		var token = _props.token;
		var gameover = _props.gameover;

		GameStore.on("change", this._onGameChange);
		GameStore.on("new-move", this._onNewMove);
		GameStore.on("swal-endgame", this._onGameOver);

		io.on("move", function (data) {
			GameActions.makeMove(data.from, data.to, data.capture, data.type, false);

			if (!data.gameOver) {
				_this._runClock();
			}

			if (document.hidden) {
				var title = document.getElementsByTagName("title")[0];
				title.text = "* " + title.text;

				window.addEventListener("focus", _this._removeAsteriskFromTitle);
			}
		});

		// io.on('swal-gameover', data => {
		// 	let winner = data.winner;
		// 	swal({
		// 		title: 'You lose!',
		// 		text: 'Better luck next time!',
		// 		//imageUrl: 'http://vignette2.wikia.nocookie.net/dickfigures/images/d/d0/Troll-Face-Dancing1.jpg/revision/latest?cb=20121112150543'
		// 		imageUrl: 'https://iampierremenard.files.wordpress.com/2014/02/sad-dog.jpg'
		// 	});
		// })
	},

	componentWillUnmount: function componentWillUnmount() {
		GameStore.removeChangeListener(this._onChange);
	},

	_reversePosition: function _reversePosition(pos) {
		var size = this.props.size;

		var posArr = JSON.parse(pos);
		return "[" + (size - 1 - posArr[0]) + ", " + (size - 1 - posArr[1]) + "]";
	},

	_reverseBoard: function _reverseBoard() {
		var _this = this;

		var board = this.state.board;

		var newBoard = {};
		Object.keys(board).forEach(function (pos) {
			newBoard[_this._reversePosition(pos)] = board[pos];
		});
		return newBoard;
	},

	_onGameChange: function _onGameChange(cb) {
		var state = GameStore.getGameboardState();
		this.setState({
			board: state.board,
			lightup: state.lightup,
			strike: state.strike,
			drop: state.drop,
			selected: state.selected,
			drawUnit: state.drawUnit,
			turn: state.turn,
			pendingDraw: state.pendingDraw
		}, cb);
	},

	_onNewMove: function _onNewMove(move) {
		var _props = this.props;
		var io = _props.io;
		var token = _props.token;
		var color = _props.color;

		io.emit("new-move", { token: token, move: move, color: color });
	},

	_onGameOver: function _onGameOver(_ref) {
		var winner = _ref.winner;
		var _props = this.props;
		var io = _props.io;
		var token = _props.token;
		var gameover = this.props.gameover;

		io.emit("swal-endgame", { token: token, winner: winner });
	},

	render: function render() {
		var _this = this;

		var _ref = this;

		var state = _ref.state;
		var props = _ref.props;var size = props.size;
		var color = props.color;

		var gameover = props.gameover;var board = state.board;
		var selected = state.selected;
		var lightup = state.lightup;
		var strike = state.strike;
		var drop = state.drop;
		var turn = state.turn;
		var drawn = state.drawn;
		var pendingDraw = state.pendingDraw;

		if (color === "black") board = this._reverseBoard();

		var cellArray = [];
		for (var i = 0; i < size; i++) {
			var row = [];
			for (var j = 0; j < size; j++) {
				row.push({ x: j, y: i });
			}
			cellArray.push(row);
		}

		return React.createElement(
			"div",
			null,
			React.createElement(
				"table",
				{ className: "board" },
				cellArray.map(function (row, idx1) {
					return React.createElement(
						"tr",
						null,
						row.map(function (cell, idx2) {
							var coords = "[" + idx2 + ", " + idx1 + "]";
							return React.createElement(
								"td",
								{ position: coords },
								React.createElement(Cell, { ref: coords,
									position: coords,
									unit: board[coords] ? board[coords].unit : null,
									color: board[coords] ? board[coords].color : null,
									playerColor: color,
									side: board[coords] ? board[coords].side : null,
									litup: lightup[coords],
									strikable: strike[coords],
									canDrop: drop[coords],
									selected: selected,
									turn: turn,
									pendingDraw: pendingDraw,
									setSelected: _this._setSelected,
									setDrawable: _this._setDrawable,
									setDroppable: _this._setDroppable,
									setGamePoint: _this._setGamePoint,
									gameover: gameover ? false : gameover
								})
							);
						})
					);
				})
			),
			React.createElement(
				"div",
				{ id: "draw" },
				React.createElement(
					"button",
					{ className: "btn", onClick: this._onButtonClick },
					"DRAW"
				),
				React.createElement(DrawnComponent, { position: "[-1, -1]",
					unit: pendingDraw ? pendingDraw.unit : null,
					color: pendingDraw ? pendingDraw.color : null,
					side: pendingDraw ? pendingDraw.side : null,
					drawAUnit: this._onDrawCellClick,
					playerColor: color })
			)
		);
	},

	_onDrawnDragStart: function _onDrawnDragStart(e) {
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", "");

		var _props = this.props;
		var unit = _props.unit;
		var position = _props.position;
		var color = _props.color;
		var selected = _props.selected;
		var setSelected = _props.setSelected;
		var litup = _props.litup;
		var strikable = _props.strikable;
		var droppable = _props.droppable;
		var side = _props.side;

		this._setSelected("[-1,-1]", "draw");
	},

	_setSelected: function _setSelected(position, inRange) {
		this.setState({
			selected: position,
			lightup: this._getValidMoves(position, inRange).movableTiles,
			strike: this._getValidMoves(position, inRange).strikableTiles
		});
	},

	_setDrawnUnit: function _setDrawnUnit(tile) {
		this.setState({
			pendingDraw: {
				unit: tile,
				color: this.props.color,
				side: "front"
			}
		});
	},
	_setGamePoint: function _setGamePoint() {
		this.setState({
			gameover: true
		});
	},

	_getValidMoves: function _getValidMoves(position, moves) {
		var _this = this;

		if (!moves) {
			return;
		}var playerColor = this.props.color;

		var inRange = [],
		    movableTiles = {},
		    strikableTiles = {},
		    posArr = JSON.parse(position),
		    theBoard = playerColor === "black" ? this._reverseBoard() : this.state.board;

		// Store all tiles within range of the unit's behavior
		Object.keys(moves).forEach(function (move) {
			var moveArr = JSON.parse(move),
			    moveName = moves[move],
			   
			// (x, y): coordinates of the marked tile
			x = posArr[0] + moveArr[0],
			    y = posArr[1] + moveArr[1];

			// strike and jump are straightforward; simply store the marked tile
			if (moveName === "strike") inRange.push({ x: x, y: y, type: "strike" });else if (moveName === "jump") inRange.push({ x: x, y: y, type: "move" });else {
				var deltaX = Math.sign(moveArr[0]),
				    deltaY = Math.sign(moveArr[1]),
				    i = posArr[0] + deltaX,
				    j = posArr[1] + deltaY;

				// loop through all tiles on board in a straight path between starting tile and marked tile
				while (_this._isOnBoard({ x: i, y: j })) {
					// sliding units can land on any tile within a straight path
					// non-sliding units can only land on the marked tile
					if (moveName.includes("slide") || x === i && y === j) inRange.push({ x: i, y: j, type: "move" });

					// if unit can't jump and there is a unit in the way, break
					var unitInTheWay = theBoard["[" + i + ", " + j + "]"];
					if (unitInTheWay && !moveName.includes("jump")) break;

					i += deltaX;j += deltaY;
				}
			}
		});

		// Filter out tiles that are occupied by allied units or not on the board,
		// then organize by movable and strikable tiles
		inRange.filter(function (range) {
			var targetUnit = theBoard["[" + range.x + ", " + range.y + "]"];
			if (targetUnit && theBoard[position].color === targetUnit.color) return false;
			return _this._isOnBoard(range);
		}).forEach(function (range) {
			if (range.type === "move") movableTiles["[" + range.x + ", " + range.y + "]"] = true;else if (range.type === "strike") strikableTiles["[" + range.x + ", " + range.y + "]"] = true;
		});

		return { movableTiles: movableTiles, strikableTiles: strikableTiles };
	},

	_isOnBoard: function _isOnBoard(_ref) {
		var x = _ref.x;
		var y = _ref.y;

		return x >= 0 && y >= 0 && x < 6 && y < 6;
	},

	_runClock: function _runClock() {
		var _props = this.props;
		var io = _props.io;
		var token = _props.token;
		var color = _props.color;

		io.emit("clock-run", {
			token: token,
			color: color
		});
	},
	_removeAsteriskFromTitle: function _removeAsteriskFromTitle() {
		var title = document.getElementsByTagName("title")[0];
		title.text = title.text.replace("* ", "");
		window.removeEventListener("focus", this._removeAsteriskFromTitle);
	}

});

var Cell = React.createClass({
	displayName: "Cell",

	propTypes: {},

	componentDidMount: function componentDidMount() {},

	componentWillMount: function componentWillMount() {},

	mixins: [],

	_onClickSquare: function _onClickSquare() {
		var _props = this.props;
		var unit = _props.unit;
		var color = _props.color;
		var setSelected = _props.setSelected;
		var litup = _props.litup;
		var strikable = _props.strikable;
		var canDrop = _props.canDrop;
		var side = _props.side;
		var playerColor = _props.playerColor;
		var turn = _props.turn;
		var pendingDraw = _props.pendingDraw;
		var _props2 = this.props;
		var position = _props2.position;
		var selected = _props2.selected;

		var gameover = GameStore.getGameboardState().gameover;
		if (gameover.get("status")) {
			return;
		} // only let the player act when it is their turn
		// if player drew a unit, don't let them make a normal move

		if (turn !== playerColor.charAt(0) || pendingDraw) {
			return;
		} // if there is no currently selected unit, click a unit (of the same color) to select it
		if (!selected && unit && color === playerColor) {
			var moves = behavior[unit][side];
			setSelected(position, moves);
		}
		// if there is currently a selected unit on the board
		else {
			// when emitting a move event, send the "real" position (i.e. if black, the reverse of the rendered view)
			if (playerColor === "black") {
				position = this._reversePosition(position);
				selected = this._reversePosition(selected);
			}

			// can do one of the following:

			// 1. move to a tile glowing red
			if (this.props.litup) {
				var capture = unit && color !== playerColor;
				GameActions.makeMove(selected, position, capture, "move", true);
				setSelected(null, []);
			}

			// 2. attack a unit on a tile glowing yellow, without moving
			else if (this.props.strikable && unit && color !== playerColor) {
				GameActions.makeMove(selected, position, true, "strike", true);
				setSelected(null, []);
			}

			// 3. deselect the current unit by clicking on it
			else if (selected === position) {
				setSelected(null, []);
			}
		}
	},

	_onDragStart: function _onDragStart(e) {
		var _props = this.props;
		var unit = _props.unit;
		var position = _props.position;
		var color = _props.color;
		var selected = _props.selected;
		var setSelected = _props.setSelected;
		var litup = _props.litup;
		var strikable = _props.strikable;
		var side = _props.side;
		var canDrop = _props.canDrop;
		var playerColor = _props.playerColor;
		var turn = _props.turn;
		var pendingDraw = _props.pendingDraw;

		var gameover = GameStore.getGameboardState().gameover;
		if (gameover.get("status")) {
			return;
		}if (turn !== playerColor.charAt(0) || pendingDraw) {
			return;
		}e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", "");

		if (!selected && unit && color === playerColor) {
			var moves = behavior[unit][side];
			setSelected(position, moves);
		}
	},
	_onDragOver: function _onDragOver(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	},
	_onDrop: function _onDrop(e) {
		e.preventDefault();

		var _props = this.props;
		var unit = _props.unit;
		var color = _props.color;
		var setSelected = _props.setSelected;
		var setDroppable = _props.setDroppable;
		var setDrawable = _props.setDrawable;
		var litup = _props.litup;
		var strikable = _props.strikable;
		var canDrop = _props.canDrop;
		var side = _props.side;
		var playerColor = _props.playerColor;
		var pendingDraw = _props.pendingDraw;
		var _props2 = this.props;
		var position = _props2.position;
		var selected = _props2.selected;

		if (playerColor === "black") {
			if (position) position = this._reversePosition(position);
			if (selected) selected = this._reversePosition(selected);
		}
		if (this.props.litup) {
			var capture = unit && color !== playerColor;
			GameActions.makeMove(selected, position, capture, "move", true);
		} else if (this.props.strikable && unit) {
			GameActions.makeMove(selected, position, true, "strike", true);
		} else if (this.props.canDrop) {
			GameActions.makeMove(pendingDraw, position, false, "move", true);
		}
		setSelected(null, []);
	},

	_reversePosition: function _reversePosition(pos) {
		var posArr = JSON.parse(pos);
		return "[" + (5 - posArr[0]) + ", " + (5 - posArr[1]) + "]";
	},

	render: function render() {
		var _props = this.props;
		var unit = _props.unit;
		var color = _props.color;
		var litup = _props.litup;
		var strikable = _props.strikable;
		var canDrop = _props.canDrop;
		var side = _props.side;
		var playerColor = _props.playerColor;
		var position = _props.position;
		var selected = _props.selected;

		return React.createElement(
			"section",
			{ className: "cellContainer" },
			React.createElement(
				"div",
				{ className: cx(_defineProperty({
						tile: true,
						selected: position === selected }, side, true)),
					onDragOver: this._onDragOver,
					onDrop: this._onDrop
				},
				React.createElement("a", { className: cx((function () {
						var _cx2 = {
							unit: !!unit,
							litup: litup,
							strikable: strikable,
							canDrop: canDrop,
							opponent: color && color !== playerColor };

						_defineProperty(_cx2, side, true);

						_defineProperty(_cx2, unit, true);

						_defineProperty(_cx2, color, true);

						return _cx2;
					})()),
					onClick: this._onClickSquare,
					onDragStart: this._onDragStart,
					draggable: true }),
				React.createElement("figure", { className: cx({ "front-face": true, opponent: color && color !== playerColor }) }),
				React.createElement("figure", { className: cx({ "back-face": true, opponent: color && color !== playerColor }) }),
				React.createElement("figure", { className: "left-face" }),
				React.createElement("figure", { className: "right-face" }),
				React.createElement("figure", { className: "top-face" }),
				React.createElement("figure", { className: "bottom-face" })
			)
		);
	}

});

var DrawnComponent = React.createClass({
	displayName: "DrawnComponent",

	propTypes: {},
	getInitialState: function getInitialState() {
		return {
			//side: 'front',
			drawn: null
		};
	},
	componentDidMount: function componentDidMount() {},

	componentWillMount: function componentWillMount() {},

	mixins: [],

	_onDragStart: function _onDragStart(e) {
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", "");

		var _props = this.props;
		var unit = _props.unit;
		var position = _props.position;
		var color = _props.color;
		var side = _props.side;
	},
	_onDragOver: function _onDragOver(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	},

	render: function render() {
		var _props = this.props;
		var unit = _props.unit;
		var color = _props.color;
		var side = _props.side;
		var draggable = _props.draggable;
		var drawAUnit = _props.drawAUnit;
		var position = _props.position;
		var playerColor = _props.playerColor;

		return React.createElement(
			"div",
			{ id: "drawnUnit", draggable: true,
				className: cx((function () {
					var _cx = {
						tile: true };

					_defineProperty(_cx, unit, true);

					_defineProperty(_cx, color, true);

					_defineProperty(_cx, side, true);

					return _cx;
				})()) },
			React.createElement("a", { className: cx((function () {
					var _cx2 = {
						unit: !!unit,
						opponent: color && color !== playerColor };

					_defineProperty(_cx2, side, true);

					_defineProperty(_cx2, unit, true);

					_defineProperty(_cx2, color, true);

					return _cx2;
				})()),
				onClick: drawAUnit,

				draggable: true }),
			React.createElement("figure", { className: cx({ "front-face": true, "draw-preview": true, opponent: color && color !== playerColor }) }),
			React.createElement("figure", { className: cx({ "back-face": true, "draw-preview": true, opponent: color && color !== playerColor }) }),
			React.createElement("figure", { className: cx({ "left-face": true, "draw-preview": true }) }),
			React.createElement("figure", { className: cx({ "right-face": true, "draw-preview": true }) }),
			React.createElement("figure", { className: cx({ "top-face": true, "draw-preview": true }) }),
			React.createElement("figure", { className: cx({ "bottom-face": true, "draw-preview": true }) })
		);
	}

});

module.exports = { Board: GameBoard, Cell: Cell, DrawnComponent: DrawnComponent };
// onDragStart={this._onDragStart}

},{"../actions/GameActions":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\actions\\GameActions.js","../game/behavior":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\game\\behavior.js","../mixins/maybeReverse":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\mixins\\maybeReverse.js","../stores/GameStore":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\stores\\GameStore.js","classnames":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\classnames\\index.js","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\GameHeader.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react/addons"));

var Clock = _interopRequire(require("./Clock"));

var ChatStore = _interopRequire(require("../stores/ChatStore"));

var ChatActions = _interopRequire(require("../actions/ChatActions"));

var omit = _interopRequire(require("lodash.omit"));

var GameHeader = React.createClass({
  displayName: "GameHeader",

  propTypes: {
    io: React.PropTypes.object.isRequired,
    params: React.PropTypes.array.isRequired,
    color: React.PropTypes.oneOf(["white", "black"]).isRequired,
    openModal: React.PropTypes.func.isRequired,
    gameOver: React.PropTypes.bool.isRequired,
    isOpponentAvailable: React.PropTypes.bool.isRequired
  },
  mixins: [React.addons.PureRenderMixin],

  getInitialState: function getInitialState() {
    return omit(ChatStore.getState(), "messages");
  },
  componentDidMount: function componentDidMount() {
    ChatStore.on("change", this._onChatChange);
  },
  componentWillUnmount: function componentWillUnmount() {
    ChatStore.off("change", this._onChatChange);
  },
  render: function render() {
    var _props = this.props;
    var io = _props.io;
    var params = _props.params;
    var gameOver = _props.gameOver;
    var isOpponentAvailable = _props.isOpponentAvailable;

    var unseenCount = this.state.unseenCount;

    return React.createElement(
      "header",
      { className: "clearfix" },
      React.createElement(Clock, {
        io: io,
        params: params }),
      React.createElement(
        "a",
        { className: "btn", href: "/" },
        "New game"
      ),
      !gameOver && isOpponentAvailable ? React.createElement(
        "a",
        { className: "btn btn--red resign",
          onClick: this._onResign },
        "Resign"
      ) : gameOver ? React.createElement(
        "a",
        { className: "btn btn--red rematch",
          onClick: this._onRematch },
        "Rematch"
      ) : null,
      React.createElement(
        "a",
        { id: "chat-icon",
          onClick: ChatActions.toggleVisibility },
        unseenCount ? React.createElement(
          "span",
          { id: "chat-counter" },
          unseenCount < 9 ? unseenCount : "9+"
        ) : null,
        React.createElement("img", { src: "/img/chat.svg",
          width: "50",
          height: "50" }),
        "Chat"
      )
    );
  },
  _onChatChange: function _onChatChange() {
    this.setState(omit(ChatStore.getState(), "messages"));
  },
  _onResign: function _onResign() {
    var _props = this.props;
    var io = _props.io;
    var params = _props.params;
    var color = _props.color;

    io.emit("resign", {
      token: params[0],
      color: color
    });
  },
  _onRematch: function _onRematch() {
    var _props = this.props;
    var io = _props.io;
    var params = _props.params;
    var openModal = _props.openModal;
    var isOpponentAvailable = _props.isOpponentAvailable;

    if (!isOpponentAvailable) {
      openModal("info", "Your opponent has disconnected. You need to " + "generate a new link.");
      return;
    }

    io.emit("rematch-offer", {
      token: params[0]
    });
    openModal("info", "Your offer has been sent.");
  }
});

module.exports = GameHeader;
/*<span id="game-type">
 {`${params[1]}|${params[2]}`}
</span>*/

},{"../actions/ChatActions":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\actions\\ChatActions.js","../stores/ChatStore":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\stores\\ChatStore.js","./Clock":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\Clock.js","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\GameInterface.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = _interopRequire(require("react/addons"));

var GameHeader = _interopRequire(require("./GameHeader"));

var Chat = _interopRequire(require("./Chat"));

var Modal = _interopRequire(require("./Modal"));

var GameActions = _interopRequire(require("../actions/GameActions"));

var GameStore = _interopRequire(require("../stores/GameStore"));

var ChessboardInterface = _interopRequire(require("./ChessboardInterface"));

var GameboardInterface = _interopRequire(require("./GameboardInterface"));

var Map = require("immutable").Map;

var Board = require("./GameBoard").Board;

var GameInterface = React.createClass({
  displayName: "GameInterface",

  propTypes: {
    io: React.PropTypes.object.isRequired,
    params: React.PropTypes.array.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      isOpponentAvailable: false,
      color: "white",
      modal: Map({
        open: false,
        message: "",
        type: "info",
        callbacks: {
          hide: this._hideModal,
          accept: this._acceptRematch,
          decline: this._declineRematch
        }
      }),
      gameOver: GameStore.getState().gameOver
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var _props = this.props;
    var io = _props.io;
    var params = _props.params;

    io.on("token-invalid", function () {
      return _this.setState({
        modal: _this.state.modal.set("open", true).set("message", "Game link is invalid or has expired.").set("type", "info")
      });
    });

    io.emit("join", {
      token: params[0],
      time: params[1] * 60,
      inc: params[2]
    });

    io.on("joined", function (data) {
      if (data.color === "black") {
        _this.setState({ color: "black" });
      }
    });

    io.on("both-joined", function () {
      return _this.setState({ isOpponentAvailable: true }, function () {
        if (_this.state.color === "white") {
          io.emit("clock-run", {
            token: params[0],
            color: "white"
          });
        }
      });
    });

    io.on("full", function () {
      window.alert("This game already has two players. You have to create a new one.");
      window.location = "/";
    });

    io.on("swal-gameover", function (data) {
      // data.color = player who made the winning move
      GameActions.gameOver({
        type: "defeat",
        winner: data.color === "white" ? "White" : "Black"
      });

      var iWin = _this.state.color === data.color;
      swal({
        title: iWin ? "You win!" : "You lose!",
        text: iWin ? "yay" : "Better luck next time!",
        imageUrl: iWin ? "http://orig08.deviantart.net/b83d/f/2013/272/7/9/happy_puppy_by_laki10-d6oi4nt.png" : "https://iampierremenard.files.wordpress.com/2014/02/sad-dog.jpg"
      });
    });

    io.on("player-resigned", function (data) {
      // data.color = player who resigned
      var resignGuy = data.color === "white" ? "White" : "Black",
          winner = data.color === "white" ? "Black" : "White";

      GameActions.gameOver({
        type: "resign",
        winner: winner
      });

      var iWin = _this.state.color !== data.color;
      swal({
        title: iWin ? "" + resignGuy + " has resigned!" : "You have resigned!",
        text: iWin ? "Guess you win lol ¯\\_(ツ)_/¯" : "boo",
        imageUrl: iWin ? "http://orig08.deviantart.net/b83d/f/2013/272/7/9/happy_puppy_by_laki10-d6oi4nt.png" : "https://iampierremenard.files.wordpress.com/2014/02/sad-dog.jpg"
      });
    });

    io.on("rematch-offered", function () {
      return _this._openModal("offer", "Your opponent has sent you a rematch offer.");
    });

    io.on("rematch-declined", function () {
      return _this._openModal("info", "Rematch offer has been declined.");
    });

    io.on("rematch-accepted", function () {
      GameActions.rematch();
      _this.setState({
        color: _this.state.color === "white" ? "black" : "white",
        modal: _this.state.modal.set("open", false)
      }, function () {
        if (_this.state.color === "white") {
          io.emit("clock-run", {
            token: _this.props.params[0],
            color: "white"
          });
        }
      });
    });

    io.on("opponent-disconnected", function () {
      if (!_this.state.gameOver.get("status")) {
        _this._openModal("info", "Your opponent has disconnected.");
      }

      _this.setState({ isOpponentAvailable: false });
    });

    GameStore.on("change", this._onGameChange);
  },
  componentWillUnmount: function componentWillUnmount() {
    GameStore.off("change", this._onGameChange);
  },

  render: function render() {
    var _props = this.props;
    var io = _props.io;
    var params = _props.params;
    var _state = this.state;
    var color = _state.color;
    var gameOver = _state.gameOver;
    var isOpponentAvailable = _state.isOpponentAvailable;

    var commonProps = {
      io: io,
      color: color,
      openModal: this._openModal,
      isOpponentAvailable: isOpponentAvailable
    };

    return React.createElement(
      "div",
      null,
      React.createElement(GameHeader, _extends({}, commonProps, {
        params: params,
        gameOver: gameOver.get("status") })),
      React.createElement(Chat, _extends({}, commonProps, {
        token: params[0] })),
      React.createElement(GameboardInterface, _extends({}, commonProps, {
        token: params[0],
        gameOver: gameOver })),
      React.createElement(Modal, { data: this.state.modal })
    );
  },

  _onGameChange: function _onGameChange() {
    this.setState({ gameOver: GameStore.getState().gameOver });
  },
  _openModal: function _openModal(type, message) {
    this.setState({
      modal: this.state.modal.set("open", true).set("message", message).set("type", type)
    });
  },
  _hideModal: function _hideModal() {
    this.setState({ modal: this.state.modal.set("open", false) });
  },
  _acceptRematch: function _acceptRematch() {
    var _props = this.props;
    var io = _props.io;
    var params = _props.params;

    io.emit("rematch-accept", {
      token: params[0],
      time: params[1] * 60,
      inc: params[2]
    });
    this._hideModal();
  },
  _declineRematch: function _declineRematch() {
    var _props = this.props;
    var io = _props.io;
    var params = _props.params;

    io.emit("rematch-decline", {
      token: params[0]
    });
    this._hideModal();
  },
  _toggleSounds: function _toggleSounds(e) {
    this.setState({
      soundsEnabled: !this.state.soundsEnabled
    });
  } });

module.exports = GameInterface;

},{"../actions/GameActions":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\actions\\GameActions.js","../stores/GameStore":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\stores\\GameStore.js","./Chat":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\Chat.js","./ChessboardInterface":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\ChessboardInterface.js","./GameBoard":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\GameBoard.js","./GameHeader":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\GameHeader.js","./GameboardInterface":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\GameboardInterface.js","./Modal":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\Modal.js","immutable":"immutable","react/addons":"react/addons"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\GameboardInterface.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = _interopRequire(require("react/addons"));

var GameStore = _interopRequire(require("../stores/GameStore"));

var GameActions = _interopRequire(require("../actions/GameActions"));

var onGameChange = _interopRequire(require("../mixins/onGameChange"));

var Chessboard = _interopRequire(require("./Chessboard"));

var Board = require("./GameBoard").Board;

var CapturedPieces = _interopRequire(require("./CapturedPieces"));

var TableOfMoves = _interopRequire(require("./TableOfMoves"));

var omit = _interopRequire(require("lodash.omit"));

/* the state of the gameboard is managed by GameStore */

var GameboardInterface = React.createClass({
	displayName: "GameboardInterface",

	propTypes: {},
	mixins: [onGameChange], // this mixin is responsible for dynamically changing the state of GameboardInterface
	getInitialState: function getInitialState() {
		return GameStore.getState();
	},
	getDefaultProps: function getDefaultProps() {},
	componentDidUpdate: function componentDidUpdate(prevProps) {},
	render: function render() {
		var _state = this.state;
		var promotion = _state.promotion;
		var turn = _state.turn;
		var gameOver = _state.gameOver;
		var check = _state.check;

		return React.createElement(
			"div",
			{ id: "board-moves-wrapper", className: "clearfix" },
			React.createElement(
				"div",
				{ id: "board-wrapper" },
				React.createElement(
					"p",
					null,
					"You are: ",
					this.props.color === "white" ? "White" : "Black"
				),
				React.createElement(CapturedPieces, null),
				React.createElement(Board, _extends({ size: 6
				}, omit(this.props, "gameOver"), {
					gameOver: gameOver.get("status") }))
			),
			React.createElement(
				"span",
				{ className: "feedback" },
				!gameOver.get("status") ? React.createElement(
					"span",
					null,
					"" + (turn === "w" ? "White" : "Black") + " to move."
				) : React.createElement(
					"strong",
					null,
					React.createElement(
						"span",
						{ className: "icon" },
						gameOver.get("winner") === "White" ? "F" : "f"
					),
					this._getGameOverMessage(gameOver.get("winner"))
				)
			)
		);
	},

	_onGameChange: function _onGameChange() {
		this.setState(GameStore.getState());
	},

	_getGameOverMessage: function _getGameOverMessage(winner) {
		return "" + winner + " wins!";
	}

});

module.exports = GameboardInterface;

},{"../actions/GameActions":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\actions\\GameActions.js","../mixins/onGameChange":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\mixins\\onGameChange.js","../stores/GameStore":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\stores\\GameStore.js","./CapturedPieces":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\CapturedPieces.js","./Chessboard":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\Chessboard.js","./GameBoard":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\GameBoard.js","./TableOfMoves":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\TableOfMoves.js","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\Modal.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react/addons"));

var cx = _interopRequire(require("classnames"));

var Modal = React.createClass({
  displayName: "Modal",

  propTypes: {
    data: React.PropTypes.object.isRequired
  },
  mixins: [React.addons.PureRenderMixin],

  componentDidUpdate: function componentDidUpdate() {
    var isOpen = this.props.data.get("open");

    if (isOpen) document.addEventListener("keydown", this._onKeydown);else document.removeEventListener("keydown", this._onKeydown);
  },
  render: function render() {
    var data = this.props.data;
    var type = data.get("type");
    var callbacks = data.get("callbacks");

    return React.createElement(
      "div",
      { className: cx({
          "modal-mask": true,
          hidden: !data.get("open")
        }),
        onClick: this._hideModal },
      React.createElement(
        "p",
        null,
        React.createElement(
          "strong",
          null,
          "Esc: "
        ),
        React.createElement(
          "span",
          null,
          type === "info" ? "OK" : "Decline"
        ),
        React.createElement("br", null),
        React.createElement(
          "strong",
          null,
          "Enter: "
        ),
        React.createElement(
          "span",
          null,
          type === "info" ? "OK" : "Accept"
        )
      ),
      React.createElement(
        "div",
        { className: "modal",
          onClick: function (e) {
            return e.stopPropagation();
          } },
        React.createElement(
          "p",
          null,
          data.get("message")
        ),
        type === "info" ? React.createElement(
          "a",
          { className: "btn ok",
            onClick: callbacks.hide },
          "OK"
        ) : [React.createElement(
          "a",
          { key: "a",
            className: "btn",
            style: { left: "4em" },
            onClick: callbacks.accept },
          "Accept"
        ), React.createElement(
          "a",
          { key: "b",
            className: "btn btn--red",
            style: { right: "4em" },
            onClick: callbacks.decline },
          "Decline"
        )]
      )
    );
  },
  _onKeydown: function _onKeydown(e) {
    var type = this.props.data.get("type");
    var callbacks = this.props.data.get("callbacks");

    if (type === "info") {
      if (e.which === 13 || e.which === 27) {
        callbacks.hide();
      }
    } else if (type === "offer") {
      if (e.which === 13) {
        callbacks.accept();
      } else if (e.which === 27) {
        callbacks.decline();
      }
    }
  },
  _hideModal: function _hideModal() {
    this.props.data.get("callbacks").hide();
  }
});

module.exports = Modal;

},{"classnames":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\classnames\\index.js","react/addons":"react/addons"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\TableOfMoves.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react/addons"));

var GameStore = _interopRequire(require("../stores/GameStore"));

var onGameChange = _interopRequire(require("../mixins/onGameChange"));

var TableOfMoves = React.createClass({
  displayName: "TableOfMoves",

  mixins: [React.addons.PureRenderMixin, onGameChange],

  getInitialState: function getInitialState() {
    return {
      moves: GameStore.getMoves()
    };
  },
  render: function render() {
    return React.createElement(
      "table",
      { id: "moves", className: "clearfix" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "Table of moves"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        this.state.moves.map(function (row, i) {
          return React.createElement(
            "tr",
            { key: i },
            React.createElement(
              "td",
              null,
              React.createElement(
                "strong",
                null,
                "" + (i + 1) + "."
              )
            ),
            row.map(function (move, j) {
              return React.createElement(
                "td",
                { key: j },
                React.createElement(
                  "span",
                  null,
                  move
                )
              );
            }).toArray()
          );
        }).toArray()
      )
    );
  },
  _onGameChange: function _onGameChange() {
    this.setState({
      moves: GameStore.getMoves()
    });
  }
});

module.exports = TableOfMoves;

},{"../mixins/onGameChange":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\mixins\\onGameChange.js","../stores/GameStore":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\stores\\GameStore.js","react/addons":"react/addons"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\constants\\ChatConstants.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var keyMirror = _interopRequire(require("react/lib/keyMirror"));

module.exports = keyMirror({
  TOGGLE_VISIBILITY: null,
  SUBMIT_MESSAGE: null
});

},{"react/lib/keyMirror":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\react\\lib\\keyMirror.js"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\constants\\ChessPieces.js":[function(require,module,exports){
"use strict";

var ChessPieces = {
  // key: piece from FEN, value: piece from Smart Regular chess font
  // white pieces
  K: "F",
  Q: "E",
  R: "D",
  B: "C",
  N: "B",
  P: "A",
  // black pieces
  k: "f",
  q: "e",
  r: "d",
  b: "c",
  n: "b",
  p: "a",
  // empty square
  "-": undefined
};

module.exports = ChessPieces;

},{}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\constants\\GameConstants.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var keyMirror = _interopRequire(require("react/lib/keyMirror"));

module.exports = keyMirror({
  MAKE_MOVE: null,
  SHOW_MOVES: null,
  REMATCH: null,
  DRAW: null,
  GAME_OVER: null,
  CHANGE_PROMOTION: null
});

},{"react/lib/keyMirror":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\react\\lib\\keyMirror.js"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\dispatcher\\AppDispatcher.js":[function(require,module,exports){
"use strict";

var Dispatcher = require("flux").Dispatcher;

module.exports = Object.assign(new Dispatcher(), {
  // @param {object} action The data coming from the view.
  handleViewAction: function handleViewAction(action) {
    this.dispatch({
      source: "VIEW_ACTION",
      action: action
    });
  }
});

},{"flux":"flux"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\game\\behavior.js":[function(require,module,exports){
"use strict";

var TileActions = {
    Assassin: {
        front: {
            "[0,-2]": "jump slide",
            "[-2,2]": "jump slide",
            "[2,2]": "jump slide"
        },
        back: {
            "[-2,-2]": "jump slide",
            "[2,-2]": "jump slide",
            "[0,2]": "jump slide"
        }
    },
    Bowman: {
        front: {
            "[0,-1]": "move",
            "[1,0]": "move",
            "[-1,0]": "move",
            "[-2,0]": "jump",
            "[2,0]": "jump",
            "[0,2]": "jump"
        },
        back: {
            "[0,-1]": "move",
            "[-1,1]": "move",
            "[1,1]": "move",
            "[-1,-1]": "strike",
            "[0,-2]": "strike",
            "[1,-1]": "strike"
        }
    },
    Champion: {
        front: {
            "[0,-1]": "move",
            "[1,0]": "move",
            "[0,1]": "move",
            "[-1,0]": "move",
            "[0,-2]": "jump",
            "[2,0]": "jump",
            "[0,2]": "jump",
            "[-2,0]": "jump"
        },
        back: {
            "[0,-1]": "strike",
            "[1,0]": "strike",
            "[0,1]": "strike",
            "[-1,0]": "strike",
            "[0,-2]": "jump",
            "[2,0]": "jump",
            "[0,2]": "jump",
            "[-2,0]": "jump"
        }
    },
    Dragoon: {
        front: {
            "[-1,0]": "move",
            "[1,0]": "move",
            "[-2,-2]": "strike",
            "[0,-2]": "strike",
            "[2,-2]": "strike"
        },
        back: {
            "[0,-1]": "move",
            "[0,-2]": "move",
            "[-1,-2]": "jump",
            "[1,-2]": "jump",
            "[-1,1]": "slide",
            "[1,1]": "slide"
        }
    },
    Duchess: {
        front: {
            "[1,0]": "move",
            "[-1,0]": "move",
            "[0,2]": "move"
        },
        back: {
            "[1,0]": "move",
            "[-1,0]": "move",
            "[0,2]": "move"
        }
    },
    Duke: {
        front: {
            "[-1,0]": "slide",
            "[1,0]": "slide"
        },
        back: {
            "[0,-1]": "slide",
            "[0,1]": "slide"
        }
    },
    Footman: {
        front: {
            "[0,1]": "move",
            "[0,-1]": "move",
            "[1,0]": "move",
            "[-1,0]": "move"
        },
        back: {
            "[0,-2]": "move",
            "[-1,1]": "move",
            "[1,1]": "move",
            "[-1,-1]": "move",
            "[1,-1]": "move"
        }
    },
    Knight: {
        front: {
            "[-1,-2]": "jump",
            "[1,-2]": "jump",
            "[-1,0]": "move",
            "[1,0]": "move",
            "[0,1]": "move",
            "[0,2]": "move"
        },
        back: {
            "[0,-1]": "slide",
            "[-1,1]": "move",
            "[1,1]": "move",
            "[-2,2]": "move",
            "[2,2]": "move"
        }
    },
    Longbowman: {
        front: {
            "[0,-1]": "move",
            "[1,0]": "move",
            "[0,1]": "move",
            "[-1,0]": "move"
        },
        back: {
            "[0,-2]": "strike",
            "[0,-3]": "strike",
            "[-1,1]": "move",
            "[1,1]": "move"
        }
    },
    Marshall: {
        front: {
            "[-1,0]": "slide",
            "[1,0]": "slide",
            "[-2,-2]": "jump",
            "[2,-2]": "jump",
            "[0,2]": "jump"
        },
        back: {
            "[-1,-1]": "move",
            "[0,-1]": "move",
            "[1,-1]": "move",
            "[-2,0]": "move",
            "[-1,0]": "move",
            "[1,0]": "move",
            "[2,0]": "move",
            "[-1,1]": "move",
            "[1,1]": "move"
        }
    },
    Oracle: {
        front: {
            "[-1,-1]": "move",
            "[1,-1]": "move",
            "[-1,1]": "move",
            "[1,1]": "move"
        },
        back: {}
    },
    Pikeman: {
        front: {
            "[-2,-2]": "move",
            "[-1,-1]": "move",
            "[1,-1]": "move",
            "[2,-2]": "move"
        },
        back: {
            "[-1,-2]": "strike",
            "[1,-2]": "strike",
            "[0,-1]": "move",
            "[0,1]": "move",
            "[0,2]": "move"
        }
    },
    Priest: {
        front: {
            "[-1,-1]": "slide",
            "[1,-1]": "slide",
            "[-1,1]": "slide",
            "[1,1]": "slide"
        },
        back: {
            "[-1,-1]": "move",
            "[1,-1]": "move",
            "[-1,1]": "move",
            "[1,1]": "move",
            "[-2,-2]": "jump",
            "[2,-2]": "jump",
            "[-2,2]": "jump",
            "[2,2]": "jump"
        }
    },
    Ranger: {
        front: {
            "[0,-1]": "slide",
            "[0,1]": "slide",
            "[-1,-2]": "jump",
            "[1,-2]": "jump",
            "[-2,-1]": "jump",
            "[2,-1]": "jump"
        },
        back: {
            "[-1,-1]": "slide",
            "[1,-1]": "slide",
            "[-1,2]": "jump",
            "[1,2]": "jump"
        }
    },
    Seer: {
        front: {
            "[0,-2]": "jump",
            "[2,0]": "jump",
            "[0,2]": "jump",
            "[-2,0]": "jump",
            "[-1,-1]": "move",
            "[1,-1]": "move",
            "[-1,1]": "move",
            "[1,1]": "move"
        },
        back: {
            "[-2,-2]": "jump",
            "[2,-2]": "jump",
            "[-2,2]": "jump",
            "[2,2]": "jump",
            "[0,-1]": "move",
            "[0,1]": "move",
            "[-1,0]": "move",
            "[1,0]": "move"
        }
    },
    Wizard: {
        front: {
            "[-1,-1]": "move",
            "[0,-1]": "move",
            "[1,-1]": "move",
            "[-1,0]": "move",
            "[1,0]": "move",
            "[-1,1]": "move",
            "[0,1]": "move",
            "[1,1]": "move"
        },
        back: {
            "[-2,-2]": "jump",
            "[0,-2]": "jump",
            "[2,-2]": "jump",
            "[-2,0]": "jump",
            "[2,0]": "jump",
            "[-2,2]": "jump",
            "[0,2]": "jump",
            "[2,2]": "jump"
        }
    }
};

// var newUnits = {};
// for (var unitKey in TileActions) {
//     var unit = TileActions[unitKey];
//     var newSides = {};
//     for (var sideKey in unit) {
//         var dir = unit[sideKey];
//         var newDir = {};
//         for (var coords in dir) {
//             var parsed = JSON.parse(coords);
//             var newCoords = JSON.stringify([parsed[1], parsed[0]]);
//             newDir[newCoords] = dir[coords];
//         }
//         newSides[sideKey] = newDir;
//     }
//     newUnits[unitKey] = newSides;
// }
// console.log(JSON.stringify(newUnits));

module.exports = TileActions;

},{}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\io.js":[function(require,module,exports){
(function (process){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var io = _interopRequire(require("socket.io-client"));

var os = _interopRequire(require("os"));

var hostname = os.hostname();

var port = process.env.PORT || 1337;
var ORIGIN = hostname.indexOf("herokuapp.com") !== -1 ? hostname : hostname + ":" + port;

module.exports = io.connect(ORIGIN);

}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvaW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFlBQVksQ0FBQzs7OztJQUVOLEVBQUUsMkJBQU0sa0JBQWtCOztJQUMxQixFQUFFLDJCQUFPLElBQUk7O0FBQ3BCLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7QUFFL0IsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBQ3RDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDOztpQkFFeEUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcclxuaW1wb3J0IG9zIGZyb20gIFwib3NcIjtcclxuY29uc3QgaG9zdG5hbWUgPSBvcy5ob3N0bmFtZSgpO1xyXG5cclxuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMTMzNztcclxuY29uc3QgT1JJR0lOID0gaG9zdG5hbWUuaW5kZXhPZignaGVyb2t1YXBwLmNvbScpICE9PSAtMSA/IGhvc3RuYW1lIDogaG9zdG5hbWUrXCI6XCIrcG9ydDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGlvLmNvbm5lY3QoT1JJR0lOKTsiXX0=
},{"_process":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\browserify\\node_modules\\process\\browser.js","os":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\browserify\\node_modules\\os-browserify\\browser.js","socket.io-client":"socket.io-client"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\mixins\\maybeReverse.js":[function(require,module,exports){
"use strict";

var maybeReverse = {
  _maybeReverse: function _maybeReverse(iterable, color) {
    return this.props.color === (color || "black") ? iterable.reverse() : iterable;
  }
};

module.exports = maybeReverse;

},{}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\mixins\\onGameChange.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var GameStore = _interopRequire(require("../stores/GameStore"));

var onGameChange = {
  componentDidMount: function componentDidMount() {
    GameStore.on("change", this._onGameChange);
  },
  componentWillUnmount: function componentWillUnmount() {
    GameStore.off("change", this._onGameChange);
  }
};

module.exports = onGameChange;

},{"../stores/GameStore":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\stores\\GameStore.js"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\stores\\ChatStore.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var AppDispatcher = _interopRequire(require("../dispatcher/AppDispatcher"));

var EventEmitter = require("eventemitter2").EventEmitter2;

var ChatConstants = _interopRequire(require("../constants/ChatConstants"));

var _immutable = require("immutable");

var List = _immutable.List;
var Map = _immutable.Map;

var CHANGE_EVENT = "change";

var _messages = List();
var _unseenCount = 0;
var _isChatHidden = true;

var ChatStore = Object.assign({}, EventEmitter.prototype, {
  getState: function getState() {
    return {
      messages: _messages,
      unseenCount: _unseenCount,
      isChatHidden: _isChatHidden
    };
  }
});

function toggleVisibility() {
  _isChatHidden = !_isChatHidden;
  _unseenCount = 0;
}

function submitMessage(message, className, received) {
  _messages = _messages.push(Map({
    message: message,
    className: className
  }));

  if (received && _isChatHidden) {
    _unseenCount += 1;
  }
}

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {
    case ChatConstants.TOGGLE_VISIBILITY:
      toggleVisibility();
      break;

    case ChatConstants.SUBMIT_MESSAGE:
      submitMessage(action.message, action.className, action.received);
      break;

    default:
      return true;
  }

  ChatStore.emit(CHANGE_EVENT);
  return true;
});

module.exports = ChatStore;

},{"../constants/ChatConstants":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\constants\\ChatConstants.js","../dispatcher/AppDispatcher":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\dispatcher\\AppDispatcher.js","eventemitter2":"eventemitter2","immutable":"immutable"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\stores\\GameStore.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var AppDispatcher = _interopRequire(require("../dispatcher/AppDispatcher"));

var EventEmitter = require("eventemitter2").EventEmitter2;

var GameConstants = _interopRequire(require("../constants/GameConstants"));

var ChessPieces = _interopRequire(require("../constants/ChessPieces"));

var Chess = require("chess.js").Chess;

var _immutable = require("immutable");

var List = _immutable.List;
var Map = _immutable.Map;
var OrderedMap = _immutable.OrderedMap;
var Set = _immutable.Set;

var behavior = _interopRequire(require("../game/behavior"));

var omit = _interopRequire(require("lodash.omit"));

var CHANGE_EVENT = "change";
var MOVE_EVENT = "new-move";

var _gameOver;
var _capturedPieces;
var _moves;
var _moved;
var _turn;
var _check;
var _lastMove;
var _chess;

var _board,
    _lightup,
    _strike,
    _drop,
    _selected,
    _drawn = [],
    _result,
    _deck,
    _pendingDraw;

setInitialState();

var GameStore = Object.assign({}, EventEmitter.prototype, {
    addChangeListener: function addChangeListener(cb) {
        this.on(CHANGE_EVENT, cb);
    },

    removeChangeListener: function removeChangeListener(cb) {
        this.removeChangeListener(CHANGE_EVENT, cb);
    },
    getState: function getState() {
        return {
            gameOver: _gameOver,
            turn: _turn,
            check: _check };
    },
    getCapturedPieces: function getCapturedPieces() {
        return _capturedPieces;
    },
    getMoves: function getMoves() {
        return _moves;
    },

    getGameboardState: function getGameboardState() {
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
            pendingDraw: _pendingDraw,
            gameover: _gameOver
        };
    } });

function setInitialState() {
    _gameOver = Map({
        status: false,
        type: null,
        winner: null
    });
    _capturedPieces = OrderedMap([["w", List()], ["b", List()]]);
    _moves = List();
    _turn = "w";
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

        "[1, 0]": { unit: "Footman", color: "black", side: "front" },
        "[2, 0]": { unit: "Duke", color: "black", side: "front" },
        "[3, 0]": { unit: "Footman", color: "black", side: "front" },
        "[2, 5]": { unit: "Footman", color: "white", side: "front" },
        "[3, 5]": { unit: "Duke", color: "white", side: "front" },
        "[4, 5]": { unit: "Footman", color: "white", side: "front" } };

    _deck = [].concat(_toConsumableArray(Object.keys(omit(behavior, "Duke"))), ["Pikeman", "Pikeman"]);
}

function moveToBoard() {

    if (emitMove) {
        GameStore.emit(MOVE_EVENT, {
            to: to,
            capture: capture,
            type: type,
            board: _board
        });
    }

    return true;
}

function updateBoard(from, to, type) {

    // if called by a move event, the from parameter will be a position on the board (i.e. a string)
    // if called by a draw event, the from parameter will be an actual unit (i.e. an object)

    if (typeof from === "object") {
        // draw event
        _board[to] = from;
        _drop = {};
        _pendingDraw = null;
    } else if (typeof from === "string") {
        // move event

        var unit = _board[from];

        unit.side = unit.side === "front" ? "back" : "front";

        if (type === "move") {
            _board[from] = null;
            _board[to] = unit;
        } else if (type === "strike") {
            _board[to] = null;
        }

        _selected = null;
        return _board;
    }
}

function makeMove(from, to, capture, type, emitMove) {

    updateBoard(from, to, type);

    _turn = _turn === "w" ? "b" : "w";

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
    var randomIndex = Math.floor(Math.random() * _deck.length);
    _pendingDraw = _deck.splice(randomIndex, 1)[0];
    return true;
}

function isDukeDead() {
    var dukes = Object.keys(_board).filter(function (pos) {
        return _board[pos] && _board[pos].unit === "Duke";
    }).map(function (pos) {
        return _board[pos].color;
    });
    return dukes.length === 1;
}

function gameOver(options) {
    _gameOver = _gameOver.set("status", true).set("winner", options.winner).set("type", options.type);
}

AppDispatcher.register(function (payload) {
    var action = payload.action;
    var emitEvent = true;

    switch (action.actionType) {
        case GameConstants.MAKE_MOVE:
            emitEvent = makeMove(action.from, action.to, action.capture, action.type, action.emitMove);
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

module.exports = GameStore;

},{"../constants/ChessPieces":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\constants\\ChessPieces.js","../constants/GameConstants":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\constants\\GameConstants.js","../dispatcher/AppDispatcher":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\dispatcher\\AppDispatcher.js","../game/behavior":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\game\\behavior.js","chess.js":"chess.js","eventemitter2":"eventemitter2","immutable":"immutable","lodash.omit":"lodash.omit"}]},{},["./src/js/play.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL3BsYXkuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvb3MtYnJvd3NlcmlmeS9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2tleU1pcnJvci5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvYWN0aW9ucy9DaGF0QWN0aW9ucy5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvYWN0aW9ucy9HYW1lQWN0aW9ucy5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DYXB0dXJlZFBpZWNlcy5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DaGF0LmpzIiwiQzovVXNlcnMvSmF5L0Rlc2t0b3AvSlMvc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0NoZXNzYm9hcmQuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2hlc3Nib2FyZEludGVyZmFjZS5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DbG9jay5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lQm9hcmQuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUhlYWRlci5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lSW50ZXJmYWNlLmpzIiwiQzovVXNlcnMvSmF5L0Rlc2t0b3AvSlMvc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0dhbWVib2FyZEludGVyZmFjZS5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9Nb2RhbC5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9UYWJsZU9mTW92ZXMuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2NvbnN0YW50cy9DaGF0Q29uc3RhbnRzLmpzIiwiQzovVXNlcnMvSmF5L0Rlc2t0b3AvSlMvc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hlc3NQaWVjZXMuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2NvbnN0YW50cy9HYW1lQ29uc3RhbnRzLmpzIiwiQzovVXNlcnMvSmF5L0Rlc2t0b3AvSlMvc2hvZ3VuLXYyL3NyYy9qcy9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXIuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2dhbWUvYmVoYXZpb3IuanMiLCJzcmMvanMvaW8uanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL21peGlucy9tYXliZVJldmVyc2UuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL21peGlucy9vbkdhbWVDaGFuZ2UuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL3N0b3Jlcy9DaGF0U3RvcmUuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL3N0b3Jlcy9HYW1lU3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7UUFFTixVQUFVOztJQUNWLEtBQUssMkJBQU0sT0FBTzs7SUFDbEIsRUFBRSwyQkFBTSxNQUFNOztJQUNkLGFBQWEsMkJBQU0sNEJBQTRCOztBQUV0RCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2RSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFcEMsS0FBSyxDQUFDLE1BQU0sQ0FDVixvQkFBQyxhQUFhLElBQUMsRUFBRSxFQUFFLEVBQUUsQUFBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEFBQUMsR0FBRyxFQUN6QyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUNyQyxDQUFDOzs7QUNkRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LFVBQUEsT0FBTyxFQUFJO0FBQzlCLFFBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDOUIsUUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDOztBQUVyQixZQUFRLE1BQU0sQ0FBQyxVQUFVO0FBQ3JCLGFBQUssYUFBYSxDQUFDLFNBQVM7QUFDeEIscUJBQVMsR0FBRyxRQUFRLENBQ2hCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFFLGtCQUFNOztBQUFBLEFBRVYsYUFBSyxhQUFhLENBQUMsSUFBSTtBQUNuQixxQkFBUyxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ25CLGtCQUFNOztBQUFBLEFBRVYsYUFBSyxhQUFhLENBQUMsU0FBUztBQUN4QixvQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6QixrQkFBTTs7QUFBQSxBQUVWLGFBQUssYUFBYSxDQUFDLE9BQU87QUFDdEIsMkJBQWUsRUFBRSxDQUFDO0FBQ2xCLGtCQUFNOztBQUFBLEFBRVY7QUFDSSxtQkFBTyxJQUFJLENBQUM7QUFBQSxLQUNuQjs7QUFFRCxRQUFJLFNBQVMsRUFBRTtBQUNYLGlCQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ2hDO0FBQ0QsV0FBTyxJQUFJLENBQUM7Q0FDZixDQUFDLENBQUM7O2lCQUVZLFNBQVMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICdlczYtc2hpbSc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBpbyBmcm9tICcuL2lvJztcclxuaW1wb3J0IEdhbWVJbnRlcmZhY2UgZnJvbSAnLi9jb21wb25lbnRzL0dhbWVJbnRlcmZhY2UnO1xyXG5cclxubGV0IHBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKCcvcGxheS8nLCAnJykuc3BsaXQoJy8nKTtcclxucGFyYW1zWzFdID0gcGFyc2VJbnQocGFyYW1zWzFdLCAxMCk7XHJcbnBhcmFtc1syXSA9IHBhcnNlSW50KHBhcmFtc1syXSwgMTApO1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxHYW1lSW50ZXJmYWNlIGlvPXtpb30gcGFyYW1zPXtwYXJhbXN9IC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKVxyXG4pO1xyXG5cclxuIiwiZXhwb3J0cy5lbmRpYW5uZXNzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJ0xFJyB9O1xuXG5leHBvcnRzLmhvc3RuYW1lID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgbG9jYXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5ob3N0bmFtZVxuICAgIH1cbiAgICBlbHNlIHJldHVybiAnJztcbn07XG5cbmV4cG9ydHMubG9hZGF2ZyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdIH07XG5cbmV4cG9ydHMudXB0aW1lID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gMCB9O1xuXG5leHBvcnRzLmZyZWVtZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE51bWJlci5NQVhfVkFMVUU7XG59O1xuXG5leHBvcnRzLnRvdGFsbWVtID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBOdW1iZXIuTUFYX1ZBTFVFO1xufTtcblxuZXhwb3J0cy5jcHVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW10gfTtcblxuZXhwb3J0cy50eXBlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJ0Jyb3dzZXInIH07XG5cbmV4cG9ydHMucmVsZWFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5hcHBWZXJzaW9uO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xuXG5leHBvcnRzLm5ldHdvcmtJbnRlcmZhY2VzXG49IGV4cG9ydHMuZ2V0TmV0d29ya0ludGVyZmFjZXNcbj0gZnVuY3Rpb24gKCkgeyByZXR1cm4ge30gfTtcblxuZXhwb3J0cy5hcmNoID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJ2phdmFzY3JpcHQnIH07XG5cbmV4cG9ydHMucGxhdGZvcm0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnYnJvd3NlcicgfTtcblxuZXhwb3J0cy50bXBkaXIgPSBleHBvcnRzLnRtcERpciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJy90bXAnO1xufTtcblxuZXhwb3J0cy5FT0wgPSAnXFxuJztcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gdHJ1ZTtcbiAgICB2YXIgY3VycmVudFF1ZXVlO1xuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB2YXIgaSA9IC0xO1xuICAgICAgICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVldWVbaV0oKTtcbiAgICAgICAgfVxuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG59XG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHF1ZXVlLnB1c2goZnVuKTtcbiAgICBpZiAoIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE1IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG5cbmZ1bmN0aW9uIGNsYXNzTmFtZXMoKSB7XG5cdHZhciBjbGFzc2VzID0gJyc7XG5cdHZhciBhcmc7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0aWYgKCFhcmcpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGFyZyB8fCAnbnVtYmVyJyA9PT0gdHlwZW9mIGFyZykge1xuXHRcdFx0Y2xhc3NlcyArPSAnICcgKyBhcmc7XG5cdFx0fSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuXHRcdFx0Y2xhc3NlcyArPSAnICcgKyBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0fSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIGFyZykge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRpZiAoIWFyZy5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8ICFhcmdba2V5XSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNsYXNzZXMgKz0gJyAnICsga2V5O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gY2xhc3Nlcy5zdWJzdHIoMSk7XG59XG5cbi8vIHNhZmVseSBleHBvcnQgY2xhc3NOYW1lcyBmb3Igbm9kZSAvIGJyb3dzZXJpZnlcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG59XG5cbi8vIHNhZmVseSBleHBvcnQgY2xhc3NOYW1lcyBmb3IgUmVxdWlyZUpTXG5pZiAodHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdH0pO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnSW52YXJpYW50IFZpb2xhdGlvbjogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUga2V5TWlycm9yXG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCIuL2ludmFyaWFudFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGFuIGVudW1lcmF0aW9uIHdpdGgga2V5cyBlcXVhbCB0byB0aGVpciB2YWx1ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgIHZhciBDT0xPUlMgPSBrZXlNaXJyb3Ioe2JsdWU6IG51bGwsIHJlZDogbnVsbH0pO1xuICogICB2YXIgbXlDb2xvciA9IENPTE9SUy5ibHVlO1xuICogICB2YXIgaXNDb2xvclZhbGlkID0gISFDT0xPUlNbbXlDb2xvcl07XG4gKlxuICogVGhlIGxhc3QgbGluZSBjb3VsZCBub3QgYmUgcGVyZm9ybWVkIGlmIHRoZSB2YWx1ZXMgb2YgdGhlIGdlbmVyYXRlZCBlbnVtIHdlcmVcbiAqIG5vdCBlcXVhbCB0byB0aGVpciBrZXlzLlxuICpcbiAqICAgSW5wdXQ6ICB7a2V5MTogdmFsMSwga2V5MjogdmFsMn1cbiAqICAgT3V0cHV0OiB7a2V5MToga2V5MSwga2V5Mjoga2V5Mn1cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbnZhciBrZXlNaXJyb3IgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHJldCA9IHt9O1xuICB2YXIga2V5O1xuICAoXCJwcm9kdWN0aW9uXCIgIT09IFwiZGV2ZWxvcG1lbnRcIiA/IGludmFyaWFudChcbiAgICBvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSxcbiAgICAna2V5TWlycm9yKC4uLik6IEFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0LidcbiAgKSA6IGludmFyaWFudChvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSkpO1xuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0W2tleV0gPSBrZXk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWlycm9yO1xuIiwiaW1wb3J0IENoYXRDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0NoYXRDb25zdGFudHMnO1xyXG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInO1xyXG5cclxuY29uc3QgQ2hhdEFjdGlvbnMgPSB7XHJcbiAgdG9nZ2xlVmlzaWJpbGl0eSgpIHtcclxuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XHJcbiAgICAgIGFjdGlvblR5cGU6IENoYXRDb25zdGFudHMuVE9HR0xFX1ZJU0lCSUxJVFlcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc3VibWl0TWVzc2FnZShtZXNzYWdlLCBjbGFzc05hbWUsIHJlY2VpdmVkKSB7XHJcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xyXG4gICAgICBhY3Rpb25UeXBlOiBDaGF0Q29uc3RhbnRzLlNVQk1JVF9NRVNTQUdFLFxyXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcclxuICAgICAgcmVjZWl2ZWQ6IHJlY2VpdmVkXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGF0QWN0aW9uczsiLCJpbXBvcnQgR2FtZUNvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvR2FtZUNvbnN0YW50cyc7XHJcbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XHJcblxyXG5jb25zdCBHYW1lQWN0aW9ucyA9IHtcclxuICBtYWtlTW92ZShmcm9tLCB0bywgY2FwdHVyZSwgdHlwZSwgZW1pdE1vdmUpIHtcclxuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XHJcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuTUFLRV9NT1ZFLFxyXG4gICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICB0bzogdG8sXHJcbiAgICAgIGNhcHR1cmU6IGNhcHR1cmUsXHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgIGVtaXRNb3ZlOiBlbWl0TW92ZVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBzaG93TW92ZXModW5pdCwgZnJvbSwgaW5SYW5nZSkge1xyXG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5TSE9XX01PVkVTLFxyXG4gICAgICB1bml0OiB1bml0LFxyXG4gICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICBpblJhbmdlOiBpblJhbmdlXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGRyYXcoKSB7XHJcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xyXG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLkRSQVdcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcmVtYXRjaCgpIHtcclxuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XHJcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuUkVNQVRDSFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnYW1lT3ZlcihvcHRpb25zKSB7XHJcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xyXG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLkdBTUVfT1ZFUixcclxuICAgICAgb3B0aW9uczogb3B0aW9uc1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBjaGFuZ2VQcm9tb3Rpb24ocHJvbW90aW9uKSB7XHJcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xyXG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLkNIQU5HRV9QUk9NT1RJT04sXHJcbiAgICAgIHByb21vdGlvbjogcHJvbW90aW9uXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lQWN0aW9uczsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcclxuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcclxuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcclxuXHJcbmNvbnN0IENhcHR1cmVkUGllY2VzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIFxyXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG9uR2FtZUNoYW5nZV0sXHJcblxyXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNhcHR1cmVkUGllY2VzOiBHYW1lU3RvcmUuZ2V0Q2FwdHVyZWRQaWVjZXMoKVxyXG4gICAgfTtcclxuICB9LFxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IGNwID0gdGhpcy5zdGF0ZS5jYXB0dXJlZFBpZWNlcztcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGlkPVwiY2FwdHVyZWQtcGllY2VzXCI+XHJcbiAgICAgICAge2NwLm1hcCgocGllY2VzLCBjb2xvcikgPT4gKFxyXG4gICAgICAgICAgPHVsIGtleT17Y29sb3J9PlxyXG4gICAgICAgICAgICB7cGllY2VzLm1hcCgocGllY2UsIGkpID0+IDxsaSBrZXk9e2l9PntwaWVjZX08L2xpPikudG9BcnJheSgpfVxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICApKS50b0FycmF5KCl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9LFxyXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgY2FwdHVyZWRQaWVjZXM6IEdhbWVTdG9yZS5nZXRDYXB0dXJlZFBpZWNlcygpXHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2FwdHVyZWRQaWVjZXM7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XHJcbmltcG9ydCBDaGF0U3RvcmUgZnJvbSAnLi4vc3RvcmVzL0NoYXRTdG9yZSc7XHJcbmltcG9ydCBDaGF0QWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0NoYXRBY3Rpb25zJztcclxuXHJcbmNvbnN0IENoYXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgdG9rZW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxyXG4gICAgLy8gc291bmRzRW5hYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBvcGVuTW9kYWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxuICB9LFxyXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW5dLFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IENoYXRTdG9yZS5nZXRTdGF0ZSgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaXNDaGF0SGlkZGVuOiBzdGF0ZS5pc0NoYXRIaWRkZW4sXHJcbiAgICAgIG1lc3NhZ2VzOiBzdGF0ZS5tZXNzYWdlcyxcclxuICAgICAgbWVzc2FnZTogJycsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICB0aGlzLnByb3BzLmlvLm9uKCdyZWNlaXZlLW1lc3NhZ2UnLCBkYXRhID0+IHtcclxuICAgICAgQ2hhdEFjdGlvbnMuc3VibWl0TWVzc2FnZShkYXRhLm1lc3NhZ2UsIGRhdGEuY29sb3IgKyAnIGxlZnQnLCB0cnVlKTtcclxuICAgICAgdGhpcy5fbWF5YmVQbGF5U291bmQoKTtcclxuICAgIH0pO1xyXG4gICAgQ2hhdFN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYXRTdG9yZUNoYW5nZSk7XHJcbiAgICBcclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDEzOTkpIENoYXRBY3Rpb25zLnRvZ2dsZVZpc2liaWxpdHkoKTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgQ2hhdFN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25DaGF0U3RvcmVDaGFuZ2UpO1xyXG4gIH0sXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBpZD1cImNoYXQtd3JhcHBlclwiXHJcbiAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLmlzQ2hhdEhpZGRlbiA/ICdoaWRkZW4nIDogbnVsbH0+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPGg0PkNoYXQ8L2g0PlxyXG4gICAgICAgIDxhIGNsYXNzTmFtZT1cImNsb3NlXCJcclxuICAgICAgICAgICBvbkNsaWNrPXtDaGF0QWN0aW9ucy50b2dnbGVWaXNpYmlsaXR5fT5cclxuICAgICAgICAgIHhcclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPGF1ZGlvIHByZWxvYWQ9XCJhdXRvXCIgcmVmPVwibXNnU25kXCI+XHJcbiAgICAgICAgICA8c291cmNlIHNyYz1cIi9zbmQvbWVzc2FnZS5tcDNcIiAvPlxyXG4gICAgICAgIDwvYXVkaW8+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPHVsIGlkPVwiY2hhdC1saXN0XCIgcmVmPVwiY2hhdFwiPlxyXG4gICAgICAgICAge3RoaXMuc3RhdGUubWVzc2FnZXMubWFwKChtZXNzYWdlLCBpKSA9PiAoXHJcbiAgICAgICAgICAgIDxsaSBrZXk9e2l9IGNsYXNzTmFtZT17bWVzc2FnZS5nZXQoJ2NsYXNzTmFtZScpfT5cclxuICAgICAgICAgICAgICB7bWVzc2FnZS5nZXQoJ21lc3NhZ2UnKX1cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICkpLnRvQXJyYXkoKX1cclxuICAgICAgICA8L3VsPlxyXG4gICAgICAgIFxyXG4gICAgICAgIDxzcGFuPldyaXRlIHlvdXIgbWVzc2FnZTo8L3NwYW4+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPGZvcm0gaWQ9XCJjaGF0LWZvcm1cIlxyXG4gICAgICAgICAgICAgIG9uU3VibWl0PXt0aGlzLl9zdWJtaXRNZXNzYWdlfT5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgcmVmPVwibWVzc2FnZVwiXHJcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNvbG9yfVxyXG4gICAgICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5fb25DaGFuZ2VNZXNzYWdlfSAvPlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH0sXHJcbiAgX29uQ2hhdFN0b3JlQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZShDaGF0U3RvcmUuZ2V0U3RhdGUoKSwgdGhpcy5fc2Nyb2xsQ2hhdCk7XHJcbiAgfSxcclxuICBfb25DaGFuZ2VNZXNzYWdlKGUpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe21lc3NhZ2U6IGUudGFyZ2V0LnZhbHVlfSk7XHJcbiAgfSxcclxuICBfc3VibWl0TWVzc2FnZShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCB7aW8sIHRva2VuLCBjb2xvciwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMuc3RhdGUubWVzc2FnZTtcclxuXHJcbiAgICBpZiAoIWlzT3Bwb25lbnRBdmFpbGFibGUpIHtcclxuICAgICAgdGhpcy5yZWZzLm1lc3NhZ2UuZ2V0RE9NTm9kZSgpLmJsdXIoKTtcclxuICAgICAgdGhpcy5wcm9wcy5vcGVuTW9kYWwoJ2luZm8nLCAnU29ycnksIHlvdXIgb3Bwb25lbnQgaXMgbm90IGNvbm5lY3RlZC4gJyArXHJcbiAgICAgICAgJ1lvdSBjYW7igJh0IHNlbmQgbWVzc2FnZXMuJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBDaGF0QWN0aW9ucy5zdWJtaXRNZXNzYWdlKG1lc3NhZ2UsIGNvbG9yICsgJyByaWdodCcsIGZhbHNlKTtcclxuICAgIHRoaXMuc2V0U3RhdGUoe21lc3NhZ2U6ICcnfSk7XHJcblxyXG4gICAgaW8uZW1pdCgnc2VuZC1tZXNzYWdlJywge1xyXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgICBjb2xvcjogY29sb3IsXHJcbiAgICAgIHRva2VuOiB0b2tlblxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBfc2Nyb2xsQ2hhdCgpIHtcclxuICAgIGNvbnN0IGNoYXROb2RlID0gdGhpcy5yZWZzLmNoYXQuZ2V0RE9NTm9kZSgpO1xyXG4gICAgY2hhdE5vZGUuc2Nyb2xsVG9wID0gY2hhdE5vZGUuc2Nyb2xsSGVpZ2h0O1xyXG4gIH0sXHJcbiAgX21heWJlUGxheVNvdW5kKCkge1xyXG4gICAgLy8gaWYgKHRoaXMucHJvcHMuc291bmRzRW5hYmxlZCkge1xyXG4gICAgLy8gICB0aGlzLnJlZnMubXNnU25kLmdldERPTU5vZGUoKS5wbGF5KCk7XHJcbiAgICAvLyB9XHJcbiAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENoYXQ7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XHJcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XHJcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcclxuaW1wb3J0IENoZXNzUGllY2VzIGZyb20gJy4uL2NvbnN0YW50cy9DaGVzc1BpZWNlcyc7XHJcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XHJcbmltcG9ydCBtYXliZVJldmVyc2UgZnJvbSAnLi4vbWl4aW5zL21heWJlUmV2ZXJzZSc7XHJcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcclxuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5pbXBvcnQge1NlcSwgUmVwZWF0LCBMaXN0LCBTZXR9IGZyb20gJ2ltbXV0YWJsZSc7XHJcblxyXG5jb25zdCBGSUxFUyA9IFNlcS5JbmRleGVkKCdhYmNkZWZnaCcpO1xyXG5jb25zdCBSQU5LUyA9IFNlcS5JbmRleGVkKCcxMjM0NTY3OCcpO1xyXG5cclxuY29uc3QgQ2hlc3Nib2FyZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBcclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICB0b2tlbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgbWF5YmVQbGF5U291bmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcclxuICAgIGdhbWVPdmVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgaXNPcHBvbmVudEF2YWlsYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZFxyXG4gIH0sXHJcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgbWF5YmVSZXZlcnNlXSxcclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSBHYW1lU3RvcmUuZ2V0Q2hlc3Nib2FyZFN0YXRlKCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZmVuOiBzdGF0ZS5mZW4sXHJcbiAgICAgIG1vdmVGcm9tOiBudWxsLFxyXG4gICAgICBsYXN0TW92ZTogc3RhdGUubGFzdE1vdmUsXHJcbiAgICAgIGtpbmdJbkNoZWNrOiBmYWxzZVxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgY29uc3Qge2lvLCB0b2tlbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgR2FtZVN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xyXG4gICAgR2FtZVN0b3JlLm9uKCduZXctbW92ZScsIHRoaXMuX29uTmV3TW92ZSk7XHJcblxyXG4gICAgaW8ub24oJ21vdmUnLCBkYXRhID0+IHtcclxuICAgICAgR2FtZUFjdGlvbnMubWFrZU1vdmUoZGF0YS5mcm9tLCBkYXRhLnRvLCBkYXRhLmNhcHR1cmUsIGZhbHNlKTtcclxuICAgICAgdGhpcy5wcm9wcy5tYXliZVBsYXlTb3VuZCgpO1xyXG5cclxuICAgICAgaWYgKCFkYXRhLmdhbWVPdmVyKSB7XHJcbiAgICAgICAgdGhpcy5fcnVuQ2xvY2soKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRvY3VtZW50LmhpZGRlbikge1xyXG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0aXRsZScpWzBdO1xyXG4gICAgICAgIHRpdGxlLnRleHQgPSAnKiAnICsgdGl0bGUudGV4dDtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fcmVtb3ZlQXN0ZXJpc2tGcm9tVGl0bGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpby5vbigncmVtYXRjaC1hY2NlcHRlZCcsICgpID0+IHRoaXMuc2V0U3RhdGUoe21vdmVGcm9tOiBudWxsfSkpO1xyXG4gIH0sXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICBHYW1lU3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xyXG4gICAgR2FtZVN0b3JlLm9uKCduZXctbW92ZScsIHRoaXMuX29uTmV3TW92ZSk7XHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7Y29sb3IsIGlzT3Bwb25lbnRBdmFpbGFibGUsIGdhbWVPdmVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7ZmVuLCBtb3ZlRnJvbSwgbGFzdE1vdmUsIGtpbmdJbkNoZWNrfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCBmZW5BcnJheSA9IGZlbi5zcGxpdCgnICcpO1xyXG4gICAgY29uc3QgcGxhY2VtZW50ID0gZmVuQXJyYXlbMF07XHJcbiAgICBjb25zdCBpc0l0TXlUdXJuID0gZmVuQXJyYXlbMV0gPT09IGNvbG9yLmNoYXJBdCgwKTtcclxuICAgIGNvbnN0IHJvd3MgPSB0aGlzLl9tYXliZVJldmVyc2UocGxhY2VtZW50LnNwbGl0KCcvJykpO1xyXG4gICAgY29uc3QgcmFua3MgPSB0aGlzLl9tYXliZVJldmVyc2UoUkFOS1MsICd3aGl0ZScpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJjaGVzc2JvYXJkXCI+XHJcbiAgICAgICAge3Jvd3MubWFwKChwbGFjZW1lbnQsIGkpID0+XHJcbiAgICAgICAgICA8Um93XHJcbiAgICAgICAgICAgIGtleT17aX1cclxuICAgICAgICAgICAgcmFuaz17cmFua3MuZ2V0KGkpfVxyXG4gICAgICAgICAgICBwbGFjZW1lbnQ9e3BsYWNlbWVudH1cclxuICAgICAgICAgICAgY29sb3I9e2NvbG9yfVxyXG4gICAgICAgICAgICBpc01vdmVhYmxlPXtpc0l0TXlUdXJuICYmIGlzT3Bwb25lbnRBdmFpbGFibGUgJiYgIWdhbWVPdmVyfVxyXG4gICAgICAgICAgICBtb3ZlRnJvbT17bW92ZUZyb219XHJcbiAgICAgICAgICAgIGxhc3RNb3ZlPXtsYXN0TW92ZX1cclxuICAgICAgICAgICAgc2V0TW92ZUZyb209e3RoaXMuX3NldE1vdmVGcm9tfVxyXG4gICAgICAgICAgICBraW5nSW5DaGVjaz17a2luZ0luQ2hlY2t9XHJcbiAgICAgICAgICAgIHZhbGlkTW92ZXM9e0dhbWVTdG9yZS5nZXRWYWxpZE1vdmVzKG1vdmVGcm9tKX0gLz4pfVxyXG4gICAgICA8L3RhYmxlPlxyXG4gICAgKTtcclxuICB9LFxyXG4gIF9vbkdhbWVDaGFuZ2UoY2IpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gR2FtZVN0b3JlLmdldENoZXNzYm9hcmRTdGF0ZSgpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGZlbjogc3RhdGUuZmVuLFxyXG4gICAgICBsYXN0TW92ZTogc3RhdGUubGFzdE1vdmUsXHJcbiAgICAgIGtpbmdJbkNoZWNrOiBzdGF0ZS5jaGVjayAmJiAoc3RhdGUuZmVuLnNwbGl0KCcgJylbMV0gPT09ICd3JyA/ICdLJyA6ICdrJylcclxuICAgIH0sIGNiKTtcclxuICB9LFxyXG4gIF9zZXRNb3ZlRnJvbShzcXVhcmUpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBtb3ZlRnJvbTogc3F1YXJlXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIF9vbk5ld01vdmUobW92ZSkge1xyXG4gICAgY29uc3Qge2lvLCB0b2tlbn0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGlvLmVtaXQoJ25ldy1tb3ZlJywge1xyXG4gICAgICB0b2tlbjogdG9rZW4sXHJcbiAgICAgIG1vdmU6IG1vdmVcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFRpbWVvdXQodGhpcy5wcm9wcy5tYXliZVBsYXlTb3VuZCwgMCk7XHJcbiAgfSxcclxuICBfcnVuQ2xvY2soKSB7XHJcbiAgICBjb25zdCB7aW8sIHRva2VuLCBjb2xvcn0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGlvLmVtaXQoJ2Nsb2NrLXJ1bicsIHtcclxuICAgICAgdG9rZW46IHRva2VuLFxyXG4gICAgICBjb2xvcjogY29sb3JcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKCkge1xyXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RpdGxlJylbMF07XHJcbiAgICB0aXRsZS50ZXh0ID0gdGl0bGUudGV4dC5yZXBsYWNlKCcqICcsICcnKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKTtcclxuICB9XHJcbn0pO1xyXG5cclxuY29uc3QgUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBwcm9wVHlwZXM6IHtcclxuICAgIHJhbms6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJzEnLCcyJywnMycsJzQnLCc1JywnNicsJzcnLCc4J10pLmlzUmVxdWlyZWQsXHJcbiAgICBwbGFjZW1lbnQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxyXG4gICAgaXNNb3ZlYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIG1vdmVGcm9tOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbGFzdE1vdmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBzZXRNb3ZlRnJvbTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIGtpbmdJbkNoZWNrOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW2ZhbHNlLCAnSycsICdrJ10pLmlzUmVxdWlyZWQsXHJcbiAgICB2YWxpZE1vdmVzOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihTZXQpLmlzUmVxdWlyZWRcclxuICB9LFxyXG4gIG1peGluczogW21heWJlUmV2ZXJzZV0sXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtyYW5rLCBwbGFjZW1lbnQsIGNvbG9yfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBmaWxlcyA9IHRoaXMuX21heWJlUmV2ZXJzZShGSUxFUyk7XHJcbiAgICBjb25zdCBwaWVjZXMgPSB0aGlzLl9tYXliZVJldmVyc2UocGxhY2VtZW50Lmxlbmd0aCA8IDggP1xyXG4gICAgICBTZXEocGxhY2VtZW50KS5mbGF0TWFwKHBpZWNlID0+IChcclxuICAgICAgICAvXlxcZCQvLnRlc3QocGllY2UpID8gUmVwZWF0KCctJywgcGFyc2VJbnQocGllY2UsIDEwKSkgOiBwaWVjZVxyXG4gICAgICApKS50b0FycmF5KCkgOlxyXG5cclxuICAgICAgcGxhY2VtZW50LnNwbGl0KCcnKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dHI+XHJcbiAgICAgICAge3BpZWNlcy5tYXAoKHBpZWNlLCBpKSA9PlxyXG4gICAgICAgICAgPENvbHVtblxyXG4gICAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICAgIHNxdWFyZT17ZmlsZXMuZ2V0KGkpICsgcmFua31cclxuICAgICAgICAgICAgcGllY2U9e3BpZWNlfVxyXG4gICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCAncmFuaycsICdwbGFjZW1lbnQnKX0gLz4pfVxyXG4gICAgICA8L3RyPlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxuY29uc3QgQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBwcm9wVHlwZXM6IHtcclxuICAgIHNxdWFyZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgcGllY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxyXG4gICAgaXNNb3ZlYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIG1vdmVGcm9tOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbGFzdE1vdmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBzZXRNb3ZlRnJvbTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIGtpbmdJbkNoZWNrOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW2ZhbHNlLCAnSycsICdrJ10pLmlzUmVxdWlyZWQsXHJcbiAgICB2YWxpZE1vdmVzOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihTZXQpLmlzUmVxdWlyZWRcclxuICB9LFxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7bW92ZUZyb20sIGxhc3RNb3ZlLCBzcXVhcmUsIGNvbG9yLFxyXG4gICAgICAgICAgIGlzTW92ZWFibGUsIGtpbmdJbkNoZWNrLCB2YWxpZE1vdmVzfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBwaWVjZSA9IENoZXNzUGllY2VzW3RoaXMucHJvcHMucGllY2VdO1xyXG4gICAgY29uc3Qgcmd4ID0gY29sb3IgPT09ICd3aGl0ZScgPyAvXltLUVJCTlBdJC8gOiAvXltrcXJibnBdJC87XHJcbiAgICBjb25zdCBpc0RyYWdnYWJsZSA9IHJneC50ZXN0KHRoaXMucHJvcHMucGllY2UpO1xyXG4gICAgY29uc3QgaXNEcm9wcGFibGUgPSBtb3ZlRnJvbSAmJiB2YWxpZE1vdmVzLmhhcyhzcXVhcmUpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0ZCBjbGFzc05hbWU9e2N4KHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IG1vdmVGcm9tID09PSBzcXVhcmUgJiYgIXZhbGlkTW92ZXMuaXNFbXB0eSgpLFxyXG4gICAgICAgICAgICBmcm9tOiBsYXN0TW92ZS5nZXQoJ2Zyb20nKSA9PT0gc3F1YXJlLFxyXG4gICAgICAgICAgICB0bzogbGFzdE1vdmUuZ2V0KCd0bycpID09PSBzcXVhcmUsXHJcbiAgICAgICAgICAgIGRyb3BwYWJsZTogaXNEcm9wcGFibGVcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgb25DbGljaz17IXBpZWNlID8gdGhpcy5fb25DbGlja1NxdWFyZSA6IG51bGx9XHJcbiAgICAgICAgICBvbkRyYWdPdmVyPXtpc0Ryb3BwYWJsZSA/IHRoaXMuX29uRHJhZ092ZXIgOiBudWxsfVxyXG4gICAgICAgICAgb25Ecm9wPXtpc0Ryb3BwYWJsZSA/IHRoaXMuX29uRHJvcCA6IG51bGx9PlxyXG5cclxuICAgICAgICB7cGllY2UgP1xyXG4gICAgICAgICAgPGEgY2xhc3NOYW1lPXtraW5nSW5DaGVjayA9PT0gdGhpcy5wcm9wcy5waWVjZSA/ICdpbi1jaGVjaycgOiBudWxsfVxyXG4gICAgICAgICAgICAgb25DbGljaz17dGhpcy5fb25DbGlja1NxdWFyZX1cclxuICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXt0aGlzLl9vbkRyYWdTdGFydH1cclxuICAgICAgICAgICAgIGRyYWdnYWJsZT17aXNEcmFnZ2FibGUgJiYgaXNNb3ZlYWJsZX0+XHJcbiAgICAgICAgICAgIHtwaWVjZX1cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICA6bnVsbH1cclxuICAgICAgPC90ZD5cclxuICAgICk7XHJcbiAgfSxcclxuICBfb25DbGlja1NxdWFyZSgpIHtcclxuICAgIGNvbnN0IHtpc01vdmVhYmxlLCBjb2xvciwgbW92ZUZyb20sIHNxdWFyZSwgcGllY2V9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHJneCA9IGNvbG9yID09PSAnd2hpdGUnID8gL15bS1FSQk5QXSQvIDogL15ba3FyYm5wXSQvO1xyXG5cclxuICAgIGlmICghaXNNb3ZlYWJsZSB8fCAoIW1vdmVGcm9tICYmICFyZ3gudGVzdChwaWVjZSkpKVxyXG4gICAgICByZXR1cm47XHJcbiAgICBlbHNlIGlmIChtb3ZlRnJvbSAmJiBtb3ZlRnJvbSA9PT0gc3F1YXJlKVxyXG4gICAgICB0aGlzLnByb3BzLnNldE1vdmVGcm9tKG51bGwpO1xyXG4gICAgZWxzZSBpZiAocmd4LnRlc3QocGllY2UpKVxyXG4gICAgICB0aGlzLnByb3BzLnNldE1vdmVGcm9tKHNxdWFyZSk7XHJcbiAgICBlbHNlXHJcbiAgICAgIEdhbWVBY3Rpb25zLm1ha2VNb3ZlKG1vdmVGcm9tLCBzcXVhcmUsIENoZXNzUGllY2VzW3BpZWNlXSwgdHJ1ZSk7XHJcbiAgfSxcclxuICBfb25EcmFnU3RhcnQoZSkge1xyXG4gICAgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcclxuICAgIC8vIHNldERhdGEgaXMgcmVxdWlyZWQgYnkgZmlyZWZveFxyXG4gICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsICcnKTtcclxuXHJcbiAgICB0aGlzLnByb3BzLnNldE1vdmVGcm9tKHRoaXMucHJvcHMuc3F1YXJlKTtcclxuICB9LFxyXG4gIF9vbkRyYWdPdmVyKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XHJcbiAgfSxcclxuICBfb25Ecm9wKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHttb3ZlRnJvbSwgc3F1YXJlLCBwaWVjZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgR2FtZUFjdGlvbnMubWFrZU1vdmUobW92ZUZyb20sIHNxdWFyZSwgQ2hlc3NQaWVjZXNbcGllY2VdLCB0cnVlKTtcclxuICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hlc3Nib2FyZDsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcclxuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcclxuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xyXG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xyXG5pbXBvcnQgQ2hlc3Nib2FyZCBmcm9tICcuL0NoZXNzYm9hcmQnO1xyXG5pbXBvcnQgQ2FwdHVyZWRQaWVjZXMgZnJvbSAnLi9DYXB0dXJlZFBpZWNlcyc7XHJcbmltcG9ydCBUYWJsZU9mTW92ZXMgZnJvbSAnLi9UYWJsZU9mTW92ZXMnO1xyXG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XHJcblxyXG5jb25zdCBDaGVzc2JvYXJkSW50ZXJmYWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIFxyXG4gIHByb3BUeXBlczoge1xyXG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIHRva2VuOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBzb3VuZHNFbmFibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXHJcbiAgICBnYW1lT3ZlcjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgaXNPcHBvbmVudEF2YWlsYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZFxyXG4gIH0sXHJcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgb25HYW1lQ2hhbmdlXSxcclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgcmV0dXJuIEdhbWVTdG9yZS5nZXRTdGF0ZSgpO1xyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSAmJlxyXG4gICAgICAgICFwcmV2UHJvcHMuZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSkge1xyXG4gICAgICB0aGlzLnByb3BzLm9wZW5Nb2RhbCgnaW5mbycsIHRoaXMuX2dldEdhbWVPdmVyTWVzc2FnZSgpKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtwcm9tb3Rpb24sIHR1cm4sIGdhbWVPdmVyLCBjaGVja30gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgaWQ9XCJib2FyZC1tb3Zlcy13cmFwcGVyXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cclxuICAgICAgICBcclxuICAgICAgICA8YXVkaW8gcHJlbG9hZD1cImF1dG9cIiByZWY9XCJtb3ZlU25kXCI+XHJcbiAgICAgICAgICA8c291cmNlIHNyYz1cIi9zbmQvbW92ZS5tcDNcIiAvPlxyXG4gICAgICAgIDwvYXVkaW8+XHJcbiAgICAgICAgPGF1ZGlvIHByZWxvYWQ9XCJhdXRvXCIgcmVmPVwiY2hlY2tTbmRcIj5cclxuICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiL3NuZC9jaGVjay5tcDNcIiAvPlxyXG4gICAgICAgIDwvYXVkaW8+XHJcblxyXG4gICAgICAgIDxkaXYgaWQ9XCJib2FyZC13cmFwcGVyXCI+XHJcbiAgICAgICAgICA8Q2FwdHVyZWRQaWVjZXMgLz5cclxuICAgICAgICAgIDxDaGVzc2JvYXJkXHJcbiAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsICdzb3VuZHNFbmFibGVkJywgJ2dhbWVPdmVyJyl9XHJcbiAgICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlci5nZXQoJ3N0YXR1cycpfVxyXG4gICAgICAgICAgICBtYXliZVBsYXlTb3VuZD17dGhpcy5fbWF5YmVQbGF5U291bmR9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxUYWJsZU9mTW92ZXMgLz5cclxuXHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHJvbW90aW9uXCI+XHJcbiAgICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICAgIDxzcGFuPlByb21vdGlvbjogPC9zcGFuPlxyXG4gICAgICAgICAgICA8c2VsZWN0IHZhbHVlPXtwcm9tb3Rpb259XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uUHJvbW90aW9uQ2hhbmdlfT5cclxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicVwiPlF1ZWVuPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJcIj5Sb29rPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJcIj5CaXNob3A8L29wdGlvbj5cclxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiblwiPktuaWdodDwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgPC9zcGFuPlxyXG5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmZWVkYmFja1wiPlxyXG4gICAgICAgICAgeyFnYW1lT3Zlci5nZXQoJ3N0YXR1cycpID8gXHJcbiAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb25cIj5cclxuICAgICAgICAgICAgICAgIHsvKiBGIC0+IHdoaXRlIGtpbmcsIGYgLT4gYmxhY2sga2luZyovXHJcbiAgICAgICAgICAgICAgICAgIHR1cm4gPT09ICd3JyA/ICdGJyA6ICdmJ31cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAge2Ake3R1cm4gPT09ICd3JyA/ICdXaGl0ZScgOiAnQmxhY2snfSB0byBtb3ZlLmB9XHJcbiAgICAgICAgICAgICAge2NoZWNrID8gPHN0cm9uZz4gQ2hlY2suPC9zdHJvbmc+IDogbnVsbH1cclxuICAgICAgICAgICAgPC9zcGFuPiA6XHJcblxyXG4gICAgICAgICAgICA8c3Ryb25nPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb25cIj5cclxuICAgICAgICAgICAgICAgIHtnYW1lT3Zlci5nZXQoJ3dpbm5lcicpID09PSAnV2hpdGUnID8gJ0YnIDogJ2YnfVxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICB7dGhpcy5fZ2V0R2FtZU92ZXJNZXNzYWdlKCl9XHJcbiAgICAgICAgICAgIDwvc3Ryb25nPlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH0sXHJcbiAgX29uR2FtZUNoYW5nZSgpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoR2FtZVN0b3JlLmdldFN0YXRlKCkpO1xyXG4gIH0sXHJcbiAgX29uUHJvbW90aW9uQ2hhbmdlKGUpIHtcclxuICAgIEdhbWVBY3Rpb25zLmNoYW5nZVByb21vdGlvbihlLnRhcmdldC52YWx1ZSk7XHJcbiAgfSxcclxuICBfbWF5YmVQbGF5U291bmQoKSB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5zb3VuZHNFbmFibGVkKSB7XHJcbiAgICAgIHRoaXMucmVmc1t0aGlzLnN0YXRlLmNoZWNrID8gJ2NoZWNrU25kJyA6ICdtb3ZlU25kJ10uZ2V0RE9NTm9kZSgpLnBsYXkoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9nZXRHYW1lT3Zlck1lc3NhZ2UoKSB7XHJcbiAgICBjb25zdCB0eXBlID0gdGhpcy5wcm9wcy5nYW1lT3Zlci5nZXQoJ3R5cGUnKTtcclxuICAgIGNvbnN0IHdpbm5lciA9IHRoaXMucHJvcHMuZ2FtZU92ZXIuZ2V0KCd3aW5uZXInKTtcclxuICAgIGNvbnN0IGxvc2VyID0gd2lubmVyID09PSAnV2hpdGUnID8gJ0JsYWNrJyA6ICdXaGl0ZSc7XHJcblxyXG4gICAgcmV0dXJuIHR5cGUgPT09ICdjaGVja21hdGUnID8gYENoZWNrbWF0ZS4gJHt3aW5uZXJ9IHdpbnMhYCA6XHJcbiAgICAgIHR5cGUgPT09ICd0aW1lb3V0JyA/IGAke2xvc2VyfeKAmHMgdGltZSBpcyBvdXQuICR7d2lubmVyfSB3aW5zIWAgOlxyXG4gICAgICB0eXBlID09PSAncmVzaWduJyA/IGAke2xvc2VyfSBoYXMgcmVzaWduZWQuICR7d2lubmVyfSB3aW5zIWAgOlxyXG4gICAgICB0eXBlID09PSAnZHJhdycgPyAnRHJhdy4nIDpcclxuICAgICAgdHlwZSA9PT0gJ3N0YWxlbWF0ZScgPyAnRHJhdyAoU3RhbGVtYXRlKS4nIDpcclxuICAgICAgdHlwZSA9PT0gJ3RocmVlZm9sZFJlcGV0aXRpb24nID8gJ0RyYXcgKFRocmVlZm9sZCBSZXBldGl0aW9uKS4nIDpcclxuICAgICAgdHlwZSA9PT0gJ2luc3VmZmljaWVudE1hdGVyaWFsJyA/ICdEcmF3IChJbnN1ZmZpY2llbnQgTWF0ZXJpYWwpJyA6ICcnO1xyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGVzc2JvYXJkSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xyXG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XHJcblxyXG5jb25zdCBQdXJlUmVuZGVyTWl4aW4gPSBSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluO1xyXG5cclxuY29uc3QgQ2xvY2sgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgcGFyYW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxyXG4gIH0sXHJcbiAgbWl4aW5zOiBbUHVyZVJlbmRlck1peGluXSxcclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgY29uc3QgW18sIHRpbWUsIGluY10gPSB0aGlzLnByb3BzLnBhcmFtcztcclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgd2hpdGU6IHRpbWUgKiA2MCxcclxuICAgICAgYmxhY2s6IHRpbWUgKiA2MCxcclxuICAgICAgaW5jOiBpbmMsXHJcbiAgICAgIGNvdW50ZG93bjogbnVsbFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgY29uc3QgaW8gPSB0aGlzLnByb3BzLmlvO1xyXG5cclxuICAgIGlvLm9uKCdjb3VudGRvd24nLCBkYXRhID0+IHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBbZGF0YS5jb2xvcl06IGRhdGEudGltZSxcclxuICAgICAgY291bnRkb3duOiBkYXRhLmNvbG9yXHJcbiAgICB9KSk7XHJcblxyXG4gICAgaW8ub24oJ2NvdW50ZG93bi1nYW1lb3ZlcicsIGRhdGEgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtjb3VudGRvd246IG51bGx9KTtcclxuICAgICAgR2FtZUFjdGlvbnMuZ2FtZU92ZXIoe1xyXG4gICAgICAgIHR5cGU6ICd0aW1lb3V0JyxcclxuICAgICAgICB3aW5uZXI6IGRhdGEuY29sb3IgPT09ICdibGFjaycgPyAnV2hpdGUnIDogJ0JsYWNrJ1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlvLm9uKCdyZW1hdGNoLWFjY2VwdGVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICB3aGl0ZTogdGhpcy5wcm9wcy5wYXJhbXNbMV0gKiA2MCxcclxuICAgICAgICBibGFjazogdGhpcy5wcm9wcy5wYXJhbXNbMV0gKiA2MFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHVsIGlkPVwiY2xvY2tcIj5cclxuICAgICAgICA8VGltZXJcclxuICAgICAgICAgIGNvbG9yPVwid2hpdGVcIlxyXG4gICAgICAgICAgdGltZT17dGhpcy5zdGF0ZS53aGl0ZX1cclxuICAgICAgICAgIGNvdW50ZG93bj17dGhpcy5zdGF0ZS5jb3VudGRvd259IC8+XHJcbiAgICAgICAgPFRpbWVyXHJcbiAgICAgICAgICBjb2xvcj1cImJsYWNrXCJcclxuICAgICAgICAgIHRpbWU9e3RoaXMuc3RhdGUuYmxhY2t9XHJcbiAgICAgICAgICBjb3VudGRvd249e3RoaXMuc3RhdGUuY291bnRkb3dufSAvPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxuY29uc3QgVGltZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHt0aW1lLCBjb2xvciwgY291bnRkb3dufSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBtaW4gPSBNYXRoLmZsb29yKHRpbWUgLyA2MCk7XHJcbiAgICBjb25zdCBzZWMgPSB0aW1lICUgNjA7XHJcbiAgICBjb25zdCB0aW1lTGVmdCA9IGAke21pbn06JHtzZWMgPCAxMCA/ICcwJyArIHNlYyA6IHNlY31gO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxsaSBjbGFzc05hbWU9e2NvbG9yICsgKGNvbG9yID09PSBjb3VudGRvd24gPyAnIHRpY2tpbmcnIDogJycpfT5cclxuICAgICAgICB7dGltZUxlZnR9XHJcbiAgICAgIDwvbGk+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDbG9jazsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcclxuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcclxuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xyXG4vL2ltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XHJcbmltcG9ydCBtYXliZVJldmVyc2UgZnJvbSAnLi4vbWl4aW5zL21heWJlUmV2ZXJzZSc7XHJcbmltcG9ydCBiZWhhdmlvciBmcm9tICcuLi9nYW1lL2JlaGF2aW9yJztcclxuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xyXG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG5cclxuXHJcblxyXG5jb25zdCBHYW1lQm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblxyXG5cdH0sXHJcblx0bWl4aW5zOiBbbWF5YmVSZXZlcnNlXSxcclxuXHRnZXRJbml0aWFsU3RhdGUoKSB7XHJcblx0XHR0aGlzLnN0YXRlID0gR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCk7XHJcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZTtcclxuXHR9LFxyXG5cclxuXHRfb25CdXR0b25DbGljaygpe1xyXG5cdFx0Y29uc3Qge2NvbG9yfSA9IHRoaXMucHJvcHMsXHJcblx0XHRcdHt0dXJuLCBkZWNrfSA9IHRoaXMuc3RhdGU7XHJcblxyXG5cdFx0aWYgKHR1cm4gIT09IGNvbG9yLmNoYXJBdCgwKSB8fCB0aGlzLnN0YXRlLnBlbmRpbmdEcmF3KSByZXR1cm47XHJcblxyXG5cdFx0bGV0IHtib2FyZH0gPSB0aGlzLnN0YXRlO1xyXG5cdFx0aWYgKGNvbG9yID09PSAnYmxhY2snKSBib2FyZCA9IHRoaXMuX3JldmVyc2VCb2FyZChib2FyZCk7XHJcblx0XHR2YXIgZHVrZVBvc2l0aW9uID0gT2JqZWN0LmtleXMoYm9hcmQpLmZpbmQocG9zID0+IChib2FyZFtwb3NdICYmIGJvYXJkW3Bvc10udW5pdCA9PT0gXCJEdWtlXCIgJiYgYm9hcmRbcG9zXS5jb2xvciA9PT0gY29sb3IpKTtcclxuXHRcdHZhciBkdWtlUG9zQXJyID0gSlNPTi5wYXJzZShkdWtlUG9zaXRpb24pO1xyXG5cclxuXHRcdHZhciBkcm9wcGFibGVUaWxlcyA9IHt9O1xyXG5cdFx0W1swLDFdLCBbMCwtMV0sIFsxLDBdLCBbLTEsMF1dLmZvckVhY2goYWRqID0+IHtcclxuXHRcdFx0dmFyIGFkalggPSBkdWtlUG9zQXJyWzBdK2FkalswXSwgYWRqWSA9IGR1a2VQb3NBcnJbMV0rYWRqWzFdO1xyXG5cdFx0XHRpZiAodGhpcy5faXNPbkJvYXJkKHt4OiBhZGpYLCB5OiBhZGpZfSkgJiYgIWJvYXJkW2BbJHthZGpYfSwgJHthZGpZfV1gXSkgXHJcblx0XHRcdFx0ZHJvcHBhYmxlVGlsZXNbYFske2Fkalh9LCAke2Fkall9XWBdID0gdHJ1ZTtcclxuXHRcdH0pXHJcblxyXG5cdFx0aWYgKCFPYmplY3Qua2V5cyhkcm9wcGFibGVUaWxlcykubGVuZ3RoKSB7XHJcblx0XHRcdHN3YWwoXCJDYW4ndCBsZXQgeW91IGRyYXcgdGhhdFwiLCAnTm8gYXZhaWxhYmxlIHRpbGVzIGFkamFjZW50IHRvIHRoZSBEdWtlIScsICdlcnJvcicpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0aWYgKGRlY2subGVuZ3RoKSB7XHJcblx0XHRcdFx0R2FtZUFjdGlvbnMuZHJhdygpO1xyXG5cdFx0XHRcdGxldCB0aGVEcmF3blVuaXQgPSBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKS5wZW5kaW5nRHJhdztcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRcdGRyb3A6IGRyb3BwYWJsZVRpbGVzLFxyXG5cdFx0XHRcdFx0cGVuZGluZ0RyYXc6IHtcclxuXHRcdFx0XHRcdFx0dW5pdDogdGhlRHJhd25Vbml0LFxyXG5cdFx0XHRcdFx0XHRjb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcclxuXHRcdFx0XHRcdFx0c2lkZTogJ2Zyb250J1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1x0XHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIFxyXG5cdFx0XHRcdHN3YWwoXCJDYW4ndCBsZXQgeW91IGRyYXcgdGhhdFwiLCAnTm8gdW5pdHMgbGVmdCB0byBkcmF3IScsICdlcnJvcicpO1xyXG5cdFx0fVx0XHRcclxuXHR9LFxyXG5cclxuXHRfb25EcmF3Q2VsbENsaWNrKCl7XHJcblx0XHR2YXIgbmV3RHJhd247XHJcblx0XHRsZXQgZHJhd25Vbml0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcmF3blVuaXRcIik7XHJcblx0XHRsZXQgY2xhc3NlcyA9IGRyYXduVW5pdC5jbGFzc05hbWU7XHJcblxyXG5cdFx0aWYgKGNsYXNzZXMuaW5jbHVkZXMoJ2Zyb250JykpIHtcclxuXHRcdFx0ZHJhd25Vbml0LmNsYXNzTGlzdC5yZW1vdmUoJ2Zyb250Jyk7XHJcblx0XHRcdGRyYXduVW5pdC5jbGFzc0xpc3QuYWRkKCdiYWNrJyk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0ZHJhd25Vbml0LmNsYXNzTGlzdC5yZW1vdmUoJ2JhY2snKTtcclxuXHRcdFx0ZHJhd25Vbml0LmNsYXNzTGlzdC5hZGQoJ2Zyb250Jyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XHJcblxyXG5cdFx0Y29uc3Qge2lvLCB0b2tlbiwgZ2FtZW92ZXJ9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XHJcblx0XHRHYW1lU3RvcmUub24oJ25ldy1tb3ZlJywgdGhpcy5fb25OZXdNb3ZlKTtcclxuXHRcdEdhbWVTdG9yZS5vbignc3dhbC1lbmRnYW1lJywgdGhpcy5fb25HYW1lT3Zlcik7XHJcblxyXG5cdFx0aW8ub24oJ21vdmUnLCBkYXRhID0+IHtcclxuXHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoZGF0YS5mcm9tLCBkYXRhLnRvLCBkYXRhLmNhcHR1cmUsIGRhdGEudHlwZSwgZmFsc2UpO1xyXG5cclxuXHRcdFx0aWYgKCFkYXRhLmdhbWVPdmVyKSB7XHJcblx0XHRcdCAgdGhpcy5fcnVuQ2xvY2soKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGRvY3VtZW50LmhpZGRlbikge1xyXG5cdFx0XHQgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0aXRsZScpWzBdO1xyXG5cdFx0XHQgIHRpdGxlLnRleHQgPSAnKiAnICsgdGl0bGUudGV4dDtcclxuXHJcblx0XHRcdCAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fcmVtb3ZlQXN0ZXJpc2tGcm9tVGl0bGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBpby5vbignc3dhbC1nYW1lb3ZlcicsIGRhdGEgPT4ge1xyXG5cdFx0Ly8gXHRsZXQgd2lubmVyID0gZGF0YS53aW5uZXI7XHJcblx0XHQvLyBcdHN3YWwoe1xyXG5cdFx0Ly8gXHRcdHRpdGxlOiAnWW91IGxvc2UhJyxcclxuXHRcdC8vIFx0XHR0ZXh0OiAnQmV0dGVyIGx1Y2sgbmV4dCB0aW1lIScsXHJcblx0XHQvLyBcdFx0Ly9pbWFnZVVybDogJ2h0dHA6Ly92aWduZXR0ZTIud2lraWEubm9jb29raWUubmV0L2RpY2tmaWd1cmVzL2ltYWdlcy9kL2QwL1Ryb2xsLUZhY2UtRGFuY2luZzEuanBnL3JldmlzaW9uL2xhdGVzdD9jYj0yMDEyMTExMjE1MDU0MydcclxuXHRcdC8vIFx0XHRpbWFnZVVybDogJ2h0dHBzOi8vaWFtcGllcnJlbWVuYXJkLmZpbGVzLndvcmRwcmVzcy5jb20vMjAxNC8wMi9zYWQtZG9nLmpwZydcclxuXHRcdC8vIFx0fSk7XHJcblx0XHQvLyB9KVxyXG5cdH0sXHJcblxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG5cdFx0R2FtZVN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuX29uQ2hhbmdlKTtcclxuXHR9LFxyXG5cclxuXHRfcmV2ZXJzZVBvc2l0aW9uKHBvcykge1xyXG5cdFx0Y29uc3Qge3NpemV9ID0gdGhpcy5wcm9wcztcclxuXHRcdGxldCBwb3NBcnIgPSBKU09OLnBhcnNlKHBvcyk7XHJcblx0XHRyZXR1cm4gYFske3NpemUtMS1wb3NBcnJbMF19LCAke3NpemUtMS1wb3NBcnJbMV19XWA7XHJcblx0fSxcclxuXHJcblx0X3JldmVyc2VCb2FyZCgpIHtcclxuXHRcdGNvbnN0IHtib2FyZH0gPSB0aGlzLnN0YXRlO1xyXG5cdFx0bGV0IG5ld0JvYXJkID0ge307XHJcblx0XHRPYmplY3Qua2V5cyhib2FyZCkuZm9yRWFjaChwb3MgPT4ge1xyXG5cdFx0XHRuZXdCb2FyZFt0aGlzLl9yZXZlcnNlUG9zaXRpb24ocG9zKV0gPSBib2FyZFtwb3NdO1xyXG5cdFx0fSlcclxuXHRcdHJldHVybiBuZXdCb2FyZDtcclxuXHR9LFxyXG5cclxuXHRfb25HYW1lQ2hhbmdlKGNiKSB7XHJcblx0XHRjb25zdCBzdGF0ZSA9IEdhbWVTdG9yZS5nZXRHYW1lYm9hcmRTdGF0ZSgpO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdGJvYXJkOiBzdGF0ZS5ib2FyZCxcclxuXHRcdFx0bGlnaHR1cDogc3RhdGUubGlnaHR1cCxcclxuXHRcdFx0c3RyaWtlOiBzdGF0ZS5zdHJpa2UsXHJcblx0XHRcdGRyb3A6IHN0YXRlLmRyb3AsXHJcblx0XHRcdHNlbGVjdGVkOiBzdGF0ZS5zZWxlY3RlZCxcclxuXHRcdFx0ZHJhd1VuaXQ6IHN0YXRlLmRyYXdVbml0LFxyXG5cdFx0XHR0dXJuOiBzdGF0ZS50dXJuLFxyXG5cdFx0XHRwZW5kaW5nRHJhdzogc3RhdGUucGVuZGluZ0RyYXdcclxuXHRcdH0sIGNiKTtcclxuXHR9LFxyXG5cclxuXHRfb25OZXdNb3ZlKG1vdmUpIHtcclxuXHRcdGNvbnN0IHtpbywgdG9rZW4sIGNvbG9yfSA9IHRoaXMucHJvcHM7XHJcblx0XHRpby5lbWl0KCduZXctbW92ZScsIHsgdG9rZW4sIG1vdmUsIGNvbG9yIH0pO1xyXG5cdH0sXHJcblxyXG5cdF9vbkdhbWVPdmVyKHt3aW5uZXJ9KSB7XHJcblx0XHRjb25zdCB7aW8sIHRva2VufSA9IHRoaXMucHJvcHM7XHJcblx0XHR2YXIge2dhbWVvdmVyfSA9IHRoaXMucHJvcHM7XHJcblx0XHRpby5lbWl0KCdzd2FsLWVuZGdhbWUnLCB7IHRva2VuLCB3aW5uZXIgfSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyKCkge1xyXG5cdFx0bGV0IHtzdGF0ZSwgcHJvcHN9ID0gdGhpcywgXHJcblx0XHRcdHtzaXplLCBjb2xvciwgZ2FtZW92ZXJ9ID0gcHJvcHMsXHJcblx0XHRcdHtib2FyZCwgc2VsZWN0ZWQsIGxpZ2h0dXAsIHN0cmlrZSwgZHJvcCwgdHVybiwgZHJhd24sIHBlbmRpbmdEcmF3fSA9IHN0YXRlO1xyXG5cclxuXHRcdGlmIChjb2xvciA9PT0gJ2JsYWNrJykgYm9hcmQgPSB0aGlzLl9yZXZlcnNlQm9hcmQoKTtcclxuXHJcblx0XHRsZXQgY2VsbEFycmF5ID0gW107XHJcblx0XHRmb3IgKGxldCBpPTA7IGk8c2l6ZTsgaSsrKSB7XHJcblx0XHRcdGxldCByb3cgPSBbXTtcclxuXHRcdFx0Zm9yIChsZXQgaj0wOyBqPHNpemU7IGorKykge1xyXG5cdFx0XHRcdHJvdy5wdXNoKHt4OmosIHk6aX0pXHJcblx0XHRcdH1cclxuXHRcdFx0Y2VsbEFycmF5LnB1c2gocm93KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDx0YWJsZSBjbGFzc05hbWU9XCJib2FyZFwiPlxyXG5cdFx0XHRcdHtjZWxsQXJyYXkubWFwKChyb3csIGlkeDEpID0+IFxyXG5cdFx0XHRcdFx0PHRyPlxyXG5cdFx0XHRcdFx0XHR7cm93Lm1hcCgoY2VsbCwgaWR4MikgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGNvb3JkcyA9IGBbJHtpZHgyfSwgJHtpZHgxfV1gO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0PHRkIHBvc2l0aW9uPXtjb29yZHN9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxDZWxsIHJlZj17Y29vcmRzfVx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgcG9zaXRpb249e2Nvb3Jkc30gXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1bml0PXtib2FyZFtjb29yZHNdID8gYm9hcmRbY29vcmRzXS51bml0IDogbnVsbH0gXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb2xvcj17Ym9hcmRbY29vcmRzXSA/IGJvYXJkW2Nvb3Jkc10uY29sb3IgOiBudWxsfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cGxheWVyQ29sb3I9e2NvbG9yfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2lkZT17Ym9hcmRbY29vcmRzXSA/IGJvYXJkW2Nvb3Jkc10uc2lkZSA6IG51bGx9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaXR1cD17bGlnaHR1cFtjb29yZHNdfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3RyaWthYmxlPXtzdHJpa2VbY29vcmRzXX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNhbkRyb3A9e2Ryb3BbY29vcmRzXX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkPXtzZWxlY3RlZH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR1cm49e3R1cm59XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwZW5kaW5nRHJhdz17cGVuZGluZ0RyYXd9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRTZWxlY3RlZD17dGhpcy5fc2V0U2VsZWN0ZWR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXREcmF3YWJsZT17dGhpcy5fc2V0RHJhd2FibGV9IFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0RHJvcHBhYmxlPXt0aGlzLl9zZXREcm9wcGFibGV9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRHYW1lUG9pbnQ9e3RoaXMuX3NldEdhbWVQb2ludH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGdhbWVvdmVyPXtnYW1lb3Zlcj8gZmFsc2U6IGdhbWVvdmVyfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdCl9XHJcblx0XHRcdFx0XHQ8L3RyPlxyXG5cdFx0XHRcdCl9XHJcblx0XHRcdFx0PC90YWJsZT5cclxuXHRcdFx0XHQ8ZGl2IGlkPVwiZHJhd1wiPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiBjbGFzc05hbWU9XCJidG5cIiBvbkNsaWNrPXt0aGlzLl9vbkJ1dHRvbkNsaWNrfT5EUkFXPC9idXR0b24+XHJcblx0XHRcdFx0XHQ8RHJhd25Db21wb25lbnQgcG9zaXRpb249J1stMSwgLTFdJyBcclxuXHRcdFx0XHRcdFx0dW5pdD17cGVuZGluZ0RyYXc/IHBlbmRpbmdEcmF3LnVuaXQgOiBudWxsfSBcclxuXHRcdFx0XHRcdFx0Y29sb3I9e3BlbmRpbmdEcmF3PyBwZW5kaW5nRHJhdy5jb2xvciA6IG51bGx9IFxyXG5cdFx0XHRcdFx0XHRzaWRlPXtwZW5kaW5nRHJhdz8gcGVuZGluZ0RyYXcuc2lkZSA6IG51bGx9IFxyXG5cdFx0XHRcdFx0XHRkcmF3QVVuaXQ9e3RoaXMuX29uRHJhd0NlbGxDbGlja31cclxuXHRcdFx0XHRcdFx0cGxheWVyQ29sb3I9e2NvbG9yfSAvPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0X29uRHJhd25EcmFnU3RhcnQoZSkge1xyXG5cdFx0ZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcclxuXHRcdGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCAnJyk7XHJcblxyXG5cdFx0Y29uc3Qge3VuaXQsIHBvc2l0aW9uLCBjb2xvciwgc2VsZWN0ZWQsIHNldFNlbGVjdGVkLCBsaXR1cCwgc3RyaWthYmxlLCBkcm9wcGFibGUsIHNpZGV9ID0gdGhpcy5wcm9wcztcclxuXHRcdHRoaXMuX3NldFNlbGVjdGVkKCdbLTEsLTFdJywgJ2RyYXcnKTtcclxuXHJcblx0fSxcclxuXHJcblx0X3NldFNlbGVjdGVkKHBvc2l0aW9uLCBpblJhbmdlKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0c2VsZWN0ZWQ6IHBvc2l0aW9uLFxyXG5cdFx0XHRsaWdodHVwOiB0aGlzLl9nZXRWYWxpZE1vdmVzKHBvc2l0aW9uLCBpblJhbmdlKS5tb3ZhYmxlVGlsZXMsXHJcblx0XHRcdHN0cmlrZTogdGhpcy5fZ2V0VmFsaWRNb3Zlcyhwb3NpdGlvbiwgaW5SYW5nZSkuc3RyaWthYmxlVGlsZXNcclxuXHRcdH0pXHJcblx0fSxcclxuXHJcblx0X3NldERyYXduVW5pdCh0aWxlKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0cGVuZGluZ0RyYXc6IHtcclxuXHRcdFx0XHR1bml0OiB0aWxlLFxyXG5cdFx0XHRcdGNvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxyXG5cdFx0XHRcdHNpZGU6ICdmcm9udCdcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblx0fSxcclxuXHRfc2V0R2FtZVBvaW50KCl7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0Z2FtZW92ZXI6IHRydWVcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdF9nZXRWYWxpZE1vdmVzKHBvc2l0aW9uLCBtb3Zlcykge1xyXG5cdFx0aWYgKCFtb3ZlcykgcmV0dXJuO1xyXG5cdFx0Y29uc3Qge2NvbG9yOiBwbGF5ZXJDb2xvcn0gPSB0aGlzLnByb3BzO1xyXG5cdFx0bGV0IGluUmFuZ2UgPSBbXSwgbW92YWJsZVRpbGVzID0ge30sIHN0cmlrYWJsZVRpbGVzID0ge30sXHJcblx0XHRcdHBvc0FyciA9IEpTT04ucGFyc2UocG9zaXRpb24pLFxyXG5cdFx0XHR0aGVCb2FyZCA9IHBsYXllckNvbG9yID09PSAnYmxhY2snID8gdGhpcy5fcmV2ZXJzZUJvYXJkKCkgOiB0aGlzLnN0YXRlLmJvYXJkO1xyXG5cclxuXHRcdC8vIFN0b3JlIGFsbCB0aWxlcyB3aXRoaW4gcmFuZ2Ugb2YgdGhlIHVuaXQncyBiZWhhdmlvclxyXG5cdFx0T2JqZWN0LmtleXMobW92ZXMpLmZvckVhY2gobW92ZSA9PiB7XHJcblx0XHRcdGxldCBtb3ZlQXJyID0gSlNPTi5wYXJzZShtb3ZlKSwgbW92ZU5hbWUgPSBtb3Zlc1ttb3ZlXSxcclxuXHRcdFx0XHQvLyAoeCwgeSk6IGNvb3JkaW5hdGVzIG9mIHRoZSBtYXJrZWQgdGlsZVxyXG5cdFx0XHRcdHggPSBwb3NBcnJbMF0gKyBtb3ZlQXJyWzBdLCBcclxuXHRcdFx0XHR5ID0gcG9zQXJyWzFdICsgbW92ZUFyclsxXTtcclxuXHJcblx0XHRcdC8vIHN0cmlrZSBhbmQganVtcCBhcmUgc3RyYWlnaHRmb3J3YXJkOyBzaW1wbHkgc3RvcmUgdGhlIG1hcmtlZCB0aWxlXHJcblx0XHRcdGlmIChtb3ZlTmFtZSA9PT0gJ3N0cmlrZScpIGluUmFuZ2UucHVzaCh7eDogeCwgeTogeSwgdHlwZTogJ3N0cmlrZSd9KTtcclxuXHRcdFx0ZWxzZSBpZiAobW92ZU5hbWUgPT09ICdqdW1wJykgaW5SYW5nZS5wdXNoKHt4OiB4LCB5OiB5LCB0eXBlOiAnbW92ZSd9KTtcclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0bGV0IGRlbHRhWCA9IE1hdGguc2lnbihtb3ZlQXJyWzBdKSwgXHJcblx0XHRcdFx0XHRkZWx0YVkgPSBNYXRoLnNpZ24obW92ZUFyclsxXSksXHJcblx0XHRcdFx0XHRpID0gcG9zQXJyWzBdICsgZGVsdGFYLCBcclxuXHRcdFx0XHRcdGogPSBwb3NBcnJbMV0gKyBkZWx0YVk7XHJcblxyXG5cdFx0XHRcdC8vIGxvb3AgdGhyb3VnaCBhbGwgdGlsZXMgb24gYm9hcmQgaW4gYSBzdHJhaWdodCBwYXRoIGJldHdlZW4gc3RhcnRpbmcgdGlsZSBhbmQgbWFya2VkIHRpbGVcclxuXHRcdFx0XHR3aGlsZSAodGhpcy5faXNPbkJvYXJkKHt4OiBpLCB5OiBqfSkpIHtcclxuXHRcdFx0XHRcdC8vIHNsaWRpbmcgdW5pdHMgY2FuIGxhbmQgb24gYW55IHRpbGUgd2l0aGluIGEgc3RyYWlnaHQgcGF0aFxyXG5cdFx0XHRcdFx0Ly8gbm9uLXNsaWRpbmcgdW5pdHMgY2FuIG9ubHkgbGFuZCBvbiB0aGUgbWFya2VkIHRpbGVcclxuXHRcdFx0XHRcdGlmIChtb3ZlTmFtZS5pbmNsdWRlcygnc2xpZGUnKSB8fCAoeCA9PT0gaSAmJiB5ID09PSBqKSlcclxuXHRcdFx0XHRcdFx0aW5SYW5nZS5wdXNoKHt4OiBpLCB5OiBqLCB0eXBlOiAnbW92ZSd9KTtcclxuXHJcblx0XHRcdFx0XHQvLyBpZiB1bml0IGNhbid0IGp1bXAgYW5kIHRoZXJlIGlzIGEgdW5pdCBpbiB0aGUgd2F5LCBicmVha1xyXG5cdFx0XHRcdFx0bGV0IHVuaXRJblRoZVdheSA9IHRoZUJvYXJkW2BbJHtpfSwgJHtqfV1gXTtcclxuXHRcdFx0XHRcdGlmICh1bml0SW5UaGVXYXkgJiYgIW1vdmVOYW1lLmluY2x1ZGVzKCdqdW1wJykpIGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdGkgKz0gZGVsdGFYOyBqICs9IGRlbHRhWTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEZpbHRlciBvdXQgdGlsZXMgdGhhdCBhcmUgb2NjdXBpZWQgYnkgYWxsaWVkIHVuaXRzIG9yIG5vdCBvbiB0aGUgYm9hcmQsXHJcblx0XHQvLyB0aGVuIG9yZ2FuaXplIGJ5IG1vdmFibGUgYW5kIHN0cmlrYWJsZSB0aWxlc1xyXG5cdFx0aW5SYW5nZS5maWx0ZXIocmFuZ2UgPT4ge1xyXG5cdFx0XHRsZXQgdGFyZ2V0VW5pdCA9IHRoZUJvYXJkW2BbJHtyYW5nZS54fSwgJHtyYW5nZS55fV1gXTtcclxuXHRcdFx0aWYgKHRhcmdldFVuaXQgJiYgdGhlQm9hcmRbcG9zaXRpb25dLmNvbG9yID09PSB0YXJnZXRVbml0LmNvbG9yKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdHJldHVybiB0aGlzLl9pc09uQm9hcmQocmFuZ2UpO1xyXG5cdFx0fSkuZm9yRWFjaChyYW5nZSA9PiB7XHJcblx0XHRcdGlmIChyYW5nZS50eXBlID09PSAnbW92ZScpIG1vdmFibGVUaWxlc1tgWyR7cmFuZ2UueH0sICR7cmFuZ2UueX1dYF0gPSB0cnVlO1xyXG5cdFx0XHRlbHNlIGlmIChyYW5nZS50eXBlID09PSAnc3RyaWtlJykgc3RyaWthYmxlVGlsZXNbYFske3JhbmdlLnh9LCAke3JhbmdlLnl9XWBdID0gdHJ1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB7IG1vdmFibGVUaWxlcywgc3RyaWthYmxlVGlsZXMgfTtcclxuXHR9LFxyXG5cclxuXHRfaXNPbkJvYXJkKHt4LCB5fSkge1xyXG5cdCAgcmV0dXJuIHggPj0gMCAmJiB5ID49IDAgJiYgeCA8IDYgJiYgeSA8IDY7XHJcblx0fSxcclxuXHJcblx0X3J1bkNsb2NrKCkge1xyXG5cdCAgY29uc3Qge2lvLCB0b2tlbiwgY29sb3J9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0ICBpby5lbWl0KCdjbG9jay1ydW4nLCB7XHJcblx0ICAgIHRva2VuOiB0b2tlbixcclxuXHQgICAgY29sb3I6IGNvbG9yXHJcblx0ICB9KTtcclxuXHR9LFxyXG5cdF9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSgpIHtcclxuXHQgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0aXRsZScpWzBdO1xyXG5cdCAgdGl0bGUudGV4dCA9IHRpdGxlLnRleHQucmVwbGFjZSgnKiAnLCAnJyk7XHJcblx0ICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5cclxuY29uc3QgQ2VsbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHJcblx0fSxcclxuXHJcbiAgXHRjb21wb25lbnREaWRNb3VudCgpIHtcclxuXHRcdFxyXG5cdH0sXHJcblxyXG5cdGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuXHRcdFx0XHJcblx0fSxcclxuXHJcblx0bWl4aW5zOiBbXSxcclxuXHJcblx0X29uQ2xpY2tTcXVhcmUoKSB7XHJcblxyXG5cdFx0Y29uc3Qge3VuaXQsIGNvbG9yLCBzZXRTZWxlY3RlZCwgbGl0dXAsIHN0cmlrYWJsZSwgY2FuRHJvcCwgc2lkZSwgcGxheWVyQ29sb3IsIHR1cm4sIHBlbmRpbmdEcmF3fSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0bGV0IHtwb3NpdGlvbiwgc2VsZWN0ZWR9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHR2YXIgZ2FtZW92ZXIgPSBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKS5nYW1lb3ZlcjtcclxuXHRcdGlmKGdhbWVvdmVyLmdldCgnc3RhdHVzJykpIHJldHVybjtcclxuXHJcblx0XHQvLyBvbmx5IGxldCB0aGUgcGxheWVyIGFjdCB3aGVuIGl0IGlzIHRoZWlyIHR1cm5cclxuXHRcdC8vIGlmIHBsYXllciBkcmV3IGEgdW5pdCwgZG9uJ3QgbGV0IHRoZW0gbWFrZSBhIG5vcm1hbCBtb3ZlXHJcblxyXG5cdFx0aWYgKCAodHVybiAhPT0gcGxheWVyQ29sb3IuY2hhckF0KDApKSB8fCBwZW5kaW5nRHJhdyApIHJldHVybjtcclxuXHJcblx0XHQvLyBpZiB0aGVyZSBpcyBubyBjdXJyZW50bHkgc2VsZWN0ZWQgdW5pdCwgY2xpY2sgYSB1bml0IChvZiB0aGUgc2FtZSBjb2xvcikgdG8gc2VsZWN0IGl0XHJcblx0XHRpZiAoIXNlbGVjdGVkICYmIHVuaXQgJiYgY29sb3IgPT09IHBsYXllckNvbG9yKSB7XHJcblx0XHRcdGxldCBtb3ZlcyA9IGJlaGF2aW9yW3VuaXRdW3NpZGVdO1xyXG5cdFx0XHRzZXRTZWxlY3RlZChwb3NpdGlvbiwgbW92ZXMpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gaWYgdGhlcmUgaXMgY3VycmVudGx5IGEgc2VsZWN0ZWQgdW5pdCBvbiB0aGUgYm9hcmRcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHQvLyB3aGVuIGVtaXR0aW5nIGEgbW92ZSBldmVudCwgc2VuZCB0aGUgXCJyZWFsXCIgcG9zaXRpb24gKGkuZS4gaWYgYmxhY2ssIHRoZSByZXZlcnNlIG9mIHRoZSByZW5kZXJlZCB2aWV3KSBcclxuXHRcdFx0aWYgKHBsYXllckNvbG9yID09PSAnYmxhY2snKSB7XHJcblx0XHRcdFx0cG9zaXRpb24gPSB0aGlzLl9yZXZlcnNlUG9zaXRpb24ocG9zaXRpb24pO1xyXG5cdFx0XHRcdHNlbGVjdGVkID0gdGhpcy5fcmV2ZXJzZVBvc2l0aW9uKHNlbGVjdGVkKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gY2FuIGRvIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxyXG5cclxuXHRcdFx0Ly8gMS4gbW92ZSB0byBhIHRpbGUgZ2xvd2luZyByZWRcclxuXHRcdFx0aWYgKHRoaXMucHJvcHMubGl0dXApIHtcclxuXHRcdFx0XHRsZXQgY2FwdHVyZSA9IHVuaXQgJiYgY29sb3IgIT09IHBsYXllckNvbG9yO1xyXG5cdFx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKHNlbGVjdGVkLCBwb3NpdGlvbiwgY2FwdHVyZSwgJ21vdmUnLCB0cnVlKTtcclxuXHRcdFx0XHRzZXRTZWxlY3RlZChudWxsLCBbXSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIDIuIGF0dGFjayBhIHVuaXQgb24gYSB0aWxlIGdsb3dpbmcgeWVsbG93LCB3aXRob3V0IG1vdmluZ1xyXG5cdFx0XHRlbHNlIGlmICh0aGlzLnByb3BzLnN0cmlrYWJsZSAmJiB1bml0ICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcikge1xyXG5cdFx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKHNlbGVjdGVkLCBwb3NpdGlvbiwgdHJ1ZSwgJ3N0cmlrZScsIHRydWUpO1xyXG5cdFx0XHRcdHNldFNlbGVjdGVkKG51bGwsIFtdKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gMy4gZGVzZWxlY3QgdGhlIGN1cnJlbnQgdW5pdCBieSBjbGlja2luZyBvbiBpdFxyXG5cdFx0XHRlbHNlIGlmIChzZWxlY3RlZCA9PT0gcG9zaXRpb24pIHtcclxuXHRcdFx0XHRzZXRTZWxlY3RlZChudWxsLCBbXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cdFx0XHJcblx0fSxcclxuXHJcblx0X29uRHJhZ1N0YXJ0KGUpIHtcclxuXHRcdGNvbnN0IHt1bml0LCBwb3NpdGlvbiwgY29sb3IsIHNlbGVjdGVkLCBzZXRTZWxlY3RlZCwgbGl0dXAsIHN0cmlrYWJsZSwgc2lkZSwgY2FuRHJvcCwgcGxheWVyQ29sb3IsIHR1cm4sIHBlbmRpbmdEcmF3fSA9IHRoaXMucHJvcHM7XHJcblx0XHRcclxuXHRcdHZhciBnYW1lb3ZlciA9IEdhbWVTdG9yZS5nZXRHYW1lYm9hcmRTdGF0ZSgpLmdhbWVvdmVyO1xyXG5cdFx0aWYoZ2FtZW92ZXIuZ2V0KCdzdGF0dXMnKSkgcmV0dXJuO1xyXG5cclxuXHRcdGlmICggKHR1cm4gIT09IHBsYXllckNvbG9yLmNoYXJBdCgwKSkgfHwgcGVuZGluZ0RyYXcgKSByZXR1cm47XHJcblxyXG5cdFx0ZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcclxuXHRcdGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCAnJyk7XHJcblxyXG5cdFx0aWYgKCFzZWxlY3RlZCAmJiB1bml0ICYmIGNvbG9yID09PSBwbGF5ZXJDb2xvcikge1xyXG5cdFx0XHRsZXQgbW92ZXMgPSBiZWhhdmlvclt1bml0XVtzaWRlXTtcclxuXHRcdFx0c2V0U2VsZWN0ZWQocG9zaXRpb24sIG1vdmVzKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdF9vbkRyYWdPdmVyKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XHJcblx0fSxcclxuXHRfb25Ecm9wKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRjb25zdCB7dW5pdCwgY29sb3IsIHNldFNlbGVjdGVkLCBzZXREcm9wcGFibGUsIHNldERyYXdhYmxlLCBsaXR1cCwgc3RyaWthYmxlLCBjYW5Ecm9wLCBzaWRlLCBwbGF5ZXJDb2xvciwgcGVuZGluZ0RyYXd9ID0gdGhpcy5wcm9wcztcclxuXHRcdGxldCB7cG9zaXRpb24sIHNlbGVjdGVkfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0aWYgKHBsYXllckNvbG9yID09PSAnYmxhY2snKSB7XHJcblx0XHRcdGlmIChwb3NpdGlvbikgcG9zaXRpb24gPSB0aGlzLl9yZXZlcnNlUG9zaXRpb24ocG9zaXRpb24pO1xyXG5cdFx0XHRpZiAoc2VsZWN0ZWQpIHNlbGVjdGVkID0gdGhpcy5fcmV2ZXJzZVBvc2l0aW9uKHNlbGVjdGVkKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnByb3BzLmxpdHVwKSB7XHJcblx0XHRcdGxldCBjYXB0dXJlID0gdW5pdCAmJiBjb2xvciAhPT0gcGxheWVyQ29sb3I7XHJcblx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKHNlbGVjdGVkLCBwb3NpdGlvbiwgY2FwdHVyZSwgJ21vdmUnLCB0cnVlKTtcclxuXHRcdH1cdFx0XHJcblx0XHRlbHNlIGlmICh0aGlzLnByb3BzLnN0cmlrYWJsZSAmJiB1bml0KXtcclxuXHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCB0cnVlLCAnc3RyaWtlJywgdHJ1ZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKHRoaXMucHJvcHMuY2FuRHJvcCl7XHJcblx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKHBlbmRpbmdEcmF3LCBwb3NpdGlvbiwgZmFsc2UsICdtb3ZlJywgdHJ1ZSk7XHJcblx0XHR9XHJcblx0XHRzZXRTZWxlY3RlZChudWxsLCBbXSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdF9yZXZlcnNlUG9zaXRpb24ocG9zKSB7XHJcblx0XHRsZXQgcG9zQXJyID0gSlNPTi5wYXJzZShwb3MpO1xyXG5cdFx0cmV0dXJuIGBbJHs1LXBvc0FyclswXX0sICR7NS1wb3NBcnJbMV19XWA7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7dW5pdCwgY29sb3IsIGxpdHVwLCBzdHJpa2FibGUsIGNhbkRyb3AsIHNpZGUsIHBsYXllckNvbG9yLCBwb3NpdGlvbiwgc2VsZWN0ZWR9ID0gdGhpcy5wcm9wcztcclxuXHRcdFxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PHNlY3Rpb24gY2xhc3NOYW1lPVwiY2VsbENvbnRhaW5lclwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjeCh7XHJcblx0XHRcdFx0XHRcdHRpbGU6IHRydWUsXHJcblx0XHRcdFx0XHRcdHNlbGVjdGVkOiBwb3NpdGlvbiA9PT0gc2VsZWN0ZWQsXHJcblx0XHRcdFx0XHRcdFtzaWRlXTogdHJ1ZVxyXG5cdFx0XHRcdFx0fSl9XHJcblx0XHRcdFx0XHRvbkRyYWdPdmVyPXt0aGlzLl9vbkRyYWdPdmVyfVxyXG5cdFx0XHRcdFx0b25Ecm9wPXt0aGlzLl9vbkRyb3B9XHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9e2N4KHtcclxuXHRcdFx0XHRcdFx0XHRcdHVuaXQ6ICEhdW5pdCxcclxuXHRcdFx0XHRcdFx0XHRcdGxpdHVwOiBsaXR1cCxcclxuXHRcdFx0XHRcdFx0XHRcdHN0cmlrYWJsZTogc3RyaWthYmxlLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FuRHJvcDogY2FuRHJvcCxcclxuXHRcdFx0XHRcdFx0XHRcdG9wcG9uZW50OiBjb2xvciAmJiBjb2xvciAhPT0gcGxheWVyQ29sb3IsXHJcblx0XHRcdFx0XHRcdFx0XHRbc2lkZV06IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRbdW5pdF06IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRbY29sb3JdOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdH0pfVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuX29uQ2xpY2tTcXVhcmV9XHJcblx0XHRcdFx0XHRcdFx0b25EcmFnU3RhcnQ9e3RoaXMuX29uRHJhZ1N0YXJ0fVxyXG5cdFx0XHRcdFx0XHRcdGRyYWdnYWJsZSAvPlxyXG5cdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1wiZnJvbnQtZmFjZVwiOiB0cnVlLCBvcHBvbmVudDogY29sb3IgJiYgY29sb3IgIT09IHBsYXllckNvbG9yfSl9IC8+XHJcblx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPXtjeCh7XCJiYWNrLWZhY2VcIjogdHJ1ZSwgb3Bwb25lbnQ6IGNvbG9yICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcn0pfSAvPlxyXG5cdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT1cImxlZnQtZmFjZVwiIC8+XHJcblx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPVwicmlnaHQtZmFjZVwiIC8+XHJcblx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPVwidG9wLWZhY2VcIiAvPlxyXG5cdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT1cImJvdHRvbS1mYWNlXCIgLz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdCk7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5jb25zdCBEcmF3bkNvbXBvbmVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICBcdCByZXR1cm4ge1xyXG4gICAgXHQgXHQvL3NpZGU6ICdmcm9udCcsXHJcbiAgICBcdCBcdGRyYXduOiBudWxsXHJcbiAgICBcdCB9O1xyXG4gIFx0fSxcclxuICBcdGNvbXBvbmVudERpZE1vdW50KCkge1xyXG5cclxuXHRcdFxyXG5cdH0sXHJcblxyXG5cdGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuXHRcdFxyXG5cdFxyXG5cdH0sXHJcblxyXG5cdG1peGluczogW10sXHJcblxyXG5cclxuXHRfb25EcmFnU3RhcnQoZSkge1xyXG5cdFx0ZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcclxuXHRcdGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCAnJyk7XHJcblxyXG5cdFx0Y29uc3Qge3VuaXQsIHBvc2l0aW9uLCBjb2xvciwgc2lkZX0gPSB0aGlzLnByb3BzO1xyXG5cdH0sXHJcblx0X29uRHJhZ092ZXIoZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0ZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcclxuXHR9LFxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdHZhciB7dW5pdCwgY29sb3IsIHNpZGUsIGRyYWdnYWJsZSwgZHJhd0FVbml0LCBwb3NpdGlvbiwgcGxheWVyQ29sb3J9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPVwiZHJhd25Vbml0XCIgZHJhZ2dhYmxlIFxyXG5cdFx0XHRcdGNsYXNzTmFtZT17Y3goe1x0XHJcblx0XHRcdFx0XHR0aWxlOiB0cnVlLFxyXG5cdFx0XHRcdFx0W3VuaXRdOiB0cnVlLFxyXG5cdFx0XHRcdFx0W2NvbG9yXTogdHJ1ZSxcclxuXHRcdFx0XHRcdFtzaWRlXTogdHJ1ZVxyXG5cdFx0XHRcdH0pfSA+XHJcblx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9e2N4KHtcclxuXHRcdFx0XHRcdFx0XHR1bml0OiAhIXVuaXQsXHJcblx0XHRcdFx0XHRcdFx0b3Bwb25lbnQ6IGNvbG9yICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcixcclxuXHRcdFx0XHRcdFx0XHRbc2lkZV06IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0W3VuaXRdOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFtjb2xvcl06IHRydWUsXHJcblx0XHRcdFx0XHRcdH0pfVxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtkcmF3QVVuaXR9XHJcblx0XHRcdFx0XHRcdC8vIG9uRHJhZ1N0YXJ0PXt0aGlzLl9vbkRyYWdTdGFydH1cclxuXHRcdFx0XHRcdFx0ZHJhZ2dhYmxlPlxyXG5cdFx0XHRcdFx0PC9hPlxyXG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcImZyb250LWZhY2VcIjogdHJ1ZSwgXCJkcmF3LXByZXZpZXdcIjogdHJ1ZSwgb3Bwb25lbnQ6IGNvbG9yICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcn0pfSAvPlxyXG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcImJhY2stZmFjZVwiOiB0cnVlLCBcImRyYXctcHJldmlld1wiOiB0cnVlLCAgb3Bwb25lbnQ6IGNvbG9yICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcn0pfSAvPlxyXG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcImxlZnQtZmFjZVwiOiB0cnVlLCBcImRyYXctcHJldmlld1wiOiB0cnVlfSl9IC8+XHJcblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1wicmlnaHQtZmFjZVwiOiB0cnVlLCBcImRyYXctcHJldmlld1wiOiB0cnVlfSl9IC8+XHJcblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1widG9wLWZhY2VcIjogdHJ1ZSwgXCJkcmF3LXByZXZpZXdcIjogdHJ1ZX0pfSAvPlxyXG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcImJvdHRvbS1mYWNlXCI6IHRydWUsIFwiZHJhdy1wcmV2aWV3XCI6IHRydWV9KX0gLz5cclxuXHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHR9KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtCb2FyZDogR2FtZUJvYXJkLCBDZWxsOiBDZWxsLCBEcmF3bkNvbXBvbmVudDogRHJhd25Db21wb25lbnR9OyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xyXG5pbXBvcnQgQ2xvY2sgZnJvbSAnLi9DbG9jayc7XHJcbmltcG9ydCBDaGF0U3RvcmUgZnJvbSAnLi4vc3RvcmVzL0NoYXRTdG9yZSc7XHJcbmltcG9ydCBDaGF0QWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0NoYXRBY3Rpb25zJztcclxuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xyXG5cclxuY29uc3QgR2FtZUhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBcclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBwYXJhbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxyXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXHJcbiAgICBvcGVuTW9kYWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBnYW1lT3ZlcjogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcclxuICB9LFxyXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW5dLFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICByZXR1cm4gb21pdChDaGF0U3RvcmUuZ2V0U3RhdGUoKSwgJ21lc3NhZ2VzJyk7XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIENoYXRTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25DaGF0Q2hhbmdlKTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgQ2hhdFN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25DaGF0Q2hhbmdlKTtcclxuICB9LFxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtpbywgcGFyYW1zLCBnYW1lT3ZlciwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgdW5zZWVuQ291bnQgPSB0aGlzLnN0YXRlLnVuc2VlbkNvdW50O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cclxuXHJcbiAgICAgICAgPENsb2NrXHJcbiAgICAgICAgICBpbz17aW99XHJcbiAgICAgICAgICBwYXJhbXM9e3BhcmFtc30gLz5cclxuXHJcbiAgICAgICAgey8qPHNwYW4gaWQ9XCJnYW1lLXR5cGVcIj5cclxuICAgICAgICAgIHtgJHtwYXJhbXNbMV19fCR7cGFyYW1zWzJdfWB9XHJcbiAgICAgICAgPC9zcGFuPiovfVxyXG5cclxuICAgICAgICA8YSBjbGFzc05hbWU9XCJidG5cIiBocmVmPVwiL1wiPk5ldyBnYW1lPC9hPlxyXG5cclxuICAgICAgICB7IWdhbWVPdmVyICYmIGlzT3Bwb25lbnRBdmFpbGFibGUgP1xyXG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi0tcmVkIHJlc2lnblwiXHJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5fb25SZXNpZ259PlxyXG4gICAgICAgICAgICBSZXNpZ25cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICA6Z2FtZU92ZXIgP1xyXG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi0tcmVkIHJlbWF0Y2hcIlxyXG4gICAgICAgICAgICAgb25DbGljaz17dGhpcy5fb25SZW1hdGNofT5cclxuICAgICAgICAgICAgUmVtYXRjaFxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgIDpudWxsfVxyXG5cclxuICAgICAgICA8YSBpZD1cImNoYXQtaWNvblwiXHJcbiAgICAgICAgICAgb25DbGljaz17Q2hhdEFjdGlvbnMudG9nZ2xlVmlzaWJpbGl0eX0+XHJcbiAgICAgICAgICB7dW5zZWVuQ291bnQgP1xyXG4gICAgICAgICAgICA8c3BhbiBpZD1cImNoYXQtY291bnRlclwiPlxyXG4gICAgICAgICAgICAgIHt1bnNlZW5Db3VudCA8IDkgPyB1bnNlZW5Db3VudCA6ICc5Kyd9XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIDpudWxsfVxyXG4gICAgICAgICAgPGltZyBzcmM9XCIvaW1nL2NoYXQuc3ZnXCJcclxuICAgICAgICAgICAgICAgd2lkdGg9XCI1MFwiXHJcbiAgICAgICAgICAgICAgIGhlaWdodD1cIjUwXCIgLz5cclxuICAgICAgICAgIENoYXRcclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvaGVhZGVyPlxyXG4gICAgKTtcclxuICB9LFxyXG4gIF9vbkNoYXRDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKG9taXQoQ2hhdFN0b3JlLmdldFN0YXRlKCksICdtZXNzYWdlcycpKTtcclxuICB9LFxyXG4gIF9vblJlc2lnbigpIHtcclxuICAgIGNvbnN0IHtpbywgcGFyYW1zLCBjb2xvcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgXHJcbiAgICBpby5lbWl0KCdyZXNpZ24nLCB7XHJcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXHJcbiAgICAgIGNvbG9yOiBjb2xvclxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBfb25SZW1hdGNoKCkge1xyXG4gICAgY29uc3Qge2lvLCBwYXJhbXMsIG9wZW5Nb2RhbCwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGlmICghaXNPcHBvbmVudEF2YWlsYWJsZSkge1xyXG4gICAgICBvcGVuTW9kYWwoJ2luZm8nLCAnWW91ciBvcHBvbmVudCBoYXMgZGlzY29ubmVjdGVkLiBZb3UgbmVlZCB0byAnICtcclxuICAgICAgICAnZ2VuZXJhdGUgYSBuZXcgbGluay4nKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlvLmVtaXQoJ3JlbWF0Y2gtb2ZmZXInLCB7XHJcbiAgICAgIHRva2VuOiBwYXJhbXNbMF1cclxuICAgIH0pO1xyXG4gICAgb3Blbk1vZGFsKCdpbmZvJywgJ1lvdXIgb2ZmZXIgaGFzIGJlZW4gc2VudC4nKTtcclxuICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZUhlYWRlcjsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcclxuaW1wb3J0IEdhbWVIZWFkZXIgZnJvbSAnLi9HYW1lSGVhZGVyJztcclxuaW1wb3J0IENoYXQgZnJvbSAnLi9DaGF0JztcclxuaW1wb3J0IE1vZGFsIGZyb20gJy4vTW9kYWwnO1xyXG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XHJcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XHJcbmltcG9ydCBDaGVzc2JvYXJkSW50ZXJmYWNlIGZyb20gJy4vQ2hlc3Nib2FyZEludGVyZmFjZSc7XHJcbmltcG9ydCBHYW1lYm9hcmRJbnRlcmZhY2UgZnJvbSAnLi9HYW1lYm9hcmRJbnRlcmZhY2UnO1xyXG5pbXBvcnQge01hcH0gZnJvbSAnaW1tdXRhYmxlJztcclxuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi9HYW1lQm9hcmQnO1xyXG5cclxuY29uc3QgR2FtZUludGVyZmFjZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBcclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBwYXJhbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXHJcbiAgfSxcclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaXNPcHBvbmVudEF2YWlsYWJsZTogZmFsc2UsXHJcbiAgICAgIGNvbG9yOiAnd2hpdGUnLFxyXG4gICAgICBtb2RhbDogTWFwKHtcclxuICAgICAgICBvcGVuOiBmYWxzZSxcclxuICAgICAgICBtZXNzYWdlOiAnJyxcclxuICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgICAgICBoaWRlOiB0aGlzLl9oaWRlTW9kYWwsXHJcbiAgICAgICAgICBhY2NlcHQ6IHRoaXMuX2FjY2VwdFJlbWF0Y2gsXHJcbiAgICAgICAgICBkZWNsaW5lOiB0aGlzLl9kZWNsaW5lUmVtYXRjaFxyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICAgIGdhbWVPdmVyOiBHYW1lU3RvcmUuZ2V0U3RhdGUoKS5nYW1lT3ZlclxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgY29uc3Qge2lvLCBwYXJhbXN9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBpby5vbigndG9rZW4taW52YWxpZCcsICgpID0+IHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBtb2RhbDogdGhpcy5zdGF0ZS5tb2RhbFxyXG4gICAgICAgIC5zZXQoJ29wZW4nLCB0cnVlKVxyXG4gICAgICAgIC5zZXQoJ21lc3NhZ2UnLCAnR2FtZSBsaW5rIGlzIGludmFsaWQgb3IgaGFzIGV4cGlyZWQuJylcclxuICAgICAgICAuc2V0KCd0eXBlJywgJ2luZm8nKVxyXG4gICAgfSkpO1xyXG5cclxuICAgIGlvLmVtaXQoJ2pvaW4nLCB7XHJcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXHJcbiAgICAgIHRpbWU6IHBhcmFtc1sxXSAqIDYwLFxyXG4gICAgICBpbmM6IHBhcmFtc1syXVxyXG4gICAgfSk7XHJcblxyXG4gICAgaW8ub24oJ2pvaW5lZCcsIGRhdGEgPT4ge1xyXG4gICAgICBpZiAoZGF0YS5jb2xvciA9PT0gJ2JsYWNrJykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbG9yOiAnYmxhY2snfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlvLm9uKCdib3RoLWpvaW5lZCcsICgpID0+XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzT3Bwb25lbnRBdmFpbGFibGU6IHRydWV9LCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29sb3IgPT09ICd3aGl0ZScpIHtcclxuICAgICAgICAgIGlvLmVtaXQoJ2Nsb2NrLXJ1bicsIHtcclxuICAgICAgICAgICAgdG9rZW46IHBhcmFtc1swXSxcclxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkpO1xyXG5cclxuICAgIGlvLm9uKCdmdWxsJywgKCkgPT4ge1xyXG4gICAgICB3aW5kb3cuYWxlcnQoXHJcbiAgICAgICAgJ1RoaXMgZ2FtZSBhbHJlYWR5IGhhcyB0d28gcGxheWVycy4gWW91IGhhdmUgdG8gY3JlYXRlIGEgbmV3IG9uZS4nKTtcclxuICAgICAgd2luZG93LmxvY2F0aW9uID0gJy8nO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW8ub24oJ3N3YWwtZ2FtZW92ZXInLCBkYXRhID0+IHtcclxuICAgICAgLy8gZGF0YS5jb2xvciA9IHBsYXllciB3aG8gbWFkZSB0aGUgd2lubmluZyBtb3ZlXHJcbiAgICAgIEdhbWVBY3Rpb25zLmdhbWVPdmVyKHtcclxuICAgICAgICB0eXBlOiAnZGVmZWF0JyxcclxuICAgICAgICB3aW5uZXI6IGRhdGEuY29sb3IgPT09ICd3aGl0ZScgPyAnV2hpdGUnIDogJ0JsYWNrJ1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IGlXaW4gPSB0aGlzLnN0YXRlLmNvbG9yID09PSBkYXRhLmNvbG9yO1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgdGl0bGU6IGlXaW4gPyAnWW91IHdpbiEnIDogJ1lvdSBsb3NlIScsXHJcbiAgICAgICAgIHRleHQ6IGlXaW4gPyAneWF5JyA6ICdCZXR0ZXIgbHVjayBuZXh0IHRpbWUhJyxcclxuICAgICAgICAgaW1hZ2VVcmw6IGlXaW4/ICdodHRwOi8vb3JpZzA4LmRldmlhbnRhcnQubmV0L2I4M2QvZi8yMDEzLzI3Mi83LzkvaGFwcHlfcHVwcHlfYnlfbGFraTEwLWQ2b2k0bnQucG5nJyA6ICdodHRwczovL2lhbXBpZXJyZW1lbmFyZC5maWxlcy53b3JkcHJlc3MuY29tLzIwMTQvMDIvc2FkLWRvZy5qcGcnXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW8ub24oJ3BsYXllci1yZXNpZ25lZCcsIGRhdGEgPT4ge1xyXG4gICAgICAvLyBkYXRhLmNvbG9yID0gcGxheWVyIHdobyByZXNpZ25lZFxyXG4gICAgICBjb25zdCByZXNpZ25HdXkgPSBkYXRhLmNvbG9yID09PSAnd2hpdGUnID8gJ1doaXRlJyA6ICdCbGFjaycsXHJcbiAgICAgICAgICAgIHdpbm5lciA9IGRhdGEuY29sb3IgPT09ICd3aGl0ZScgPyAnQmxhY2snIDogJ1doaXRlJztcclxuXHJcbiAgICAgIEdhbWVBY3Rpb25zLmdhbWVPdmVyKHtcclxuICAgICAgICB0eXBlOiAncmVzaWduJyxcclxuICAgICAgICB3aW5uZXJcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBpV2luID0gdGhpcy5zdGF0ZS5jb2xvciAhPT0gZGF0YS5jb2xvcjtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgIHRpdGxlOiBpV2luID8gYCR7cmVzaWduR3V5fSBoYXMgcmVzaWduZWQhYCA6ICdZb3UgaGF2ZSByZXNpZ25lZCEnLFxyXG4gICAgICAgICB0ZXh0OiBpV2luID8gJ0d1ZXNzIHlvdSB3aW4gbG9sIMKvXFxcXF8o44OEKV8vwq8nIDogJ2JvbycsXHJcbiAgICAgICAgIGltYWdlVXJsOiBpV2luPyAnaHR0cDovL29yaWcwOC5kZXZpYW50YXJ0Lm5ldC9iODNkL2YvMjAxMy8yNzIvNy85L2hhcHB5X3B1cHB5X2J5X2xha2kxMC1kNm9pNG50LnBuZycgOiAnaHR0cHM6Ly9pYW1waWVycmVtZW5hcmQuZmlsZXMud29yZHByZXNzLmNvbS8yMDE0LzAyL3NhZC1kb2cuanBnJ1xyXG4gICAgICB9KTsgICAgICBcclxuICAgIH0pO1xyXG5cclxuICAgIGlvLm9uKCdyZW1hdGNoLW9mZmVyZWQnLCAoKSA9PlxyXG4gICAgICB0aGlzLl9vcGVuTW9kYWwoJ29mZmVyJywgJ1lvdXIgb3Bwb25lbnQgaGFzIHNlbnQgeW91IGEgcmVtYXRjaCBvZmZlci4nKSk7XHJcblxyXG4gICAgaW8ub24oJ3JlbWF0Y2gtZGVjbGluZWQnLCAoKSA9PlxyXG4gICAgICB0aGlzLl9vcGVuTW9kYWwoJ2luZm8nLCAnUmVtYXRjaCBvZmZlciBoYXMgYmVlbiBkZWNsaW5lZC4nKSk7XHJcblxyXG4gICAgaW8ub24oJ3JlbWF0Y2gtYWNjZXB0ZWQnLCAoKSA9PiB7XHJcbiAgICAgIEdhbWVBY3Rpb25zLnJlbWF0Y2goKTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgY29sb3I6IHRoaXMuc3RhdGUuY29sb3IgPT09ICd3aGl0ZScgPyAnYmxhY2snIDogJ3doaXRlJyxcclxuICAgICAgICBtb2RhbDogdGhpcy5zdGF0ZS5tb2RhbC5zZXQoJ29wZW4nLCBmYWxzZSlcclxuICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbG9yID09PSAnd2hpdGUnKSB7XHJcbiAgICAgICAgICBpby5lbWl0KCdjbG9jay1ydW4nLCB7XHJcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnByb3BzLnBhcmFtc1swXSxcclxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpby5vbignb3Bwb25lbnQtZGlzY29ubmVjdGVkJywgKCkgPT4gIHtcclxuICAgICAgaWYgKCF0aGlzLnN0YXRlLmdhbWVPdmVyLmdldCgnc3RhdHVzJykpIHtcclxuICAgICAgICB0aGlzLl9vcGVuTW9kYWwoJ2luZm8nLCAnWW91ciBvcHBvbmVudCBoYXMgZGlzY29ubmVjdGVkLicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNldFN0YXRlKHtpc09wcG9uZW50QXZhaWxhYmxlOiBmYWxzZX0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgR2FtZVN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xyXG4gIH0sXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICBHYW1lU3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xyXG4gIH0sXHJcblxyXG5cclxuXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7Y29sb3IsIGdhbWVPdmVyLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCBjb21tb25Qcm9wcyA9IHtcclxuICAgICAgaW86IGlvLFxyXG4gICAgICBjb2xvcjogY29sb3IsXHJcbiAgICAgIG9wZW5Nb2RhbDogdGhpcy5fb3Blbk1vZGFsLFxyXG4gICAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBpc09wcG9uZW50QXZhaWxhYmxlXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPEdhbWVIZWFkZXJcclxuICAgICAgICAgIHsuLi5jb21tb25Qcm9wc31cclxuICAgICAgICAgIHBhcmFtcz17cGFyYW1zfVxyXG4gICAgICAgICAgZ2FtZU92ZXI9e2dhbWVPdmVyLmdldCgnc3RhdHVzJyl9IC8+XHJcblxyXG4gICAgICAgIDxDaGF0XHJcbiAgICAgICAgICB7Li4uY29tbW9uUHJvcHN9XHJcbiAgICAgICAgICB0b2tlbj17cGFyYW1zWzBdfSAvPlxyXG5cclxuICAgICAgICAgIDxHYW1lYm9hcmRJbnRlcmZhY2UgXHJcbiAgICAgICAgICAgIHsuLi5jb21tb25Qcm9wc31cclxuICAgICAgICAgICAgdG9rZW49e3BhcmFtc1swXX1cclxuICAgICAgICAgICAgZ2FtZU92ZXI9e2dhbWVPdmVyfSAvPlxyXG5cclxuICAgICAgICA8TW9kYWwgZGF0YT17dGhpcy5zdGF0ZS5tb2RhbH0gLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH0sXHJcblxyXG5cclxuXHJcblxyXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtnYW1lT3ZlcjogR2FtZVN0b3JlLmdldFN0YXRlKCkuZ2FtZU92ZXJ9KTtcclxuICB9LFxyXG4gIF9vcGVuTW9kYWwodHlwZSwgbWVzc2FnZSkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIG1vZGFsOiB0aGlzLnN0YXRlLm1vZGFsXHJcbiAgICAgICAgLnNldCgnb3BlbicsIHRydWUpXHJcbiAgICAgICAgLnNldCgnbWVzc2FnZScsIG1lc3NhZ2UpXHJcbiAgICAgICAgLnNldCgndHlwZScsIHR5cGUpXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIF9oaWRlTW9kYWwoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHttb2RhbDogdGhpcy5zdGF0ZS5tb2RhbC5zZXQoJ29wZW4nLCBmYWxzZSl9KTtcclxuICB9LFxyXG4gIF9hY2NlcHRSZW1hdGNoKCkge1xyXG4gICAgY29uc3Qge2lvLCBwYXJhbXN9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBpby5lbWl0KCdyZW1hdGNoLWFjY2VwdCcsIHtcclxuICAgICAgdG9rZW46IHBhcmFtc1swXSxcclxuICAgICAgdGltZTogcGFyYW1zWzFdICogNjAsXHJcbiAgICAgIGluYzogcGFyYW1zWzJdXHJcbiAgICB9KTtcclxuICAgIHRoaXMuX2hpZGVNb2RhbCgpO1xyXG4gIH0sXHJcbiAgX2RlY2xpbmVSZW1hdGNoKCkge1xyXG4gICAgY29uc3Qge2lvLCBwYXJhbXN9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBpby5lbWl0KCdyZW1hdGNoLWRlY2xpbmUnLCB7XHJcbiAgICAgIHRva2VuOiBwYXJhbXNbMF1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5faGlkZU1vZGFsKCk7XHJcbiAgfSxcclxuICBfdG9nZ2xlU291bmRzKGUpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBzb3VuZHNFbmFibGVkOiAhdGhpcy5zdGF0ZS5zb3VuZHNFbmFibGVkXHJcbiAgICB9KTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVJbnRlcmZhY2U7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XHJcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XHJcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcclxuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcclxuaW1wb3J0IENoZXNzYm9hcmQgZnJvbSAnLi9DaGVzc2JvYXJkJztcclxuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi9HYW1lQm9hcmQnO1xyXG5pbXBvcnQgQ2FwdHVyZWRQaWVjZXMgZnJvbSAnLi9DYXB0dXJlZFBpZWNlcyc7XHJcbmltcG9ydCBUYWJsZU9mTW92ZXMgZnJvbSAnLi9UYWJsZU9mTW92ZXMnO1xyXG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XHJcblxyXG4vKiB0aGUgc3RhdGUgb2YgdGhlIGdhbWVib2FyZCBpcyBtYW5hZ2VkIGJ5IEdhbWVTdG9yZSAqL1xyXG5cclxuY29uc3QgR2FtZWJvYXJkSW50ZXJmYWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRwcm9wVHlwZXM6IHtcclxuXHJcblx0fSxcclxuXHRtaXhpbnM6IFtvbkdhbWVDaGFuZ2VdLFx0XHQvLyB0aGlzIG1peGluIGlzIHJlc3BvbnNpYmxlIGZvciBkeW5hbWljYWxseSBjaGFuZ2luZyB0aGUgc3RhdGUgb2YgR2FtZWJvYXJkSW50ZXJmYWNlXHJcblx0Z2V0SW5pdGlhbFN0YXRlKCkge1xyXG5cdFx0cmV0dXJuIEdhbWVTdG9yZS5nZXRTdGF0ZSgpO1xyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzKCkge1xyXG5cclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcclxuXHJcblx0fSxcclxuXHRyZW5kZXIoKSB7XHJcblx0XHRjb25zdCB7cHJvbW90aW9uLCB0dXJuLCBnYW1lT3ZlciwgY2hlY2t9ID0gdGhpcy5zdGF0ZVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImJvYXJkLW1vdmVzLXdyYXBwZXJcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxyXG5cdFx0XHRcdDxkaXYgaWQ9XCJib2FyZC13cmFwcGVyXCI+XHJcblxyXG5cdFx0XHRcdFx0PHA+WW91IGFyZToge3RoaXMucHJvcHMuY29sb3I9PT0nd2hpdGUnID8gJ1doaXRlJyA6ICdCbGFjayd9PC9wPlxyXG5cdFx0XHRcdFx0PENhcHR1cmVkUGllY2VzIC8+XHJcblxyXG5cdFx0XHRcdFx0PEJvYXJkIHNpemU9ezZ9XHJcblx0XHRcdFx0XHRcdHsuLi5vbWl0KHRoaXMucHJvcHMsICdnYW1lT3ZlcicpfVxyXG5cdFx0XHRcdFx0XHRnYW1lT3Zlcj17Z2FtZU92ZXIuZ2V0KCdzdGF0dXMnKX0gLz5cclxuXHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImZlZWRiYWNrXCI+XHJcblx0XHRcdFx0XHR7IWdhbWVPdmVyLmdldCgnc3RhdHVzJykgP1xyXG5cdFx0XHRcdFx0XHQ8c3Bhbj5cclxuXHRcdFx0XHRcdFx0XHR7YCR7dHVybj09PSd3JyA/ICdXaGl0ZScgOiAnQmxhY2snfSB0byBtb3ZlLmB9XHJcblx0XHRcdFx0XHRcdDwvc3Bhbj4gOlxyXG5cdFx0XHRcdFx0XHQ8c3Ryb25nPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImljb25cIj5cclxuXHRcdFx0XHRcdFx0XHQgIHtnYW1lT3Zlci5nZXQoJ3dpbm5lcicpID09PSAnV2hpdGUnID8gJ0YnIDogJ2YnfVxyXG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHR7dGhpcy5fZ2V0R2FtZU92ZXJNZXNzYWdlKGdhbWVPdmVyLmdldCgnd2lubmVyJykpfVxyXG5cdFx0XHRcdFx0XHQ8L3N0cm9uZz5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH0sXHJcblxyXG5cdF9vbkdhbWVDaGFuZ2UoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKEdhbWVTdG9yZS5nZXRTdGF0ZSgpKTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0R2FtZU92ZXJNZXNzYWdlKHdpbm5lcikge1xyXG5cdFx0cmV0dXJuIGAke3dpbm5lcn0gd2lucyFgO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xyXG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG5jb25zdCBNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBcclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxyXG4gIH0sXHJcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbl0sXHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgIGNvbnN0IGlzT3BlbiA9IHRoaXMucHJvcHMuZGF0YS5nZXQoJ29wZW4nKTtcclxuXHJcbiAgICBpZiAoaXNPcGVuKVxyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlkb3duKTtcclxuICAgIGVsc2VcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5ZG93bik7XHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBkYXRhID0gdGhpcy5wcm9wcy5kYXRhO1xyXG4gICAgY29uc3QgdHlwZSA9IGRhdGEuZ2V0KCd0eXBlJyk7XHJcbiAgICBjb25zdCBjYWxsYmFja3MgPSBkYXRhLmdldCgnY2FsbGJhY2tzJyk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KHtcclxuICAgICAgICAgICAgICdtb2RhbC1tYXNrJzogdHJ1ZSxcclxuICAgICAgICAgICAgICdoaWRkZW4nOiAhZGF0YS5nZXQoJ29wZW4nKVxyXG4gICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX2hpZGVNb2RhbH0+XHJcbiAgICAgICAgPHA+XHJcbiAgICAgICAgICA8c3Ryb25nPkVzYzogPC9zdHJvbmc+XHJcbiAgICAgICAgICA8c3Bhbj57dHlwZSA9PT0gJ2luZm8nID8gJ09LJyA6ICdEZWNsaW5lJ308L3NwYW4+XHJcbiAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgIDxzdHJvbmc+RW50ZXI6IDwvc3Ryb25nPlxyXG4gICAgICAgICAgPHNwYW4+e3R5cGUgPT09ICdpbmZvJyA/ICdPSycgOiAnQWNjZXB0J308L3NwYW4+XHJcbiAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCJcclxuICAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX0+XHJcbiAgICAgICAgICA8cD57ZGF0YS5nZXQoJ21lc3NhZ2UnKX08L3A+XHJcblxyXG4gICAgICAgICAge3R5cGUgPT09ICdpbmZvJyA/IFxyXG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4gb2tcIlxyXG4gICAgICAgICAgICAgICBvbkNsaWNrPXtjYWxsYmFja3MuaGlkZX0+XHJcbiAgICAgICAgICAgICAgT0tcclxuICAgICAgICAgICAgPC9hPiA6IFtcclxuXHJcbiAgICAgICAgICAgIDxhIGtleT1cImFcIlxyXG4gICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG5cIlxyXG4gICAgICAgICAgICAgICBzdHlsZT17e2xlZnQ6ICc0ZW0nfX1cclxuICAgICAgICAgICAgICAgb25DbGljaz17Y2FsbGJhY2tzLmFjY2VwdH0+XHJcbiAgICAgICAgICAgICAgQWNjZXB0XHJcbiAgICAgICAgICAgIDwvYT4sXHJcbiAgICAgICAgICAgIDxhIGtleT1cImJcIlxyXG4gICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLS1yZWRcIlxyXG4gICAgICAgICAgICAgICBzdHlsZT17e3JpZ2h0OiAnNGVtJ319XHJcbiAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NhbGxiYWNrcy5kZWNsaW5lfT5cclxuICAgICAgICAgICAgICBEZWNsaW5lXHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIF19XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9LFxyXG4gIF9vbktleWRvd24oZSkge1xyXG4gICAgY29uc3QgdHlwZSA9IHRoaXMucHJvcHMuZGF0YS5nZXQoJ3R5cGUnKTtcclxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMucHJvcHMuZGF0YS5nZXQoJ2NhbGxiYWNrcycpO1xyXG5cclxuICAgIGlmICh0eXBlID09PSAnaW5mbycpIHtcclxuICAgICAgaWYgKGUud2hpY2ggPT09IDEzIHx8IGUud2hpY2ggPT09IDI3KSB7XHJcbiAgICAgICAgY2FsbGJhY2tzLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2ZmZXInKSB7XHJcbiAgICAgIGlmIChlLndoaWNoID09PSAxMykge1xyXG4gICAgICAgIGNhbGxiYWNrcy5hY2NlcHQoKTtcclxuICAgICAgfSBlbHNlIGlmIChlLndoaWNoID09PSAyNykge1xyXG4gICAgICAgIGNhbGxiYWNrcy5kZWNsaW5lKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIF9oaWRlTW9kYWwoKSB7XHJcbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0KCdjYWxsYmFja3MnKS5oaWRlKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGFsOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xyXG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xyXG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xyXG5cclxuY29uc3QgVGFibGVPZk1vdmVzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIFxyXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG9uR2FtZUNoYW5nZV0sXHJcblxyXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1vdmVzOiBHYW1lU3RvcmUuZ2V0TW92ZXMoKVxyXG4gICAgfTtcclxuICB9LFxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0YWJsZSBpZD1cIm1vdmVzXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cclxuICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgIDx0aD5UYWJsZSBvZiBtb3ZlczwvdGg+XHJcbiAgICAgICAgICA8L3RyPlxyXG4gICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAge3RoaXMuc3RhdGUubW92ZXMubWFwKChyb3csIGkpID0+IChcclxuICAgICAgICAgICAgPHRyIGtleT17aX0+XHJcbiAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgPHN0cm9uZz57YCR7aSArIDF9LmB9PC9zdHJvbmc+XHJcbiAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICB7cm93Lm1hcCgobW92ZSwgaikgPT4gKFxyXG4gICAgICAgICAgICAgICAgPHRkIGtleT17an0+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuPnttb3ZlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgKSkudG9BcnJheSgpfVxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgKSkudG9BcnJheSgpfVxyXG4gICAgICAgIDwvdGJvZHk+XHJcbiAgICAgIDwvdGFibGU+XHJcbiAgICApO1xyXG4gIH0sXHJcbiAgX29uR2FtZUNoYW5nZSgpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBtb3ZlczogR2FtZVN0b3JlLmdldE1vdmVzKClcclxuICAgIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYWJsZU9mTW92ZXM7IiwiaW1wb3J0IGtleU1pcnJvciBmcm9tICdyZWFjdC9saWIva2V5TWlycm9yJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGtleU1pcnJvcih7XHJcbiAgVE9HR0xFX1ZJU0lCSUxJVFk6IG51bGwsXHJcbiAgU1VCTUlUX01FU1NBR0U6IG51bGxcclxufSk7IiwiY29uc3QgQ2hlc3NQaWVjZXMgPSB7XHJcbiAgLy8ga2V5OiBwaWVjZSBmcm9tIEZFTiwgdmFsdWU6IHBpZWNlIGZyb20gU21hcnQgUmVndWxhciBjaGVzcyBmb250XHJcbiAgLy8gd2hpdGUgcGllY2VzXHJcbiAgJ0snOiAnRicsXHJcbiAgJ1EnOiAnRScsXHJcbiAgJ1InOiAnRCcsXHJcbiAgJ0InOiAnQycsXHJcbiAgJ04nOiAnQicsXHJcbiAgJ1AnOiAnQScsXHJcbiAgLy8gYmxhY2sgcGllY2VzXHJcbiAgJ2snOiAnZicsXHJcbiAgJ3EnOiAnZScsXHJcbiAgJ3InOiAnZCcsXHJcbiAgJ2InOiAnYycsXHJcbiAgJ24nOiAnYicsXHJcbiAgJ3AnOiAnYScsXHJcbiAgLy8gZW1wdHkgc3F1YXJlXHJcbiAgJy0nOiB1bmRlZmluZWRcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENoZXNzUGllY2VzOyIsImltcG9ydCBrZXlNaXJyb3IgZnJvbSAncmVhY3QvbGliL2tleU1pcnJvcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBrZXlNaXJyb3Ioe1xyXG4gIE1BS0VfTU9WRTogbnVsbCxcclxuICBTSE9XX01PVkVTOiBudWxsLFxyXG4gIFJFTUFUQ0g6IG51bGwsXHJcbiAgRFJBVzogbnVsbCxcclxuICBHQU1FX09WRVI6IG51bGwsXHJcbiAgQ0hBTkdFX1BST01PVElPTjogbnVsbFxyXG59KTsiLCJpbXBvcnQge0Rpc3BhdGNoZXJ9IGZyb20gJ2ZsdXgnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihuZXcgRGlzcGF0Y2hlcigpLCB7XHJcbiAgLy8gQHBhcmFtIHtvYmplY3R9IGFjdGlvbiBUaGUgZGF0YSBjb21pbmcgZnJvbSB0aGUgdmlldy5cclxuICBoYW5kbGVWaWV3QWN0aW9uOiBmdW5jdGlvbihhY3Rpb24pIHtcclxuICAgIHRoaXMuZGlzcGF0Y2goe1xyXG4gICAgICBzb3VyY2U6ICdWSUVXX0FDVElPTicsXHJcbiAgICAgIGFjdGlvbjogYWN0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcbn0pOyIsImNvbnN0IFRpbGVBY3Rpb25zID0ge1xyXG4gICAgXCJBc3Nhc3NpblwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwianVtcCBzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcImp1bXAgc2xpZGVcIixcclxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcImp1bXAgc2xpZGVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJiYWNrXCI6IHtcclxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcCBzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcImp1bXAgc2xpZGVcIixcclxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcImp1bXAgc2xpZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkJvd21hblwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwic3RyaWtlXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJDaGFtcGlvblwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInN0cmlrZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJzdHJpa2VcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJzdHJpa2VcIixcclxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRHJhZ29vblwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJzdHJpa2VcIixcclxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJzdHJpa2VcIixcclxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJzdHJpa2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJiYWNrXCI6IHtcclxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJzbGlkZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRHVjaGVzc1wiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkR1a2VcIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJzbGlkZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJzbGlkZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRm9vdG1hblwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJiYWNrXCI6IHtcclxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiS25pZ2h0XCI6IHtcclxuICAgICAgICBcImZyb250XCI6IHtcclxuICAgICAgICAgICAgXCJbLTEsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsxLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwic2xpZGVcIixcclxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0yLDJdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsyLDJdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTG9uZ2Jvd21hblwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJiYWNrXCI6IHtcclxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJzdHJpa2VcIixcclxuICAgICAgICAgICAgXCJbMCwtM11cIjogXCJzdHJpa2VcIixcclxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNYXJzaGFsbFwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwic2xpZGVcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMiwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiT3JhY2xlXCI6IHtcclxuICAgICAgICBcImZyb250XCI6IHtcclxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlBpa2VtYW5cIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwtMl1cIjogXCJzdHJpa2VcIixcclxuICAgICAgICAgICAgXCJbMSwtMl1cIjogXCJzdHJpa2VcIixcclxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJQcmllc3RcIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwic2xpZGVcIixcclxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcInNsaWRlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcImp1bXBcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJhbmdlclwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwic2xpZGVcIixcclxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbMSwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWy0yLC0xXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbMiwtMV1cIjogXCJqdW1wXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwic2xpZGVcIixcclxuICAgICAgICAgICAgXCJbLTEsMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMl1cIjogXCJqdW1wXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJTZWVyXCI6IHtcclxuICAgICAgICBcImZyb250XCI6IHtcclxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJiYWNrXCI6IHtcclxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIldpemFyZFwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlstMiwwXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbMiwwXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJqdW1wXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vLyB2YXIgbmV3VW5pdHMgPSB7fTtcclxuLy8gZm9yICh2YXIgdW5pdEtleSBpbiBUaWxlQWN0aW9ucykge1xyXG4vLyAgICAgdmFyIHVuaXQgPSBUaWxlQWN0aW9uc1t1bml0S2V5XTtcclxuLy8gICAgIHZhciBuZXdTaWRlcyA9IHt9O1xyXG4vLyAgICAgZm9yICh2YXIgc2lkZUtleSBpbiB1bml0KSB7XHJcbi8vICAgICAgICAgdmFyIGRpciA9IHVuaXRbc2lkZUtleV07XHJcbi8vICAgICAgICAgdmFyIG5ld0RpciA9IHt9O1xyXG4vLyAgICAgICAgIGZvciAodmFyIGNvb3JkcyBpbiBkaXIpIHtcclxuLy8gICAgICAgICAgICAgdmFyIHBhcnNlZCA9IEpTT04ucGFyc2UoY29vcmRzKTtcclxuLy8gICAgICAgICAgICAgdmFyIG5ld0Nvb3JkcyA9IEpTT04uc3RyaW5naWZ5KFtwYXJzZWRbMV0sIHBhcnNlZFswXV0pO1xyXG4vLyAgICAgICAgICAgICBuZXdEaXJbbmV3Q29vcmRzXSA9IGRpcltjb29yZHNdO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBuZXdTaWRlc1tzaWRlS2V5XSA9IG5ld0RpcjtcclxuLy8gICAgIH1cclxuLy8gICAgIG5ld1VuaXRzW3VuaXRLZXldID0gbmV3U2lkZXM7XHJcbi8vIH1cclxuLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobmV3VW5pdHMpKTtcclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRpbGVBY3Rpb25zO1xyXG4iLCIoZnVuY3Rpb24gKHByb2Nlc3Mpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmUgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqOyB9O1xuXG52YXIgaW8gPSBfaW50ZXJvcFJlcXVpcmUocmVxdWlyZShcInNvY2tldC5pby1jbGllbnRcIikpO1xuXG52YXIgb3MgPSBfaW50ZXJvcFJlcXVpcmUocmVxdWlyZShcIm9zXCIpKTtcblxudmFyIGhvc3RuYW1lID0gb3MuaG9zdG5hbWUoKTtcblxudmFyIHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDEzMzc7XG52YXIgT1JJR0lOID0gaG9zdG5hbWUuaW5kZXhPZihcImhlcm9rdWFwcC5jb21cIikgIT09IC0xID8gaG9zdG5hbWUgOiBob3N0bmFtZSArIFwiOlwiICsgcG9ydDtcblxubW9kdWxlLmV4cG9ydHMgPSBpby5jb25uZWN0KE9SSUdJTik7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpKVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWtNNkwxVnpaWEp6TDBwaGVTOUVaWE5yZEc5d0wwcFRMM05vYjJkMWJpMTJNaTl6Y21NdmFuTXZhVzh1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJMRmxCUVZrc1EwRkJRenM3T3p0SlFVVk9MRVZCUVVVc01rSkJRVTBzYTBKQlFXdENPenRKUVVNeFFpeEZRVUZGTERKQ1FVRlBMRWxCUVVrN08wRkJRM0JDTEVsQlFVMHNVVUZCVVN4SFFVRkhMRVZCUVVVc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF6czdRVUZGTDBJc1NVRkJUU3hKUVVGSkxFZEJRVWNzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRWxCUVVrc1NVRkJTU3hEUVVGRE8wRkJRM1JETEVsQlFVMHNUVUZCVFN4SFFVRkhMRkZCUVZFc1EwRkJReXhQUVVGUExFTkJRVU1zWlVGQlpTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRWRCUVVjc1VVRkJVU3hIUVVGSExGRkJRVkVzUjBGQlF5eEhRVUZITEVkQlFVTXNTVUZCU1N4RFFVRkRPenRwUWtGRmVFVXNSVUZCUlN4RFFVRkRMRTlCUVU4c1EwRkJReXhOUVVGTkxFTkJRVU1pTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjY2x4dVhISmNibWx0Y0c5eWRDQnBieUJtY205dElDZHpiMk5yWlhRdWFXOHRZMnhwWlc1MEp6dGNjbHh1YVcxd2IzSjBJRzl6SUdaeWIyMGdJRndpYjNOY0lqdGNjbHh1WTI5dWMzUWdhRzl6ZEc1aGJXVWdQU0J2Y3k1b2IzTjBibUZ0WlNncE8xeHlYRzVjY2x4dVkyOXVjM1FnY0c5eWRDQTlJSEJ5YjJObGMzTXVaVzUyTGxCUFVsUWdmSHdnTVRNek56dGNjbHh1WTI5dWMzUWdUMUpKUjBsT0lEMGdhRzl6ZEc1aGJXVXVhVzVrWlhoUFppZ25hR1Z5YjJ0MVlYQndMbU52YlNjcElDRTlQU0F0TVNBL0lHaHZjM1J1WVcxbElEb2dhRzl6ZEc1aGJXVXJYQ0k2WENJcmNHOXlkRHRjY2x4dVhISmNibVY0Y0c5eWRDQmtaV1poZFd4MElHbHZMbU52Ym01bFkzUW9UMUpKUjBsT0tUc2lYWDA9IiwiY29uc3QgbWF5YmVSZXZlcnNlID0ge1xyXG4gIF9tYXliZVJldmVyc2UoaXRlcmFibGUsIGNvbG9yKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jb2xvciA9PT0gKGNvbG9yIHx8ICdibGFjaycpID9cclxuICAgICAgaXRlcmFibGUucmV2ZXJzZSgpIDogaXRlcmFibGU7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWF5YmVSZXZlcnNlOyIsImltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XHJcblxyXG5jb25zdCBvbkdhbWVDaGFuZ2UgPSB7XHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIEdhbWVTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb25HYW1lQ2hhbmdlOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XHJcbmltcG9ydCB7RXZlbnRFbWl0dGVyMiBhcyBFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50ZW1pdHRlcjInO1xyXG5pbXBvcnQgQ2hhdENvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvQ2hhdENvbnN0YW50cyc7XHJcbmltcG9ydCB7TGlzdCwgTWFwfSBmcm9tICdpbW11dGFibGUnO1xyXG5cclxuY29uc3QgQ0hBTkdFX0VWRU5UID0gJ2NoYW5nZSc7XHJcbiAgXHJcbnZhciBfbWVzc2FnZXMgPSBMaXN0KCk7XHJcbnZhciBfdW5zZWVuQ291bnQgPSAwO1xyXG52YXIgX2lzQ2hhdEhpZGRlbiA9IHRydWU7XHJcblxyXG5jb25zdCBDaGF0U3RvcmUgPSBPYmplY3QuYXNzaWduKHt9LCBFdmVudEVtaXR0ZXIucHJvdG90eXBlLCB7XHJcbiAgZ2V0U3RhdGUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtZXNzYWdlczogX21lc3NhZ2VzLFxyXG4gICAgICB1bnNlZW5Db3VudDogX3Vuc2VlbkNvdW50LFxyXG4gICAgICBpc0NoYXRIaWRkZW46IF9pc0NoYXRIaWRkZW5cclxuICAgIH07XHJcbiAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVZpc2liaWxpdHkoKSB7XHJcbiAgX2lzQ2hhdEhpZGRlbiA9ICFfaXNDaGF0SGlkZGVuO1xyXG4gIF91bnNlZW5Db3VudCA9IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN1Ym1pdE1lc3NhZ2UobWVzc2FnZSwgY2xhc3NOYW1lLCByZWNlaXZlZCkge1xyXG4gIF9tZXNzYWdlcyA9IF9tZXNzYWdlcy5wdXNoKE1hcCh7XHJcbiAgICBtZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVcclxuICB9KSk7XHJcblxyXG4gIGlmIChyZWNlaXZlZCAmJiBfaXNDaGF0SGlkZGVuKSB7XHJcbiAgICBfdW5zZWVuQ291bnQgKz0gMTtcclxuICB9XHJcbn1cclxuXHJcbkFwcERpc3BhdGNoZXIucmVnaXN0ZXIocGF5bG9hZCA9PiB7XHJcbiAgY29uc3QgYWN0aW9uID0gcGF5bG9hZC5hY3Rpb247XHJcblxyXG4gIHN3aXRjaCAoYWN0aW9uLmFjdGlvblR5cGUpIHtcclxuICAgIGNhc2UgQ2hhdENvbnN0YW50cy5UT0dHTEVfVklTSUJJTElUWTpcclxuICAgICAgdG9nZ2xlVmlzaWJpbGl0eSgpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIENoYXRDb25zdGFudHMuU1VCTUlUX01FU1NBR0U6XHJcbiAgICAgIHN1Ym1pdE1lc3NhZ2UoYWN0aW9uLm1lc3NhZ2UsIGFjdGlvbi5jbGFzc05hbWUsIGFjdGlvbi5yZWNlaXZlZCk7XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgQ2hhdFN0b3JlLmVtaXQoQ0hBTkdFX0VWRU5UKTtcclxuICByZXR1cm4gdHJ1ZTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGF0U3RvcmU7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcclxuaW1wb3J0IHtFdmVudEVtaXR0ZXIyIGFzIEV2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRlbWl0dGVyMic7XHJcbmltcG9ydCBHYW1lQ29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9HYW1lQ29uc3RhbnRzJztcclxuaW1wb3J0IENoZXNzUGllY2VzIGZyb20gJy4uL2NvbnN0YW50cy9DaGVzc1BpZWNlcyc7XHJcbmltcG9ydCB7Q2hlc3N9IGZyb20gJ2NoZXNzLmpzJztcclxuaW1wb3J0IHtMaXN0LCBNYXAsIE9yZGVyZWRNYXAsIFNldH0gZnJvbSAnaW1tdXRhYmxlJztcclxuaW1wb3J0IGJlaGF2aW9yIGZyb20gJy4uL2dhbWUvYmVoYXZpb3InO1xyXG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XHJcblxyXG5jb25zdCBDSEFOR0VfRVZFTlQgPSAnY2hhbmdlJztcclxuY29uc3QgTU9WRV9FVkVOVCA9ICduZXctbW92ZSc7XHJcblxyXG52YXIgX2dhbWVPdmVyO1xyXG52YXIgX2NhcHR1cmVkUGllY2VzO1xyXG52YXIgX21vdmVzO1xyXG52YXIgX21vdmVkO1xyXG52YXIgX3R1cm47XHJcbnZhciBfY2hlY2s7XHJcbnZhciBfbGFzdE1vdmU7XHJcbnZhciBfY2hlc3M7XHJcblxyXG52YXIgX2JvYXJkLCBfbGlnaHR1cCwgX3N0cmlrZSwgX2Ryb3AsIF9zZWxlY3RlZCwgX2RyYXduID0gW10sIF9yZXN1bHQsIF9kZWNrLCBfcGVuZGluZ0RyYXc7XHJcblxyXG5cclxuc2V0SW5pdGlhbFN0YXRlKCk7XHJcblxyXG52YXIgR2FtZVN0b3JlID0gT2JqZWN0LmFzc2lnbih7fSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xyXG4gICAgYWRkQ2hhbmdlTGlzdGVuZXI6IGZ1bmN0aW9uKGNiKSB7XHJcbiAgICAgIHRoaXMub24oQ0hBTkdFX0VWRU5ULCBjYik7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZUNoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihjYikge1xyXG4gICAgICB0aGlzLnJlbW92ZUNoYW5nZUxpc3RlbmVyKENIQU5HRV9FVkVOVCwgY2IpO1xyXG4gICAgfSxcclxuICAgIGdldFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdhbWVPdmVyOiBfZ2FtZU92ZXIsXHJcbiAgICAgICAgICAgIHR1cm46IF90dXJuLFxyXG4gICAgICAgICAgICBjaGVjazogX2NoZWNrLFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgZ2V0Q2FwdHVyZWRQaWVjZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9jYXB0dXJlZFBpZWNlcztcclxuICAgIH0sXHJcbiAgICBnZXRNb3ZlcygpIHtcclxuICAgICAgICByZXR1cm4gX21vdmVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRHYW1lYm9hcmRTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBib2FyZDogX2JvYXJkLFxyXG4gICAgICAgICAgICBsaWdodHVwOiBfbGlnaHR1cCxcclxuICAgICAgICAgICAgc3RyaWtlOiBfc3RyaWtlLFxyXG4gICAgICAgICAgICBkcm9wOiBfZHJvcCxcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IF9zZWxlY3RlZCxcclxuICAgICAgICAgICAgZHJhd1VuaXQ6IF9yZXN1bHQsXHJcbiAgICAgICAgICAgIHR1cm46IF90dXJuLFxyXG4gICAgICAgICAgICBtb3ZlZDogX21vdmVkLFxyXG4gICAgICAgICAgICBkZWNrOiBfZGVjayxcclxuICAgICAgICAgICAgcGVuZGluZ0RyYXc6IF9wZW5kaW5nRHJhdyxcclxuICAgICAgICAgICAgZ2FtZW92ZXI6IF9nYW1lT3ZlclxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG59KTtcclxuXHJcblxyXG5mdW5jdGlvbiBzZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICBfZ2FtZU92ZXIgPSBNYXAoe1xyXG4gICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgdHlwZTogbnVsbCxcclxuICAgICAgICB3aW5uZXI6IG51bGxcclxuICAgIH0pO1xyXG4gICAgX2NhcHR1cmVkUGllY2VzID0gT3JkZXJlZE1hcChbXHJcbiAgICAgICAgWyd3JywgTGlzdCgpXSxcclxuICAgICAgICBbJ2InLCBMaXN0KCldXHJcbiAgICBdKTtcclxuICAgIF9tb3ZlcyA9IExpc3QoKTtcclxuICAgIF90dXJuID0gJ3cnO1xyXG4gICAgX21vdmVkID0gZmFsc2U7XHJcbiAgICBfY2hlY2sgPSBmYWxzZTtcclxuICAgIF9sYXN0TW92ZSA9IE1hcCgpO1xyXG4gICAgX3NlbGVjdGVkID0gbnVsbDtcclxuICAgIF9wZW5kaW5nRHJhdyA9IG51bGw7XHJcbiAgICAvL19jaGVzcyA9IG5ldyBDaGVzcygpO1xyXG5cclxuICAgIF9saWdodHVwID0ge307XHJcbiAgICBfc3RyaWtlID0ge307XHJcbiAgICBfZHJvcCA9IHt9O1xyXG5cclxuICAgIF9ib2FyZCA9IHtcclxuICAgICAgICAvLyAnWzEsIDJdJzoge3VuaXQ6ICdXaXphcmQnLCBjb2xvcjogJ2JsYWNrJywgc2lkZTogJ2Zyb250J30sXHJcbiAgICAgICAgLy8gJ1syLCAwXSc6IHt1bml0OiAnRHVrZScsIGNvbG9yOiAnYmxhY2snLCBzaWRlOiAnZnJvbnQnfSxcclxuICAgICAgICAvLyAnWzIsIDFdJzoge3VuaXQ6ICdQaWtlbWFuJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxyXG4gICAgICAgIC8vICdbMSwgM10nOiB7dW5pdDogJ0Fzc2Fzc2luJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9LFxyXG4gICAgICAgIC8vICdbMiwgNF0nOiB7dW5pdDogJ0xvbmdib3dtYW4nLCBjb2xvcjogJ3doaXRlJywgc2lkZTogJ2JhY2snfSxcclxuICAgICAgICAvLyAnWzMsIDVdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdiYWNrJ30sXHJcbiAgICAgICAgLy8gJ1s0LCA1XSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnYmFjayd9LFxyXG4gICAgICAgIC8vICdbNCwgNF0nOiB7dW5pdDogJ1JhbmdlcicsIGNvbG9yOiAnYmxhY2snLCBzaWRlOiAnYmFjayd9LFxyXG4gICAgICAgIC8vICdbMywgNF0nOiB7dW5pdDogJ0RyYWdvb24nLCBjb2xvcjogJ3doaXRlJywgc2lkZTogJ2Zyb250J30sXHJcbiAgICAgICAgLy8gJ1sxLCA1XSc6IHt1bml0OiAnRHVrZScsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnZnJvbnQnfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICAnWzEsIDBdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxyXG4gICAgICAgICdbMiwgMF0nOiB7dW5pdDogJ0R1a2UnLCBjb2xvcjogJ2JsYWNrJywgc2lkZTogJ2Zyb250J30sXHJcbiAgICAgICAgJ1szLCAwXSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnYmxhY2snLCBzaWRlOiAnZnJvbnQnfSxcclxuICAgICAgICAnWzIsIDVdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9LFxyXG4gICAgICAgICdbMywgNV0nOiB7dW5pdDogJ0R1a2UnLCBjb2xvcjogJ3doaXRlJywgc2lkZTogJ2Zyb250J30sXHJcbiAgICAgICAgJ1s0LCA1XSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnZnJvbnQnfSxcclxuICAgICAgICBcclxuICAgIH07XHJcblxyXG4gICAgX2RlY2sgPSBbLi4uT2JqZWN0LmtleXMob21pdChiZWhhdmlvciwgJ0R1a2UnKSksICdQaWtlbWFuJywgJ1Bpa2VtYW4nXTtcclxufVxyXG5cclxuZnVuY3Rpb24gbW92ZVRvQm9hcmQoKSB7XHJcblxyXG5cclxuICAgIGlmIChlbWl0TW92ZSkge1xyXG4gICAgICAgIEdhbWVTdG9yZS5lbWl0KE1PVkVfRVZFTlQsIHtcclxuICAgICAgICAgICAgdG86IHRvLFxyXG4gICAgICAgICAgICBjYXB0dXJlOiBjYXB0dXJlLFxyXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICBib2FyZDogX2JvYXJkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUJvYXJkKGZyb20sIHRvLCB0eXBlKSB7XHJcblxyXG4gICAgLy8gaWYgY2FsbGVkIGJ5IGEgbW92ZSBldmVudCwgdGhlIGZyb20gcGFyYW1ldGVyIHdpbGwgYmUgYSBwb3NpdGlvbiBvbiB0aGUgYm9hcmQgKGkuZS4gYSBzdHJpbmcpXHJcbiAgICAvLyBpZiBjYWxsZWQgYnkgYSBkcmF3IGV2ZW50LCB0aGUgZnJvbSBwYXJhbWV0ZXIgd2lsbCBiZSBhbiBhY3R1YWwgdW5pdCAoaS5lLiBhbiBvYmplY3QpXHJcblxyXG4gICAgaWYgKHR5cGVvZiBmcm9tID09PSAnb2JqZWN0JykgeyAgICAgICAgIC8vIGRyYXcgZXZlbnRcclxuICAgICAgICBfYm9hcmRbdG9dID0gZnJvbTtcclxuICAgICAgICBfZHJvcCA9IHt9O1xyXG4gICAgICAgIF9wZW5kaW5nRHJhdyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZWxzZSBpZiAodHlwZW9mIGZyb20gPT09ICdzdHJpbmcnKSB7ICAgIC8vIG1vdmUgZXZlbnRcclxuXHJcbiAgICAgICAgbGV0IHVuaXQgPSBfYm9hcmRbZnJvbV07XHJcblxyXG4gICAgICAgIHVuaXQuc2lkZSA9ICh1bml0LnNpZGUgPT09ICdmcm9udCcpID8gJ2JhY2snIDogJ2Zyb250JztcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdtb3ZlJykge1xyXG4gICAgICAgICAgX2JvYXJkW2Zyb21dID0gbnVsbDtcclxuICAgICAgICAgIF9ib2FyZFt0b10gPSB1bml0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnc3RyaWtlJykge1xyXG4gICAgICAgICAgX2JvYXJkW3RvXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIF9zZWxlY3RlZCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZDtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZU1vdmUoZnJvbSwgdG8sIGNhcHR1cmUsIHR5cGUsIGVtaXRNb3ZlKSB7XHJcbiAgIFxyXG4gICAgdXBkYXRlQm9hcmQoZnJvbSwgdG8sIHR5cGUpO1xyXG5cclxuICAgIF90dXJuID0gX3R1cm4gPT09ICd3JyA/ICdiJyA6ICd3JztcclxuXHJcbiAgICBpZiAoZW1pdE1vdmUpIHtcclxuICAgICAgICBHYW1lU3RvcmUuZW1pdChNT1ZFX0VWRU5ULCB7XHJcbiAgICAgICAgICAgIGZyb206IGZyb20sXHJcbiAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgY2FwdHVyZTogY2FwdHVyZSxcclxuICAgICAgICAgICAgdHlwZTogdHlwZSwgICBcclxuICAgICAgICAgICAgZ2FtZU92ZXI6IGlzRHVrZURlYWQoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGRyYXcoKSB7XHJcbiAgICBsZXQgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqX2RlY2subGVuZ3RoKTtcclxuICAgIF9wZW5kaW5nRHJhdyA9IF9kZWNrLnNwbGljZShyYW5kb21JbmRleCwgMSlbMF07ICAgICAgIFxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzRHVrZURlYWQoKSB7XHJcbiAgICBsZXQgZHVrZXMgPSBPYmplY3Qua2V5cyhfYm9hcmQpLmZpbHRlcihwb3MgPT4gX2JvYXJkW3Bvc10gJiYgX2JvYXJkW3Bvc10udW5pdCA9PT0gXCJEdWtlXCIpXHJcbiAgICAgICAgLm1hcChwb3MgPT4gX2JvYXJkW3Bvc10uY29sb3IpO1xyXG4gICAgcmV0dXJuIGR1a2VzLmxlbmd0aCA9PT0gMTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2FtZU92ZXIob3B0aW9ucykge1xyXG4gICAgX2dhbWVPdmVyID0gX2dhbWVPdmVyXHJcbiAgICAgICAgLnNldCgnc3RhdHVzJywgdHJ1ZSlcclxuICAgICAgICAuc2V0KCd3aW5uZXInLCBvcHRpb25zLndpbm5lcilcclxuICAgICAgICAuc2V0KCd0eXBlJywgb3B0aW9ucy50eXBlKTtcclxufVxyXG5cclxuQXBwRGlzcGF0Y2hlci5yZWdpc3RlcihwYXlsb2FkID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHBheWxvYWQuYWN0aW9uO1xyXG4gICAgbGV0IGVtaXRFdmVudCA9IHRydWU7XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb24uYWN0aW9uVHlwZSkge1xyXG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5NQUtFX01PVkU6XHJcbiAgICAgICAgICAgIGVtaXRFdmVudCA9IG1ha2VNb3ZlKFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uLmZyb20sIGFjdGlvbi50bywgYWN0aW9uLmNhcHR1cmUsIGFjdGlvbi50eXBlLCBhY3Rpb24uZW1pdE1vdmUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkRSQVc6XHJcbiAgICAgICAgICAgIGVtaXRFdmVudCA9IGRyYXcoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5HQU1FX09WRVI6XHJcbiAgICAgICAgICAgIGdhbWVPdmVyKGFjdGlvbi5vcHRpb25zKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5SRU1BVENIOlxyXG4gICAgICAgICAgICBzZXRJbml0aWFsU3RhdGUoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbWl0RXZlbnQpIHtcclxuICAgICAgICBHYW1lU3RvcmUuZW1pdChDSEFOR0VfRVZFTlQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZVN0b3JlO1xyXG4iXX0=
