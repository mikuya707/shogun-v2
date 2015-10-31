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

},{"./components/GameInterface":"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameInterface.js","./io":"/Users/Jay/Fullstack/shogun-v2/src/js/io.js","es6-shim":"es6-shim","react":"react"}],"/Users/Jay/Fullstack/shogun-v2/node_modules/browserify/node_modules/os-browserify/browser.js":[function(require,module,exports){
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

},{}],"/Users/Jay/Fullstack/shogun-v2/node_modules/browserify/node_modules/process/browser.js":[function(require,module,exports){
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

},{}],"/Users/Jay/Fullstack/shogun-v2/node_modules/classnames/index.js":[function(require,module,exports){
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

},{}],"/Users/Jay/Fullstack/shogun-v2/node_modules/react/lib/invariant.js":[function(require,module,exports){
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

},{}],"/Users/Jay/Fullstack/shogun-v2/node_modules/react/lib/keyMirror.js":[function(require,module,exports){
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

},{"./invariant":"/Users/Jay/Fullstack/shogun-v2/node_modules/react/lib/invariant.js"}],"/Users/Jay/Fullstack/shogun-v2/src/js/actions/ChatActions.js":[function(require,module,exports){
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

},{"../constants/ChatConstants":"/Users/Jay/Fullstack/shogun-v2/src/js/constants/ChatConstants.js","../dispatcher/AppDispatcher":"/Users/Jay/Fullstack/shogun-v2/src/js/dispatcher/AppDispatcher.js"}],"/Users/Jay/Fullstack/shogun-v2/src/js/actions/GameActions.js":[function(require,module,exports){
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

},{"../constants/GameConstants":"/Users/Jay/Fullstack/shogun-v2/src/js/constants/GameConstants.js","../dispatcher/AppDispatcher":"/Users/Jay/Fullstack/shogun-v2/src/js/dispatcher/AppDispatcher.js"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/CapturedPieces.js":[function(require,module,exports){
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

},{"../mixins/onGameChange":"/Users/Jay/Fullstack/shogun-v2/src/js/mixins/onGameChange.js","../stores/GameStore":"/Users/Jay/Fullstack/shogun-v2/src/js/stores/GameStore.js","react/addons":"react/addons"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/Chat.js":[function(require,module,exports){
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

},{"../actions/ChatActions":"/Users/Jay/Fullstack/shogun-v2/src/js/actions/ChatActions.js","../stores/ChatStore":"/Users/Jay/Fullstack/shogun-v2/src/js/stores/ChatStore.js","react/addons":"react/addons"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/Chessboard.js":[function(require,module,exports){
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

},{"../actions/GameActions":"/Users/Jay/Fullstack/shogun-v2/src/js/actions/GameActions.js","../constants/ChessPieces":"/Users/Jay/Fullstack/shogun-v2/src/js/constants/ChessPieces.js","../mixins/maybeReverse":"/Users/Jay/Fullstack/shogun-v2/src/js/mixins/maybeReverse.js","../mixins/onGameChange":"/Users/Jay/Fullstack/shogun-v2/src/js/mixins/onGameChange.js","../stores/GameStore":"/Users/Jay/Fullstack/shogun-v2/src/js/stores/GameStore.js","classnames":"/Users/Jay/Fullstack/shogun-v2/node_modules/classnames/index.js","immutable":"immutable","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/ChessboardInterface.js":[function(require,module,exports){
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

},{"../actions/GameActions":"/Users/Jay/Fullstack/shogun-v2/src/js/actions/GameActions.js","../mixins/onGameChange":"/Users/Jay/Fullstack/shogun-v2/src/js/mixins/onGameChange.js","../stores/GameStore":"/Users/Jay/Fullstack/shogun-v2/src/js/stores/GameStore.js","./CapturedPieces":"/Users/Jay/Fullstack/shogun-v2/src/js/components/CapturedPieces.js","./Chessboard":"/Users/Jay/Fullstack/shogun-v2/src/js/components/Chessboard.js","./TableOfMoves":"/Users/Jay/Fullstack/shogun-v2/src/js/components/TableOfMoves.js","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/Clock.js":[function(require,module,exports){
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

},{"../actions/GameActions":"/Users/Jay/Fullstack/shogun-v2/src/js/actions/GameActions.js","react/addons":"react/addons"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameBoard.js":[function(require,module,exports){
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

		io.on("swal-gameover", function (data) {
			var winner = data.winner;
			swal({
				title: "You lose!",
				text: "lolumad",
				imageUrl: "http://vignette2.wikia.nocookie.net/dickfigures/images/d/d0/Troll-Face-Dancing1.jpg/revision/latest?cb=20121112150543"
			});
		});
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

		io.emit("new-move", { token: token, move: move });
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
		var _props2 = this.props;
		var position = _props2.position;
		var selected = _props2.selected;

		var gameover = GameStore.getGameboardState().gameover;

		// only let the player act when it is their turn
		if (gameover.get("status")) {
			return;
		}if (turn !== playerColor.charAt(0)) {
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

		var gameover = GameStore.getGameboardState().gameover;
		//if(gameover) return;

		// only let the player act when it is their turn
		if (gameover.get("status")) {
			return;
		}if (turn !== playerColor.charAt(0)) {
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

		return React.createElement(
			"div",
			{ className: cx(_defineProperty({
					cellContainer: true }, side, true)),
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
						cellContainer: true };

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

},{"../actions/GameActions":"/Users/Jay/Fullstack/shogun-v2/src/js/actions/GameActions.js","../game/behavior":"/Users/Jay/Fullstack/shogun-v2/src/js/game/behavior.js","../mixins/maybeReverse":"/Users/Jay/Fullstack/shogun-v2/src/js/mixins/maybeReverse.js","../stores/GameStore":"/Users/Jay/Fullstack/shogun-v2/src/js/stores/GameStore.js","classnames":"/Users/Jay/Fullstack/shogun-v2/node_modules/classnames/index.js","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameHeader.js":[function(require,module,exports){
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

},{"../actions/ChatActions":"/Users/Jay/Fullstack/shogun-v2/src/js/actions/ChatActions.js","../stores/ChatStore":"/Users/Jay/Fullstack/shogun-v2/src/js/stores/ChatStore.js","./Clock":"/Users/Jay/Fullstack/shogun-v2/src/js/components/Clock.js","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameInterface.js":[function(require,module,exports){
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

    io.on("player-resigned", function (data) {
      GameActions.gameOver({
        type: "resign",
        winner: data.color === "black" ? "White" : "Black"
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

},{"../actions/GameActions":"/Users/Jay/Fullstack/shogun-v2/src/js/actions/GameActions.js","../stores/GameStore":"/Users/Jay/Fullstack/shogun-v2/src/js/stores/GameStore.js","./Chat":"/Users/Jay/Fullstack/shogun-v2/src/js/components/Chat.js","./ChessboardInterface":"/Users/Jay/Fullstack/shogun-v2/src/js/components/ChessboardInterface.js","./GameBoard":"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameBoard.js","./GameHeader":"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameHeader.js","./GameboardInterface":"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameboardInterface.js","./Modal":"/Users/Jay/Fullstack/shogun-v2/src/js/components/Modal.js","immutable":"immutable","react/addons":"react/addons"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameboardInterface.js":[function(require,module,exports){
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
					this._getGameOverMessage()
				)
			)
		);
	},

	_onGameChange: function _onGameChange() {
		this.setState(GameStore.getState());
	},

	_getGameOverMessage: function _getGameOverMessage() {
		return "";
	}

});

module.exports = GameboardInterface;

},{"../actions/GameActions":"/Users/Jay/Fullstack/shogun-v2/src/js/actions/GameActions.js","../mixins/onGameChange":"/Users/Jay/Fullstack/shogun-v2/src/js/mixins/onGameChange.js","../stores/GameStore":"/Users/Jay/Fullstack/shogun-v2/src/js/stores/GameStore.js","./CapturedPieces":"/Users/Jay/Fullstack/shogun-v2/src/js/components/CapturedPieces.js","./Chessboard":"/Users/Jay/Fullstack/shogun-v2/src/js/components/Chessboard.js","./GameBoard":"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameBoard.js","./TableOfMoves":"/Users/Jay/Fullstack/shogun-v2/src/js/components/TableOfMoves.js","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/Modal.js":[function(require,module,exports){
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

},{"classnames":"/Users/Jay/Fullstack/shogun-v2/node_modules/classnames/index.js","react/addons":"react/addons"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/TableOfMoves.js":[function(require,module,exports){
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

},{"../mixins/onGameChange":"/Users/Jay/Fullstack/shogun-v2/src/js/mixins/onGameChange.js","../stores/GameStore":"/Users/Jay/Fullstack/shogun-v2/src/js/stores/GameStore.js","react/addons":"react/addons"}],"/Users/Jay/Fullstack/shogun-v2/src/js/constants/ChatConstants.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var keyMirror = _interopRequire(require("react/lib/keyMirror"));

module.exports = keyMirror({
  TOGGLE_VISIBILITY: null,
  SUBMIT_MESSAGE: null
});

},{"react/lib/keyMirror":"/Users/Jay/Fullstack/shogun-v2/node_modules/react/lib/keyMirror.js"}],"/Users/Jay/Fullstack/shogun-v2/src/js/constants/ChessPieces.js":[function(require,module,exports){
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

},{}],"/Users/Jay/Fullstack/shogun-v2/src/js/constants/GameConstants.js":[function(require,module,exports){
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

},{"react/lib/keyMirror":"/Users/Jay/Fullstack/shogun-v2/node_modules/react/lib/keyMirror.js"}],"/Users/Jay/Fullstack/shogun-v2/src/js/dispatcher/AppDispatcher.js":[function(require,module,exports){
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

},{"flux":"flux"}],"/Users/Jay/Fullstack/shogun-v2/src/js/game/behavior.js":[function(require,module,exports){
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

},{}],"/Users/Jay/Fullstack/shogun-v2/src/js/io.js":[function(require,module,exports){
(function (process){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var io = _interopRequire(require("socket.io-client"));

var os = _interopRequire(require("os"));

var hostname = os.hostname();

var port = process.env.PORT || 1337;
var ORIGIN = hostname.includes("herokuapp.com") ? hostname : hostname + ":" + port;

module.exports = io.connect(ORIGIN);

}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvaW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFlBQVksQ0FBQzs7OztJQUVOLEVBQUUsMkJBQU0sa0JBQWtCOztJQUMxQixFQUFFLDJCQUFPLElBQUk7O0FBQ3BCLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7QUFFL0IsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBQ3RDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDOztpQkFFbEUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IG9zIGZyb20gIFwib3NcIjtcbmNvbnN0IGhvc3RuYW1lID0gb3MuaG9zdG5hbWUoKTtcblxuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMTMzNztcbmNvbnN0IE9SSUdJTiA9IGhvc3RuYW1lLmluY2x1ZGVzKCdoZXJva3VhcHAuY29tJykgPyBob3N0bmFtZSA6IGhvc3RuYW1lK1wiOlwiK3BvcnQ7XG5cbmV4cG9ydCBkZWZhdWx0IGlvLmNvbm5lY3QoT1JJR0lOKTsiXX0=
},{"_process":"/Users/Jay/Fullstack/shogun-v2/node_modules/browserify/node_modules/process/browser.js","os":"/Users/Jay/Fullstack/shogun-v2/node_modules/browserify/node_modules/os-browserify/browser.js","socket.io-client":"socket.io-client"}],"/Users/Jay/Fullstack/shogun-v2/src/js/mixins/maybeReverse.js":[function(require,module,exports){
"use strict";

var maybeReverse = {
  _maybeReverse: function _maybeReverse(iterable, color) {
    return this.props.color === (color || "black") ? iterable.reverse() : iterable;
  }
};

module.exports = maybeReverse;

},{}],"/Users/Jay/Fullstack/shogun-v2/src/js/mixins/onGameChange.js":[function(require,module,exports){
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

},{"../stores/GameStore":"/Users/Jay/Fullstack/shogun-v2/src/js/stores/GameStore.js"}],"/Users/Jay/Fullstack/shogun-v2/src/js/stores/ChatStore.js":[function(require,module,exports){
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

},{"../constants/ChatConstants":"/Users/Jay/Fullstack/shogun-v2/src/js/constants/ChatConstants.js","../dispatcher/AppDispatcher":"/Users/Jay/Fullstack/shogun-v2/src/js/dispatcher/AppDispatcher.js","eventemitter2":"eventemitter2","immutable":"immutable"}],"/Users/Jay/Fullstack/shogun-v2/src/js/stores/GameStore.js":[function(require,module,exports){
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
            // board: _board   
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
    if (dukes.length === 1) {
        _gameOver = _gameOver.set("status", true);

        var winner = dukes[0];
        if (winner = "white") winner = "White";else if (winner = "black") winner = "Black";
        swal({
            title: "You win!",
            text: "Would you like to request a rematch?",
            type: "success",
            showCancelButton: true,
            confirmButtonColor: "#00FFD2",
            confirmButtonText: "Yeah! :)",
            cancelButtonText: "Meh",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                swal("Nice!", "A rematch request has been sent (not really tho).", "success");
            } else {
                swal("Okay", "don't forget to donate", "success");
            }
        });
        GameStore.emit("swal-endgame", { winner: winner });
    }

    return false;
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

},{"../constants/ChessPieces":"/Users/Jay/Fullstack/shogun-v2/src/js/constants/ChessPieces.js","../constants/GameConstants":"/Users/Jay/Fullstack/shogun-v2/src/js/constants/GameConstants.js","../dispatcher/AppDispatcher":"/Users/Jay/Fullstack/shogun-v2/src/js/dispatcher/AppDispatcher.js","../game/behavior":"/Users/Jay/Fullstack/shogun-v2/src/js/game/behavior.js","chess.js":"chess.js","eventemitter2":"eventemitter2","immutable":"immutable","lodash.omit":"lodash.omit"}]},{},["./src/js/play.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL3BsYXkuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvb3MtYnJvd3NlcmlmeS9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2tleU1pcnJvci5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvYWN0aW9ucy9DaGF0QWN0aW9ucy5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvYWN0aW9ucy9HYW1lQWN0aW9ucy5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DYXB0dXJlZFBpZWNlcy5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DaGF0LmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0NoZXNzYm9hcmQuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2hlc3Nib2FyZEludGVyZmFjZS5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DbG9jay5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lQm9hcmQuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUhlYWRlci5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lSW50ZXJmYWNlLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0dhbWVib2FyZEludGVyZmFjZS5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9Nb2RhbC5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9UYWJsZU9mTW92ZXMuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbnN0YW50cy9DaGF0Q29uc3RhbnRzLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hlc3NQaWVjZXMuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbnN0YW50cy9HYW1lQ29uc3RhbnRzLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXIuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2dhbWUvYmVoYXZpb3IuanMiLCJzcmMvanMvaW8uanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL21peGlucy9tYXliZVJldmVyc2UuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL21peGlucy9vbkdhbWVDaGFuZ2UuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL3N0b3Jlcy9DaGF0U3RvcmUuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL3N0b3Jlcy9HYW1lU3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7UUFFTixVQUFVOztJQUNWLEtBQUssMkJBQU0sT0FBTzs7SUFDbEIsRUFBRSwyQkFBTSxNQUFNOztJQUNkLGFBQWEsMkJBQU0sNEJBQTRCOztBQUV0RCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2RSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFcEMsS0FBSyxDQUFDLE1BQU0sQ0FDVixvQkFBQyxhQUFhLElBQUMsRUFBRSxFQUFFLEVBQUUsQUFBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEFBQUMsR0FBRyxFQUN6QyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUNyQyxDQUFDOzs7QUNkRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QyxLQUFLLENBQW5CLEtBQUs7O0FBQ1YsTUFBSSxLQUFLLEtBQUssT0FBTyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pELE1BQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztVQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUs7R0FBQyxDQUFDLENBQUM7QUFDNUgsTUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFMUMsTUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxFQUFJO0FBQzdDLE9BQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO09BQUUsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0QsT0FBSSxNQUFLLFVBQVUsQ0FBQyxFQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBQyxDQUFDLElBQUksQ0FBQyxLQUFLLE9BQUssSUFBSSxVQUFLLElBQUksT0FBSSxFQUN0RSxjQUFjLE9BQUssSUFBSSxVQUFLLElBQUksT0FBSSxHQUFHLElBQUksQ0FBQztHQUM3QyxDQUFDLENBQUE7O0FBRUYsTUFBSSxDQUFDLE1BQU0sQ0FBQyxJ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QUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxRSxrQkFBTTs7QUFBQSxBQUVWLGFBQUssYUFBYSxDQUFDLElBQUk7QUFDbkIscUJBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQixrQkFBTTs7QUFBQSxBQUVWLGFBQUssYUFBYSxDQUFDLFNBQVM7QUFDeEIsb0JBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsa0JBQU07O0FBQUEsQUFFVixhQUFLLGFBQWEsQ0FBQyxPQUFPO0FBQ3RCLDJCQUFlLEVBQUUsQ0FBQztBQUNsQixrQkFBTTs7QUFBQSxBQUVWO0FBQ0ksbUJBQU8sSUFBSSxDQUFDO0FBQUEsS0FDbkI7O0FBRUQsUUFBSSxTQUFTLEVBQUU7QUFDWCxpQkFBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNoQztBQUNELFdBQU8sSUFBSSxDQUFDO0NBQ2YsQ0FBQyxDQUFDOztpQkFFWSxTQUFTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICdlczYtc2hpbSc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGlvIGZyb20gJy4vaW8nO1xuaW1wb3J0IEdhbWVJbnRlcmZhY2UgZnJvbSAnLi9jb21wb25lbnRzL0dhbWVJbnRlcmZhY2UnO1xuXG5sZXQgcGFyYW1zID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoJy9wbGF5LycsICcnKS5zcGxpdCgnLycpO1xucGFyYW1zWzFdID0gcGFyc2VJbnQocGFyYW1zWzFdLCAxMCk7XG5wYXJhbXNbMl0gPSBwYXJzZUludChwYXJhbXNbMl0sIDEwKTtcblxuUmVhY3QucmVuZGVyKFxuICA8R2FtZUludGVyZmFjZSBpbz17aW99IHBhcmFtcz17cGFyYW1zfSAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpXG4pO1xuXG4iLCJleHBvcnRzLmVuZGlhbm5lc3MgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnTEUnIH07XG5cbmV4cG9ydHMuaG9zdG5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhvc3RuYW1lXG4gICAgfVxuICAgIGVsc2UgcmV0dXJuICcnO1xufTtcblxuZXhwb3J0cy5sb2FkYXZnID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW10gfTtcblxuZXhwb3J0cy51cHRpbWUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAwIH07XG5cbmV4cG9ydHMuZnJlZW1lbSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcbn07XG5cbmV4cG9ydHMudG90YWxtZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE51bWJlci5NQVhfVkFMVUU7XG59O1xuXG5leHBvcnRzLmNwdXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXSB9O1xuXG5leHBvcnRzLnR5cGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnQnJvd3NlcicgfTtcblxuZXhwb3J0cy5yZWxlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmFwcFZlcnNpb247XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG5cbmV4cG9ydHMubmV0d29ya0ludGVyZmFjZXNcbj0gZXhwb3J0cy5nZXROZXR3b3JrSW50ZXJmYWNlc1xuPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7fSB9O1xuXG5leHBvcnRzLmFyY2ggPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnamF2YXNjcmlwdCcgfTtcblxuZXhwb3J0cy5wbGF0Zm9ybSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdicm93c2VyJyB9O1xuXG5leHBvcnRzLnRtcGRpciA9IGV4cG9ydHMudG1wRGlyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnL3RtcCc7XG59O1xuXG5leHBvcnRzLkVPTCA9ICdcXG4nO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuICAgIHZhciBjdXJyZW50UXVldWU7XG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHZhciBpID0gLTE7XG4gICAgICAgIHdoaWxlICgrK2kgPCBsZW4pIHtcbiAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtpXSgpO1xuICAgICAgICB9XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbn1cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgcXVldWUucHVzaChmdW4pO1xuICAgIGlmICghZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTUgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cblxuZnVuY3Rpb24gY2xhc3NOYW1lcygpIHtcblx0dmFyIGNsYXNzZXMgPSAnJztcblx0dmFyIGFyZztcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRpZiAoIWFyZykge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aWYgKCdzdHJpbmcnID09PSB0eXBlb2YgYXJnIHx8ICdudW1iZXInID09PSB0eXBlb2YgYXJnKSB7XG5cdFx0XHRjbGFzc2VzICs9ICcgJyArIGFyZztcblx0XHR9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG5cdFx0XHRjbGFzc2VzICs9ICcgJyArIGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKTtcblx0XHR9IGVsc2UgaWYgKCdvYmplY3QnID09PSB0eXBlb2YgYXJnKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdGlmICghYXJnLmhhc093blByb3BlcnR5KGtleSkgfHwgIWFyZ1trZXldKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2xhc3NlcyArPSAnICcgKyBrZXk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBjbGFzc2VzLnN1YnN0cigxKTtcbn1cblxuLy8gc2FmZWx5IGV4cG9ydCBjbGFzc05hbWVzIGZvciBub2RlIC8gYnJvd3NlcmlmeVxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcbn1cblxuLy8gc2FmZWx5IGV4cG9ydCBjbGFzc05hbWVzIGZvciBSZXF1aXJlSlNcbmlmICh0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0fSk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdJbnZhcmlhbnQgVmlvbGF0aW9uOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBrZXlNaXJyb3JcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZShcIi4vaW52YXJpYW50XCIpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYW4gZW51bWVyYXRpb24gd2l0aCBrZXlzIGVxdWFsIHRvIHRoZWlyIHZhbHVlLlxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqICAgdmFyIENPTE9SUyA9IGtleU1pcnJvcih7Ymx1ZTogbnVsbCwgcmVkOiBudWxsfSk7XG4gKiAgIHZhciBteUNvbG9yID0gQ09MT1JTLmJsdWU7XG4gKiAgIHZhciBpc0NvbG9yVmFsaWQgPSAhIUNPTE9SU1tteUNvbG9yXTtcbiAqXG4gKiBUaGUgbGFzdCBsaW5lIGNvdWxkIG5vdCBiZSBwZXJmb3JtZWQgaWYgdGhlIHZhbHVlcyBvZiB0aGUgZ2VuZXJhdGVkIGVudW0gd2VyZVxuICogbm90IGVxdWFsIHRvIHRoZWlyIGtleXMuXG4gKlxuICogICBJbnB1dDogIHtrZXkxOiB2YWwxLCBrZXkyOiB2YWwyfVxuICogICBPdXRwdXQ6IHtrZXkxOiBrZXkxLCBrZXkyOiBrZXkyfVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xudmFyIGtleU1pcnJvciA9IGZ1bmN0aW9uKG9iaikge1xuICB2YXIgcmV0ID0ge307XG4gIHZhciBrZXk7XG4gIChcInByb2R1Y3Rpb25cIiAhPT0gXCJkZXZlbG9wbWVudFwiID8gaW52YXJpYW50KFxuICAgIG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopLFxuICAgICdrZXlNaXJyb3IoLi4uKTogQXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QuJ1xuICApIDogaW52YXJpYW50KG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopKSk7XG4gIGZvciAoa2V5IGluIG9iaikge1xuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXRba2V5XSA9IGtleTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlNaXJyb3I7XG4iLCJpbXBvcnQgQ2hhdENvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvQ2hhdENvbnN0YW50cyc7XG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInO1xuXG5jb25zdCBDaGF0QWN0aW9ucyA9IHtcbiAgdG9nZ2xlVmlzaWJpbGl0eSgpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogQ2hhdENvbnN0YW50cy5UT0dHTEVfVklTSUJJTElUWVxuICAgIH0pO1xuICB9LFxuICBzdWJtaXRNZXNzYWdlKG1lc3NhZ2UsIGNsYXNzTmFtZSwgcmVjZWl2ZWQpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogQ2hhdENvbnN0YW50cy5TVUJNSVRfTUVTU0FHRSxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgIHJlY2VpdmVkOiByZWNlaXZlZFxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGF0QWN0aW9uczsiLCJpbXBvcnQgR2FtZUNvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvR2FtZUNvbnN0YW50cyc7XG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInO1xuXG5jb25zdCBHYW1lQWN0aW9ucyA9IHtcbiAgbWFrZU1vdmUoZnJvbSwgdG8sIGNhcHR1cmUsIHR5cGUsIGVtaXRNb3ZlKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuTUFLRV9NT1ZFLFxuICAgICAgZnJvbTogZnJvbSxcbiAgICAgIHRvOiB0byxcbiAgICAgIGNhcHR1cmU6IGNhcHR1cmUsXG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgZW1pdE1vdmU6IGVtaXRNb3ZlXG4gICAgfSk7XG4gIH0sXG4gIHNob3dNb3Zlcyh1bml0LCBmcm9tLCBpblJhbmdlKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuU0hPV19NT1ZFUyxcbiAgICAgIHVuaXQ6IHVuaXQsXG4gICAgICBmcm9tOiBmcm9tLFxuICAgICAgaW5SYW5nZTogaW5SYW5nZVxuICAgIH0pO1xuICB9LFxuICBkcmF3KCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLkRSQVdcbiAgICB9KTtcbiAgfSxcbiAgcmVtYXRjaCgpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5SRU1BVENIXG4gICAgfSk7XG4gIH0sXG4gIGdhbWVPdmVyKG9wdGlvbnMpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5HQU1FX09WRVIsXG4gICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgfSk7XG4gIH0sXG4gIGNoYW5nZVByb21vdGlvbihwcm9tb3Rpb24pIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5DSEFOR0VfUFJPTU9USU9OLFxuICAgICAgcHJvbW90aW9uOiBwcm9tb3Rpb25cbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZUFjdGlvbnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuXG5jb25zdCBDYXB0dXJlZFBpZWNlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG9uR2FtZUNoYW5nZV0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjYXB0dXJlZFBpZWNlczogR2FtZVN0b3JlLmdldENhcHR1cmVkUGllY2VzKClcbiAgICB9O1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY3AgPSB0aGlzLnN0YXRlLmNhcHR1cmVkUGllY2VzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjYXB0dXJlZC1waWVjZXNcIj5cbiAgICAgICAge2NwLm1hcCgocGllY2VzLCBjb2xvcikgPT4gKFxuICAgICAgICAgIDx1bCBrZXk9e2NvbG9yfT5cbiAgICAgICAgICAgIHtwaWVjZXMubWFwKChwaWVjZSwgaSkgPT4gPGxpIGtleT17aX0+e3BpZWNlfTwvbGk+KS50b0FycmF5KCl9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgKSkudG9BcnJheSgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgX29uR2FtZUNoYW5nZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNhcHR1cmVkUGllY2VzOiBHYW1lU3RvcmUuZ2V0Q2FwdHVyZWRQaWVjZXMoKVxuICAgIH0pO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FwdHVyZWRQaWVjZXM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBDaGF0U3RvcmUgZnJvbSAnLi4vc3RvcmVzL0NoYXRTdG9yZSc7XG5pbXBvcnQgQ2hhdEFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9DaGF0QWN0aW9ucyc7XG5cbmNvbnN0IENoYXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHRva2VuOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgLy8gc291bmRzRW5hYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIG9wZW5Nb2RhbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBDaGF0U3RvcmUuZ2V0U3RhdGUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGF0SGlkZGVuOiBzdGF0ZS5pc0NoYXRIaWRkZW4sXG4gICAgICBtZXNzYWdlczogc3RhdGUubWVzc2FnZXMsXG4gICAgICBtZXNzYWdlOiAnJyxcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLmlvLm9uKCdyZWNlaXZlLW1lc3NhZ2UnLCBkYXRhID0+IHtcbiAgICAgIENoYXRBY3Rpb25zLnN1Ym1pdE1lc3NhZ2UoZGF0YS5tZXNzYWdlLCBkYXRhLmNvbG9yICsgJyBsZWZ0JywgdHJ1ZSk7XG4gICAgICB0aGlzLl9tYXliZVBsYXlTb3VuZCgpO1xuICAgIH0pO1xuICAgIENoYXRTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25DaGF0U3RvcmVDaGFuZ2UpO1xuICAgIFxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDEzOTkpIENoYXRBY3Rpb25zLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgQ2hhdFN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25DaGF0U3RvcmVDaGFuZ2UpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjaGF0LXdyYXBwZXJcIlxuICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuc3RhdGUuaXNDaGF0SGlkZGVuID8gJ2hpZGRlbicgOiBudWxsfT5cbiAgICAgICAgXG4gICAgICAgIDxoND5DaGF0PC9oND5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiY2xvc2VcIlxuICAgICAgICAgICBvbkNsaWNrPXtDaGF0QWN0aW9ucy50b2dnbGVWaXNpYmlsaXR5fT5cbiAgICAgICAgICB4XG4gICAgICAgIDwvYT5cbiAgICAgICAgXG4gICAgICAgIDxhdWRpbyBwcmVsb2FkPVwiYXV0b1wiIHJlZj1cIm1zZ1NuZFwiPlxuICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiL3NuZC9tZXNzYWdlLm1wM1wiIC8+XG4gICAgICAgIDwvYXVkaW8+XG4gICAgICAgIFxuICAgICAgICA8dWwgaWQ9XCJjaGF0LWxpc3RcIiByZWY9XCJjaGF0XCI+XG4gICAgICAgICAge3RoaXMuc3RhdGUubWVzc2FnZXMubWFwKChtZXNzYWdlLCBpKSA9PiAoXG4gICAgICAgICAgICA8bGkga2V5PXtpfSBjbGFzc05hbWU9e21lc3NhZ2UuZ2V0KCdjbGFzc05hbWUnKX0+XG4gICAgICAgICAgICAgIHttZXNzYWdlLmdldCgnbWVzc2FnZScpfVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICApKS50b0FycmF5KCl9XG4gICAgICAgIDwvdWw+XG4gICAgICAgIFxuICAgICAgICA8c3Bhbj5Xcml0ZSB5b3VyIG1lc3NhZ2U6PC9zcGFuPlxuICAgICAgICBcbiAgICAgICAgPGZvcm0gaWQ9XCJjaGF0LWZvcm1cIlxuICAgICAgICAgICAgICBvblN1Ym1pdD17dGhpcy5fc3VibWl0TWVzc2FnZX0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgcmVmPVwibWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jb2xvcn1cbiAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uQ2hhbmdlTWVzc2FnZX0gLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgX29uQ2hhdFN0b3JlQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoQ2hhdFN0b3JlLmdldFN0YXRlKCksIHRoaXMuX3Njcm9sbENoYXQpO1xuICB9LFxuICBfb25DaGFuZ2VNZXNzYWdlKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlOiBlLnRhcmdldC52YWx1ZX0pO1xuICB9LFxuICBfc3VibWl0TWVzc2FnZShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHtpbywgdG9rZW4sIGNvbG9yLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMuc3RhdGUubWVzc2FnZTtcblxuICAgIGlmICghaXNPcHBvbmVudEF2YWlsYWJsZSkge1xuICAgICAgdGhpcy5yZWZzLm1lc3NhZ2UuZ2V0RE9NTm9kZSgpLmJsdXIoKTtcbiAgICAgIHRoaXMucHJvcHMub3Blbk1vZGFsKCdpbmZvJywgJ1NvcnJ5LCB5b3VyIG9wcG9uZW50IGlzIG5vdCBjb25uZWN0ZWQuICcgK1xuICAgICAgICAnWW91IGNhbuKAmHQgc2VuZCBtZXNzYWdlcy4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBDaGF0QWN0aW9ucy5zdWJtaXRNZXNzYWdlKG1lc3NhZ2UsIGNvbG9yICsgJyByaWdodCcsIGZhbHNlKTtcbiAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlOiAnJ30pO1xuXG4gICAgaW8uZW1pdCgnc2VuZC1tZXNzYWdlJywge1xuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgIHRva2VuOiB0b2tlblxuICAgIH0pO1xuICB9LFxuICBfc2Nyb2xsQ2hhdCgpIHtcbiAgICBjb25zdCBjaGF0Tm9kZSA9IHRoaXMucmVmcy5jaGF0LmdldERPTU5vZGUoKTtcbiAgICBjaGF0Tm9kZS5zY3JvbGxUb3AgPSBjaGF0Tm9kZS5zY3JvbGxIZWlnaHQ7XG4gIH0sXG4gIF9tYXliZVBsYXlTb3VuZCgpIHtcbiAgICAvLyBpZiAodGhpcy5wcm9wcy5zb3VuZHNFbmFibGVkKSB7XG4gICAgLy8gICB0aGlzLnJlZnMubXNnU25kLmdldERPTU5vZGUoKS5wbGF5KCk7XG4gICAgLy8gfVxuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdDsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcbmltcG9ydCBDaGVzc1BpZWNlcyBmcm9tICcuLi9jb25zdGFudHMvQ2hlc3NQaWVjZXMnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcbmltcG9ydCBtYXliZVJldmVyc2UgZnJvbSAnLi4vbWl4aW5zL21heWJlUmV2ZXJzZSc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQge1NlcSwgUmVwZWF0LCBMaXN0LCBTZXR9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmNvbnN0IEZJTEVTID0gU2VxLkluZGV4ZWQoJ2FiY2RlZmdoJyk7XG5jb25zdCBSQU5LUyA9IFNlcS5JbmRleGVkKCcxMjM0NTY3OCcpO1xuXG5jb25zdCBDaGVzc2JvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB0b2tlbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG1heWJlUGxheVNvdW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIGdhbWVPdmVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgbWF5YmVSZXZlcnNlXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBHYW1lU3RvcmUuZ2V0Q2hlc3Nib2FyZFN0YXRlKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZmVuOiBzdGF0ZS5mZW4sXG4gICAgICBtb3ZlRnJvbTogbnVsbCxcbiAgICAgIGxhc3RNb3ZlOiBzdGF0ZS5sYXN0TW92ZSxcbiAgICAgIGtpbmdJbkNoZWNrOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHtpbywgdG9rZW59ID0gdGhpcy5wcm9wcztcbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gICAgR2FtZVN0b3JlLm9uKCduZXctbW92ZScsIHRoaXMuX29uTmV3TW92ZSk7XG5cbiAgICBpby5vbignbW92ZScsIGRhdGEgPT4ge1xuICAgICAgR2FtZUFjdGlvbnMubWFrZU1vdmUoZGF0YS5mcm9tLCBkYXRhLnRvLCBkYXRhLmNhcHR1cmUsIGZhbHNlKTtcbiAgICAgIHRoaXMucHJvcHMubWF5YmVQbGF5U291bmQoKTtcblxuICAgICAgaWYgKCFkYXRhLmdhbWVPdmVyKSB7XG4gICAgICAgIHRoaXMuX3J1bkNsb2NrKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RpdGxlJylbMF07XG4gICAgICAgIHRpdGxlLnRleHQgPSAnKiAnICsgdGl0bGUudGV4dDtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpby5vbigncmVtYXRjaC1hY2NlcHRlZCcsICgpID0+IHRoaXMuc2V0U3RhdGUoe21vdmVGcm9tOiBudWxsfSkpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBHYW1lU3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xuICAgIEdhbWVTdG9yZS5vbignbmV3LW1vdmUnLCB0aGlzLl9vbk5ld01vdmUpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2NvbG9yLCBpc09wcG9uZW50QXZhaWxhYmxlLCBnYW1lT3Zlcn0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtmZW4sIG1vdmVGcm9tLCBsYXN0TW92ZSwga2luZ0luQ2hlY2t9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBmZW5BcnJheSA9IGZlbi5zcGxpdCgnICcpO1xuICAgIGNvbnN0IHBsYWNlbWVudCA9IGZlbkFycmF5WzBdO1xuICAgIGNvbnN0IGlzSXRNeVR1cm4gPSBmZW5BcnJheVsxXSA9PT0gY29sb3IuY2hhckF0KDApO1xuICAgIGNvbnN0IHJvd3MgPSB0aGlzLl9tYXliZVJldmVyc2UocGxhY2VtZW50LnNwbGl0KCcvJykpO1xuICAgIGNvbnN0IHJhbmtzID0gdGhpcy5fbWF5YmVSZXZlcnNlKFJBTktTLCAnd2hpdGUnKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPVwiY2hlc3Nib2FyZFwiPlxuICAgICAgICB7cm93cy5tYXAoKHBsYWNlbWVudCwgaSkgPT5cbiAgICAgICAgICA8Um93XG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICByYW5rPXtyYW5rcy5nZXQoaSl9XG4gICAgICAgICAgICBwbGFjZW1lbnQ9e3BsYWNlbWVudH1cbiAgICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICAgIGlzTW92ZWFibGU9e2lzSXRNeVR1cm4gJiYgaXNPcHBvbmVudEF2YWlsYWJsZSAmJiAhZ2FtZU92ZXJ9XG4gICAgICAgICAgICBtb3ZlRnJvbT17bW92ZUZyb219XG4gICAgICAgICAgICBsYXN0TW92ZT17bGFzdE1vdmV9XG4gICAgICAgICAgICBzZXRNb3ZlRnJvbT17dGhpcy5fc2V0TW92ZUZyb219XG4gICAgICAgICAgICBraW5nSW5DaGVjaz17a2luZ0luQ2hlY2t9XG4gICAgICAgICAgICB2YWxpZE1vdmVzPXtHYW1lU3RvcmUuZ2V0VmFsaWRNb3Zlcyhtb3ZlRnJvbSl9IC8+KX1cbiAgICAgIDwvdGFibGU+XG4gICAgKTtcbiAgfSxcbiAgX29uR2FtZUNoYW5nZShjYikge1xuICAgIGNvbnN0IHN0YXRlID0gR2FtZVN0b3JlLmdldENoZXNzYm9hcmRTdGF0ZSgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZmVuOiBzdGF0ZS5mZW4sXG4gICAgICBsYXN0TW92ZTogc3RhdGUubGFzdE1vdmUsXG4gICAgICBraW5nSW5DaGVjazogc3RhdGUuY2hlY2sgJiYgKHN0YXRlLmZlbi5zcGxpdCgnICcpWzFdID09PSAndycgPyAnSycgOiAnaycpXG4gICAgfSwgY2IpO1xuICB9LFxuICBfc2V0TW92ZUZyb20oc3F1YXJlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb3ZlRnJvbTogc3F1YXJlXG4gICAgfSk7XG4gIH0sXG4gIF9vbk5ld01vdmUobW92ZSkge1xuICAgIGNvbnN0IHtpbywgdG9rZW59ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLmVtaXQoJ25ldy1tb3ZlJywge1xuICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgbW92ZTogbW92ZVxuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCh0aGlzLnByb3BzLm1heWJlUGxheVNvdW5kLCAwKTtcbiAgfSxcbiAgX3J1bkNsb2NrKCkge1xuICAgIGNvbnN0IHtpbywgdG9rZW4sIGNvbG9yfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpby5lbWl0KCdjbG9jay1ydW4nLCB7XG4gICAgICB0b2tlbjogdG9rZW4sXG4gICAgICBjb2xvcjogY29sb3JcbiAgICB9KTtcbiAgfSxcbiAgX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKCkge1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0aXRsZScpWzBdO1xuICAgIHRpdGxlLnRleHQgPSB0aXRsZS50ZXh0LnJlcGxhY2UoJyogJywgJycpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKTtcbiAgfVxufSk7XG5cbmNvbnN0IFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBwcm9wVHlwZXM6IHtcbiAgICByYW5rOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWycxJywnMicsJzMnLCc0JywnNScsJzYnLCc3JywnOCddKS5pc1JlcXVpcmVkLFxuICAgIHBsYWNlbWVudDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIGlzTW92ZWFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgbW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFzdE1vdmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc2V0TW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAga2luZ0luQ2hlY2s6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbZmFsc2UsICdLJywgJ2snXSkuaXNSZXF1aXJlZCxcbiAgICB2YWxpZE1vdmVzOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihTZXQpLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbbWF5YmVSZXZlcnNlXSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3JhbmssIHBsYWNlbWVudCwgY29sb3J9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmaWxlcyA9IHRoaXMuX21heWJlUmV2ZXJzZShGSUxFUyk7XG4gICAgY29uc3QgcGllY2VzID0gdGhpcy5fbWF5YmVSZXZlcnNlKHBsYWNlbWVudC5sZW5ndGggPCA4ID9cbiAgICAgIFNlcShwbGFjZW1lbnQpLmZsYXRNYXAocGllY2UgPT4gKFxuICAgICAgICAvXlxcZCQvLnRlc3QocGllY2UpID8gUmVwZWF0KCctJywgcGFyc2VJbnQocGllY2UsIDEwKSkgOiBwaWVjZVxuICAgICAgKSkudG9BcnJheSgpIDpcblxuICAgICAgcGxhY2VtZW50LnNwbGl0KCcnKVxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHRyPlxuICAgICAgICB7cGllY2VzLm1hcCgocGllY2UsIGkpID0+XG4gICAgICAgICAgPENvbHVtblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgc3F1YXJlPXtmaWxlcy5nZXQoaSkgKyByYW5rfVxuICAgICAgICAgICAgcGllY2U9e3BpZWNlfVxuICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgJ3JhbmsnLCAncGxhY2VtZW50Jyl9IC8+KX1cbiAgICAgIDwvdHI+XG4gICAgKTtcbiAgfVxufSk7XG5cbmNvbnN0IENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBwcm9wVHlwZXM6IHtcbiAgICBzcXVhcmU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBwaWVjZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIGlzTW92ZWFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgbW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFzdE1vdmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc2V0TW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAga2luZ0luQ2hlY2s6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbZmFsc2UsICdLJywgJ2snXSkuaXNSZXF1aXJlZCxcbiAgICB2YWxpZE1vdmVzOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihTZXQpLmlzUmVxdWlyZWRcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge21vdmVGcm9tLCBsYXN0TW92ZSwgc3F1YXJlLCBjb2xvcixcbiAgICAgICAgICAgaXNNb3ZlYWJsZSwga2luZ0luQ2hlY2ssIHZhbGlkTW92ZXN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBwaWVjZSA9IENoZXNzUGllY2VzW3RoaXMucHJvcHMucGllY2VdO1xuICAgIGNvbnN0IHJneCA9IGNvbG9yID09PSAnd2hpdGUnID8gL15bS1FSQk5QXSQvIDogL15ba3FyYm5wXSQvO1xuICAgIGNvbnN0IGlzRHJhZ2dhYmxlID0gcmd4LnRlc3QodGhpcy5wcm9wcy5waWVjZSk7XG4gICAgY29uc3QgaXNEcm9wcGFibGUgPSBtb3ZlRnJvbSAmJiB2YWxpZE1vdmVzLmhhcyhzcXVhcmUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx0ZCBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBtb3ZlRnJvbSA9PT0gc3F1YXJlICYmICF2YWxpZE1vdmVzLmlzRW1wdHkoKSxcbiAgICAgICAgICAgIGZyb206IGxhc3RNb3ZlLmdldCgnZnJvbScpID09PSBzcXVhcmUsXG4gICAgICAgICAgICB0bzogbGFzdE1vdmUuZ2V0KCd0bycpID09PSBzcXVhcmUsXG4gICAgICAgICAgICBkcm9wcGFibGU6IGlzRHJvcHBhYmxlXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgb25DbGljaz17IXBpZWNlID8gdGhpcy5fb25DbGlja1NxdWFyZSA6IG51bGx9XG4gICAgICAgICAgb25EcmFnT3Zlcj17aXNEcm9wcGFibGUgPyB0aGlzLl9vbkRyYWdPdmVyIDogbnVsbH1cbiAgICAgICAgICBvbkRyb3A9e2lzRHJvcHBhYmxlID8gdGhpcy5fb25Ecm9wIDogbnVsbH0+XG5cbiAgICAgICAge3BpZWNlID9cbiAgICAgICAgICA8YSBjbGFzc05hbWU9e2tpbmdJbkNoZWNrID09PSB0aGlzLnByb3BzLnBpZWNlID8gJ2luLWNoZWNrJyA6IG51bGx9XG4gICAgICAgICAgICAgb25DbGljaz17dGhpcy5fb25DbGlja1NxdWFyZX1cbiAgICAgICAgICAgICBvbkRyYWdTdGFydD17dGhpcy5fb25EcmFnU3RhcnR9XG4gICAgICAgICAgICAgZHJhZ2dhYmxlPXtpc0RyYWdnYWJsZSAmJiBpc01vdmVhYmxlfT5cbiAgICAgICAgICAgIHtwaWVjZX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDpudWxsfVxuICAgICAgPC90ZD5cbiAgICApO1xuICB9LFxuICBfb25DbGlja1NxdWFyZSgpIHtcbiAgICBjb25zdCB7aXNNb3ZlYWJsZSwgY29sb3IsIG1vdmVGcm9tLCBzcXVhcmUsIHBpZWNlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgcmd4ID0gY29sb3IgPT09ICd3aGl0ZScgPyAvXltLUVJCTlBdJC8gOiAvXltrcXJibnBdJC87XG5cbiAgICBpZiAoIWlzTW92ZWFibGUgfHwgKCFtb3ZlRnJvbSAmJiAhcmd4LnRlc3QocGllY2UpKSlcbiAgICAgIHJldHVybjtcbiAgICBlbHNlIGlmIChtb3ZlRnJvbSAmJiBtb3ZlRnJvbSA9PT0gc3F1YXJlKVxuICAgICAgdGhpcy5wcm9wcy5zZXRNb3ZlRnJvbShudWxsKTtcbiAgICBlbHNlIGlmIChyZ3gudGVzdChwaWVjZSkpXG4gICAgICB0aGlzLnByb3BzLnNldE1vdmVGcm9tKHNxdWFyZSk7XG4gICAgZWxzZVxuICAgICAgR2FtZUFjdGlvbnMubWFrZU1vdmUobW92ZUZyb20sIHNxdWFyZSwgQ2hlc3NQaWVjZXNbcGllY2VdLCB0cnVlKTtcbiAgfSxcbiAgX29uRHJhZ1N0YXJ0KGUpIHtcbiAgICBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIC8vIHNldERhdGEgaXMgcmVxdWlyZWQgYnkgZmlyZWZveFxuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCAnJyk7XG5cbiAgICB0aGlzLnByb3BzLnNldE1vdmVGcm9tKHRoaXMucHJvcHMuc3F1YXJlKTtcbiAgfSxcbiAgX29uRHJhZ092ZXIoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICB9LFxuICBfb25Ecm9wKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qge21vdmVGcm9tLCBzcXVhcmUsIHBpZWNlfSA9IHRoaXMucHJvcHM7XG4gICAgR2FtZUFjdGlvbnMubWFrZU1vdmUobW92ZUZyb20sIHNxdWFyZSwgQ2hlc3NQaWVjZXNbcGllY2VdLCB0cnVlKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENoZXNzYm9hcmQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuaW1wb3J0IENoZXNzYm9hcmQgZnJvbSAnLi9DaGVzc2JvYXJkJztcbmltcG9ydCBDYXB0dXJlZFBpZWNlcyBmcm9tICcuL0NhcHR1cmVkUGllY2VzJztcbmltcG9ydCBUYWJsZU9mTW92ZXMgZnJvbSAnLi9UYWJsZU9mTW92ZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5jb25zdCBDaGVzc2JvYXJkSW50ZXJmYWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB0b2tlbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHNvdW5kc0VuYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgZ2FtZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG9uR2FtZUNoYW5nZV0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiBHYW1lU3RvcmUuZ2V0U3RhdGUoKTtcbiAgfSxcbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLmdhbWVPdmVyLmdldCgnc3RhdHVzJykgJiZcbiAgICAgICAgIXByZXZQcm9wcy5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpKSB7XG4gICAgICB0aGlzLnByb3BzLm9wZW5Nb2RhbCgnaW5mbycsIHRoaXMuX2dldEdhbWVPdmVyTWVzc2FnZSgpKTtcbiAgICB9XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7cHJvbW90aW9uLCB0dXJuLCBnYW1lT3ZlciwgY2hlY2t9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiYm9hcmQtbW92ZXMtd3JhcHBlclwiIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XG4gICAgICAgIFxuICAgICAgICA8YXVkaW8gcHJlbG9hZD1cImF1dG9cIiByZWY9XCJtb3ZlU25kXCI+XG4gICAgICAgICAgPHNvdXJjZSBzcmM9XCIvc25kL21vdmUubXAzXCIgLz5cbiAgICAgICAgPC9hdWRpbz5cbiAgICAgICAgPGF1ZGlvIHByZWxvYWQ9XCJhdXRvXCIgcmVmPVwiY2hlY2tTbmRcIj5cbiAgICAgICAgICA8c291cmNlIHNyYz1cIi9zbmQvY2hlY2subXAzXCIgLz5cbiAgICAgICAgPC9hdWRpbz5cblxuICAgICAgICA8ZGl2IGlkPVwiYm9hcmQtd3JhcHBlclwiPlxuICAgICAgICAgIDxDYXB0dXJlZFBpZWNlcyAvPlxuICAgICAgICAgIDxDaGVzc2JvYXJkXG4gICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCAnc291bmRzRW5hYmxlZCcsICdnYW1lT3ZlcicpfVxuICAgICAgICAgICAgZ2FtZU92ZXI9e2dhbWVPdmVyLmdldCgnc3RhdHVzJyl9XG4gICAgICAgICAgICBtYXliZVBsYXlTb3VuZD17dGhpcy5fbWF5YmVQbGF5U291bmR9IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxUYWJsZU9mTW92ZXMgLz5cblxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwcm9tb3Rpb25cIj5cbiAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8c3Bhbj5Qcm9tb3Rpb246IDwvc3Bhbj5cbiAgICAgICAgICAgIDxzZWxlY3QgdmFsdWU9e3Byb21vdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uUHJvbW90aW9uQ2hhbmdlfT5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInFcIj5RdWVlbjwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiclwiPlJvb2s8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJcIj5CaXNob3A8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm5cIj5LbmlnaHQ8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmZWVkYmFja1wiPlxuICAgICAgICAgIHshZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSA/IFxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb25cIj5cbiAgICAgICAgICAgICAgICB7LyogRiAtPiB3aGl0ZSBraW5nLCBmIC0+IGJsYWNrIGtpbmcqL1xuICAgICAgICAgICAgICAgICAgdHVybiA9PT0gJ3cnID8gJ0YnIDogJ2YnfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIHtgJHt0dXJuID09PSAndycgPyAnV2hpdGUnIDogJ0JsYWNrJ30gdG8gbW92ZS5gfVxuICAgICAgICAgICAgICB7Y2hlY2sgPyA8c3Ryb25nPiBDaGVjay48L3N0cm9uZz4gOiBudWxsfVxuICAgICAgICAgICAgPC9zcGFuPiA6XG5cbiAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb25cIj5cbiAgICAgICAgICAgICAgICB7Z2FtZU92ZXIuZ2V0KCd3aW5uZXInKSA9PT0gJ1doaXRlJyA/ICdGJyA6ICdmJ31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB7dGhpcy5fZ2V0R2FtZU92ZXJNZXNzYWdlKCl9XG4gICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShHYW1lU3RvcmUuZ2V0U3RhdGUoKSk7XG4gIH0sXG4gIF9vblByb21vdGlvbkNoYW5nZShlKSB7XG4gICAgR2FtZUFjdGlvbnMuY2hhbmdlUHJvbW90aW9uKGUudGFyZ2V0LnZhbHVlKTtcbiAgfSxcbiAgX21heWJlUGxheVNvdW5kKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnNvdW5kc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMucmVmc1t0aGlzLnN0YXRlLmNoZWNrID8gJ2NoZWNrU25kJyA6ICdtb3ZlU25kJ10uZ2V0RE9NTm9kZSgpLnBsYXkoKTtcbiAgICB9XG4gIH0sXG4gIF9nZXRHYW1lT3Zlck1lc3NhZ2UoKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMucHJvcHMuZ2FtZU92ZXIuZ2V0KCd0eXBlJyk7XG4gICAgY29uc3Qgd2lubmVyID0gdGhpcy5wcm9wcy5nYW1lT3Zlci5nZXQoJ3dpbm5lcicpO1xuICAgIGNvbnN0IGxvc2VyID0gd2lubmVyID09PSAnV2hpdGUnID8gJ0JsYWNrJyA6ICdXaGl0ZSc7XG5cbiAgICByZXR1cm4gdHlwZSA9PT0gJ2NoZWNrbWF0ZScgPyBgQ2hlY2ttYXRlLiAke3dpbm5lcn0gd2lucyFgIDpcbiAgICAgIHR5cGUgPT09ICd0aW1lb3V0JyA/IGAke2xvc2VyfeKAmHMgdGltZSBpcyBvdXQuICR7d2lubmVyfSB3aW5zIWAgOlxuICAgICAgdHlwZSA9PT0gJ3Jlc2lnbicgPyBgJHtsb3Nlcn0gaGFzIHJlc2lnbmVkLiAke3dpbm5lcn0gd2lucyFgIDpcbiAgICAgIHR5cGUgPT09ICdkcmF3JyA/ICdEcmF3LicgOlxuICAgICAgdHlwZSA9PT0gJ3N0YWxlbWF0ZScgPyAnRHJhdyAoU3RhbGVtYXRlKS4nIDpcbiAgICAgIHR5cGUgPT09ICd0aHJlZWZvbGRSZXBldGl0aW9uJyA/ICdEcmF3IChUaHJlZWZvbGQgUmVwZXRpdGlvbikuJyA6XG4gICAgICB0eXBlID09PSAnaW5zdWZmaWNpZW50TWF0ZXJpYWwnID8gJ0RyYXcgKEluc3VmZmljaWVudCBNYXRlcmlhbCknIDogJyc7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDaGVzc2JvYXJkSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG5cbmNvbnN0IFB1cmVSZW5kZXJNaXhpbiA9IFJlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW47XG5cbmNvbnN0IENsb2NrID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBwYXJhbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IFtfLCB0aW1lLCBpbmNdID0gdGhpcy5wcm9wcy5wYXJhbXM7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIHdoaXRlOiB0aW1lICogNjAsXG4gICAgICBibGFjazogdGltZSAqIDYwLFxuICAgICAgaW5jOiBpbmMsXG4gICAgICBjb3VudGRvd246IG51bGxcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBpbyA9IHRoaXMucHJvcHMuaW87XG5cbiAgICBpby5vbignY291bnRkb3duJywgZGF0YSA9PiB0aGlzLnNldFN0YXRlKHtcbiAgICAgIFtkYXRhLmNvbG9yXTogZGF0YS50aW1lLFxuICAgICAgY291bnRkb3duOiBkYXRhLmNvbG9yXG4gICAgfSkpO1xuXG4gICAgaW8ub24oJ2NvdW50ZG93bi1nYW1lb3ZlcicsIGRhdGEgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y291bnRkb3duOiBudWxsfSk7XG4gICAgICBHYW1lQWN0aW9ucy5nYW1lT3Zlcih7XG4gICAgICAgIHR5cGU6ICd0aW1lb3V0JyxcbiAgICAgICAgd2lubmVyOiBkYXRhLmNvbG9yID09PSAnYmxhY2snID8gJ1doaXRlJyA6ICdCbGFjaydcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtYWNjZXB0ZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgd2hpdGU6IHRoaXMucHJvcHMucGFyYW1zWzFdICogNjAsXG4gICAgICAgIGJsYWNrOiB0aGlzLnByb3BzLnBhcmFtc1sxXSAqIDYwXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgaWQ9XCJjbG9ja1wiPlxuICAgICAgICA8VGltZXJcbiAgICAgICAgICBjb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICB0aW1lPXt0aGlzLnN0YXRlLndoaXRlfVxuICAgICAgICAgIGNvdW50ZG93bj17dGhpcy5zdGF0ZS5jb3VudGRvd259IC8+XG4gICAgICAgIDxUaW1lclxuICAgICAgICAgIGNvbG9yPVwiYmxhY2tcIlxuICAgICAgICAgIHRpbWU9e3RoaXMuc3RhdGUuYmxhY2t9XG4gICAgICAgICAgY291bnRkb3duPXt0aGlzLnN0YXRlLmNvdW50ZG93bn0gLz5cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufSk7XG5cbmNvbnN0IFRpbWVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHt0aW1lLCBjb2xvciwgY291bnRkb3dufSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWluID0gTWF0aC5mbG9vcih0aW1lIC8gNjApO1xuICAgIGNvbnN0IHNlYyA9IHRpbWUgJSA2MDtcbiAgICBjb25zdCB0aW1lTGVmdCA9IGAke21pbn06JHtzZWMgPCAxMCA/ICcwJyArIHNlYyA6IHNlY31gO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9e2NvbG9yICsgKGNvbG9yID09PSBjb3VudGRvd24gPyAnIHRpY2tpbmcnIDogJycpfT5cbiAgICAgICAge3RpbWVMZWZ0fVxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2xvY2s7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG4vL2ltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XG5pbXBvcnQgbWF5YmVSZXZlcnNlIGZyb20gJy4uL21peGlucy9tYXliZVJldmVyc2UnO1xuaW1wb3J0IGJlaGF2aW9yIGZyb20gJy4uL2dhbWUvYmVoYXZpb3InO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5cblxuXG5jb25zdCBHYW1lQm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXG5cdH0sXG5cdG1peGluczogW21heWJlUmV2ZXJzZV0sXG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcblx0XHR0aGlzLnN0YXRlID0gR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCk7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGU7XG5cdH0sXG5cblx0X29uQnV0dG9uQ2xpY2soKXtcblx0XHRjb25zdCB7Y29sb3J9ID0gdGhpcy5wcm9wcyxcblx0XHRcdHt0dXJuLCBkZWNrfSA9IHRoaXMuc3RhdGU7XG5cblx0XHRpZiAodHVybiAhPT0gY29sb3IuY2hhckF0KDApIHx8IHRoaXMuc3RhdGUucGVuZGluZ0RyYXcpIHJldHVybjtcblxuXHRcdGxldCB7Ym9hcmR9ID0gdGhpcy5zdGF0ZTtcblx0XHRpZiAoY29sb3IgPT09ICdibGFjaycpIGJvYXJkID0gdGhpcy5fcmV2ZXJzZUJvYXJkKGJvYXJkKTtcblx0XHR2YXIgZHVrZVBvc2l0aW9uID0gT2JqZWN0LmtleXMoYm9hcmQpLmZpbmQocG9zID0+IChib2FyZFtwb3NdICYmIGJvYXJkW3Bvc10udW5pdCA9PT0gXCJEdWtlXCIgJiYgYm9hcmRbcG9zXS5jb2xvciA9PT0gY29sb3IpKTtcblx0XHR2YXIgZHVrZVBvc0FyciA9IEpTT04ucGFyc2UoZHVrZVBvc2l0aW9uKTtcblxuXHRcdHZhciBkcm9wcGFibGVUaWxlcyA9IHt9O1xuXHRcdFtbMCwxXSwgWzAsLTFdLCBbMSwwXSwgWy0xLDBdXS5mb3JFYWNoKGFkaiA9PiB7XG5cdFx0XHR2YXIgYWRqWCA9IGR1a2VQb3NBcnJbMF0rYWRqWzBdLCBhZGpZID0gZHVrZVBvc0FyclsxXSthZGpbMV07XG5cdFx0XHRpZiAodGhpcy5faXNPbkJvYXJkKHt4OiBhZGpYLCB5OiBhZGpZfSkgJiYgIWJvYXJkW2BbJHthZGpYfSwgJHthZGpZfV1gXSkgXG5cdFx0XHRcdGRyb3BwYWJsZVRpbGVzW2BbJHthZGpYfSwgJHthZGpZfV1gXSA9IHRydWU7XG5cdFx0fSlcblxuXHRcdGlmICghT2JqZWN0LmtleXMoZHJvcHBhYmxlVGlsZXMpLmxlbmd0aCkge1xuXHRcdFx0c3dhbChcIkNhbid0IGxldCB5b3UgZHJhdyB0aGF0XCIsICdObyBhdmFpbGFibGUgdGlsZXMgYWRqYWNlbnQgdG8gdGhlIER1a2UhJywgJ2Vycm9yJyk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRpZiAoZGVjay5sZW5ndGgpIHtcblx0XHRcdFx0R2FtZUFjdGlvbnMuZHJhdygpO1xuXHRcdFx0XHRsZXQgdGhlRHJhd25Vbml0ID0gR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCkucGVuZGluZ0RyYXc7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGRyb3A6IGRyb3BwYWJsZVRpbGVzLFxuXHRcdFx0XHRcdHBlbmRpbmdEcmF3OiB7XG5cdFx0XHRcdFx0XHR1bml0OiB0aGVEcmF3blVuaXQsXG5cdFx0XHRcdFx0XHRjb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcblx0XHRcdFx0XHRcdHNpZGU6ICdmcm9udCdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1x0XHRcdFx0XHRcblx0XHRcdH1cblx0XHRcdGVsc2UgXG5cdFx0XHRcdHN3YWwoXCJDYW4ndCBsZXQgeW91IGRyYXcgdGhhdFwiLCAnTm8gdW5pdHMgbGVmdCB0byBkcmF3IScsICdlcnJvcicpO1xuXHRcdH1cdFx0XG5cdH0sXG5cblx0X29uRHJhd0NlbGxDbGljaygpe1xuXHRcdHZhciBuZXdEcmF3bjtcblx0XHRsZXQgZHJhd25Vbml0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcmF3blVuaXRcIik7XG5cdFx0bGV0IGNsYXNzZXMgPSBkcmF3blVuaXQuY2xhc3NOYW1lO1xuXG5cdFx0aWYgKGNsYXNzZXMuaW5jbHVkZXMoJ2Zyb250JykpIHtcblx0XHRcdGRyYXduVW5pdC5jbGFzc0xpc3QucmVtb3ZlKCdmcm9udCcpO1xuXHRcdFx0ZHJhd25Vbml0LmNsYXNzTGlzdC5hZGQoJ2JhY2snKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRkcmF3blVuaXQuY2xhc3NMaXN0LnJlbW92ZSgnYmFjaycpO1xuXHRcdFx0ZHJhd25Vbml0LmNsYXNzTGlzdC5hZGQoJ2Zyb250Jyk7XG5cdFx0fVxuXHR9LFxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXG5cdFx0Y29uc3Qge2lvLCB0b2tlbiwgZ2FtZW92ZXJ9ID0gdGhpcy5wcm9wcztcblxuXHRcdEdhbWVTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcblx0XHRHYW1lU3RvcmUub24oJ25ldy1tb3ZlJywgdGhpcy5fb25OZXdNb3ZlKTtcblx0XHRHYW1lU3RvcmUub24oJ3N3YWwtZW5kZ2FtZScsIHRoaXMuX29uR2FtZU92ZXIpO1xuXG5cdFx0aW8ub24oJ21vdmUnLCBkYXRhID0+IHtcblx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKGRhdGEuZnJvbSwgZGF0YS50bywgZGF0YS5jYXB0dXJlLCBkYXRhLnR5cGUsIGZhbHNlKTtcblxuXHRcdFx0aWYgKCFkYXRhLmdhbWVPdmVyKSB7XG5cdFx0XHQgIHRoaXMuX3J1bkNsb2NrKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkb2N1bWVudC5oaWRkZW4pIHtcblx0XHRcdCAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RpdGxlJylbMF07XG5cdFx0XHQgIHRpdGxlLnRleHQgPSAnKiAnICsgdGl0bGUudGV4dDtcblxuXHRcdFx0ICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpby5vbignc3dhbC1nYW1lb3ZlcicsIGRhdGEgPT4ge1xuXHRcdFx0bGV0IHdpbm5lciA9IGRhdGEud2lubmVyO1xuXHRcdFx0c3dhbCh7XG5cdFx0XHRcdHRpdGxlOiAnWW91IGxvc2UhJyxcblx0XHRcdFx0dGV4dDogJ2xvbHVtYWQnLFxuXHRcdFx0XHRpbWFnZVVybDogJ2h0dHA6Ly92aWduZXR0ZTIud2lraWEubm9jb29raWUubmV0L2RpY2tmaWd1cmVzL2ltYWdlcy9kL2QwL1Ryb2xsLUZhY2UtRGFuY2luZzEuanBnL3JldmlzaW9uL2xhdGVzdD9jYj0yMDEyMTExMjE1MDU0Mydcblx0XHRcdH0pO1xuXHRcdH0pXG5cdH0sXG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0R2FtZVN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuX29uQ2hhbmdlKTtcblx0fSxcblxuXHRfcmV2ZXJzZVBvc2l0aW9uKHBvcykge1xuXHRcdGNvbnN0IHtzaXplfSA9IHRoaXMucHJvcHM7XG5cdFx0bGV0IHBvc0FyciA9IEpTT04ucGFyc2UocG9zKTtcblx0XHRyZXR1cm4gYFske3NpemUtMS1wb3NBcnJbMF19LCAke3NpemUtMS1wb3NBcnJbMV19XWA7XG5cdH0sXG5cblx0X3JldmVyc2VCb2FyZCgpIHtcblx0XHRjb25zdCB7Ym9hcmR9ID0gdGhpcy5zdGF0ZTtcblx0XHRsZXQgbmV3Qm9hcmQgPSB7fTtcblx0XHRPYmplY3Qua2V5cyhib2FyZCkuZm9yRWFjaChwb3MgPT4ge1xuXHRcdFx0bmV3Qm9hcmRbdGhpcy5fcmV2ZXJzZVBvc2l0aW9uKHBvcyldID0gYm9hcmRbcG9zXTtcblx0XHR9KVxuXHRcdHJldHVybiBuZXdCb2FyZDtcblx0fSxcblxuXHRfb25HYW1lQ2hhbmdlKGNiKSB7XG5cdFx0Y29uc3Qgc3RhdGUgPSBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGJvYXJkOiBzdGF0ZS5ib2FyZCxcblx0XHRcdGxpZ2h0dXA6IHN0YXRlLmxpZ2h0dXAsXG5cdFx0XHRzdHJpa2U6IHN0YXRlLnN0cmlrZSxcblx0XHRcdGRyb3A6IHN0YXRlLmRyb3AsXG5cdFx0XHRzZWxlY3RlZDogc3RhdGUuc2VsZWN0ZWQsXG5cdFx0XHRkcmF3VW5pdDogc3RhdGUuZHJhd1VuaXQsXG5cdFx0XHR0dXJuOiBzdGF0ZS50dXJuLFxuXHRcdFx0cGVuZGluZ0RyYXc6IHN0YXRlLnBlbmRpbmdEcmF3XG5cdFx0fSwgY2IpO1xuXHR9LFxuXG5cdF9vbk5ld01vdmUobW92ZSkge1xuXHRcdGNvbnN0IHtpbywgdG9rZW59ID0gdGhpcy5wcm9wcztcblx0XHRpby5lbWl0KCduZXctbW92ZScsIHsgdG9rZW4sIG1vdmUgfSk7XG5cdH0sXG5cblx0X29uR2FtZU92ZXIoe3dpbm5lcn0pIHtcblx0XHRjb25zdCB7aW8sIHRva2VufSA9IHRoaXMucHJvcHM7XG5cdFx0dmFyIHtnYW1lb3Zlcn0gPSB0aGlzLnByb3BzO1xuXHRcdGlvLmVtaXQoJ3N3YWwtZW5kZ2FtZScsIHsgdG9rZW4sIHdpbm5lciB9KTtcblx0fSxcblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IHtzdGF0ZSwgcHJvcHN9ID0gdGhpcywgXG5cdFx0XHR7c2l6ZSwgY29sb3IsIGdhbWVvdmVyfSA9IHByb3BzLFxuXHRcdFx0e2JvYXJkLCBzZWxlY3RlZCwgbGlnaHR1cCwgc3RyaWtlLCBkcm9wLCB0dXJuLCBkcmF3biwgcGVuZGluZ0RyYXd9ID0gc3RhdGU7XG5cblx0XHRpZiAoY29sb3IgPT09ICdibGFjaycpIGJvYXJkID0gdGhpcy5fcmV2ZXJzZUJvYXJkKCk7XG5cblx0XHRsZXQgY2VsbEFycmF5ID0gW107XG5cdFx0Zm9yIChsZXQgaT0wOyBpPHNpemU7IGkrKykge1xuXHRcdFx0bGV0IHJvdyA9IFtdO1xuXHRcdFx0Zm9yIChsZXQgaj0wOyBqPHNpemU7IGorKykge1xuXHRcdFx0XHRyb3cucHVzaCh7eDpqLCB5Oml9KVxuXHRcdFx0fVxuXHRcdFx0Y2VsbEFycmF5LnB1c2gocm93KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PHRhYmxlIGNsYXNzTmFtZT1cImJvYXJkXCI+XG5cdFx0XHRcdHtjZWxsQXJyYXkubWFwKChyb3csIGlkeDEpID0+IFxuXHRcdFx0XHRcdDx0cj5cblx0XHRcdFx0XHRcdHtyb3cubWFwKChjZWxsLCBpZHgyKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IGNvb3JkcyA9IGBbJHtpZHgyfSwgJHtpZHgxfV1gO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdFx0XHQ8dGQgcG9zaXRpb249e2Nvb3Jkc30+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxDZWxsIHJlZj17Y29vcmRzfVx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0IHBvc2l0aW9uPXtjb29yZHN9IFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVuaXQ9e2JvYXJkW2Nvb3Jkc10gPyBib2FyZFtjb29yZHNdLnVuaXQgOiBudWxsfSBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb2xvcj17Ym9hcmRbY29vcmRzXSA/IGJvYXJkW2Nvb3Jkc10uY29sb3IgOiBudWxsfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBsYXllckNvbG9yPXtjb2xvcn1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzaWRlPXtib2FyZFtjb29yZHNdID8gYm9hcmRbY29vcmRzXS5zaWRlIDogbnVsbH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaXR1cD17bGlnaHR1cFtjb29yZHNdfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0cmlrYWJsZT17c3RyaWtlW2Nvb3Jkc119XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FuRHJvcD17ZHJvcFtjb29yZHNdfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkPXtzZWxlY3RlZH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0dXJuPXt0dXJufVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBlbmRpbmdEcmF3PXtwZW5kaW5nRHJhd31cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRTZWxlY3RlZD17dGhpcy5fc2V0U2VsZWN0ZWR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0RHJhd2FibGU9e3RoaXMuX3NldERyYXdhYmxlfSBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXREcm9wcGFibGU9e3RoaXMuX3NldERyb3BwYWJsZX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRHYW1lUG9pbnQ9e3RoaXMuX3NldEdhbWVQb2ludH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRnYW1lb3Zlcj17Z2FtZW92ZXI/IGZhbHNlOiBnYW1lb3Zlcn1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC90ZD5cblx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCl9XG5cdFx0XHRcdFx0PC90cj5cblx0XHRcdFx0KX1cblx0XHRcdFx0PC90YWJsZT5cblx0XHRcdFx0PGRpdiBpZD1cImRyYXdcIj5cblx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT1cImJ0blwiIG9uQ2xpY2s9e3RoaXMuX29uQnV0dG9uQ2xpY2t9PkRSQVc8L2J1dHRvbj5cblx0XHRcdFx0XHQ8RHJhd25Db21wb25lbnQgcG9zaXRpb249J1stMSwgLTFdJyBcblx0XHRcdFx0XHRcdHVuaXQ9e3BlbmRpbmdEcmF3PyBwZW5kaW5nRHJhdy51bml0IDogbnVsbH0gXG5cdFx0XHRcdFx0XHRjb2xvcj17cGVuZGluZ0RyYXc/IHBlbmRpbmdEcmF3LmNvbG9yIDogbnVsbH0gXG5cdFx0XHRcdFx0XHRzaWRlPXtwZW5kaW5nRHJhdz8gcGVuZGluZ0RyYXcuc2lkZSA6IG51bGx9IFxuXHRcdFx0XHRcdFx0ZHJhd0FVbml0PXt0aGlzLl9vbkRyYXdDZWxsQ2xpY2t9XG5cdFx0XHRcdFx0XHRwbGF5ZXJDb2xvcj17Y29sb3J9IC8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fSxcblxuXHRfb25EcmF3bkRyYWdTdGFydChlKSB7XG5cdFx0ZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcblx0XHRlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgJycpO1xuXG5cdFx0Y29uc3Qge3VuaXQsIHBvc2l0aW9uLCBjb2xvciwgc2VsZWN0ZWQsIHNldFNlbGVjdGVkLCBsaXR1cCwgc3RyaWthYmxlLCBkcm9wcGFibGUsIHNpZGV9ID0gdGhpcy5wcm9wcztcblx0XHR0aGlzLl9zZXRTZWxlY3RlZCgnWy0xLC0xXScsICdkcmF3Jyk7XG5cblx0fSxcblxuXHRfc2V0U2VsZWN0ZWQocG9zaXRpb24sIGluUmFuZ2UpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNlbGVjdGVkOiBwb3NpdGlvbixcblx0XHRcdGxpZ2h0dXA6IHRoaXMuX2dldFZhbGlkTW92ZXMocG9zaXRpb24sIGluUmFuZ2UpLm1vdmFibGVUaWxlcyxcblx0XHRcdHN0cmlrZTogdGhpcy5fZ2V0VmFsaWRNb3Zlcyhwb3NpdGlvbiwgaW5SYW5nZSkuc3RyaWthYmxlVGlsZXNcblx0XHR9KVxuXHR9LFxuXG5cdF9zZXREcmF3blVuaXQodGlsZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0cGVuZGluZ0RyYXc6IHtcblx0XHRcdFx0dW5pdDogdGlsZSxcblx0XHRcdFx0Y29sb3I6IHRoaXMucHJvcHMuY29sb3IsXG5cdFx0XHRcdHNpZGU6ICdmcm9udCdcblx0XHRcdH1cblx0XHR9KVxuXG5cdH0sXG5cdF9zZXRHYW1lUG9pbnQoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGdhbWVvdmVyOiB0cnVlXG5cdFx0fSk7XG5cdH0sXG5cblx0X2dldFZhbGlkTW92ZXMocG9zaXRpb24sIG1vdmVzKSB7XG5cdFx0aWYgKCFtb3ZlcykgcmV0dXJuO1xuXHRcdGNvbnN0IHtjb2xvcjogcGxheWVyQ29sb3J9ID0gdGhpcy5wcm9wcztcblx0XHRsZXQgaW5SYW5nZSA9IFtdLCBtb3ZhYmxlVGlsZXMgPSB7fSwgc3RyaWthYmxlVGlsZXMgPSB7fSxcblx0XHRcdHBvc0FyciA9IEpTT04ucGFyc2UocG9zaXRpb24pLFxuXHRcdFx0dGhlQm9hcmQgPSBwbGF5ZXJDb2xvciA9PT0gJ2JsYWNrJyA/IHRoaXMuX3JldmVyc2VCb2FyZCgpIDogdGhpcy5zdGF0ZS5ib2FyZDtcblxuXHRcdC8vIFN0b3JlIGFsbCB0aWxlcyB3aXRoaW4gcmFuZ2Ugb2YgdGhlIHVuaXQncyBiZWhhdmlvclxuXHRcdE9iamVjdC5rZXlzKG1vdmVzKS5mb3JFYWNoKG1vdmUgPT4ge1xuXHRcdFx0bGV0IG1vdmVBcnIgPSBKU09OLnBhcnNlKG1vdmUpLCBtb3ZlTmFtZSA9IG1vdmVzW21vdmVdLFxuXHRcdFx0XHQvLyAoeCwgeSk6IGNvb3JkaW5hdGVzIG9mIHRoZSBtYXJrZWQgdGlsZVxuXHRcdFx0XHR4ID0gcG9zQXJyWzBdICsgbW92ZUFyclswXSwgXG5cdFx0XHRcdHkgPSBwb3NBcnJbMV0gKyBtb3ZlQXJyWzFdO1xuXG5cdFx0XHQvLyBzdHJpa2UgYW5kIGp1bXAgYXJlIHN0cmFpZ2h0Zm9yd2FyZDsgc2ltcGx5IHN0b3JlIHRoZSBtYXJrZWQgdGlsZVxuXHRcdFx0aWYgKG1vdmVOYW1lID09PSAnc3RyaWtlJykgaW5SYW5nZS5wdXNoKHt4OiB4LCB5OiB5LCB0eXBlOiAnc3RyaWtlJ30pO1xuXHRcdFx0ZWxzZSBpZiAobW92ZU5hbWUgPT09ICdqdW1wJykgaW5SYW5nZS5wdXNoKHt4OiB4LCB5OiB5LCB0eXBlOiAnbW92ZSd9KTtcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRsZXQgZGVsdGFYID0gTWF0aC5zaWduKG1vdmVBcnJbMF0pLCBcblx0XHRcdFx0XHRkZWx0YVkgPSBNYXRoLnNpZ24obW92ZUFyclsxXSksXG5cdFx0XHRcdFx0aSA9IHBvc0FyclswXSArIGRlbHRhWCwgXG5cdFx0XHRcdFx0aiA9IHBvc0FyclsxXSArIGRlbHRhWTtcblxuXHRcdFx0XHQvLyBsb29wIHRocm91Z2ggYWxsIHRpbGVzIG9uIGJvYXJkIGluIGEgc3RyYWlnaHQgcGF0aCBiZXR3ZWVuIHN0YXJ0aW5nIHRpbGUgYW5kIG1hcmtlZCB0aWxlXG5cdFx0XHRcdHdoaWxlICh0aGlzLl9pc09uQm9hcmQoe3g6IGksIHk6IGp9KSkge1xuXHRcdFx0XHRcdC8vIHNsaWRpbmcgdW5pdHMgY2FuIGxhbmQgb24gYW55IHRpbGUgd2l0aGluIGEgc3RyYWlnaHQgcGF0aFxuXHRcdFx0XHRcdC8vIG5vbi1zbGlkaW5nIHVuaXRzIGNhbiBvbmx5IGxhbmQgb24gdGhlIG1hcmtlZCB0aWxlXG5cdFx0XHRcdFx0aWYgKG1vdmVOYW1lLmluY2x1ZGVzKCdzbGlkZScpIHx8ICh4ID09PSBpICYmIHkgPT09IGopKVxuXHRcdFx0XHRcdFx0aW5SYW5nZS5wdXNoKHt4OiBpLCB5OiBqLCB0eXBlOiAnbW92ZSd9KTtcblxuXHRcdFx0XHRcdC8vIGlmIHVuaXQgY2FuJ3QganVtcCBhbmQgdGhlcmUgaXMgYSB1bml0IGluIHRoZSB3YXksIGJyZWFrXG5cdFx0XHRcdFx0bGV0IHVuaXRJblRoZVdheSA9IHRoZUJvYXJkW2BbJHtpfSwgJHtqfV1gXTtcblx0XHRcdFx0XHRpZiAodW5pdEluVGhlV2F5ICYmICFtb3ZlTmFtZS5pbmNsdWRlcygnanVtcCcpKSBicmVhaztcblxuXHRcdFx0XHRcdGkgKz0gZGVsdGFYOyBqICs9IGRlbHRhWTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gRmlsdGVyIG91dCB0aWxlcyB0aGF0IGFyZSBvY2N1cGllZCBieSBhbGxpZWQgdW5pdHMgb3Igbm90IG9uIHRoZSBib2FyZCxcblx0XHQvLyB0aGVuIG9yZ2FuaXplIGJ5IG1vdmFibGUgYW5kIHN0cmlrYWJsZSB0aWxlc1xuXHRcdGluUmFuZ2UuZmlsdGVyKHJhbmdlID0+IHtcblx0XHRcdGxldCB0YXJnZXRVbml0ID0gdGhlQm9hcmRbYFske3JhbmdlLnh9LCAke3JhbmdlLnl9XWBdO1xuXHRcdFx0aWYgKHRhcmdldFVuaXQgJiYgdGhlQm9hcmRbcG9zaXRpb25dLmNvbG9yID09PSB0YXJnZXRVbml0LmNvbG9yKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRyZXR1cm4gdGhpcy5faXNPbkJvYXJkKHJhbmdlKTtcblx0XHR9KS5mb3JFYWNoKHJhbmdlID0+IHtcblx0XHRcdGlmIChyYW5nZS50eXBlID09PSAnbW92ZScpIG1vdmFibGVUaWxlc1tgWyR7cmFuZ2UueH0sICR7cmFuZ2UueX1dYF0gPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAocmFuZ2UudHlwZSA9PT0gJ3N0cmlrZScpIHN0cmlrYWJsZVRpbGVzW2BbJHtyYW5nZS54fSwgJHtyYW5nZS55fV1gXSA9IHRydWU7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4geyBtb3ZhYmxlVGlsZXMsIHN0cmlrYWJsZVRpbGVzIH07XG5cdH0sXG5cblx0X2lzT25Cb2FyZCh7eCwgeX0pIHtcblx0ICByZXR1cm4geCA+PSAwICYmIHkgPj0gMCAmJiB4IDwgNiAmJiB5IDwgNjtcblx0fSxcblxuXHRfcnVuQ2xvY2soKSB7XG5cdCAgY29uc3Qge2lvLCB0b2tlbiwgY29sb3J9ID0gdGhpcy5wcm9wcztcblxuXHQgIGlvLmVtaXQoJ2Nsb2NrLXJ1bicsIHtcblx0ICAgIHRva2VuOiB0b2tlbixcblx0ICAgIGNvbG9yOiBjb2xvclxuXHQgIH0pO1xuXHR9LFxuXHRfcmVtb3ZlQXN0ZXJpc2tGcm9tVGl0bGUoKSB7XG5cdCAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RpdGxlJylbMF07XG5cdCAgdGl0bGUudGV4dCA9IHRpdGxlLnRleHQucmVwbGFjZSgnKiAnLCAnJyk7XG5cdCAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fcmVtb3ZlQXN0ZXJpc2tGcm9tVGl0bGUpO1xuXHR9XG5cbn0pO1xuXG5cbmNvbnN0IENlbGwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXG5cdH0sXG5cbiAgXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRcblx0fSxcblxuXHRjb21wb25lbnRXaWxsTW91bnQoKSB7XG5cdFx0XHRcblx0fSxcblxuXHRtaXhpbnM6IFtdLFxuXG5cdF9vbkNsaWNrU3F1YXJlKCkge1xuXG5cdFx0Y29uc3Qge3VuaXQsIGNvbG9yLCBzZXRTZWxlY3RlZCwgbGl0dXAsIHN0cmlrYWJsZSwgY2FuRHJvcCwgc2lkZSwgcGxheWVyQ29sb3IsIHR1cm59ID0gdGhpcy5wcm9wcztcblxuXHRcdGxldCB7cG9zaXRpb24sIHNlbGVjdGVkfSA9IHRoaXMucHJvcHM7XG5cblx0XHR2YXIgZ2FtZW92ZXIgPSBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKS5nYW1lb3ZlcjtcblxuXHRcdC8vIG9ubHkgbGV0IHRoZSBwbGF5ZXIgYWN0IHdoZW4gaXQgaXMgdGhlaXIgdHVyblxuXHRcdGlmKGdhbWVvdmVyLmdldCgnc3RhdHVzJykpIHJldHVybjtcblxuXHRcdGlmICh0dXJuICE9PSBwbGF5ZXJDb2xvci5jaGFyQXQoMCkpIHJldHVybjtcblxuXHRcdC8vIGlmIHRoZXJlIGlzIG5vIGN1cnJlbnRseSBzZWxlY3RlZCB1bml0LCBjbGljayBhIHVuaXQgKG9mIHRoZSBzYW1lIGNvbG9yKSB0byBzZWxlY3QgaXRcblx0XHRpZiAoIXNlbGVjdGVkICYmIHVuaXQgJiYgY29sb3IgPT09IHBsYXllckNvbG9yKSB7XG5cdFx0XHRsZXQgbW92ZXMgPSBiZWhhdmlvclt1bml0XVtzaWRlXTtcblx0XHRcdHNldFNlbGVjdGVkKHBvc2l0aW9uLCBtb3Zlcyk7XG5cdFx0fVxuXHRcdC8vIGlmIHRoZXJlIGlzIGN1cnJlbnRseSBhIHNlbGVjdGVkIHVuaXQgb24gdGhlIGJvYXJkXG5cdFx0ZWxzZSB7XG5cdFx0XHQvLyB3aGVuIGVtaXR0aW5nIGEgbW92ZSBldmVudCwgc2VuZCB0aGUgXCJyZWFsXCIgcG9zaXRpb24gKGkuZS4gaWYgYmxhY2ssIHRoZSByZXZlcnNlIG9mIHRoZSByZW5kZXJlZCB2aWV3KSBcblx0XHRcdGlmIChwbGF5ZXJDb2xvciA9PT0gJ2JsYWNrJykge1xuXHRcdFx0XHRwb3NpdGlvbiA9IHRoaXMuX3JldmVyc2VQb3NpdGlvbihwb3NpdGlvbik7XG5cdFx0XHRcdHNlbGVjdGVkID0gdGhpcy5fcmV2ZXJzZVBvc2l0aW9uKHNlbGVjdGVkKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY2FuIGRvIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuXG5cdFx0XHQvLyAxLiBtb3ZlIHRvIGEgdGlsZSBnbG93aW5nIHJlZFxuXHRcdFx0aWYgKHRoaXMucHJvcHMubGl0dXApIHtcblx0XHRcdFx0bGV0IGNhcHR1cmUgPSB1bml0ICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcjtcblx0XHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCBjYXB0dXJlLCAnbW92ZScsIHRydWUpO1xuXHRcdFx0XHRzZXRTZWxlY3RlZChudWxsLCBbXSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIDIuIGF0dGFjayBhIHVuaXQgb24gYSB0aWxlIGdsb3dpbmcgeWVsbG93LCB3aXRob3V0IG1vdmluZ1xuXHRcdFx0ZWxzZSBpZiAodGhpcy5wcm9wcy5zdHJpa2FibGUgJiYgdW5pdCAmJiBjb2xvciAhPT0gcGxheWVyQ29sb3IpIHtcblx0XHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCB0cnVlLCAnc3RyaWtlJywgdHJ1ZSk7XG5cdFx0XHRcdHNldFNlbGVjdGVkKG51bGwsIFtdKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gMy4gZGVzZWxlY3QgdGhlIGN1cnJlbnQgdW5pdCBieSBjbGlja2luZyBvbiBpdFxuXHRcdFx0ZWxzZSBpZiAoc2VsZWN0ZWQgPT09IHBvc2l0aW9uKSB7XG5cdFx0XHRcdHNldFNlbGVjdGVkKG51bGwsIFtdKTtcblx0XHRcdH1cblx0XHR9XHRcdFxuXHR9LFxuXG5cdF9vbkRyYWdTdGFydChlKSB7XG5cdFx0Y29uc3Qge3VuaXQsIHBvc2l0aW9uLCBjb2xvciwgc2VsZWN0ZWQsIHNldFNlbGVjdGVkLCBsaXR1cCwgc3RyaWthYmxlLCBzaWRlLCBjYW5Ecm9wLCBwbGF5ZXJDb2xvciwgdHVybn0gPSB0aGlzLnByb3BzO1xuXHRcdHZhciBnYW1lb3ZlciA9IEdhbWVTdG9yZS5nZXRHYW1lYm9hcmRTdGF0ZSgpLmdhbWVvdmVyO1xuXHRcdC8vaWYoZ2FtZW92ZXIpIHJldHVybjtcblxuXHRcdC8vIG9ubHkgbGV0IHRoZSBwbGF5ZXIgYWN0IHdoZW4gaXQgaXMgdGhlaXIgdHVyblxuXHRcdGlmKGdhbWVvdmVyLmdldCgnc3RhdHVzJykpIHJldHVybjtcblx0XHRpZiAodHVybiAhPT0gcGxheWVyQ29sb3IuY2hhckF0KDApKSByZXR1cm47XG5cblx0XHRlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuXHRcdGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCAnJyk7XG5cblx0XHRpZiAoIXNlbGVjdGVkICYmIHVuaXQgJiYgY29sb3IgPT09IHBsYXllckNvbG9yKSB7XG5cdFx0XHRsZXQgbW92ZXMgPSBiZWhhdmlvclt1bml0XVtzaWRlXTtcblx0XHRcdHNldFNlbGVjdGVkKHBvc2l0aW9uLCBtb3Zlcyk7XG5cdFx0fVxuXHR9LFxuXHRfb25EcmFnT3ZlcihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG5cdH0sXG5cdF9vbkRyb3AoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGNvbnN0IHt1bml0LCBjb2xvciwgc2V0U2VsZWN0ZWQsIHNldERyb3BwYWJsZSwgc2V0RHJhd2FibGUsIGxpdHVwLCBzdHJpa2FibGUsIGNhbkRyb3AsIHNpZGUsIHBsYXllckNvbG9yLCBwZW5kaW5nRHJhd30gPSB0aGlzLnByb3BzO1xuXHRcdGxldCB7cG9zaXRpb24sIHNlbGVjdGVkfSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAocGxheWVyQ29sb3IgPT09ICdibGFjaycpIHtcblx0XHRcdGlmIChwb3NpdGlvbikgcG9zaXRpb24gPSB0aGlzLl9yZXZlcnNlUG9zaXRpb24ocG9zaXRpb24pO1xuXHRcdFx0aWYgKHNlbGVjdGVkKSBzZWxlY3RlZCA9IHRoaXMuX3JldmVyc2VQb3NpdGlvbihzZWxlY3RlZCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnByb3BzLmxpdHVwKSB7XG5cdFx0XHRsZXQgY2FwdHVyZSA9IHVuaXQgJiYgY29sb3IgIT09IHBsYXllckNvbG9yO1xuXHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCBjYXB0dXJlLCAnbW92ZScsIHRydWUpO1xuXHRcdH1cdFx0XG5cdFx0ZWxzZSBpZiAodGhpcy5wcm9wcy5zdHJpa2FibGUgJiYgdW5pdCl7XG5cdFx0XHRHYW1lQWN0aW9ucy5tYWtlTW92ZShzZWxlY3RlZCwgcG9zaXRpb24sIHRydWUsICdzdHJpa2UnLCB0cnVlKTtcblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLnByb3BzLmNhbkRyb3Ape1xuXHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUocGVuZGluZ0RyYXcsIHBvc2l0aW9uLCBmYWxzZSwgJ21vdmUnLCB0cnVlKTtcblx0XHR9XG5cdFx0c2V0U2VsZWN0ZWQobnVsbCwgW10pO1xuXG5cdH0sXG5cblx0X3JldmVyc2VQb3NpdGlvbihwb3MpIHtcblx0XHRsZXQgcG9zQXJyID0gSlNPTi5wYXJzZShwb3MpO1xuXHRcdHJldHVybiBgWyR7NS1wb3NBcnJbMF19LCAkezUtcG9zQXJyWzFdfV1gO1xuXHR9LFxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHt1bml0LCBjb2xvciwgbGl0dXAsIHN0cmlrYWJsZSwgY2FuRHJvcCwgc2lkZSwgcGxheWVyQ29sb3J9ID0gdGhpcy5wcm9wcztcblx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2N4KHtcblx0XHRcdFx0XHRjZWxsQ29udGFpbmVyOiB0cnVlLFxuXHRcdFx0XHRcdFtzaWRlXTogdHJ1ZVxuXHRcdFx0XHR9KX1cblx0XHRcdFx0b25EcmFnT3Zlcj17dGhpcy5fb25EcmFnT3Zlcn1cblx0XHRcdFx0b25Ecm9wPXt0aGlzLl9vbkRyb3B9XG5cdFx0XHQ+XG5cdFx0XHRcdFx0PGEgY2xhc3NOYW1lPXtjeCh7XG5cdFx0XHRcdFx0XHRcdHVuaXQ6ICEhdW5pdCxcblx0XHRcdFx0XHRcdFx0bGl0dXA6IGxpdHVwLFxuXHRcdFx0XHRcdFx0XHRzdHJpa2FibGU6IHN0cmlrYWJsZSxcblx0XHRcdFx0XHRcdFx0Y2FuRHJvcDogY2FuRHJvcCxcblx0XHRcdFx0XHRcdFx0b3Bwb25lbnQ6IGNvbG9yICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcixcblx0XHRcdFx0XHRcdFx0W3NpZGVdOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRbdW5pdF06IHRydWUsXG5cdFx0XHRcdFx0XHRcdFtjb2xvcl06IHRydWUsXG5cdFx0XHRcdFx0XHR9KX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuX29uQ2xpY2tTcXVhcmV9XG5cdFx0XHRcdFx0XHRvbkRyYWdTdGFydD17dGhpcy5fb25EcmFnU3RhcnR9XG5cdFx0XHRcdFx0XHRkcmFnZ2FibGUgLz5cblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1wiZnJvbnQtZmFjZVwiOiB0cnVlLCBvcHBvbmVudDogY29sb3IgJiYgY29sb3IgIT09IHBsYXllckNvbG9yfSl9IC8+XG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcImJhY2stZmFjZVwiOiB0cnVlLCBvcHBvbmVudDogY29sb3IgJiYgY29sb3IgIT09IHBsYXllckNvbG9yfSl9IC8+XG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9XCJsZWZ0LWZhY2VcIiAvPlxuXHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPVwicmlnaHQtZmFjZVwiIC8+XG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9XCJ0b3AtZmFjZVwiIC8+XG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9XCJib3R0b20tZmFjZVwiIC8+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdCk7XG5cdH1cblxufSk7XG5cbmNvbnN0IERyYXduQ29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6IHtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICBcdCByZXR1cm4ge1xuICAgIFx0IFx0Ly9zaWRlOiAnZnJvbnQnLFxuICAgIFx0IFx0ZHJhd246IG51bGxcbiAgICBcdCB9O1xuICBcdH0sXG4gIFx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cblx0XHRcblx0fSxcblxuXHRjb21wb25lbnRXaWxsTW91bnQoKSB7XG5cdFx0XG5cdFxuXHR9LFxuXG5cdG1peGluczogW10sXG5cblxuXHRfb25EcmFnU3RhcnQoZSkge1xuXHRcdGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG5cdFx0ZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsICcnKTtcblxuXHRcdGNvbnN0IHt1bml0LCBwb3NpdGlvbiwgY29sb3IsIHNpZGV9ID0gdGhpcy5wcm9wcztcblx0fSxcblx0X29uRHJhZ092ZXIoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuXHR9LFxuXG5cdHJlbmRlcigpe1xuXHRcdHZhciB7dW5pdCwgY29sb3IsIHNpZGUsIGRyYWdnYWJsZSwgZHJhd0FVbml0LCBwb3NpdGlvbiwgcGxheWVyQ29sb3J9ID0gdGhpcy5wcm9wcztcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGlkPVwiZHJhd25Vbml0XCIgZHJhZ2dhYmxlIFxuXHRcdFx0XHRjbGFzc05hbWU9e2N4KHtcdFxuXHRcdFx0XHRcdGNlbGxDb250YWluZXI6IHRydWUsXG5cdFx0XHRcdFx0W3VuaXRdOiB0cnVlLFxuXHRcdFx0XHRcdFtjb2xvcl06IHRydWUsXG5cdFx0XHRcdFx0W3NpZGVdOiB0cnVlXG5cdFx0XHRcdH0pfSA+XG5cdFx0XHRcdFx0PGEgY2xhc3NOYW1lPXtjeCh7XG5cdFx0XHRcdFx0XHRcdHVuaXQ6ICEhdW5pdCxcblx0XHRcdFx0XHRcdFx0b3Bwb25lbnQ6IGNvbG9yICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcixcblx0XHRcdFx0XHRcdFx0W3NpZGVdOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRbdW5pdF06IHRydWUsXG5cdFx0XHRcdFx0XHRcdFtjb2xvcl06IHRydWUsXG5cdFx0XHRcdFx0XHR9KX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2RyYXdBVW5pdH1cblx0XHRcdFx0XHRcdC8vIG9uRHJhZ1N0YXJ0PXt0aGlzLl9vbkRyYWdTdGFydH1cblx0XHRcdFx0XHRcdGRyYWdnYWJsZT5cblx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcImZyb250LWZhY2VcIjogdHJ1ZSwgXCJkcmF3LXByZXZpZXdcIjogdHJ1ZSwgb3Bwb25lbnQ6IGNvbG9yICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcn0pfSAvPlxuXHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPXtjeCh7XCJiYWNrLWZhY2VcIjogdHJ1ZSwgXCJkcmF3LXByZXZpZXdcIjogdHJ1ZSwgIG9wcG9uZW50OiBjb2xvciAmJiBjb2xvciAhPT0gcGxheWVyQ29sb3J9KX0gLz5cblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1wibGVmdC1mYWNlXCI6IHRydWUsIFwiZHJhdy1wcmV2aWV3XCI6IHRydWV9KX0gLz5cblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1wicmlnaHQtZmFjZVwiOiB0cnVlLCBcImRyYXctcHJldmlld1wiOiB0cnVlfSl9IC8+XG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcInRvcC1mYWNlXCI6IHRydWUsIFwiZHJhdy1wcmV2aWV3XCI6IHRydWV9KX0gLz5cblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1wiYm90dG9tLWZhY2VcIjogdHJ1ZSwgXCJkcmF3LXByZXZpZXdcIjogdHJ1ZX0pfSAvPlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0KTtcblx0XHR9XG5cblx0fSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtCb2FyZDogR2FtZUJvYXJkLCBDZWxsOiBDZWxsLCBEcmF3bkNvbXBvbmVudDogRHJhd25Db21wb25lbnR9OyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgQ2xvY2sgZnJvbSAnLi9DbG9jayc7XG5pbXBvcnQgQ2hhdFN0b3JlIGZyb20gJy4uL3N0b3Jlcy9DaGF0U3RvcmUnO1xuaW1wb3J0IENoYXRBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvQ2hhdEFjdGlvbnMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5jb25zdCBHYW1lSGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBwYXJhbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIG9wZW5Nb2RhbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBnYW1lT3ZlcjogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW5dLFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4gb21pdChDaGF0U3RvcmUuZ2V0U3RhdGUoKSwgJ21lc3NhZ2VzJyk7XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIENoYXRTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25DaGF0Q2hhbmdlKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgQ2hhdFN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25DaGF0Q2hhbmdlKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zLCBnYW1lT3ZlciwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHVuc2VlbkNvdW50ID0gdGhpcy5zdGF0ZS51bnNlZW5Db3VudDtcblxuICAgIHJldHVybiAoXG4gICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XG5cbiAgICAgICAgPENsb2NrXG4gICAgICAgICAgaW89e2lvfVxuICAgICAgICAgIHBhcmFtcz17cGFyYW1zfSAvPlxuXG4gICAgICAgIHsvKjxzcGFuIGlkPVwiZ2FtZS10eXBlXCI+XG4gICAgICAgICAge2Ake3BhcmFtc1sxXX18JHtwYXJhbXNbMl19YH1cbiAgICAgICAgPC9zcGFuPiovfVxuXG4gICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0blwiIGhyZWY9XCIvXCI+TmV3IGdhbWU8L2E+XG5cbiAgICAgICAgeyFnYW1lT3ZlciAmJiBpc09wcG9uZW50QXZhaWxhYmxlID9cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4gYnRuLS1yZWQgcmVzaWduXCJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5fb25SZXNpZ259PlxuICAgICAgICAgICAgUmVzaWduXG4gICAgICAgICAgPC9hPlxuICAgICAgICA6Z2FtZU92ZXIgP1xuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tLXJlZCByZW1hdGNoXCJcbiAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9vblJlbWF0Y2h9PlxuICAgICAgICAgICAgUmVtYXRjaFxuICAgICAgICAgIDwvYT5cbiAgICAgICAgOm51bGx9XG5cbiAgICAgICAgPGEgaWQ9XCJjaGF0LWljb25cIlxuICAgICAgICAgICBvbkNsaWNrPXtDaGF0QWN0aW9ucy50b2dnbGVWaXNpYmlsaXR5fT5cbiAgICAgICAgICB7dW5zZWVuQ291bnQgP1xuICAgICAgICAgICAgPHNwYW4gaWQ9XCJjaGF0LWNvdW50ZXJcIj5cbiAgICAgICAgICAgICAge3Vuc2VlbkNvdW50IDwgOSA/IHVuc2VlbkNvdW50IDogJzkrJ31cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA6bnVsbH1cbiAgICAgICAgICA8aW1nIHNyYz1cIi9pbWcvY2hhdC5zdmdcIlxuICAgICAgICAgICAgICAgd2lkdGg9XCI1MFwiXG4gICAgICAgICAgICAgICBoZWlnaHQ9XCI1MFwiIC8+XG4gICAgICAgICAgQ2hhdFxuICAgICAgICA8L2E+XG4gICAgICA8L2hlYWRlcj5cbiAgICApO1xuICB9LFxuICBfb25DaGF0Q2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUob21pdChDaGF0U3RvcmUuZ2V0U3RhdGUoKSwgJ21lc3NhZ2VzJykpO1xuICB9LFxuICBfb25SZXNpZ24oKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXMsIGNvbG9yfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpby5lbWl0KCdyZXNpZ24nLCB7XG4gICAgICB0b2tlbjogcGFyYW1zWzBdLFxuICAgICAgY29sb3I6IGNvbG9yXG4gICAgfSk7XG4gIH0sXG4gIF9vblJlbWF0Y2goKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXMsIG9wZW5Nb2RhbCwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCFpc09wcG9uZW50QXZhaWxhYmxlKSB7XG4gICAgICBvcGVuTW9kYWwoJ2luZm8nLCAnWW91ciBvcHBvbmVudCBoYXMgZGlzY29ubmVjdGVkLiBZb3UgbmVlZCB0byAnICtcbiAgICAgICAgJ2dlbmVyYXRlIGEgbmV3IGxpbmsuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaW8uZW1pdCgncmVtYXRjaC1vZmZlcicsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF1cbiAgICB9KTtcbiAgICBvcGVuTW9kYWwoJ2luZm8nLCAnWW91ciBvZmZlciBoYXMgYmVlbiBzZW50LicpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZUhlYWRlcjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVIZWFkZXIgZnJvbSAnLi9HYW1lSGVhZGVyJztcbmltcG9ydCBDaGF0IGZyb20gJy4vQ2hhdCc7XG5pbXBvcnQgTW9kYWwgZnJvbSAnLi9Nb2RhbCc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IENoZXNzYm9hcmRJbnRlcmZhY2UgZnJvbSAnLi9DaGVzc2JvYXJkSW50ZXJmYWNlJztcbmltcG9ydCBHYW1lYm9hcmRJbnRlcmZhY2UgZnJvbSAnLi9HYW1lYm9hcmRJbnRlcmZhY2UnO1xuaW1wb3J0IHtNYXB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQge0JvYXJkfSBmcm9tICcuL0dhbWVCb2FyZCc7XG5cbmNvbnN0IEdhbWVJbnRlcmZhY2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHBhcmFtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbiAgfSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IGZhbHNlLFxuICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICBtb2RhbDogTWFwKHtcbiAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgIGhpZGU6IHRoaXMuX2hpZGVNb2RhbCxcbiAgICAgICAgICBhY2NlcHQ6IHRoaXMuX2FjY2VwdFJlbWF0Y2gsXG4gICAgICAgICAgZGVjbGluZTogdGhpcy5fZGVjbGluZVJlbWF0Y2hcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBnYW1lT3ZlcjogR2FtZVN0b3JlLmdldFN0YXRlKCkuZ2FtZU92ZXJcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtc30gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8ub24oJ3Rva2VuLWludmFsaWQnLCAoKSA9PiB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1vZGFsOiB0aGlzLnN0YXRlLm1vZGFsXG4gICAgICAgIC5zZXQoJ29wZW4nLCB0cnVlKVxuICAgICAgICAuc2V0KCdtZXNzYWdlJywgJ0dhbWUgbGluayBpcyBpbnZhbGlkIG9yIGhhcyBleHBpcmVkLicpXG4gICAgICAgIC5zZXQoJ3R5cGUnLCAnaW5mbycpXG4gICAgfSkpO1xuXG4gICAgaW8uZW1pdCgnam9pbicsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICB0aW1lOiBwYXJhbXNbMV0gKiA2MCxcbiAgICAgIGluYzogcGFyYW1zWzJdXG4gICAgfSk7XG5cbiAgICBpby5vbignam9pbmVkJywgZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5jb2xvciA9PT0gJ2JsYWNrJykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb2xvcjogJ2JsYWNrJ30pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaW8ub24oJ2JvdGgtam9pbmVkJywgKCkgPT5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzT3Bwb25lbnRBdmFpbGFibGU6IHRydWV9LCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbG9yID09PSAnd2hpdGUnKSB7XG4gICAgICAgICAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xuICAgICAgICAgICAgdG9rZW46IHBhcmFtc1swXSxcbiAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcblxuICAgIGlvLm9uKCdmdWxsJywgKCkgPT4ge1xuICAgICAgd2luZG93LmFsZXJ0KFxuICAgICAgICAnVGhpcyBnYW1lIGFscmVhZHkgaGFzIHR3byBwbGF5ZXJzLiBZb3UgaGF2ZSB0byBjcmVhdGUgYSBuZXcgb25lLicpO1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gJy8nO1xuICAgIH0pO1xuXG4gICAgaW8ub24oJ3BsYXllci1yZXNpZ25lZCcsIGRhdGEgPT4ge1xuICAgICAgR2FtZUFjdGlvbnMuZ2FtZU92ZXIoe1xuICAgICAgICB0eXBlOiAncmVzaWduJyxcbiAgICAgICAgd2lubmVyOiBkYXRhLmNvbG9yID09PSAnYmxhY2snID8gJ1doaXRlJyA6ICdCbGFjaydcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtb2ZmZXJlZCcsICgpID0+XG4gICAgICB0aGlzLl9vcGVuTW9kYWwoJ29mZmVyJywgJ1lvdXIgb3Bwb25lbnQgaGFzIHNlbnQgeW91IGEgcmVtYXRjaCBvZmZlci4nKSk7XG5cbiAgICBpby5vbigncmVtYXRjaC1kZWNsaW5lZCcsICgpID0+XG4gICAgICB0aGlzLl9vcGVuTW9kYWwoJ2luZm8nLCAnUmVtYXRjaCBvZmZlciBoYXMgYmVlbiBkZWNsaW5lZC4nKSk7XG5cbiAgICBpby5vbigncmVtYXRjaC1hY2NlcHRlZCcsICgpID0+IHtcbiAgICAgIEdhbWVBY3Rpb25zLnJlbWF0Y2goKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb2xvcjogdGhpcy5zdGF0ZS5jb2xvciA9PT0gJ3doaXRlJyA/ICdibGFjaycgOiAnd2hpdGUnLFxuICAgICAgICBtb2RhbDogdGhpcy5zdGF0ZS5tb2RhbC5zZXQoJ29wZW4nLCBmYWxzZSlcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29sb3IgPT09ICd3aGl0ZScpIHtcbiAgICAgICAgICBpby5lbWl0KCdjbG9jay1ydW4nLCB7XG4gICAgICAgICAgICB0b2tlbjogdGhpcy5wcm9wcy5wYXJhbXNbMF0sXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlvLm9uKCdvcHBvbmVudC1kaXNjb25uZWN0ZWQnLCAoKSA9PiAge1xuICAgICAgaWYgKCF0aGlzLnN0YXRlLmdhbWVPdmVyLmdldCgnc3RhdHVzJykpIHtcbiAgICAgICAgdGhpcy5fb3Blbk1vZGFsKCdpbmZvJywgJ1lvdXIgb3Bwb25lbnQgaGFzIGRpc2Nvbm5lY3RlZC4nKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNPcHBvbmVudEF2YWlsYWJsZTogZmFsc2V9KTtcbiAgICB9KTtcblxuICAgIEdhbWVTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgR2FtZVN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcbiAgfSxcblxuXG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7Y29sb3IsIGdhbWVPdmVyLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgY29tbW9uUHJvcHMgPSB7XG4gICAgICBpbzogaW8sXG4gICAgICBjb2xvcjogY29sb3IsXG4gICAgICBvcGVuTW9kYWw6IHRoaXMuX29wZW5Nb2RhbCxcbiAgICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IGlzT3Bwb25lbnRBdmFpbGFibGVcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxHYW1lSGVhZGVyXG4gICAgICAgICAgey4uLmNvbW1vblByb3BzfVxuICAgICAgICAgIHBhcmFtcz17cGFyYW1zfVxuICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlci5nZXQoJ3N0YXR1cycpfSAvPlxuXG4gICAgICAgIDxDaGF0XG4gICAgICAgICAgey4uLmNvbW1vblByb3BzfVxuICAgICAgICAgIHRva2VuPXtwYXJhbXNbMF19IC8+XG5cbiAgICAgICAgICA8R2FtZWJvYXJkSW50ZXJmYWNlIFxuICAgICAgICAgICAgey4uLmNvbW1vblByb3BzfVxuICAgICAgICAgICAgdG9rZW49e3BhcmFtc1swXX1cbiAgICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlcn0gLz5cblxuICAgICAgICA8TW9kYWwgZGF0YT17dGhpcy5zdGF0ZS5tb2RhbH0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cblxuXG5cbiAgX29uR2FtZUNoYW5nZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtnYW1lT3ZlcjogR2FtZVN0b3JlLmdldFN0YXRlKCkuZ2FtZU92ZXJ9KTtcbiAgfSxcbiAgX29wZW5Nb2RhbCh0eXBlLCBtZXNzYWdlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb2RhbDogdGhpcy5zdGF0ZS5tb2RhbFxuICAgICAgICAuc2V0KCdvcGVuJywgdHJ1ZSlcbiAgICAgICAgLnNldCgnbWVzc2FnZScsIG1lc3NhZ2UpXG4gICAgICAgIC5zZXQoJ3R5cGUnLCB0eXBlKVxuICAgIH0pO1xuICB9LFxuICBfaGlkZU1vZGFsKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21vZGFsOiB0aGlzLnN0YXRlLm1vZGFsLnNldCgnb3BlbicsIGZhbHNlKX0pO1xuICB9LFxuICBfYWNjZXB0UmVtYXRjaCgpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtc30gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8uZW1pdCgncmVtYXRjaC1hY2NlcHQnLCB7XG4gICAgICB0b2tlbjogcGFyYW1zWzBdLFxuICAgICAgdGltZTogcGFyYW1zWzFdICogNjAsXG4gICAgICBpbmM6IHBhcmFtc1syXVxuICAgIH0pO1xuICAgIHRoaXMuX2hpZGVNb2RhbCgpO1xuICB9LFxuICBfZGVjbGluZVJlbWF0Y2goKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXN9ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLmVtaXQoJ3JlbWF0Y2gtZGVjbGluZScsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF1cbiAgICB9KTtcbiAgICB0aGlzLl9oaWRlTW9kYWwoKTtcbiAgfSxcbiAgX3RvZ2dsZVNvdW5kcyhlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzb3VuZHNFbmFibGVkOiAhdGhpcy5zdGF0ZS5zb3VuZHNFbmFibGVkXG4gICAgfSk7XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZUludGVyZmFjZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XG5pbXBvcnQgQ2hlc3Nib2FyZCBmcm9tICcuL0NoZXNzYm9hcmQnO1xuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi9HYW1lQm9hcmQnO1xuaW1wb3J0IENhcHR1cmVkUGllY2VzIGZyb20gJy4vQ2FwdHVyZWRQaWVjZXMnO1xuaW1wb3J0IFRhYmxlT2ZNb3ZlcyBmcm9tICcuL1RhYmxlT2ZNb3Zlcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbi8qIHRoZSBzdGF0ZSBvZiB0aGUgZ2FtZWJvYXJkIGlzIG1hbmFnZWQgYnkgR2FtZVN0b3JlICovXG5cbmNvbnN0IEdhbWVib2FyZEludGVyZmFjZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRwcm9wVHlwZXM6IHtcblxuXHR9LFxuXHRtaXhpbnM6IFtvbkdhbWVDaGFuZ2VdLFx0XHQvLyB0aGlzIG1peGluIGlzIHJlc3BvbnNpYmxlIGZvciBkeW5hbWljYWxseSBjaGFuZ2luZyB0aGUgc3RhdGUgb2YgR2FtZWJvYXJkSW50ZXJmYWNlXG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcblx0XHRyZXR1cm4gR2FtZVN0b3JlLmdldFN0YXRlKCk7XG5cdH0sXG5cdGdldERlZmF1bHRQcm9wcygpIHtcblxuXHR9LFxuXHRjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG5cblx0fSxcblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtwcm9tb3Rpb24sIHR1cm4sIGdhbWVPdmVyLCBjaGVja30gPSB0aGlzLnN0YXRlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgaWQ9XCJib2FyZC1tb3Zlcy13cmFwcGVyXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cblx0XHRcdFx0PGRpdiBpZD1cImJvYXJkLXdyYXBwZXJcIj5cblxuXHRcdFx0XHRcdDxwPllvdSBhcmU6IHt0aGlzLnByb3BzLmNvbG9yPT09J3doaXRlJyA/ICdXaGl0ZScgOiAnQmxhY2snfTwvcD5cblx0XHRcdFx0XHQ8Q2FwdHVyZWRQaWVjZXMgLz5cblxuXHRcdFx0XHRcdDxCb2FyZCBzaXplPXs2fVxuXHRcdFx0XHRcdFx0ey4uLm9taXQodGhpcy5wcm9wcywgJ2dhbWVPdmVyJyl9XG5cdFx0XHRcdFx0XHRnYW1lT3Zlcj17Z2FtZU92ZXIuZ2V0KCdzdGF0dXMnKX0gLz5cblxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJmZWVkYmFja1wiPlxuXHRcdFx0XHRcdHshZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSA/XG5cdFx0XHRcdFx0XHQ8c3Bhbj5cblx0XHRcdFx0XHRcdFx0e2Ake3R1cm49PT0ndycgPyAnV2hpdGUnIDogJ0JsYWNrJ30gdG8gbW92ZS5gfVxuXHRcdFx0XHRcdFx0PC9zcGFuPiA6XG5cdFx0XHRcdFx0XHQ8c3Ryb25nPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+XG5cdFx0XHRcdFx0XHRcdCAge2dhbWVPdmVyLmdldCgnd2lubmVyJykgPT09ICdXaGl0ZScgPyAnRicgOiAnZid9XG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0e3RoaXMuX2dldEdhbWVPdmVyTWVzc2FnZSgpfVxuXHRcdFx0XHRcdFx0PC9zdHJvbmc+XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH0sXG5cblx0X29uR2FtZUNoYW5nZSgpIHtcblx0XHR0aGlzLnNldFN0YXRlKEdhbWVTdG9yZS5nZXRTdGF0ZSgpKTtcblx0fSxcblxuXHRfZ2V0R2FtZU92ZXJNZXNzYWdlKCkge1xuXHRcdHJldHVybiBgYDtcblx0fVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IE1vZGFsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW5dLFxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCBpc09wZW4gPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCdvcGVuJyk7XG5cbiAgICBpZiAoaXNPcGVuKVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5ZG93bik7XG4gICAgZWxzZVxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5ZG93bik7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5wcm9wcy5kYXRhO1xuICAgIGNvbnN0IHR5cGUgPSBkYXRhLmdldCgndHlwZScpO1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IGRhdGEuZ2V0KCdjYWxsYmFja3MnKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICdtb2RhbC1tYXNrJzogdHJ1ZSxcbiAgICAgICAgICAgICAnaGlkZGVuJzogIWRhdGEuZ2V0KCdvcGVuJylcbiAgICAgICAgICAgfSl9XG4gICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX2hpZGVNb2RhbH0+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDxzdHJvbmc+RXNjOiA8L3N0cm9uZz5cbiAgICAgICAgICA8c3Bhbj57dHlwZSA9PT0gJ2luZm8nID8gJ09LJyA6ICdEZWNsaW5lJ308L3NwYW4+XG4gICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgPHN0cm9uZz5FbnRlcjogPC9zdHJvbmc+XG4gICAgICAgICAgPHNwYW4+e3R5cGUgPT09ICdpbmZvJyA/ICdPSycgOiAnQWNjZXB0J308L3NwYW4+XG4gICAgICAgIDwvcD5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCJcbiAgICAgICAgICAgICBvbkNsaWNrPXtlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9PlxuICAgICAgICAgIDxwPntkYXRhLmdldCgnbWVzc2FnZScpfTwvcD5cblxuICAgICAgICAgIHt0eXBlID09PSAnaW5mbycgPyBcbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBva1wiXG4gICAgICAgICAgICAgICBvbkNsaWNrPXtjYWxsYmFja3MuaGlkZX0+XG4gICAgICAgICAgICAgIE9LXG4gICAgICAgICAgICA8L2E+IDogW1xuXG4gICAgICAgICAgICA8YSBrZXk9XCJhXCJcbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0blwiXG4gICAgICAgICAgICAgICBzdHlsZT17e2xlZnQ6ICc0ZW0nfX1cbiAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NhbGxiYWNrcy5hY2NlcHR9PlxuICAgICAgICAgICAgICBBY2NlcHRcbiAgICAgICAgICAgIDwvYT4sXG4gICAgICAgICAgICA8YSBrZXk9XCJiXCJcbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tLXJlZFwiXG4gICAgICAgICAgICAgICBzdHlsZT17e3JpZ2h0OiAnNGVtJ319XG4gICAgICAgICAgICAgICBvbkNsaWNrPXtjYWxsYmFja3MuZGVjbGluZX0+XG4gICAgICAgICAgICAgIERlY2xpbmVcbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICBdfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIF9vbktleWRvd24oZSkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCd0eXBlJyk7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5wcm9wcy5kYXRhLmdldCgnY2FsbGJhY2tzJyk7XG5cbiAgICBpZiAodHlwZSA9PT0gJ2luZm8nKSB7XG4gICAgICBpZiAoZS53aGljaCA9PT0gMTMgfHwgZS53aGljaCA9PT0gMjcpIHtcbiAgICAgICAgY2FsbGJhY2tzLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgIGlmIChlLndoaWNoID09PSAxMykge1xuICAgICAgICBjYWxsYmFja3MuYWNjZXB0KCk7XG4gICAgICB9IGVsc2UgaWYgKGUud2hpY2ggPT09IDI3KSB7XG4gICAgICAgIGNhbGxiYWNrcy5kZWNsaW5lKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBfaGlkZU1vZGFsKCkge1xuICAgIHRoaXMucHJvcHMuZGF0YS5nZXQoJ2NhbGxiYWNrcycpLmhpZGUoKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcblxuY29uc3QgVGFibGVPZk1vdmVzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgb25HYW1lQ2hhbmdlXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vdmVzOiBHYW1lU3RvcmUuZ2V0TW92ZXMoKVxuICAgIH07XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHRhYmxlIGlkPVwibW92ZXNcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoPlRhYmxlIG9mIG1vdmVzPC90aD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAge3RoaXMuc3RhdGUubW92ZXMubWFwKChyb3csIGkpID0+IChcbiAgICAgICAgICAgIDx0ciBrZXk9e2l9PlxuICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz57YCR7aSArIDF9LmB9PC9zdHJvbmc+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIHtyb3cubWFwKChtb3ZlLCBqKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRkIGtleT17an0+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57bW92ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgKSkudG9BcnJheSgpfVxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICApKS50b0FycmF5KCl9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgICk7XG4gIH0sXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb3ZlczogR2FtZVN0b3JlLmdldE1vdmVzKClcbiAgICB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlT2ZNb3ZlczsiLCJpbXBvcnQga2V5TWlycm9yIGZyb20gJ3JlYWN0L2xpYi9rZXlNaXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBrZXlNaXJyb3Ioe1xuICBUT0dHTEVfVklTSUJJTElUWTogbnVsbCxcbiAgU1VCTUlUX01FU1NBR0U6IG51bGxcbn0pOyIsImNvbnN0IENoZXNzUGllY2VzID0ge1xuICAvLyBrZXk6IHBpZWNlIGZyb20gRkVOLCB2YWx1ZTogcGllY2UgZnJvbSBTbWFydCBSZWd1bGFyIGNoZXNzIGZvbnRcbiAgLy8gd2hpdGUgcGllY2VzXG4gICdLJzogJ0YnLFxuICAnUSc6ICdFJyxcbiAgJ1InOiAnRCcsXG4gICdCJzogJ0MnLFxuICAnTic6ICdCJyxcbiAgJ1AnOiAnQScsXG4gIC8vIGJsYWNrIHBpZWNlc1xuICAnayc6ICdmJyxcbiAgJ3EnOiAnZScsXG4gICdyJzogJ2QnLFxuICAnYic6ICdjJyxcbiAgJ24nOiAnYicsXG4gICdwJzogJ2EnLFxuICAvLyBlbXB0eSBzcXVhcmVcbiAgJy0nOiB1bmRlZmluZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoZXNzUGllY2VzOyIsImltcG9ydCBrZXlNaXJyb3IgZnJvbSAncmVhY3QvbGliL2tleU1pcnJvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGtleU1pcnJvcih7XG4gIE1BS0VfTU9WRTogbnVsbCxcbiAgU0hPV19NT1ZFUzogbnVsbCxcbiAgUkVNQVRDSDogbnVsbCxcbiAgRFJBVzogbnVsbCxcbiAgR0FNRV9PVkVSOiBudWxsLFxuICBDSEFOR0VfUFJPTU9USU9OOiBudWxsXG59KTsiLCJpbXBvcnQge0Rpc3BhdGNoZXJ9IGZyb20gJ2ZsdXgnO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKG5ldyBEaXNwYXRjaGVyKCksIHtcbiAgLy8gQHBhcmFtIHtvYmplY3R9IGFjdGlvbiBUaGUgZGF0YSBjb21pbmcgZnJvbSB0aGUgdmlldy5cbiAgaGFuZGxlVmlld0FjdGlvbjogZnVuY3Rpb24oYWN0aW9uKSB7XG4gICAgdGhpcy5kaXNwYXRjaCh7XG4gICAgICBzb3VyY2U6ICdWSUVXX0FDVElPTicsXG4gICAgICBhY3Rpb246IGFjdGlvblxuICAgIH0pO1xuICB9XG59KTsiLCJjb25zdCBUaWxlQWN0aW9ucyA9IHtcbiAgICBcIkFzc2Fzc2luXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXAgc2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0yLDJdXCI6IFwianVtcCBzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcImp1bXAgc2xpZGVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcCBzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wIHNsaWRlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcCBzbGlkZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiQm93bWFuXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwwXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJzdHJpa2VcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIkNoYW1waW9uXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiRHJhZ29vblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJzdHJpa2VcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcInNsaWRlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJEdWNoZXNzXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiRHVrZVwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcInNsaWRlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJzbGlkZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiRm9vdG1hblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiS25pZ2h0XCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlstMSwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsxLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJtb3ZlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJMb25nYm93bWFuXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLC0zXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiTWFyc2hhbGxcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiT3JhY2xlXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiUGlrZW1hblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTEsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlsxLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcIm1vdmVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIlByaWVzdFwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJzbGlkZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDJdXCI6IFwianVtcFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiUmFuZ2VyXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0xLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsLTFdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwtMV1cIjogXCJqdW1wXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlstMSwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzEsMl1cIjogXCJqdW1wXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJTZWVyXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJXaXphcmRcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcImp1bXBcIlxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8vIHZhciBuZXdVbml0cyA9IHt9O1xuLy8gZm9yICh2YXIgdW5pdEtleSBpbiBUaWxlQWN0aW9ucykge1xuLy8gICAgIHZhciB1bml0ID0gVGlsZUFjdGlvbnNbdW5pdEtleV07XG4vLyAgICAgdmFyIG5ld1NpZGVzID0ge307XG4vLyAgICAgZm9yICh2YXIgc2lkZUtleSBpbiB1bml0KSB7XG4vLyAgICAgICAgIHZhciBkaXIgPSB1bml0W3NpZGVLZXldO1xuLy8gICAgICAgICB2YXIgbmV3RGlyID0ge307XG4vLyAgICAgICAgIGZvciAodmFyIGNvb3JkcyBpbiBkaXIpIHtcbi8vICAgICAgICAgICAgIHZhciBwYXJzZWQgPSBKU09OLnBhcnNlKGNvb3Jkcyk7XG4vLyAgICAgICAgICAgICB2YXIgbmV3Q29vcmRzID0gSlNPTi5zdHJpbmdpZnkoW3BhcnNlZFsxXSwgcGFyc2VkWzBdXSk7XG4vLyAgICAgICAgICAgICBuZXdEaXJbbmV3Q29vcmRzXSA9IGRpcltjb29yZHNdO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIG5ld1NpZGVzW3NpZGVLZXldID0gbmV3RGlyO1xuLy8gICAgIH1cbi8vICAgICBuZXdVbml0c1t1bml0S2V5XSA9IG5ld1NpZGVzO1xuLy8gfVxuLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobmV3VW5pdHMpKTtcblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgVGlsZUFjdGlvbnM7XG4iLCIoZnVuY3Rpb24gKHByb2Nlc3Mpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmUgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqOyB9O1xuXG52YXIgaW8gPSBfaW50ZXJvcFJlcXVpcmUocmVxdWlyZShcInNvY2tldC5pby1jbGllbnRcIikpO1xuXG52YXIgb3MgPSBfaW50ZXJvcFJlcXVpcmUocmVxdWlyZShcIm9zXCIpKTtcblxudmFyIGhvc3RuYW1lID0gb3MuaG9zdG5hbWUoKTtcblxudmFyIHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDEzMzc7XG52YXIgT1JJR0lOID0gaG9zdG5hbWUuaW5jbHVkZXMoXCJoZXJva3VhcHAuY29tXCIpID8gaG9zdG5hbWUgOiBob3N0bmFtZSArIFwiOlwiICsgcG9ydDtcblxubW9kdWxlLmV4cG9ydHMgPSBpby5jb25uZWN0KE9SSUdJTik7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpKVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTlLWVhrdlJuVnNiSE4wWVdOckwzTm9iMmQxYmkxMk1pOXpjbU12YW5NdmFXOHVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQkxGbEJRVmtzUTBGQlF6czdPenRKUVVWT0xFVkJRVVVzTWtKQlFVMHNhMEpCUVd0Q096dEpRVU14UWl4RlFVRkZMREpDUVVGUExFbEJRVWs3TzBGQlEzQkNMRWxCUVUwc1VVRkJVU3hIUVVGSExFVkJRVVVzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXpzN1FVRkZMMElzU1VGQlRTeEpRVUZKTEVkQlFVY3NUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFbEJRVWtzU1VGQlNTeERRVUZETzBGQlEzUkRMRWxCUVUwc1RVRkJUU3hIUVVGSExGRkJRVkVzUTBGQlF5eFJRVUZSTEVOQlFVTXNaVUZCWlN4RFFVRkRMRWRCUVVjc1VVRkJVU3hIUVVGSExGRkJRVkVzUjBGQlF5eEhRVUZITEVkQlFVTXNTVUZCU1N4RFFVRkRPenRwUWtGRmJFVXNSVUZCUlN4RFFVRkRMRTlCUVU4c1EwRkJReXhOUVVGTkxFTkJRVU1pTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWFXMXdiM0owSUdsdklHWnliMjBnSjNOdlkydGxkQzVwYnkxamJHbGxiblFuTzF4dWFXMXdiM0owSUc5eklHWnliMjBnSUZ3aWIzTmNJanRjYm1OdmJuTjBJR2h2YzNSdVlXMWxJRDBnYjNNdWFHOXpkRzVoYldVb0tUdGNibHh1WTI5dWMzUWdjRzl5ZENBOUlIQnliMk5sYzNNdVpXNTJMbEJQVWxRZ2ZId2dNVE16Tnp0Y2JtTnZibk4wSUU5U1NVZEpUaUE5SUdodmMzUnVZVzFsTG1sdVkyeDFaR1Z6S0Nkb1pYSnZhM1ZoY0hBdVkyOXRKeWtnUHlCb2IzTjBibUZ0WlNBNklHaHZjM1J1WVcxbEsxd2lPbHdpSzNCdmNuUTdYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJR2x2TG1OdmJtNWxZM1FvVDFKSlIwbE9LVHNpWFgwPSIsImNvbnN0IG1heWJlUmV2ZXJzZSA9IHtcbiAgX21heWJlUmV2ZXJzZShpdGVyYWJsZSwgY29sb3IpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jb2xvciA9PT0gKGNvbG9yIHx8ICdibGFjaycpID9cbiAgICAgIGl0ZXJhYmxlLnJldmVyc2UoKSA6IGl0ZXJhYmxlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtYXliZVJldmVyc2U7IiwiaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcblxuY29uc3Qgb25HYW1lQ2hhbmdlID0ge1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIEdhbWVTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG9uR2FtZUNoYW5nZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XG5pbXBvcnQge0V2ZW50RW1pdHRlcjIgYXMgRXZlbnRFbWl0dGVyfSBmcm9tICdldmVudGVtaXR0ZXIyJztcbmltcG9ydCBDaGF0Q29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9DaGF0Q29uc3RhbnRzJztcbmltcG9ydCB7TGlzdCwgTWFwfSBmcm9tICdpbW11dGFibGUnO1xuXG5jb25zdCBDSEFOR0VfRVZFTlQgPSAnY2hhbmdlJztcbiAgXG52YXIgX21lc3NhZ2VzID0gTGlzdCgpO1xudmFyIF91bnNlZW5Db3VudCA9IDA7XG52YXIgX2lzQ2hhdEhpZGRlbiA9IHRydWU7XG5cbmNvbnN0IENoYXRTdG9yZSA9IE9iamVjdC5hc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2VzOiBfbWVzc2FnZXMsXG4gICAgICB1bnNlZW5Db3VudDogX3Vuc2VlbkNvdW50LFxuICAgICAgaXNDaGF0SGlkZGVuOiBfaXNDaGF0SGlkZGVuXG4gICAgfTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHRvZ2dsZVZpc2liaWxpdHkoKSB7XG4gIF9pc0NoYXRIaWRkZW4gPSAhX2lzQ2hhdEhpZGRlbjtcbiAgX3Vuc2VlbkNvdW50ID0gMDtcbn1cblxuZnVuY3Rpb24gc3VibWl0TWVzc2FnZShtZXNzYWdlLCBjbGFzc05hbWUsIHJlY2VpdmVkKSB7XG4gIF9tZXNzYWdlcyA9IF9tZXNzYWdlcy5wdXNoKE1hcCh7XG4gICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZVxuICB9KSk7XG5cbiAgaWYgKHJlY2VpdmVkICYmIF9pc0NoYXRIaWRkZW4pIHtcbiAgICBfdW5zZWVuQ291bnQgKz0gMTtcbiAgfVxufVxuXG5BcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKHBheWxvYWQgPT4ge1xuICBjb25zdCBhY3Rpb24gPSBwYXlsb2FkLmFjdGlvbjtcblxuICBzd2l0Y2ggKGFjdGlvbi5hY3Rpb25UeXBlKSB7XG4gICAgY2FzZSBDaGF0Q29uc3RhbnRzLlRPR0dMRV9WSVNJQklMSVRZOlxuICAgICAgdG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIENoYXRDb25zdGFudHMuU1VCTUlUX01FU1NBR0U6XG4gICAgICBzdWJtaXRNZXNzYWdlKGFjdGlvbi5tZXNzYWdlLCBhY3Rpb24uY2xhc3NOYW1lLCBhY3Rpb24ucmVjZWl2ZWQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBDaGF0U3RvcmUuZW1pdChDSEFOR0VfRVZFTlQpO1xuICByZXR1cm4gdHJ1ZTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDaGF0U3RvcmU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIyIGFzIEV2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRlbWl0dGVyMic7XG5pbXBvcnQgR2FtZUNvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvR2FtZUNvbnN0YW50cyc7XG5pbXBvcnQgQ2hlc3NQaWVjZXMgZnJvbSAnLi4vY29uc3RhbnRzL0NoZXNzUGllY2VzJztcbmltcG9ydCB7Q2hlc3N9IGZyb20gJ2NoZXNzLmpzJztcbmltcG9ydCB7TGlzdCwgTWFwLCBPcmRlcmVkTWFwLCBTZXR9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgYmVoYXZpb3IgZnJvbSAnLi4vZ2FtZS9iZWhhdmlvcic7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmNvbnN0IENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xuY29uc3QgTU9WRV9FVkVOVCA9ICduZXctbW92ZSc7XG5cbnZhciBfZ2FtZU92ZXI7XG52YXIgX2NhcHR1cmVkUGllY2VzO1xudmFyIF9tb3ZlcztcbnZhciBfbW92ZWQ7XG52YXIgX3R1cm47XG52YXIgX2NoZWNrO1xudmFyIF9sYXN0TW92ZTtcbnZhciBfY2hlc3M7XG5cbnZhciBfYm9hcmQsIF9saWdodHVwLCBfc3RyaWtlLCBfZHJvcCwgX3NlbGVjdGVkLCBfZHJhd24gPSBbXSwgX3Jlc3VsdCwgX2RlY2ssIF9wZW5kaW5nRHJhdztcblxuXG5zZXRJbml0aWFsU3RhdGUoKTtcblxudmFyIEdhbWVTdG9yZSA9IE9iamVjdC5hc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICBhZGRDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24oY2IpIHtcbiAgICAgIHRoaXMub24oQ0hBTkdFX0VWRU5ULCBjYik7XG4gICAgfSxcblxuICAgIHJlbW92ZUNoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihjYikge1xuICAgICAgdGhpcy5yZW1vdmVDaGFuZ2VMaXN0ZW5lcihDSEFOR0VfRVZFTlQsIGNiKTtcbiAgICB9LFxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2FtZU92ZXI6IF9nYW1lT3ZlcixcbiAgICAgICAgICAgIHR1cm46IF90dXJuLFxuICAgICAgICAgICAgY2hlY2s6IF9jaGVjayxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldENhcHR1cmVkUGllY2VzKCkge1xuICAgICAgICByZXR1cm4gX2NhcHR1cmVkUGllY2VzO1xuICAgIH0sXG4gICAgZ2V0TW92ZXMoKSB7XG4gICAgICAgIHJldHVybiBfbW92ZXM7XG4gICAgfSxcblxuICAgIGdldEdhbWVib2FyZFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYm9hcmQ6IF9ib2FyZCxcbiAgICAgICAgICAgIGxpZ2h0dXA6IF9saWdodHVwLFxuICAgICAgICAgICAgc3RyaWtlOiBfc3RyaWtlLFxuICAgICAgICAgICAgZHJvcDogX2Ryb3AsXG4gICAgICAgICAgICBzZWxlY3RlZDogX3NlbGVjdGVkLFxuICAgICAgICAgICAgZHJhd1VuaXQ6IF9yZXN1bHQsXG4gICAgICAgICAgICB0dXJuOiBfdHVybixcbiAgICAgICAgICAgIG1vdmVkOiBfbW92ZWQsXG4gICAgICAgICAgICBkZWNrOiBfZGVjayxcbiAgICAgICAgICAgIHBlbmRpbmdEcmF3OiBfcGVuZGluZ0RyYXcsXG4gICAgICAgICAgICBnYW1lb3ZlcjogX2dhbWVPdmVyXG4gICAgICAgIH1cbiAgICB9LFxuXG59KTtcblxuXG5mdW5jdGlvbiBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgX2dhbWVPdmVyID0gTWFwKHtcbiAgICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgICAgdHlwZTogbnVsbCxcbiAgICAgICAgd2lubmVyOiBudWxsXG4gICAgfSk7XG4gICAgX2NhcHR1cmVkUGllY2VzID0gT3JkZXJlZE1hcChbXG4gICAgICAgIFsndycsIExpc3QoKV0sXG4gICAgICAgIFsnYicsIExpc3QoKV1cbiAgICBdKTtcbiAgICBfbW92ZXMgPSBMaXN0KCk7XG4gICAgX3R1cm4gPSAndyc7XG4gICAgX21vdmVkID0gZmFsc2U7XG4gICAgX2NoZWNrID0gZmFsc2U7XG4gICAgX2xhc3RNb3ZlID0gTWFwKCk7XG4gICAgX3NlbGVjdGVkID0gbnVsbDtcbiAgICBfcGVuZGluZ0RyYXcgPSBudWxsO1xuICAgIC8vX2NoZXNzID0gbmV3IENoZXNzKCk7XG5cbiAgICBfbGlnaHR1cCA9IHt9O1xuICAgIF9zdHJpa2UgPSB7fTtcbiAgICBfZHJvcCA9IHt9O1xuXG4gICAgX2JvYXJkID0ge1xuICAgICAgICAvLyAnWzEsIDJdJzoge3VuaXQ6ICdXaXphcmQnLCBjb2xvcjogJ2JsYWNrJywgc2lkZTogJ2Zyb250J30sXG4gICAgICAgIC8vICdbMiwgMF0nOiB7dW5pdDogJ0R1a2UnLCBjb2xvcjogJ2JsYWNrJywgc2lkZTogJ2Zyb250J30sXG4gICAgICAgIC8vICdbMiwgMV0nOiB7dW5pdDogJ1Bpa2VtYW4nLCBjb2xvcjogJ2JsYWNrJywgc2lkZTogJ2Zyb250J30sXG4gICAgICAgIC8vICdbMSwgM10nOiB7dW5pdDogJ0Fzc2Fzc2luJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAvLyAnWzIsIDRdJzoge3VuaXQ6ICdMb25nYm93bWFuJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdiYWNrJ30sXG4gICAgICAgIC8vICdbMywgNV0nOiB7dW5pdDogJ0Zvb3RtYW4nLCBjb2xvcjogJ3doaXRlJywgc2lkZTogJ2JhY2snfSxcbiAgICAgICAgLy8gJ1s0LCA1XSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnYmFjayd9LFxuICAgICAgICAvLyAnWzQsIDRdJzoge3VuaXQ6ICdSYW5nZXInLCBjb2xvcjogJ2JsYWNrJywgc2lkZTogJ2JhY2snfSxcbiAgICAgICAgLy8gJ1szLCA0XSc6IHt1bml0OiAnRHJhZ29vbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnZnJvbnQnfSxcbiAgICAgICAgLy8gJ1sxLCA1XSc6IHt1bml0OiAnRHVrZScsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnZnJvbnQnfVxuXG4gICAgICAgIFxuICAgICAgICAnWzEsIDBdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzIsIDBdJzoge3VuaXQ6ICdEdWtlJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzMsIDBdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzIsIDVdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzMsIDVdJzoge3VuaXQ6ICdEdWtlJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzQsIDVdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICBcbiAgICB9O1xuXG4gICAgX2RlY2sgPSBbLi4uT2JqZWN0LmtleXMob21pdChiZWhhdmlvciwgJ0R1a2UnKSksICdQaWtlbWFuJywgJ1Bpa2VtYW4nXTtcbn1cblxuZnVuY3Rpb24gbW92ZVRvQm9hcmQoKSB7XG5cblxuICAgIGlmIChlbWl0TW92ZSkge1xuICAgICAgICBHYW1lU3RvcmUuZW1pdChNT1ZFX0VWRU5ULCB7XG4gICAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgICBjYXB0dXJlOiBjYXB0dXJlLFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGJvYXJkOiBfYm9hcmRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUJvYXJkKGZyb20sIHRvLCB0eXBlKSB7XG5cbiAgICAvLyBpZiBjYWxsZWQgYnkgYSBtb3ZlIGV2ZW50LCB0aGUgZnJvbSBwYXJhbWV0ZXIgd2lsbCBiZSBhIHBvc2l0aW9uIG9uIHRoZSBib2FyZCAoaS5lLiBhIHN0cmluZylcbiAgICAvLyBpZiBjYWxsZWQgYnkgYSBkcmF3IGV2ZW50LCB0aGUgZnJvbSBwYXJhbWV0ZXIgd2lsbCBiZSBhbiBhY3R1YWwgdW5pdCAoaS5lLiBhbiBvYmplY3QpXG5cbiAgICBpZiAodHlwZW9mIGZyb20gPT09ICdvYmplY3QnKSB7ICAgICAgICAgLy8gZHJhdyBldmVudFxuICAgICAgICBfYm9hcmRbdG9dID0gZnJvbTtcbiAgICAgICAgX2Ryb3AgPSB7fTtcbiAgICAgICAgX3BlbmRpbmdEcmF3ID0gbnVsbDtcbiAgICB9XG5cbiAgICBlbHNlIGlmICh0eXBlb2YgZnJvbSA9PT0gJ3N0cmluZycpIHsgICAgLy8gbW92ZSBldmVudFxuXG4gICAgICAgIGxldCB1bml0ID0gX2JvYXJkW2Zyb21dO1xuXG4gICAgICAgIHVuaXQuc2lkZSA9ICh1bml0LnNpZGUgPT09ICdmcm9udCcpID8gJ2JhY2snIDogJ2Zyb250JztcblxuICAgICAgICBpZiAodHlwZSA9PT0gJ21vdmUnKSB7XG4gICAgICAgICAgX2JvYXJkW2Zyb21dID0gbnVsbDtcbiAgICAgICAgICBfYm9hcmRbdG9dID0gdW5pdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnc3RyaWtlJykge1xuICAgICAgICAgIF9ib2FyZFt0b10gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBfc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICByZXR1cm4gX2JvYXJkO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbWFrZU1vdmUoZnJvbSwgdG8sIGNhcHR1cmUsIHR5cGUsIGVtaXRNb3ZlKSB7XG4gICBcbiAgICB1cGRhdGVCb2FyZChmcm9tLCB0bywgdHlwZSk7XG5cbiAgICBfdHVybiA9IF90dXJuID09PSAndycgPyAnYicgOiAndyc7XG5cbiAgICBpZiAoZW1pdE1vdmUpIHtcbiAgICAgICAgR2FtZVN0b3JlLmVtaXQoTU9WRV9FVkVOVCwge1xuICAgICAgICAgICAgZnJvbTogZnJvbSxcbiAgICAgICAgICAgIHRvOiB0byxcbiAgICAgICAgICAgIGNhcHR1cmU6IGNhcHR1cmUsXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgLy8gYm9hcmQ6IF9ib2FyZCAgICBcbiAgICAgICAgICAgIGdhbWVPdmVyOiBpc0R1a2VEZWFkKClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cblxuXG5mdW5jdGlvbiBkcmF3KCkge1xuICAgIGxldCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpfZGVjay5sZW5ndGgpO1xuICAgIF9wZW5kaW5nRHJhdyA9IF9kZWNrLnNwbGljZShyYW5kb21JbmRleCwgMSlbMF07ICAgICAgIFxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc0R1a2VEZWFkKCkge1xuICAgIGxldCBkdWtlcyA9IE9iamVjdC5rZXlzKF9ib2FyZCkuZmlsdGVyKHBvcyA9PiBfYm9hcmRbcG9zXSAmJiBfYm9hcmRbcG9zXS51bml0ID09PSBcIkR1a2VcIilcbiAgICAgICAgLm1hcChwb3MgPT4gX2JvYXJkW3Bvc10uY29sb3IpO1xuICAgIGlmIChkdWtlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgIF9nYW1lT3ZlciA9IF9nYW1lT3Zlci5zZXQoJ3N0YXR1cycsIHRydWUpO1xuXG4gICAgICAgIGxldCB3aW5uZXIgPSBkdWtlc1swXTtcbiAgICAgICAgaWYgKHdpbm5lciA9ICd3aGl0ZScpIHdpbm5lciA9ICdXaGl0ZSc7XG4gICAgICAgIGVsc2UgaWYgKHdpbm5lciA9ICdibGFjaycpIHdpbm5lciA9ICdCbGFjayc7XG4gICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgdGl0bGU6IGBZb3Ugd2luIWAsXG4gICAgICAgICAgICB0ZXh0OiAnV291bGQgeW91IGxpa2UgdG8gcmVxdWVzdCBhIHJlbWF0Y2g/JyxcbiAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6IFwiIzAwRkZEMlwiLFxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IFwiWWVhaCEgOilcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTWVoXCIsXG4gICAgICAgICAgICBjbG9zZU9uQ29uZmlybTogZmFsc2UsXG4gICAgICAgICAgICBjbG9zZU9uQ2FuY2VsOiBmYWxzZVxuICAgICAgICB9LCBmdW5jdGlvbihpc0NvbmZpcm0pIHtcbiAgICAgICAgICAgIGlmIChpc0NvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICBzd2FsKFwiTmljZSFcIiwgXCJBIHJlbWF0Y2ggcmVxdWVzdCBoYXMgYmVlbiBzZW50IChub3QgcmVhbGx5IHRobykuXCIsIFwic3VjY2Vzc1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dhbChcIk9rYXlcIiwgXCJkb24ndCBmb3JnZXQgdG8gZG9uYXRlXCIsIFwic3VjY2Vzc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIEdhbWVTdG9yZS5lbWl0KCdzd2FsLWVuZGdhbWUnLCB7IHdpbm5lciB9KTtcbiAgICB9XG4gICAgXG5cblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuXG5mdW5jdGlvbiBnYW1lT3ZlcihvcHRpb25zKSB7XG4gICAgX2dhbWVPdmVyID0gX2dhbWVPdmVyXG4gICAgICAgIC5zZXQoJ3N0YXR1cycsIHRydWUpXG4gICAgICAgIC5zZXQoJ3dpbm5lcicsIG9wdGlvbnMud2lubmVyKVxuICAgICAgICAuc2V0KCd0eXBlJywgb3B0aW9ucy50eXBlKTtcbn1cblxuQXBwRGlzcGF0Y2hlci5yZWdpc3RlcihwYXlsb2FkID0+IHtcbiAgICBjb25zdCBhY3Rpb24gPSBwYXlsb2FkLmFjdGlvbjtcbiAgICBsZXQgZW1pdEV2ZW50ID0gdHJ1ZTtcblxuICAgIHN3aXRjaCAoYWN0aW9uLmFjdGlvblR5cGUpIHtcbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLk1BS0VfTU9WRTpcbiAgICAgICAgICAgIGVtaXRFdmVudCA9IG1ha2VNb3ZlKFxuICAgICAgICAgICAgICAgIGFjdGlvbi5mcm9tLCBhY3Rpb24udG8sIGFjdGlvbi5jYXB0dXJlLCBhY3Rpb24udHlwZSwgYWN0aW9uLmVtaXRNb3ZlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EUkFXOlxuICAgICAgICAgICAgZW1pdEV2ZW50ID0gZHJhdygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkdBTUVfT1ZFUjpcbiAgICAgICAgICAgIGdhbWVPdmVyKGFjdGlvbi5vcHRpb25zKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5SRU1BVENIOlxuICAgICAgICAgICAgc2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGVtaXRFdmVudCkge1xuICAgICAgICBHYW1lU3RvcmUuZW1pdChDSEFOR0VfRVZFTlQpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lU3RvcmU7XG4iXX0=
