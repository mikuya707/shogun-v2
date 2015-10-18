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
		//this.result;
		console.log("state? ", this.state);
		return this.state;
	},
	_onButtonClick: function _onButtonClick() {
		console.log("button is clicked!!");
		GameStore.draw();
		this.state.drawUnit = GameStore.getGameboardState().drawUnit;
		console.log(this.state.drawUnit);
		console.log(Object.keys(this.state.drawUnit)[0]);
		var unit = Object.keys(this.state.drawUnit)[0];
		var element = document.getElementById("drawnUnit");
		console.log("element is retrived", element);
		element.classList.add("" + unit);
		element.classList.add("white");
		element.classList.add("front");
		// element.classList.add(`${unit}`);
		// element.setAttribute("color", "white");
		// element.setAttribute("side", "front");
		//'[1, 0]': {unit: 'Footman', color: 'black', s`${ide: 'front'},
	},
	_onDrawnUnitClick: function _onDrawnUnitClick() {
		var element = document.getElementById("drawnUnit");
		//element.classList.remove("back");
		if (element.classList.contains("front")) {
			element.classList.remove("front");
			element.classList.add("back");
		} else if (element.classList.contains("back")) {
			element.classList.remove("back");
			element.classList.add("front");
		}
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
		var props = _ref.props;
		var size = props.size;var board = state.board;
		var selected = state.selected;

		var lightup = this.state.lightup,
		    strike = this.state.strike;
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
									side: board["[" + idx2 + ", " + idx1 + "]"] ? board["[" + idx2 + ", " + idx1 + "]"].side : null,
									litup: lightup["[" + idx2 + ", " + idx1 + "]"],
									strikable: strike["[" + idx2 + ", " + idx1 + "]"],
									selected: selected,
									setSelected: _this._setSelected,
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
				React.createElement("div", { id: "drawnUnit", onClick: this._onDrawnUnitClick })
			)
		);
	},

	_setSelected: function _setSelected(position, inRange) {
		this.setState({
			selected: position,
			lightup: this._getValidMoves(position, inRange).movableTiles,
			strike: this._getValidMoves(position, inRange).strikableTiles
		});
	},

	_getValidMoves: function _getValidMoves(position, moves) {
		var _this = this;

		if (!moves) {
			return;
		}var output = {};

		var inRange = [];
		var posArr = JSON.parse(position);
		var theBoard = this.state.board;

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
		inRange.filter(function (range) {
			// is on board
			if (!_this._isOnBoard(range)) return false;

			// no unit of the same color on square
			var coordsStr = "[" + range.x + ", " + range.y + "]";
			var targetUnit = _this.state.board[coordsStr];
			if (targetUnit) {
				if (_this.state.board[position].color === targetUnit.color) return false;
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
	} });

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
		var _props = this.props;
		var unit = _props.unit;
		var position = _props.position;
		var color = _props.color;
		var selected = _props.selected;
		var setSelected = _props.setSelected;
		var litup = _props.litup;
		var strikable = _props.strikable;
		var side = _props.side;
		var isSelected = this.state.isSelected;

		var boardState = GameStore.getGameboardState();

		//console.log("what things are before click: ", "unit ", unit, "position ", position, 'color ', color, 'side ', side, "isSelected ", isSelected, "selected", selected);

		// if there is no currently selected unit, click a unit to select it
		if (!selected) {
			if (unit) {
				var moves = behavior[unit][side];
				setSelected(position, moves);
			}
		}
		// if there is currently a selected unit on the board, can do one of the following:
		else {
			if (this.props.litup) {
				// move to a square with an opposite color unit to capture it
				if (unit) {
					GameActions.makeMove(selected, position, true, "move", true);
				}

				// move to an unoccupied square
				else {
					GameActions.makeMove(selected, position, false, "move", true);
				}

				setSelected(null, []);
			} else if (this.props.strikable && unit) {
				GameActions.makeMove(selected, position, true, "strike", true);
				setSelected(null, []);
			}
			// deselect the current unit by clicking on it
			else if (selected === position) {
				setSelected(null, []);
			}
		}
	},

	render: function render() {
		var _props = this.props;
		var unit = _props.unit;
		var color = _props.color;
		var litup = _props.litup;
		var strikable = _props.strikable;
		var side = _props.side;

		var cxObj = {
			unit: !!unit,
			litup: litup,
			strikable: strikable
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

var behavior = _interopRequire(require("../game/behavior"));

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
    _lightup = [],
    _strike = [],
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
            strike: _strike,
            selected: _selected,
            drawUnit: _result
        };
    },

    draw: function draw() {
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
        _result = result;
    } });

// function isOnBoard(coords) {
//   if (!coords.hasOwnProperty('x') || !coords.hasOwnProperty('y')) return false;
//   var coordsStr = `[${coords.y}, ${coords.x}]`
//   return coords.x >= 0 && coords.y >= 0 && coords.x < 6 && coords.y < 6;
// }

// function isValidMove(unit, coords) {
//   var coordsStr = `[${coords.x}, ${coords.y}]`;
//   var targetUnit = _board[coordsStr];

//   if (targetUnit) {
//     //console.log(`unit.color: ${unit.color}`);
//     console.log(`targetUnit.color: ${targetUnit.color}`);
//     if (unit.color === targetUnit.color) return false;
//   }
//   return isOnBoard(coords);
// }

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

    _lightup = {};
    _strike = {};

    _board = {
        "[1, 0]": { unit: "Footman", color: "black", side: "front" },
        "[2, 0]": { unit: "Duke", color: "black", side: "front" },
        "[3, 0]": { unit: "Footman", color: "black", side: "front" },
        "[2, 5]": { unit: "Footman", color: "white", side: "front" },
        "[3, 5]": { unit: "Duke", color: "white", side: "front" },
        "[4, 5]": { unit: "Footman", color: "white", side: "front" }
    };
}

function updateBoard(from, to, type) {
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
    _gameOver = _gameOver.set("status", true).set("winner", options.winner).set("type", options.type);
}

AppDispatcher.register(function (payload) {
    var action = payload.action;
    var emitEvent = true;

    switch (action.actionType) {
        case GameConstants.MAKE_MOVE:
            emitEvent = makeMove(action.from, action.to, action.capture, action.type, action.emitMove);
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

// getValidMoves(square) {
//     return square ? Set(
//         _chess.moves({
//             square: square,
//             verbose: true
//         }).map(move => move.to)) : Set();
// },

// showMoves(unit, from, inRange) {
//      if (!Object.keys(_lightup).length) {
//       inRange.filter(range => {
//           return isValidMove(unit, range);
//       }).forEach(move => {
//           var coordsStr = `[${move.x}, ${move.y}]`;
//           _lightup[coordsStr] = true;
//       })
//       _selected = {position: from, unit: unit};
//     }
//     else {
//       console.log('else');
//       _lightup = [];
//       _selected = null;
//     }
//     //this.setState({_lightup: validMoves});

//     return true;
//     //console.log(this.getState());
//     // console.log('valid Moves:')
//     // console.log(validMoves);

// }

//         strike: _strike,
//         selected: _selected
//     }
// },

},{"../constants/ChessPieces":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/constants/ChessPieces.js","../constants/GameConstants":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/constants/GameConstants.js","../dispatcher/AppDispatcher":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/dispatcher/AppDispatcher.js","../game/behavior":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/game/behavior.js","chess.js":"chess.js","eventemitter2":"eventemitter2","immutable":"immutable"}]},{},["./src/js/play.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvcGxheS5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2tleU1pcnJvci5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9hY3Rpb25zL0NoYXRBY3Rpb25zLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2FjdGlvbnMvR2FtZUFjdGlvbnMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DYXB0dXJlZFBpZWNlcy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0NoYXQuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DaGVzc2JvYXJkLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2hlc3Nib2FyZEludGVyZmFjZS5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0Nsb2NrLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUJvYXJkLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUhlYWRlci5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0dhbWVJbnRlcmZhY2UuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lYm9hcmRJbnRlcmZhY2UuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9Nb2RhbC5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL1RhYmxlT2ZNb3Zlcy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hhdENvbnN0YW50cy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hlc3NQaWVjZXMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29uc3RhbnRzL0dhbWVDb25zdGFudHMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2dhbWUvYmVoYXZpb3IuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvaW8uanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvbWl4aW5zL21heWJlUmV2ZXJzZS5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9taXhpbnMvb25HYW1lQ2hhbmdlLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL3N0b3Jlcy9DaGF0U3RvcmUuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvc3RvcmVzL0dhbWVTdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7OztRQUVOLFVBQVU7O0lBQ1YsS0FBSywyQkFBTSxPQUFPOztJQUNsQixFQUFFLDJCQUFNLE1BQU07O0lBQ2QsYUFBYSwyQkFBTSw0QkFBNEI7O0FBRXRELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVwQyxLQUFLLENBQUMsTUFBTSxDQUNWLG9CQUFDLGFBQWEsSUFBQyxFQUFFLEVBQUUsRUFBRSxBQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sQUFBQyxHQUFHLEVBQ3pDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQ3JDLENBQUM7OztBQ2RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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IihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ2VzNi1zaGltJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgaW8gZnJvbSAnLi9pbyc7XG5pbXBvcnQgR2FtZUludGVyZmFjZSBmcm9tICcuL2NvbXBvbmVudHMvR2FtZUludGVyZmFjZSc7XG5cbmxldCBwYXJhbXMgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgnL3BsYXkvJywgJycpLnNwbGl0KCcvJyk7XG5wYXJhbXNbMV0gPSBwYXJzZUludChwYXJhbXNbMV0sIDEwKTtcbnBhcmFtc1syXSA9IHBhcnNlSW50KHBhcmFtc1syXSwgMTApO1xuXG5SZWFjdC5yZW5kZXIoXG4gIDxHYW1lSW50ZXJmYWNlIGlvPXtpb30gcGFyYW1zPXtwYXJhbXN9IC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcbik7IiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNSBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuXG5mdW5jdGlvbiBjbGFzc05hbWVzKCkge1xuXHR2YXIgY2xhc3NlcyA9ICcnO1xuXHR2YXIgYXJnO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0YXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdGlmICghYXJnKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBhcmcgfHwgJ251bWJlcicgPT09IHR5cGVvZiBhcmcpIHtcblx0XHRcdGNsYXNzZXMgKz0gJyAnICsgYXJnO1xuXHRcdH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcblx0XHRcdGNsYXNzZXMgKz0gJyAnICsgY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdH0gZWxzZSBpZiAoJ29iamVjdCcgPT09IHR5cGVvZiBhcmcpIHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0aWYgKCFhcmcuaGFzT3duUHJvcGVydHkoa2V5KSB8fCAhYXJnW2tleV0pIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjbGFzc2VzICs9ICcgJyArIGtleTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGNsYXNzZXMuc3Vic3RyKDEpO1xufVxuXG4vLyBzYWZlbHkgZXhwb3J0IGNsYXNzTmFtZXMgZm9yIG5vZGUgLyBicm93c2VyaWZ5XG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xufVxuXG4vLyBzYWZlbHkgZXhwb3J0IGNsYXNzTmFtZXMgZm9yIFJlcXVpcmVKU1xuaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHR9KTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ0ludmFyaWFudCBWaW9sYXRpb246ICcgK1xuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGtleU1pcnJvclxuICogQHR5cGVjaGVja3Mgc3RhdGljLW9ubHlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwiLi9pbnZhcmlhbnRcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhbiBlbnVtZXJhdGlvbiB3aXRoIGtleXMgZXF1YWwgdG8gdGhlaXIgdmFsdWUuXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKlxuICogICB2YXIgQ09MT1JTID0ga2V5TWlycm9yKHtibHVlOiBudWxsLCByZWQ6IG51bGx9KTtcbiAqICAgdmFyIG15Q29sb3IgPSBDT0xPUlMuYmx1ZTtcbiAqICAgdmFyIGlzQ29sb3JWYWxpZCA9ICEhQ09MT1JTW215Q29sb3JdO1xuICpcbiAqIFRoZSBsYXN0IGxpbmUgY291bGQgbm90IGJlIHBlcmZvcm1lZCBpZiB0aGUgdmFsdWVzIG9mIHRoZSBnZW5lcmF0ZWQgZW51bSB3ZXJlXG4gKiBub3QgZXF1YWwgdG8gdGhlaXIga2V5cy5cbiAqXG4gKiAgIElucHV0OiAge2tleTE6IHZhbDEsIGtleTI6IHZhbDJ9XG4gKiAgIE91dHB1dDoge2tleTE6IGtleTEsIGtleTI6IGtleTJ9XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9ialxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG52YXIga2V5TWlycm9yID0gZnVuY3Rpb24ob2JqKSB7XG4gIHZhciByZXQgPSB7fTtcbiAgdmFyIGtleTtcbiAgKFwicHJvZHVjdGlvblwiICE9PSBcImRldmVsb3BtZW50XCIgPyBpbnZhcmlhbnQoXG4gICAgb2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KG9iaiksXG4gICAgJ2tleU1pcnJvciguLi4pOiBBcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdC4nXG4gICkgOiBpbnZhcmlhbnQob2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KG9iaikpKTtcbiAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldFtrZXldID0ga2V5O1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU1pcnJvcjtcbiIsImltcG9ydCBDaGF0Q29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9DaGF0Q29uc3RhbnRzJztcbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XG5cbmNvbnN0IENoYXRBY3Rpb25zID0ge1xuICB0b2dnbGVWaXNpYmlsaXR5KCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBDaGF0Q29uc3RhbnRzLlRPR0dMRV9WSVNJQklMSVRZXG4gICAgfSk7XG4gIH0sXG4gIHN1Ym1pdE1lc3NhZ2UobWVzc2FnZSwgY2xhc3NOYW1lLCByZWNlaXZlZCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBDaGF0Q29uc3RhbnRzLlNVQk1JVF9NRVNTQUdFLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgcmVjZWl2ZWQ6IHJlY2VpdmVkXG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoYXRBY3Rpb25zOyIsImltcG9ydCBHYW1lQ29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9HYW1lQ29uc3RhbnRzJztcbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XG5cbmNvbnN0IEdhbWVBY3Rpb25zID0ge1xuICBtYWtlTW92ZShmcm9tLCB0bywgY2FwdHVyZSwgdHlwZSwgZW1pdE1vdmUpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5NQUtFX01PVkUsXG4gICAgICBmcm9tOiBmcm9tLFxuICAgICAgdG86IHRvLFxuICAgICAgY2FwdHVyZTogY2FwdHVyZSxcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBlbWl0TW92ZTogZW1pdE1vdmVcbiAgICB9KTtcbiAgfSxcbiAgc2hvd01vdmVzKHVuaXQsIGZyb20sIGluUmFuZ2UpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5TSE9XX01PVkVTLFxuICAgICAgdW5pdDogdW5pdCxcbiAgICAgIGZyb206IGZyb20sXG4gICAgICBpblJhbmdlOiBpblJhbmdlXG4gICAgfSk7XG4gIH0sXG4gIGRyYXcoKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuRFJBV1xuICAgIH0pO1xuICB9LFxuICByZW1hdGNoKCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLlJFTUFUQ0hcbiAgICB9KTtcbiAgfSxcbiAgZ2FtZU92ZXIob3B0aW9ucykge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLkdBTUVfT1ZFUixcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICB9KTtcbiAgfSxcbiAgY2hhbmdlUHJvbW90aW9uKHByb21vdGlvbikge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLkNIQU5HRV9QUk9NT1RJT04sXG4gICAgICBwcm9tb3Rpb246IHByb21vdGlvblxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lQWN0aW9uczsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XG5cbmNvbnN0IENhcHR1cmVkUGllY2VzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgb25HYW1lQ2hhbmdlXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhcHR1cmVkUGllY2VzOiBHYW1lU3RvcmUuZ2V0Q2FwdHVyZWRQaWVjZXMoKVxuICAgIH07XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjcCA9IHRoaXMuc3RhdGUuY2FwdHVyZWRQaWVjZXM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImNhcHR1cmVkLXBpZWNlc1wiPlxuICAgICAgICB7Y3AubWFwKChwaWVjZXMsIGNvbG9yKSA9PiAoXG4gICAgICAgICAgPHVsIGtleT17Y29sb3J9PlxuICAgICAgICAgICAge3BpZWNlcy5tYXAoKHBpZWNlLCBpKSA9PiA8bGkga2V5PXtpfT57cGllY2V9PC9saT4pLnRvQXJyYXkoKX1cbiAgICAgICAgICA8L3VsPlxuICAgICAgICApKS50b0FycmF5KCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuICBfb25HYW1lQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2FwdHVyZWRQaWVjZXM6IEdhbWVTdG9yZS5nZXRDYXB0dXJlZFBpZWNlcygpXG4gICAgfSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDYXB0dXJlZFBpZWNlczsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IENoYXRTdG9yZSBmcm9tICcuLi9zdG9yZXMvQ2hhdFN0b3JlJztcbmltcG9ydCBDaGF0QWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0NoYXRBY3Rpb25zJztcblxuY29uc3QgQ2hhdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdG9rZW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcbiAgICBzb3VuZHNFbmFibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgb3Blbk1vZGFsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW5dLFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IENoYXRTdG9yZS5nZXRTdGF0ZSgpO1xuICAgIHJldHVybiB7XG4gICAgICBpc0NoYXRIaWRkZW46IHN0YXRlLmlzQ2hhdEhpZGRlbixcbiAgICAgIG1lc3NhZ2VzOiBzdGF0ZS5tZXNzYWdlcyxcbiAgICAgIG1lc3NhZ2U6ICcnLFxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMuaW8ub24oJ3JlY2VpdmUtbWVzc2FnZScsIGRhdGEgPT4ge1xuICAgICAgQ2hhdEFjdGlvbnMuc3VibWl0TWVzc2FnZShkYXRhLm1lc3NhZ2UsIGRhdGEuY29sb3IgKyAnIGxlZnQnLCB0cnVlKTtcbiAgICAgIHRoaXMuX21heWJlUGxheVNvdW5kKCk7XG4gICAgfSk7XG4gICAgQ2hhdFN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYXRTdG9yZUNoYW5nZSk7XG4gICAgXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gMTM5OSkgQ2hhdEFjdGlvbnMudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBDaGF0U3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYXRTdG9yZUNoYW5nZSk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImNoYXQtd3JhcHBlclwiXG4gICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5pc0NoYXRIaWRkZW4gPyAnaGlkZGVuJyA6IG51bGx9PlxuICAgICAgICBcbiAgICAgICAgPGg0PkNoYXQ8L2g0PlxuICAgICAgICA8YSBjbGFzc05hbWU9XCJjbG9zZVwiXG4gICAgICAgICAgIG9uQ2xpY2s9e0NoYXRBY3Rpb25zLnRvZ2dsZVZpc2liaWxpdHl9PlxuICAgICAgICAgIHhcbiAgICAgICAgPC9hPlxuICAgICAgICBcbiAgICAgICAgPGF1ZGlvIHByZWxvYWQ9XCJhdXRvXCIgcmVmPVwibXNnU25kXCI+XG4gICAgICAgICAgPHNvdXJjZSBzcmM9XCIvc25kL21lc3NhZ2UubXAzXCIgLz5cbiAgICAgICAgPC9hdWRpbz5cbiAgICAgICAgXG4gICAgICAgIDx1bCBpZD1cImNoYXQtbGlzdFwiIHJlZj1cImNoYXRcIj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5tZXNzYWdlcy5tYXAoKG1lc3NhZ2UsIGkpID0+IChcbiAgICAgICAgICAgIDxsaSBrZXk9e2l9IGNsYXNzTmFtZT17bWVzc2FnZS5nZXQoJ2NsYXNzTmFtZScpfT5cbiAgICAgICAgICAgICAge21lc3NhZ2UuZ2V0KCdtZXNzYWdlJyl9XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICkpLnRvQXJyYXkoKX1cbiAgICAgICAgPC91bD5cbiAgICAgICAgXG4gICAgICAgIDxzcGFuPldyaXRlIHlvdXIgbWVzc2FnZTo8L3NwYW4+XG4gICAgICAgIFxuICAgICAgICA8Zm9ybSBpZD1cImNoYXQtZm9ybVwiXG4gICAgICAgICAgICAgIG9uU3VibWl0PXt0aGlzLl9zdWJtaXRNZXNzYWdlfT5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICByZWY9XCJtZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNvbG9yfVxuICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5tZXNzYWdlfVxuICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5fb25DaGFuZ2VNZXNzYWdlfSAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuICBfb25DaGF0U3RvcmVDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShDaGF0U3RvcmUuZ2V0U3RhdGUoKSwgdGhpcy5fc2Nyb2xsQ2hhdCk7XG4gIH0sXG4gIF9vbkNoYW5nZU1lc3NhZ2UoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21lc3NhZ2U6IGUudGFyZ2V0LnZhbHVlfSk7XG4gIH0sXG4gIF9zdWJtaXRNZXNzYWdlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qge2lvLCB0b2tlbiwgY29sb3IsIGlzT3Bwb25lbnRBdmFpbGFibGV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5zdGF0ZS5tZXNzYWdlO1xuXG4gICAgaWYgKCFpc09wcG9uZW50QXZhaWxhYmxlKSB7XG4gICAgICB0aGlzLnJlZnMubWVzc2FnZS5nZXRET01Ob2RlKCkuYmx1cigpO1xuICAgICAgdGhpcy5wcm9wcy5vcGVuTW9kYWwoJ2luZm8nLCAnU29ycnksIHlvdXIgb3Bwb25lbnQgaXMgbm90IGNvbm5lY3RlZC4gJyArXG4gICAgICAgICdZb3UgY2Fu4oCYdCBzZW5kIG1lc3NhZ2VzLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIENoYXRBY3Rpb25zLnN1Ym1pdE1lc3NhZ2UobWVzc2FnZSwgY29sb3IgKyAnIHJpZ2h0JywgZmFsc2UpO1xuICAgIHRoaXMuc2V0U3RhdGUoe21lc3NhZ2U6ICcnfSk7XG5cbiAgICBpby5lbWl0KCdzZW5kLW1lc3NhZ2UnLCB7XG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgdG9rZW46IHRva2VuXG4gICAgfSk7XG4gIH0sXG4gIF9zY3JvbGxDaGF0KCkge1xuICAgIGNvbnN0IGNoYXROb2RlID0gdGhpcy5yZWZzLmNoYXQuZ2V0RE9NTm9kZSgpO1xuICAgIGNoYXROb2RlLnNjcm9sbFRvcCA9IGNoYXROb2RlLnNjcm9sbEhlaWdodDtcbiAgfSxcbiAgX21heWJlUGxheVNvdW5kKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnNvdW5kc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMucmVmcy5tc2dTbmQuZ2V0RE9NTm9kZSgpLnBsYXkoKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDaGF0OyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuaW1wb3J0IENoZXNzUGllY2VzIGZyb20gJy4uL2NvbnN0YW50cy9DaGVzc1BpZWNlcyc7XG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuaW1wb3J0IG1heWJlUmV2ZXJzZSBmcm9tICcuLi9taXhpbnMvbWF5YmVSZXZlcnNlJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7U2VxLCBSZXBlYXQsIExpc3QsIFNldH0gZnJvbSAnaW1tdXRhYmxlJztcblxuY29uc3QgRklMRVMgPSBTZXEuSW5kZXhlZCgnYWJjZGVmZ2gnKTtcbmNvbnN0IFJBTktTID0gU2VxLkluZGV4ZWQoJzEyMzQ1Njc4Jyk7XG5cbmNvbnN0IENoZXNzYm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHRva2VuOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbWF5YmVQbGF5U291bmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgZ2FtZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNPcHBvbmVudEF2YWlsYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluLCBtYXliZVJldmVyc2VdLFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IEdhbWVTdG9yZS5nZXRDaGVzc2JvYXJkU3RhdGUoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBmZW46IHN0YXRlLmZlbixcbiAgICAgIG1vdmVGcm9tOiBudWxsLFxuICAgICAgbGFzdE1vdmU6IHN0YXRlLmxhc3RNb3ZlLFxuICAgICAga2luZ0luQ2hlY2s6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3Qge2lvLCB0b2tlbn0gPSB0aGlzLnByb3BzO1xuICAgIEdhbWVTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcbiAgICBHYW1lU3RvcmUub24oJ25ldy1tb3ZlJywgdGhpcy5fb25OZXdNb3ZlKTtcblxuICAgIGlvLm9uKCdtb3ZlJywgZGF0YSA9PiB7XG4gICAgICBHYW1lQWN0aW9ucy5tYWtlTW92ZShkYXRhLmZyb20sIGRhdGEudG8sIGRhdGEuY2FwdHVyZSwgZmFsc2UpO1xuICAgICAgdGhpcy5wcm9wcy5tYXliZVBsYXlTb3VuZCgpO1xuXG4gICAgICBpZiAoIWRhdGEuZ2FtZU92ZXIpIHtcbiAgICAgICAgdGhpcy5fcnVuQ2xvY2soKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGl0bGUnKVswXTtcbiAgICAgICAgdGl0bGUudGV4dCA9ICcqICcgKyB0aXRsZS50ZXh0O1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlvLm9uKCdyZW1hdGNoLWFjY2VwdGVkJywgKCkgPT4gdGhpcy5zZXRTdGF0ZSh7bW92ZUZyb206IG51bGx9KSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIEdhbWVTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gICAgR2FtZVN0b3JlLm9uKCduZXctbW92ZScsIHRoaXMuX29uTmV3TW92ZSk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7Y29sb3IsIGlzT3Bwb25lbnRBdmFpbGFibGUsIGdhbWVPdmVyfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2ZlbiwgbW92ZUZyb20sIGxhc3RNb3ZlLCBraW5nSW5DaGVja30gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGZlbkFycmF5ID0gZmVuLnNwbGl0KCcgJyk7XG4gICAgY29uc3QgcGxhY2VtZW50ID0gZmVuQXJyYXlbMF07XG4gICAgY29uc3QgaXNJdE15VHVybiA9IGZlbkFycmF5WzFdID09PSBjb2xvci5jaGFyQXQoMCk7XG4gICAgY29uc3Qgcm93cyA9IHRoaXMuX21heWJlUmV2ZXJzZShwbGFjZW1lbnQuc3BsaXQoJy8nKSk7XG4gICAgY29uc3QgcmFua3MgPSB0aGlzLl9tYXliZVJldmVyc2UoUkFOS1MsICd3aGl0ZScpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJjaGVzc2JvYXJkXCI+XG4gICAgICAgIHtyb3dzLm1hcCgocGxhY2VtZW50LCBpKSA9PlxuICAgICAgICAgIDxSb3dcbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIHJhbms9e3JhbmtzLmdldChpKX1cbiAgICAgICAgICAgIHBsYWNlbWVudD17cGxhY2VtZW50fVxuICAgICAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICAgICAgaXNNb3ZlYWJsZT17aXNJdE15VHVybiAmJiBpc09wcG9uZW50QXZhaWxhYmxlICYmICFnYW1lT3Zlcn1cbiAgICAgICAgICAgIG1vdmVGcm9tPXttb3ZlRnJvbX1cbiAgICAgICAgICAgIGxhc3RNb3ZlPXtsYXN0TW92ZX1cbiAgICAgICAgICAgIHNldE1vdmVGcm9tPXt0aGlzLl9zZXRNb3ZlRnJvbX1cbiAgICAgICAgICAgIGtpbmdJbkNoZWNrPXtraW5nSW5DaGVja31cbiAgICAgICAgICAgIHZhbGlkTW92ZXM9e0dhbWVTdG9yZS5nZXRWYWxpZE1vdmVzKG1vdmVGcm9tKX0gLz4pfVxuICAgICAgPC90YWJsZT5cbiAgICApO1xuICB9LFxuICBfb25HYW1lQ2hhbmdlKGNiKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBHYW1lU3RvcmUuZ2V0Q2hlc3Nib2FyZFN0YXRlKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBmZW46IHN0YXRlLmZlbixcbiAgICAgIGxhc3RNb3ZlOiBzdGF0ZS5sYXN0TW92ZSxcbiAgICAgIGtpbmdJbkNoZWNrOiBzdGF0ZS5jaGVjayAmJiAoc3RhdGUuZmVuLnNwbGl0KCcgJylbMV0gPT09ICd3JyA/ICdLJyA6ICdrJylcbiAgICB9LCBjYik7XG4gIH0sXG4gIF9zZXRNb3ZlRnJvbShzcXVhcmUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1vdmVGcm9tOiBzcXVhcmVcbiAgICB9KTtcbiAgfSxcbiAgX29uTmV3TW92ZShtb3ZlKSB7XG4gICAgY29uc3Qge2lvLCB0b2tlbn0gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8uZW1pdCgnbmV3LW1vdmUnLCB7XG4gICAgICB0b2tlbjogdG9rZW4sXG4gICAgICBtb3ZlOiBtb3ZlXG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KHRoaXMucHJvcHMubWF5YmVQbGF5U291bmQsIDApO1xuICB9LFxuICBfcnVuQ2xvY2soKSB7XG4gICAgY29uc3Qge2lvLCB0b2tlbiwgY29sb3J9ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLmVtaXQoJ2Nsb2NrLXJ1bicsIHtcbiAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgIGNvbG9yOiBjb2xvclxuICAgIH0pO1xuICB9LFxuICBfcmVtb3ZlQXN0ZXJpc2tGcm9tVGl0bGUoKSB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RpdGxlJylbMF07XG4gICAgdGl0bGUudGV4dCA9IHRpdGxlLnRleHQucmVwbGFjZSgnKiAnLCAnJyk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fcmVtb3ZlQXN0ZXJpc2tGcm9tVGl0bGUpO1xuICB9XG59KTtcblxuY29uc3QgUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHByb3BUeXBlczoge1xuICAgIHJhbms6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJzEnLCcyJywnMycsJzQnLCc1JywnNicsJzcnLCc4J10pLmlzUmVxdWlyZWQsXG4gICAgcGxhY2VtZW50OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgaXNNb3ZlYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBtb3ZlRnJvbTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsYXN0TW92ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzZXRNb3ZlRnJvbTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBraW5nSW5DaGVjazogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtmYWxzZSwgJ0snLCAnayddKS5pc1JlcXVpcmVkLFxuICAgIHZhbGlkTW92ZXM6IFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKFNldCkuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFttYXliZVJldmVyc2VdLFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7cmFuaywgcGxhY2VtZW50LCBjb2xvcn0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZpbGVzID0gdGhpcy5fbWF5YmVSZXZlcnNlKEZJTEVTKTtcbiAgICBjb25zdCBwaWVjZXMgPSB0aGlzLl9tYXliZVJldmVyc2UocGxhY2VtZW50Lmxlbmd0aCA8IDggP1xuICAgICAgU2VxKHBsYWNlbWVudCkuZmxhdE1hcChwaWVjZSA9PiAoXG4gICAgICAgIC9eXFxkJC8udGVzdChwaWVjZSkgPyBSZXBlYXQoJy0nLCBwYXJzZUludChwaWVjZSwgMTApKSA6IHBpZWNlXG4gICAgICApKS50b0FycmF5KCkgOlxuXG4gICAgICBwbGFjZW1lbnQuc3BsaXQoJycpXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8dHI+XG4gICAgICAgIHtwaWVjZXMubWFwKChwaWVjZSwgaSkgPT5cbiAgICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBzcXVhcmU9e2ZpbGVzLmdldChpKSArIHJhbmt9XG4gICAgICAgICAgICBwaWVjZT17cGllY2V9XG4gICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCAncmFuaycsICdwbGFjZW1lbnQnKX0gLz4pfVxuICAgICAgPC90cj5cbiAgICApO1xuICB9XG59KTtcblxuY29uc3QgQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHByb3BUeXBlczoge1xuICAgIHNxdWFyZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHBpZWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgaXNNb3ZlYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBtb3ZlRnJvbTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsYXN0TW92ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzZXRNb3ZlRnJvbTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBraW5nSW5DaGVjazogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtmYWxzZSwgJ0snLCAnayddKS5pc1JlcXVpcmVkLFxuICAgIHZhbGlkTW92ZXM6IFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKFNldCkuaXNSZXF1aXJlZFxuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7bW92ZUZyb20sIGxhc3RNb3ZlLCBzcXVhcmUsIGNvbG9yLFxuICAgICAgICAgICBpc01vdmVhYmxlLCBraW5nSW5DaGVjaywgdmFsaWRNb3Zlc30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHBpZWNlID0gQ2hlc3NQaWVjZXNbdGhpcy5wcm9wcy5waWVjZV07XG4gICAgY29uc3Qgcmd4ID0gY29sb3IgPT09ICd3aGl0ZScgPyAvXltLUVJCTlBdJC8gOiAvXltrcXJibnBdJC87XG4gICAgY29uc3QgaXNEcmFnZ2FibGUgPSByZ3gudGVzdCh0aGlzLnByb3BzLnBpZWNlKTtcbiAgICBjb25zdCBpc0Ryb3BwYWJsZSA9IG1vdmVGcm9tICYmIHZhbGlkTW92ZXMuaGFzKHNxdWFyZSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHRkIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IG1vdmVGcm9tID09PSBzcXVhcmUgJiYgIXZhbGlkTW92ZXMuaXNFbXB0eSgpLFxuICAgICAgICAgICAgZnJvbTogbGFzdE1vdmUuZ2V0KCdmcm9tJykgPT09IHNxdWFyZSxcbiAgICAgICAgICAgIHRvOiBsYXN0TW92ZS5nZXQoJ3RvJykgPT09IHNxdWFyZSxcbiAgICAgICAgICAgIGRyb3BwYWJsZTogaXNEcm9wcGFibGVcbiAgICAgICAgICB9KX1cbiAgICAgICAgICBvbkNsaWNrPXshcGllY2UgPyB0aGlzLl9vbkNsaWNrU3F1YXJlIDogbnVsbH1cbiAgICAgICAgICBvbkRyYWdPdmVyPXtpc0Ryb3BwYWJsZSA/IHRoaXMuX29uRHJhZ092ZXIgOiBudWxsfVxuICAgICAgICAgIG9uRHJvcD17aXNEcm9wcGFibGUgPyB0aGlzLl9vbkRyb3AgOiBudWxsfT5cblxuICAgICAgICB7cGllY2UgP1xuICAgICAgICAgIDxhIGNsYXNzTmFtZT17a2luZ0luQ2hlY2sgPT09IHRoaXMucHJvcHMucGllY2UgPyAnaW4tY2hlY2snIDogbnVsbH1cbiAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9vbkNsaWNrU3F1YXJlfVxuICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXt0aGlzLl9vbkRyYWdTdGFydH1cbiAgICAgICAgICAgICBkcmFnZ2FibGU9e2lzRHJhZ2dhYmxlICYmIGlzTW92ZWFibGV9PlxuICAgICAgICAgICAge3BpZWNlfVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgOm51bGx9XG4gICAgICA8L3RkPlxuICAgICk7XG4gIH0sXG4gIF9vbkNsaWNrU3F1YXJlKCkge1xuICAgIGNvbnN0IHtpc01vdmVhYmxlLCBjb2xvciwgbW92ZUZyb20sIHNxdWFyZSwgcGllY2V9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCByZ3ggPSBjb2xvciA9PT0gJ3doaXRlJyA/IC9eW0tRUkJOUF0kLyA6IC9eW2txcmJucF0kLztcblxuICAgIGlmICghaXNNb3ZlYWJsZSB8fCAoIW1vdmVGcm9tICYmICFyZ3gudGVzdChwaWVjZSkpKVxuICAgICAgcmV0dXJuO1xuICAgIGVsc2UgaWYgKG1vdmVGcm9tICYmIG1vdmVGcm9tID09PSBzcXVhcmUpXG4gICAgICB0aGlzLnByb3BzLnNldE1vdmVGcm9tKG51bGwpO1xuICAgIGVsc2UgaWYgKHJneC50ZXN0KHBpZWNlKSlcbiAgICAgIHRoaXMucHJvcHMuc2V0TW92ZUZyb20oc3F1YXJlKTtcbiAgICBlbHNlXG4gICAgICBHYW1lQWN0aW9ucy5tYWtlTW92ZShtb3ZlRnJvbSwgc3F1YXJlLCBDaGVzc1BpZWNlc1twaWVjZV0sIHRydWUpO1xuICB9LFxuICBfb25EcmFnU3RhcnQoZSkge1xuICAgIGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gICAgLy8gc2V0RGF0YSBpcyByZXF1aXJlZCBieSBmaXJlZm94XG4gICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsICcnKTtcblxuICAgIHRoaXMucHJvcHMuc2V0TW92ZUZyb20odGhpcy5wcm9wcy5zcXVhcmUpO1xuICB9LFxuICBfb25EcmFnT3ZlcihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gIH0sXG4gIF9vbkRyb3AoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB7bW92ZUZyb20sIHNxdWFyZSwgcGllY2V9ID0gdGhpcy5wcm9wcztcbiAgICBHYW1lQWN0aW9ucy5tYWtlTW92ZShtb3ZlRnJvbSwgc3F1YXJlLCBDaGVzc1BpZWNlc1twaWVjZV0sIHRydWUpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hlc3Nib2FyZDsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XG5pbXBvcnQgQ2hlc3Nib2FyZCBmcm9tICcuL0NoZXNzYm9hcmQnO1xuaW1wb3J0IENhcHR1cmVkUGllY2VzIGZyb20gJy4vQ2FwdHVyZWRQaWVjZXMnO1xuaW1wb3J0IFRhYmxlT2ZNb3ZlcyBmcm9tICcuL1RhYmxlT2ZNb3Zlcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmNvbnN0IENoZXNzYm9hcmRJbnRlcmZhY2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHRva2VuOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc291bmRzRW5hYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcbiAgICBnYW1lT3ZlcjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgb25HYW1lQ2hhbmdlXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIEdhbWVTdG9yZS5nZXRTdGF0ZSgpO1xuICB9LFxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSAmJlxuICAgICAgICAhcHJldlByb3BzLmdhbWVPdmVyLmdldCgnc3RhdHVzJykpIHtcbiAgICAgIHRoaXMucHJvcHMub3Blbk1vZGFsKCdpbmZvJywgdGhpcy5fZ2V0R2FtZU92ZXJNZXNzYWdlKCkpO1xuICAgIH1cbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtwcm9tb3Rpb24sIHR1cm4sIGdhbWVPdmVyLCBjaGVja30gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJib2FyZC1tb3Zlcy13cmFwcGVyXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cbiAgICAgICAgXG4gICAgICAgIDxhdWRpbyBwcmVsb2FkPVwiYXV0b1wiIHJlZj1cIm1vdmVTbmRcIj5cbiAgICAgICAgICA8c291cmNlIHNyYz1cIi9zbmQvbW92ZS5tcDNcIiAvPlxuICAgICAgICA8L2F1ZGlvPlxuICAgICAgICA8YXVkaW8gcHJlbG9hZD1cImF1dG9cIiByZWY9XCJjaGVja1NuZFwiPlxuICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiL3NuZC9jaGVjay5tcDNcIiAvPlxuICAgICAgICA8L2F1ZGlvPlxuXG4gICAgICAgIDxkaXYgaWQ9XCJib2FyZC13cmFwcGVyXCI+XG4gICAgICAgICAgPENhcHR1cmVkUGllY2VzIC8+XG4gICAgICAgICAgPENoZXNzYm9hcmRcbiAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsICdzb3VuZHNFbmFibGVkJywgJ2dhbWVPdmVyJyl9XG4gICAgICAgICAgICBnYW1lT3Zlcj17Z2FtZU92ZXIuZ2V0KCdzdGF0dXMnKX1cbiAgICAgICAgICAgIG1heWJlUGxheVNvdW5kPXt0aGlzLl9tYXliZVBsYXlTb3VuZH0gLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPFRhYmxlT2ZNb3ZlcyAvPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInByb21vdGlvblwiPlxuICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIDxzcGFuPlByb21vdGlvbjogPC9zcGFuPlxuICAgICAgICAgICAgPHNlbGVjdCB2YWx1ZT17cHJvbW90aW9ufVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5fb25Qcm9tb3Rpb25DaGFuZ2V9PlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicVwiPlF1ZWVuPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyXCI+Um9vazwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYlwiPkJpc2hvcDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiblwiPktuaWdodDwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZlZWRiYWNrXCI+XG4gICAgICAgICAgeyFnYW1lT3Zlci5nZXQoJ3N0YXR1cycpID8gXG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgIHsvKiBGIC0+IHdoaXRlIGtpbmcsIGYgLT4gYmxhY2sga2luZyovXG4gICAgICAgICAgICAgICAgICB0dXJuID09PSAndycgPyAnRicgOiAnZid9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAge2Ake3R1cm4gPT09ICd3JyA/ICdXaGl0ZScgOiAnQmxhY2snfSB0byBtb3ZlLmB9XG4gICAgICAgICAgICAgIHtjaGVjayA/IDxzdHJvbmc+IENoZWNrLjwvc3Ryb25nPiA6IG51bGx9XG4gICAgICAgICAgICA8L3NwYW4+IDpcblxuICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgIHtnYW1lT3Zlci5nZXQoJ3dpbm5lcicpID09PSAnV2hpdGUnID8gJ0YnIDogJ2YnfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIHt0aGlzLl9nZXRHYW1lT3Zlck1lc3NhZ2UoKX1cbiAgICAgICAgICAgIDwvc3Ryb25nPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgX29uR2FtZUNoYW5nZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKEdhbWVTdG9yZS5nZXRTdGF0ZSgpKTtcbiAgfSxcbiAgX29uUHJvbW90aW9uQ2hhbmdlKGUpIHtcbiAgICBHYW1lQWN0aW9ucy5jaGFuZ2VQcm9tb3Rpb24oZS50YXJnZXQudmFsdWUpO1xuICB9LFxuICBfbWF5YmVQbGF5U291bmQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc291bmRzRW5hYmxlZCkge1xuICAgICAgdGhpcy5yZWZzW3RoaXMuc3RhdGUuY2hlY2sgPyAnY2hlY2tTbmQnIDogJ21vdmVTbmQnXS5nZXRET01Ob2RlKCkucGxheSgpO1xuICAgIH1cbiAgfSxcbiAgX2dldEdhbWVPdmVyTWVzc2FnZSgpIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5wcm9wcy5nYW1lT3Zlci5nZXQoJ3R5cGUnKTtcbiAgICBjb25zdCB3aW5uZXIgPSB0aGlzLnByb3BzLmdhbWVPdmVyLmdldCgnd2lubmVyJyk7XG4gICAgY29uc3QgbG9zZXIgPSB3aW5uZXIgPT09ICdXaGl0ZScgPyAnQmxhY2snIDogJ1doaXRlJztcblxuICAgIHJldHVybiB0eXBlID09PSAnY2hlY2ttYXRlJyA/IGBDaGVja21hdGUuICR7d2lubmVyfSB3aW5zIWAgOlxuICAgICAgdHlwZSA9PT0gJ3RpbWVvdXQnID8gYCR7bG9zZXJ94oCYcyB0aW1lIGlzIG91dC4gJHt3aW5uZXJ9IHdpbnMhYCA6XG4gICAgICB0eXBlID09PSAncmVzaWduJyA/IGAke2xvc2VyfSBoYXMgcmVzaWduZWQuICR7d2lubmVyfSB3aW5zIWAgOlxuICAgICAgdHlwZSA9PT0gJ2RyYXcnID8gJ0RyYXcuJyA6XG4gICAgICB0eXBlID09PSAnc3RhbGVtYXRlJyA/ICdEcmF3IChTdGFsZW1hdGUpLicgOlxuICAgICAgdHlwZSA9PT0gJ3RocmVlZm9sZFJlcGV0aXRpb24nID8gJ0RyYXcgKFRocmVlZm9sZCBSZXBldGl0aW9uKS4nIDpcbiAgICAgIHR5cGUgPT09ICdpbnN1ZmZpY2llbnRNYXRlcmlhbCcgPyAnRHJhdyAoSW5zdWZmaWNpZW50IE1hdGVyaWFsKScgOiAnJztcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENoZXNzYm9hcmRJbnRlcmZhY2U7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcblxuY29uc3QgUHVyZVJlbmRlck1peGluID0gUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbjtcblxuY29uc3QgQ2xvY2sgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHBhcmFtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUHVyZVJlbmRlck1peGluXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3QgW18sIHRpbWUsIGluY10gPSB0aGlzLnByb3BzLnBhcmFtcztcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgd2hpdGU6IHRpbWUgKiA2MCxcbiAgICAgIGJsYWNrOiB0aW1lICogNjAsXG4gICAgICBpbmM6IGluYyxcbiAgICAgIGNvdW50ZG93bjogbnVsbFxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IGlvID0gdGhpcy5wcm9wcy5pbztcblxuICAgIGlvLm9uKCdjb3VudGRvd24nLCBkYXRhID0+IHRoaXMuc2V0U3RhdGUoe1xuICAgICAgW2RhdGEuY29sb3JdOiBkYXRhLnRpbWUsXG4gICAgICBjb3VudGRvd246IGRhdGEuY29sb3JcbiAgICB9KSk7XG5cbiAgICBpby5vbignY291bnRkb3duLWdhbWVvdmVyJywgZGF0YSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtjb3VudGRvd246IG51bGx9KTtcbiAgICAgIEdhbWVBY3Rpb25zLmdhbWVPdmVyKHtcbiAgICAgICAgdHlwZTogJ3RpbWVvdXQnLFxuICAgICAgICB3aW5uZXI6IGRhdGEuY29sb3IgPT09ICdibGFjaycgPyAnV2hpdGUnIDogJ0JsYWNrJ1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpby5vbigncmVtYXRjaC1hY2NlcHRlZCcsICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB3aGl0ZTogdGhpcy5wcm9wcy5wYXJhbXNbMV0gKiA2MCxcbiAgICAgICAgYmxhY2s6IHRoaXMucHJvcHMucGFyYW1zWzFdICogNjBcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBpZD1cImNsb2NrXCI+XG4gICAgICAgIDxUaW1lclxuICAgICAgICAgIGNvbG9yPVwid2hpdGVcIlxuICAgICAgICAgIHRpbWU9e3RoaXMuc3RhdGUud2hpdGV9XG4gICAgICAgICAgY291bnRkb3duPXt0aGlzLnN0YXRlLmNvdW50ZG93bn0gLz5cbiAgICAgICAgPFRpbWVyXG4gICAgICAgICAgY29sb3I9XCJibGFja1wiXG4gICAgICAgICAgdGltZT17dGhpcy5zdGF0ZS5ibGFja31cbiAgICAgICAgICBjb3VudGRvd249e3RoaXMuc3RhdGUuY291bnRkb3dufSAvPlxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG59KTtcblxuY29uc3QgVGltZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgbWl4aW5zOiBbUHVyZVJlbmRlck1peGluXSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3RpbWUsIGNvbG9yLCBjb3VudGRvd259ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBtaW4gPSBNYXRoLmZsb29yKHRpbWUgLyA2MCk7XG4gICAgY29uc3Qgc2VjID0gdGltZSAlIDYwO1xuICAgIGNvbnN0IHRpbWVMZWZ0ID0gYCR7bWlufToke3NlYyA8IDEwID8gJzAnICsgc2VjIDogc2VjfWA7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT17Y29sb3IgKyAoY29sb3IgPT09IGNvdW50ZG93biA/ICcgdGlja2luZycgOiAnJyl9PlxuICAgICAgICB7dGltZUxlZnR9XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDbG9jazsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcbi8vaW1wb3J0IENoZXNzUGllY2VzIGZyb20gJy4uL2NvbnN0YW50cy9DaGVzc1BpZWNlcyc7XG4vL2ltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XG4vL2ltcG9ydCBtYXliZVJldmVyc2UgZnJvbSAnLi4vbWl4aW5zL21heWJlUmV2ZXJzZSc7XG5pbXBvcnQgYmVoYXZpb3IgZnJvbSAnLi4vZ2FtZS9iZWhhdmlvcic7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IEdhbWVCb2FyZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cblx0fSxcblx0bWl4aW5zOiBbXSxcblx0Z2V0SW5pdGlhbFN0YXRlKCkge1xuXHRcdC8vcmV0dXJuIG51bGw7XG5cdFx0dGhpcy5zdGF0ZSA9IEdhbWVTdG9yZS5nZXRHYW1lYm9hcmRTdGF0ZSgpO1xuXHRcdCAvL3RoaXMucmVzdWx0O1xuXHRcdGNvbnNvbGUubG9nKFwic3RhdGU/IFwiLCB0aGlzLnN0YXRlKTtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZTtcblx0fSxcblx0X29uQnV0dG9uQ2xpY2soKXtcblx0XHRjb25zb2xlLmxvZyhcImJ1dHRvbiBpcyBjbGlja2VkISFcIik7XG5cdFx0R2FtZVN0b3JlLmRyYXcoKTtcblx0XHR0aGlzLnN0YXRlLmRyYXdVbml0ID0gR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCkuZHJhd1VuaXQ7XG5cdFx0Y29uc29sZS5sb2codGhpcy5zdGF0ZS5kcmF3VW5pdCk7XG5cdFx0Y29uc29sZS5sb2coT2JqZWN0LmtleXModGhpcy5zdGF0ZS5kcmF3VW5pdClbMF0pO1xuXHRcdHZhciB1bml0ID0gT2JqZWN0LmtleXModGhpcy5zdGF0ZS5kcmF3VW5pdClbMF07XG5cdFx0dmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJhd25Vbml0Jyk7XG5cdFx0Y29uc29sZS5sb2coXCJlbGVtZW50IGlzIHJldHJpdmVkXCIsIGVsZW1lbnQpO1xuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChgJHt1bml0fWApO1xuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIndoaXRlXCIpO1xuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImZyb250XCIpO1xuXHRcdC8vIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChgJHt1bml0fWApO1xuXHRcdC8vIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKTtcblx0XHQvLyBlbGVtZW50LnNldEF0dHJpYnV0ZShcInNpZGVcIiwgXCJmcm9udFwiKTtcblx0XHQvLydbMSwgMF0nOiB7dW5pdDogJ0Zvb3RtYW4nLCBjb2xvcjogJ2JsYWNrJywgc2Ake2lkZTogJ2Zyb250J30sXG5cblx0XHRcblx0fSxcblx0X29uRHJhd25Vbml0Q2xpY2soKXtcblx0XHR2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcmF3blVuaXQnKTtcblx0XHQvL2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImJhY2tcIik7XG5cdFx0aWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZnJvbnRcIikpIHtcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImZyb250XCIpO1xuXHRcdCBcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJhY2tcIik7XG5cdFx0fVxuXHRcdGVsc2UgaWYoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJiYWNrXCIpKXtcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImJhY2tcIik7XG5cdFx0IFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZnJvbnRcIik7XG5cdFx0fVxuXHR9LFxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdEdhbWVTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLl9vbkNoYW5nZSk7XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdEdhbWVTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLl9vbkNoYW5nZSk7XG5cdH0sXG5cdF9vbkNoYW5nZSgpIHtcblx0XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRsaWdodHVwOiBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKS5saWdodHVwXG5cdFx0fSk7XG5cdH0sXG5cdHJlbmRlcigpIHtcblx0XHR2YXIge3N0YXRlLCBwcm9wc30gPSB0aGlzLCBcblx0XHRcdHtzaXplfSA9IHByb3BzLFxuXHRcdFx0e2JvYXJkLCBzZWxlY3RlZH0gPSBzdGF0ZTtcblxuXHRcdHZhciBsaWdodHVwID0gdGhpcy5zdGF0ZS5saWdodHVwLCBzdHJpa2UgPSB0aGlzLnN0YXRlLnN0cmlrZTtcblx0XHR2YXIgY2VsbEFycmF5ID0gW107XG5cdFx0Zm9yICh2YXIgaT0wOyBpPHNpemU7IGkrKykge1xuXHRcdFx0dmFyIHJvdyA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaj0wOyBqPHNpemU7IGorKykge1xuXHRcdFx0XHRyb3cucHVzaCh7eDpqLCB5Oml9KVxuXHRcdFx0fVxuXHRcdFx0Y2VsbEFycmF5LnB1c2gocm93KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdDx0YWJsZSBjbGFzc05hbWU9XCJib2FyZFwiPlxuXHRcdFx0e2NlbGxBcnJheS5tYXAoKHJvdywgaWR4MSkgPT4gXG5cdFx0XHRcdDx0cj5cblx0XHRcdFx0XHR7cm93Lm1hcCgoY2VsbCwgaWR4MikgPT5cblx0XHRcdFx0XHRcdDx0ZCBwb3NpdGlvbj17YFske2lkeDJ9LCAke2lkeDF9XWB9PlxuXHRcdFx0XHRcdFx0XHQ8Q2VsbCByZWY9e2BbJHtpZHgyfSwgJHtpZHgxfV1gfVx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0IHBvc2l0aW9uPXtgWyR7aWR4Mn0sICR7aWR4MX1dYH0gXG5cdFx0XHRcdFx0XHRcdFx0dW5pdD17Ym9hcmRbYFske2lkeDJ9LCAke2lkeDF9XWBdID8gYm9hcmRbYFske2lkeDJ9LCAke2lkeDF9XWBdLnVuaXQgOiBudWxsfSBcblx0XHRcdFx0XHRcdFx0XHRjb2xvcj17Ym9hcmRbYFske2lkeDJ9LCAke2lkeDF9XWBdID8gYm9hcmRbYFske2lkeDJ9LCAke2lkeDF9XWBdLmNvbG9yIDogbnVsbH1cblx0XHRcdFx0XHRcdFx0XHRzaWRlPXtib2FyZFtgWyR7aWR4Mn0sICR7aWR4MX1dYF0gPyBib2FyZFtgWyR7aWR4Mn0sICR7aWR4MX1dYF0uc2lkZSA6IG51bGx9XG5cdFx0XHRcdFx0XHRcdFx0bGl0dXA9e2xpZ2h0dXBbYFske2lkeDJ9LCAke2lkeDF9XWBdfVxuXHRcdFx0XHRcdFx0XHRcdHN0cmlrYWJsZT17c3RyaWtlW2BbJHtpZHgyfSwgJHtpZHgxfV1gXX1cblx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZCA9IHtzZWxlY3RlZH1cblx0XHRcdFx0XHRcdFx0XHRzZXRTZWxlY3RlZD17dGhpcy5fc2V0U2VsZWN0ZWR9XG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5fb25DZWxsQ2xpY2t9Lz5cblx0XHRcdFx0XHRcdDwvdGQ+XG5cdFx0XHRcdFx0KX1cblx0XHRcdFx0PC90cj5cblx0XHRcdCl9XG5cdFx0XHQ8L3RhYmxlPlxuXHRcdFx0PGRpdiBpZD1cImRyYXdcIj5cblx0XHRcdFx0PGJ1dHRvbiBjbGFzc05hbWU9XCJidG5cIiBvbkNsaWNrPXt0aGlzLl9vbkJ1dHRvbkNsaWNrfT5EUkFXPC9idXR0b24+XG5cdFx0XHRcdDxkaXYgaWQ9XCJkcmF3blVuaXRcIiBvbkNsaWNrPXt0aGlzLl9vbkRyYXduVW5pdENsaWNrfT48L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fSxcblxuXHRfc2V0U2VsZWN0ZWQocG9zaXRpb24sIGluUmFuZ2UpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNlbGVjdGVkOiBwb3NpdGlvbixcblx0XHRcdGxpZ2h0dXA6IHRoaXMuX2dldFZhbGlkTW92ZXMocG9zaXRpb24sIGluUmFuZ2UpLm1vdmFibGVUaWxlcyxcblx0XHRcdHN0cmlrZTogdGhpcy5fZ2V0VmFsaWRNb3Zlcyhwb3NpdGlvbiwgaW5SYW5nZSkuc3RyaWthYmxlVGlsZXNcblx0XHR9KVxuXG5cdH0sXG5cblx0X2dldFZhbGlkTW92ZXMocG9zaXRpb24sIG1vdmVzKSB7XG5cdFx0aWYgKCFtb3ZlcykgcmV0dXJuO1xuXHRcdHZhciBvdXRwdXQgPSB7fTtcblxuXHRcdHZhciBpblJhbmdlID0gW107XG5cdFx0dmFyIHBvc0FyciA9IEpTT04ucGFyc2UocG9zaXRpb24pO1xuXHRcdHZhciB0aGVCb2FyZCA9IHRoaXMuc3RhdGUuYm9hcmQ7XG5cblx0XHRPYmplY3Qua2V5cyhtb3ZlcykubWFwKGZ1bmN0aW9uKG1vdmUpe1xuXHRcdFx0dmFyIG1vdmVBcnIgPSBKU09OLnBhcnNlKG1vdmUpO1xuXG5cdFx0XHRpZiAobW92ZXNbbW92ZV0gPT09ICdtb3ZlJyB8fCBtb3Zlc1ttb3ZlXSA9PT0gJ2p1bXAnKSB7XG5cdFx0XHRcdGxldCB4ID0gIHBvc0FyclswXSArIG1vdmVBcnJbMF0sIFxuXHRcdFx0XHRcdHkgPSAgcG9zQXJyWzFdICsgbW92ZUFyclsxXTtcblx0XHRcdFx0aW5SYW5nZS5wdXNoKHt4OiB4LCB5OiB5LCB0eXBlOiAnbW92ZSd9KTtcdFx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChtb3Zlc1ttb3ZlXSA9PT0gJ3NsaWRlJyB8fCBtb3Zlc1ttb3ZlXSA9PT0gJ2p1bXAgc2xpZGUnKSB7XG5cblx0XHRcdFx0bGV0IGRlbHRhWCA9IG1vdmVBcnJbMF0gPyBtb3ZlQXJyWzBdL01hdGguYWJzKG1vdmVBcnJbMF0pIDogbW92ZUFyclswXSwgXG5cdFx0XHRcdFx0ZGVsdGFZID0gbW92ZUFyclsxXSA/IG1vdmVBcnJbMV0vTWF0aC5hYnMobW92ZUFyclsxXSkgOiBtb3ZlQXJyWzFdO1xuXG5cdFx0XHRcdGxldCBpID0gcG9zQXJyWzBdICsgZGVsdGFYLCBqID0gcG9zQXJyWzFdICsgZGVsdGFZO1xuXHRcdFx0XHR3aGlsZSAoaT49MCAmJiBpPDYgJiYgaj49MCAmJiBqPDYpIHtcblx0XHRcdFx0XHRsZXQgdW5pdEluVGhlV2F5ID0gdGhlQm9hcmRbYFske2l9LCAke2p9XWBdO1xuXHRcdFx0XHRcdGlmICh1bml0SW5UaGVXYXkgJiYgbW92ZXNbbW92ZV0gPT09ICdzbGlkZScpIHtcblx0XHRcdFx0XHRcdGlmICh1bml0SW5UaGVXYXkuY29sb3IgIT09IHRoZUJvYXJkW3Bvc2l0aW9uXS5jb2xvcikge1xuXHRcdFx0XHRcdFx0XHRpblJhbmdlLnB1c2goe3g6IGksIHk6IGosIHR5cGU6ICdtb3ZlJ30pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaW5SYW5nZS5wdXNoKHt4OiBpLCB5OiBqLCB0eXBlOiAnbW92ZSd9KTtcblx0XHRcdFx0XHRpICs9IGRlbHRhWDtcblx0XHRcdFx0XHRqICs9IGRlbHRhWTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAobW92ZXNbbW92ZV0gPT09ICdzdHJpa2UnKSB7XG5cdFx0XHRcdGxldCB4ID0gcG9zQXJyWzBdICsgbW92ZUFyclswXSxcblx0XHRcdFx0XHR5ID0gcG9zQXJyWzFdICsgbW92ZUFyclsxXTtcblx0XHRcdFx0aW5SYW5nZS5wdXNoKHt4OiB4LCB5OiB5LCB0eXBlOiAnc3RyaWtlJ30pO1xuXHRcdFx0fVx0XHRcblx0XHR9KTtcblxuXHRcdHZhciBtb3ZhYmxlVGlsZXMgPSB7fSwgc3RyaWthYmxlVGlsZXMgPSB7fTtcblx0XHRpblJhbmdlLmZpbHRlcihyYW5nZSA9PiB7XG5cdFx0XHQvLyBpcyBvbiBib2FyZFxuXHRcdFx0aWYgKCF0aGlzLl9pc09uQm9hcmQocmFuZ2UpKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdC8vIG5vIHVuaXQgb2YgdGhlIHNhbWUgY29sb3Igb24gc3F1YXJlXG5cdFx0XHRsZXQgY29vcmRzU3RyID0gYFske3JhbmdlLnh9LCAke3JhbmdlLnl9XWA7XG5cdFx0XHRsZXQgdGFyZ2V0VW5pdCA9IHRoaXMuc3RhdGUuYm9hcmRbY29vcmRzU3RyXTtcblx0XHRcdGlmICh0YXJnZXRVbml0KSB7XG5cdFx0XHRcdGlmICh0aGlzLnN0YXRlLmJvYXJkW3Bvc2l0aW9uXS5jb2xvciA9PT0gdGFyZ2V0VW5pdC5jb2xvcikgcmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9KS5mb3JFYWNoKHJhbmdlID0+IHtcblx0XHRcdGlmIChyYW5nZS50eXBlID09PSAnbW92ZScpXG5cdFx0XHRcdG1vdmFibGVUaWxlc1tgWyR7cmFuZ2UueH0sICR7cmFuZ2UueX1dYF0gPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAocmFuZ2UudHlwZSA9PT0gJ3N0cmlrZScpXG5cdFx0XHRcdHN0cmlrYWJsZVRpbGVzW2BbJHtyYW5nZS54fSwgJHtyYW5nZS55fV1gXSA9IHRydWU7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bW92YWJsZVRpbGVzOiBtb3ZhYmxlVGlsZXMsXG5cdFx0XHRzdHJpa2FibGVUaWxlczogc3RyaWthYmxlVGlsZXNcblx0XHR9O1xuXHR9LFxuXG5cdF9pc09uQm9hcmQoY29vcmRzKSB7XG5cdCAgcmV0dXJuIGNvb3Jkcy54ID49IDAgJiYgY29vcmRzLnkgPj0gMCAmJiBjb29yZHMueCA8IDYgJiYgY29vcmRzLnkgPCA2O1xuXHR9LFxuXG59KTtcblxuXG5jb25zdCBDZWxsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6IHtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICBcdCByZXR1cm4ge1xuICAgIFx0IFx0Ly9zaWRlOiAnZnJvbnQnLFxuICAgIFx0IFx0aXNTZWxlY3RlZDogZmFsc2VcbiAgICBcdCB9O1xuICBcdH0sXG4gIFx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cblx0XHRcblx0fSxcblxuXHRjb21wb25lbnRXaWxsTW91bnQoKSB7XG5cdFx0XG5cdFxuXHR9LFxuXHRtaXhpbnM6IFtdLFxuXG5cdFxuXHRfb25DbGlja1NxdWFyZSgpIHtcblxuXHRcdGNvbnN0IHt1bml0LCBwb3NpdGlvbiwgY29sb3IsIHNlbGVjdGVkLCBzZXRTZWxlY3RlZCwgbGl0dXAsIHN0cmlrYWJsZSwgc2lkZX0gPSB0aGlzLnByb3BzO1xuXG5cdFx0Y29uc3Qge2lzU2VsZWN0ZWR9ID0gdGhpcy5zdGF0ZTtcblx0XHR2YXIgYm9hcmRTdGF0ZSA9IEdhbWVTdG9yZS5nZXRHYW1lYm9hcmRTdGF0ZSgpO1xuXG5cdFx0Ly9jb25zb2xlLmxvZyhcIndoYXQgdGhpbmdzIGFyZSBiZWZvcmUgY2xpY2s6IFwiLCBcInVuaXQgXCIsIHVuaXQsIFwicG9zaXRpb24gXCIsIHBvc2l0aW9uLCAnY29sb3IgJywgY29sb3IsICdzaWRlICcsIHNpZGUsIFwiaXNTZWxlY3RlZCBcIiwgaXNTZWxlY3RlZCwgXCJzZWxlY3RlZFwiLCBzZWxlY3RlZCk7XG5cdFx0XG5cblx0XHQvLyBpZiB0aGVyZSBpcyBubyBjdXJyZW50bHkgc2VsZWN0ZWQgdW5pdCwgY2xpY2sgYSB1bml0IHRvIHNlbGVjdCBpdFxuXHRcdGlmICghc2VsZWN0ZWQpIHtcblx0XHRcdGlmICh1bml0KSB7XG5cdFx0XHRcdHZhciBtb3ZlcyA9IGJlaGF2aW9yW3VuaXRdW3NpZGVdO1xuXHRcdFx0XHRzZXRTZWxlY3RlZChwb3NpdGlvbiwgbW92ZXMpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBpZiB0aGVyZSBpcyBjdXJyZW50bHkgYSBzZWxlY3RlZCB1bml0IG9uIHRoZSBib2FyZCwgY2FuIGRvIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKHRoaXMucHJvcHMubGl0dXApIHtcblx0XHRcdFx0Ly8gbW92ZSB0byBhIHNxdWFyZSB3aXRoIGFuIG9wcG9zaXRlIGNvbG9yIHVuaXQgdG8gY2FwdHVyZSBpdFxuXHRcdFx0XHRpZiAodW5pdCkge1xuXHRcdFx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKHNlbGVjdGVkLCBwb3NpdGlvbiwgdHJ1ZSwgJ21vdmUnLCB0cnVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIG1vdmUgdG8gYW4gdW5vY2N1cGllZCBzcXVhcmVcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCBmYWxzZSwgJ21vdmUnLCB0cnVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNldFNlbGVjdGVkKG51bGwsIFtdKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHRoaXMucHJvcHMuc3RyaWthYmxlICYmIHVuaXQpIHtcblx0XHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCB0cnVlLCAnc3RyaWtlJywgdHJ1ZSk7XG5cdFx0XHRcdHNldFNlbGVjdGVkKG51bGwsIFtdKTtcblx0XHRcdH1cblx0XHRcdC8vIGRlc2VsZWN0IHRoZSBjdXJyZW50IHVuaXQgYnkgY2xpY2tpbmcgb24gaXRcblx0XHRcdGVsc2UgaWYgKHNlbGVjdGVkID09PSBwb3NpdGlvbikge1xuXHRcdFx0XHRzZXRTZWxlY3RlZChudWxsLCBbXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHR9LFxuXG5cdHJlbmRlcigpe1xuXHRcdHZhciB7dW5pdCwgY29sb3IsIGxpdHVwLCBzdHJpa2FibGUsIHNpZGV9ID0gdGhpcy5wcm9wcztcblxuXG5cdFx0dmFyIGN4T2JqID0ge1x0XG5cdFx0XHR1bml0OiAhIXVuaXQsXG5cdFx0XHRsaXR1cDogbGl0dXAsXG5cdFx0XHRzdHJpa2FibGU6IHN0cmlrYWJsZVxuXHRcdH07XG5cdFx0Y3hPYmpbc2lkZV0gPSB0cnVlO1xuXHRcdGlmICh1bml0KSB7XG5cdFx0XHRjeE9ialt1bml0XSA9IHRydWU7XG5cdFx0XHRjeE9ialtjb2xvcl0gPSB0cnVlO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2N4KGN4T2JqKX1cblx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLl9vbkNsaWNrU3F1YXJlfT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7Qm9hcmQ6IEdhbWVCb2FyZCwgQ2VsbDogQ2VsbH07IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBDbG9jayBmcm9tICcuL0Nsb2NrJztcbmltcG9ydCBDaGF0U3RvcmUgZnJvbSAnLi4vc3RvcmVzL0NoYXRTdG9yZSc7XG5pbXBvcnQgQ2hhdEFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9DaGF0QWN0aW9ucyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmNvbnN0IEdhbWVIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHBhcmFtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgb3Blbk1vZGFsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdhbWVPdmVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbl0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiBvbWl0KENoYXRTdG9yZS5nZXRTdGF0ZSgpLCAnbWVzc2FnZXMnKTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgQ2hhdFN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYXRDaGFuZ2UpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBDaGF0U3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYXRDaGFuZ2UpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXMsIGdhbWVPdmVyLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdW5zZWVuQ291bnQgPSB0aGlzLnN0YXRlLnVuc2VlbkNvdW50O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cblxuICAgICAgICA8Q2xvY2tcbiAgICAgICAgICBpbz17aW99XG4gICAgICAgICAgcGFyYW1zPXtwYXJhbXN9IC8+XG5cbiAgICAgICAgPHNwYW4gaWQ9XCJnYW1lLXR5cGVcIj5cbiAgICAgICAgICB7YCR7cGFyYW1zWzFdfXwke3BhcmFtc1syXX1gfVxuICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuXCIgaHJlZj1cIi9cIj5OZXcgZ2FtZTwvYT5cblxuICAgICAgICB7IWdhbWVPdmVyICYmIGlzT3Bwb25lbnRBdmFpbGFibGUgP1xuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tLXJlZCByZXNpZ25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9vblJlc2lnbn0+XG4gICAgICAgICAgICBSZXNpZ25cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDpnYW1lT3ZlciA/XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi0tcmVkIHJlbWF0Y2hcIlxuICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uUmVtYXRjaH0+XG4gICAgICAgICAgICBSZW1hdGNoXG4gICAgICAgICAgPC9hPlxuICAgICAgICA6bnVsbH1cblxuICAgICAgICA8YSBpZD1cImNoYXQtaWNvblwiXG4gICAgICAgICAgIG9uQ2xpY2s9e0NoYXRBY3Rpb25zLnRvZ2dsZVZpc2liaWxpdHl9PlxuICAgICAgICAgIHt1bnNlZW5Db3VudCA/XG4gICAgICAgICAgICA8c3BhbiBpZD1cImNoYXQtY291bnRlclwiPlxuICAgICAgICAgICAgICB7dW5zZWVuQ291bnQgPCA5ID8gdW5zZWVuQ291bnQgOiAnOSsnfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDpudWxsfVxuICAgICAgICAgIDxpbWcgc3JjPVwiL2ltZy9jaGF0LnN2Z1wiXG4gICAgICAgICAgICAgICB3aWR0aD1cIjUwXCJcbiAgICAgICAgICAgICAgIGhlaWdodD1cIjUwXCIgLz5cbiAgICAgICAgICBDaGF0XG4gICAgICAgIDwvYT5cbiAgICAgIDwvaGVhZGVyPlxuICAgICk7XG4gIH0sXG4gIF9vbkNoYXRDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShvbWl0KENoYXRTdG9yZS5nZXRTdGF0ZSgpLCAnbWVzc2FnZXMnKSk7XG4gIH0sXG4gIF9vblJlc2lnbigpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtcywgY29sb3J9ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLmVtaXQoJ3Jlc2lnbicsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICBjb2xvcjogY29sb3JcbiAgICB9KTtcbiAgfSxcbiAgX29uUmVtYXRjaCgpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtcywgb3Blbk1vZGFsLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWlzT3Bwb25lbnRBdmFpbGFibGUpIHtcbiAgICAgIG9wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9wcG9uZW50IGhhcyBkaXNjb25uZWN0ZWQuIFlvdSBuZWVkIHRvICcgK1xuICAgICAgICAnZ2VuZXJhdGUgYSBuZXcgbGluay4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpby5lbWl0KCdyZW1hdGNoLW9mZmVyJywge1xuICAgICAgdG9rZW46IHBhcmFtc1swXVxuICAgIH0pO1xuICAgIG9wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9mZmVyIGhhcyBiZWVuIHNlbnQuJyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lSGVhZGVyOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZUhlYWRlciBmcm9tICcuL0dhbWVIZWFkZXInO1xuaW1wb3J0IENoYXQgZnJvbSAnLi9DaGF0JztcbmltcG9ydCBNb2RhbCBmcm9tICcuL01vZGFsJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgQ2hlc3Nib2FyZEludGVyZmFjZSBmcm9tICcuL0NoZXNzYm9hcmRJbnRlcmZhY2UnO1xuaW1wb3J0IEdhbWVib2FyZEludGVyZmFjZSBmcm9tICcuL0dhbWVib2FyZEludGVyZmFjZSc7XG5pbXBvcnQge01hcH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkJztcblxuY29uc3QgR2FtZUludGVyZmFjZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgcGFyYW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNPcHBvbmVudEF2YWlsYWJsZTogZmFsc2UsXG4gICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgIG1vZGFsOiBNYXAoe1xuICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogJycsXG4gICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgaGlkZTogdGhpcy5faGlkZU1vZGFsLFxuICAgICAgICAgIGFjY2VwdDogdGhpcy5fYWNjZXB0UmVtYXRjaCxcbiAgICAgICAgICBkZWNsaW5lOiB0aGlzLl9kZWNsaW5lUmVtYXRjaFxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHNvdW5kc0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgZ2FtZU92ZXI6IEdhbWVTdG9yZS5nZXRTdGF0ZSgpLmdhbWVPdmVyXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXN9ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLm9uKCd0b2tlbi1pbnZhbGlkJywgKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb2RhbDogdGhpcy5zdGF0ZS5tb2RhbFxuICAgICAgICAuc2V0KCdvcGVuJywgdHJ1ZSlcbiAgICAgICAgLnNldCgnbWVzc2FnZScsICdHYW1lIGxpbmsgaXMgaW52YWxpZCBvciBoYXMgZXhwaXJlZC4nKVxuICAgICAgICAuc2V0KCd0eXBlJywgJ2luZm8nKVxuICAgIH0pKTtcblxuICAgIGlvLmVtaXQoJ2pvaW4nLCB7XG4gICAgICB0b2tlbjogcGFyYW1zWzBdLFxuICAgICAgdGltZTogcGFyYW1zWzFdICogNjAsXG4gICAgICBpbmM6IHBhcmFtc1syXVxuICAgIH0pO1xuXG4gICAgaW8ub24oJ2pvaW5lZCcsIGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEuY29sb3IgPT09ICdibGFjaycpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29sb3I6ICdibGFjayd9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlvLm9uKCdib3RoLWpvaW5lZCcsICgpID0+XG4gICAgICB0aGlzLnNldFN0YXRlKHtpc09wcG9uZW50QXZhaWxhYmxlOiB0cnVlfSwgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb2xvciA9PT0gJ3doaXRlJykge1xuICAgICAgICAgIGlvLmVtaXQoJ2Nsb2NrLXJ1bicsIHtcbiAgICAgICAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICBpby5vbignZnVsbCcsICgpID0+IHtcbiAgICAgIHdpbmRvdy5hbGVydChcbiAgICAgICAgJ1RoaXMgZ2FtZSBhbHJlYWR5IGhhcyB0d28gcGxheWVycy4gWW91IGhhdmUgdG8gY3JlYXRlIGEgbmV3IG9uZS4nKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvJztcbiAgICB9KTtcblxuICAgIGlvLm9uKCdwbGF5ZXItcmVzaWduZWQnLCBkYXRhID0+IHtcbiAgICAgIEdhbWVBY3Rpb25zLmdhbWVPdmVyKHtcbiAgICAgICAgdHlwZTogJ3Jlc2lnbicsXG4gICAgICAgIHdpbm5lcjogZGF0YS5jb2xvciA9PT0gJ2JsYWNrJyA/ICdXaGl0ZScgOiAnQmxhY2snXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlvLm9uKCdyZW1hdGNoLW9mZmVyZWQnLCAoKSA9PlxuICAgICAgdGhpcy5fb3Blbk1vZGFsKCdvZmZlcicsICdZb3VyIG9wcG9uZW50IGhhcyBzZW50IHlvdSBhIHJlbWF0Y2ggb2ZmZXIuJykpO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtZGVjbGluZWQnLCAoKSA9PlxuICAgICAgdGhpcy5fb3Blbk1vZGFsKCdpbmZvJywgJ1JlbWF0Y2ggb2ZmZXIgaGFzIGJlZW4gZGVjbGluZWQuJykpO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtYWNjZXB0ZWQnLCAoKSA9PiB7XG4gICAgICBHYW1lQWN0aW9ucy5yZW1hdGNoKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29sb3I6IHRoaXMuc3RhdGUuY29sb3IgPT09ICd3aGl0ZScgPyAnYmxhY2snIDogJ3doaXRlJyxcbiAgICAgICAgbW9kYWw6IHRoaXMuc3RhdGUubW9kYWwuc2V0KCdvcGVuJywgZmFsc2UpXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbG9yID09PSAnd2hpdGUnKSB7XG4gICAgICAgICAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMucHJvcHMucGFyYW1zWzBdLFxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpby5vbignb3Bwb25lbnQtZGlzY29ubmVjdGVkJywgKCkgPT4gIHtcbiAgICAgIGlmICghdGhpcy5zdGF0ZS5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpKSB7XG4gICAgICAgIHRoaXMuX29wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9wcG9uZW50IGhhcyBkaXNjb25uZWN0ZWQuJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzT3Bwb25lbnRBdmFpbGFibGU6IGZhbHNlfSk7XG4gICAgfSk7XG5cbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIEdhbWVTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH0sXG5cblxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2NvbG9yLCBzb3VuZHNFbmFibGVkLCBnYW1lT3ZlciwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNvbW1vblByb3BzID0ge1xuICAgICAgaW86IGlvLFxuICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgb3Blbk1vZGFsOiB0aGlzLl9vcGVuTW9kYWwsXG4gICAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBpc09wcG9uZW50QXZhaWxhYmxlXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8R2FtZUhlYWRlclxuICAgICAgICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICAgICAgICBwYXJhbXM9e3BhcmFtc31cbiAgICAgICAgICBnYW1lT3Zlcj17Z2FtZU92ZXIuZ2V0KCdzdGF0dXMnKX0gLz5cblxuICAgICAgICA8Q2hhdFxuICAgICAgICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICAgICAgICB0b2tlbj17cGFyYW1zWzBdfVxuICAgICAgICAgIHNvdW5kc0VuYWJsZWQ9e3NvdW5kc0VuYWJsZWR9IC8+XG5cbiAgICAgICAgICB7LypcbiAgICAgICAgPENoZXNzYm9hcmRJbnRlcmZhY2VcbiAgICAgICAgICB7Li4uY29tbW9uUHJvcHN9XG4gICAgICAgICAgdG9rZW49e3BhcmFtc1swXX1cbiAgICAgICAgICBzb3VuZHNFbmFibGVkPXtzb3VuZHNFbmFibGVkfVxuICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlcn0gLz5cbiAgICAgICAgKi99XG4gICAgICAgICAgXG4gICAgICAgIHsvKn1cbiAgICAgICAgPEJvYXJkIC8+XG4gICAgICAgICovfVxuXG4gICAgICAgICAgPEdhbWVib2FyZEludGVyZmFjZSAvPlxuXG5cblxuXG4gICAgICAgIDxNb2RhbCBkYXRhPXt0aGlzLnN0YXRlLm1vZGFsfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuXG5cblxuICBfb25HYW1lQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2dhbWVPdmVyOiBHYW1lU3RvcmUuZ2V0U3RhdGUoKS5nYW1lT3Zlcn0pO1xuICB9LFxuICBfb3Blbk1vZGFsKHR5cGUsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1vZGFsOiB0aGlzLnN0YXRlLm1vZGFsXG4gICAgICAgIC5zZXQoJ29wZW4nLCB0cnVlKVxuICAgICAgICAuc2V0KCdtZXNzYWdlJywgbWVzc2FnZSlcbiAgICAgICAgLnNldCgndHlwZScsIHR5cGUpXG4gICAgfSk7XG4gIH0sXG4gIF9oaWRlTW9kYWwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW9kYWw6IHRoaXMuc3RhdGUubW9kYWwuc2V0KCdvcGVuJywgZmFsc2UpfSk7XG4gIH0sXG4gIF9hY2NlcHRSZW1hdGNoKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpby5lbWl0KCdyZW1hdGNoLWFjY2VwdCcsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICB0aW1lOiBwYXJhbXNbMV0gKiA2MCxcbiAgICAgIGluYzogcGFyYW1zWzJdXG4gICAgfSk7XG4gICAgdGhpcy5faGlkZU1vZGFsKCk7XG4gIH0sXG4gIF9kZWNsaW5lUmVtYXRjaCgpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtc30gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8uZW1pdCgncmVtYXRjaC1kZWNsaW5lJywge1xuICAgICAgdG9rZW46IHBhcmFtc1swXVxuICAgIH0pO1xuICAgIHRoaXMuX2hpZGVNb2RhbCgpO1xuICB9LFxuICBfdG9nZ2xlU291bmRzKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNvdW5kc0VuYWJsZWQ6ICF0aGlzLnN0YXRlLnNvdW5kc0VuYWJsZWRcbiAgICB9KTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcbmltcG9ydCBDaGVzc2JvYXJkIGZyb20gJy4vQ2hlc3Nib2FyZCc7XG5pbXBvcnQge0JvYXJkfSBmcm9tICcuL0dhbWVCb2FyZCc7XG5pbXBvcnQgQ2FwdHVyZWRQaWVjZXMgZnJvbSAnLi9DYXB0dXJlZFBpZWNlcyc7XG5pbXBvcnQgVGFibGVPZk1vdmVzIGZyb20gJy4vVGFibGVPZk1vdmVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuLyogdGhlIHN0YXRlIG9mIHRoZSBnYW1lYm9hcmQgaXMgbWFuYWdlZCBieSBHYW1lU3RvcmUgKi9cblxuY29uc3QgR2FtZWJvYXJkSW50ZXJmYWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHByb3BUeXBlczoge1xuXG5cdH0sXG5cdG1peGluczogW10sXG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcblx0XHRyZXR1cm4gR2FtZVN0b3JlLmdldFN0YXRlKCk7XG5cdH0sXG5cdGdldERlZmF1bHRQcm9wcygpIHtcblxuXHR9LFxuXHRjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG5cblx0fSxcblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtwcm9tb3Rpb24sIHR1cm4sIGdhbWVPdmVyLCBjaGVja30gPSB0aGlzLnN0YXRlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgaWQ9XCJib2FyZC1tb3Zlcy13cmFwcGVyXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cblx0XHRcdFx0PGRpdiBpZD1cImJvYXJkLXdyYXBwZXJcIj5cblxuXHRcdFx0XHRcdDxDYXB0dXJlZFBpZWNlcyAvPlxuXG5cdFx0XHRcdFx0PEJvYXJkIHNpemU9ezZ9Lz5cblxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJmZWVkYmFja1wiPlxuXHRcdFx0XHRcdHshZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSA/XG5cdFx0XHRcdFx0XHQ8c3Bhbj5cblx0XHRcdFx0XHRcdFx0e2Ake3R1cm49PT0ndycgPyAnV2hpdGUnIDogJ0JsYWNrJ30gdG8gbW92ZS5gfVxuXHRcdFx0XHRcdFx0PC9zcGFuPiA6XG5cdFx0XHRcdFx0XHQ8c3Ryb25nPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+XG5cdFx0XHRcdFx0XHRcdCAge2dhbWVPdmVyLmdldCgnd2lubmVyJykgPT09ICdXaGl0ZScgPyAnRicgOiAnZid9XG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0e3RoaXMuX2dldEdhbWVPdmVyTWVzc2FnZSgpfVxuXHRcdFx0XHRcdFx0PC9zdHJvbmc+XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L3NwYW4+XG5cblxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9LFxuXG5cdF9vbkdhbWVDaGFuZ2UoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZShHYW1lU3RvcmUuZ2V0U3RhdGUoKSk7XG5cdH0sXG5cblx0X2dldEdhbWVPdmVyTWVzc2FnZSgpIHtcblx0XHRyZXR1cm4gYHlvdSBsb3NlYDtcblx0fVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IE1vZGFsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW5dLFxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCBpc09wZW4gPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCdvcGVuJyk7XG5cbiAgICBpZiAoaXNPcGVuKVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5ZG93bik7XG4gICAgZWxzZVxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5ZG93bik7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5wcm9wcy5kYXRhO1xuICAgIGNvbnN0IHR5cGUgPSBkYXRhLmdldCgndHlwZScpO1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IGRhdGEuZ2V0KCdjYWxsYmFja3MnKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICdtb2RhbC1tYXNrJzogdHJ1ZSxcbiAgICAgICAgICAgICAnaGlkZGVuJzogIWRhdGEuZ2V0KCdvcGVuJylcbiAgICAgICAgICAgfSl9XG4gICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX2hpZGVNb2RhbH0+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDxzdHJvbmc+RXNjOiA8L3N0cm9uZz5cbiAgICAgICAgICA8c3Bhbj57dHlwZSA9PT0gJ2luZm8nID8gJ09LJyA6ICdEZWNsaW5lJ308L3NwYW4+XG4gICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgPHN0cm9uZz5FbnRlcjogPC9zdHJvbmc+XG4gICAgICAgICAgPHNwYW4+e3R5cGUgPT09ICdpbmZvJyA/ICdPSycgOiAnQWNjZXB0J308L3NwYW4+XG4gICAgICAgIDwvcD5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCJcbiAgICAgICAgICAgICBvbkNsaWNrPXtlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9PlxuICAgICAgICAgIDxwPntkYXRhLmdldCgnbWVzc2FnZScpfTwvcD5cblxuICAgICAgICAgIHt0eXBlID09PSAnaW5mbycgPyBcbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBva1wiXG4gICAgICAgICAgICAgICBvbkNsaWNrPXtjYWxsYmFja3MuaGlkZX0+XG4gICAgICAgICAgICAgIE9LXG4gICAgICAgICAgICA8L2E+IDogW1xuXG4gICAgICAgICAgICA8YSBrZXk9XCJhXCJcbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0blwiXG4gICAgICAgICAgICAgICBzdHlsZT17e2xlZnQ6ICc0ZW0nfX1cbiAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NhbGxiYWNrcy5hY2NlcHR9PlxuICAgICAgICAgICAgICBBY2NlcHRcbiAgICAgICAgICAgIDwvYT4sXG4gICAgICAgICAgICA8YSBrZXk9XCJiXCJcbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tLXJlZFwiXG4gICAgICAgICAgICAgICBzdHlsZT17e3JpZ2h0OiAnNGVtJ319XG4gICAgICAgICAgICAgICBvbkNsaWNrPXtjYWxsYmFja3MuZGVjbGluZX0+XG4gICAgICAgICAgICAgIERlY2xpbmVcbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICBdfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIF9vbktleWRvd24oZSkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCd0eXBlJyk7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5wcm9wcy5kYXRhLmdldCgnY2FsbGJhY2tzJyk7XG5cbiAgICBpZiAodHlwZSA9PT0gJ2luZm8nKSB7XG4gICAgICBpZiAoZS53aGljaCA9PT0gMTMgfHwgZS53aGljaCA9PT0gMjcpIHtcbiAgICAgICAgY2FsbGJhY2tzLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgIGlmIChlLndoaWNoID09PSAxMykge1xuICAgICAgICBjYWxsYmFja3MuYWNjZXB0KCk7XG4gICAgICB9IGVsc2UgaWYgKGUud2hpY2ggPT09IDI3KSB7XG4gICAgICAgIGNhbGxiYWNrcy5kZWNsaW5lKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBfaGlkZU1vZGFsKCkge1xuICAgIHRoaXMucHJvcHMuZGF0YS5nZXQoJ2NhbGxiYWNrcycpLmhpZGUoKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcblxuY29uc3QgVGFibGVPZk1vdmVzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgb25HYW1lQ2hhbmdlXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vdmVzOiBHYW1lU3RvcmUuZ2V0TW92ZXMoKVxuICAgIH07XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHRhYmxlIGlkPVwibW92ZXNcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoPlRhYmxlIG9mIG1vdmVzPC90aD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAge3RoaXMuc3RhdGUubW92ZXMubWFwKChyb3csIGkpID0+IChcbiAgICAgICAgICAgIDx0ciBrZXk9e2l9PlxuICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz57YCR7aSArIDF9LmB9PC9zdHJvbmc+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIHtyb3cubWFwKChtb3ZlLCBqKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRkIGtleT17an0+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57bW92ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgKSkudG9BcnJheSgpfVxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICApKS50b0FycmF5KCl9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgICk7XG4gIH0sXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb3ZlczogR2FtZVN0b3JlLmdldE1vdmVzKClcbiAgICB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlT2ZNb3ZlczsiLCJpbXBvcnQga2V5TWlycm9yIGZyb20gJ3JlYWN0L2xpYi9rZXlNaXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBrZXlNaXJyb3Ioe1xuICBUT0dHTEVfVklTSUJJTElUWTogbnVsbCxcbiAgU1VCTUlUX01FU1NBR0U6IG51bGxcbn0pOyIsImNvbnN0IENoZXNzUGllY2VzID0ge1xuICAvLyBrZXk6IHBpZWNlIGZyb20gRkVOLCB2YWx1ZTogcGllY2UgZnJvbSBTbWFydCBSZWd1bGFyIGNoZXNzIGZvbnRcbiAgLy8gd2hpdGUgcGllY2VzXG4gICdLJzogJ0YnLFxuICAnUSc6ICdFJyxcbiAgJ1InOiAnRCcsXG4gICdCJzogJ0MnLFxuICAnTic6ICdCJyxcbiAgJ1AnOiAnQScsXG4gIC8vIGJsYWNrIHBpZWNlc1xuICAnayc6ICdmJyxcbiAgJ3EnOiAnZScsXG4gICdyJzogJ2QnLFxuICAnYic6ICdjJyxcbiAgJ24nOiAnYicsXG4gICdwJzogJ2EnLFxuICAvLyBlbXB0eSBzcXVhcmVcbiAgJy0nOiB1bmRlZmluZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoZXNzUGllY2VzOyIsImltcG9ydCBrZXlNaXJyb3IgZnJvbSAncmVhY3QvbGliL2tleU1pcnJvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGtleU1pcnJvcih7XG4gIE1BS0VfTU9WRTogbnVsbCxcbiAgU0hPV19NT1ZFUzogbnVsbCxcbiAgUkVNQVRDSDogbnVsbCxcbiAgRFJBVzogbnVsbCxcbiAgR0FNRV9PVkVSOiBudWxsLFxuICBDSEFOR0VfUFJPTU9USU9OOiBudWxsXG59KTsiLCJpbXBvcnQge0Rpc3BhdGNoZXJ9IGZyb20gJ2ZsdXgnO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKG5ldyBEaXNwYXRjaGVyKCksIHtcbiAgLy8gQHBhcmFtIHtvYmplY3R9IGFjdGlvbiBUaGUgZGF0YSBjb21pbmcgZnJvbSB0aGUgdmlldy5cbiAgaGFuZGxlVmlld0FjdGlvbjogZnVuY3Rpb24oYWN0aW9uKSB7XG4gICAgdGhpcy5kaXNwYXRjaCh7XG4gICAgICBzb3VyY2U6ICdWSUVXX0FDVElPTicsXG4gICAgICBhY3Rpb246IGFjdGlvblxuICAgIH0pO1xuICB9XG59KTsiLCJjb25zdCBUaWxlQWN0aW9ucyA9IHtcbiAgICBcIkFzc2Fzc2luXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXAgc2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0yLDJdXCI6IFwianVtcCBzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcImp1bXAgc2xpZGVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcCBzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wIHNsaWRlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcCBzbGlkZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiQm93bWFuXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwwXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJzdHJpa2VcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIkNoYW1waW9uXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiRHJhZ29vblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJzdHJpa2VcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcInNsaWRlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJEdWNoZXNzXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiRHVrZVwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcInNsaWRlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJzbGlkZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiRm9vdG1hblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiS25pZ2h0XCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlstMSwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsxLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJtb3ZlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJMb25nYm93bWFuXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLC0zXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiTWFyc2hhbGxcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiT3JhY2xlXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiUGlrZW1hblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTEsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlsxLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcIm1vdmVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIlByaWVzdFwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJzbGlkZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDJdXCI6IFwianVtcFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiUmFuZ2VyXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0xLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsLTFdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwtMV1cIjogXCJqdW1wXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlstMSwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzEsMl1cIjogXCJqdW1wXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJTZWVyXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJXaXphcmRcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcImp1bXBcIlxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8vIHZhciBuZXdVbml0cyA9IHt9O1xuLy8gZm9yICh2YXIgdW5pdEtleSBpbiBUaWxlQWN0aW9ucykge1xuLy8gICAgIHZhciB1bml0ID0gVGlsZUFjdGlvbnNbdW5pdEtleV07XG4vLyAgICAgdmFyIG5ld1NpZGVzID0ge307XG4vLyAgICAgZm9yICh2YXIgc2lkZUtleSBpbiB1bml0KSB7XG4vLyAgICAgICAgIHZhciBkaXIgPSB1bml0W3NpZGVLZXldO1xuLy8gICAgICAgICB2YXIgbmV3RGlyID0ge307XG4vLyAgICAgICAgIGZvciAodmFyIGNvb3JkcyBpbiBkaXIpIHtcbi8vICAgICAgICAgICAgIHZhciBwYXJzZWQgPSBKU09OLnBhcnNlKGNvb3Jkcyk7XG4vLyAgICAgICAgICAgICB2YXIgbmV3Q29vcmRzID0gSlNPTi5zdHJpbmdpZnkoW3BhcnNlZFsxXSwgcGFyc2VkWzBdXSk7XG4vLyAgICAgICAgICAgICBuZXdEaXJbbmV3Q29vcmRzXSA9IGRpcltjb29yZHNdO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIG5ld1NpZGVzW3NpZGVLZXldID0gbmV3RGlyO1xuLy8gICAgIH1cbi8vICAgICBuZXdVbml0c1t1bml0S2V5XSA9IG5ld1NpZGVzO1xuLy8gfVxuLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobmV3VW5pdHMpKTtcblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgVGlsZUFjdGlvbnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmNvbnN0IE9SSUdJTiA9ICdodHRwOi8vbG9jYWxob3N0OjEzMzcnO1xuY29uc3QgV1MgPSBPUklHSU47XG5cbmV4cG9ydCBkZWZhdWx0IGlvLmNvbm5lY3QoV1MpOyIsImNvbnN0IG1heWJlUmV2ZXJzZSA9IHtcbiAgX21heWJlUmV2ZXJzZShpdGVyYWJsZSwgY29sb3IpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jb2xvciA9PT0gKGNvbG9yIHx8ICdibGFjaycpID9cbiAgICAgIGl0ZXJhYmxlLnJldmVyc2UoKSA6IGl0ZXJhYmxlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtYXliZVJldmVyc2U7IiwiaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcblxuY29uc3Qgb25HYW1lQ2hhbmdlID0ge1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIEdhbWVTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG9uR2FtZUNoYW5nZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XG5pbXBvcnQge0V2ZW50RW1pdHRlcjIgYXMgRXZlbnRFbWl0dGVyfSBmcm9tICdldmVudGVtaXR0ZXIyJztcbmltcG9ydCBDaGF0Q29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9DaGF0Q29uc3RhbnRzJztcbmltcG9ydCB7TGlzdCwgTWFwfSBmcm9tICdpbW11dGFibGUnO1xuXG5jb25zdCBDSEFOR0VfRVZFTlQgPSAnY2hhbmdlJztcbiAgXG52YXIgX21lc3NhZ2VzID0gTGlzdCgpO1xudmFyIF91bnNlZW5Db3VudCA9IDA7XG52YXIgX2lzQ2hhdEhpZGRlbiA9IHRydWU7XG5cbmNvbnN0IENoYXRTdG9yZSA9IE9iamVjdC5hc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2VzOiBfbWVzc2FnZXMsXG4gICAgICB1bnNlZW5Db3VudDogX3Vuc2VlbkNvdW50LFxuICAgICAgaXNDaGF0SGlkZGVuOiBfaXNDaGF0SGlkZGVuXG4gICAgfTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHRvZ2dsZVZpc2liaWxpdHkoKSB7XG4gIF9pc0NoYXRIaWRkZW4gPSAhX2lzQ2hhdEhpZGRlbjtcbiAgX3Vuc2VlbkNvdW50ID0gMDtcbn1cblxuZnVuY3Rpb24gc3VibWl0TWVzc2FnZShtZXNzYWdlLCBjbGFzc05hbWUsIHJlY2VpdmVkKSB7XG4gIF9tZXNzYWdlcyA9IF9tZXNzYWdlcy5wdXNoKE1hcCh7XG4gICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZVxuICB9KSk7XG5cbiAgaWYgKHJlY2VpdmVkICYmIF9pc0NoYXRIaWRkZW4pIHtcbiAgICBfdW5zZWVuQ291bnQgKz0gMTtcbiAgfVxufVxuXG5BcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKHBheWxvYWQgPT4ge1xuICBjb25zdCBhY3Rpb24gPSBwYXlsb2FkLmFjdGlvbjtcblxuICBzd2l0Y2ggKGFjdGlvbi5hY3Rpb25UeXBlKSB7XG4gICAgY2FzZSBDaGF0Q29uc3RhbnRzLlRPR0dMRV9WSVNJQklMSVRZOlxuICAgICAgdG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIENoYXRDb25zdGFudHMuU1VCTUlUX01FU1NBR0U6XG4gICAgICBzdWJtaXRNZXNzYWdlKGFjdGlvbi5tZXNzYWdlLCBhY3Rpb24uY2xhc3NOYW1lLCBhY3Rpb24ucmVjZWl2ZWQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBDaGF0U3RvcmUuZW1pdChDSEFOR0VfRVZFTlQpO1xuICByZXR1cm4gdHJ1ZTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDaGF0U3RvcmU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIyIGFzIEV2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRlbWl0dGVyMic7XG5pbXBvcnQgR2FtZUNvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvR2FtZUNvbnN0YW50cyc7XG5pbXBvcnQgQ2hlc3NQaWVjZXMgZnJvbSAnLi4vY29uc3RhbnRzL0NoZXNzUGllY2VzJztcbmltcG9ydCB7Q2hlc3N9IGZyb20gJ2NoZXNzLmpzJztcbmltcG9ydCB7TGlzdCwgTWFwLCBPcmRlcmVkTWFwLCBTZXR9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgYmVoYXZpb3IgZnJvbSAnLi4vZ2FtZS9iZWhhdmlvcic7XG4vL2ltcG9ydCBVdGlscyBmcm9tICcuLi9nYW1lL3V0aWxzJztcbi8vIGltcG9ydCBiZWhhdmlvciBmcm9tICcuLi9nYW1lL2JlaGF2aW9yJztcblxuY29uc3QgQ0hBTkdFX0VWRU5UID0gJ2NoYW5nZSc7XG5jb25zdCBNT1ZFX0VWRU5UID0gJ25ldy1tb3ZlJztcblxudmFyIF9nYW1lT3ZlcjtcbnZhciBfY2FwdHVyZWRQaWVjZXM7XG52YXIgX21vdmVzO1xudmFyIF9wcm9tb3Rpb247XG52YXIgX3R1cm47XG52YXIgX2NoZWNrO1xudmFyIF9sYXN0TW92ZTtcbnZhciBfY2hlc3M7XG5cbnZhciBfYm9hcmQgPSB7fSxcbiAgICBfbGlnaHR1cCA9IFtdLFxuICAgIF9zdHJpa2UgPSBbXSxcbiAgICBfc2VsZWN0ZWQsXG4gICAgX2RyYXduID0gW10sXG4gICAgX3Jlc3VsdDtcblxuXG5zZXRJbml0aWFsU3RhdGUoKTtcblxudmFyIEdhbWVTdG9yZSA9IE9iamVjdC5hc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICBhZGRDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24oY2IpIHtcbiAgICAgIHRoaXMub24oQ0hBTkdFX0VWRU5ULCBjYik7XG4gICAgfSxcblxuICAgIHJlbW92ZUNoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihjYikge1xuICAgICAgdGhpcy5yZW1vdmVDaGFuZ2VMaXN0ZW5lcihDSEFOR0VfRVZFTlQsIGNiKTtcbiAgICB9LFxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2FtZU92ZXI6IF9nYW1lT3ZlcixcbiAgICAgICAgICAgIHByb21vdGlvbjogX3Byb21vdGlvbixcbiAgICAgICAgICAgIHR1cm46IF90dXJuLFxuICAgICAgICAgICAgY2hlY2s6IF9jaGVjayxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldENhcHR1cmVkUGllY2VzKCkge1xuICAgICAgICByZXR1cm4gX2NhcHR1cmVkUGllY2VzO1xuICAgIH0sXG4gICAgZ2V0TW92ZXMoKSB7XG4gICAgICAgIHJldHVybiBfbW92ZXM7XG4gICAgfSxcbiAgICBnZXRDaGVzc2JvYXJkU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmZW46IF9jaGVzcy5mZW4oKSxcbiAgICAgICAgICAgIGxhc3RNb3ZlOiBfbGFzdE1vdmUsXG4gICAgICAgICAgICBjaGVjazogX2NoZWNrXG4gICAgICAgIH07XG4gICAgfSxcblxuXG4gICAgZ2V0R2FtZWJvYXJkU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBib2FyZDogX2JvYXJkLFxuICAgICAgICAgICAgbGlnaHR1cDogX2xpZ2h0dXAsXG4gICAgICAgICAgICBzdHJpa2U6IF9zdHJpa2UsXG4gICAgICAgICAgICBzZWxlY3RlZDogX3NlbGVjdGVkLFxuICAgICAgICAgICAgZHJhd1VuaXQ6IF9yZXN1bHRcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkcmF3KCkge1xuICAgICAgICB2YXIgdW5pdHMgPSBbXTtcbiAgICAgICAgICAgXG4gICAgICAgIE9iamVjdC5rZXlzKGJlaGF2aW9yKS5mb3JFYWNoKGZ1bmN0aW9uKHVuaXQpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ3aGF0IGlzIHRoZSBrZXkgb2YgYmVoYXZpb3I/XCIsIHVuaXQpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ3aGF0IGFtIGkgYWRkaW5nIGFnYWluPz9cIiwgYmVoYXZpb3JbYCR7dW5pdH1gXSk7XG4gICAgICAgICAgICBpZihfZHJhd24uaW5kZXhPZihiZWhhdmlvcltgJHt1bml0fWBdKSA9PT0gLTEgJiYgdW5pdCAhPT0gJ0R1a2UnKXtcbiAgICAgICAgICAgICAgICB2YXIgdW5pdE9iaiA9IHt9O1xuICAgICAgICAgICAgICAgIHVuaXRPYmpbYCR7dW5pdH1gXSA9IGJlaGF2aW9yW2Ake3VuaXR9YF07XG4gICAgICAgICAgICAgICAgdW5pdHMucHVzaCh1bml0T2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdmFyIHBpa2VDb3VudHMgPSAwO1xuICAgICAgICAgICAgICAgIF9kcmF3bi5mb3JFYWNoKGZ1bmN0aW9uKHVuaXQpe1xuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKE9iamVjdC5rZXlzKHVuaXQpWzBdID09PSAnUGlrZW1hbicpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGlrZUNvdW50cyArPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpZih1bml0ID09PSAnUGlrZW1hbicgJiYgcGlrZUNvdW50cyA8IDMpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IDMgLSBwaWtlQ291bnRzO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZShpID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdW5pdE9iaiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRPYmpbYCR7dW5pdH1gXSA9IGJlaGF2aW9yW2Ake3VuaXR9YF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHMucHVzaCh1bml0T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgcmVzdWx0ID0gdW5pdHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnVuaXRzLmxlbmd0aCldO1xuICAgICAgICBfZHJhd24ucHVzaChyZXN1bHQpO1xuICAgICAgICBfcmVzdWx0ID0gcmVzdWx0O1xuICAgIH0sXG5cbiAgICAvLyBnZXRWYWxpZE1vdmVzKHNxdWFyZSkge1xuICAgIC8vICAgICByZXR1cm4gc3F1YXJlID8gU2V0KFxuICAgIC8vICAgICAgICAgX2NoZXNzLm1vdmVzKHtcbiAgICAvLyAgICAgICAgICAgICBzcXVhcmU6IHNxdWFyZSxcbiAgICAvLyAgICAgICAgICAgICB2ZXJib3NlOiB0cnVlXG4gICAgLy8gICAgICAgICB9KS5tYXAobW92ZSA9PiBtb3ZlLnRvKSkgOiBTZXQoKTtcbiAgICAvLyB9LFxuXG4gICAgLy8gc2hvd01vdmVzKHVuaXQsIGZyb20sIGluUmFuZ2UpIHtcbiAgICAvLyAgICAgIGlmICghT2JqZWN0LmtleXMoX2xpZ2h0dXApLmxlbmd0aCkge1xuICAgIC8vICAgICAgIGluUmFuZ2UuZmlsdGVyKHJhbmdlID0+IHtcbiAgICAvLyAgICAgICAgICAgcmV0dXJuIGlzVmFsaWRNb3ZlKHVuaXQsIHJhbmdlKTtcbiAgICAvLyAgICAgICB9KS5mb3JFYWNoKG1vdmUgPT4ge1xuICAgIC8vICAgICAgICAgICB2YXIgY29vcmRzU3RyID0gYFske21vdmUueH0sICR7bW92ZS55fV1gO1xuICAgIC8vICAgICAgICAgICBfbGlnaHR1cFtjb29yZHNTdHJdID0gdHJ1ZTtcbiAgICAvLyAgICAgICB9KVxuICAgIC8vICAgICAgIF9zZWxlY3RlZCA9IHtwb3NpdGlvbjogZnJvbSwgdW5pdDogdW5pdH07XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZSB7XG4gICAgLy8gICAgICAgY29uc29sZS5sb2coJ2Vsc2UnKTtcbiAgICAvLyAgICAgICBfbGlnaHR1cCA9IFtdO1xuICAgIC8vICAgICAgIF9zZWxlY3RlZCA9IG51bGw7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgLy90aGlzLnNldFN0YXRlKHtfbGlnaHR1cDogdmFsaWRNb3Zlc30pO1xuXG4gICAgLy8gICAgIHJldHVybiB0cnVlO1xuICAgIC8vICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZ2V0U3RhdGUoKSk7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKCd2YWxpZCBNb3ZlczonKVxuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyh2YWxpZE1vdmVzKTtcblxuICAgIC8vIH1cblxuXG4gICAgLy8gICAgICAgICBzdHJpa2U6IF9zdHJpa2UsXG4gICAgLy8gICAgICAgICBzZWxlY3RlZDogX3NlbGVjdGVkXG4gICAgLy8gICAgIH1cbiAgICAvLyB9LFxuXG5cbn0pO1xuXG4vLyBmdW5jdGlvbiBpc09uQm9hcmQoY29vcmRzKSB7XG4vLyAgIGlmICghY29vcmRzLmhhc093blByb3BlcnR5KCd4JykgfHwgIWNvb3Jkcy5oYXNPd25Qcm9wZXJ0eSgneScpKSByZXR1cm4gZmFsc2U7XG4vLyAgIHZhciBjb29yZHNTdHIgPSBgWyR7Y29vcmRzLnl9LCAke2Nvb3Jkcy54fV1gXG4vLyAgIHJldHVybiBjb29yZHMueCA+PSAwICYmIGNvb3Jkcy55ID49IDAgJiYgY29vcmRzLnggPCA2ICYmIGNvb3Jkcy55IDwgNjtcbi8vIH1cblxuLy8gZnVuY3Rpb24gaXNWYWxpZE1vdmUodW5pdCwgY29vcmRzKSB7XG4vLyAgIHZhciBjb29yZHNTdHIgPSBgWyR7Y29vcmRzLnh9LCAke2Nvb3Jkcy55fV1gO1xuLy8gICB2YXIgdGFyZ2V0VW5pdCA9IF9ib2FyZFtjb29yZHNTdHJdO1xuXG4vLyAgIGlmICh0YXJnZXRVbml0KSB7XG4vLyAgICAgLy9jb25zb2xlLmxvZyhgdW5pdC5jb2xvcjogJHt1bml0LmNvbG9yfWApO1xuLy8gICAgIGNvbnNvbGUubG9nKGB0YXJnZXRVbml0LmNvbG9yOiAke3RhcmdldFVuaXQuY29sb3J9YCk7XG4vLyAgICAgaWYgKHVuaXQuY29sb3IgPT09IHRhcmdldFVuaXQuY29sb3IpIHJldHVybiBmYWxzZTtcbi8vICAgfVxuLy8gICByZXR1cm4gaXNPbkJvYXJkKGNvb3Jkcyk7XG4vLyB9XG5cbmZ1bmN0aW9uIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBfZ2FtZU92ZXIgPSBNYXAoe1xuICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICB3aW5uZXI6IG51bGxcbiAgICB9KTtcbiAgICBfY2FwdHVyZWRQaWVjZXMgPSBPcmRlcmVkTWFwKFtcbiAgICAgICAgWyd3JywgTGlzdCgpXSxcbiAgICAgICAgWydiJywgTGlzdCgpXVxuICAgIF0pO1xuICAgIF9tb3ZlcyA9IExpc3QoKTtcbiAgICBfcHJvbW90aW9uID0gJ3EnO1xuICAgIF90dXJuID0gJ3cnO1xuICAgIF9jaGVjayA9IGZhbHNlO1xuICAgIF9sYXN0TW92ZSA9IE1hcCgpO1xuICAgIF9zZWxlY3RlZCA9IG51bGw7XG4gICAgLy9fY2hlc3MgPSBuZXcgQ2hlc3MoKTtcblxuICAgIF9saWdodHVwID0ge307XG4gICAgX3N0cmlrZSA9IHt9O1xuXG4gICAgX2JvYXJkID0ge1xuICAgICAgICAnWzEsIDBdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzIsIDBdJzoge3VuaXQ6ICdEdWtlJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzMsIDBdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzIsIDVdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzMsIDVdJzoge3VuaXQ6ICdEdWtlJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAnWzQsIDVdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdmcm9udCd9XG4gICAgfTtcblxufVxuXG5cblxuZnVuY3Rpb24gdXBkYXRlQm9hcmQoZnJvbSwgdG8sIHR5cGUpIHtcbiAgICB2YXIgdW5pdCA9IF9ib2FyZFtmcm9tXTtcbiAgICB1bml0LnNpZGUgPSAodW5pdC5zaWRlID09PSAnZnJvbnQnKSA/ICdiYWNrJyA6ICdmcm9udCc7XG5cbiAgICBpZiAodHlwZSA9PT0gJ21vdmUnKSB7XG4gICAgICBfYm9hcmRbZnJvbV0gPSBudWxsO1xuICAgICAgX2JvYXJkW3RvXSA9IHVuaXQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpa2UnKSB7XG4gICAgICBfYm9hcmRbdG9dID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgX3NlbGVjdGVkID0gbnVsbDtcbiAgICByZXR1cm4gX2JvYXJkO1xufVxuXG5mdW5jdGlvbiBtYWtlTW92ZShmcm9tLCB0bywgY2FwdHVyZSwgdHlwZSwgZW1pdE1vdmUpIHtcbiAgIFxuICAgIHVwZGF0ZUJvYXJkKGZyb20sIHRvLCB0eXBlKTtcblxuICAgIGlmIChlbWl0TW92ZSkge1xuICAgICAgICBHYW1lU3RvcmUuZW1pdChNT1ZFX0VWRU5ULCB7XG4gICAgICAgICAgICBmcm9tOiBmcm9tLFxuICAgICAgICAgICAgdG86IHRvLFxuICAgICAgICAgICAgY2FwdHVyZTogY2FwdHVyZSxcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBib2FyZDogX2JvYXJkICAgIFxuICAgICAgICAgICAgLy9nYW1lT3ZlcjogX2NoZXNzLmdhbWVfb3ZlcigpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5cbmZ1bmN0aW9uIGdhbWVPdmVyKG9wdGlvbnMpIHtcbiAgICBfZ2FtZU92ZXIgPSBfZ2FtZU92ZXJcbiAgICAgICAgLnNldCgnc3RhdHVzJywgdHJ1ZSlcbiAgICAgICAgLnNldCgnd2lubmVyJywgb3B0aW9ucy53aW5uZXIpXG4gICAgICAgIC5zZXQoJ3R5cGUnLCBvcHRpb25zLnR5cGUpO1xufVxuXG5BcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKHBheWxvYWQgPT4ge1xuICAgIGNvbnN0IGFjdGlvbiA9IHBheWxvYWQuYWN0aW9uO1xuICAgIGxldCBlbWl0RXZlbnQgPSB0cnVlO1xuXG4gICAgc3dpdGNoIChhY3Rpb24uYWN0aW9uVHlwZSkge1xuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuTUFLRV9NT1ZFOlxuICAgICAgICAgICAgZW1pdEV2ZW50ID0gbWFrZU1vdmUoXG4gICAgICAgICAgICAgICAgYWN0aW9uLmZyb20sIGFjdGlvbi50bywgYWN0aW9uLmNhcHR1cmUsIGFjdGlvbi50eXBlLCBhY3Rpb24uZW1pdE1vdmUpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkNIQU5HRV9QUk9NT1RJT046XG4gICAgICAgICAgICBfcHJvbW90aW9uID0gYWN0aW9uLnByb21vdGlvbjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EUkFXOlxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuR0FNRV9PVkVSOlxuICAgICAgICAgICAgZ2FtZU92ZXIoYWN0aW9uLm9wdGlvbnMpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLlJFTUFUQ0g6XG4gICAgICAgICAgICBzZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZW1pdEV2ZW50KSB7XG4gICAgICAgIEdhbWVTdG9yZS5lbWl0KENIQU5HRV9FVkVOVCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVTdG9yZTtcbiJdfQ==
