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
			{ className: cx({
					cellContainer: true }) },
			React.createElement(
				"div",
				{ className: cx(_defineProperty({
						selected: position === selected }, side, true)) },
				React.createElement(
					"div",
					{ className: cx(_defineProperty({
							tile: true }, side, true)),
						onDragOver: this._onDragOver,
						onDrop: this._onDrop
					},
					React.createElement("a", { className: cx((function () {
							var _cx3 = {
								unit: !!unit,
								litup: litup,
								strikable: strikable,
								canDrop: canDrop,
								opponent: color && color !== playerColor };

							_defineProperty(_cx3, side, true);

							_defineProperty(_cx3, unit, true);

							_defineProperty(_cx3, color, true);

							return _cx3;
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

// selected: position === selected

// selected: position === selected,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL3BsYXkuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvb3MtYnJvd3NlcmlmeS9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2tleU1pcnJvci5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvYWN0aW9ucy9DaGF0QWN0aW9ucy5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvYWN0aW9ucy9HYW1lQWN0aW9ucy5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DYXB0dXJlZFBpZWNlcy5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DaGF0LmpzIiwiQzovVXNlcnMvSmF5L0Rlc2t0b3AvSlMvc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0NoZXNzYm9hcmQuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2hlc3Nib2FyZEludGVyZmFjZS5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DbG9jay5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lQm9hcmQuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUhlYWRlci5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lSW50ZXJmYWNlLmpzIiwiQzovVXNlcnMvSmF5L0Rlc2t0b3AvSlMvc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0dhbWVib2FyZEludGVyZmFjZS5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9Nb2RhbC5qcyIsIkM6L1VzZXJzL0pheS9EZXNrdG9wL0pTL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9UYWJsZU9mTW92ZXMuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2NvbnN0YW50cy9DaGF0Q29uc3RhbnRzLmpzIiwiQzovVXNlcnMvSmF5L0Rlc2t0b3AvSlMvc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hlc3NQaWVjZXMuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2NvbnN0YW50cy9HYW1lQ29uc3RhbnRzLmpzIiwiQzovVXNlcnMvSmF5L0Rlc2t0b3AvSlMvc2hvZ3VuLXYyL3NyYy9qcy9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXIuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2dhbWUvYmVoYXZpb3IuanMiLCJzcmMvanMvaW8uanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL21peGlucy9tYXliZVJldmVyc2UuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL21peGlucy9vbkdhbWVDaGFuZ2UuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL3N0b3Jlcy9DaGF0U3RvcmUuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL3N0b3Jlcy9HYW1lU3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7UUFFTixVQUFVOztJQUNWLEtBQUssMkJBQU0sT0FBTzs7SUFDbEIsRUFBRSwyQkFBTSxNQUFNOztJQUNkLGFBQWEsMkJBQU0sNEJBQTRCOztBQUV0RCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2RSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFcEMsS0FBSyxDQUFDLE1BQU0sQ0FDVixvQkFBQyxhQUFhLElBQUMsRUFBRSxFQUFFLEVBQUUsQUFBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEFBQUMsR0FBRyxFQUN6QyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUNyQyxDQUFDOzs7QUNkRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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USxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FDN0IsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDbEM7O0FBRUQsYUFBYSxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sRUFBSTtBQUM5QixRQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQzlCLFFBQUksU0FBUyxHQUFHLElBQUksQ0FBQzs7QUFFckIsWUFBUSxNQUFNLENBQUMsVUFBVTtBQUNyQixhQUFLLGFBQWEsQ0FBQyxTQUFTO0FBQ3hCLHFCQUFTLEdBQUcsUUFBUSxDQUNoQixNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxRSxrQkFBTTs7QUFBQSxBQUVWLGFBQUssYUFBYSxDQUFDLElBQUk7QUFDbkIscUJBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQixrQkFBTTs7QUFBQSxBQUVWLGFBQUssYUFBYSxDQUFDLFNBQVM7QUFDeEIsb0JBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsa0JBQU07O0FBQUEsQUFFVixhQUFLLGFBQWEsQ0FBQyxPQUFPO0FBQ3RCLDJCQUFlLEVBQUUsQ0FBQztBQUNsQixrQkFBTTs7QUFBQSxBQUVWO0FBQ0ksbUJBQU8sSUFBSSxDQUFDO0FBQUEsS0FDbkI7O0FBRUQsUUFBSSxTQUFTLEVBQUU7QUFDWCxpQkFBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNoQztBQUNELFdBQU8sSUFBSSxDQUFDO0NBQ2YsQ0FBQyxDQUFDOztpQkFFWSxTQUFTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAnZXM2LXNoaW0nO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgaW8gZnJvbSAnLi9pbyc7XHJcbmltcG9ydCBHYW1lSW50ZXJmYWNlIGZyb20gJy4vY29tcG9uZW50cy9HYW1lSW50ZXJmYWNlJztcclxuXHJcbmxldCBwYXJhbXMgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgnL3BsYXkvJywgJycpLnNwbGl0KCcvJyk7XHJcbnBhcmFtc1sxXSA9IHBhcnNlSW50KHBhcmFtc1sxXSwgMTApO1xyXG5wYXJhbXNbMl0gPSBwYXJzZUludChwYXJhbXNbMl0sIDEwKTtcclxuXHJcblJlYWN0LnJlbmRlcihcclxuICA8R2FtZUludGVyZmFjZSBpbz17aW99IHBhcmFtcz17cGFyYW1zfSAvPixcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcclxuKTtcclxuXHJcbiIsImV4cG9ydHMuZW5kaWFubmVzcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdMRScgfTtcblxuZXhwb3J0cy5ob3N0bmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gbG9jYXRpb24uaG9zdG5hbWVcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gJyc7XG59O1xuXG5leHBvcnRzLmxvYWRhdmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXSB9O1xuXG5leHBvcnRzLnVwdGltZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDAgfTtcblxuZXhwb3J0cy5mcmVlbWVtID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBOdW1iZXIuTUFYX1ZBTFVFO1xufTtcblxuZXhwb3J0cy50b3RhbG1lbSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcbn07XG5cbmV4cG9ydHMuY3B1cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdIH07XG5cbmV4cG9ydHMudHlwZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdCcm93c2VyJyB9O1xuXG5leHBvcnRzLnJlbGVhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufTtcblxuZXhwb3J0cy5uZXR3b3JrSW50ZXJmYWNlc1xuPSBleHBvcnRzLmdldE5ldHdvcmtJbnRlcmZhY2VzXG49IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHt9IH07XG5cbmV4cG9ydHMuYXJjaCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdqYXZhc2NyaXB0JyB9O1xuXG5leHBvcnRzLnBsYXRmb3JtID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJ2Jyb3dzZXInIH07XG5cbmV4cG9ydHMudG1wZGlyID0gZXhwb3J0cy50bXBEaXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICcvdG1wJztcbn07XG5cbmV4cG9ydHMuRU9MID0gJ1xcbic7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IHRydWU7XG4gICAgdmFyIGN1cnJlbnRRdWV1ZTtcbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgdmFyIGkgPSAtMTtcbiAgICAgICAgd2hpbGUgKCsraSA8IGxlbikge1xuICAgICAgICAgICAgY3VycmVudFF1ZXVlW2ldKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xufVxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICBxdWV1ZS5wdXNoKGZ1bik7XG4gICAgaWYgKCFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNSBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuXG5mdW5jdGlvbiBjbGFzc05hbWVzKCkge1xuXHR2YXIgY2xhc3NlcyA9ICcnO1xuXHR2YXIgYXJnO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0YXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdGlmICghYXJnKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBhcmcgfHwgJ251bWJlcicgPT09IHR5cGVvZiBhcmcpIHtcblx0XHRcdGNsYXNzZXMgKz0gJyAnICsgYXJnO1xuXHRcdH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcblx0XHRcdGNsYXNzZXMgKz0gJyAnICsgY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdH0gZWxzZSBpZiAoJ29iamVjdCcgPT09IHR5cGVvZiBhcmcpIHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0aWYgKCFhcmcuaGFzT3duUHJvcGVydHkoa2V5KSB8fCAhYXJnW2tleV0pIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjbGFzc2VzICs9ICcgJyArIGtleTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGNsYXNzZXMuc3Vic3RyKDEpO1xufVxuXG4vLyBzYWZlbHkgZXhwb3J0IGNsYXNzTmFtZXMgZm9yIG5vZGUgLyBicm93c2VyaWZ5XG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xufVxuXG4vLyBzYWZlbHkgZXhwb3J0IGNsYXNzTmFtZXMgZm9yIFJlcXVpcmVKU1xuaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHR9KTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ0ludmFyaWFudCBWaW9sYXRpb246ICcgK1xuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGtleU1pcnJvclxuICogQHR5cGVjaGVja3Mgc3RhdGljLW9ubHlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwiLi9pbnZhcmlhbnRcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhbiBlbnVtZXJhdGlvbiB3aXRoIGtleXMgZXF1YWwgdG8gdGhlaXIgdmFsdWUuXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKlxuICogICB2YXIgQ09MT1JTID0ga2V5TWlycm9yKHtibHVlOiBudWxsLCByZWQ6IG51bGx9KTtcbiAqICAgdmFyIG15Q29sb3IgPSBDT0xPUlMuYmx1ZTtcbiAqICAgdmFyIGlzQ29sb3JWYWxpZCA9ICEhQ09MT1JTW215Q29sb3JdO1xuICpcbiAqIFRoZSBsYXN0IGxpbmUgY291bGQgbm90IGJlIHBlcmZvcm1lZCBpZiB0aGUgdmFsdWVzIG9mIHRoZSBnZW5lcmF0ZWQgZW51bSB3ZXJlXG4gKiBub3QgZXF1YWwgdG8gdGhlaXIga2V5cy5cbiAqXG4gKiAgIElucHV0OiAge2tleTE6IHZhbDEsIGtleTI6IHZhbDJ9XG4gKiAgIE91dHB1dDoge2tleTE6IGtleTEsIGtleTI6IGtleTJ9XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9ialxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG52YXIga2V5TWlycm9yID0gZnVuY3Rpb24ob2JqKSB7XG4gIHZhciByZXQgPSB7fTtcbiAgdmFyIGtleTtcbiAgKFwicHJvZHVjdGlvblwiICE9PSBcImRldmVsb3BtZW50XCIgPyBpbnZhcmlhbnQoXG4gICAgb2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KG9iaiksXG4gICAgJ2tleU1pcnJvciguLi4pOiBBcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdC4nXG4gICkgOiBpbnZhcmlhbnQob2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KG9iaikpKTtcbiAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldFtrZXldID0ga2V5O1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU1pcnJvcjtcbiIsImltcG9ydCBDaGF0Q29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9DaGF0Q29uc3RhbnRzJztcclxuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcclxuXHJcbmNvbnN0IENoYXRBY3Rpb25zID0ge1xyXG4gIHRvZ2dsZVZpc2liaWxpdHkoKSB7XHJcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xyXG4gICAgICBhY3Rpb25UeXBlOiBDaGF0Q29uc3RhbnRzLlRPR0dMRV9WSVNJQklMSVRZXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHN1Ym1pdE1lc3NhZ2UobWVzc2FnZSwgY2xhc3NOYW1lLCByZWNlaXZlZCkge1xyXG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgYWN0aW9uVHlwZTogQ2hhdENvbnN0YW50cy5TVUJNSVRfTUVTU0FHRSxcclxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcclxuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXHJcbiAgICAgIHJlY2VpdmVkOiByZWNlaXZlZFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hhdEFjdGlvbnM7IiwiaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0dhbWVDb25zdGFudHMnO1xyXG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInO1xyXG5cclxuY29uc3QgR2FtZUFjdGlvbnMgPSB7XHJcbiAgbWFrZU1vdmUoZnJvbSwgdG8sIGNhcHR1cmUsIHR5cGUsIGVtaXRNb3ZlKSB7XHJcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xyXG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLk1BS0VfTU9WRSxcclxuICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgdG86IHRvLFxyXG4gICAgICBjYXB0dXJlOiBjYXB0dXJlLFxyXG4gICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICBlbWl0TW92ZTogZW1pdE1vdmVcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc2hvd01vdmVzKHVuaXQsIGZyb20sIGluUmFuZ2UpIHtcclxuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XHJcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuU0hPV19NT1ZFUyxcclxuICAgICAgdW5pdDogdW5pdCxcclxuICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgaW5SYW5nZTogaW5SYW5nZVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBkcmF3KCkge1xyXG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5EUkFXXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHJlbWF0Y2goKSB7XHJcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xyXG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLlJFTUFUQ0hcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZ2FtZU92ZXIob3B0aW9ucykge1xyXG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5HQU1FX09WRVIsXHJcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnNcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgY2hhbmdlUHJvbW90aW9uKHByb21vdGlvbikge1xyXG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5DSEFOR0VfUFJPTU9USU9OLFxyXG4gICAgICBwcm9tb3Rpb246IHByb21vdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZUFjdGlvbnM7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XHJcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XHJcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XHJcblxyXG5jb25zdCBDYXB0dXJlZFBpZWNlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBcclxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluLCBvbkdhbWVDaGFuZ2VdLFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjYXB0dXJlZFBpZWNlczogR2FtZVN0b3JlLmdldENhcHR1cmVkUGllY2VzKClcclxuICAgIH07XHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBjcCA9IHRoaXMuc3RhdGUuY2FwdHVyZWRQaWVjZXM7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBpZD1cImNhcHR1cmVkLXBpZWNlc1wiPlxyXG4gICAgICAgIHtjcC5tYXAoKHBpZWNlcywgY29sb3IpID0+IChcclxuICAgICAgICAgIDx1bCBrZXk9e2NvbG9yfT5cclxuICAgICAgICAgICAge3BpZWNlcy5tYXAoKHBpZWNlLCBpKSA9PiA8bGkga2V5PXtpfT57cGllY2V9PC9saT4pLnRvQXJyYXkoKX1cclxuICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgKSkudG9BcnJheSgpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfSxcclxuICBfb25HYW1lQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNhcHR1cmVkUGllY2VzOiBHYW1lU3RvcmUuZ2V0Q2FwdHVyZWRQaWVjZXMoKVxyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhcHR1cmVkUGllY2VzOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xyXG5pbXBvcnQgQ2hhdFN0b3JlIGZyb20gJy4uL3N0b3Jlcy9DaGF0U3RvcmUnO1xyXG5pbXBvcnQgQ2hhdEFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9DaGF0QWN0aW9ucyc7XHJcblxyXG5jb25zdCBDaGF0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIFxyXG4gIHByb3BUeXBlczoge1xyXG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIHRva2VuOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcclxuICAgIC8vIHNvdW5kc0VuYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgb3Blbk1vZGFsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXHJcbiAgfSxcclxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluXSxcclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSBDaGF0U3RvcmUuZ2V0U3RhdGUoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlzQ2hhdEhpZGRlbjogc3RhdGUuaXNDaGF0SGlkZGVuLFxyXG4gICAgICBtZXNzYWdlczogc3RhdGUubWVzc2FnZXMsXHJcbiAgICAgIG1lc3NhZ2U6ICcnLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgdGhpcy5wcm9wcy5pby5vbigncmVjZWl2ZS1tZXNzYWdlJywgZGF0YSA9PiB7XHJcbiAgICAgIENoYXRBY3Rpb25zLnN1Ym1pdE1lc3NhZ2UoZGF0YS5tZXNzYWdlLCBkYXRhLmNvbG9yICsgJyBsZWZ0JywgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuX21heWJlUGxheVNvdW5kKCk7XHJcbiAgICB9KTtcclxuICAgIENoYXRTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25DaGF0U3RvcmVDaGFuZ2UpO1xyXG4gICAgXHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiAxMzk5KSBDaGF0QWN0aW9ucy50b2dnbGVWaXNpYmlsaXR5KCk7XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIENoYXRTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uQ2hhdFN0b3JlQ2hhbmdlKTtcclxuICB9LFxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgaWQ9XCJjaGF0LXdyYXBwZXJcIlxyXG4gICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5pc0NoYXRIaWRkZW4gPyAnaGlkZGVuJyA6IG51bGx9PlxyXG4gICAgICAgIFxyXG4gICAgICAgIDxoND5DaGF0PC9oND5cclxuICAgICAgICA8YSBjbGFzc05hbWU9XCJjbG9zZVwiXHJcbiAgICAgICAgICAgb25DbGljaz17Q2hhdEFjdGlvbnMudG9nZ2xlVmlzaWJpbGl0eX0+XHJcbiAgICAgICAgICB4XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIFxyXG4gICAgICAgIDxhdWRpbyBwcmVsb2FkPVwiYXV0b1wiIHJlZj1cIm1zZ1NuZFwiPlxyXG4gICAgICAgICAgPHNvdXJjZSBzcmM9XCIvc25kL21lc3NhZ2UubXAzXCIgLz5cclxuICAgICAgICA8L2F1ZGlvPlxyXG4gICAgICAgIFxyXG4gICAgICAgIDx1bCBpZD1cImNoYXQtbGlzdFwiIHJlZj1cImNoYXRcIj5cclxuICAgICAgICAgIHt0aGlzLnN0YXRlLm1lc3NhZ2VzLm1hcCgobWVzc2FnZSwgaSkgPT4gKFxyXG4gICAgICAgICAgICA8bGkga2V5PXtpfSBjbGFzc05hbWU9e21lc3NhZ2UuZ2V0KCdjbGFzc05hbWUnKX0+XHJcbiAgICAgICAgICAgICAge21lc3NhZ2UuZ2V0KCdtZXNzYWdlJyl9XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICApKS50b0FycmF5KCl9XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgICBcclxuICAgICAgICA8c3Bhbj5Xcml0ZSB5b3VyIG1lc3NhZ2U6PC9zcGFuPlxyXG4gICAgICAgIFxyXG4gICAgICAgIDxmb3JtIGlkPVwiY2hhdC1mb3JtXCJcclxuICAgICAgICAgICAgICBvblN1Ym1pdD17dGhpcy5fc3VibWl0TWVzc2FnZX0+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgIHJlZj1cIm1lc3NhZ2VcIlxyXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jb2xvcn1cclxuICAgICAgICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLm1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uQ2hhbmdlTWVzc2FnZX0gLz5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9LFxyXG4gIF9vbkNoYXRTdG9yZUNoYW5nZSgpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoQ2hhdFN0b3JlLmdldFN0YXRlKCksIHRoaXMuX3Njcm9sbENoYXQpO1xyXG4gIH0sXHJcbiAgX29uQ2hhbmdlTWVzc2FnZShlKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlOiBlLnRhcmdldC52YWx1ZX0pO1xyXG4gIH0sXHJcbiAgX3N1Ym1pdE1lc3NhZ2UoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3Qge2lvLCB0b2tlbiwgY29sb3IsIGlzT3Bwb25lbnRBdmFpbGFibGV9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnN0YXRlLm1lc3NhZ2U7XHJcblxyXG4gICAgaWYgKCFpc09wcG9uZW50QXZhaWxhYmxlKSB7XHJcbiAgICAgIHRoaXMucmVmcy5tZXNzYWdlLmdldERPTU5vZGUoKS5ibHVyKCk7XHJcbiAgICAgIHRoaXMucHJvcHMub3Blbk1vZGFsKCdpbmZvJywgJ1NvcnJ5LCB5b3VyIG9wcG9uZW50IGlzIG5vdCBjb25uZWN0ZWQuICcgK1xyXG4gICAgICAgICdZb3UgY2Fu4oCYdCBzZW5kIG1lc3NhZ2VzLicpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgQ2hhdEFjdGlvbnMuc3VibWl0TWVzc2FnZShtZXNzYWdlLCBjb2xvciArICcgcmlnaHQnLCBmYWxzZSk7XHJcbiAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlOiAnJ30pO1xyXG5cclxuICAgIGlvLmVtaXQoJ3NlbmQtbWVzc2FnZScsIHtcclxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcclxuICAgICAgY29sb3I6IGNvbG9yLFxyXG4gICAgICB0b2tlbjogdG9rZW5cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgX3Njcm9sbENoYXQoKSB7XHJcbiAgICBjb25zdCBjaGF0Tm9kZSA9IHRoaXMucmVmcy5jaGF0LmdldERPTU5vZGUoKTtcclxuICAgIGNoYXROb2RlLnNjcm9sbFRvcCA9IGNoYXROb2RlLnNjcm9sbEhlaWdodDtcclxuICB9LFxyXG4gIF9tYXliZVBsYXlTb3VuZCgpIHtcclxuICAgIC8vIGlmICh0aGlzLnByb3BzLnNvdW5kc0VuYWJsZWQpIHtcclxuICAgIC8vICAgdGhpcy5yZWZzLm1zZ1NuZC5nZXRET01Ob2RlKCkucGxheSgpO1xyXG4gICAgLy8gfVxyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGF0OyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xyXG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xyXG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XHJcbmltcG9ydCBDaGVzc1BpZWNlcyBmcm9tICcuLi9jb25zdGFudHMvQ2hlc3NQaWVjZXMnO1xyXG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xyXG5pbXBvcnQgbWF5YmVSZXZlcnNlIGZyb20gJy4uL21peGlucy9tYXliZVJldmVyc2UnO1xyXG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XHJcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IHtTZXEsIFJlcGVhdCwgTGlzdCwgU2V0fSBmcm9tICdpbW11dGFibGUnO1xyXG5cclxuY29uc3QgRklMRVMgPSBTZXEuSW5kZXhlZCgnYWJjZGVmZ2gnKTtcclxuY29uc3QgUkFOS1MgPSBTZXEuSW5kZXhlZCgnMTIzNDU2NzgnKTtcclxuXHJcbmNvbnN0IENoZXNzYm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgdG9rZW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIG1heWJlUGxheVNvdW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXHJcbiAgICBnYW1lT3ZlcjogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcclxuICB9LFxyXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG1heWJlUmV2ZXJzZV0sXHJcblxyXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gR2FtZVN0b3JlLmdldENoZXNzYm9hcmRTdGF0ZSgpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZlbjogc3RhdGUuZmVuLFxyXG4gICAgICBtb3ZlRnJvbTogbnVsbCxcclxuICAgICAgbGFzdE1vdmU6IHN0YXRlLmxhc3RNb3ZlLFxyXG4gICAgICBraW5nSW5DaGVjazogZmFsc2VcclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGNvbnN0IHtpbywgdG9rZW59ID0gdGhpcy5wcm9wcztcclxuICAgIEdhbWVTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcclxuICAgIEdhbWVTdG9yZS5vbignbmV3LW1vdmUnLCB0aGlzLl9vbk5ld01vdmUpO1xyXG5cclxuICAgIGlvLm9uKCdtb3ZlJywgZGF0YSA9PiB7XHJcbiAgICAgIEdhbWVBY3Rpb25zLm1ha2VNb3ZlKGRhdGEuZnJvbSwgZGF0YS50bywgZGF0YS5jYXB0dXJlLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMucHJvcHMubWF5YmVQbGF5U291bmQoKTtcclxuXHJcbiAgICAgIGlmICghZGF0YS5nYW1lT3Zlcikge1xyXG4gICAgICAgIHRoaXMuX3J1bkNsb2NrKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcclxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGl0bGUnKVswXTtcclxuICAgICAgICB0aXRsZS50ZXh0ID0gJyogJyArIHRpdGxlLnRleHQ7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaW8ub24oJ3JlbWF0Y2gtYWNjZXB0ZWQnLCAoKSA9PiB0aGlzLnNldFN0YXRlKHttb3ZlRnJvbTogbnVsbH0pKTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgR2FtZVN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcclxuICAgIEdhbWVTdG9yZS5vbignbmV3LW1vdmUnLCB0aGlzLl9vbk5ld01vdmUpO1xyXG4gIH0sXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge2NvbG9yLCBpc09wcG9uZW50QXZhaWxhYmxlLCBnYW1lT3Zlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3Qge2ZlbiwgbW92ZUZyb20sIGxhc3RNb3ZlLCBraW5nSW5DaGVja30gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgZmVuQXJyYXkgPSBmZW4uc3BsaXQoJyAnKTtcclxuICAgIGNvbnN0IHBsYWNlbWVudCA9IGZlbkFycmF5WzBdO1xyXG4gICAgY29uc3QgaXNJdE15VHVybiA9IGZlbkFycmF5WzFdID09PSBjb2xvci5jaGFyQXQoMCk7XHJcbiAgICBjb25zdCByb3dzID0gdGhpcy5fbWF5YmVSZXZlcnNlKHBsYWNlbWVudC5zcGxpdCgnLycpKTtcclxuICAgIGNvbnN0IHJhbmtzID0gdGhpcy5fbWF5YmVSZXZlcnNlKFJBTktTLCAnd2hpdGUnKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPVwiY2hlc3Nib2FyZFwiPlxyXG4gICAgICAgIHtyb3dzLm1hcCgocGxhY2VtZW50LCBpKSA9PlxyXG4gICAgICAgICAgPFJvd1xyXG4gICAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICAgIHJhbms9e3JhbmtzLmdldChpKX1cclxuICAgICAgICAgICAgcGxhY2VtZW50PXtwbGFjZW1lbnR9XHJcbiAgICAgICAgICAgIGNvbG9yPXtjb2xvcn1cclxuICAgICAgICAgICAgaXNNb3ZlYWJsZT17aXNJdE15VHVybiAmJiBpc09wcG9uZW50QXZhaWxhYmxlICYmICFnYW1lT3Zlcn1cclxuICAgICAgICAgICAgbW92ZUZyb209e21vdmVGcm9tfVxyXG4gICAgICAgICAgICBsYXN0TW92ZT17bGFzdE1vdmV9XHJcbiAgICAgICAgICAgIHNldE1vdmVGcm9tPXt0aGlzLl9zZXRNb3ZlRnJvbX1cclxuICAgICAgICAgICAga2luZ0luQ2hlY2s9e2tpbmdJbkNoZWNrfVxyXG4gICAgICAgICAgICB2YWxpZE1vdmVzPXtHYW1lU3RvcmUuZ2V0VmFsaWRNb3Zlcyhtb3ZlRnJvbSl9IC8+KX1cclxuICAgICAgPC90YWJsZT5cclxuICAgICk7XHJcbiAgfSxcclxuICBfb25HYW1lQ2hhbmdlKGNiKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IEdhbWVTdG9yZS5nZXRDaGVzc2JvYXJkU3RhdGUoKTtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBmZW46IHN0YXRlLmZlbixcclxuICAgICAgbGFzdE1vdmU6IHN0YXRlLmxhc3RNb3ZlLFxyXG4gICAgICBraW5nSW5DaGVjazogc3RhdGUuY2hlY2sgJiYgKHN0YXRlLmZlbi5zcGxpdCgnICcpWzFdID09PSAndycgPyAnSycgOiAnaycpXHJcbiAgICB9LCBjYik7XHJcbiAgfSxcclxuICBfc2V0TW92ZUZyb20oc3F1YXJlKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbW92ZUZyb206IHNxdWFyZVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBfb25OZXdNb3ZlKG1vdmUpIHtcclxuICAgIGNvbnN0IHtpbywgdG9rZW59ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBpby5lbWl0KCduZXctbW92ZScsIHtcclxuICAgICAgdG9rZW46IHRva2VuLFxyXG4gICAgICBtb3ZlOiBtb3ZlXHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KHRoaXMucHJvcHMubWF5YmVQbGF5U291bmQsIDApO1xyXG4gIH0sXHJcbiAgX3J1bkNsb2NrKCkge1xyXG4gICAgY29uc3Qge2lvLCB0b2tlbiwgY29sb3J9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBpby5lbWl0KCdjbG9jay1ydW4nLCB7XHJcbiAgICAgIHRva2VuOiB0b2tlbixcclxuICAgICAgY29sb3I6IGNvbG9yXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIF9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSgpIHtcclxuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0aXRsZScpWzBdO1xyXG4gICAgdGl0bGUudGV4dCA9IHRpdGxlLnRleHQucmVwbGFjZSgnKiAnLCAnJyk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmNvbnN0IFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICByYW5rOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWycxJywnMicsJzMnLCc0JywnNScsJzYnLCc3JywnOCddKS5pc1JlcXVpcmVkLFxyXG4gICAgcGxhY2VtZW50OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcclxuICAgIGlzTW92ZWFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBtb3ZlRnJvbTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGxhc3RNb3ZlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgc2V0TW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBraW5nSW5DaGVjazogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtmYWxzZSwgJ0snLCAnayddKS5pc1JlcXVpcmVkLFxyXG4gICAgdmFsaWRNb3ZlczogUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoU2V0KS5pc1JlcXVpcmVkXHJcbiAgfSxcclxuICBtaXhpbnM6IFttYXliZVJldmVyc2VdLFxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7cmFuaywgcGxhY2VtZW50LCBjb2xvcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgZmlsZXMgPSB0aGlzLl9tYXliZVJldmVyc2UoRklMRVMpO1xyXG4gICAgY29uc3QgcGllY2VzID0gdGhpcy5fbWF5YmVSZXZlcnNlKHBsYWNlbWVudC5sZW5ndGggPCA4ID9cclxuICAgICAgU2VxKHBsYWNlbWVudCkuZmxhdE1hcChwaWVjZSA9PiAoXHJcbiAgICAgICAgL15cXGQkLy50ZXN0KHBpZWNlKSA/IFJlcGVhdCgnLScsIHBhcnNlSW50KHBpZWNlLCAxMCkpIDogcGllY2VcclxuICAgICAgKSkudG9BcnJheSgpIDpcclxuXHJcbiAgICAgIHBsYWNlbWVudC5zcGxpdCgnJylcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRyPlxyXG4gICAgICAgIHtwaWVjZXMubWFwKChwaWVjZSwgaSkgPT5cclxuICAgICAgICAgIDxDb2x1bW5cclxuICAgICAgICAgICAga2V5PXtpfVxyXG4gICAgICAgICAgICBzcXVhcmU9e2ZpbGVzLmdldChpKSArIHJhbmt9XHJcbiAgICAgICAgICAgIHBpZWNlPXtwaWVjZX1cclxuICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgJ3JhbmsnLCAncGxhY2VtZW50Jyl9IC8+KX1cclxuICAgICAgPC90cj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmNvbnN0IENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBzcXVhcmU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIHBpZWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcclxuICAgIGlzTW92ZWFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBtb3ZlRnJvbTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGxhc3RNb3ZlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgc2V0TW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBraW5nSW5DaGVjazogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtmYWxzZSwgJ0snLCAnayddKS5pc1JlcXVpcmVkLFxyXG4gICAgdmFsaWRNb3ZlczogUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoU2V0KS5pc1JlcXVpcmVkXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge21vdmVGcm9tLCBsYXN0TW92ZSwgc3F1YXJlLCBjb2xvcixcclxuICAgICAgICAgICBpc01vdmVhYmxlLCBraW5nSW5DaGVjaywgdmFsaWRNb3Zlc30gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgcGllY2UgPSBDaGVzc1BpZWNlc1t0aGlzLnByb3BzLnBpZWNlXTtcclxuICAgIGNvbnN0IHJneCA9IGNvbG9yID09PSAnd2hpdGUnID8gL15bS1FSQk5QXSQvIDogL15ba3FyYm5wXSQvO1xyXG4gICAgY29uc3QgaXNEcmFnZ2FibGUgPSByZ3gudGVzdCh0aGlzLnByb3BzLnBpZWNlKTtcclxuICAgIGNvbnN0IGlzRHJvcHBhYmxlID0gbW92ZUZyb20gJiYgdmFsaWRNb3Zlcy5oYXMoc3F1YXJlKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGQgY2xhc3NOYW1lPXtjeCh7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiBtb3ZlRnJvbSA9PT0gc3F1YXJlICYmICF2YWxpZE1vdmVzLmlzRW1wdHkoKSxcclxuICAgICAgICAgICAgZnJvbTogbGFzdE1vdmUuZ2V0KCdmcm9tJykgPT09IHNxdWFyZSxcclxuICAgICAgICAgICAgdG86IGxhc3RNb3ZlLmdldCgndG8nKSA9PT0gc3F1YXJlLFxyXG4gICAgICAgICAgICBkcm9wcGFibGU6IGlzRHJvcHBhYmxlXHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICAgIG9uQ2xpY2s9eyFwaWVjZSA/IHRoaXMuX29uQ2xpY2tTcXVhcmUgOiBudWxsfVxyXG4gICAgICAgICAgb25EcmFnT3Zlcj17aXNEcm9wcGFibGUgPyB0aGlzLl9vbkRyYWdPdmVyIDogbnVsbH1cclxuICAgICAgICAgIG9uRHJvcD17aXNEcm9wcGFibGUgPyB0aGlzLl9vbkRyb3AgOiBudWxsfT5cclxuXHJcbiAgICAgICAge3BpZWNlID9cclxuICAgICAgICAgIDxhIGNsYXNzTmFtZT17a2luZ0luQ2hlY2sgPT09IHRoaXMucHJvcHMucGllY2UgPyAnaW4tY2hlY2snIDogbnVsbH1cclxuICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uQ2xpY2tTcXVhcmV9XHJcbiAgICAgICAgICAgICBvbkRyYWdTdGFydD17dGhpcy5fb25EcmFnU3RhcnR9XHJcbiAgICAgICAgICAgICBkcmFnZ2FibGU9e2lzRHJhZ2dhYmxlICYmIGlzTW92ZWFibGV9PlxyXG4gICAgICAgICAgICB7cGllY2V9XHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgOm51bGx9XHJcbiAgICAgIDwvdGQ+XHJcbiAgICApO1xyXG4gIH0sXHJcbiAgX29uQ2xpY2tTcXVhcmUoKSB7XHJcbiAgICBjb25zdCB7aXNNb3ZlYWJsZSwgY29sb3IsIG1vdmVGcm9tLCBzcXVhcmUsIHBpZWNlfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCByZ3ggPSBjb2xvciA9PT0gJ3doaXRlJyA/IC9eW0tRUkJOUF0kLyA6IC9eW2txcmJucF0kLztcclxuXHJcbiAgICBpZiAoIWlzTW92ZWFibGUgfHwgKCFtb3ZlRnJvbSAmJiAhcmd4LnRlc3QocGllY2UpKSlcclxuICAgICAgcmV0dXJuO1xyXG4gICAgZWxzZSBpZiAobW92ZUZyb20gJiYgbW92ZUZyb20gPT09IHNxdWFyZSlcclxuICAgICAgdGhpcy5wcm9wcy5zZXRNb3ZlRnJvbShudWxsKTtcclxuICAgIGVsc2UgaWYgKHJneC50ZXN0KHBpZWNlKSlcclxuICAgICAgdGhpcy5wcm9wcy5zZXRNb3ZlRnJvbShzcXVhcmUpO1xyXG4gICAgZWxzZVxyXG4gICAgICBHYW1lQWN0aW9ucy5tYWtlTW92ZShtb3ZlRnJvbSwgc3F1YXJlLCBDaGVzc1BpZWNlc1twaWVjZV0sIHRydWUpO1xyXG4gIH0sXHJcbiAgX29uRHJhZ1N0YXJ0KGUpIHtcclxuICAgIGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XHJcbiAgICAvLyBzZXREYXRhIGlzIHJlcXVpcmVkIGJ5IGZpcmVmb3hcclxuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCAnJyk7XHJcblxyXG4gICAgdGhpcy5wcm9wcy5zZXRNb3ZlRnJvbSh0aGlzLnByb3BzLnNxdWFyZSk7XHJcbiAgfSxcclxuICBfb25EcmFnT3ZlcihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xyXG4gIH0sXHJcbiAgX29uRHJvcChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCB7bW92ZUZyb20sIHNxdWFyZSwgcGllY2V9ID0gdGhpcy5wcm9wcztcclxuICAgIEdhbWVBY3Rpb25zLm1ha2VNb3ZlKG1vdmVGcm9tLCBzcXVhcmUsIENoZXNzUGllY2VzW3BpZWNlXSwgdHJ1ZSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENoZXNzYm9hcmQ7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XHJcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XHJcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcclxuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcclxuaW1wb3J0IENoZXNzYm9hcmQgZnJvbSAnLi9DaGVzc2JvYXJkJztcclxuaW1wb3J0IENhcHR1cmVkUGllY2VzIGZyb20gJy4vQ2FwdHVyZWRQaWVjZXMnO1xyXG5pbXBvcnQgVGFibGVPZk1vdmVzIGZyb20gJy4vVGFibGVPZk1vdmVzJztcclxuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xyXG5cclxuY29uc3QgQ2hlc3Nib2FyZEludGVyZmFjZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBcclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICB0b2tlbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgc291bmRzRW5hYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxyXG4gICAgZ2FtZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcclxuICB9LFxyXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG9uR2FtZUNoYW5nZV0sXHJcblxyXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIHJldHVybiBHYW1lU3RvcmUuZ2V0U3RhdGUoKTtcclxuICB9LFxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcclxuICAgIGlmICh0aGlzLnByb3BzLmdhbWVPdmVyLmdldCgnc3RhdHVzJykgJiZcclxuICAgICAgICAhcHJldlByb3BzLmdhbWVPdmVyLmdldCgnc3RhdHVzJykpIHtcclxuICAgICAgdGhpcy5wcm9wcy5vcGVuTW9kYWwoJ2luZm8nLCB0aGlzLl9nZXRHYW1lT3Zlck1lc3NhZ2UoKSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7cHJvbW90aW9uLCB0dXJuLCBnYW1lT3ZlciwgY2hlY2t9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGlkPVwiYm9hcmQtbW92ZXMtd3JhcHBlclwiIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPGF1ZGlvIHByZWxvYWQ9XCJhdXRvXCIgcmVmPVwibW92ZVNuZFwiPlxyXG4gICAgICAgICAgPHNvdXJjZSBzcmM9XCIvc25kL21vdmUubXAzXCIgLz5cclxuICAgICAgICA8L2F1ZGlvPlxyXG4gICAgICAgIDxhdWRpbyBwcmVsb2FkPVwiYXV0b1wiIHJlZj1cImNoZWNrU25kXCI+XHJcbiAgICAgICAgICA8c291cmNlIHNyYz1cIi9zbmQvY2hlY2subXAzXCIgLz5cclxuICAgICAgICA8L2F1ZGlvPlxyXG5cclxuICAgICAgICA8ZGl2IGlkPVwiYm9hcmQtd3JhcHBlclwiPlxyXG4gICAgICAgICAgPENhcHR1cmVkUGllY2VzIC8+XHJcbiAgICAgICAgICA8Q2hlc3Nib2FyZFxyXG4gICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCAnc291bmRzRW5hYmxlZCcsICdnYW1lT3ZlcicpfVxyXG4gICAgICAgICAgICBnYW1lT3Zlcj17Z2FtZU92ZXIuZ2V0KCdzdGF0dXMnKX1cclxuICAgICAgICAgICAgbWF5YmVQbGF5U291bmQ9e3RoaXMuX21heWJlUGxheVNvdW5kfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8VGFibGVPZk1vdmVzIC8+XHJcblxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInByb21vdGlvblwiPlxyXG4gICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICA8c3Bhbj5Qcm9tb3Rpb246IDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNlbGVjdCB2YWx1ZT17cHJvbW90aW9ufVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9vblByb21vdGlvbkNoYW5nZX0+XHJcbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInFcIj5RdWVlbjwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyXCI+Um9vazwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJiXCI+QmlzaG9wPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm5cIj5LbmlnaHQ8L29wdGlvbj5cclxuICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDwvc3Bhbj5cclxuXHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmVlZGJhY2tcIj5cclxuICAgICAgICAgIHshZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSA/IFxyXG4gICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+XHJcbiAgICAgICAgICAgICAgICB7LyogRiAtPiB3aGl0ZSBraW5nLCBmIC0+IGJsYWNrIGtpbmcqL1xyXG4gICAgICAgICAgICAgICAgICB0dXJuID09PSAndycgPyAnRicgOiAnZid9XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgIHtgJHt0dXJuID09PSAndycgPyAnV2hpdGUnIDogJ0JsYWNrJ30gdG8gbW92ZS5gfVxyXG4gICAgICAgICAgICAgIHtjaGVjayA/IDxzdHJvbmc+IENoZWNrLjwvc3Ryb25nPiA6IG51bGx9XHJcbiAgICAgICAgICAgIDwvc3Bhbj4gOlxyXG5cclxuICAgICAgICAgICAgPHN0cm9uZz5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+XHJcbiAgICAgICAgICAgICAgICB7Z2FtZU92ZXIuZ2V0KCd3aW5uZXInKSA9PT0gJ1doaXRlJyA/ICdGJyA6ICdmJ31cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAge3RoaXMuX2dldEdhbWVPdmVyTWVzc2FnZSgpfVxyXG4gICAgICAgICAgICA8L3N0cm9uZz5cclxuICAgICAgICAgIH1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9LFxyXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKEdhbWVTdG9yZS5nZXRTdGF0ZSgpKTtcclxuICB9LFxyXG4gIF9vblByb21vdGlvbkNoYW5nZShlKSB7XHJcbiAgICBHYW1lQWN0aW9ucy5jaGFuZ2VQcm9tb3Rpb24oZS50YXJnZXQudmFsdWUpO1xyXG4gIH0sXHJcbiAgX21heWJlUGxheVNvdW5kKCkge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuc291bmRzRW5hYmxlZCkge1xyXG4gICAgICB0aGlzLnJlZnNbdGhpcy5zdGF0ZS5jaGVjayA/ICdjaGVja1NuZCcgOiAnbW92ZVNuZCddLmdldERPTU5vZGUoKS5wbGF5KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfZ2V0R2FtZU92ZXJNZXNzYWdlKCkge1xyXG4gICAgY29uc3QgdHlwZSA9IHRoaXMucHJvcHMuZ2FtZU92ZXIuZ2V0KCd0eXBlJyk7XHJcbiAgICBjb25zdCB3aW5uZXIgPSB0aGlzLnByb3BzLmdhbWVPdmVyLmdldCgnd2lubmVyJyk7XHJcbiAgICBjb25zdCBsb3NlciA9IHdpbm5lciA9PT0gJ1doaXRlJyA/ICdCbGFjaycgOiAnV2hpdGUnO1xyXG5cclxuICAgIHJldHVybiB0eXBlID09PSAnY2hlY2ttYXRlJyA/IGBDaGVja21hdGUuICR7d2lubmVyfSB3aW5zIWAgOlxyXG4gICAgICB0eXBlID09PSAndGltZW91dCcgPyBgJHtsb3Nlcn3igJhzIHRpbWUgaXMgb3V0LiAke3dpbm5lcn0gd2lucyFgIDpcclxuICAgICAgdHlwZSA9PT0gJ3Jlc2lnbicgPyBgJHtsb3Nlcn0gaGFzIHJlc2lnbmVkLiAke3dpbm5lcn0gd2lucyFgIDpcclxuICAgICAgdHlwZSA9PT0gJ2RyYXcnID8gJ0RyYXcuJyA6XHJcbiAgICAgIHR5cGUgPT09ICdzdGFsZW1hdGUnID8gJ0RyYXcgKFN0YWxlbWF0ZSkuJyA6XHJcbiAgICAgIHR5cGUgPT09ICd0aHJlZWZvbGRSZXBldGl0aW9uJyA/ICdEcmF3IChUaHJlZWZvbGQgUmVwZXRpdGlvbikuJyA6XHJcbiAgICAgIHR5cGUgPT09ICdpbnN1ZmZpY2llbnRNYXRlcmlhbCcgPyAnRHJhdyAoSW5zdWZmaWNpZW50IE1hdGVyaWFsKScgOiAnJztcclxuICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hlc3Nib2FyZEludGVyZmFjZTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcclxuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xyXG5cclxuY29uc3QgUHVyZVJlbmRlck1peGluID0gUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbjtcclxuXHJcbmNvbnN0IENsb2NrID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIFxyXG4gIHByb3BUeXBlczoge1xyXG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIHBhcmFtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcclxuICB9LFxyXG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXHJcblxyXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIGNvbnN0IFtfLCB0aW1lLCBpbmNdID0gdGhpcy5wcm9wcy5wYXJhbXM7XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHdoaXRlOiB0aW1lICogNjAsXHJcbiAgICAgIGJsYWNrOiB0aW1lICogNjAsXHJcbiAgICAgIGluYzogaW5jLFxyXG4gICAgICBjb3VudGRvd246IG51bGxcclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGNvbnN0IGlvID0gdGhpcy5wcm9wcy5pbztcclxuXHJcbiAgICBpby5vbignY291bnRkb3duJywgZGF0YSA9PiB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgW2RhdGEuY29sb3JdOiBkYXRhLnRpbWUsXHJcbiAgICAgIGNvdW50ZG93bjogZGF0YS5jb2xvclxyXG4gICAgfSkpO1xyXG5cclxuICAgIGlvLm9uKCdjb3VudGRvd24tZ2FtZW92ZXInLCBkYXRhID0+IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y291bnRkb3duOiBudWxsfSk7XHJcbiAgICAgIEdhbWVBY3Rpb25zLmdhbWVPdmVyKHtcclxuICAgICAgICB0eXBlOiAndGltZW91dCcsXHJcbiAgICAgICAgd2lubmVyOiBkYXRhLmNvbG9yID09PSAnYmxhY2snID8gJ1doaXRlJyA6ICdCbGFjaydcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpby5vbigncmVtYXRjaC1hY2NlcHRlZCcsICgpID0+IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgd2hpdGU6IHRoaXMucHJvcHMucGFyYW1zWzFdICogNjAsXHJcbiAgICAgICAgYmxhY2s6IHRoaXMucHJvcHMucGFyYW1zWzFdICogNjBcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx1bCBpZD1cImNsb2NrXCI+XHJcbiAgICAgICAgPFRpbWVyXHJcbiAgICAgICAgICBjb2xvcj1cIndoaXRlXCJcclxuICAgICAgICAgIHRpbWU9e3RoaXMuc3RhdGUud2hpdGV9XHJcbiAgICAgICAgICBjb3VudGRvd249e3RoaXMuc3RhdGUuY291bnRkb3dufSAvPlxyXG4gICAgICAgIDxUaW1lclxyXG4gICAgICAgICAgY29sb3I9XCJibGFja1wiXHJcbiAgICAgICAgICB0aW1lPXt0aGlzLnN0YXRlLmJsYWNrfVxyXG4gICAgICAgICAgY291bnRkb3duPXt0aGlzLnN0YXRlLmNvdW50ZG93bn0gLz5cclxuICAgICAgPC91bD5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmNvbnN0IFRpbWVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBtaXhpbnM6IFtQdXJlUmVuZGVyTWl4aW5dLFxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7dGltZSwgY29sb3IsIGNvdW50ZG93bn0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgbWluID0gTWF0aC5mbG9vcih0aW1lIC8gNjApO1xyXG4gICAgY29uc3Qgc2VjID0gdGltZSAlIDYwO1xyXG4gICAgY29uc3QgdGltZUxlZnQgPSBgJHttaW59OiR7c2VjIDwgMTAgPyAnMCcgKyBzZWMgOiBzZWN9YDtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8bGkgY2xhc3NOYW1lPXtjb2xvciArIChjb2xvciA9PT0gY291bnRkb3duID8gJyB0aWNraW5nJyA6ICcnKX0+XHJcbiAgICAgICAge3RpbWVMZWZ0fVxyXG4gICAgICA8L2xpPlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2xvY2s7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XHJcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XHJcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcclxuLy9pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xyXG5pbXBvcnQgbWF5YmVSZXZlcnNlIGZyb20gJy4uL21peGlucy9tYXliZVJldmVyc2UnO1xyXG5pbXBvcnQgYmVoYXZpb3IgZnJvbSAnLi4vZ2FtZS9iZWhhdmlvcic7XHJcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcclxuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5cclxuXHJcblxyXG5cclxuY29uc3QgR2FtZUJvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHByb3BUeXBlczoge1xyXG5cclxuXHR9LFxyXG5cdG1peGluczogW21heWJlUmV2ZXJzZV0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlKCkge1xyXG5cdFx0dGhpcy5zdGF0ZSA9IEdhbWVTdG9yZS5nZXRHYW1lYm9hcmRTdGF0ZSgpO1xyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGU7XHJcblx0fSxcclxuXHJcblx0X29uQnV0dG9uQ2xpY2soKXtcclxuXHRcdGNvbnN0IHtjb2xvcn0gPSB0aGlzLnByb3BzLFxyXG5cdFx0XHR7dHVybiwgZGVja30gPSB0aGlzLnN0YXRlO1xyXG5cclxuXHRcdGlmICh0dXJuICE9PSBjb2xvci5jaGFyQXQoMCkgfHwgdGhpcy5zdGF0ZS5wZW5kaW5nRHJhdykgcmV0dXJuO1xyXG5cclxuXHRcdGxldCB7Ym9hcmR9ID0gdGhpcy5zdGF0ZTtcclxuXHRcdGlmIChjb2xvciA9PT0gJ2JsYWNrJykgYm9hcmQgPSB0aGlzLl9yZXZlcnNlQm9hcmQoYm9hcmQpO1xyXG5cdFx0dmFyIGR1a2VQb3NpdGlvbiA9IE9iamVjdC5rZXlzKGJvYXJkKS5maW5kKHBvcyA9PiAoYm9hcmRbcG9zXSAmJiBib2FyZFtwb3NdLnVuaXQgPT09IFwiRHVrZVwiICYmIGJvYXJkW3Bvc10uY29sb3IgPT09IGNvbG9yKSk7XHJcblx0XHR2YXIgZHVrZVBvc0FyciA9IEpTT04ucGFyc2UoZHVrZVBvc2l0aW9uKTtcclxuXHJcblx0XHR2YXIgZHJvcHBhYmxlVGlsZXMgPSB7fTtcclxuXHRcdFtbMCwxXSwgWzAsLTFdLCBbMSwwXSwgWy0xLDBdXS5mb3JFYWNoKGFkaiA9PiB7XHJcblx0XHRcdHZhciBhZGpYID0gZHVrZVBvc0FyclswXSthZGpbMF0sIGFkalkgPSBkdWtlUG9zQXJyWzFdK2FkalsxXTtcclxuXHRcdFx0aWYgKHRoaXMuX2lzT25Cb2FyZCh7eDogYWRqWCwgeTogYWRqWX0pICYmICFib2FyZFtgWyR7YWRqWH0sICR7YWRqWX1dYF0pIFxyXG5cdFx0XHRcdGRyb3BwYWJsZVRpbGVzW2BbJHthZGpYfSwgJHthZGpZfV1gXSA9IHRydWU7XHJcblx0XHR9KVxyXG5cclxuXHRcdGlmICghT2JqZWN0LmtleXMoZHJvcHBhYmxlVGlsZXMpLmxlbmd0aCkge1xyXG5cdFx0XHRzd2FsKFwiQ2FuJ3QgbGV0IHlvdSBkcmF3IHRoYXRcIiwgJ05vIGF2YWlsYWJsZSB0aWxlcyBhZGphY2VudCB0byB0aGUgRHVrZSEnLCAnZXJyb3InKTtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdGlmIChkZWNrLmxlbmd0aCkge1xyXG5cdFx0XHRcdEdhbWVBY3Rpb25zLmRyYXcoKTtcclxuXHRcdFx0XHRsZXQgdGhlRHJhd25Vbml0ID0gR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCkucGVuZGluZ0RyYXc7XHJcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0XHRkcm9wOiBkcm9wcGFibGVUaWxlcyxcclxuXHRcdFx0XHRcdHBlbmRpbmdEcmF3OiB7XHJcblx0XHRcdFx0XHRcdHVuaXQ6IHRoZURyYXduVW5pdCxcclxuXHRcdFx0XHRcdFx0Y29sb3I6IHRoaXMucHJvcHMuY29sb3IsXHJcblx0XHRcdFx0XHRcdHNpZGU6ICdmcm9udCdcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcdFx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBcclxuXHRcdFx0XHRzd2FsKFwiQ2FuJ3QgbGV0IHlvdSBkcmF3IHRoYXRcIiwgJ05vIHVuaXRzIGxlZnQgdG8gZHJhdyEnLCAnZXJyb3InKTtcclxuXHRcdH1cdFx0XHJcblx0fSxcclxuXHJcblx0X29uRHJhd0NlbGxDbGljaygpe1xyXG5cdFx0dmFyIG5ld0RyYXduO1xyXG5cdFx0bGV0IGRyYXduVW5pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJhd25Vbml0XCIpO1xyXG5cdFx0bGV0IGNsYXNzZXMgPSBkcmF3blVuaXQuY2xhc3NOYW1lO1xyXG5cclxuXHRcdGlmIChjbGFzc2VzLmluY2x1ZGVzKCdmcm9udCcpKSB7XHJcblx0XHRcdGRyYXduVW5pdC5jbGFzc0xpc3QucmVtb3ZlKCdmcm9udCcpO1xyXG5cdFx0XHRkcmF3blVuaXQuY2xhc3NMaXN0LmFkZCgnYmFjaycpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGRyYXduVW5pdC5jbGFzc0xpc3QucmVtb3ZlKCdiYWNrJyk7XHJcblx0XHRcdGRyYXduVW5pdC5jbGFzc0xpc3QuYWRkKCdmcm9udCcpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xyXG5cclxuXHRcdGNvbnN0IHtpbywgdG9rZW4sIGdhbWVvdmVyfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0R2FtZVN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xyXG5cdFx0R2FtZVN0b3JlLm9uKCduZXctbW92ZScsIHRoaXMuX29uTmV3TW92ZSk7XHJcblx0XHRHYW1lU3RvcmUub24oJ3N3YWwtZW5kZ2FtZScsIHRoaXMuX29uR2FtZU92ZXIpO1xyXG5cclxuXHRcdGlvLm9uKCdtb3ZlJywgZGF0YSA9PiB7XHJcblx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKGRhdGEuZnJvbSwgZGF0YS50bywgZGF0YS5jYXB0dXJlLCBkYXRhLnR5cGUsIGZhbHNlKTtcclxuXHJcblx0XHRcdGlmICghZGF0YS5nYW1lT3Zlcikge1xyXG5cdFx0XHQgIHRoaXMuX3J1bkNsb2NrKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChkb2N1bWVudC5oaWRkZW4pIHtcclxuXHRcdFx0ICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGl0bGUnKVswXTtcclxuXHRcdFx0ICB0aXRsZS50ZXh0ID0gJyogJyArIHRpdGxlLnRleHQ7XHJcblxyXG5cdFx0XHQgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gaW8ub24oJ3N3YWwtZ2FtZW92ZXInLCBkYXRhID0+IHtcclxuXHRcdC8vIFx0bGV0IHdpbm5lciA9IGRhdGEud2lubmVyO1xyXG5cdFx0Ly8gXHRzd2FsKHtcclxuXHRcdC8vIFx0XHR0aXRsZTogJ1lvdSBsb3NlIScsXHJcblx0XHQvLyBcdFx0dGV4dDogJ0JldHRlciBsdWNrIG5leHQgdGltZSEnLFxyXG5cdFx0Ly8gXHRcdC8vaW1hZ2VVcmw6ICdodHRwOi8vdmlnbmV0dGUyLndpa2lhLm5vY29va2llLm5ldC9kaWNrZmlndXJlcy9pbWFnZXMvZC9kMC9Ucm9sbC1GYWNlLURhbmNpbmcxLmpwZy9yZXZpc2lvbi9sYXRlc3Q/Y2I9MjAxMjExMTIxNTA1NDMnXHJcblx0XHQvLyBcdFx0aW1hZ2VVcmw6ICdodHRwczovL2lhbXBpZXJyZW1lbmFyZC5maWxlcy53b3JkcHJlc3MuY29tLzIwMTQvMDIvc2FkLWRvZy5qcGcnXHJcblx0XHQvLyBcdH0pO1xyXG5cdFx0Ly8gfSlcclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuXHRcdEdhbWVTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLl9vbkNoYW5nZSk7XHJcblx0fSxcclxuXHJcblx0X3JldmVyc2VQb3NpdGlvbihwb3MpIHtcclxuXHRcdGNvbnN0IHtzaXplfSA9IHRoaXMucHJvcHM7XHJcblx0XHRsZXQgcG9zQXJyID0gSlNPTi5wYXJzZShwb3MpO1xyXG5cdFx0cmV0dXJuIGBbJHtzaXplLTEtcG9zQXJyWzBdfSwgJHtzaXplLTEtcG9zQXJyWzFdfV1gO1xyXG5cdH0sXHJcblxyXG5cdF9yZXZlcnNlQm9hcmQoKSB7XHJcblx0XHRjb25zdCB7Ym9hcmR9ID0gdGhpcy5zdGF0ZTtcclxuXHRcdGxldCBuZXdCb2FyZCA9IHt9O1xyXG5cdFx0T2JqZWN0LmtleXMoYm9hcmQpLmZvckVhY2gocG9zID0+IHtcclxuXHRcdFx0bmV3Qm9hcmRbdGhpcy5fcmV2ZXJzZVBvc2l0aW9uKHBvcyldID0gYm9hcmRbcG9zXTtcclxuXHRcdH0pXHJcblx0XHRyZXR1cm4gbmV3Qm9hcmQ7XHJcblx0fSxcclxuXHJcblx0X29uR2FtZUNoYW5nZShjYikge1xyXG5cdFx0Y29uc3Qgc3RhdGUgPSBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRib2FyZDogc3RhdGUuYm9hcmQsXHJcblx0XHRcdGxpZ2h0dXA6IHN0YXRlLmxpZ2h0dXAsXHJcblx0XHRcdHN0cmlrZTogc3RhdGUuc3RyaWtlLFxyXG5cdFx0XHRkcm9wOiBzdGF0ZS5kcm9wLFxyXG5cdFx0XHRzZWxlY3RlZDogc3RhdGUuc2VsZWN0ZWQsXHJcblx0XHRcdGRyYXdVbml0OiBzdGF0ZS5kcmF3VW5pdCxcclxuXHRcdFx0dHVybjogc3RhdGUudHVybixcclxuXHRcdFx0cGVuZGluZ0RyYXc6IHN0YXRlLnBlbmRpbmdEcmF3XHJcblx0XHR9LCBjYik7XHJcblx0fSxcclxuXHJcblx0X29uTmV3TW92ZShtb3ZlKSB7XHJcblx0XHRjb25zdCB7aW8sIHRva2VuLCBjb2xvcn0gPSB0aGlzLnByb3BzO1xyXG5cdFx0aW8uZW1pdCgnbmV3LW1vdmUnLCB7IHRva2VuLCBtb3ZlLCBjb2xvciB9KTtcclxuXHR9LFxyXG5cclxuXHRfb25HYW1lT3Zlcih7d2lubmVyfSkge1xyXG5cdFx0Y29uc3Qge2lvLCB0b2tlbn0gPSB0aGlzLnByb3BzO1xyXG5cdFx0dmFyIHtnYW1lb3Zlcn0gPSB0aGlzLnByb3BzO1xyXG5cdFx0aW8uZW1pdCgnc3dhbC1lbmRnYW1lJywgeyB0b2tlbiwgd2lubmVyIH0pO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlcigpIHtcclxuXHRcdGxldCB7c3RhdGUsIHByb3BzfSA9IHRoaXMsIFxyXG5cdFx0XHR7c2l6ZSwgY29sb3IsIGdhbWVvdmVyfSA9IHByb3BzLFxyXG5cdFx0XHR7Ym9hcmQsIHNlbGVjdGVkLCBsaWdodHVwLCBzdHJpa2UsIGRyb3AsIHR1cm4sIGRyYXduLCBwZW5kaW5nRHJhd30gPSBzdGF0ZTtcclxuXHJcblx0XHRpZiAoY29sb3IgPT09ICdibGFjaycpIGJvYXJkID0gdGhpcy5fcmV2ZXJzZUJvYXJkKCk7XHJcblxyXG5cdFx0bGV0IGNlbGxBcnJheSA9IFtdO1xyXG5cdFx0Zm9yIChsZXQgaT0wOyBpPHNpemU7IGkrKykge1xyXG5cdFx0XHRsZXQgcm93ID0gW107XHJcblx0XHRcdGZvciAobGV0IGo9MDsgajxzaXplOyBqKyspIHtcclxuXHRcdFx0XHRyb3cucHVzaCh7eDpqLCB5Oml9KVxyXG5cdFx0XHR9XHJcblx0XHRcdGNlbGxBcnJheS5wdXNoKHJvdyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8dGFibGUgY2xhc3NOYW1lPVwiYm9hcmRcIj5cclxuXHRcdFx0XHR7Y2VsbEFycmF5Lm1hcCgocm93LCBpZHgxKSA9PiBcclxuXHRcdFx0XHRcdDx0cj5cclxuXHRcdFx0XHRcdFx0e3Jvdy5tYXAoKGNlbGwsIGlkeDIpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCBjb29yZHMgPSBgWyR7aWR4Mn0sICR7aWR4MX1dYDtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdFx0XHRcdDx0ZCBwb3NpdGlvbj17Y29vcmRzfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8Q2VsbCByZWY9e2Nvb3Jkc31cdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0IHBvc2l0aW9uPXtjb29yZHN9IFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dW5pdD17Ym9hcmRbY29vcmRzXSA/IGJvYXJkW2Nvb3Jkc10udW5pdCA6IG51bGx9IFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29sb3I9e2JvYXJkW2Nvb3Jkc10gPyBib2FyZFtjb29yZHNdLmNvbG9yIDogbnVsbH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBsYXllckNvbG9yPXtjb2xvcn1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNpZGU9e2JvYXJkW2Nvb3Jkc10gPyBib2FyZFtjb29yZHNdLnNpZGUgOiBudWxsfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGl0dXA9e2xpZ2h0dXBbY29vcmRzXX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0cmlrYWJsZT17c3RyaWtlW2Nvb3Jkc119XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjYW5Ecm9wPXtkcm9wW2Nvb3Jkc119XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZD17c2VsZWN0ZWR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0dXJuPXt0dXJufVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cGVuZGluZ0RyYXc9e3BlbmRpbmdEcmF3fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0U2VsZWN0ZWQ9e3RoaXMuX3NldFNlbGVjdGVkfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0RHJhd2FibGU9e3RoaXMuX3NldERyYXdhYmxlfSBcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldERyb3BwYWJsZT17dGhpcy5fc2V0RHJvcHBhYmxlfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0R2FtZVBvaW50PXt0aGlzLl9zZXRHYW1lUG9pbnR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRnYW1lb3Zlcj17Z2FtZW92ZXI/IGZhbHNlOiBnYW1lb3Zlcn1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQpfVxyXG5cdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHQpfVxyXG5cdFx0XHRcdDwvdGFibGU+XHJcblx0XHRcdFx0PGRpdiBpZD1cImRyYXdcIj5cclxuXHRcdFx0XHRcdDxidXR0b24gY2xhc3NOYW1lPVwiYnRuXCIgb25DbGljaz17dGhpcy5fb25CdXR0b25DbGlja30+RFJBVzwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PERyYXduQ29tcG9uZW50IHBvc2l0aW9uPSdbLTEsIC0xXScgXHJcblx0XHRcdFx0XHRcdHVuaXQ9e3BlbmRpbmdEcmF3PyBwZW5kaW5nRHJhdy51bml0IDogbnVsbH0gXHJcblx0XHRcdFx0XHRcdGNvbG9yPXtwZW5kaW5nRHJhdz8gcGVuZGluZ0RyYXcuY29sb3IgOiBudWxsfSBcclxuXHRcdFx0XHRcdFx0c2lkZT17cGVuZGluZ0RyYXc/IHBlbmRpbmdEcmF3LnNpZGUgOiBudWxsfSBcclxuXHRcdFx0XHRcdFx0ZHJhd0FVbml0PXt0aGlzLl9vbkRyYXdDZWxsQ2xpY2t9XHJcblx0XHRcdFx0XHRcdHBsYXllckNvbG9yPXtjb2xvcn0gLz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdF9vbkRyYXduRHJhZ1N0YXJ0KGUpIHtcclxuXHRcdGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XHJcblx0XHRlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgJycpO1xyXG5cclxuXHRcdGNvbnN0IHt1bml0LCBwb3NpdGlvbiwgY29sb3IsIHNlbGVjdGVkLCBzZXRTZWxlY3RlZCwgbGl0dXAsIHN0cmlrYWJsZSwgZHJvcHBhYmxlLCBzaWRlfSA9IHRoaXMucHJvcHM7XHJcblx0XHR0aGlzLl9zZXRTZWxlY3RlZCgnWy0xLC0xXScsICdkcmF3Jyk7XHJcblxyXG5cdH0sXHJcblxyXG5cdF9zZXRTZWxlY3RlZChwb3NpdGlvbiwgaW5SYW5nZSkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdHNlbGVjdGVkOiBwb3NpdGlvbixcclxuXHRcdFx0bGlnaHR1cDogdGhpcy5fZ2V0VmFsaWRNb3Zlcyhwb3NpdGlvbiwgaW5SYW5nZSkubW92YWJsZVRpbGVzLFxyXG5cdFx0XHRzdHJpa2U6IHRoaXMuX2dldFZhbGlkTW92ZXMocG9zaXRpb24sIGluUmFuZ2UpLnN0cmlrYWJsZVRpbGVzXHJcblx0XHR9KVxyXG5cdH0sXHJcblxyXG5cdF9zZXREcmF3blVuaXQodGlsZSkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdHBlbmRpbmdEcmF3OiB7XHJcblx0XHRcdFx0dW5pdDogdGlsZSxcclxuXHRcdFx0XHRjb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcclxuXHRcdFx0XHRzaWRlOiAnZnJvbnQnXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblxyXG5cdH0sXHJcblx0X3NldEdhbWVQb2ludCgpe1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdGdhbWVvdmVyOiB0cnVlXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0VmFsaWRNb3Zlcyhwb3NpdGlvbiwgbW92ZXMpIHtcclxuXHRcdGlmICghbW92ZXMpIHJldHVybjtcclxuXHRcdGNvbnN0IHtjb2xvcjogcGxheWVyQ29sb3J9ID0gdGhpcy5wcm9wcztcclxuXHRcdGxldCBpblJhbmdlID0gW10sIG1vdmFibGVUaWxlcyA9IHt9LCBzdHJpa2FibGVUaWxlcyA9IHt9LFxyXG5cdFx0XHRwb3NBcnIgPSBKU09OLnBhcnNlKHBvc2l0aW9uKSxcclxuXHRcdFx0dGhlQm9hcmQgPSBwbGF5ZXJDb2xvciA9PT0gJ2JsYWNrJyA/IHRoaXMuX3JldmVyc2VCb2FyZCgpIDogdGhpcy5zdGF0ZS5ib2FyZDtcclxuXHJcblx0XHQvLyBTdG9yZSBhbGwgdGlsZXMgd2l0aGluIHJhbmdlIG9mIHRoZSB1bml0J3MgYmVoYXZpb3JcclxuXHRcdE9iamVjdC5rZXlzKG1vdmVzKS5mb3JFYWNoKG1vdmUgPT4ge1xyXG5cdFx0XHRsZXQgbW92ZUFyciA9IEpTT04ucGFyc2UobW92ZSksIG1vdmVOYW1lID0gbW92ZXNbbW92ZV0sXHJcblx0XHRcdFx0Ly8gKHgsIHkpOiBjb29yZGluYXRlcyBvZiB0aGUgbWFya2VkIHRpbGVcclxuXHRcdFx0XHR4ID0gcG9zQXJyWzBdICsgbW92ZUFyclswXSwgXHJcblx0XHRcdFx0eSA9IHBvc0FyclsxXSArIG1vdmVBcnJbMV07XHJcblxyXG5cdFx0XHQvLyBzdHJpa2UgYW5kIGp1bXAgYXJlIHN0cmFpZ2h0Zm9yd2FyZDsgc2ltcGx5IHN0b3JlIHRoZSBtYXJrZWQgdGlsZVxyXG5cdFx0XHRpZiAobW92ZU5hbWUgPT09ICdzdHJpa2UnKSBpblJhbmdlLnB1c2goe3g6IHgsIHk6IHksIHR5cGU6ICdzdHJpa2UnfSk7XHJcblx0XHRcdGVsc2UgaWYgKG1vdmVOYW1lID09PSAnanVtcCcpIGluUmFuZ2UucHVzaCh7eDogeCwgeTogeSwgdHlwZTogJ21vdmUnfSk7XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGxldCBkZWx0YVggPSBNYXRoLnNpZ24obW92ZUFyclswXSksIFxyXG5cdFx0XHRcdFx0ZGVsdGFZID0gTWF0aC5zaWduKG1vdmVBcnJbMV0pLFxyXG5cdFx0XHRcdFx0aSA9IHBvc0FyclswXSArIGRlbHRhWCwgXHJcblx0XHRcdFx0XHRqID0gcG9zQXJyWzFdICsgZGVsdGFZO1xyXG5cclxuXHRcdFx0XHQvLyBsb29wIHRocm91Z2ggYWxsIHRpbGVzIG9uIGJvYXJkIGluIGEgc3RyYWlnaHQgcGF0aCBiZXR3ZWVuIHN0YXJ0aW5nIHRpbGUgYW5kIG1hcmtlZCB0aWxlXHJcblx0XHRcdFx0d2hpbGUgKHRoaXMuX2lzT25Cb2FyZCh7eDogaSwgeTogan0pKSB7XHJcblx0XHRcdFx0XHQvLyBzbGlkaW5nIHVuaXRzIGNhbiBsYW5kIG9uIGFueSB0aWxlIHdpdGhpbiBhIHN0cmFpZ2h0IHBhdGhcclxuXHRcdFx0XHRcdC8vIG5vbi1zbGlkaW5nIHVuaXRzIGNhbiBvbmx5IGxhbmQgb24gdGhlIG1hcmtlZCB0aWxlXHJcblx0XHRcdFx0XHRpZiAobW92ZU5hbWUuaW5jbHVkZXMoJ3NsaWRlJykgfHwgKHggPT09IGkgJiYgeSA9PT0gaikpXHJcblx0XHRcdFx0XHRcdGluUmFuZ2UucHVzaCh7eDogaSwgeTogaiwgdHlwZTogJ21vdmUnfSk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gaWYgdW5pdCBjYW4ndCBqdW1wIGFuZCB0aGVyZSBpcyBhIHVuaXQgaW4gdGhlIHdheSwgYnJlYWtcclxuXHRcdFx0XHRcdGxldCB1bml0SW5UaGVXYXkgPSB0aGVCb2FyZFtgWyR7aX0sICR7an1dYF07XHJcblx0XHRcdFx0XHRpZiAodW5pdEluVGhlV2F5ICYmICFtb3ZlTmFtZS5pbmNsdWRlcygnanVtcCcpKSBicmVhaztcclxuXHJcblx0XHRcdFx0XHRpICs9IGRlbHRhWDsgaiArPSBkZWx0YVk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBGaWx0ZXIgb3V0IHRpbGVzIHRoYXQgYXJlIG9jY3VwaWVkIGJ5IGFsbGllZCB1bml0cyBvciBub3Qgb24gdGhlIGJvYXJkLFxyXG5cdFx0Ly8gdGhlbiBvcmdhbml6ZSBieSBtb3ZhYmxlIGFuZCBzdHJpa2FibGUgdGlsZXNcclxuXHRcdGluUmFuZ2UuZmlsdGVyKHJhbmdlID0+IHtcclxuXHRcdFx0bGV0IHRhcmdldFVuaXQgPSB0aGVCb2FyZFtgWyR7cmFuZ2UueH0sICR7cmFuZ2UueX1dYF07XHJcblx0XHRcdGlmICh0YXJnZXRVbml0ICYmIHRoZUJvYXJkW3Bvc2l0aW9uXS5jb2xvciA9PT0gdGFyZ2V0VW5pdC5jb2xvcikgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5faXNPbkJvYXJkKHJhbmdlKTtcclxuXHRcdH0pLmZvckVhY2gocmFuZ2UgPT4ge1xyXG5cdFx0XHRpZiAocmFuZ2UudHlwZSA9PT0gJ21vdmUnKSBtb3ZhYmxlVGlsZXNbYFske3JhbmdlLnh9LCAke3JhbmdlLnl9XWBdID0gdHJ1ZTtcclxuXHRcdFx0ZWxzZSBpZiAocmFuZ2UudHlwZSA9PT0gJ3N0cmlrZScpIHN0cmlrYWJsZVRpbGVzW2BbJHtyYW5nZS54fSwgJHtyYW5nZS55fV1gXSA9IHRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4geyBtb3ZhYmxlVGlsZXMsIHN0cmlrYWJsZVRpbGVzIH07XHJcblx0fSxcclxuXHJcblx0X2lzT25Cb2FyZCh7eCwgeX0pIHtcclxuXHQgIHJldHVybiB4ID49IDAgJiYgeSA+PSAwICYmIHggPCA2ICYmIHkgPCA2O1xyXG5cdH0sXHJcblxyXG5cdF9ydW5DbG9jaygpIHtcclxuXHQgIGNvbnN0IHtpbywgdG9rZW4sIGNvbG9yfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdCAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xyXG5cdCAgICB0b2tlbjogdG9rZW4sXHJcblx0ICAgIGNvbG9yOiBjb2xvclxyXG5cdCAgfSk7XHJcblx0fSxcclxuXHRfcmVtb3ZlQXN0ZXJpc2tGcm9tVGl0bGUoKSB7XHJcblx0ICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGl0bGUnKVswXTtcclxuXHQgIHRpdGxlLnRleHQgPSB0aXRsZS50ZXh0LnJlcGxhY2UoJyogJywgJycpO1xyXG5cdCAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fcmVtb3ZlQXN0ZXJpc2tGcm9tVGl0bGUpO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxuXHJcbmNvbnN0IENlbGwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblxyXG5cdH0sXHJcblxyXG4gIFx0Y29tcG9uZW50RGlkTW91bnQoKSB7XHJcblx0XHRcclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcblx0XHRcdFxyXG5cdH0sXHJcblxyXG5cdG1peGluczogW10sXHJcblxyXG5cdF9vbkNsaWNrU3F1YXJlKCkge1xyXG5cclxuXHRcdGNvbnN0IHt1bml0LCBjb2xvciwgc2V0U2VsZWN0ZWQsIGxpdHVwLCBzdHJpa2FibGUsIGNhbkRyb3AsIHNpZGUsIHBsYXllckNvbG9yLCB0dXJuLCBwZW5kaW5nRHJhd30gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGxldCB7cG9zaXRpb24sIHNlbGVjdGVkfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0dmFyIGdhbWVvdmVyID0gR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCkuZ2FtZW92ZXI7XHJcblx0XHRpZihnYW1lb3Zlci5nZXQoJ3N0YXR1cycpKSByZXR1cm47XHJcblxyXG5cdFx0Ly8gb25seSBsZXQgdGhlIHBsYXllciBhY3Qgd2hlbiBpdCBpcyB0aGVpciB0dXJuXHJcblx0XHQvLyBpZiBwbGF5ZXIgZHJldyBhIHVuaXQsIGRvbid0IGxldCB0aGVtIG1ha2UgYSBub3JtYWwgbW92ZVxyXG5cclxuXHRcdGlmICggKHR1cm4gIT09IHBsYXllckNvbG9yLmNoYXJBdCgwKSkgfHwgcGVuZGluZ0RyYXcgKSByZXR1cm47XHJcblxyXG5cdFx0Ly8gaWYgdGhlcmUgaXMgbm8gY3VycmVudGx5IHNlbGVjdGVkIHVuaXQsIGNsaWNrIGEgdW5pdCAob2YgdGhlIHNhbWUgY29sb3IpIHRvIHNlbGVjdCBpdFxyXG5cdFx0aWYgKCFzZWxlY3RlZCAmJiB1bml0ICYmIGNvbG9yID09PSBwbGF5ZXJDb2xvcikge1xyXG5cdFx0XHRsZXQgbW92ZXMgPSBiZWhhdmlvclt1bml0XVtzaWRlXTtcclxuXHRcdFx0c2V0U2VsZWN0ZWQocG9zaXRpb24sIG1vdmVzKTtcclxuXHRcdH1cclxuXHRcdC8vIGlmIHRoZXJlIGlzIGN1cnJlbnRseSBhIHNlbGVjdGVkIHVuaXQgb24gdGhlIGJvYXJkXHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Ly8gd2hlbiBlbWl0dGluZyBhIG1vdmUgZXZlbnQsIHNlbmQgdGhlIFwicmVhbFwiIHBvc2l0aW9uIChpLmUuIGlmIGJsYWNrLCB0aGUgcmV2ZXJzZSBvZiB0aGUgcmVuZGVyZWQgdmlldykgXHJcblx0XHRcdGlmIChwbGF5ZXJDb2xvciA9PT0gJ2JsYWNrJykge1xyXG5cdFx0XHRcdHBvc2l0aW9uID0gdGhpcy5fcmV2ZXJzZVBvc2l0aW9uKHBvc2l0aW9uKTtcclxuXHRcdFx0XHRzZWxlY3RlZCA9IHRoaXMuX3JldmVyc2VQb3NpdGlvbihzZWxlY3RlZCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGNhbiBkbyBvbmUgb2YgdGhlIGZvbGxvd2luZzpcclxuXHJcblx0XHRcdC8vIDEuIG1vdmUgdG8gYSB0aWxlIGdsb3dpbmcgcmVkXHJcblx0XHRcdGlmICh0aGlzLnByb3BzLmxpdHVwKSB7XHJcblx0XHRcdFx0bGV0IGNhcHR1cmUgPSB1bml0ICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcjtcclxuXHRcdFx0XHRHYW1lQWN0aW9ucy5tYWtlTW92ZShzZWxlY3RlZCwgcG9zaXRpb24sIGNhcHR1cmUsICdtb3ZlJywgdHJ1ZSk7XHJcblx0XHRcdFx0c2V0U2VsZWN0ZWQobnVsbCwgW10pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyAyLiBhdHRhY2sgYSB1bml0IG9uIGEgdGlsZSBnbG93aW5nIHllbGxvdywgd2l0aG91dCBtb3ZpbmdcclxuXHRcdFx0ZWxzZSBpZiAodGhpcy5wcm9wcy5zdHJpa2FibGUgJiYgdW5pdCAmJiBjb2xvciAhPT0gcGxheWVyQ29sb3IpIHtcclxuXHRcdFx0XHRHYW1lQWN0aW9ucy5tYWtlTW92ZShzZWxlY3RlZCwgcG9zaXRpb24sIHRydWUsICdzdHJpa2UnLCB0cnVlKTtcclxuXHRcdFx0XHRzZXRTZWxlY3RlZChudWxsLCBbXSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIDMuIGRlc2VsZWN0IHRoZSBjdXJyZW50IHVuaXQgYnkgY2xpY2tpbmcgb24gaXRcclxuXHRcdFx0ZWxzZSBpZiAoc2VsZWN0ZWQgPT09IHBvc2l0aW9uKSB7XHJcblx0XHRcdFx0c2V0U2VsZWN0ZWQobnVsbCwgW10pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHRcdFxyXG5cdH0sXHJcblxyXG5cdF9vbkRyYWdTdGFydChlKSB7XHJcblx0XHRjb25zdCB7dW5pdCwgcG9zaXRpb24sIGNvbG9yLCBzZWxlY3RlZCwgc2V0U2VsZWN0ZWQsIGxpdHVwLCBzdHJpa2FibGUsIHNpZGUsIGNhbkRyb3AsIHBsYXllckNvbG9yLCB0dXJuLCBwZW5kaW5nRHJhd30gPSB0aGlzLnByb3BzO1xyXG5cdFx0XHJcblx0XHR2YXIgZ2FtZW92ZXIgPSBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKS5nYW1lb3ZlcjtcclxuXHRcdGlmKGdhbWVvdmVyLmdldCgnc3RhdHVzJykpIHJldHVybjtcclxuXHJcblx0XHRpZiAoICh0dXJuICE9PSBwbGF5ZXJDb2xvci5jaGFyQXQoMCkpIHx8IHBlbmRpbmdEcmF3ICkgcmV0dXJuO1xyXG5cclxuXHRcdGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XHJcblx0XHRlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgJycpO1xyXG5cclxuXHRcdGlmICghc2VsZWN0ZWQgJiYgdW5pdCAmJiBjb2xvciA9PT0gcGxheWVyQ29sb3IpIHtcclxuXHRcdFx0bGV0IG1vdmVzID0gYmVoYXZpb3JbdW5pdF1bc2lkZV07XHJcblx0XHRcdHNldFNlbGVjdGVkKHBvc2l0aW9uLCBtb3Zlcyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRfb25EcmFnT3ZlcihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xyXG5cdH0sXHJcblx0X29uRHJvcChlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0Y29uc3Qge3VuaXQsIGNvbG9yLCBzZXRTZWxlY3RlZCwgc2V0RHJvcHBhYmxlLCBzZXREcmF3YWJsZSwgbGl0dXAsIHN0cmlrYWJsZSwgY2FuRHJvcCwgc2lkZSwgcGxheWVyQ29sb3IsIHBlbmRpbmdEcmF3fSA9IHRoaXMucHJvcHM7XHJcblx0XHRsZXQge3Bvc2l0aW9uLCBzZWxlY3RlZH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGlmIChwbGF5ZXJDb2xvciA9PT0gJ2JsYWNrJykge1xyXG5cdFx0XHRpZiAocG9zaXRpb24pIHBvc2l0aW9uID0gdGhpcy5fcmV2ZXJzZVBvc2l0aW9uKHBvc2l0aW9uKTtcclxuXHRcdFx0aWYgKHNlbGVjdGVkKSBzZWxlY3RlZCA9IHRoaXMuX3JldmVyc2VQb3NpdGlvbihzZWxlY3RlZCk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5wcm9wcy5saXR1cCkge1xyXG5cdFx0XHRsZXQgY2FwdHVyZSA9IHVuaXQgJiYgY29sb3IgIT09IHBsYXllckNvbG9yO1xyXG5cdFx0XHRHYW1lQWN0aW9ucy5tYWtlTW92ZShzZWxlY3RlZCwgcG9zaXRpb24sIGNhcHR1cmUsICdtb3ZlJywgdHJ1ZSk7XHJcblx0XHR9XHRcdFxyXG5cdFx0ZWxzZSBpZiAodGhpcy5wcm9wcy5zdHJpa2FibGUgJiYgdW5pdCl7XHJcblx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKHNlbGVjdGVkLCBwb3NpdGlvbiwgdHJ1ZSwgJ3N0cmlrZScsIHRydWUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZih0aGlzLnByb3BzLmNhbkRyb3Ape1xyXG5cdFx0XHRHYW1lQWN0aW9ucy5tYWtlTW92ZShwZW5kaW5nRHJhdywgcG9zaXRpb24sIGZhbHNlLCAnbW92ZScsIHRydWUpO1xyXG5cdFx0fVxyXG5cdFx0c2V0U2VsZWN0ZWQobnVsbCwgW10pO1xyXG5cclxuXHR9LFxyXG5cclxuXHRfcmV2ZXJzZVBvc2l0aW9uKHBvcykge1xyXG5cdFx0bGV0IHBvc0FyciA9IEpTT04ucGFyc2UocG9zKTtcclxuXHRcdHJldHVybiBgWyR7NS1wb3NBcnJbMF19LCAkezUtcG9zQXJyWzFdfV1gO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge3VuaXQsIGNvbG9yLCBsaXR1cCwgc3RyaWthYmxlLCBjYW5Ecm9wLCBzaWRlLCBwbGF5ZXJDb2xvciwgcG9zaXRpb24sIHNlbGVjdGVkfSA9IHRoaXMucHJvcHM7XHJcblx0XHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxzZWN0aW9uIGNsYXNzTmFtZT17Y3goe1xyXG5cdFx0XHRcdGNlbGxDb250YWluZXI6IHRydWUsXHJcblx0XHRcdFx0Ly8gc2VsZWN0ZWQ6IHBvc2l0aW9uID09PSBzZWxlY3RlZFxyXG5cdFx0XHR9KX0+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2N4KHtcclxuXHRcdFx0XHRcdHNlbGVjdGVkOiBwb3NpdGlvbiA9PT0gc2VsZWN0ZWQsXHJcblx0XHRcdFx0XHRbc2lkZV06IHRydWVcclxuXHRcdFx0XHR9KX0+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3goe1xyXG5cdFx0XHRcdFx0XHRcdHRpbGU6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0Ly8gc2VsZWN0ZWQ6IHBvc2l0aW9uID09PSBzZWxlY3RlZCxcclxuXHRcdFx0XHRcdFx0XHRbc2lkZV06IHRydWVcclxuXHRcdFx0XHRcdFx0fSl9XHJcblx0XHRcdFx0XHRcdG9uRHJhZ092ZXI9e3RoaXMuX29uRHJhZ092ZXJ9XHJcblx0XHRcdFx0XHRcdG9uRHJvcD17dGhpcy5fb25Ecm9wfVxyXG5cdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT17Y3goe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR1bml0OiAhIXVuaXQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGxpdHVwOiBsaXR1cCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0c3RyaWthYmxlOiBzdHJpa2FibGUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGNhbkRyb3A6IGNhbkRyb3AsXHJcblx0XHRcdFx0XHRcdFx0XHRcdG9wcG9uZW50OiBjb2xvciAmJiBjb2xvciAhPT0gcGxheWVyQ29sb3IsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFtzaWRlXTogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0W3VuaXRdOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRbY29sb3JdOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0fSl9XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLl9vbkNsaWNrU3F1YXJlfVxyXG5cdFx0XHRcdFx0XHRcdFx0b25EcmFnU3RhcnQ9e3RoaXMuX29uRHJhZ1N0YXJ0fVxyXG5cdFx0XHRcdFx0XHRcdFx0ZHJhZ2dhYmxlIC8+XHJcblx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcImZyb250LWZhY2VcIjogdHJ1ZSwgb3Bwb25lbnQ6IGNvbG9yICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcn0pfSAvPlxyXG5cdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPXtjeCh7XCJiYWNrLWZhY2VcIjogdHJ1ZSwgb3Bwb25lbnQ6IGNvbG9yICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcn0pfSAvPlxyXG5cdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPVwibGVmdC1mYWNlXCIgLz5cclxuXHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT1cInJpZ2h0LWZhY2VcIiAvPlxyXG5cdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPVwidG9wLWZhY2VcIiAvPlxyXG5cdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPVwiYm90dG9tLWZhY2VcIiAvPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHQpO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxuY29uc3QgRHJhd25Db21wb25lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgXHQgcmV0dXJuIHtcclxuICAgIFx0IFx0Ly9zaWRlOiAnZnJvbnQnLFxyXG4gICAgXHQgXHRkcmF3bjogbnVsbFxyXG4gICAgXHQgfTtcclxuICBcdH0sXHJcbiAgXHRjb21wb25lbnREaWRNb3VudCgpIHtcclxuXHJcblx0XHRcclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcblx0XHRcclxuXHRcclxuXHR9LFxyXG5cclxuXHRtaXhpbnM6IFtdLFxyXG5cclxuXHJcblx0X29uRHJhZ1N0YXJ0KGUpIHtcclxuXHRcdGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XHJcblx0XHRlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgJycpO1xyXG5cclxuXHRcdGNvbnN0IHt1bml0LCBwb3NpdGlvbiwgY29sb3IsIHNpZGV9ID0gdGhpcy5wcm9wcztcclxuXHR9LFxyXG5cdF9vbkRyYWdPdmVyKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHR2YXIge3VuaXQsIGNvbG9yLCBzaWRlLCBkcmFnZ2FibGUsIGRyYXdBVW5pdCwgcG9zaXRpb24sIHBsYXllckNvbG9yfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImRyYXduVW5pdFwiIGRyYWdnYWJsZSBcclxuXHRcdFx0XHRjbGFzc05hbWU9e2N4KHtcdFxyXG5cdFx0XHRcdFx0dGlsZTogdHJ1ZSxcclxuXHRcdFx0XHRcdFt1bml0XTogdHJ1ZSxcclxuXHRcdFx0XHRcdFtjb2xvcl06IHRydWUsXHJcblx0XHRcdFx0XHRbc2lkZV06IHRydWVcclxuXHRcdFx0XHR9KX0gPlxyXG5cdFx0XHRcdFx0PGEgY2xhc3NOYW1lPXtjeCh7XHJcblx0XHRcdFx0XHRcdFx0dW5pdDogISF1bml0LFxyXG5cdFx0XHRcdFx0XHRcdG9wcG9uZW50OiBjb2xvciAmJiBjb2xvciAhPT0gcGxheWVyQ29sb3IsXHJcblx0XHRcdFx0XHRcdFx0W3NpZGVdOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFt1bml0XTogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRbY29sb3JdOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHR9KX1cclxuXHRcdFx0XHRcdFx0b25DbGljaz17ZHJhd0FVbml0fVxyXG5cdFx0XHRcdFx0XHQvLyBvbkRyYWdTdGFydD17dGhpcy5fb25EcmFnU3RhcnR9XHJcblx0XHRcdFx0XHRcdGRyYWdnYWJsZT5cclxuXHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPXtjeCh7XCJmcm9udC1mYWNlXCI6IHRydWUsIFwiZHJhdy1wcmV2aWV3XCI6IHRydWUsIG9wcG9uZW50OiBjb2xvciAmJiBjb2xvciAhPT0gcGxheWVyQ29sb3J9KX0gLz5cclxuXHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPXtjeCh7XCJiYWNrLWZhY2VcIjogdHJ1ZSwgXCJkcmF3LXByZXZpZXdcIjogdHJ1ZSwgIG9wcG9uZW50OiBjb2xvciAmJiBjb2xvciAhPT0gcGxheWVyQ29sb3J9KX0gLz5cclxuXHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPXtjeCh7XCJsZWZ0LWZhY2VcIjogdHJ1ZSwgXCJkcmF3LXByZXZpZXdcIjogdHJ1ZX0pfSAvPlxyXG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcInJpZ2h0LWZhY2VcIjogdHJ1ZSwgXCJkcmF3LXByZXZpZXdcIjogdHJ1ZX0pfSAvPlxyXG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcInRvcC1mYWNlXCI6IHRydWUsIFwiZHJhdy1wcmV2aWV3XCI6IHRydWV9KX0gLz5cclxuXHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPXtjeCh7XCJib3R0b20tZmFjZVwiOiB0cnVlLCBcImRyYXctcHJldmlld1wiOiB0cnVlfSl9IC8+XHJcblx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0fSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7Qm9hcmQ6IEdhbWVCb2FyZCwgQ2VsbDogQ2VsbCwgRHJhd25Db21wb25lbnQ6IERyYXduQ29tcG9uZW50fTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcclxuaW1wb3J0IENsb2NrIGZyb20gJy4vQ2xvY2snO1xyXG5pbXBvcnQgQ2hhdFN0b3JlIGZyb20gJy4uL3N0b3Jlcy9DaGF0U3RvcmUnO1xyXG5pbXBvcnQgQ2hhdEFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9DaGF0QWN0aW9ucyc7XHJcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcclxuXHJcbmNvbnN0IEdhbWVIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgcGFyYW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxyXG4gICAgb3Blbk1vZGFsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgZ2FtZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXHJcbiAgfSxcclxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluXSxcclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgcmV0dXJuIG9taXQoQ2hhdFN0b3JlLmdldFN0YXRlKCksICdtZXNzYWdlcycpO1xyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBDaGF0U3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uQ2hhdENoYW5nZSk7XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIENoYXRTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uQ2hhdENoYW5nZSk7XHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7aW8sIHBhcmFtcywgZ2FtZU92ZXIsIGlzT3Bwb25lbnRBdmFpbGFibGV9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHVuc2VlbkNvdW50ID0gdGhpcy5zdGF0ZS51bnNlZW5Db3VudDtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XHJcblxyXG4gICAgICAgIDxDbG9ja1xyXG4gICAgICAgICAgaW89e2lvfVxyXG4gICAgICAgICAgcGFyYW1zPXtwYXJhbXN9IC8+XHJcblxyXG4gICAgICAgIHsvKjxzcGFuIGlkPVwiZ2FtZS10eXBlXCI+XHJcbiAgICAgICAgICB7YCR7cGFyYW1zWzFdfXwke3BhcmFtc1syXX1gfVxyXG4gICAgICAgIDwvc3Bhbj4qL31cclxuXHJcbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuXCIgaHJlZj1cIi9cIj5OZXcgZ2FtZTwvYT5cclxuXHJcbiAgICAgICAgeyFnYW1lT3ZlciAmJiBpc09wcG9uZW50QXZhaWxhYmxlID9cclxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tLXJlZCByZXNpZ25cIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uUmVzaWdufT5cclxuICAgICAgICAgICAgUmVzaWduXHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgOmdhbWVPdmVyID9cclxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tLXJlZCByZW1hdGNoXCJcclxuICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uUmVtYXRjaH0+XHJcbiAgICAgICAgICAgIFJlbWF0Y2hcclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICA6bnVsbH1cclxuXHJcbiAgICAgICAgPGEgaWQ9XCJjaGF0LWljb25cIlxyXG4gICAgICAgICAgIG9uQ2xpY2s9e0NoYXRBY3Rpb25zLnRvZ2dsZVZpc2liaWxpdHl9PlxyXG4gICAgICAgICAge3Vuc2VlbkNvdW50ID9cclxuICAgICAgICAgICAgPHNwYW4gaWQ9XCJjaGF0LWNvdW50ZXJcIj5cclxuICAgICAgICAgICAgICB7dW5zZWVuQ291bnQgPCA5ID8gdW5zZWVuQ291bnQgOiAnOSsnfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICA6bnVsbH1cclxuICAgICAgICAgIDxpbWcgc3JjPVwiL2ltZy9jaGF0LnN2Z1wiXHJcbiAgICAgICAgICAgICAgIHdpZHRoPVwiNTBcIlxyXG4gICAgICAgICAgICAgICBoZWlnaHQ9XCI1MFwiIC8+XHJcbiAgICAgICAgICBDaGF0XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2hlYWRlcj5cclxuICAgICk7XHJcbiAgfSxcclxuICBfb25DaGF0Q2hhbmdlKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZShvbWl0KENoYXRTdG9yZS5nZXRTdGF0ZSgpLCAnbWVzc2FnZXMnKSk7XHJcbiAgfSxcclxuICBfb25SZXNpZ24oKSB7XHJcbiAgICBjb25zdCB7aW8sIHBhcmFtcywgY29sb3J9ID0gdGhpcy5wcm9wcztcclxuICAgIFxyXG4gICAgaW8uZW1pdCgncmVzaWduJywge1xyXG4gICAgICB0b2tlbjogcGFyYW1zWzBdLFxyXG4gICAgICBjb2xvcjogY29sb3JcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgX29uUmVtYXRjaCgpIHtcclxuICAgIGNvbnN0IHtpbywgcGFyYW1zLCBvcGVuTW9kYWwsIGlzT3Bwb25lbnRBdmFpbGFibGV9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBpZiAoIWlzT3Bwb25lbnRBdmFpbGFibGUpIHtcclxuICAgICAgb3Blbk1vZGFsKCdpbmZvJywgJ1lvdXIgb3Bwb25lbnQgaGFzIGRpc2Nvbm5lY3RlZC4gWW91IG5lZWQgdG8gJyArXHJcbiAgICAgICAgJ2dlbmVyYXRlIGEgbmV3IGxpbmsuJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpby5lbWl0KCdyZW1hdGNoLW9mZmVyJywge1xyXG4gICAgICB0b2tlbjogcGFyYW1zWzBdXHJcbiAgICB9KTtcclxuICAgIG9wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9mZmVyIGhhcyBiZWVuIHNlbnQuJyk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVIZWFkZXI7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XHJcbmltcG9ydCBHYW1lSGVhZGVyIGZyb20gJy4vR2FtZUhlYWRlcic7XHJcbmltcG9ydCBDaGF0IGZyb20gJy4vQ2hhdCc7XHJcbmltcG9ydCBNb2RhbCBmcm9tICcuL01vZGFsJztcclxuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xyXG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xyXG5pbXBvcnQgQ2hlc3Nib2FyZEludGVyZmFjZSBmcm9tICcuL0NoZXNzYm9hcmRJbnRlcmZhY2UnO1xyXG5pbXBvcnQgR2FtZWJvYXJkSW50ZXJmYWNlIGZyb20gJy4vR2FtZWJvYXJkSW50ZXJmYWNlJztcclxuaW1wb3J0IHtNYXB9IGZyb20gJ2ltbXV0YWJsZSc7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkJztcclxuXHJcbmNvbnN0IEdhbWVJbnRlcmZhY2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgcGFyYW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxyXG4gIH0sXHJcblxyXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IGZhbHNlLFxyXG4gICAgICBjb2xvcjogJ3doaXRlJyxcclxuICAgICAgbW9kYWw6IE1hcCh7XHJcbiAgICAgICAgb3BlbjogZmFsc2UsXHJcbiAgICAgICAgbWVzc2FnZTogJycsXHJcbiAgICAgICAgdHlwZTogJ2luZm8nLFxyXG4gICAgICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgICAgaGlkZTogdGhpcy5faGlkZU1vZGFsLFxyXG4gICAgICAgICAgYWNjZXB0OiB0aGlzLl9hY2NlcHRSZW1hdGNoLFxyXG4gICAgICAgICAgZGVjbGluZTogdGhpcy5fZGVjbGluZVJlbWF0Y2hcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgICBnYW1lT3ZlcjogR2FtZVN0b3JlLmdldFN0YXRlKCkuZ2FtZU92ZXJcclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgaW8ub24oJ3Rva2VuLWludmFsaWQnLCAoKSA9PiB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbW9kYWw6IHRoaXMuc3RhdGUubW9kYWxcclxuICAgICAgICAuc2V0KCdvcGVuJywgdHJ1ZSlcclxuICAgICAgICAuc2V0KCdtZXNzYWdlJywgJ0dhbWUgbGluayBpcyBpbnZhbGlkIG9yIGhhcyBleHBpcmVkLicpXHJcbiAgICAgICAgLnNldCgndHlwZScsICdpbmZvJylcclxuICAgIH0pKTtcclxuXHJcbiAgICBpby5lbWl0KCdqb2luJywge1xyXG4gICAgICB0b2tlbjogcGFyYW1zWzBdLFxyXG4gICAgICB0aW1lOiBwYXJhbXNbMV0gKiA2MCxcclxuICAgICAgaW5jOiBwYXJhbXNbMl1cclxuICAgIH0pO1xyXG5cclxuICAgIGlvLm9uKCdqb2luZWQnLCBkYXRhID0+IHtcclxuICAgICAgaWYgKGRhdGEuY29sb3IgPT09ICdibGFjaycpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb2xvcjogJ2JsYWNrJ30pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpby5vbignYm90aC1qb2luZWQnLCAoKSA9PlxyXG4gICAgICB0aGlzLnNldFN0YXRlKHtpc09wcG9uZW50QXZhaWxhYmxlOiB0cnVlfSwgKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbG9yID09PSAnd2hpdGUnKSB7XHJcbiAgICAgICAgICBpby5lbWl0KCdjbG9jay1ydW4nLCB7XHJcbiAgICAgICAgICAgIHRva2VuOiBwYXJhbXNbMF0sXHJcbiAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pKTtcclxuXHJcbiAgICBpby5vbignZnVsbCcsICgpID0+IHtcclxuICAgICAgd2luZG93LmFsZXJ0KFxyXG4gICAgICAgICdUaGlzIGdhbWUgYWxyZWFkeSBoYXMgdHdvIHBsYXllcnMuIFlvdSBoYXZlIHRvIGNyZWF0ZSBhIG5ldyBvbmUuJyk7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvJztcclxuICAgIH0pO1xyXG5cclxuICAgIGlvLm9uKCdzd2FsLWdhbWVvdmVyJywgZGF0YSA9PiB7XHJcbiAgICAgIC8vIGRhdGEuY29sb3IgPSBwbGF5ZXIgd2hvIG1hZGUgdGhlIHdpbm5pbmcgbW92ZVxyXG4gICAgICBHYW1lQWN0aW9ucy5nYW1lT3Zlcih7XHJcbiAgICAgICAgdHlwZTogJ2RlZmVhdCcsXHJcbiAgICAgICAgd2lubmVyOiBkYXRhLmNvbG9yID09PSAnd2hpdGUnID8gJ1doaXRlJyA6ICdCbGFjaydcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBpV2luID0gdGhpcy5zdGF0ZS5jb2xvciA9PT0gZGF0YS5jb2xvcjtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgIHRpdGxlOiBpV2luID8gJ1lvdSB3aW4hJyA6ICdZb3UgbG9zZSEnLFxyXG4gICAgICAgICB0ZXh0OiBpV2luID8gJ3lheScgOiAnQmV0dGVyIGx1Y2sgbmV4dCB0aW1lIScsXHJcbiAgICAgICAgIGltYWdlVXJsOiBpV2luPyAnaHR0cDovL29yaWcwOC5kZXZpYW50YXJ0Lm5ldC9iODNkL2YvMjAxMy8yNzIvNy85L2hhcHB5X3B1cHB5X2J5X2xha2kxMC1kNm9pNG50LnBuZycgOiAnaHR0cHM6Ly9pYW1waWVycmVtZW5hcmQuZmlsZXMud29yZHByZXNzLmNvbS8yMDE0LzAyL3NhZC1kb2cuanBnJ1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlvLm9uKCdwbGF5ZXItcmVzaWduZWQnLCBkYXRhID0+IHtcclxuICAgICAgLy8gZGF0YS5jb2xvciA9IHBsYXllciB3aG8gcmVzaWduZWRcclxuICAgICAgY29uc3QgcmVzaWduR3V5ID0gZGF0YS5jb2xvciA9PT0gJ3doaXRlJyA/ICdXaGl0ZScgOiAnQmxhY2snLFxyXG4gICAgICAgICAgICB3aW5uZXIgPSBkYXRhLmNvbG9yID09PSAnd2hpdGUnID8gJ0JsYWNrJyA6ICdXaGl0ZSc7XHJcblxyXG4gICAgICBHYW1lQWN0aW9ucy5nYW1lT3Zlcih7XHJcbiAgICAgICAgdHlwZTogJ3Jlc2lnbicsXHJcbiAgICAgICAgd2lubmVyXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgaVdpbiA9IHRoaXMuc3RhdGUuY29sb3IgIT09IGRhdGEuY29sb3I7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICB0aXRsZTogaVdpbiA/IGAke3Jlc2lnbkd1eX0gaGFzIHJlc2lnbmVkIWAgOiAnWW91IGhhdmUgcmVzaWduZWQhJyxcclxuICAgICAgICAgdGV4dDogaVdpbiA/ICdHdWVzcyB5b3Ugd2luIGxvbCDCr1xcXFxfKOODhClfL8KvJyA6ICdib28nLFxyXG4gICAgICAgICBpbWFnZVVybDogaVdpbj8gJ2h0dHA6Ly9vcmlnMDguZGV2aWFudGFydC5uZXQvYjgzZC9mLzIwMTMvMjcyLzcvOS9oYXBweV9wdXBweV9ieV9sYWtpMTAtZDZvaTRudC5wbmcnIDogJ2h0dHBzOi8vaWFtcGllcnJlbWVuYXJkLmZpbGVzLndvcmRwcmVzcy5jb20vMjAxNC8wMi9zYWQtZG9nLmpwZydcclxuICAgICAgfSk7ICAgICAgXHJcbiAgICB9KTtcclxuXHJcbiAgICBpby5vbigncmVtYXRjaC1vZmZlcmVkJywgKCkgPT5cclxuICAgICAgdGhpcy5fb3Blbk1vZGFsKCdvZmZlcicsICdZb3VyIG9wcG9uZW50IGhhcyBzZW50IHlvdSBhIHJlbWF0Y2ggb2ZmZXIuJykpO1xyXG5cclxuICAgIGlvLm9uKCdyZW1hdGNoLWRlY2xpbmVkJywgKCkgPT5cclxuICAgICAgdGhpcy5fb3Blbk1vZGFsKCdpbmZvJywgJ1JlbWF0Y2ggb2ZmZXIgaGFzIGJlZW4gZGVjbGluZWQuJykpO1xyXG5cclxuICAgIGlvLm9uKCdyZW1hdGNoLWFjY2VwdGVkJywgKCkgPT4ge1xyXG4gICAgICBHYW1lQWN0aW9ucy5yZW1hdGNoKCk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGNvbG9yOiB0aGlzLnN0YXRlLmNvbG9yID09PSAnd2hpdGUnID8gJ2JsYWNrJyA6ICd3aGl0ZScsXHJcbiAgICAgICAgbW9kYWw6IHRoaXMuc3RhdGUubW9kYWwuc2V0KCdvcGVuJywgZmFsc2UpXHJcbiAgICAgIH0sICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb2xvciA9PT0gJ3doaXRlJykge1xyXG4gICAgICAgICAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xyXG4gICAgICAgICAgICB0b2tlbjogdGhpcy5wcm9wcy5wYXJhbXNbMF0sXHJcbiAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW8ub24oJ29wcG9uZW50LWRpc2Nvbm5lY3RlZCcsICgpID0+ICB7XHJcbiAgICAgIGlmICghdGhpcy5zdGF0ZS5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpKSB7XHJcbiAgICAgICAgdGhpcy5fb3Blbk1vZGFsKCdpbmZvJywgJ1lvdXIgb3Bwb25lbnQgaGFzIGRpc2Nvbm5lY3RlZC4nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNPcHBvbmVudEF2YWlsYWJsZTogZmFsc2V9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIEdhbWVTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgR2FtZVN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcclxuICB9LFxyXG5cclxuXHJcblxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7aW8sIHBhcmFtc30gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3Qge2NvbG9yLCBnYW1lT3ZlciwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgY29tbW9uUHJvcHMgPSB7XHJcbiAgICAgIGlvOiBpbyxcclxuICAgICAgY29sb3I6IGNvbG9yLFxyXG4gICAgICBvcGVuTW9kYWw6IHRoaXMuX29wZW5Nb2RhbCxcclxuICAgICAgaXNPcHBvbmVudEF2YWlsYWJsZTogaXNPcHBvbmVudEF2YWlsYWJsZVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxHYW1lSGVhZGVyXHJcbiAgICAgICAgICB7Li4uY29tbW9uUHJvcHN9XHJcbiAgICAgICAgICBwYXJhbXM9e3BhcmFtc31cclxuICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlci5nZXQoJ3N0YXR1cycpfSAvPlxyXG5cclxuICAgICAgICA8Q2hhdFxyXG4gICAgICAgICAgey4uLmNvbW1vblByb3BzfVxyXG4gICAgICAgICAgdG9rZW49e3BhcmFtc1swXX0gLz5cclxuXHJcbiAgICAgICAgICA8R2FtZWJvYXJkSW50ZXJmYWNlIFxyXG4gICAgICAgICAgICB7Li4uY29tbW9uUHJvcHN9XHJcbiAgICAgICAgICAgIHRva2VuPXtwYXJhbXNbMF19XHJcbiAgICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlcn0gLz5cclxuXHJcbiAgICAgICAgPE1vZGFsIGRhdGE9e3RoaXMuc3RhdGUubW9kYWx9IC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9LFxyXG5cclxuXHJcblxyXG5cclxuICBfb25HYW1lQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7Z2FtZU92ZXI6IEdhbWVTdG9yZS5nZXRTdGF0ZSgpLmdhbWVPdmVyfSk7XHJcbiAgfSxcclxuICBfb3Blbk1vZGFsKHR5cGUsIG1lc3NhZ2UpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBtb2RhbDogdGhpcy5zdGF0ZS5tb2RhbFxyXG4gICAgICAgIC5zZXQoJ29wZW4nLCB0cnVlKVxyXG4gICAgICAgIC5zZXQoJ21lc3NhZ2UnLCBtZXNzYWdlKVxyXG4gICAgICAgIC5zZXQoJ3R5cGUnLCB0eXBlKVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBfaGlkZU1vZGFsKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7bW9kYWw6IHRoaXMuc3RhdGUubW9kYWwuc2V0KCdvcGVuJywgZmFsc2UpfSk7XHJcbiAgfSxcclxuICBfYWNjZXB0UmVtYXRjaCgpIHtcclxuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgaW8uZW1pdCgncmVtYXRjaC1hY2NlcHQnLCB7XHJcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXHJcbiAgICAgIHRpbWU6IHBhcmFtc1sxXSAqIDYwLFxyXG4gICAgICBpbmM6IHBhcmFtc1syXVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9oaWRlTW9kYWwoKTtcclxuICB9LFxyXG4gIF9kZWNsaW5lUmVtYXRjaCgpIHtcclxuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgaW8uZW1pdCgncmVtYXRjaC1kZWNsaW5lJywge1xyXG4gICAgICB0b2tlbjogcGFyYW1zWzBdXHJcbiAgICB9KTtcclxuICAgIHRoaXMuX2hpZGVNb2RhbCgpO1xyXG4gIH0sXHJcbiAgX3RvZ2dsZVNvdW5kcyhlKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgc291bmRzRW5hYmxlZDogIXRoaXMuc3RhdGUuc291bmRzRW5hYmxlZFxyXG4gICAgfSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xyXG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xyXG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XHJcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XHJcbmltcG9ydCBDaGVzc2JvYXJkIGZyb20gJy4vQ2hlc3Nib2FyZCc7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkJztcclxuaW1wb3J0IENhcHR1cmVkUGllY2VzIGZyb20gJy4vQ2FwdHVyZWRQaWVjZXMnO1xyXG5pbXBvcnQgVGFibGVPZk1vdmVzIGZyb20gJy4vVGFibGVPZk1vdmVzJztcclxuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xyXG5cclxuLyogdGhlIHN0YXRlIG9mIHRoZSBnYW1lYm9hcmQgaXMgbWFuYWdlZCBieSBHYW1lU3RvcmUgKi9cclxuXHJcbmNvbnN0IEdhbWVib2FyZEludGVyZmFjZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcblx0cHJvcFR5cGVzOiB7XHJcblxyXG5cdH0sXHJcblx0bWl4aW5zOiBbb25HYW1lQ2hhbmdlXSxcdFx0Ly8gdGhpcyBtaXhpbiBpcyByZXNwb25zaWJsZSBmb3IgZHluYW1pY2FsbHkgY2hhbmdpbmcgdGhlIHN0YXRlIG9mIEdhbWVib2FyZEludGVyZmFjZVxyXG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcclxuXHRcdHJldHVybiBHYW1lU3RvcmUuZ2V0U3RhdGUoKTtcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcygpIHtcclxuXHJcblx0fSxcclxuXHRjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XHJcblxyXG5cdH0sXHJcblx0cmVuZGVyKCkge1xyXG5cdFx0Y29uc3Qge3Byb21vdGlvbiwgdHVybiwgZ2FtZU92ZXIsIGNoZWNrfSA9IHRoaXMuc3RhdGVcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJib2FyZC1tb3Zlcy13cmFwcGVyXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cclxuXHRcdFx0XHQ8ZGl2IGlkPVwiYm9hcmQtd3JhcHBlclwiPlxyXG5cclxuXHRcdFx0XHRcdDxwPllvdSBhcmU6IHt0aGlzLnByb3BzLmNvbG9yPT09J3doaXRlJyA/ICdXaGl0ZScgOiAnQmxhY2snfTwvcD5cclxuXHRcdFx0XHRcdDxDYXB0dXJlZFBpZWNlcyAvPlxyXG5cclxuXHRcdFx0XHRcdDxCb2FyZCBzaXplPXs2fVxyXG5cdFx0XHRcdFx0XHR7Li4ub21pdCh0aGlzLnByb3BzLCAnZ2FtZU92ZXInKX1cclxuXHRcdFx0XHRcdFx0Z2FtZU92ZXI9e2dhbWVPdmVyLmdldCgnc3RhdHVzJyl9IC8+XHJcblxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJmZWVkYmFja1wiPlxyXG5cdFx0XHRcdFx0eyFnYW1lT3Zlci5nZXQoJ3N0YXR1cycpID9cclxuXHRcdFx0XHRcdFx0PHNwYW4+XHJcblx0XHRcdFx0XHRcdFx0e2Ake3R1cm49PT0ndycgPyAnV2hpdGUnIDogJ0JsYWNrJ30gdG8gbW92ZS5gfVxyXG5cdFx0XHRcdFx0XHQ8L3NwYW4+IDpcclxuXHRcdFx0XHRcdFx0PHN0cm9uZz5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+XHJcblx0XHRcdFx0XHRcdFx0ICB7Z2FtZU92ZXIuZ2V0KCd3aW5uZXInKSA9PT0gJ1doaXRlJyA/ICdGJyA6ICdmJ31cclxuXHRcdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0e3RoaXMuX2dldEdhbWVPdmVyTWVzc2FnZShnYW1lT3Zlci5nZXQoJ3dpbm5lcicpKX1cclxuXHRcdFx0XHRcdFx0PC9zdHJvbmc+XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9LFxyXG5cclxuXHRfb25HYW1lQ2hhbmdlKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZShHYW1lU3RvcmUuZ2V0U3RhdGUoKSk7XHJcblx0fSxcclxuXHJcblx0X2dldEdhbWVPdmVyTWVzc2FnZSh3aW5uZXIpIHtcclxuXHRcdHJldHVybiBgJHt3aW5uZXJ9IHdpbnMhYDtcclxuXHR9XHJcblxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZEludGVyZmFjZTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcclxuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5cclxuY29uc3QgTW9kYWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcclxuICB9LFxyXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW5dLFxyXG5cclxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICBjb25zdCBpc09wZW4gPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCdvcGVuJyk7XHJcblxyXG4gICAgaWYgKGlzT3BlbilcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5ZG93bik7XHJcbiAgICBlbHNlXHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleWRvd24pO1xyXG4gIH0sXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcclxuICAgIGNvbnN0IHR5cGUgPSBkYXRhLmdldCgndHlwZScpO1xyXG4gICAgY29uc3QgY2FsbGJhY2tzID0gZGF0YS5nZXQoJ2NhbGxiYWNrcycpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCh7XHJcbiAgICAgICAgICAgICAnbW9kYWwtbWFzayc6IHRydWUsXHJcbiAgICAgICAgICAgICAnaGlkZGVuJzogIWRhdGEuZ2V0KCdvcGVuJylcclxuICAgICAgICAgICB9KX1cclxuICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9oaWRlTW9kYWx9PlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgPHN0cm9uZz5Fc2M6IDwvc3Ryb25nPlxyXG4gICAgICAgICAgPHNwYW4+e3R5cGUgPT09ICdpbmZvJyA/ICdPSycgOiAnRGVjbGluZSd9PC9zcGFuPlxyXG4gICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICA8c3Ryb25nPkVudGVyOiA8L3N0cm9uZz5cclxuICAgICAgICAgIDxzcGFuPnt0eXBlID09PSAnaW5mbycgPyAnT0snIDogJ0FjY2VwdCd9PC9zcGFuPlxyXG4gICAgICAgIDwvcD5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiXHJcbiAgICAgICAgICAgICBvbkNsaWNrPXtlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9PlxyXG4gICAgICAgICAgPHA+e2RhdGEuZ2V0KCdtZXNzYWdlJyl9PC9wPlxyXG5cclxuICAgICAgICAgIHt0eXBlID09PSAnaW5mbycgPyBcclxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIG9rXCJcclxuICAgICAgICAgICAgICAgb25DbGljaz17Y2FsbGJhY2tzLmhpZGV9PlxyXG4gICAgICAgICAgICAgIE9LXHJcbiAgICAgICAgICAgIDwvYT4gOiBbXHJcblxyXG4gICAgICAgICAgICA8YSBrZXk9XCJhXCJcclxuICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuXCJcclxuICAgICAgICAgICAgICAgc3R5bGU9e3tsZWZ0OiAnNGVtJ319XHJcbiAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NhbGxiYWNrcy5hY2NlcHR9PlxyXG4gICAgICAgICAgICAgIEFjY2VwdFxyXG4gICAgICAgICAgICA8L2E+LFxyXG4gICAgICAgICAgICA8YSBrZXk9XCJiXCJcclxuICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi0tcmVkXCJcclxuICAgICAgICAgICAgICAgc3R5bGU9e3tyaWdodDogJzRlbSd9fVxyXG4gICAgICAgICAgICAgICBvbkNsaWNrPXtjYWxsYmFja3MuZGVjbGluZX0+XHJcbiAgICAgICAgICAgICAgRGVjbGluZVxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfSxcclxuICBfb25LZXlkb3duKGUpIHtcclxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCd0eXBlJyk7XHJcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCdjYWxsYmFja3MnKTtcclxuXHJcbiAgICBpZiAodHlwZSA9PT0gJ2luZm8nKSB7XHJcbiAgICAgIGlmIChlLndoaWNoID09PSAxMyB8fCBlLndoaWNoID09PSAyNykge1xyXG4gICAgICAgIGNhbGxiYWNrcy5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29mZmVyJykge1xyXG4gICAgICBpZiAoZS53aGljaCA9PT0gMTMpIHtcclxuICAgICAgICBjYWxsYmFja3MuYWNjZXB0KCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZS53aGljaCA9PT0gMjcpIHtcclxuICAgICAgICBjYWxsYmFja3MuZGVjbGluZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBfaGlkZU1vZGFsKCkge1xyXG4gICAgdGhpcy5wcm9wcy5kYXRhLmdldCgnY2FsbGJhY2tzJykuaGlkZSgpO1xyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RhbDsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcclxuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcclxuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcclxuXHJcbmNvbnN0IFRhYmxlT2ZNb3ZlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBcclxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluLCBvbkdhbWVDaGFuZ2VdLFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtb3ZlczogR2FtZVN0b3JlLmdldE1vdmVzKClcclxuICAgIH07XHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGFibGUgaWQ9XCJtb3Zlc1wiIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XHJcbiAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICA8dGg+VGFibGUgb2YgbW92ZXM8L3RoPlxyXG4gICAgICAgICAgPC90cj5cclxuICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgIHt0aGlzLnN0YXRlLm1vdmVzLm1hcCgocm93LCBpKSA9PiAoXHJcbiAgICAgICAgICAgIDx0ciBrZXk9e2l9PlxyXG4gICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgIDxzdHJvbmc+e2Ake2kgKyAxfS5gfTwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAge3Jvdy5tYXAoKG1vdmUsIGopID0+IChcclxuICAgICAgICAgICAgICAgIDx0ZCBrZXk9e2p9PlxyXG4gICAgICAgICAgICAgICAgICA8c3Bhbj57bW92ZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICkpLnRvQXJyYXkoKX1cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICkpLnRvQXJyYXkoKX1cclxuICAgICAgICA8L3Rib2R5PlxyXG4gICAgICA8L3RhYmxlPlxyXG4gICAgKTtcclxuICB9LFxyXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbW92ZXM6IEdhbWVTdG9yZS5nZXRNb3ZlcygpXHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFibGVPZk1vdmVzOyIsImltcG9ydCBrZXlNaXJyb3IgZnJvbSAncmVhY3QvbGliL2tleU1pcnJvcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBrZXlNaXJyb3Ioe1xyXG4gIFRPR0dMRV9WSVNJQklMSVRZOiBudWxsLFxyXG4gIFNVQk1JVF9NRVNTQUdFOiBudWxsXHJcbn0pOyIsImNvbnN0IENoZXNzUGllY2VzID0ge1xyXG4gIC8vIGtleTogcGllY2UgZnJvbSBGRU4sIHZhbHVlOiBwaWVjZSBmcm9tIFNtYXJ0IFJlZ3VsYXIgY2hlc3MgZm9udFxyXG4gIC8vIHdoaXRlIHBpZWNlc1xyXG4gICdLJzogJ0YnLFxyXG4gICdRJzogJ0UnLFxyXG4gICdSJzogJ0QnLFxyXG4gICdCJzogJ0MnLFxyXG4gICdOJzogJ0InLFxyXG4gICdQJzogJ0EnLFxyXG4gIC8vIGJsYWNrIHBpZWNlc1xyXG4gICdrJzogJ2YnLFxyXG4gICdxJzogJ2UnLFxyXG4gICdyJzogJ2QnLFxyXG4gICdiJzogJ2MnLFxyXG4gICduJzogJ2InLFxyXG4gICdwJzogJ2EnLFxyXG4gIC8vIGVtcHR5IHNxdWFyZVxyXG4gICctJzogdW5kZWZpbmVkXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGVzc1BpZWNlczsiLCJpbXBvcnQga2V5TWlycm9yIGZyb20gJ3JlYWN0L2xpYi9rZXlNaXJyb3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQga2V5TWlycm9yKHtcclxuICBNQUtFX01PVkU6IG51bGwsXHJcbiAgU0hPV19NT1ZFUzogbnVsbCxcclxuICBSRU1BVENIOiBudWxsLFxyXG4gIERSQVc6IG51bGwsXHJcbiAgR0FNRV9PVkVSOiBudWxsLFxyXG4gIENIQU5HRV9QUk9NT1RJT046IG51bGxcclxufSk7IiwiaW1wb3J0IHtEaXNwYXRjaGVyfSBmcm9tICdmbHV4JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24obmV3IERpc3BhdGNoZXIoKSwge1xyXG4gIC8vIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gVGhlIGRhdGEgY29taW5nIGZyb20gdGhlIHZpZXcuXHJcbiAgaGFuZGxlVmlld0FjdGlvbjogZnVuY3Rpb24oYWN0aW9uKSB7XHJcbiAgICB0aGlzLmRpc3BhdGNoKHtcclxuICAgICAgc291cmNlOiAnVklFV19BQ1RJT04nLFxyXG4gICAgICBhY3Rpb246IGFjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG59KTsiLCJjb25zdCBUaWxlQWN0aW9ucyA9IHtcclxuICAgIFwiQXNzYXNzaW5cIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXAgc2xpZGVcIixcclxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wIHNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJqdW1wIHNsaWRlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcImp1bXAgc2xpZGVcIixcclxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wIHNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wIHNsaWRlXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJCb3dtYW5cIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcInN0cmlrZVwiLFxyXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcInN0cmlrZVwiLFxyXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcInN0cmlrZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQ2hhbXBpb25cIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlstMiwwXVwiOiBcImp1bXBcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJiYWNrXCI6IHtcclxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJzdHJpa2VcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcInN0cmlrZVwiLFxyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlstMiwwXVwiOiBcImp1bXBcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkRyYWdvb25cIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwic3RyaWtlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsxLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwic2xpZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkR1Y2hlc3NcIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJiYWNrXCI6IHtcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJEdWtlXCI6IHtcclxuICAgICAgICBcImZyb250XCI6IHtcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwic2xpZGVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJiYWNrXCI6IHtcclxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwic2xpZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkZvb3RtYW5cIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIktuaWdodFwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWy0xLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbMSwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkxvbmdib3dtYW5cIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTNdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTWFyc2hhbGxcIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk9yYWNsZVwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJQaWtlbWFuXCI6IHtcclxuICAgICAgICBcImZyb250XCI6IHtcclxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcIm1vdmVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJiYWNrXCI6IHtcclxuICAgICAgICAgICAgXCJbLTEsLTJdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwic3RyaWtlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUHJpZXN0XCI6IHtcclxuICAgICAgICBcImZyb250XCI6IHtcclxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwic2xpZGVcIixcclxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJzbGlkZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJqdW1wXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSYW5nZXJcIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlstMSwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlstMiwtMV1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsLTFdXCI6IFwianVtcFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcInNsaWRlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsxLDJdXCI6IFwianVtcFwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiU2VlclwiOiB7XHJcbiAgICAgICAgXCJmcm9udFwiOiB7XHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlstMiwwXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYmFja1wiOiB7XHJcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWy0yLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJXaXphcmRcIjoge1xyXG4gICAgICAgIFwiZnJvbnRcIjoge1xyXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcclxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxyXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJhY2tcIjoge1xyXG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcImp1bXBcIixcclxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXHJcbiAgICAgICAgICAgIFwiWy0yLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxyXG4gICAgICAgICAgICBcIlsyLDJdXCI6IFwianVtcFwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLy8gdmFyIG5ld1VuaXRzID0ge307XHJcbi8vIGZvciAodmFyIHVuaXRLZXkgaW4gVGlsZUFjdGlvbnMpIHtcclxuLy8gICAgIHZhciB1bml0ID0gVGlsZUFjdGlvbnNbdW5pdEtleV07XHJcbi8vICAgICB2YXIgbmV3U2lkZXMgPSB7fTtcclxuLy8gICAgIGZvciAodmFyIHNpZGVLZXkgaW4gdW5pdCkge1xyXG4vLyAgICAgICAgIHZhciBkaXIgPSB1bml0W3NpZGVLZXldO1xyXG4vLyAgICAgICAgIHZhciBuZXdEaXIgPSB7fTtcclxuLy8gICAgICAgICBmb3IgKHZhciBjb29yZHMgaW4gZGlyKSB7XHJcbi8vICAgICAgICAgICAgIHZhciBwYXJzZWQgPSBKU09OLnBhcnNlKGNvb3Jkcyk7XHJcbi8vICAgICAgICAgICAgIHZhciBuZXdDb29yZHMgPSBKU09OLnN0cmluZ2lmeShbcGFyc2VkWzFdLCBwYXJzZWRbMF1dKTtcclxuLy8gICAgICAgICAgICAgbmV3RGlyW25ld0Nvb3Jkc10gPSBkaXJbY29vcmRzXTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgbmV3U2lkZXNbc2lkZUtleV0gPSBuZXdEaXI7XHJcbi8vICAgICB9XHJcbi8vICAgICBuZXdVbml0c1t1bml0S2V5XSA9IG5ld1NpZGVzO1xyXG4vLyB9XHJcbi8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG5ld1VuaXRzKSk7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaWxlQWN0aW9ucztcclxuIiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iajsgfTtcblxudmFyIGlvID0gX2ludGVyb3BSZXF1aXJlKHJlcXVpcmUoXCJzb2NrZXQuaW8tY2xpZW50XCIpKTtcblxudmFyIG9zID0gX2ludGVyb3BSZXF1aXJlKHJlcXVpcmUoXCJvc1wiKSk7XG5cbnZhciBob3N0bmFtZSA9IG9zLmhvc3RuYW1lKCk7XG5cbnZhciBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAxMzM3O1xudmFyIE9SSUdJTiA9IGhvc3RuYW1lLmluZGV4T2YoXCJoZXJva3VhcHAuY29tXCIpICE9PSAtMSA/IGhvc3RuYW1lIDogaG9zdG5hbWUgKyBcIjpcIiArIHBvcnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gaW8uY29ubmVjdChPUklHSU4pO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklrTTZMMVZ6WlhKekwwcGhlUzlFWlhOcmRHOXdMMHBUTDNOb2IyZDFiaTEyTWk5emNtTXZhbk12YVc4dWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTEZsQlFWa3NRMEZCUXpzN096dEpRVVZPTEVWQlFVVXNNa0pCUVUwc2EwSkJRV3RDT3p0SlFVTXhRaXhGUVVGRkxESkNRVUZQTEVsQlFVazdPMEZCUTNCQ0xFbEJRVTBzVVVGQlVTeEhRVUZITEVWQlFVVXNRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJRenM3UVVGRkwwSXNTVUZCVFN4SlFVRkpMRWRCUVVjc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVsQlFVa3NTVUZCU1N4RFFVRkRPMEZCUTNSRExFbEJRVTBzVFVGQlRTeEhRVUZITEZGQlFWRXNRMEZCUXl4UFFVRlBMRU5CUVVNc1pVRkJaU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVkQlFVY3NVVUZCVVN4SFFVRkhMRkZCUVZFc1IwRkJReXhIUVVGSExFZEJRVU1zU1VGQlNTeERRVUZET3p0cFFrRkZlRVVzUlVGQlJTeERRVUZETEU5QlFVOHNRMEZCUXl4TlFVRk5MRU5CUVVNaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2NseHVYSEpjYm1sdGNHOXlkQ0JwYnlCbWNtOXRJQ2R6YjJOclpYUXVhVzh0WTJ4cFpXNTBKenRjY2x4dWFXMXdiM0owSUc5eklHWnliMjBnSUZ3aWIzTmNJanRjY2x4dVkyOXVjM1FnYUc5emRHNWhiV1VnUFNCdmN5NW9iM04wYm1GdFpTZ3BPMXh5WEc1Y2NseHVZMjl1YzNRZ2NHOXlkQ0E5SUhCeWIyTmxjM011Wlc1MkxsQlBVbFFnZkh3Z01UTXpOenRjY2x4dVkyOXVjM1FnVDFKSlIwbE9JRDBnYUc5emRHNWhiV1V1YVc1a1pYaFBaaWduYUdWeWIydDFZWEJ3TG1OdmJTY3BJQ0U5UFNBdE1TQS9JR2h2YzNSdVlXMWxJRG9nYUc5emRHNWhiV1VyWENJNlhDSXJjRzl5ZER0Y2NseHVYSEpjYm1WNGNHOXlkQ0JrWldaaGRXeDBJR2x2TG1OdmJtNWxZM1FvVDFKSlIwbE9LVHNpWFgwPSIsImNvbnN0IG1heWJlUmV2ZXJzZSA9IHtcclxuICBfbWF5YmVSZXZlcnNlKGl0ZXJhYmxlLCBjb2xvcikge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY29sb3IgPT09IChjb2xvciB8fCAnYmxhY2snKSA/XHJcbiAgICAgIGl0ZXJhYmxlLnJldmVyc2UoKSA6IGl0ZXJhYmxlO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1heWJlUmV2ZXJzZTsiLCJpbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xyXG5cclxuY29uc3Qgb25HYW1lQ2hhbmdlID0ge1xyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgR2FtZVN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xyXG4gIH0sXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICBHYW1lU3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9uR2FtZUNoYW5nZTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInO1xyXG5pbXBvcnQge0V2ZW50RW1pdHRlcjIgYXMgRXZlbnRFbWl0dGVyfSBmcm9tICdldmVudGVtaXR0ZXIyJztcclxuaW1wb3J0IENoYXRDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0NoYXRDb25zdGFudHMnO1xyXG5pbXBvcnQge0xpc3QsIE1hcH0gZnJvbSAnaW1tdXRhYmxlJztcclxuXHJcbmNvbnN0IENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xyXG4gIFxyXG52YXIgX21lc3NhZ2VzID0gTGlzdCgpO1xyXG52YXIgX3Vuc2VlbkNvdW50ID0gMDtcclxudmFyIF9pc0NoYXRIaWRkZW4gPSB0cnVlO1xyXG5cclxuY29uc3QgQ2hhdFN0b3JlID0gT2JqZWN0LmFzc2lnbih7fSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xyXG4gIGdldFN0YXRlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWVzc2FnZXM6IF9tZXNzYWdlcyxcclxuICAgICAgdW5zZWVuQ291bnQ6IF91bnNlZW5Db3VudCxcclxuICAgICAgaXNDaGF0SGlkZGVuOiBfaXNDaGF0SGlkZGVuXHJcbiAgICB9O1xyXG4gIH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVWaXNpYmlsaXR5KCkge1xyXG4gIF9pc0NoYXRIaWRkZW4gPSAhX2lzQ2hhdEhpZGRlbjtcclxuICBfdW5zZWVuQ291bnQgPSAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdWJtaXRNZXNzYWdlKG1lc3NhZ2UsIGNsYXNzTmFtZSwgcmVjZWl2ZWQpIHtcclxuICBfbWVzc2FnZXMgPSBfbWVzc2FnZXMucHVzaChNYXAoe1xyXG4gICAgbWVzc2FnZTogbWVzc2FnZSxcclxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lXHJcbiAgfSkpO1xyXG5cclxuICBpZiAocmVjZWl2ZWQgJiYgX2lzQ2hhdEhpZGRlbikge1xyXG4gICAgX3Vuc2VlbkNvdW50ICs9IDE7XHJcbiAgfVxyXG59XHJcblxyXG5BcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKHBheWxvYWQgPT4ge1xyXG4gIGNvbnN0IGFjdGlvbiA9IHBheWxvYWQuYWN0aW9uO1xyXG5cclxuICBzd2l0Y2ggKGFjdGlvbi5hY3Rpb25UeXBlKSB7XHJcbiAgICBjYXNlIENoYXRDb25zdGFudHMuVE9HR0xFX1ZJU0lCSUxJVFk6XHJcbiAgICAgIHRvZ2dsZVZpc2liaWxpdHkoKTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSBDaGF0Q29uc3RhbnRzLlNVQk1JVF9NRVNTQUdFOlxyXG4gICAgICBzdWJtaXRNZXNzYWdlKGFjdGlvbi5tZXNzYWdlLCBhY3Rpb24uY2xhc3NOYW1lLCBhY3Rpb24ucmVjZWl2ZWQpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIENoYXRTdG9yZS5lbWl0KENIQU5HRV9FVkVOVCk7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hhdFN0b3JlOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XHJcbmltcG9ydCB7RXZlbnRFbWl0dGVyMiBhcyBFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50ZW1pdHRlcjInO1xyXG5pbXBvcnQgR2FtZUNvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvR2FtZUNvbnN0YW50cyc7XHJcbmltcG9ydCBDaGVzc1BpZWNlcyBmcm9tICcuLi9jb25zdGFudHMvQ2hlc3NQaWVjZXMnO1xyXG5pbXBvcnQge0NoZXNzfSBmcm9tICdjaGVzcy5qcyc7XHJcbmltcG9ydCB7TGlzdCwgTWFwLCBPcmRlcmVkTWFwLCBTZXR9IGZyb20gJ2ltbXV0YWJsZSc7XHJcbmltcG9ydCBiZWhhdmlvciBmcm9tICcuLi9nYW1lL2JlaGF2aW9yJztcclxuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xyXG5cclxuY29uc3QgQ0hBTkdFX0VWRU5UID0gJ2NoYW5nZSc7XHJcbmNvbnN0IE1PVkVfRVZFTlQgPSAnbmV3LW1vdmUnO1xyXG5cclxudmFyIF9nYW1lT3ZlcjtcclxudmFyIF9jYXB0dXJlZFBpZWNlcztcclxudmFyIF9tb3ZlcztcclxudmFyIF9tb3ZlZDtcclxudmFyIF90dXJuO1xyXG52YXIgX2NoZWNrO1xyXG52YXIgX2xhc3RNb3ZlO1xyXG52YXIgX2NoZXNzO1xyXG5cclxudmFyIF9ib2FyZCwgX2xpZ2h0dXAsIF9zdHJpa2UsIF9kcm9wLCBfc2VsZWN0ZWQsIF9kcmF3biA9IFtdLCBfcmVzdWx0LCBfZGVjaywgX3BlbmRpbmdEcmF3O1xyXG5cclxuXHJcbnNldEluaXRpYWxTdGF0ZSgpO1xyXG5cclxudmFyIEdhbWVTdG9yZSA9IE9iamVjdC5hc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcclxuICAgIGFkZENoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihjYikge1xyXG4gICAgICB0aGlzLm9uKENIQU5HRV9FVkVOVCwgY2IpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24oY2IpIHtcclxuICAgICAgdGhpcy5yZW1vdmVDaGFuZ2VMaXN0ZW5lcihDSEFOR0VfRVZFTlQsIGNiKTtcclxuICAgIH0sXHJcbiAgICBnZXRTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnYW1lT3ZlcjogX2dhbWVPdmVyLFxyXG4gICAgICAgICAgICB0dXJuOiBfdHVybixcclxuICAgICAgICAgICAgY2hlY2s6IF9jaGVjayxcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGdldENhcHR1cmVkUGllY2VzKCkge1xyXG4gICAgICAgIHJldHVybiBfY2FwdHVyZWRQaWVjZXM7XHJcbiAgICB9LFxyXG4gICAgZ2V0TW92ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9tb3ZlcztcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0R2FtZWJvYXJkU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYm9hcmQ6IF9ib2FyZCxcclxuICAgICAgICAgICAgbGlnaHR1cDogX2xpZ2h0dXAsXHJcbiAgICAgICAgICAgIHN0cmlrZTogX3N0cmlrZSxcclxuICAgICAgICAgICAgZHJvcDogX2Ryb3AsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiBfc2VsZWN0ZWQsXHJcbiAgICAgICAgICAgIGRyYXdVbml0OiBfcmVzdWx0LFxyXG4gICAgICAgICAgICB0dXJuOiBfdHVybixcclxuICAgICAgICAgICAgbW92ZWQ6IF9tb3ZlZCxcclxuICAgICAgICAgICAgZGVjazogX2RlY2ssXHJcbiAgICAgICAgICAgIHBlbmRpbmdEcmF3OiBfcGVuZGluZ0RyYXcsXHJcbiAgICAgICAgICAgIGdhbWVvdmVyOiBfZ2FtZU92ZXJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxufSk7XHJcblxyXG5cclxuZnVuY3Rpb24gc2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgX2dhbWVPdmVyID0gTWFwKHtcclxuICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgIHR5cGU6IG51bGwsXHJcbiAgICAgICAgd2lubmVyOiBudWxsXHJcbiAgICB9KTtcclxuICAgIF9jYXB0dXJlZFBpZWNlcyA9IE9yZGVyZWRNYXAoW1xyXG4gICAgICAgIFsndycsIExpc3QoKV0sXHJcbiAgICAgICAgWydiJywgTGlzdCgpXVxyXG4gICAgXSk7XHJcbiAgICBfbW92ZXMgPSBMaXN0KCk7XHJcbiAgICBfdHVybiA9ICd3JztcclxuICAgIF9tb3ZlZCA9IGZhbHNlO1xyXG4gICAgX2NoZWNrID0gZmFsc2U7XHJcbiAgICBfbGFzdE1vdmUgPSBNYXAoKTtcclxuICAgIF9zZWxlY3RlZCA9IG51bGw7XHJcbiAgICBfcGVuZGluZ0RyYXcgPSBudWxsO1xyXG4gICAgLy9fY2hlc3MgPSBuZXcgQ2hlc3MoKTtcclxuXHJcbiAgICBfbGlnaHR1cCA9IHt9O1xyXG4gICAgX3N0cmlrZSA9IHt9O1xyXG4gICAgX2Ryb3AgPSB7fTtcclxuXHJcbiAgICBfYm9hcmQgPSB7XHJcbiAgICAgICAgLy8gJ1sxLCAyXSc6IHt1bml0OiAnV2l6YXJkJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxyXG4gICAgICAgIC8vICdbMiwgMF0nOiB7dW5pdDogJ0R1a2UnLCBjb2xvcjogJ2JsYWNrJywgc2lkZTogJ2Zyb250J30sXHJcbiAgICAgICAgLy8gJ1syLCAxXSc6IHt1bml0OiAnUGlrZW1hbicsIGNvbG9yOiAnYmxhY2snLCBzaWRlOiAnZnJvbnQnfSxcclxuICAgICAgICAvLyAnWzEsIDNdJzoge3VuaXQ6ICdBc3Nhc3NpbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnZnJvbnQnfSxcclxuICAgICAgICAvLyAnWzIsIDRdJzoge3VuaXQ6ICdMb25nYm93bWFuJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdiYWNrJ30sXHJcbiAgICAgICAgLy8gJ1szLCA1XSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnYmFjayd9LFxyXG4gICAgICAgIC8vICdbNCwgNV0nOiB7dW5pdDogJ0Zvb3RtYW4nLCBjb2xvcjogJ3doaXRlJywgc2lkZTogJ2JhY2snfSxcclxuICAgICAgICAvLyAnWzQsIDRdJzoge3VuaXQ6ICdSYW5nZXInLCBjb2xvcjogJ2JsYWNrJywgc2lkZTogJ2JhY2snfSxcclxuICAgICAgICAvLyAnWzMsIDRdJzoge3VuaXQ6ICdEcmFnb29uJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9LFxyXG4gICAgICAgIC8vICdbMSwgNV0nOiB7dW5pdDogJ0R1a2UnLCBjb2xvcjogJ3doaXRlJywgc2lkZTogJ2Zyb250J31cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgJ1sxLCAwXSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnYmxhY2snLCBzaWRlOiAnZnJvbnQnfSxcclxuICAgICAgICAnWzIsIDBdJzoge3VuaXQ6ICdEdWtlJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxyXG4gICAgICAgICdbMywgMF0nOiB7dW5pdDogJ0Zvb3RtYW4nLCBjb2xvcjogJ2JsYWNrJywgc2lkZTogJ2Zyb250J30sXHJcbiAgICAgICAgJ1syLCA1XSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnZnJvbnQnfSxcclxuICAgICAgICAnWzMsIDVdJzoge3VuaXQ6ICdEdWtlJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9LFxyXG4gICAgICAgICdbNCwgNV0nOiB7dW5pdDogJ0Zvb3RtYW4nLCBjb2xvcjogJ3doaXRlJywgc2lkZTogJ2Zyb250J30sXHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIF9kZWNrID0gWy4uLk9iamVjdC5rZXlzKG9taXQoYmVoYXZpb3IsICdEdWtlJykpLCAnUGlrZW1hbicsICdQaWtlbWFuJ107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vdmVUb0JvYXJkKCkge1xyXG5cclxuXHJcbiAgICBpZiAoZW1pdE1vdmUpIHtcclxuICAgICAgICBHYW1lU3RvcmUuZW1pdChNT1ZFX0VWRU5ULCB7XHJcbiAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgY2FwdHVyZTogY2FwdHVyZSxcclxuICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgYm9hcmQ6IF9ib2FyZFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVCb2FyZChmcm9tLCB0bywgdHlwZSkge1xyXG5cclxuICAgIC8vIGlmIGNhbGxlZCBieSBhIG1vdmUgZXZlbnQsIHRoZSBmcm9tIHBhcmFtZXRlciB3aWxsIGJlIGEgcG9zaXRpb24gb24gdGhlIGJvYXJkIChpLmUuIGEgc3RyaW5nKVxyXG4gICAgLy8gaWYgY2FsbGVkIGJ5IGEgZHJhdyBldmVudCwgdGhlIGZyb20gcGFyYW1ldGVyIHdpbGwgYmUgYW4gYWN0dWFsIHVuaXQgKGkuZS4gYW4gb2JqZWN0KVxyXG5cclxuICAgIGlmICh0eXBlb2YgZnJvbSA9PT0gJ29iamVjdCcpIHsgICAgICAgICAvLyBkcmF3IGV2ZW50XHJcbiAgICAgICAgX2JvYXJkW3RvXSA9IGZyb207XHJcbiAgICAgICAgX2Ryb3AgPSB7fTtcclxuICAgICAgICBfcGVuZGluZ0RyYXcgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGVsc2UgaWYgKHR5cGVvZiBmcm9tID09PSAnc3RyaW5nJykgeyAgICAvLyBtb3ZlIGV2ZW50XHJcblxyXG4gICAgICAgIGxldCB1bml0ID0gX2JvYXJkW2Zyb21dO1xyXG5cclxuICAgICAgICB1bml0LnNpZGUgPSAodW5pdC5zaWRlID09PSAnZnJvbnQnKSA/ICdiYWNrJyA6ICdmcm9udCc7XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09PSAnbW92ZScpIHtcclxuICAgICAgICAgIF9ib2FyZFtmcm9tXSA9IG51bGw7XHJcbiAgICAgICAgICBfYm9hcmRbdG9dID0gdW5pdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmlrZScpIHtcclxuICAgICAgICAgIF9ib2FyZFt0b10gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBfc2VsZWN0ZWQgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBfYm9hcmQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VNb3ZlKGZyb20sIHRvLCBjYXB0dXJlLCB0eXBlLCBlbWl0TW92ZSkge1xyXG4gICBcclxuICAgIHVwZGF0ZUJvYXJkKGZyb20sIHRvLCB0eXBlKTtcclxuXHJcbiAgICBfdHVybiA9IF90dXJuID09PSAndycgPyAnYicgOiAndyc7XHJcblxyXG4gICAgaWYgKGVtaXRNb3ZlKSB7XHJcbiAgICAgICAgR2FtZVN0b3JlLmVtaXQoTU9WRV9FVkVOVCwge1xyXG4gICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICB0bzogdG8sXHJcbiAgICAgICAgICAgIGNhcHR1cmU6IGNhcHR1cmUsXHJcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsICAgXHJcbiAgICAgICAgICAgIGdhbWVPdmVyOiBpc0R1a2VEZWFkKClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBkcmF3KCkge1xyXG4gICAgbGV0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKl9kZWNrLmxlbmd0aCk7XHJcbiAgICBfcGVuZGluZ0RyYXcgPSBfZGVjay5zcGxpY2UocmFuZG9tSW5kZXgsIDEpWzBdOyAgICAgICBcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0R1a2VEZWFkKCkge1xyXG4gICAgbGV0IGR1a2VzID0gT2JqZWN0LmtleXMoX2JvYXJkKS5maWx0ZXIocG9zID0+IF9ib2FyZFtwb3NdICYmIF9ib2FyZFtwb3NdLnVuaXQgPT09IFwiRHVrZVwiKVxyXG4gICAgICAgIC5tYXAocG9zID0+IF9ib2FyZFtwb3NdLmNvbG9yKTtcclxuICAgIHJldHVybiBkdWtlcy5sZW5ndGggPT09IDE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdhbWVPdmVyKG9wdGlvbnMpIHtcclxuICAgIF9nYW1lT3ZlciA9IF9nYW1lT3ZlclxyXG4gICAgICAgIC5zZXQoJ3N0YXR1cycsIHRydWUpXHJcbiAgICAgICAgLnNldCgnd2lubmVyJywgb3B0aW9ucy53aW5uZXIpXHJcbiAgICAgICAgLnNldCgndHlwZScsIG9wdGlvbnMudHlwZSk7XHJcbn1cclxuXHJcbkFwcERpc3BhdGNoZXIucmVnaXN0ZXIocGF5bG9hZCA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSBwYXlsb2FkLmFjdGlvbjtcclxuICAgIGxldCBlbWl0RXZlbnQgPSB0cnVlO1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uLmFjdGlvblR5cGUpIHtcclxuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuTUFLRV9NT1ZFOlxyXG4gICAgICAgICAgICBlbWl0RXZlbnQgPSBtYWtlTW92ZShcclxuICAgICAgICAgICAgICAgIGFjdGlvbi5mcm9tLCBhY3Rpb24udG8sIGFjdGlvbi5jYXB0dXJlLCBhY3Rpb24udHlwZSwgYWN0aW9uLmVtaXRNb3ZlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EUkFXOlxyXG4gICAgICAgICAgICBlbWl0RXZlbnQgPSBkcmF3KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuR0FNRV9PVkVSOlxyXG4gICAgICAgICAgICBnYW1lT3ZlcihhY3Rpb24ub3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuUkVNQVRDSDpcclxuICAgICAgICAgICAgc2V0SW5pdGlhbFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW1pdEV2ZW50KSB7XHJcbiAgICAgICAgR2FtZVN0b3JlLmVtaXQoQ0hBTkdFX0VWRU5UKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVTdG9yZTtcclxuIl19
