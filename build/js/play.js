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
		// 	board: state.board;
		// }
	},
	componentDidMount: function componentDidMount() {
		GameStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function componentWillUnmount() {
		GameStore.removeChangeListener(this._onChange);
	},
	_onChange: function _onChange() {

		this.setState({
			lightup: GameStore.getGameboardState().lightup
		});
	},
	render: function render() {
		var _this = this;

		var _ref = this;

		var state = _ref.state;
		var props = _ref.props;var board = state.board;var size = props.size;
		var board = state.board;
		var lightup = state.lightup;

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
								unit: board["[" + idx2 + ", " + idx1 + "]"] ? board["[" + idx2 + ", " + idx1 + "]"].unit : null,
								color: board["[" + idx2 + ", " + idx1 + "]"] ? board["[" + idx2 + ", " + idx1 + "]"].color : null,
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
			isSelected: false
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
		var _state = this.state;
		var side = _state.side;
		var isSelected = _state.isSelected;

		var boardState = GameStore.getGameboardState();
		var board = boardState.board;
		var lightup = boardState.lightup;
		var selected = boardState.selected;

		console.log("what things are before click: ", "unit ", unit, "position ", position, "color ", color, "side ", side, "isSelected ", isSelected, "selected", selected);
		if (unit) {
			if (!isSelected) {
				//check if the onclick unit has the same color as the player
				//then selected = true;
				//if(color === )

				this.setState({ isSelected: true });

				var ranges = [];
				var moves = behavior[unit][side];
				var pos = JSON.parse(position);
				Object.keys(moves).map(function (move) {
					move = JSON.parse(move);
					var x = pos[0] + move[0],
					    y = pos[1] + move[1];
					ranges.push({ x: x, y: y });
				});
				//console.log(behavior[unit]);
				GameActions.showMoves({ unit: unit, color: color }, pos, ranges);
			} else {}
			//this._flip();
		}
		//this is the condition where the player selects its own unit, and try to move to existing valid position
		else {
			console.log("we got here", selected);
			if (selected && Object.keys(lightup).length) {
				if (lightup[position]) {
					console.log("what is selected? ", selected);

					console.log("what is current unit and position? ", unit, position);
					Object.keys(lightup).forEach(function (unit) {
						console.log("what is looping ", lightup[unit]);
						lightup[unit] = false;
					});

					console.log("after remove color", lightup);
					GameActions.makeMove(selected.position, position, false);
					selected = null;
					this._flip();
					this.setState({ isSelected: false });
					console.log("after deselected for isSelected", isSelected);
					console.log("after deselected", selected);
				}
				//check if current position is in lightup
				//if it does, then remove the current unit and add it to designated position
				//set selected as false
				//this.state.side change to back (if it's front, vice versa)
				//clear lightup
			}
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

//if()

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

var _board = {},
    _lightup = {},
    _selected;

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
            board: _board,
            lightup: _lightup,
            selected: _selected
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
        if (!Object.keys(_lightup).length) {
            inRange.filter(function (range) {
                return isValidMove(unit, range);
            }).forEach(function (move) {
                var coordsStr = "[" + move.x + ", " + move.y + "]";
                _lightup[coordsStr] = true;
            });
            _selected = { position: from, unit: unit };
        } else {
            _lightup = {};
            _selected = null;
        }
        //this.setState({_lightup: validMoves});

        return true;
        //console.log(this.getState());
        // console.log('valid Moves:')
        // console.log(validMoves);
    }

});

function isOnBoard(coords) {
    if (!coords.hasOwnProperty("x") || !coords.hasOwnProperty("y")) {
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
    _selected = null;
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

function updateBoard(from, to) {
    console.log("what is from and to", from, to);

    //from = JSON.stringify(from).replace(/,/g, ', ');
    from = "[" + from[0] + ", " + from[1] + "]";
    //to = JSON.stringify(to).replace(/,/g, ', ');
    console.log("from", from);

    var unit = _board[from];
    console.log("what is the from unit", unit);
    _board[from] = null;
    _board[to] = unit;
    return _board;
}
function makeMove(from, to, capture, emitMove) {

    updateBoard(from, to);
    // const move = _chess.move({
    //     from: from,
    //     to: to,
    // });

    // if (!move) {
    //     // move is not valid, return false and don't emit any event.
    //     return false;
    // }

    // _turn = _chess.turn();
    // _check = _chess.in_check();
    // _lastMove = _lastMove.set('from', from).set('to', to);
    // _moves = _moves.isEmpty() || _moves.last().size === 2 ?
    //     _moves.push(List([move.san])) :
    //     _moves.update(_moves.size - 1, list => list.push(move.san));

    // if (capture || move.flags === 'e') {
    //     const capturedPiece = capture ||
    //         ChessPieces[_turn === 'w' ? 'P' : 'p']; // en passant

    //     _capturedPieces = _capturedPieces
    //         .update(_turn, list => list.push(capturedPiece));
    // }

    // if (_chess.game_over()) {
    //     const type = _chess.in_checkmate() ? 'checkmate' :
    //         _chess.in_stalemate() ? 'stalemate' :
    //         _chess.in_threefold_repetition() ? 'threefoldRepetition' :
    //         _chess.insufficient_material() ? 'insufficientMaterial' :
    //         _chess.in_draw() ? 'draw' : null;

    //     gameOver({
    //         winner: _turn === 'b' ? 'White' : 'Black',
    //         type: type
    //     });
    // }

    if (emitMove) {
        GameStore.emit(MOVE_EVENT, {
            from: from,
            to: to,
            capture: capture,
            board: _board
            //gameOver: _chess.game_over()
        });
    }

    return true;
}

// function showMoves(unit, from, inRange) {
//   console.log(unit);
//     console.log(from);

//     var validMoves = inRange.filter(range => {
//       return isValidMove(unit, range);
//     })

//     //this.setState({_lightup: validMoves});
//     console.log('boop')
//     console.log(this.state);
//     // console.log('valid Moves:')
//     // console.log(validMoves);

//     //console.log(`inRange: ${inRange}`);
//     //console.log(`utils: ${Utils.showme()}`);
// }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvcGxheS5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2tleU1pcnJvci5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9hY3Rpb25zL0NoYXRBY3Rpb25zLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2FjdGlvbnMvR2FtZUFjdGlvbnMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DYXB0dXJlZFBpZWNlcy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0NoYXQuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DaGVzc2JvYXJkLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2hlc3Nib2FyZEludGVyZmFjZS5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0Nsb2NrLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUJvYXJkLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUhlYWRlci5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0dhbWVJbnRlcmZhY2UuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lYm9hcmRJbnRlcmZhY2UuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9Nb2RhbC5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL1RhYmxlT2ZNb3Zlcy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hhdENvbnN0YW50cy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hlc3NQaWVjZXMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29uc3RhbnRzL0dhbWVDb25zdGFudHMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2dhbWUvYmVoYXZpb3IuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvaW8uanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvbWl4aW5zL21heWJlUmV2ZXJzZS5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9taXhpbnMvb25HYW1lQ2hhbmdlLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL3N0b3Jlcy9DaGF0U3RvcmUuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvc3RvcmVzL0dhbWVTdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7OztRQUVOLFVBQVU7O0lBQ1YsS0FBSywyQkFBTSxPQUFPOztJQUNsQixFQUFFLDJCQUFNLE1BQU07O0lBQ2QsYUFBYSwyQkFBTSw0QkFBNEI7O0FBRXRELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVwQyxLQUFLLENBQUMsTUFBTSxDQUNWLG9CQUFDLGFBQWEsSUFBQyxFQUFFLEVBQUUsRUFBRSxBQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sQUFBQyxHQUFHLEVBQ3pDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQ3JDLENBQUM7OztBQ2RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QU8sQ0FBQyxDQUFDO0FBQ3pCLGtCQUFNOztBQUFBLEFBRVYsYUFBSyxhQUFhLENBQUMsT0FBTztBQUN0QiwyQkFBZSxFQUFFLENBQUM7QUFDbEIsa0JBQU07O0FBQUEsQUFFVjtBQUNJLG1CQUFPLElBQUksQ0FBQztBQUFBLEtBQ25COztBQUVELFFBQUksU0FBUyxFQUFFO0FBQ1gsaUJBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDaEM7QUFDRCxXQUFPLElBQUksQ0FBQztDQUNmLENBQUMsQ0FBQzs7aUJBRVksU0FBUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnZXM2LXNoaW0nO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpbyBmcm9tICcuL2lvJztcbmltcG9ydCBHYW1lSW50ZXJmYWNlIGZyb20gJy4vY29tcG9uZW50cy9HYW1lSW50ZXJmYWNlJztcblxubGV0IHBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKCcvcGxheS8nLCAnJykuc3BsaXQoJy8nKTtcbnBhcmFtc1sxXSA9IHBhcnNlSW50KHBhcmFtc1sxXSwgMTApO1xucGFyYW1zWzJdID0gcGFyc2VJbnQocGFyYW1zWzJdLCAxMCk7XG5cblJlYWN0LnJlbmRlcihcbiAgPEdhbWVJbnRlcmZhY2UgaW89e2lvfSBwYXJhbXM9e3BhcmFtc30gLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKVxuKTsiLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE1IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG5cbmZ1bmN0aW9uIGNsYXNzTmFtZXMoKSB7XG5cdHZhciBjbGFzc2VzID0gJyc7XG5cdHZhciBhcmc7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0aWYgKCFhcmcpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGFyZyB8fCAnbnVtYmVyJyA9PT0gdHlwZW9mIGFyZykge1xuXHRcdFx0Y2xhc3NlcyArPSAnICcgKyBhcmc7XG5cdFx0fSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuXHRcdFx0Y2xhc3NlcyArPSAnICcgKyBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0fSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIGFyZykge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRpZiAoIWFyZy5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8ICFhcmdba2V5XSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNsYXNzZXMgKz0gJyAnICsga2V5O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gY2xhc3Nlcy5zdWJzdHIoMSk7XG59XG5cbi8vIHNhZmVseSBleHBvcnQgY2xhc3NOYW1lcyBmb3Igbm9kZSAvIGJyb3dzZXJpZnlcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG59XG5cbi8vIHNhZmVseSBleHBvcnQgY2xhc3NOYW1lcyBmb3IgUmVxdWlyZUpTXG5pZiAodHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdH0pO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnSW52YXJpYW50IFZpb2xhdGlvbjogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUga2V5TWlycm9yXG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCIuL2ludmFyaWFudFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGFuIGVudW1lcmF0aW9uIHdpdGgga2V5cyBlcXVhbCB0byB0aGVpciB2YWx1ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgIHZhciBDT0xPUlMgPSBrZXlNaXJyb3Ioe2JsdWU6IG51bGwsIHJlZDogbnVsbH0pO1xuICogICB2YXIgbXlDb2xvciA9IENPTE9SUy5ibHVlO1xuICogICB2YXIgaXNDb2xvclZhbGlkID0gISFDT0xPUlNbbXlDb2xvcl07XG4gKlxuICogVGhlIGxhc3QgbGluZSBjb3VsZCBub3QgYmUgcGVyZm9ybWVkIGlmIHRoZSB2YWx1ZXMgb2YgdGhlIGdlbmVyYXRlZCBlbnVtIHdlcmVcbiAqIG5vdCBlcXVhbCB0byB0aGVpciBrZXlzLlxuICpcbiAqICAgSW5wdXQ6ICB7a2V5MTogdmFsMSwga2V5MjogdmFsMn1cbiAqICAgT3V0cHV0OiB7a2V5MToga2V5MSwga2V5Mjoga2V5Mn1cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbnZhciBrZXlNaXJyb3IgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHJldCA9IHt9O1xuICB2YXIga2V5O1xuICAoXCJwcm9kdWN0aW9uXCIgIT09IFwiZGV2ZWxvcG1lbnRcIiA/IGludmFyaWFudChcbiAgICBvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSxcbiAgICAna2V5TWlycm9yKC4uLik6IEFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0LidcbiAgKSA6IGludmFyaWFudChvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSkpO1xuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0W2tleV0gPSBrZXk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWlycm9yO1xuIiwiaW1wb3J0IENoYXRDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0NoYXRDb25zdGFudHMnO1xuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcblxuY29uc3QgQ2hhdEFjdGlvbnMgPSB7XG4gIHRvZ2dsZVZpc2liaWxpdHkoKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IENoYXRDb25zdGFudHMuVE9HR0xFX1ZJU0lCSUxJVFlcbiAgICB9KTtcbiAgfSxcbiAgc3VibWl0TWVzc2FnZShtZXNzYWdlLCBjbGFzc05hbWUsIHJlY2VpdmVkKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IENoYXRDb25zdGFudHMuU1VCTUlUX01FU1NBR0UsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICByZWNlaXZlZDogcmVjZWl2ZWRcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdEFjdGlvbnM7IiwiaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0dhbWVDb25zdGFudHMnO1xuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcblxuY29uc3QgR2FtZUFjdGlvbnMgPSB7XG4gIG1ha2VNb3ZlKGZyb20sIHRvLCBjYXB0dXJlLCBlbWl0TW92ZSkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLk1BS0VfTU9WRSxcbiAgICAgIGZyb206IGZyb20sXG4gICAgICB0bzogdG8sXG4gICAgICBjYXB0dXJlOiBjYXB0dXJlLFxuICAgICAgZW1pdE1vdmU6IGVtaXRNb3ZlXG4gICAgfSk7XG4gIH0sXG4gIHNob3dNb3Zlcyh1bml0LCBmcm9tLCBpblJhbmdlKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuU0hPV19NT1ZFUyxcbiAgICAgIHVuaXQ6IHVuaXQsXG4gICAgICBmcm9tOiBmcm9tLFxuICAgICAgaW5SYW5nZTogaW5SYW5nZVxuICAgIH0pO1xuICB9LFxuICBkcmF3KCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLkRSQVdcbiAgICB9KTtcbiAgfSxcbiAgcmVtYXRjaCgpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5SRU1BVENIXG4gICAgfSk7XG4gIH0sXG4gIGdhbWVPdmVyKG9wdGlvbnMpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5HQU1FX09WRVIsXG4gICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgfSk7XG4gIH0sXG4gIGNoYW5nZVByb21vdGlvbihwcm9tb3Rpb24pIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5DSEFOR0VfUFJPTU9USU9OLFxuICAgICAgcHJvbW90aW9uOiBwcm9tb3Rpb25cbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZUFjdGlvbnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuXG5jb25zdCBDYXB0dXJlZFBpZWNlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG9uR2FtZUNoYW5nZV0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjYXB0dXJlZFBpZWNlczogR2FtZVN0b3JlLmdldENhcHR1cmVkUGllY2VzKClcbiAgICB9O1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY3AgPSB0aGlzLnN0YXRlLmNhcHR1cmVkUGllY2VzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjYXB0dXJlZC1waWVjZXNcIj5cbiAgICAgICAge2NwLm1hcCgocGllY2VzLCBjb2xvcikgPT4gKFxuICAgICAgICAgIDx1bCBrZXk9e2NvbG9yfT5cbiAgICAgICAgICAgIHtwaWVjZXMubWFwKChwaWVjZSwgaSkgPT4gPGxpIGtleT17aX0+e3BpZWNlfTwvbGk+KS50b0FycmF5KCl9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgKSkudG9BcnJheSgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgX29uR2FtZUNoYW5nZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNhcHR1cmVkUGllY2VzOiBHYW1lU3RvcmUuZ2V0Q2FwdHVyZWRQaWVjZXMoKVxuICAgIH0pO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FwdHVyZWRQaWVjZXM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBDaGF0U3RvcmUgZnJvbSAnLi4vc3RvcmVzL0NoYXRTdG9yZSc7XG5pbXBvcnQgQ2hhdEFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9DaGF0QWN0aW9ucyc7XG5cbmNvbnN0IENoYXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHRva2VuOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgc291bmRzRW5hYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIG9wZW5Nb2RhbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBDaGF0U3RvcmUuZ2V0U3RhdGUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGF0SGlkZGVuOiBzdGF0ZS5pc0NoYXRIaWRkZW4sXG4gICAgICBtZXNzYWdlczogc3RhdGUubWVzc2FnZXMsXG4gICAgICBtZXNzYWdlOiAnJyxcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLmlvLm9uKCdyZWNlaXZlLW1lc3NhZ2UnLCBkYXRhID0+IHtcbiAgICAgIENoYXRBY3Rpb25zLnN1Ym1pdE1lc3NhZ2UoZGF0YS5tZXNzYWdlLCBkYXRhLmNvbG9yICsgJyBsZWZ0JywgdHJ1ZSk7XG4gICAgICB0aGlzLl9tYXliZVBsYXlTb3VuZCgpO1xuICAgIH0pO1xuICAgIENoYXRTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25DaGF0U3RvcmVDaGFuZ2UpO1xuICAgIFxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDEzOTkpIENoYXRBY3Rpb25zLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgQ2hhdFN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25DaGF0U3RvcmVDaGFuZ2UpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjaGF0LXdyYXBwZXJcIlxuICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuc3RhdGUuaXNDaGF0SGlkZGVuID8gJ2hpZGRlbicgOiBudWxsfT5cbiAgICAgICAgXG4gICAgICAgIDxoND5DaGF0PC9oND5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiY2xvc2VcIlxuICAgICAgICAgICBvbkNsaWNrPXtDaGF0QWN0aW9ucy50b2dnbGVWaXNpYmlsaXR5fT5cbiAgICAgICAgICB4XG4gICAgICAgIDwvYT5cbiAgICAgICAgXG4gICAgICAgIDxhdWRpbyBwcmVsb2FkPVwiYXV0b1wiIHJlZj1cIm1zZ1NuZFwiPlxuICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiL3NuZC9tZXNzYWdlLm1wM1wiIC8+XG4gICAgICAgIDwvYXVkaW8+XG4gICAgICAgIFxuICAgICAgICA8dWwgaWQ9XCJjaGF0LWxpc3RcIiByZWY9XCJjaGF0XCI+XG4gICAgICAgICAge3RoaXMuc3RhdGUubWVzc2FnZXMubWFwKChtZXNzYWdlLCBpKSA9PiAoXG4gICAgICAgICAgICA8bGkga2V5PXtpfSBjbGFzc05hbWU9e21lc3NhZ2UuZ2V0KCdjbGFzc05hbWUnKX0+XG4gICAgICAgICAgICAgIHttZXNzYWdlLmdldCgnbWVzc2FnZScpfVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICApKS50b0FycmF5KCl9XG4gICAgICAgIDwvdWw+XG4gICAgICAgIFxuICAgICAgICA8c3Bhbj5Xcml0ZSB5b3VyIG1lc3NhZ2U6PC9zcGFuPlxuICAgICAgICBcbiAgICAgICAgPGZvcm0gaWQ9XCJjaGF0LWZvcm1cIlxuICAgICAgICAgICAgICBvblN1Ym1pdD17dGhpcy5fc3VibWl0TWVzc2FnZX0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgcmVmPVwibWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jb2xvcn1cbiAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uQ2hhbmdlTWVzc2FnZX0gLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgX29uQ2hhdFN0b3JlQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoQ2hhdFN0b3JlLmdldFN0YXRlKCksIHRoaXMuX3Njcm9sbENoYXQpO1xuICB9LFxuICBfb25DaGFuZ2VNZXNzYWdlKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlOiBlLnRhcmdldC52YWx1ZX0pO1xuICB9LFxuICBfc3VibWl0TWVzc2FnZShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHtpbywgdG9rZW4sIGNvbG9yLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMuc3RhdGUubWVzc2FnZTtcblxuICAgIGlmICghaXNPcHBvbmVudEF2YWlsYWJsZSkge1xuICAgICAgdGhpcy5yZWZzLm1lc3NhZ2UuZ2V0RE9NTm9kZSgpLmJsdXIoKTtcbiAgICAgIHRoaXMucHJvcHMub3Blbk1vZGFsKCdpbmZvJywgJ1NvcnJ5LCB5b3VyIG9wcG9uZW50IGlzIG5vdCBjb25uZWN0ZWQuICcgK1xuICAgICAgICAnWW91IGNhbuKAmHQgc2VuZCBtZXNzYWdlcy4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBDaGF0QWN0aW9ucy5zdWJtaXRNZXNzYWdlKG1lc3NhZ2UsIGNvbG9yICsgJyByaWdodCcsIGZhbHNlKTtcbiAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlOiAnJ30pO1xuXG4gICAgaW8uZW1pdCgnc2VuZC1tZXNzYWdlJywge1xuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgIHRva2VuOiB0b2tlblxuICAgIH0pO1xuICB9LFxuICBfc2Nyb2xsQ2hhdCgpIHtcbiAgICBjb25zdCBjaGF0Tm9kZSA9IHRoaXMucmVmcy5jaGF0LmdldERPTU5vZGUoKTtcbiAgICBjaGF0Tm9kZS5zY3JvbGxUb3AgPSBjaGF0Tm9kZS5zY3JvbGxIZWlnaHQ7XG4gIH0sXG4gIF9tYXliZVBsYXlTb3VuZCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zb3VuZHNFbmFibGVkKSB7XG4gICAgICB0aGlzLnJlZnMubXNnU25kLmdldERPTU5vZGUoKS5wbGF5KCk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdDsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcbmltcG9ydCBDaGVzc1BpZWNlcyBmcm9tICcuLi9jb25zdGFudHMvQ2hlc3NQaWVjZXMnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcbmltcG9ydCBtYXliZVJldmVyc2UgZnJvbSAnLi4vbWl4aW5zL21heWJlUmV2ZXJzZSc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQge1NlcSwgUmVwZWF0LCBMaXN0LCBTZXR9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmNvbnN0IEZJTEVTID0gU2VxLkluZGV4ZWQoJ2FiY2RlZmdoJyk7XG5jb25zdCBSQU5LUyA9IFNlcS5JbmRleGVkKCcxMjM0NTY3OCcpO1xuXG5jb25zdCBDaGVzc2JvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB0b2tlbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG1heWJlUGxheVNvdW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIGdhbWVPdmVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgbWF5YmVSZXZlcnNlXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBHYW1lU3RvcmUuZ2V0Q2hlc3Nib2FyZFN0YXRlKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZmVuOiBzdGF0ZS5mZW4sXG4gICAgICBtb3ZlRnJvbTogbnVsbCxcbiAgICAgIGxhc3RNb3ZlOiBzdGF0ZS5sYXN0TW92ZSxcbiAgICAgIGtpbmdJbkNoZWNrOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHtpbywgdG9rZW59ID0gdGhpcy5wcm9wcztcbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gICAgR2FtZVN0b3JlLm9uKCduZXctbW92ZScsIHRoaXMuX29uTmV3TW92ZSk7XG5cbiAgICBpby5vbignbW92ZScsIGRhdGEgPT4ge1xuICAgICAgR2FtZUFjdGlvbnMubWFrZU1vdmUoZGF0YS5mcm9tLCBkYXRhLnRvLCBkYXRhLmNhcHR1cmUsIGZhbHNlKTtcbiAgICAgIHRoaXMucHJvcHMubWF5YmVQbGF5U291bmQoKTtcblxuICAgICAgaWYgKCFkYXRhLmdhbWVPdmVyKSB7XG4gICAgICAgIHRoaXMuX3J1bkNsb2NrKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RpdGxlJylbMF07XG4gICAgICAgIHRpdGxlLnRleHQgPSAnKiAnICsgdGl0bGUudGV4dDtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpby5vbigncmVtYXRjaC1hY2NlcHRlZCcsICgpID0+IHRoaXMuc2V0U3RhdGUoe21vdmVGcm9tOiBudWxsfSkpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBHYW1lU3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xuICAgIEdhbWVTdG9yZS5vbignbmV3LW1vdmUnLCB0aGlzLl9vbk5ld01vdmUpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2NvbG9yLCBpc09wcG9uZW50QXZhaWxhYmxlLCBnYW1lT3Zlcn0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtmZW4sIG1vdmVGcm9tLCBsYXN0TW92ZSwga2luZ0luQ2hlY2t9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBmZW5BcnJheSA9IGZlbi5zcGxpdCgnICcpO1xuICAgIGNvbnN0IHBsYWNlbWVudCA9IGZlbkFycmF5WzBdO1xuICAgIGNvbnN0IGlzSXRNeVR1cm4gPSBmZW5BcnJheVsxXSA9PT0gY29sb3IuY2hhckF0KDApO1xuICAgIGNvbnN0IHJvd3MgPSB0aGlzLl9tYXliZVJldmVyc2UocGxhY2VtZW50LnNwbGl0KCcvJykpO1xuICAgIGNvbnN0IHJhbmtzID0gdGhpcy5fbWF5YmVSZXZlcnNlKFJBTktTLCAnd2hpdGUnKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPVwiY2hlc3Nib2FyZFwiPlxuICAgICAgICB7cm93cy5tYXAoKHBsYWNlbWVudCwgaSkgPT5cbiAgICAgICAgICA8Um93XG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICByYW5rPXtyYW5rcy5nZXQoaSl9XG4gICAgICAgICAgICBwbGFjZW1lbnQ9e3BsYWNlbWVudH1cbiAgICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICAgIGlzTW92ZWFibGU9e2lzSXRNeVR1cm4gJiYgaXNPcHBvbmVudEF2YWlsYWJsZSAmJiAhZ2FtZU92ZXJ9XG4gICAgICAgICAgICBtb3ZlRnJvbT17bW92ZUZyb219XG4gICAgICAgICAgICBsYXN0TW92ZT17bGFzdE1vdmV9XG4gICAgICAgICAgICBzZXRNb3ZlRnJvbT17dGhpcy5fc2V0TW92ZUZyb219XG4gICAgICAgICAgICBraW5nSW5DaGVjaz17a2luZ0luQ2hlY2t9XG4gICAgICAgICAgICB2YWxpZE1vdmVzPXtHYW1lU3RvcmUuZ2V0VmFsaWRNb3Zlcyhtb3ZlRnJvbSl9IC8+KX1cbiAgICAgIDwvdGFibGU+XG4gICAgKTtcbiAgfSxcbiAgX29uR2FtZUNoYW5nZShjYikge1xuICAgIGNvbnN0IHN0YXRlID0gR2FtZVN0b3JlLmdldENoZXNzYm9hcmRTdGF0ZSgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZmVuOiBzdGF0ZS5mZW4sXG4gICAgICBsYXN0TW92ZTogc3RhdGUubGFzdE1vdmUsXG4gICAgICBraW5nSW5DaGVjazogc3RhdGUuY2hlY2sgJiYgKHN0YXRlLmZlbi5zcGxpdCgnICcpWzFdID09PSAndycgPyAnSycgOiAnaycpXG4gICAgfSwgY2IpO1xuICB9LFxuICBfc2V0TW92ZUZyb20oc3F1YXJlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb3ZlRnJvbTogc3F1YXJlXG4gICAgfSk7XG4gIH0sXG4gIF9vbk5ld01vdmUobW92ZSkge1xuICAgIGNvbnN0IHtpbywgdG9rZW59ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLmVtaXQoJ25ldy1tb3ZlJywge1xuICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgbW92ZTogbW92ZVxuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCh0aGlzLnByb3BzLm1heWJlUGxheVNvdW5kLCAwKTtcbiAgfSxcbiAgX3J1bkNsb2NrKCkge1xuICAgIGNvbnN0IHtpbywgdG9rZW4sIGNvbG9yfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpby5lbWl0KCdjbG9jay1ydW4nLCB7XG4gICAgICB0b2tlbjogdG9rZW4sXG4gICAgICBjb2xvcjogY29sb3JcbiAgICB9KTtcbiAgfSxcbiAgX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKCkge1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0aXRsZScpWzBdO1xuICAgIHRpdGxlLnRleHQgPSB0aXRsZS50ZXh0LnJlcGxhY2UoJyogJywgJycpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKTtcbiAgfVxufSk7XG5cbmNvbnN0IFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBwcm9wVHlwZXM6IHtcbiAgICByYW5rOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWycxJywnMicsJzMnLCc0JywnNScsJzYnLCc3JywnOCddKS5pc1JlcXVpcmVkLFxuICAgIHBsYWNlbWVudDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIGlzTW92ZWFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgbW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFzdE1vdmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc2V0TW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAga2luZ0luQ2hlY2s6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbZmFsc2UsICdLJywgJ2snXSkuaXNSZXF1aXJlZCxcbiAgICB2YWxpZE1vdmVzOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihTZXQpLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbbWF5YmVSZXZlcnNlXSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3JhbmssIHBsYWNlbWVudCwgY29sb3J9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmaWxlcyA9IHRoaXMuX21heWJlUmV2ZXJzZShGSUxFUyk7XG4gICAgY29uc3QgcGllY2VzID0gdGhpcy5fbWF5YmVSZXZlcnNlKHBsYWNlbWVudC5sZW5ndGggPCA4ID9cbiAgICAgIFNlcShwbGFjZW1lbnQpLmZsYXRNYXAocGllY2UgPT4gKFxuICAgICAgICAvXlxcZCQvLnRlc3QocGllY2UpID8gUmVwZWF0KCctJywgcGFyc2VJbnQocGllY2UsIDEwKSkgOiBwaWVjZVxuICAgICAgKSkudG9BcnJheSgpIDpcblxuICAgICAgcGxhY2VtZW50LnNwbGl0KCcnKVxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHRyPlxuICAgICAgICB7cGllY2VzLm1hcCgocGllY2UsIGkpID0+XG4gICAgICAgICAgPENvbHVtblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgc3F1YXJlPXtmaWxlcy5nZXQoaSkgKyByYW5rfVxuICAgICAgICAgICAgcGllY2U9e3BpZWNlfVxuICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgJ3JhbmsnLCAncGxhY2VtZW50Jyl9IC8+KX1cbiAgICAgIDwvdHI+XG4gICAgKTtcbiAgfVxufSk7XG5cbmNvbnN0IENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBwcm9wVHlwZXM6IHtcbiAgICBzcXVhcmU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBwaWVjZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIGlzTW92ZWFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgbW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFzdE1vdmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc2V0TW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAga2luZ0luQ2hlY2s6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbZmFsc2UsICdLJywgJ2snXSkuaXNSZXF1aXJlZCxcbiAgICB2YWxpZE1vdmVzOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihTZXQpLmlzUmVxdWlyZWRcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge21vdmVGcm9tLCBsYXN0TW92ZSwgc3F1YXJlLCBjb2xvcixcbiAgICAgICAgICAgaXNNb3ZlYWJsZSwga2luZ0luQ2hlY2ssIHZhbGlkTW92ZXN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBwaWVjZSA9IENoZXNzUGllY2VzW3RoaXMucHJvcHMucGllY2VdO1xuICAgIGNvbnN0IHJneCA9IGNvbG9yID09PSAnd2hpdGUnID8gL15bS1FSQk5QXSQvIDogL15ba3FyYm5wXSQvO1xuICAgIGNvbnN0IGlzRHJhZ2dhYmxlID0gcmd4LnRlc3QodGhpcy5wcm9wcy5waWVjZSk7XG4gICAgY29uc3QgaXNEcm9wcGFibGUgPSBtb3ZlRnJvbSAmJiB2YWxpZE1vdmVzLmhhcyhzcXVhcmUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx0ZCBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBtb3ZlRnJvbSA9PT0gc3F1YXJlICYmICF2YWxpZE1vdmVzLmlzRW1wdHkoKSxcbiAgICAgICAgICAgIGZyb206IGxhc3RNb3ZlLmdldCgnZnJvbScpID09PSBzcXVhcmUsXG4gICAgICAgICAgICB0bzogbGFzdE1vdmUuZ2V0KCd0bycpID09PSBzcXVhcmUsXG4gICAgICAgICAgICBkcm9wcGFibGU6IGlzRHJvcHBhYmxlXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgb25DbGljaz17IXBpZWNlID8gdGhpcy5fb25DbGlja1NxdWFyZSA6IG51bGx9XG4gICAgICAgICAgb25EcmFnT3Zlcj17aXNEcm9wcGFibGUgPyB0aGlzLl9vbkRyYWdPdmVyIDogbnVsbH1cbiAgICAgICAgICBvbkRyb3A9e2lzRHJvcHBhYmxlID8gdGhpcy5fb25Ecm9wIDogbnVsbH0+XG5cbiAgICAgICAge3BpZWNlID9cbiAgICAgICAgICA8YSBjbGFzc05hbWU9e2tpbmdJbkNoZWNrID09PSB0aGlzLnByb3BzLnBpZWNlID8gJ2luLWNoZWNrJyA6IG51bGx9XG4gICAgICAgICAgICAgb25DbGljaz17dGhpcy5fb25DbGlja1NxdWFyZX1cbiAgICAgICAgICAgICBvbkRyYWdTdGFydD17dGhpcy5fb25EcmFnU3RhcnR9XG4gICAgICAgICAgICAgZHJhZ2dhYmxlPXtpc0RyYWdnYWJsZSAmJiBpc01vdmVhYmxlfT5cbiAgICAgICAgICAgIHtwaWVjZX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDpudWxsfVxuICAgICAgPC90ZD5cbiAgICApO1xuICB9LFxuICBfb25DbGlja1NxdWFyZSgpIHtcbiAgICBjb25zdCB7aXNNb3ZlYWJsZSwgY29sb3IsIG1vdmVGcm9tLCBzcXVhcmUsIHBpZWNlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgcmd4ID0gY29sb3IgPT09ICd3aGl0ZScgPyAvXltLUVJCTlBdJC8gOiAvXltrcXJibnBdJC87XG5cbiAgICBpZiAoIWlzTW92ZWFibGUgfHwgKCFtb3ZlRnJvbSAmJiAhcmd4LnRlc3QocGllY2UpKSlcbiAgICAgIHJldHVybjtcbiAgICBlbHNlIGlmIChtb3ZlRnJvbSAmJiBtb3ZlRnJvbSA9PT0gc3F1YXJlKVxuICAgICAgdGhpcy5wcm9wcy5zZXRNb3ZlRnJvbShudWxsKTtcbiAgICBlbHNlIGlmIChyZ3gudGVzdChwaWVjZSkpXG4gICAgICB0aGlzLnByb3BzLnNldE1vdmVGcm9tKHNxdWFyZSk7XG4gICAgZWxzZVxuICAgICAgR2FtZUFjdGlvbnMubWFrZU1vdmUobW92ZUZyb20sIHNxdWFyZSwgQ2hlc3NQaWVjZXNbcGllY2VdLCB0cnVlKTtcbiAgfSxcbiAgX29uRHJhZ1N0YXJ0KGUpIHtcbiAgICBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIC8vIHNldERhdGEgaXMgcmVxdWlyZWQgYnkgZmlyZWZveFxuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCAnJyk7XG5cbiAgICB0aGlzLnByb3BzLnNldE1vdmVGcm9tKHRoaXMucHJvcHMuc3F1YXJlKTtcbiAgfSxcbiAgX29uRHJhZ092ZXIoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICB9LFxuICBfb25Ecm9wKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qge21vdmVGcm9tLCBzcXVhcmUsIHBpZWNlfSA9IHRoaXMucHJvcHM7XG4gICAgR2FtZUFjdGlvbnMubWFrZU1vdmUobW92ZUZyb20sIHNxdWFyZSwgQ2hlc3NQaWVjZXNbcGllY2VdLCB0cnVlKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENoZXNzYm9hcmQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuaW1wb3J0IENoZXNzYm9hcmQgZnJvbSAnLi9DaGVzc2JvYXJkJztcbmltcG9ydCBDYXB0dXJlZFBpZWNlcyBmcm9tICcuL0NhcHR1cmVkUGllY2VzJztcbmltcG9ydCBUYWJsZU9mTW92ZXMgZnJvbSAnLi9UYWJsZU9mTW92ZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5jb25zdCBDaGVzc2JvYXJkSW50ZXJmYWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB0b2tlbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHNvdW5kc0VuYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgZ2FtZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG9uR2FtZUNoYW5nZV0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiBHYW1lU3RvcmUuZ2V0U3RhdGUoKTtcbiAgfSxcbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLmdhbWVPdmVyLmdldCgnc3RhdHVzJykgJiZcbiAgICAgICAgIXByZXZQcm9wcy5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpKSB7XG4gICAgICB0aGlzLnByb3BzLm9wZW5Nb2RhbCgnaW5mbycsIHRoaXMuX2dldEdhbWVPdmVyTWVzc2FnZSgpKTtcbiAgICB9XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7cHJvbW90aW9uLCB0dXJuLCBnYW1lT3ZlciwgY2hlY2t9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiYm9hcmQtbW92ZXMtd3JhcHBlclwiIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XG4gICAgICAgIFxuICAgICAgICA8YXVkaW8gcHJlbG9hZD1cImF1dG9cIiByZWY9XCJtb3ZlU25kXCI+XG4gICAgICAgICAgPHNvdXJjZSBzcmM9XCIvc25kL21vdmUubXAzXCIgLz5cbiAgICAgICAgPC9hdWRpbz5cbiAgICAgICAgPGF1ZGlvIHByZWxvYWQ9XCJhdXRvXCIgcmVmPVwiY2hlY2tTbmRcIj5cbiAgICAgICAgICA8c291cmNlIHNyYz1cIi9zbmQvY2hlY2subXAzXCIgLz5cbiAgICAgICAgPC9hdWRpbz5cblxuICAgICAgICA8ZGl2IGlkPVwiYm9hcmQtd3JhcHBlclwiPlxuICAgICAgICAgIDxDYXB0dXJlZFBpZWNlcyAvPlxuICAgICAgICAgIDxDaGVzc2JvYXJkXG4gICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCAnc291bmRzRW5hYmxlZCcsICdnYW1lT3ZlcicpfVxuICAgICAgICAgICAgZ2FtZU92ZXI9e2dhbWVPdmVyLmdldCgnc3RhdHVzJyl9XG4gICAgICAgICAgICBtYXliZVBsYXlTb3VuZD17dGhpcy5fbWF5YmVQbGF5U291bmR9IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxUYWJsZU9mTW92ZXMgLz5cblxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwcm9tb3Rpb25cIj5cbiAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8c3Bhbj5Qcm9tb3Rpb246IDwvc3Bhbj5cbiAgICAgICAgICAgIDxzZWxlY3QgdmFsdWU9e3Byb21vdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uUHJvbW90aW9uQ2hhbmdlfT5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInFcIj5RdWVlbjwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiclwiPlJvb2s8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJcIj5CaXNob3A8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm5cIj5LbmlnaHQ8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmZWVkYmFja1wiPlxuICAgICAgICAgIHshZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSA/IFxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb25cIj5cbiAgICAgICAgICAgICAgICB7LyogRiAtPiB3aGl0ZSBraW5nLCBmIC0+IGJsYWNrIGtpbmcqL1xuICAgICAgICAgICAgICAgICAgdHVybiA9PT0gJ3cnID8gJ0YnIDogJ2YnfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIHtgJHt0dXJuID09PSAndycgPyAnV2hpdGUnIDogJ0JsYWNrJ30gdG8gbW92ZS5gfVxuICAgICAgICAgICAgICB7Y2hlY2sgPyA8c3Ryb25nPiBDaGVjay48L3N0cm9uZz4gOiBudWxsfVxuICAgICAgICAgICAgPC9zcGFuPiA6XG5cbiAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb25cIj5cbiAgICAgICAgICAgICAgICB7Z2FtZU92ZXIuZ2V0KCd3aW5uZXInKSA9PT0gJ1doaXRlJyA/ICdGJyA6ICdmJ31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB7dGhpcy5fZ2V0R2FtZU92ZXJNZXNzYWdlKCl9XG4gICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShHYW1lU3RvcmUuZ2V0U3RhdGUoKSk7XG4gIH0sXG4gIF9vblByb21vdGlvbkNoYW5nZShlKSB7XG4gICAgR2FtZUFjdGlvbnMuY2hhbmdlUHJvbW90aW9uKGUudGFyZ2V0LnZhbHVlKTtcbiAgfSxcbiAgX21heWJlUGxheVNvdW5kKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnNvdW5kc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMucmVmc1t0aGlzLnN0YXRlLmNoZWNrID8gJ2NoZWNrU25kJyA6ICdtb3ZlU25kJ10uZ2V0RE9NTm9kZSgpLnBsYXkoKTtcbiAgICB9XG4gIH0sXG4gIF9nZXRHYW1lT3Zlck1lc3NhZ2UoKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMucHJvcHMuZ2FtZU92ZXIuZ2V0KCd0eXBlJyk7XG4gICAgY29uc3Qgd2lubmVyID0gdGhpcy5wcm9wcy5nYW1lT3Zlci5nZXQoJ3dpbm5lcicpO1xuICAgIGNvbnN0IGxvc2VyID0gd2lubmVyID09PSAnV2hpdGUnID8gJ0JsYWNrJyA6ICdXaGl0ZSc7XG5cbiAgICByZXR1cm4gdHlwZSA9PT0gJ2NoZWNrbWF0ZScgPyBgQ2hlY2ttYXRlLiAke3dpbm5lcn0gd2lucyFgIDpcbiAgICAgIHR5cGUgPT09ICd0aW1lb3V0JyA/IGAke2xvc2VyfeKAmHMgdGltZSBpcyBvdXQuICR7d2lubmVyfSB3aW5zIWAgOlxuICAgICAgdHlwZSA9PT0gJ3Jlc2lnbicgPyBgJHtsb3Nlcn0gaGFzIHJlc2lnbmVkLiAke3dpbm5lcn0gd2lucyFgIDpcbiAgICAgIHR5cGUgPT09ICdkcmF3JyA/ICdEcmF3LicgOlxuICAgICAgdHlwZSA9PT0gJ3N0YWxlbWF0ZScgPyAnRHJhdyAoU3RhbGVtYXRlKS4nIDpcbiAgICAgIHR5cGUgPT09ICd0aHJlZWZvbGRSZXBldGl0aW9uJyA/ICdEcmF3IChUaHJlZWZvbGQgUmVwZXRpdGlvbikuJyA6XG4gICAgICB0eXBlID09PSAnaW5zdWZmaWNpZW50TWF0ZXJpYWwnID8gJ0RyYXcgKEluc3VmZmljaWVudCBNYXRlcmlhbCknIDogJyc7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDaGVzc2JvYXJkSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG5cbmNvbnN0IFB1cmVSZW5kZXJNaXhpbiA9IFJlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW47XG5cbmNvbnN0IENsb2NrID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBwYXJhbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IFtfLCB0aW1lLCBpbmNdID0gdGhpcy5wcm9wcy5wYXJhbXM7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIHdoaXRlOiB0aW1lICogNjAsXG4gICAgICBibGFjazogdGltZSAqIDYwLFxuICAgICAgaW5jOiBpbmMsXG4gICAgICBjb3VudGRvd246IG51bGxcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBpbyA9IHRoaXMucHJvcHMuaW87XG5cbiAgICBpby5vbignY291bnRkb3duJywgZGF0YSA9PiB0aGlzLnNldFN0YXRlKHtcbiAgICAgIFtkYXRhLmNvbG9yXTogZGF0YS50aW1lLFxuICAgICAgY291bnRkb3duOiBkYXRhLmNvbG9yXG4gICAgfSkpO1xuXG4gICAgaW8ub24oJ2NvdW50ZG93bi1nYW1lb3ZlcicsIGRhdGEgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y291bnRkb3duOiBudWxsfSk7XG4gICAgICBHYW1lQWN0aW9ucy5nYW1lT3Zlcih7XG4gICAgICAgIHR5cGU6ICd0aW1lb3V0JyxcbiAgICAgICAgd2lubmVyOiBkYXRhLmNvbG9yID09PSAnYmxhY2snID8gJ1doaXRlJyA6ICdCbGFjaydcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtYWNjZXB0ZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgd2hpdGU6IHRoaXMucHJvcHMucGFyYW1zWzFdICogNjAsXG4gICAgICAgIGJsYWNrOiB0aGlzLnByb3BzLnBhcmFtc1sxXSAqIDYwXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgaWQ9XCJjbG9ja1wiPlxuICAgICAgICA8VGltZXJcbiAgICAgICAgICBjb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICB0aW1lPXt0aGlzLnN0YXRlLndoaXRlfVxuICAgICAgICAgIGNvdW50ZG93bj17dGhpcy5zdGF0ZS5jb3VudGRvd259IC8+XG4gICAgICAgIDxUaW1lclxuICAgICAgICAgIGNvbG9yPVwiYmxhY2tcIlxuICAgICAgICAgIHRpbWU9e3RoaXMuc3RhdGUuYmxhY2t9XG4gICAgICAgICAgY291bnRkb3duPXt0aGlzLnN0YXRlLmNvdW50ZG93bn0gLz5cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufSk7XG5cbmNvbnN0IFRpbWVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHt0aW1lLCBjb2xvciwgY291bnRkb3dufSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWluID0gTWF0aC5mbG9vcih0aW1lIC8gNjApO1xuICAgIGNvbnN0IHNlYyA9IHRpbWUgJSA2MDtcbiAgICBjb25zdCB0aW1lTGVmdCA9IGAke21pbn06JHtzZWMgPCAxMCA/ICcwJyArIHNlYyA6IHNlY31gO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9e2NvbG9yICsgKGNvbG9yID09PSBjb3VudGRvd24gPyAnIHRpY2tpbmcnIDogJycpfT5cbiAgICAgICAge3RpbWVMZWZ0fVxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2xvY2s7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG4vL2ltcG9ydCBDaGVzc1BpZWNlcyBmcm9tICcuLi9jb25zdGFudHMvQ2hlc3NQaWVjZXMnO1xuLy9pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuLy9pbXBvcnQgbWF5YmVSZXZlcnNlIGZyb20gJy4uL21peGlucy9tYXliZVJldmVyc2UnO1xuaW1wb3J0IGJlaGF2aW9yIGZyb20gJy4uL2dhbWUvYmVoYXZpb3InO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBHYW1lQm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXG5cdH0sXG5cdG1peGluczogW10sXG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcblx0XHQvL3JldHVybiBudWxsO1xuXHRcdHRoaXMuc3RhdGUgPSBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKTtcblx0XHRjb25zb2xlLmxvZyhcInN0YXRlPyBcIiwgdGhpcy5zdGF0ZSk7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGU7XG5cdFx0Ly8ge1xuXHRcdC8vIFx0Ym9hcmQ6IHN0YXRlLmJvYXJkO1xuXHRcdC8vIH1cblx0fSxcblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0R2FtZVN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuX29uQ2hhbmdlKTtcblx0fSxcblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0R2FtZVN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuX29uQ2hhbmdlKTtcblx0fSxcblx0X29uQ2hhbmdlKCkge1xuXHRcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGxpZ2h0dXA6IEdhbWVTdG9yZS5nZXRHYW1lYm9hcmRTdGF0ZSgpLmxpZ2h0dXBcblx0XHR9KTtcblx0fSxcblx0cmVuZGVyKCkge1xuXHRcdHZhciB7c3RhdGUsIHByb3BzfSA9IHRoaXMsIHtib2FyZH0gPSBzdGF0ZSwge3NpemV9ID0gcHJvcHM7XG5cdFx0dmFyIHtib2FyZCwgbGlnaHR1cH0gPSBzdGF0ZTtcblxuXG5cdFx0dmFyIGNlbGxBcnJheSA9IFtdO1xuXHRcdGZvciAodmFyIGk9MDsgaTxzaXplOyBpKyspIHtcblx0XHRcdHZhciByb3cgPSBbXTtcblx0XHRcdGZvciAodmFyIGo9MDsgajxzaXplOyBqKyspIHtcblx0XHRcdFx0cm93LnB1c2goe3g6aiwgeTppfSlcblx0XHRcdH1cblx0XHRcdGNlbGxBcnJheS5wdXNoKHJvdyk7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cblx0XHRcdDx0YWJsZSBjbGFzc05hbWU9XCJib2FyZFwiPlxuXHRcdFx0e2NlbGxBcnJheS5tYXAoKHJvdywgaWR4MSkgPT4gXG5cdFx0XHRcdDx0cj5cblx0XHRcdFx0XHR7cm93Lm1hcCgoY2VsbCwgaWR4MikgPT5cblx0XHRcdFx0XHRcdDx0ZCBwb3NpdGlvbj17YFske2lkeDJ9LCAke2lkeDF9XWB9PlxuXHRcdFx0XHRcdFx0XHQ8Q2VsbCByZWY9e2BbJHtpZHgyfSwgJHtpZHgxfV1gfVx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0IHBvc2l0aW9uPXtgWyR7aWR4Mn0sICR7aWR4MX1dYH0gXG5cdFx0XHRcdFx0XHRcdFx0dW5pdD17Ym9hcmRbYFske2lkeDJ9LCAke2lkeDF9XWBdID8gYm9hcmRbYFske2lkeDJ9LCAke2lkeDF9XWBdLnVuaXQgOiBudWxsfSBcblx0XHRcdFx0XHRcdFx0XHRjb2xvcj17Ym9hcmRbYFske2lkeDJ9LCAke2lkeDF9XWBdID8gYm9hcmRbYFske2lkeDJ9LCAke2lkeDF9XWBdLmNvbG9yIDogbnVsbH1cblx0XHRcdFx0XHRcdFx0XHRsaXR1cD17bGlnaHR1cFtgWyR7aWR4Mn0sICR7aWR4MX1dYF19XG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5fb25DZWxsQ2xpY2t9Lz5cblx0XHRcdFx0XHRcdDwvdGQ+XG5cdFx0XHRcdFx0KX1cblx0XHRcdFx0PC90cj5cblx0XHRcdFx0KX1cblx0XHQ8L3RhYmxlPlxuXHRcdCk7XG5cdH1cblxufSk7XG5cblxuY29uc3QgQ2VsbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgXHQgcmV0dXJuIHtcbiAgICBcdCBcdHNpZGU6ICdmcm9udCcsXG4gICAgXHQgXHRpc1NlbGVjdGVkOiBmYWxzZVxuICAgIFx0IH07XG4gIFx0fSxcbiAgXHRjb21wb25lbnREaWRNb3VudCgpIHtcblxuXHRcdCAvL2NvbnNvbGUubG9nKFwicG9zaXRpb24gaXMgXCIsIHRoaXMucHJvcHMucG9zaXRpb24pO1xuXHRcdFxuXHR9LFxuXG5cdGNvbXBvbmVudFdpbGxNb3VudCgpIHtcblx0XHRcblx0XHRcblx0XHRcblx0fSxcblx0bWl4aW5zOiBbXSxcblxuXHRfb25DbGlja1NxdWFyZSgpIHtcblxuXHRcdGNvbnN0IHt1bml0LCBwb3NpdGlvbiwgY29sb3J9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCB7c2lkZSwgaXNTZWxlY3RlZH0gPSB0aGlzLnN0YXRlO1xuXHRcdHZhciBib2FyZFN0YXRlID0gR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCk7XG5cdFx0dmFyIHtib2FyZCwgbGlnaHR1cCwgc2VsZWN0ZWR9ID0gYm9hcmRTdGF0ZTtcblxuXHRcdGNvbnNvbGUubG9nKFwid2hhdCB0aGluZ3MgYXJlIGJlZm9yZSBjbGljazogXCIsIFwidW5pdCBcIiwgdW5pdCwgXCJwb3NpdGlvbiBcIiwgcG9zaXRpb24sICdjb2xvciAnLCBjb2xvciwgJ3NpZGUgJywgc2lkZSwgXCJpc1NlbGVjdGVkIFwiLCBpc1NlbGVjdGVkLCBcInNlbGVjdGVkXCIsIHNlbGVjdGVkKTtcblx0XHRpZiAodW5pdCkge1xuXHRcdFx0aWYgKCFpc1NlbGVjdGVkKSB7XG5cdFx0XHRcdC8vY2hlY2sgaWYgdGhlIG9uY2xpY2sgdW5pdCBoYXMgdGhlIHNhbWUgY29sb3IgYXMgdGhlIHBsYXllclxuXHRcdFx0XHQvL3RoZW4gc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0XHQvL2lmKGNvbG9yID09PSApXG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtpc1NlbGVjdGVkOiB0cnVlfSk7XHRcblxuXHRcdFx0XHR2YXIgcmFuZ2VzID0gW107XG5cdFx0XHRcdHZhciBtb3ZlcyA9IGJlaGF2aW9yW3VuaXRdW3NpZGVdO1xuXHRcdFx0XHR2YXIgcG9zID0gSlNPTi5wYXJzZShwb3NpdGlvbik7XG5cdFx0XHRcdE9iamVjdC5rZXlzKG1vdmVzKS5tYXAoZnVuY3Rpb24obW92ZSl7XG5cdFx0XHRcdFx0bW92ZSA9IEpTT04ucGFyc2UobW92ZSk7XG5cdFx0XHRcdFx0dmFyIHggPSAgcG9zWzBdICsgbW92ZVswXSwgXG5cdFx0XHRcdFx0XHR5ID0gIHBvc1sxXSArIG1vdmVbMV07XG5cdFx0XHRcdFx0cmFuZ2VzLnB1c2goe3g6IHgsIHk6IHl9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coYmVoYXZpb3JbdW5pdF0pO1xuXHRcdFx0XHRHYW1lQWN0aW9ucy5zaG93TW92ZXMoeyB1bml0OiB1bml0LCBjb2xvcjogY29sb3IgfSwgcG9zLCByYW5nZXMpO1xuXG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Ly9pZigpXG5cdFx0XHR9XG5cdFx0XHQvL3RoaXMuX2ZsaXAoKTtcblx0XHR9XG5cdFx0Ly90aGlzIGlzIHRoZSBjb25kaXRpb24gd2hlcmUgdGhlIHBsYXllciBzZWxlY3RzIGl0cyBvd24gdW5pdCwgYW5kIHRyeSB0byBtb3ZlIHRvIGV4aXN0aW5nIHZhbGlkIHBvc2l0aW9uXG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIndlIGdvdCBoZXJlXCIsIHNlbGVjdGVkKTtcblx0XHRcdGlmIChzZWxlY3RlZCAmJiBPYmplY3Qua2V5cyhsaWdodHVwKS5sZW5ndGgpIHtcblx0XHRcdFx0aWYobGlnaHR1cFtwb3NpdGlvbl0pe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwid2hhdCBpcyBzZWxlY3RlZD8gXCIsIHNlbGVjdGVkKTtcblxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwid2hhdCBpcyBjdXJyZW50IHVuaXQgYW5kIHBvc2l0aW9uPyBcIiwgdW5pdCwgcG9zaXRpb24pO1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKGxpZ2h0dXApLmZvckVhY2goZnVuY3Rpb24odW5pdCkgeyBcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwid2hhdCBpcyBsb29waW5nIFwiLCBsaWdodHVwW3VuaXRdKTtcblx0XHRcdFx0XHRcdGxpZ2h0dXBbdW5pdF0gPSBmYWxzZSB9KTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImFmdGVyIHJlbW92ZSBjb2xvclwiLCBsaWdodHVwKTtcblx0XHRcdFx0XHRHYW1lQWN0aW9ucy5tYWtlTW92ZShzZWxlY3RlZC5wb3NpdGlvbiwgcG9zaXRpb24sIGZhbHNlKTtcblx0XHRcdFx0XHRzZWxlY3RlZCA9IG51bGw7XG5cdFx0XHRcdFx0dGhpcy5fZmxpcCgpO1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2lzU2VsZWN0ZWQ6IGZhbHNlfSk7XHRcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImFmdGVyIGRlc2VsZWN0ZWQgZm9yIGlzU2VsZWN0ZWRcIiwgaXNTZWxlY3RlZCk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJhZnRlciBkZXNlbGVjdGVkXCIsIHNlbGVjdGVkKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0Ly9jaGVjayBpZiBjdXJyZW50IHBvc2l0aW9uIGlzIGluIGxpZ2h0dXBcblx0XHRcdC8vaWYgaXQgZG9lcywgdGhlbiByZW1vdmUgdGhlIGN1cnJlbnQgdW5pdCBhbmQgYWRkIGl0IHRvIGRlc2lnbmF0ZWQgcG9zaXRpb25cblx0XHRcdC8vc2V0IHNlbGVjdGVkIGFzIGZhbHNlXG5cdFx0XHQvL3RoaXMuc3RhdGUuc2lkZSBjaGFuZ2UgdG8gYmFjayAoaWYgaXQncyBmcm9udCwgdmljZSB2ZXJzYSlcblx0XHRcdC8vY2xlYXIgbGlnaHR1cFxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRfZmxpcCgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgc2lkZTogKHRoaXMuc3RhdGUuc2lkZSA9PT0gJ2Zyb250JykgPyAnYmFjaycgOiAnZnJvbnQnIH0pO1xuXHR9LFxuXG5cblx0cmVuZGVyKCl7XG5cdFx0dmFyIHt1bml0LCBjb2xvciwgbGl0dXB9ID0gdGhpcy5wcm9wcztcblxuXHRcdHZhciB7c2lkZX0gPSB0aGlzLnN0YXRlO1xuXG5cblx0XHR2YXIgY3hPYmogPSB7XHRcblx0XHRcdHVuaXQ6ICEhdW5pdCxcblx0XHRcdGxpdHVwOiBsaXR1cFxuXHRcdH07XG5cdFx0Y3hPYmpbc2lkZV0gPSB0cnVlO1xuXHRcdGlmICh1bml0KSB7XG5cdFx0XHRjeE9ialt1bml0XSA9IHRydWU7XG5cdFx0XHRjeE9ialtjb2xvcl0gPSB0cnVlO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2N4KGN4T2JqKX1cblx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLl9vbkNsaWNrU3F1YXJlfT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7Qm9hcmQ6IEdhbWVCb2FyZCwgQ2VsbDogQ2VsbH07IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBDbG9jayBmcm9tICcuL0Nsb2NrJztcbmltcG9ydCBDaGF0U3RvcmUgZnJvbSAnLi4vc3RvcmVzL0NoYXRTdG9yZSc7XG5pbXBvcnQgQ2hhdEFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9DaGF0QWN0aW9ucyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmNvbnN0IEdhbWVIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHBhcmFtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgb3Blbk1vZGFsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdhbWVPdmVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbl0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiBvbWl0KENoYXRTdG9yZS5nZXRTdGF0ZSgpLCAnbWVzc2FnZXMnKTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgQ2hhdFN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYXRDaGFuZ2UpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBDaGF0U3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYXRDaGFuZ2UpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXMsIGdhbWVPdmVyLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdW5zZWVuQ291bnQgPSB0aGlzLnN0YXRlLnVuc2VlbkNvdW50O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cblxuICAgICAgICA8Q2xvY2tcbiAgICAgICAgICBpbz17aW99XG4gICAgICAgICAgcGFyYW1zPXtwYXJhbXN9IC8+XG5cbiAgICAgICAgPHNwYW4gaWQ9XCJnYW1lLXR5cGVcIj5cbiAgICAgICAgICB7YCR7cGFyYW1zWzFdfXwke3BhcmFtc1syXX1gfVxuICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuXCIgaHJlZj1cIi9cIj5OZXcgZ2FtZTwvYT5cblxuICAgICAgICB7IWdhbWVPdmVyICYmIGlzT3Bwb25lbnRBdmFpbGFibGUgP1xuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tLXJlZCByZXNpZ25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9vblJlc2lnbn0+XG4gICAgICAgICAgICBSZXNpZ25cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDpnYW1lT3ZlciA/XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi0tcmVkIHJlbWF0Y2hcIlxuICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uUmVtYXRjaH0+XG4gICAgICAgICAgICBSZW1hdGNoXG4gICAgICAgICAgPC9hPlxuICAgICAgICA6bnVsbH1cblxuICAgICAgICA8YSBpZD1cImNoYXQtaWNvblwiXG4gICAgICAgICAgIG9uQ2xpY2s9e0NoYXRBY3Rpb25zLnRvZ2dsZVZpc2liaWxpdHl9PlxuICAgICAgICAgIHt1bnNlZW5Db3VudCA/XG4gICAgICAgICAgICA8c3BhbiBpZD1cImNoYXQtY291bnRlclwiPlxuICAgICAgICAgICAgICB7dW5zZWVuQ291bnQgPCA5ID8gdW5zZWVuQ291bnQgOiAnOSsnfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDpudWxsfVxuICAgICAgICAgIDxpbWcgc3JjPVwiL2ltZy9jaGF0LnN2Z1wiXG4gICAgICAgICAgICAgICB3aWR0aD1cIjUwXCJcbiAgICAgICAgICAgICAgIGhlaWdodD1cIjUwXCIgLz5cbiAgICAgICAgICBDaGF0XG4gICAgICAgIDwvYT5cbiAgICAgIDwvaGVhZGVyPlxuICAgICk7XG4gIH0sXG4gIF9vbkNoYXRDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShvbWl0KENoYXRTdG9yZS5nZXRTdGF0ZSgpLCAnbWVzc2FnZXMnKSk7XG4gIH0sXG4gIF9vblJlc2lnbigpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtcywgY29sb3J9ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLmVtaXQoJ3Jlc2lnbicsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICBjb2xvcjogY29sb3JcbiAgICB9KTtcbiAgfSxcbiAgX29uUmVtYXRjaCgpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtcywgb3Blbk1vZGFsLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWlzT3Bwb25lbnRBdmFpbGFibGUpIHtcbiAgICAgIG9wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9wcG9uZW50IGhhcyBkaXNjb25uZWN0ZWQuIFlvdSBuZWVkIHRvICcgK1xuICAgICAgICAnZ2VuZXJhdGUgYSBuZXcgbGluay4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpby5lbWl0KCdyZW1hdGNoLW9mZmVyJywge1xuICAgICAgdG9rZW46IHBhcmFtc1swXVxuICAgIH0pO1xuICAgIG9wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9mZmVyIGhhcyBiZWVuIHNlbnQuJyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lSGVhZGVyOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZUhlYWRlciBmcm9tICcuL0dhbWVIZWFkZXInO1xuaW1wb3J0IENoYXQgZnJvbSAnLi9DaGF0JztcbmltcG9ydCBNb2RhbCBmcm9tICcuL01vZGFsJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgQ2hlc3Nib2FyZEludGVyZmFjZSBmcm9tICcuL0NoZXNzYm9hcmRJbnRlcmZhY2UnO1xuaW1wb3J0IEdhbWVib2FyZEludGVyZmFjZSBmcm9tICcuL0dhbWVib2FyZEludGVyZmFjZSc7XG5pbXBvcnQge01hcH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkJztcblxuY29uc3QgR2FtZUludGVyZmFjZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgcGFyYW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNPcHBvbmVudEF2YWlsYWJsZTogZmFsc2UsXG4gICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgIG1vZGFsOiBNYXAoe1xuICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogJycsXG4gICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgaGlkZTogdGhpcy5faGlkZU1vZGFsLFxuICAgICAgICAgIGFjY2VwdDogdGhpcy5fYWNjZXB0UmVtYXRjaCxcbiAgICAgICAgICBkZWNsaW5lOiB0aGlzLl9kZWNsaW5lUmVtYXRjaFxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHNvdW5kc0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgZ2FtZU92ZXI6IEdhbWVTdG9yZS5nZXRTdGF0ZSgpLmdhbWVPdmVyXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXN9ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLm9uKCd0b2tlbi1pbnZhbGlkJywgKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb2RhbDogdGhpcy5zdGF0ZS5tb2RhbFxuICAgICAgICAuc2V0KCdvcGVuJywgdHJ1ZSlcbiAgICAgICAgLnNldCgnbWVzc2FnZScsICdHYW1lIGxpbmsgaXMgaW52YWxpZCBvciBoYXMgZXhwaXJlZC4nKVxuICAgICAgICAuc2V0KCd0eXBlJywgJ2luZm8nKVxuICAgIH0pKTtcblxuICAgIGlvLmVtaXQoJ2pvaW4nLCB7XG4gICAgICB0b2tlbjogcGFyYW1zWzBdLFxuICAgICAgdGltZTogcGFyYW1zWzFdICogNjAsXG4gICAgICBpbmM6IHBhcmFtc1syXVxuICAgIH0pO1xuXG4gICAgaW8ub24oJ2pvaW5lZCcsIGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEuY29sb3IgPT09ICdibGFjaycpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29sb3I6ICdibGFjayd9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlvLm9uKCdib3RoLWpvaW5lZCcsICgpID0+XG4gICAgICB0aGlzLnNldFN0YXRlKHtpc09wcG9uZW50QXZhaWxhYmxlOiB0cnVlfSwgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb2xvciA9PT0gJ3doaXRlJykge1xuICAgICAgICAgIGlvLmVtaXQoJ2Nsb2NrLXJ1bicsIHtcbiAgICAgICAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICBpby5vbignZnVsbCcsICgpID0+IHtcbiAgICAgIHdpbmRvdy5hbGVydChcbiAgICAgICAgJ1RoaXMgZ2FtZSBhbHJlYWR5IGhhcyB0d28gcGxheWVycy4gWW91IGhhdmUgdG8gY3JlYXRlIGEgbmV3IG9uZS4nKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvJztcbiAgICB9KTtcblxuICAgIGlvLm9uKCdwbGF5ZXItcmVzaWduZWQnLCBkYXRhID0+IHtcbiAgICAgIEdhbWVBY3Rpb25zLmdhbWVPdmVyKHtcbiAgICAgICAgdHlwZTogJ3Jlc2lnbicsXG4gICAgICAgIHdpbm5lcjogZGF0YS5jb2xvciA9PT0gJ2JsYWNrJyA/ICdXaGl0ZScgOiAnQmxhY2snXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlvLm9uKCdyZW1hdGNoLW9mZmVyZWQnLCAoKSA9PlxuICAgICAgdGhpcy5fb3Blbk1vZGFsKCdvZmZlcicsICdZb3VyIG9wcG9uZW50IGhhcyBzZW50IHlvdSBhIHJlbWF0Y2ggb2ZmZXIuJykpO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtZGVjbGluZWQnLCAoKSA9PlxuICAgICAgdGhpcy5fb3Blbk1vZGFsKCdpbmZvJywgJ1JlbWF0Y2ggb2ZmZXIgaGFzIGJlZW4gZGVjbGluZWQuJykpO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtYWNjZXB0ZWQnLCAoKSA9PiB7XG4gICAgICBHYW1lQWN0aW9ucy5yZW1hdGNoKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29sb3I6IHRoaXMuc3RhdGUuY29sb3IgPT09ICd3aGl0ZScgPyAnYmxhY2snIDogJ3doaXRlJyxcbiAgICAgICAgbW9kYWw6IHRoaXMuc3RhdGUubW9kYWwuc2V0KCdvcGVuJywgZmFsc2UpXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbG9yID09PSAnd2hpdGUnKSB7XG4gICAgICAgICAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMucHJvcHMucGFyYW1zWzBdLFxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpby5vbignb3Bwb25lbnQtZGlzY29ubmVjdGVkJywgKCkgPT4gIHtcbiAgICAgIGlmICghdGhpcy5zdGF0ZS5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpKSB7XG4gICAgICAgIHRoaXMuX29wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9wcG9uZW50IGhhcyBkaXNjb25uZWN0ZWQuJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzT3Bwb25lbnRBdmFpbGFibGU6IGZhbHNlfSk7XG4gICAgfSk7XG5cbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIEdhbWVTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH0sXG5cblxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2NvbG9yLCBzb3VuZHNFbmFibGVkLCBnYW1lT3ZlciwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNvbW1vblByb3BzID0ge1xuICAgICAgaW86IGlvLFxuICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgb3Blbk1vZGFsOiB0aGlzLl9vcGVuTW9kYWwsXG4gICAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBpc09wcG9uZW50QXZhaWxhYmxlXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8R2FtZUhlYWRlclxuICAgICAgICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICAgICAgICBwYXJhbXM9e3BhcmFtc31cbiAgICAgICAgICBnYW1lT3Zlcj17Z2FtZU92ZXIuZ2V0KCdzdGF0dXMnKX0gLz5cblxuICAgICAgICA8Q2hhdFxuICAgICAgICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICAgICAgICB0b2tlbj17cGFyYW1zWzBdfVxuICAgICAgICAgIHNvdW5kc0VuYWJsZWQ9e3NvdW5kc0VuYWJsZWR9IC8+XG5cbiAgICAgICAgICB7LypcbiAgICAgICAgPENoZXNzYm9hcmRJbnRlcmZhY2VcbiAgICAgICAgICB7Li4uY29tbW9uUHJvcHN9XG4gICAgICAgICAgdG9rZW49e3BhcmFtc1swXX1cbiAgICAgICAgICBzb3VuZHNFbmFibGVkPXtzb3VuZHNFbmFibGVkfVxuICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlcn0gLz5cbiAgICAgICAgKi99XG4gICAgICAgICAgXG4gICAgICAgIHsvKn1cbiAgICAgICAgPEJvYXJkIC8+XG4gICAgICAgICovfVxuXG4gICAgICAgICAgPEdhbWVib2FyZEludGVyZmFjZSAvPlxuXG5cblxuXG4gICAgICAgIDxNb2RhbCBkYXRhPXt0aGlzLnN0YXRlLm1vZGFsfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuXG5cblxuICBfb25HYW1lQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2dhbWVPdmVyOiBHYW1lU3RvcmUuZ2V0U3RhdGUoKS5nYW1lT3Zlcn0pO1xuICB9LFxuICBfb3Blbk1vZGFsKHR5cGUsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1vZGFsOiB0aGlzLnN0YXRlLm1vZGFsXG4gICAgICAgIC5zZXQoJ29wZW4nLCB0cnVlKVxuICAgICAgICAuc2V0KCdtZXNzYWdlJywgbWVzc2FnZSlcbiAgICAgICAgLnNldCgndHlwZScsIHR5cGUpXG4gICAgfSk7XG4gIH0sXG4gIF9oaWRlTW9kYWwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW9kYWw6IHRoaXMuc3RhdGUubW9kYWwuc2V0KCdvcGVuJywgZmFsc2UpfSk7XG4gIH0sXG4gIF9hY2NlcHRSZW1hdGNoKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpby5lbWl0KCdyZW1hdGNoLWFjY2VwdCcsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICB0aW1lOiBwYXJhbXNbMV0gKiA2MCxcbiAgICAgIGluYzogcGFyYW1zWzJdXG4gICAgfSk7XG4gICAgdGhpcy5faGlkZU1vZGFsKCk7XG4gIH0sXG4gIF9kZWNsaW5lUmVtYXRjaCgpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtc30gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8uZW1pdCgncmVtYXRjaC1kZWNsaW5lJywge1xuICAgICAgdG9rZW46IHBhcmFtc1swXVxuICAgIH0pO1xuICAgIHRoaXMuX2hpZGVNb2RhbCgpO1xuICB9LFxuICBfdG9nZ2xlU291bmRzKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNvdW5kc0VuYWJsZWQ6ICF0aGlzLnN0YXRlLnNvdW5kc0VuYWJsZWRcbiAgICB9KTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcbmltcG9ydCBDaGVzc2JvYXJkIGZyb20gJy4vQ2hlc3Nib2FyZCc7XG5pbXBvcnQge0JvYXJkfSBmcm9tICcuL0dhbWVCb2FyZCc7XG5pbXBvcnQgQ2FwdHVyZWRQaWVjZXMgZnJvbSAnLi9DYXB0dXJlZFBpZWNlcyc7XG5pbXBvcnQgVGFibGVPZk1vdmVzIGZyb20gJy4vVGFibGVPZk1vdmVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuLyogdGhlIHN0YXRlIG9mIHRoZSBnYW1lYm9hcmQgaXMgbWFuYWdlZCBieSBHYW1lU3RvcmUgKi9cblxuY29uc3QgR2FtZWJvYXJkSW50ZXJmYWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHByb3BUeXBlczoge1xuXG5cdH0sXG5cdG1peGluczogW10sXG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcblx0XHRyZXR1cm4gR2FtZVN0b3JlLmdldFN0YXRlKCk7XG5cdH0sXG5cdGdldERlZmF1bHRQcm9wcygpIHtcblxuXHR9LFxuXHRjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG5cblx0fSxcblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtwcm9tb3Rpb24sIHR1cm4sIGdhbWVPdmVyLCBjaGVja30gPSB0aGlzLnN0YXRlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgaWQ9XCJib2FyZC1tb3Zlcy13cmFwcGVyXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cblx0XHRcdFx0PGRpdiBpZD1cImJvYXJkLXdyYXBwZXJcIj5cblxuXHRcdFx0XHRcdDxDYXB0dXJlZFBpZWNlcyAvPlxuXG5cdFx0XHRcdFx0PEJvYXJkIHNpemU9ezZ9Lz5cblxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJmZWVkYmFja1wiPlxuXHRcdFx0XHRcdHshZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSA/XG5cdFx0XHRcdFx0XHQ8c3Bhbj5cblx0XHRcdFx0XHRcdFx0e2Ake3R1cm49PT0ndycgPyAnV2hpdGUnIDogJ0JsYWNrJ30gdG8gbW92ZS5gfVxuXHRcdFx0XHRcdFx0PC9zcGFuPiA6XG5cdFx0XHRcdFx0XHQ8c3Ryb25nPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+XG5cdFx0XHRcdFx0XHRcdCAge2dhbWVPdmVyLmdldCgnd2lubmVyJykgPT09ICdXaGl0ZScgPyAnRicgOiAnZid9XG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0e3RoaXMuX2dldEdhbWVPdmVyTWVzc2FnZSgpfVxuXHRcdFx0XHRcdFx0PC9zdHJvbmc+XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L3NwYW4+XG5cblxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9LFxuXG5cdF9vbkdhbWVDaGFuZ2UoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZShHYW1lU3RvcmUuZ2V0U3RhdGUoKSk7XG5cdH0sXG5cblx0X2dldEdhbWVPdmVyTWVzc2FnZSgpIHtcblx0XHRyZXR1cm4gYHlvdSBsb3NlYDtcblx0fVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IE1vZGFsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW5dLFxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCBpc09wZW4gPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCdvcGVuJyk7XG5cbiAgICBpZiAoaXNPcGVuKVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5ZG93bik7XG4gICAgZWxzZVxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5ZG93bik7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5wcm9wcy5kYXRhO1xuICAgIGNvbnN0IHR5cGUgPSBkYXRhLmdldCgndHlwZScpO1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IGRhdGEuZ2V0KCdjYWxsYmFja3MnKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICdtb2RhbC1tYXNrJzogdHJ1ZSxcbiAgICAgICAgICAgICAnaGlkZGVuJzogIWRhdGEuZ2V0KCdvcGVuJylcbiAgICAgICAgICAgfSl9XG4gICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX2hpZGVNb2RhbH0+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDxzdHJvbmc+RXNjOiA8L3N0cm9uZz5cbiAgICAgICAgICA8c3Bhbj57dHlwZSA9PT0gJ2luZm8nID8gJ09LJyA6ICdEZWNsaW5lJ308L3NwYW4+XG4gICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgPHN0cm9uZz5FbnRlcjogPC9zdHJvbmc+XG4gICAgICAgICAgPHNwYW4+e3R5cGUgPT09ICdpbmZvJyA/ICdPSycgOiAnQWNjZXB0J308L3NwYW4+XG4gICAgICAgIDwvcD5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCJcbiAgICAgICAgICAgICBvbkNsaWNrPXtlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9PlxuICAgICAgICAgIDxwPntkYXRhLmdldCgnbWVzc2FnZScpfTwvcD5cblxuICAgICAgICAgIHt0eXBlID09PSAnaW5mbycgPyBcbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBva1wiXG4gICAgICAgICAgICAgICBvbkNsaWNrPXtjYWxsYmFja3MuaGlkZX0+XG4gICAgICAgICAgICAgIE9LXG4gICAgICAgICAgICA8L2E+IDogW1xuXG4gICAgICAgICAgICA8YSBrZXk9XCJhXCJcbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0blwiXG4gICAgICAgICAgICAgICBzdHlsZT17e2xlZnQ6ICc0ZW0nfX1cbiAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NhbGxiYWNrcy5hY2NlcHR9PlxuICAgICAgICAgICAgICBBY2NlcHRcbiAgICAgICAgICAgIDwvYT4sXG4gICAgICAgICAgICA8YSBrZXk9XCJiXCJcbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tLXJlZFwiXG4gICAgICAgICAgICAgICBzdHlsZT17e3JpZ2h0OiAnNGVtJ319XG4gICAgICAgICAgICAgICBvbkNsaWNrPXtjYWxsYmFja3MuZGVjbGluZX0+XG4gICAgICAgICAgICAgIERlY2xpbmVcbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICBdfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIF9vbktleWRvd24oZSkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCd0eXBlJyk7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5wcm9wcy5kYXRhLmdldCgnY2FsbGJhY2tzJyk7XG5cbiAgICBpZiAodHlwZSA9PT0gJ2luZm8nKSB7XG4gICAgICBpZiAoZS53aGljaCA9PT0gMTMgfHwgZS53aGljaCA9PT0gMjcpIHtcbiAgICAgICAgY2FsbGJhY2tzLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgIGlmIChlLndoaWNoID09PSAxMykge1xuICAgICAgICBjYWxsYmFja3MuYWNjZXB0KCk7XG4gICAgICB9IGVsc2UgaWYgKGUud2hpY2ggPT09IDI3KSB7XG4gICAgICAgIGNhbGxiYWNrcy5kZWNsaW5lKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBfaGlkZU1vZGFsKCkge1xuICAgIHRoaXMucHJvcHMuZGF0YS5nZXQoJ2NhbGxiYWNrcycpLmhpZGUoKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcblxuY29uc3QgVGFibGVPZk1vdmVzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgb25HYW1lQ2hhbmdlXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vdmVzOiBHYW1lU3RvcmUuZ2V0TW92ZXMoKVxuICAgIH07XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHRhYmxlIGlkPVwibW92ZXNcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoPlRhYmxlIG9mIG1vdmVzPC90aD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAge3RoaXMuc3RhdGUubW92ZXMubWFwKChyb3csIGkpID0+IChcbiAgICAgICAgICAgIDx0ciBrZXk9e2l9PlxuICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz57YCR7aSArIDF9LmB9PC9zdHJvbmc+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIHtyb3cubWFwKChtb3ZlLCBqKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRkIGtleT17an0+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57bW92ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgKSkudG9BcnJheSgpfVxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICApKS50b0FycmF5KCl9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgICk7XG4gIH0sXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb3ZlczogR2FtZVN0b3JlLmdldE1vdmVzKClcbiAgICB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlT2ZNb3ZlczsiLCJpbXBvcnQga2V5TWlycm9yIGZyb20gJ3JlYWN0L2xpYi9rZXlNaXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBrZXlNaXJyb3Ioe1xuICBUT0dHTEVfVklTSUJJTElUWTogbnVsbCxcbiAgU1VCTUlUX01FU1NBR0U6IG51bGxcbn0pOyIsImNvbnN0IENoZXNzUGllY2VzID0ge1xuICAvLyBrZXk6IHBpZWNlIGZyb20gRkVOLCB2YWx1ZTogcGllY2UgZnJvbSBTbWFydCBSZWd1bGFyIGNoZXNzIGZvbnRcbiAgLy8gd2hpdGUgcGllY2VzXG4gICdLJzogJ0YnLFxuICAnUSc6ICdFJyxcbiAgJ1InOiAnRCcsXG4gICdCJzogJ0MnLFxuICAnTic6ICdCJyxcbiAgJ1AnOiAnQScsXG4gIC8vIGJsYWNrIHBpZWNlc1xuICAnayc6ICdmJyxcbiAgJ3EnOiAnZScsXG4gICdyJzogJ2QnLFxuICAnYic6ICdjJyxcbiAgJ24nOiAnYicsXG4gICdwJzogJ2EnLFxuICAvLyBlbXB0eSBzcXVhcmVcbiAgJy0nOiB1bmRlZmluZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoZXNzUGllY2VzOyIsImltcG9ydCBrZXlNaXJyb3IgZnJvbSAncmVhY3QvbGliL2tleU1pcnJvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGtleU1pcnJvcih7XG4gIE1BS0VfTU9WRTogbnVsbCxcbiAgU0hPV19NT1ZFUzogbnVsbCxcbiAgUkVNQVRDSDogbnVsbCxcbiAgRFJBVzogbnVsbCxcbiAgR0FNRV9PVkVSOiBudWxsLFxuICBDSEFOR0VfUFJPTU9USU9OOiBudWxsXG59KTsiLCJpbXBvcnQge0Rpc3BhdGNoZXJ9IGZyb20gJ2ZsdXgnO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKG5ldyBEaXNwYXRjaGVyKCksIHtcbiAgLy8gQHBhcmFtIHtvYmplY3R9IGFjdGlvbiBUaGUgZGF0YSBjb21pbmcgZnJvbSB0aGUgdmlldy5cbiAgaGFuZGxlVmlld0FjdGlvbjogZnVuY3Rpb24oYWN0aW9uKSB7XG4gICAgdGhpcy5kaXNwYXRjaCh7XG4gICAgICBzb3VyY2U6ICdWSUVXX0FDVElPTicsXG4gICAgICBhY3Rpb246IGFjdGlvblxuICAgIH0pO1xuICB9XG59KTsiLCJjb25zdCBUaWxlQWN0aW9ucyA9IHtcbiAgICBcIkFzc2Fzc2luXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXAgc2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0yLDJdXCI6IFwianVtcCBzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcImp1bXAgc2xpZGVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcCBzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wIHNsaWRlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcCBzbGlkZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiQm93bWFuXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwwXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJzdHJpa2VcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIkNoYW1waW9uXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiRHJhZ29vblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJzdHJpa2VcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcInNsaWRlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJEdWNoZXNzXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiRHVrZVwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcInNsaWRlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJzbGlkZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiRm9vdG1hblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiS25pZ2h0XCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlstMSwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsxLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJtb3ZlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJMb25nYm93bWFuXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLC0zXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiTWFyc2hhbGxcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiT3JhY2xlXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiUGlrZW1hblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTEsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlsxLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcIm1vdmVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIlByaWVzdFwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJzbGlkZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDJdXCI6IFwianVtcFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiUmFuZ2VyXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0xLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsLTFdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwtMV1cIjogXCJqdW1wXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlstMSwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzEsMl1cIjogXCJqdW1wXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJTZWVyXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJXaXphcmRcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcImp1bXBcIlxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8vIHZhciBuZXdVbml0cyA9IHt9O1xuLy8gZm9yICh2YXIgdW5pdEtleSBpbiBUaWxlQWN0aW9ucykge1xuLy8gICAgIHZhciB1bml0ID0gVGlsZUFjdGlvbnNbdW5pdEtleV07XG4vLyAgICAgdmFyIG5ld1NpZGVzID0ge307XG4vLyAgICAgZm9yICh2YXIgc2lkZUtleSBpbiB1bml0KSB7XG4vLyAgICAgICAgIHZhciBkaXIgPSB1bml0W3NpZGVLZXldO1xuLy8gICAgICAgICB2YXIgbmV3RGlyID0ge307XG4vLyAgICAgICAgIGZvciAodmFyIGNvb3JkcyBpbiBkaXIpIHtcbi8vICAgICAgICAgICAgIHZhciBwYXJzZWQgPSBKU09OLnBhcnNlKGNvb3Jkcyk7XG4vLyAgICAgICAgICAgICB2YXIgbmV3Q29vcmRzID0gSlNPTi5zdHJpbmdpZnkoW3BhcnNlZFsxXSwgcGFyc2VkWzBdXSk7XG4vLyAgICAgICAgICAgICBuZXdEaXJbbmV3Q29vcmRzXSA9IGRpcltjb29yZHNdO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIG5ld1NpZGVzW3NpZGVLZXldID0gbmV3RGlyO1xuLy8gICAgIH1cbi8vICAgICBuZXdVbml0c1t1bml0S2V5XSA9IG5ld1NpZGVzO1xuLy8gfVxuLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobmV3VW5pdHMpKTtcblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgVGlsZUFjdGlvbnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmNvbnN0IE9SSUdJTiA9ICdodHRwOi8vbG9jYWxob3N0OjEzMzcnO1xuY29uc3QgV1MgPSBPUklHSU47XG5cbmV4cG9ydCBkZWZhdWx0IGlvLmNvbm5lY3QoV1MpOyIsImNvbnN0IG1heWJlUmV2ZXJzZSA9IHtcbiAgX21heWJlUmV2ZXJzZShpdGVyYWJsZSwgY29sb3IpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jb2xvciA9PT0gKGNvbG9yIHx8ICdibGFjaycpID9cbiAgICAgIGl0ZXJhYmxlLnJldmVyc2UoKSA6IGl0ZXJhYmxlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtYXliZVJldmVyc2U7IiwiaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcblxuY29uc3Qgb25HYW1lQ2hhbmdlID0ge1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIEdhbWVTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG9uR2FtZUNoYW5nZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XG5pbXBvcnQge0V2ZW50RW1pdHRlcjIgYXMgRXZlbnRFbWl0dGVyfSBmcm9tICdldmVudGVtaXR0ZXIyJztcbmltcG9ydCBDaGF0Q29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9DaGF0Q29uc3RhbnRzJztcbmltcG9ydCB7TGlzdCwgTWFwfSBmcm9tICdpbW11dGFibGUnO1xuXG5jb25zdCBDSEFOR0VfRVZFTlQgPSAnY2hhbmdlJztcbiAgXG52YXIgX21lc3NhZ2VzID0gTGlzdCgpO1xudmFyIF91bnNlZW5Db3VudCA9IDA7XG52YXIgX2lzQ2hhdEhpZGRlbiA9IHRydWU7XG5cbmNvbnN0IENoYXRTdG9yZSA9IE9iamVjdC5hc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2VzOiBfbWVzc2FnZXMsXG4gICAgICB1bnNlZW5Db3VudDogX3Vuc2VlbkNvdW50LFxuICAgICAgaXNDaGF0SGlkZGVuOiBfaXNDaGF0SGlkZGVuXG4gICAgfTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHRvZ2dsZVZpc2liaWxpdHkoKSB7XG4gIF9pc0NoYXRIaWRkZW4gPSAhX2lzQ2hhdEhpZGRlbjtcbiAgX3Vuc2VlbkNvdW50ID0gMDtcbn1cblxuZnVuY3Rpb24gc3VibWl0TWVzc2FnZShtZXNzYWdlLCBjbGFzc05hbWUsIHJlY2VpdmVkKSB7XG4gIF9tZXNzYWdlcyA9IF9tZXNzYWdlcy5wdXNoKE1hcCh7XG4gICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZVxuICB9KSk7XG5cbiAgaWYgKHJlY2VpdmVkICYmIF9pc0NoYXRIaWRkZW4pIHtcbiAgICBfdW5zZWVuQ291bnQgKz0gMTtcbiAgfVxufVxuXG5BcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKHBheWxvYWQgPT4ge1xuICBjb25zdCBhY3Rpb24gPSBwYXlsb2FkLmFjdGlvbjtcblxuICBzd2l0Y2ggKGFjdGlvbi5hY3Rpb25UeXBlKSB7XG4gICAgY2FzZSBDaGF0Q29uc3RhbnRzLlRPR0dMRV9WSVNJQklMSVRZOlxuICAgICAgdG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIENoYXRDb25zdGFudHMuU1VCTUlUX01FU1NBR0U6XG4gICAgICBzdWJtaXRNZXNzYWdlKGFjdGlvbi5tZXNzYWdlLCBhY3Rpb24uY2xhc3NOYW1lLCBhY3Rpb24ucmVjZWl2ZWQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBDaGF0U3RvcmUuZW1pdChDSEFOR0VfRVZFTlQpO1xuICByZXR1cm4gdHJ1ZTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDaGF0U3RvcmU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIyIGFzIEV2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRlbWl0dGVyMic7XG5pbXBvcnQgR2FtZUNvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvR2FtZUNvbnN0YW50cyc7XG5pbXBvcnQgQ2hlc3NQaWVjZXMgZnJvbSAnLi4vY29uc3RhbnRzL0NoZXNzUGllY2VzJztcbmltcG9ydCB7Q2hlc3N9IGZyb20gJ2NoZXNzLmpzJztcbmltcG9ydCB7TGlzdCwgTWFwLCBPcmRlcmVkTWFwLCBTZXR9IGZyb20gJ2ltbXV0YWJsZSc7XG4vL2ltcG9ydCBVdGlscyBmcm9tICcuLi9nYW1lL3V0aWxzJztcbi8vIGltcG9ydCBiZWhhdmlvciBmcm9tICcuLi9nYW1lL2JlaGF2aW9yJztcblxuY29uc3QgQ0hBTkdFX0VWRU5UID0gJ2NoYW5nZSc7XG5jb25zdCBNT1ZFX0VWRU5UID0gJ25ldy1tb3ZlJztcblxudmFyIF9nYW1lT3ZlcjtcbnZhciBfY2FwdHVyZWRQaWVjZXM7XG52YXIgX21vdmVzO1xudmFyIF9wcm9tb3Rpb247XG52YXIgX3R1cm47XG52YXIgX2NoZWNrO1xudmFyIF9sYXN0TW92ZTtcbnZhciBfY2hlc3M7XG5cbnZhciBfYm9hcmQgPSB7fSxcbiAgICBfbGlnaHR1cCA9IHt9LFxuICAgIF9zZWxlY3RlZDtcblxuXG5zZXRJbml0aWFsU3RhdGUoKTtcblxudmFyIEdhbWVTdG9yZSA9IE9iamVjdC5hc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICBhZGRDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24oY2IpIHtcbiAgICAgIHRoaXMub24oQ0hBTkdFX0VWRU5ULCBjYik7XG4gICAgfSxcblxuICAgIHJlbW92ZUNoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihjYikge1xuICAgICAgdGhpcy5yZW1vdmVDaGFuZ2VMaXN0ZW5lcihDSEFOR0VfRVZFTlQsIGNiKTtcbiAgICB9LFxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2FtZU92ZXI6IF9nYW1lT3ZlcixcbiAgICAgICAgICAgIHByb21vdGlvbjogX3Byb21vdGlvbixcbiAgICAgICAgICAgIHR1cm46IF90dXJuLFxuICAgICAgICAgICAgY2hlY2s6IF9jaGVjayxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldENhcHR1cmVkUGllY2VzKCkge1xuICAgICAgICByZXR1cm4gX2NhcHR1cmVkUGllY2VzO1xuICAgIH0sXG4gICAgZ2V0TW92ZXMoKSB7XG4gICAgICAgIHJldHVybiBfbW92ZXM7XG4gICAgfSxcbiAgICBnZXRDaGVzc2JvYXJkU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmZW46IF9jaGVzcy5mZW4oKSxcbiAgICAgICAgICAgIGxhc3RNb3ZlOiBfbGFzdE1vdmUsXG4gICAgICAgICAgICBjaGVjazogX2NoZWNrXG4gICAgICAgIH07XG4gICAgfSxcblxuXG4gICAgZ2V0R2FtZWJvYXJkU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBib2FyZDogX2JvYXJkLFxuICAgICAgICAgICAgbGlnaHR1cDogX2xpZ2h0dXAsXG4gICAgICAgICAgICBzZWxlY3RlZDogX3NlbGVjdGVkXG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICBnZXRWYWxpZE1vdmVzKHNxdWFyZSkge1xuICAgICAgICByZXR1cm4gc3F1YXJlID8gU2V0KFxuICAgICAgICAgICAgX2NoZXNzLm1vdmVzKHtcbiAgICAgICAgICAgICAgICBzcXVhcmU6IHNxdWFyZSxcbiAgICAgICAgICAgICAgICB2ZXJib3NlOiB0cnVlXG4gICAgICAgICAgICB9KS5tYXAobW92ZSA9PiBtb3ZlLnRvKSkgOiBTZXQoKTtcbiAgICB9LFxuXG4gICAgc2hvd01vdmVzKHVuaXQsIGZyb20sIGluUmFuZ2UpIHtcbiAgICAgICAgIGlmICghT2JqZWN0LmtleXMoX2xpZ2h0dXApLmxlbmd0aCkge1xuICAgICAgICAgIGluUmFuZ2UuZmlsdGVyKHJhbmdlID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWRNb3ZlKHVuaXQsIHJhbmdlKTtcbiAgICAgICAgICB9KS5mb3JFYWNoKG1vdmUgPT4ge1xuICAgICAgICAgICAgICB2YXIgY29vcmRzU3RyID0gYFske21vdmUueH0sICR7bW92ZS55fV1gO1xuICAgICAgICAgICAgICBfbGlnaHR1cFtjb29yZHNTdHJdID0gdHJ1ZTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIF9zZWxlY3RlZCA9IHtwb3NpdGlvbjogZnJvbSwgdW5pdDogdW5pdH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgX2xpZ2h0dXAgPSB7fTtcbiAgICAgICAgICBfc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vdGhpcy5zZXRTdGF0ZSh7X2xpZ2h0dXA6IHZhbGlkTW92ZXN9KTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmdldFN0YXRlKCkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygndmFsaWQgTW92ZXM6JylcbiAgICAgICAgLy8gY29uc29sZS5sb2codmFsaWRNb3Zlcyk7XG5cbiAgICB9XG5cblxufSk7XG5cbmZ1bmN0aW9uIGlzT25Cb2FyZChjb29yZHMpIHtcbiAgaWYgKCFjb29yZHMuaGFzT3duUHJvcGVydHkoJ3gnKSB8fCAhY29vcmRzLmhhc093blByb3BlcnR5KCd5JykpIHJldHVybiBmYWxzZTtcbiAgdmFyIGNvb3Jkc1N0ciA9IGBbJHtjb29yZHMueX0sICR7Y29vcmRzLnh9XWBcbiAgLy9jb25zb2xlLmxvZygnY29vcmRzU3RyOicsIGNvb3Jkc1N0cik7XG4gIC8vY29uc29sZS5sb2coJ19ib2FyZDonLCBfYm9hcmQpO1xuICAvLyBjb25zb2xlLmxvZyhgb24gdGlsZSAke2Nvb3Jkc1N0cn1gLCBfYm9hcmRbY29vcmRzU3RyXSk7XG4gIHJldHVybiBjb29yZHMueCA+PSAwICYmIGNvb3Jkcy55ID49IDAgJiYgY29vcmRzLnggPCA2ICYmIGNvb3Jkcy55IDwgNjtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZE1vdmUodW5pdCwgY29vcmRzKSB7XG4gIHZhciBjb29yZHNTdHIgPSBgWyR7Y29vcmRzLnh9LCAke2Nvb3Jkcy55fV1gO1xuICB2YXIgdGFyZ2V0VW5pdCA9IF9ib2FyZFtjb29yZHNTdHJdO1xuXG4gIGlmICh0YXJnZXRVbml0KSB7XG4gICAgLy9jb25zb2xlLmxvZyhgdW5pdC5jb2xvcjogJHt1bml0LmNvbG9yfWApO1xuICAgIGNvbnNvbGUubG9nKGB0YXJnZXRVbml0LmNvbG9yOiAke3RhcmdldFVuaXQuY29sb3J9YCk7XG4gICAgaWYgKHVuaXQuY29sb3IgPT09IHRhcmdldFVuaXQuY29sb3IpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gaXNPbkJvYXJkKGNvb3Jkcyk7XG59XG5cbmZ1bmN0aW9uIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBfZ2FtZU92ZXIgPSBNYXAoe1xuICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICB3aW5uZXI6IG51bGxcbiAgICB9KTtcbiAgICBfY2FwdHVyZWRQaWVjZXMgPSBPcmRlcmVkTWFwKFtcbiAgICAgICAgWyd3JywgTGlzdCgpXSxcbiAgICAgICAgWydiJywgTGlzdCgpXVxuICAgIF0pO1xuICAgIF9tb3ZlcyA9IExpc3QoKTtcbiAgICBfcHJvbW90aW9uID0gJ3EnO1xuICAgIF90dXJuID0gJ3cnO1xuICAgIF9jaGVjayA9IGZhbHNlO1xuICAgIF9sYXN0TW92ZSA9IE1hcCgpO1xuICAgIF9zZWxlY3RlZCA9IG51bGw7XG4gICAgLy9fY2hlc3MgPSBuZXcgQ2hlc3MoKTtcblxuICAgIF9saWdodHVwID0gW107XG5cbiAgICBfYm9hcmQgPSB7XG4gICAgICAgICdbMSwgMF0nOiB7dW5pdDogJ0Zvb3RtYW4nLCBjb2xvcjogJ2JsYWNrJ30sXG4gICAgICAgICdbMiwgMF0nOiB7dW5pdDogJ0R1a2UnLCBjb2xvcjogJ2JsYWNrJ30sXG4gICAgICAgICdbMywgMF0nOiB7dW5pdDogJ0Zvb3RtYW4nLCBjb2xvcjogJ2JsYWNrJ30sXG4gICAgICAgICdbMiwgNV0nOiB7dW5pdDogJ0Zvb3RtYW4nLCBjb2xvcjogJ3doaXRlJ30sXG4gICAgICAgICdbMywgNV0nOiB7dW5pdDogJ0R1a2UnLCBjb2xvcjogJ3doaXRlJ30sXG4gICAgICAgICdbNCwgNV0nOiB7dW5pdDogJ0Zvb3RtYW4nLCBjb2xvcjogJ3doaXRlJ31cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBkcmF3KCkge1xuXG59XG5cbmZ1bmN0aW9uICB1cGRhdGVCb2FyZChmcm9tLCB0bykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIndoYXQgaXMgZnJvbSBhbmQgdG9cIiwgZnJvbSwgdG8pO1xuICAgICAgICBcbiAgICAgICAvL2Zyb20gPSBKU09OLnN0cmluZ2lmeShmcm9tKS5yZXBsYWNlKC8sL2csICcsICcpO1xuICAgICAgIGZyb20gPSBgWyR7ZnJvbVswXX0sICR7ZnJvbVsxXX1dYFxuICAgICAgIC8vdG8gPSBKU09OLnN0cmluZ2lmeSh0bykucmVwbGFjZSgvLC9nLCAnLCAnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2Zyb20nLCBmcm9tKTtcblxuICAgICAgIHZhciB1bml0ID0gX2JvYXJkW2Zyb21dO1xuICAgICAgIGNvbnNvbGUubG9nKCd3aGF0IGlzIHRoZSBmcm9tIHVuaXQnLCB1bml0KTtcbiAgICAgICBfYm9hcmRbZnJvbV0gPSBudWxsO1xuICAgICAgICBfYm9hcmRbdG9dID0gdW5pdDtcbiAgICAgICAgcmV0dXJuIF9ib2FyZDtcbiAgICB9XG5mdW5jdGlvbiBtYWtlTW92ZShmcm9tLCB0bywgY2FwdHVyZSwgZW1pdE1vdmUpIHtcbiAgIFxuICAgIHVwZGF0ZUJvYXJkKGZyb20sIHRvKTtcbiAgICAvLyBjb25zdCBtb3ZlID0gX2NoZXNzLm1vdmUoe1xuICAgIC8vICAgICBmcm9tOiBmcm9tLFxuICAgIC8vICAgICB0bzogdG8sXG4gICAgLy8gfSk7XG5cbiAgICAvLyBpZiAoIW1vdmUpIHtcbiAgICAvLyAgICAgLy8gbW92ZSBpcyBub3QgdmFsaWQsIHJldHVybiBmYWxzZSBhbmQgZG9uJ3QgZW1pdCBhbnkgZXZlbnQuXG4gICAgLy8gICAgIHJldHVybiBmYWxzZTtcbiAgICAvLyB9XG5cbiAgICAvLyBfdHVybiA9IF9jaGVzcy50dXJuKCk7XG4gICAgLy8gX2NoZWNrID0gX2NoZXNzLmluX2NoZWNrKCk7XG4gICAgLy8gX2xhc3RNb3ZlID0gX2xhc3RNb3ZlLnNldCgnZnJvbScsIGZyb20pLnNldCgndG8nLCB0byk7XG4gICAgLy8gX21vdmVzID0gX21vdmVzLmlzRW1wdHkoKSB8fCBfbW92ZXMubGFzdCgpLnNpemUgPT09IDIgP1xuICAgIC8vICAgICBfbW92ZXMucHVzaChMaXN0KFttb3ZlLnNhbl0pKSA6XG4gICAgLy8gICAgIF9tb3Zlcy51cGRhdGUoX21vdmVzLnNpemUgLSAxLCBsaXN0ID0+IGxpc3QucHVzaChtb3ZlLnNhbikpO1xuXG4gICAgLy8gaWYgKGNhcHR1cmUgfHwgbW92ZS5mbGFncyA9PT0gJ2UnKSB7XG4gICAgLy8gICAgIGNvbnN0IGNhcHR1cmVkUGllY2UgPSBjYXB0dXJlIHx8XG4gICAgLy8gICAgICAgICBDaGVzc1BpZWNlc1tfdHVybiA9PT0gJ3cnID8gJ1AnIDogJ3AnXTsgLy8gZW4gcGFzc2FudFxuXG4gICAgLy8gICAgIF9jYXB0dXJlZFBpZWNlcyA9IF9jYXB0dXJlZFBpZWNlc1xuICAgIC8vICAgICAgICAgLnVwZGF0ZShfdHVybiwgbGlzdCA9PiBsaXN0LnB1c2goY2FwdHVyZWRQaWVjZSkpO1xuICAgIC8vIH1cblxuICAgIC8vIGlmIChfY2hlc3MuZ2FtZV9vdmVyKCkpIHtcbiAgICAvLyAgICAgY29uc3QgdHlwZSA9IF9jaGVzcy5pbl9jaGVja21hdGUoKSA/ICdjaGVja21hdGUnIDpcbiAgICAvLyAgICAgICAgIF9jaGVzcy5pbl9zdGFsZW1hdGUoKSA/ICdzdGFsZW1hdGUnIDpcbiAgICAvLyAgICAgICAgIF9jaGVzcy5pbl90aHJlZWZvbGRfcmVwZXRpdGlvbigpID8gJ3RocmVlZm9sZFJlcGV0aXRpb24nIDpcbiAgICAvLyAgICAgICAgIF9jaGVzcy5pbnN1ZmZpY2llbnRfbWF0ZXJpYWwoKSA/ICdpbnN1ZmZpY2llbnRNYXRlcmlhbCcgOlxuICAgIC8vICAgICAgICAgX2NoZXNzLmluX2RyYXcoKSA/ICdkcmF3JyA6IG51bGw7XG5cbiAgICAvLyAgICAgZ2FtZU92ZXIoe1xuICAgIC8vICAgICAgICAgd2lubmVyOiBfdHVybiA9PT0gJ2InID8gJ1doaXRlJyA6ICdCbGFjaycsXG4gICAgLy8gICAgICAgICB0eXBlOiB0eXBlXG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH1cblxuICAgIGlmIChlbWl0TW92ZSkge1xuICAgICAgICBHYW1lU3RvcmUuZW1pdChNT1ZFX0VWRU5ULCB7XG4gICAgICAgICAgICBmcm9tOiBmcm9tLFxuICAgICAgICAgICAgdG86IHRvLFxuICAgICAgICAgICAgY2FwdHVyZTogY2FwdHVyZSxcbiAgICAgICAgICAgIGJvYXJkOiBfYm9hcmQgICAgXG4gICAgICAgICAgICAvL2dhbWVPdmVyOiBfY2hlc3MuZ2FtZV9vdmVyKClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8vIGZ1bmN0aW9uIHNob3dNb3Zlcyh1bml0LCBmcm9tLCBpblJhbmdlKSB7XG4vLyAgIGNvbnNvbGUubG9nKHVuaXQpO1xuLy8gICAgIGNvbnNvbGUubG9nKGZyb20pO1xuXG4vLyAgICAgdmFyIHZhbGlkTW92ZXMgPSBpblJhbmdlLmZpbHRlcihyYW5nZSA9PiB7XG4vLyAgICAgICByZXR1cm4gaXNWYWxpZE1vdmUodW5pdCwgcmFuZ2UpO1xuLy8gICAgIH0pXG5cbi8vICAgICAvL3RoaXMuc2V0U3RhdGUoe19saWdodHVwOiB2YWxpZE1vdmVzfSk7XG4vLyAgICAgY29uc29sZS5sb2coJ2Jvb3AnKVxuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuLy8gICAgIC8vIGNvbnNvbGUubG9nKCd2YWxpZCBNb3ZlczonKVxuLy8gICAgIC8vIGNvbnNvbGUubG9nKHZhbGlkTW92ZXMpO1xuXG4vLyAgICAgLy9jb25zb2xlLmxvZyhgaW5SYW5nZTogJHtpblJhbmdlfWApO1xuLy8gICAgIC8vY29uc29sZS5sb2coYHV0aWxzOiAke1V0aWxzLnNob3dtZSgpfWApO1xuLy8gfVxuXG5cblxuZnVuY3Rpb24gZ2FtZU92ZXIob3B0aW9ucykge1xuICAgIF9nYW1lT3ZlciA9IF9nYW1lT3ZlclxuICAgICAgICAuc2V0KCdzdGF0dXMnLCB0cnVlKVxuICAgICAgICAuc2V0KCd3aW5uZXInLCBvcHRpb25zLndpbm5lcilcbiAgICAgICAgLnNldCgndHlwZScsIG9wdGlvbnMudHlwZSk7XG59XG5cbkFwcERpc3BhdGNoZXIucmVnaXN0ZXIocGF5bG9hZCA9PiB7XG4gICAgY29uc3QgYWN0aW9uID0gcGF5bG9hZC5hY3Rpb247XG4gICAgbGV0IGVtaXRFdmVudCA9IHRydWU7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi5hY3Rpb25UeXBlKSB7XG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5NQUtFX01PVkU6XG4gICAgICAgICAgICBlbWl0RXZlbnQgPSBtYWtlTW92ZShcbiAgICAgICAgICAgICAgICBhY3Rpb24uZnJvbSwgYWN0aW9uLnRvLCBhY3Rpb24uY2FwdHVyZSwgYWN0aW9uLmVtaXRNb3ZlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5TSE9XX01PVkVTOlxuICAgICAgICAgICAgZW1pdEV2ZW50ID0gR2FtZVN0b3JlLnNob3dNb3ZlcyhhY3Rpb24udW5pdCwgYWN0aW9uLmZyb20sIGFjdGlvbi5pblJhbmdlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5DSEFOR0VfUFJPTU9USU9OOlxuICAgICAgICAgICAgX3Byb21vdGlvbiA9IGFjdGlvbi5wcm9tb3Rpb247XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuRFJBVzpcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkdBTUVfT1ZFUjpcbiAgICAgICAgICAgIGdhbWVPdmVyKGFjdGlvbi5vcHRpb25zKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5SRU1BVENIOlxuICAgICAgICAgICAgc2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGVtaXRFdmVudCkge1xuICAgICAgICBHYW1lU3RvcmUuZW1pdChDSEFOR0VfRVZFTlQpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lU3RvcmU7XG4iXX0=
