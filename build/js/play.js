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
  makeMove: function makeMove(from, to, capture, emitMove) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.MAKE_MOVE,
      from: from,
      to: to,
      capture: capture,
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
    soundsEnabled: React.PropTypes.bool.isRequired,
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
  _maybePlaySound: function _maybePlaySound() {
    if (this.props.soundsEnabled) {
      this.refs.msgSnd.getDOMNode().play();
    }
  }
});

module.exports = Chat;

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
//import maybeReverse from '../mixins/maybeReverse';

var behavior = _interopRequire(require("../game/behavior"));

var omit = _interopRequire(require("lodash.omit"));

var cx = _interopRequire(require("classnames"));

var GameBoard = React.createClass({
	displayName: "GameBoard",

	propTypes: {},
	mixins: [],
	getInitialState: function getInitialState() {
		//return null;
		this.state = GameStore.getGameboardState();
		console.log("state? ", this.state);
		return this.state;
		// {
		// 	setup: state.setup;
		// }
	},
	componentDidMount: function componentDidMount() {
		GameStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function componentWillUnmount() {
		GameStore.removeChangeListener(this._onChange);
	},
	_onChange: function _onChange() {
		console.log("hai karen-chan");
		//console.log(GameStore.getGameboardState().lightup);
		console.log(GameStore.getGameboardState());
		console.log(this);
		// function foo(state, self){
		// 	//var self = this;
		// 	baz(self);
		// 	if(state.lightup.length === 0){
		// 		self.setState({
		// 			lightup: GameStore.getGameboardState().lightup
		// 		},baz(self));

		// 	}
		// }

		this.setState({
			lightup: GameStore.getGameboardState().lightup
		});
	},
	_onCellClick: function _onCellClick() {
		console.log("cell clicked");
	},
	render: function render() {
		var _this = this;

		var _ref = this;

		var state = _ref.state;
		var props = _ref.props;var setup = state.setup;var size = props.size;
		var setup = state.setup;
		var lightup = state.lightup;

		console.log("HOW ABOUT DIS STATE");

		console.log(lightup);

		var cellArray = [];
		for (var i = 0; i < size; i++) {
			var row = [];
			for (var j = 0; j < size; j++) {
				row.push({ x: j, y: i });
			}
			cellArray.push(row);
		}
		return React.createElement(
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
								unit: setup["[" + idx2 + ", " + idx1 + "]"] ? setup["[" + idx2 + ", " + idx1 + "]"].unit : null,
								color: setup["[" + idx2 + ", " + idx1 + "]"] ? setup["[" + idx2 + ", " + idx1 + "]"].color : null,
								litup: lightup["[" + idx2 + ", " + idx1 + "]"],
								onClick: _this._onCellClick })
						);
					})
				);
			})
		);
	}

});

var Cell = React.createClass({
	displayName: "Cell",

	propTypes: {},
	getInitialState: function getInitialState() {
		return {
			side: "front",
			highlighted: false
		};
	},
	componentDidMount: function componentDidMount() {},

	componentWillMount: function componentWillMount() {},
	mixins: [],

	_onClickSquare: function _onClickSquare() {
		var _props = this.props;
		var unit = _props.unit;
		var position = _props.position;
		var color = _props.color;
		var side = this.state.side;

		if (unit) {
			var ranges = [];
			var moves = behavior[unit][side];
			var pos = JSON.parse(position);
			Object.keys(moves).map(function (move) {
				move = JSON.parse(move);
				var x = pos[0] + move[0],
				    y = pos[1] + move[1];
				ranges.push({ x: x, y: y });
			});
			console.log("range:", ranges);
			console.log("hi " + unit + "!");
			console.log(behavior[unit]);
			GameActions.showMoves({ unit: unit, color: color }, pos, ranges);

			//this._flip();
		}
	},

	_flip: function _flip() {
		this.setState({ side: this.state.side === "front" ? "back" : "front" });
	},

	render: function render() {
		var _props = this.props;
		var unit = _props.unit;
		var color = _props.color;
		var litup = _props.litup;
		var side = this.state.side;

		var cxObj = {
			unit: !!unit,
			litup: litup
		};
		cxObj[side] = true;
		if (unit) {
			cxObj[unit] = true;
			cxObj[color] = true;
		}

		return React.createElement(
			"div",
			null,
			React.createElement("div", { className: cx(cxObj),
				onClick: this._onClickSquare })
		);
	}

});

module.exports = { Board: GameBoard, Cell: Cell };

//console.log("position is ", this.props.position);

},{"../actions/GameActions":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/actions/GameActions.js","../game/behavior":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/game/behavior.js","../stores/GameStore":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/stores/GameStore.js","classnames":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/node_modules/classnames/index.js","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/GameHeader.js":[function(require,module,exports){
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
      soundsEnabled: false,
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
    var soundsEnabled = _state.soundsEnabled;
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
        token: params[0],
        soundsEnabled: soundsEnabled })),
      React.createElement(GameboardInterface, null),
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
	mixins: [],
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
				React.createElement(CapturedPieces, null),
				React.createElement(Board, { size: 6 })
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
            "[-2,0]": "jump slide",
            "[2,-2]": "jump slide",
            "[2,2]": "jump slide"
        },
        back: {
            "[-2,-2]": "jump slide",
            "[-2,2]": "jump slide",
            "[2,0]": "jump slide"
        }
    },
    Bowman: {
        front: {
            "[-1,0]": "move",
            "[0,1]": "move",
            "[0,-1]": "move",
            "[0,-2]": "jump",
            "[0,2]": "jump",
            "[2,0]": "jump"
        },
        back: {
            "[-1,0]": "move",
            "[1, -1]": "move",
            "[1, 1]": "move",
            "[-1, -1]": "strike",
            "[-2, 0]": "strike",
            "[-1, 1]": "strike"
        }
    },
    Champion: {
        front: {
            "[-1,0]": "move",
            "[0,1]": "move",
            "[1,0]": "move",
            "[0,-1]": "move",
            "[-2,0]": "jump",
            "[0,2]": "jump",
            "[2,0]": "jump",
            "[0,-2]": "jump"
        },
        back: {
            "[-1,0]": "strike",
            "[0,1]": "strike",
            "[1,0]": "strike",
            "[0,-1]": "strike",
            "[-2,0]": "jump",
            "[0,2]": "jump",
            "[2,0]": "jump",
            "[0,-2]": "jump"
        }
    },
    Dragoon: {
        front: {
            "[0,-1]": "move",
            "[0,1]": "move",
            "[-2,-2]": "strike",
            "[-2,0]": "strike",
            "[-2,2]": "strike"
        },
        back: {
            "[-1,0]": "move",
            "[-2,0]": "move",
            "[-2,-1]": "jump",
            "[-2,1]": "jump",
            "[1, -1]": "slide",
            "[1, 1]": "slide"
        }
    },
    Duchess: {
        front: {
            "[0,1]": "move",
            "[0,-1]": "move",
            "[2,0]": "move"
        },
        back: {
            "[0,1]": "move",
            "[0,-1]": "move",
            "[2,0]": "move"
        }
    },
    Duke: {
        front: {
            "[0,-1]": "slide",
            "[0,1]": "slide"
        },
        back: {
            "[-1,0]": "slide",
            "[1,0]": "slide"
        }
    },
    Footman: {
        front: {
            "[1,0]": "move",
            "[-1,0]": "move",
            "[0,1]": "move",
            "[0,-1]": "move"
        },
        back: {
            "[-2,0]": "move",
            "[1,-1]": "move",
            "[1,1]": "move",
            "[-1,-1]": "move",
            "[-1,1]": "move"
        }
    },
    Knight: {
        front: {
            "[-2,-1]": "jump",
            "[-2,1]": "jump",
            "[0,-1]": "move",
            "[0,1]": "move",
            "[1,0]": "move",
            "[2,0]": "move"
        },
        back: {
            "[-1,0]": "slide",
            "[1,-1]": "move",
            "[1,1]": "move",
            "[2,-2]": "move",
            "[2,2]": "move"
        }
    },
    Longbowman: {
        front: {
            "[-1,0]": "move",
            "[0,1]": "move",
            "[1,0]": "move",
            "[0,-1]": "move"
        },
        back: {
            "[-2,0]": "strike",
            "[-3,0]": "strike",
            "[1,-1]": "move",
            "[1,1]": "move" }
    },
    Marshall: {
        front: {
            "[0,-1]": "slide",
            "[0,1]": "slide",
            "[-2,-2]": "jump",
            "[-2,2]": "jump",
            "[2,0]": "jump"
        },
        back: {
            "[-1,-1]": "move",
            "[-1,0]": "move",
            "[-1,1]": "move",
            "[0,-2]": "move",
            "[0,-1]": "move",
            "[0,1]": "move",
            "[0,2]": "move",
            "[1,-1]": "move",
            "[1,1]": "move"
        }
    },
    Oracle: {
        front: {
            "[-1,-1]": "move",
            "[-1,1]": "move",
            "[1,-1]": "move",
            "[1,1]": "move"
        },
        back: {}
    },
    Pikeman: {
        front: {
            "[-2,-2]": "move",
            "[-1,-1]": "move",
            "[-1,1]": "move",
            "[-2,2]": "move"
        },
        back: {
            "[-2,-1]": "strike",
            "[-2,1]": "strike",
            "[-1,0]": "move",
            "[1,0]": "move",
            "[2,0]": "move"
        }
    },
    Priest: {
        front: {
            "[-1,-1]": "slide",
            "[-1,1]": "slide",
            "[1,-1]": "slide",
            "[1,1]": "slide"
        },
        back: {
            "[-1,-1]": "move",
            "[-1,1]": "move",
            "[1,-1]": "move",
            "[1,1]": "move",
            "[-2,-2]": "jump",
            "[-2,2]": "jump",
            "[2,-2]": "jump",
            "[2,2]": "jump"
        }
    },
    Ranger: {
        front: {
            "[-1,0]": "slide",
            "[1,0]": "slide",
            "[-2,-1]": "jump",
            "[-2,1]": "jump",
            "[-1,-2]": "jump",
            "[-1,2]": "jump"
        },
        back: {
            "[-1,-1]": "slide",
            "[-1,1]": "slide",
            "[2,-1]": "jump",
            "[2,1]": "jump" }
    },
    Seer: {
        front: {
            "[-2,0]": "jump",
            "[0,2]": "jump",
            "[2,0]": "jump",
            "[0,-2]": "jump",
            "[-1,-1]": "move",
            "[-1,1]": "move",
            "[1,-1]": "move",
            "[1,1]": "move"
        },
        back: {
            "[-2,-2]": "jump",
            "[-2,2]": "jump",
            "[2,-2]": "jump",
            "[2,2]": "jump",
            "[-1,0]": "move",
            "[1,0]": "move",
            "[0,-1]": "move",
            "[0,1]": "move"

        }
    },
    Wizard: {
        front: {
            "[-1,-1]": "move",
            "[-1,0]": "move",
            "[-1,1]": "move",
            "[0,-1]": "move",
            "[0,1]": "move",
            "[1,-1]": "move",
            "[1,0]": "move",
            "[1,1]": "move" },
        back: {
            "[-2,-2]": "jump",
            "[-2,0]": "jump",
            "[-2,2]": "jump",
            "[0,-2]": "jump",
            "[0,2]": "jump",
            "[2,-2]": "jump",
            "[2,0]": "jump",
            "[2,2]": "jump" }
    } };

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

//import Utils from '../game/utils';
// import behavior from '../game/behavior';

var CHANGE_EVENT = "change";
var MOVE_EVENT = "new-move";

var _gameOver;
var _capturedPieces;
var _moves;
var _promotion;
var _turn;
var _check;
var _lastMove;
var _chess;

var _board = {};
var _lightup = {};

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
            promotion: _promotion,
            turn: _turn,
            check: _check };
    },
    getCapturedPieces: function getCapturedPieces() {
        return _capturedPieces;
    },
    getMoves: function getMoves() {
        return _moves;
    },
    getChessboardState: function getChessboardState() {
        return {
            fen: _chess.fen(),
            lastMove: _lastMove,
            check: _check
        };
    },

    getGameboardState: function getGameboardState() {
        return {
            setup: _board,
            lightup: _lightup
        };
    },

    getValidMoves: function getValidMoves(square) {
        return square ? Set(_chess.moves({
            square: square,
            verbose: true
        }).map(function (move) {
            return move.to;
        })) : Set();
    },

    showMoves: function showMoves(unit, from, inRange) {
        console.log(unit);
        console.log(from);

        inRange.filter(function (range) {
            return isValidMove(unit, range);
        }).forEach(function (move) {
            var coordsStr = "[" + move.x + ", " + move.y + "]";
            _lightup[coordsStr] = true;
        });

        console.log("lit up stuf");
        console.log(_lightup);
        //this.setState({_lightup: validMoves});
        console.log("foreal doe");
        console.log(_lightup);

        return true;
        //console.log(this.getState());
        // console.log('valid Moves:')
        // console.log(validMoves);
    }

});

function setInitialState() {
    _gameOver = Map({
        status: false,
        type: null,
        winner: null
    });
    _capturedPieces = OrderedMap([["w", List()], ["b", List()]]);
    _moves = List();
    _promotion = "q";
    _turn = "w";
    _check = false;
    _lastMove = Map();
    //_chess = new Chess();

    _lightup = [];

    _board = {
        "[1, 0]": { unit: "Footman", color: "black" },
        "[2, 0]": { unit: "Duke", color: "black" },
        "[3, 0]": { unit: "Footman", color: "black" },
        "[2, 5]": { unit: "Footman", color: "white" },
        "[3, 5]": { unit: "Duke", color: "white" },
        "[4, 5]": { unit: "Footman", color: "white" }
    };
}

function draw() {}

function makeMove(from, to, capture, emitMove) {
    var move = _chess.move({
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
    _lastMove = _lastMove.set("from", from).set("to", to);
    _moves = _moves.isEmpty() || _moves.last().size === 2 ? _moves.push(List([move.san])) : _moves.update(_moves.size - 1, function (list) {
        return list.push(move.san);
    });

    if (capture || move.flags === "e") {
        (function () {
            var capturedPiece = capture || ChessPieces[_turn === "w" ? "P" : "p"]; // en passant

            _capturedPieces = _capturedPieces.update(_turn, function (list) {
                return list.push(capturedPiece);
            });
        })();
    }

    if (_chess.game_over()) {
        var type = _chess.in_checkmate() ? "checkmate" : _chess.in_stalemate() ? "stalemate" : _chess.in_threefold_repetition() ? "threefoldRepetition" : _chess.insufficient_material() ? "insufficientMaterial" : _chess.in_draw() ? "draw" : null;

        gameOver({
            winner: _turn === "b" ? "White" : "Black",
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

    var validMoves = inRange.filter(function (range) {
        return isValidMove(unit, range);
    });

    //this.setState({_lightup: validMoves});
    console.log("boop");
    console.log(this.state);
    // console.log('valid Moves:')
    // console.log(validMoves);

    //console.log(`inRange: ${inRange}`);
    //console.log(`utils: ${Utils.showme()}`);
}

function isOnBoard(coords) {
    if (!coords.x || !coords.y) {
        return false;
    }var coordsStr = "[" + coords.y + ", " + coords.x + "]";
    //console.log('coordsStr:', coordsStr);
    //console.log('_board:', _board);
    // console.log(`on tile ${coordsStr}`, _board[coordsStr]);
    return coords.x >= 0 && coords.y >= 0 && coords.x < 6 && coords.y < 6;
}

function isValidMove(unit, coords) {
    var coordsStr = "[" + coords.x + ", " + coords.y + "]";
    var targetUnit = _board[coordsStr];

    if (targetUnit) {
        //console.log(`unit.color: ${unit.color}`);
        console.log("targetUnit.color: " + targetUnit.color);
        if (unit.color === targetUnit.color) {
            return false;
        }
    }
    return isOnBoard(coords);
}

function gameOver(options) {
    _gameOver = _gameOver.set("status", true).set("winner", options.winner).set("type", options.type);
}

AppDispatcher.register(function (payload) {
    var action = payload.action;
    var emitEvent = true;

    switch (action.actionType) {
        case GameConstants.MAKE_MOVE:
            emitEvent = makeMove(action.from, action.to, action.capture, action.emitMove);
            break;

        case GameConstants.SHOW_MOVES:
            emitEvent = GameStore.showMoves(action.unit, action.from, action.inRange);
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

module.exports = GameStore;

},{"../constants/ChessPieces":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/constants/ChessPieces.js","../constants/GameConstants":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/constants/GameConstants.js","../dispatcher/AppDispatcher":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/dispatcher/AppDispatcher.js","chess.js":"chess.js","eventemitter2":"eventemitter2","immutable":"immutable"}]},{},["./src/js/play.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvcGxheS5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2tleU1pcnJvci5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9hY3Rpb25zL0NoYXRBY3Rpb25zLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2FjdGlvbnMvR2FtZUFjdGlvbnMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DYXB0dXJlZFBpZWNlcy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0NoYXQuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DaGVzc2JvYXJkLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2hlc3Nib2FyZEludGVyZmFjZS5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0Nsb2NrLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUJvYXJkLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUhlYWRlci5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0dhbWVJbnRlcmZhY2UuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lYm9hcmRJbnRlcmZhY2UuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9Nb2RhbC5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL1RhYmxlT2ZNb3Zlcy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hhdENvbnN0YW50cy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hlc3NQaWVjZXMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29uc3RhbnRzL0dhbWVDb25zdGFudHMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2dhbWUvYmVoYXZpb3IuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvaW8uanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvbWl4aW5zL21heWJlUmV2ZXJzZS5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9taXhpbnMvb25HYW1lQ2hhbmdlLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL3N0b3Jlcy9DaGF0U3RvcmUuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvc3RvcmVzL0dhbWVTdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7OztRQUVOLFVBQVU7O0lBQ1YsS0FBSywyQkFBTSxPQUFPOztJQUNsQixFQUFFLDJCQUFNLE1BQU07O0lBQ2QsYUFBYSwyQkFBTSw0QkFBNEI7O0FBRXRELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVwQyxLQUFLLENBQUMsTUFBTSxDQUNWLG9CQUFDLGFBQWEsSUFBQyxFQUFFLEVBQUUsRUFBRSxBQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sQUFBQyxHQUFHLEVBQ3pDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQ3JDLENBQUM7OztBQ2RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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cUJBQVMsR0FBRyxRQUFRLENBQ2hCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3RCxrQkFBTTs7QUFBQSxBQUVWLGFBQUssYUFBYSxDQUFDLFVBQVU7QUFDekIscUJBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDMUUsa0JBQU07O0FBQUEsQUFFVixhQUFLLGFBQWEsQ0FBQyxnQkFBZ0I7QUFDL0Isc0JBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQzlCLGtCQUFNOztBQUFBLEFBRVYsYUFBSyxhQUFhLENBQUMsSUFBSTs7QUFFbkIsa0JBQU07O0FBQUEsQUFFVixhQUFLLGFBQWEsQ0FBQyxTQUFTO0FBQ3hCLG9CQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLGtCQUFNOztBQUFBLEFBRVYsYUFBSyxhQUFhLENBQUMsT0FBTztBQUN0QiwyQkFBZSxFQUFFLENBQUM7QUFDbEIsa0JBQU07O0FBQUEsQUFFVjtBQUNJLG1CQUFPLElBQUksQ0FBQztBQUFBLEtBQ25COztBQUVELFFBQUksU0FBUyxFQUFFO0FBQ1gsaUJBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDaEM7QUFDRCxXQUFPLElBQUksQ0FBQztDQUNmLENBQUMsQ0FBQzs7aUJBRVksU0FBUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnZXM2LXNoaW0nO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpbyBmcm9tICcuL2lvJztcbmltcG9ydCBHYW1lSW50ZXJmYWNlIGZyb20gJy4vY29tcG9uZW50cy9HYW1lSW50ZXJmYWNlJztcblxubGV0IHBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKCcvcGxheS8nLCAnJykuc3BsaXQoJy8nKTtcbnBhcmFtc1sxXSA9IHBhcnNlSW50KHBhcmFtc1sxXSwgMTApO1xucGFyYW1zWzJdID0gcGFyc2VJbnQocGFyYW1zWzJdLCAxMCk7XG5cblJlYWN0LnJlbmRlcihcbiAgPEdhbWVJbnRlcmZhY2UgaW89e2lvfSBwYXJhbXM9e3BhcmFtc30gLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKVxuKTsiLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE1IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG5cbmZ1bmN0aW9uIGNsYXNzTmFtZXMoKSB7XG5cdHZhciBjbGFzc2VzID0gJyc7XG5cdHZhciBhcmc7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0aWYgKCFhcmcpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGFyZyB8fCAnbnVtYmVyJyA9PT0gdHlwZW9mIGFyZykge1xuXHRcdFx0Y2xhc3NlcyArPSAnICcgKyBhcmc7XG5cdFx0fSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuXHRcdFx0Y2xhc3NlcyArPSAnICcgKyBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0fSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIGFyZykge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRpZiAoIWFyZy5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8ICFhcmdba2V5XSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNsYXNzZXMgKz0gJyAnICsga2V5O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gY2xhc3Nlcy5zdWJzdHIoMSk7XG59XG5cbi8vIHNhZmVseSBleHBvcnQgY2xhc3NOYW1lcyBmb3Igbm9kZSAvIGJyb3dzZXJpZnlcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG59XG5cbi8vIHNhZmVseSBleHBvcnQgY2xhc3NOYW1lcyBmb3IgUmVxdWlyZUpTXG5pZiAodHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdH0pO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnSW52YXJpYW50IFZpb2xhdGlvbjogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUga2V5TWlycm9yXG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCIuL2ludmFyaWFudFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGFuIGVudW1lcmF0aW9uIHdpdGgga2V5cyBlcXVhbCB0byB0aGVpciB2YWx1ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgIHZhciBDT0xPUlMgPSBrZXlNaXJyb3Ioe2JsdWU6IG51bGwsIHJlZDogbnVsbH0pO1xuICogICB2YXIgbXlDb2xvciA9IENPTE9SUy5ibHVlO1xuICogICB2YXIgaXNDb2xvclZhbGlkID0gISFDT0xPUlNbbXlDb2xvcl07XG4gKlxuICogVGhlIGxhc3QgbGluZSBjb3VsZCBub3QgYmUgcGVyZm9ybWVkIGlmIHRoZSB2YWx1ZXMgb2YgdGhlIGdlbmVyYXRlZCBlbnVtIHdlcmVcbiAqIG5vdCBlcXVhbCB0byB0aGVpciBrZXlzLlxuICpcbiAqICAgSW5wdXQ6ICB7a2V5MTogdmFsMSwga2V5MjogdmFsMn1cbiAqICAgT3V0cHV0OiB7a2V5MToga2V5MSwga2V5Mjoga2V5Mn1cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbnZhciBrZXlNaXJyb3IgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHJldCA9IHt9O1xuICB2YXIga2V5O1xuICAoXCJwcm9kdWN0aW9uXCIgIT09IFwiZGV2ZWxvcG1lbnRcIiA/IGludmFyaWFudChcbiAgICBvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSxcbiAgICAna2V5TWlycm9yKC4uLik6IEFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0LidcbiAgKSA6IGludmFyaWFudChvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSkpO1xuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0W2tleV0gPSBrZXk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWlycm9yO1xuIiwiaW1wb3J0IENoYXRDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0NoYXRDb25zdGFudHMnO1xuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcblxuY29uc3QgQ2hhdEFjdGlvbnMgPSB7XG4gIHRvZ2dsZVZpc2liaWxpdHkoKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IENoYXRDb25zdGFudHMuVE9HR0xFX1ZJU0lCSUxJVFlcbiAgICB9KTtcbiAgfSxcbiAgc3VibWl0TWVzc2FnZShtZXNzYWdlLCBjbGFzc05hbWUsIHJlY2VpdmVkKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IENoYXRDb25zdGFudHMuU1VCTUlUX01FU1NBR0UsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICByZWNlaXZlZDogcmVjZWl2ZWRcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdEFjdGlvbnM7IiwiaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0dhbWVDb25zdGFudHMnO1xuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcblxuY29uc3QgR2FtZUFjdGlvbnMgPSB7XG4gIG1ha2VNb3ZlKGZyb20sIHRvLCBjYXB0dXJlLCBlbWl0TW92ZSkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLk1BS0VfTU9WRSxcbiAgICAgIGZyb206IGZyb20sXG4gICAgICB0bzogdG8sXG4gICAgICBjYXB0dXJlOiBjYXB0dXJlLFxuICAgICAgZW1pdE1vdmU6IGVtaXRNb3ZlXG4gICAgfSk7XG4gIH0sXG4gIHNob3dNb3Zlcyh1bml0LCBmcm9tLCBpblJhbmdlKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuU0hPV19NT1ZFUyxcbiAgICAgIHVuaXQ6IHVuaXQsXG4gICAgICBmcm9tOiBmcm9tLFxuICAgICAgaW5SYW5nZTogaW5SYW5nZVxuICAgIH0pO1xuICB9LFxuICBkcmF3KCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLkRSQVdcbiAgICB9KTtcbiAgfSxcbiAgcmVtYXRjaCgpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5SRU1BVENIXG4gICAgfSk7XG4gIH0sXG4gIGdhbWVPdmVyKG9wdGlvbnMpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5HQU1FX09WRVIsXG4gICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgfSk7XG4gIH0sXG4gIGNoYW5nZVByb21vdGlvbihwcm9tb3Rpb24pIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5DSEFOR0VfUFJPTU9USU9OLFxuICAgICAgcHJvbW90aW9uOiBwcm9tb3Rpb25cbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZUFjdGlvbnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuXG5jb25zdCBDYXB0dXJlZFBpZWNlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG9uR2FtZUNoYW5nZV0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjYXB0dXJlZFBpZWNlczogR2FtZVN0b3JlLmdldENhcHR1cmVkUGllY2VzKClcbiAgICB9O1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY3AgPSB0aGlzLnN0YXRlLmNhcHR1cmVkUGllY2VzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjYXB0dXJlZC1waWVjZXNcIj5cbiAgICAgICAge2NwLm1hcCgocGllY2VzLCBjb2xvcikgPT4gKFxuICAgICAgICAgIDx1bCBrZXk9e2NvbG9yfT5cbiAgICAgICAgICAgIHtwaWVjZXMubWFwKChwaWVjZSwgaSkgPT4gPGxpIGtleT17aX0+e3BpZWNlfTwvbGk+KS50b0FycmF5KCl9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgKSkudG9BcnJheSgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgX29uR2FtZUNoYW5nZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNhcHR1cmVkUGllY2VzOiBHYW1lU3RvcmUuZ2V0Q2FwdHVyZWRQaWVjZXMoKVxuICAgIH0pO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FwdHVyZWRQaWVjZXM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBDaGF0U3RvcmUgZnJvbSAnLi4vc3RvcmVzL0NoYXRTdG9yZSc7XG5pbXBvcnQgQ2hhdEFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9DaGF0QWN0aW9ucyc7XG5cbmNvbnN0IENoYXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHRva2VuOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgc291bmRzRW5hYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIG9wZW5Nb2RhbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBDaGF0U3RvcmUuZ2V0U3RhdGUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGF0SGlkZGVuOiBzdGF0ZS5pc0NoYXRIaWRkZW4sXG4gICAgICBtZXNzYWdlczogc3RhdGUubWVzc2FnZXMsXG4gICAgICBtZXNzYWdlOiAnJyxcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLmlvLm9uKCdyZWNlaXZlLW1lc3NhZ2UnLCBkYXRhID0+IHtcbiAgICAgIENoYXRBY3Rpb25zLnN1Ym1pdE1lc3NhZ2UoZGF0YS5tZXNzYWdlLCBkYXRhLmNvbG9yICsgJyBsZWZ0JywgdHJ1ZSk7XG4gICAgICB0aGlzLl9tYXliZVBsYXlTb3VuZCgpO1xuICAgIH0pO1xuICAgIENoYXRTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25DaGF0U3RvcmVDaGFuZ2UpO1xuICAgIFxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDEzOTkpIENoYXRBY3Rpb25zLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgQ2hhdFN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25DaGF0U3RvcmVDaGFuZ2UpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjaGF0LXdyYXBwZXJcIlxuICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuc3RhdGUuaXNDaGF0SGlkZGVuID8gJ2hpZGRlbicgOiBudWxsfT5cbiAgICAgICAgXG4gICAgICAgIDxoND5DaGF0PC9oND5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiY2xvc2VcIlxuICAgICAgICAgICBvbkNsaWNrPXtDaGF0QWN0aW9ucy50b2dnbGVWaXNpYmlsaXR5fT5cbiAgICAgICAgICB4XG4gICAgICAgIDwvYT5cbiAgICAgICAgXG4gICAgICAgIDxhdWRpbyBwcmVsb2FkPVwiYXV0b1wiIHJlZj1cIm1zZ1NuZFwiPlxuICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiL3NuZC9tZXNzYWdlLm1wM1wiIC8+XG4gICAgICAgIDwvYXVkaW8+XG4gICAgICAgIFxuICAgICAgICA8dWwgaWQ9XCJjaGF0LWxpc3RcIiByZWY9XCJjaGF0XCI+XG4gICAgICAgICAge3RoaXMuc3RhdGUubWVzc2FnZXMubWFwKChtZXNzYWdlLCBpKSA9PiAoXG4gICAgICAgICAgICA8bGkga2V5PXtpfSBjbGFzc05hbWU9e21lc3NhZ2UuZ2V0KCdjbGFzc05hbWUnKX0+XG4gICAgICAgICAgICAgIHttZXNzYWdlLmdldCgnbWVzc2FnZScpfVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICApKS50b0FycmF5KCl9XG4gICAgICAgIDwvdWw+XG4gICAgICAgIFxuICAgICAgICA8c3Bhbj5Xcml0ZSB5b3VyIG1lc3NhZ2U6PC9zcGFuPlxuICAgICAgICBcbiAgICAgICAgPGZvcm0gaWQ9XCJjaGF0LWZvcm1cIlxuICAgICAgICAgICAgICBvblN1Ym1pdD17dGhpcy5fc3VibWl0TWVzc2FnZX0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgcmVmPVwibWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jb2xvcn1cbiAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uQ2hhbmdlTWVzc2FnZX0gLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgX29uQ2hhdFN0b3JlQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoQ2hhdFN0b3JlLmdldFN0YXRlKCksIHRoaXMuX3Njcm9sbENoYXQpO1xuICB9LFxuICBfb25DaGFuZ2VNZXNzYWdlKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlOiBlLnRhcmdldC52YWx1ZX0pO1xuICB9LFxuICBfc3VibWl0TWVzc2FnZShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHtpbywgdG9rZW4sIGNvbG9yLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMuc3RhdGUubWVzc2FnZTtcblxuICAgIGlmICghaXNPcHBvbmVudEF2YWlsYWJsZSkge1xuICAgICAgdGhpcy5yZWZzLm1lc3NhZ2UuZ2V0RE9NTm9kZSgpLmJsdXIoKTtcbiAgICAgIHRoaXMucHJvcHMub3Blbk1vZGFsKCdpbmZvJywgJ1NvcnJ5LCB5b3VyIG9wcG9uZW50IGlzIG5vdCBjb25uZWN0ZWQuICcgK1xuICAgICAgICAnWW91IGNhbuKAmHQgc2VuZCBtZXNzYWdlcy4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBDaGF0QWN0aW9ucy5zdWJtaXRNZXNzYWdlKG1lc3NhZ2UsIGNvbG9yICsgJyByaWdodCcsIGZhbHNlKTtcbiAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlOiAnJ30pO1xuXG4gICAgaW8uZW1pdCgnc2VuZC1tZXNzYWdlJywge1xuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgIHRva2VuOiB0b2tlblxuICAgIH0pO1xuICB9LFxuICBfc2Nyb2xsQ2hhdCgpIHtcbiAgICBjb25zdCBjaGF0Tm9kZSA9IHRoaXMucmVmcy5jaGF0LmdldERPTU5vZGUoKTtcbiAgICBjaGF0Tm9kZS5zY3JvbGxUb3AgPSBjaGF0Tm9kZS5zY3JvbGxIZWlnaHQ7XG4gIH0sXG4gIF9tYXliZVBsYXlTb3VuZCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zb3VuZHNFbmFibGVkKSB7XG4gICAgICB0aGlzLnJlZnMubXNnU25kLmdldERPTU5vZGUoKS5wbGF5KCk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdDsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcbmltcG9ydCBDaGVzc1BpZWNlcyBmcm9tICcuLi9jb25zdGFudHMvQ2hlc3NQaWVjZXMnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcbmltcG9ydCBtYXliZVJldmVyc2UgZnJvbSAnLi4vbWl4aW5zL21heWJlUmV2ZXJzZSc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQge1NlcSwgUmVwZWF0LCBMaXN0LCBTZXR9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmNvbnN0IEZJTEVTID0gU2VxLkluZGV4ZWQoJ2FiY2RlZmdoJyk7XG5jb25zdCBSQU5LUyA9IFNlcS5JbmRleGVkKCcxMjM0NTY3OCcpO1xuXG5jb25zdCBDaGVzc2JvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB0b2tlbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG1heWJlUGxheVNvdW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIGdhbWVPdmVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgbWF5YmVSZXZlcnNlXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBHYW1lU3RvcmUuZ2V0Q2hlc3Nib2FyZFN0YXRlKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZmVuOiBzdGF0ZS5mZW4sXG4gICAgICBtb3ZlRnJvbTogbnVsbCxcbiAgICAgIGxhc3RNb3ZlOiBzdGF0ZS5sYXN0TW92ZSxcbiAgICAgIGtpbmdJbkNoZWNrOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHtpbywgdG9rZW59ID0gdGhpcy5wcm9wcztcbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gICAgR2FtZVN0b3JlLm9uKCduZXctbW92ZScsIHRoaXMuX29uTmV3TW92ZSk7XG5cbiAgICBpby5vbignbW92ZScsIGRhdGEgPT4ge1xuICAgICAgR2FtZUFjdGlvbnMubWFrZU1vdmUoZGF0YS5mcm9tLCBkYXRhLnRvLCBkYXRhLmNhcHR1cmUsIGZhbHNlKTtcbiAgICAgIHRoaXMucHJvcHMubWF5YmVQbGF5U291bmQoKTtcblxuICAgICAgaWYgKCFkYXRhLmdhbWVPdmVyKSB7XG4gICAgICAgIHRoaXMuX3J1bkNsb2NrKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RpdGxlJylbMF07XG4gICAgICAgIHRpdGxlLnRleHQgPSAnKiAnICsgdGl0bGUudGV4dDtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpby5vbigncmVtYXRjaC1hY2NlcHRlZCcsICgpID0+IHRoaXMuc2V0U3RhdGUoe21vdmVGcm9tOiBudWxsfSkpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBHYW1lU3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xuICAgIEdhbWVTdG9yZS5vbignbmV3LW1vdmUnLCB0aGlzLl9vbk5ld01vdmUpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2NvbG9yLCBpc09wcG9uZW50QXZhaWxhYmxlLCBnYW1lT3Zlcn0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtmZW4sIG1vdmVGcm9tLCBsYXN0TW92ZSwga2luZ0luQ2hlY2t9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBmZW5BcnJheSA9IGZlbi5zcGxpdCgnICcpO1xuICAgIGNvbnN0IHBsYWNlbWVudCA9IGZlbkFycmF5WzBdO1xuICAgIGNvbnN0IGlzSXRNeVR1cm4gPSBmZW5BcnJheVsxXSA9PT0gY29sb3IuY2hhckF0KDApO1xuICAgIGNvbnN0IHJvd3MgPSB0aGlzLl9tYXliZVJldmVyc2UocGxhY2VtZW50LnNwbGl0KCcvJykpO1xuICAgIGNvbnN0IHJhbmtzID0gdGhpcy5fbWF5YmVSZXZlcnNlKFJBTktTLCAnd2hpdGUnKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPVwiY2hlc3Nib2FyZFwiPlxuICAgICAgICB7cm93cy5tYXAoKHBsYWNlbWVudCwgaSkgPT5cbiAgICAgICAgICA8Um93XG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICByYW5rPXtyYW5rcy5nZXQoaSl9XG4gICAgICAgICAgICBwbGFjZW1lbnQ9e3BsYWNlbWVudH1cbiAgICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICAgIGlzTW92ZWFibGU9e2lzSXRNeVR1cm4gJiYgaXNPcHBvbmVudEF2YWlsYWJsZSAmJiAhZ2FtZU92ZXJ9XG4gICAgICAgICAgICBtb3ZlRnJvbT17bW92ZUZyb219XG4gICAgICAgICAgICBsYXN0TW92ZT17bGFzdE1vdmV9XG4gICAgICAgICAgICBzZXRNb3ZlRnJvbT17dGhpcy5fc2V0TW92ZUZyb219XG4gICAgICAgICAgICBraW5nSW5DaGVjaz17a2luZ0luQ2hlY2t9XG4gICAgICAgICAgICB2YWxpZE1vdmVzPXtHYW1lU3RvcmUuZ2V0VmFsaWRNb3Zlcyhtb3ZlRnJvbSl9IC8+KX1cbiAgICAgIDwvdGFibGU+XG4gICAgKTtcbiAgfSxcbiAgX29uR2FtZUNoYW5nZShjYikge1xuICAgIGNvbnN0IHN0YXRlID0gR2FtZVN0b3JlLmdldENoZXNzYm9hcmRTdGF0ZSgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZmVuOiBzdGF0ZS5mZW4sXG4gICAgICBsYXN0TW92ZTogc3RhdGUubGFzdE1vdmUsXG4gICAgICBraW5nSW5DaGVjazogc3RhdGUuY2hlY2sgJiYgKHN0YXRlLmZlbi5zcGxpdCgnICcpWzFdID09PSAndycgPyAnSycgOiAnaycpXG4gICAgfSwgY2IpO1xuICB9LFxuICBfc2V0TW92ZUZyb20oc3F1YXJlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb3ZlRnJvbTogc3F1YXJlXG4gICAgfSk7XG4gIH0sXG4gIF9vbk5ld01vdmUobW92ZSkge1xuICAgIGNvbnN0IHtpbywgdG9rZW59ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLmVtaXQoJ25ldy1tb3ZlJywge1xuICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgbW92ZTogbW92ZVxuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCh0aGlzLnByb3BzLm1heWJlUGxheVNvdW5kLCAwKTtcbiAgfSxcbiAgX3J1bkNsb2NrKCkge1xuICAgIGNvbnN0IHtpbywgdG9rZW4sIGNvbG9yfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpby5lbWl0KCdjbG9jay1ydW4nLCB7XG4gICAgICB0b2tlbjogdG9rZW4sXG4gICAgICBjb2xvcjogY29sb3JcbiAgICB9KTtcbiAgfSxcbiAgX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKCkge1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0aXRsZScpWzBdO1xuICAgIHRpdGxlLnRleHQgPSB0aXRsZS50ZXh0LnJlcGxhY2UoJyogJywgJycpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKTtcbiAgfVxufSk7XG5cbmNvbnN0IFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBwcm9wVHlwZXM6IHtcbiAgICByYW5rOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWycxJywnMicsJzMnLCc0JywnNScsJzYnLCc3JywnOCddKS5pc1JlcXVpcmVkLFxuICAgIHBsYWNlbWVudDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIGlzTW92ZWFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgbW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFzdE1vdmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc2V0TW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAga2luZ0luQ2hlY2s6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbZmFsc2UsICdLJywgJ2snXSkuaXNSZXF1aXJlZCxcbiAgICB2YWxpZE1vdmVzOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihTZXQpLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbbWF5YmVSZXZlcnNlXSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3JhbmssIHBsYWNlbWVudCwgY29sb3J9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmaWxlcyA9IHRoaXMuX21heWJlUmV2ZXJzZShGSUxFUyk7XG4gICAgY29uc3QgcGllY2VzID0gdGhpcy5fbWF5YmVSZXZlcnNlKHBsYWNlbWVudC5sZW5ndGggPCA4ID9cbiAgICAgIFNlcShwbGFjZW1lbnQpLmZsYXRNYXAocGllY2UgPT4gKFxuICAgICAgICAvXlxcZCQvLnRlc3QocGllY2UpID8gUmVwZWF0KCctJywgcGFyc2VJbnQocGllY2UsIDEwKSkgOiBwaWVjZVxuICAgICAgKSkudG9BcnJheSgpIDpcblxuICAgICAgcGxhY2VtZW50LnNwbGl0KCcnKVxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHRyPlxuICAgICAgICB7cGllY2VzLm1hcCgocGllY2UsIGkpID0+XG4gICAgICAgICAgPENvbHVtblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgc3F1YXJlPXtmaWxlcy5nZXQoaSkgKyByYW5rfVxuICAgICAgICAgICAgcGllY2U9e3BpZWNlfVxuICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgJ3JhbmsnLCAncGxhY2VtZW50Jyl9IC8+KX1cbiAgICAgIDwvdHI+XG4gICAgKTtcbiAgfVxufSk7XG5cbmNvbnN0IENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBwcm9wVHlwZXM6IHtcbiAgICBzcXVhcmU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBwaWVjZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIGlzTW92ZWFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgbW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFzdE1vdmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc2V0TW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAga2luZ0luQ2hlY2s6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbZmFsc2UsICdLJywgJ2snXSkuaXNSZXF1aXJlZCxcbiAgICB2YWxpZE1vdmVzOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihTZXQpLmlzUmVxdWlyZWRcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge21vdmVGcm9tLCBsYXN0TW92ZSwgc3F1YXJlLCBjb2xvcixcbiAgICAgICAgICAgaXNNb3ZlYWJsZSwga2luZ0luQ2hlY2ssIHZhbGlkTW92ZXN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBwaWVjZSA9IENoZXNzUGllY2VzW3RoaXMucHJvcHMucGllY2VdO1xuICAgIGNvbnN0IHJneCA9IGNvbG9yID09PSAnd2hpdGUnID8gL15bS1FSQk5QXSQvIDogL15ba3FyYm5wXSQvO1xuICAgIGNvbnN0IGlzRHJhZ2dhYmxlID0gcmd4LnRlc3QodGhpcy5wcm9wcy5waWVjZSk7XG4gICAgY29uc3QgaXNEcm9wcGFibGUgPSBtb3ZlRnJvbSAmJiB2YWxpZE1vdmVzLmhhcyhzcXVhcmUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx0ZCBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBtb3ZlRnJvbSA9PT0gc3F1YXJlICYmICF2YWxpZE1vdmVzLmlzRW1wdHkoKSxcbiAgICAgICAgICAgIGZyb206IGxhc3RNb3ZlLmdldCgnZnJvbScpID09PSBzcXVhcmUsXG4gICAgICAgICAgICB0bzogbGFzdE1vdmUuZ2V0KCd0bycpID09PSBzcXVhcmUsXG4gICAgICAgICAgICBkcm9wcGFibGU6IGlzRHJvcHBhYmxlXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgb25DbGljaz17IXBpZWNlID8gdGhpcy5fb25DbGlja1NxdWFyZSA6IG51bGx9XG4gICAgICAgICAgb25EcmFnT3Zlcj17aXNEcm9wcGFibGUgPyB0aGlzLl9vbkRyYWdPdmVyIDogbnVsbH1cbiAgICAgICAgICBvbkRyb3A9e2lzRHJvcHBhYmxlID8gdGhpcy5fb25Ecm9wIDogbnVsbH0+XG5cbiAgICAgICAge3BpZWNlID9cbiAgICAgICAgICA8YSBjbGFzc05hbWU9e2tpbmdJbkNoZWNrID09PSB0aGlzLnByb3BzLnBpZWNlID8gJ2luLWNoZWNrJyA6IG51bGx9XG4gICAgICAgICAgICAgb25DbGljaz17dGhpcy5fb25DbGlja1NxdWFyZX1cbiAgICAgICAgICAgICBvbkRyYWdTdGFydD17dGhpcy5fb25EcmFnU3RhcnR9XG4gICAgICAgICAgICAgZHJhZ2dhYmxlPXtpc0RyYWdnYWJsZSAmJiBpc01vdmVhYmxlfT5cbiAgICAgICAgICAgIHtwaWVjZX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDpudWxsfVxuICAgICAgPC90ZD5cbiAgICApO1xuICB9LFxuICBfb25DbGlja1NxdWFyZSgpIHtcbiAgICBjb25zdCB7aXNNb3ZlYWJsZSwgY29sb3IsIG1vdmVGcm9tLCBzcXVhcmUsIHBpZWNlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgcmd4ID0gY29sb3IgPT09ICd3aGl0ZScgPyAvXltLUVJCTlBdJC8gOiAvXltrcXJibnBdJC87XG5cbiAgICBpZiAoIWlzTW92ZWFibGUgfHwgKCFtb3ZlRnJvbSAmJiAhcmd4LnRlc3QocGllY2UpKSlcbiAgICAgIHJldHVybjtcbiAgICBlbHNlIGlmIChtb3ZlRnJvbSAmJiBtb3ZlRnJvbSA9PT0gc3F1YXJlKVxuICAgICAgdGhpcy5wcm9wcy5zZXRNb3ZlRnJvbShudWxsKTtcbiAgICBlbHNlIGlmIChyZ3gudGVzdChwaWVjZSkpXG4gICAgICB0aGlzLnByb3BzLnNldE1vdmVGcm9tKHNxdWFyZSk7XG4gICAgZWxzZVxuICAgICAgR2FtZUFjdGlvbnMubWFrZU1vdmUobW92ZUZyb20sIHNxdWFyZSwgQ2hlc3NQaWVjZXNbcGllY2VdLCB0cnVlKTtcbiAgfSxcbiAgX29uRHJhZ1N0YXJ0KGUpIHtcbiAgICBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIC8vIHNldERhdGEgaXMgcmVxdWlyZWQgYnkgZmlyZWZveFxuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCAnJyk7XG5cbiAgICB0aGlzLnByb3BzLnNldE1vdmVGcm9tKHRoaXMucHJvcHMuc3F1YXJlKTtcbiAgfSxcbiAgX29uRHJhZ092ZXIoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICB9LFxuICBfb25Ecm9wKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qge21vdmVGcm9tLCBzcXVhcmUsIHBpZWNlfSA9IHRoaXMucHJvcHM7XG4gICAgR2FtZUFjdGlvbnMubWFrZU1vdmUobW92ZUZyb20sIHNxdWFyZSwgQ2hlc3NQaWVjZXNbcGllY2VdLCB0cnVlKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENoZXNzYm9hcmQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuaW1wb3J0IENoZXNzYm9hcmQgZnJvbSAnLi9DaGVzc2JvYXJkJztcbmltcG9ydCBDYXB0dXJlZFBpZWNlcyBmcm9tICcuL0NhcHR1cmVkUGllY2VzJztcbmltcG9ydCBUYWJsZU9mTW92ZXMgZnJvbSAnLi9UYWJsZU9mTW92ZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5jb25zdCBDaGVzc2JvYXJkSW50ZXJmYWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB0b2tlbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHNvdW5kc0VuYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgZ2FtZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG9uR2FtZUNoYW5nZV0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiBHYW1lU3RvcmUuZ2V0U3RhdGUoKTtcbiAgfSxcbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLmdhbWVPdmVyLmdldCgnc3RhdHVzJykgJiZcbiAgICAgICAgIXByZXZQcm9wcy5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpKSB7XG4gICAgICB0aGlzLnByb3BzLm9wZW5Nb2RhbCgnaW5mbycsIHRoaXMuX2dldEdhbWVPdmVyTWVzc2FnZSgpKTtcbiAgICB9XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7cHJvbW90aW9uLCB0dXJuLCBnYW1lT3ZlciwgY2hlY2t9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiYm9hcmQtbW92ZXMtd3JhcHBlclwiIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XG4gICAgICAgIFxuICAgICAgICA8YXVkaW8gcHJlbG9hZD1cImF1dG9cIiByZWY9XCJtb3ZlU25kXCI+XG4gICAgICAgICAgPHNvdXJjZSBzcmM9XCIvc25kL21vdmUubXAzXCIgLz5cbiAgICAgICAgPC9hdWRpbz5cbiAgICAgICAgPGF1ZGlvIHByZWxvYWQ9XCJhdXRvXCIgcmVmPVwiY2hlY2tTbmRcIj5cbiAgICAgICAgICA8c291cmNlIHNyYz1cIi9zbmQvY2hlY2subXAzXCIgLz5cbiAgICAgICAgPC9hdWRpbz5cblxuICAgICAgICA8ZGl2IGlkPVwiYm9hcmQtd3JhcHBlclwiPlxuICAgICAgICAgIDxDYXB0dXJlZFBpZWNlcyAvPlxuICAgICAgICAgIDxDaGVzc2JvYXJkXG4gICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCAnc291bmRzRW5hYmxlZCcsICdnYW1lT3ZlcicpfVxuICAgICAgICAgICAgZ2FtZU92ZXI9e2dhbWVPdmVyLmdldCgnc3RhdHVzJyl9XG4gICAgICAgICAgICBtYXliZVBsYXlTb3VuZD17dGhpcy5fbWF5YmVQbGF5U291bmR9IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxUYWJsZU9mTW92ZXMgLz5cblxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwcm9tb3Rpb25cIj5cbiAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8c3Bhbj5Qcm9tb3Rpb246IDwvc3Bhbj5cbiAgICAgICAgICAgIDxzZWxlY3QgdmFsdWU9e3Byb21vdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uUHJvbW90aW9uQ2hhbmdlfT5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInFcIj5RdWVlbjwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiclwiPlJvb2s8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJcIj5CaXNob3A8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm5cIj5LbmlnaHQ8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmZWVkYmFja1wiPlxuICAgICAgICAgIHshZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSA/IFxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb25cIj5cbiAgICAgICAgICAgICAgICB7LyogRiAtPiB3aGl0ZSBraW5nLCBmIC0+IGJsYWNrIGtpbmcqL1xuICAgICAgICAgICAgICAgICAgdHVybiA9PT0gJ3cnID8gJ0YnIDogJ2YnfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIHtgJHt0dXJuID09PSAndycgPyAnV2hpdGUnIDogJ0JsYWNrJ30gdG8gbW92ZS5gfVxuICAgICAgICAgICAgICB7Y2hlY2sgPyA8c3Ryb25nPiBDaGVjay48L3N0cm9uZz4gOiBudWxsfVxuICAgICAgICAgICAgPC9zcGFuPiA6XG5cbiAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb25cIj5cbiAgICAgICAgICAgICAgICB7Z2FtZU92ZXIuZ2V0KCd3aW5uZXInKSA9PT0gJ1doaXRlJyA/ICdGJyA6ICdmJ31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB7dGhpcy5fZ2V0R2FtZU92ZXJNZXNzYWdlKCl9XG4gICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShHYW1lU3RvcmUuZ2V0U3RhdGUoKSk7XG4gIH0sXG4gIF9vblByb21vdGlvbkNoYW5nZShlKSB7XG4gICAgR2FtZUFjdGlvbnMuY2hhbmdlUHJvbW90aW9uKGUudGFyZ2V0LnZhbHVlKTtcbiAgfSxcbiAgX21heWJlUGxheVNvdW5kKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnNvdW5kc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMucmVmc1t0aGlzLnN0YXRlLmNoZWNrID8gJ2NoZWNrU25kJyA6ICdtb3ZlU25kJ10uZ2V0RE9NTm9kZSgpLnBsYXkoKTtcbiAgICB9XG4gIH0sXG4gIF9nZXRHYW1lT3Zlck1lc3NhZ2UoKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMucHJvcHMuZ2FtZU92ZXIuZ2V0KCd0eXBlJyk7XG4gICAgY29uc3Qgd2lubmVyID0gdGhpcy5wcm9wcy5nYW1lT3Zlci5nZXQoJ3dpbm5lcicpO1xuICAgIGNvbnN0IGxvc2VyID0gd2lubmVyID09PSAnV2hpdGUnID8gJ0JsYWNrJyA6ICdXaGl0ZSc7XG5cbiAgICByZXR1cm4gdHlwZSA9PT0gJ2NoZWNrbWF0ZScgPyBgQ2hlY2ttYXRlLiAke3dpbm5lcn0gd2lucyFgIDpcbiAgICAgIHR5cGUgPT09ICd0aW1lb3V0JyA/IGAke2xvc2VyfeKAmHMgdGltZSBpcyBvdXQuICR7d2lubmVyfSB3aW5zIWAgOlxuICAgICAgdHlwZSA9PT0gJ3Jlc2lnbicgPyBgJHtsb3Nlcn0gaGFzIHJlc2lnbmVkLiAke3dpbm5lcn0gd2lucyFgIDpcbiAgICAgIHR5cGUgPT09ICdkcmF3JyA/ICdEcmF3LicgOlxuICAgICAgdHlwZSA9PT0gJ3N0YWxlbWF0ZScgPyAnRHJhdyAoU3RhbGVtYXRlKS4nIDpcbiAgICAgIHR5cGUgPT09ICd0aHJlZWZvbGRSZXBldGl0aW9uJyA/ICdEcmF3IChUaHJlZWZvbGQgUmVwZXRpdGlvbikuJyA6XG4gICAgICB0eXBlID09PSAnaW5zdWZmaWNpZW50TWF0ZXJpYWwnID8gJ0RyYXcgKEluc3VmZmljaWVudCBNYXRlcmlhbCknIDogJyc7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDaGVzc2JvYXJkSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG5cbmNvbnN0IFB1cmVSZW5kZXJNaXhpbiA9IFJlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW47XG5cbmNvbnN0IENsb2NrID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBwYXJhbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IFtfLCB0aW1lLCBpbmNdID0gdGhpcy5wcm9wcy5wYXJhbXM7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIHdoaXRlOiB0aW1lICogNjAsXG4gICAgICBibGFjazogdGltZSAqIDYwLFxuICAgICAgaW5jOiBpbmMsXG4gICAgICBjb3VudGRvd246IG51bGxcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBpbyA9IHRoaXMucHJvcHMuaW87XG5cbiAgICBpby5vbignY291bnRkb3duJywgZGF0YSA9PiB0aGlzLnNldFN0YXRlKHtcbiAgICAgIFtkYXRhLmNvbG9yXTogZGF0YS50aW1lLFxuICAgICAgY291bnRkb3duOiBkYXRhLmNvbG9yXG4gICAgfSkpO1xuXG4gICAgaW8ub24oJ2NvdW50ZG93bi1nYW1lb3ZlcicsIGRhdGEgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y291bnRkb3duOiBudWxsfSk7XG4gICAgICBHYW1lQWN0aW9ucy5nYW1lT3Zlcih7XG4gICAgICAgIHR5cGU6ICd0aW1lb3V0JyxcbiAgICAgICAgd2lubmVyOiBkYXRhLmNvbG9yID09PSAnYmxhY2snID8gJ1doaXRlJyA6ICdCbGFjaydcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtYWNjZXB0ZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgd2hpdGU6IHRoaXMucHJvcHMucGFyYW1zWzFdICogNjAsXG4gICAgICAgIGJsYWNrOiB0aGlzLnByb3BzLnBhcmFtc1sxXSAqIDYwXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgaWQ9XCJjbG9ja1wiPlxuICAgICAgICA8VGltZXJcbiAgICAgICAgICBjb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICB0aW1lPXt0aGlzLnN0YXRlLndoaXRlfVxuICAgICAgICAgIGNvdW50ZG93bj17dGhpcy5zdGF0ZS5jb3VudGRvd259IC8+XG4gICAgICAgIDxUaW1lclxuICAgICAgICAgIGNvbG9yPVwiYmxhY2tcIlxuICAgICAgICAgIHRpbWU9e3RoaXMuc3RhdGUuYmxhY2t9XG4gICAgICAgICAgY291bnRkb3duPXt0aGlzLnN0YXRlLmNvdW50ZG93bn0gLz5cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufSk7XG5cbmNvbnN0IFRpbWVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHt0aW1lLCBjb2xvciwgY291bnRkb3dufSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWluID0gTWF0aC5mbG9vcih0aW1lIC8gNjApO1xuICAgIGNvbnN0IHNlYyA9IHRpbWUgJSA2MDtcbiAgICBjb25zdCB0aW1lTGVmdCA9IGAke21pbn06JHtzZWMgPCAxMCA/ICcwJyArIHNlYyA6IHNlY31gO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9e2NvbG9yICsgKGNvbG9yID09PSBjb3VudGRvd24gPyAnIHRpY2tpbmcnIDogJycpfT5cbiAgICAgICAge3RpbWVMZWZ0fVxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2xvY2s7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG4vL2ltcG9ydCBDaGVzc1BpZWNlcyBmcm9tICcuLi9jb25zdGFudHMvQ2hlc3NQaWVjZXMnO1xuLy9pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuLy9pbXBvcnQgbWF5YmVSZXZlcnNlIGZyb20gJy4uL21peGlucy9tYXliZVJldmVyc2UnO1xuaW1wb3J0IGJlaGF2aW9yIGZyb20gJy4uL2dhbWUvYmVoYXZpb3InO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBHYW1lQm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXG5cdH0sXG5cdG1peGluczogW10sXG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcblx0XHQvL3JldHVybiBudWxsO1xuXHRcdHRoaXMuc3RhdGUgPSBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKTtcblx0XHRjb25zb2xlLmxvZyhcInN0YXRlPyBcIiwgdGhpcy5zdGF0ZSk7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGU7XG5cdFx0Ly8ge1xuXHRcdC8vIFx0c2V0dXA6IHN0YXRlLnNldHVwO1xuXHRcdC8vIH1cblx0fSxcblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0R2FtZVN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuX29uQ2hhbmdlKTtcblx0fSxcblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0R2FtZVN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuX29uQ2hhbmdlKTtcblx0fSxcblx0X29uQ2hhbmdlKCkge1xuXHRcdGNvbnNvbGUubG9nKCdoYWkga2FyZW4tY2hhbicpO1xuXHRcdC8vY29uc29sZS5sb2coR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCkubGlnaHR1cCk7XG5cdFx0Y29uc29sZS5sb2coR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCkpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMpO1xuXHRcdC8vIGZ1bmN0aW9uIGZvbyhzdGF0ZSwgc2VsZil7XG5cdFx0Ly8gXHQvL3ZhciBzZWxmID0gdGhpcztcblx0XHQvLyBcdGJheihzZWxmKTtcblx0XHQvLyBcdGlmKHN0YXRlLmxpZ2h0dXAubGVuZ3RoID09PSAwKXtcblx0XHQvLyBcdFx0c2VsZi5zZXRTdGF0ZSh7XG5cdFx0Ly8gXHRcdFx0bGlnaHR1cDogR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCkubGlnaHR1cFxuXHRcdC8vIFx0XHR9LGJheihzZWxmKSk7XG5cdFx0XHRcdFxuXHRcdC8vIFx0fVxuXHRcdC8vIH1cblx0XHRcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGxpZ2h0dXA6IEdhbWVTdG9yZS5nZXRHYW1lYm9hcmRTdGF0ZSgpLmxpZ2h0dXBcblx0XHR9KTtcblx0fSxcblx0X29uQ2VsbENsaWNrKCkge1xuXHRcdGNvbnNvbGUubG9nKCdjZWxsIGNsaWNrZWQnKTtcblx0fSxcblx0cmVuZGVyKCkge1xuXHRcdHZhciB7c3RhdGUsIHByb3BzfSA9IHRoaXMsIHtzZXR1cH0gPSBzdGF0ZSwge3NpemV9ID0gcHJvcHM7XG5cdFx0dmFyIHtzZXR1cCwgbGlnaHR1cH0gPSBzdGF0ZTtcblx0XHRjb25zb2xlLmxvZygnSE9XIEFCT1VUIERJUyBTVEFURScpO1xuXG5cdFx0Y29uc29sZS5sb2cobGlnaHR1cCk7XG5cblx0XHR2YXIgY2VsbEFycmF5ID0gW107XG5cdFx0Zm9yICh2YXIgaT0wOyBpPHNpemU7IGkrKykge1xuXHRcdFx0dmFyIHJvdyA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaj0wOyBqPHNpemU7IGorKykge1xuXHRcdFx0XHRyb3cucHVzaCh7eDpqLCB5Oml9KVxuXHRcdFx0fVxuXHRcdFx0Y2VsbEFycmF5LnB1c2gocm93KTtcblx0XHR9XG5cdFx0cmV0dXJuIChcblxuXHRcdFx0PHRhYmxlIGNsYXNzTmFtZT1cImJvYXJkXCI+XG5cdFx0XHR7Y2VsbEFycmF5Lm1hcCgocm93LCBpZHgxKSA9PiBcblx0XHRcdFx0PHRyPlxuXHRcdFx0XHRcdHtyb3cubWFwKChjZWxsLCBpZHgyKSA9PlxuXHRcdFx0XHRcdFx0PHRkIHBvc2l0aW9uPXtgWyR7aWR4Mn0sICR7aWR4MX1dYH0+XG5cdFx0XHRcdFx0XHRcdDxDZWxsIHJlZj17YFske2lkeDJ9LCAke2lkeDF9XWB9XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHQgcG9zaXRpb249e2BbJHtpZHgyfSwgJHtpZHgxfV1gfSBcblx0XHRcdFx0XHRcdFx0XHR1bml0PXtzZXR1cFtgWyR7aWR4Mn0sICR7aWR4MX1dYF0gPyBzZXR1cFtgWyR7aWR4Mn0sICR7aWR4MX1dYF0udW5pdCA6IG51bGx9IFxuXHRcdFx0XHRcdFx0XHRcdGNvbG9yPXtzZXR1cFtgWyR7aWR4Mn0sICR7aWR4MX1dYF0gPyBzZXR1cFtgWyR7aWR4Mn0sICR7aWR4MX1dYF0uY29sb3IgOiBudWxsfVxuXHRcdFx0XHRcdFx0XHRcdGxpdHVwPXtsaWdodHVwW2BbJHtpZHgyfSwgJHtpZHgxfV1gXX1cblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLl9vbkNlbGxDbGlja30vPlxuXHRcdFx0XHRcdFx0PC90ZD5cblx0XHRcdFx0XHQpfVxuXHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHQpfVxuXHRcdDwvdGFibGU+XG5cdFx0KTtcblx0fVxuXG59KTtcblxuXG5jb25zdCBDZWxsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6IHtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICBcdCByZXR1cm4ge1xuICAgIFx0IFx0c2lkZTogJ2Zyb250JyxcbiAgICBcdCBcdGhpZ2hsaWdodGVkOiBmYWxzZVxuICAgIFx0IH07XG4gIFx0fSxcbiAgXHRjb21wb25lbnREaWRNb3VudCgpIHtcblxuXHRcdCAvL2NvbnNvbGUubG9nKFwicG9zaXRpb24gaXMgXCIsIHRoaXMucHJvcHMucG9zaXRpb24pO1xuXHRcdFxuXHR9LFxuXG5cdGNvbXBvbmVudFdpbGxNb3VudCgpIHtcblx0XHRcblx0XHRcblx0XHRcblx0fSxcblx0bWl4aW5zOiBbXSxcblxuXHRfb25DbGlja1NxdWFyZSgpIHtcblxuXHRcdGNvbnN0IHt1bml0LCBwb3NpdGlvbiwgY29sb3J9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCB7c2lkZX0gPSB0aGlzLnN0YXRlO1xuXHRcdGlmICh1bml0KSB7XG5cdFx0XHR2YXIgcmFuZ2VzID0gW107XG5cdFx0XHR2YXIgbW92ZXMgPSBiZWhhdmlvclt1bml0XVtzaWRlXTtcblx0XHRcdHZhciBwb3MgPSBKU09OLnBhcnNlKHBvc2l0aW9uKTtcblx0XHRcdE9iamVjdC5rZXlzKG1vdmVzKS5tYXAoZnVuY3Rpb24obW92ZSl7XG5cdFx0XHRcdG1vdmUgPSBKU09OLnBhcnNlKG1vdmUpO1xuXHRcdFx0XHR2YXIgeCA9ICBwb3NbMF0gKyBtb3ZlWzBdLCBcblx0XHRcdFx0XHR5ID0gIHBvc1sxXSArIG1vdmVbMV07XG5cdFx0XHRcdHJhbmdlcy5wdXNoKHt4OiB4LCB5OiB5fSk7XG5cdFx0XHR9KTtcblx0XHRcdGNvbnNvbGUubG9nKCdyYW5nZTonLCByYW5nZXMpO1xuXHRcdFx0Y29uc29sZS5sb2coYGhpICR7dW5pdH0hYCk7XG5cdFx0XHRjb25zb2xlLmxvZyhiZWhhdmlvclt1bml0XSk7XG5cdFx0XHRHYW1lQWN0aW9ucy5zaG93TW92ZXMoeyB1bml0OiB1bml0LCBjb2xvcjogY29sb3IgfSwgcG9zLCByYW5nZXMpO1xuXG5cdFx0XHQvL3RoaXMuX2ZsaXAoKTtcblx0XHR9XG5cdH0sXG5cblx0X2ZsaXAoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHNpZGU6ICh0aGlzLnN0YXRlLnNpZGUgPT09ICdmcm9udCcpID8gJ2JhY2snIDogJ2Zyb250JyB9KTtcblx0fSxcblxuXHRyZW5kZXIoKXtcblx0XHR2YXIge3VuaXQsIGNvbG9yLCBsaXR1cH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0dmFyIHtzaWRlfSA9IHRoaXMuc3RhdGU7XG5cblxuXHRcdHZhciBjeE9iaiA9IHtcdFxuXHRcdFx0dW5pdDogISF1bml0LFxuXHRcdFx0bGl0dXA6IGxpdHVwXG5cdFx0fTtcblx0XHRjeE9ialtzaWRlXSA9IHRydWU7XG5cdFx0aWYgKHVuaXQpIHtcblx0XHRcdGN4T2JqW3VuaXRdID0gdHJ1ZTtcblx0XHRcdGN4T2JqW2NvbG9yXSA9IHRydWU7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3goY3hPYmopfVxuXHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuX29uQ2xpY2tTcXVhcmV9PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtCb2FyZDogR2FtZUJvYXJkLCBDZWxsOiBDZWxsfTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IENsb2NrIGZyb20gJy4vQ2xvY2snO1xuaW1wb3J0IENoYXRTdG9yZSBmcm9tICcuLi9zdG9yZXMvQ2hhdFN0b3JlJztcbmltcG9ydCBDaGF0QWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0NoYXRBY3Rpb25zJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuY29uc3QgR2FtZUhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgcGFyYW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcbiAgICBvcGVuTW9kYWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2FtZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNPcHBvbmVudEF2YWlsYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIG9taXQoQ2hhdFN0b3JlLmdldFN0YXRlKCksICdtZXNzYWdlcycpO1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBDaGF0U3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uQ2hhdENoYW5nZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIENoYXRTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uQ2hhdENoYW5nZSk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtcywgZ2FtZU92ZXIsIGlzT3Bwb25lbnRBdmFpbGFibGV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB1bnNlZW5Db3VudCA9IHRoaXMuc3RhdGUudW5zZWVuQ291bnQ7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuXG4gICAgICAgIDxDbG9ja1xuICAgICAgICAgIGlvPXtpb31cbiAgICAgICAgICBwYXJhbXM9e3BhcmFtc30gLz5cblxuICAgICAgICA8c3BhbiBpZD1cImdhbWUtdHlwZVwiPlxuICAgICAgICAgIHtgJHtwYXJhbXNbMV19fCR7cGFyYW1zWzJdfWB9XG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICA8YSBjbGFzc05hbWU9XCJidG5cIiBocmVmPVwiL1wiPk5ldyBnYW1lPC9hPlxuXG4gICAgICAgIHshZ2FtZU92ZXIgJiYgaXNPcHBvbmVudEF2YWlsYWJsZSA/XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi0tcmVkIHJlc2lnblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uUmVzaWdufT5cbiAgICAgICAgICAgIFJlc2lnblxuICAgICAgICAgIDwvYT5cbiAgICAgICAgOmdhbWVPdmVyID9cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4gYnRuLS1yZWQgcmVtYXRjaFwiXG4gICAgICAgICAgICAgb25DbGljaz17dGhpcy5fb25SZW1hdGNofT5cbiAgICAgICAgICAgIFJlbWF0Y2hcbiAgICAgICAgICA8L2E+XG4gICAgICAgIDpudWxsfVxuXG4gICAgICAgIDxhIGlkPVwiY2hhdC1pY29uXCJcbiAgICAgICAgICAgb25DbGljaz17Q2hhdEFjdGlvbnMudG9nZ2xlVmlzaWJpbGl0eX0+XG4gICAgICAgICAge3Vuc2VlbkNvdW50ID9cbiAgICAgICAgICAgIDxzcGFuIGlkPVwiY2hhdC1jb3VudGVyXCI+XG4gICAgICAgICAgICAgIHt1bnNlZW5Db3VudCA8IDkgPyB1bnNlZW5Db3VudCA6ICc5Kyd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgOm51bGx9XG4gICAgICAgICAgPGltZyBzcmM9XCIvaW1nL2NoYXQuc3ZnXCJcbiAgICAgICAgICAgICAgIHdpZHRoPVwiNTBcIlxuICAgICAgICAgICAgICAgaGVpZ2h0PVwiNTBcIiAvPlxuICAgICAgICAgIENoYXRcbiAgICAgICAgPC9hPlxuICAgICAgPC9oZWFkZXI+XG4gICAgKTtcbiAgfSxcbiAgX29uQ2hhdENoYW5nZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKG9taXQoQ2hhdFN0b3JlLmdldFN0YXRlKCksICdtZXNzYWdlcycpKTtcbiAgfSxcbiAgX29uUmVzaWduKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zLCBjb2xvcn0gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8uZW1pdCgncmVzaWduJywge1xuICAgICAgdG9rZW46IHBhcmFtc1swXSxcbiAgICAgIGNvbG9yOiBjb2xvclxuICAgIH0pO1xuICB9LFxuICBfb25SZW1hdGNoKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zLCBvcGVuTW9kYWwsIGlzT3Bwb25lbnRBdmFpbGFibGV9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghaXNPcHBvbmVudEF2YWlsYWJsZSkge1xuICAgICAgb3Blbk1vZGFsKCdpbmZvJywgJ1lvdXIgb3Bwb25lbnQgaGFzIGRpc2Nvbm5lY3RlZC4gWW91IG5lZWQgdG8gJyArXG4gICAgICAgICdnZW5lcmF0ZSBhIG5ldyBsaW5rLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlvLmVtaXQoJ3JlbWF0Y2gtb2ZmZXInLCB7XG4gICAgICB0b2tlbjogcGFyYW1zWzBdXG4gICAgfSk7XG4gICAgb3Blbk1vZGFsKCdpbmZvJywgJ1lvdXIgb2ZmZXIgaGFzIGJlZW4gc2VudC4nKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVIZWFkZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lSGVhZGVyIGZyb20gJy4vR2FtZUhlYWRlcic7XG5pbXBvcnQgQ2hhdCBmcm9tICcuL0NoYXQnO1xuaW1wb3J0IE1vZGFsIGZyb20gJy4vTW9kYWwnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBDaGVzc2JvYXJkSW50ZXJmYWNlIGZyb20gJy4vQ2hlc3Nib2FyZEludGVyZmFjZSc7XG5pbXBvcnQgR2FtZWJvYXJkSW50ZXJmYWNlIGZyb20gJy4vR2FtZWJvYXJkSW50ZXJmYWNlJztcbmltcG9ydCB7TWFwfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi9HYW1lQm9hcmQnO1xuXG5jb25zdCBHYW1lSW50ZXJmYWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBwYXJhbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBmYWxzZSxcbiAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgbW9kYWw6IE1hcCh7XG4gICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiAnJyxcbiAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICBoaWRlOiB0aGlzLl9oaWRlTW9kYWwsXG4gICAgICAgICAgYWNjZXB0OiB0aGlzLl9hY2NlcHRSZW1hdGNoLFxuICAgICAgICAgIGRlY2xpbmU6IHRoaXMuX2RlY2xpbmVSZW1hdGNoXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgc291bmRzRW5hYmxlZDogZmFsc2UsXG4gICAgICBnYW1lT3ZlcjogR2FtZVN0b3JlLmdldFN0YXRlKCkuZ2FtZU92ZXJcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtc30gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8ub24oJ3Rva2VuLWludmFsaWQnLCAoKSA9PiB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1vZGFsOiB0aGlzLnN0YXRlLm1vZGFsXG4gICAgICAgIC5zZXQoJ29wZW4nLCB0cnVlKVxuICAgICAgICAuc2V0KCdtZXNzYWdlJywgJ0dhbWUgbGluayBpcyBpbnZhbGlkIG9yIGhhcyBleHBpcmVkLicpXG4gICAgICAgIC5zZXQoJ3R5cGUnLCAnaW5mbycpXG4gICAgfSkpO1xuXG4gICAgaW8uZW1pdCgnam9pbicsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICB0aW1lOiBwYXJhbXNbMV0gKiA2MCxcbiAgICAgIGluYzogcGFyYW1zWzJdXG4gICAgfSk7XG5cbiAgICBpby5vbignam9pbmVkJywgZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5jb2xvciA9PT0gJ2JsYWNrJykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb2xvcjogJ2JsYWNrJ30pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaW8ub24oJ2JvdGgtam9pbmVkJywgKCkgPT5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzT3Bwb25lbnRBdmFpbGFibGU6IHRydWV9LCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbG9yID09PSAnd2hpdGUnKSB7XG4gICAgICAgICAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xuICAgICAgICAgICAgdG9rZW46IHBhcmFtc1swXSxcbiAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcblxuICAgIGlvLm9uKCdmdWxsJywgKCkgPT4ge1xuICAgICAgd2luZG93LmFsZXJ0KFxuICAgICAgICAnVGhpcyBnYW1lIGFscmVhZHkgaGFzIHR3byBwbGF5ZXJzLiBZb3UgaGF2ZSB0byBjcmVhdGUgYSBuZXcgb25lLicpO1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gJy8nO1xuICAgIH0pO1xuXG4gICAgaW8ub24oJ3BsYXllci1yZXNpZ25lZCcsIGRhdGEgPT4ge1xuICAgICAgR2FtZUFjdGlvbnMuZ2FtZU92ZXIoe1xuICAgICAgICB0eXBlOiAncmVzaWduJyxcbiAgICAgICAgd2lubmVyOiBkYXRhLmNvbG9yID09PSAnYmxhY2snID8gJ1doaXRlJyA6ICdCbGFjaydcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtb2ZmZXJlZCcsICgpID0+XG4gICAgICB0aGlzLl9vcGVuTW9kYWwoJ29mZmVyJywgJ1lvdXIgb3Bwb25lbnQgaGFzIHNlbnQgeW91IGEgcmVtYXRjaCBvZmZlci4nKSk7XG5cbiAgICBpby5vbigncmVtYXRjaC1kZWNsaW5lZCcsICgpID0+XG4gICAgICB0aGlzLl9vcGVuTW9kYWwoJ2luZm8nLCAnUmVtYXRjaCBvZmZlciBoYXMgYmVlbiBkZWNsaW5lZC4nKSk7XG5cbiAgICBpby5vbigncmVtYXRjaC1hY2NlcHRlZCcsICgpID0+IHtcbiAgICAgIEdhbWVBY3Rpb25zLnJlbWF0Y2goKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb2xvcjogdGhpcy5zdGF0ZS5jb2xvciA9PT0gJ3doaXRlJyA/ICdibGFjaycgOiAnd2hpdGUnLFxuICAgICAgICBtb2RhbDogdGhpcy5zdGF0ZS5tb2RhbC5zZXQoJ29wZW4nLCBmYWxzZSlcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29sb3IgPT09ICd3aGl0ZScpIHtcbiAgICAgICAgICBpby5lbWl0KCdjbG9jay1ydW4nLCB7XG4gICAgICAgICAgICB0b2tlbjogdGhpcy5wcm9wcy5wYXJhbXNbMF0sXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlvLm9uKCdvcHBvbmVudC1kaXNjb25uZWN0ZWQnLCAoKSA9PiAge1xuICAgICAgaWYgKCF0aGlzLnN0YXRlLmdhbWVPdmVyLmdldCgnc3RhdHVzJykpIHtcbiAgICAgICAgdGhpcy5fb3Blbk1vZGFsKCdpbmZvJywgJ1lvdXIgb3Bwb25lbnQgaGFzIGRpc2Nvbm5lY3RlZC4nKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNPcHBvbmVudEF2YWlsYWJsZTogZmFsc2V9KTtcbiAgICB9KTtcblxuICAgIEdhbWVTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgR2FtZVN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcbiAgfSxcblxuXG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7Y29sb3IsIHNvdW5kc0VuYWJsZWQsIGdhbWVPdmVyLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgY29tbW9uUHJvcHMgPSB7XG4gICAgICBpbzogaW8sXG4gICAgICBjb2xvcjogY29sb3IsXG4gICAgICBvcGVuTW9kYWw6IHRoaXMuX29wZW5Nb2RhbCxcbiAgICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IGlzT3Bwb25lbnRBdmFpbGFibGVcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxHYW1lSGVhZGVyXG4gICAgICAgICAgey4uLmNvbW1vblByb3BzfVxuICAgICAgICAgIHBhcmFtcz17cGFyYW1zfVxuICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlci5nZXQoJ3N0YXR1cycpfSAvPlxuXG4gICAgICAgIDxDaGF0XG4gICAgICAgICAgey4uLmNvbW1vblByb3BzfVxuICAgICAgICAgIHRva2VuPXtwYXJhbXNbMF19XG4gICAgICAgICAgc291bmRzRW5hYmxlZD17c291bmRzRW5hYmxlZH0gLz5cblxuICAgICAgICAgIHsvKlxuICAgICAgICA8Q2hlc3Nib2FyZEludGVyZmFjZVxuICAgICAgICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICAgICAgICB0b2tlbj17cGFyYW1zWzBdfVxuICAgICAgICAgIHNvdW5kc0VuYWJsZWQ9e3NvdW5kc0VuYWJsZWR9XG4gICAgICAgICAgZ2FtZU92ZXI9e2dhbWVPdmVyfSAvPlxuICAgICAgICAqL31cbiAgICAgICAgICBcbiAgICAgICAgey8qfVxuICAgICAgICA8Qm9hcmQgLz5cbiAgICAgICAgKi99XG5cbiAgICAgICAgICA8R2FtZWJvYXJkSW50ZXJmYWNlIC8+XG5cblxuXG5cbiAgICAgICAgPE1vZGFsIGRhdGE9e3RoaXMuc3RhdGUubW9kYWx9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG5cblxuXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Z2FtZU92ZXI6IEdhbWVTdG9yZS5nZXRTdGF0ZSgpLmdhbWVPdmVyfSk7XG4gIH0sXG4gIF9vcGVuTW9kYWwodHlwZSwgbWVzc2FnZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbW9kYWw6IHRoaXMuc3RhdGUubW9kYWxcbiAgICAgICAgLnNldCgnb3BlbicsIHRydWUpXG4gICAgICAgIC5zZXQoJ21lc3NhZ2UnLCBtZXNzYWdlKVxuICAgICAgICAuc2V0KCd0eXBlJywgdHlwZSlcbiAgICB9KTtcbiAgfSxcbiAgX2hpZGVNb2RhbCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHttb2RhbDogdGhpcy5zdGF0ZS5tb2RhbC5zZXQoJ29wZW4nLCBmYWxzZSl9KTtcbiAgfSxcbiAgX2FjY2VwdFJlbWF0Y2goKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXN9ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLmVtaXQoJ3JlbWF0Y2gtYWNjZXB0Jywge1xuICAgICAgdG9rZW46IHBhcmFtc1swXSxcbiAgICAgIHRpbWU6IHBhcmFtc1sxXSAqIDYwLFxuICAgICAgaW5jOiBwYXJhbXNbMl1cbiAgICB9KTtcbiAgICB0aGlzLl9oaWRlTW9kYWwoKTtcbiAgfSxcbiAgX2RlY2xpbmVSZW1hdGNoKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpby5lbWl0KCdyZW1hdGNoLWRlY2xpbmUnLCB7XG4gICAgICB0b2tlbjogcGFyYW1zWzBdXG4gICAgfSk7XG4gICAgdGhpcy5faGlkZU1vZGFsKCk7XG4gIH0sXG4gIF90b2dnbGVTb3VuZHMoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc291bmRzRW5hYmxlZDogIXRoaXMuc3RhdGUuc291bmRzRW5hYmxlZFxuICAgIH0pO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVJbnRlcmZhY2U7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuaW1wb3J0IENoZXNzYm9hcmQgZnJvbSAnLi9DaGVzc2JvYXJkJztcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkJztcbmltcG9ydCBDYXB0dXJlZFBpZWNlcyBmcm9tICcuL0NhcHR1cmVkUGllY2VzJztcbmltcG9ydCBUYWJsZU9mTW92ZXMgZnJvbSAnLi9UYWJsZU9mTW92ZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG4vKiB0aGUgc3RhdGUgb2YgdGhlIGdhbWVib2FyZCBpcyBtYW5hZ2VkIGJ5IEdhbWVTdG9yZSAqL1xuXG5jb25zdCBHYW1lYm9hcmRJbnRlcmZhY2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0cHJvcFR5cGVzOiB7XG5cblx0fSxcblx0bWl4aW5zOiBbXSxcblx0Z2V0SW5pdGlhbFN0YXRlKCkge1xuXHRcdHJldHVybiBHYW1lU3RvcmUuZ2V0U3RhdGUoKTtcblx0fSxcblx0Z2V0RGVmYXVsdFByb3BzKCkge1xuXG5cdH0sXG5cdGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcblxuXHR9LFxuXHRyZW5kZXIoKSB7XG5cdFx0Y29uc3Qge3Byb21vdGlvbiwgdHVybiwgZ2FtZU92ZXIsIGNoZWNrfSA9IHRoaXMuc3RhdGVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBpZD1cImJvYXJkLW1vdmVzLXdyYXBwZXJcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuXHRcdFx0XHQ8ZGl2IGlkPVwiYm9hcmQtd3JhcHBlclwiPlxuXG5cdFx0XHRcdFx0PENhcHR1cmVkUGllY2VzIC8+XG5cblx0XHRcdFx0XHQ8Qm9hcmQgc2l6ZT17Nn0vPlxuXG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImZlZWRiYWNrXCI+XG5cdFx0XHRcdFx0eyFnYW1lT3Zlci5nZXQoJ3N0YXR1cycpID9cblx0XHRcdFx0XHRcdDxzcGFuPlxuXHRcdFx0XHRcdFx0XHR7YCR7dHVybj09PSd3JyA/ICdXaGl0ZScgOiAnQmxhY2snfSB0byBtb3ZlLmB9XG5cdFx0XHRcdFx0XHQ8L3NwYW4+IDpcblx0XHRcdFx0XHRcdDxzdHJvbmc+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImljb25cIj5cblx0XHRcdFx0XHRcdFx0ICB7Z2FtZU92ZXIuZ2V0KCd3aW5uZXInKSA9PT0gJ1doaXRlJyA/ICdGJyA6ICdmJ31cblx0XHRcdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHR7dGhpcy5fZ2V0R2FtZU92ZXJNZXNzYWdlKCl9XG5cdFx0XHRcdFx0XHQ8L3N0cm9uZz5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvc3Bhbj5cblxuXG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH0sXG5cblx0X29uR2FtZUNoYW5nZSgpIHtcblx0XHR0aGlzLnNldFN0YXRlKEdhbWVTdG9yZS5nZXRTdGF0ZSgpKTtcblx0fSxcblxuXHRfZ2V0R2FtZU92ZXJNZXNzYWdlKCkge1xuXHRcdHJldHVybiBgeW91IGxvc2VgO1xuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmRJbnRlcmZhY2U7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY29uc3QgTW9kYWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbl0sXG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IGlzT3BlbiA9IHRoaXMucHJvcHMuZGF0YS5nZXQoJ29wZW4nKTtcblxuICAgIGlmIChpc09wZW4pXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlkb3duKTtcbiAgICBlbHNlXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlkb3duKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnByb3BzLmRhdGE7XG4gICAgY29uc3QgdHlwZSA9IGRhdGEuZ2V0KCd0eXBlJyk7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gZGF0YS5nZXQoJ2NhbGxiYWNrcycpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgJ21vZGFsLW1hc2snOiB0cnVlLFxuICAgICAgICAgICAgICdoaWRkZW4nOiAhZGF0YS5nZXQoJ29wZW4nKVxuICAgICAgICAgICB9KX1cbiAgICAgICAgICAgb25DbGljaz17dGhpcy5faGlkZU1vZGFsfT5cbiAgICAgICAgPHA+XG4gICAgICAgICAgPHN0cm9uZz5Fc2M6IDwvc3Ryb25nPlxuICAgICAgICAgIDxzcGFuPnt0eXBlID09PSAnaW5mbycgPyAnT0snIDogJ0RlY2xpbmUnfTwvc3Bhbj5cbiAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICA8c3Ryb25nPkVudGVyOiA8L3N0cm9uZz5cbiAgICAgICAgICA8c3Bhbj57dHlwZSA9PT0gJ2luZm8nID8gJ09LJyA6ICdBY2NlcHQnfTwvc3Bhbj5cbiAgICAgICAgPC9wPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIlxuICAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX0+XG4gICAgICAgICAgPHA+e2RhdGEuZ2V0KCdtZXNzYWdlJyl9PC9wPlxuXG4gICAgICAgICAge3R5cGUgPT09ICdpbmZvJyA/IFxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIG9rXCJcbiAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NhbGxiYWNrcy5oaWRlfT5cbiAgICAgICAgICAgICAgT0tcbiAgICAgICAgICAgIDwvYT4gOiBbXG5cbiAgICAgICAgICAgIDxhIGtleT1cImFcIlxuICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuXCJcbiAgICAgICAgICAgICAgIHN0eWxlPXt7bGVmdDogJzRlbSd9fVxuICAgICAgICAgICAgICAgb25DbGljaz17Y2FsbGJhY2tzLmFjY2VwdH0+XG4gICAgICAgICAgICAgIEFjY2VwdFxuICAgICAgICAgICAgPC9hPixcbiAgICAgICAgICAgIDxhIGtleT1cImJcIlxuICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi0tcmVkXCJcbiAgICAgICAgICAgICAgIHN0eWxlPXt7cmlnaHQ6ICc0ZW0nfX1cbiAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NhbGxiYWNrcy5kZWNsaW5lfT5cbiAgICAgICAgICAgICAgRGVjbGluZVxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIF19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgX29uS2V5ZG93bihlKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMucHJvcHMuZGF0YS5nZXQoJ3R5cGUnKTtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCdjYWxsYmFja3MnKTtcblxuICAgIGlmICh0eXBlID09PSAnaW5mbycpIHtcbiAgICAgIGlmIChlLndoaWNoID09PSAxMyB8fCBlLndoaWNoID09PSAyNykge1xuICAgICAgICBjYWxsYmFja3MuaGlkZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29mZmVyJykge1xuICAgICAgaWYgKGUud2hpY2ggPT09IDEzKSB7XG4gICAgICAgIGNhbGxiYWNrcy5hY2NlcHQoKTtcbiAgICAgIH0gZWxzZSBpZiAoZS53aGljaCA9PT0gMjcpIHtcbiAgICAgICAgY2FsbGJhY2tzLmRlY2xpbmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIF9oaWRlTW9kYWwoKSB7XG4gICAgdGhpcy5wcm9wcy5kYXRhLmdldCgnY2FsbGJhY2tzJykuaGlkZSgpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuXG5jb25zdCBUYWJsZU9mTW92ZXMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluLCBvbkdhbWVDaGFuZ2VdLFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbW92ZXM6IEdhbWVTdG9yZS5nZXRNb3ZlcygpXG4gICAgfTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dGFibGUgaWQ9XCJtb3Zlc1wiIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XG4gICAgICAgIDx0aGVhZD5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGg+VGFibGUgb2YgbW92ZXM8L3RoPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGhlYWQ+XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5tb3Zlcy5tYXAoKHJvdywgaSkgPT4gKFxuICAgICAgICAgICAgPHRyIGtleT17aX0+XG4gICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPntgJHtpICsgMX0uYH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAge3Jvdy5tYXAoKG1vdmUsIGopID0+IChcbiAgICAgICAgICAgICAgICA8dGQga2V5PXtqfT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPnttb3ZlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICApKS50b0FycmF5KCl9XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICkpLnRvQXJyYXkoKX1cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvdGFibGU+XG4gICAgKTtcbiAgfSxcbiAgX29uR2FtZUNoYW5nZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1vdmVzOiBHYW1lU3RvcmUuZ2V0TW92ZXMoKVxuICAgIH0pO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgVGFibGVPZk1vdmVzOyIsImltcG9ydCBrZXlNaXJyb3IgZnJvbSAncmVhY3QvbGliL2tleU1pcnJvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGtleU1pcnJvcih7XG4gIFRPR0dMRV9WSVNJQklMSVRZOiBudWxsLFxuICBTVUJNSVRfTUVTU0FHRTogbnVsbFxufSk7IiwiY29uc3QgQ2hlc3NQaWVjZXMgPSB7XG4gIC8vIGtleTogcGllY2UgZnJvbSBGRU4sIHZhbHVlOiBwaWVjZSBmcm9tIFNtYXJ0IFJlZ3VsYXIgY2hlc3MgZm9udFxuICAvLyB3aGl0ZSBwaWVjZXNcbiAgJ0snOiAnRicsXG4gICdRJzogJ0UnLFxuICAnUic6ICdEJyxcbiAgJ0InOiAnQycsXG4gICdOJzogJ0InLFxuICAnUCc6ICdBJyxcbiAgLy8gYmxhY2sgcGllY2VzXG4gICdrJzogJ2YnLFxuICAncSc6ICdlJyxcbiAgJ3InOiAnZCcsXG4gICdiJzogJ2MnLFxuICAnbic6ICdiJyxcbiAgJ3AnOiAnYScsXG4gIC8vIGVtcHR5IHNxdWFyZVxuICAnLSc6IHVuZGVmaW5lZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hlc3NQaWVjZXM7IiwiaW1wb3J0IGtleU1pcnJvciBmcm9tICdyZWFjdC9saWIva2V5TWlycm9yJztcblxuZXhwb3J0IGRlZmF1bHQga2V5TWlycm9yKHtcbiAgTUFLRV9NT1ZFOiBudWxsLFxuICBTSE9XX01PVkVTOiBudWxsLFxuICBSRU1BVENIOiBudWxsLFxuICBEUkFXOiBudWxsLFxuICBHQU1FX09WRVI6IG51bGwsXG4gIENIQU5HRV9QUk9NT1RJT046IG51bGxcbn0pOyIsImltcG9ydCB7RGlzcGF0Y2hlcn0gZnJvbSAnZmx1eCc7XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24obmV3IERpc3BhdGNoZXIoKSwge1xuICAvLyBAcGFyYW0ge29iamVjdH0gYWN0aW9uIFRoZSBkYXRhIGNvbWluZyBmcm9tIHRoZSB2aWV3LlxuICBoYW5kbGVWaWV3QWN0aW9uOiBmdW5jdGlvbihhY3Rpb24pIHtcbiAgICB0aGlzLmRpc3BhdGNoKHtcbiAgICAgIHNvdXJjZTogJ1ZJRVdfQUNUSU9OJyxcbiAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgfSk7XG4gIH1cbn0pOyIsImNvbnN0IFRpbGVBY3Rpb25zID0ge1xuICAgIEFzc2Fzc2luOiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWy0yLDBdJzogJ2p1bXAgc2xpZGUnLFxuICAgICAgICAgICAgJ1syLC0yXSc6ICdqdW1wIHNsaWRlJyxcbiAgICAgICAgICAgICdbMiwyXSc6ICdqdW1wIHNsaWRlJ1xuICAgICAgICB9LFxuICAgICAgICBiYWNrOiB7XG4gICAgICAgICAgICAnWy0yLC0yXSc6ICdqdW1wIHNsaWRlJyxcbiAgICAgICAgICAgICdbLTIsMl0nOiAnanVtcCBzbGlkZScsXG4gICAgICAgICAgICAnWzIsMF0nOiAnanVtcCBzbGlkZSdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgQm93bWFuOiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWy0xLDBdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLDFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMCwtMl0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzAsMl0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzIsMF0nOiAnanVtcCdcbiAgICAgICAgfSxcbiAgICAgICAgYmFjazoge1xuICAgICAgICAgICAgJ1stMSwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwgLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1sxLCAxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbLTEsIC0xXSc6ICdzdHJpa2UnLFxuICAgICAgICAgICAgJ1stMiwgMF0nOiAnc3RyaWtlJyxcbiAgICAgICAgICAgICdbLTEsIDFdJzogJ3N0cmlrZSdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgQ2hhbXBpb246IHtcbiAgICAgICAgZnJvbnQ6IHtcbiAgICAgICAgICAgICdbLTEsMF0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzAsMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzEsMF0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzAsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMiwwXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMCwyXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMiwwXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMCwtMl0nOiAnanVtcCdcbiAgICAgICAgfSxcbiAgICAgICAgYmFjazoge1xuICAgICAgICAgICAnWy0xLDBdJzogJ3N0cmlrZScsXG4gICAgICAgICAgICAnWzAsMV0nOiAnc3RyaWtlJyxcbiAgICAgICAgICAgICdbMSwwXSc6ICdzdHJpa2UnLFxuICAgICAgICAgICAgJ1swLC0xXSc6ICdzdHJpa2UnLFxuICAgICAgICAgICAgJ1stMiwwXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMCwyXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMiwwXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMCwtMl0nOiAnanVtcCdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRHJhZ29vbjoge1xuICAgICAgICBmcm9udDoge1xuICAgICAgICAgICAgJ1swLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMCwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbLTIsLTJdJzogJ3N0cmlrZScsXG4gICAgICAgICAgICAnWy0yLDBdJzogJ3N0cmlrZScsXG4gICAgICAgICAgICAnWy0yLDJdJzogJ3N0cmlrZSdcbiAgICAgICAgfSxcbiAgICAgICAgYmFjazoge1xuICAgICAgICAgICAgJ1stMSwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbLTIsMF0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWy0yLC0xXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbLTIsMV0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzEsIC0xXSc6ICdzbGlkZScsXG4gICAgICAgICAgICAnWzEsIDFdJzogJ3NsaWRlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBEdWNoZXNzOiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWzAsMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzAsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1syLDBdJzogJ21vdmUnXG4gICAgICAgIH0sXG4gICAgICAgIGJhY2s6IHtcbiAgICAgICAgICAgJ1swLDFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMiwwXSc6ICdtb3ZlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBEdWtlOiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWzAsLTFdJzogJ3NsaWRlJyxcbiAgICAgICAgICAgICdbMCwxXSc6ICdzbGlkZScgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICBiYWNrOiB7XG4gICAgICAgICAgICAnWy0xLDBdJzogJ3NsaWRlJyxcbiAgICAgICAgICAgICdbMSwwXSc6ICdzbGlkZSdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRm9vdG1hbjoge1xuICAgICAgICBmcm9udDoge1xuICAgICAgICAgICAgJ1sxLDBdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMSwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMCwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMCwtMV0nOiAnbW92ZSdcbiAgICAgICAgfSxcbiAgICAgICAgYmFjazoge1xuICAgICAgICAgICAgJ1stMiwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzEsMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWy0xLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbLTEsMV0nOiAnbW92ZSdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgS25pZ2h0OiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWy0yLC0xXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbLTIsMV0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzAsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLDFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1sxLDBdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1syLDBdJzogJ21vdmUnXG4gICAgICAgIH0sXG4gICAgICAgIGJhY2s6IHtcbiAgICAgICAgICAgICdbLTEsMF0nOiAnc2xpZGUnLFxuICAgICAgICAgICAgJ1sxLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMiwtMl0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzIsMl0nOiAnbW92ZSdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgTG9uZ2Jvd21hbjoge1xuICAgICAgICBmcm9udDoge1xuICAgICAgICAgICAgJ1stMSwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMCwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMCwtMV0nOiAnbW92ZSdcbiAgICAgICAgfSxcbiAgICAgICAgYmFjazoge1xuICAgICAgICAgICAnWy0yLDBdJzogJ3N0cmlrZScsXG4gICAgICAgICAgICdbLTMsMF0nOiAnc3RyaWtlJyxcbiAgICAgICAgICAgJ1sxLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgJ1sxLDFdJzogJ21vdmUnLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBNYXJzaGFsbDoge1xuICAgICAgICBmcm9udDoge1xuICAgICAgICAgICAgJ1swLC0xXSc6ICdzbGlkZScsXG4gICAgICAgICAgICAnWzAsMV0nOiAnc2xpZGUnLFxuICAgICAgICAgICAgJ1stMiwtMl0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWy0yLDJdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1syLDBdJzogJ2p1bXAnXG4gICAgICAgIH0sXG4gICAgICAgIGJhY2s6IHtcbiAgICAgICAgICAgICdbLTEsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMSwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbLTEsMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzAsLTJdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMCwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMCwyXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzEsMV0nOiAnbW92ZSdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgT3JhY2xlOiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWy0xLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbLTEsMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzEsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1sxLDFdJzogJ21vdmUnXG4gICAgICAgIH0sXG4gICAgICAgIGJhY2s6IHt9XG4gICAgfSxcbiAgICBQaWtlbWFuOiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWy0yLC0yXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbLTEsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMSwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbLTIsMl0nOiAnbW92ZSdcbiAgICAgICAgfSxcbiAgICAgICAgYmFjazoge1xuICAgICAgICAgICAgJ1stMiwtMV0nOiAnc3RyaWtlJyxcbiAgICAgICAgICAgICdbLTIsMV0nOiAnc3RyaWtlJyxcbiAgICAgICAgICAgICdbLTEsMF0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzEsMF0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzIsMF0nOiAnbW92ZSdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUHJpZXN0OiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWy0xLC0xXSc6ICdzbGlkZScsXG4gICAgICAgICAgICAnWy0xLDFdJzogJ3NsaWRlJyxcbiAgICAgICAgICAgICdbMSwtMV0nOiAnc2xpZGUnLFxuICAgICAgICAgICAgJ1sxLDFdJzogJ3NsaWRlJ1xuICAgICAgICB9LFxuICAgICAgICBiYWNrOiB7XG4gICAgICAgICAgICdbLTEsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMSwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzEsMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWy0yLC0yXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbLTIsMl0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzIsLTJdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1syLDJdJzogJ2p1bXAnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFJhbmdlcjoge1xuICAgICAgICBmcm9udDoge1xuICAgICAgICAgICAgJ1stMSwwXSc6ICdzbGlkZScsXG4gICAgICAgICAgICAnWzEsMF0nOiAnc2xpZGUnLFxuICAgICAgICAgICAgJ1stMiwtMV0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWy0yLDFdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1stMSwtMl0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWy0xLDJdJzogJ2p1bXAnXG4gICAgICAgIH0sXG4gICAgICAgIGJhY2s6IHtcbiAgICAgICAgICAgJ1stMSwtMV0nOiAnc2xpZGUnLFxuICAgICAgICAgICAgJ1stMSwxXSc6ICdzbGlkZScsXG4gICAgICAgICAgICAnWzIsLTFdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1syLDFdJzogJ2p1bXAnLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBTZWVyOiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWy0yLDBdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1swLDJdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1syLDBdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1swLC0yXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbLTEsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMSwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzEsMV0nOiAnbW92ZSdcbiAgICAgICAgfSxcbiAgICAgICAgYmFjazoge1xuICAgICAgICAgICAgJ1stMiwtMl0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWy0yLDJdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1syLC0yXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMiwyXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbLTEsMF0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzEsMF0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzAsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLDFdJzogJ21vdmUnXG5cbiAgICAgICAgfVxuICAgIH0sXG4gICAgV2l6YXJkOiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWy0xLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbLTEsMF0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWy0xLDFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMCwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzEsMF0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzEsMV0nOiAnbW92ZScsXG4gICAgICAgIH0sXG4gICAgICAgIGJhY2s6IHtcbiAgICAgICAgICAgICdbLTIsLTJdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1stMiwwXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbLTIsMl0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzAsLTJdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1swLDJdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1syLC0yXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMiwwXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMiwyXSc6ICdqdW1wJyxcbiAgICAgICAgfVxuICAgIH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpbGVBY3Rpb25zOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuY29uc3QgT1JJR0lOID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNyc7XG5jb25zdCBXUyA9IE9SSUdJTjtcblxuZXhwb3J0IGRlZmF1bHQgaW8uY29ubmVjdChXUyk7IiwiY29uc3QgbWF5YmVSZXZlcnNlID0ge1xuICBfbWF5YmVSZXZlcnNlKGl0ZXJhYmxlLCBjb2xvcikge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNvbG9yID09PSAoY29sb3IgfHwgJ2JsYWNrJykgP1xuICAgICAgaXRlcmFibGUucmV2ZXJzZSgpIDogaXRlcmFibGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1heWJlUmV2ZXJzZTsiLCJpbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuXG5jb25zdCBvbkdhbWVDaGFuZ2UgPSB7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIEdhbWVTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgR2FtZVN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgb25HYW1lQ2hhbmdlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyMiBhcyBFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50ZW1pdHRlcjInO1xuaW1wb3J0IENoYXRDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0NoYXRDb25zdGFudHMnO1xuaW1wb3J0IHtMaXN0LCBNYXB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmNvbnN0IENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xuICBcbnZhciBfbWVzc2FnZXMgPSBMaXN0KCk7XG52YXIgX3Vuc2VlbkNvdW50ID0gMDtcbnZhciBfaXNDaGF0SGlkZGVuID0gdHJ1ZTtcblxuY29uc3QgQ2hhdFN0b3JlID0gT2JqZWN0LmFzc2lnbih7fSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZXM6IF9tZXNzYWdlcyxcbiAgICAgIHVuc2VlbkNvdW50OiBfdW5zZWVuQ291bnQsXG4gICAgICBpc0NoYXRIaWRkZW46IF9pc0NoYXRIaWRkZW5cbiAgICB9O1xuICB9XG59KTtcblxuZnVuY3Rpb24gdG9nZ2xlVmlzaWJpbGl0eSgpIHtcbiAgX2lzQ2hhdEhpZGRlbiA9ICFfaXNDaGF0SGlkZGVuO1xuICBfdW5zZWVuQ291bnQgPSAwO1xufVxuXG5mdW5jdGlvbiBzdWJtaXRNZXNzYWdlKG1lc3NhZ2UsIGNsYXNzTmFtZSwgcmVjZWl2ZWQpIHtcbiAgX21lc3NhZ2VzID0gX21lc3NhZ2VzLnB1c2goTWFwKHtcbiAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lXG4gIH0pKTtcblxuICBpZiAocmVjZWl2ZWQgJiYgX2lzQ2hhdEhpZGRlbikge1xuICAgIF91bnNlZW5Db3VudCArPSAxO1xuICB9XG59XG5cbkFwcERpc3BhdGNoZXIucmVnaXN0ZXIocGF5bG9hZCA9PiB7XG4gIGNvbnN0IGFjdGlvbiA9IHBheWxvYWQuYWN0aW9uO1xuXG4gIHN3aXRjaCAoYWN0aW9uLmFjdGlvblR5cGUpIHtcbiAgICBjYXNlIENoYXRDb25zdGFudHMuVE9HR0xFX1ZJU0lCSUxJVFk6XG4gICAgICB0b2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgQ2hhdENvbnN0YW50cy5TVUJNSVRfTUVTU0FHRTpcbiAgICAgIHN1Ym1pdE1lc3NhZ2UoYWN0aW9uLm1lc3NhZ2UsIGFjdGlvbi5jbGFzc05hbWUsIGFjdGlvbi5yZWNlaXZlZCk7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIENoYXRTdG9yZS5lbWl0KENIQU5HRV9FVkVOVCk7XG4gIHJldHVybiB0cnVlO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENoYXRTdG9yZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XG5pbXBvcnQge0V2ZW50RW1pdHRlcjIgYXMgRXZlbnRFbWl0dGVyfSBmcm9tICdldmVudGVtaXR0ZXIyJztcbmltcG9ydCBHYW1lQ29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9HYW1lQ29uc3RhbnRzJztcbmltcG9ydCBDaGVzc1BpZWNlcyBmcm9tICcuLi9jb25zdGFudHMvQ2hlc3NQaWVjZXMnO1xuaW1wb3J0IHtDaGVzc30gZnJvbSAnY2hlc3MuanMnO1xuaW1wb3J0IHtMaXN0LCBNYXAsIE9yZGVyZWRNYXAsIFNldH0gZnJvbSAnaW1tdXRhYmxlJztcbi8vaW1wb3J0IFV0aWxzIGZyb20gJy4uL2dhbWUvdXRpbHMnO1xuLy8gaW1wb3J0IGJlaGF2aW9yIGZyb20gJy4uL2dhbWUvYmVoYXZpb3InO1xuXG5jb25zdCBDSEFOR0VfRVZFTlQgPSAnY2hhbmdlJztcbmNvbnN0IE1PVkVfRVZFTlQgPSAnbmV3LW1vdmUnO1xuXG52YXIgX2dhbWVPdmVyO1xudmFyIF9jYXB0dXJlZFBpZWNlcztcbnZhciBfbW92ZXM7XG52YXIgX3Byb21vdGlvbjtcbnZhciBfdHVybjtcbnZhciBfY2hlY2s7XG52YXIgX2xhc3RNb3ZlO1xudmFyIF9jaGVzcztcblxudmFyIF9ib2FyZCA9IHt9O1xudmFyIF9saWdodHVwID0ge307XG5cbnNldEluaXRpYWxTdGF0ZSgpO1xuXG52YXIgR2FtZVN0b3JlID0gT2JqZWN0LmFzc2lnbih7fSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xuICAgIGFkZENoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihjYikge1xuICAgICAgdGhpcy5vbihDSEFOR0VfRVZFTlQsIGNiKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2hhbmdlTGlzdGVuZXI6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICB0aGlzLnJlbW92ZUNoYW5nZUxpc3RlbmVyKENIQU5HRV9FVkVOVCwgY2IpO1xuICAgIH0sXG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnYW1lT3ZlcjogX2dhbWVPdmVyLFxuICAgICAgICAgICAgcHJvbW90aW9uOiBfcHJvbW90aW9uLFxuICAgICAgICAgICAgdHVybjogX3R1cm4sXG4gICAgICAgICAgICBjaGVjazogX2NoZWNrLFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Q2FwdHVyZWRQaWVjZXMoKSB7XG4gICAgICAgIHJldHVybiBfY2FwdHVyZWRQaWVjZXM7XG4gICAgfSxcbiAgICBnZXRNb3ZlcygpIHtcbiAgICAgICAgcmV0dXJuIF9tb3ZlcztcbiAgICB9LFxuICAgIGdldENoZXNzYm9hcmRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZlbjogX2NoZXNzLmZlbigpLFxuICAgICAgICAgICAgbGFzdE1vdmU6IF9sYXN0TW92ZSxcbiAgICAgICAgICAgIGNoZWNrOiBfY2hlY2tcbiAgICAgICAgfTtcbiAgICB9LFxuXG5cbiAgICBnZXRHYW1lYm9hcmRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNldHVwOiBfYm9hcmQsXG4gICAgICAgICAgICBsaWdodHVwOiBfbGlnaHR1cFxuICAgICAgICB9XG4gICAgfSxcblxuXG5cbiAgICBnZXRWYWxpZE1vdmVzKHNxdWFyZSkge1xuICAgICAgICByZXR1cm4gc3F1YXJlID8gU2V0KFxuICAgICAgICAgICAgX2NoZXNzLm1vdmVzKHtcbiAgICAgICAgICAgICAgICBzcXVhcmU6IHNxdWFyZSxcbiAgICAgICAgICAgICAgICB2ZXJib3NlOiB0cnVlXG4gICAgICAgICAgICB9KS5tYXAobW92ZSA9PiBtb3ZlLnRvKSkgOiBTZXQoKTtcbiAgICB9LFxuXG4gICAgc2hvd01vdmVzKHVuaXQsIGZyb20sIGluUmFuZ2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKHVuaXQpO1xuICAgICAgICBjb25zb2xlLmxvZyhmcm9tKTtcblxuXG4gICAgICAgIGluUmFuZ2UuZmlsdGVyKHJhbmdlID0+IHtcbiAgICAgICAgICByZXR1cm4gaXNWYWxpZE1vdmUodW5pdCwgcmFuZ2UpO1xuICAgICAgICB9KS5mb3JFYWNoKG1vdmUgPT4ge1xuICAgICAgICAgIHZhciBjb29yZHNTdHIgPSBgWyR7bW92ZS54fSwgJHttb3ZlLnl9XWA7XG4gICAgICAgICAgX2xpZ2h0dXBbY29vcmRzU3RyXSA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc29sZS5sb2coJ2xpdCB1cCBzdHVmJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKF9saWdodHVwKTtcbiAgICAgICAgLy90aGlzLnNldFN0YXRlKHtfbGlnaHR1cDogdmFsaWRNb3Zlc30pO1xuICAgICAgICBjb25zb2xlLmxvZygnZm9yZWFsIGRvZScpO1xuICAgICAgICBjb25zb2xlLmxvZyhfbGlnaHR1cCk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5nZXRTdGF0ZSgpKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3ZhbGlkIE1vdmVzOicpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHZhbGlkTW92ZXMpO1xuXG4gICAgfVxuXG5cblxuXG5cbn0pO1xuXG5mdW5jdGlvbiBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgX2dhbWVPdmVyID0gTWFwKHtcbiAgICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgICAgdHlwZTogbnVsbCxcbiAgICAgICAgd2lubmVyOiBudWxsXG4gICAgfSk7XG4gICAgX2NhcHR1cmVkUGllY2VzID0gT3JkZXJlZE1hcChbXG4gICAgICAgIFsndycsIExpc3QoKV0sXG4gICAgICAgIFsnYicsIExpc3QoKV1cbiAgICBdKTtcbiAgICBfbW92ZXMgPSBMaXN0KCk7XG4gICAgX3Byb21vdGlvbiA9ICdxJztcbiAgICBfdHVybiA9ICd3JztcbiAgICBfY2hlY2sgPSBmYWxzZTtcbiAgICBfbGFzdE1vdmUgPSBNYXAoKTtcbiAgICAvL19jaGVzcyA9IG5ldyBDaGVzcygpO1xuXG4gICAgX2xpZ2h0dXAgPSBbXTtcblxuICAgIF9ib2FyZCA9IHtcbiAgICAgICAgJ1sxLCAwXSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnYmxhY2snfSxcbiAgICAgICAgJ1syLCAwXSc6IHt1bml0OiAnRHVrZScsIGNvbG9yOiAnYmxhY2snfSxcbiAgICAgICAgJ1szLCAwXSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnYmxhY2snfSxcbiAgICAgICAgJ1syLCA1XSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnd2hpdGUnfSxcbiAgICAgICAgJ1szLCA1XSc6IHt1bml0OiAnRHVrZScsIGNvbG9yOiAnd2hpdGUnfSxcbiAgICAgICAgJ1s0LCA1XSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnd2hpdGUnfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGRyYXcoKSB7XG5cbn1cblxuZnVuY3Rpb24gbWFrZU1vdmUoZnJvbSwgdG8sIGNhcHR1cmUsIGVtaXRNb3ZlKSB7XG4gICAgY29uc3QgbW92ZSA9IF9jaGVzcy5tb3ZlKHtcbiAgICAgICAgZnJvbTogZnJvbSxcbiAgICAgICAgdG86IHRvLFxuICAgICAgICBwcm9tb3Rpb246IF9wcm9tb3Rpb25cbiAgICB9KTtcblxuICAgIGlmICghbW92ZSkge1xuICAgICAgICAvLyBtb3ZlIGlzIG5vdCB2YWxpZCwgcmV0dXJuIGZhbHNlIGFuZCBkb24ndCBlbWl0IGFueSBldmVudC5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIF90dXJuID0gX2NoZXNzLnR1cm4oKTtcbiAgICBfY2hlY2sgPSBfY2hlc3MuaW5fY2hlY2soKTtcbiAgICBfbGFzdE1vdmUgPSBfbGFzdE1vdmUuc2V0KCdmcm9tJywgZnJvbSkuc2V0KCd0bycsIHRvKTtcbiAgICBfbW92ZXMgPSBfbW92ZXMuaXNFbXB0eSgpIHx8IF9tb3Zlcy5sYXN0KCkuc2l6ZSA9PT0gMiA/XG4gICAgICAgIF9tb3Zlcy5wdXNoKExpc3QoW21vdmUuc2FuXSkpIDpcbiAgICAgICAgX21vdmVzLnVwZGF0ZShfbW92ZXMuc2l6ZSAtIDEsIGxpc3QgPT4gbGlzdC5wdXNoKG1vdmUuc2FuKSk7XG5cbiAgICBpZiAoY2FwdHVyZSB8fCBtb3ZlLmZsYWdzID09PSAnZScpIHtcbiAgICAgICAgY29uc3QgY2FwdHVyZWRQaWVjZSA9IGNhcHR1cmUgfHxcbiAgICAgICAgICAgIENoZXNzUGllY2VzW190dXJuID09PSAndycgPyAnUCcgOiAncCddOyAvLyBlbiBwYXNzYW50XG5cbiAgICAgICAgX2NhcHR1cmVkUGllY2VzID0gX2NhcHR1cmVkUGllY2VzXG4gICAgICAgICAgICAudXBkYXRlKF90dXJuLCBsaXN0ID0+IGxpc3QucHVzaChjYXB0dXJlZFBpZWNlKSk7XG4gICAgfVxuXG4gICAgaWYgKF9jaGVzcy5nYW1lX292ZXIoKSkge1xuICAgICAgICBjb25zdCB0eXBlID0gX2NoZXNzLmluX2NoZWNrbWF0ZSgpID8gJ2NoZWNrbWF0ZScgOlxuICAgICAgICAgICAgX2NoZXNzLmluX3N0YWxlbWF0ZSgpID8gJ3N0YWxlbWF0ZScgOlxuICAgICAgICAgICAgX2NoZXNzLmluX3RocmVlZm9sZF9yZXBldGl0aW9uKCkgPyAndGhyZWVmb2xkUmVwZXRpdGlvbicgOlxuICAgICAgICAgICAgX2NoZXNzLmluc3VmZmljaWVudF9tYXRlcmlhbCgpID8gJ2luc3VmZmljaWVudE1hdGVyaWFsJyA6XG4gICAgICAgICAgICBfY2hlc3MuaW5fZHJhdygpID8gJ2RyYXcnIDogbnVsbDtcblxuICAgICAgICBnYW1lT3Zlcih7XG4gICAgICAgICAgICB3aW5uZXI6IF90dXJuID09PSAnYicgPyAnV2hpdGUnIDogJ0JsYWNrJyxcbiAgICAgICAgICAgIHR5cGU6IHR5cGVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGVtaXRNb3ZlKSB7XG4gICAgICAgIEdhbWVTdG9yZS5lbWl0KE1PVkVfRVZFTlQsIHtcbiAgICAgICAgICAgIGZyb206IGZyb20sXG4gICAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgICBjYXB0dXJlOiBjYXB0dXJlLFxuICAgICAgICAgICAgZ2FtZU92ZXI6IF9jaGVzcy5nYW1lX292ZXIoKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2hvd01vdmVzKHVuaXQsIGZyb20sIGluUmFuZ2UpIHtcbiAgY29uc29sZS5sb2codW5pdCk7XG4gICAgY29uc29sZS5sb2coZnJvbSk7XG5cbiAgICB2YXIgdmFsaWRNb3ZlcyA9IGluUmFuZ2UuZmlsdGVyKHJhbmdlID0+IHtcbiAgICAgIHJldHVybiBpc1ZhbGlkTW92ZSh1bml0LCByYW5nZSk7XG4gICAgfSlcblxuICAgIC8vdGhpcy5zZXRTdGF0ZSh7X2xpZ2h0dXA6IHZhbGlkTW92ZXN9KTtcbiAgICBjb25zb2xlLmxvZygnYm9vcCcpXG4gICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgLy8gY29uc29sZS5sb2coJ3ZhbGlkIE1vdmVzOicpXG4gICAgLy8gY29uc29sZS5sb2codmFsaWRNb3Zlcyk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGBpblJhbmdlOiAke2luUmFuZ2V9YCk7XG4gICAgLy9jb25zb2xlLmxvZyhgdXRpbHM6ICR7VXRpbHMuc2hvd21lKCl9YCk7XG59XG5cbmZ1bmN0aW9uIGlzT25Cb2FyZChjb29yZHMpIHtcbiAgaWYgKCFjb29yZHMueCB8fCAhY29vcmRzLnkpIHJldHVybiBmYWxzZTtcbiAgdmFyIGNvb3Jkc1N0ciA9IGBbJHtjb29yZHMueX0sICR7Y29vcmRzLnh9XWBcbiAgLy9jb25zb2xlLmxvZygnY29vcmRzU3RyOicsIGNvb3Jkc1N0cik7XG4gIC8vY29uc29sZS5sb2coJ19ib2FyZDonLCBfYm9hcmQpO1xuICAvLyBjb25zb2xlLmxvZyhgb24gdGlsZSAke2Nvb3Jkc1N0cn1gLCBfYm9hcmRbY29vcmRzU3RyXSk7XG4gIHJldHVybiBjb29yZHMueCA+PSAwICYmIGNvb3Jkcy55ID49IDAgJiYgY29vcmRzLnggPCA2ICYmIGNvb3Jkcy55IDwgNjtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZE1vdmUodW5pdCwgY29vcmRzKSB7XG4gIHZhciBjb29yZHNTdHIgPSBgWyR7Y29vcmRzLnh9LCAke2Nvb3Jkcy55fV1gO1xuICB2YXIgdGFyZ2V0VW5pdCA9IF9ib2FyZFtjb29yZHNTdHJdO1xuXG4gIGlmICh0YXJnZXRVbml0KSB7XG4gICAgLy9jb25zb2xlLmxvZyhgdW5pdC5jb2xvcjogJHt1bml0LmNvbG9yfWApO1xuICAgIGNvbnNvbGUubG9nKGB0YXJnZXRVbml0LmNvbG9yOiAke3RhcmdldFVuaXQuY29sb3J9YCk7XG4gICAgaWYgKHVuaXQuY29sb3IgPT09IHRhcmdldFVuaXQuY29sb3IpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gaXNPbkJvYXJkKGNvb3Jkcyk7XG59XG5cbmZ1bmN0aW9uIGdhbWVPdmVyKG9wdGlvbnMpIHtcbiAgICBfZ2FtZU92ZXIgPSBfZ2FtZU92ZXJcbiAgICAgICAgLnNldCgnc3RhdHVzJywgdHJ1ZSlcbiAgICAgICAgLnNldCgnd2lubmVyJywgb3B0aW9ucy53aW5uZXIpXG4gICAgICAgIC5zZXQoJ3R5cGUnLCBvcHRpb25zLnR5cGUpO1xufVxuXG5BcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKHBheWxvYWQgPT4ge1xuICAgIGNvbnN0IGFjdGlvbiA9IHBheWxvYWQuYWN0aW9uO1xuICAgIGxldCBlbWl0RXZlbnQgPSB0cnVlO1xuXG4gICAgc3dpdGNoIChhY3Rpb24uYWN0aW9uVHlwZSkge1xuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuTUFLRV9NT1ZFOlxuICAgICAgICAgICAgZW1pdEV2ZW50ID0gbWFrZU1vdmUoXG4gICAgICAgICAgICAgICAgYWN0aW9uLmZyb20sIGFjdGlvbi50bywgYWN0aW9uLmNhcHR1cmUsIGFjdGlvbi5lbWl0TW92ZSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuU0hPV19NT1ZFUzpcbiAgICAgICAgICAgIGVtaXRFdmVudCA9IEdhbWVTdG9yZS5zaG93TW92ZXMoYWN0aW9uLnVuaXQsIGFjdGlvbi5mcm9tLCBhY3Rpb24uaW5SYW5nZSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuQ0hBTkdFX1BST01PVElPTjpcbiAgICAgICAgICAgIF9wcm9tb3Rpb24gPSBhY3Rpb24ucHJvbW90aW9uO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkRSQVc6XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5HQU1FX09WRVI6XG4gICAgICAgICAgICBnYW1lT3ZlcihhY3Rpb24ub3B0aW9ucyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuUkVNQVRDSDpcbiAgICAgICAgICAgIHNldEluaXRpYWxTdGF0ZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChlbWl0RXZlbnQpIHtcbiAgICAgICAgR2FtZVN0b3JlLmVtaXQoQ0hBTkdFX0VWRU5UKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZVN0b3JlO1xuIl19
