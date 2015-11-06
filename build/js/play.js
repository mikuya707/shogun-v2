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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL3BsYXkuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvb3MtYnJvd3NlcmlmeS9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2tleU1pcnJvci5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvYWN0aW9ucy9DaGF0QWN0aW9ucy5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvYWN0aW9ucy9HYW1lQWN0aW9ucy5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DYXB0dXJlZFBpZWNlcy5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DaGF0LmpzIiwiQzovVXNlcnMvSmF5L0Rlc2t0b3AvSlMvc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0NoZXNzYm9hcmQuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2hlc3Nib2FyZEludGVyZmFjZS5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DbG9jay5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lQm9hcmQuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUhlYWRlci5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lSW50ZXJmYWNlLmpzIiwiQzovVXNlcnMvSmF5L0Rlc2t0b3AvSlMvc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0dhbWVib2FyZEludGVyZmFjZS5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9Nb2RhbC5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9UYWJsZU9mTW92ZXMuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2NvbnN0YW50cy9DaGF0Q29uc3RhbnRzLmpzIiwiQzovVXNlcnMvSmF5L0Rlc2t0b3AvSlMvc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hlc3NQaWVjZXMuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2NvbnN0YW50cy9HYW1lQ29uc3RhbnRzLmpzIiwiQzovVXNlcnMvSmF5L0Rlc2t0b3AvSlMvc2hvZ3VuLXYyL3NyYy9qcy9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXIuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2dhbWUvYmVoYXZpb3IuanMiLCJzcmMvanMvaW8uanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL21peGlucy9tYXliZVJldmVyc2UuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL21peGlucy9vbkdhbWVDaGFuZ2UuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL3N0b3Jlcy9DaGF0U3RvcmUuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL3N0b3Jlcy9HYW1lU3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7UUFFTixVQUFVOztJQUNWLEtBQUssMkJBQU0sT0FBTzs7SUFDbEIsRUFBRSwyQkFBTSxNQUFNOztJQUNkLGFBQWEsMkJBQU0sNEJBQTRCOztBQUV0RCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2RSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFcEMsS0FBSyxDQUFDLE1BQU0sQ0FDVixvQkFBQyxhQUFhLElBQUMsRUFBRSxFQUFFLEVBQUUsQUFBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEFBQUMsR0FBRyxFQUN6QyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUNyQyxDQUFDOzs7QUNkRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QVEsTUFBTSxDQUFDLFVBQVU7QUFDckIsYUFBSyxhQUFhLENBQUMsU0FBUztBQUN4QixxQkFBUyxHQUFHLFFBQVEsQ0FDaEIsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUUsa0JBQU07O0FBQUEsQUFFVixhQUFLLGFBQWEsQ0FBQyxJQUFJO0FBQ25CLHFCQUFTLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDbkIsa0JBQU07O0FBQUEsQUFFVixhQUFLLGFBQWEsQ0FBQyxTQUFTO0FBQ3hCLG9CQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLGtCQUFNOztBQUFBLEFBRVYsYUFBSyxhQUFhLENBQUMsT0FBTztBQUN0QiwyQkFBZSxFQUFFLENBQUM7QUFDbEIsa0JBQU07O0FBQUEsQUFFVjtBQUNJLG1CQUFPLElBQUksQ0FBQztBQUFBLEtBQ25COztBQUVELFFBQUksU0FBUyxFQUFFO0FBQ1gsaUJBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDaEM7QUFDRCxXQUFPLElBQUksQ0FBQztDQUNmLENBQUMsQ0FBQzs7aUJBRVksU0FBUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ2VzNi1zaGltJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGlvIGZyb20gJy4vaW8nO1xyXG5pbXBvcnQgR2FtZUludGVyZmFjZSBmcm9tICcuL2NvbXBvbmVudHMvR2FtZUludGVyZmFjZSc7XHJcblxyXG5sZXQgcGFyYW1zID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoJy9wbGF5LycsICcnKS5zcGxpdCgnLycpO1xyXG5wYXJhbXNbMV0gPSBwYXJzZUludChwYXJhbXNbMV0sIDEwKTtcclxucGFyYW1zWzJdID0gcGFyc2VJbnQocGFyYW1zWzJdLCAxMCk7XHJcblxyXG5SZWFjdC5yZW5kZXIoXHJcbiAgPEdhbWVJbnRlcmZhY2UgaW89e2lvfSBwYXJhbXM9e3BhcmFtc30gLz4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpXHJcbik7XHJcblxyXG4iLCJleHBvcnRzLmVuZGlhbm5lc3MgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnTEUnIH07XG5cbmV4cG9ydHMuaG9zdG5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhvc3RuYW1lXG4gICAgfVxuICAgIGVsc2UgcmV0dXJuICcnO1xufTtcblxuZXhwb3J0cy5sb2FkYXZnID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW10gfTtcblxuZXhwb3J0cy51cHRpbWUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAwIH07XG5cbmV4cG9ydHMuZnJlZW1lbSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcbn07XG5cbmV4cG9ydHMudG90YWxtZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE51bWJlci5NQVhfVkFMVUU7XG59O1xuXG5leHBvcnRzLmNwdXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXSB9O1xuXG5leHBvcnRzLnR5cGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnQnJvd3NlcicgfTtcblxuZXhwb3J0cy5yZWxlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmFwcFZlcnNpb247XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG5cbmV4cG9ydHMubmV0d29ya0ludGVyZmFjZXNcbj0gZXhwb3J0cy5nZXROZXR3b3JrSW50ZXJmYWNlc1xuPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7fSB9O1xuXG5leHBvcnRzLmFyY2ggPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnamF2YXNjcmlwdCcgfTtcblxuZXhwb3J0cy5wbGF0Zm9ybSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdicm93c2VyJyB9O1xuXG5leHBvcnRzLnRtcGRpciA9IGV4cG9ydHMudG1wRGlyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnL3RtcCc7XG59O1xuXG5leHBvcnRzLkVPTCA9ICdcXG4nO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuICAgIHZhciBjdXJyZW50UXVldWU7XG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHZhciBpID0gLTE7XG4gICAgICAgIHdoaWxlICgrK2kgPCBsZW4pIHtcbiAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtpXSgpO1xuICAgICAgICB9XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbn1cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgcXVldWUucHVzaChmdW4pO1xuICAgIGlmICghZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTUgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cblxuZnVuY3Rpb24gY2xhc3NOYW1lcygpIHtcblx0dmFyIGNsYXNzZXMgPSAnJztcblx0dmFyIGFyZztcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRpZiAoIWFyZykge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aWYgKCdzdHJpbmcnID09PSB0eXBlb2YgYXJnIHx8ICdudW1iZXInID09PSB0eXBlb2YgYXJnKSB7XG5cdFx0XHRjbGFzc2VzICs9ICcgJyArIGFyZztcblx0XHR9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG5cdFx0XHRjbGFzc2VzICs9ICcgJyArIGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKTtcblx0XHR9IGVsc2UgaWYgKCdvYmplY3QnID09PSB0eXBlb2YgYXJnKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdGlmICghYXJnLmhhc093blByb3BlcnR5KGtleSkgfHwgIWFyZ1trZXldKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2xhc3NlcyArPSAnICcgKyBrZXk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBjbGFzc2VzLnN1YnN0cigxKTtcbn1cblxuLy8gc2FmZWx5IGV4cG9ydCBjbGFzc05hbWVzIGZvciBub2RlIC8gYnJvd3NlcmlmeVxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcbn1cblxuLy8gc2FmZWx5IGV4cG9ydCBjbGFzc05hbWVzIGZvciBSZXF1aXJlSlNcbmlmICh0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0fSk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdJbnZhcmlhbnQgVmlvbGF0aW9uOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBrZXlNaXJyb3JcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZShcIi4vaW52YXJpYW50XCIpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYW4gZW51bWVyYXRpb24gd2l0aCBrZXlzIGVxdWFsIHRvIHRoZWlyIHZhbHVlLlxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqICAgdmFyIENPTE9SUyA9IGtleU1pcnJvcih7Ymx1ZTogbnVsbCwgcmVkOiBudWxsfSk7XG4gKiAgIHZhciBteUNvbG9yID0gQ09MT1JTLmJsdWU7XG4gKiAgIHZhciBpc0NvbG9yVmFsaWQgPSAhIUNPTE9SU1tteUNvbG9yXTtcbiAqXG4gKiBUaGUgbGFzdCBsaW5lIGNvdWxkIG5vdCBiZSBwZXJmb3JtZWQgaWYgdGhlIHZhbHVlcyBvZiB0aGUgZ2VuZXJhdGVkIGVudW0gd2VyZVxuICogbm90IGVxdWFsIHRvIHRoZWlyIGtleXMuXG4gKlxuICogICBJbnB1dDogIHtrZXkxOiB2YWwxLCBrZXkyOiB2YWwyfVxuICogICBPdXRwdXQ6IHtrZXkxOiBrZXkxLCBrZXkyOiBrZXkyfVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xudmFyIGtleU1pcnJvciA9IGZ1bmN0aW9uKG9iaikge1xuICB2YXIgcmV0ID0ge307XG4gIHZhciBrZXk7XG4gIChcInByb2R1Y3Rpb25cIiAhPT0gXCJkZXZlbG9wbWVudFwiID8gaW52YXJpYW50KFxuICAgIG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopLFxuICAgICdrZXlNaXJyb3IoLi4uKTogQXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QuJ1xuICApIDogaW52YXJpYW50KG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopKSk7XG4gIGZvciAoa2V5IGluIG9iaikge1xuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXRba2V5XSA9IGtleTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlNaXJyb3I7XG4iLCJpbXBvcnQgQ2hhdENvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvQ2hhdENvbnN0YW50cyc7XHJcbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XHJcblxyXG5jb25zdCBDaGF0QWN0aW9ucyA9IHtcclxuICB0b2dnbGVWaXNpYmlsaXR5KCkge1xyXG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgYWN0aW9uVHlwZTogQ2hhdENvbnN0YW50cy5UT0dHTEVfVklTSUJJTElUWVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBzdWJtaXRNZXNzYWdlKG1lc3NhZ2UsIGNsYXNzTmFtZSwgcmVjZWl2ZWQpIHtcclxuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XHJcbiAgICAgIGFjdGlvblR5cGU6IENoYXRDb25zdGFudHMuU1VCTUlUX01FU1NBR0UsXHJcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxyXG4gICAgICByZWNlaXZlZDogcmVjZWl2ZWRcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENoYXRBY3Rpb25zOyIsImltcG9ydCBHYW1lQ29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9HYW1lQ29uc3RhbnRzJztcclxuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcclxuXHJcbmNvbnN0IEdhbWVBY3Rpb25zID0ge1xyXG4gIG1ha2VNb3ZlKGZyb20sIHRvLCBjYXB0dXJlLCB0eXBlLCBlbWl0TW92ZSkge1xyXG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5NQUtFX01PVkUsXHJcbiAgICAgIGZyb206IGZyb20sXHJcbiAgICAgIHRvOiB0byxcclxuICAgICAgY2FwdHVyZTogY2FwdHVyZSxcclxuICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgZW1pdE1vdmU6IGVtaXRNb3ZlXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHNob3dNb3Zlcyh1bml0LCBmcm9tLCBpblJhbmdlKSB7XHJcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xyXG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLlNIT1dfTU9WRVMsXHJcbiAgICAgIHVuaXQ6IHVuaXQsXHJcbiAgICAgIGZyb206IGZyb20sXHJcbiAgICAgIGluUmFuZ2U6IGluUmFuZ2VcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZHJhdygpIHtcclxuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XHJcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuRFJBV1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICByZW1hdGNoKCkge1xyXG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5SRU1BVENIXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGdhbWVPdmVyKG9wdGlvbnMpIHtcclxuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XHJcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuR0FNRV9PVkVSLFxyXG4gICAgICBvcHRpb25zOiBvcHRpb25zXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGNoYW5nZVByb21vdGlvbihwcm9tb3Rpb24pIHtcclxuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XHJcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuQ0hBTkdFX1BST01PVElPTixcclxuICAgICAgcHJvbW90aW9uOiBwcm9tb3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVBY3Rpb25zOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xyXG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xyXG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xyXG5cclxuY29uc3QgQ2FwdHVyZWRQaWVjZXMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgXHJcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgb25HYW1lQ2hhbmdlXSxcclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2FwdHVyZWRQaWVjZXM6IEdhbWVTdG9yZS5nZXRDYXB0dXJlZFBpZWNlcygpXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgY3AgPSB0aGlzLnN0YXRlLmNhcHR1cmVkUGllY2VzO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgaWQ9XCJjYXB0dXJlZC1waWVjZXNcIj5cclxuICAgICAgICB7Y3AubWFwKChwaWVjZXMsIGNvbG9yKSA9PiAoXHJcbiAgICAgICAgICA8dWwga2V5PXtjb2xvcn0+XHJcbiAgICAgICAgICAgIHtwaWVjZXMubWFwKChwaWVjZSwgaSkgPT4gPGxpIGtleT17aX0+e3BpZWNlfTwvbGk+KS50b0FycmF5KCl9XHJcbiAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICkpLnRvQXJyYXkoKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH0sXHJcbiAgX29uR2FtZUNoYW5nZSgpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBjYXB0dXJlZFBpZWNlczogR2FtZVN0b3JlLmdldENhcHR1cmVkUGllY2VzKClcclxuICAgIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXB0dXJlZFBpZWNlczsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcclxuaW1wb3J0IENoYXRTdG9yZSBmcm9tICcuLi9zdG9yZXMvQ2hhdFN0b3JlJztcclxuaW1wb3J0IENoYXRBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvQ2hhdEFjdGlvbnMnO1xyXG5cclxuY29uc3QgQ2hhdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBcclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICB0b2tlbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXHJcbiAgICAvLyBzb3VuZHNFbmFibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgaXNPcHBvbmVudEF2YWlsYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIG9wZW5Nb2RhbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG4gIH0sXHJcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbl0sXHJcblxyXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gQ2hhdFN0b3JlLmdldFN0YXRlKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpc0NoYXRIaWRkZW46IHN0YXRlLmlzQ2hhdEhpZGRlbixcclxuICAgICAgbWVzc2FnZXM6IHN0YXRlLm1lc3NhZ2VzLFxyXG4gICAgICBtZXNzYWdlOiAnJyxcclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHRoaXMucHJvcHMuaW8ub24oJ3JlY2VpdmUtbWVzc2FnZScsIGRhdGEgPT4ge1xyXG4gICAgICBDaGF0QWN0aW9ucy5zdWJtaXRNZXNzYWdlKGRhdGEubWVzc2FnZSwgZGF0YS5jb2xvciArICcgbGVmdCcsIHRydWUpO1xyXG4gICAgICB0aGlzLl9tYXliZVBsYXlTb3VuZCgpO1xyXG4gICAgfSk7XHJcbiAgICBDaGF0U3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uQ2hhdFN0b3JlQ2hhbmdlKTtcclxuICAgIFxyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gMTM5OSkgQ2hhdEFjdGlvbnMudG9nZ2xlVmlzaWJpbGl0eSgpO1xyXG4gIH0sXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICBDaGF0U3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYXRTdG9yZUNoYW5nZSk7XHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGlkPVwiY2hhdC13cmFwcGVyXCJcclxuICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuc3RhdGUuaXNDaGF0SGlkZGVuID8gJ2hpZGRlbicgOiBudWxsfT5cclxuICAgICAgICBcclxuICAgICAgICA8aDQ+Q2hhdDwvaDQ+XHJcbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiY2xvc2VcIlxyXG4gICAgICAgICAgIG9uQ2xpY2s9e0NoYXRBY3Rpb25zLnRvZ2dsZVZpc2liaWxpdHl9PlxyXG4gICAgICAgICAgeFxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICBcclxuICAgICAgICA8YXVkaW8gcHJlbG9hZD1cImF1dG9cIiByZWY9XCJtc2dTbmRcIj5cclxuICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiL3NuZC9tZXNzYWdlLm1wM1wiIC8+XHJcbiAgICAgICAgPC9hdWRpbz5cclxuICAgICAgICBcclxuICAgICAgICA8dWwgaWQ9XCJjaGF0LWxpc3RcIiByZWY9XCJjaGF0XCI+XHJcbiAgICAgICAgICB7dGhpcy5zdGF0ZS5tZXNzYWdlcy5tYXAoKG1lc3NhZ2UsIGkpID0+IChcclxuICAgICAgICAgICAgPGxpIGtleT17aX0gY2xhc3NOYW1lPXttZXNzYWdlLmdldCgnY2xhc3NOYW1lJyl9PlxyXG4gICAgICAgICAgICAgIHttZXNzYWdlLmdldCgnbWVzc2FnZScpfVxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgKSkudG9BcnJheSgpfVxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPHNwYW4+V3JpdGUgeW91ciBtZXNzYWdlOjwvc3Bhbj5cclxuICAgICAgICBcclxuICAgICAgICA8Zm9ybSBpZD1cImNoYXQtZm9ybVwiXHJcbiAgICAgICAgICAgICAgb25TdWJtaXQ9e3RoaXMuX3N1Ym1pdE1lc3NhZ2V9PlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICByZWY9XCJtZXNzYWdlXCJcclxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuY29sb3J9XHJcbiAgICAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5tZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9vbkNoYW5nZU1lc3NhZ2V9IC8+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfSxcclxuICBfb25DaGF0U3RvcmVDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKENoYXRTdG9yZS5nZXRTdGF0ZSgpLCB0aGlzLl9zY3JvbGxDaGF0KTtcclxuICB9LFxyXG4gIF9vbkNoYW5nZU1lc3NhZ2UoZSkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZTogZS50YXJnZXQudmFsdWV9KTtcclxuICB9LFxyXG4gIF9zdWJtaXRNZXNzYWdlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHtpbywgdG9rZW4sIGNvbG9yLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5zdGF0ZS5tZXNzYWdlO1xyXG5cclxuICAgIGlmICghaXNPcHBvbmVudEF2YWlsYWJsZSkge1xyXG4gICAgICB0aGlzLnJlZnMubWVzc2FnZS5nZXRET01Ob2RlKCkuYmx1cigpO1xyXG4gICAgICB0aGlzLnByb3BzLm9wZW5Nb2RhbCgnaW5mbycsICdTb3JyeSwgeW91ciBvcHBvbmVudCBpcyBub3QgY29ubmVjdGVkLiAnICtcclxuICAgICAgICAnWW91IGNhbuKAmHQgc2VuZCBtZXNzYWdlcy4nKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIENoYXRBY3Rpb25zLnN1Ym1pdE1lc3NhZ2UobWVzc2FnZSwgY29sb3IgKyAnIHJpZ2h0JywgZmFsc2UpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZTogJyd9KTtcclxuXHJcbiAgICBpby5lbWl0KCdzZW5kLW1lc3NhZ2UnLCB7XHJcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgIGNvbG9yOiBjb2xvcixcclxuICAgICAgdG9rZW46IHRva2VuXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIF9zY3JvbGxDaGF0KCkge1xyXG4gICAgY29uc3QgY2hhdE5vZGUgPSB0aGlzLnJlZnMuY2hhdC5nZXRET01Ob2RlKCk7XHJcbiAgICBjaGF0Tm9kZS5zY3JvbGxUb3AgPSBjaGF0Tm9kZS5zY3JvbGxIZWlnaHQ7XHJcbiAgfSxcclxuICBfbWF5YmVQbGF5U291bmQoKSB7XHJcbiAgICAvLyBpZiAodGhpcy5wcm9wcy5zb3VuZHNFbmFibGVkKSB7XHJcbiAgICAvLyAgIHRoaXMucmVmcy5tc2dTbmQuZ2V0RE9NTm9kZSgpLnBsYXkoKTtcclxuICAgIC8vIH1cclxuICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hhdDsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcclxuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcclxuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xyXG5pbXBvcnQgQ2hlc3NQaWVjZXMgZnJvbSAnLi4vY29uc3RhbnRzL0NoZXNzUGllY2VzJztcclxuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcclxuaW1wb3J0IG1heWJlUmV2ZXJzZSBmcm9tICcuLi9taXhpbnMvbWF5YmVSZXZlcnNlJztcclxuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xyXG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XHJcbmltcG9ydCB7U2VxLCBSZXBlYXQsIExpc3QsIFNldH0gZnJvbSAnaW1tdXRhYmxlJztcclxuXHJcbmNvbnN0IEZJTEVTID0gU2VxLkluZGV4ZWQoJ2FiY2RlZmdoJyk7XHJcbmNvbnN0IFJBTktTID0gU2VxLkluZGV4ZWQoJzEyMzQ1Njc4Jyk7XHJcblxyXG5jb25zdCBDaGVzc2JvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIFxyXG4gIHByb3BUeXBlczoge1xyXG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIHRva2VuOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBtYXliZVBsYXlTb3VuZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxyXG4gICAgZ2FtZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXHJcbiAgfSxcclxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluLCBtYXliZVJldmVyc2VdLFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IEdhbWVTdG9yZS5nZXRDaGVzc2JvYXJkU3RhdGUoKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmZW46IHN0YXRlLmZlbixcclxuICAgICAgbW92ZUZyb206IG51bGwsXHJcbiAgICAgIGxhc3RNb3ZlOiBzdGF0ZS5sYXN0TW92ZSxcclxuICAgICAga2luZ0luQ2hlY2s6IGZhbHNlXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBjb25zdCB7aW8sIHRva2VufSA9IHRoaXMucHJvcHM7XHJcbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XHJcbiAgICBHYW1lU3RvcmUub24oJ25ldy1tb3ZlJywgdGhpcy5fb25OZXdNb3ZlKTtcclxuXHJcbiAgICBpby5vbignbW92ZScsIGRhdGEgPT4ge1xyXG4gICAgICBHYW1lQWN0aW9ucy5tYWtlTW92ZShkYXRhLmZyb20sIGRhdGEudG8sIGRhdGEuY2FwdHVyZSwgZmFsc2UpO1xyXG4gICAgICB0aGlzLnByb3BzLm1heWJlUGxheVNvdW5kKCk7XHJcblxyXG4gICAgICBpZiAoIWRhdGEuZ2FtZU92ZXIpIHtcclxuICAgICAgICB0aGlzLl9ydW5DbG9jaygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZG9jdW1lbnQuaGlkZGVuKSB7XHJcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RpdGxlJylbMF07XHJcbiAgICAgICAgdGl0bGUudGV4dCA9ICcqICcgKyB0aXRsZS50ZXh0O1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlvLm9uKCdyZW1hdGNoLWFjY2VwdGVkJywgKCkgPT4gdGhpcy5zZXRTdGF0ZSh7bW92ZUZyb206IG51bGx9KSk7XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIEdhbWVTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XHJcbiAgICBHYW1lU3RvcmUub24oJ25ldy1tb3ZlJywgdGhpcy5fb25OZXdNb3ZlKTtcclxuICB9LFxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtjb2xvciwgaXNPcHBvbmVudEF2YWlsYWJsZSwgZ2FtZU92ZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHtmZW4sIG1vdmVGcm9tLCBsYXN0TW92ZSwga2luZ0luQ2hlY2t9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGNvbnN0IGZlbkFycmF5ID0gZmVuLnNwbGl0KCcgJyk7XHJcbiAgICBjb25zdCBwbGFjZW1lbnQgPSBmZW5BcnJheVswXTtcclxuICAgIGNvbnN0IGlzSXRNeVR1cm4gPSBmZW5BcnJheVsxXSA9PT0gY29sb3IuY2hhckF0KDApO1xyXG4gICAgY29uc3Qgcm93cyA9IHRoaXMuX21heWJlUmV2ZXJzZShwbGFjZW1lbnQuc3BsaXQoJy8nKSk7XHJcbiAgICBjb25zdCByYW5rcyA9IHRoaXMuX21heWJlUmV2ZXJzZShSQU5LUywgJ3doaXRlJyk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImNoZXNzYm9hcmRcIj5cclxuICAgICAgICB7cm93cy5tYXAoKHBsYWNlbWVudCwgaSkgPT5cclxuICAgICAgICAgIDxSb3dcclxuICAgICAgICAgICAga2V5PXtpfVxyXG4gICAgICAgICAgICByYW5rPXtyYW5rcy5nZXQoaSl9XHJcbiAgICAgICAgICAgIHBsYWNlbWVudD17cGxhY2VtZW50fVxyXG4gICAgICAgICAgICBjb2xvcj17Y29sb3J9XHJcbiAgICAgICAgICAgIGlzTW92ZWFibGU9e2lzSXRNeVR1cm4gJiYgaXNPcHBvbmVudEF2YWlsYWJsZSAmJiAhZ2FtZU92ZXJ9XHJcbiAgICAgICAgICAgIG1vdmVGcm9tPXttb3ZlRnJvbX1cclxuICAgICAgICAgICAgbGFzdE1vdmU9e2xhc3RNb3ZlfVxyXG4gICAgICAgICAgICBzZXRNb3ZlRnJvbT17dGhpcy5fc2V0TW92ZUZyb219XHJcbiAgICAgICAgICAgIGtpbmdJbkNoZWNrPXtraW5nSW5DaGVja31cclxuICAgICAgICAgICAgdmFsaWRNb3Zlcz17R2FtZVN0b3JlLmdldFZhbGlkTW92ZXMobW92ZUZyb20pfSAvPil9XHJcbiAgICAgIDwvdGFibGU+XHJcbiAgICApO1xyXG4gIH0sXHJcbiAgX29uR2FtZUNoYW5nZShjYikge1xyXG4gICAgY29uc3Qgc3RhdGUgPSBHYW1lU3RvcmUuZ2V0Q2hlc3Nib2FyZFN0YXRlKCk7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgZmVuOiBzdGF0ZS5mZW4sXHJcbiAgICAgIGxhc3RNb3ZlOiBzdGF0ZS5sYXN0TW92ZSxcclxuICAgICAga2luZ0luQ2hlY2s6IHN0YXRlLmNoZWNrICYmIChzdGF0ZS5mZW4uc3BsaXQoJyAnKVsxXSA9PT0gJ3cnID8gJ0snIDogJ2snKVxyXG4gICAgfSwgY2IpO1xyXG4gIH0sXHJcbiAgX3NldE1vdmVGcm9tKHNxdWFyZSkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIG1vdmVGcm9tOiBzcXVhcmVcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgX29uTmV3TW92ZShtb3ZlKSB7XHJcbiAgICBjb25zdCB7aW8sIHRva2VufSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgaW8uZW1pdCgnbmV3LW1vdmUnLCB7XHJcbiAgICAgIHRva2VuOiB0b2tlbixcclxuICAgICAgbW92ZTogbW92ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0VGltZW91dCh0aGlzLnByb3BzLm1heWJlUGxheVNvdW5kLCAwKTtcclxuICB9LFxyXG4gIF9ydW5DbG9jaygpIHtcclxuICAgIGNvbnN0IHtpbywgdG9rZW4sIGNvbG9yfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xyXG4gICAgICB0b2tlbjogdG9rZW4sXHJcbiAgICAgIGNvbG9yOiBjb2xvclxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBfcmVtb3ZlQXN0ZXJpc2tGcm9tVGl0bGUoKSB7XHJcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGl0bGUnKVswXTtcclxuICAgIHRpdGxlLnRleHQgPSB0aXRsZS50ZXh0LnJlcGxhY2UoJyogJywgJycpO1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fcmVtb3ZlQXN0ZXJpc2tGcm9tVGl0bGUpO1xyXG4gIH1cclxufSk7XHJcblxyXG5jb25zdCBSb3cgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIHByb3BUeXBlczoge1xyXG4gICAgcmFuazogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnMScsJzInLCczJywnNCcsJzUnLCc2JywnNycsJzgnXSkuaXNSZXF1aXJlZCxcclxuICAgIHBsYWNlbWVudDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXHJcbiAgICBpc01vdmVhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgbW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBsYXN0TW92ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIHNldE1vdmVGcm9tOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAga2luZ0luQ2hlY2s6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbZmFsc2UsICdLJywgJ2snXSkuaXNSZXF1aXJlZCxcclxuICAgIHZhbGlkTW92ZXM6IFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKFNldCkuaXNSZXF1aXJlZFxyXG4gIH0sXHJcbiAgbWl4aW5zOiBbbWF5YmVSZXZlcnNlXSxcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge3JhbmssIHBsYWNlbWVudCwgY29sb3J9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGZpbGVzID0gdGhpcy5fbWF5YmVSZXZlcnNlKEZJTEVTKTtcclxuICAgIGNvbnN0IHBpZWNlcyA9IHRoaXMuX21heWJlUmV2ZXJzZShwbGFjZW1lbnQubGVuZ3RoIDwgOCA/XHJcbiAgICAgIFNlcShwbGFjZW1lbnQpLmZsYXRNYXAocGllY2UgPT4gKFxyXG4gICAgICAgIC9eXFxkJC8udGVzdChwaWVjZSkgPyBSZXBlYXQoJy0nLCBwYXJzZUludChwaWVjZSwgMTApKSA6IHBpZWNlXHJcbiAgICAgICkpLnRvQXJyYXkoKSA6XHJcblxyXG4gICAgICBwbGFjZW1lbnQuc3BsaXQoJycpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0cj5cclxuICAgICAgICB7cGllY2VzLm1hcCgocGllY2UsIGkpID0+XHJcbiAgICAgICAgICA8Q29sdW1uXHJcbiAgICAgICAgICAgIGtleT17aX1cclxuICAgICAgICAgICAgc3F1YXJlPXtmaWxlcy5nZXQoaSkgKyByYW5rfVxyXG4gICAgICAgICAgICBwaWVjZT17cGllY2V9XHJcbiAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsICdyYW5rJywgJ3BsYWNlbWVudCcpfSAvPil9XHJcbiAgICAgIDwvdHI+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5jb25zdCBDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIHByb3BUeXBlczoge1xyXG4gICAgc3F1YXJlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBwaWVjZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXHJcbiAgICBpc01vdmVhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgbW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBsYXN0TW92ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIHNldE1vdmVGcm9tOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAga2luZ0luQ2hlY2s6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbZmFsc2UsICdLJywgJ2snXSkuaXNSZXF1aXJlZCxcclxuICAgIHZhbGlkTW92ZXM6IFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKFNldCkuaXNSZXF1aXJlZFxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHttb3ZlRnJvbSwgbGFzdE1vdmUsIHNxdWFyZSwgY29sb3IsXHJcbiAgICAgICAgICAgaXNNb3ZlYWJsZSwga2luZ0luQ2hlY2ssIHZhbGlkTW92ZXN9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHBpZWNlID0gQ2hlc3NQaWVjZXNbdGhpcy5wcm9wcy5waWVjZV07XHJcbiAgICBjb25zdCByZ3ggPSBjb2xvciA9PT0gJ3doaXRlJyA/IC9eW0tRUkJOUF0kLyA6IC9eW2txcmJucF0kLztcclxuICAgIGNvbnN0IGlzRHJhZ2dhYmxlID0gcmd4LnRlc3QodGhpcy5wcm9wcy5waWVjZSk7XHJcbiAgICBjb25zdCBpc0Ryb3BwYWJsZSA9IG1vdmVGcm9tICYmIHZhbGlkTW92ZXMuaGFzKHNxdWFyZSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRkIGNsYXNzTmFtZT17Y3goe1xyXG4gICAgICAgICAgICBzZWxlY3RlZDogbW92ZUZyb20gPT09IHNxdWFyZSAmJiAhdmFsaWRNb3Zlcy5pc0VtcHR5KCksXHJcbiAgICAgICAgICAgIGZyb206IGxhc3RNb3ZlLmdldCgnZnJvbScpID09PSBzcXVhcmUsXHJcbiAgICAgICAgICAgIHRvOiBsYXN0TW92ZS5nZXQoJ3RvJykgPT09IHNxdWFyZSxcclxuICAgICAgICAgICAgZHJvcHBhYmxlOiBpc0Ryb3BwYWJsZVxyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgICBvbkNsaWNrPXshcGllY2UgPyB0aGlzLl9vbkNsaWNrU3F1YXJlIDogbnVsbH1cclxuICAgICAgICAgIG9uRHJhZ092ZXI9e2lzRHJvcHBhYmxlID8gdGhpcy5fb25EcmFnT3ZlciA6IG51bGx9XHJcbiAgICAgICAgICBvbkRyb3A9e2lzRHJvcHBhYmxlID8gdGhpcy5fb25Ecm9wIDogbnVsbH0+XHJcblxyXG4gICAgICAgIHtwaWVjZSA/XHJcbiAgICAgICAgICA8YSBjbGFzc05hbWU9e2tpbmdJbkNoZWNrID09PSB0aGlzLnByb3BzLnBpZWNlID8gJ2luLWNoZWNrJyA6IG51bGx9XHJcbiAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9vbkNsaWNrU3F1YXJlfVxyXG4gICAgICAgICAgICAgb25EcmFnU3RhcnQ9e3RoaXMuX29uRHJhZ1N0YXJ0fVxyXG4gICAgICAgICAgICAgZHJhZ2dhYmxlPXtpc0RyYWdnYWJsZSAmJiBpc01vdmVhYmxlfT5cclxuICAgICAgICAgICAge3BpZWNlfVxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgIDpudWxsfVxyXG4gICAgICA8L3RkPlxyXG4gICAgKTtcclxuICB9LFxyXG4gIF9vbkNsaWNrU3F1YXJlKCkge1xyXG4gICAgY29uc3Qge2lzTW92ZWFibGUsIGNvbG9yLCBtb3ZlRnJvbSwgc3F1YXJlLCBwaWVjZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3Qgcmd4ID0gY29sb3IgPT09ICd3aGl0ZScgPyAvXltLUVJCTlBdJC8gOiAvXltrcXJibnBdJC87XHJcblxyXG4gICAgaWYgKCFpc01vdmVhYmxlIHx8ICghbW92ZUZyb20gJiYgIXJneC50ZXN0KHBpZWNlKSkpXHJcbiAgICAgIHJldHVybjtcclxuICAgIGVsc2UgaWYgKG1vdmVGcm9tICYmIG1vdmVGcm9tID09PSBzcXVhcmUpXHJcbiAgICAgIHRoaXMucHJvcHMuc2V0TW92ZUZyb20obnVsbCk7XHJcbiAgICBlbHNlIGlmIChyZ3gudGVzdChwaWVjZSkpXHJcbiAgICAgIHRoaXMucHJvcHMuc2V0TW92ZUZyb20oc3F1YXJlKTtcclxuICAgIGVsc2VcclxuICAgICAgR2FtZUFjdGlvbnMubWFrZU1vdmUobW92ZUZyb20sIHNxdWFyZSwgQ2hlc3NQaWVjZXNbcGllY2VdLCB0cnVlKTtcclxuICB9LFxyXG4gIF9vbkRyYWdTdGFydChlKSB7XHJcbiAgICBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xyXG4gICAgLy8gc2V0RGF0YSBpcyByZXF1aXJlZCBieSBmaXJlZm94XHJcbiAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgJycpO1xyXG5cclxuICAgIHRoaXMucHJvcHMuc2V0TW92ZUZyb20odGhpcy5wcm9wcy5zcXVhcmUpO1xyXG4gIH0sXHJcbiAgX29uRHJhZ092ZXIoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcclxuICB9LFxyXG4gIF9vbkRyb3AoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3Qge21vdmVGcm9tLCBzcXVhcmUsIHBpZWNlfSA9IHRoaXMucHJvcHM7XHJcbiAgICBHYW1lQWN0aW9ucy5tYWtlTW92ZShtb3ZlRnJvbSwgc3F1YXJlLCBDaGVzc1BpZWNlc1twaWVjZV0sIHRydWUpO1xyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGVzc2JvYXJkOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xyXG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xyXG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XHJcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XHJcbmltcG9ydCBDaGVzc2JvYXJkIGZyb20gJy4vQ2hlc3Nib2FyZCc7XHJcbmltcG9ydCBDYXB0dXJlZFBpZWNlcyBmcm9tICcuL0NhcHR1cmVkUGllY2VzJztcclxuaW1wb3J0IFRhYmxlT2ZNb3ZlcyBmcm9tICcuL1RhYmxlT2ZNb3Zlcyc7XHJcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcclxuXHJcbmNvbnN0IENoZXNzYm9hcmRJbnRlcmZhY2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgdG9rZW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIHNvdW5kc0VuYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcclxuICAgIGdhbWVPdmVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXHJcbiAgfSxcclxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluLCBvbkdhbWVDaGFuZ2VdLFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICByZXR1cm4gR2FtZVN0b3JlLmdldFN0YXRlKCk7XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpICYmXHJcbiAgICAgICAgIXByZXZQcm9wcy5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpKSB7XHJcbiAgICAgIHRoaXMucHJvcHMub3Blbk1vZGFsKCdpbmZvJywgdGhpcy5fZ2V0R2FtZU92ZXJNZXNzYWdlKCkpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge3Byb21vdGlvbiwgdHVybiwgZ2FtZU92ZXIsIGNoZWNrfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBpZD1cImJvYXJkLW1vdmVzLXdyYXBwZXJcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxyXG4gICAgICAgIFxyXG4gICAgICAgIDxhdWRpbyBwcmVsb2FkPVwiYXV0b1wiIHJlZj1cIm1vdmVTbmRcIj5cclxuICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiL3NuZC9tb3ZlLm1wM1wiIC8+XHJcbiAgICAgICAgPC9hdWRpbz5cclxuICAgICAgICA8YXVkaW8gcHJlbG9hZD1cImF1dG9cIiByZWY9XCJjaGVja1NuZFwiPlxyXG4gICAgICAgICAgPHNvdXJjZSBzcmM9XCIvc25kL2NoZWNrLm1wM1wiIC8+XHJcbiAgICAgICAgPC9hdWRpbz5cclxuXHJcbiAgICAgICAgPGRpdiBpZD1cImJvYXJkLXdyYXBwZXJcIj5cclxuICAgICAgICAgIDxDYXB0dXJlZFBpZWNlcyAvPlxyXG4gICAgICAgICAgPENoZXNzYm9hcmRcclxuICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgJ3NvdW5kc0VuYWJsZWQnLCAnZ2FtZU92ZXInKX1cclxuICAgICAgICAgICAgZ2FtZU92ZXI9e2dhbWVPdmVyLmdldCgnc3RhdHVzJyl9XHJcbiAgICAgICAgICAgIG1heWJlUGxheVNvdW5kPXt0aGlzLl9tYXliZVBsYXlTb3VuZH0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPFRhYmxlT2ZNb3ZlcyAvPlxyXG5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwcm9tb3Rpb25cIj5cclxuICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgPHNwYW4+UHJvbW90aW9uOiA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzZWxlY3QgdmFsdWU9e3Byb21vdGlvbn1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5fb25Qcm9tb3Rpb25DaGFuZ2V9PlxyXG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJxXCI+UXVlZW48L29wdGlvbj5cclxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiclwiPlJvb2s8L29wdGlvbj5cclxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYlwiPkJpc2hvcDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJuXCI+S25pZ2h0PC9vcHRpb24+XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICA8L3NwYW4+XHJcblxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZlZWRiYWNrXCI+XHJcbiAgICAgICAgICB7IWdhbWVPdmVyLmdldCgnc3RhdHVzJykgPyBcclxuICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgey8qIEYgLT4gd2hpdGUga2luZywgZiAtPiBibGFjayBraW5nKi9cclxuICAgICAgICAgICAgICAgICAgdHVybiA9PT0gJ3cnID8gJ0YnIDogJ2YnfVxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICB7YCR7dHVybiA9PT0gJ3cnID8gJ1doaXRlJyA6ICdCbGFjayd9IHRvIG1vdmUuYH1cclxuICAgICAgICAgICAgICB7Y2hlY2sgPyA8c3Ryb25nPiBDaGVjay48L3N0cm9uZz4gOiBudWxsfVxyXG4gICAgICAgICAgICA8L3NwYW4+IDpcclxuXHJcbiAgICAgICAgICAgIDxzdHJvbmc+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvblwiPlxyXG4gICAgICAgICAgICAgICAge2dhbWVPdmVyLmdldCgnd2lubmVyJykgPT09ICdXaGl0ZScgPyAnRicgOiAnZid9XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgIHt0aGlzLl9nZXRHYW1lT3Zlck1lc3NhZ2UoKX1cclxuICAgICAgICAgICAgPC9zdHJvbmc+XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfSxcclxuICBfb25HYW1lQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZShHYW1lU3RvcmUuZ2V0U3RhdGUoKSk7XHJcbiAgfSxcclxuICBfb25Qcm9tb3Rpb25DaGFuZ2UoZSkge1xyXG4gICAgR2FtZUFjdGlvbnMuY2hhbmdlUHJvbW90aW9uKGUudGFyZ2V0LnZhbHVlKTtcclxuICB9LFxyXG4gIF9tYXliZVBsYXlTb3VuZCgpIHtcclxuICAgIGlmICh0aGlzLnByb3BzLnNvdW5kc0VuYWJsZWQpIHtcclxuICAgICAgdGhpcy5yZWZzW3RoaXMuc3RhdGUuY2hlY2sgPyAnY2hlY2tTbmQnIDogJ21vdmVTbmQnXS5nZXRET01Ob2RlKCkucGxheSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2dldEdhbWVPdmVyTWVzc2FnZSgpIHtcclxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnByb3BzLmdhbWVPdmVyLmdldCgndHlwZScpO1xyXG4gICAgY29uc3Qgd2lubmVyID0gdGhpcy5wcm9wcy5nYW1lT3Zlci5nZXQoJ3dpbm5lcicpO1xyXG4gICAgY29uc3QgbG9zZXIgPSB3aW5uZXIgPT09ICdXaGl0ZScgPyAnQmxhY2snIDogJ1doaXRlJztcclxuXHJcbiAgICByZXR1cm4gdHlwZSA9PT0gJ2NoZWNrbWF0ZScgPyBgQ2hlY2ttYXRlLiAke3dpbm5lcn0gd2lucyFgIDpcclxuICAgICAgdHlwZSA9PT0gJ3RpbWVvdXQnID8gYCR7bG9zZXJ94oCYcyB0aW1lIGlzIG91dC4gJHt3aW5uZXJ9IHdpbnMhYCA6XHJcbiAgICAgIHR5cGUgPT09ICdyZXNpZ24nID8gYCR7bG9zZXJ9IGhhcyByZXNpZ25lZC4gJHt3aW5uZXJ9IHdpbnMhYCA6XHJcbiAgICAgIHR5cGUgPT09ICdkcmF3JyA/ICdEcmF3LicgOlxyXG4gICAgICB0eXBlID09PSAnc3RhbGVtYXRlJyA/ICdEcmF3IChTdGFsZW1hdGUpLicgOlxyXG4gICAgICB0eXBlID09PSAndGhyZWVmb2xkUmVwZXRpdGlvbicgPyAnRHJhdyAoVGhyZWVmb2xkIFJlcGV0aXRpb24pLicgOlxyXG4gICAgICB0eXBlID09PSAnaW5zdWZmaWNpZW50TWF0ZXJpYWwnID8gJ0RyYXcgKEluc3VmZmljaWVudCBNYXRlcmlhbCknIDogJyc7XHJcbiAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENoZXNzYm9hcmRJbnRlcmZhY2U7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XHJcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcclxuXHJcbmNvbnN0IFB1cmVSZW5kZXJNaXhpbiA9IFJlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW47XHJcblxyXG5jb25zdCBDbG9jayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBcclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBwYXJhbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXHJcbiAgfSxcclxuICBtaXhpbnM6IFtQdXJlUmVuZGVyTWl4aW5dLFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICBjb25zdCBbXywgdGltZSwgaW5jXSA9IHRoaXMucHJvcHMucGFyYW1zO1xyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB3aGl0ZTogdGltZSAqIDYwLFxyXG4gICAgICBibGFjazogdGltZSAqIDYwLFxyXG4gICAgICBpbmM6IGluYyxcclxuICAgICAgY291bnRkb3duOiBudWxsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBjb25zdCBpbyA9IHRoaXMucHJvcHMuaW87XHJcblxyXG4gICAgaW8ub24oJ2NvdW50ZG93bicsIGRhdGEgPT4gdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIFtkYXRhLmNvbG9yXTogZGF0YS50aW1lLFxyXG4gICAgICBjb3VudGRvd246IGRhdGEuY29sb3JcclxuICAgIH0pKTtcclxuXHJcbiAgICBpby5vbignY291bnRkb3duLWdhbWVvdmVyJywgZGF0YSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2NvdW50ZG93bjogbnVsbH0pO1xyXG4gICAgICBHYW1lQWN0aW9ucy5nYW1lT3Zlcih7XHJcbiAgICAgICAgdHlwZTogJ3RpbWVvdXQnLFxyXG4gICAgICAgIHdpbm5lcjogZGF0YS5jb2xvciA9PT0gJ2JsYWNrJyA/ICdXaGl0ZScgOiAnQmxhY2snXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW8ub24oJ3JlbWF0Y2gtYWNjZXB0ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIHdoaXRlOiB0aGlzLnByb3BzLnBhcmFtc1sxXSAqIDYwLFxyXG4gICAgICAgIGJsYWNrOiB0aGlzLnByb3BzLnBhcmFtc1sxXSAqIDYwXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dWwgaWQ9XCJjbG9ja1wiPlxyXG4gICAgICAgIDxUaW1lclxyXG4gICAgICAgICAgY29sb3I9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICB0aW1lPXt0aGlzLnN0YXRlLndoaXRlfVxyXG4gICAgICAgICAgY291bnRkb3duPXt0aGlzLnN0YXRlLmNvdW50ZG93bn0gLz5cclxuICAgICAgICA8VGltZXJcclxuICAgICAgICAgIGNvbG9yPVwiYmxhY2tcIlxyXG4gICAgICAgICAgdGltZT17dGhpcy5zdGF0ZS5ibGFja31cclxuICAgICAgICAgIGNvdW50ZG93bj17dGhpcy5zdGF0ZS5jb3VudGRvd259IC8+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5jb25zdCBUaW1lciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgbWl4aW5zOiBbUHVyZVJlbmRlck1peGluXSxcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge3RpbWUsIGNvbG9yLCBjb3VudGRvd259ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IG1pbiA9IE1hdGguZmxvb3IodGltZSAvIDYwKTtcclxuICAgIGNvbnN0IHNlYyA9IHRpbWUgJSA2MDtcclxuICAgIGNvbnN0IHRpbWVMZWZ0ID0gYCR7bWlufToke3NlYyA8IDEwID8gJzAnICsgc2VjIDogc2VjfWA7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGxpIGNsYXNzTmFtZT17Y29sb3IgKyAoY29sb3IgPT09IGNvdW50ZG93biA/ICcgdGlja2luZycgOiAnJyl9PlxyXG4gICAgICAgIHt0aW1lTGVmdH1cclxuICAgICAgPC9saT5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENsb2NrOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xyXG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xyXG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XHJcbi8vaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcclxuaW1wb3J0IG1heWJlUmV2ZXJzZSBmcm9tICcuLi9taXhpbnMvbWF5YmVSZXZlcnNlJztcclxuaW1wb3J0IGJlaGF2aW9yIGZyb20gJy4uL2dhbWUvYmVoYXZpb3InO1xyXG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XHJcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcblxyXG5cclxuXHJcbmNvbnN0IEdhbWVCb2FyZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHJcblx0fSxcclxuXHRtaXhpbnM6IFttYXliZVJldmVyc2VdLFxyXG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcclxuXHRcdHRoaXMuc3RhdGUgPSBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKTtcclxuXHRcdHJldHVybiB0aGlzLnN0YXRlO1xyXG5cdH0sXHJcblxyXG5cdF9vbkJ1dHRvbkNsaWNrKCl7XHJcblx0XHRjb25zdCB7Y29sb3J9ID0gdGhpcy5wcm9wcyxcclxuXHRcdFx0e3R1cm4sIGRlY2t9ID0gdGhpcy5zdGF0ZTtcclxuXHJcblx0XHRpZiAodHVybiAhPT0gY29sb3IuY2hhckF0KDApIHx8IHRoaXMuc3RhdGUucGVuZGluZ0RyYXcpIHJldHVybjtcclxuXHJcblx0XHRsZXQge2JvYXJkfSA9IHRoaXMuc3RhdGU7XHJcblx0XHRpZiAoY29sb3IgPT09ICdibGFjaycpIGJvYXJkID0gdGhpcy5fcmV2ZXJzZUJvYXJkKGJvYXJkKTtcclxuXHRcdHZhciBkdWtlUG9zaXRpb24gPSBPYmplY3Qua2V5cyhib2FyZCkuZmluZChwb3MgPT4gKGJvYXJkW3Bvc10gJiYgYm9hcmRbcG9zXS51bml0ID09PSBcIkR1a2VcIiAmJiBib2FyZFtwb3NdLmNvbG9yID09PSBjb2xvcikpO1xyXG5cdFx0dmFyIGR1a2VQb3NBcnIgPSBKU09OLnBhcnNlKGR1a2VQb3NpdGlvbik7XHJcblxyXG5cdFx0dmFyIGRyb3BwYWJsZVRpbGVzID0ge307XHJcblx0XHRbWzAsMV0sIFswLC0xXSwgWzEsMF0sIFstMSwwXV0uZm9yRWFjaChhZGogPT4ge1xyXG5cdFx0XHR2YXIgYWRqWCA9IGR1a2VQb3NBcnJbMF0rYWRqWzBdLCBhZGpZID0gZHVrZVBvc0FyclsxXSthZGpbMV07XHJcblx0XHRcdGlmICh0aGlzLl9pc09uQm9hcmQoe3g6IGFkalgsIHk6IGFkall9KSAmJiAhYm9hcmRbYFske2Fkalh9LCAke2Fkall9XWBdKSBcclxuXHRcdFx0XHRkcm9wcGFibGVUaWxlc1tgWyR7YWRqWH0sICR7YWRqWX1dYF0gPSB0cnVlO1xyXG5cdFx0fSlcclxuXHJcblx0XHRpZiAoIU9iamVjdC5rZXlzKGRyb3BwYWJsZVRpbGVzKS5sZW5ndGgpIHtcclxuXHRcdFx0c3dhbChcIkNhbid0IGxldCB5b3UgZHJhdyB0aGF0XCIsICdObyBhdmFpbGFibGUgdGlsZXMgYWRqYWNlbnQgdG8gdGhlIER1a2UhJywgJ2Vycm9yJyk7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHRpZiAoZGVjay5sZW5ndGgpIHtcclxuXHRcdFx0XHRHYW1lQWN0aW9ucy5kcmF3KCk7XHJcblx0XHRcdFx0bGV0IHRoZURyYXduVW5pdCA9IEdhbWVTdG9yZS5nZXRHYW1lYm9hcmRTdGF0ZSgpLnBlbmRpbmdEcmF3O1xyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0ZHJvcDogZHJvcHBhYmxlVGlsZXMsXHJcblx0XHRcdFx0XHRwZW5kaW5nRHJhdzoge1xyXG5cdFx0XHRcdFx0XHR1bml0OiB0aGVEcmF3blVuaXQsXHJcblx0XHRcdFx0XHRcdGNvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxyXG5cdFx0XHRcdFx0XHRzaWRlOiAnZnJvbnQnXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHRcdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgXHJcblx0XHRcdFx0c3dhbChcIkNhbid0IGxldCB5b3UgZHJhdyB0aGF0XCIsICdObyB1bml0cyBsZWZ0IHRvIGRyYXchJywgJ2Vycm9yJyk7XHJcblx0XHR9XHRcdFxyXG5cdH0sXHJcblxyXG5cdF9vbkRyYXdDZWxsQ2xpY2soKXtcclxuXHRcdHZhciBuZXdEcmF3bjtcclxuXHRcdGxldCBkcmF3blVuaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyYXduVW5pdFwiKTtcclxuXHRcdGxldCBjbGFzc2VzID0gZHJhd25Vbml0LmNsYXNzTmFtZTtcclxuXHJcblx0XHRpZiAoY2xhc3Nlcy5pbmNsdWRlcygnZnJvbnQnKSkge1xyXG5cdFx0XHRkcmF3blVuaXQuY2xhc3NMaXN0LnJlbW92ZSgnZnJvbnQnKTtcclxuXHRcdFx0ZHJhd25Vbml0LmNsYXNzTGlzdC5hZGQoJ2JhY2snKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRkcmF3blVuaXQuY2xhc3NMaXN0LnJlbW92ZSgnYmFjaycpO1xyXG5cdFx0XHRkcmF3blVuaXQuY2xhc3NMaXN0LmFkZCgnZnJvbnQnKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcclxuXHJcblx0XHRjb25zdCB7aW8sIHRva2VuLCBnYW1lb3Zlcn0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdEdhbWVTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcclxuXHRcdEdhbWVTdG9yZS5vbignbmV3LW1vdmUnLCB0aGlzLl9vbk5ld01vdmUpO1xyXG5cdFx0R2FtZVN0b3JlLm9uKCdzd2FsLWVuZGdhbWUnLCB0aGlzLl9vbkdhbWVPdmVyKTtcclxuXHJcblx0XHRpby5vbignbW92ZScsIGRhdGEgPT4ge1xyXG5cdFx0XHRHYW1lQWN0aW9ucy5tYWtlTW92ZShkYXRhLmZyb20sIGRhdGEudG8sIGRhdGEuY2FwdHVyZSwgZGF0YS50eXBlLCBmYWxzZSk7XHJcblxyXG5cdFx0XHRpZiAoIWRhdGEuZ2FtZU92ZXIpIHtcclxuXHRcdFx0ICB0aGlzLl9ydW5DbG9jaygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZG9jdW1lbnQuaGlkZGVuKSB7XHJcblx0XHRcdCAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RpdGxlJylbMF07XHJcblx0XHRcdCAgdGl0bGUudGV4dCA9ICcqICcgKyB0aXRsZS50ZXh0O1xyXG5cclxuXHRcdFx0ICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIGlvLm9uKCdzd2FsLWdhbWVvdmVyJywgZGF0YSA9PiB7XHJcblx0XHQvLyBcdGxldCB3aW5uZXIgPSBkYXRhLndpbm5lcjtcclxuXHRcdC8vIFx0c3dhbCh7XHJcblx0XHQvLyBcdFx0dGl0bGU6ICdZb3UgbG9zZSEnLFxyXG5cdFx0Ly8gXHRcdHRleHQ6ICdCZXR0ZXIgbHVjayBuZXh0IHRpbWUhJyxcclxuXHRcdC8vIFx0XHQvL2ltYWdlVXJsOiAnaHR0cDovL3ZpZ25ldHRlMi53aWtpYS5ub2Nvb2tpZS5uZXQvZGlja2ZpZ3VyZXMvaW1hZ2VzL2QvZDAvVHJvbGwtRmFjZS1EYW5jaW5nMS5qcGcvcmV2aXNpb24vbGF0ZXN0P2NiPTIwMTIxMTEyMTUwNTQzJ1xyXG5cdFx0Ly8gXHRcdGltYWdlVXJsOiAnaHR0cHM6Ly9pYW1waWVycmVtZW5hcmQuZmlsZXMud29yZHByZXNzLmNvbS8yMDE0LzAyL3NhZC1kb2cuanBnJ1xyXG5cdFx0Ly8gXHR9KTtcclxuXHRcdC8vIH0pXHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcblx0XHRHYW1lU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5fb25DaGFuZ2UpO1xyXG5cdH0sXHJcblxyXG5cdF9yZXZlcnNlUG9zaXRpb24ocG9zKSB7XHJcblx0XHRjb25zdCB7c2l6ZX0gPSB0aGlzLnByb3BzO1xyXG5cdFx0bGV0IHBvc0FyciA9IEpTT04ucGFyc2UocG9zKTtcclxuXHRcdHJldHVybiBgWyR7c2l6ZS0xLXBvc0FyclswXX0sICR7c2l6ZS0xLXBvc0FyclsxXX1dYDtcclxuXHR9LFxyXG5cclxuXHRfcmV2ZXJzZUJvYXJkKCkge1xyXG5cdFx0Y29uc3Qge2JvYXJkfSA9IHRoaXMuc3RhdGU7XHJcblx0XHRsZXQgbmV3Qm9hcmQgPSB7fTtcclxuXHRcdE9iamVjdC5rZXlzKGJvYXJkKS5mb3JFYWNoKHBvcyA9PiB7XHJcblx0XHRcdG5ld0JvYXJkW3RoaXMuX3JldmVyc2VQb3NpdGlvbihwb3MpXSA9IGJvYXJkW3Bvc107XHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIG5ld0JvYXJkO1xyXG5cdH0sXHJcblxyXG5cdF9vbkdhbWVDaGFuZ2UoY2IpIHtcclxuXHRcdGNvbnN0IHN0YXRlID0gR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0Ym9hcmQ6IHN0YXRlLmJvYXJkLFxyXG5cdFx0XHRsaWdodHVwOiBzdGF0ZS5saWdodHVwLFxyXG5cdFx0XHRzdHJpa2U6IHN0YXRlLnN0cmlrZSxcclxuXHRcdFx0ZHJvcDogc3RhdGUuZHJvcCxcclxuXHRcdFx0c2VsZWN0ZWQ6IHN0YXRlLnNlbGVjdGVkLFxyXG5cdFx0XHRkcmF3VW5pdDogc3RhdGUuZHJhd1VuaXQsXHJcblx0XHRcdHR1cm46IHN0YXRlLnR1cm4sXHJcblx0XHRcdHBlbmRpbmdEcmF3OiBzdGF0ZS5wZW5kaW5nRHJhd1xyXG5cdFx0fSwgY2IpO1xyXG5cdH0sXHJcblxyXG5cdF9vbk5ld01vdmUobW92ZSkge1xyXG5cdFx0Y29uc3Qge2lvLCB0b2tlbiwgY29sb3J9ID0gdGhpcy5wcm9wcztcclxuXHRcdGlvLmVtaXQoJ25ldy1tb3ZlJywgeyB0b2tlbiwgbW92ZSwgY29sb3IgfSk7XHJcblx0fSxcclxuXHJcblx0X29uR2FtZU92ZXIoe3dpbm5lcn0pIHtcclxuXHRcdGNvbnN0IHtpbywgdG9rZW59ID0gdGhpcy5wcm9wcztcclxuXHRcdHZhciB7Z2FtZW92ZXJ9ID0gdGhpcy5wcm9wcztcclxuXHRcdGlvLmVtaXQoJ3N3YWwtZW5kZ2FtZScsIHsgdG9rZW4sIHdpbm5lciB9KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXIoKSB7XHJcblx0XHRsZXQge3N0YXRlLCBwcm9wc30gPSB0aGlzLCBcclxuXHRcdFx0e3NpemUsIGNvbG9yLCBnYW1lb3Zlcn0gPSBwcm9wcyxcclxuXHRcdFx0e2JvYXJkLCBzZWxlY3RlZCwgbGlnaHR1cCwgc3RyaWtlLCBkcm9wLCB0dXJuLCBkcmF3biwgcGVuZGluZ0RyYXd9ID0gc3RhdGU7XHJcblxyXG5cdFx0aWYgKGNvbG9yID09PSAnYmxhY2snKSBib2FyZCA9IHRoaXMuX3JldmVyc2VCb2FyZCgpO1xyXG5cclxuXHRcdGxldCBjZWxsQXJyYXkgPSBbXTtcclxuXHRcdGZvciAobGV0IGk9MDsgaTxzaXplOyBpKyspIHtcclxuXHRcdFx0bGV0IHJvdyA9IFtdO1xyXG5cdFx0XHRmb3IgKGxldCBqPTA7IGo8c2l6ZTsgaisrKSB7XHJcblx0XHRcdFx0cm93LnB1c2goe3g6aiwgeTppfSlcclxuXHRcdFx0fVxyXG5cdFx0XHRjZWxsQXJyYXkucHVzaChyb3cpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PHRhYmxlIGNsYXNzTmFtZT1cImJvYXJkXCI+XHJcblx0XHRcdFx0e2NlbGxBcnJheS5tYXAoKHJvdywgaWR4MSkgPT4gXHJcblx0XHRcdFx0XHQ8dHI+XHJcblx0XHRcdFx0XHRcdHtyb3cubWFwKChjZWxsLCBpZHgyKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgY29vcmRzID0gYFske2lkeDJ9LCAke2lkeDF9XWA7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8dGQgcG9zaXRpb249e2Nvb3Jkc30+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PENlbGwgcmVmPXtjb29yZHN9XHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCBwb3NpdGlvbj17Y29vcmRzfSBcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVuaXQ9e2JvYXJkW2Nvb3Jkc10gPyBib2FyZFtjb29yZHNdLnVuaXQgOiBudWxsfSBcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbG9yPXtib2FyZFtjb29yZHNdID8gYm9hcmRbY29vcmRzXS5jb2xvciA6IG51bGx9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwbGF5ZXJDb2xvcj17Y29sb3J9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzaWRlPXtib2FyZFtjb29yZHNdID8gYm9hcmRbY29vcmRzXS5zaWRlIDogbnVsbH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxpdHVwPXtsaWdodHVwW2Nvb3Jkc119XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHJpa2FibGU9e3N0cmlrZVtjb29yZHNdfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FuRHJvcD17ZHJvcFtjb29yZHNdfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQ9e3NlbGVjdGVkfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHVybj17dHVybn1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBlbmRpbmdEcmF3PXtwZW5kaW5nRHJhd31cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldFNlbGVjdGVkPXt0aGlzLl9zZXRTZWxlY3RlZH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldERyYXdhYmxlPXt0aGlzLl9zZXREcmF3YWJsZX0gXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXREcm9wcGFibGU9e3RoaXMuX3NldERyb3BwYWJsZX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldEdhbWVQb2ludD17dGhpcy5fc2V0R2FtZVBvaW50fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Z2FtZW92ZXI9e2dhbWVvdmVyPyBmYWxzZTogZ2FtZW92ZXJ9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0KX1cclxuXHRcdFx0XHRcdDwvdHI+XHJcblx0XHRcdFx0KX1cclxuXHRcdFx0XHQ8L3RhYmxlPlxyXG5cdFx0XHRcdDxkaXYgaWQ9XCJkcmF3XCI+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT1cImJ0blwiIG9uQ2xpY2s9e3RoaXMuX29uQnV0dG9uQ2xpY2t9PkRSQVc8L2J1dHRvbj5cclxuXHRcdFx0XHRcdDxEcmF3bkNvbXBvbmVudCBwb3NpdGlvbj0nWy0xLCAtMV0nIFxyXG5cdFx0XHRcdFx0XHR1bml0PXtwZW5kaW5nRHJhdz8gcGVuZGluZ0RyYXcudW5pdCA6IG51bGx9IFxyXG5cdFx0XHRcdFx0XHRjb2xvcj17cGVuZGluZ0RyYXc/IHBlbmRpbmdEcmF3LmNvbG9yIDogbnVsbH0gXHJcblx0XHRcdFx0XHRcdHNpZGU9e3BlbmRpbmdEcmF3PyBwZW5kaW5nRHJhdy5zaWRlIDogbnVsbH0gXHJcblx0XHRcdFx0XHRcdGRyYXdBVW5pdD17dGhpcy5fb25EcmF3Q2VsbENsaWNrfVxyXG5cdFx0XHRcdFx0XHRwbGF5ZXJDb2xvcj17Y29sb3J9IC8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHRfb25EcmF3bkRyYWdTdGFydChlKSB7XHJcblx0XHRlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xyXG5cdFx0ZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsICcnKTtcclxuXHJcblx0XHRjb25zdCB7dW5pdCwgcG9zaXRpb24sIGNvbG9yLCBzZWxlY3RlZCwgc2V0U2VsZWN0ZWQsIGxpdHVwLCBzdHJpa2FibGUsIGRyb3BwYWJsZSwgc2lkZX0gPSB0aGlzLnByb3BzO1xyXG5cdFx0dGhpcy5fc2V0U2VsZWN0ZWQoJ1stMSwtMV0nLCAnZHJhdycpO1xyXG5cclxuXHR9LFxyXG5cclxuXHRfc2V0U2VsZWN0ZWQocG9zaXRpb24sIGluUmFuZ2UpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRzZWxlY3RlZDogcG9zaXRpb24sXHJcblx0XHRcdGxpZ2h0dXA6IHRoaXMuX2dldFZhbGlkTW92ZXMocG9zaXRpb24sIGluUmFuZ2UpLm1vdmFibGVUaWxlcyxcclxuXHRcdFx0c3RyaWtlOiB0aGlzLl9nZXRWYWxpZE1vdmVzKHBvc2l0aW9uLCBpblJhbmdlKS5zdHJpa2FibGVUaWxlc1xyXG5cdFx0fSlcclxuXHR9LFxyXG5cclxuXHRfc2V0RHJhd25Vbml0KHRpbGUpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRwZW5kaW5nRHJhdzoge1xyXG5cdFx0XHRcdHVuaXQ6IHRpbGUsXHJcblx0XHRcdFx0Y29sb3I6IHRoaXMucHJvcHMuY29sb3IsXHJcblx0XHRcdFx0c2lkZTogJ2Zyb250J1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cclxuXHR9LFxyXG5cdF9zZXRHYW1lUG9pbnQoKXtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRnYW1lb3ZlcjogdHJ1ZVxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0X2dldFZhbGlkTW92ZXMocG9zaXRpb24sIG1vdmVzKSB7XHJcblx0XHRpZiAoIW1vdmVzKSByZXR1cm47XHJcblx0XHRjb25zdCB7Y29sb3I6IHBsYXllckNvbG9yfSA9IHRoaXMucHJvcHM7XHJcblx0XHRsZXQgaW5SYW5nZSA9IFtdLCBtb3ZhYmxlVGlsZXMgPSB7fSwgc3RyaWthYmxlVGlsZXMgPSB7fSxcclxuXHRcdFx0cG9zQXJyID0gSlNPTi5wYXJzZShwb3NpdGlvbiksXHJcblx0XHRcdHRoZUJvYXJkID0gcGxheWVyQ29sb3IgPT09ICdibGFjaycgPyB0aGlzLl9yZXZlcnNlQm9hcmQoKSA6IHRoaXMuc3RhdGUuYm9hcmQ7XHJcblxyXG5cdFx0Ly8gU3RvcmUgYWxsIHRpbGVzIHdpdGhpbiByYW5nZSBvZiB0aGUgdW5pdCdzIGJlaGF2aW9yXHJcblx0XHRPYmplY3Qua2V5cyhtb3ZlcykuZm9yRWFjaChtb3ZlID0+IHtcclxuXHRcdFx0bGV0IG1vdmVBcnIgPSBKU09OLnBhcnNlKG1vdmUpLCBtb3ZlTmFtZSA9IG1vdmVzW21vdmVdLFxyXG5cdFx0XHRcdC8vICh4LCB5KTogY29vcmRpbmF0ZXMgb2YgdGhlIG1hcmtlZCB0aWxlXHJcblx0XHRcdFx0eCA9IHBvc0FyclswXSArIG1vdmVBcnJbMF0sIFxyXG5cdFx0XHRcdHkgPSBwb3NBcnJbMV0gKyBtb3ZlQXJyWzFdO1xyXG5cclxuXHRcdFx0Ly8gc3RyaWtlIGFuZCBqdW1wIGFyZSBzdHJhaWdodGZvcndhcmQ7IHNpbXBseSBzdG9yZSB0aGUgbWFya2VkIHRpbGVcclxuXHRcdFx0aWYgKG1vdmVOYW1lID09PSAnc3RyaWtlJykgaW5SYW5nZS5wdXNoKHt4OiB4LCB5OiB5LCB0eXBlOiAnc3RyaWtlJ30pO1xyXG5cdFx0XHRlbHNlIGlmIChtb3ZlTmFtZSA9PT0gJ2p1bXAnKSBpblJhbmdlLnB1c2goe3g6IHgsIHk6IHksIHR5cGU6ICdtb3ZlJ30pO1xyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRsZXQgZGVsdGFYID0gTWF0aC5zaWduKG1vdmVBcnJbMF0pLCBcclxuXHRcdFx0XHRcdGRlbHRhWSA9IE1hdGguc2lnbihtb3ZlQXJyWzFdKSxcclxuXHRcdFx0XHRcdGkgPSBwb3NBcnJbMF0gKyBkZWx0YVgsIFxyXG5cdFx0XHRcdFx0aiA9IHBvc0FyclsxXSArIGRlbHRhWTtcclxuXHJcblx0XHRcdFx0Ly8gbG9vcCB0aHJvdWdoIGFsbCB0aWxlcyBvbiBib2FyZCBpbiBhIHN0cmFpZ2h0IHBhdGggYmV0d2VlbiBzdGFydGluZyB0aWxlIGFuZCBtYXJrZWQgdGlsZVxyXG5cdFx0XHRcdHdoaWxlICh0aGlzLl9pc09uQm9hcmQoe3g6IGksIHk6IGp9KSkge1xyXG5cdFx0XHRcdFx0Ly8gc2xpZGluZyB1bml0cyBjYW4gbGFuZCBvbiBhbnkgdGlsZSB3aXRoaW4gYSBzdHJhaWdodCBwYXRoXHJcblx0XHRcdFx0XHQvLyBub24tc2xpZGluZyB1bml0cyBjYW4gb25seSBsYW5kIG9uIHRoZSBtYXJrZWQgdGlsZVxyXG5cdFx0XHRcdFx0aWYgKG1vdmVOYW1lLmluY2x1ZGVzKCdzbGlkZScpIHx8ICh4ID09PSBpICYmIHkgPT09IGopKVxyXG5cdFx0XHRcdFx0XHRpblJhbmdlLnB1c2goe3g6IGksIHk6IGosIHR5cGU6ICdtb3ZlJ30pO1xyXG5cclxuXHRcdFx0XHRcdC8vIGlmIHVuaXQgY2FuJ3QganVtcCBhbmQgdGhlcmUgaXMgYSB1bml0IGluIHRoZSB3YXksIGJyZWFrXHJcblx0XHRcdFx0XHRsZXQgdW5pdEluVGhlV2F5ID0gdGhlQm9hcmRbYFske2l9LCAke2p9XWBdO1xyXG5cdFx0XHRcdFx0aWYgKHVuaXRJblRoZVdheSAmJiAhbW92ZU5hbWUuaW5jbHVkZXMoJ2p1bXAnKSkgYnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0aSArPSBkZWx0YVg7IGogKz0gZGVsdGFZO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gRmlsdGVyIG91dCB0aWxlcyB0aGF0IGFyZSBvY2N1cGllZCBieSBhbGxpZWQgdW5pdHMgb3Igbm90IG9uIHRoZSBib2FyZCxcclxuXHRcdC8vIHRoZW4gb3JnYW5pemUgYnkgbW92YWJsZSBhbmQgc3RyaWthYmxlIHRpbGVzXHJcblx0XHRpblJhbmdlLmZpbHRlcihyYW5nZSA9PiB7XHJcblx0XHRcdGxldCB0YXJnZXRVbml0ID0gdGhlQm9hcmRbYFske3JhbmdlLnh9LCAke3JhbmdlLnl9XWBdO1xyXG5cdFx0XHRpZiAodGFyZ2V0VW5pdCAmJiB0aGVCb2FyZFtwb3NpdGlvbl0uY29sb3IgPT09IHRhcmdldFVuaXQuY29sb3IpIHJldHVybiBmYWxzZTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2lzT25Cb2FyZChyYW5nZSk7XHJcblx0XHR9KS5mb3JFYWNoKHJhbmdlID0+IHtcclxuXHRcdFx0aWYgKHJhbmdlLnR5cGUgPT09ICdtb3ZlJykgbW92YWJsZVRpbGVzW2BbJHtyYW5nZS54fSwgJHtyYW5nZS55fV1gXSA9IHRydWU7XHJcblx0XHRcdGVsc2UgaWYgKHJhbmdlLnR5cGUgPT09ICdzdHJpa2UnKSBzdHJpa2FibGVUaWxlc1tgWyR7cmFuZ2UueH0sICR7cmFuZ2UueX1dYF0gPSB0cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHsgbW92YWJsZVRpbGVzLCBzdHJpa2FibGVUaWxlcyB9O1xyXG5cdH0sXHJcblxyXG5cdF9pc09uQm9hcmQoe3gsIHl9KSB7XHJcblx0ICByZXR1cm4geCA+PSAwICYmIHkgPj0gMCAmJiB4IDwgNiAmJiB5IDwgNjtcclxuXHR9LFxyXG5cclxuXHRfcnVuQ2xvY2soKSB7XHJcblx0ICBjb25zdCB7aW8sIHRva2VuLCBjb2xvcn0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHQgIGlvLmVtaXQoJ2Nsb2NrLXJ1bicsIHtcclxuXHQgICAgdG9rZW46IHRva2VuLFxyXG5cdCAgICBjb2xvcjogY29sb3JcclxuXHQgIH0pO1xyXG5cdH0sXHJcblx0X3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKCkge1xyXG5cdCAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RpdGxlJylbMF07XHJcblx0ICB0aXRsZS50ZXh0ID0gdGl0bGUudGV4dC5yZXBsYWNlKCcqICcsICcnKTtcclxuXHQgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKTtcclxuXHR9XHJcblxyXG59KTtcclxuXHJcblxyXG5jb25zdCBDZWxsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHByb3BUeXBlczoge1xyXG5cclxuXHR9LFxyXG5cclxuICBcdGNvbXBvbmVudERpZE1vdW50KCkge1xyXG5cdFx0XHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50V2lsbE1vdW50KCkge1xyXG5cdFx0XHRcclxuXHR9LFxyXG5cclxuXHRtaXhpbnM6IFtdLFxyXG5cclxuXHRfb25DbGlja1NxdWFyZSgpIHtcclxuXHJcblx0XHRjb25zdCB7dW5pdCwgY29sb3IsIHNldFNlbGVjdGVkLCBsaXR1cCwgc3RyaWthYmxlLCBjYW5Ecm9wLCBzaWRlLCBwbGF5ZXJDb2xvciwgdHVybiwgcGVuZGluZ0RyYXd9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRsZXQge3Bvc2l0aW9uLCBzZWxlY3RlZH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHZhciBnYW1lb3ZlciA9IEdhbWVTdG9yZS5nZXRHYW1lYm9hcmRTdGF0ZSgpLmdhbWVvdmVyO1xyXG5cdFx0aWYoZ2FtZW92ZXIuZ2V0KCdzdGF0dXMnKSkgcmV0dXJuO1xyXG5cclxuXHRcdC8vIG9ubHkgbGV0IHRoZSBwbGF5ZXIgYWN0IHdoZW4gaXQgaXMgdGhlaXIgdHVyblxyXG5cdFx0Ly8gaWYgcGxheWVyIGRyZXcgYSB1bml0LCBkb24ndCBsZXQgdGhlbSBtYWtlIGEgbm9ybWFsIG1vdmVcclxuXHJcblx0XHRpZiAoICh0dXJuICE9PSBwbGF5ZXJDb2xvci5jaGFyQXQoMCkpIHx8IHBlbmRpbmdEcmF3ICkgcmV0dXJuO1xyXG5cclxuXHRcdC8vIGlmIHRoZXJlIGlzIG5vIGN1cnJlbnRseSBzZWxlY3RlZCB1bml0LCBjbGljayBhIHVuaXQgKG9mIHRoZSBzYW1lIGNvbG9yKSB0byBzZWxlY3QgaXRcclxuXHRcdGlmICghc2VsZWN0ZWQgJiYgdW5pdCAmJiBjb2xvciA9PT0gcGxheWVyQ29sb3IpIHtcclxuXHRcdFx0bGV0IG1vdmVzID0gYmVoYXZpb3JbdW5pdF1bc2lkZV07XHJcblx0XHRcdHNldFNlbGVjdGVkKHBvc2l0aW9uLCBtb3Zlcyk7XHJcblx0XHR9XHJcblx0XHQvLyBpZiB0aGVyZSBpcyBjdXJyZW50bHkgYSBzZWxlY3RlZCB1bml0IG9uIHRoZSBib2FyZFxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdC8vIHdoZW4gZW1pdHRpbmcgYSBtb3ZlIGV2ZW50LCBzZW5kIHRoZSBcInJlYWxcIiBwb3NpdGlvbiAoaS5lLiBpZiBibGFjaywgdGhlIHJldmVyc2Ugb2YgdGhlIHJlbmRlcmVkIHZpZXcpIFxyXG5cdFx0XHRpZiAocGxheWVyQ29sb3IgPT09ICdibGFjaycpIHtcclxuXHRcdFx0XHRwb3NpdGlvbiA9IHRoaXMuX3JldmVyc2VQb3NpdGlvbihwb3NpdGlvbik7XHJcblx0XHRcdFx0c2VsZWN0ZWQgPSB0aGlzLl9yZXZlcnNlUG9zaXRpb24oc2VsZWN0ZWQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBjYW4gZG8gb25lIG9mIHRoZSBmb2xsb3dpbmc6XHJcblxyXG5cdFx0XHQvLyAxLiBtb3ZlIHRvIGEgdGlsZSBnbG93aW5nIHJlZFxyXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5saXR1cCkge1xyXG5cdFx0XHRcdGxldCBjYXB0dXJlID0gdW5pdCAmJiBjb2xvciAhPT0gcGxheWVyQ29sb3I7XHJcblx0XHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCBjYXB0dXJlLCAnbW92ZScsIHRydWUpO1xyXG5cdFx0XHRcdHNldFNlbGVjdGVkKG51bGwsIFtdKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gMi4gYXR0YWNrIGEgdW5pdCBvbiBhIHRpbGUgZ2xvd2luZyB5ZWxsb3csIHdpdGhvdXQgbW92aW5nXHJcblx0XHRcdGVsc2UgaWYgKHRoaXMucHJvcHMuc3RyaWthYmxlICYmIHVuaXQgJiYgY29sb3IgIT09IHBsYXllckNvbG9yKSB7XHJcblx0XHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCB0cnVlLCAnc3RyaWtlJywgdHJ1ZSk7XHJcblx0XHRcdFx0c2V0U2VsZWN0ZWQobnVsbCwgW10pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyAzLiBkZXNlbGVjdCB0aGUgY3VycmVudCB1bml0IGJ5IGNsaWNraW5nIG9uIGl0XHJcblx0XHRcdGVsc2UgaWYgKHNlbGVjdGVkID09PSBwb3NpdGlvbikge1xyXG5cdFx0XHRcdHNldFNlbGVjdGVkKG51bGwsIFtdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVx0XHRcclxuXHR9LFxyXG5cclxuXHRfb25EcmFnU3RhcnQoZSkge1xyXG5cdFx0Y29uc3Qge3VuaXQsIHBvc2l0aW9uLCBjb2xvciwgc2VsZWN0ZWQsIHNldFNlbGVjdGVkLCBsaXR1cCwgc3RyaWthYmxlLCBzaWRlLCBjYW5Ecm9wLCBwbGF5ZXJDb2xvciwgdHVybiwgcGVuZGluZ0RyYXd9ID0gdGhpcy5wcm9wcztcclxuXHRcdFxyXG5cdFx0dmFyIGdhbWVvdmVyID0gR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCkuZ2FtZW92ZXI7XHJcblx0XHRpZihnYW1lb3Zlci5nZXQoJ3N0YXR1cycpKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKCAodHVybiAhPT0gcGxheWVyQ29sb3IuY2hhckF0KDApKSB8fCBwZW5kaW5nRHJhdyApIHJldHVybjtcclxuXHJcblx0XHRlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xyXG5cdFx0ZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsICcnKTtcclxuXHJcblx0XHRpZiAoIXNlbGVjdGVkICYmIHVuaXQgJiYgY29sb3IgPT09IHBsYXllckNvbG9yKSB7XHJcblx0XHRcdGxldCBtb3ZlcyA9IGJlaGF2aW9yW3VuaXRdW3NpZGVdO1xyXG5cdFx0XHRzZXRTZWxlY3RlZChwb3NpdGlvbiwgbW92ZXMpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0X29uRHJhZ092ZXIoZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0ZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcclxuXHR9LFxyXG5cdF9vbkRyb3AoZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGNvbnN0IHt1bml0LCBjb2xvciwgc2V0U2VsZWN0ZWQsIHNldERyb3BwYWJsZSwgc2V0RHJhd2FibGUsIGxpdHVwLCBzdHJpa2FibGUsIGNhbkRyb3AsIHNpZGUsIHBsYXllckNvbG9yLCBwZW5kaW5nRHJhd30gPSB0aGlzLnByb3BzO1xyXG5cdFx0bGV0IHtwb3NpdGlvbiwgc2VsZWN0ZWR9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRpZiAocGxheWVyQ29sb3IgPT09ICdibGFjaycpIHtcclxuXHRcdFx0aWYgKHBvc2l0aW9uKSBwb3NpdGlvbiA9IHRoaXMuX3JldmVyc2VQb3NpdGlvbihwb3NpdGlvbik7XHJcblx0XHRcdGlmIChzZWxlY3RlZCkgc2VsZWN0ZWQgPSB0aGlzLl9yZXZlcnNlUG9zaXRpb24oc2VsZWN0ZWQpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMucHJvcHMubGl0dXApIHtcclxuXHRcdFx0bGV0IGNhcHR1cmUgPSB1bml0ICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcjtcclxuXHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCBjYXB0dXJlLCAnbW92ZScsIHRydWUpO1xyXG5cdFx0fVx0XHRcclxuXHRcdGVsc2UgaWYgKHRoaXMucHJvcHMuc3RyaWthYmxlICYmIHVuaXQpe1xyXG5cdFx0XHRHYW1lQWN0aW9ucy5tYWtlTW92ZShzZWxlY3RlZCwgcG9zaXRpb24sIHRydWUsICdzdHJpa2UnLCB0cnVlKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYodGhpcy5wcm9wcy5jYW5Ecm9wKXtcclxuXHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUocGVuZGluZ0RyYXcsIHBvc2l0aW9uLCBmYWxzZSwgJ21vdmUnLCB0cnVlKTtcclxuXHRcdH1cclxuXHRcdHNldFNlbGVjdGVkKG51bGwsIFtdKTtcclxuXHJcblx0fSxcclxuXHJcblx0X3JldmVyc2VQb3NpdGlvbihwb3MpIHtcclxuXHRcdGxldCBwb3NBcnIgPSBKU09OLnBhcnNlKHBvcyk7XHJcblx0XHRyZXR1cm4gYFskezUtcG9zQXJyWzBdfSwgJHs1LXBvc0FyclsxXX1dYDtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHt1bml0LCBjb2xvciwgbGl0dXAsIHN0cmlrYWJsZSwgY2FuRHJvcCwgc2lkZSwgcGxheWVyQ29sb3J9ID0gdGhpcy5wcm9wcztcclxuXHRcdFxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2N4KHtcclxuXHRcdFx0XHRcdGNlbGxDb250YWluZXI6IHRydWUsXHJcblx0XHRcdFx0XHRbc2lkZV06IHRydWVcclxuXHRcdFx0XHR9KX1cclxuXHRcdFx0XHRvbkRyYWdPdmVyPXt0aGlzLl9vbkRyYWdPdmVyfVxyXG5cdFx0XHRcdG9uRHJvcD17dGhpcy5fb25Ecm9wfVxyXG5cdFx0XHQ+XHJcblx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9e2N4KHtcclxuXHRcdFx0XHRcdFx0XHR1bml0OiAhIXVuaXQsXHJcblx0XHRcdFx0XHRcdFx0bGl0dXA6IGxpdHVwLFxyXG5cdFx0XHRcdFx0XHRcdHN0cmlrYWJsZTogc3RyaWthYmxlLFxyXG5cdFx0XHRcdFx0XHRcdGNhbkRyb3A6IGNhbkRyb3AsXHJcblx0XHRcdFx0XHRcdFx0b3Bwb25lbnQ6IGNvbG9yICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcixcclxuXHRcdFx0XHRcdFx0XHRbc2lkZV06IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0W3VuaXRdOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFtjb2xvcl06IHRydWUsXHJcblx0XHRcdFx0XHRcdH0pfVxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLl9vbkNsaWNrU3F1YXJlfVxyXG5cdFx0XHRcdFx0XHRvbkRyYWdTdGFydD17dGhpcy5fb25EcmFnU3RhcnR9XHJcblx0XHRcdFx0XHRcdGRyYWdnYWJsZSAvPlxyXG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcImZyb250LWZhY2VcIjogdHJ1ZSwgb3Bwb25lbnQ6IGNvbG9yICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcn0pfSAvPlxyXG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcImJhY2stZmFjZVwiOiB0cnVlLCBvcHBvbmVudDogY29sb3IgJiYgY29sb3IgIT09IHBsYXllckNvbG9yfSl9IC8+XHJcblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT1cImxlZnQtZmFjZVwiIC8+XHJcblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT1cInJpZ2h0LWZhY2VcIiAvPlxyXG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9XCJ0b3AtZmFjZVwiIC8+XHJcblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT1cImJvdHRvbS1mYWNlXCIgLz5cclxuXHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG59KTtcclxuXHJcbmNvbnN0IERyYXduQ29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHByb3BUeXBlczoge1xyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIFx0IHJldHVybiB7XHJcbiAgICBcdCBcdC8vc2lkZTogJ2Zyb250JyxcclxuICAgIFx0IFx0ZHJhd246IG51bGxcclxuICAgIFx0IH07XHJcbiAgXHR9LFxyXG4gIFx0Y29tcG9uZW50RGlkTW91bnQoKSB7XHJcblxyXG5cdFx0XHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50V2lsbE1vdW50KCkge1xyXG5cdFx0XHJcblx0XHJcblx0fSxcclxuXHJcblx0bWl4aW5zOiBbXSxcclxuXHJcblxyXG5cdF9vbkRyYWdTdGFydChlKSB7XHJcblx0XHRlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xyXG5cdFx0ZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsICcnKTtcclxuXHJcblx0XHRjb25zdCB7dW5pdCwgcG9zaXRpb24sIGNvbG9yLCBzaWRlfSA9IHRoaXMucHJvcHM7XHJcblx0fSxcclxuXHRfb25EcmFnT3ZlcihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0dmFyIHt1bml0LCBjb2xvciwgc2lkZSwgZHJhZ2dhYmxlLCBkcmF3QVVuaXQsIHBvc2l0aW9uLCBwbGF5ZXJDb2xvcn0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJkcmF3blVuaXRcIiBkcmFnZ2FibGUgXHJcblx0XHRcdFx0Y2xhc3NOYW1lPXtjeCh7XHRcclxuXHRcdFx0XHRcdGNlbGxDb250YWluZXI6IHRydWUsXHJcblx0XHRcdFx0XHRbdW5pdF06IHRydWUsXHJcblx0XHRcdFx0XHRbY29sb3JdOiB0cnVlLFxyXG5cdFx0XHRcdFx0W3NpZGVdOiB0cnVlXHJcblx0XHRcdFx0fSl9ID5cclxuXHRcdFx0XHRcdDxhIGNsYXNzTmFtZT17Y3goe1xyXG5cdFx0XHRcdFx0XHRcdHVuaXQ6ICEhdW5pdCxcclxuXHRcdFx0XHRcdFx0XHRvcHBvbmVudDogY29sb3IgJiYgY29sb3IgIT09IHBsYXllckNvbG9yLFxyXG5cdFx0XHRcdFx0XHRcdFtzaWRlXTogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRbdW5pdF06IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0W2NvbG9yXTogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0fSl9XHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2RyYXdBVW5pdH1cclxuXHRcdFx0XHRcdFx0Ly8gb25EcmFnU3RhcnQ9e3RoaXMuX29uRHJhZ1N0YXJ0fVxyXG5cdFx0XHRcdFx0XHRkcmFnZ2FibGU+XHJcblx0XHRcdFx0XHQ8L2E+XHJcblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1wiZnJvbnQtZmFjZVwiOiB0cnVlLCBcImRyYXctcHJldmlld1wiOiB0cnVlLCBvcHBvbmVudDogY29sb3IgJiYgY29sb3IgIT09IHBsYXllckNvbG9yfSl9IC8+XHJcblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1wiYmFjay1mYWNlXCI6IHRydWUsIFwiZHJhdy1wcmV2aWV3XCI6IHRydWUsICBvcHBvbmVudDogY29sb3IgJiYgY29sb3IgIT09IHBsYXllckNvbG9yfSl9IC8+XHJcblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1wibGVmdC1mYWNlXCI6IHRydWUsIFwiZHJhdy1wcmV2aWV3XCI6IHRydWV9KX0gLz5cclxuXHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPXtjeCh7XCJyaWdodC1mYWNlXCI6IHRydWUsIFwiZHJhdy1wcmV2aWV3XCI6IHRydWV9KX0gLz5cclxuXHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPXtjeCh7XCJ0b3AtZmFjZVwiOiB0cnVlLCBcImRyYXctcHJldmlld1wiOiB0cnVlfSl9IC8+XHJcblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1wiYm90dG9tLWZhY2VcIjogdHJ1ZSwgXCJkcmF3LXByZXZpZXdcIjogdHJ1ZX0pfSAvPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0fSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7Qm9hcmQ6IEdhbWVCb2FyZCwgQ2VsbDogQ2VsbCwgRHJhd25Db21wb25lbnQ6IERyYXduQ29tcG9uZW50fTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcclxuaW1wb3J0IENsb2NrIGZyb20gJy4vQ2xvY2snO1xyXG5pbXBvcnQgQ2hhdFN0b3JlIGZyb20gJy4uL3N0b3Jlcy9DaGF0U3RvcmUnO1xyXG5pbXBvcnQgQ2hhdEFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9DaGF0QWN0aW9ucyc7XHJcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcclxuXHJcbmNvbnN0IEdhbWVIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgcGFyYW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxyXG4gICAgb3Blbk1vZGFsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgZ2FtZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXHJcbiAgfSxcclxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluXSxcclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgcmV0dXJuIG9taXQoQ2hhdFN0b3JlLmdldFN0YXRlKCksICdtZXNzYWdlcycpO1xyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBDaGF0U3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uQ2hhdENoYW5nZSk7XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIENoYXRTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uQ2hhdENoYW5nZSk7XHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7aW8sIHBhcmFtcywgZ2FtZU92ZXIsIGlzT3Bwb25lbnRBdmFpbGFibGV9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHVuc2VlbkNvdW50ID0gdGhpcy5zdGF0ZS51bnNlZW5Db3VudDtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XHJcblxyXG4gICAgICAgIDxDbG9ja1xyXG4gICAgICAgICAgaW89e2lvfVxyXG4gICAgICAgICAgcGFyYW1zPXtwYXJhbXN9IC8+XHJcblxyXG4gICAgICAgIHsvKjxzcGFuIGlkPVwiZ2FtZS10eXBlXCI+XHJcbiAgICAgICAgICB7YCR7cGFyYW1zWzFdfXwke3BhcmFtc1syXX1gfVxyXG4gICAgICAgIDwvc3Bhbj4qL31cclxuXHJcbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuXCIgaHJlZj1cIi9cIj5OZXcgZ2FtZTwvYT5cclxuXHJcbiAgICAgICAgeyFnYW1lT3ZlciAmJiBpc09wcG9uZW50QXZhaWxhYmxlID9cclxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tLXJlZCByZXNpZ25cIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uUmVzaWdufT5cclxuICAgICAgICAgICAgUmVzaWduXHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgOmdhbWVPdmVyID9cclxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tLXJlZCByZW1hdGNoXCJcclxuICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uUmVtYXRjaH0+XHJcbiAgICAgICAgICAgIFJlbWF0Y2hcclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICA6bnVsbH1cclxuXHJcbiAgICAgICAgPGEgaWQ9XCJjaGF0LWljb25cIlxyXG4gICAgICAgICAgIG9uQ2xpY2s9e0NoYXRBY3Rpb25zLnRvZ2dsZVZpc2liaWxpdHl9PlxyXG4gICAgICAgICAge3Vuc2VlbkNvdW50ID9cclxuICAgICAgICAgICAgPHNwYW4gaWQ9XCJjaGF0LWNvdW50ZXJcIj5cclxuICAgICAgICAgICAgICB7dW5zZWVuQ291bnQgPCA5ID8gdW5zZWVuQ291bnQgOiAnOSsnfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICA6bnVsbH1cclxuICAgICAgICAgIDxpbWcgc3JjPVwiL2ltZy9jaGF0LnN2Z1wiXHJcbiAgICAgICAgICAgICAgIHdpZHRoPVwiNTBcIlxyXG4gICAgICAgICAgICAgICBoZWlnaHQ9XCI1MFwiIC8+XHJcbiAgICAgICAgICBDaGF0XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2hlYWRlcj5cclxuICAgICk7XHJcbiAgfSxcclxuICBfb25DaGF0Q2hhbmdlKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZShvbWl0KENoYXRTdG9yZS5nZXRTdGF0ZSgpLCAnbWVzc2FnZXMnKSk7XHJcbiAgfSxcclxuICBfb25SZXNpZ24oKSB7XHJcbiAgICBjb25zdCB7aW8sIHBhcmFtcywgY29sb3J9ID0gdGhpcy5wcm9wcztcclxuICAgIFxyXG4gICAgaW8uZW1pdCgncmVzaWduJywge1xyXG4gICAgICB0b2tlbjogcGFyYW1zWzBdLFxyXG4gICAgICBjb2xvcjogY29sb3JcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgX29uUmVtYXRjaCgpIHtcclxuICAgIGNvbnN0IHtpbywgcGFyYW1zLCBvcGVuTW9kYWwsIGlzT3Bwb25lbnRBdmFpbGFibGV9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBpZiAoIWlzT3Bwb25lbnRBdmFpbGFibGUpIHtcclxuICAgICAgb3Blbk1vZGFsKCdpbmZvJywgJ1lvdXIgb3Bwb25lbnQgaGFzIGRpc2Nvbm5lY3RlZC4gWW91IG5lZWQgdG8gJyArXHJcbiAgICAgICAgJ2dlbmVyYXRlIGEgbmV3IGxpbmsuJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpby5lbWl0KCdyZW1hdGNoLW9mZmVyJywge1xyXG4gICAgICB0b2tlbjogcGFyYW1zWzBdXHJcbiAgICB9KTtcclxuICAgIG9wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9mZmVyIGhhcyBiZWVuIHNlbnQuJyk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVIZWFkZXI7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XHJcbmltcG9ydCBHYW1lSGVhZGVyIGZyb20gJy4vR2FtZUhlYWRlcic7XHJcbmltcG9ydCBDaGF0IGZyb20gJy4vQ2hhdCc7XHJcbmltcG9ydCBNb2RhbCBmcm9tICcuL01vZGFsJztcclxuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xyXG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xyXG5pbXBvcnQgQ2hlc3Nib2FyZEludGVyZmFjZSBmcm9tICcuL0NoZXNzYm9hcmRJbnRlcmZhY2UnO1xyXG5pbXBvcnQgR2FtZWJvYXJkSW50ZXJmYWNlIGZyb20gJy4vR2FtZWJvYXJkSW50ZXJmYWNlJztcclxuaW1wb3J0IHtNYXB9IGZyb20gJ2ltbXV0YWJsZSc7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkJztcclxuXHJcbmNvbnN0IEdhbWVJbnRlcmZhY2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgcGFyYW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxyXG4gIH0sXHJcblxyXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IGZhbHNlLFxyXG4gICAgICBjb2xvcjogJ3doaXRlJyxcclxuICAgICAgbW9kYWw6IE1hcCh7XHJcbiAgICAgICAgb3BlbjogZmFsc2UsXHJcbiAgICAgICAgbWVzc2FnZTogJycsXHJcbiAgICAgICAgdHlwZTogJ2luZm8nLFxyXG4gICAgICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgICAgaGlkZTogdGhpcy5faGlkZU1vZGFsLFxyXG4gICAgICAgICAgYWNjZXB0OiB0aGlzLl9hY2NlcHRSZW1hdGNoLFxyXG4gICAgICAgICAgZGVjbGluZTogdGhpcy5fZGVjbGluZVJlbWF0Y2hcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgICBnYW1lT3ZlcjogR2FtZVN0b3JlLmdldFN0YXRlKCkuZ2FtZU92ZXJcclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgaW8ub24oJ3Rva2VuLWludmFsaWQnLCAoKSA9PiB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbW9kYWw6IHRoaXMuc3RhdGUubW9kYWxcclxuICAgICAgICAuc2V0KCdvcGVuJywgdHJ1ZSlcclxuICAgICAgICAuc2V0KCdtZXNzYWdlJywgJ0dhbWUgbGluayBpcyBpbnZhbGlkIG9yIGhhcyBleHBpcmVkLicpXHJcbiAgICAgICAgLnNldCgndHlwZScsICdpbmZvJylcclxuICAgIH0pKTtcclxuXHJcbiAgICBpby5lbWl0KCdqb2luJywge1xyXG4gICAgICB0b2tlbjogcGFyYW1zWzBdLFxyXG4gICAgICB0aW1lOiBwYXJhbXNbMV0gKiA2MCxcclxuICAgICAgaW5jOiBwYXJhbXNbMl1cclxuICAgIH0pO1xyXG5cclxuICAgIGlvLm9uKCdqb2luZWQnLCBkYXRhID0+IHtcclxuICAgICAgaWYgKGRhdGEuY29sb3IgPT09ICdibGFjaycpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb2xvcjogJ2JsYWNrJ30pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpby5vbignYm90aC1qb2luZWQnLCAoKSA9PlxyXG4gICAgICB0aGlzLnNldFN0YXRlKHtpc09wcG9uZW50QXZhaWxhYmxlOiB0cnVlfSwgKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbG9yID09PSAnd2hpdGUnKSB7XHJcbiAgICAgICAgICBpby5lbWl0KCdjbG9jay1ydW4nLCB7XHJcbiAgICAgICAgICAgIHRva2VuOiBwYXJhbXNbMF0sXHJcbiAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pKTtcclxuXHJcbiAgICBpby5vbignZnVsbCcsICgpID0+IHtcclxuICAgICAgd2luZG93LmFsZXJ0KFxyXG4gICAgICAgICdUaGlzIGdhbWUgYWxyZWFkeSBoYXMgdHdvIHBsYXllcnMuIFlvdSBoYXZlIHRvIGNyZWF0ZSBhIG5ldyBvbmUuJyk7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvJztcclxuICAgIH0pO1xyXG5cclxuICAgIGlvLm9uKCdzd2FsLWdhbWVvdmVyJywgZGF0YSA9PiB7XHJcbiAgICAgIC8vIGRhdGEuY29sb3IgPSBwbGF5ZXIgd2hvIG1hZGUgdGhlIHdpbm5pbmcgbW92ZVxyXG4gICAgICBHYW1lQWN0aW9ucy5nYW1lT3Zlcih7XHJcbiAgICAgICAgdHlwZTogJ2RlZmVhdCcsXHJcbiAgICAgICAgd2lubmVyOiBkYXRhLmNvbG9yID09PSAnd2hpdGUnID8gJ1doaXRlJyA6ICdCbGFjaydcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBpV2luID0gdGhpcy5zdGF0ZS5jb2xvciA9PT0gZGF0YS5jb2xvcjtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgIHRpdGxlOiBpV2luID8gJ1lvdSB3aW4hJyA6ICdZb3UgbG9zZSEnLFxyXG4gICAgICAgICB0ZXh0OiBpV2luID8gJ3lheScgOiAnQmV0dGVyIGx1Y2sgbmV4dCB0aW1lIScsXHJcbiAgICAgICAgIGltYWdlVXJsOiBpV2luPyAnaHR0cDovL29yaWcwOC5kZXZpYW50YXJ0Lm5ldC9iODNkL2YvMjAxMy8yNzIvNy85L2hhcHB5X3B1cHB5X2J5X2xha2kxMC1kNm9pNG50LnBuZycgOiAnaHR0cHM6Ly9pYW1waWVycmVtZW5hcmQuZmlsZXMud29yZHByZXNzLmNvbS8yMDE0LzAyL3NhZC1kb2cuanBnJ1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlvLm9uKCdwbGF5ZXItcmVzaWduZWQnLCBkYXRhID0+IHtcclxuICAgICAgLy8gZGF0YS5jb2xvciA9IHBsYXllciB3aG8gcmVzaWduZWRcclxuICAgICAgY29uc3QgcmVzaWduR3V5ID0gZGF0YS5jb2xvciA9PT0gJ3doaXRlJyA/ICdXaGl0ZScgOiAnQmxhY2snLFxyXG4gICAgICAgICAgICB3aW5uZXIgPSBkYXRhLmNvbG9yID09PSAnd2hpdGUnID8gJ0JsYWNrJyA6ICdXaGl0ZSc7XHJcblxyXG4gICAgICBHYW1lQWN0aW9ucy5nYW1lT3Zlcih7XHJcbiAgICAgICAgdHlwZTogJ3Jlc2lnbicsXHJcbiAgICAgICAgd2lubmVyXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgaVdpbiA9IHRoaXMuc3RhdGUuY29sb3IgIT09IGRhdGEuY29sb3I7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICB0aXRsZTogaVdpbiA/IGAke3Jlc2lnbkd1eX0gaGFzIHJlc2lnbmVkIWAgOiAnWW91IGhhdmUgcmVzaWduZWQhJyxcclxuICAgICAgICAgdGV4dDogaVdpbiA/ICdHdWVzcyB5b3Ugd2luIGxvbCDCr1xcXFxfKOODhClfL8KvJyA6ICdib28nLFxyXG4gICAgICAgICBpbWFnZVVybDogaVdpbj8gJ2h0dHA6Ly9vcmlnMDguZGV2aWFudGFydC5uZXQvYjgzZC9mLzIwMTMvMjcyLzcvOS9oYXBweV9wdXBweV9ieV9sYWtpMTAtZDZvaTRudC5wbmcnIDogJ2h0dHBzOi8vaWFtcGllcnJlbWVuYXJkLmZpbGVzLndvcmRwcmVzcy5jb20vMjAxNC8wMi9zYWQtZG9nLmpwZydcclxuICAgICAgfSk7ICAgICAgXHJcbiAgICB9KTtcclxuXHJcbiAgICBpby5vbigncmVtYXRjaC1vZmZlcmVkJywgKCkgPT5cclxuICAgICAgdGhpcy5fb3Blbk1vZGFsKCdvZmZlcicsICdZb3VyIG9wcG9uZW50IGhhcyBzZW50IHlvdSBhIHJlbWF0Y2ggb2ZmZXIuJykpO1xyXG5cclxuICAgIGlvLm9uKCdyZW1hdGNoLWRlY2xpbmVkJywgKCkgPT5cclxuICAgICAgdGhpcy5fb3Blbk1vZGFsKCdpbmZvJywgJ1JlbWF0Y2ggb2ZmZXIgaGFzIGJlZW4gZGVjbGluZWQuJykpO1xyXG5cclxuICAgIGlvLm9uKCdyZW1hdGNoLWFjY2VwdGVkJywgKCkgPT4ge1xyXG4gICAgICBHYW1lQWN0aW9ucy5yZW1hdGNoKCk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGNvbG9yOiB0aGlzLnN0YXRlLmNvbG9yID09PSAnd2hpdGUnID8gJ2JsYWNrJyA6ICd3aGl0ZScsXHJcbiAgICAgICAgbW9kYWw6IHRoaXMuc3RhdGUubW9kYWwuc2V0KCdvcGVuJywgZmFsc2UpXHJcbiAgICAgIH0sICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb2xvciA9PT0gJ3doaXRlJykge1xyXG4gICAgICAgICAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xyXG4gICAgICAgICAgICB0b2tlbjogdGhpcy5wcm9wcy5wYXJhbXNbMF0sXHJcbiAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW8ub24oJ29wcG9uZW50LWRpc2Nvbm5lY3RlZCcsICgpID0+ICB7XHJcbiAgICAgIGlmICghdGhpcy5zdGF0ZS5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpKSB7XHJcbiAgICAgICAgdGhpcy5fb3Blbk1vZGFsKCdpbmZvJywgJ1lvdXIgb3Bwb25lbnQgaGFzIGRpc2Nvbm5lY3RlZC4nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNPcHBvbmVudEF2YWlsYWJsZTogZmFsc2V9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIEdhbWVTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgR2FtZVN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcclxuICB9LFxyXG5cclxuXHJcblxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7aW8sIHBhcmFtc30gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3Qge2NvbG9yLCBnYW1lT3ZlciwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgY29tbW9uUHJvcHMgPSB7XHJcbiAgICAgIGlvOiBpbyxcclxuICAgICAgY29sb3I6IGNvbG9yLFxyXG4gICAgICBvcGVuTW9kYWw6IHRoaXMuX29wZW5Nb2RhbCxcclxuICAgICAgaXNPcHBvbmVudEF2YWlsYWJsZTogaXNPcHBvbmVudEF2YWlsYWJsZVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxHYW1lSGVhZGVyXHJcbiAgICAgICAgICB7Li4uY29tbW9uUHJvcHN9XHJcbiAgICAgICAgICBwYXJhbXM9e3BhcmFtc31cclxuICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlci5nZXQoJ3N0YXR1cycpfSAvPlxyXG5cclxuICAgICAgICA8Q2hhdFxyXG4gICAgICAgICAgey4uLmNvbW1vblByb3BzfVxyXG4gICAgICAgICAgdG9rZW49e3BhcmFtc1swXX0gLz5cclxuXHJcbiAgICAgICAgICA8R2FtZWJvYXJkSW50ZXJmYWNlIFxyXG4gICAgICAgICAgICB7Li4uY29tbW9uUHJvcHN9XHJcbiAgICAgICAgICAgIHRva2VuPXtwYXJhbXNbMF19XHJcbiAgICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlcn0gLz5cclxuXHJcbiAgICAgICAgPE1vZGFsIGRhdGE9e3RoaXMuc3RhdGUubW9kYWx9IC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9LFxyXG5cclxuXHJcblxyXG5cclxuICBfb25HYW1lQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7Z2FtZU92ZXI6IEdhbWVTdG9yZS5nZXRTdGF0ZSgpLmdhbWVPdmVyfSk7XHJcbiAgfSxcclxuICBfb3Blbk1vZGFsKHR5cGUsIG1lc3NhZ2UpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBtb2RhbDogdGhpcy5zdGF0ZS5tb2RhbFxyXG4gICAgICAgIC5zZXQoJ29wZW4nLCB0cnVlKVxyXG4gICAgICAgIC5zZXQoJ21lc3NhZ2UnLCBtZXNzYWdlKVxyXG4gICAgICAgIC5zZXQoJ3R5cGUnLCB0eXBlKVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBfaGlkZU1vZGFsKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7bW9kYWw6IHRoaXMuc3RhdGUubW9kYWwuc2V0KCdvcGVuJywgZmFsc2UpfSk7XHJcbiAgfSxcclxuICBfYWNjZXB0UmVtYXRjaCgpIHtcclxuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgaW8uZW1pdCgncmVtYXRjaC1hY2NlcHQnLCB7XHJcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXHJcbiAgICAgIHRpbWU6IHBhcmFtc1sxXSAqIDYwLFxyXG4gICAgICBpbmM6IHBhcmFtc1syXVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9oaWRlTW9kYWwoKTtcclxuICB9LFxyXG4gIF9kZWNsaW5lUmVtYXRjaCgpIHtcclxuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgaW8uZW1pdCgncmVtYXRjaC1kZWNsaW5lJywge1xyXG4gICAgICB0b2tlbjogcGFyYW1zWzBdXHJcbiAgICB9KTtcclxuICAgIHRoaXMuX2hpZGVNb2RhbCgpO1xyXG4gIH0sXHJcbiAgX3RvZ2dsZVNvdW5kcyhlKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgc291bmRzRW5hYmxlZDogIXRoaXMuc3RhdGUuc291bmRzRW5hYmxlZFxyXG4gICAgfSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xyXG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xyXG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XHJcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XHJcbmltcG9ydCBDaGVzc2JvYXJkIGZyb20gJy4vQ2hlc3Nib2FyZCc7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkJztcclxuaW1wb3J0IENhcHR1cmVkUGllY2VzIGZyb20gJy4vQ2FwdHVyZWRQaWVjZXMnO1xyXG5pbXBvcnQgVGFibGVPZk1vdmVzIGZyb20gJy4vVGFibGVPZk1vdmVzJztcclxuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xyXG5cclxuLyogdGhlIHN0YXRlIG9mIHRoZSBnYW1lYm9hcmQgaXMgbWFuYWdlZCBieSBHYW1lU3RvcmUgKi9cclxuXHJcbmNvbnN0IEdhbWVib2FyZEludGVyZmFjZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcblx0cHJvcFR5cGVzOiB7XHJcblxyXG5cdH0sXHJcblx0bWl4aW5zOiBbb25HYW1lQ2hhbmdlXSxcdFx0Ly8gdGhpcyBtaXhpbiBpcyByZXNwb25zaWJsZSBmb3IgZHluYW1pY2FsbHkgY2hhbmdpbmcgdGhlIHN0YXRlIG9mIEdhbWVib2FyZEludGVyZmFjZVxyXG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcclxuXHRcdHJldHVybiBHYW1lU3RvcmUuZ2V0U3RhdGUoKTtcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcygpIHtcclxuXHJcblx0fSxcclxuXHRjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XHJcblxyXG5cdH0sXHJcblx0cmVuZGVyKCkge1xyXG5cdFx0Y29uc3Qge3Byb21vdGlvbiwgdHVybiwgZ2FtZU92ZXIsIGNoZWNrfSA9IHRoaXMuc3RhdGVcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJib2FyZC1tb3Zlcy13cmFwcGVyXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cclxuXHRcdFx0XHQ8ZGl2IGlkPVwiYm9hcmQtd3JhcHBlclwiPlxyXG5cclxuXHRcdFx0XHRcdDxwPllvdSBhcmU6IHt0aGlzLnByb3BzLmNvbG9yPT09J3doaXRlJyA/ICdXaGl0ZScgOiAnQmxhY2snfTwvcD5cclxuXHRcdFx0XHRcdDxDYXB0dXJlZFBpZWNlcyAvPlxyXG5cclxuXHRcdFx0XHRcdDxCb2FyZCBzaXplPXs2fVxyXG5cdFx0XHRcdFx0XHR7Li4ub21pdCh0aGlzLnByb3BzLCAnZ2FtZU92ZXInKX1cclxuXHRcdFx0XHRcdFx0Z2FtZU92ZXI9e2dhbWVPdmVyLmdldCgnc3RhdHVzJyl9IC8+XHJcblxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJmZWVkYmFja1wiPlxyXG5cdFx0XHRcdFx0eyFnYW1lT3Zlci5nZXQoJ3N0YXR1cycpID9cclxuXHRcdFx0XHRcdFx0PHNwYW4+XHJcblx0XHRcdFx0XHRcdFx0e2Ake3R1cm49PT0ndycgPyAnV2hpdGUnIDogJ0JsYWNrJ30gdG8gbW92ZS5gfVxyXG5cdFx0XHRcdFx0XHQ8L3NwYW4+IDpcclxuXHRcdFx0XHRcdFx0PHN0cm9uZz5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+XHJcblx0XHRcdFx0XHRcdFx0ICB7Z2FtZU92ZXIuZ2V0KCd3aW5uZXInKSA9PT0gJ1doaXRlJyA/ICdGJyA6ICdmJ31cclxuXHRcdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0e3RoaXMuX2dldEdhbWVPdmVyTWVzc2FnZShnYW1lT3Zlci5nZXQoJ3dpbm5lcicpKX1cclxuXHRcdFx0XHRcdFx0PC9zdHJvbmc+XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9LFxyXG5cclxuXHRfb25HYW1lQ2hhbmdlKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZShHYW1lU3RvcmUuZ2V0U3RhdGUoKSk7XHJcblx0fSxcclxuXHJcblx0X2dldEdhbWVPdmVyTWVzc2FnZSh3aW5uZXIpIHtcclxuXHRcdHJldHVybiBgJHt3aW5uZXJ9IHdpbnMhYDtcclxuXHR9XHJcblxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZEludGVyZmFjZTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcclxuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5cclxuY29uc3QgTW9kYWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcclxuICB9LFxyXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW5dLFxyXG5cclxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICBjb25zdCBpc09wZW4gPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCdvcGVuJyk7XHJcblxyXG4gICAgaWYgKGlzT3BlbilcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5ZG93bik7XHJcbiAgICBlbHNlXHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleWRvd24pO1xyXG4gIH0sXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcclxuICAgIGNvbnN0IHR5cGUgPSBkYXRhLmdldCgndHlwZScpO1xyXG4gICAgY29uc3QgY2FsbGJhY2tzID0gZGF0YS5nZXQoJ2NhbGxiYWNrcycpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCh7XHJcbiAgICAgICAgICAgICAnbW9kYWwtbWFzayc6IHRydWUsXHJcbiAgICAgICAgICAgICAnaGlkZGVuJzogIWRhdGEuZ2V0KCdvcGVuJylcclxuICAgICAgICAgICB9KX1cclxuICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9oaWRlTW9kYWx9PlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgPHN0cm9uZz5Fc2M6IDwvc3Ryb25nPlxyXG4gICAgICAgICAgPHNwYW4+e3R5cGUgPT09ICdpbmZvJyA/ICdPSycgOiAnRGVjbGluZSd9PC9zcGFuPlxyXG4gICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICA8c3Ryb25nPkVudGVyOiA8L3N0cm9uZz5cclxuICAgICAgICAgIDxzcGFuPnt0eXBlID09PSAnaW5mbycgPyAnT0snIDogJ0FjY2VwdCd9PC9zcGFuPlxyXG4gICAgICAgIDwvcD5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiXHJcbiAgICAgICAgICAgICBvbkNsaWNrPXtlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9PlxyXG4gICAgICAgICAgPHA+e2RhdGEuZ2V0KCdtZXNzYWdlJyl9PC9wPlxyXG5cclxuICAgICAgICAgIHt0eXBlID09PSAnaW5mbycgPyBcclxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIG9rXCJcclxuICAgICAgICAgICAgICAgb25DbGljaz17Y2FsbGJhY2tzLmhpZGV9PlxyXG4gICAgICAgICAgICAgIE9LXHJcbiAgICAgICAgICAgIDwvYT4gOiBbXHJcblxyXG4gICAgICAgICAgICA8YSBrZXk9XCJhXCJcclxuICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuXCJcclxuICAgICAgICAgICAgICAgc3R5bGU9e3tsZWZ0OiAnNGVtJ319XHJcbiAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NhbGxiYWNrcy5hY2NlcHR9PlxyXG4gICAgICAgICAgICAgIEFjY2VwdFxyXG4gICAgICAgICAgICA8L2E+LFxyXG4gICAgICAgICAgICA8YSBrZXk9XCJiXCJcclxuICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi0tcmVkXCJcclxuICAgICAgICAgICAgICAgc3R5bGU9e3tyaWdodDogJzRlbSd9fVxyXG4gICAgICAgICAgICAgICBvbkNsaWNrPXtjYWxsYmFja3MuZGVjbGluZX0+XHJcbiAgICAgICAgICAgICAgRGVjbGluZVxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfSxcclxuICBfb25LZXlkb3duKGUpIHtcclxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCd0eXBlJyk7XHJcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCdjYWxsYmFja3MnKTtcclxuXHJcbiAgICBpZiAodHlwZSA9PT0gJ2luZm8nKSB7XHJcbiAgICAgIGlmIChlLndoaWNoID09PSAxMyB8fCBlLndoaWNoID09PSAyNykge1xyXG4gICAgICAgIGNhbGxiYWNrcy5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29mZmVyJykge1xyXG4gICAgICBpZiAoZS53aGljaCA9PT0gMTMpIHtcclxuICAgICAgICBjYWxsYmFja3MuYWNjZXB0KCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZS53aGljaCA9PT0gMjcpIHtcclxuICAgICAgICBjYWxsYmFja3MuZGVjbGluZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBfaGlkZU1vZGFsKCkge1xyXG4gICAgdGhpcy5wcm9wcy5kYXRhLmdldCgnY2FsbGJhY2tzJykuaGlkZSgpO1xyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RhbDsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcclxuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcclxuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcclxuXHJcbmNvbnN0IFRhYmxlT2ZNb3ZlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBcclxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluLCBvbkdhbWVDaGFuZ2VdLFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtb3ZlczogR2FtZVN0b3JlLmdldE1vdmVzKClcclxuICAgIH07XHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGFibGUgaWQ9XCJtb3Zlc1wiIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XHJcbiAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICA8dGg+VGFibGUgb2YgbW92ZXM8L3RoPlxyXG4gICAgICAgICAgPC90cj5cclxuICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgIHt0aGlzLnN0YXRlLm1vdmVzLm1hcCgocm93LCBpKSA9PiAoXHJcbiAgICAgICAgICAgIDx0ciBrZXk9e2l9PlxyXG4gICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgIDxzdHJvbmc+e2Ake2kgKyAxfS5gfTwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAge3Jvdy5tYXAoKG1vdmUsIGopID0+IChcclxuICAgICAgICAgICAgICAgIDx0ZCBrZXk9e2p9PlxyXG4gICAgICAgICAgICAgICAgICA8c3Bhbj57bW92ZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICkpLnRvQXJyYXkoKX1cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICkpLnRvQXJyYXkoKX1cclxuICAgICAgICA8L3Rib2R5PlxyXG4gICAgICA8L3RhYmxlPlxyXG4gICAgKTtcclxuICB9LFxyXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbW92ZXM6IEdhbWVTdG9yZS5nZXRNb3ZlcygpXHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFibGVPZk1vdmVzOyIsImltcG9ydCBrZXlNaXJyb3IgZnJvbSAncmVhY3QvbGliL2tleU1pcnJvcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBrZXlNaXJyb3Ioe1xyXG4gIFRPR0dMRV9WSVNJQklMSVRZOiBudWxsLFxyXG4gIFNVQk1JVF9NRVNTQUdFOiBudWxsXHJcbn0pOyIsImNvbnN0IENoZXNzUGllY2VzID0ge1xyXG4gIC8vIGtleTogcGllY2UgZnJvbSBGRU4sIHZhbHVlOiBwaWVjZSBmcm9tIFNtYXJ0IFJlZ3VsYXIgY2hlc3MgZm9udFxyXG4gIC8vIHdoaXRlIHBpZWNlc1xyXG4gICdLJzogJ0YnLFxyXG4gICdRJzogJ0UnLFxyXG4gICdSJzogJ0QnLFxyXG4gICdCJzogJ0MnLFxyXG4gICdOJzogJ0InLFxyXG4gICdQJzogJ0EnLFxyXG4gIC8vIGJsYWNrIHBpZWNlc1xyXG4gICdrJzogJ2YnLFxyXG4gICdxJzogJ2UnLFxyXG4gICdyJzogJ2QnLFxyXG4gICdiJzogJ2MnLFxyXG4gICduJzogJ2InLFxyXG4gICdwJzogJ2EnLFxyXG4gIC8vIGVtcHR5IHNxdWFyZVxyXG4gICctJzogdW5kZWZpbmVkXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGVzc1BpZWNlczsiLCJpbXBvcnQga2V5TWlycm9yIGZyb20gJ3JlYWN0L2xpYi9rZXlNaXJyb3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQga2V5TWlycm9yKHtcclxuICBNQUtFX01PVkU6IG51bGwsXHJcbiAgU0hPV19NT1ZFUzogbnVsbCxcclxuICBSRU1BVENIOiBudWxsLFxyXG4gIERSQVc6IG51bGwsXHJcbiAgR0FNRV9PVkVSOiBudWxsLFxyXG4gIENIQU5HRV9QUk9NT1RJT046IG51bGxcclxufSk7IiwiaW1wb3J0IHtEaXNwYXRjaGVyfSBmcm9tICdmbHV4JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24obmV3IERpc3BhdGNoZXIoKSwge1xyXG4gIC8vIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gVGhlIGRhdGEgY29taW5nIGZyb20gdGhlIHZpZXcuXHJcbiAgaGFuZGxlVmlld0FjdGlvbjogZnVuY3Rpb24oYWN0aW9uKSB7XHJcbiAgICB0aGlzLmRpc3BhdGNoKHtcclxuICAgICAgc291cmNlOiAnVklFV19BQ1RJT04nLFxyXG4gICAgICBhY3Rpb246IGFjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG59KTsiLCJjb25zdCBUaWxlQWN0aW9ucyA9IHtcclxuICAgIFwiQXNzYXNzaW5cIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXAgc2xpZGVcIixcclxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wIHNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJqdW1wIHNsaWRlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcImp1bXAgc2xpZGVcIixcclxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wIHNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wIHNsaWRlXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJCb3dtYW5cIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcInN0cmlrZVwiLFxyXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcInN0cmlrZVwiLFxyXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcInN0cmlrZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQ2hhbXBpb25cIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlstMiwwXVwiOiBcImp1bXBcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJiYWNrXCI6IHtcclxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJzdHJpa2VcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcInN0cmlrZVwiLFxyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlstMiwwXVwiOiBcImp1bXBcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkRyYWdvb25cIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwic3RyaWtlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsxLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwic2xpZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkR1Y2hlc3NcIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJiYWNrXCI6IHtcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJEdWtlXCI6IHtcclxuICAgICAgICBcImZyb250XCI6IHtcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwic2xpZGVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJiYWNrXCI6IHtcclxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwic2xpZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkZvb3RtYW5cIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIktuaWdodFwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWy0xLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbMSwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkxvbmdib3dtYW5cIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTNdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTWFyc2hhbGxcIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk9yYWNsZVwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJQaWtlbWFuXCI6IHtcclxuICAgICAgICBcImZyb250XCI6IHtcclxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJiYWNrXCI6IHtcclxuICAgICAgICAgICAgXCJbLTEsLTJdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUHJpZXN0XCI6IHtcclxuICAgICAgICBcImZyb250XCI6IHtcclxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwic2xpZGVcIixcclxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJzbGlkZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJqdW1wXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSYW5nZXJcIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlstMiwtMV1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsLTFdXCI6IFwianVtcFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsxLDJdXCI6IFwianVtcFwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiU2VlclwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlstMiwwXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWy0yLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJXaXphcmRcIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWy0yLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLDJdXCI6IFwianVtcFwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLy8gdmFyIG5ld1VuaXRzID0ge307XHJcbi8vIGZvciAodmFyIHVuaXRLZXkgaW4gVGlsZUFjdGlvbnMpIHtcclxuLy8gICAgIHZhciB1bml0ID0gVGlsZUFjdGlvbnNbdW5pdEtleV07XHJcbi8vICAgICB2YXIgbmV3U2lkZXMgPSB7fTtcclxuLy8gICAgIGZvciAodmFyIHNpZGVLZXkgaW4gdW5pdCkge1xyXG4vLyAgICAgICAgIHZhciBkaXIgPSB1bml0W3NpZGVLZXldO1xyXG4vLyAgICAgICAgIHZhciBuZXdEaXIgPSB7fTtcclxuLy8gICAgICAgICBmb3IgKHZhciBjb29yZHMgaW4gZGlyKSB7XHJcbi8vICAgICAgICAgICAgIHZhciBwYXJzZWQgPSBKU09OLnBhcnNlKGNvb3Jkcyk7XHJcbi8vICAgICAgICAgICAgIHZhciBuZXdDb29yZHMgPSBKU09OLnN0cmluZ2lmeShbcGFyc2VkWzFdLCBwYXJzZWRbMF1dKTtcclxuLy8gICAgICAgICAgICAgbmV3RGlyW25ld0Nvb3Jkc10gPSBkaXJbY29vcmRzXTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgbmV3U2lkZXNbc2lkZUtleV0gPSBuZXdEaXI7XHJcbi8vICAgICB9XHJcbi8vICAgICBuZXdVbml0c1t1bml0S2V5XSA9IG5ld1NpZGVzO1xyXG4vLyB9XHJcbi8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG5ld1VuaXRzKSk7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaWxlQWN0aW9ucztcclxuIiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iajsgfTtcblxudmFyIGlvID0gX2ludGVyb3BSZXF1aXJlKHJlcXVpcmUoXCJzb2NrZXQuaW8tY2xpZW50XCIpKTtcblxudmFyIG9zID0gX2ludGVyb3BSZXF1aXJlKHJlcXVpcmUoXCJvc1wiKSk7XG5cbnZhciBob3N0bmFtZSA9IG9zLmhvc3RuYW1lKCk7XG5cbnZhciBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAxMzM3O1xudmFyIE9SSUdJTiA9IGhvc3RuYW1lLmluZGV4T2YoXCJoZXJva3VhcHAuY29tXCIpICE9PSAtMSA/IGhvc3RuYW1lIDogaG9zdG5hbWUgKyBcIjpcIiArIHBvcnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gaW8uY29ubmVjdChPUklHSU4pO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklrTTZMMVZ6WlhKekwwcGhlUzlFWlhOcmRHOXdMMHBUTDNOb2IyZDFiaTEyTWk5emNtTXZhbk12YVc4dWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTEZsQlFWa3NRMEZCUXpzN096dEpRVVZPTEVWQlFVVXNNa0pCUVUwc2EwSkJRV3RDT3p0SlFVTXhRaXhGUVVGRkxESkNRVUZQTEVsQlFVazdPMEZCUTNCQ0xFbEJRVTBzVVVGQlVTeEhRVUZITEVWQlFVVXNRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJRenM3UVVGRkwwSXNTVUZCVFN4SlFVRkpMRWRCUVVjc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVsQlFVa3NTVUZCU1N4RFFVRkRPMEZCUTNSRExFbEJRVTBzVFVGQlRTeEhRVUZITEZGQlFWRXNRMEZCUXl4UFFVRlBMRU5CUVVNc1pVRkJaU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVkQlFVY3NVVUZCVVN4SFFVRkhMRkZCUVZFc1IwRkJReXhIUVVGSExFZEJRVU1zU1VGQlNTeERRVUZET3p0cFFrRkZlRVVzUlVGQlJTeERRVUZETEU5QlFVOHNRMEZCUXl4TlFVRk5MRU5CUVVNaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2NseHVYSEpjYm1sdGNHOXlkQ0JwYnlCbWNtOXRJQ2R6YjJOclpYUXVhVzh0WTJ4cFpXNTBKenRjY2x4dWFXMXdiM0owSUc5eklHWnliMjBnSUZ3aWIzTmNJanRjY2x4dVkyOXVjM1FnYUc5emRHNWhiV1VnUFNCdmN5NW9iM04wYm1GdFpTZ3BPMXh5WEc1Y2NseHVZMjl1YzNRZ2NHOXlkQ0E5SUhCeWIyTmxjM011Wlc1MkxsQlBVbFFnZkh3Z01UTXpOenRjY2x4dVkyOXVjM1FnVDFKSlIwbE9JRDBnYUc5emRHNWhiV1V1YVc1a1pYaFBaaWduYUdWeWIydDFZWEJ3TG1OdmJTY3BJQ0U5UFNBdE1TQS9JR2h2YzNSdVlXMWxJRG9nYUc5emRHNWhiV1VyWENJNlhDSXJjRzl5ZER0Y2NseHVYSEpjYm1WNGNHOXlkQ0JrWldaaGRXeDBJR2x2TG1OdmJtNWxZM1FvVDFKSlIwbE9LVHNpWFgwPSIsImNvbnN0IG1heWJlUmV2ZXJzZSA9IHtcclxuICBfbWF5YmVSZXZlcnNlKGl0ZXJhYmxlLCBjb2xvcikge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY29sb3IgPT09IChjb2xvciB8fCAnYmxhY2snKSA/XHJcbiAgICAgIGl0ZXJhYmxlLnJldmVyc2UoKSA6IGl0ZXJhYmxlO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1heWJlUmV2ZXJzZTsiLCJpbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xyXG5cclxuY29uc3Qgb25HYW1lQ2hhbmdlID0ge1xyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgR2FtZVN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xyXG4gIH0sXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICBHYW1lU3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9uR2FtZUNoYW5nZTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInO1xyXG5pbXBvcnQge0V2ZW50RW1pdHRlcjIgYXMgRXZlbnRFbWl0dGVyfSBmcm9tICdldmVudGVtaXR0ZXIyJztcclxuaW1wb3J0IENoYXRDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0NoYXRDb25zdGFudHMnO1xyXG5pbXBvcnQge0xpc3QsIE1hcH0gZnJvbSAnaW1tdXRhYmxlJztcclxuXHJcbmNvbnN0IENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xyXG4gIFxyXG52YXIgX21lc3NhZ2VzID0gTGlzdCgpO1xyXG52YXIgX3Vuc2VlbkNvdW50ID0gMDtcclxudmFyIF9pc0NoYXRIaWRkZW4gPSB0cnVlO1xyXG5cclxuY29uc3QgQ2hhdFN0b3JlID0gT2JqZWN0LmFzc2lnbih7fSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xyXG4gIGdldFN0YXRlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWVzc2FnZXM6IF9tZXNzYWdlcyxcclxuICAgICAgdW5zZWVuQ291bnQ6IF91bnNlZW5Db3VudCxcclxuICAgICAgaXNDaGF0SGlkZGVuOiBfaXNDaGF0SGlkZGVuXHJcbiAgICB9O1xyXG4gIH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVWaXNpYmlsaXR5KCkge1xyXG4gIF9pc0NoYXRIaWRkZW4gPSAhX2lzQ2hhdEhpZGRlbjtcclxuICBfdW5zZWVuQ291bnQgPSAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdWJtaXRNZXNzYWdlKG1lc3NhZ2UsIGNsYXNzTmFtZSwgcmVjZWl2ZWQpIHtcclxuICBfbWVzc2FnZXMgPSBfbWVzc2FnZXMucHVzaChNYXAoe1xyXG4gICAgbWVzc2FnZTogbWVzc2FnZSxcclxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lXHJcbiAgfSkpO1xyXG5cclxuICBpZiAocmVjZWl2ZWQgJiYgX2lzQ2hhdEhpZGRlbikge1xyXG4gICAgX3Vuc2VlbkNvdW50ICs9IDE7XHJcbiAgfVxyXG59XHJcblxyXG5BcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKHBheWxvYWQgPT4ge1xyXG4gIGNvbnN0IGFjdGlvbiA9IHBheWxvYWQuYWN0aW9uO1xyXG5cclxuICBzd2l0Y2ggKGFjdGlvbi5hY3Rpb25UeXBlKSB7XHJcbiAgICBjYXNlIENoYXRDb25zdGFudHMuVE9HR0xFX1ZJU0lCSUxJVFk6XHJcbiAgICAgIHRvZ2dsZVZpc2liaWxpdHkoKTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSBDaGF0Q29uc3RhbnRzLlNVQk1JVF9NRVNTQUdFOlxyXG4gICAgICBzdWJtaXRNZXNzYWdlKGFjdGlvbi5tZXNzYWdlLCBhY3Rpb24uY2xhc3NOYW1lLCBhY3Rpb24ucmVjZWl2ZWQpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIENoYXRTdG9yZS5lbWl0KENIQU5HRV9FVkVOVCk7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hhdFN0b3JlOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XHJcbmltcG9ydCB7RXZlbnRFbWl0dGVyMiBhcyBFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50ZW1pdHRlcjInO1xyXG5pbXBvcnQgR2FtZUNvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvR2FtZUNvbnN0YW50cyc7XHJcbmltcG9ydCBDaGVzc1BpZWNlcyBmcm9tICcuLi9jb25zdGFudHMvQ2hlc3NQaWVjZXMnO1xyXG5pbXBvcnQge0NoZXNzfSBmcm9tICdjaGVzcy5qcyc7XHJcbmltcG9ydCB7TGlzdCwgTWFwLCBPcmRlcmVkTWFwLCBTZXR9IGZyb20gJ2ltbXV0YWJsZSc7XHJcbmltcG9ydCBiZWhhdmlvciBmcm9tICcuLi9nYW1lL2JlaGF2aW9yJztcclxuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xyXG5cclxuY29uc3QgQ0hBTkdFX0VWRU5UID0gJ2NoYW5nZSc7XHJcbmNvbnN0IE1PVkVfRVZFTlQgPSAnbmV3LW1vdmUnO1xyXG5cclxudmFyIF9nYW1lT3ZlcjtcclxudmFyIF9jYXB0dXJlZFBpZWNlcztcclxudmFyIF9tb3ZlcztcclxudmFyIF9tb3ZlZDtcclxudmFyIF90dXJuO1xyXG52YXIgX2NoZWNrO1xyXG52YXIgX2xhc3RNb3ZlO1xyXG52YXIgX2NoZXNzO1xyXG5cclxudmFyIF9ib2FyZCwgX2xpZ2h0dXAsIF9zdHJpa2UsIF9kcm9wLCBfc2VsZWN0ZWQsIF9kcmF3biA9IFtdLCBfcmVzdWx0LCBfZGVjaywgX3BlbmRpbmdEcmF3O1xyXG5cclxuXHJcbnNldEluaXRpYWxTdGF0ZSgpO1xyXG5cclxudmFyIEdhbWVTdG9yZSA9IE9iamVjdC5hc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcclxuICAgIGFkZENoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihjYikge1xyXG4gICAgICB0aGlzLm9uKENIQU5HRV9FVkVOVCwgY2IpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24oY2IpIHtcclxuICAgICAgdGhpcy5yZW1vdmVDaGFuZ2VMaXN0ZW5lcihDSEFOR0VfRVZFTlQsIGNiKTtcclxuICAgIH0sXHJcbiAgICBnZXRTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnYW1lT3ZlcjogX2dhbWVPdmVyLFxyXG4gICAgICAgICAgICB0dXJuOiBfdHVybixcclxuICAgICAgICAgICAgY2hlY2s6IF9jaGVjayxcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGdldENhcHR1cmVkUGllY2VzKCkge1xyXG4gICAgICAgIHJldHVybiBfY2FwdHVyZWRQaWVjZXM7XHJcbiAgICB9LFxyXG4gICAgZ2V0TW92ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9tb3ZlcztcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0R2FtZWJvYXJkU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYm9hcmQ6IF9ib2FyZCxcclxuICAgICAgICAgICAgbGlnaHR1cDogX2xpZ2h0dXAsXHJcbiAgICAgICAgICAgIHN0cmlrZTogX3N0cmlrZSxcclxuICAgICAgICAgICAgZHJvcDogX2Ryb3AsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiBfc2VsZWN0ZWQsXHJcbiAgICAgICAgICAgIGRyYXdVbml0OiBfcmVzdWx0LFxyXG4gICAgICAgICAgICB0dXJuOiBfdHVybixcclxuICAgICAgICAgICAgbW92ZWQ6IF9tb3ZlZCxcclxuICAgICAgICAgICAgZGVjazogX2RlY2ssXHJcbiAgICAgICAgICAgIHBlbmRpbmdEcmF3OiBfcGVuZGluZ0RyYXcsXHJcbiAgICAgICAgICAgIGdhbWVvdmVyOiBfZ2FtZU92ZXJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxufSk7XHJcblxyXG5cclxuZnVuY3Rpb24gc2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgX2dhbWVPdmVyID0gTWFwKHtcclxuICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgIHR5cGU6IG51bGwsXHJcbiAgICAgICAgd2lubmVyOiBudWxsXHJcbiAgICB9KTtcclxuICAgIF9jYXB0dXJlZFBpZWNlcyA9IE9yZGVyZWRNYXAoW1xyXG4gICAgICAgIFsndycsIExpc3QoKV0sXHJcbiAgICAgICAgWydiJywgTGlzdCgpXVxyXG4gICAgXSk7XHJcbiAgICBfbW92ZXMgPSBMaXN0KCk7XHJcbiAgICBfdHVybiA9ICd3JztcclxuICAgIF9tb3ZlZCA9IGZhbHNlO1xyXG4gICAgX2NoZWNrID0gZmFsc2U7XHJcbiAgICBfbGFzdE1vdmUgPSBNYXAoKTtcclxuICAgIF9zZWxlY3RlZCA9IG51bGw7XHJcbiAgICBfcGVuZGluZ0RyYXcgPSBudWxsO1xyXG4gICAgLy9fY2hlc3MgPSBuZXcgQ2hlc3MoKTtcclxuXHJcbiAgICBfbGlnaHR1cCA9IHt9O1xyXG4gICAgX3N0cmlrZSA9IHt9O1xyXG4gICAgX2Ryb3AgPSB7fTtcclxuXHJcbiAgICBfYm9hcmQgPSB7XHJcbiAgICAgICAgLy8gJ1sxLCAyXSc6IHt1bml0OiAnV2l6YXJkJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxyXG4gICAgICAgIC8vICdbMiwgMF0nOiB7dW5pdDogJ0R1a2UnLCBjb2xvcjogJ2JsYWNrJywgc2lkZTogJ2Zyb250J30sXHJcbiAgICAgICAgLy8gJ1syLCAxXSc6IHt1bml0OiAnUGlrZW1hbicsIGNvbG9yOiAnYmxhY2snLCBzaWRlOiAnZnJvbnQnfSxcclxuICAgICAgICAvLyAnWzEsIDNdJzoge3VuaXQ6ICdBc3Nhc3NpbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnZnJvbnQnfSxcclxuICAgICAgICAvLyAnWzIsIDRdJzoge3VuaXQ6ICdMb25nYm93bWFuJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdiYWNrJ30sXHJcbiAgICAgICAgLy8gJ1szLCA1XSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnYmFjayd9LFxyXG4gICAgICAgIC8vICdbNCwgNV0nOiB7dW5pdDogJ0Zvb3RtYW4nLCBjb2xvcjogJ3doaXRlJywgc2lkZTogJ2JhY2snfSxcclxuICAgICAgICAvLyAnWzQsIDRdJzoge3VuaXQ6ICdSYW5nZXInLCBjb2xvcjogJ2JsYWNrJywgc2lkZTogJ2JhY2snfSxcclxuICAgICAgICAvLyAnWzMsIDRdJzoge3VuaXQ6ICdEcmFnb29uJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9LFxyXG4gICAgICAgIC8vICdbMSwgNV0nOiB7dW5pdDogJ0R1a2UnLCBjb2xvcjogJ3doaXRlJywgc2lkZTogJ2Zyb250J31cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgJ1sxLCAwXSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnYmxhY2snLCBzaWRlOiAnZnJvbnQnfSxcclxuICAgICAgICAnWzIsIDBdJzoge3VuaXQ6ICdEdWtlJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxyXG4gICAgICAgICdbMywgMF0nOiB7dW5pdDogJ0Zvb3RtYW4nLCBjb2xvcjogJ2JsYWNrJywgc2lkZTogJ2Zyb250J30sXHJcbiAgICAgICAgJ1syLCA1XSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnZnJvbnQnfSxcclxuICAgICAgICAnWzMsIDVdJzoge3VuaXQ6ICdEdWtlJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9LFxyXG4gICAgICAgICdbNCwgNV0nOiB7dW5pdDogJ0Zvb3RtYW4nLCBjb2xvcjogJ3doaXRlJywgc2lkZTogJ2Zyb250J30sXHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIF9kZWNrID0gWy4uLk9iamVjdC5rZXlzKG9taXQoYmVoYXZpb3IsICdEdWtlJykpLCAnUGlrZW1hbicsICdQaWtlbWFuJ107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vdmVUb0JvYXJkKCkge1xyXG5cclxuXHJcbiAgICBpZiAoZW1pdE1vdmUpIHtcclxuICAgICAgICBHYW1lU3RvcmUuZW1pdChNT1ZFX0VWRU5ULCB7XHJcbiAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgY2FwdHVyZTogY2FwdHVyZSxcclxuICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgYm9hcmQ6IF9ib2FyZFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVCb2FyZChmcm9tLCB0bywgdHlwZSkge1xyXG5cclxuICAgIC8vIGlmIGNhbGxlZCBieSBhIG1vdmUgZXZlbnQsIHRoZSBmcm9tIHBhcmFtZXRlciB3aWxsIGJlIGEgcG9zaXRpb24gb24gdGhlIGJvYXJkIChpLmUuIGEgc3RyaW5nKVxyXG4gICAgLy8gaWYgY2FsbGVkIGJ5IGEgZHJhdyBldmVudCwgdGhlIGZyb20gcGFyYW1ldGVyIHdpbGwgYmUgYW4gYWN0dWFsIHVuaXQgKGkuZS4gYW4gb2JqZWN0KVxyXG5cclxuICAgIGlmICh0eXBlb2YgZnJvbSA9PT0gJ29iamVjdCcpIHsgICAgICAgICAvLyBkcmF3IGV2ZW50XHJcbiAgICAgICAgX2JvYXJkW3RvXSA9IGZyb207XHJcbiAgICAgICAgX2Ryb3AgPSB7fTtcclxuICAgICAgICBfcGVuZGluZ0RyYXcgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGVsc2UgaWYgKHR5cGVvZiBmcm9tID09PSAnc3RyaW5nJykgeyAgICAvLyBtb3ZlIGV2ZW50XHJcblxyXG4gICAgICAgIGxldCB1bml0ID0gX2JvYXJkW2Zyb21dO1xyXG5cclxuICAgICAgICB1bml0LnNpZGUgPSAodW5pdC5zaWRlID09PSAnZnJvbnQnKSA/ICdiYWNrJyA6ICdmcm9udCc7XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09PSAnbW92ZScpIHtcclxuICAgICAgICAgIF9ib2FyZFtmcm9tXSA9IG51bGw7XHJcbiAgICAgICAgICBfYm9hcmRbdG9dID0gdW5pdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmlrZScpIHtcclxuICAgICAgICAgIF9ib2FyZFt0b10gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBfc2VsZWN0ZWQgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBfYm9hcmQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VNb3ZlKGZyb20sIHRvLCBjYXB0dXJlLCB0eXBlLCBlbWl0TW92ZSkge1xyXG4gICBcclxuICAgIHVwZGF0ZUJvYXJkKGZyb20sIHRvLCB0eXBlKTtcclxuXHJcbiAgICBfdHVybiA9IF90dXJuID09PSAndycgPyAnYicgOiAndyc7XHJcblxyXG4gICAgaWYgKGVtaXRNb3ZlKSB7XHJcbiAgICAgICAgR2FtZVN0b3JlLmVtaXQoTU9WRV9FVkVOVCwge1xyXG4gICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICB0bzogdG8sXHJcbiAgICAgICAgICAgIGNhcHR1cmU6IGNhcHR1cmUsXHJcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsICAgXHJcbiAgICAgICAgICAgIGdhbWVPdmVyOiBpc0R1a2VEZWFkKClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBkcmF3KCkge1xyXG4gICAgbGV0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKl9kZWNrLmxlbmd0aCk7XHJcbiAgICBfcGVuZGluZ0RyYXcgPSBfZGVjay5zcGxpY2UocmFuZG9tSW5kZXgsIDEpWzBdOyAgICAgICBcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0R1a2VEZWFkKCkge1xyXG4gICAgbGV0IGR1a2VzID0gT2JqZWN0LmtleXMoX2JvYXJkKS5maWx0ZXIocG9zID0+IF9ib2FyZFtwb3NdICYmIF9ib2FyZFtwb3NdLnVuaXQgPT09IFwiRHVrZVwiKVxyXG4gICAgICAgIC5tYXAocG9zID0+IF9ib2FyZFtwb3NdLmNvbG9yKTtcclxuICAgIHJldHVybiBkdWtlcy5sZW5ndGggPT09IDE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdhbWVPdmVyKG9wdGlvbnMpIHtcclxuICAgIF9nYW1lT3ZlciA9IF9nYW1lT3ZlclxyXG4gICAgICAgIC5zZXQoJ3N0YXR1cycsIHRydWUpXHJcbiAgICAgICAgLnNldCgnd2lubmVyJywgb3B0aW9ucy53aW5uZXIpXHJcbiAgICAgICAgLnNldCgndHlwZScsIG9wdGlvbnMudHlwZSk7XHJcbn1cclxuXHJcbkFwcERpc3BhdGNoZXIucmVnaXN0ZXIocGF5bG9hZCA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSBwYXlsb2FkLmFjdGlvbjtcclxuICAgIGxldCBlbWl0RXZlbnQgPSB0cnVlO1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uLmFjdGlvblR5cGUpIHtcclxuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuTUFLRV9NT1ZFOlxyXG4gICAgICAgICAgICBlbWl0RXZlbnQgPSBtYWtlTW92ZShcclxuICAgICAgICAgICAgICAgIGFjdGlvbi5mcm9tLCBhY3Rpb24udG8sIGFjdGlvbi5jYXB0dXJlLCBhY3Rpb24udHlwZSwgYWN0aW9uLmVtaXRNb3ZlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EUkFXOlxyXG4gICAgICAgICAgICBlbWl0RXZlbnQgPSBkcmF3KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuR0FNRV9PVkVSOlxyXG4gICAgICAgICAgICBnYW1lT3ZlcihhY3Rpb24ub3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuUkVNQVRDSDpcclxuICAgICAgICAgICAgc2V0SW5pdGlhbFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW1pdEV2ZW50KSB7XHJcbiAgICAgICAgR2FtZVN0b3JlLmVtaXQoQ0hBTkdFX0VWRU5UKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVTdG9yZTtcclxuIl19
