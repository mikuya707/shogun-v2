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

},{"./components/GameInterface":"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameInterface.js","./io":"/Users/Jay/Fullstack/shogun-v2/src/js/io.js","es6-shim":"es6-shim","react":"react"}],"/Users/Jay/Fullstack/shogun-v2/node_modules/classnames/index.js":[function(require,module,exports){
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
		console.log("state? ", this.state);
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
		console.log("i clicked!!");
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
			console.log("here?");
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

		console.log("the winner is");
		console.log(winner);
		io.emit("swal-endgame", { token: token, winner: winner });
	},

	render: function render() {
		var _this = this;

		var _ref = this;

		var state = _ref.state;
		var props = _ref.props;var size = props.size;

		var color = props.color;var board = state.board;
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
									setDroppable: _this._setDroppable })
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

		// only let the player act when it is their turn
		if (turn !== playerColor.charAt(0)) {
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

		if (turn !== playerColor.charAt(0)) {
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
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var io = _interopRequire(require("socket.io-client"));

var ORIGIN = "http://localhost:1337";
var WS = ORIGIN;

module.exports = io.connect(WS);

},{"socket.io-client":"socket.io-client"}],"/Users/Jay/Fullstack/shogun-v2/src/js/mixins/maybeReverse.js":[function(require,module,exports){
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
            pendingDraw: _pendingDraw
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
        "[4, 5]": { unit: "Footman", color: "white", side: "front" },
        "[2, 1]": { unit: "Footman", color: "white", side: "front" }

    };

    _deck = [].concat(_toConsumableArray(Object.keys(omit(behavior, "Duke"))), ["Pikeman", "Pikeman"]);
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
        var winner = dukes[0];
        if (winner = "white") winner = "White";else if (winner = "black") winner = "Black";
        swal({
            title: "You win!",
            text: "Would you like to request a rematch?",
            type: "success",
            showCancelButton: true,
            confirmButtonColor: "#00FFD2",
            confirmButtonText: "Yeah! :)",
            cancelButtonText: "Fuck that",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL3BsYXkuanMiLCJub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvaW52YXJpYW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9rZXlNaXJyb3IuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2FjdGlvbnMvQ2hhdEFjdGlvbnMuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2FjdGlvbnMvR2FtZUFjdGlvbnMuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2FwdHVyZWRQaWVjZXMuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2hhdC5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DaGVzc2JvYXJkLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0NoZXNzYm9hcmRJbnRlcmZhY2UuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2xvY2suanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUJvYXJkLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0dhbWVIZWFkZXIuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUludGVyZmFjZS5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lYm9hcmRJbnRlcmZhY2UuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvTW9kYWwuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvVGFibGVPZk1vdmVzLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hhdENvbnN0YW50cy5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvY29uc3RhbnRzL0NoZXNzUGllY2VzLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvR2FtZUNvbnN0YW50cy5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9nYW1lL2JlaGF2aW9yLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9pby5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvbWl4aW5zL21heWJlUmV2ZXJzZS5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvbWl4aW5zL29uR2FtZUNoYW5nZS5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvc3RvcmVzL0NoYXRTdG9yZS5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvc3RvcmVzL0dhbWVTdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7OztRQUVOLFVBQVU7O0lBQ1YsS0FBSywyQkFBTSxPQUFPOztJQUNsQixFQUFFLDJCQUFNLE1BQU07O0lBQ2QsYUFBYSwyQkFBTSw0QkFBNEI7O0FBRXRELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVwQyxLQUFLLENBQUMsTUFBTSxDQUNWLG9CQUFDLGFBQWEsSUFBQyxFQUFFLEVBQUUsRUFBRSxBQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sQUFBQyxHQUFHLEVBQ3pDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQ3JDLENBQUM7OztBQ2RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztJQ25ETyxhQUFhLDJCQUFNLDRCQUE0Qjs7SUFDL0MsYUFBYSwyQkFBTSw2QkFBNkI7O0FBRXZELElBQU0sV0FBVyxHQUFHO0FBQ2xCLGtCQUFnQixFQUFBLDRCQUFHO0FBQ2pCLGlCQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDN0IsZ0JBQVUsRUFBRSxhQUFhLENBQUMsaUJBQWlCO0tBQzVDLENBQUMsQ0FBQztHQUNKO0FBQ0QsZUFBYSxFQUFBLHVCQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFO0FBQzFDLGlCQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDN0IsZ0JBQVUsRUFBRSxhQUFhLENBQUMsY0FBYztBQUN4QyxhQUFPLEVBQUUsT0FBTztBQUNoQixlQUFTLEVBQUUsU0FBUztBQUNwQixjQUFRLEVBQUUsUUFBUTtLQUNuQixDQUFDLENBQUM7R0FDSjtDQUNGLENBQUM7O2lCQUVhLFdBQVc7Ozs7Ozs7SUNuQm5CLGFBQWEsMkJBQU0sNEJBQTRCOztJQUMvQyxhQUFhLDJCQUFNLDZCQUE2Qjs7QUFFdkQsSUFBTSxXQUFXLEdBQUc7QUFDbEIsVUFBUSxFQUFBLGtCQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDMUMsaUJBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztBQUM3QixnQkFBVSxFQUFFLGFBQWEsQ0FBQyxTQUFTO0FBQ25DLFVBQUksRUFBRSxJQUFJO0FBQ1YsUUFBRSxFQUFFLEVBQUU7QUFDTixhQUFPLEVBQUUsT0FBTztBQUNoQixVQUFJLEVBQUUsSUFBSTtBQUNWLGNBQVEsRUFBRSxRQUFRO0tBQ25CLENBQUMsQ0FBQztHQUNKO0FBQ0QsV0FBUyxFQUFBLG1CQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQzdCLGlCQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDN0IsZ0JBQVUsRUFBRSxhQUFhLENBQUMsVUFBVTtBQUNwQyxVQUFJLEVBQUUsSUFBSTtBQUNWLFVBQUksRUFBRSxJQUFJO0FBQ1YsYUFBTyxFQUFFLE9BQU87S0FDakIsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxNQUFJLEVBQUEsZ0JBQUc7QUFDTCxpQkFBYSxDQUFDLGdCQUFnQixDQUFDO0FBQzdCLGdCQUFVLEVBQUUsYUFBYSxDQUFDLElBQUk7S0FDL0IsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxTQUFPLEVBQUEsbUJBQUc7QUFDUixpQkFBYSxDQUFDLGdCQUFnQixDQUFDO0FBQzdCLGdCQUFVLEVBQUUsYUFBYSxDQUFDLE9BQU87S0FDbEMsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxVQUFRLEVBQUEsa0JBQUMsT0FBTyxFQUFFO0FBQ2hCLGlCQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDN0IsZ0JBQVUsRUFBRSxhQUFhLENBQUMsU0FBUztBQUNuQyxhQUFPLEVBQUUsT0FBTztLQUNqQixDQUFDLENBQUM7R0FDSjtBQUNELGlCQUFlLEVBQUEseUJBQUMsU0FBUyxFQUFFO0FBQ3pCLGlCQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDN0IsZ0JBQVUsRUFBRSxhQUFhLENBQUMsZ0JBQWdCO0FBQzFDLGVBQVMsRUFBRSxTQUFTO0tBQ3JCLENBQUMsQ0FBQztHQUNKO0NBQ0YsQ0FBQzs7aUJBRWEsV0FBVzs7O0FDOUMxQixZQUFZLENBQUM7Ozs7SUFFTixLQUFLLDJCQUFNLGNBQWM7O0lBQ3pCLFNBQVMsMkJBQU0scUJBQXFCOztJQUNwQyxZQUFZLDJCQUFNLHdCQUF3Qjs7QUFFakQsSUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRXZDLFFBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQzs7QUFFcEQsaUJBQWUsRUFBQSwyQkFBRztBQUNoQixXQUFPO0FBQ0wsb0JBQWMsRUFBRSxTQUFTLENBQUMsaUJBQWlCLEVBQUU7S0FDOUMsQ0FBQztHQUNIO0FBQ0QsUUFBTSxFQUFBLGtCQUFHO0FBQ1AsUUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7O0FBRXJDLFdBQ0U7O1FBQUssRUFBRSxFQUFDLGlCQUFpQjtNQUN0QixFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBTSxFQUFFLEtBQUs7ZUFDcEI7O1lBQUksR0FBRyxFQUFFLEtBQUssQUFBQztVQUNaLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsQ0FBQzttQkFBSzs7Z0JBQUksR0FBRyxFQUFFLENBQUMsQUFBQztjQUFFLEtBQUs7YUFBTTtXQUFBLENBQUMsQ0FBQyxPQUFPLEVBQUU7U0FDMUQ7T0FDTixDQUFDLENBQUMsT0FBTyxFQUFFO0tBQ1IsQ0FDTjtHQUNIO0FBQ0QsZUFBYSxFQUFBLHlCQUFHO0FBQ2QsUUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLG9CQUFjLEVBQUUsU0FBUyxDQUFDLGlCQUFpQixFQUFFO0tBQzlDLENBQUMsQ0FBQztHQUNKO0NBQ0YsQ0FBQyxDQUFDOztpQkFFWSxjQUFjOzs7QUNuQzdCLFlBQVksQ0FBQzs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsU0FBUywyQkFBTSxxQkFBcUI7O0lBQ3BDLFdBQVcsMkJBQU0sd0JBQXdCOztBQUVoRCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFN0IsV0FBUyxFQUFFO0FBQ1QsTUFBRSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDckMsU0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDeEMsU0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVTs7QUFFM0QsdUJBQW1CLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUNwRCxhQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtHQUMzQztBQUNELFFBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDOztBQUV0QyxpQkFBZSxFQUFBLDJCQUFHO0FBQ2hCLFFBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNuQyxXQUFPO0FBQ0wsa0JBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtBQUNoQyxjQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7QUFDeEIsYUFBTyxFQUFFLEVBQUUsRUFDWixDQUFDO0dBQ0g7QUFDRCxtQkFBaUIsRUFBQSw2QkFBRzs7O0FBQ2xCLFFBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFBLElBQUksRUFBSTtBQUMxQyxpQkFBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3BFLFlBQUssZUFBZSxFQUFFLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0FBQ0gsYUFBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7O0FBRWhELFFBQUksTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLEVBQUUsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7R0FDOUQ7QUFDRCxzQkFBb0IsRUFBQSxnQ0FBRztBQUNyQixhQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztHQUNsRDtBQUNELFFBQU0sRUFBQSxrQkFBRztBQUNQLFdBQ0U7O1FBQUssRUFBRSxFQUFDLGNBQWM7QUFDakIsaUJBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxRQUFRLEdBQUcsSUFBSSxBQUFDO01BRXhEOzs7O09BQWE7TUFDYjs7VUFBRyxTQUFTLEVBQUMsT0FBTztBQUNqQixpQkFBTyxFQUFFLFdBQVcsQ0FBQyxnQkFBZ0IsQUFBQzs7T0FFckM7TUFFSjs7VUFBTyxPQUFPLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxRQUFRO1FBQ2hDLGdDQUFRLEdBQUcsRUFBQyxrQkFBa0IsR0FBRztPQUMzQjtNQUVSOztVQUFJLEVBQUUsRUFBQyxXQUFXLEVBQUMsR0FBRyxFQUFDLE1BQU07UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ2xDOztjQUFJLEdBQUcsRUFBRSxDQUFDLEFBQUMsRUFBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQUFBQztZQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztXQUNwQjtTQUNOLENBQUMsQ0FBQyxPQUFPLEVBQUU7T0FDVDtNQUVMOzs7O09BQWdDO01BRWhDOztVQUFNLEVBQUUsRUFBQyxXQUFXO0FBQ2Qsa0JBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxBQUFDO1FBQ2xDLCtCQUFPLElBQUksRUFBQyxNQUFNO0FBQ1gsYUFBRyxFQUFDLFNBQVM7QUFDYixtQkFBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxBQUFDO0FBQzVCLGtCQUFRLE1BQUE7QUFDUixlQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEFBQUM7QUFDMUIsa0JBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEFBQUMsR0FBRztPQUNyQztLQUNILENBQ047R0FDSDtBQUNELG9CQUFrQixFQUFBLDhCQUFHO0FBQ25CLFFBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztHQUN2RDtBQUNELGtCQUFnQixFQUFBLDBCQUFDLENBQUMsRUFBRTtBQUNsQixRQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztHQUMxQztBQUNELGdCQUFjLEVBQUEsd0JBQUMsQ0FBQyxFQUFFO0FBQ2hCLEtBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDNkIsSUFBSSxDQUFDLEtBQUs7UUFBbkQsRUFBRSxVQUFGLEVBQUU7UUFBRSxLQUFLLFVBQUwsS0FBSztRQUFFLEtBQUssVUFBTCxLQUFLO1FBQUUsbUJBQW1CLFVBQW5CLG1CQUFtQjs7QUFDNUMsUUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7O0FBRW5DLFFBQUksQ0FBQyxtQkFBbUIsRUFBRTtBQUN4QixVQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN0QyxVQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUseUNBQXlDLEdBQ3BFLDBCQUEwQixDQUFDLENBQUM7QUFDOUIsYUFBTztLQUNSOztBQUVELGVBQVcsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLEtBQUssR0FBRyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDNUQsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDOztBQUU3QixNQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtBQUN0QixhQUFPLEVBQUUsT0FBTztBQUNoQixXQUFLLEVBQUUsS0FBSztBQUNaLFdBQUssRUFBRSxLQUFLO0tBQ2IsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxhQUFXLEVBQUEsdUJBQUc7QUFDWixRQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM3QyxZQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7R0FDNUM7QUFDRCxpQkFBZSxFQUFBLDJCQUFHLEVBSWpCO0NBQ0YsQ0FBQyxDQUFDOztpQkFFWSxJQUFJOzs7Ozs7O0FDakhuQixZQUFZLENBQUM7Ozs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsU0FBUywyQkFBTSxxQkFBcUI7O0lBQ3BDLFdBQVcsMkJBQU0sd0JBQXdCOztJQUN6QyxXQUFXLDJCQUFNLDBCQUEwQjs7SUFDM0MsWUFBWSwyQkFBTSx3QkFBd0I7O0lBQzFDLFlBQVksMkJBQU0sd0JBQXdCOztJQUMxQyxJQUFJLDJCQUFNLGFBQWE7O0lBQ3ZCLEVBQUUsMkJBQU0sWUFBWTs7eUJBQ1UsV0FBVzs7SUFBeEMsR0FBRyxjQUFILEdBQUc7SUFBRSxNQUFNLGNBQU4sTUFBTTtJQUFFLElBQUksY0FBSixJQUFJO0lBQUUsR0FBRyxjQUFILEdBQUc7O0FBRTlCLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEMsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFdEMsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRW5DLFdBQVMsRUFBRTtBQUNULE1BQUUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3JDLFNBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3hDLGtCQUFjLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUMvQyxTQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVO0FBQzNELFlBQVEsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQ3pDLHVCQUFtQixFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7R0FDckQ7QUFDRCxRQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUM7O0FBRXBELGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsUUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7O0FBRTdDLFdBQU87QUFDTCxTQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7QUFDZCxjQUFRLEVBQUUsSUFBSTtBQUNkLGNBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtBQUN4QixpQkFBVyxFQUFFLEtBQUs7S0FDbkIsQ0FBQztHQUNIO0FBQ0QsbUJBQWlCLEVBQUEsNkJBQUc7OztpQkFDRSxJQUFJLENBQUMsS0FBSztRQUF2QixFQUFFLFVBQUYsRUFBRTtRQUFFLEtBQUssVUFBTCxLQUFLOztBQUNoQixhQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsYUFBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUUxQyxNQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFBLElBQUksRUFBSTtBQUNwQixpQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5RCxZQUFLLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7QUFFNUIsVUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDbEIsY0FBSyxTQUFTLEVBQUUsQ0FBQztPQUNsQjs7QUFFRCxVQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7QUFDbkIsWUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RELGFBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7O0FBRS9CLGNBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBSyx3QkFBd0IsQ0FBQyxDQUFDO09BQ2pFO0tBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUU7YUFBTSxNQUFLLFFBQVEsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQztLQUFBLENBQUMsQ0FBQztHQUNsRTtBQUNELHNCQUFvQixFQUFBLGdDQUFHO0FBQ3JCLGFBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM1QyxhQUFTLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7R0FDM0M7QUFDRCxRQUFNLEVBQUEsa0JBQUc7OztpQkFDd0MsSUFBSSxDQUFDLEtBQUs7UUFBbEQsS0FBSyxVQUFMLEtBQUs7UUFBRSxtQkFBbUIsVUFBbkIsbUJBQW1CO1FBQUUsUUFBUSxVQUFSLFFBQVE7aUJBQ0ksSUFBSSxDQUFDLEtBQUs7UUFBbEQsR0FBRyxVQUFILEdBQUc7UUFBRSxRQUFRLFVBQVIsUUFBUTtRQUFFLFFBQVEsVUFBUixRQUFRO1FBQUUsV0FBVyxVQUFYLFdBQVc7O0FBQzNDLFFBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEMsUUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlCLFFBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25ELFFBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3RELFFBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUVqRCxXQUNFOztRQUFPLFNBQVMsRUFBQyxZQUFZO01BQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxTQUFTLEVBQUUsQ0FBQztlQUNyQixvQkFBQyxHQUFHO0FBQ0YsYUFBRyxFQUFFLENBQUMsQUFBQztBQUNQLGNBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxBQUFDO0FBQ25CLG1CQUFTLEVBQUUsU0FBUyxBQUFDO0FBQ3JCLGVBQUssRUFBRSxLQUFLLEFBQUM7QUFDYixvQkFBVSxFQUFFLFVBQVUsSUFBSSxtQkFBbUIsSUFBSSxDQUFDLFFBQVEsQUFBQztBQUMzRCxrQkFBUSxFQUFFLFFBQVEsQUFBQztBQUNuQixrQkFBUSxFQUFFLFFBQVEsQUFBQztBQUNuQixxQkFBVyxFQUFFLE1BQUssWUFBWSxBQUFDO0FBQy9CLHFCQUFXLEVBQUUsV0FBVyxBQUFDO0FBQ3pCLG9CQUFVLEVBQUUsU0FBUyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQUFBQyxHQUFHO09BQUEsQ0FBQztLQUNoRCxDQUNSO0dBQ0g7QUFDRCxlQUFhLEVBQUEsdUJBQUMsRUFBRSxFQUFFO0FBQ2hCLFFBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0FBQzdDLFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixTQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7QUFDZCxjQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7QUFDeEIsaUJBQVcsRUFBRSxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBLEFBQUM7S0FDMUUsRUFBRSxFQUFFLENBQUMsQ0FBQztHQUNSO0FBQ0QsY0FBWSxFQUFBLHNCQUFDLE1BQU0sRUFBRTtBQUNuQixRQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osY0FBUSxFQUFFLE1BQU07S0FDakIsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxZQUFVLEVBQUEsb0JBQUMsSUFBSSxFQUFFO2lCQUNLLElBQUksQ0FBQyxLQUFLO1FBQXZCLEVBQUUsVUFBRixFQUFFO1FBQUUsS0FBSyxVQUFMLEtBQUs7O0FBRWhCLE1BQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQ2xCLFdBQUssRUFBRSxLQUFLO0FBQ1osVUFBSSxFQUFFLElBQUk7S0FDWCxDQUFDLENBQUM7O0FBRUgsY0FBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO0dBQzFDO0FBQ0QsV0FBUyxFQUFBLHFCQUFHO2lCQUNpQixJQUFJLENBQUMsS0FBSztRQUE5QixFQUFFLFVBQUYsRUFBRTtRQUFFLEtBQUssVUFBTCxLQUFLO1FBQUUsS0FBSyxVQUFMLEtBQUs7O0FBRXZCLE1BQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQ25CLFdBQUssRUFBRSxLQUFLO0FBQ1osV0FBSyxFQUFFLEtBQUs7S0FDYixDQUFDLENBQUM7R0FDSjtBQUNELDBCQUF3QixFQUFBLG9DQUFHO0FBQ3pCLFFBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RCxTQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMxQyxVQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0dBQ3BFO0NBQ0YsQ0FBQyxDQUFDOztBQUVILElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUU1QixXQUFTLEVBQUU7QUFDVCxRQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVO0FBQ3pFLGFBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQzVDLFNBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVU7QUFDM0QsY0FBVSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDM0MsWUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtBQUNoQyxZQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO0FBQ2hDLGVBQVcsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzVDLGVBQVcsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVO0FBQ2hFLGNBQVUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVO0dBQ3ZEO0FBQ0QsUUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDOztBQUV0QixRQUFNLEVBQUEsa0JBQUc7OztpQkFDMEIsSUFBSSxDQUFDLEtBQUs7UUFBcEMsSUFBSSxVQUFKLElBQUk7UUFBRSxTQUFTLFVBQVQsU0FBUztRQUFFLEtBQUssVUFBTCxLQUFLOztBQUM3QixRQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLFFBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQ3BELEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO2FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSztLQUM5RCxDQUFDLENBQUMsT0FBTyxFQUFFLEdBRVosU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FDcEIsQ0FBQzs7QUFFRixXQUNFOzs7TUFDRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLENBQUM7ZUFDbkIsb0JBQUMsTUFBTTtBQUNMLGFBQUcsRUFBRSxDQUFDLEFBQUM7QUFDUCxnQkFBTSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxBQUFDO0FBQzVCLGVBQUssRUFBRSxLQUFLLEFBQUM7V0FDVCxJQUFJLENBQUMsTUFBSyxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFJO09BQUEsQ0FBQztLQUMvQyxDQUNMO0dBQ0g7Q0FDRixDQUFDLENBQUM7O0FBRUgsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRS9CLFdBQVMsRUFBRTtBQUNULFVBQU0sRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3pDLFNBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3hDLFNBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVU7QUFDM0QsY0FBVSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDM0MsWUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtBQUNoQyxZQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO0FBQ2hDLGVBQVcsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzVDLGVBQVcsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVO0FBQ2hFLGNBQVUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVO0dBQ3ZEOztBQUVELFFBQU0sRUFBQSxrQkFBRztpQkFFdUMsSUFBSSxDQUFDLEtBQUs7UUFEakQsUUFBUSxVQUFSLFFBQVE7UUFBRSxRQUFRLFVBQVIsUUFBUTtRQUFFLE1BQU0sVUFBTixNQUFNO1FBQUUsS0FBSyxVQUFMLEtBQUs7UUFDakMsVUFBVSxVQUFWLFVBQVU7UUFBRSxXQUFXLFVBQVgsV0FBVztRQUFFLFVBQVUsVUFBVixVQUFVOztBQUMxQyxRQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QyxRQUFNLEdBQUcsR0FBRyxLQUFLLEtBQUssT0FBTyxHQUFHLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDNUQsUUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9DLFFBQU0sV0FBVyxHQUFHLFFBQVEsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV2RCxXQUNFOztRQUFJLFNBQVMsRUFBRSxFQUFFLENBQUM7QUFDWixrQkFBUSxFQUFFLFFBQVEsS0FBSyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO0FBQ3RELGNBQUksRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLE1BQU07QUFDckMsWUFBRSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssTUFBTTtBQUNqQyxtQkFBUyxFQUFFLFdBQVc7U0FDdkIsQ0FBQyxBQUFDO0FBQ0gsZUFBTyxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxBQUFDO0FBQzdDLGtCQUFVLEVBQUUsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxBQUFDO0FBQ2xELGNBQU0sRUFBRSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEFBQUM7TUFFM0MsS0FBSyxHQUNKOztVQUFHLFNBQVMsRUFBRSxXQUFXLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLElBQUksQUFBQztBQUNoRSxpQkFBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEFBQUM7QUFDN0IscUJBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxBQUFDO0FBQy9CLG1CQUFTLEVBQUUsV0FBVyxJQUFJLFVBQVUsQUFBQztRQUNyQyxLQUFLO09BQ0osR0FDTCxJQUFJO0tBQ0YsQ0FDTDtHQUNIO0FBQ0QsZ0JBQWMsRUFBQSwwQkFBRztpQkFDc0MsSUFBSSxDQUFDLEtBQUs7UUFBeEQsVUFBVSxVQUFWLFVBQVU7UUFBRSxLQUFLLFVBQUwsS0FBSztRQUFFLFFBQVEsVUFBUixRQUFRO1FBQUUsTUFBTSxVQUFOLE1BQU07UUFBRSxLQUFLLFVBQUwsS0FBSzs7QUFDakQsUUFBTSxHQUFHLEdBQUcsS0FBSyxLQUFLLE9BQU8sR0FBRyxZQUFZLEdBQUcsWUFBWSxDQUFDOztBQUU1RCxRQUFJLENBQUMsVUFBVSxJQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQUFBQztBQUNoRCxhQUFPO1dBQ0osSUFBSSxRQUFRLElBQUksUUFBUSxLQUFLLE1BQU0sRUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsS0FDMUIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUUvQixXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQ3BFO0FBQ0QsY0FBWSxFQUFBLHNCQUFDLENBQUMsRUFBRTtBQUNkLEtBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQzs7QUFFdEMsS0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUV6QyxRQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQzNDO0FBQ0QsYUFBVyxFQUFBLHFCQUFDLENBQUMsRUFBRTtBQUNiLEtBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixLQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7R0FDcEM7QUFDRCxTQUFPLEVBQUEsaUJBQUMsQ0FBQyxFQUFFO0FBQ1QsS0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUNlLElBQUksQ0FBQyxLQUFLO1FBQXJDLFFBQVEsVUFBUixRQUFRO1FBQUUsTUFBTSxVQUFOLE1BQU07UUFBRSxLQUFLLFVBQUwsS0FBSzs7QUFDOUIsZUFBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztHQUNsRTtDQUNGLENBQUMsQ0FBQzs7aUJBRVksVUFBVTs7O0FDbFB6QixZQUFZLENBQUM7Ozs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsU0FBUywyQkFBTSxxQkFBcUI7O0lBQ3BDLFdBQVcsMkJBQU0sd0JBQXdCOztJQUN6QyxZQUFZLDJCQUFNLHdCQUF3Qjs7SUFDMUMsVUFBVSwyQkFBTSxjQUFjOztJQUM5QixjQUFjLDJCQUFNLGtCQUFrQjs7SUFDdEMsWUFBWSwyQkFBTSxnQkFBZ0I7O0lBQ2xDLElBQUksMkJBQU0sYUFBYTs7QUFFOUIsSUFBTSxtQkFBbUIsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFNUMsV0FBUyxFQUFFO0FBQ1QsTUFBRSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDckMsU0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDeEMsaUJBQWEsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzlDLFNBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVU7QUFDM0QsWUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDM0MsdUJBQW1CLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtHQUNyRDtBQUNELFFBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQzs7QUFFcEQsaUJBQWUsRUFBQSwyQkFBRztBQUNoQixXQUFPLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztHQUM3QjtBQUNELG9CQUFrQixFQUFBLDRCQUFDLFNBQVMsRUFBRTtBQUM1QixRQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFDakMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUNyQyxVQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztLQUMxRDtHQUNGO0FBQ0QsUUFBTSxFQUFBLGtCQUFHO2lCQUNvQyxJQUFJLENBQUMsS0FBSztRQUE5QyxTQUFTLFVBQVQsU0FBUztRQUFFLElBQUksVUFBSixJQUFJO1FBQUUsUUFBUSxVQUFSLFFBQVE7UUFBRSxLQUFLLFVBQUwsS0FBSzs7QUFFdkMsV0FDRTs7UUFBSyxFQUFFLEVBQUMscUJBQXFCLEVBQUMsU0FBUyxFQUFDLFVBQVU7TUFFaEQ7O1VBQU8sT0FBTyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsU0FBUztRQUNqQyxnQ0FBUSxHQUFHLEVBQUMsZUFBZSxHQUFHO09BQ3hCO01BQ1I7O1VBQU8sT0FBTyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsVUFBVTtRQUNsQyxnQ0FBUSxHQUFHLEVBQUMsZ0JBQWdCLEdBQUc7T0FDekI7TUFFUjs7VUFBSyxFQUFFLEVBQUMsZUFBZTtRQUNyQixvQkFBQyxjQUFjLE9BQUc7UUFDbEIsb0JBQUMsVUFBVSxlQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUM7QUFDakQsa0JBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxBQUFDO0FBQ2pDLHdCQUFjLEVBQUUsSUFBSSxDQUFDLGVBQWUsQUFBQyxJQUFHO09BQ3RDO01BRU4sb0JBQUMsWUFBWSxPQUFHO01BRWhCOztVQUFNLFNBQVMsRUFBQyxXQUFXO1FBQ3pCOzs7VUFDRTs7OztXQUF3QjtVQUN4Qjs7Y0FBUSxLQUFLLEVBQUUsU0FBUyxBQUFDO0FBQ2pCLHNCQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixBQUFDO1lBQ3hDOztnQkFBUSxLQUFLLEVBQUMsR0FBRzs7YUFBZTtZQUNoQzs7Z0JBQVEsS0FBSyxFQUFDLEdBQUc7O2FBQWM7WUFDL0I7O2dCQUFRLEtBQUssRUFBQyxHQUFHOzthQUFnQjtZQUNqQzs7Z0JBQVEsS0FBSyxFQUFDLEdBQUc7O2FBQWdCO1dBQzFCO1NBQ0g7T0FDSDtNQUVQOztVQUFNLFNBQVMsRUFBQyxVQUFVO1FBQ3ZCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FDdEI7OztVQUNFOztjQUFNLFNBQVMsRUFBQyxNQUFNO1lBRWxCLElBQUksS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7V0FDckI7Z0JBQ0gsSUFBSSxLQUFLLEdBQUcsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFBO1VBQ25DLEtBQUssR0FBRzs7OztXQUF3QixHQUFHLElBQUk7U0FDbkMsR0FFUDs7O1VBQ0U7O2NBQU0sU0FBUyxFQUFDLE1BQU07WUFDbkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUc7V0FDMUM7VUFDTixJQUFJLENBQUMsbUJBQW1CLEVBQUU7U0FDcEI7T0FFTjtLQUNILENBQ047R0FDSDtBQUNELGVBQWEsRUFBQSx5QkFBRztBQUNkLFFBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7R0FDckM7QUFDRCxvQkFBa0IsRUFBQSw0QkFBQyxDQUFDLEVBQUU7QUFDcEIsZUFBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQzdDO0FBQ0QsaUJBQWUsRUFBQSwyQkFBRztBQUNoQixRQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO0FBQzVCLFVBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQzFFO0dBQ0Y7QUFDRCxxQkFBbUIsRUFBQSwrQkFBRztBQUNwQixRQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0MsUUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pELFFBQU0sS0FBSyxHQUFHLE1BQU0sS0FBSyxPQUFPLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7QUFFckQsV0FBTyxJQUFJLEtBQUssV0FBVyxtQkFBaUIsTUFBTSxjQUNoRCxJQUFJLEtBQUssU0FBUyxRQUFNLEtBQUssd0JBQW1CLE1BQU0sY0FDdEQsSUFBSSxLQUFLLFFBQVEsUUFBTSxLQUFLLHVCQUFrQixNQUFNLGNBQ3BELElBQUksS0FBSyxNQUFNLEdBQUcsT0FBTyxHQUN6QixJQUFJLEtBQUssV0FBVyxHQUFHLG1CQUFtQixHQUMxQyxJQUFJLEtBQUsscUJBQXFCLEdBQUcsOEJBQThCLEdBQy9ELElBQUksS0FBSyxzQkFBc0IsR0FBRyw4QkFBOEIsR0FBRyxFQUFFLENBQUM7R0FDekU7Q0FDRixDQUFDLENBQUM7O2lCQUVZLG1CQUFtQjs7OztBQ3BIbEMsWUFBWSxDQUFDOzs7Ozs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsV0FBVywyQkFBTSx3QkFBd0I7O0FBRWhELElBQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDOztBQUVyRCxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFOUIsV0FBUyxFQUFFO0FBQ1QsTUFBRSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDckMsVUFBTSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVU7R0FDekM7QUFDRCxRQUFNLEVBQUUsQ0FBQyxlQUFlLENBQUM7O0FBRXpCLGlCQUFlLEVBQUEsMkJBQUc7dUNBQ08sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNOztRQUFqQyxDQUFDO1FBQUUsSUFBSTtRQUFFLEdBQUc7O0FBRW5CLFdBQU87QUFDTCxXQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUU7QUFDaEIsV0FBSyxFQUFFLElBQUksR0FBRyxFQUFFO0FBQ2hCLFNBQUcsRUFBRSxHQUFHO0FBQ1IsZUFBUyxFQUFFLElBQUk7S0FDaEIsQ0FBQztHQUNIO0FBQ0QsbUJBQWlCLEVBQUEsNkJBQUc7OztBQUNsQixRQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzs7QUFFekIsTUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQSxJQUFJO2FBQUksTUFBSyxRQUFROzs7bUNBQ3JDLElBQUksQ0FBQyxLQUFLLEVBQUcsSUFBSSxDQUFDLElBQUk7O2dEQUNaLElBQUksQ0FBQyxLQUFLOzs7V0FDckI7S0FBQSxDQUFDLENBQUM7O0FBRUosTUFBRSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxVQUFBLElBQUksRUFBSTtBQUNsQyxZQUFLLFFBQVEsQ0FBQyxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ2pDLGlCQUFXLENBQUMsUUFBUSxDQUFDO0FBQ25CLFlBQUksRUFBRSxTQUFTO0FBQ2YsY0FBTSxFQUFFLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxHQUFHLE9BQU8sR0FBRyxPQUFPO09BQ25ELENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDOUIsWUFBSyxRQUFRLENBQUM7QUFDWixhQUFLLEVBQUUsTUFBSyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7QUFDaEMsYUFBSyxFQUFFLE1BQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO09BQ2pDLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNKO0FBQ0QsUUFBTSxFQUFBLGtCQUFHO0FBQ1AsV0FDRTs7UUFBSSxFQUFFLEVBQUMsT0FBTztNQUNaLG9CQUFDLEtBQUs7QUFDSixhQUFLLEVBQUMsT0FBTztBQUNiLFlBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBQztBQUN2QixpQkFBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxBQUFDLEdBQUc7TUFDckMsb0JBQUMsS0FBSztBQUNKLGFBQUssRUFBQyxPQUFPO0FBQ2IsWUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxBQUFDO0FBQ3ZCLGlCQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEFBQUMsR0FBRztLQUNsQyxDQUNMO0dBQ0g7Q0FDRixDQUFDLENBQUM7O0FBRUgsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRTlCLFFBQU0sRUFBRSxDQUFDLGVBQWUsQ0FBQzs7QUFFekIsUUFBTSxFQUFBLGtCQUFHO2lCQUMwQixJQUFJLENBQUMsS0FBSztRQUFwQyxJQUFJLFVBQUosSUFBSTtRQUFFLEtBQUssVUFBTCxLQUFLO1FBQUUsU0FBUyxVQUFULFNBQVM7O0FBQzdCLFFBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLFFBQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDdEIsUUFBTSxRQUFRLFFBQU0sR0FBRyxVQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUEsQUFBRSxDQUFDOztBQUV4RCxXQUNFOztRQUFJLFNBQVMsRUFBRSxLQUFLLElBQUksS0FBSyxLQUFLLFNBQVMsR0FBRyxVQUFVLEdBQUcsRUFBRSxDQUFBLEFBQUMsQUFBQztNQUM1RCxRQUFRO0tBQ04sQ0FDTDtHQUNIO0NBQ0YsQ0FBQyxDQUFDOztpQkFFWSxLQUFLOzs7QUNsRnBCLFlBQVksQ0FBQzs7Ozs7O0lBRU4sS0FBSywyQkFBTSxjQUFjOztJQUN6QixTQUFTLDJCQUFNLHFCQUFxQjs7SUFDcEMsV0FBVywyQkFBTSx3QkFBd0I7Ozs7SUFFekMsWUFBWSwyQkFBTSx3QkFBd0I7O0lBQzFDLFFBQVEsMkJBQU0sa0JBQWtCOztJQUNoQyxJQUFJLDJCQUFNLGFBQWE7O0lBQ3ZCLEVBQUUsMkJBQU0sWUFBWTs7QUFLM0IsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ25DLFVBQVMsRUFBRSxFQUVWO0FBQ0QsT0FBTSxFQUFFLENBQUMsWUFBWSxDQUFDO0FBQ3RCLGdCQUFlLEVBQUEsMkJBQUc7QUFDakIsTUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztBQUMzQyxTQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkMsU0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0VBQ2xCOztBQUVELGVBQWMsRUFBQSwwQkFBRTs7O0FBQ1QsTUFBQyxLQUFLLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBbkIsS0FBSyxDQUFjLGFBQ1YsSUFBSSxDQUFDLEtBQUs7TUFBeEIsSUFBSSxVQUFKLElBQUk7TUFBRSxJQUFJLFVBQUosSUFBSTs7QUFFWixNQUFJLElBQUksS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztBQUFFLFVBQU87R0FBQSxJQUUxRCxLQUFLLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBbkIsS0FBSzs7QUFDVixNQUFJLEtBQUssS0FBSyxPQUFPLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekQsTUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1VBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSztHQUFDLENBQUMsQ0FBQztBQUM1SCxNQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUUxQyxNQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDeEIsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLEVBQUk7QUFDN0MsT0FBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7T0FBRSxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3RCxPQUFJLE1BQUssVUFBVSxDQUFDLEVBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssT0FBSyxJQUFJLFVBQUssSUFBSSxPQUFJLEVBQ3RFLGNBQWMsT0FBSyxJQUFJLFVBQUssSUFBSSxPQUFJLEdBQUcsSUFBSSxDQUFDO0dBQzdDLENBQUMsQ0FBQTs7QUFFRixNQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDeEMsT0FBSSxDQUFDLHlCQUF5QixFQUFFLDBDQUEwQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQ3JGLE1BQ0c7QUFDSCxPQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDaEIsZUFBVyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ25CLFFBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFdBQVcsQ0FBQztBQUM3RCxRQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2IsU0FBSSxFQUFFLGNBQWM7QUFDcEIsZ0JBQVcsRUFBRTtBQUNaLFVBQUksRUFBRSxZQUFZO0FBQ2xCLFdBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7QUFDdkIsVUFBSSxFQUFFLE9BQU87TUFDYjtLQUNELENBQUMsQ0FBQztJQUNILE1BRUEsSUFBSSxDQUFDLHlCQUF5QixFQUFFLHdCQUF3QixFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQ3BFO0VBQ0Q7O0FBRUQsaUJBQWdCLEVBQUEsNEJBQUU7QUFDakIsU0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzQixNQUFJLFFBQVEsQ0FBQztBQUNiLE1BQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckQsTUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQzs7QUFFbEMsTUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQzlCLFlBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BDLFlBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQ2hDLE1BQ0k7QUFDSixZQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuQyxZQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUNqQztFQUNEOztBQUVELGtCQUFpQixFQUFBLDZCQUFHOzs7ZUFFQyxJQUFJLENBQUMsS0FBSztNQUF2QixFQUFFLFVBQUYsRUFBRTtNQUFFLEtBQUssVUFBTCxLQUFLOztBQUVoQixXQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsV0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFDLFdBQVMsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFL0MsSUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQSxJQUFJLEVBQUk7QUFDckIsY0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUV6RSxPQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNsQixVQUFLLFNBQVMsRUFBRSxDQUFDO0lBQ2xCOztBQUVELE9BQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtBQUNuQixRQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEQsU0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQzs7QUFFL0IsVUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFLLHdCQUF3QixDQUFDLENBQUM7SUFDakU7R0FDRCxDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsVUFBQSxJQUFJLEVBQUk7QUFDOUIsVUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQixPQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3pCLE9BQUksQ0FBQztBQUNKLFNBQUssRUFBRSxXQUFXO0FBQ2xCLFFBQUksRUFBRSxTQUFTO0FBQ2YsWUFBUSxFQUFFLHVIQUF1SDtJQUNqSSxDQUFDLENBQUM7R0FDSCxDQUFDLENBQUE7RUFDRjs7QUFFRCxxQkFBb0IsRUFBQSxnQ0FBRztBQUN0QixXQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBQy9DOztBQUVELGlCQUFnQixFQUFBLDBCQUFDLEdBQUcsRUFBRTtNQUNkLElBQUksR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFsQixJQUFJOztBQUNYLE1BQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDN0IsZ0JBQVcsSUFBSSxHQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsV0FBSyxJQUFJLEdBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQSxPQUFJO0VBQ3BEOztBQUVELGNBQWEsRUFBQSx5QkFBRzs7O01BQ1IsS0FBSyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQW5CLEtBQUs7O0FBQ1osTUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLFFBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxFQUFJO0FBQ2pDLFdBQVEsQ0FBQyxNQUFLLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ2xELENBQUMsQ0FBQTtBQUNGLFNBQU8sUUFBUSxDQUFDO0VBQ2hCOztBQUVELGNBQWEsRUFBQSx1QkFBQyxFQUFFLEVBQUU7QUFDakIsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDNUMsTUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLFFBQUssRUFBRSxLQUFLLENBQUMsS0FBSztBQUNsQixVQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87QUFDdEIsU0FBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO0FBQ3BCLE9BQUksRUFBRSxLQUFLLENBQUMsSUFBSTtBQUNoQixXQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7QUFDeEIsV0FBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO0FBQ3hCLE9BQUksRUFBRSxLQUFLLENBQUMsSUFBSTtBQUNoQixjQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7R0FDOUIsRUFBRSxFQUFFLENBQUMsQ0FBQztFQUNQOztBQUVELFdBQVUsRUFBQSxvQkFBQyxJQUFJLEVBQUU7ZUFDSSxJQUFJLENBQUMsS0FBSztNQUF2QixFQUFFLFVBQUYsRUFBRTtNQUFFLEtBQUssVUFBTCxLQUFLOztBQUNoQixJQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxDQUFDLENBQUM7RUFDckM7O0FBRUQsWUFBVyxFQUFBLDJCQUFXO01BQVQsTUFBTSxRQUFOLE1BQU07ZUFDRSxJQUFJLENBQUMsS0FBSztNQUF2QixFQUFFLFVBQUYsRUFBRTtNQUFFLEtBQUssVUFBTCxLQUFLOztBQUNoQixTQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzdCLFNBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsSUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUUsQ0FBQyxDQUFDO0VBQzNDOztBQUVELE9BQU0sRUFBQSxrQkFBRzs7O2FBQ2EsSUFBSTs7TUFBcEIsS0FBSyxRQUFMLEtBQUs7QUFBTixNQUFRLEtBQUssUUFBTCxLQUFLLENBQVEsSUFDdkIsSUFBSSxHQUFXLEtBQUssQ0FBcEIsSUFBSTs7QUFBTCxNQUFPLEtBQUssR0FBSSxLQUFLLENBQWQsS0FBSyxDQUFTLElBQ3BCLEtBQUssR0FBK0QsS0FBSyxDQUF6RSxLQUFLO01BQUUsUUFBUSxHQUFxRCxLQUFLLENBQWxFLFFBQVE7TUFBRSxPQUFPLEdBQTRDLEtBQUssQ0FBeEQsT0FBTztNQUFFLE1BQU0sR0FBb0MsS0FBSyxDQUEvQyxNQUFNO01BQUUsSUFBSSxHQUE4QixLQUFLLENBQXZDLElBQUk7TUFBRSxJQUFJLEdBQXdCLEtBQUssQ0FBakMsSUFBSTtNQUFFLEtBQUssR0FBaUIsS0FBSyxDQUEzQixLQUFLO01BQUUsV0FBVyxHQUFJLEtBQUssQ0FBcEIsV0FBVzs7QUFFbEUsTUFBSSxLQUFLLEtBQUssT0FBTyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O0FBRXBELE1BQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNuQixPQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzFCLE9BQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNiLFFBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDMUIsT0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDcEI7QUFDRCxZQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ3BCOztBQUVELFNBQ0M7OztHQUNDOztNQUFPLFNBQVMsRUFBQyxPQUFPO0lBQ3ZCLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHLEVBQUUsSUFBSTtZQUN4Qjs7O01BQ0UsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxJQUFJLEVBQUs7QUFDdkIsV0FBSSxNQUFNLFNBQU8sSUFBSSxVQUFLLElBQUksTUFBRyxDQUFDO0FBQ2xDLGNBQ0M7O1VBQUksUUFBUSxFQUFFLE1BQU0sQUFBQztRQUNwQixvQkFBQyxJQUFJLElBQUMsR0FBRyxFQUFFLE1BQU0sQUFBQztBQUNqQixpQkFBUSxFQUFFLE1BQU0sQUFBQztBQUNqQixhQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxBQUFDO0FBQ2hELGNBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEFBQUM7QUFDbEQsb0JBQVcsRUFBRSxLQUFLLEFBQUM7QUFDbkIsYUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQUFBQztBQUNoRCxjQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxBQUFDO0FBQ3ZCLGtCQUFTLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxBQUFDO0FBQzFCLGdCQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxBQUFDO0FBQ3RCLGlCQUFRLEVBQUUsUUFBUSxBQUFDO0FBQ25CLGFBQUksRUFBRSxJQUFJLEFBQUM7QUFDWCxvQkFBVyxFQUFFLFdBQVcsQUFBQztBQUN6QixvQkFBVyxFQUFFLE1BQUssWUFBWSxBQUFDO0FBQy9CLG9CQUFXLEVBQUUsTUFBSyxZQUFZLEFBQUM7QUFDL0IscUJBQVksRUFBRSxNQUFLLGFBQWEsQUFBQyxHQUFHO1FBQ2pDLENBQ0w7T0FDRCxDQUNEO01BQ0c7S0FBQSxDQUNMO0lBQ087R0FDUjs7TUFBSyxFQUFFLEVBQUMsTUFBTTtJQUNiOztPQUFRLFNBQVMsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEFBQUM7O0tBQWM7SUFDbkUsb0JBQUMsY0FBYyxJQUFDLFFBQVEsRUFBQyxVQUFVO0FBQ2xDLFNBQUksRUFBRSxXQUFXLEdBQUUsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLEFBQUM7QUFDM0MsVUFBSyxFQUFFLFdBQVcsR0FBRSxXQUFXLENBQUMsS0FBSyxHQUFHLElBQUksQUFBQztBQUM3QyxTQUFJLEVBQUUsV0FBVyxHQUFFLFdBQVcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxBQUFDO0FBQzNDLGNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEFBQUM7QUFDakMsZ0JBQVcsRUFBRSxLQUFLLEFBQUMsR0FBRztJQUNsQjtHQUNELENBQ0w7RUFDRjs7QUFFRCxrQkFBaUIsRUFBQSwyQkFBQyxDQUFDLEVBQUU7QUFDcEIsR0FBQyxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO0FBQ3RDLEdBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQzs7ZUFFaUQsSUFBSSxDQUFDLEtBQUs7TUFBN0YsSUFBSSxVQUFKLElBQUk7TUFBRSxRQUFRLFVBQVIsUUFBUTtNQUFFLEtBQUssVUFBTCxLQUFLO01BQUUsUUFBUSxVQUFSLFFBQVE7TUFBRSxXQUFXLFVBQVgsV0FBVztNQUFFLEtBQUssVUFBTCxLQUFLO01BQUUsU0FBUyxVQUFULFNBQVM7TUFBRSxTQUFTLFVBQVQsU0FBUztNQUFFLElBQUksVUFBSixJQUFJOztBQUN0RixNQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztFQUVyQzs7QUFFRCxhQUFZLEVBQUEsc0JBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUMvQixNQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2IsV0FBUSxFQUFFLFFBQVE7QUFDbEIsVUFBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFlBQVk7QUFDNUQsU0FBTSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLGNBQWM7R0FDN0QsQ0FBQyxDQUFBO0VBQ0Y7O0FBRUQsY0FBYSxFQUFBLHVCQUFDLElBQUksRUFBRTtBQUNuQixNQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2IsY0FBVyxFQUFFO0FBQ1osUUFBSSxFQUFFLElBQUk7QUFDVixTQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO0FBQ3ZCLFFBQUksRUFBRSxPQUFPO0lBQ2I7R0FDRCxDQUFDLENBQUE7RUFFRjs7QUFFRCxlQUFjLEVBQUEsd0JBQUMsUUFBUSxFQUFFLEtBQUssRUFBRTs7O0FBQy9CLE1BQUksQ0FBQyxLQUFLO0FBQUUsVUFBTztHQUFBLElBQ0wsV0FBVyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQWhDLEtBQUs7O0FBQ1osTUFBSSxPQUFPLEdBQUcsRUFBRTtNQUFFLFlBQVksR0FBRyxFQUFFO01BQUUsY0FBYyxHQUFHLEVBQUU7TUFDdkQsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO01BQzdCLFFBQVEsR0FBRyxXQUFXLEtBQUssT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs7O0FBRzlFLFFBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2xDLE9BQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO09BQUUsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7OztBQUVyRCxJQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7T0FDMUIsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7OztBQUc1QixPQUFJLFFBQVEsS0FBSyxRQUFRLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQyxLQUNqRSxJQUFJLFFBQVEsS0FBSyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQyxLQUNsRTtBQUNKLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU07UUFDdEIsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7OztBQUd4QixXQUFPLE1BQUssVUFBVSxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRTs7O0FBR3JDLFNBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEFBQUMsRUFDckQsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQzs7O0FBRzFDLFNBQUksWUFBWSxHQUFHLFFBQVEsT0FBSyxDQUFDLFVBQUssQ0FBQyxPQUFJLENBQUM7QUFDNUMsU0FBSSxZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU07O0FBRXRELE1BQUMsSUFBSSxNQUFNLENBQUMsQUFBQyxDQUFDLElBQUksTUFBTSxDQUFDO0tBQ3pCO0lBQ0Q7R0FDRCxDQUFDLENBQUM7Ozs7QUFJSCxTQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQ3ZCLE9BQUksVUFBVSxHQUFHLFFBQVEsT0FBSyxLQUFLLENBQUMsQ0FBQyxVQUFLLEtBQUssQ0FBQyxDQUFDLE9BQUksQ0FBQztBQUN0RCxPQUFJLFVBQVUsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDOUUsVUFBTyxNQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUM5QixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQ25CLE9BQUksS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUUsWUFBWSxPQUFLLEtBQUssQ0FBQyxDQUFDLFVBQUssS0FBSyxDQUFDLENBQUMsT0FBSSxHQUFHLElBQUksQ0FBQyxLQUN0RSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLGNBQWMsT0FBSyxLQUFLLENBQUMsQ0FBQyxVQUFLLEtBQUssQ0FBQyxDQUFDLE9BQUksR0FBRyxJQUFJLENBQUM7R0FDcEYsQ0FBQyxDQUFDOztBQUVILFNBQU8sRUFBRSxZQUFZLEVBQVosWUFBWSxFQUFFLGNBQWMsRUFBZCxjQUFjLEVBQUUsQ0FBQztFQUN4Qzs7QUFFRCxXQUFVLEVBQUEsMEJBQVM7TUFBUCxDQUFDLFFBQUQsQ0FBQztNQUFFLENBQUMsUUFBRCxDQUFDOztBQUNkLFNBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUMzQzs7QUFFRCxVQUFTLEVBQUEscUJBQUc7ZUFDaUIsSUFBSSxDQUFDLEtBQUs7TUFBOUIsRUFBRSxVQUFGLEVBQUU7TUFBRSxLQUFLLFVBQUwsS0FBSztNQUFFLEtBQUssVUFBTCxLQUFLOztBQUV2QixJQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNuQixRQUFLLEVBQUUsS0FBSztBQUNaLFFBQUssRUFBRSxLQUFLO0dBQ2IsQ0FBQyxDQUFDO0VBQ0o7QUFDRCx5QkFBd0IsRUFBQSxvQ0FBRztBQUN6QixNQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEQsT0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUMsUUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztFQUNwRTs7Q0FFRCxDQUFDLENBQUM7O0FBR0gsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQzlCLFVBQVMsRUFBRSxFQUVWOztBQUVDLGtCQUFpQixFQUFBLDZCQUFHLEVBRXJCOztBQUVELG1CQUFrQixFQUFBLDhCQUFHLEVBRXBCOztBQUVELE9BQU0sRUFBRSxFQUFFOztBQUVWLGVBQWMsRUFBQSwwQkFBRztlQUV1RSxJQUFJLENBQUMsS0FBSztNQUExRixJQUFJLFVBQUosSUFBSTtNQUFFLEtBQUssVUFBTCxLQUFLO01BQUUsV0FBVyxVQUFYLFdBQVc7TUFBRSxLQUFLLFVBQUwsS0FBSztNQUFFLFNBQVMsVUFBVCxTQUFTO01BQUUsT0FBTyxVQUFQLE9BQU87TUFBRSxJQUFJLFVBQUosSUFBSTtNQUFFLFdBQVcsVUFBWCxXQUFXO01BQUUsSUFBSSxVQUFKLElBQUk7Z0JBRXhELElBQUksQ0FBQyxLQUFLO01BQWhDLFFBQVEsV0FBUixRQUFRO01BQUUsUUFBUSxXQUFSLFFBQVE7OztBQUd2QixNQUFJLElBQUksS0FBSyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUFFLFVBQU87R0FBQTtBQUczQyxNQUFJLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssV0FBVyxFQUFFO0FBQy9DLE9BQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQyxjQUFXLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0dBQzdCOztPQUVJOztBQUVKLE9BQUksV0FBVyxLQUFLLE9BQU8sRUFBRTtBQUM1QixZQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNDLFlBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0M7Ozs7O0FBS0QsT0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNyQixRQUFJLE9BQU8sR0FBRyxJQUFJLElBQUksS0FBSyxLQUFLLFdBQVcsQ0FBQztBQUM1QyxlQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNoRSxlQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCOzs7UUFHSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssV0FBVyxFQUFFO0FBQy9ELGVBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9ELGVBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEI7OztRQUdJLElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRTtBQUMvQixlQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCO0dBQ0Q7RUFDRDs7QUFFRCxhQUFZLEVBQUEsc0JBQUMsQ0FBQyxFQUFFO2VBQzRGLElBQUksQ0FBQyxLQUFLO01BQTlHLElBQUksVUFBSixJQUFJO01BQUUsUUFBUSxVQUFSLFFBQVE7TUFBRSxLQUFLLFVBQUwsS0FBSztNQUFFLFFBQVEsVUFBUixRQUFRO01BQUUsV0FBVyxVQUFYLFdBQVc7TUFBRSxLQUFLLFVBQUwsS0FBSztNQUFFLFNBQVMsVUFBVCxTQUFTO01BQUUsSUFBSSxVQUFKLElBQUk7TUFBRSxPQUFPLFVBQVAsT0FBTztNQUFFLFdBQVcsVUFBWCxXQUFXO01BQUUsSUFBSSxVQUFKLElBQUk7O0FBQ3ZHLE1BQUksSUFBSSxLQUFLLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQUUsVUFBTztHQUFBLEFBRTNDLENBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztBQUN0QyxHQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7O0FBRXpDLE1BQUksQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxXQUFXLEVBQUU7QUFDL0MsT0FBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLGNBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDN0I7RUFDRDtBQUNELFlBQVcsRUFBQSxxQkFBQyxDQUFDLEVBQUU7QUFDZCxHQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsR0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0VBQ25DO0FBQ0QsUUFBTyxFQUFBLGlCQUFDLENBQUMsRUFBRTtBQUNWLEdBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7ZUFFc0csSUFBSSxDQUFDLEtBQUs7TUFBNUgsSUFBSSxVQUFKLElBQUk7TUFBRSxLQUFLLFVBQUwsS0FBSztNQUFFLFdBQVcsVUFBWCxXQUFXO01BQUUsWUFBWSxVQUFaLFlBQVk7TUFBRSxXQUFXLFVBQVgsV0FBVztNQUFFLEtBQUssVUFBTCxLQUFLO01BQUUsU0FBUyxVQUFULFNBQVM7TUFBRSxPQUFPLFVBQVAsT0FBTztNQUFFLElBQUksVUFBSixJQUFJO01BQUUsV0FBVyxVQUFYLFdBQVc7TUFBRSxXQUFXLFVBQVgsV0FBVztnQkFDMUYsSUFBSSxDQUFDLEtBQUs7TUFBaEMsUUFBUSxXQUFSLFFBQVE7TUFBRSxRQUFRLFdBQVIsUUFBUTs7QUFFdkIsTUFBSSxXQUFXLEtBQUssT0FBTyxFQUFFO0FBQzVCLE9BQUksUUFBUSxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekQsT0FBSSxRQUFRLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztHQUN6RDtBQUNELE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7QUFDckIsT0FBSSxPQUFPLEdBQUcsSUFBSSxJQUFJLEtBQUssS0FBSyxXQUFXLENBQUM7QUFDNUMsY0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDaEUsTUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLElBQUksRUFBQztBQUNyQyxjQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztHQUMvRCxNQUNJLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUM7QUFDMUIsY0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDakU7QUFDRCxhQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0VBRXRCOztBQUVELGlCQUFnQixFQUFBLDBCQUFDLEdBQUcsRUFBRTtBQUNyQixNQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLGdCQUFXLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsV0FBSyxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLE9BQUk7RUFDMUM7O0FBRUQsT0FBTSxFQUFBLGtCQUFFO2VBQzZELElBQUksQ0FBQyxLQUFLO01BQXZFLElBQUksVUFBSixJQUFJO01BQUUsS0FBSyxVQUFMLEtBQUs7TUFBRSxLQUFLLFVBQUwsS0FBSztNQUFFLFNBQVMsVUFBVCxTQUFTO01BQUUsT0FBTyxVQUFQLE9BQU87TUFBRSxJQUFJLFVBQUosSUFBSTtNQUFFLFdBQVcsVUFBWCxXQUFXOztBQUVoRSxTQUNDOztLQUFLLFNBQVMsRUFBRSxFQUFFO0FBQ2hCLG9CQUFlLElBQUksSUFDbEIsSUFBSSxFQUFHLElBQUksRUFDWCxBQUFDO0FBQ0gsY0FBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEFBQUM7QUFDN0IsVUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLEFBQUM7O0dBRXBCLDJCQUFHLFNBQVMsRUFBRSxFQUFFOztBQUNkLFlBQU0sQ0FBQyxDQUFDLElBQUk7QUFDWixhQUFPLEtBQUs7QUFDWixpQkFBVyxTQUFTO0FBQ3BCLGVBQVMsT0FBTztBQUNoQixnQkFBVSxLQUFLLElBQUksS0FBSyxLQUFLLFdBQVc7OzJCQUN2QyxJQUFJLEVBQUcsSUFBSTs7MkJBQ1gsSUFBSSxFQUFHLElBQUk7OzJCQUNYLEtBQUssRUFBRyxJQUFJOzs7U0FDWixBQUFDO0FBQ0gsV0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEFBQUM7QUFDN0IsZUFBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEFBQUM7QUFDL0IsYUFBUyxNQUFBLEdBQUc7R0FDYixnQ0FBUSxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxJQUFJLEtBQUssS0FBSyxXQUFXLEVBQUMsQ0FBQyxBQUFDLEdBQUc7R0FDekYsZ0NBQVEsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssSUFBSSxLQUFLLEtBQUssV0FBVyxFQUFDLENBQUMsQUFBQyxHQUFHO0dBQ3hGLGdDQUFRLFNBQVMsRUFBQyxXQUFXLEdBQUc7R0FDaEMsZ0NBQVEsU0FBUyxFQUFDLFlBQVksR0FBRztHQUNqQyxnQ0FBUSxTQUFTLEVBQUMsVUFBVSxHQUFHO0dBQy9CLGdDQUFRLFNBQVMsRUFBQyxhQUFhLEdBQUc7R0FDOUIsQ0FFTDtFQUNGOztDQUVELENBQUMsQ0FBQzs7QUFFSCxJQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDeEMsVUFBUyxFQUFFLEVBQ1Y7QUFDRCxnQkFBZSxFQUFFLDJCQUFXO0FBQ3ZCLFNBQU87O0FBRU4sUUFBSyxFQUFFLElBQUk7R0FDWCxDQUFDO0VBQ0o7QUFDRCxrQkFBaUIsRUFBQSw2QkFBRyxFQUdyQjs7QUFFRCxtQkFBa0IsRUFBQSw4QkFBRyxFQUdwQjs7QUFFRCxPQUFNLEVBQUUsRUFBRTs7QUFHVixhQUFZLEVBQUEsc0JBQUMsQ0FBQyxFQUFFO0FBQ2YsR0FBQyxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO0FBQ3RDLEdBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQzs7ZUFFSCxJQUFJLENBQUMsS0FBSztNQUF6QyxJQUFJLFVBQUosSUFBSTtNQUFFLFFBQVEsVUFBUixRQUFRO01BQUUsS0FBSyxVQUFMLEtBQUs7TUFBRSxJQUFJLFVBQUosSUFBSTtFQUNsQztBQUNELFlBQVcsRUFBQSxxQkFBQyxDQUFDLEVBQUU7QUFDZCxHQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsR0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0VBQ25DOztBQUVELE9BQU0sRUFBQSxrQkFBRTtlQUNnRSxJQUFJLENBQUMsS0FBSztNQUE1RSxJQUFJLFVBQUosSUFBSTtNQUFFLEtBQUssVUFBTCxLQUFLO01BQUUsSUFBSSxVQUFKLElBQUk7TUFBRSxTQUFTLFVBQVQsU0FBUztNQUFFLFNBQVMsVUFBVCxTQUFTO01BQUUsUUFBUSxVQUFSLFFBQVE7TUFBRSxXQUFXLFVBQVgsV0FBVzs7QUFFbkUsU0FDQzs7S0FBSyxFQUFFLEVBQUMsV0FBVyxFQUFDLFNBQVMsTUFBQTtBQUM1QixhQUFTLEVBQUUsRUFBRTs7QUFDWixxQkFBZSxJQUFJOzswQkFDbEIsSUFBSSxFQUFHLElBQUk7OzBCQUNYLEtBQUssRUFBRyxJQUFJOzswQkFDWixJQUFJLEVBQUcsSUFBSTs7O1NBQ1gsQUFBQztHQUNGLDJCQUFHLFNBQVMsRUFBRSxFQUFFOztBQUNkLFlBQU0sQ0FBQyxDQUFDLElBQUk7QUFDWixnQkFBVSxLQUFLLElBQUksS0FBSyxLQUFLLFdBQVc7OzJCQUN2QyxJQUFJLEVBQUcsSUFBSTs7MkJBQ1gsSUFBSSxFQUFHLElBQUk7OzJCQUNYLEtBQUssRUFBRyxJQUFJOzs7U0FDWixBQUFDO0FBQ0gsV0FBTyxFQUFFLFNBQVMsQUFBQzs7QUFFbkIsYUFBUyxNQUFBLEdBQ047R0FDSixnQ0FBUSxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLElBQUksS0FBSyxLQUFLLFdBQVcsRUFBQyxDQUFDLEFBQUMsR0FBRztHQUMvRyxnQ0FBUSxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFHLFFBQVEsRUFBRSxLQUFLLElBQUksS0FBSyxLQUFLLFdBQVcsRUFBQyxDQUFDLEFBQUMsR0FBRztHQUMvRyxnQ0FBUSxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFDLENBQUMsQUFBQyxHQUFHO0dBQ3BFLGdDQUFRLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxBQUFDLEdBQUc7R0FDckUsZ0NBQVEsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBQyxDQUFDLEFBQUMsR0FBRztHQUNuRSxnQ0FBUSxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFDLENBQUMsQUFBQyxHQUFHO0dBQ2pFLENBRUw7RUFDRjs7Q0FFRCxDQUFDLENBQUM7O2lCQUVXLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUM7Ozs7QUNsaEI3RSxZQUFZLENBQUM7Ozs7SUFFTixLQUFLLDJCQUFNLGNBQWM7O0lBQ3pCLEtBQUssMkJBQU0sU0FBUzs7SUFDcEIsU0FBUywyQkFBTSxxQkFBcUI7O0lBQ3BDLFdBQVcsMkJBQU0sd0JBQXdCOztJQUN6QyxJQUFJLDJCQUFNLGFBQWE7O0FBRTlCLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUVuQyxXQUFTLEVBQUU7QUFDVCxNQUFFLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUNyQyxVQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVTtBQUN4QyxTQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVO0FBQzNELGFBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzFDLFlBQVEsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQ3pDLHVCQUFtQixFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7R0FDckQ7QUFDRCxRQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQzs7QUFFdEMsaUJBQWUsRUFBQSwyQkFBRztBQUNoQixXQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7R0FDL0M7QUFDRCxtQkFBaUIsRUFBQSw2QkFBRztBQUNsQixhQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDNUM7QUFDRCxzQkFBb0IsRUFBQSxnQ0FBRztBQUNyQixhQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDN0M7QUFDRCxRQUFNLEVBQUEsa0JBQUc7aUJBQzZDLElBQUksQ0FBQyxLQUFLO1FBQXZELEVBQUUsVUFBRixFQUFFO1FBQUUsTUFBTSxVQUFOLE1BQU07UUFBRSxRQUFRLFVBQVIsUUFBUTtRQUFFLG1CQUFtQixVQUFuQixtQkFBbUI7O0FBQ2hELFFBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDOztBQUUzQyxXQUNFOztRQUFRLFNBQVMsRUFBQyxVQUFVO01BRTFCLG9CQUFDLEtBQUs7QUFDSixVQUFFLEVBQUUsRUFBRSxBQUFDO0FBQ1AsY0FBTSxFQUFFLE1BQU0sQUFBQyxHQUFHO01BRXBCOztVQUFNLEVBQUUsRUFBQyxXQUFXO2FBQ2QsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7T0FDckI7TUFFUDs7VUFBRyxTQUFTLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxHQUFHOztPQUFhO01BRXZDLENBQUMsUUFBUSxJQUFJLG1CQUFtQixHQUMvQjs7VUFBRyxTQUFTLEVBQUMscUJBQXFCO0FBQzlCLGlCQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQUFBQzs7T0FFeEIsR0FDTCxRQUFRLEdBQ1A7O1VBQUcsU0FBUyxFQUFDLHNCQUFzQjtBQUNoQyxpQkFBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEFBQUM7O09BRXhCLEdBQ0wsSUFBSTtNQUVMOztVQUFHLEVBQUUsRUFBQyxXQUFXO0FBQ2QsaUJBQU8sRUFBRSxXQUFXLENBQUMsZ0JBQWdCLEFBQUM7UUFDdEMsV0FBVyxHQUNWOztZQUFNLEVBQUUsRUFBQyxjQUFjO1VBQ3BCLFdBQVcsR0FBRyxDQUFDLEdBQUcsV0FBVyxHQUFHLElBQUk7U0FDaEMsR0FDUixJQUFJO1FBQ0wsNkJBQUssR0FBRyxFQUFDLGVBQWU7QUFDbkIsZUFBSyxFQUFDLElBQUk7QUFDVixnQkFBTSxFQUFDLElBQUksR0FBRzs7T0FFakI7S0FDRyxDQUNUO0dBQ0g7QUFDRCxlQUFhLEVBQUEseUJBQUc7QUFDZCxRQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztHQUN2RDtBQUNELFdBQVMsRUFBQSxxQkFBRztpQkFDa0IsSUFBSSxDQUFDLEtBQUs7UUFBL0IsRUFBRSxVQUFGLEVBQUU7UUFBRSxNQUFNLFVBQU4sTUFBTTtRQUFFLEtBQUssVUFBTCxLQUFLOztBQUV4QixNQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNoQixXQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNoQixXQUFLLEVBQUUsS0FBSztLQUNiLENBQUMsQ0FBQztHQUNKO0FBQ0QsWUFBVSxFQUFBLHNCQUFHO2lCQUMwQyxJQUFJLENBQUMsS0FBSztRQUF4RCxFQUFFLFVBQUYsRUFBRTtRQUFFLE1BQU0sVUFBTixNQUFNO1FBQUUsU0FBUyxVQUFULFNBQVM7UUFBRSxtQkFBbUIsVUFBbkIsbUJBQW1COztBQUVqRCxRQUFJLENBQUMsbUJBQW1CLEVBQUU7QUFDeEIsZUFBUyxDQUFDLE1BQU0sRUFBRSw4Q0FBOEMsR0FDOUQsc0JBQXNCLENBQUMsQ0FBQztBQUMxQixhQUFPO0tBQ1I7O0FBRUQsTUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7QUFDdkIsV0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDakIsQ0FBQyxDQUFDO0FBQ0gsYUFBUyxDQUFDLE1BQU0sRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO0dBQ2hEO0NBQ0YsQ0FBQyxDQUFDOztpQkFFWSxVQUFVOzs7QUNwR3pCLFlBQVksQ0FBQzs7Ozs7O0lBRU4sS0FBSywyQkFBTSxjQUFjOztJQUN6QixVQUFVLDJCQUFNLGNBQWM7O0lBQzlCLElBQUksMkJBQU0sUUFBUTs7SUFDbEIsS0FBSywyQkFBTSxTQUFTOztJQUNwQixXQUFXLDJCQUFNLHdCQUF3Qjs7SUFDekMsU0FBUywyQkFBTSxxQkFBcUI7O0lBQ3BDLG1CQUFtQiwyQkFBTSx1QkFBdUI7O0lBQ2hELGtCQUFrQiwyQkFBTSxzQkFBc0I7O0lBQzdDLEdBQUcsV0FBTyxXQUFXLEVBQXJCLEdBQUc7O0lBQ0gsS0FBSyxXQUFPLGFBQWEsRUFBekIsS0FBSzs7QUFFYixJQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFdEMsV0FBUyxFQUFFO0FBQ1QsTUFBRSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDckMsVUFBTSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVU7R0FDekM7O0FBRUQsaUJBQWUsRUFBQSwyQkFBRztBQUNoQixXQUFPO0FBQ0wseUJBQW1CLEVBQUUsS0FBSztBQUMxQixXQUFLLEVBQUUsT0FBTztBQUNkLFdBQUssRUFBRSxHQUFHLENBQUM7QUFDVCxZQUFJLEVBQUUsS0FBSztBQUNYLGVBQU8sRUFBRSxFQUFFO0FBQ1gsWUFBSSxFQUFFLE1BQU07QUFDWixpQkFBUyxFQUFFO0FBQ1QsY0FBSSxFQUFFLElBQUksQ0FBQyxVQUFVO0FBQ3JCLGdCQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWM7QUFDM0IsaUJBQU8sRUFBRSxJQUFJLENBQUMsZUFBZTtTQUM5QjtPQUNGLENBQUM7QUFDRixjQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVE7S0FDeEMsQ0FBQztHQUNIO0FBQ0QsbUJBQWlCLEVBQUEsNkJBQUc7OztpQkFDRyxJQUFJLENBQUMsS0FBSztRQUF4QixFQUFFLFVBQUYsRUFBRTtRQUFFLE1BQU0sVUFBTixNQUFNOztBQUVqQixNQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRTthQUFNLE1BQUssUUFBUSxDQUFDO0FBQ3pDLGFBQUssRUFBRSxNQUFLLEtBQUssQ0FBQyxLQUFLLENBQ3BCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQ2pCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsc0NBQXNDLENBQUMsQ0FDdEQsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7T0FDdkIsQ0FBQztLQUFBLENBQUMsQ0FBQzs7QUFFSixNQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNkLFdBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ2hCLFVBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtBQUNwQixTQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNmLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFBLElBQUksRUFBSTtBQUN0QixVQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO0FBQzFCLGNBQUssUUFBUSxDQUFDLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7T0FDakM7S0FDRixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7YUFDbkIsTUFBSyxRQUFRLENBQUMsRUFBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUMsRUFBRSxZQUFNO0FBQy9DLFlBQUksTUFBSyxLQUFLLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtBQUNoQyxZQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNuQixpQkFBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDaEIsaUJBQUssRUFBRSxPQUFPO1dBQ2YsQ0FBQyxDQUFDO1NBQ0o7T0FDRixDQUFDO0tBQUEsQ0FBQyxDQUFDOztBQUVOLE1BQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQU07QUFDbEIsWUFBTSxDQUFDLEtBQUssQ0FDVixrRUFBa0UsQ0FBQyxDQUFDO0FBQ3RFLFlBQU0sQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0tBQ3ZCLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFVBQUEsSUFBSSxFQUFJO0FBQy9CLGlCQUFXLENBQUMsUUFBUSxDQUFDO0FBQ25CLFlBQUksRUFBRSxRQUFRO0FBQ2QsY0FBTSxFQUFFLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxHQUFHLE9BQU8sR0FBRyxPQUFPO09BQ25ELENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFO2FBQ3ZCLE1BQUssVUFBVSxDQUFDLE9BQU8sRUFBRSw2Q0FBNkMsQ0FBQztLQUFBLENBQUMsQ0FBQzs7QUFFM0UsTUFBRSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRTthQUN4QixNQUFLLFVBQVUsQ0FBQyxNQUFNLEVBQUUsa0NBQWtDLENBQUM7S0FBQSxDQUFDLENBQUM7O0FBRS9ELE1BQUUsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtBQUM5QixpQkFBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3RCLFlBQUssUUFBUSxDQUFDO0FBQ1osYUFBSyxFQUFFLE1BQUssS0FBSyxDQUFDLEtBQUssS0FBSyxPQUFPLEdBQUcsT0FBTyxHQUFHLE9BQU87QUFDdkQsYUFBSyxFQUFFLE1BQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztPQUMzQyxFQUFFLFlBQU07QUFDUCxZQUFJLE1BQUssS0FBSyxDQUFDLEtBQUssS0FBSyxPQUFPLEVBQUU7QUFDaEMsWUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDbkIsaUJBQUssRUFBRSxNQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzNCLGlCQUFLLEVBQUUsT0FBTztXQUNmLENBQUMsQ0FBQztTQUNKO09BQ0YsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsWUFBTztBQUNwQyxVQUFJLENBQUMsTUFBSyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUN0QyxjQUFLLFVBQVUsQ0FBQyxNQUFNLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztPQUM1RDs7QUFFRCxZQUFLLFFBQVEsQ0FBQyxFQUFDLG1CQUFtQixFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7S0FDN0MsQ0FBQyxDQUFDOztBQUVILGFBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztHQUM1QztBQUNELHNCQUFvQixFQUFBLGdDQUFHO0FBQ3JCLGFBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztHQUM3Qzs7QUFLRCxRQUFNLEVBQUEsa0JBQUc7aUJBQ2MsSUFBSSxDQUFDLEtBQUs7UUFBeEIsRUFBRSxVQUFGLEVBQUU7UUFBRSxNQUFNLFVBQU4sTUFBTTtpQkFDOEIsSUFBSSxDQUFDLEtBQUs7UUFBbEQsS0FBSyxVQUFMLEtBQUs7UUFBRSxRQUFRLFVBQVIsUUFBUTtRQUFFLG1CQUFtQixVQUFuQixtQkFBbUI7O0FBQzNDLFFBQU0sV0FBVyxHQUFHO0FBQ2xCLFFBQUUsRUFBRSxFQUFFO0FBQ04sV0FBSyxFQUFFLEtBQUs7QUFDWixlQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7QUFDMUIseUJBQW1CLEVBQUUsbUJBQW1CO0tBQ3pDLENBQUM7O0FBRUYsV0FDRTs7O01BQ0Usb0JBQUMsVUFBVSxlQUNMLFdBQVc7QUFDZixjQUFNLEVBQUUsTUFBTSxBQUFDO0FBQ2YsZ0JBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxBQUFDLElBQUc7TUFFdEMsb0JBQUMsSUFBSSxlQUNDLFdBQVc7QUFDZixhQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxBQUFDLElBQUc7TUFFcEIsb0JBQUMsa0JBQWtCLGVBQ2IsV0FBVztBQUNmLGFBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEFBQUM7QUFDakIsZ0JBQVEsRUFBRSxRQUFRLEFBQUMsSUFBRztNQUUxQixvQkFBQyxLQUFLLElBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxBQUFDLEdBQUc7S0FDN0IsQ0FDTjtHQUNIOztBQUtELGVBQWEsRUFBQSx5QkFBRztBQUNkLFFBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7R0FDMUQ7QUFDRCxZQUFVLEVBQUEsb0JBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUN4QixRQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osV0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUNwQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUNqQixHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUN2QixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztLQUNyQixDQUFDLENBQUM7R0FDSjtBQUNELFlBQVUsRUFBQSxzQkFBRztBQUNYLFFBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBQyxDQUFDLENBQUM7R0FDN0Q7QUFDRCxnQkFBYyxFQUFBLDBCQUFHO2lCQUNNLElBQUksQ0FBQyxLQUFLO1FBQXhCLEVBQUUsVUFBRixFQUFFO1FBQUUsTUFBTSxVQUFOLE1BQU07O0FBRWpCLE1BQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7QUFDeEIsV0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDaEIsVUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0FBQ3BCLFNBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ2YsQ0FBQyxDQUFDO0FBQ0gsUUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0dBQ25CO0FBQ0QsaUJBQWUsRUFBQSwyQkFBRztpQkFDSyxJQUFJLENBQUMsS0FBSztRQUF4QixFQUFFLFVBQUYsRUFBRTtRQUFFLE1BQU0sVUFBTixNQUFNOztBQUVqQixNQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO0FBQ3pCLFdBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ2pCLENBQUMsQ0FBQztBQUNILFFBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztHQUNuQjtBQUNELGVBQWEsRUFBQSx1QkFBQyxDQUFDLEVBQUU7QUFDZixRQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osbUJBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYTtLQUN6QyxDQUFDLENBQUM7R0FDSixFQUNGLENBQUMsQ0FBQzs7aUJBRVksYUFBYTs7O0FDak01QixZQUFZLENBQUM7Ozs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsU0FBUywyQkFBTSxxQkFBcUI7O0lBQ3BDLFdBQVcsMkJBQU0sd0JBQXdCOztJQUN6QyxZQUFZLDJCQUFNLHdCQUF3Qjs7SUFDMUMsVUFBVSwyQkFBTSxjQUFjOztJQUM3QixLQUFLLFdBQU8sYUFBYSxFQUF6QixLQUFLOztJQUNOLGNBQWMsMkJBQU0sa0JBQWtCOztJQUN0QyxZQUFZLDJCQUFNLGdCQUFnQjs7SUFDbEMsSUFBSSwyQkFBTSxhQUFhOzs7O0FBSTlCLElBQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRTVDLFVBQVMsRUFBRSxFQUVWO0FBQ0QsT0FBTSxFQUFFLENBQUMsWUFBWSxDQUFDO0FBQ3RCLGdCQUFlLEVBQUEsMkJBQUc7QUFDakIsU0FBTyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7RUFDNUI7QUFDRCxnQkFBZSxFQUFBLDJCQUFHLEVBRWpCO0FBQ0QsbUJBQWtCLEVBQUEsNEJBQUMsU0FBUyxFQUFFLEVBRTdCO0FBQ0QsT0FBTSxFQUFBLGtCQUFHO2VBQ21DLElBQUksQ0FBQyxLQUFLO01BQTlDLFNBQVMsVUFBVCxTQUFTO01BQUUsSUFBSSxVQUFKLElBQUk7TUFBRSxRQUFRLFVBQVIsUUFBUTtNQUFFLEtBQUssVUFBTCxLQUFLOztBQUN2QyxTQUNDOztLQUFLLEVBQUUsRUFBQyxxQkFBcUIsRUFBQyxTQUFTLEVBQUMsVUFBVTtHQUNqRDs7TUFBSyxFQUFFLEVBQUMsZUFBZTtJQUV0Qjs7OztLQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztLQUFLO0lBQzVCLG9CQUFDLGNBQWMsT0FBRztJQUVsQixvQkFBQyxLQUFLLGFBQUMsSUFBSSxFQUFFLENBQUMsQUFBQztPQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQztBQUNoQyxhQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQUFBQyxJQUFHO0lBRWhDO0dBRU47O01BQU0sU0FBUyxFQUFDLFVBQVU7SUFDeEIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUN2Qjs7O1dBQ0ssSUFBSSxLQUFHLEdBQUcsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFBO0tBQzVCLEdBQ1A7OztLQUNDOztRQUFNLFNBQVMsRUFBQyxNQUFNO01BQ25CLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHO01BQzFDO0tBQ04sSUFBSSxDQUFDLG1CQUFtQixFQUFFO0tBQ25CO0lBRUo7R0FFUjs7TUFBUSxTQUFTLEVBQUMsS0FBSzs7SUFBZ0I7R0FDakMsQ0FDTjtFQUNEOztBQUVELGNBQWEsRUFBQSx5QkFBRztBQUNmLE1BQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7RUFDcEM7O0FBRUQsb0JBQW1CLEVBQUEsK0JBQUc7QUFDckIsb0JBQWtCO0VBQ2xCOztDQUVELENBQUMsQ0FBQzs7aUJBRVksa0JBQWtCOzs7QUN6RWpDLFlBQVksQ0FBQzs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsRUFBRSwyQkFBTSxZQUFZOztBQUUzQixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFOUIsV0FBUyxFQUFFO0FBQ1QsUUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7R0FDeEM7QUFDRCxRQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQzs7QUFFdEMsb0JBQWtCLEVBQUEsOEJBQUc7QUFDbkIsUUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUUzQyxRQUFJLE1BQU0sRUFDUixRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUV0RCxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztHQUM1RDtBQUNELFFBQU0sRUFBQSxrQkFBRztBQUNQLFFBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQzdCLFFBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsUUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFeEMsV0FDRTs7UUFBSyxTQUFTLEVBQUUsRUFBRSxDQUFDO0FBQ1osc0JBQVksRUFBRSxJQUFJO0FBQ2xCLGtCQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7U0FDNUIsQ0FBQyxBQUFDO0FBQ0gsZUFBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEFBQUM7TUFDNUI7OztRQUNFOzs7O1NBQXNCO1FBQ3RCOzs7VUFBTyxJQUFJLEtBQUssTUFBTSxHQUFHLElBQUksR0FBRyxTQUFTO1NBQVE7UUFDakQsK0JBQU07UUFDTjs7OztTQUF3QjtRQUN4Qjs7O1VBQU8sSUFBSSxLQUFLLE1BQU0sR0FBRyxJQUFJLEdBQUcsUUFBUTtTQUFRO09BQzlDO01BRUo7O1VBQUssU0FBUyxFQUFDLE9BQU87QUFDakIsaUJBQU8sRUFBRSxVQUFBLENBQUM7bUJBQUksQ0FBQyxDQUFDLGVBQWUsRUFBRTtXQUFBLEFBQUM7UUFDckM7OztVQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1NBQUs7UUFFM0IsSUFBSSxLQUFLLE1BQU0sR0FDZDs7WUFBRyxTQUFTLEVBQUMsUUFBUTtBQUNsQixtQkFBTyxFQUFFLFNBQVMsQ0FBQyxJQUFJLEFBQUM7O1NBRXZCLEdBQUcsQ0FFUDs7WUFBRyxHQUFHLEVBQUMsR0FBRztBQUNQLHFCQUFTLEVBQUMsS0FBSztBQUNmLGlCQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLEFBQUM7QUFDckIsbUJBQU8sRUFBRSxTQUFTLENBQUMsTUFBTSxBQUFDOztTQUV6QixFQUNKOztZQUFHLEdBQUcsRUFBQyxHQUFHO0FBQ1AscUJBQVMsRUFBQyxjQUFjO0FBQ3hCLGlCQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLEFBQUM7QUFDdEIsbUJBQU8sRUFBRSxTQUFTLENBQUMsT0FBTyxBQUFDOztTQUUxQixDQUNMO09BQ0c7S0FDRixDQUNOO0dBQ0g7QUFDRCxZQUFVLEVBQUEsb0JBQUMsQ0FBQyxFQUFFO0FBQ1osUUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLFFBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFbkQsUUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO0FBQ25CLFVBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDcEMsaUJBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztPQUNsQjtLQUNGLE1BQU0sSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFO0FBQzNCLFVBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDbEIsaUJBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztPQUNwQixNQUFNLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDekIsaUJBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztPQUNyQjtLQUNGO0dBQ0Y7QUFDRCxZQUFVLEVBQUEsc0JBQUc7QUFDWCxRQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDekM7Q0FDRixDQUFDLENBQUM7O2lCQUVZLEtBQUs7OztBQ3ZGcEIsWUFBWSxDQUFDOzs7O0lBRU4sS0FBSywyQkFBTSxjQUFjOztJQUN6QixTQUFTLDJCQUFNLHFCQUFxQjs7SUFDcEMsWUFBWSwyQkFBTSx3QkFBd0I7O0FBRWpELElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUVyQyxRQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUM7O0FBRXBELGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsV0FBTztBQUNMLFdBQUssRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFO0tBQzVCLENBQUM7R0FDSDtBQUNELFFBQU0sRUFBQSxrQkFBRztBQUNQLFdBQ0U7O1FBQU8sRUFBRSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsVUFBVTtNQUNwQzs7O1FBQ0U7OztVQUNFOzs7O1dBQXVCO1NBQ3BCO09BQ0M7TUFDUjs7O1FBQ0csSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUM7aUJBQzNCOztjQUFJLEdBQUcsRUFBRSxDQUFDLEFBQUM7WUFDVDs7O2NBQ0U7OztzQkFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2VBQWE7YUFDM0I7WUFDSixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLENBQUM7cUJBQ2Y7O2tCQUFJLEdBQUcsRUFBRSxDQUFDLEFBQUM7Z0JBQ1Q7OztrQkFBTyxJQUFJO2lCQUFRO2VBQ2hCO2FBQ04sQ0FBQyxDQUFDLE9BQU8sRUFBRTtXQUNUO1NBQ04sQ0FBQyxDQUFDLE9BQU8sRUFBRTtPQUNOO0tBQ0YsQ0FDUjtHQUNIO0FBQ0QsZUFBYSxFQUFBLHlCQUFHO0FBQ2QsUUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLFdBQUssRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFO0tBQzVCLENBQUMsQ0FBQztHQUNKO0NBQ0YsQ0FBQyxDQUFDOztpQkFFWSxZQUFZOzs7Ozs7O0lDL0NwQixTQUFTLDJCQUFNLHFCQUFxQjs7aUJBRTVCLFNBQVMsQ0FBQztBQUN2QixtQkFBaUIsRUFBRSxJQUFJO0FBQ3ZCLGdCQUFjLEVBQUUsSUFBSTtDQUNyQixDQUFDOzs7OztBQ0xGLElBQU0sV0FBVyxHQUFHOzs7QUFHbEIsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHOztBQUVSLEtBQUssR0FBRztBQUNSLEtBQUssR0FBRztBQUNSLEtBQUssR0FBRztBQUNSLEtBQUssR0FBRztBQUNSLEtBQUssR0FBRztBQUNSLEtBQUssR0FBRzs7QUFFUixLQUFHLEVBQUUsU0FBUztDQUNmLENBQUM7O2lCQUVhLFdBQVc7Ozs7Ozs7SUNwQm5CLFNBQVMsMkJBQU0scUJBQXFCOztpQkFFNUIsU0FBUyxDQUFDO0FBQ3ZCLFdBQVMsRUFBRSxJQUFJO0FBQ2YsWUFBVSxFQUFFLElBQUk7QUFDaEIsU0FBTyxFQUFFLElBQUk7QUFDYixNQUFJLEVBQUUsSUFBSTtBQUNWLFdBQVMsRUFBRSxJQUFJO0FBQ2Ysa0JBQWdCLEVBQUUsSUFBSTtDQUN2QixDQUFDOzs7OztJQ1RNLFVBQVUsV0FBTyxNQUFNLEVBQXZCLFVBQVU7O2lCQUVILE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxVQUFVLEVBQUUsRUFBRTs7QUFFN0Msa0JBQWdCLEVBQUUsMEJBQVMsTUFBTSxFQUFFO0FBQ2pDLFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixZQUFNLEVBQUUsYUFBYTtBQUNyQixZQUFNLEVBQUUsTUFBTTtLQUNmLENBQUMsQ0FBQztHQUNKO0NBQ0YsQ0FBQzs7Ozs7QUNWRixJQUFNLFdBQVcsR0FBRztBQUNoQixjQUFZO0FBQ1IsZUFBUztBQUNMLG9CQUFRLEVBQUUsWUFBWTtBQUN0QixvQkFBUSxFQUFFLFlBQVk7QUFDdEIsbUJBQU8sRUFBRSxZQUFZO1NBQ3hCO0FBQ0QsY0FBUTtBQUNKLHFCQUFTLEVBQUUsWUFBWTtBQUN2QixvQkFBUSxFQUFFLFlBQVk7QUFDdEIsbUJBQU8sRUFBRSxZQUFZO1NBQ3hCO0tBQ0o7QUFDRCxZQUFVO0FBQ04sZUFBUztBQUNMLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtBQUNELGNBQVE7QUFDSixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLHFCQUFTLEVBQUUsUUFBUTtBQUNuQixvQkFBUSxFQUFFLFFBQVE7QUFDbEIsb0JBQVEsRUFBRSxRQUFRO1NBQ3JCO0tBQ0o7QUFDRCxjQUFZO0FBQ1IsZUFBUztBQUNMLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG9CQUFRLEVBQUUsTUFBTTtTQUNuQjtBQUNELGNBQVE7QUFDSixvQkFBUSxFQUFFLFFBQVE7QUFDbEIsbUJBQU8sRUFBRSxRQUFRO0FBQ2pCLG1CQUFPLEVBQUUsUUFBUTtBQUNqQixvQkFBUSxFQUFFLFFBQVE7QUFDbEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG9CQUFRLEVBQUUsTUFBTTtTQUNuQjtLQUNKO0FBQ0QsYUFBVztBQUNQLGVBQVM7QUFDTCxvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YscUJBQVMsRUFBRSxRQUFRO0FBQ25CLG9CQUFRLEVBQUUsUUFBUTtBQUNsQixvQkFBUSxFQUFFLFFBQVE7U0FDckI7QUFDRCxjQUFRO0FBQ0osb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsT0FBTztBQUNqQixtQkFBTyxFQUFFLE9BQU87U0FDbkI7S0FDSjtBQUNELGFBQVc7QUFDUCxlQUFTO0FBQ0wsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtBQUNELGNBQVE7QUFDSixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO1NBQ2xCO0tBQ0o7QUFDRCxVQUFRO0FBQ0osZUFBUztBQUNMLG9CQUFRLEVBQUUsT0FBTztBQUNqQixtQkFBTyxFQUFFLE9BQU87U0FDbkI7QUFDRCxjQUFRO0FBQ0osb0JBQVEsRUFBRSxPQUFPO0FBQ2pCLG1CQUFPLEVBQUUsT0FBTztTQUNuQjtLQUNKO0FBQ0QsYUFBVztBQUNQLGVBQVM7QUFDTCxtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO1NBQ25CO0FBQ0QsY0FBUTtBQUNKLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtTQUNuQjtLQUNKO0FBQ0QsWUFBVTtBQUNOLGVBQVM7QUFDTCxxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixtQkFBTyxFQUFFLE1BQU07QUFDZixtQkFBTyxFQUFFLE1BQU07U0FDbEI7QUFDRCxjQUFRO0FBQ0osb0JBQVEsRUFBRSxPQUFPO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO1NBQ2xCO0tBQ0o7QUFDRCxnQkFBYztBQUNWLGVBQVM7QUFDTCxvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO1NBQ25CO0FBQ0QsY0FBUTtBQUNKLG9CQUFRLEVBQUUsUUFBUTtBQUNsQixvQkFBUSxFQUFFLFFBQVE7QUFDbEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtLQUNKO0FBQ0QsY0FBWTtBQUNSLGVBQVM7QUFDTCxvQkFBUSxFQUFFLE9BQU87QUFDakIsbUJBQU8sRUFBRSxPQUFPO0FBQ2hCLHFCQUFTLEVBQUUsTUFBTTtBQUNqQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO1NBQ2xCO0FBQ0QsY0FBUTtBQUNKLHFCQUFTLEVBQUUsTUFBTTtBQUNqQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtLQUNKO0FBQ0QsWUFBVTtBQUNOLGVBQVM7QUFDTCxxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07U0FDbEI7QUFDRCxjQUFRLEVBRVA7S0FDSjtBQUNELGFBQVc7QUFDUCxlQUFTO0FBQ0wscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLHFCQUFTLEVBQUUsTUFBTTtBQUNqQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO1NBQ25CO0FBQ0QsY0FBUTtBQUNKLHFCQUFTLEVBQUUsUUFBUTtBQUNuQixvQkFBUSxFQUFFLFFBQVE7QUFDbEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtLQUNKO0FBQ0QsWUFBVTtBQUNOLGVBQVM7QUFDTCxxQkFBUyxFQUFFLE9BQU87QUFDbEIsb0JBQVEsRUFBRSxPQUFPO0FBQ2pCLG9CQUFRLEVBQUUsT0FBTztBQUNqQixtQkFBTyxFQUFFLE9BQU87U0FDbkI7QUFDRCxjQUFRO0FBQ0oscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO1NBQ2xCO0tBQ0o7QUFDRCxZQUFVO0FBQ04sZUFBUztBQUNMLG9CQUFRLEVBQUUsT0FBTztBQUNqQixtQkFBTyxFQUFFLE9BQU87QUFDaEIscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO1NBQ25CO0FBQ0QsY0FBUTtBQUNKLHFCQUFTLEVBQUUsT0FBTztBQUNsQixvQkFBUSxFQUFFLE9BQU87QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtLQUNKO0FBQ0QsVUFBUTtBQUNKLGVBQVM7QUFDTCxvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLHFCQUFTLEVBQUUsTUFBTTtBQUNqQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtBQUNELGNBQVE7QUFDSixxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtLQUNKO0FBQ0QsWUFBVTtBQUNOLGVBQVM7QUFDTCxxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtBQUNELGNBQVE7QUFDSixxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtLQUNKO0NBQ0osQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBd0JjLFdBQVc7OztBQzlSMUIsWUFBWSxDQUFDOzs7O0lBRU4sRUFBRSwyQkFBTSxrQkFBa0I7O0FBQ2pDLElBQU0sTUFBTSxHQUFHLHVCQUF1QixDQUFDO0FBQ3ZDLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQzs7aUJBRUgsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Ozs7O0FDTjdCLElBQU0sWUFBWSxHQUFHO0FBQ25CLGVBQWEsRUFBQSx1QkFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFO0FBQzdCLFdBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLE1BQU0sS0FBSyxJQUFJLE9BQU8sQ0FBQSxBQUFDLEdBQzVDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxRQUFRLENBQUM7R0FDakM7Q0FDRixDQUFDOztpQkFFYSxZQUFZOzs7Ozs7O0lDUHBCLFNBQVMsMkJBQU0scUJBQXFCOztBQUUzQyxJQUFNLFlBQVksR0FBRztBQUNuQixtQkFBaUIsRUFBQSw2QkFBRztBQUNsQixhQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDNUM7QUFDRCxzQkFBb0IsRUFBQSxnQ0FBRztBQUNyQixhQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDN0M7Q0FDRixDQUFDOztpQkFFYSxZQUFZOzs7QUNYM0IsWUFBWSxDQUFDOzs7O0lBRU4sYUFBYSwyQkFBTSw2QkFBNkI7O0lBQzlCLFlBQVksV0FBTyxlQUFlLEVBQW5ELGFBQWE7O0lBQ2QsYUFBYSwyQkFBTSw0QkFBNEI7O3lCQUM5QixXQUFXOztJQUEzQixJQUFJLGNBQUosSUFBSTtJQUFFLEdBQUcsY0FBSCxHQUFHOztBQUVqQixJQUFNLFlBQVksR0FBRyxRQUFRLENBQUM7O0FBRTlCLElBQUksU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ3ZCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUNyQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7O0FBRXpCLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUU7QUFDMUQsVUFBUSxFQUFBLG9CQUFHO0FBQ1QsV0FBTztBQUNMLGNBQVEsRUFBRSxTQUFTO0FBQ25CLGlCQUFXLEVBQUUsWUFBWTtBQUN6QixrQkFBWSxFQUFFLGFBQWE7S0FDNUIsQ0FBQztHQUNIO0NBQ0YsQ0FBQyxDQUFDOztBQUVILFNBQVMsZ0JBQWdCLEdBQUc7QUFDMUIsZUFBYSxHQUFHLENBQUMsYUFBYSxDQUFDO0FBQy9CLGNBQVksR0FBRyxDQUFDLENBQUM7Q0FDbEI7O0FBRUQsU0FBUyxhQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7QUFDbkQsV0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQzdCLFdBQU8sRUFBRSxPQUFPO0FBQ2hCLGFBQVMsRUFBRSxTQUFTO0dBQ3JCLENBQUMsQ0FBQyxDQUFDOztBQUVKLE1BQUksUUFBUSxJQUFJLGFBQWEsRUFBRTtBQUM3QixnQkFBWSxJQUFJLENBQUMsQ0FBQztHQUNuQjtDQUNGOztBQUVELGFBQWEsQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPLEVBQUk7QUFDaEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7QUFFOUIsVUFBUSxNQUFNLENBQUMsVUFBVTtBQUN2QixTQUFLLGFBQWEsQ0FBQyxpQkFBaUI7QUFDbEMsc0JBQWdCLEVBQUUsQ0FBQztBQUNuQixZQUFNOztBQUFBLEFBRVIsU0FBSyxhQUFhLENBQUMsY0FBYztBQUMvQixtQkFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakUsWUFBTTs7QUFBQSxBQUVSO0FBQ0UsYUFBTyxJQUFJLENBQUM7QUFBQSxHQUNmOztBQUVELFdBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDN0IsU0FBTyxJQUFJLENBQUM7Q0FDYixDQUFDLENBQUM7O2lCQUVZLFNBQVM7OztBQzNEeEIsWUFBWSxDQUFDOzs7Ozs7SUFFTixhQUFhLDJCQUFNLDZCQUE2Qjs7SUFDOUIsWUFBWSxXQUFPLGVBQWUsRUFBbkQsYUFBYTs7SUFDZCxhQUFhLDJCQUFNLDRCQUE0Qjs7SUFDL0MsV0FBVywyQkFBTSwwQkFBMEI7O0lBQzFDLEtBQUssV0FBTyxVQUFVLEVBQXRCLEtBQUs7O3lCQUM0QixXQUFXOztJQUE1QyxJQUFJLGNBQUosSUFBSTtJQUFFLEdBQUcsY0FBSCxHQUFHO0lBQUUsVUFBVSxjQUFWLFVBQVU7SUFBRSxHQUFHLGNBQUgsR0FBRzs7SUFDM0IsUUFBUSwyQkFBTSxrQkFBa0I7O0lBQ2hDLElBQUksMkJBQU0sYUFBYTs7QUFFOUIsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDO0FBQzlCLElBQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQzs7QUFFOUIsSUFBSSxTQUFTLENBQUM7QUFDZCxJQUFJLGVBQWUsQ0FBQztBQUNwQixJQUFJLE1BQU0sQ0FBQztBQUNYLElBQUksTUFBTSxDQUFDO0FBQ1gsSUFBSSxLQUFLLENBQUM7QUFDVixJQUFJLE1BQU0sQ0FBQztBQUNYLElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxNQUFNLENBQUM7O0FBRVgsSUFBSSxNQUFNO0lBQUUsUUFBUTtJQUFFLE9BQU87SUFBRSxLQUFLO0lBQUUsU0FBUztJQUFFLE1BQU0sR0FBRyxFQUFFO0lBQUUsT0FBTztJQUFFLEtBQUs7SUFBRSxZQUFZLENBQUM7O0FBRzNGLGVBQWUsRUFBRSxDQUFDOztBQUVsQixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsU0FBUyxFQUFFO0FBQ3RELHFCQUFpQixFQUFFLDJCQUFTLEVBQUUsRUFBRTtBQUM5QixZQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMzQjs7QUFFRCx3QkFBb0IsRUFBRSw4QkFBUyxFQUFFLEVBQUU7QUFDakMsWUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM3QztBQUNELFlBQVEsRUFBQSxvQkFBRztBQUNQLGVBQU87QUFDSCxvQkFBUSxFQUFFLFNBQVM7QUFDbkIsZ0JBQUksRUFBRSxLQUFLO0FBQ1gsaUJBQUssRUFBRSxNQUFNLEVBQ2hCLENBQUM7S0FDTDtBQUNELHFCQUFpQixFQUFBLDZCQUFHO0FBQ2hCLGVBQU8sZUFBZSxDQUFDO0tBQzFCO0FBQ0QsWUFBUSxFQUFBLG9CQUFHO0FBQ1AsZUFBTyxNQUFNLENBQUM7S0FDakI7O0FBRUQscUJBQWlCLEVBQUEsNkJBQUc7QUFDaEIsZUFBTztBQUNILGlCQUFLLEVBQUUsTUFBTTtBQUNiLG1CQUFPLEVBQUUsUUFBUTtBQUNqQixrQkFBTSxFQUFFLE9BQU87QUFDZixnQkFBSSxFQUFFLEtBQUs7QUFDWCxvQkFBUSxFQUFFLFNBQVM7QUFDbkIsb0JBQVEsRUFBRSxPQUFPO0FBQ2pCLGdCQUFJLEVBQUUsS0FBSztBQUNYLGlCQUFLLEVBQUUsTUFBTTtBQUNiLGdCQUFJLEVBQUUsS0FBSztBQUNYLHVCQUFXLEVBQUUsWUFBWTtTQUM1QixDQUFBO0tBQ0osRUFFSixDQUFDLENBQUM7O0FBR0gsU0FBUyxlQUFlLEdBQUc7QUFDdkIsYUFBUyxHQUFHLEdBQUcsQ0FBQztBQUNaLGNBQU0sRUFBRSxLQUFLO0FBQ2IsWUFBSSxFQUFFLElBQUk7QUFDVixjQUFNLEVBQUUsSUFBSTtLQUNmLENBQUMsQ0FBQztBQUNILG1CQUFlLEdBQUcsVUFBVSxDQUFDLENBQ3pCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQ2IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDaEIsQ0FBQyxDQUFDO0FBQ0gsVUFBTSxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ2hCLFNBQUssR0FBRyxHQUFHLENBQUM7QUFDWixVQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ2YsVUFBTSxHQUFHLEtBQUssQ0FBQztBQUNmLGFBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNsQixhQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLGdCQUFZLEdBQUcsSUFBSSxDQUFDOzs7QUFHcEIsWUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNkLFdBQU8sR0FBRyxFQUFFLENBQUM7QUFDYixTQUFLLEdBQUcsRUFBRSxDQUFDOztBQUVYLFVBQU0sR0FBRzs7Ozs7Ozs7Ozs7O0FBYUwsZ0JBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDO0FBQzFELGdCQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQztBQUN2RCxnQkFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUM7QUFDMUQsZ0JBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDO0FBQzFELGdCQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQztBQUN2RCxnQkFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUM7QUFDMUQsZ0JBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDOztLQUU3RCxDQUFDOztBQUVGLFNBQUssZ0NBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxDQUFDOztDQUUxRTs7QUFFRCxTQUFTLFdBQVcsR0FBRzs7QUFHbkIsUUFBSSxRQUFRLEVBQUU7QUFDVixpQkFBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDdkIsY0FBRSxFQUFFLEVBQUU7QUFDTixtQkFBTyxFQUFFLE9BQU87QUFDaEIsZ0JBQUksRUFBRSxJQUFJO0FBQ1YsaUJBQUssRUFBRSxNQUFNOztBQUFBLFNBRWhCLENBQUMsQ0FBQztLQUNOOztBQUVELFdBQU8sSUFBSSxDQUFDO0NBQ2Y7O0FBRUQsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUU7Ozs7O0FBS2pDLFFBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFOztBQUMxQixjQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLGFBQUssR0FBRyxFQUFFLENBQUM7QUFDWCxvQkFBWSxHQUFHLElBQUksQ0FBQztLQUN2QixNQUVJLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFOzs7QUFFL0IsWUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV4QixZQUFJLENBQUMsSUFBSSxHQUFHLEFBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEdBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQzs7QUFFdkQsWUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO0FBQ25CLGtCQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLGtCQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ25CLE1BQ0ksSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO0FBQzFCLGtCQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ25COztBQUVELGlCQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLGVBQU8sTUFBTSxDQUFDO0tBQ2pCO0NBQ0o7O0FBRUQsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTs7QUFFakQsZUFBVyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRTVCLFNBQUssR0FBRyxLQUFLLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7O0FBRWxDLFFBQUksUUFBUSxFQUFFO0FBQ1YsaUJBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQ3ZCLGdCQUFJLEVBQUUsSUFBSTtBQUNWLGNBQUUsRUFBRSxFQUFFO0FBQ04sbUJBQU8sRUFBRSxPQUFPO0FBQ2hCLGdCQUFJLEVBQUUsSUFBSTs7QUFFVixvQkFBUSxFQUFFLFVBQVUsRUFBRTtTQUN6QixDQUFDLENBQUM7S0FDTjs7QUFFRCxXQUFPLElBQUksQ0FBQztDQUNmOztBQUlELFNBQVMsSUFBSSxHQUFHO0FBQ1osUUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pELGdCQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0MsV0FBTyxJQUFJLENBQUM7Q0FDZjs7QUFFRCxTQUFTLFVBQVUsR0FBRztBQUNsQixRQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUc7ZUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNO0tBQUEsQ0FBQyxDQUNwRixHQUFHLENBQUMsVUFBQSxHQUFHO2VBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUs7S0FBQSxDQUFDLENBQUM7QUFDbkMsUUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUNwQixZQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEIsWUFBSSxNQUFNLEdBQUcsT0FBTyxFQUFFLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FDbEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxFQUFFLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFDNUMsWUFBSSxDQUFDO0FBQ0QsaUJBQUssWUFBWTtBQUNqQixnQkFBSSxFQUFFLHNDQUFzQztBQUM1QyxnQkFBSSxFQUFFLFNBQVM7QUFDZiw0QkFBZ0IsRUFBRSxJQUFJO0FBQ3RCLDhCQUFrQixFQUFFLFNBQVM7QUFDN0IsNkJBQWlCLEVBQUUsVUFBVTtBQUM3Qiw0QkFBZ0IsRUFBRSxXQUFXO0FBQzdCLDBCQUFjLEVBQUUsS0FBSztBQUNyQix5QkFBYSxFQUFFLEtBQUs7U0FDdkIsRUFBRSxVQUFTLFNBQVMsRUFBRTtBQUNuQixnQkFBSSxTQUFTLEVBQUU7QUFDWCxvQkFBSSxDQUFDLE9BQU8sRUFBRSxtREFBbUQsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUNqRixNQUFNO0FBQ0gsb0JBQUksQ0FBQyxNQUFNLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDckQ7U0FDSixDQUFDLENBQUM7QUFDSCxpQkFBUyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQU4sTUFBTSxFQUFFLENBQUMsQ0FBQztLQUM5Qzs7QUFJRCxXQUFPLEtBQUssQ0FBQztDQUNoQjs7QUFHRCxTQUFTLFFBQVEsQ0FBQyxPQUFPLEVBQUU7QUFDdkIsYUFBUyxHQUFHLFNBQVMsQ0FDaEIsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FDbkIsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQzdCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ2xDOztBQUVELGFBQWEsQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPLEVBQUk7QUFDOUIsUUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUM5QixRQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7O0FBRXJCLFlBQVEsTUFBTSxDQUFDLFVBQVU7QUFDckIsYUFBSyxhQUFhLENBQUMsU0FBUztBQUN4QixxQkFBUyxHQUFHLFFBQVEsQ0FDaEIsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUUsa0JBQU07O0FBQUEsQUFFVixhQUFLLGFBQWEsQ0FBQyxJQUFJO0FBQ25CLHFCQUFTLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDbkIsa0JBQU07O0FBQUEsQUFFVixhQUFLLGFBQWEsQ0FBQyxTQUFTO0FBQ3hCLG9CQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLGtCQUFNOztBQUFBLEFBRVYsYUFBSyxhQUFhLENBQUMsT0FBTztBQUN0QiwyQkFBZSxFQUFFLENBQUM7QUFDbEIsa0JBQU07O0FBQUEsQUFFVjtBQUNJLG1CQUFPLElBQUksQ0FBQztBQUFBLEtBQ25COztBQUVELFFBQUksU0FBUyxFQUFFO0FBQ1gsaUJBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDaEM7QUFDRCxXQUFPLElBQUksQ0FBQztDQUNmLENBQUMsQ0FBQzs7aUJBRVksU0FBUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnZXM2LXNoaW0nO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpbyBmcm9tICcuL2lvJztcbmltcG9ydCBHYW1lSW50ZXJmYWNlIGZyb20gJy4vY29tcG9uZW50cy9HYW1lSW50ZXJmYWNlJztcblxubGV0IHBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKCcvcGxheS8nLCAnJykuc3BsaXQoJy8nKTtcbnBhcmFtc1sxXSA9IHBhcnNlSW50KHBhcmFtc1sxXSwgMTApO1xucGFyYW1zWzJdID0gcGFyc2VJbnQocGFyYW1zWzJdLCAxMCk7XG5cblJlYWN0LnJlbmRlcihcbiAgPEdhbWVJbnRlcmZhY2UgaW89e2lvfSBwYXJhbXM9e3BhcmFtc30gLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKVxuKTsiLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE1IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG5cbmZ1bmN0aW9uIGNsYXNzTmFtZXMoKSB7XG5cdHZhciBjbGFzc2VzID0gJyc7XG5cdHZhciBhcmc7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0aWYgKCFhcmcpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGFyZyB8fCAnbnVtYmVyJyA9PT0gdHlwZW9mIGFyZykge1xuXHRcdFx0Y2xhc3NlcyArPSAnICcgKyBhcmc7XG5cdFx0fSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuXHRcdFx0Y2xhc3NlcyArPSAnICcgKyBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0fSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIGFyZykge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRpZiAoIWFyZy5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8ICFhcmdba2V5XSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNsYXNzZXMgKz0gJyAnICsga2V5O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gY2xhc3Nlcy5zdWJzdHIoMSk7XG59XG5cbi8vIHNhZmVseSBleHBvcnQgY2xhc3NOYW1lcyBmb3Igbm9kZSAvIGJyb3dzZXJpZnlcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG59XG5cbi8vIHNhZmVseSBleHBvcnQgY2xhc3NOYW1lcyBmb3IgUmVxdWlyZUpTXG5pZiAodHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdH0pO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnSW52YXJpYW50IFZpb2xhdGlvbjogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUga2V5TWlycm9yXG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCIuL2ludmFyaWFudFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGFuIGVudW1lcmF0aW9uIHdpdGgga2V5cyBlcXVhbCB0byB0aGVpciB2YWx1ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgIHZhciBDT0xPUlMgPSBrZXlNaXJyb3Ioe2JsdWU6IG51bGwsIHJlZDogbnVsbH0pO1xuICogICB2YXIgbXlDb2xvciA9IENPTE9SUy5ibHVlO1xuICogICB2YXIgaXNDb2xvclZhbGlkID0gISFDT0xPUlNbbXlDb2xvcl07XG4gKlxuICogVGhlIGxhc3QgbGluZSBjb3VsZCBub3QgYmUgcGVyZm9ybWVkIGlmIHRoZSB2YWx1ZXMgb2YgdGhlIGdlbmVyYXRlZCBlbnVtIHdlcmVcbiAqIG5vdCBlcXVhbCB0byB0aGVpciBrZXlzLlxuICpcbiAqICAgSW5wdXQ6ICB7a2V5MTogdmFsMSwga2V5MjogdmFsMn1cbiAqICAgT3V0cHV0OiB7a2V5MToga2V5MSwga2V5Mjoga2V5Mn1cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbnZhciBrZXlNaXJyb3IgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHJldCA9IHt9O1xuICB2YXIga2V5O1xuICAoXCJwcm9kdWN0aW9uXCIgIT09IFwiZGV2ZWxvcG1lbnRcIiA/IGludmFyaWFudChcbiAgICBvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSxcbiAgICAna2V5TWlycm9yKC4uLik6IEFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0LidcbiAgKSA6IGludmFyaWFudChvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSkpO1xuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0W2tleV0gPSBrZXk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWlycm9yO1xuIiwiaW1wb3J0IENoYXRDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0NoYXRDb25zdGFudHMnO1xuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcblxuY29uc3QgQ2hhdEFjdGlvbnMgPSB7XG4gIHRvZ2dsZVZpc2liaWxpdHkoKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IENoYXRDb25zdGFudHMuVE9HR0xFX1ZJU0lCSUxJVFlcbiAgICB9KTtcbiAgfSxcbiAgc3VibWl0TWVzc2FnZShtZXNzYWdlLCBjbGFzc05hbWUsIHJlY2VpdmVkKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IENoYXRDb25zdGFudHMuU1VCTUlUX01FU1NBR0UsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICByZWNlaXZlZDogcmVjZWl2ZWRcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdEFjdGlvbnM7IiwiaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0dhbWVDb25zdGFudHMnO1xuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcblxuY29uc3QgR2FtZUFjdGlvbnMgPSB7XG4gIG1ha2VNb3ZlKGZyb20sIHRvLCBjYXB0dXJlLCB0eXBlLCBlbWl0TW92ZSkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLk1BS0VfTU9WRSxcbiAgICAgIGZyb206IGZyb20sXG4gICAgICB0bzogdG8sXG4gICAgICBjYXB0dXJlOiBjYXB0dXJlLFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIGVtaXRNb3ZlOiBlbWl0TW92ZVxuICAgIH0pO1xuICB9LFxuICBzaG93TW92ZXModW5pdCwgZnJvbSwgaW5SYW5nZSkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLlNIT1dfTU9WRVMsXG4gICAgICB1bml0OiB1bml0LFxuICAgICAgZnJvbTogZnJvbSxcbiAgICAgIGluUmFuZ2U6IGluUmFuZ2VcbiAgICB9KTtcbiAgfSxcbiAgZHJhdygpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5EUkFXXG4gICAgfSk7XG4gIH0sXG4gIHJlbWF0Y2goKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuUkVNQVRDSFxuICAgIH0pO1xuICB9LFxuICBnYW1lT3ZlcihvcHRpb25zKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuR0FNRV9PVkVSLFxuICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgIH0pO1xuICB9LFxuICBjaGFuZ2VQcm9tb3Rpb24ocHJvbW90aW9uKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuQ0hBTkdFX1BST01PVElPTixcbiAgICAgIHByb21vdGlvbjogcHJvbW90aW9uXG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVBY3Rpb25zOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcblxuY29uc3QgQ2FwdHVyZWRQaWVjZXMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluLCBvbkdhbWVDaGFuZ2VdLFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2FwdHVyZWRQaWVjZXM6IEdhbWVTdG9yZS5nZXRDYXB0dXJlZFBpZWNlcygpXG4gICAgfTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNwID0gdGhpcy5zdGF0ZS5jYXB0dXJlZFBpZWNlcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY2FwdHVyZWQtcGllY2VzXCI+XG4gICAgICAgIHtjcC5tYXAoKHBpZWNlcywgY29sb3IpID0+IChcbiAgICAgICAgICA8dWwga2V5PXtjb2xvcn0+XG4gICAgICAgICAgICB7cGllY2VzLm1hcCgocGllY2UsIGkpID0+IDxsaSBrZXk9e2l9PntwaWVjZX08L2xpPikudG9BcnJheSgpfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgICkpLnRvQXJyYXkoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjYXB0dXJlZFBpZWNlczogR2FtZVN0b3JlLmdldENhcHR1cmVkUGllY2VzKClcbiAgICB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhcHR1cmVkUGllY2VzOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgQ2hhdFN0b3JlIGZyb20gJy4uL3N0b3Jlcy9DaGF0U3RvcmUnO1xuaW1wb3J0IENoYXRBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvQ2hhdEFjdGlvbnMnO1xuXG5jb25zdCBDaGF0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB0b2tlbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIC8vIHNvdW5kc0VuYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNPcHBvbmVudEF2YWlsYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBvcGVuTW9kYWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbl0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IHN0YXRlID0gQ2hhdFN0b3JlLmdldFN0YXRlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQ2hhdEhpZGRlbjogc3RhdGUuaXNDaGF0SGlkZGVuLFxuICAgICAgbWVzc2FnZXM6IHN0YXRlLm1lc3NhZ2VzLFxuICAgICAgbWVzc2FnZTogJycsXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5pby5vbigncmVjZWl2ZS1tZXNzYWdlJywgZGF0YSA9PiB7XG4gICAgICBDaGF0QWN0aW9ucy5zdWJtaXRNZXNzYWdlKGRhdGEubWVzc2FnZSwgZGF0YS5jb2xvciArICcgbGVmdCcsIHRydWUpO1xuICAgICAgdGhpcy5fbWF5YmVQbGF5U291bmQoKTtcbiAgICB9KTtcbiAgICBDaGF0U3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uQ2hhdFN0b3JlQ2hhbmdlKTtcbiAgICBcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiAxMzk5KSBDaGF0QWN0aW9ucy50b2dnbGVWaXNpYmlsaXR5KCk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIENoYXRTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uQ2hhdFN0b3JlQ2hhbmdlKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY2hhdC13cmFwcGVyXCJcbiAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLmlzQ2hhdEhpZGRlbiA/ICdoaWRkZW4nIDogbnVsbH0+XG4gICAgICAgIFxuICAgICAgICA8aDQ+Q2hhdDwvaDQ+XG4gICAgICAgIDxhIGNsYXNzTmFtZT1cImNsb3NlXCJcbiAgICAgICAgICAgb25DbGljaz17Q2hhdEFjdGlvbnMudG9nZ2xlVmlzaWJpbGl0eX0+XG4gICAgICAgICAgeFxuICAgICAgICA8L2E+XG4gICAgICAgIFxuICAgICAgICA8YXVkaW8gcHJlbG9hZD1cImF1dG9cIiByZWY9XCJtc2dTbmRcIj5cbiAgICAgICAgICA8c291cmNlIHNyYz1cIi9zbmQvbWVzc2FnZS5tcDNcIiAvPlxuICAgICAgICA8L2F1ZGlvPlxuICAgICAgICBcbiAgICAgICAgPHVsIGlkPVwiY2hhdC1saXN0XCIgcmVmPVwiY2hhdFwiPlxuICAgICAgICAgIHt0aGlzLnN0YXRlLm1lc3NhZ2VzLm1hcCgobWVzc2FnZSwgaSkgPT4gKFxuICAgICAgICAgICAgPGxpIGtleT17aX0gY2xhc3NOYW1lPXttZXNzYWdlLmdldCgnY2xhc3NOYW1lJyl9PlxuICAgICAgICAgICAgICB7bWVzc2FnZS5nZXQoJ21lc3NhZ2UnKX1cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgKSkudG9BcnJheSgpfVxuICAgICAgICA8L3VsPlxuICAgICAgICBcbiAgICAgICAgPHNwYW4+V3JpdGUgeW91ciBtZXNzYWdlOjwvc3Bhbj5cbiAgICAgICAgXG4gICAgICAgIDxmb3JtIGlkPVwiY2hhdC1mb3JtXCJcbiAgICAgICAgICAgICAgb25TdWJtaXQ9e3RoaXMuX3N1Ym1pdE1lc3NhZ2V9PlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgIHJlZj1cIm1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuY29sb3J9XG4gICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLm1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9vbkNoYW5nZU1lc3NhZ2V9IC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIF9vbkNoYXRTdG9yZUNoYW5nZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKENoYXRTdG9yZS5nZXRTdGF0ZSgpLCB0aGlzLl9zY3JvbGxDaGF0KTtcbiAgfSxcbiAgX29uQ2hhbmdlTWVzc2FnZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZTogZS50YXJnZXQudmFsdWV9KTtcbiAgfSxcbiAgX3N1Ym1pdE1lc3NhZ2UoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB7aW8sIHRva2VuLCBjb2xvciwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnN0YXRlLm1lc3NhZ2U7XG5cbiAgICBpZiAoIWlzT3Bwb25lbnRBdmFpbGFibGUpIHtcbiAgICAgIHRoaXMucmVmcy5tZXNzYWdlLmdldERPTU5vZGUoKS5ibHVyKCk7XG4gICAgICB0aGlzLnByb3BzLm9wZW5Nb2RhbCgnaW5mbycsICdTb3JyeSwgeW91ciBvcHBvbmVudCBpcyBub3QgY29ubmVjdGVkLiAnICtcbiAgICAgICAgJ1lvdSBjYW7igJh0IHNlbmQgbWVzc2FnZXMuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgQ2hhdEFjdGlvbnMuc3VibWl0TWVzc2FnZShtZXNzYWdlLCBjb2xvciArICcgcmlnaHQnLCBmYWxzZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZTogJyd9KTtcblxuICAgIGlvLmVtaXQoJ3NlbmQtbWVzc2FnZScsIHtcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBjb2xvcjogY29sb3IsXG4gICAgICB0b2tlbjogdG9rZW5cbiAgICB9KTtcbiAgfSxcbiAgX3Njcm9sbENoYXQoKSB7XG4gICAgY29uc3QgY2hhdE5vZGUgPSB0aGlzLnJlZnMuY2hhdC5nZXRET01Ob2RlKCk7XG4gICAgY2hhdE5vZGUuc2Nyb2xsVG9wID0gY2hhdE5vZGUuc2Nyb2xsSGVpZ2h0O1xuICB9LFxuICBfbWF5YmVQbGF5U291bmQoKSB7XG4gICAgLy8gaWYgKHRoaXMucHJvcHMuc291bmRzRW5hYmxlZCkge1xuICAgIC8vICAgdGhpcy5yZWZzLm1zZ1NuZC5nZXRET01Ob2RlKCkucGxheSgpO1xuICAgIC8vIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENoYXQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG5pbXBvcnQgQ2hlc3NQaWVjZXMgZnJvbSAnLi4vY29uc3RhbnRzL0NoZXNzUGllY2VzJztcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XG5pbXBvcnQgbWF5YmVSZXZlcnNlIGZyb20gJy4uL21peGlucy9tYXliZVJldmVyc2UnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHtTZXEsIFJlcGVhdCwgTGlzdCwgU2V0fSBmcm9tICdpbW11dGFibGUnO1xuXG5jb25zdCBGSUxFUyA9IFNlcS5JbmRleGVkKCdhYmNkZWZnaCcpO1xuY29uc3QgUkFOS1MgPSBTZXEuSW5kZXhlZCgnMTIzNDU2NzgnKTtcblxuY29uc3QgQ2hlc3Nib2FyZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdG9rZW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBtYXliZVBsYXlTb3VuZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcbiAgICBnYW1lT3ZlcjogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG1heWJlUmV2ZXJzZV0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IHN0YXRlID0gR2FtZVN0b3JlLmdldENoZXNzYm9hcmRTdGF0ZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGZlbjogc3RhdGUuZmVuLFxuICAgICAgbW92ZUZyb206IG51bGwsXG4gICAgICBsYXN0TW92ZTogc3RhdGUubGFzdE1vdmUsXG4gICAgICBraW5nSW5DaGVjazogZmFsc2VcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7aW8sIHRva2VufSA9IHRoaXMucHJvcHM7XG4gICAgR2FtZVN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xuICAgIEdhbWVTdG9yZS5vbignbmV3LW1vdmUnLCB0aGlzLl9vbk5ld01vdmUpO1xuXG4gICAgaW8ub24oJ21vdmUnLCBkYXRhID0+IHtcbiAgICAgIEdhbWVBY3Rpb25zLm1ha2VNb3ZlKGRhdGEuZnJvbSwgZGF0YS50bywgZGF0YS5jYXB0dXJlLCBmYWxzZSk7XG4gICAgICB0aGlzLnByb3BzLm1heWJlUGxheVNvdW5kKCk7XG5cbiAgICAgIGlmICghZGF0YS5nYW1lT3Zlcikge1xuICAgICAgICB0aGlzLl9ydW5DbG9jaygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0aXRsZScpWzBdO1xuICAgICAgICB0aXRsZS50ZXh0ID0gJyogJyArIHRpdGxlLnRleHQ7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fcmVtb3ZlQXN0ZXJpc2tGcm9tVGl0bGUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtYWNjZXB0ZWQnLCAoKSA9PiB0aGlzLnNldFN0YXRlKHttb3ZlRnJvbTogbnVsbH0pKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgR2FtZVN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcbiAgICBHYW1lU3RvcmUub24oJ25ldy1tb3ZlJywgdGhpcy5fb25OZXdNb3ZlKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtjb2xvciwgaXNPcHBvbmVudEF2YWlsYWJsZSwgZ2FtZU92ZXJ9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7ZmVuLCBtb3ZlRnJvbSwgbGFzdE1vdmUsIGtpbmdJbkNoZWNrfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgZmVuQXJyYXkgPSBmZW4uc3BsaXQoJyAnKTtcbiAgICBjb25zdCBwbGFjZW1lbnQgPSBmZW5BcnJheVswXTtcbiAgICBjb25zdCBpc0l0TXlUdXJuID0gZmVuQXJyYXlbMV0gPT09IGNvbG9yLmNoYXJBdCgwKTtcbiAgICBjb25zdCByb3dzID0gdGhpcy5fbWF5YmVSZXZlcnNlKHBsYWNlbWVudC5zcGxpdCgnLycpKTtcbiAgICBjb25zdCByYW5rcyA9IHRoaXMuX21heWJlUmV2ZXJzZShSQU5LUywgJ3doaXRlJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImNoZXNzYm9hcmRcIj5cbiAgICAgICAge3Jvd3MubWFwKChwbGFjZW1lbnQsIGkpID0+XG4gICAgICAgICAgPFJvd1xuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgcmFuaz17cmFua3MuZ2V0KGkpfVxuICAgICAgICAgICAgcGxhY2VtZW50PXtwbGFjZW1lbnR9XG4gICAgICAgICAgICBjb2xvcj17Y29sb3J9XG4gICAgICAgICAgICBpc01vdmVhYmxlPXtpc0l0TXlUdXJuICYmIGlzT3Bwb25lbnRBdmFpbGFibGUgJiYgIWdhbWVPdmVyfVxuICAgICAgICAgICAgbW92ZUZyb209e21vdmVGcm9tfVxuICAgICAgICAgICAgbGFzdE1vdmU9e2xhc3RNb3ZlfVxuICAgICAgICAgICAgc2V0TW92ZUZyb209e3RoaXMuX3NldE1vdmVGcm9tfVxuICAgICAgICAgICAga2luZ0luQ2hlY2s9e2tpbmdJbkNoZWNrfVxuICAgICAgICAgICAgdmFsaWRNb3Zlcz17R2FtZVN0b3JlLmdldFZhbGlkTW92ZXMobW92ZUZyb20pfSAvPil9XG4gICAgICA8L3RhYmxlPlxuICAgICk7XG4gIH0sXG4gIF9vbkdhbWVDaGFuZ2UoY2IpIHtcbiAgICBjb25zdCBzdGF0ZSA9IEdhbWVTdG9yZS5nZXRDaGVzc2JvYXJkU3RhdGUoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGZlbjogc3RhdGUuZmVuLFxuICAgICAgbGFzdE1vdmU6IHN0YXRlLmxhc3RNb3ZlLFxuICAgICAga2luZ0luQ2hlY2s6IHN0YXRlLmNoZWNrICYmIChzdGF0ZS5mZW4uc3BsaXQoJyAnKVsxXSA9PT0gJ3cnID8gJ0snIDogJ2snKVxuICAgIH0sIGNiKTtcbiAgfSxcbiAgX3NldE1vdmVGcm9tKHNxdWFyZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbW92ZUZyb206IHNxdWFyZVxuICAgIH0pO1xuICB9LFxuICBfb25OZXdNb3ZlKG1vdmUpIHtcbiAgICBjb25zdCB7aW8sIHRva2VufSA9IHRoaXMucHJvcHM7XG5cbiAgICBpby5lbWl0KCduZXctbW92ZScsIHtcbiAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgIG1vdmU6IG1vdmVcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQodGhpcy5wcm9wcy5tYXliZVBsYXlTb3VuZCwgMCk7XG4gIH0sXG4gIF9ydW5DbG9jaygpIHtcbiAgICBjb25zdCB7aW8sIHRva2VuLCBjb2xvcn0gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xuICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgY29sb3I6IGNvbG9yXG4gICAgfSk7XG4gIH0sXG4gIF9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSgpIHtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGl0bGUnKVswXTtcbiAgICB0aXRsZS50ZXh0ID0gdGl0bGUudGV4dC5yZXBsYWNlKCcqICcsICcnKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XG4gIH1cbn0pO1xuXG5jb25zdCBSb3cgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgcmFuazogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnMScsJzInLCczJywnNCcsJzUnLCc2JywnNycsJzgnXSkuaXNSZXF1aXJlZCxcbiAgICBwbGFjZW1lbnQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcbiAgICBpc01vdmVhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIG1vdmVGcm9tOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxhc3RNb3ZlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHNldE1vdmVGcm9tOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGtpbmdJbkNoZWNrOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW2ZhbHNlLCAnSycsICdrJ10pLmlzUmVxdWlyZWQsXG4gICAgdmFsaWRNb3ZlczogUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoU2V0KS5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW21heWJlUmV2ZXJzZV0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtyYW5rLCBwbGFjZW1lbnQsIGNvbG9yfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZmlsZXMgPSB0aGlzLl9tYXliZVJldmVyc2UoRklMRVMpO1xuICAgIGNvbnN0IHBpZWNlcyA9IHRoaXMuX21heWJlUmV2ZXJzZShwbGFjZW1lbnQubGVuZ3RoIDwgOCA/XG4gICAgICBTZXEocGxhY2VtZW50KS5mbGF0TWFwKHBpZWNlID0+IChcbiAgICAgICAgL15cXGQkLy50ZXN0KHBpZWNlKSA/IFJlcGVhdCgnLScsIHBhcnNlSW50KHBpZWNlLCAxMCkpIDogcGllY2VcbiAgICAgICkpLnRvQXJyYXkoKSA6XG5cbiAgICAgIHBsYWNlbWVudC5zcGxpdCgnJylcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx0cj5cbiAgICAgICAge3BpZWNlcy5tYXAoKHBpZWNlLCBpKSA9PlxuICAgICAgICAgIDxDb2x1bW5cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIHNxdWFyZT17ZmlsZXMuZ2V0KGkpICsgcmFua31cbiAgICAgICAgICAgIHBpZWNlPXtwaWVjZX1cbiAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsICdyYW5rJywgJ3BsYWNlbWVudCcpfSAvPil9XG4gICAgICA8L3RyPlxuICAgICk7XG4gIH1cbn0pO1xuXG5jb25zdCBDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgc3F1YXJlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgcGllY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcbiAgICBpc01vdmVhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIG1vdmVGcm9tOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxhc3RNb3ZlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHNldE1vdmVGcm9tOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGtpbmdJbkNoZWNrOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW2ZhbHNlLCAnSycsICdrJ10pLmlzUmVxdWlyZWQsXG4gICAgdmFsaWRNb3ZlczogUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoU2V0KS5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHttb3ZlRnJvbSwgbGFzdE1vdmUsIHNxdWFyZSwgY29sb3IsXG4gICAgICAgICAgIGlzTW92ZWFibGUsIGtpbmdJbkNoZWNrLCB2YWxpZE1vdmVzfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcGllY2UgPSBDaGVzc1BpZWNlc1t0aGlzLnByb3BzLnBpZWNlXTtcbiAgICBjb25zdCByZ3ggPSBjb2xvciA9PT0gJ3doaXRlJyA/IC9eW0tRUkJOUF0kLyA6IC9eW2txcmJucF0kLztcbiAgICBjb25zdCBpc0RyYWdnYWJsZSA9IHJneC50ZXN0KHRoaXMucHJvcHMucGllY2UpO1xuICAgIGNvbnN0IGlzRHJvcHBhYmxlID0gbW92ZUZyb20gJiYgdmFsaWRNb3Zlcy5oYXMoc3F1YXJlKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8dGQgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogbW92ZUZyb20gPT09IHNxdWFyZSAmJiAhdmFsaWRNb3Zlcy5pc0VtcHR5KCksXG4gICAgICAgICAgICBmcm9tOiBsYXN0TW92ZS5nZXQoJ2Zyb20nKSA9PT0gc3F1YXJlLFxuICAgICAgICAgICAgdG86IGxhc3RNb3ZlLmdldCgndG8nKSA9PT0gc3F1YXJlLFxuICAgICAgICAgICAgZHJvcHBhYmxlOiBpc0Ryb3BwYWJsZVxuICAgICAgICAgIH0pfVxuICAgICAgICAgIG9uQ2xpY2s9eyFwaWVjZSA/IHRoaXMuX29uQ2xpY2tTcXVhcmUgOiBudWxsfVxuICAgICAgICAgIG9uRHJhZ092ZXI9e2lzRHJvcHBhYmxlID8gdGhpcy5fb25EcmFnT3ZlciA6IG51bGx9XG4gICAgICAgICAgb25Ecm9wPXtpc0Ryb3BwYWJsZSA/IHRoaXMuX29uRHJvcCA6IG51bGx9PlxuXG4gICAgICAgIHtwaWVjZSA/XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPXtraW5nSW5DaGVjayA9PT0gdGhpcy5wcm9wcy5waWVjZSA/ICdpbi1jaGVjaycgOiBudWxsfVxuICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uQ2xpY2tTcXVhcmV9XG4gICAgICAgICAgICAgb25EcmFnU3RhcnQ9e3RoaXMuX29uRHJhZ1N0YXJ0fVxuICAgICAgICAgICAgIGRyYWdnYWJsZT17aXNEcmFnZ2FibGUgJiYgaXNNb3ZlYWJsZX0+XG4gICAgICAgICAgICB7cGllY2V9XG4gICAgICAgICAgPC9hPlxuICAgICAgICA6bnVsbH1cbiAgICAgIDwvdGQ+XG4gICAgKTtcbiAgfSxcbiAgX29uQ2xpY2tTcXVhcmUoKSB7XG4gICAgY29uc3Qge2lzTW92ZWFibGUsIGNvbG9yLCBtb3ZlRnJvbSwgc3F1YXJlLCBwaWVjZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJneCA9IGNvbG9yID09PSAnd2hpdGUnID8gL15bS1FSQk5QXSQvIDogL15ba3FyYm5wXSQvO1xuXG4gICAgaWYgKCFpc01vdmVhYmxlIHx8ICghbW92ZUZyb20gJiYgIXJneC50ZXN0KHBpZWNlKSkpXG4gICAgICByZXR1cm47XG4gICAgZWxzZSBpZiAobW92ZUZyb20gJiYgbW92ZUZyb20gPT09IHNxdWFyZSlcbiAgICAgIHRoaXMucHJvcHMuc2V0TW92ZUZyb20obnVsbCk7XG4gICAgZWxzZSBpZiAocmd4LnRlc3QocGllY2UpKVxuICAgICAgdGhpcy5wcm9wcy5zZXRNb3ZlRnJvbShzcXVhcmUpO1xuICAgIGVsc2VcbiAgICAgIEdhbWVBY3Rpb25zLm1ha2VNb3ZlKG1vdmVGcm9tLCBzcXVhcmUsIENoZXNzUGllY2VzW3BpZWNlXSwgdHJ1ZSk7XG4gIH0sXG4gIF9vbkRyYWdTdGFydChlKSB7XG4gICAgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICAvLyBzZXREYXRhIGlzIHJlcXVpcmVkIGJ5IGZpcmVmb3hcbiAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgJycpO1xuXG4gICAgdGhpcy5wcm9wcy5zZXRNb3ZlRnJvbSh0aGlzLnByb3BzLnNxdWFyZSk7XG4gIH0sXG4gIF9vbkRyYWdPdmVyKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgfSxcbiAgX29uRHJvcChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHttb3ZlRnJvbSwgc3F1YXJlLCBwaWVjZX0gPSB0aGlzLnByb3BzO1xuICAgIEdhbWVBY3Rpb25zLm1ha2VNb3ZlKG1vdmVGcm9tLCBzcXVhcmUsIENoZXNzUGllY2VzW3BpZWNlXSwgdHJ1ZSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDaGVzc2JvYXJkOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcbmltcG9ydCBDaGVzc2JvYXJkIGZyb20gJy4vQ2hlc3Nib2FyZCc7XG5pbXBvcnQgQ2FwdHVyZWRQaWVjZXMgZnJvbSAnLi9DYXB0dXJlZFBpZWNlcyc7XG5pbXBvcnQgVGFibGVPZk1vdmVzIGZyb20gJy4vVGFibGVPZk1vdmVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuY29uc3QgQ2hlc3Nib2FyZEludGVyZmFjZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdG9rZW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBzb3VuZHNFbmFibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIGdhbWVPdmVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgaXNPcHBvbmVudEF2YWlsYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluLCBvbkdhbWVDaGFuZ2VdLFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4gR2FtZVN0b3JlLmdldFN0YXRlKCk7XG4gIH0sXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpICYmXG4gICAgICAgICFwcmV2UHJvcHMuZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSkge1xuICAgICAgdGhpcy5wcm9wcy5vcGVuTW9kYWwoJ2luZm8nLCB0aGlzLl9nZXRHYW1lT3Zlck1lc3NhZ2UoKSk7XG4gICAgfVxuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3Byb21vdGlvbiwgdHVybiwgZ2FtZU92ZXIsIGNoZWNrfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImJvYXJkLW1vdmVzLXdyYXBwZXJcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuICAgICAgICBcbiAgICAgICAgPGF1ZGlvIHByZWxvYWQ9XCJhdXRvXCIgcmVmPVwibW92ZVNuZFwiPlxuICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiL3NuZC9tb3ZlLm1wM1wiIC8+XG4gICAgICAgIDwvYXVkaW8+XG4gICAgICAgIDxhdWRpbyBwcmVsb2FkPVwiYXV0b1wiIHJlZj1cImNoZWNrU25kXCI+XG4gICAgICAgICAgPHNvdXJjZSBzcmM9XCIvc25kL2NoZWNrLm1wM1wiIC8+XG4gICAgICAgIDwvYXVkaW8+XG5cbiAgICAgICAgPGRpdiBpZD1cImJvYXJkLXdyYXBwZXJcIj5cbiAgICAgICAgICA8Q2FwdHVyZWRQaWVjZXMgLz5cbiAgICAgICAgICA8Q2hlc3Nib2FyZFxuICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgJ3NvdW5kc0VuYWJsZWQnLCAnZ2FtZU92ZXInKX1cbiAgICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlci5nZXQoJ3N0YXR1cycpfVxuICAgICAgICAgICAgbWF5YmVQbGF5U291bmQ9e3RoaXMuX21heWJlUGxheVNvdW5kfSAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8VGFibGVPZk1vdmVzIC8+XG5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHJvbW90aW9uXCI+XG4gICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgPHNwYW4+UHJvbW90aW9uOiA8L3NwYW4+XG4gICAgICAgICAgICA8c2VsZWN0IHZhbHVlPXtwcm9tb3Rpb259XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9vblByb21vdGlvbkNoYW5nZX0+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJxXCI+UXVlZW48L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJcIj5Sb29rPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJiXCI+QmlzaG9wPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJuXCI+S25pZ2h0PC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmVlZGJhY2tcIj5cbiAgICAgICAgICB7IWdhbWVPdmVyLmdldCgnc3RhdHVzJykgPyBcbiAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+XG4gICAgICAgICAgICAgICAgey8qIEYgLT4gd2hpdGUga2luZywgZiAtPiBibGFjayBraW5nKi9cbiAgICAgICAgICAgICAgICAgIHR1cm4gPT09ICd3JyA/ICdGJyA6ICdmJ31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB7YCR7dHVybiA9PT0gJ3cnID8gJ1doaXRlJyA6ICdCbGFjayd9IHRvIG1vdmUuYH1cbiAgICAgICAgICAgICAge2NoZWNrID8gPHN0cm9uZz4gQ2hlY2suPC9zdHJvbmc+IDogbnVsbH1cbiAgICAgICAgICAgIDwvc3Bhbj4gOlxuXG4gICAgICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+XG4gICAgICAgICAgICAgICAge2dhbWVPdmVyLmdldCgnd2lubmVyJykgPT09ICdXaGl0ZScgPyAnRicgOiAnZid9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAge3RoaXMuX2dldEdhbWVPdmVyTWVzc2FnZSgpfVxuICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgfVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuICBfb25HYW1lQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoR2FtZVN0b3JlLmdldFN0YXRlKCkpO1xuICB9LFxuICBfb25Qcm9tb3Rpb25DaGFuZ2UoZSkge1xuICAgIEdhbWVBY3Rpb25zLmNoYW5nZVByb21vdGlvbihlLnRhcmdldC52YWx1ZSk7XG4gIH0sXG4gIF9tYXliZVBsYXlTb3VuZCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zb3VuZHNFbmFibGVkKSB7XG4gICAgICB0aGlzLnJlZnNbdGhpcy5zdGF0ZS5jaGVjayA/ICdjaGVja1NuZCcgOiAnbW92ZVNuZCddLmdldERPTU5vZGUoKS5wbGF5KCk7XG4gICAgfVxuICB9LFxuICBfZ2V0R2FtZU92ZXJNZXNzYWdlKCkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnByb3BzLmdhbWVPdmVyLmdldCgndHlwZScpO1xuICAgIGNvbnN0IHdpbm5lciA9IHRoaXMucHJvcHMuZ2FtZU92ZXIuZ2V0KCd3aW5uZXInKTtcbiAgICBjb25zdCBsb3NlciA9IHdpbm5lciA9PT0gJ1doaXRlJyA/ICdCbGFjaycgOiAnV2hpdGUnO1xuXG4gICAgcmV0dXJuIHR5cGUgPT09ICdjaGVja21hdGUnID8gYENoZWNrbWF0ZS4gJHt3aW5uZXJ9IHdpbnMhYCA6XG4gICAgICB0eXBlID09PSAndGltZW91dCcgPyBgJHtsb3Nlcn3igJhzIHRpbWUgaXMgb3V0LiAke3dpbm5lcn0gd2lucyFgIDpcbiAgICAgIHR5cGUgPT09ICdyZXNpZ24nID8gYCR7bG9zZXJ9IGhhcyByZXNpZ25lZC4gJHt3aW5uZXJ9IHdpbnMhYCA6XG4gICAgICB0eXBlID09PSAnZHJhdycgPyAnRHJhdy4nIDpcbiAgICAgIHR5cGUgPT09ICdzdGFsZW1hdGUnID8gJ0RyYXcgKFN0YWxlbWF0ZSkuJyA6XG4gICAgICB0eXBlID09PSAndGhyZWVmb2xkUmVwZXRpdGlvbicgPyAnRHJhdyAoVGhyZWVmb2xkIFJlcGV0aXRpb24pLicgOlxuICAgICAgdHlwZSA9PT0gJ2luc3VmZmljaWVudE1hdGVyaWFsJyA/ICdEcmF3IChJbnN1ZmZpY2llbnQgTWF0ZXJpYWwpJyA6ICcnO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hlc3Nib2FyZEludGVyZmFjZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuXG5jb25zdCBQdXJlUmVuZGVyTWl4aW4gPSBSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluO1xuXG5jb25zdCBDbG9jayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgcGFyYW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtQdXJlUmVuZGVyTWl4aW5dLFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCBbXywgdGltZSwgaW5jXSA9IHRoaXMucHJvcHMucGFyYW1zO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICB3aGl0ZTogdGltZSAqIDYwLFxuICAgICAgYmxhY2s6IHRpbWUgKiA2MCxcbiAgICAgIGluYzogaW5jLFxuICAgICAgY291bnRkb3duOiBudWxsXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgaW8gPSB0aGlzLnByb3BzLmlvO1xuXG4gICAgaW8ub24oJ2NvdW50ZG93bicsIGRhdGEgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBbZGF0YS5jb2xvcl06IGRhdGEudGltZSxcbiAgICAgIGNvdW50ZG93bjogZGF0YS5jb2xvclxuICAgIH0pKTtcblxuICAgIGlvLm9uKCdjb3VudGRvd24tZ2FtZW92ZXInLCBkYXRhID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2NvdW50ZG93bjogbnVsbH0pO1xuICAgICAgR2FtZUFjdGlvbnMuZ2FtZU92ZXIoe1xuICAgICAgICB0eXBlOiAndGltZW91dCcsXG4gICAgICAgIHdpbm5lcjogZGF0YS5jb2xvciA9PT0gJ2JsYWNrJyA/ICdXaGl0ZScgOiAnQmxhY2snXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlvLm9uKCdyZW1hdGNoLWFjY2VwdGVkJywgKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHdoaXRlOiB0aGlzLnByb3BzLnBhcmFtc1sxXSAqIDYwLFxuICAgICAgICBibGFjazogdGhpcy5wcm9wcy5wYXJhbXNbMV0gKiA2MFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGlkPVwiY2xvY2tcIj5cbiAgICAgICAgPFRpbWVyXG4gICAgICAgICAgY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgdGltZT17dGhpcy5zdGF0ZS53aGl0ZX1cbiAgICAgICAgICBjb3VudGRvd249e3RoaXMuc3RhdGUuY291bnRkb3dufSAvPlxuICAgICAgICA8VGltZXJcbiAgICAgICAgICBjb2xvcj1cImJsYWNrXCJcbiAgICAgICAgICB0aW1lPXt0aGlzLnN0YXRlLmJsYWNrfVxuICAgICAgICAgIGNvdW50ZG93bj17dGhpcy5zdGF0ZS5jb3VudGRvd259IC8+XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn0pO1xuXG5jb25zdCBUaW1lciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBtaXhpbnM6IFtQdXJlUmVuZGVyTWl4aW5dLFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7dGltZSwgY29sb3IsIGNvdW50ZG93bn0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1pbiA9IE1hdGguZmxvb3IodGltZSAvIDYwKTtcbiAgICBjb25zdCBzZWMgPSB0aW1lICUgNjA7XG4gICAgY29uc3QgdGltZUxlZnQgPSBgJHttaW59OiR7c2VjIDwgMTAgPyAnMCcgKyBzZWMgOiBzZWN9YDtcblxuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPXtjb2xvciArIChjb2xvciA9PT0gY291bnRkb3duID8gJyB0aWNraW5nJyA6ICcnKX0+XG4gICAgICAgIHt0aW1lTGVmdH1cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENsb2NrOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuLy9pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuaW1wb3J0IG1heWJlUmV2ZXJzZSBmcm9tICcuLi9taXhpbnMvbWF5YmVSZXZlcnNlJztcbmltcG9ydCBiZWhhdmlvciBmcm9tICcuLi9nYW1lL2JlaGF2aW9yJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuXG5cblxuY29uc3QgR2FtZUJvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6IHtcblxuXHR9LFxuXHRtaXhpbnM6IFttYXliZVJldmVyc2VdLFxuXHRnZXRJbml0aWFsU3RhdGUoKSB7XG5cdFx0dGhpcy5zdGF0ZSA9IEdhbWVTdG9yZS5nZXRHYW1lYm9hcmRTdGF0ZSgpO1xuXHRcdGNvbnNvbGUubG9nKFwic3RhdGU/IFwiLCB0aGlzLnN0YXRlKTtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZTtcblx0fSxcblxuXHRfb25CdXR0b25DbGljaygpe1xuXHRcdGNvbnN0IHtjb2xvcn0gPSB0aGlzLnByb3BzLFxuXHRcdFx0e3R1cm4sIGRlY2t9ID0gdGhpcy5zdGF0ZTtcblxuXHRcdGlmICh0dXJuICE9PSBjb2xvci5jaGFyQXQoMCkgfHwgdGhpcy5zdGF0ZS5wZW5kaW5nRHJhdykgcmV0dXJuO1xuXG5cdFx0bGV0IHtib2FyZH0gPSB0aGlzLnN0YXRlO1xuXHRcdGlmIChjb2xvciA9PT0gJ2JsYWNrJykgYm9hcmQgPSB0aGlzLl9yZXZlcnNlQm9hcmQoYm9hcmQpO1xuXHRcdHZhciBkdWtlUG9zaXRpb24gPSBPYmplY3Qua2V5cyhib2FyZCkuZmluZChwb3MgPT4gKGJvYXJkW3Bvc10gJiYgYm9hcmRbcG9zXS51bml0ID09PSBcIkR1a2VcIiAmJiBib2FyZFtwb3NdLmNvbG9yID09PSBjb2xvcikpO1xuXHRcdHZhciBkdWtlUG9zQXJyID0gSlNPTi5wYXJzZShkdWtlUG9zaXRpb24pO1xuXG5cdFx0dmFyIGRyb3BwYWJsZVRpbGVzID0ge307XG5cdFx0W1swLDFdLCBbMCwtMV0sIFsxLDBdLCBbLTEsMF1dLmZvckVhY2goYWRqID0+IHtcblx0XHRcdHZhciBhZGpYID0gZHVrZVBvc0FyclswXSthZGpbMF0sIGFkalkgPSBkdWtlUG9zQXJyWzFdK2FkalsxXTtcblx0XHRcdGlmICh0aGlzLl9pc09uQm9hcmQoe3g6IGFkalgsIHk6IGFkall9KSAmJiAhYm9hcmRbYFske2Fkalh9LCAke2Fkall9XWBdKSBcblx0XHRcdFx0ZHJvcHBhYmxlVGlsZXNbYFske2Fkalh9LCAke2Fkall9XWBdID0gdHJ1ZTtcblx0XHR9KVxuXG5cdFx0aWYgKCFPYmplY3Qua2V5cyhkcm9wcGFibGVUaWxlcykubGVuZ3RoKSB7XG5cdFx0XHRzd2FsKFwiQ2FuJ3QgbGV0IHlvdSBkcmF3IHRoYXRcIiwgJ05vIGF2YWlsYWJsZSB0aWxlcyBhZGphY2VudCB0byB0aGUgRHVrZSEnLCAnZXJyb3InKTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdGlmIChkZWNrLmxlbmd0aCkge1xuXHRcdFx0XHRHYW1lQWN0aW9ucy5kcmF3KCk7XG5cdFx0XHRcdGxldCB0aGVEcmF3blVuaXQgPSBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKS5wZW5kaW5nRHJhdztcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0ZHJvcDogZHJvcHBhYmxlVGlsZXMsXG5cdFx0XHRcdFx0cGVuZGluZ0RyYXc6IHtcblx0XHRcdFx0XHRcdHVuaXQ6IHRoZURyYXduVW5pdCxcblx0XHRcdFx0XHRcdGNvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuXHRcdFx0XHRcdFx0c2lkZTogJ2Zyb250J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XHRcdFx0XHRcdFxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBcblx0XHRcdFx0c3dhbChcIkNhbid0IGxldCB5b3UgZHJhdyB0aGF0XCIsICdObyB1bml0cyBsZWZ0IHRvIGRyYXchJywgJ2Vycm9yJyk7XG5cdFx0fVx0XHRcblx0fSxcblxuXHRfb25EcmF3Q2VsbENsaWNrKCl7XG5cdFx0Y29uc29sZS5sb2coXCJpIGNsaWNrZWQhIVwiKTtcblx0XHR2YXIgbmV3RHJhd247XG5cdFx0bGV0IGRyYXduVW5pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJhd25Vbml0XCIpO1xuXHRcdGxldCBjbGFzc2VzID0gZHJhd25Vbml0LmNsYXNzTmFtZTtcblxuXHRcdGlmIChjbGFzc2VzLmluY2x1ZGVzKCdmcm9udCcpKSB7XG5cdFx0XHRkcmF3blVuaXQuY2xhc3NMaXN0LnJlbW92ZSgnZnJvbnQnKTtcblx0XHRcdGRyYXduVW5pdC5jbGFzc0xpc3QuYWRkKCdiYWNrJyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0ZHJhd25Vbml0LmNsYXNzTGlzdC5yZW1vdmUoJ2JhY2snKTtcblx0XHRcdGRyYXduVW5pdC5jbGFzc0xpc3QuYWRkKCdmcm9udCcpO1xuXHRcdH1cblx0fSxcblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblxuXHRcdGNvbnN0IHtpbywgdG9rZW59ID0gdGhpcy5wcm9wcztcblxuXHRcdEdhbWVTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcblx0XHRHYW1lU3RvcmUub24oJ25ldy1tb3ZlJywgdGhpcy5fb25OZXdNb3ZlKTtcblx0XHRHYW1lU3RvcmUub24oJ3N3YWwtZW5kZ2FtZScsIHRoaXMuX29uR2FtZU92ZXIpO1xuXG5cdFx0aW8ub24oJ21vdmUnLCBkYXRhID0+IHtcblx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKGRhdGEuZnJvbSwgZGF0YS50bywgZGF0YS5jYXB0dXJlLCBkYXRhLnR5cGUsIGZhbHNlKTtcblxuXHRcdFx0aWYgKCFkYXRhLmdhbWVPdmVyKSB7XG5cdFx0XHQgIHRoaXMuX3J1bkNsb2NrKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkb2N1bWVudC5oaWRkZW4pIHtcblx0XHRcdCAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RpdGxlJylbMF07XG5cdFx0XHQgIHRpdGxlLnRleHQgPSAnKiAnICsgdGl0bGUudGV4dDtcblxuXHRcdFx0ICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpby5vbignc3dhbC1nYW1lb3ZlcicsIGRhdGEgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coJ2hlcmU/Jyk7XG5cdFx0XHRsZXQgd2lubmVyID0gZGF0YS53aW5uZXI7XG5cdFx0XHRzd2FsKHtcblx0XHRcdFx0dGl0bGU6ICdZb3UgbG9zZSEnLFxuXHRcdFx0XHR0ZXh0OiAnbG9sdW1hZCcsXG5cdFx0XHRcdGltYWdlVXJsOiAnaHR0cDovL3ZpZ25ldHRlMi53aWtpYS5ub2Nvb2tpZS5uZXQvZGlja2ZpZ3VyZXMvaW1hZ2VzL2QvZDAvVHJvbGwtRmFjZS1EYW5jaW5nMS5qcGcvcmV2aXNpb24vbGF0ZXN0P2NiPTIwMTIxMTEyMTUwNTQzJ1xuXHRcdFx0fSk7XG5cdFx0fSlcblx0fSxcblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRHYW1lU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5fb25DaGFuZ2UpO1xuXHR9LFxuXG5cdF9yZXZlcnNlUG9zaXRpb24ocG9zKSB7XG5cdFx0Y29uc3Qge3NpemV9ID0gdGhpcy5wcm9wcztcblx0XHRsZXQgcG9zQXJyID0gSlNPTi5wYXJzZShwb3MpO1xuXHRcdHJldHVybiBgWyR7c2l6ZS0xLXBvc0FyclswXX0sICR7c2l6ZS0xLXBvc0FyclsxXX1dYDtcblx0fSxcblxuXHRfcmV2ZXJzZUJvYXJkKCkge1xuXHRcdGNvbnN0IHtib2FyZH0gPSB0aGlzLnN0YXRlO1xuXHRcdGxldCBuZXdCb2FyZCA9IHt9O1xuXHRcdE9iamVjdC5rZXlzKGJvYXJkKS5mb3JFYWNoKHBvcyA9PiB7XG5cdFx0XHRuZXdCb2FyZFt0aGlzLl9yZXZlcnNlUG9zaXRpb24ocG9zKV0gPSBib2FyZFtwb3NdO1xuXHRcdH0pXG5cdFx0cmV0dXJuIG5ld0JvYXJkO1xuXHR9LFxuXG5cdF9vbkdhbWVDaGFuZ2UoY2IpIHtcblx0XHRjb25zdCBzdGF0ZSA9IEdhbWVTdG9yZS5nZXRHYW1lYm9hcmRTdGF0ZSgpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Ym9hcmQ6IHN0YXRlLmJvYXJkLFxuXHRcdFx0bGlnaHR1cDogc3RhdGUubGlnaHR1cCxcblx0XHRcdHN0cmlrZTogc3RhdGUuc3RyaWtlLFxuXHRcdFx0ZHJvcDogc3RhdGUuZHJvcCxcblx0XHRcdHNlbGVjdGVkOiBzdGF0ZS5zZWxlY3RlZCxcblx0XHRcdGRyYXdVbml0OiBzdGF0ZS5kcmF3VW5pdCxcblx0XHRcdHR1cm46IHN0YXRlLnR1cm4sXG5cdFx0XHRwZW5kaW5nRHJhdzogc3RhdGUucGVuZGluZ0RyYXdcblx0XHR9LCBjYik7XG5cdH0sXG5cblx0X29uTmV3TW92ZShtb3ZlKSB7XG5cdFx0Y29uc3Qge2lvLCB0b2tlbn0gPSB0aGlzLnByb3BzO1xuXHRcdGlvLmVtaXQoJ25ldy1tb3ZlJywgeyB0b2tlbiwgbW92ZSB9KTtcblx0fSxcblxuXHRfb25HYW1lT3Zlcih7d2lubmVyfSkge1xuXHRcdGNvbnN0IHtpbywgdG9rZW59ID0gdGhpcy5wcm9wcztcblx0XHRjb25zb2xlLmxvZygndGhlIHdpbm5lciBpcycpO1xuXHRcdGNvbnNvbGUubG9nKHdpbm5lcik7XG5cdFx0aW8uZW1pdCgnc3dhbC1lbmRnYW1lJywgeyB0b2tlbiwgd2lubmVyIH0pO1xuXHR9LFxuXG5cdHJlbmRlcigpIHtcblx0XHRsZXQge3N0YXRlLCBwcm9wc30gPSB0aGlzLCBcblx0XHRcdHtzaXplLCBjb2xvcn0gPSBwcm9wcyxcblx0XHRcdHtib2FyZCwgc2VsZWN0ZWQsIGxpZ2h0dXAsIHN0cmlrZSwgZHJvcCwgdHVybiwgZHJhd24sIHBlbmRpbmdEcmF3fSA9IHN0YXRlO1xuXG5cdFx0aWYgKGNvbG9yID09PSAnYmxhY2snKSBib2FyZCA9IHRoaXMuX3JldmVyc2VCb2FyZCgpO1xuXG5cdFx0bGV0IGNlbGxBcnJheSA9IFtdO1xuXHRcdGZvciAobGV0IGk9MDsgaTxzaXplOyBpKyspIHtcblx0XHRcdGxldCByb3cgPSBbXTtcblx0XHRcdGZvciAobGV0IGo9MDsgajxzaXplOyBqKyspIHtcblx0XHRcdFx0cm93LnB1c2goe3g6aiwgeTppfSlcblx0XHRcdH1cblx0XHRcdGNlbGxBcnJheS5wdXNoKHJvdyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDx0YWJsZSBjbGFzc05hbWU9XCJib2FyZFwiPlxuXHRcdFx0XHR7Y2VsbEFycmF5Lm1hcCgocm93LCBpZHgxKSA9PiBcblx0XHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0XHR7cm93Lm1hcCgoY2VsbCwgaWR4MikgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGxldCBjb29yZHMgPSBgWyR7aWR4Mn0sICR7aWR4MX1dYDtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0XHRcdFx0PHRkIHBvc2l0aW9uPXtjb29yZHN9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8Q2VsbCByZWY9e2Nvb3Jkc31cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCBwb3NpdGlvbj17Y29vcmRzfSBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1bml0PXtib2FyZFtjb29yZHNdID8gYm9hcmRbY29vcmRzXS51bml0IDogbnVsbH0gXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29sb3I9e2JvYXJkW2Nvb3Jkc10gPyBib2FyZFtjb29yZHNdLmNvbG9yIDogbnVsbH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwbGF5ZXJDb2xvcj17Y29sb3J9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2lkZT17Ym9hcmRbY29vcmRzXSA/IGJvYXJkW2Nvb3Jkc10uc2lkZSA6IG51bGx9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGl0dXA9e2xpZ2h0dXBbY29vcmRzXX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHJpa2FibGU9e3N0cmlrZVtjb29yZHNdfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNhbkRyb3A9e2Ryb3BbY29vcmRzXX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZD17c2VsZWN0ZWR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHVybj17dHVybn1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwZW5kaW5nRHJhdz17cGVuZGluZ0RyYXd9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0U2VsZWN0ZWQ9e3RoaXMuX3NldFNlbGVjdGVkfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldERyYXdhYmxlPXt0aGlzLl9zZXREcmF3YWJsZX0gXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0RHJvcHBhYmxlPXt0aGlzLl9zZXREcm9wcGFibGV9IC8+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3RkPlxuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0KX1cblx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHQpfVxuXHRcdFx0XHQ8L3RhYmxlPlxuXHRcdFx0XHQ8ZGl2IGlkPVwiZHJhd1wiPlxuXHRcdFx0XHRcdDxidXR0b24gY2xhc3NOYW1lPVwiYnRuXCIgb25DbGljaz17dGhpcy5fb25CdXR0b25DbGlja30+RFJBVzwvYnV0dG9uPlxuXHRcdFx0XHRcdDxEcmF3bkNvbXBvbmVudCBwb3NpdGlvbj0nWy0xLCAtMV0nIFxuXHRcdFx0XHRcdFx0dW5pdD17cGVuZGluZ0RyYXc/IHBlbmRpbmdEcmF3LnVuaXQgOiBudWxsfSBcblx0XHRcdFx0XHRcdGNvbG9yPXtwZW5kaW5nRHJhdz8gcGVuZGluZ0RyYXcuY29sb3IgOiBudWxsfSBcblx0XHRcdFx0XHRcdHNpZGU9e3BlbmRpbmdEcmF3PyBwZW5kaW5nRHJhdy5zaWRlIDogbnVsbH0gXG5cdFx0XHRcdFx0XHRkcmF3QVVuaXQ9e3RoaXMuX29uRHJhd0NlbGxDbGlja31cblx0XHRcdFx0XHRcdHBsYXllckNvbG9yPXtjb2xvcn0gLz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9LFxuXG5cdF9vbkRyYXduRHJhZ1N0YXJ0KGUpIHtcblx0XHRlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuXHRcdGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCAnJyk7XG5cblx0XHRjb25zdCB7dW5pdCwgcG9zaXRpb24sIGNvbG9yLCBzZWxlY3RlZCwgc2V0U2VsZWN0ZWQsIGxpdHVwLCBzdHJpa2FibGUsIGRyb3BwYWJsZSwgc2lkZX0gPSB0aGlzLnByb3BzO1xuXHRcdHRoaXMuX3NldFNlbGVjdGVkKCdbLTEsLTFdJywgJ2RyYXcnKTtcblxuXHR9LFxuXG5cdF9zZXRTZWxlY3RlZChwb3NpdGlvbiwgaW5SYW5nZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0c2VsZWN0ZWQ6IHBvc2l0aW9uLFxuXHRcdFx0bGlnaHR1cDogdGhpcy5fZ2V0VmFsaWRNb3Zlcyhwb3NpdGlvbiwgaW5SYW5nZSkubW92YWJsZVRpbGVzLFxuXHRcdFx0c3RyaWtlOiB0aGlzLl9nZXRWYWxpZE1vdmVzKHBvc2l0aW9uLCBpblJhbmdlKS5zdHJpa2FibGVUaWxlc1xuXHRcdH0pXG5cdH0sXG5cblx0X3NldERyYXduVW5pdCh0aWxlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRwZW5kaW5nRHJhdzoge1xuXHRcdFx0XHR1bml0OiB0aWxlLFxuXHRcdFx0XHRjb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcblx0XHRcdFx0c2lkZTogJ2Zyb250J1xuXHRcdFx0fVxuXHRcdH0pXG5cblx0fSxcblxuXHRfZ2V0VmFsaWRNb3Zlcyhwb3NpdGlvbiwgbW92ZXMpIHtcblx0XHRpZiAoIW1vdmVzKSByZXR1cm47XG5cdFx0Y29uc3Qge2NvbG9yOiBwbGF5ZXJDb2xvcn0gPSB0aGlzLnByb3BzO1xuXHRcdGxldCBpblJhbmdlID0gW10sIG1vdmFibGVUaWxlcyA9IHt9LCBzdHJpa2FibGVUaWxlcyA9IHt9LFxuXHRcdFx0cG9zQXJyID0gSlNPTi5wYXJzZShwb3NpdGlvbiksXG5cdFx0XHR0aGVCb2FyZCA9IHBsYXllckNvbG9yID09PSAnYmxhY2snID8gdGhpcy5fcmV2ZXJzZUJvYXJkKCkgOiB0aGlzLnN0YXRlLmJvYXJkO1xuXG5cdFx0Ly8gU3RvcmUgYWxsIHRpbGVzIHdpdGhpbiByYW5nZSBvZiB0aGUgdW5pdCdzIGJlaGF2aW9yXG5cdFx0T2JqZWN0LmtleXMobW92ZXMpLmZvckVhY2gobW92ZSA9PiB7XG5cdFx0XHRsZXQgbW92ZUFyciA9IEpTT04ucGFyc2UobW92ZSksIG1vdmVOYW1lID0gbW92ZXNbbW92ZV0sXG5cdFx0XHRcdC8vICh4LCB5KTogY29vcmRpbmF0ZXMgb2YgdGhlIG1hcmtlZCB0aWxlXG5cdFx0XHRcdHggPSBwb3NBcnJbMF0gKyBtb3ZlQXJyWzBdLCBcblx0XHRcdFx0eSA9IHBvc0FyclsxXSArIG1vdmVBcnJbMV07XG5cblx0XHRcdC8vIHN0cmlrZSBhbmQganVtcCBhcmUgc3RyYWlnaHRmb3J3YXJkOyBzaW1wbHkgc3RvcmUgdGhlIG1hcmtlZCB0aWxlXG5cdFx0XHRpZiAobW92ZU5hbWUgPT09ICdzdHJpa2UnKSBpblJhbmdlLnB1c2goe3g6IHgsIHk6IHksIHR5cGU6ICdzdHJpa2UnfSk7XG5cdFx0XHRlbHNlIGlmIChtb3ZlTmFtZSA9PT0gJ2p1bXAnKSBpblJhbmdlLnB1c2goe3g6IHgsIHk6IHksIHR5cGU6ICdtb3ZlJ30pO1xuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxldCBkZWx0YVggPSBNYXRoLnNpZ24obW92ZUFyclswXSksIFxuXHRcdFx0XHRcdGRlbHRhWSA9IE1hdGguc2lnbihtb3ZlQXJyWzFdKSxcblx0XHRcdFx0XHRpID0gcG9zQXJyWzBdICsgZGVsdGFYLCBcblx0XHRcdFx0XHRqID0gcG9zQXJyWzFdICsgZGVsdGFZO1xuXG5cdFx0XHRcdC8vIGxvb3AgdGhyb3VnaCBhbGwgdGlsZXMgb24gYm9hcmQgaW4gYSBzdHJhaWdodCBwYXRoIGJldHdlZW4gc3RhcnRpbmcgdGlsZSBhbmQgbWFya2VkIHRpbGVcblx0XHRcdFx0d2hpbGUgKHRoaXMuX2lzT25Cb2FyZCh7eDogaSwgeTogan0pKSB7XG5cdFx0XHRcdFx0Ly8gc2xpZGluZyB1bml0cyBjYW4gbGFuZCBvbiBhbnkgdGlsZSB3aXRoaW4gYSBzdHJhaWdodCBwYXRoXG5cdFx0XHRcdFx0Ly8gbm9uLXNsaWRpbmcgdW5pdHMgY2FuIG9ubHkgbGFuZCBvbiB0aGUgbWFya2VkIHRpbGVcblx0XHRcdFx0XHRpZiAobW92ZU5hbWUuaW5jbHVkZXMoJ3NsaWRlJykgfHwgKHggPT09IGkgJiYgeSA9PT0gaikpXG5cdFx0XHRcdFx0XHRpblJhbmdlLnB1c2goe3g6IGksIHk6IGosIHR5cGU6ICdtb3ZlJ30pO1xuXG5cdFx0XHRcdFx0Ly8gaWYgdW5pdCBjYW4ndCBqdW1wIGFuZCB0aGVyZSBpcyBhIHVuaXQgaW4gdGhlIHdheSwgYnJlYWtcblx0XHRcdFx0XHRsZXQgdW5pdEluVGhlV2F5ID0gdGhlQm9hcmRbYFske2l9LCAke2p9XWBdO1xuXHRcdFx0XHRcdGlmICh1bml0SW5UaGVXYXkgJiYgIW1vdmVOYW1lLmluY2x1ZGVzKCdqdW1wJykpIGJyZWFrO1xuXG5cdFx0XHRcdFx0aSArPSBkZWx0YVg7IGogKz0gZGVsdGFZO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBGaWx0ZXIgb3V0IHRpbGVzIHRoYXQgYXJlIG9jY3VwaWVkIGJ5IGFsbGllZCB1bml0cyBvciBub3Qgb24gdGhlIGJvYXJkLFxuXHRcdC8vIHRoZW4gb3JnYW5pemUgYnkgbW92YWJsZSBhbmQgc3RyaWthYmxlIHRpbGVzXG5cdFx0aW5SYW5nZS5maWx0ZXIocmFuZ2UgPT4ge1xuXHRcdFx0bGV0IHRhcmdldFVuaXQgPSB0aGVCb2FyZFtgWyR7cmFuZ2UueH0sICR7cmFuZ2UueX1dYF07XG5cdFx0XHRpZiAodGFyZ2V0VW5pdCAmJiB0aGVCb2FyZFtwb3NpdGlvbl0uY29sb3IgPT09IHRhcmdldFVuaXQuY29sb3IpIHJldHVybiBmYWxzZTtcblx0XHRcdHJldHVybiB0aGlzLl9pc09uQm9hcmQocmFuZ2UpO1xuXHRcdH0pLmZvckVhY2gocmFuZ2UgPT4ge1xuXHRcdFx0aWYgKHJhbmdlLnR5cGUgPT09ICdtb3ZlJykgbW92YWJsZVRpbGVzW2BbJHtyYW5nZS54fSwgJHtyYW5nZS55fV1gXSA9IHRydWU7XG5cdFx0XHRlbHNlIGlmIChyYW5nZS50eXBlID09PSAnc3RyaWtlJykgc3RyaWthYmxlVGlsZXNbYFske3JhbmdlLnh9LCAke3JhbmdlLnl9XWBdID0gdHJ1ZTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB7IG1vdmFibGVUaWxlcywgc3RyaWthYmxlVGlsZXMgfTtcblx0fSxcblxuXHRfaXNPbkJvYXJkKHt4LCB5fSkge1xuXHQgIHJldHVybiB4ID49IDAgJiYgeSA+PSAwICYmIHggPCA2ICYmIHkgPCA2O1xuXHR9LFxuXG5cdF9ydW5DbG9jaygpIHtcblx0ICBjb25zdCB7aW8sIHRva2VuLCBjb2xvcn0gPSB0aGlzLnByb3BzO1xuXG5cdCAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xuXHQgICAgdG9rZW46IHRva2VuLFxuXHQgICAgY29sb3I6IGNvbG9yXG5cdCAgfSk7XG5cdH0sXG5cdF9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSgpIHtcblx0ICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGl0bGUnKVswXTtcblx0ICB0aXRsZS50ZXh0ID0gdGl0bGUudGV4dC5yZXBsYWNlKCcqICcsICcnKTtcblx0ICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XG5cdH1cblxufSk7XG5cblxuY29uc3QgQ2VsbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cblx0fSxcblxuICBcdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdFxuXHR9LFxuXG5cdGNvbXBvbmVudFdpbGxNb3VudCgpIHtcblx0XHRcdFxuXHR9LFxuXG5cdG1peGluczogW10sXG5cblx0X29uQ2xpY2tTcXVhcmUoKSB7XG5cblx0XHRjb25zdCB7dW5pdCwgY29sb3IsIHNldFNlbGVjdGVkLCBsaXR1cCwgc3RyaWthYmxlLCBjYW5Ecm9wLCBzaWRlLCBwbGF5ZXJDb2xvciwgdHVybn0gPSB0aGlzLnByb3BzO1xuXG5cdFx0bGV0IHtwb3NpdGlvbiwgc2VsZWN0ZWR9ID0gdGhpcy5wcm9wcztcblx0XHRcblx0XHQvLyBvbmx5IGxldCB0aGUgcGxheWVyIGFjdCB3aGVuIGl0IGlzIHRoZWlyIHR1cm5cblx0XHRpZiAodHVybiAhPT0gcGxheWVyQ29sb3IuY2hhckF0KDApKSByZXR1cm47XG5cblx0XHQvLyBpZiB0aGVyZSBpcyBubyBjdXJyZW50bHkgc2VsZWN0ZWQgdW5pdCwgY2xpY2sgYSB1bml0IChvZiB0aGUgc2FtZSBjb2xvcikgdG8gc2VsZWN0IGl0XG5cdFx0aWYgKCFzZWxlY3RlZCAmJiB1bml0ICYmIGNvbG9yID09PSBwbGF5ZXJDb2xvcikge1xuXHRcdFx0bGV0IG1vdmVzID0gYmVoYXZpb3JbdW5pdF1bc2lkZV07XG5cdFx0XHRzZXRTZWxlY3RlZChwb3NpdGlvbiwgbW92ZXMpO1xuXHRcdH1cblx0XHQvLyBpZiB0aGVyZSBpcyBjdXJyZW50bHkgYSBzZWxlY3RlZCB1bml0IG9uIHRoZSBib2FyZFxuXHRcdGVsc2Uge1xuXHRcdFx0Ly8gd2hlbiBlbWl0dGluZyBhIG1vdmUgZXZlbnQsIHNlbmQgdGhlIFwicmVhbFwiIHBvc2l0aW9uIChpLmUuIGlmIGJsYWNrLCB0aGUgcmV2ZXJzZSBvZiB0aGUgcmVuZGVyZWQgdmlldykgXG5cdFx0XHRpZiAocGxheWVyQ29sb3IgPT09ICdibGFjaycpIHtcblx0XHRcdFx0cG9zaXRpb24gPSB0aGlzLl9yZXZlcnNlUG9zaXRpb24ocG9zaXRpb24pO1xuXHRcdFx0XHRzZWxlY3RlZCA9IHRoaXMuX3JldmVyc2VQb3NpdGlvbihzZWxlY3RlZCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGNhbiBkbyBvbmUgb2YgdGhlIGZvbGxvd2luZzpcblxuXHRcdFx0Ly8gMS4gbW92ZSB0byBhIHRpbGUgZ2xvd2luZyByZWRcblx0XHRcdGlmICh0aGlzLnByb3BzLmxpdHVwKSB7XG5cdFx0XHRcdGxldCBjYXB0dXJlID0gdW5pdCAmJiBjb2xvciAhPT0gcGxheWVyQ29sb3I7XG5cdFx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKHNlbGVjdGVkLCBwb3NpdGlvbiwgY2FwdHVyZSwgJ21vdmUnLCB0cnVlKTtcblx0XHRcdFx0c2V0U2VsZWN0ZWQobnVsbCwgW10pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAyLiBhdHRhY2sgYSB1bml0IG9uIGEgdGlsZSBnbG93aW5nIHllbGxvdywgd2l0aG91dCBtb3Zpbmdcblx0XHRcdGVsc2UgaWYgKHRoaXMucHJvcHMuc3RyaWthYmxlICYmIHVuaXQgJiYgY29sb3IgIT09IHBsYXllckNvbG9yKSB7XG5cdFx0XHRcdEdhbWVBY3Rpb25zLm1ha2VNb3ZlKHNlbGVjdGVkLCBwb3NpdGlvbiwgdHJ1ZSwgJ3N0cmlrZScsIHRydWUpO1xuXHRcdFx0XHRzZXRTZWxlY3RlZChudWxsLCBbXSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIDMuIGRlc2VsZWN0IHRoZSBjdXJyZW50IHVuaXQgYnkgY2xpY2tpbmcgb24gaXRcblx0XHRcdGVsc2UgaWYgKHNlbGVjdGVkID09PSBwb3NpdGlvbikge1xuXHRcdFx0XHRzZXRTZWxlY3RlZChudWxsLCBbXSk7XG5cdFx0XHR9XG5cdFx0fVx0XHRcblx0fSxcblxuXHRfb25EcmFnU3RhcnQoZSkge1xuXHRcdGNvbnN0IHt1bml0LCBwb3NpdGlvbiwgY29sb3IsIHNlbGVjdGVkLCBzZXRTZWxlY3RlZCwgbGl0dXAsIHN0cmlrYWJsZSwgc2lkZSwgY2FuRHJvcCwgcGxheWVyQ29sb3IsIHR1cm59ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHVybiAhPT0gcGxheWVyQ29sb3IuY2hhckF0KDApKSByZXR1cm47XG5cblx0XHRlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuXHRcdGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCAnJyk7XG5cblx0XHRpZiAoIXNlbGVjdGVkICYmIHVuaXQgJiYgY29sb3IgPT09IHBsYXllckNvbG9yKSB7XG5cdFx0XHRsZXQgbW92ZXMgPSBiZWhhdmlvclt1bml0XVtzaWRlXTtcblx0XHRcdHNldFNlbGVjdGVkKHBvc2l0aW9uLCBtb3Zlcyk7XG5cdFx0fVxuXHR9LFxuXHRfb25EcmFnT3ZlcihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG5cdH0sXG5cdF9vbkRyb3AoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGNvbnN0IHt1bml0LCBjb2xvciwgc2V0U2VsZWN0ZWQsIHNldERyb3BwYWJsZSwgc2V0RHJhd2FibGUsIGxpdHVwLCBzdHJpa2FibGUsIGNhbkRyb3AsIHNpZGUsIHBsYXllckNvbG9yLCBwZW5kaW5nRHJhd30gPSB0aGlzLnByb3BzO1xuXHRcdGxldCB7cG9zaXRpb24sIHNlbGVjdGVkfSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAocGxheWVyQ29sb3IgPT09ICdibGFjaycpIHtcblx0XHRcdGlmIChwb3NpdGlvbikgcG9zaXRpb24gPSB0aGlzLl9yZXZlcnNlUG9zaXRpb24ocG9zaXRpb24pO1xuXHRcdFx0aWYgKHNlbGVjdGVkKSBzZWxlY3RlZCA9IHRoaXMuX3JldmVyc2VQb3NpdGlvbihzZWxlY3RlZCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnByb3BzLmxpdHVwKSB7XG5cdFx0XHRsZXQgY2FwdHVyZSA9IHVuaXQgJiYgY29sb3IgIT09IHBsYXllckNvbG9yO1xuXHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQsIHBvc2l0aW9uLCBjYXB0dXJlLCAnbW92ZScsIHRydWUpO1xuXHRcdH1cdFx0XG5cdFx0ZWxzZSBpZiAodGhpcy5wcm9wcy5zdHJpa2FibGUgJiYgdW5pdCl7XG5cdFx0XHRHYW1lQWN0aW9ucy5tYWtlTW92ZShzZWxlY3RlZCwgcG9zaXRpb24sIHRydWUsICdzdHJpa2UnLCB0cnVlKTtcblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLnByb3BzLmNhbkRyb3Ape1xuXHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUocGVuZGluZ0RyYXcsIHBvc2l0aW9uLCBmYWxzZSwgJ21vdmUnLCB0cnVlKTtcblx0XHR9XG5cdFx0c2V0U2VsZWN0ZWQobnVsbCwgW10pO1xuXG5cdH0sXG5cblx0X3JldmVyc2VQb3NpdGlvbihwb3MpIHtcblx0XHRsZXQgcG9zQXJyID0gSlNPTi5wYXJzZShwb3MpO1xuXHRcdHJldHVybiBgWyR7NS1wb3NBcnJbMF19LCAkezUtcG9zQXJyWzFdfV1gO1xuXHR9LFxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHt1bml0LCBjb2xvciwgbGl0dXAsIHN0cmlrYWJsZSwgY2FuRHJvcCwgc2lkZSwgcGxheWVyQ29sb3J9ID0gdGhpcy5wcm9wcztcblx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2N4KHtcblx0XHRcdFx0XHRjZWxsQ29udGFpbmVyOiB0cnVlLFxuXHRcdFx0XHRcdFtzaWRlXTogdHJ1ZVxuXHRcdFx0XHR9KX1cblx0XHRcdFx0b25EcmFnT3Zlcj17dGhpcy5fb25EcmFnT3Zlcn1cblx0XHRcdFx0b25Ecm9wPXt0aGlzLl9vbkRyb3B9XG5cdFx0XHQ+XG5cdFx0XHRcdFx0PGEgY2xhc3NOYW1lPXtjeCh7XG5cdFx0XHRcdFx0XHRcdHVuaXQ6ICEhdW5pdCxcblx0XHRcdFx0XHRcdFx0bGl0dXA6IGxpdHVwLFxuXHRcdFx0XHRcdFx0XHRzdHJpa2FibGU6IHN0cmlrYWJsZSxcblx0XHRcdFx0XHRcdFx0Y2FuRHJvcDogY2FuRHJvcCxcblx0XHRcdFx0XHRcdFx0b3Bwb25lbnQ6IGNvbG9yICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcixcblx0XHRcdFx0XHRcdFx0W3NpZGVdOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRbdW5pdF06IHRydWUsXG5cdFx0XHRcdFx0XHRcdFtjb2xvcl06IHRydWUsXG5cdFx0XHRcdFx0XHR9KX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuX29uQ2xpY2tTcXVhcmV9XG5cdFx0XHRcdFx0XHRvbkRyYWdTdGFydD17dGhpcy5fb25EcmFnU3RhcnR9XG5cdFx0XHRcdFx0XHRkcmFnZ2FibGUgLz5cblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1wiZnJvbnQtZmFjZVwiOiB0cnVlLCBvcHBvbmVudDogY29sb3IgJiYgY29sb3IgIT09IHBsYXllckNvbG9yfSl9IC8+XG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcImJhY2stZmFjZVwiOiB0cnVlLCBvcHBvbmVudDogY29sb3IgJiYgY29sb3IgIT09IHBsYXllckNvbG9yfSl9IC8+XG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9XCJsZWZ0LWZhY2VcIiAvPlxuXHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPVwicmlnaHQtZmFjZVwiIC8+XG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9XCJ0b3AtZmFjZVwiIC8+XG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9XCJib3R0b20tZmFjZVwiIC8+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdCk7XG5cdH1cblxufSk7XG5cbmNvbnN0IERyYXduQ29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6IHtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICBcdCByZXR1cm4ge1xuICAgIFx0IFx0Ly9zaWRlOiAnZnJvbnQnLFxuICAgIFx0IFx0ZHJhd246IG51bGxcbiAgICBcdCB9O1xuICBcdH0sXG4gIFx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cblx0XHRcblx0fSxcblxuXHRjb21wb25lbnRXaWxsTW91bnQoKSB7XG5cdFx0XG5cdFxuXHR9LFxuXG5cdG1peGluczogW10sXG5cblxuXHRfb25EcmFnU3RhcnQoZSkge1xuXHRcdGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG5cdFx0ZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsICcnKTtcblxuXHRcdGNvbnN0IHt1bml0LCBwb3NpdGlvbiwgY29sb3IsIHNpZGV9ID0gdGhpcy5wcm9wcztcblx0fSxcblx0X29uRHJhZ092ZXIoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuXHR9LFxuXG5cdHJlbmRlcigpe1xuXHRcdHZhciB7dW5pdCwgY29sb3IsIHNpZGUsIGRyYWdnYWJsZSwgZHJhd0FVbml0LCBwb3NpdGlvbiwgcGxheWVyQ29sb3J9ID0gdGhpcy5wcm9wcztcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGlkPVwiZHJhd25Vbml0XCIgZHJhZ2dhYmxlIFxuXHRcdFx0XHRjbGFzc05hbWU9e2N4KHtcdFxuXHRcdFx0XHRcdGNlbGxDb250YWluZXI6IHRydWUsXG5cdFx0XHRcdFx0W3VuaXRdOiB0cnVlLFxuXHRcdFx0XHRcdFtjb2xvcl06IHRydWUsXG5cdFx0XHRcdFx0W3NpZGVdOiB0cnVlXG5cdFx0XHRcdH0pfSA+XG5cdFx0XHRcdFx0PGEgY2xhc3NOYW1lPXtjeCh7XG5cdFx0XHRcdFx0XHRcdHVuaXQ6ICEhdW5pdCxcblx0XHRcdFx0XHRcdFx0b3Bwb25lbnQ6IGNvbG9yICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcixcblx0XHRcdFx0XHRcdFx0W3NpZGVdOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRbdW5pdF06IHRydWUsXG5cdFx0XHRcdFx0XHRcdFtjb2xvcl06IHRydWUsXG5cdFx0XHRcdFx0XHR9KX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2RyYXdBVW5pdH1cblx0XHRcdFx0XHRcdC8vIG9uRHJhZ1N0YXJ0PXt0aGlzLl9vbkRyYWdTdGFydH1cblx0XHRcdFx0XHRcdGRyYWdnYWJsZT5cblx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcImZyb250LWZhY2VcIjogdHJ1ZSwgXCJkcmF3LXByZXZpZXdcIjogdHJ1ZSwgb3Bwb25lbnQ6IGNvbG9yICYmIGNvbG9yICE9PSBwbGF5ZXJDb2xvcn0pfSAvPlxuXHRcdFx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPXtjeCh7XCJiYWNrLWZhY2VcIjogdHJ1ZSwgXCJkcmF3LXByZXZpZXdcIjogdHJ1ZSwgIG9wcG9uZW50OiBjb2xvciAmJiBjb2xvciAhPT0gcGxheWVyQ29sb3J9KX0gLz5cblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1wibGVmdC1mYWNlXCI6IHRydWUsIFwiZHJhdy1wcmV2aWV3XCI6IHRydWV9KX0gLz5cblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1wicmlnaHQtZmFjZVwiOiB0cnVlLCBcImRyYXctcHJldmlld1wiOiB0cnVlfSl9IC8+XG5cdFx0XHRcdFx0PGZpZ3VyZSBjbGFzc05hbWU9e2N4KHtcInRvcC1mYWNlXCI6IHRydWUsIFwiZHJhdy1wcmV2aWV3XCI6IHRydWV9KX0gLz5cblx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3goe1wiYm90dG9tLWZhY2VcIjogdHJ1ZSwgXCJkcmF3LXByZXZpZXdcIjogdHJ1ZX0pfSAvPlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0KTtcblx0XHR9XG5cblx0fSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtCb2FyZDogR2FtZUJvYXJkLCBDZWxsOiBDZWxsLCBEcmF3bkNvbXBvbmVudDogRHJhd25Db21wb25lbnR9OyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgQ2xvY2sgZnJvbSAnLi9DbG9jayc7XG5pbXBvcnQgQ2hhdFN0b3JlIGZyb20gJy4uL3N0b3Jlcy9DaGF0U3RvcmUnO1xuaW1wb3J0IENoYXRBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvQ2hhdEFjdGlvbnMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5jb25zdCBHYW1lSGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBwYXJhbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIG9wZW5Nb2RhbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBnYW1lT3ZlcjogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW5dLFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4gb21pdChDaGF0U3RvcmUuZ2V0U3RhdGUoKSwgJ21lc3NhZ2VzJyk7XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIENoYXRTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25DaGF0Q2hhbmdlKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgQ2hhdFN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25DaGF0Q2hhbmdlKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zLCBnYW1lT3ZlciwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHVuc2VlbkNvdW50ID0gdGhpcy5zdGF0ZS51bnNlZW5Db3VudDtcblxuICAgIHJldHVybiAoXG4gICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XG5cbiAgICAgICAgPENsb2NrXG4gICAgICAgICAgaW89e2lvfVxuICAgICAgICAgIHBhcmFtcz17cGFyYW1zfSAvPlxuXG4gICAgICAgIDxzcGFuIGlkPVwiZ2FtZS10eXBlXCI+XG4gICAgICAgICAge2Ake3BhcmFtc1sxXX18JHtwYXJhbXNbMl19YH1cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0blwiIGhyZWY9XCIvXCI+TmV3IGdhbWU8L2E+XG5cbiAgICAgICAgeyFnYW1lT3ZlciAmJiBpc09wcG9uZW50QXZhaWxhYmxlID9cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4gYnRuLS1yZWQgcmVzaWduXCJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5fb25SZXNpZ259PlxuICAgICAgICAgICAgUmVzaWduXG4gICAgICAgICAgPC9hPlxuICAgICAgICA6Z2FtZU92ZXIgP1xuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tLXJlZCByZW1hdGNoXCJcbiAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9vblJlbWF0Y2h9PlxuICAgICAgICAgICAgUmVtYXRjaFxuICAgICAgICAgIDwvYT5cbiAgICAgICAgOm51bGx9XG5cbiAgICAgICAgPGEgaWQ9XCJjaGF0LWljb25cIlxuICAgICAgICAgICBvbkNsaWNrPXtDaGF0QWN0aW9ucy50b2dnbGVWaXNpYmlsaXR5fT5cbiAgICAgICAgICB7dW5zZWVuQ291bnQgP1xuICAgICAgICAgICAgPHNwYW4gaWQ9XCJjaGF0LWNvdW50ZXJcIj5cbiAgICAgICAgICAgICAge3Vuc2VlbkNvdW50IDwgOSA/IHVuc2VlbkNvdW50IDogJzkrJ31cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA6bnVsbH1cbiAgICAgICAgICA8aW1nIHNyYz1cIi9pbWcvY2hhdC5zdmdcIlxuICAgICAgICAgICAgICAgd2lkdGg9XCI1MFwiXG4gICAgICAgICAgICAgICBoZWlnaHQ9XCI1MFwiIC8+XG4gICAgICAgICAgQ2hhdFxuICAgICAgICA8L2E+XG4gICAgICA8L2hlYWRlcj5cbiAgICApO1xuICB9LFxuICBfb25DaGF0Q2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUob21pdChDaGF0U3RvcmUuZ2V0U3RhdGUoKSwgJ21lc3NhZ2VzJykpO1xuICB9LFxuICBfb25SZXNpZ24oKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXMsIGNvbG9yfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpby5lbWl0KCdyZXNpZ24nLCB7XG4gICAgICB0b2tlbjogcGFyYW1zWzBdLFxuICAgICAgY29sb3I6IGNvbG9yXG4gICAgfSk7XG4gIH0sXG4gIF9vblJlbWF0Y2goKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXMsIG9wZW5Nb2RhbCwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCFpc09wcG9uZW50QXZhaWxhYmxlKSB7XG4gICAgICBvcGVuTW9kYWwoJ2luZm8nLCAnWW91ciBvcHBvbmVudCBoYXMgZGlzY29ubmVjdGVkLiBZb3UgbmVlZCB0byAnICtcbiAgICAgICAgJ2dlbmVyYXRlIGEgbmV3IGxpbmsuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaW8uZW1pdCgncmVtYXRjaC1vZmZlcicsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF1cbiAgICB9KTtcbiAgICBvcGVuTW9kYWwoJ2luZm8nLCAnWW91ciBvZmZlciBoYXMgYmVlbiBzZW50LicpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZUhlYWRlcjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVIZWFkZXIgZnJvbSAnLi9HYW1lSGVhZGVyJztcbmltcG9ydCBDaGF0IGZyb20gJy4vQ2hhdCc7XG5pbXBvcnQgTW9kYWwgZnJvbSAnLi9Nb2RhbCc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IENoZXNzYm9hcmRJbnRlcmZhY2UgZnJvbSAnLi9DaGVzc2JvYXJkSW50ZXJmYWNlJztcbmltcG9ydCBHYW1lYm9hcmRJbnRlcmZhY2UgZnJvbSAnLi9HYW1lYm9hcmRJbnRlcmZhY2UnO1xuaW1wb3J0IHtNYXB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQge0JvYXJkfSBmcm9tICcuL0dhbWVCb2FyZCc7XG5cbmNvbnN0IEdhbWVJbnRlcmZhY2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHBhcmFtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbiAgfSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IGZhbHNlLFxuICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICBtb2RhbDogTWFwKHtcbiAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgIGhpZGU6IHRoaXMuX2hpZGVNb2RhbCxcbiAgICAgICAgICBhY2NlcHQ6IHRoaXMuX2FjY2VwdFJlbWF0Y2gsXG4gICAgICAgICAgZGVjbGluZTogdGhpcy5fZGVjbGluZVJlbWF0Y2hcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBnYW1lT3ZlcjogR2FtZVN0b3JlLmdldFN0YXRlKCkuZ2FtZU92ZXJcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtc30gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8ub24oJ3Rva2VuLWludmFsaWQnLCAoKSA9PiB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1vZGFsOiB0aGlzLnN0YXRlLm1vZGFsXG4gICAgICAgIC5zZXQoJ29wZW4nLCB0cnVlKVxuICAgICAgICAuc2V0KCdtZXNzYWdlJywgJ0dhbWUgbGluayBpcyBpbnZhbGlkIG9yIGhhcyBleHBpcmVkLicpXG4gICAgICAgIC5zZXQoJ3R5cGUnLCAnaW5mbycpXG4gICAgfSkpO1xuXG4gICAgaW8uZW1pdCgnam9pbicsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICB0aW1lOiBwYXJhbXNbMV0gKiA2MCxcbiAgICAgIGluYzogcGFyYW1zWzJdXG4gICAgfSk7XG5cbiAgICBpby5vbignam9pbmVkJywgZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5jb2xvciA9PT0gJ2JsYWNrJykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb2xvcjogJ2JsYWNrJ30pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaW8ub24oJ2JvdGgtam9pbmVkJywgKCkgPT5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzT3Bwb25lbnRBdmFpbGFibGU6IHRydWV9LCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbG9yID09PSAnd2hpdGUnKSB7XG4gICAgICAgICAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xuICAgICAgICAgICAgdG9rZW46IHBhcmFtc1swXSxcbiAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcblxuICAgIGlvLm9uKCdmdWxsJywgKCkgPT4ge1xuICAgICAgd2luZG93LmFsZXJ0KFxuICAgICAgICAnVGhpcyBnYW1lIGFscmVhZHkgaGFzIHR3byBwbGF5ZXJzLiBZb3UgaGF2ZSB0byBjcmVhdGUgYSBuZXcgb25lLicpO1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gJy8nO1xuICAgIH0pO1xuXG4gICAgaW8ub24oJ3BsYXllci1yZXNpZ25lZCcsIGRhdGEgPT4ge1xuICAgICAgR2FtZUFjdGlvbnMuZ2FtZU92ZXIoe1xuICAgICAgICB0eXBlOiAncmVzaWduJyxcbiAgICAgICAgd2lubmVyOiBkYXRhLmNvbG9yID09PSAnYmxhY2snID8gJ1doaXRlJyA6ICdCbGFjaydcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtb2ZmZXJlZCcsICgpID0+XG4gICAgICB0aGlzLl9vcGVuTW9kYWwoJ29mZmVyJywgJ1lvdXIgb3Bwb25lbnQgaGFzIHNlbnQgeW91IGEgcmVtYXRjaCBvZmZlci4nKSk7XG5cbiAgICBpby5vbigncmVtYXRjaC1kZWNsaW5lZCcsICgpID0+XG4gICAgICB0aGlzLl9vcGVuTW9kYWwoJ2luZm8nLCAnUmVtYXRjaCBvZmZlciBoYXMgYmVlbiBkZWNsaW5lZC4nKSk7XG5cbiAgICBpby5vbigncmVtYXRjaC1hY2NlcHRlZCcsICgpID0+IHtcbiAgICAgIEdhbWVBY3Rpb25zLnJlbWF0Y2goKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb2xvcjogdGhpcy5zdGF0ZS5jb2xvciA9PT0gJ3doaXRlJyA/ICdibGFjaycgOiAnd2hpdGUnLFxuICAgICAgICBtb2RhbDogdGhpcy5zdGF0ZS5tb2RhbC5zZXQoJ29wZW4nLCBmYWxzZSlcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29sb3IgPT09ICd3aGl0ZScpIHtcbiAgICAgICAgICBpby5lbWl0KCdjbG9jay1ydW4nLCB7XG4gICAgICAgICAgICB0b2tlbjogdGhpcy5wcm9wcy5wYXJhbXNbMF0sXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlvLm9uKCdvcHBvbmVudC1kaXNjb25uZWN0ZWQnLCAoKSA9PiAge1xuICAgICAgaWYgKCF0aGlzLnN0YXRlLmdhbWVPdmVyLmdldCgnc3RhdHVzJykpIHtcbiAgICAgICAgdGhpcy5fb3Blbk1vZGFsKCdpbmZvJywgJ1lvdXIgb3Bwb25lbnQgaGFzIGRpc2Nvbm5lY3RlZC4nKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNPcHBvbmVudEF2YWlsYWJsZTogZmFsc2V9KTtcbiAgICB9KTtcblxuICAgIEdhbWVTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgR2FtZVN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcbiAgfSxcblxuXG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7Y29sb3IsIGdhbWVPdmVyLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgY29tbW9uUHJvcHMgPSB7XG4gICAgICBpbzogaW8sXG4gICAgICBjb2xvcjogY29sb3IsXG4gICAgICBvcGVuTW9kYWw6IHRoaXMuX29wZW5Nb2RhbCxcbiAgICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IGlzT3Bwb25lbnRBdmFpbGFibGVcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxHYW1lSGVhZGVyXG4gICAgICAgICAgey4uLmNvbW1vblByb3BzfVxuICAgICAgICAgIHBhcmFtcz17cGFyYW1zfVxuICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlci5nZXQoJ3N0YXR1cycpfSAvPlxuXG4gICAgICAgIDxDaGF0XG4gICAgICAgICAgey4uLmNvbW1vblByb3BzfVxuICAgICAgICAgIHRva2VuPXtwYXJhbXNbMF19IC8+XG5cbiAgICAgICAgICA8R2FtZWJvYXJkSW50ZXJmYWNlIFxuICAgICAgICAgICAgey4uLmNvbW1vblByb3BzfVxuICAgICAgICAgICAgdG9rZW49e3BhcmFtc1swXX1cbiAgICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlcn0gLz5cblxuICAgICAgICA8TW9kYWwgZGF0YT17dGhpcy5zdGF0ZS5tb2RhbH0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cblxuXG5cbiAgX29uR2FtZUNoYW5nZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtnYW1lT3ZlcjogR2FtZVN0b3JlLmdldFN0YXRlKCkuZ2FtZU92ZXJ9KTtcbiAgfSxcbiAgX29wZW5Nb2RhbCh0eXBlLCBtZXNzYWdlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb2RhbDogdGhpcy5zdGF0ZS5tb2RhbFxuICAgICAgICAuc2V0KCdvcGVuJywgdHJ1ZSlcbiAgICAgICAgLnNldCgnbWVzc2FnZScsIG1lc3NhZ2UpXG4gICAgICAgIC5zZXQoJ3R5cGUnLCB0eXBlKVxuICAgIH0pO1xuICB9LFxuICBfaGlkZU1vZGFsKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21vZGFsOiB0aGlzLnN0YXRlLm1vZGFsLnNldCgnb3BlbicsIGZhbHNlKX0pO1xuICB9LFxuICBfYWNjZXB0UmVtYXRjaCgpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtc30gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8uZW1pdCgncmVtYXRjaC1hY2NlcHQnLCB7XG4gICAgICB0b2tlbjogcGFyYW1zWzBdLFxuICAgICAgdGltZTogcGFyYW1zWzFdICogNjAsXG4gICAgICBpbmM6IHBhcmFtc1syXVxuICAgIH0pO1xuICAgIHRoaXMuX2hpZGVNb2RhbCgpO1xuICB9LFxuICBfZGVjbGluZVJlbWF0Y2goKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXN9ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLmVtaXQoJ3JlbWF0Y2gtZGVjbGluZScsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF1cbiAgICB9KTtcbiAgICB0aGlzLl9oaWRlTW9kYWwoKTtcbiAgfSxcbiAgX3RvZ2dsZVNvdW5kcyhlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzb3VuZHNFbmFibGVkOiAhdGhpcy5zdGF0ZS5zb3VuZHNFbmFibGVkXG4gICAgfSk7XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZUludGVyZmFjZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XG5pbXBvcnQgQ2hlc3Nib2FyZCBmcm9tICcuL0NoZXNzYm9hcmQnO1xuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi9HYW1lQm9hcmQnO1xuaW1wb3J0IENhcHR1cmVkUGllY2VzIGZyb20gJy4vQ2FwdHVyZWRQaWVjZXMnO1xuaW1wb3J0IFRhYmxlT2ZNb3ZlcyBmcm9tICcuL1RhYmxlT2ZNb3Zlcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbi8qIHRoZSBzdGF0ZSBvZiB0aGUgZ2FtZWJvYXJkIGlzIG1hbmFnZWQgYnkgR2FtZVN0b3JlICovXG5cbmNvbnN0IEdhbWVib2FyZEludGVyZmFjZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRwcm9wVHlwZXM6IHtcblxuXHR9LFxuXHRtaXhpbnM6IFtvbkdhbWVDaGFuZ2VdLFx0XHQvLyB0aGlzIG1peGluIGlzIHJlc3BvbnNpYmxlIGZvciBkeW5hbWljYWxseSBjaGFuZ2luZyB0aGUgc3RhdGUgb2YgR2FtZWJvYXJkSW50ZXJmYWNlXG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcblx0XHRyZXR1cm4gR2FtZVN0b3JlLmdldFN0YXRlKCk7XG5cdH0sXG5cdGdldERlZmF1bHRQcm9wcygpIHtcblxuXHR9LFxuXHRjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG5cblx0fSxcblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtwcm9tb3Rpb24sIHR1cm4sIGdhbWVPdmVyLCBjaGVja30gPSB0aGlzLnN0YXRlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgaWQ9XCJib2FyZC1tb3Zlcy13cmFwcGVyXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cblx0XHRcdFx0PGRpdiBpZD1cImJvYXJkLXdyYXBwZXJcIj5cblxuXHRcdFx0XHRcdDxwPkltIHt0aGlzLnByb3BzLmNvbG9yfTwvcD5cblx0XHRcdFx0XHQ8Q2FwdHVyZWRQaWVjZXMgLz5cblxuXHRcdFx0XHRcdDxCb2FyZCBzaXplPXs2fVxuXHRcdFx0XHRcdFx0ey4uLm9taXQodGhpcy5wcm9wcywgJ2dhbWVPdmVyJyl9XG5cdFx0XHRcdFx0XHRnYW1lT3Zlcj17Z2FtZU92ZXIuZ2V0KCdzdGF0dXMnKX0gLz5cblxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJmZWVkYmFja1wiPlxuXHRcdFx0XHRcdHshZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSA/XG5cdFx0XHRcdFx0XHQ8c3Bhbj5cblx0XHRcdFx0XHRcdFx0e2Ake3R1cm49PT0ndycgPyAnV2hpdGUnIDogJ0JsYWNrJ30gdG8gbW92ZS5gfVxuXHRcdFx0XHRcdFx0PC9zcGFuPiA6XG5cdFx0XHRcdFx0XHQ8c3Ryb25nPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+XG5cdFx0XHRcdFx0XHRcdCAge2dhbWVPdmVyLmdldCgnd2lubmVyJykgPT09ICdXaGl0ZScgPyAnRicgOiAnZid9XG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0e3RoaXMuX2dldEdhbWVPdmVyTWVzc2FnZSgpfVxuXHRcdFx0XHRcdFx0PC9zdHJvbmc+XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L3NwYW4+XG5cblx0XHRcdDxidXR0b24gY2xhc3NOYW1lPVwiYnRuXCI+ZG9uYXRlPC9idXR0b24+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH0sXG5cblx0X29uR2FtZUNoYW5nZSgpIHtcblx0XHR0aGlzLnNldFN0YXRlKEdhbWVTdG9yZS5nZXRTdGF0ZSgpKTtcblx0fSxcblxuXHRfZ2V0R2FtZU92ZXJNZXNzYWdlKCkge1xuXHRcdHJldHVybiBgeW91IGxvc2VgO1xuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmRJbnRlcmZhY2U7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY29uc3QgTW9kYWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbl0sXG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IGlzT3BlbiA9IHRoaXMucHJvcHMuZGF0YS5nZXQoJ29wZW4nKTtcblxuICAgIGlmIChpc09wZW4pXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlkb3duKTtcbiAgICBlbHNlXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlkb3duKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnByb3BzLmRhdGE7XG4gICAgY29uc3QgdHlwZSA9IGRhdGEuZ2V0KCd0eXBlJyk7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gZGF0YS5nZXQoJ2NhbGxiYWNrcycpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgJ21vZGFsLW1hc2snOiB0cnVlLFxuICAgICAgICAgICAgICdoaWRkZW4nOiAhZGF0YS5nZXQoJ29wZW4nKVxuICAgICAgICAgICB9KX1cbiAgICAgICAgICAgb25DbGljaz17dGhpcy5faGlkZU1vZGFsfT5cbiAgICAgICAgPHA+XG4gICAgICAgICAgPHN0cm9uZz5Fc2M6IDwvc3Ryb25nPlxuICAgICAgICAgIDxzcGFuPnt0eXBlID09PSAnaW5mbycgPyAnT0snIDogJ0RlY2xpbmUnfTwvc3Bhbj5cbiAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICA8c3Ryb25nPkVudGVyOiA8L3N0cm9uZz5cbiAgICAgICAgICA8c3Bhbj57dHlwZSA9PT0gJ2luZm8nID8gJ09LJyA6ICdBY2NlcHQnfTwvc3Bhbj5cbiAgICAgICAgPC9wPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIlxuICAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX0+XG4gICAgICAgICAgPHA+e2RhdGEuZ2V0KCdtZXNzYWdlJyl9PC9wPlxuXG4gICAgICAgICAge3R5cGUgPT09ICdpbmZvJyA/IFxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIG9rXCJcbiAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NhbGxiYWNrcy5oaWRlfT5cbiAgICAgICAgICAgICAgT0tcbiAgICAgICAgICAgIDwvYT4gOiBbXG5cbiAgICAgICAgICAgIDxhIGtleT1cImFcIlxuICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuXCJcbiAgICAgICAgICAgICAgIHN0eWxlPXt7bGVmdDogJzRlbSd9fVxuICAgICAgICAgICAgICAgb25DbGljaz17Y2FsbGJhY2tzLmFjY2VwdH0+XG4gICAgICAgICAgICAgIEFjY2VwdFxuICAgICAgICAgICAgPC9hPixcbiAgICAgICAgICAgIDxhIGtleT1cImJcIlxuICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi0tcmVkXCJcbiAgICAgICAgICAgICAgIHN0eWxlPXt7cmlnaHQ6ICc0ZW0nfX1cbiAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NhbGxiYWNrcy5kZWNsaW5lfT5cbiAgICAgICAgICAgICAgRGVjbGluZVxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIF19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgX29uS2V5ZG93bihlKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMucHJvcHMuZGF0YS5nZXQoJ3R5cGUnKTtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCdjYWxsYmFja3MnKTtcblxuICAgIGlmICh0eXBlID09PSAnaW5mbycpIHtcbiAgICAgIGlmIChlLndoaWNoID09PSAxMyB8fCBlLndoaWNoID09PSAyNykge1xuICAgICAgICBjYWxsYmFja3MuaGlkZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29mZmVyJykge1xuICAgICAgaWYgKGUud2hpY2ggPT09IDEzKSB7XG4gICAgICAgIGNhbGxiYWNrcy5hY2NlcHQoKTtcbiAgICAgIH0gZWxzZSBpZiAoZS53aGljaCA9PT0gMjcpIHtcbiAgICAgICAgY2FsbGJhY2tzLmRlY2xpbmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIF9oaWRlTW9kYWwoKSB7XG4gICAgdGhpcy5wcm9wcy5kYXRhLmdldCgnY2FsbGJhY2tzJykuaGlkZSgpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuXG5jb25zdCBUYWJsZU9mTW92ZXMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluLCBvbkdhbWVDaGFuZ2VdLFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbW92ZXM6IEdhbWVTdG9yZS5nZXRNb3ZlcygpXG4gICAgfTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dGFibGUgaWQ9XCJtb3Zlc1wiIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XG4gICAgICAgIDx0aGVhZD5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGg+VGFibGUgb2YgbW92ZXM8L3RoPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGhlYWQ+XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5tb3Zlcy5tYXAoKHJvdywgaSkgPT4gKFxuICAgICAgICAgICAgPHRyIGtleT17aX0+XG4gICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPntgJHtpICsgMX0uYH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAge3Jvdy5tYXAoKG1vdmUsIGopID0+IChcbiAgICAgICAgICAgICAgICA8dGQga2V5PXtqfT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPnttb3ZlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICApKS50b0FycmF5KCl9XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICkpLnRvQXJyYXkoKX1cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvdGFibGU+XG4gICAgKTtcbiAgfSxcbiAgX29uR2FtZUNoYW5nZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1vdmVzOiBHYW1lU3RvcmUuZ2V0TW92ZXMoKVxuICAgIH0pO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgVGFibGVPZk1vdmVzOyIsImltcG9ydCBrZXlNaXJyb3IgZnJvbSAncmVhY3QvbGliL2tleU1pcnJvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGtleU1pcnJvcih7XG4gIFRPR0dMRV9WSVNJQklMSVRZOiBudWxsLFxuICBTVUJNSVRfTUVTU0FHRTogbnVsbFxufSk7IiwiY29uc3QgQ2hlc3NQaWVjZXMgPSB7XG4gIC8vIGtleTogcGllY2UgZnJvbSBGRU4sIHZhbHVlOiBwaWVjZSBmcm9tIFNtYXJ0IFJlZ3VsYXIgY2hlc3MgZm9udFxuICAvLyB3aGl0ZSBwaWVjZXNcbiAgJ0snOiAnRicsXG4gICdRJzogJ0UnLFxuICAnUic6ICdEJyxcbiAgJ0InOiAnQycsXG4gICdOJzogJ0InLFxuICAnUCc6ICdBJyxcbiAgLy8gYmxhY2sgcGllY2VzXG4gICdrJzogJ2YnLFxuICAncSc6ICdlJyxcbiAgJ3InOiAnZCcsXG4gICdiJzogJ2MnLFxuICAnbic6ICdiJyxcbiAgJ3AnOiAnYScsXG4gIC8vIGVtcHR5IHNxdWFyZVxuICAnLSc6IHVuZGVmaW5lZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hlc3NQaWVjZXM7IiwiaW1wb3J0IGtleU1pcnJvciBmcm9tICdyZWFjdC9saWIva2V5TWlycm9yJztcblxuZXhwb3J0IGRlZmF1bHQga2V5TWlycm9yKHtcbiAgTUFLRV9NT1ZFOiBudWxsLFxuICBTSE9XX01PVkVTOiBudWxsLFxuICBSRU1BVENIOiBudWxsLFxuICBEUkFXOiBudWxsLFxuICBHQU1FX09WRVI6IG51bGwsXG4gIENIQU5HRV9QUk9NT1RJT046IG51bGxcbn0pOyIsImltcG9ydCB7RGlzcGF0Y2hlcn0gZnJvbSAnZmx1eCc7XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24obmV3IERpc3BhdGNoZXIoKSwge1xuICAvLyBAcGFyYW0ge29iamVjdH0gYWN0aW9uIFRoZSBkYXRhIGNvbWluZyBmcm9tIHRoZSB2aWV3LlxuICBoYW5kbGVWaWV3QWN0aW9uOiBmdW5jdGlvbihhY3Rpb24pIHtcbiAgICB0aGlzLmRpc3BhdGNoKHtcbiAgICAgIHNvdXJjZTogJ1ZJRVdfQUNUSU9OJyxcbiAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgfSk7XG4gIH1cbn0pOyIsImNvbnN0IFRpbGVBY3Rpb25zID0ge1xuICAgIFwiQXNzYXNzaW5cIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwianVtcCBzbGlkZVwiLFxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wIHNsaWRlXCIsXG4gICAgICAgICAgICBcIlsyLDJdXCI6IFwianVtcCBzbGlkZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJqdW1wIHNsaWRlXCIsXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcImp1bXAgc2xpZGVcIixcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wIHNsaWRlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJCb3dtYW5cIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcImp1bXBcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJzdHJpa2VcIixcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcInN0cmlrZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiQ2hhbXBpb25cIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwwXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMiwwXVwiOiBcImp1bXBcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJzdHJpa2VcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJzdHJpa2VcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJzdHJpa2VcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJEcmFnb29uXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJzdHJpa2VcIixcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcInN0cmlrZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMSwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwic2xpZGVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIkR1Y2hlc3NcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJtb3ZlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJtb3ZlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJEdWtlXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwic2xpZGVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcInNsaWRlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJGb290bWFuXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJLbmlnaHRcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWy0xLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJtb3ZlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0yLDJdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcIm1vdmVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIkxvbmdib3dtYW5cIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJzdHJpa2VcIixcbiAgICAgICAgICAgIFwiWzAsLTNdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJNYXJzaGFsbFwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMiwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJPcmFjbGVcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG5cbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJQaWtlbWFuXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMSwtMl1cIjogXCJzdHJpa2VcIixcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiUHJpZXN0XCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcInNsaWRlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJqdW1wXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJSYW5nZXJcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbLTEsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMSwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMiwtMV1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLC0xXVwiOiBcImp1bXBcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0xLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMSwyXVwiOiBcImp1bXBcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIlNlZXJcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwwXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMiwwXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0yLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIldpemFyZFwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMiwwXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDJdXCI6IFwianVtcFwiXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLy8gdmFyIG5ld1VuaXRzID0ge307XG4vLyBmb3IgKHZhciB1bml0S2V5IGluIFRpbGVBY3Rpb25zKSB7XG4vLyAgICAgdmFyIHVuaXQgPSBUaWxlQWN0aW9uc1t1bml0S2V5XTtcbi8vICAgICB2YXIgbmV3U2lkZXMgPSB7fTtcbi8vICAgICBmb3IgKHZhciBzaWRlS2V5IGluIHVuaXQpIHtcbi8vICAgICAgICAgdmFyIGRpciA9IHVuaXRbc2lkZUtleV07XG4vLyAgICAgICAgIHZhciBuZXdEaXIgPSB7fTtcbi8vICAgICAgICAgZm9yICh2YXIgY29vcmRzIGluIGRpcikge1xuLy8gICAgICAgICAgICAgdmFyIHBhcnNlZCA9IEpTT04ucGFyc2UoY29vcmRzKTtcbi8vICAgICAgICAgICAgIHZhciBuZXdDb29yZHMgPSBKU09OLnN0cmluZ2lmeShbcGFyc2VkWzFdLCBwYXJzZWRbMF1dKTtcbi8vICAgICAgICAgICAgIG5ld0RpcltuZXdDb29yZHNdID0gZGlyW2Nvb3Jkc107XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgbmV3U2lkZXNbc2lkZUtleV0gPSBuZXdEaXI7XG4vLyAgICAgfVxuLy8gICAgIG5ld1VuaXRzW3VuaXRLZXldID0gbmV3U2lkZXM7XG4vLyB9XG4vLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShuZXdVbml0cykpO1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBUaWxlQWN0aW9ucztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuY29uc3QgT1JJR0lOID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNyc7XG5jb25zdCBXUyA9IE9SSUdJTjtcblxuZXhwb3J0IGRlZmF1bHQgaW8uY29ubmVjdChXUyk7IiwiY29uc3QgbWF5YmVSZXZlcnNlID0ge1xuICBfbWF5YmVSZXZlcnNlKGl0ZXJhYmxlLCBjb2xvcikge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNvbG9yID09PSAoY29sb3IgfHwgJ2JsYWNrJykgP1xuICAgICAgaXRlcmFibGUucmV2ZXJzZSgpIDogaXRlcmFibGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1heWJlUmV2ZXJzZTsiLCJpbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuXG5jb25zdCBvbkdhbWVDaGFuZ2UgPSB7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIEdhbWVTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgR2FtZVN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgb25HYW1lQ2hhbmdlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyMiBhcyBFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50ZW1pdHRlcjInO1xuaW1wb3J0IENoYXRDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0NoYXRDb25zdGFudHMnO1xuaW1wb3J0IHtMaXN0LCBNYXB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmNvbnN0IENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xuICBcbnZhciBfbWVzc2FnZXMgPSBMaXN0KCk7XG52YXIgX3Vuc2VlbkNvdW50ID0gMDtcbnZhciBfaXNDaGF0SGlkZGVuID0gdHJ1ZTtcblxuY29uc3QgQ2hhdFN0b3JlID0gT2JqZWN0LmFzc2lnbih7fSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZXM6IF9tZXNzYWdlcyxcbiAgICAgIHVuc2VlbkNvdW50OiBfdW5zZWVuQ291bnQsXG4gICAgICBpc0NoYXRIaWRkZW46IF9pc0NoYXRIaWRkZW5cbiAgICB9O1xuICB9XG59KTtcblxuZnVuY3Rpb24gdG9nZ2xlVmlzaWJpbGl0eSgpIHtcbiAgX2lzQ2hhdEhpZGRlbiA9ICFfaXNDaGF0SGlkZGVuO1xuICBfdW5zZWVuQ291bnQgPSAwO1xufVxuXG5mdW5jdGlvbiBzdWJtaXRNZXNzYWdlKG1lc3NhZ2UsIGNsYXNzTmFtZSwgcmVjZWl2ZWQpIHtcbiAgX21lc3NhZ2VzID0gX21lc3NhZ2VzLnB1c2goTWFwKHtcbiAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lXG4gIH0pKTtcblxuICBpZiAocmVjZWl2ZWQgJiYgX2lzQ2hhdEhpZGRlbikge1xuICAgIF91bnNlZW5Db3VudCArPSAxO1xuICB9XG59XG5cbkFwcERpc3BhdGNoZXIucmVnaXN0ZXIocGF5bG9hZCA9PiB7XG4gIGNvbnN0IGFjdGlvbiA9IHBheWxvYWQuYWN0aW9uO1xuXG4gIHN3aXRjaCAoYWN0aW9uLmFjdGlvblR5cGUpIHtcbiAgICBjYXNlIENoYXRDb25zdGFudHMuVE9HR0xFX1ZJU0lCSUxJVFk6XG4gICAgICB0b2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgQ2hhdENvbnN0YW50cy5TVUJNSVRfTUVTU0FHRTpcbiAgICAgIHN1Ym1pdE1lc3NhZ2UoYWN0aW9uLm1lc3NhZ2UsIGFjdGlvbi5jbGFzc05hbWUsIGFjdGlvbi5yZWNlaXZlZCk7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIENoYXRTdG9yZS5lbWl0KENIQU5HRV9FVkVOVCk7XG4gIHJldHVybiB0cnVlO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENoYXRTdG9yZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XG5pbXBvcnQge0V2ZW50RW1pdHRlcjIgYXMgRXZlbnRFbWl0dGVyfSBmcm9tICdldmVudGVtaXR0ZXIyJztcbmltcG9ydCBHYW1lQ29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9HYW1lQ29uc3RhbnRzJztcbmltcG9ydCBDaGVzc1BpZWNlcyBmcm9tICcuLi9jb25zdGFudHMvQ2hlc3NQaWVjZXMnO1xuaW1wb3J0IHtDaGVzc30gZnJvbSAnY2hlc3MuanMnO1xuaW1wb3J0IHtMaXN0LCBNYXAsIE9yZGVyZWRNYXAsIFNldH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBiZWhhdmlvciBmcm9tICcuLi9nYW1lL2JlaGF2aW9yJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuY29uc3QgQ0hBTkdFX0VWRU5UID0gJ2NoYW5nZSc7XG5jb25zdCBNT1ZFX0VWRU5UID0gJ25ldy1tb3ZlJztcblxudmFyIF9nYW1lT3ZlcjtcbnZhciBfY2FwdHVyZWRQaWVjZXM7XG52YXIgX21vdmVzO1xudmFyIF9tb3ZlZDtcbnZhciBfdHVybjtcbnZhciBfY2hlY2s7XG52YXIgX2xhc3RNb3ZlO1xudmFyIF9jaGVzcztcblxudmFyIF9ib2FyZCwgX2xpZ2h0dXAsIF9zdHJpa2UsIF9kcm9wLCBfc2VsZWN0ZWQsIF9kcmF3biA9IFtdLCBfcmVzdWx0LCBfZGVjaywgX3BlbmRpbmdEcmF3O1xuXG5cbnNldEluaXRpYWxTdGF0ZSgpO1xuXG52YXIgR2FtZVN0b3JlID0gT2JqZWN0LmFzc2lnbih7fSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xuICAgIGFkZENoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihjYikge1xuICAgICAgdGhpcy5vbihDSEFOR0VfRVZFTlQsIGNiKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2hhbmdlTGlzdGVuZXI6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICB0aGlzLnJlbW92ZUNoYW5nZUxpc3RlbmVyKENIQU5HRV9FVkVOVCwgY2IpO1xuICAgIH0sXG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnYW1lT3ZlcjogX2dhbWVPdmVyLFxuICAgICAgICAgICAgdHVybjogX3R1cm4sXG4gICAgICAgICAgICBjaGVjazogX2NoZWNrLFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Q2FwdHVyZWRQaWVjZXMoKSB7XG4gICAgICAgIHJldHVybiBfY2FwdHVyZWRQaWVjZXM7XG4gICAgfSxcbiAgICBnZXRNb3ZlcygpIHtcbiAgICAgICAgcmV0dXJuIF9tb3ZlcztcbiAgICB9LFxuXG4gICAgZ2V0R2FtZWJvYXJkU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBib2FyZDogX2JvYXJkLFxuICAgICAgICAgICAgbGlnaHR1cDogX2xpZ2h0dXAsXG4gICAgICAgICAgICBzdHJpa2U6IF9zdHJpa2UsXG4gICAgICAgICAgICBkcm9wOiBfZHJvcCxcbiAgICAgICAgICAgIHNlbGVjdGVkOiBfc2VsZWN0ZWQsXG4gICAgICAgICAgICBkcmF3VW5pdDogX3Jlc3VsdCxcbiAgICAgICAgICAgIHR1cm46IF90dXJuLFxuICAgICAgICAgICAgbW92ZWQ6IF9tb3ZlZCxcbiAgICAgICAgICAgIGRlY2s6IF9kZWNrLFxuICAgICAgICAgICAgcGVuZGluZ0RyYXc6IF9wZW5kaW5nRHJhd1xuICAgICAgICB9XG4gICAgfSxcblxufSk7XG5cblxuZnVuY3Rpb24gc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIF9nYW1lT3ZlciA9IE1hcCh7XG4gICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgIHdpbm5lcjogbnVsbFxuICAgIH0pO1xuICAgIF9jYXB0dXJlZFBpZWNlcyA9IE9yZGVyZWRNYXAoW1xuICAgICAgICBbJ3cnLCBMaXN0KCldLFxuICAgICAgICBbJ2InLCBMaXN0KCldXG4gICAgXSk7XG4gICAgX21vdmVzID0gTGlzdCgpO1xuICAgIF90dXJuID0gJ3cnO1xuICAgIF9tb3ZlZCA9IGZhbHNlO1xuICAgIF9jaGVjayA9IGZhbHNlO1xuICAgIF9sYXN0TW92ZSA9IE1hcCgpO1xuICAgIF9zZWxlY3RlZCA9IG51bGw7XG4gICAgX3BlbmRpbmdEcmF3ID0gbnVsbDtcbiAgICAvL19jaGVzcyA9IG5ldyBDaGVzcygpO1xuXG4gICAgX2xpZ2h0dXAgPSB7fTtcbiAgICBfc3RyaWtlID0ge307XG4gICAgX2Ryb3AgPSB7fTtcblxuICAgIF9ib2FyZCA9IHtcbiAgICAgICAgLy8gJ1sxLCAyXSc6IHt1bml0OiAnV2l6YXJkJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAvLyAnWzIsIDBdJzoge3VuaXQ6ICdEdWtlJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAvLyAnWzIsIDFdJzoge3VuaXQ6ICdQaWtlbWFuJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdmcm9udCd9LFxuICAgICAgICAvLyAnWzEsIDNdJzoge3VuaXQ6ICdBc3Nhc3NpbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnZnJvbnQnfSxcbiAgICAgICAgLy8gJ1syLCA0XSc6IHt1bml0OiAnTG9uZ2Jvd21hbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnYmFjayd9LFxuICAgICAgICAvLyAnWzMsIDVdJzoge3VuaXQ6ICdGb290bWFuJywgY29sb3I6ICd3aGl0ZScsIHNpZGU6ICdiYWNrJ30sXG4gICAgICAgIC8vICdbNCwgNV0nOiB7dW5pdDogJ0Zvb3RtYW4nLCBjb2xvcjogJ3doaXRlJywgc2lkZTogJ2JhY2snfSxcbiAgICAgICAgLy8gJ1s0LCA0XSc6IHt1bml0OiAnUmFuZ2VyJywgY29sb3I6ICdibGFjaycsIHNpZGU6ICdiYWNrJ30sXG4gICAgICAgIC8vICdbMywgNF0nOiB7dW5pdDogJ0RyYWdvb24nLCBjb2xvcjogJ3doaXRlJywgc2lkZTogJ2Zyb250J30sXG4gICAgICAgIC8vICdbMSwgNV0nOiB7dW5pdDogJ0R1a2UnLCBjb2xvcjogJ3doaXRlJywgc2lkZTogJ2Zyb250J31cblxuICAgICAgICBcbiAgICAgICAgJ1sxLCAwXSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnYmxhY2snLCBzaWRlOiAnZnJvbnQnfSxcbiAgICAgICAgJ1syLCAwXSc6IHt1bml0OiAnRHVrZScsIGNvbG9yOiAnYmxhY2snLCBzaWRlOiAnZnJvbnQnfSxcbiAgICAgICAgJ1szLCAwXSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnYmxhY2snLCBzaWRlOiAnZnJvbnQnfSxcbiAgICAgICAgJ1syLCA1XSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnZnJvbnQnfSxcbiAgICAgICAgJ1szLCA1XSc6IHt1bml0OiAnRHVrZScsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnZnJvbnQnfSxcbiAgICAgICAgJ1s0LCA1XSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnZnJvbnQnfSxcbiAgICAgICAgJ1syLCAxXSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnd2hpdGUnLCBzaWRlOiAnZnJvbnQnfVxuICAgICAgICBcbiAgICB9O1xuXG4gICAgX2RlY2sgPSBbLi4uT2JqZWN0LmtleXMob21pdChiZWhhdmlvciwgJ0R1a2UnKSksICdQaWtlbWFuJywgJ1Bpa2VtYW4nXTtcbiAgICAvL2NvbnNvbGUubG9nKF9kZWNrKTtcbn1cblxuZnVuY3Rpb24gbW92ZVRvQm9hcmQoKSB7XG5cblxuICAgIGlmIChlbWl0TW92ZSkge1xuICAgICAgICBHYW1lU3RvcmUuZW1pdChNT1ZFX0VWRU5ULCB7XG4gICAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgICBjYXB0dXJlOiBjYXB0dXJlLFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGJvYXJkOiBfYm9hcmQgICAgXG4gICAgICAgICAgICAvL2dhbWVPdmVyOiBfY2hlc3MuZ2FtZV9vdmVyKClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUJvYXJkKGZyb20sIHRvLCB0eXBlKSB7XG5cbiAgICAvLyBpZiBjYWxsZWQgYnkgYSBtb3ZlIGV2ZW50LCB0aGUgZnJvbSBwYXJhbWV0ZXIgd2lsbCBiZSBhIHBvc2l0aW9uIG9uIHRoZSBib2FyZCAoaS5lLiBhIHN0cmluZylcbiAgICAvLyBpZiBjYWxsZWQgYnkgYSBkcmF3IGV2ZW50LCB0aGUgZnJvbSBwYXJhbWV0ZXIgd2lsbCBiZSBhbiBhY3R1YWwgdW5pdCAoaS5lLiBhbiBvYmplY3QpXG5cbiAgICBpZiAodHlwZW9mIGZyb20gPT09ICdvYmplY3QnKSB7ICAgICAgICAgLy8gZHJhdyBldmVudFxuICAgICAgICBfYm9hcmRbdG9dID0gZnJvbTtcbiAgICAgICAgX2Ryb3AgPSB7fTtcbiAgICAgICAgX3BlbmRpbmdEcmF3ID0gbnVsbDtcbiAgICB9XG5cbiAgICBlbHNlIGlmICh0eXBlb2YgZnJvbSA9PT0gJ3N0cmluZycpIHsgICAgLy8gbW92ZSBldmVudFxuXG4gICAgICAgIGxldCB1bml0ID0gX2JvYXJkW2Zyb21dO1xuXG4gICAgICAgIHVuaXQuc2lkZSA9ICh1bml0LnNpZGUgPT09ICdmcm9udCcpID8gJ2JhY2snIDogJ2Zyb250JztcblxuICAgICAgICBpZiAodHlwZSA9PT0gJ21vdmUnKSB7XG4gICAgICAgICAgX2JvYXJkW2Zyb21dID0gbnVsbDtcbiAgICAgICAgICBfYm9hcmRbdG9dID0gdW5pdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnc3RyaWtlJykge1xuICAgICAgICAgIF9ib2FyZFt0b10gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBfc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICByZXR1cm4gX2JvYXJkO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbWFrZU1vdmUoZnJvbSwgdG8sIGNhcHR1cmUsIHR5cGUsIGVtaXRNb3ZlKSB7XG4gICBcbiAgICB1cGRhdGVCb2FyZChmcm9tLCB0bywgdHlwZSk7XG5cbiAgICBfdHVybiA9IF90dXJuID09PSAndycgPyAnYicgOiAndyc7XG5cbiAgICBpZiAoZW1pdE1vdmUpIHtcbiAgICAgICAgR2FtZVN0b3JlLmVtaXQoTU9WRV9FVkVOVCwge1xuICAgICAgICAgICAgZnJvbTogZnJvbSxcbiAgICAgICAgICAgIHRvOiB0byxcbiAgICAgICAgICAgIGNhcHR1cmU6IGNhcHR1cmUsXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgLy8gYm9hcmQ6IF9ib2FyZCAgICBcbiAgICAgICAgICAgIGdhbWVPdmVyOiBpc0R1a2VEZWFkKClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cblxuXG5mdW5jdGlvbiBkcmF3KCkge1xuICAgIGxldCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpfZGVjay5sZW5ndGgpO1xuICAgIF9wZW5kaW5nRHJhdyA9IF9kZWNrLnNwbGljZShyYW5kb21JbmRleCwgMSlbMF07ICAgICAgIFxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc0R1a2VEZWFkKCkge1xuICAgIGxldCBkdWtlcyA9IE9iamVjdC5rZXlzKF9ib2FyZCkuZmlsdGVyKHBvcyA9PiBfYm9hcmRbcG9zXSAmJiBfYm9hcmRbcG9zXS51bml0ID09PSBcIkR1a2VcIilcbiAgICAgICAgLm1hcChwb3MgPT4gX2JvYXJkW3Bvc10uY29sb3IpO1xuICAgIGlmIChkdWtlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbGV0IHdpbm5lciA9IGR1a2VzWzBdO1xuICAgICAgICBpZiAod2lubmVyID0gJ3doaXRlJykgd2lubmVyID0gJ1doaXRlJztcbiAgICAgICAgZWxzZSBpZiAod2lubmVyID0gJ2JsYWNrJykgd2lubmVyID0gJ0JsYWNrJztcbiAgICAgICAgc3dhbCh7XG4gICAgICAgICAgICB0aXRsZTogYFlvdSB3aW4hYCxcbiAgICAgICAgICAgIHRleHQ6ICdXb3VsZCB5b3UgbGlrZSB0byByZXF1ZXN0IGEgcmVtYXRjaD8nLFxuICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogXCIjMDBGRkQyXCIsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXCJZZWFoISA6KVwiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJGdWNrIHRoYXRcIixcbiAgICAgICAgICAgIGNsb3NlT25Db25maXJtOiBmYWxzZSxcbiAgICAgICAgICAgIGNsb3NlT25DYW5jZWw6IGZhbHNlXG4gICAgICAgIH0sIGZ1bmN0aW9uKGlzQ29uZmlybSkge1xuICAgICAgICAgICAgaWYgKGlzQ29uZmlybSkge1xuICAgICAgICAgICAgICAgIHN3YWwoXCJOaWNlIVwiLCBcIkEgcmVtYXRjaCByZXF1ZXN0IGhhcyBiZWVuIHNlbnQgKG5vdCByZWFsbHkgdGhvKS5cIiwgXCJzdWNjZXNzXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2FsKFwiT2theVwiLCBcImRvbid0IGZvcmdldCB0byBkb25hdGVcIiwgXCJzdWNjZXNzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgR2FtZVN0b3JlLmVtaXQoJ3N3YWwtZW5kZ2FtZScsIHsgd2lubmVyIH0pO1xuICAgIH1cbiAgICBcblxuXG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5cbmZ1bmN0aW9uIGdhbWVPdmVyKG9wdGlvbnMpIHtcbiAgICBfZ2FtZU92ZXIgPSBfZ2FtZU92ZXJcbiAgICAgICAgLnNldCgnc3RhdHVzJywgdHJ1ZSlcbiAgICAgICAgLnNldCgnd2lubmVyJywgb3B0aW9ucy53aW5uZXIpXG4gICAgICAgIC5zZXQoJ3R5cGUnLCBvcHRpb25zLnR5cGUpO1xufVxuXG5BcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKHBheWxvYWQgPT4ge1xuICAgIGNvbnN0IGFjdGlvbiA9IHBheWxvYWQuYWN0aW9uO1xuICAgIGxldCBlbWl0RXZlbnQgPSB0cnVlO1xuXG4gICAgc3dpdGNoIChhY3Rpb24uYWN0aW9uVHlwZSkge1xuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuTUFLRV9NT1ZFOlxuICAgICAgICAgICAgZW1pdEV2ZW50ID0gbWFrZU1vdmUoXG4gICAgICAgICAgICAgICAgYWN0aW9uLmZyb20sIGFjdGlvbi50bywgYWN0aW9uLmNhcHR1cmUsIGFjdGlvbi50eXBlLCBhY3Rpb24uZW1pdE1vdmUpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkRSQVc6XG4gICAgICAgICAgICBlbWl0RXZlbnQgPSBkcmF3KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuR0FNRV9PVkVSOlxuICAgICAgICAgICAgZ2FtZU92ZXIoYWN0aW9uLm9wdGlvbnMpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLlJFTUFUQ0g6XG4gICAgICAgICAgICBzZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZW1pdEV2ZW50KSB7XG4gICAgICAgIEdhbWVTdG9yZS5lbWl0KENIQU5HRV9FVkVOVCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVTdG9yZTtcbiJdfQ==
