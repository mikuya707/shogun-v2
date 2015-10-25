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

},{"./components/GameInterface":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/GameInterface.js","./io":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/io.js","es6-shim":"es6-shim","react":"react"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/node_modules/classnames/index.js":[function(require,module,exports){
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

},{}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/node_modules/react/lib/invariant.js":[function(require,module,exports){
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

},{}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/node_modules/react/lib/keyMirror.js":[function(require,module,exports){
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

},{"./invariant":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/node_modules/react/lib/invariant.js"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/actions/ChatActions.js":[function(require,module,exports){
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

},{"../constants/ChatConstants":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/constants/ChatConstants.js","../dispatcher/AppDispatcher":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/dispatcher/AppDispatcher.js"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/actions/GameActions.js":[function(require,module,exports){
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

},{"../constants/GameConstants":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/constants/GameConstants.js","../dispatcher/AppDispatcher":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/dispatcher/AppDispatcher.js"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/CapturedPieces.js":[function(require,module,exports){
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

},{"../mixins/onGameChange":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/mixins/onGameChange.js","../stores/GameStore":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/stores/GameStore.js","react/addons":"react/addons"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/Chat.js":[function(require,module,exports){
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

},{"../actions/ChatActions":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/actions/ChatActions.js","../stores/ChatStore":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/stores/ChatStore.js","react/addons":"react/addons"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/Chessboard.js":[function(require,module,exports){
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

},{"../actions/GameActions":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/actions/GameActions.js","../constants/ChessPieces":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/constants/ChessPieces.js","../mixins/maybeReverse":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/mixins/maybeReverse.js","../mixins/onGameChange":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/mixins/onGameChange.js","../stores/GameStore":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/stores/GameStore.js","classnames":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/node_modules/classnames/index.js","immutable":"immutable","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/ChessboardInterface.js":[function(require,module,exports){
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

},{"../actions/GameActions":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/actions/GameActions.js","../mixins/onGameChange":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/mixins/onGameChange.js","../stores/GameStore":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/stores/GameStore.js","./CapturedPieces":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/CapturedPieces.js","./Chessboard":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/Chessboard.js","./TableOfMoves":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/TableOfMoves.js","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/Clock.js":[function(require,module,exports){
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

},{"../actions/GameActions":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/actions/GameActions.js","react/addons":"react/addons"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/GameBoard.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react/addons"));

var GameStore = _interopRequire(require("../stores/GameStore"));

var GameActions = _interopRequire(require("../actions/GameActions"));

//import ChessPieces from '../constants/ChessPieces';
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
		console.log("state? ", this.state);
		return this.state;
	},

	// _getValidDrops(position, inRange){

	// },

	_onButtonClick: function _onButtonClick() {
		var _this = this;

		// assume white player for now (so racist)

		var board = this.state.board;

		var dukePosition = Object.keys(board).filter(function (pos) {
			return board[pos] && board[pos].unit === "Duke" && board[pos].color === "white";
		})[0];
		var dukePosArr = JSON.parse(dukePosition);

		var droppableTiles = {};
		[[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(function (adj) {
			var adjX = dukePosArr[0] + adj[0],
			    adjY = dukePosArr[1] + adj[1];
			if (_this._isOnBoard({ x: adjX, y: adjY }) && !board["[" + adjX + ", " + adjY + "]"]) droppableTiles["[" + adjX + ", " + adjY + "]"] = true;
		});
		if (!Object.keys(droppableTiles).length) {
			//alert('No available tiles adjacent to the Duke - cannot draw new unit');
			swal("No available tiles adjacent to the Duke - cannot draw new unit");
		} else {
			this._setDroppable(droppableTiles);
			this._setDrawable(null);
			//alert('what are droppableTiles', droppableTiles);

			this._setSelected("[-1, -1]", droppableTiles);
			//var element = document.getElementById('drawnUnit');
			//console.log('what is element here?', element);
			GameStore.draw();
			//console.log(result);
			var drawnUnit = GameStore.getGameboardState().drawUnit;
			console.log(drawnUnit);
			var drawn = drawnUnit[Object.keys(drawnUnit)[0]];
			this._setDrawable(drawn);
		}

		// var element = document.getElementById('drawnUnit');
		// element.className = "";
		// GameStore.draw();
		// this.state.drawUnit = GameStore.getGameboardState().drawUnit;
		// console.log(this.state.drawUnit);

		// console.log(Object.keys(this.state.drawUnit)[0]);
		// var position = Object.keys(this.state.drawUnit)[0];
		// var unit = this.state.drawUnit[position].unit;
		// var color = this.state.drawUnit[position].color;
		// var side = this.state.drawUnit[position].side;

		//element.classList.add(`${unit}`);
		//element.classList.add("white");
		//element.classList.add("front");
	},
	_onDrawCellClick: function _onDrawCellClick() {
		console.log("i clicked!!");
		var newDrawn;
		if (this.state.drawn.side === "front") {
			newDrawn = this.state.drawn;
			newDrawn.side = "back";
		} else if (this.state.drawn.side === "back") {
			newDrawn = this.state.drawn;
			newDrawn.side = "front";
		}
		console.log(newDrawn);
		this.setState({
			drawn: newDrawn
		});
	},

	componentDidMount: function componentDidMount() {
		var _this = this;

		//GameStore.addChangeListener(this._onChange);

		var _props = this.props;
		var io = _props.io;
		var token = _props.token;

		GameStore.on("change", this._onGameChange);
		GameStore.on("new-move", this._onNewMove);

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
	},
	componentWillUnmount: function componentWillUnmount() {
		GameStore.removeChangeListener(this._onChange);
	},
	// _onChange() {

	// 	this.setState({
	// 		lightup: GameStore.getGameboardState().lightup
	// 	});
	// },
	_reversePosition: function _reversePosition(pos) {
		var size = this.props.size;

		var posArr = JSON.parse(pos);
		return "[" + (size - 1 - posArr[0]) + ", " + (size - 1 - posArr[1]) + "]";
	},

	_reverseBoard: function _reverseBoard() {
		var board = this.state.board;

		var newBoard = {},
		    self = this;
		Object.keys(board).forEach(function (pos) {
			// let posArr = JSON.parse(pos);
			// newBoard[`[${size-1-posArr[0]}, ${size-1-posArr[1]}]`] = board[pos];
			newBoard[self._reversePosition(pos)] = board[pos];
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
			turn: state.turn
		}, cb);
	},
	_onNewMove: function _onNewMove(move) {
		var _props = this.props;
		var io = _props.io;
		var token = _props.token;

		io.emit("new-move", {
			token: token,
			move: move
		});
	},
	render: function render() {
		var _this = this;

		var _ref = this;

		var state = _ref.state;
		var props = _ref.props;var size = props.size;

		// <<<<<<< HEAD
		// 			{size} = props,
		// 			{board, selected, lightup, strike, drop, drawn} = state;
		// =======
		var color = props.color;var board = state.board;
		var selected = state.selected;
		var lightup = state.lightup;
		var strike = state.strike;
		var drop = state.drop;
		var turn = state.turn;
		var drawn = state.drawn;

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
							return React.createElement(
								"td",
								{ position: "[" + idx2 + ", " + idx1 + "]" },
								React.createElement(Cell, { ref: "[" + idx2 + ", " + idx1 + "]",
									position: "[" + idx2 + ", " + idx1 + "]",
									unit: board["[" + idx2 + ", " + idx1 + "]"] ? board["[" + idx2 + ", " + idx1 + "]"].unit : null,
									color: board["[" + idx2 + ", " + idx1 + "]"] ? board["[" + idx2 + ", " + idx1 + "]"].color : null,
									playerColor: color, side: board["[" + idx2 + ", " + idx1 + "]"] ? board["[" + idx2 + ", " + idx1 + "]"].side : null,
									litup: lightup["[" + idx2 + ", " + idx1 + "]"],
									strikable: strike["[" + idx2 + ", " + idx1 + "]"], canDrop: drop["[" + idx2 + ", " + idx1 + "]"],
									selected: selected, turn: turn, setSelected: _this._setSelected,
									setDrawable: _this._setDrawable,
									setDroppable: _this._setDroppable,
									onClick: _this._onCellClick })
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
				React.createElement(DrawnComponent, { position: "[-1, -1]", unit: drawn ? drawn.unit : null, color: drawn ? drawn.color : null, side: drawn ? drawn.side : null, drawAUnit: this._onDrawCellClick })
			)
		);
	},

	_onDrawnDragStart: function _onDrawnDragStart(e) {
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", "");

		//const {unit, position, color, selected, setSelected, litup, drop, strikable, droppable, side} = this.props;
		//setSelected('[-1,-1]', 'draw');

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

	_setDroppable: function _setDroppable(tiles) {
		this.setState({
			drop: tiles
		});
	},

	_setDrawable: function _setDrawable(tile) {
		this.setState({
			drawn: tile
		});
	},

	_getValidMoves: function _getValidMoves(position, moves) {
		var _this = this;

		if (!moves) {
			return;
		}var playerColor = this.props.color;
		var output = {};

		var inRange = [];
		var posArr = JSON.parse(position);
		var theBoard = playerColor === "black" ? this._reverseBoard() : this.state.board;

		Object.keys(moves).map(function (move) {
			var moveArr = JSON.parse(move);

			if (moves[move] === "move" || moves[move] === "jump") {
				var x = posArr[0] + moveArr[0],
				    y = posArr[1] + moveArr[1];
				inRange.push({ x: x, y: y, type: "move" });
			} else if (moves[move] === "slide" || moves[move] === "jump slide") {

				var deltaX = moveArr[0] ? moveArr[0] / Math.abs(moveArr[0]) : moveArr[0],
				    deltaY = moveArr[1] ? moveArr[1] / Math.abs(moveArr[1]) : moveArr[1];

				var i = posArr[0] + deltaX,
				    j = posArr[1] + deltaY;
				while (i >= 0 && i < 6 && j >= 0 && j < 6) {
					var unitInTheWay = theBoard["[" + i + ", " + j + "]"];
					if (unitInTheWay && moves[move] === "slide") {
						if (unitInTheWay.color !== theBoard[position].color) {
							inRange.push({ x: i, y: j, type: "move" });
						}
						break;
					} else inRange.push({ x: i, y: j, type: "move" });
					i += deltaX;
					j += deltaY;
				}
			} else if (moves[move] === "strike") {
				var x = posArr[0] + moveArr[0],
				    y = posArr[1] + moveArr[1];
				inRange.push({ x: x, y: y, type: "strike" });
			}
		});

		var movableTiles = {},
		    strikableTiles = {};
		//let board = playerColor === 'black' ? this._reverseBoard() : this.state.board;
		inRange.filter(function (range) {
			// is on board
			if (!_this._isOnBoard(range)) return false;

			// no unit of the same color on square
			var coordsStr = "[" + range.x + ", " + range.y + "]";
			var targetUnit = theBoard[coordsStr];
			if (targetUnit) {
				if (theBoard[position].color === targetUnit.color) return false;
			}

			return true;
		}).forEach(function (range) {
			if (range.type === "move") movableTiles["[" + range.x + ", " + range.y + "]"] = true;else if (range.type === "strike") strikableTiles["[" + range.x + ", " + range.y + "]"] = true;
		});

		return {
			movableTiles: movableTiles,
			strikableTiles: strikableTiles
		};
	},

	_isOnBoard: function _isOnBoard(coords) {
		return coords.x >= 0 && coords.y >= 0 && coords.x < 6 && coords.y < 6;
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
	getInitialState: function getInitialState() {
		return {
			//side: 'front',
			isSelected: false
		};
	},
	componentDidMount: function componentDidMount() {},

	componentWillMount: function componentWillMount() {},

	mixins: [],

	_onClickSquare: function _onClickSquare() {

		// const {unit, position, color, selected, setSelected, litup, strikable, canDrop, side} = this.props;

		// const {isSelected} = this.state;
		var boardState = GameStore.getGameboardState();
		// =======
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

		// >>>>>>> master

		var _props2 = this.props;
		var position = _props2.position;
		var selected = _props2.selected;

		if (turn !== playerColor.charAt(0)) {
			return;
		} // if there is no currently selected unit, click a unit (of the same color) to select it
		if (!selected) {
			if (unit && color === playerColor) {
				var moves = behavior[unit][side];
				setSelected(position, moves);
			}
		}
		// if there is currently a selected unit on the board, can do one of the following:
		else {
			if (playerColor === "black") {
				position = this._reversePosition(position);
				selected = this._reversePosition(selected);
			}

			if (this.props.litup) {
				// move to a square with an opposite color unit to capture it
				if (unit && color !== playerColor) {
					GameActions.makeMove(selected, position, true, "move", true);
				}

				// move to an unoccupied square
				else {
					GameActions.makeMove(selected, position, false, "move", true);
				}

				setSelected(null, []);
			} else if (this.props.strikable && unit && color !== playerColor) {
				GameActions.makeMove(selected, position, true, "strike", true);
				setSelected(null, []);
			}
			// deselect the current unit by clicking on it
			else if (selected === position) {
				setSelected(null, []);
			}
		}
	},

	_onDragStart: function _onDragStart(e) {
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", "");

		// <<<<<<< HEAD
		// 		const {unit, position, color, selected, setSelected, litup, strikable, canDrop, side} = this.props;
		// 		setSelected(position, behavior[unit][side]);
		// =======
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

		if (!selected) {
			if (unit && color === playerColor) {
				var moves = behavior[unit][side];
				setSelected(position, moves);
			}
		}
		//setSelected(position, behavior[unit][side]);
		// >>>>>>> master
	},
	_onDragOver: function _onDragOver(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	},
	_onDrop: function _onDrop(e) {
		e.preventDefault();
		// <<<<<<< HEAD

		// console.log("i am dropping draw unit");
		// //const {position, unit, color, selected, setSelected, setDroppable} = this.props;
		// const {unit, position, color, selected, setSelected, litup, setDroppable, canDrop, strikable, droppable, side} = this.props;

		// console.log("what's in position", position);
		// //console.log("what's in drop", this.state.drop);
		// //setSelected(null, []);

		// console.log("what is selected?", selected, "what is position", position);
		// if (selected !== position) {
		// 	//GameActions.makeMove(selected, position, false, 'move', true);
		// 	console.log("what is drop???", this.props.drop);
		// 	if (this.props.litup) {
		// 		if (unit) GameActions.makeMove(selected, position, true, 'move', true);
		// 		else GameActions.makeMove(selected, position, false, 'move', true);

		// 	}
		// 	if(this.props.canDrop){
		// 		GameActions.makeMove(selected, position, false, 'move', true);
		// 		//this.setState({drawn: null});
		// 	}

		// =======
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
		var _props2 = this.props;
		var position = _props2.position;
		var selected = _props2.selected;

		if (playerColor === "black") {
			position = this._reversePosition(position);
			selected = this._reversePosition(selected);
		}
		if (this.props.litup) {
			if (unit) GameActions.makeMove(selected, position, true, "move", true);else GameActions.makeMove(selected, position, false, "move", true);
			// >>>>>>> master
		} else if (this.props.strikable && unit) {
			GameActions.makeMove(selected, position, true, "strike", true);
		} else if (this.props.canDrop) {
			GameActions.makeMove(selected, position, false, "move", true);
			var drawUnit = GameStore.getGameboardState().drawUnit;
			setDrawable(null);
		}
		setSelected(null, []);

		setDroppable({});

		this.setState({
			drawn: null
		});
	},

	_reversePosition: function _reversePosition(pos) {
		//const {size} = this.props;
		var posArr = JSON.parse(pos);
		return "[" + (5 - posArr[0]) + ", " + (5 - posArr[1]) + "]";
	},

	render: function render() {
		// <<<<<<< HEAD
		// 		var {unit, color, litup, strikable, canDrop, side} = this.props;
		// =======
		var _props = this.props;
		var unit = _props.unit;
		var color = _props.color;
		var litup = _props.litup;
		var strikable = _props.strikable;
		var canDrop = _props.canDrop;
		var side = _props.side;
		var playerColor = _props.playerColor;

		var cxObj = {
			unit: !!unit,
			litup: litup,
			strikable: strikable,
			canDrop: canDrop,
			opponent: color !== playerColor
		};
		cxObj[side] = true;
		if (unit) {
			cxObj[unit] = true;
			cxObj[color] = true;
		}

		return React.createElement(
			"div",
			{ className: "cellContainer",

				onDragOver: this._onDragOver,
				onDrop: this._onDrop
			},
			React.createElement("a", { className: cx(cxObj),
				onClick: this._onClickSquare,
				onDragStart: this._onDragStart,

				draggable: true })
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

	// onPropsChanged: function() {
	// 		 //console.log(this.state.drawn); // it is ALWAYS true
	// },
	// componentWillReceiveProps: function(nextProps) {
	//  		this.setState({
	//   		 likesIncreasing: nextProps.likeCount > this.props.likeCount
	//  		});
	// },

	// _onChange() {

	// 	this.setState({
	// 		lightup: GameStore.getGameboardState().lightup
	// 	});
	// },

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
	// _onDrop(e) {
	// 	e.preventDefault();
	// 	const {position, unit, color, selected, litup} = this.props;

	// 		//GameActions.makeMove(position, false, 'move', true);
	// 		console.log("is this where i am dropping it?", position);
	// 		//GameActions.moveToBoard(position);

	// },

	// _onDrawnUnitClick(){
	// 	this.setState({
	// 		drawn: drawn
	// 	});
	// this.setState({

	// });
	// var element = document.getElementById('drawnUnit');
	// if (element.classList.contains("front")) {
	// 	element.classList.remove("front");
	//  	element.classList.add("back");
	// }
	// else if(element.classList.contains("back")){
	// 	element.classList.remove("back");
	//  	element.classList.add("front");
	// }
	//},

	render: function render() {
		var _props = this.props;
		var unit = _props.unit;
		var color = _props.color;
		var draggable = _props.draggable;
		var side = _props.side;
		var drawAUnit = _props.drawAUnit;
		var position = _props.position;

		//<div draggable="true" id="drawnUnit" onClick={this._onDrawnUnitClick}></div>

		var cxObj = {
			unit: !!unit
		};
		cxObj[side] = true;
		if (unit) {
			cxObj[unit] = true;
			cxObj[color] = true;
		}

		// 				<div id="drawnUnit"
		// onDragOver={this._onDragOver}
		// onDrop={this._onDrop} draggable className={cx(cxObj)}
		// >
		// 	<a className={cx(cxObj)}
		// 		onClick={drawAUnit}
		// 		onDragStart={this._onDragStart}
		// 		draggable>
		// 	</a>

		// </div>

		return React.createElement(
			"div",
			{ id: "drawnUnit", draggable: true, className: cx(cxObj),
				onClick: drawAUnit },
			React.createElement("a", {
				onClick: drawAUnit,

				draggable: true })
		);
	}

});

module.exports = { Board: GameBoard, Cell: Cell, DrawnComponent: DrawnComponent };

//onDragOver={this._onDragOver}
//className={cx(cxObj)}
// onDragStart={this._onDragStart}

},{"../actions/GameActions":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/actions/GameActions.js","../game/behavior":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/game/behavior.js","../mixins/maybeReverse":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/mixins/maybeReverse.js","../stores/GameStore":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/stores/GameStore.js","classnames":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/node_modules/classnames/index.js","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/GameHeader.js":[function(require,module,exports){
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
        "span",
        { id: "game-type" },
        "" + params[1] + "|" + params[2]
      ),
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

},{"../actions/ChatActions":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/actions/ChatActions.js","../stores/ChatStore":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/stores/ChatStore.js","./Clock":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/Clock.js","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/GameInterface.js":[function(require,module,exports){
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
/*
<ChessboardInterface
{...commonProps}
token={params[0]}
soundsEnabled={soundsEnabled}
gameOver={gameOver} />
*/ /*}
   <Board />
   */

},{"../actions/GameActions":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/actions/GameActions.js","../stores/GameStore":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/stores/GameStore.js","./Chat":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/Chat.js","./ChessboardInterface":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/ChessboardInterface.js","./GameBoard":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/GameBoard.js","./GameHeader":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/GameHeader.js","./GameboardInterface":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/GameboardInterface.js","./Modal":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/Modal.js","immutable":"immutable","react/addons":"react/addons"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/GameboardInterface.js":[function(require,module,exports){
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
					"Im ",
					this.props.color
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
			),
			React.createElement(
				"button",
				{ className: "btn" },
				"donate"
			)
		);
	},

	_onGameChange: function _onGameChange() {
		this.setState(GameStore.getState());
	},

	_getGameOverMessage: function _getGameOverMessage() {
		return "you lose";
	}

});

module.exports = GameboardInterface;

},{"../actions/GameActions":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/actions/GameActions.js","../mixins/onGameChange":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/mixins/onGameChange.js","../stores/GameStore":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/stores/GameStore.js","./CapturedPieces":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/CapturedPieces.js","./Chessboard":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/Chessboard.js","./GameBoard":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/GameBoard.js","./TableOfMoves":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/TableOfMoves.js","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/Modal.js":[function(require,module,exports){
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

},{"classnames":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/node_modules/classnames/index.js","react/addons":"react/addons"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/TableOfMoves.js":[function(require,module,exports){
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

},{"../mixins/onGameChange":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/mixins/onGameChange.js","../stores/GameStore":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/stores/GameStore.js","react/addons":"react/addons"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/constants/ChatConstants.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var keyMirror = _interopRequire(require("react/lib/keyMirror"));

module.exports = keyMirror({
  TOGGLE_VISIBILITY: null,
  SUBMIT_MESSAGE: null
});

},{"react/lib/keyMirror":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/node_modules/react/lib/keyMirror.js"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/constants/ChessPieces.js":[function(require,module,exports){
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

},{}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/constants/GameConstants.js":[function(require,module,exports){
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

},{"react/lib/keyMirror":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/node_modules/react/lib/keyMirror.js"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/dispatcher/AppDispatcher.js":[function(require,module,exports){
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

},{"flux":"flux"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/game/behavior.js":[function(require,module,exports){
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

},{}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/io.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var io = _interopRequire(require("socket.io-client"));

var ORIGIN = "http://localhost:1337";
var WS = ORIGIN;

module.exports = io.connect(WS);

},{"socket.io-client":"socket.io-client"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/mixins/maybeReverse.js":[function(require,module,exports){
"use strict";

var maybeReverse = {
  _maybeReverse: function _maybeReverse(iterable, color) {
    return this.props.color === (color || "black") ? iterable.reverse() : iterable;
  }
};

module.exports = maybeReverse;

},{}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/mixins/onGameChange.js":[function(require,module,exports){
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

},{"../stores/GameStore":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/stores/GameStore.js"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/stores/ChatStore.js":[function(require,module,exports){
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

},{"../constants/ChatConstants":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/constants/ChatConstants.js","../dispatcher/AppDispatcher":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/dispatcher/AppDispatcher.js","eventemitter2":"eventemitter2","immutable":"immutable"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/stores/GameStore.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

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

//import Utils from '../game/utils';
// import behavior from '../game/behavior';

var CHANGE_EVENT = "change";
var MOVE_EVENT = "new-move";

var _gameOver;
var _capturedPieces;
var _moves;
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
    // getChessboardState() {
    //     return {
    //         fen: _chess.fen(),
    //         lastMove: _lastMove,
    //         check: _check
    //     };
    // },

    getGameboardState: function getGameboardState() {
        return {
            board: _board,
            lightup: _lightup,
            strike: _strike,
            drop: _drop,
            selected: _selected,
            drawUnit: _result,
            turn: _turn
        };
    },

    draw: function draw() {
        //'[1, 0]': {unit: 'Footman', color: 'black', side: 'front'},
        var units = [];

        Object.keys(behavior).forEach(function (unit) {
            // console.log("what is the key of behavior?", unit);
            // console.log("what am i adding again??", behavior[`${unit}`]);
            if (_drawn.indexOf(behavior["" + unit]) === -1 && unit !== "Duke") {
                var unitObj = {};
                unitObj["" + unit] = behavior["" + unit];
                units.push(unitObj);
            } else {
                var pikeCounts = 0;
                _drawn.forEach(function (unit) {

                    if (Object.keys(unit)[0] === "Pikeman") {
                        pikeCounts += 1;
                    }
                });
                if (unit === "Pikeman" && pikeCounts < 3) {
                    var i = 3 - pikeCounts;
                    while (i > 0) {
                        var unitObj = {};
                        unitObj["" + unit] = behavior["" + unit];
                        units.push(unitObj);
                        i--;
                    }
                }
            }
        });
        var result = units[Math.floor(Math.random() * units.length)];
        _drawn.push(result);
        var resultToReturn = {};
        resultToReturn["[-1, -1]"] = { unit: "" + Object.keys(result)[0], color: "white", side: "front" };
        _result = resultToReturn;
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
    _check = false;
    _lastMove = Map();
    _selected = null;
    //_chess = new Chess();

    _lightup = {};
    _strike = {};
    _drop = {};

    _board = {
        "[1, 0]": { unit: "Footman", color: "black", side: "front" },
        "[2, 0]": { unit: "Duke", color: "black", side: "front" },
        "[3, 0]": { unit: "Footman", color: "black", side: "front" },
        "[2, 5]": { unit: "Footman", color: "white", side: "front" },
        "[3, 5]": { unit: "Duke", color: "white", side: "front" },
        "[4, 5]": { unit: "Footman", color: "white", side: "front" }
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
    if (from === "[-1, -1]") {
        console.log("what is unit after drop?", _result);
        console.log("what is unit after drop?", _result[from]);
        _result[from].side = "front";
        _board[to] = _result[from];

        //unit = _result;

        // _board[from] = null;
        // _board[to] = unit;
        //console.log("what are the true drops ?", _drop);
        _drop = null;
        _selected = null;
        return _board;
    } else {
        //unit = _board[from];

        //console.log("what is unit after drop?", unit);

        // if (from === '[-1, -1]') {
        //   _board[to] =
        // }

        var unit = _board[from];

        console.log("updateBoard unit:");
        console.log(unit);
        console.log("_board");
        console.log(_board);
        console.log("from: " + from);
        console.log("to: " + to);

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
            type: type });
    }

    return true;
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

// board: _board   
//gameOver: _chess.game_over()

},{"../constants/ChessPieces":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/constants/ChessPieces.js","../constants/GameConstants":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/constants/GameConstants.js","../dispatcher/AppDispatcher":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/dispatcher/AppDispatcher.js","../game/behavior":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/game/behavior.js","chess.js":"chess.js","eventemitter2":"eventemitter2","immutable":"immutable"}]},{},["./src/js/play.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvcGxheS5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2tleU1pcnJvci5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9hY3Rpb25zL0NoYXRBY3Rpb25zLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2FjdGlvbnMvR2FtZUFjdGlvbnMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DYXB0dXJlZFBpZWNlcy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0NoYXQuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DaGVzc2JvYXJkLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2hlc3Nib2FyZEludGVyZmFjZS5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0Nsb2NrLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUJvYXJkLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUhlYWRlci5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0dhbWVJbnRlcmZhY2UuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lYm9hcmRJbnRlcmZhY2UuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9Nb2RhbC5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL1RhYmxlT2ZNb3Zlcy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hhdENvbnN0YW50cy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hlc3NQaWVjZXMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29uc3RhbnRzL0dhbWVDb25zdGFudHMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2dhbWUvYmVoYXZpb3IuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvaW8uanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvbWl4aW5zL21heWJlUmV2ZXJzZS5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9taXhpbnMvb25HYW1lQ2hhbmdlLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL3N0b3Jlcy9DaGF0U3RvcmUuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvc3RvcmVzL0dhbWVTdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7OztRQUVOLFVBQVU7O0lBQ1YsS0FBSywyQkFBTSxPQUFPOztJQUNsQixFQUFFLDJCQUFNLE1BQU07O0lBQ2QsYUFBYSwyQkFBTSw0QkFBNEI7O0FBRXRELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVwQyxLQUFLLENBQUMsTUFBTSxDQUNWLG9CQUFDLGFBQWEsSUFBQyxFQUFFLEVBQUUsRUFBRSxBQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sQUFBQyxHQUFHLEVBQ3pDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQ3JDLENBQUM7OztBQ2RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDLENBQ25CLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUM3QixHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNsQzs7QUFFRCxhQUFhLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxFQUFJO0FBQzlCLFFBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDOUIsUUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDOztBQUVyQixZQUFRLE1BQU0sQ0FBQyxVQUFVO0FBQ3JCLGFBQUssYUFBYSxDQUFDLFNBQVM7QUFDeEIscUJBQVMsR0FBRyxRQUFRLENBQ2hCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFFLGtCQUFNOztBQUFBLEFBR1YsYUFBSyxhQUFhLENBQUMsSUFBSTs7QUFFbkIsa0JBQU07O0FBQUEsQUFFVixhQUFLLGFBQWEsQ0FBQyxTQUFTO0FBQ3hCLG9CQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLGtCQUFNOztBQUFBLEFBRVYsYUFBSyxhQUFhLENBQUMsT0FBTztBQUN0QiwyQkFBZSxFQUFFLENBQUM7QUFDbEIsa0JBQU07O0FBQUEsQUFFVjtBQUNJLG1CQUFPLElBQUksQ0FBQztBQUFBLEtBQ25COztBQUVELFFBQUksU0FBUyxFQUFFO0FBQ1gsaUJBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDaEM7QUFDRCxXQUFPLElBQUksQ0FBQztDQUNmLENBQUMsQ0FBQzs7aUJBRVksU0FBUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnZXM2LXNoaW0nO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpbyBmcm9tICcuL2lvJztcbmltcG9ydCBHYW1lSW50ZXJmYWNlIGZyb20gJy4vY29tcG9uZW50cy9HYW1lSW50ZXJmYWNlJztcblxubGV0IHBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKCcvcGxheS8nLCAnJykuc3BsaXQoJy8nKTtcbnBhcmFtc1sxXSA9IHBhcnNlSW50KHBhcmFtc1sxXSwgMTApO1xucGFyYW1zWzJdID0gcGFyc2VJbnQocGFyYW1zWzJdLCAxMCk7XG5cblJlYWN0LnJlbmRlcihcbiAgPEdhbWVJbnRlcmZhY2UgaW89e2lvfSBwYXJhbXM9e3BhcmFtc30gLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKVxuKTsiLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE1IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG5cbmZ1bmN0aW9uIGNsYXNzTmFtZXMoKSB7XG5cdHZhciBjbGFzc2VzID0gJyc7XG5cdHZhciBhcmc7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0aWYgKCFhcmcpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGFyZyB8fCAnbnVtYmVyJyA9PT0gdHlwZW9mIGFyZykge1xuXHRcdFx0Y2xhc3NlcyArPSAnICcgKyBhcmc7XG5cdFx0fSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuXHRcdFx0Y2xhc3NlcyArPSAnICcgKyBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0fSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIGFyZykge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRpZiAoIWFyZy5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8ICFhcmdba2V5XSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNsYXNzZXMgKz0gJyAnICsga2V5O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gY2xhc3Nlcy5zdWJzdHIoMSk7XG59XG5cbi8vIHNhZmVseSBleHBvcnQgY2xhc3NOYW1lcyBmb3Igbm9kZSAvIGJyb3dzZXJpZnlcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG59XG5cbi8vIHNhZmVseSBleHBvcnQgY2xhc3NOYW1lcyBmb3IgUmVxdWlyZUpTXG5pZiAodHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdH0pO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnSW52YXJpYW50IFZpb2xhdGlvbjogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUga2V5TWlycm9yXG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCIuL2ludmFyaWFudFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGFuIGVudW1lcmF0aW9uIHdpdGgga2V5cyBlcXVhbCB0byB0aGVpciB2YWx1ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgIHZhciBDT0xPUlMgPSBrZXlNaXJyb3Ioe2JsdWU6IG51bGwsIHJlZDogbnVsbH0pO1xuICogICB2YXIgbXlDb2xvciA9IENPTE9SUy5ibHVlO1xuICogICB2YXIgaXNDb2xvclZhbGlkID0gISFDT0xPUlNbbXlDb2xvcl07XG4gKlxuICogVGhlIGxhc3QgbGluZSBjb3VsZCBub3QgYmUgcGVyZm9ybWVkIGlmIHRoZSB2YWx1ZXMgb2YgdGhlIGdlbmVyYXRlZCBlbnVtIHdlcmVcbiAqIG5vdCBlcXVhbCB0byB0aGVpciBrZXlzLlxuICpcbiAqICAgSW5wdXQ6ICB7a2V5MTogdmFsMSwga2V5MjogdmFsMn1cbiAqICAgT3V0cHV0OiB7a2V5MToga2V5MSwga2V5Mjoga2V5Mn1cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbnZhciBrZXlNaXJyb3IgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHJldCA9IHt9O1xuICB2YXIga2V5O1xuICAoXCJwcm9kdWN0aW9uXCIgIT09IFwiZGV2ZWxvcG1lbnRcIiA/IGludmFyaWFudChcbiAgICBvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSxcbiAgICAna2V5TWlycm9yKC4uLik6IEFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0LidcbiAgKSA6IGludmFyaWFudChvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSkpO1xuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0W2tleV0gPSBrZXk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWlycm9yO1xuIiwiaW1wb3J0IENoYXRDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0NoYXRDb25zdGFudHMnO1xuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcblxuY29uc3QgQ2hhdEFjdGlvbnMgPSB7XG4gIHRvZ2dsZVZpc2liaWxpdHkoKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IENoYXRDb25zdGFudHMuVE9HR0xFX1ZJU0lCSUxJVFlcbiAgICB9KTtcbiAgfSxcbiAgc3VibWl0TWVzc2FnZShtZXNzYWdlLCBjbGFzc05hbWUsIHJlY2VpdmVkKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IENoYXRDb25zdGFudHMuU1VCTUlUX01FU1NBR0UsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICByZWNlaXZlZDogcmVjZWl2ZWRcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdEFjdGlvbnM7IiwiaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0dhbWVDb25zdGFudHMnO1xuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcblxuY29uc3QgR2FtZUFjdGlvbnMgPSB7XG4gIG1ha2VNb3ZlKGZyb20sIHRvLCBjYXB0dXJlLCB0eXBlLCBlbWl0TW92ZSkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLk1BS0VfTU9WRSxcbiAgICAgIGZyb206IGZyb20sXG4gICAgICB0bzogdG8sXG4gICAgICBjYXB0dXJlOiBjYXB0dXJlLFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIGVtaXRNb3ZlOiBlbWl0TW92ZVxuICAgIH0pO1xuICB9LFxuICBzaG93TW92ZXModW5pdCwgZnJvbSwgaW5SYW5nZSkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLlNIT1dfTU9WRVMsXG4gICAgICB1bml0OiB1bml0LFxuICAgICAgZnJvbTogZnJvbSxcbiAgICAgIGluUmFuZ2U6IGluUmFuZ2VcbiAgICB9KTtcbiAgfSxcbiAgZHJhdygpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5EUkFXXG4gICAgfSk7XG4gIH0sXG4gIHJlbWF0Y2goKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuUkVNQVRDSFxuICAgIH0pO1xuICB9LFxuICBnYW1lT3ZlcihvcHRpb25zKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuR0FNRV9PVkVSLFxuICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgIH0pO1xuICB9LFxuICBjaGFuZ2VQcm9tb3Rpb24ocHJvbW90aW9uKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuQ0hBTkdFX1BST01PVElPTixcbiAgICAgIHByb21vdGlvbjogcHJvbW90aW9uXG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVBY3Rpb25zOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcblxuY29uc3QgQ2FwdHVyZWRQaWVjZXMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluLCBvbkdhbWVDaGFuZ2VdLFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2FwdHVyZWRQaWVjZXM6IEdhbWVTdG9yZS5nZXRDYXB0dXJlZFBpZWNlcygpXG4gICAgfTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNwID0gdGhpcy5zdGF0ZS5jYXB0dXJlZFBpZWNlcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY2FwdHVyZWQtcGllY2VzXCI+XG4gICAgICAgIHtjcC5tYXAoKHBpZWNlcywgY29sb3IpID0+IChcbiAgICAgICAgICA8dWwga2V5PXtjb2xvcn0+XG4gICAgICAgICAgICB7cGllY2VzLm1hcCgocGllY2UsIGkpID0+IDxsaSBrZXk9e2l9PntwaWVjZX08L2xpPikudG9BcnJheSgpfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgICkpLnRvQXJyYXkoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjYXB0dXJlZFBpZWNlczogR2FtZVN0b3JlLmdldENhcHR1cmVkUGllY2VzKClcbiAgICB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhcHR1cmVkUGllY2VzOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgQ2hhdFN0b3JlIGZyb20gJy4uL3N0b3Jlcy9DaGF0U3RvcmUnO1xuaW1wb3J0IENoYXRBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvQ2hhdEFjdGlvbnMnO1xuXG5jb25zdCBDaGF0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB0b2tlbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIC8vIHNvdW5kc0VuYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNPcHBvbmVudEF2YWlsYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBvcGVuTW9kYWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbl0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IHN0YXRlID0gQ2hhdFN0b3JlLmdldFN0YXRlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQ2hhdEhpZGRlbjogc3RhdGUuaXNDaGF0SGlkZGVuLFxuICAgICAgbWVzc2FnZXM6IHN0YXRlLm1lc3NhZ2VzLFxuICAgICAgbWVzc2FnZTogJycsXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5pby5vbigncmVjZWl2ZS1tZXNzYWdlJywgZGF0YSA9PiB7XG4gICAgICBDaGF0QWN0aW9ucy5zdWJtaXRNZXNzYWdlKGRhdGEubWVzc2FnZSwgZGF0YS5jb2xvciArICcgbGVmdCcsIHRydWUpO1xuICAgICAgdGhpcy5fbWF5YmVQbGF5U291bmQoKTtcbiAgICB9KTtcbiAgICBDaGF0U3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uQ2hhdFN0b3JlQ2hhbmdlKTtcbiAgICBcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiAxMzk5KSBDaGF0QWN0aW9ucy50b2dnbGVWaXNpYmlsaXR5KCk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIENoYXRTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uQ2hhdFN0b3JlQ2hhbmdlKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY2hhdC13cmFwcGVyXCJcbiAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLmlzQ2hhdEhpZGRlbiA/ICdoaWRkZW4nIDogbnVsbH0+XG4gICAgICAgIFxuICAgICAgICA8aDQ+Q2hhdDwvaDQ+XG4gICAgICAgIDxhIGNsYXNzTmFtZT1cImNsb3NlXCJcbiAgICAgICAgICAgb25DbGljaz17Q2hhdEFjdGlvbnMudG9nZ2xlVmlzaWJpbGl0eX0+XG4gICAgICAgICAgeFxuICAgICAgICA8L2E+XG4gICAgICAgIFxuICAgICAgICA8YXVkaW8gcHJlbG9hZD1cImF1dG9cIiByZWY9XCJtc2dTbmRcIj5cbiAgICAgICAgICA8c291cmNlIHNyYz1cIi9zbmQvbWVzc2FnZS5tcDNcIiAvPlxuICAgICAgICA8L2F1ZGlvPlxuICAgICAgICBcbiAgICAgICAgPHVsIGlkPVwiY2hhdC1saXN0XCIgcmVmPVwiY2hhdFwiPlxuICAgICAgICAgIHt0aGlzLnN0YXRlLm1lc3NhZ2VzLm1hcCgobWVzc2FnZSwgaSkgPT4gKFxuICAgICAgICAgICAgPGxpIGtleT17aX0gY2xhc3NOYW1lPXttZXNzYWdlLmdldCgnY2xhc3NOYW1lJyl9PlxuICAgICAgICAgICAgICB7bWVzc2FnZS5nZXQoJ21lc3NhZ2UnKX1cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgKSkudG9BcnJheSgpfVxuICAgICAgICA8L3VsPlxuICAgICAgICBcbiAgICAgICAgPHNwYW4+V3JpdGUgeW91ciBtZXNzYWdlOjwvc3Bhbj5cbiAgICAgICAgXG4gICAgICAgIDxmb3JtIGlkPVwiY2hhdC1mb3JtXCJcbiAgICAgICAgICAgICAgb25TdWJtaXQ9e3RoaXMuX3N1Ym1pdE1lc3NhZ2V9PlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgIHJlZj1cIm1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuY29sb3J9XG4gICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLm1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9vbkNoYW5nZU1lc3NhZ2V9IC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIF9vbkNoYXRTdG9yZUNoYW5nZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKENoYXRTdG9yZS5nZXRTdGF0ZSgpLCB0aGlzLl9zY3JvbGxDaGF0KTtcbiAgfSxcbiAgX29uQ2hhbmdlTWVzc2FnZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZTogZS50YXJnZXQudmFsdWV9KTtcbiAgfSxcbiAgX3N1Ym1pdE1lc3NhZ2UoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB7aW8sIHRva2VuLCBjb2xvciwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnN0YXRlLm1lc3NhZ2U7XG5cbiAgICBpZiAoIWlzT3Bwb25lbnRBdmFpbGFibGUpIHtcbiAgICAgIHRoaXMucmVmcy5tZXNzYWdlLmdldERPTU5vZGUoKS5ibHVyKCk7XG4gICAgICB0aGlzLnByb3BzLm9wZW5Nb2RhbCgnaW5mbycsICdTb3JyeSwgeW91ciBvcHBvbmVudCBpcyBub3QgY29ubmVjdGVkLiAnICtcbiAgICAgICAgJ1lvdSBjYW7igJh0IHNlbmQgbWVzc2FnZXMuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgQ2hhdEFjdGlvbnMuc3VibWl0TWVzc2FnZShtZXNzYWdlLCBjb2xvciArICcgcmlnaHQnLCBmYWxzZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZTogJyd9KTtcblxuICAgIGlvLmVtaXQoJ3NlbmQtbWVzc2FnZScsIHtcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBjb2xvcjogY29sb3IsXG4gICAgICB0b2tlbjogdG9rZW5cbiAgICB9KTtcbiAgfSxcbiAgX3Njcm9sbENoYXQoKSB7XG4gICAgY29uc3QgY2hhdE5vZGUgPSB0aGlzLnJlZnMuY2hhdC5nZXRET01Ob2RlKCk7XG4gICAgY2hhdE5vZGUuc2Nyb2xsVG9wID0gY2hhdE5vZGUuc2Nyb2xsSGVpZ2h0O1xuICB9LFxuICBfbWF5YmVQbGF5U291bmQoKSB7XG4gICAgLy8gaWYgKHRoaXMucHJvcHMuc291bmRzRW5hYmxlZCkge1xuICAgIC8vICAgdGhpcy5yZWZzLm1zZ1NuZC5nZXRET01Ob2RlKCkucGxheSgpO1xuICAgIC8vIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENoYXQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG5pbXBvcnQgQ2hlc3NQaWVjZXMgZnJvbSAnLi4vY29uc3RhbnRzL0NoZXNzUGllY2VzJztcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XG5pbXBvcnQgbWF5YmVSZXZlcnNlIGZyb20gJy4uL21peGlucy9tYXliZVJldmVyc2UnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHtTZXEsIFJlcGVhdCwgTGlzdCwgU2V0fSBmcm9tICdpbW11dGFibGUnO1xuXG5jb25zdCBGSUxFUyA9IFNlcS5JbmRleGVkKCdhYmNkZWZnaCcpO1xuY29uc3QgUkFOS1MgPSBTZXEuSW5kZXhlZCgnMTIzNDU2NzgnKTtcblxuY29uc3QgQ2hlc3Nib2FyZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdG9rZW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBtYXliZVBsYXlTb3VuZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcbiAgICBnYW1lT3ZlcjogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG1heWJlUmV2ZXJzZV0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IHN0YXRlID0gR2FtZVN0b3JlLmdldENoZXNzYm9hcmRTdGF0ZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGZlbjogc3RhdGUuZmVuLFxuICAgICAgbW92ZUZyb206IG51bGwsXG4gICAgICBsYXN0TW92ZTogc3RhdGUubGFzdE1vdmUsXG4gICAgICBraW5nSW5DaGVjazogZmFsc2VcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7aW8sIHRva2VufSA9IHRoaXMucHJvcHM7XG4gICAgR2FtZVN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xuICAgIEdhbWVTdG9yZS5vbignbmV3LW1vdmUnLCB0aGlzLl9vbk5ld01vdmUpO1xuXG4gICAgaW8ub24oJ21vdmUnLCBkYXRhID0+IHtcbiAgICAgIEdhbWVBY3Rpb25zLm1ha2VNb3ZlKGRhdGEuZnJvbSwgZGF0YS50bywgZGF0YS5jYXB0dXJlLCBmYWxzZSk7XG4gICAgICB0aGlzLnByb3BzLm1heWJlUGxheVNvdW5kKCk7XG5cbiAgICAgIGlmICghZGF0YS5nYW1lT3Zlcikge1xuICAgICAgICB0aGlzLl9ydW5DbG9jaygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0aXRsZScpWzBdO1xuICAgICAgICB0aXRsZS50ZXh0ID0gJyogJyArIHRpdGxlLnRleHQ7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fcmVtb3ZlQXN0ZXJpc2tGcm9tVGl0bGUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtYWNjZXB0ZWQnLCAoKSA9PiB0aGlzLnNldFN0YXRlKHttb3ZlRnJvbTogbnVsbH0pKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgR2FtZVN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcbiAgICBHYW1lU3RvcmUub24oJ25ldy1tb3ZlJywgdGhpcy5fb25OZXdNb3ZlKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtjb2xvciwgaXNPcHBvbmVudEF2YWlsYWJsZSwgZ2FtZU92ZXJ9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7ZmVuLCBtb3ZlRnJvbSwgbGFzdE1vdmUsIGtpbmdJbkNoZWNrfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgZmVuQXJyYXkgPSBmZW4uc3BsaXQoJyAnKTtcbiAgICBjb25zdCBwbGFjZW1lbnQgPSBmZW5BcnJheVswXTtcbiAgICBjb25zdCBpc0l0TXlUdXJuID0gZmVuQXJyYXlbMV0gPT09IGNvbG9yLmNoYXJBdCgwKTtcbiAgICBjb25zdCByb3dzID0gdGhpcy5fbWF5YmVSZXZlcnNlKHBsYWNlbWVudC5zcGxpdCgnLycpKTtcbiAgICBjb25zdCByYW5rcyA9IHRoaXMuX21heWJlUmV2ZXJzZShSQU5LUywgJ3doaXRlJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImNoZXNzYm9hcmRcIj5cbiAgICAgICAge3Jvd3MubWFwKChwbGFjZW1lbnQsIGkpID0+XG4gICAgICAgICAgPFJvd1xuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgcmFuaz17cmFua3MuZ2V0KGkpfVxuICAgICAgICAgICAgcGxhY2VtZW50PXtwbGFjZW1lbnR9XG4gICAgICAgICAgICBjb2xvcj17Y29sb3J9XG4gICAgICAgICAgICBpc01vdmVhYmxlPXtpc0l0TXlUdXJuICYmIGlzT3Bwb25lbnRBdmFpbGFibGUgJiYgIWdhbWVPdmVyfVxuICAgICAgICAgICAgbW92ZUZyb209e21vdmVGcm9tfVxuICAgICAgICAgICAgbGFzdE1vdmU9e2xhc3RNb3ZlfVxuICAgICAgICAgICAgc2V0TW92ZUZyb209e3RoaXMuX3NldE1vdmVGcm9tfVxuICAgICAgICAgICAga2luZ0luQ2hlY2s9e2tpbmdJbkNoZWNrfVxuICAgICAgICAgICAgdmFsaWRNb3Zlcz17R2FtZVN0b3JlLmdldFZhbGlkTW92ZXMobW92ZUZyb20pfSAvPil9XG4gICAgICA8L3RhYmxlPlxuICAgICk7XG4gIH0sXG4gIF9vbkdhbWVDaGFuZ2UoY2IpIHtcbiAgICBjb25zdCBzdGF0ZSA9IEdhbWVTdG9yZS5nZXRDaGVzc2JvYXJkU3RhdGUoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGZlbjogc3RhdGUuZmVuLFxuICAgICAgbGFzdE1vdmU6IHN0YXRlLmxhc3RNb3ZlLFxuICAgICAga2luZ0luQ2hlY2s6IHN0YXRlLmNoZWNrICYmIChzdGF0ZS5mZW4uc3BsaXQoJyAnKVsxXSA9PT0gJ3cnID8gJ0snIDogJ2snKVxuICAgIH0sIGNiKTtcbiAgfSxcbiAgX3NldE1vdmVGcm9tKHNxdWFyZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbW92ZUZyb206IHNxdWFyZVxuICAgIH0pO1xuICB9LFxuICBfb25OZXdNb3ZlKG1vdmUpIHtcbiAgICBjb25zdCB7aW8sIHRva2VufSA9IHRoaXMucHJvcHM7XG5cbiAgICBpby5lbWl0KCduZXctbW92ZScsIHtcbiAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgIG1vdmU6IG1vdmVcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQodGhpcy5wcm9wcy5tYXliZVBsYXlTb3VuZCwgMCk7XG4gIH0sXG4gIF9ydW5DbG9jaygpIHtcbiAgICBjb25zdCB7aW8sIHRva2VuLCBjb2xvcn0gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xuICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgY29sb3I6IGNvbG9yXG4gICAgfSk7XG4gIH0sXG4gIF9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSgpIHtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGl0bGUnKVswXTtcbiAgICB0aXRsZS50ZXh0ID0gdGl0bGUudGV4dC5yZXBsYWNlKCcqICcsICcnKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XG4gIH1cbn0pO1xuXG5jb25zdCBSb3cgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgcmFuazogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnMScsJzInLCczJywnNCcsJzUnLCc2JywnNycsJzgnXSkuaXNSZXF1aXJlZCxcbiAgICBwbGFjZW1lbnQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcbiAgICBpc01vdmVhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIG1vdmVGcm9tOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxhc3RNb3ZlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHNldE1vdmVGcm9tOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGtpbmdJbkNoZWNrOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW2ZhbHNlLCAnSycsICdrJ10pLmlzUmVxdWlyZWQsXG4gICAgdmFsaWRNb3ZlczogUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoU2V0KS5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW21heWJlUmV2ZXJzZV0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtyYW5rLCBwbGFjZW1lbnQsIGNvbG9yfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZmlsZXMgPSB0aGlzLl9tYXliZVJldmVyc2UoRklMRVMpO1xuICAgIGNvbnN0IHBpZWNlcyA9IHRoaXMuX21heWJlUmV2ZXJzZShwbGFjZW1lbnQubGVuZ3RoIDwgOCA/XG4gICAgICBTZXEocGxhY2VtZW50KS5mbGF0TWFwKHBpZWNlID0+IChcbiAgICAgICAgL15cXGQkLy50ZXN0KHBpZWNlKSA/IFJlcGVhdCgnLScsIHBhcnNlSW50KHBpZWNlLCAxMCkpIDogcGllY2VcbiAgICAgICkpLnRvQXJyYXkoKSA6XG5cbiAgICAgIHBsYWNlbWVudC5zcGxpdCgnJylcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx0cj5cbiAgICAgICAge3BpZWNlcy5tYXAoKHBpZWNlLCBpKSA9PlxuICAgICAgICAgIDxDb2x1bW5cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIHNxdWFyZT17ZmlsZXMuZ2V0KGkpICsgcmFua31cbiAgICAgICAgICAgIHBpZWNlPXtwaWVjZX1cbiAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsICdyYW5rJywgJ3BsYWNlbWVudCcpfSAvPil9XG4gICAgICA8L3RyPlxuICAgICk7XG4gIH1cbn0pO1xuXG5jb25zdCBDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgc3F1YXJlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgcGllY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcbiAgICBpc01vdmVhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIG1vdmVGcm9tOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxhc3RNb3ZlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHNldE1vdmVGcm9tOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGtpbmdJbkNoZWNrOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW2ZhbHNlLCAnSycsICdrJ10pLmlzUmVxdWlyZWQsXG4gICAgdmFsaWRNb3ZlczogUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoU2V0KS5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHttb3ZlRnJvbSwgbGFzdE1vdmUsIHNxdWFyZSwgY29sb3IsXG4gICAgICAgICAgIGlzTW92ZWFibGUsIGtpbmdJbkNoZWNrLCB2YWxpZE1vdmVzfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcGllY2UgPSBDaGVzc1BpZWNlc1t0aGlzLnByb3BzLnBpZWNlXTtcbiAgICBjb25zdCByZ3ggPSBjb2xvciA9PT0gJ3doaXRlJyA/IC9eW0tRUkJOUF0kLyA6IC9eW2txcmJucF0kLztcbiAgICBjb25zdCBpc0RyYWdnYWJsZSA9IHJneC50ZXN0KHRoaXMucHJvcHMucGllY2UpO1xuICAgIGNvbnN0IGlzRHJvcHBhYmxlID0gbW92ZUZyb20gJiYgdmFsaWRNb3Zlcy5oYXMoc3F1YXJlKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8dGQgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogbW92ZUZyb20gPT09IHNxdWFyZSAmJiAhdmFsaWRNb3Zlcy5pc0VtcHR5KCksXG4gICAgICAgICAgICBmcm9tOiBsYXN0TW92ZS5nZXQoJ2Zyb20nKSA9PT0gc3F1YXJlLFxuICAgICAgICAgICAgdG86IGxhc3RNb3ZlLmdldCgndG8nKSA9PT0gc3F1YXJlLFxuICAgICAgICAgICAgZHJvcHBhYmxlOiBpc0Ryb3BwYWJsZVxuICAgICAgICAgIH0pfVxuICAgICAgICAgIG9uQ2xpY2s9eyFwaWVjZSA/IHRoaXMuX29uQ2xpY2tTcXVhcmUgOiBudWxsfVxuICAgICAgICAgIG9uRHJhZ092ZXI9e2lzRHJvcHBhYmxlID8gdGhpcy5fb25EcmFnT3ZlciA6IG51bGx9XG4gICAgICAgICAgb25Ecm9wPXtpc0Ryb3BwYWJsZSA/IHRoaXMuX29uRHJvcCA6IG51bGx9PlxuXG4gICAgICAgIHtwaWVjZSA/XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPXtraW5nSW5DaGVjayA9PT0gdGhpcy5wcm9wcy5waWVjZSA/ICdpbi1jaGVjaycgOiBudWxsfVxuICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uQ2xpY2tTcXVhcmV9XG4gICAgICAgICAgICAgb25EcmFnU3RhcnQ9e3RoaXMuX29uRHJhZ1N0YXJ0fVxuICAgICAgICAgICAgIGRyYWdnYWJsZT17aXNEcmFnZ2FibGUgJiYgaXNNb3ZlYWJsZX0+XG4gICAgICAgICAgICB7cGllY2V9XG4gICAgICAgICAgPC9hPlxuICAgICAgICA6bnVsbH1cbiAgICAgIDwvdGQ+XG4gICAgKTtcbiAgfSxcbiAgX29uQ2xpY2tTcXVhcmUoKSB7XG4gICAgY29uc3Qge2lzTW92ZWFibGUsIGNvbG9yLCBtb3ZlRnJvbSwgc3F1YXJlLCBwaWVjZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJneCA9IGNvbG9yID09PSAnd2hpdGUnID8gL15bS1FSQk5QXSQvIDogL15ba3FyYm5wXSQvO1xuXG4gICAgaWYgKCFpc01vdmVhYmxlIHx8ICghbW92ZUZyb20gJiYgIXJneC50ZXN0KHBpZWNlKSkpXG4gICAgICByZXR1cm47XG4gICAgZWxzZSBpZiAobW92ZUZyb20gJiYgbW92ZUZyb20gPT09IHNxdWFyZSlcbiAgICAgIHRoaXMucHJvcHMuc2V0TW92ZUZyb20obnVsbCk7XG4gICAgZWxzZSBpZiAocmd4LnRlc3QocGllY2UpKVxuICAgICAgdGhpcy5wcm9wcy5zZXRNb3ZlRnJvbShzcXVhcmUpO1xuICAgIGVsc2VcbiAgICAgIEdhbWVBY3Rpb25zLm1ha2VNb3ZlKG1vdmVGcm9tLCBzcXVhcmUsIENoZXNzUGllY2VzW3BpZWNlXSwgdHJ1ZSk7XG4gIH0sXG4gIF9vbkRyYWdTdGFydChlKSB7XG4gICAgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICAvLyBzZXREYXRhIGlzIHJlcXVpcmVkIGJ5IGZpcmVmb3hcbiAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgJycpO1xuXG4gICAgdGhpcy5wcm9wcy5zZXRNb3ZlRnJvbSh0aGlzLnByb3BzLnNxdWFyZSk7XG4gIH0sXG4gIF9vbkRyYWdPdmVyKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgfSxcbiAgX29uRHJvcChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHttb3ZlRnJvbSwgc3F1YXJlLCBwaWVjZX0gPSB0aGlzLnByb3BzO1xuICAgIEdhbWVBY3Rpb25zLm1ha2VNb3ZlKG1vdmVGcm9tLCBzcXVhcmUsIENoZXNzUGllY2VzW3BpZWNlXSwgdHJ1ZSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDaGVzc2JvYXJkOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcbmltcG9ydCBDaGVzc2JvYXJkIGZyb20gJy4vQ2hlc3Nib2FyZCc7XG5pbXBvcnQgQ2FwdHVyZWRQaWVjZXMgZnJvbSAnLi9DYXB0dXJlZFBpZWNlcyc7XG5pbXBvcnQgVGFibGVPZk1vdmVzIGZyb20gJy4vVGFibGVPZk1vdmVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuY29uc3QgQ2hlc3Nib2FyZEludGVyZmFjZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdG9rZW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBzb3VuZHNFbmFibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIGdhbWVPdmVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgaXNPcHBvbmVudEF2YWlsYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluLCBvbkdhbWVDaGFuZ2VdLFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4gR2FtZVN0b3JlLmdldFN0YXRlKCk7XG4gIH0sXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpICYmXG4gICAgICAgICFwcmV2UHJvcHMuZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSkge1xuICAgICAgdGhpcy5wcm9wcy5vcGVuTW9kYWwoJ2luZm8nLCB0aGlzLl9nZXRHYW1lT3Zlck1lc3NhZ2UoKSk7XG4gICAgfVxuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3Byb21vdGlvbiwgdHVybiwgZ2FtZU92ZXIsIGNoZWNrfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImJvYXJkLW1vdmVzLXdyYXBwZXJcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuICAgICAgICBcbiAgICAgICAgPGF1ZGlvIHByZWxvYWQ9XCJhdXRvXCIgcmVmPVwibW92ZVNuZFwiPlxuICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiL3NuZC9tb3ZlLm1wM1wiIC8+XG4gICAgICAgIDwvYXVkaW8+XG4gICAgICAgIDxhdWRpbyBwcmVsb2FkPVwiYXV0b1wiIHJlZj1cImNoZWNrU25kXCI+XG4gICAgICAgICAgPHNvdXJjZSBzcmM9XCIvc25kL2NoZWNrLm1wM1wiIC8+XG4gICAgICAgIDwvYXVkaW8+XG5cbiAgICAgICAgPGRpdiBpZD1cImJvYXJkLXdyYXBwZXJcIj5cbiAgICAgICAgICA8Q2FwdHVyZWRQaWVjZXMgLz5cbiAgICAgICAgICA8Q2hlc3Nib2FyZFxuICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgJ3NvdW5kc0VuYWJsZWQnLCAnZ2FtZU92ZXInKX1cbiAgICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlci5nZXQoJ3N0YXR1cycpfVxuICAgICAgICAgICAgbWF5YmVQbGF5U291bmQ9e3RoaXMuX21heWJlUGxheVNvdW5kfSAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8VGFibGVPZk1vdmVzIC8+XG5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHJvbW90aW9uXCI+XG4gICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgPHNwYW4+UHJvbW90aW9uOiA8L3NwYW4+XG4gICAgICAgICAgICA8c2VsZWN0IHZhbHVlPXtwcm9tb3Rpb259XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9vblByb21vdGlvbkNoYW5nZX0+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJxXCI+UXVlZW48L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJcIj5Sb29rPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJiXCI+QmlzaG9wPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJuXCI+S25pZ2h0PC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmVlZGJhY2tcIj5cbiAgICAgICAgICB7IWdhbWVPdmVyLmdldCgnc3RhdHVzJykgPyBcbiAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+XG4gICAgICAgICAgICAgICAgey8qIEYgLT4gd2hpdGUga2luZywgZiAtPiBibGFjayBraW5nKi9cbiAgICAgICAgICAgICAgICAgIHR1cm4gPT09ICd3JyA/ICdGJyA6ICdmJ31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB7YCR7dHVybiA9PT0gJ3cnID8gJ1doaXRlJyA6ICdCbGFjayd9IHRvIG1vdmUuYH1cbiAgICAgICAgICAgICAge2NoZWNrID8gPHN0cm9uZz4gQ2hlY2suPC9zdHJvbmc+IDogbnVsbH1cbiAgICAgICAgICAgIDwvc3Bhbj4gOlxuXG4gICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+XG4gICAgICAgICAgICAgICAge2dhbWVPdmVyLmdldCgnd2lubmVyJykgPT09ICdXaGl0ZScgPyAnRicgOiAnZid9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAge3RoaXMuX2dldEdhbWVPdmVyTWVzc2FnZSgpfVxuICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgfVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuICBfb25HYW1lQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoR2FtZVN0b3JlLmdldFN0YXRlKCkpO1xuICB9LFxuICBfb25Qcm9tb3Rpb25DaGFuZ2UoZSkge1xuICAgIEdhbWVBY3Rpb25zLmNoYW5nZVByb21vdGlvbihlLnRhcmdldC52YWx1ZSk7XG4gIH0sXG4gIF9tYXliZVBsYXlTb3VuZCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zb3VuZHNFbmFibGVkKSB7XG4gICAgICB0aGlzLnJlZnNbdGhpcy5zdGF0ZS5jaGVjayA/ICdjaGVja1NuZCcgOiAnbW92ZVNuZCddLmdldERPTU5vZGUoKS5wbGF5KCk7XG4gICAgfVxuICB9LFxuICBfZ2V0R2FtZU92ZXJNZXNzYWdlKCkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnByb3BzLmdhbWVPdmVyLmdldCgndHlwZScpO1xuICAgIGNvbnN0IHdpbm5lciA9IHRoaXMucHJvcHMuZ2FtZU92ZXIuZ2V0KCd3aW5uZXInKTtcbiAgICBjb25zdCBsb3NlciA9IHdpbm5lciA9PT0gJ1doaXRlJyA/ICdCbGFjaycgOiAnV2hpdGUnO1xuXG4gICAgcmV0dXJuIHR5cGUgPT09ICdjaGVja21hdGUnID8gYENoZWNrbWF0ZS4gJHt3aW5uZXJ9IHdpbnMhYCA6XG4gICAgICB0eXBlID09PSAndGltZW91dCcgPyBgJHtsb3Nlcn3igJhzIHRpbWUgaXMgb3V0LiAke3dpbm5lcn0gd2lucyFgIDpcbiAgICAgIHR5cGUgPT09ICdyZXNpZ24nID8gYCR7bG9zZXJ9IGhhcyByZXNpZ25lZC4gJHt3aW5uZXJ9IHdpbnMhYCA6XG4gICAgICB0eXBlID09PSAnZHJhdycgPyAnRHJhdy4nIDpcbiAgICAgIHR5cGUgPT09ICdzdGFsZW1hdGUnID8gJ0RyYXcgKFN0YWxlbWF0ZSkuJyA6XG4gICAgICB0eXBlID09PSAndGhyZWVmb2xkUmVwZXRpdGlvbicgPyAnRHJhdyAoVGhyZWVmb2xkIFJlcGV0aXRpb24pLicgOlxuICAgICAgdHlwZSA9PT0gJ2luc3VmZmljaWVudE1hdGVyaWFsJyA/ICdEcmF3IChJbnN1ZmZpY2llbnQgTWF0ZXJpYWwpJyA6ICcnO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hlc3Nib2FyZEludGVyZmFjZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuXG5jb25zdCBQdXJlUmVuZGVyTWl4aW4gPSBSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluO1xuXG5jb25zdCBDbG9jayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgcGFyYW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtQdXJlUmVuZGVyTWl4aW5dLFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCBbXywgdGltZSwgaW5jXSA9IHRoaXMucHJvcHMucGFyYW1zO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICB3aGl0ZTogdGltZSAqIDYwLFxuICAgICAgYmxhY2s6IHRpbWUgKiA2MCxcbiAgICAgIGluYzogaW5jLFxuICAgICAgY291bnRkb3duOiBudWxsXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgaW8gPSB0aGlzLnByb3BzLmlvO1xuXG4gICAgaW8ub24oJ2NvdW50ZG93bicsIGRhdGEgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBbZGF0YS5jb2xvcl06IGRhdGEudGltZSxcbiAgICAgIGNvdW50ZG93bjogZGF0YS5jb2xvclxuICAgIH0pKTtcblxuICAgIGlvLm9uKCdjb3VudGRvd24tZ2FtZW92ZXInLCBkYXRhID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2NvdW50ZG93bjogbnVsbH0pO1xuICAgICAgR2FtZUFjdGlvbnMuZ2FtZU92ZXIoe1xuICAgICAgICB0eXBlOiAndGltZW91dCcsXG4gICAgICAgIHdpbm5lcjogZGF0YS5jb2xvciA9PT0gJ2JsYWNrJyA/ICdXaGl0ZScgOiAnQmxhY2snXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlvLm9uKCdyZW1hdGNoLWFjY2VwdGVkJywgKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHdoaXRlOiB0aGlzLnByb3BzLnBhcmFtc1sxXSAqIDYwLFxuICAgICAgICBibGFjazogdGhpcy5wcm9wcy5wYXJhbXNbMV0gKiA2MFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGlkPVwiY2xvY2tcIj5cbiAgICAgICAgPFRpbWVyXG4gICAgICAgICAgY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgdGltZT17dGhpcy5zdGF0ZS53aGl0ZX1cbiAgICAgICAgICBjb3VudGRvd249e3RoaXMuc3RhdGUuY291bnRkb3dufSAvPlxuICAgICAgICA8VGltZXJcbiAgICAgICAgICBjb2xvcj1cImJsYWNrXCJcbiAgICAgICAgICB0aW1lPXt0aGlzLnN0YXRlLmJsYWNrfVxuICAgICAgICAgIGNvdW50ZG93bj17dGhpcy5zdGF0ZS5jb3VudGRvd259IC8+XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn0pO1xuXG5jb25zdCBUaW1lciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBtaXhpbnM6IFtQdXJlUmVuZGVyTWl4aW5dLFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7dGltZSwgY29sb3IsIGNvdW50ZG93bn0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1pbiA9IE1hdGguZmxvb3IodGltZSAvIDYwKTtcbiAgICBjb25zdCBzZWMgPSB0aW1lICUgNjA7XG4gICAgY29uc3QgdGltZUxlZnQgPSBgJHttaW59OiR7c2VjIDwgMTAgPyAnMCcgKyBzZWMgOiBzZWN9YDtcblxuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPXtjb2xvciArIChjb2xvciA9PT0gY291bnRkb3duID8gJyB0aWNraW5nJyA6ICcnKX0+XG4gICAgICAgIHt0aW1lTGVmdH1cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENsb2NrOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuLy9pbXBvcnQgQ2hlc3NQaWVjZXMgZnJvbSAnLi4vY29uc3RhbnRzL0NoZXNzUGllY2VzJztcbi8vaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcbmltcG9ydCBtYXliZVJldmVyc2UgZnJvbSAnLi4vbWl4aW5zL21heWJlUmV2ZXJzZSc7XG5pbXBvcnQgYmVoYXZpb3IgZnJvbSAnLi4vZ2FtZS9iZWhhdmlvcic7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cblxuXG5jb25zdCBHYW1lQm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXG5cdH0sXG5cdG1peGluczogW21heWJlUmV2ZXJzZV0sXG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcblx0XHR0aGlzLnN0YXRlID0gR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCk7XG5cdFx0Y29uc29sZS5sb2coXCJzdGF0ZT8gXCIsIHRoaXMuc3RhdGUpO1xuXHRcdHJldHVybiB0aGlzLnN0YXRlO1xuXHR9LFxuXG5cdC8vIF9nZXRWYWxpZERyb3BzKHBvc2l0aW9uLCBpblJhbmdlKXtcblxuXHQvLyB9LFxuXG5cdF9vbkJ1dHRvbkNsaWNrKCl7XG5cblx0XHQvLyBhc3N1bWUgd2hpdGUgcGxheWVyIGZvciBub3cgKHNvIHJhY2lzdClcblxuXHRcdGNvbnN0IHtib2FyZH0gPSB0aGlzLnN0YXRlO1xuXHRcdHZhciBkdWtlUG9zaXRpb24gPSBPYmplY3Qua2V5cyhib2FyZCkuZmlsdGVyKHBvcyA9PiAoYm9hcmRbcG9zXSAmJiBib2FyZFtwb3NdLnVuaXQgPT09IFwiRHVrZVwiICYmIGJvYXJkW3Bvc10uY29sb3IgPT09ICd3aGl0ZScpKVswXTtcblx0XHR2YXIgZHVrZVBvc0FyciA9IEpTT04ucGFyc2UoZHVrZVBvc2l0aW9uKTtcblxuXHRcdHZhciBkcm9wcGFibGVUaWxlcyA9IHt9O1xuXHRcdFtbMCwxXSwgWzAsLTFdLCBbMSwwXSwgWy0xLDBdXS5mb3JFYWNoKGFkaiA9PiB7XG5cdFx0XHR2YXIgYWRqWCA9IGR1a2VQb3NBcnJbMF0rYWRqWzBdLCBhZGpZID0gZHVrZVBvc0FyclsxXSthZGpbMV07XG5cdFx0XHRpZiAodGhpcy5faXNPbkJvYXJkKHt4OiBhZGpYLCB5OiBhZGpZfSkgJiYgIWJvYXJkW2BbJHthZGpYfSwgJHthZGpZfV1gXSkgXG5cdFx0XHRcdGRyb3BwYWJsZVRpbGVzW2BbJHthZGpYfSwgJHthZGpZfV1gXSA9IHRydWU7XG5cdFx0fSlcblx0XHRpZiAoIU9iamVjdC5rZXlzKGRyb3BwYWJsZVRpbGVzKS5sZW5ndGgpIHtcblx0XHRcdC8vYWxlcnQoJ05vIGF2YWlsYWJsZSB0aWxlcyBhZGphY2VudCB0byB0aGUgRHVrZSAtIGNhbm5vdCBkcmF3IG5ldyB1bml0Jyk7XG5cdFx0XHRzd2FsKCdObyBhdmFpbGFibGUgdGlsZXMgYWRqYWNlbnQgdG8gdGhlIER1a2UgLSBjYW5ub3QgZHJhdyBuZXcgdW5pdCcpXG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0dGhpcy5fc2V0RHJvcHBhYmxlKGRyb3BwYWJsZVRpbGVzKTtcblx0XHR0aGlzLl9zZXREcmF3YWJsZShudWxsKTtcblx0XHQvL2FsZXJ0KCd3aGF0IGFyZSBkcm9wcGFibGVUaWxlcycsIGRyb3BwYWJsZVRpbGVzKTtcblxuXHRcdFx0dGhpcy5fc2V0U2VsZWN0ZWQoXCJbLTEsIC0xXVwiLCBkcm9wcGFibGVUaWxlcyk7XG5cdFx0XHQvL3ZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RyYXduVW5pdCcpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnd2hhdCBpcyBlbGVtZW50IGhlcmU/JywgZWxlbWVudCk7XG5cdFx0XHRHYW1lU3RvcmUuZHJhdygpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhyZXN1bHQpO1xuXHRcdFx0dmFyIGRyYXduVW5pdCA9IEdhbWVTdG9yZS5nZXRHYW1lYm9hcmRTdGF0ZSgpLmRyYXdVbml0O1xuXHRcdFx0Y29uc29sZS5sb2coZHJhd25Vbml0KTtcblx0XHRcdHZhciBkcmF3biA9IGRyYXduVW5pdFtPYmplY3Qua2V5cyhkcmF3blVuaXQpWzBdXTtcblx0XHRcdHRoaXMuX3NldERyYXdhYmxlKGRyYXduKTtcblx0XHR9XG5cblx0XHQvLyB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcmF3blVuaXQnKTtcblx0XHQvLyBlbGVtZW50LmNsYXNzTmFtZSA9IFwiXCI7XG5cdFx0Ly8gR2FtZVN0b3JlLmRyYXcoKTtcblx0XHQvLyB0aGlzLnN0YXRlLmRyYXdVbml0ID0gR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCkuZHJhd1VuaXQ7XG5cdFx0Ly8gY29uc29sZS5sb2codGhpcy5zdGF0ZS5kcmF3VW5pdCk7XG5cblx0XHQvLyBjb25zb2xlLmxvZyhPYmplY3Qua2V5cyh0aGlzLnN0YXRlLmRyYXdVbml0KVswXSk7XG5cdFx0Ly8gdmFyIHBvc2l0aW9uID0gT2JqZWN0LmtleXModGhpcy5zdGF0ZS5kcmF3VW5pdClbMF07XG5cdFx0Ly8gdmFyIHVuaXQgPSB0aGlzLnN0YXRlLmRyYXdVbml0W3Bvc2l0aW9uXS51bml0O1xuXHRcdC8vIHZhciBjb2xvciA9IHRoaXMuc3RhdGUuZHJhd1VuaXRbcG9zaXRpb25dLmNvbG9yO1xuXHRcdC8vIHZhciBzaWRlID0gdGhpcy5zdGF0ZS5kcmF3VW5pdFtwb3NpdGlvbl0uc2lkZTtcblxuXHRcdC8vZWxlbWVudC5jbGFzc0xpc3QuYWRkKGAke3VuaXR9YCk7XG5cdFx0Ly9lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ3aGl0ZVwiKTtcblx0XHQvL2VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImZyb250XCIpO1xuXG5cdFx0XG5cdH0sXG5cdF9vbkRyYXdDZWxsQ2xpY2soKXtcblx0XHRjb25zb2xlLmxvZyhcImkgY2xpY2tlZCEhXCIpO1xuXHRcdHZhciBuZXdEcmF3bjtcblx0XHRpZih0aGlzLnN0YXRlLmRyYXduLnNpZGU9PT0nZnJvbnQnKXtcblx0XHRcdG5ld0RyYXduID0gdGhpcy5zdGF0ZS5kcmF3bjtcblx0XHRcdG5ld0RyYXduLnNpZGU9J2JhY2snO1xuXHRcdH1cblx0XHRlbHNlIGlmICh0aGlzLnN0YXRlLmRyYXduLnNpZGU9PT0nYmFjaycpe1xuXHRcdFx0bmV3RHJhd24gPSB0aGlzLnN0YXRlLmRyYXduO1xuXHRcdFx0bmV3RHJhd24uc2lkZT0nZnJvbnQnO1xuXHRcdH1cblx0XHRjb25zb2xlLmxvZyhuZXdEcmF3bik7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGRyYXduOiBuZXdEcmF3blxuXHRcdFx0fSk7XG5cdH0sXG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0Ly9HYW1lU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5fb25DaGFuZ2UpO1xuXG5cdFx0Y29uc3Qge2lvLCB0b2tlbn0gPSB0aGlzLnByb3BzO1xuXG5cdFx0R2FtZVN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xuXHRcdEdhbWVTdG9yZS5vbignbmV3LW1vdmUnLCB0aGlzLl9vbk5ld01vdmUpO1xuXG5cdFx0aW8ub24oJ21vdmUnLCBkYXRhID0+IHtcblx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKGRhdGEuZnJvbSwgZGF0YS50bywgZGF0YS5jYXB0dXJlLCBkYXRhLnR5cGUsIGZhbHNlKTtcblxuXHRcdFx0aWYgKCFkYXRhLmdhbWVPdmVyKSB7XG5cdFx0XHQgIHRoaXMuX3J1bkNsb2NrKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkb2N1bWVudC5oaWRkZW4pIHtcblx0XHRcdCAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RpdGxlJylbMF07XG5cdFx0XHQgIHRpdGxlLnRleHQgPSAnKiAnICsgdGl0bGUudGV4dDtcblxuXHRcdFx0ICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHR9LFxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRHYW1lU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5fb25DaGFuZ2UpO1xuXHR9LFxuXHQvLyBfb25DaGFuZ2UoKSB7XG5cdFxuXHQvLyBcdHRoaXMuc2V0U3RhdGUoe1xuXHQvLyBcdFx0bGlnaHR1cDogR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCkubGlnaHR1cFxuXHQvLyBcdH0pO1xuXHQvLyB9LFxuXHRfcmV2ZXJzZVBvc2l0aW9uKHBvcykge1xuXHRcdGNvbnN0IHtzaXplfSA9IHRoaXMucHJvcHM7XG5cdFx0bGV0IHBvc0FyciA9IEpTT04ucGFyc2UocG9zKTtcblx0XHRyZXR1cm4gYFske3NpemUtMS1wb3NBcnJbMF19LCAke3NpemUtMS1wb3NBcnJbMV19XWA7XG5cdH0sXG5cblx0X3JldmVyc2VCb2FyZCgpIHtcblx0XHRjb25zdCB7Ym9hcmR9ID0gdGhpcy5zdGF0ZTtcblx0XHRsZXQgbmV3Qm9hcmQgPSB7fSwgc2VsZiA9IHRoaXM7XG5cdFx0T2JqZWN0LmtleXMoYm9hcmQpLmZvckVhY2goZnVuY3Rpb24ocG9zKSB7XG5cdFx0XHQvLyBsZXQgcG9zQXJyID0gSlNPTi5wYXJzZShwb3MpO1xuXHRcdFx0Ly8gbmV3Qm9hcmRbYFske3NpemUtMS1wb3NBcnJbMF19LCAke3NpemUtMS1wb3NBcnJbMV19XWBdID0gYm9hcmRbcG9zXTtcblx0XHRcdG5ld0JvYXJkW3NlbGYuX3JldmVyc2VQb3NpdGlvbihwb3MpXSA9IGJvYXJkW3Bvc107XG5cdFx0fSlcblx0XHRyZXR1cm4gbmV3Qm9hcmQ7XG5cdH0sXG5cblxuXHRfb25HYW1lQ2hhbmdlKGNiKSB7XG5cdFx0Y29uc3Qgc3RhdGUgPSBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGJvYXJkOiBzdGF0ZS5ib2FyZCxcblx0XHRcdGxpZ2h0dXA6IHN0YXRlLmxpZ2h0dXAsXG5cdFx0XHRzdHJpa2U6IHN0YXRlLnN0cmlrZSxcblx0XHRcdGRyb3A6IHN0YXRlLmRyb3AsXG5cdFx0XHRzZWxlY3RlZDogc3RhdGUuc2VsZWN0ZWQsXG5cdFx0XHRkcmF3VW5pdDogc3RhdGUuZHJhd1VuaXQsXG5cdFx0XHR0dXJuOiBzdGF0ZS50dXJuXG5cdFx0fSwgY2IpO1xuXHR9LFxuXHRfb25OZXdNb3ZlKG1vdmUpIHtcblx0XHRjb25zdCB7aW8sIHRva2VufSA9IHRoaXMucHJvcHM7XG5cblx0XHRpby5lbWl0KCduZXctbW92ZScsIHtcblx0XHRcdHRva2VuOiB0b2tlbixcblx0XHRcdG1vdmU6IG1vdmVcblx0XHR9KVxuXG5cdH0sXG5cdHJlbmRlcigpIHtcblx0XHR2YXIge3N0YXRlLCBwcm9wc30gPSB0aGlzLCBcbi8vIDw8PDw8PDwgSEVBRFxuLy8gXHRcdFx0e3NpemV9ID0gcHJvcHMsXG4vLyBcdFx0XHR7Ym9hcmQsIHNlbGVjdGVkLCBsaWdodHVwLCBzdHJpa2UsIGRyb3AsIGRyYXdufSA9IHN0YXRlO1xuLy8gPT09PT09PVxuXHRcdFx0e3NpemUsIGNvbG9yfSA9IHByb3BzLFxuXHRcdFx0e2JvYXJkLCBzZWxlY3RlZCwgbGlnaHR1cCwgc3RyaWtlLCBkcm9wLCB0dXJuLCBkcmF3bn0gPSBzdGF0ZTtcblxuXHRcdGlmIChjb2xvciA9PT0gJ2JsYWNrJykgYm9hcmQgPSB0aGlzLl9yZXZlcnNlQm9hcmQoKTtcblxuXG5cdFx0dmFyIGNlbGxBcnJheSA9IFtdO1xuXHRcdGZvciAodmFyIGk9MDsgaTxzaXplOyBpKyspIHtcblx0XHRcdHZhciByb3cgPSBbXTtcblx0XHRcdGZvciAodmFyIGo9MDsgajxzaXplOyBqKyspIHtcblx0XHRcdFx0cm93LnB1c2goe3g6aiwgeTppfSlcblx0XHRcdH1cblx0XHRcdGNlbGxBcnJheS5wdXNoKHJvdyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHQ8ZGl2PlxuXHRcdFx0PHRhYmxlIGNsYXNzTmFtZT1cImJvYXJkXCI+XG5cdFx0XHR7Y2VsbEFycmF5Lm1hcCgocm93LCBpZHgxKSA9PiBcblx0XHRcdFx0PHRyPlxuXHRcdFx0XHRcdHtyb3cubWFwKChjZWxsLCBpZHgyKSA9PlxuXHRcdFx0XHRcdFx0PHRkIHBvc2l0aW9uPXtgWyR7aWR4Mn0sICR7aWR4MX1dYH0+XG5cdFx0XHRcdFx0XHRcdDxDZWxsIHJlZj17YFske2lkeDJ9LCAke2lkeDF9XWB9XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHQgcG9zaXRpb249e2BbJHtpZHgyfSwgJHtpZHgxfV1gfSBcblx0XHRcdFx0XHRcdFx0XHR1bml0PXtib2FyZFtgWyR7aWR4Mn0sICR7aWR4MX1dYF0gPyBib2FyZFtgWyR7aWR4Mn0sICR7aWR4MX1dYF0udW5pdCA6IG51bGx9IFxuXHRcdFx0XHRcdFx0XHRcdGNvbG9yPXtib2FyZFtgWyR7aWR4Mn0sICR7aWR4MX1dYF0gPyBib2FyZFtgWyR7aWR4Mn0sICR7aWR4MX1dYF0uY29sb3IgOiBudWxsfVxuXHRcdFx0XHRcdFx0XHRcdHBsYXllckNvbG9yPXtjb2xvcn0gc2lkZT17Ym9hcmRbYFske2lkeDJ9LCAke2lkeDF9XWBdID8gYm9hcmRbYFske2lkeDJ9LCAke2lkeDF9XWBdLnNpZGUgOiBudWxsfVxuXHRcdFx0XHRcdFx0XHRcdGxpdHVwPXtsaWdodHVwW2BbJHtpZHgyfSwgJHtpZHgxfV1gXX1cblx0XHRcdFx0XHRcdFx0XHRzdHJpa2FibGU9e3N0cmlrZVtgWyR7aWR4Mn0sICR7aWR4MX1dYF19IGNhbkRyb3A9e2Ryb3BbYFske2lkeDJ9LCAke2lkeDF9XWBdfVxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkID0ge3NlbGVjdGVkfSB0dXJuPXt0dXJufSBzZXRTZWxlY3RlZD17dGhpcy5fc2V0U2VsZWN0ZWR9XG5cdFx0XHRcdFx0XHRcdFx0c2V0RHJhd2FibGU9e3RoaXMuX3NldERyYXdhYmxlfSBcblx0XHRcdFx0XHRcdFx0XHRzZXREcm9wcGFibGU9e3RoaXMuX3NldERyb3BwYWJsZX1cblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLl9vbkNlbGxDbGlja30vPlxuXHRcdFx0XHRcdFx0PC90ZD5cblx0XHRcdFx0XHQpfVxuXHRcdFx0XHQ8L3RyPlxuXHRcdFx0KX1cblx0XHRcdDwvdGFibGU+XG5cdFx0XHQ8ZGl2IGlkPVwiZHJhd1wiPlxuXHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT1cImJ0blwiIG9uQ2xpY2s9e3RoaXMuX29uQnV0dG9uQ2xpY2t9PkRSQVc8L2J1dHRvbj5cblx0XHRcdFx0PERyYXduQ29tcG9uZW50IHBvc2l0aW9uPSdbLTEsIC0xXScgdW5pdD17ZHJhd24/IGRyYXduLnVuaXQgOiBudWxsfSBjb2xvcj17ZHJhd24/IGRyYXduLmNvbG9yIDogbnVsbH0gc2lkZT17ZHJhd24/IGRyYXduLnNpZGUgOiBudWxsfSBkcmF3QVVuaXQ9e3RoaXMuX29uRHJhd0NlbGxDbGlja30+PC9EcmF3bkNvbXBvbmVudD5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdCk7XG5cdH0sXG5cblx0X29uRHJhd25EcmFnU3RhcnQoZSkge1xuXHRcdGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG5cdFx0ZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsICcnKTtcblxuXG5cdFx0Ly9jb25zdCB7dW5pdCwgcG9zaXRpb24sIGNvbG9yLCBzZWxlY3RlZCwgc2V0U2VsZWN0ZWQsIGxpdHVwLCBkcm9wLCBzdHJpa2FibGUsIGRyb3BwYWJsZSwgc2lkZX0gPSB0aGlzLnByb3BzO1xuXHRcdC8vc2V0U2VsZWN0ZWQoJ1stMSwtMV0nLCAnZHJhdycpO1xuXG5cdFx0Y29uc3Qge3VuaXQsIHBvc2l0aW9uLCBjb2xvciwgc2VsZWN0ZWQsIHNldFNlbGVjdGVkLCBsaXR1cCwgc3RyaWthYmxlLCBkcm9wcGFibGUsIHNpZGV9ID0gdGhpcy5wcm9wcztcblx0XHR0aGlzLl9zZXRTZWxlY3RlZCgnWy0xLC0xXScsICdkcmF3Jyk7XG5cblx0fSxcblxuXHRfc2V0U2VsZWN0ZWQocG9zaXRpb24sIGluUmFuZ2UpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNlbGVjdGVkOiBwb3NpdGlvbixcblx0XHRcdGxpZ2h0dXA6IHRoaXMuX2dldFZhbGlkTW92ZXMocG9zaXRpb24sIGluUmFuZ2UpLm1vdmFibGVUaWxlcyxcblx0XHRcdHN0cmlrZTogdGhpcy5fZ2V0VmFsaWRNb3Zlcyhwb3NpdGlvbiwgaW5SYW5nZSkuc3RyaWthYmxlVGlsZXNcblx0XHR9KVxuXG5cdH0sXG5cblxuXHRfc2V0RHJvcHBhYmxlKHRpbGVzKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRkcm9wOiB0aWxlc1xuXHRcdH0pXG5cblx0fSxcblxuXHRfc2V0RHJhd2FibGUodGlsZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0ZHJhd246IHRpbGVcblx0XHR9KVxuXG5cdH0sXG5cblx0X2dldFZhbGlkTW92ZXMocG9zaXRpb24sIG1vdmVzKSB7XG5cdFx0aWYgKCFtb3ZlcykgcmV0dXJuO1xuXHRcdGNvbnN0IHBsYXllckNvbG9yID0gdGhpcy5wcm9wcy5jb2xvcjtcblx0XHR2YXIgb3V0cHV0ID0ge307XG5cblx0XHR2YXIgaW5SYW5nZSA9IFtdO1xuXHRcdHZhciBwb3NBcnIgPSBKU09OLnBhcnNlKHBvc2l0aW9uKTtcblx0XHR2YXIgdGhlQm9hcmQgPSBwbGF5ZXJDb2xvciA9PT0gJ2JsYWNrJyA/IHRoaXMuX3JldmVyc2VCb2FyZCgpIDogdGhpcy5zdGF0ZS5ib2FyZDtcblxuXHRcdE9iamVjdC5rZXlzKG1vdmVzKS5tYXAoZnVuY3Rpb24obW92ZSl7XG5cdFx0XHR2YXIgbW92ZUFyciA9IEpTT04ucGFyc2UobW92ZSk7XG5cblx0XHRcdGlmIChtb3Zlc1ttb3ZlXSA9PT0gJ21vdmUnIHx8IG1vdmVzW21vdmVdID09PSAnanVtcCcpIHtcblx0XHRcdFx0bGV0IHggPSAgcG9zQXJyWzBdICsgbW92ZUFyclswXSwgXG5cdFx0XHRcdFx0eSA9ICBwb3NBcnJbMV0gKyBtb3ZlQXJyWzFdO1xuXHRcdFx0XHRpblJhbmdlLnB1c2goe3g6IHgsIHk6IHksIHR5cGU6ICdtb3ZlJ30pO1x0XHRcdFx0XHRcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKG1vdmVzW21vdmVdID09PSAnc2xpZGUnIHx8IG1vdmVzW21vdmVdID09PSAnanVtcCBzbGlkZScpIHtcblxuXHRcdFx0XHRsZXQgZGVsdGFYID0gbW92ZUFyclswXSA/IG1vdmVBcnJbMF0vTWF0aC5hYnMobW92ZUFyclswXSkgOiBtb3ZlQXJyWzBdLCBcblx0XHRcdFx0XHRkZWx0YVkgPSBtb3ZlQXJyWzFdID8gbW92ZUFyclsxXS9NYXRoLmFicyhtb3ZlQXJyWzFdKSA6IG1vdmVBcnJbMV07XG5cblx0XHRcdFx0bGV0IGkgPSBwb3NBcnJbMF0gKyBkZWx0YVgsIGogPSBwb3NBcnJbMV0gKyBkZWx0YVk7XG5cdFx0XHRcdHdoaWxlIChpPj0wICYmIGk8NiAmJiBqPj0wICYmIGo8Nikge1xuXHRcdFx0XHRcdGxldCB1bml0SW5UaGVXYXkgPSB0aGVCb2FyZFtgWyR7aX0sICR7an1dYF07XG5cdFx0XHRcdFx0aWYgKHVuaXRJblRoZVdheSAmJiBtb3Zlc1ttb3ZlXSA9PT0gJ3NsaWRlJykge1xuXHRcdFx0XHRcdFx0aWYgKHVuaXRJblRoZVdheS5jb2xvciAhPT0gdGhlQm9hcmRbcG9zaXRpb25dLmNvbG9yKSB7XG5cdFx0XHRcdFx0XHRcdGluUmFuZ2UucHVzaCh7eDogaSwgeTogaiwgdHlwZTogJ21vdmUnfSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpblJhbmdlLnB1c2goe3g6IGksIHk6IGosIHR5cGU6ICdtb3ZlJ30pO1xuXHRcdFx0XHRcdGkgKz0gZGVsdGFYO1xuXHRcdFx0XHRcdGogKz0gZGVsdGFZO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChtb3Zlc1ttb3ZlXSA9PT0gJ3N0cmlrZScpIHtcblx0XHRcdFx0bGV0IHggPSBwb3NBcnJbMF0gKyBtb3ZlQXJyWzBdLFxuXHRcdFx0XHRcdHkgPSBwb3NBcnJbMV0gKyBtb3ZlQXJyWzFdO1xuXHRcdFx0XHRpblJhbmdlLnB1c2goe3g6IHgsIHk6IHksIHR5cGU6ICdzdHJpa2UnfSk7XG5cdFx0XHR9XHRcdFxuXHRcdH0pO1xuXG5cdFx0dmFyIG1vdmFibGVUaWxlcyA9IHt9LCBzdHJpa2FibGVUaWxlcyA9IHt9O1xuXHRcdC8vbGV0IGJvYXJkID0gcGxheWVyQ29sb3IgPT09ICdibGFjaycgPyB0aGlzLl9yZXZlcnNlQm9hcmQoKSA6IHRoaXMuc3RhdGUuYm9hcmQ7XG5cdFx0aW5SYW5nZS5maWx0ZXIocmFuZ2UgPT4ge1xuXHRcdFx0Ly8gaXMgb24gYm9hcmRcblx0XHRcdGlmICghdGhpcy5faXNPbkJvYXJkKHJhbmdlKSkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0XHQvLyBubyB1bml0IG9mIHRoZSBzYW1lIGNvbG9yIG9uIHNxdWFyZVxuXHRcdFx0bGV0IGNvb3Jkc1N0ciA9IGBbJHtyYW5nZS54fSwgJHtyYW5nZS55fV1gO1xuXHRcdFx0bGV0IHRhcmdldFVuaXQgPSB0aGVCb2FyZFtjb29yZHNTdHJdO1xuXHRcdFx0aWYgKHRhcmdldFVuaXQpIHtcblx0XHRcdFx0aWYgKHRoZUJvYXJkW3Bvc2l0aW9uXS5jb2xvciA9PT0gdGFyZ2V0VW5pdC5jb2xvcikgcmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9KS5mb3JFYWNoKHJhbmdlID0+IHtcblx0XHRcdGlmIChyYW5nZS50eXBlID09PSAnbW92ZScpXG5cdFx0XHRcdG1vdmFibGVUaWxlc1tgWyR7cmFuZ2UueH0sICR7cmFuZ2UueX1dYF0gPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAocmFuZ2UudHlwZSA9PT0gJ3N0cmlrZScpXG5cdFx0XHRcdHN0cmlrYWJsZVRpbGVzW2BbJHtyYW5nZS54fSwgJHtyYW5nZS55fV1gXSA9IHRydWU7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bW92YWJsZVRpbGVzOiBtb3ZhYmxlVGlsZXMsXG5cdFx0XHRzdHJpa2FibGVUaWxlczogc3RyaWthYmxlVGlsZXNcblx0XHR9O1xuXHR9LFxuXG5cdF9pc09uQm9hcmQoY29vcmRzKSB7XG5cdCAgcmV0dXJuIGNvb3Jkcy54ID49IDAgJiYgY29vcmRzLnkgPj0gMCAmJiBjb29yZHMueCA8IDYgJiYgY29vcmRzLnkgPCA2O1xuXHR9LFxuXG5cdF9ydW5DbG9jaygpIHtcblx0ICBjb25zdCB7aW8sIHRva2VuLCBjb2xvcn0gPSB0aGlzLnByb3BzO1xuXG5cdCAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xuXHQgICAgdG9rZW46IHRva2VuLFxuXHQgICAgY29sb3I6IGNvbG9yXG5cdCAgfSk7XG5cdH0sXG5cdF9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSgpIHtcblx0ICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGl0bGUnKVswXTtcblx0ICB0aXRsZS50ZXh0ID0gdGl0bGUudGV4dC5yZXBsYWNlKCcqICcsICcnKTtcblx0ICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XG5cdH1cblxufSk7XG5cblxuY29uc3QgQ2VsbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgXHQgcmV0dXJuIHtcbiAgICBcdCBcdC8vc2lkZTogJ2Zyb250JyxcbiAgICBcdCBcdGlzU2VsZWN0ZWQ6IGZhbHNlXG4gICAgXHQgfTtcbiAgXHR9LFxuICBcdGNvbXBvbmVudERpZE1vdW50KCkge1xuXG5cdFx0XG5cdH0sXG5cblx0Y29tcG9uZW50V2lsbE1vdW50KCkge1xuXHRcdFxuXHRcblx0fSxcblxuXHRtaXhpbnM6IFtdLFxuXG5cdFxuXHRfb25DbGlja1NxdWFyZSgpIHtcblxuXG5cdFx0Ly8gY29uc3Qge3VuaXQsIHBvc2l0aW9uLCBjb2xvciwgc2VsZWN0ZWQsIHNldFNlbGVjdGVkLCBsaXR1cCwgc3RyaWthYmxlLCBjYW5Ecm9wLCBzaWRlfSA9IHRoaXMucHJvcHM7XG5cblx0XHQvLyBjb25zdCB7aXNTZWxlY3RlZH0gPSB0aGlzLnN0YXRlO1xuXHRcdHZhciBib2FyZFN0YXRlID0gR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCk7XG4vLyA9PT09PT09XG5cdGNvbnN0IHt1bml0LCBjb2xvciwgc2V0U2VsZWN0ZWQsIGxpdHVwLCBzdHJpa2FibGUsIGNhbkRyb3AsIHNpZGUsIHBsYXllckNvbG9yLCB0dXJufSA9IHRoaXMucHJvcHM7XG4vLyA+Pj4+Pj4+IG1hc3RlclxuXG5cdFx0dmFyIHtwb3NpdGlvbiwgc2VsZWN0ZWR9ID0gdGhpcy5wcm9wcztcblx0XHRcblx0XHRpZiAodHVybiAhPT0gcGxheWVyQ29sb3IuY2hhckF0KDApKSByZXR1cm47XG5cblx0XHQvLyBpZiB0aGVyZSBpcyBubyBjdXJyZW50bHkgc2VsZWN0ZWQgdW5pdCwgY2xpY2sgYSB1bml0IChvZiB0aGUgc2FtZSBjb2xvcikgdG8gc2VsZWN0IGl0XG5cdFx0aWYgKCFzZWxlY3RlZCkge1xuXHRcdFx0aWYgKHVuaXQgJiYgY29sb3IgPT09IHBsYXllckNvbG9yKSB7XG5cdFx0XHRcdHZhciBtb3ZlcyA9IGJlaGF2aW9yW3VuaXRdW3NpZGVdO1xuXHRcdFx0XHRzZXRTZWxlY3RlZChwb3NpdGlvbiwgbW92ZXMpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBpZiB0aGVyZSBpcyBjdXJyZW50bHkgYSBzZWxlY3RlZCB1bml0IG9uIHRoZSBib2FyZCwgY2FuIGRvIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKHBsYXllckNvbG9yID09PSAnYmxhY2snKSB7XG5cdFx0XHRcdHBvc2l0aW9uID0gdGhpcy5fcmV2ZXJzZVBvc2l0aW9uKHBvc2l0aW9uKTtcblx0XHRcdFx0c2VsZWN0ZWQgPSB0aGlzLl9yZXZlcnNlUG9zaXRpb24oc2VsZWN0ZWQpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5saXR1cCkge1xuXHRcdFx0XHQvLyBtb3ZlIHRvIGEgc3F1YXJlIHdpdGggYW4gb3Bwb3NpdGUgY29sb3IgdW5pdCB0byBjYXB0dXJlIGl0XG5cdFx0XHRcdGlmICh1bml0ICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcikge1xuXHRcdFx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKHNlbGVjdGVkLCBwb3NpdGlvbiwgdHJ1ZSwgJ21vdmUnLCB0cnVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIG1vdmUgdG8gYW4gdW5vY2N1cGllZCBzcXVhcmVcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCBmYWxzZSwgJ21vdmUnLCB0cnVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNldFNlbGVjdGVkKG51bGwsIFtdKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHRoaXMucHJvcHMuc3RyaWthYmxlICYmIHVuaXQgJiYgY29sb3IgIT09IHBsYXllckNvbG9yKSB7XG5cdFx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKHNlbGVjdGVkLCBwb3NpdGlvbiwgdHJ1ZSwgJ3N0cmlrZScsIHRydWUpO1xuXHRcdFx0XHRzZXRTZWxlY3RlZChudWxsLCBbXSk7XG5cdFx0XHR9XG5cdFx0XHQvLyBkZXNlbGVjdCB0aGUgY3VycmVudCB1bml0IGJ5IGNsaWNraW5nIG9uIGl0XG5cdFx0XHRlbHNlIGlmIChzZWxlY3RlZCA9PT0gcG9zaXRpb24pIHtcblx0XHRcdFx0c2V0U2VsZWN0ZWQobnVsbCwgW10pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0fSxcblxuXHRfb25EcmFnU3RhcnQoZSkge1xuXHRcdGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG5cdFx0ZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsICcnKTtcblxuLy8gPDw8PDw8PCBIRUFEXG4vLyBcdFx0Y29uc3Qge3VuaXQsIHBvc2l0aW9uLCBjb2xvciwgc2VsZWN0ZWQsIHNldFNlbGVjdGVkLCBsaXR1cCwgc3RyaWthYmxlLCBjYW5Ecm9wLCBzaWRlfSA9IHRoaXMucHJvcHM7XG4vLyBcdFx0c2V0U2VsZWN0ZWQocG9zaXRpb24sIGJlaGF2aW9yW3VuaXRdW3NpZGVdKTtcbi8vID09PT09PT1cblx0XHRjb25zdCB7dW5pdCwgcG9zaXRpb24sIGNvbG9yLCBzZWxlY3RlZCwgc2V0U2VsZWN0ZWQsIGxpdHVwLCBzdHJpa2FibGUsIHNpZGUsIGNhbkRyb3AsIHBsYXllckNvbG9yfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKCFzZWxlY3RlZCkge1xuXHRcdFx0aWYgKHVuaXQgJiYgY29sb3IgPT09IHBsYXllckNvbG9yKSB7XG5cdFx0XHRcdHZhciBtb3ZlcyA9IGJlaGF2aW9yW3VuaXRdW3NpZGVdO1xuXHRcdFx0XHRzZXRTZWxlY3RlZChwb3NpdGlvbiwgbW92ZXMpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvL3NldFNlbGVjdGVkKHBvc2l0aW9uLCBiZWhhdmlvclt1bml0XVtzaWRlXSk7XG4vLyA+Pj4+Pj4+IG1hc3RlclxuXHR9LFxuXHRfb25EcmFnT3ZlcihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG5cdH0sXG5cdF9vbkRyb3AoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcbi8vIDw8PDw8PDwgSEVBRFxuXG5cdFx0Ly8gY29uc29sZS5sb2coXCJpIGFtIGRyb3BwaW5nIGRyYXcgdW5pdFwiKTtcblx0XHQvLyAvL2NvbnN0IHtwb3NpdGlvbiwgdW5pdCwgY29sb3IsIHNlbGVjdGVkLCBzZXRTZWxlY3RlZCwgc2V0RHJvcHBhYmxlfSA9IHRoaXMucHJvcHM7XG5cdFx0Ly8gY29uc3Qge3VuaXQsIHBvc2l0aW9uLCBjb2xvciwgc2VsZWN0ZWQsIHNldFNlbGVjdGVkLCBsaXR1cCwgc2V0RHJvcHBhYmxlLCBjYW5Ecm9wLCBzdHJpa2FibGUsIGRyb3BwYWJsZSwgc2lkZX0gPSB0aGlzLnByb3BzO1xuXG5cdFx0Ly8gY29uc29sZS5sb2coXCJ3aGF0J3MgaW4gcG9zaXRpb25cIiwgcG9zaXRpb24pO1xuXHRcdC8vIC8vY29uc29sZS5sb2coXCJ3aGF0J3MgaW4gZHJvcFwiLCB0aGlzLnN0YXRlLmRyb3ApO1xuXHRcdC8vIC8vc2V0U2VsZWN0ZWQobnVsbCwgW10pO1xuXHRcdFxuXHRcdC8vIGNvbnNvbGUubG9nKFwid2hhdCBpcyBzZWxlY3RlZD9cIiwgc2VsZWN0ZWQsIFwid2hhdCBpcyBwb3NpdGlvblwiLCBwb3NpdGlvbik7XG5cdFx0Ly8gaWYgKHNlbGVjdGVkICE9PSBwb3NpdGlvbikge1xuXHRcdC8vIFx0Ly9HYW1lQWN0aW9ucy5tYWtlTW92ZShzZWxlY3RlZCwgcG9zaXRpb24sIGZhbHNlLCAnbW92ZScsIHRydWUpO1xuXHRcdC8vIFx0Y29uc29sZS5sb2coXCJ3aGF0IGlzIGRyb3A/Pz9cIiwgdGhpcy5wcm9wcy5kcm9wKTtcblx0XHQvLyBcdGlmICh0aGlzLnByb3BzLmxpdHVwKSB7XG5cdFx0Ly8gXHRcdGlmICh1bml0KSBHYW1lQWN0aW9ucy5tYWtlTW92ZShzZWxlY3RlZCwgcG9zaXRpb24sIHRydWUsICdtb3ZlJywgdHJ1ZSk7XG5cdFx0Ly8gXHRcdGVsc2UgR2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCBmYWxzZSwgJ21vdmUnLCB0cnVlKTtcblxuXHRcdC8vIFx0fVxuXHRcdC8vIFx0aWYodGhpcy5wcm9wcy5jYW5Ecm9wKXtcblx0XHQvLyBcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCBmYWxzZSwgJ21vdmUnLCB0cnVlKTtcblx0XHQvLyBcdFx0Ly90aGlzLnNldFN0YXRlKHtkcmF3bjogbnVsbH0pO1xuXHRcdC8vIFx0fVxuXHRcdFx0XG4vLyA9PT09PT09XG5cdFx0Y29uc3Qge3VuaXQsIGNvbG9yLCBzZXRTZWxlY3RlZCwgc2V0RHJvcHBhYmxlLCBzZXREcmF3YWJsZSwgbGl0dXAsIHN0cmlrYWJsZSwgY2FuRHJvcCwgc2lkZSwgcGxheWVyQ29sb3J9ID0gdGhpcy5wcm9wcztcblx0XHR2YXIge3Bvc2l0aW9uLCBzZWxlY3RlZH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmIChwbGF5ZXJDb2xvciA9PT0gJ2JsYWNrJykge1xuXHRcdFx0cG9zaXRpb24gPSB0aGlzLl9yZXZlcnNlUG9zaXRpb24ocG9zaXRpb24pO1xuXHRcdFx0c2VsZWN0ZWQgPSB0aGlzLl9yZXZlcnNlUG9zaXRpb24oc2VsZWN0ZWQpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5wcm9wcy5saXR1cCkge1xuXHRcdFx0aWYgKHVuaXQpIEdhbWVBY3Rpb25zLm1ha2VNb3ZlKHNlbGVjdGVkLCBwb3NpdGlvbiwgdHJ1ZSwgJ21vdmUnLCB0cnVlKTtcblx0XHRcdGVsc2UgR2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCBmYWxzZSwgJ21vdmUnLCB0cnVlKTtcbi8vID4+Pj4+Pj4gbWFzdGVyXG5cdFx0fVxuXHRcdFxuXHRcdFxuXHRcdGVsc2UgaWYgKHRoaXMucHJvcHMuc3RyaWthYmxlICYmIHVuaXQpe1xuXHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCB0cnVlLCAnc3RyaWtlJywgdHJ1ZSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5wcm9wcy5jYW5Ecm9wKXtcblx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKHNlbGVjdGVkLCBwb3NpdGlvbiwgZmFsc2UsICdtb3ZlJywgdHJ1ZSk7XG5cdFx0XHR2YXIgZHJhd1VuaXQgPSBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKS5kcmF3VW5pdDtcblx0XHRcdHNldERyYXdhYmxlKG51bGwpO1xuXHRcdH1cblx0XHRzZXRTZWxlY3RlZChudWxsLCBbXSk7XG5cblx0XHRzZXREcm9wcGFibGUoe30pO1xuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGRyYXduOiBudWxsXG5cdFx0XHR9KTtcblxuXHR9LFxuXG5cdF9yZXZlcnNlUG9zaXRpb24ocG9zKSB7XG5cdFx0Ly9jb25zdCB7c2l6ZX0gPSB0aGlzLnByb3BzO1xuXHRcdGxldCBwb3NBcnIgPSBKU09OLnBhcnNlKHBvcyk7XG5cdFx0cmV0dXJuIGBbJHs1LXBvc0FyclswXX0sICR7NS1wb3NBcnJbMV19XWA7XG5cdH0sXG5cblx0cmVuZGVyKCl7XG4vLyA8PDw8PDw8IEhFQURcbi8vIFx0XHR2YXIge3VuaXQsIGNvbG9yLCBsaXR1cCwgc3RyaWthYmxlLCBjYW5Ecm9wLCBzaWRlfSA9IHRoaXMucHJvcHM7XG4vLyA9PT09PT09XG5cdFx0dmFyIHt1bml0LCBjb2xvciwgbGl0dXAsIHN0cmlrYWJsZSwgY2FuRHJvcCwgc2lkZSwgcGxheWVyQ29sb3J9ID0gdGhpcy5wcm9wcztcblxuXG5cdFx0dmFyIGN4T2JqID0ge1x0XG5cdFx0XHR1bml0OiAhIXVuaXQsXG5cdFx0XHRsaXR1cDogbGl0dXAsXG5cdFx0XHRzdHJpa2FibGU6IHN0cmlrYWJsZSxcblx0XHRcdGNhbkRyb3A6IGNhbkRyb3AsXG5cdFx0XHRvcHBvbmVudDogY29sb3IgIT09IHBsYXllckNvbG9yXG5cdFx0fTtcblx0XHRjeE9ialtzaWRlXSA9IHRydWU7XG5cdFx0aWYgKHVuaXQpIHtcblx0XHRcdGN4T2JqW3VuaXRdID0gdHJ1ZTtcblx0XHRcdGN4T2JqW2NvbG9yXSA9IHRydWU7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiAoXG5cblxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjZWxsQ29udGFpbmVyXCJcblxuXHRcdFx0XHRvbkRyYWdPdmVyPXt0aGlzLl9vbkRyYWdPdmVyfVxuXHRcdFx0XHRvbkRyb3A9e3RoaXMuX29uRHJvcH1cblx0XHRcdFx0PlxuXHRcdFx0XHRcdDxhIGNsYXNzTmFtZT17Y3goY3hPYmopfVxuXHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5fb25DbGlja1NxdWFyZX1cblx0XHRcdFx0XHRcdG9uRHJhZ1N0YXJ0PXt0aGlzLl9vbkRyYWdTdGFydH1cblxuXHRcdFx0XHRcdFx0ZHJhZ2dhYmxlPlxuXHRcdFx0XHRcdDwvYT5cblxuXHRcdFx0PC9kaXY+XG5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5jb25zdCBEcmF3bkNvbXBvbmVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgXHQgcmV0dXJuIHtcbiAgICBcdCBcdC8vc2lkZTogJ2Zyb250JyxcbiAgICBcdCBcdGRyYXduOiBudWxsXG4gICAgXHQgfTtcbiAgXHR9LFxuICBcdGNvbXBvbmVudERpZE1vdW50KCkge1xuXG5cdFx0XG5cdH0sXG5cblx0Y29tcG9uZW50V2lsbE1vdW50KCkge1xuXHRcdFxuXHRcblx0fSxcblxuXG4gIFx0Ly8gb25Qcm9wc0NoYW5nZWQ6IGZ1bmN0aW9uKCkge1xuICAgLy8gXHRcdCAvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUuZHJhd24pOyAvLyBpdCBpcyBBTFdBWVMgdHJ1ZVxuIFx0IC8vIH0sXG5cdC8vIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xuIC8vICBcdFx0dGhpcy5zZXRTdGF0ZSh7XG4gLy8gICBcdFx0IGxpa2VzSW5jcmVhc2luZzogbmV4dFByb3BzLmxpa2VDb3VudCA+IHRoaXMucHJvcHMubGlrZUNvdW50XG4gLy8gIFx0XHR9KTtcblx0Ly8gfSxcblxuXHQvLyBfb25DaGFuZ2UoKSB7XG5cdFxuXHQvLyBcdHRoaXMuc2V0U3RhdGUoe1xuXHQvLyBcdFx0bGlnaHR1cDogR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCkubGlnaHR1cFxuXHQvLyBcdH0pO1xuXHQvLyB9LFxuXG5cdG1peGluczogW10sXG5cblxuXHRfb25EcmFnU3RhcnQoZSkge1xuXHRcdGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG5cdFx0ZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsICcnKTtcblxuXHRcdGNvbnN0IHt1bml0LCBwb3NpdGlvbiwgY29sb3IsIHNpZGV9ID0gdGhpcy5wcm9wcztcblx0fSxcblx0X29uRHJhZ092ZXIoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuXHR9LFxuXHQvLyBfb25Ecm9wKGUpIHtcblx0Ly8gXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdC8vIFx0Y29uc3Qge3Bvc2l0aW9uLCB1bml0LCBjb2xvciwgc2VsZWN0ZWQsIGxpdHVwfSA9IHRoaXMucHJvcHM7XG5cblx0Ly8gXHRcdC8vR2FtZUFjdGlvbnMubWFrZU1vdmUocG9zaXRpb24sIGZhbHNlLCAnbW92ZScsIHRydWUpO1xuXHQvLyBcdFx0Y29uc29sZS5sb2coXCJpcyB0aGlzIHdoZXJlIGkgYW0gZHJvcHBpbmcgaXQ/XCIsIHBvc2l0aW9uKTtcblx0Ly8gXHRcdC8vR2FtZUFjdGlvbnMubW92ZVRvQm9hcmQocG9zaXRpb24pO1xuXG5cblx0Ly8gfSxcblx0XG5cdC8vIF9vbkRyYXduVW5pdENsaWNrKCl7XG5cdC8vIFx0dGhpcy5zZXRTdGF0ZSh7XG5cdC8vIFx0XHRkcmF3bjogZHJhd25cblx0Ly8gXHR9KTtcblx0XHQvLyB0aGlzLnNldFN0YXRlKHtcblxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RyYXduVW5pdCcpO1xuXHRcdC8vIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImZyb250XCIpKSB7XG5cdFx0Ly8gXHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJmcm9udFwiKTtcblx0XHQvLyAgXHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJiYWNrXCIpO1xuXHRcdC8vIH1cblx0XHQvLyBlbHNlIGlmKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYmFja1wiKSl7XG5cdFx0Ly8gXHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJiYWNrXCIpO1xuXHRcdC8vICBcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImZyb250XCIpO1xuXHRcdC8vIH1cblx0Ly99LFxuXG5cblxuXHRyZW5kZXIoKXtcblx0XHR2YXIge3VuaXQsIGNvbG9yLCBkcmFnZ2FibGUsIHNpZGUsIGRyYXdBVW5pdCwgcG9zaXRpb259ID0gdGhpcy5wcm9wcztcblxuXG5cblx0XHQvLzxkaXYgZHJhZ2dhYmxlPVwidHJ1ZVwiIGlkPVwiZHJhd25Vbml0XCIgb25DbGljaz17dGhpcy5fb25EcmF3blVuaXRDbGlja30+PC9kaXY+XG5cblx0XHR2YXIgY3hPYmogPSB7XHRcblx0XHRcdHVuaXQ6ICEhdW5pdFxuXHRcdH07XG5cdFx0Y3hPYmpbc2lkZV0gPSB0cnVlO1xuXHRcdGlmICh1bml0KSB7XG5cdFx0XHRjeE9ialt1bml0XSA9IHRydWU7XG5cdFx0XHRjeE9ialtjb2xvcl0gPSB0cnVlO1xuXHRcdH1cblxuXG5cblx0XHRcdFx0Ly8gXHRcdFx0XHQ8ZGl2IGlkPVwiZHJhd25Vbml0XCJcblx0XHRcdFx0Ly8gb25EcmFnT3Zlcj17dGhpcy5fb25EcmFnT3Zlcn1cblx0XHRcdFx0Ly8gb25Ecm9wPXt0aGlzLl9vbkRyb3B9IGRyYWdnYWJsZSBjbGFzc05hbWU9e2N4KGN4T2JqKX0gXG5cdFx0XHRcdC8vID5cblx0XHRcdFx0Ly8gXHQ8YSBjbGFzc05hbWU9e2N4KGN4T2JqKX1cblx0XHRcdFx0Ly8gXHRcdG9uQ2xpY2s9e2RyYXdBVW5pdH1cblx0XHRcdFx0Ly8gXHRcdG9uRHJhZ1N0YXJ0PXt0aGlzLl9vbkRyYWdTdGFydH1cblx0XHRcdFx0Ly8gXHRcdGRyYWdnYWJsZT5cblx0XHRcdFx0Ly8gXHQ8L2E+XG5cblx0XHRcdFx0Ly8gPC9kaXY+XG5cdFx0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgaWQ9XCJkcmF3blVuaXRcIiBkcmFnZ2FibGUgY2xhc3NOYW1lPXtjeChjeE9iail9XG5cdFx0XHRcdCBvbkNsaWNrPXtkcmF3QVVuaXR9PlxuXHRcdFx0XHRcdDxhIFxuXHRcdFx0XHRcdC8vb25EcmFnT3Zlcj17dGhpcy5fb25EcmFnT3Zlcn1cblx0XHRcdFx0XHQvL2NsYXNzTmFtZT17Y3goY3hPYmopfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZHJhd0FVbml0fVxuXHRcdFx0XHRcdFx0Ly8gb25EcmFnU3RhcnQ9e3RoaXMuX29uRHJhZ1N0YXJ0fVxuXHRcdFx0XHRcdFx0ZHJhZ2dhYmxlPlxuXHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdH0pO1xuXG5leHBvcnQgZGVmYXVsdCB7Qm9hcmQ6IEdhbWVCb2FyZCwgQ2VsbDogQ2VsbCwgRHJhd25Db21wb25lbnQ6IERyYXduQ29tcG9uZW50fTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IENsb2NrIGZyb20gJy4vQ2xvY2snO1xuaW1wb3J0IENoYXRTdG9yZSBmcm9tICcuLi9zdG9yZXMvQ2hhdFN0b3JlJztcbmltcG9ydCBDaGF0QWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0NoYXRBY3Rpb25zJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuY29uc3QgR2FtZUhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgcGFyYW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcbiAgICBvcGVuTW9kYWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2FtZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNPcHBvbmVudEF2YWlsYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIG9taXQoQ2hhdFN0b3JlLmdldFN0YXRlKCksICdtZXNzYWdlcycpO1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBDaGF0U3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uQ2hhdENoYW5nZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIENoYXRTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uQ2hhdENoYW5nZSk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtcywgZ2FtZU92ZXIsIGlzT3Bwb25lbnRBdmFpbGFibGV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB1bnNlZW5Db3VudCA9IHRoaXMuc3RhdGUudW5zZWVuQ291bnQ7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuXG4gICAgICAgIDxDbG9ja1xuICAgICAgICAgIGlvPXtpb31cbiAgICAgICAgICBwYXJhbXM9e3BhcmFtc30gLz5cblxuICAgICAgICA8c3BhbiBpZD1cImdhbWUtdHlwZVwiPlxuICAgICAgICAgIHtgJHtwYXJhbXNbMV19fCR7cGFyYW1zWzJdfWB9XG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICA8YSBjbGFzc05hbWU9XCJidG5cIiBocmVmPVwiL1wiPk5ldyBnYW1lPC9hPlxuXG4gICAgICAgIHshZ2FtZU92ZXIgJiYgaXNPcHBvbmVudEF2YWlsYWJsZSA/XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi0tcmVkIHJlc2lnblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uUmVzaWdufT5cbiAgICAgICAgICAgIFJlc2lnblxuICAgICAgICAgIDwvYT5cbiAgICAgICAgOmdhbWVPdmVyID9cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4gYnRuLS1yZWQgcmVtYXRjaFwiXG4gICAgICAgICAgICAgb25DbGljaz17dGhpcy5fb25SZW1hdGNofT5cbiAgICAgICAgICAgIFJlbWF0Y2hcbiAgICAgICAgICA8L2E+XG4gICAgICAgIDpudWxsfVxuXG4gICAgICAgIDxhIGlkPVwiY2hhdC1pY29uXCJcbiAgICAgICAgICAgb25DbGljaz17Q2hhdEFjdGlvbnMudG9nZ2xlVmlzaWJpbGl0eX0+XG4gICAgICAgICAge3Vuc2VlbkNvdW50ID9cbiAgICAgICAgICAgIDxzcGFuIGlkPVwiY2hhdC1jb3VudGVyXCI+XG4gICAgICAgICAgICAgIHt1bnNlZW5Db3VudCA8IDkgPyB1bnNlZW5Db3VudCA6ICc5Kyd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgOm51bGx9XG4gICAgICAgICAgPGltZyBzcmM9XCIvaW1nL2NoYXQuc3ZnXCJcbiAgICAgICAgICAgICAgIHdpZHRoPVwiNTBcIlxuICAgICAgICAgICAgICAgaGVpZ2h0PVwiNTBcIiAvPlxuICAgICAgICAgIENoYXRcbiAgICAgICAgPC9hPlxuICAgICAgPC9oZWFkZXI+XG4gICAgKTtcbiAgfSxcbiAgX29uQ2hhdENoYW5nZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKG9taXQoQ2hhdFN0b3JlLmdldFN0YXRlKCksICdtZXNzYWdlcycpKTtcbiAgfSxcbiAgX29uUmVzaWduKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zLCBjb2xvcn0gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8uZW1pdCgncmVzaWduJywge1xuICAgICAgdG9rZW46IHBhcmFtc1swXSxcbiAgICAgIGNvbG9yOiBjb2xvclxuICAgIH0pO1xuICB9LFxuICBfb25SZW1hdGNoKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zLCBvcGVuTW9kYWwsIGlzT3Bwb25lbnRBdmFpbGFibGV9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghaXNPcHBvbmVudEF2YWlsYWJsZSkge1xuICAgICAgb3Blbk1vZGFsKCdpbmZvJywgJ1lvdXIgb3Bwb25lbnQgaGFzIGRpc2Nvbm5lY3RlZC4gWW91IG5lZWQgdG8gJyArXG4gICAgICAgICdnZW5lcmF0ZSBhIG5ldyBsaW5rLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlvLmVtaXQoJ3JlbWF0Y2gtb2ZmZXInLCB7XG4gICAgICB0b2tlbjogcGFyYW1zWzBdXG4gICAgfSk7XG4gICAgb3Blbk1vZGFsKCdpbmZvJywgJ1lvdXIgb2ZmZXIgaGFzIGJlZW4gc2VudC4nKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVIZWFkZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lSGVhZGVyIGZyb20gJy4vR2FtZUhlYWRlcic7XG5pbXBvcnQgQ2hhdCBmcm9tICcuL0NoYXQnO1xuaW1wb3J0IE1vZGFsIGZyb20gJy4vTW9kYWwnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBDaGVzc2JvYXJkSW50ZXJmYWNlIGZyb20gJy4vQ2hlc3Nib2FyZEludGVyZmFjZSc7XG5pbXBvcnQgR2FtZWJvYXJkSW50ZXJmYWNlIGZyb20gJy4vR2FtZWJvYXJkSW50ZXJmYWNlJztcbmltcG9ydCB7TWFwfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi9HYW1lQm9hcmQnO1xuXG5jb25zdCBHYW1lSW50ZXJmYWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBwYXJhbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBmYWxzZSxcbiAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgbW9kYWw6IE1hcCh7XG4gICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiAnJyxcbiAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICBoaWRlOiB0aGlzLl9oaWRlTW9kYWwsXG4gICAgICAgICAgYWNjZXB0OiB0aGlzLl9hY2NlcHRSZW1hdGNoLFxuICAgICAgICAgIGRlY2xpbmU6IHRoaXMuX2RlY2xpbmVSZW1hdGNoXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgZ2FtZU92ZXI6IEdhbWVTdG9yZS5nZXRTdGF0ZSgpLmdhbWVPdmVyXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXN9ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLm9uKCd0b2tlbi1pbnZhbGlkJywgKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb2RhbDogdGhpcy5zdGF0ZS5tb2RhbFxuICAgICAgICAuc2V0KCdvcGVuJywgdHJ1ZSlcbiAgICAgICAgLnNldCgnbWVzc2FnZScsICdHYW1lIGxpbmsgaXMgaW52YWxpZCBvciBoYXMgZXhwaXJlZC4nKVxuICAgICAgICAuc2V0KCd0eXBlJywgJ2luZm8nKVxuICAgIH0pKTtcblxuICAgIGlvLmVtaXQoJ2pvaW4nLCB7XG4gICAgICB0b2tlbjogcGFyYW1zWzBdLFxuICAgICAgdGltZTogcGFyYW1zWzFdICogNjAsXG4gICAgICBpbmM6IHBhcmFtc1syXVxuICAgIH0pO1xuXG4gICAgaW8ub24oJ2pvaW5lZCcsIGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEuY29sb3IgPT09ICdibGFjaycpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29sb3I6ICdibGFjayd9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlvLm9uKCdib3RoLWpvaW5lZCcsICgpID0+XG4gICAgICB0aGlzLnNldFN0YXRlKHtpc09wcG9uZW50QXZhaWxhYmxlOiB0cnVlfSwgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb2xvciA9PT0gJ3doaXRlJykge1xuICAgICAgICAgIGlvLmVtaXQoJ2Nsb2NrLXJ1bicsIHtcbiAgICAgICAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICBpby5vbignZnVsbCcsICgpID0+IHtcbiAgICAgIHdpbmRvdy5hbGVydChcbiAgICAgICAgJ1RoaXMgZ2FtZSBhbHJlYWR5IGhhcyB0d28gcGxheWVycy4gWW91IGhhdmUgdG8gY3JlYXRlIGEgbmV3IG9uZS4nKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvJztcbiAgICB9KTtcblxuICAgIGlvLm9uKCdwbGF5ZXItcmVzaWduZWQnLCBkYXRhID0+IHtcbiAgICAgIEdhbWVBY3Rpb25zLmdhbWVPdmVyKHtcbiAgICAgICAgdHlwZTogJ3Jlc2lnbicsXG4gICAgICAgIHdpbm5lcjogZGF0YS5jb2xvciA9PT0gJ2JsYWNrJyA/ICdXaGl0ZScgOiAnQmxhY2snXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlvLm9uKCdyZW1hdGNoLW9mZmVyZWQnLCAoKSA9PlxuICAgICAgdGhpcy5fb3Blbk1vZGFsKCdvZmZlcicsICdZb3VyIG9wcG9uZW50IGhhcyBzZW50IHlvdSBhIHJlbWF0Y2ggb2ZmZXIuJykpO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtZGVjbGluZWQnLCAoKSA9PlxuICAgICAgdGhpcy5fb3Blbk1vZGFsKCdpbmZvJywgJ1JlbWF0Y2ggb2ZmZXIgaGFzIGJlZW4gZGVjbGluZWQuJykpO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtYWNjZXB0ZWQnLCAoKSA9PiB7XG4gICAgICBHYW1lQWN0aW9ucy5yZW1hdGNoKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29sb3I6IHRoaXMuc3RhdGUuY29sb3IgPT09ICd3aGl0ZScgPyAnYmxhY2snIDogJ3doaXRlJyxcbiAgICAgICAgbW9kYWw6IHRoaXMuc3RhdGUubW9kYWwuc2V0KCdvcGVuJywgZmFsc2UpXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbG9yID09PSAnd2hpdGUnKSB7XG4gICAgICAgICAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMucHJvcHMucGFyYW1zWzBdLFxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpby5vbignb3Bwb25lbnQtZGlzY29ubmVjdGVkJywgKCkgPT4gIHtcbiAgICAgIGlmICghdGhpcy5zdGF0ZS5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpKSB7XG4gICAgICAgIHRoaXMuX29wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9wcG9uZW50IGhhcyBkaXNjb25uZWN0ZWQuJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzT3Bwb25lbnRBdmFpbGFibGU6IGZhbHNlfSk7XG4gICAgfSk7XG5cbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIEdhbWVTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH0sXG5cblxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2NvbG9yLCBnYW1lT3ZlciwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNvbW1vblByb3BzID0ge1xuICAgICAgaW86IGlvLFxuICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgb3Blbk1vZGFsOiB0aGlzLl9vcGVuTW9kYWwsXG4gICAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBpc09wcG9uZW50QXZhaWxhYmxlXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8R2FtZUhlYWRlclxuICAgICAgICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICAgICAgICBwYXJhbXM9e3BhcmFtc31cbiAgICAgICAgICBnYW1lT3Zlcj17Z2FtZU92ZXIuZ2V0KCdzdGF0dXMnKX0gLz5cblxuICAgICAgICA8Q2hhdFxuICAgICAgICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICAgICAgICB0b2tlbj17cGFyYW1zWzBdfSAvPlxuXG4gICAgICAgICAgey8qXG4gICAgICAgIDxDaGVzc2JvYXJkSW50ZXJmYWNlXG4gICAgICAgICAgey4uLmNvbW1vblByb3BzfVxuICAgICAgICAgIHRva2VuPXtwYXJhbXNbMF19XG4gICAgICAgICAgc291bmRzRW5hYmxlZD17c291bmRzRW5hYmxlZH1cbiAgICAgICAgICBnYW1lT3Zlcj17Z2FtZU92ZXJ9IC8+XG4gICAgICAgICovfVxuICAgICAgICAgIFxuICAgICAgICB7Lyp9XG4gICAgICAgIDxCb2FyZCAvPlxuICAgICAgICAqL31cblxuICAgICAgICAgIDxHYW1lYm9hcmRJbnRlcmZhY2UgXG4gICAgICAgICAgICB7Li4uY29tbW9uUHJvcHN9XG4gICAgICAgICAgICB0b2tlbj17cGFyYW1zWzBdfVxuICAgICAgICAgICAgZ2FtZU92ZXI9e2dhbWVPdmVyfSAvPlxuXG5cblxuXG4gICAgICAgIDxNb2RhbCBkYXRhPXt0aGlzLnN0YXRlLm1vZGFsfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuXG5cblxuICBfb25HYW1lQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2dhbWVPdmVyOiBHYW1lU3RvcmUuZ2V0U3RhdGUoKS5nYW1lT3Zlcn0pO1xuICB9LFxuICBfb3Blbk1vZGFsKHR5cGUsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1vZGFsOiB0aGlzLnN0YXRlLm1vZGFsXG4gICAgICAgIC5zZXQoJ29wZW4nLCB0cnVlKVxuICAgICAgICAuc2V0KCdtZXNzYWdlJywgbWVzc2FnZSlcbiAgICAgICAgLnNldCgndHlwZScsIHR5cGUpXG4gICAgfSk7XG4gIH0sXG4gIF9oaWRlTW9kYWwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW9kYWw6IHRoaXMuc3RhdGUubW9kYWwuc2V0KCdvcGVuJywgZmFsc2UpfSk7XG4gIH0sXG4gIF9hY2NlcHRSZW1hdGNoKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpby5lbWl0KCdyZW1hdGNoLWFjY2VwdCcsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICB0aW1lOiBwYXJhbXNbMV0gKiA2MCxcbiAgICAgIGluYzogcGFyYW1zWzJdXG4gICAgfSk7XG4gICAgdGhpcy5faGlkZU1vZGFsKCk7XG4gIH0sXG4gIF9kZWNsaW5lUmVtYXRjaCgpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtc30gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8uZW1pdCgncmVtYXRjaC1kZWNsaW5lJywge1xuICAgICAgdG9rZW46IHBhcmFtc1swXVxuICAgIH0pO1xuICAgIHRoaXMuX2hpZGVNb2RhbCgpO1xuICB9LFxuICBfdG9nZ2xlU291bmRzKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNvdW5kc0VuYWJsZWQ6ICF0aGlzLnN0YXRlLnNvdW5kc0VuYWJsZWRcbiAgICB9KTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcbmltcG9ydCBDaGVzc2JvYXJkIGZyb20gJy4vQ2hlc3Nib2FyZCc7XG5pbXBvcnQge0JvYXJkfSBmcm9tICcuL0dhbWVCb2FyZCc7XG5pbXBvcnQgQ2FwdHVyZWRQaWVjZXMgZnJvbSAnLi9DYXB0dXJlZFBpZWNlcyc7XG5pbXBvcnQgVGFibGVPZk1vdmVzIGZyb20gJy4vVGFibGVPZk1vdmVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuLyogdGhlIHN0YXRlIG9mIHRoZSBnYW1lYm9hcmQgaXMgbWFuYWdlZCBieSBHYW1lU3RvcmUgKi9cblxuY29uc3QgR2FtZWJvYXJkSW50ZXJmYWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHByb3BUeXBlczoge1xuXG5cdH0sXG5cdG1peGluczogW29uR2FtZUNoYW5nZV0sXHRcdC8vIHRoaXMgbWl4aW4gaXMgcmVzcG9uc2libGUgZm9yIGR5bmFtaWNhbGx5IGNoYW5naW5nIHRoZSBzdGF0ZSBvZiBHYW1lYm9hcmRJbnRlcmZhY2Vcblx0Z2V0SW5pdGlhbFN0YXRlKCkge1xuXHRcdHJldHVybiBHYW1lU3RvcmUuZ2V0U3RhdGUoKTtcblx0fSxcblx0Z2V0RGVmYXVsdFByb3BzKCkge1xuXG5cdH0sXG5cdGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcblxuXHR9LFxuXHRyZW5kZXIoKSB7XG5cdFx0Y29uc3Qge3Byb21vdGlvbiwgdHVybiwgZ2FtZU92ZXIsIGNoZWNrfSA9IHRoaXMuc3RhdGVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBpZD1cImJvYXJkLW1vdmVzLXdyYXBwZXJcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuXHRcdFx0XHQ8ZGl2IGlkPVwiYm9hcmQtd3JhcHBlclwiPlxuXG5cdFx0XHRcdFx0PHA+SW0ge3RoaXMucHJvcHMuY29sb3J9PC9wPlxuXHRcdFx0XHRcdDxDYXB0dXJlZFBpZWNlcyAvPlxuXG5cdFx0XHRcdFx0PEJvYXJkIHNpemU9ezZ9XG5cdFx0XHRcdFx0XHR7Li4ub21pdCh0aGlzLnByb3BzLCAnZ2FtZU92ZXInKX1cblx0XHRcdFx0XHRcdGdhbWVPdmVyPXtnYW1lT3Zlci5nZXQoJ3N0YXR1cycpfSAvPlxuXG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImZlZWRiYWNrXCI+XG5cdFx0XHRcdFx0eyFnYW1lT3Zlci5nZXQoJ3N0YXR1cycpID9cblx0XHRcdFx0XHRcdDxzcGFuPlxuXHRcdFx0XHRcdFx0XHR7YCR7dHVybj09PSd3JyA/ICdXaGl0ZScgOiAnQmxhY2snfSB0byBtb3ZlLmB9XG5cdFx0XHRcdFx0XHQ8L3NwYW4+IDpcblx0XHRcdFx0XHRcdDxzdHJvbmc+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImljb25cIj5cblx0XHRcdFx0XHRcdFx0ICB7Z2FtZU92ZXIuZ2V0KCd3aW5uZXInKSA9PT0gJ1doaXRlJyA/ICdGJyA6ICdmJ31cblx0XHRcdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHR7dGhpcy5fZ2V0R2FtZU92ZXJNZXNzYWdlKCl9XG5cdFx0XHRcdFx0XHQ8L3N0cm9uZz5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvc3Bhbj5cblxuXHRcdFx0PGJ1dHRvbiBjbGFzc05hbWU9XCJidG5cIj5kb25hdGU8L2J1dHRvbj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fSxcblxuXHRfb25HYW1lQ2hhbmdlKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoR2FtZVN0b3JlLmdldFN0YXRlKCkpO1xuXHR9LFxuXG5cdF9nZXRHYW1lT3Zlck1lc3NhZ2UoKSB7XG5cdFx0cmV0dXJuIGB5b3UgbG9zZWA7XG5cdH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZEludGVyZmFjZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluXSxcblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgY29uc3QgaXNPcGVuID0gdGhpcy5wcm9wcy5kYXRhLmdldCgnb3BlbicpO1xuXG4gICAgaWYgKGlzT3BlbilcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleWRvd24pO1xuICAgIGVsc2VcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleWRvd24pO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcbiAgICBjb25zdCB0eXBlID0gZGF0YS5nZXQoJ3R5cGUnKTtcbiAgICBjb25zdCBjYWxsYmFja3MgPSBkYXRhLmdldCgnY2FsbGJhY2tzJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAnbW9kYWwtbWFzayc6IHRydWUsXG4gICAgICAgICAgICAgJ2hpZGRlbic6ICFkYXRhLmdldCgnb3BlbicpXG4gICAgICAgICAgIH0pfVxuICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9oaWRlTW9kYWx9PlxuICAgICAgICA8cD5cbiAgICAgICAgICA8c3Ryb25nPkVzYzogPC9zdHJvbmc+XG4gICAgICAgICAgPHNwYW4+e3R5cGUgPT09ICdpbmZvJyA/ICdPSycgOiAnRGVjbGluZSd9PC9zcGFuPlxuICAgICAgICAgIDxiciAvPlxuICAgICAgICAgIDxzdHJvbmc+RW50ZXI6IDwvc3Ryb25nPlxuICAgICAgICAgIDxzcGFuPnt0eXBlID09PSAnaW5mbycgPyAnT0snIDogJ0FjY2VwdCd9PC9zcGFuPlxuICAgICAgICA8L3A+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiXG4gICAgICAgICAgICAgb25DbGljaz17ZSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfT5cbiAgICAgICAgICA8cD57ZGF0YS5nZXQoJ21lc3NhZ2UnKX08L3A+XG5cbiAgICAgICAgICB7dHlwZSA9PT0gJ2luZm8nID8gXG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4gb2tcIlxuICAgICAgICAgICAgICAgb25DbGljaz17Y2FsbGJhY2tzLmhpZGV9PlxuICAgICAgICAgICAgICBPS1xuICAgICAgICAgICAgPC9hPiA6IFtcblxuICAgICAgICAgICAgPGEga2V5PVwiYVwiXG4gICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG5cIlxuICAgICAgICAgICAgICAgc3R5bGU9e3tsZWZ0OiAnNGVtJ319XG4gICAgICAgICAgICAgICBvbkNsaWNrPXtjYWxsYmFja3MuYWNjZXB0fT5cbiAgICAgICAgICAgICAgQWNjZXB0XG4gICAgICAgICAgICA8L2E+LFxuICAgICAgICAgICAgPGEga2V5PVwiYlwiXG4gICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLS1yZWRcIlxuICAgICAgICAgICAgICAgc3R5bGU9e3tyaWdodDogJzRlbSd9fVxuICAgICAgICAgICAgICAgb25DbGljaz17Y2FsbGJhY2tzLmRlY2xpbmV9PlxuICAgICAgICAgICAgICBEZWNsaW5lXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgXX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuICBfb25LZXlkb3duKGUpIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5wcm9wcy5kYXRhLmdldCgndHlwZScpO1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMucHJvcHMuZGF0YS5nZXQoJ2NhbGxiYWNrcycpO1xuXG4gICAgaWYgKHR5cGUgPT09ICdpbmZvJykge1xuICAgICAgaWYgKGUud2hpY2ggPT09IDEzIHx8IGUud2hpY2ggPT09IDI3KSB7XG4gICAgICAgIGNhbGxiYWNrcy5oaWRlKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2ZmZXInKSB7XG4gICAgICBpZiAoZS53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgY2FsbGJhY2tzLmFjY2VwdCgpO1xuICAgICAgfSBlbHNlIGlmIChlLndoaWNoID09PSAyNykge1xuICAgICAgICBjYWxsYmFja3MuZGVjbGluZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgX2hpZGVNb2RhbCgpIHtcbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0KCdjYWxsYmFja3MnKS5oaWRlKCk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBNb2RhbDsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XG5cbmNvbnN0IFRhYmxlT2ZNb3ZlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG9uR2FtZUNoYW5nZV0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtb3ZlczogR2FtZVN0b3JlLmdldE1vdmVzKClcbiAgICB9O1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDx0YWJsZSBpZD1cIm1vdmVzXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cbiAgICAgICAgPHRoZWFkPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0aD5UYWJsZSBvZiBtb3ZlczwvdGg+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90aGVhZD5cbiAgICAgICAgPHRib2R5PlxuICAgICAgICAgIHt0aGlzLnN0YXRlLm1vdmVzLm1hcCgocm93LCBpKSA9PiAoXG4gICAgICAgICAgICA8dHIga2V5PXtpfT5cbiAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+e2Ake2kgKyAxfS5gfTwvc3Ryb25nPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICB7cm93Lm1hcCgobW92ZSwgaikgPT4gKFxuICAgICAgICAgICAgICAgIDx0ZCBrZXk9e2p9PlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e21vdmV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICkpLnRvQXJyYXkoKX1cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgKSkudG9BcnJheSgpfVxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC90YWJsZT5cbiAgICApO1xuICB9LFxuICBfb25HYW1lQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbW92ZXM6IEdhbWVTdG9yZS5nZXRNb3ZlcygpXG4gICAgfSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBUYWJsZU9mTW92ZXM7IiwiaW1wb3J0IGtleU1pcnJvciBmcm9tICdyZWFjdC9saWIva2V5TWlycm9yJztcblxuZXhwb3J0IGRlZmF1bHQga2V5TWlycm9yKHtcbiAgVE9HR0xFX1ZJU0lCSUxJVFk6IG51bGwsXG4gIFNVQk1JVF9NRVNTQUdFOiBudWxsXG59KTsiLCJjb25zdCBDaGVzc1BpZWNlcyA9IHtcbiAgLy8ga2V5OiBwaWVjZSBmcm9tIEZFTiwgdmFsdWU6IHBpZWNlIGZyb20gU21hcnQgUmVndWxhciBjaGVzcyBmb250XG4gIC8vIHdoaXRlIHBpZWNlc1xuICAnSyc6ICdGJyxcbiAgJ1EnOiAnRScsXG4gICdSJzogJ0QnLFxuICAnQic6ICdDJyxcbiAgJ04nOiAnQicsXG4gICdQJzogJ0EnLFxuICAvLyBibGFjayBwaWVjZXNcbiAgJ2snOiAnZicsXG4gICdxJzogJ2UnLFxuICAncic6ICdkJyxcbiAgJ2InOiAnYycsXG4gICduJzogJ2InLFxuICAncCc6ICdhJyxcbiAgLy8gZW1wdHkgc3F1YXJlXG4gICctJzogdW5kZWZpbmVkXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGVzc1BpZWNlczsiLCJpbXBvcnQga2V5TWlycm9yIGZyb20gJ3JlYWN0L2xpYi9rZXlNaXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBrZXlNaXJyb3Ioe1xuICBNQUtFX01PVkU6IG51bGwsXG4gIFNIT1dfTU9WRVM6IG51bGwsXG4gIFJFTUFUQ0g6IG51bGwsXG4gIERSQVc6IG51bGwsXG4gIEdBTUVfT1ZFUjogbnVsbCxcbiAgQ0hBTkdFX1BST01PVElPTjogbnVsbFxufSk7IiwiaW1wb3J0IHtEaXNwYXRjaGVyfSBmcm9tICdmbHV4JztcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihuZXcgRGlzcGF0Y2hlcigpLCB7XG4gIC8vIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gVGhlIGRhdGEgY29taW5nIGZyb20gdGhlIHZpZXcuXG4gIGhhbmRsZVZpZXdBY3Rpb246IGZ1bmN0aW9uKGFjdGlvbikge1xuICAgIHRoaXMuZGlzcGF0Y2goe1xuICAgICAgc291cmNlOiAnVklFV19BQ1RJT04nLFxuICAgICAgYWN0aW9uOiBhY3Rpb25cbiAgICB9KTtcbiAgfVxufSk7IiwiY29uc3QgVGlsZUFjdGlvbnMgPSB7XG4gICAgXCJBc3Nhc3NpblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJqdW1wIHNsaWRlXCIsXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcImp1bXAgc2xpZGVcIixcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJqdW1wIHNsaWRlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcImp1bXAgc2xpZGVcIixcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcCBzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcImp1bXAgc2xpZGVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIkJvd21hblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMiwwXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJzdHJpa2VcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwic3RyaWtlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJDaGFtcGlvblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJzdHJpa2VcIixcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwwXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMiwwXVwiOiBcImp1bXBcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIkRyYWdvb25cIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJzdHJpa2VcIixcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwic3RyaWtlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsxLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJzbGlkZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiRHVjaGVzc1wiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcIm1vdmVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIkR1a2VcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJzbGlkZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwic2xpZGVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIkZvb3RtYW5cIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIktuaWdodFwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMSwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsyLDJdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiTG9uZ2Jvd21hblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMCwtM11cIjogXCJzdHJpa2VcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIk1hcnNoYWxsXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcImp1bXBcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMiwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIk9yYWNsZVwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcblxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIlBpa2VtYW5cIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJtb3ZlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWy0xLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMSwtMl1cIjogXCJzdHJpa2VcIixcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJtb3ZlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJQcmllc3RcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwic2xpZGVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0yLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcImp1bXBcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIlJhbmdlclwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlstMSwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsxLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0yLC0xXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsLTFdXCI6IFwianVtcFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbLTEsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsxLDJdXCI6IFwianVtcFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiU2VlclwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiV2l6YXJkXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwwXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0yLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJqdW1wXCJcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vLyB2YXIgbmV3VW5pdHMgPSB7fTtcbi8vIGZvciAodmFyIHVuaXRLZXkgaW4gVGlsZUFjdGlvbnMpIHtcbi8vICAgICB2YXIgdW5pdCA9IFRpbGVBY3Rpb25zW3VuaXRLZXldO1xuLy8gICAgIHZhciBuZXdTaWRlcyA9IHt9O1xuLy8gICAgIGZvciAodmFyIHNpZGVLZXkgaW4gdW5pdCkge1xuLy8gICAgICAgICB2YXIgZGlyID0gdW5pdFtzaWRlS2V5XTtcbi8vICAgICAgICAgdmFyIG5ld0RpciA9IHt9O1xuLy8gICAgICAgICBmb3IgKHZhciBjb29yZHMgaW4gZGlyKSB7XG4vLyAgICAgICAgICAgICB2YXIgcGFyc2VkID0gSlNPTi5wYXJzZShjb29yZHMpO1xuLy8gICAgICAgICAgICAgdmFyIG5ld0Nvb3JkcyA9IEpTT04uc3RyaW5naWZ5KFtwYXJzZWRbMV0sIHBhcnNlZFswXV0pO1xuLy8gICAgICAgICAgICAgbmV3RGlyW25ld0Nvb3Jkc10gPSBkaXJbY29vcmRzXTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBuZXdTaWRlc1tzaWRlS2V5XSA9IG5ld0Rpcjtcbi8vICAgICB9XG4vLyAgICAgbmV3VW5pdHNbdW5pdEtleV0gPSBuZXdTaWRlcztcbi8vIH1cbi8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG5ld1VuaXRzKSk7XG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IFRpbGVBY3Rpb25zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5jb25zdCBPUklHSU4gPSAnaHR0cDovL2xvY2FsaG9zdDoxMzM3JztcbmNvbnN0IFdTID0gT1JJR0lOO1xuXG5leHBvcnQgZGVmYXVsdCBpby5jb25uZWN0KFdTKTsiLCJjb25zdCBtYXliZVJldmVyc2UgPSB7XG4gIF9tYXliZVJldmVyc2UoaXRlcmFibGUsIGNvbG9yKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY29sb3IgPT09IChjb2xvciB8fCAnYmxhY2snKSA/XG4gICAgICBpdGVyYWJsZS5yZXZlcnNlKCkgOiBpdGVyYWJsZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWF5YmVSZXZlcnNlOyIsImltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5cbmNvbnN0IG9uR2FtZUNoYW5nZSA9IHtcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgR2FtZVN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBHYW1lU3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBvbkdhbWVDaGFuZ2U7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIyIGFzIEV2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRlbWl0dGVyMic7XG5pbXBvcnQgQ2hhdENvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvQ2hhdENvbnN0YW50cyc7XG5pbXBvcnQge0xpc3QsIE1hcH0gZnJvbSAnaW1tdXRhYmxlJztcblxuY29uc3QgQ0hBTkdFX0VWRU5UID0gJ2NoYW5nZSc7XG4gIFxudmFyIF9tZXNzYWdlcyA9IExpc3QoKTtcbnZhciBfdW5zZWVuQ291bnQgPSAwO1xudmFyIF9pc0NoYXRIaWRkZW4gPSB0cnVlO1xuXG5jb25zdCBDaGF0U3RvcmUgPSBPYmplY3QuYXNzaWduKHt9LCBFdmVudEVtaXR0ZXIucHJvdG90eXBlLCB7XG4gIGdldFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlczogX21lc3NhZ2VzLFxuICAgICAgdW5zZWVuQ291bnQ6IF91bnNlZW5Db3VudCxcbiAgICAgIGlzQ2hhdEhpZGRlbjogX2lzQ2hhdEhpZGRlblxuICAgIH07XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiB0b2dnbGVWaXNpYmlsaXR5KCkge1xuICBfaXNDaGF0SGlkZGVuID0gIV9pc0NoYXRIaWRkZW47XG4gIF91bnNlZW5Db3VudCA9IDA7XG59XG5cbmZ1bmN0aW9uIHN1Ym1pdE1lc3NhZ2UobWVzc2FnZSwgY2xhc3NOYW1lLCByZWNlaXZlZCkge1xuICBfbWVzc2FnZXMgPSBfbWVzc2FnZXMucHVzaChNYXAoe1xuICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVcbiAgfSkpO1xuXG4gIGlmIChyZWNlaXZlZCAmJiBfaXNDaGF0SGlkZGVuKSB7XG4gICAgX3Vuc2VlbkNvdW50ICs9IDE7XG4gIH1cbn1cblxuQXBwRGlzcGF0Y2hlci5yZWdpc3RlcihwYXlsb2FkID0+IHtcbiAgY29uc3QgYWN0aW9uID0gcGF5bG9hZC5hY3Rpb247XG5cbiAgc3dpdGNoIChhY3Rpb24uYWN0aW9uVHlwZSkge1xuICAgIGNhc2UgQ2hhdENvbnN0YW50cy5UT0dHTEVfVklTSUJJTElUWTpcbiAgICAgIHRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBDaGF0Q29uc3RhbnRzLlNVQk1JVF9NRVNTQUdFOlxuICAgICAgc3VibWl0TWVzc2FnZShhY3Rpb24ubWVzc2FnZSwgYWN0aW9uLmNsYXNzTmFtZSwgYWN0aW9uLnJlY2VpdmVkKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgQ2hhdFN0b3JlLmVtaXQoQ0hBTkdFX0VWRU5UKTtcbiAgcmV0dXJuIHRydWU7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdFN0b3JlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyMiBhcyBFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50ZW1pdHRlcjInO1xuaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0dhbWVDb25zdGFudHMnO1xuaW1wb3J0IENoZXNzUGllY2VzIGZyb20gJy4uL2NvbnN0YW50cy9DaGVzc1BpZWNlcyc7XG5pbXBvcnQge0NoZXNzfSBmcm9tICdjaGVzcy5qcyc7XG5pbXBvcnQge0xpc3QsIE1hcCwgT3JkZXJlZE1hcCwgU2V0fSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IGJlaGF2aW9yIGZyb20gJy4uL2dhbWUvYmVoYXZpb3InO1xuLy9pbXBvcnQgVXRpbHMgZnJvbSAnLi4vZ2FtZS91dGlscyc7XG4vLyBpbXBvcnQgYmVoYXZpb3IgZnJvbSAnLi4vZ2FtZS9iZWhhdmlvcic7XG5cbmNvbnN0IENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xuY29uc3QgTU9WRV9FVkVOVCA9ICduZXctbW92ZSc7XG5cbnZhciBfZ2FtZU92ZXI7XG52YXIgX2NhcHR1cmVkUGllY2VzO1xudmFyIF9tb3ZlcztcbnZhciBfdHVybjtcbnZhciBfY2hlY2s7XG52YXIgX2xhc3RNb3ZlO1xudmFyIF9jaGVzcztcblxudmFyIF9ib2FyZCA9IHt9LFxuICAgIF9saWdodHVwID0gW10sXG4gICAgX3N0cmlrZSA9IFtdLFxuICAgIF9kcm9wID0gW10sXG4gICAgX3NlbGVjdGVkLFxuICAgIF9kcmF3biA9IFtdLFxuICAgIF9yZXN1bHQ7XG5cblxuc2V0SW5pdGlhbFN0YXRlKCk7XG5cbnZhciBHYW1lU3RvcmUgPSBPYmplY3QuYXNzaWduKHt9LCBFdmVudEVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgYWRkQ2hhbmdlTGlzdGVuZXI6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICB0aGlzLm9uKENIQU5HRV9FVkVOVCwgY2IpO1xuICAgIH0sXG5cbiAgICByZW1vdmVDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24oY2IpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2hhbmdlTGlzdGVuZXIoQ0hBTkdFX0VWRU5ULCBjYik7XG4gICAgfSxcbiAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdhbWVPdmVyOiBfZ2FtZU92ZXIsXG4gICAgICAgICAgICB0dXJuOiBfdHVybixcbiAgICAgICAgICAgIGNoZWNrOiBfY2hlY2ssXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRDYXB0dXJlZFBpZWNlcygpIHtcbiAgICAgICAgcmV0dXJuIF9jYXB0dXJlZFBpZWNlcztcbiAgICB9LFxuICAgIGdldE1vdmVzKCkge1xuICAgICAgICByZXR1cm4gX21vdmVzO1xuICAgIH0sXG4gICAgLy8gZ2V0Q2hlc3Nib2FyZFN0YXRlKCkge1xuICAgIC8vICAgICByZXR1cm4ge1xuICAgIC8vICAgICAgICAgZmVuOiBfY2hlc3MuZmVuKCksXG4gICAgLy8gICAgICAgICBsYXN0TW92ZTogX2xhc3RNb3ZlLFxuICAgIC8vICAgICAgICAgY2hlY2s6IF9jaGVja1xuICAgIC8vICAgICB9O1xuICAgIC8vIH0sXG5cblxuICAgIGdldEdhbWVib2FyZFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYm9hcmQ6IF9ib2FyZCxcbiAgICAgICAgICAgIGxpZ2h0dXA6IF9saWdodHVwLFxuICAgICAgICAgICAgc3RyaWtlOiBfc3RyaWtlLFxuICAgICAgICAgICAgZHJvcDogX2Ryb3AsXG4gICAgICAgICAgICBzZWxlY3RlZDogX3NlbGVjdGVkLFxuICAgICAgICAgICAgZHJhd1VuaXQ6IF9yZXN1bHQsXG4gICAgICAgICAgICB0dXJuOiBfdHVyblxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRyYXcoKSB7XG4gICAgICAgIC8vJ1sxLCAwXSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnYmxhY2snLCBzaWRlOiAnZnJvbnQnfSxcbiAgICAgICAgdmFyIHVuaXRzID0gW107XG4gICAgICAgICAgIFxuICAgICAgICBPYmplY3Qua2V5cyhiZWhhdmlvcikuZm9yRWFjaChmdW5jdGlvbih1bml0KXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwid2hhdCBpcyB0aGUga2V5IG9mIGJlaGF2aW9yP1wiLCB1bml0KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwid2hhdCBhbSBpIGFkZGluZyBhZ2Fpbj8/XCIsIGJlaGF2aW9yW2Ake3VuaXR9YF0pO1xuICAgICAgICAgICAgaWYoX2RyYXduLmluZGV4T2YoYmVoYXZpb3JbYCR7dW5pdH1gXSkgPT09IC0xICYmIHVuaXQgIT09ICdEdWtlJyl7XG4gICAgICAgICAgICAgICAgdmFyIHVuaXRPYmogPSB7fTtcbiAgICAgICAgICAgICAgICB1bml0T2JqW2Ake3VuaXR9YF0gPSBiZWhhdmlvcltgJHt1bml0fWBdO1xuICAgICAgICAgICAgICAgIHVuaXRzLnB1c2godW5pdE9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHZhciBwaWtlQ291bnRzID0gMDtcbiAgICAgICAgICAgICAgICBfZHJhd24uZm9yRWFjaChmdW5jdGlvbih1bml0KXtcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihPYmplY3Qua2V5cyh1bml0KVswXSA9PT0gJ1Bpa2VtYW4nKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpa2VDb3VudHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaWYodW5pdCA9PT0gJ1Bpa2VtYW4nICYmIHBpa2VDb3VudHMgPCAzKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAzIC0gcGlrZUNvdW50cztcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoaSA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVuaXRPYmogPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICB1bml0T2JqW2Ake3VuaXR9YF0gPSBiZWhhdmlvcltgJHt1bml0fWBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRzLnB1c2godW5pdE9iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHVuaXRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp1bml0cy5sZW5ndGgpXTtcbiAgICAgICAgX2RyYXduLnB1c2gocmVzdWx0KTtcbiAgICAgICAgdmFyIHJlc3VsdFRvUmV0dXJuID0ge307XG4gICAgICAgIHJlc3VsdFRvUmV0dXJuWydbLTEsIC0xXSddID0ge3VuaXQ6IGAke09iamVjdC5rZXlzKHJlc3VsdClbMF19YCwgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9O1xuICAgICAgICBfcmVzdWx0ID0gcmVzdWx0VG9SZXR1cm47XG4gICAgfSxcblxuXG5cbn0pO1xuXG5cbmZ1bmN0aW9uIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBfZ2FtZU92ZXIgPSBNYXAoe1xuICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICB3aW5uZXI6IG51bGxcbiAgICB9KTtcbiAgICBfY2FwdHVyZWRQaWVjZXMgPSBPcmRlcmVkTWFwKFtcbiAgICAgICAgWyd3JywgTGlzdCgpXSxcbiAgICAgICAgWydiJywgTGlzdCgpXVxuICAgIF0pO1xuICAgIF9tb3ZlcyA9IExpc3QoKTtcbiAgICBfdHVybiA9ICd3JztcbiAgICBfY2hlY2sgPSBmYWxzZTtcbiAgICBfbGFzdE1vdmUgPSBNYXAoKTtcbiAgICBfc2VsZWN0ZWQgPSBudWxsO1xuICAgIC8vX2NoZXNzID0gbmV3IENoZXNzKCk7XG5cbiAgICBfbGlnaHR1cCA9IHt9O1xuICAgIF9zdHJpa2UgPSB7fTtcbiAgICBfZHJvcCA9IHt9O1xuXG4gICAgX2JvYXJkID0ge1xuICAgICAgICAnWzEsIDBdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzIsIDBdJzoge3VuaXQ6ICdEdWtlJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzMsIDBdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzIsIDVdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzMsIDVdJzoge3VuaXQ6ICdEdWtlJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzQsIDVdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9XG4gICAgfTtcblxufVxuXG5mdW5jdGlvbiBtb3ZlVG9Cb2FyZCgpIHtcblxuXG4gICAgaWYgKGVtaXRNb3ZlKSB7XG4gICAgICAgIEdhbWVTdG9yZS5lbWl0KE1PVkVfRVZFTlQsIHtcbiAgICAgICAgICAgIHRvOiB0byxcbiAgICAgICAgICAgIGNhcHR1cmU6IGNhcHR1cmUsXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgYm9hcmQ6IF9ib2FyZCAgICBcbiAgICAgICAgICAgIC8vZ2FtZU92ZXI6IF9jaGVzcy5nYW1lX292ZXIoKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQm9hcmQoZnJvbSwgdG8sIHR5cGUpIHtcblxuICAgIGNvbnNvbGUubG9nKFwid2hlcmUgaXMgZnJvbVwiLCBmcm9tKTtcbiAgICBjb25zb2xlLmxvZyhcIndoZXJlIGlzIHRvXCIsIHRvKTtcbiAgICAgdmFyIHVuaXQ7XG4gICAgaWYoZnJvbSA9PT0gJ1stMSwgLTFdJyl7XG4gICAgICAgICBjb25zb2xlLmxvZyhcIndoYXQgaXMgdW5pdCBhZnRlciBkcm9wP1wiLCBfcmVzdWx0KTtcbiAgICAgICAgIGNvbnNvbGUubG9nKFwid2hhdCBpcyB1bml0IGFmdGVyIGRyb3A/XCIsIF9yZXN1bHRbZnJvbV0pO1xuICAgICAgICAgX3Jlc3VsdFtmcm9tXS5zaWRlID0gJ2Zyb250JztcbiAgICAgICAgIF9ib2FyZFt0b10gPSBfcmVzdWx0W2Zyb21dO1xuXG4gICAgICAgICAvL3VuaXQgPSBfcmVzdWx0O1xuXG4gICAgIC8vIF9ib2FyZFtmcm9tXSA9IG51bGw7XG4gICAgIC8vIF9ib2FyZFt0b10gPSB1bml0O1xuICAgIC8vY29uc29sZS5sb2coXCJ3aGF0IGFyZSB0aGUgdHJ1ZSBkcm9wcyA/XCIsIF9kcm9wKTtcbiAgICBfZHJvcCA9IG51bGw7XG4gICAgX3NlbGVjdGVkID0gbnVsbDtcbiAgICByZXR1cm4gX2JvYXJkO1xuICAgIFxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICAgLy91bml0ID0gX2JvYXJkW2Zyb21dO1xuXG4gICAgXG4gICAgLy9jb25zb2xlLmxvZyhcIndoYXQgaXMgdW5pdCBhZnRlciBkcm9wP1wiLCB1bml0KTtcblxuICAgIC8vIGlmIChmcm9tID09PSAnWy0xLCAtMV0nKSB7XG4gICAgLy8gICBfYm9hcmRbdG9dID0gXG4gICAgLy8gfVxuXG4gICAgdmFyIHVuaXQgPSBfYm9hcmRbZnJvbV07XG5cbiAgICBjb25zb2xlLmxvZygndXBkYXRlQm9hcmQgdW5pdDonKTtcbiAgICBjb25zb2xlLmxvZyh1bml0KTtcbiAgICBjb25zb2xlLmxvZygnX2JvYXJkJyk7XG4gICAgY29uc29sZS5sb2coX2JvYXJkKTtcbiAgICBjb25zb2xlLmxvZyhgZnJvbTogJHtmcm9tfWApO1xuICAgIGNvbnNvbGUubG9nKGB0bzogJHt0b31gKTtcblxuXG4gICAgdW5pdC5zaWRlID0gKHVuaXQuc2lkZSA9PT0gJ2Zyb250JykgPyAnYmFjaycgOiAnZnJvbnQnO1xuXG4gICAgaWYgKHR5cGUgPT09ICdtb3ZlJykge1xuICAgICAgX2JvYXJkW2Zyb21dID0gbnVsbDtcbiAgICAgIF9ib2FyZFt0b10gPSB1bml0O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnc3RyaWtlJykge1xuICAgICAgX2JvYXJkW3RvXSA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIF9zZWxlY3RlZCA9IG51bGw7XG4gICAgcmV0dXJuIF9ib2FyZDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VNb3ZlKGZyb20sIHRvLCBjYXB0dXJlLCB0eXBlLCBlbWl0TW92ZSkge1xuICAgXG4gICAgdXBkYXRlQm9hcmQoZnJvbSwgdG8sIHR5cGUpO1xuXG4gICAgX3R1cm4gPSBfdHVybiA9PT0gJ3cnID8gJ2InIDogJ3cnO1xuXG4gICAgaWYgKGVtaXRNb3ZlKSB7XG4gICAgICAgIEdhbWVTdG9yZS5lbWl0KE1PVkVfRVZFTlQsIHtcbiAgICAgICAgICAgIGZyb206IGZyb20sXG4gICAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgICBjYXB0dXJlOiBjYXB0dXJlLFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIC8vIGJvYXJkOiBfYm9hcmQgICAgXG4gICAgICAgICAgICAvL2dhbWVPdmVyOiBfY2hlc3MuZ2FtZV9vdmVyKClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cblxuZnVuY3Rpb24gZ2FtZU92ZXIob3B0aW9ucykge1xuICAgIF9nYW1lT3ZlciA9IF9nYW1lT3ZlclxuICAgICAgICAuc2V0KCdzdGF0dXMnLCB0cnVlKVxuICAgICAgICAuc2V0KCd3aW5uZXInLCBvcHRpb25zLndpbm5lcilcbiAgICAgICAgLnNldCgndHlwZScsIG9wdGlvbnMudHlwZSk7XG59XG5cbkFwcERpc3BhdGNoZXIucmVnaXN0ZXIocGF5bG9hZCA9PiB7XG4gICAgY29uc3QgYWN0aW9uID0gcGF5bG9hZC5hY3Rpb247XG4gICAgbGV0IGVtaXRFdmVudCA9IHRydWU7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi5hY3Rpb25UeXBlKSB7XG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5NQUtFX01PVkU6XG4gICAgICAgICAgICBlbWl0RXZlbnQgPSBtYWtlTW92ZShcbiAgICAgICAgICAgICAgICBhY3Rpb24uZnJvbSwgYWN0aW9uLnRvLCBhY3Rpb24uY2FwdHVyZSwgYWN0aW9uLnR5cGUsIGFjdGlvbi5lbWl0TW92ZSk7XG4gICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EUkFXOlxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuR0FNRV9PVkVSOlxuICAgICAgICAgICAgZ2FtZU92ZXIoYWN0aW9uLm9wdGlvbnMpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLlJFTUFUQ0g6XG4gICAgICAgICAgICBzZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZW1pdEV2ZW50KSB7XG4gICAgICAgIEdhbWVTdG9yZS5lbWl0KENIQU5HRV9FVkVOVCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVTdG9yZTtcbiJdfQ==
