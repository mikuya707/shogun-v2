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

		if (unit) {
			if (!isSelected) {
				//check if the onclick unit has the same color as the player
				//then selected = true;
				//if(color === )

				this.setState({ isSelected: true });
				console.log("board select");

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
			} else {
				console.log("board deselect");
				this.setState({ isSelected: false });
			}
			GameActions.showMoves({ unit: unit, color: color }, pos, ranges);
			//this._flip();
		}
		//this is the condition where the player selects its own unit, and try to move to existing valid position
		else {
			console.log("we got here", selected);
			if (selected && Object.keys(lightup).length) {
				if (lightup[position]) {
					console.log("what is selected? ", selected);
					console.log("what is current unit and position? ", unit, position);
					GameActions.makeMove(selected.position, position, false);
					console.log("moved!");
					console.log("board?", board);
					this._flip();
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

},{"../actions/GameActions":"/Users/Jay/Fullstack/shogun-v2/src/js/actions/GameActions.js","../game/behavior":"/Users/Jay/Fullstack/shogun-v2/src/js/game/behavior.js","../stores/GameStore":"/Users/Jay/Fullstack/shogun-v2/src/js/stores/GameStore.js","classnames":"/Users/Jay/Fullstack/shogun-v2/node_modules/classnames/index.js","lodash.omit":"lodash.omit","react/addons":"react/addons"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameHeader.js":[function(require,module,exports){
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

},{"../actions/GameActions":"/Users/Jay/Fullstack/shogun-v2/src/js/actions/GameActions.js","../stores/GameStore":"/Users/Jay/Fullstack/shogun-v2/src/js/stores/GameStore.js","./Chat":"/Users/Jay/Fullstack/shogun-v2/src/js/components/Chat.js","./ChessboardInterface":"/Users/Jay/Fullstack/shogun-v2/src/js/components/ChessboardInterface.js","./GameBoard":"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameBoard.js","./GameHeader":"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameHeader.js","./GameboardInterface":"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameboardInterface.js","./Modal":"/Users/Jay/Fullstack/shogun-v2/src/js/components/Modal.js","immutable":"immutable","react/addons":"react/addons"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/GameboardInterface.js":[function(require,module,exports){
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
            console.log("else");
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
    _selected = null;
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

},{"../constants/ChessPieces":"/Users/Jay/Fullstack/shogun-v2/src/js/constants/ChessPieces.js","../constants/GameConstants":"/Users/Jay/Fullstack/shogun-v2/src/js/constants/GameConstants.js","../dispatcher/AppDispatcher":"/Users/Jay/Fullstack/shogun-v2/src/js/dispatcher/AppDispatcher.js","chess.js":"chess.js","eventemitter2":"eventemitter2","immutable":"immutable"}]},{},["./src/js/play.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL3BsYXkuanMiLCJub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvaW52YXJpYW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9rZXlNaXJyb3IuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2FjdGlvbnMvQ2hhdEFjdGlvbnMuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2FjdGlvbnMvR2FtZUFjdGlvbnMuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2FwdHVyZWRQaWVjZXMuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2hhdC5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DaGVzc2JvYXJkLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0NoZXNzYm9hcmRJbnRlcmZhY2UuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2xvY2suanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUJvYXJkLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0dhbWVIZWFkZXIuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUludGVyZmFjZS5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lYm9hcmRJbnRlcmZhY2UuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvTW9kYWwuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvVGFibGVPZk1vdmVzLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hhdENvbnN0YW50cy5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvY29uc3RhbnRzL0NoZXNzUGllY2VzLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvR2FtZUNvbnN0YW50cy5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9nYW1lL2JlaGF2aW9yLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9pby5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvbWl4aW5zL21heWJlUmV2ZXJzZS5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvbWl4aW5zL29uR2FtZUNoYW5nZS5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvc3RvcmVzL0NoYXRTdG9yZS5qcyIsIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvc3RvcmVzL0dhbWVTdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7OztRQUVOLFVBQVU7O0lBQ1YsS0FBSywyQkFBTSxPQUFPOztJQUNsQixFQUFFLDJCQUFNLE1BQU07O0lBQ2QsYUFBYSwyQkFBTSw0QkFBNEI7O0FBRXRELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVwQyxLQUFLLENBQUMsTUFBTSxDQUNWLG9CQUFDLGFBQWEsSUFBQyxFQUFFLEVBQUUsRUFBRSxBQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sQUFBQyxHQUFHLEVBQ3pDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQ3JDLENBQUM7OztBQ2RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztJQ25ETyxhQUFhLDJCQUFNLDRCQUE0Qjs7SUFDL0MsYUFBYSwyQkFBTSw2QkFBNkI7O0FBRXZELElBQU0sV0FBVyxHQUFHO0FBQ2xCLGtCQUFnQixFQUFBLDRCQUFHO0FBQ2pCLGlCQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDN0IsZ0JBQVUsRUFBRSxhQUFhLENBQUMsaUJBQWlCO0tBQzVDLENBQUMsQ0FBQztHQUNKO0FBQ0QsZUFBYSxFQUFBLHVCQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFO0FBQzFDLGlCQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDN0IsZ0JBQVUsRUFBRSxhQUFhLENBQUMsY0FBYztBQUN4QyxhQUFPLEVBQUUsT0FBTztBQUNoQixlQUFTLEVBQUUsU0FBUztBQUNwQixjQUFRLEVBQUUsUUFBUTtLQUNuQixDQUFDLENBQUM7R0FDSjtDQUNGLENBQUM7O2lCQUVhLFdBQVc7Ozs7Ozs7SUNuQm5CLGFBQWEsMkJBQU0sNEJBQTRCOztJQUMvQyxhQUFhLDJCQUFNLDZCQUE2Qjs7QUFFdkQsSUFBTSxXQUFXLEdBQUc7QUFDbEIsVUFBUSxFQUFBLGtCQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRTtBQUNwQyxpQkFBYSxDQUFDLGdCQUFnQixDQUFDO0FBQzdCLGdCQUFVLEVBQUUsYUFBYSxDQUFDLFNBQVM7QUFDbkMsVUFBSSxFQUFFLElBQUk7QUFDVixRQUFFLEVBQUUsRUFBRTtBQUNOLGFBQU8sRUFBRSxPQUFPO0FBQ2hCLGNBQVEsRUFBRSxRQUFRO0tBQ25CLENBQUMsQ0FBQztHQUNKO0FBQ0QsV0FBUyxFQUFBLG1CQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQzdCLGlCQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDN0IsZ0JBQVUsRUFBRSxhQUFhLENBQUMsVUFBVTtBQUNwQyxVQUFJLEVBQUUsSUFBSTtBQUNWLFVBQUksRUFBRSxJQUFJO0FBQ1YsYUFBTyxFQUFFLE9BQU87S0FDakIsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxNQUFJLEVBQUEsZ0JBQUc7QUFDTCxpQkFBYSxDQUFDLGdCQUFnQixDQUFDO0FBQzdCLGdCQUFVLEVBQUUsYUFBYSxDQUFDLElBQUk7S0FDL0IsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxTQUFPLEVBQUEsbUJBQUc7QUFDUixpQkFBYSxDQUFDLGdCQUFnQixDQUFDO0FBQzdCLGdCQUFVLEVBQUUsYUFBYSxDQUFDLE9BQU87S0FDbEMsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxVQUFRLEVBQUEsa0JBQUMsT0FBTyxFQUFFO0FBQ2hCLGlCQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDN0IsZ0JBQVUsRUFBRSxhQUFhLENBQUMsU0FBUztBQUNuQyxhQUFPLEVBQUUsT0FBTztLQUNqQixDQUFDLENBQUM7R0FDSjtBQUNELGlCQUFlLEVBQUEseUJBQUMsU0FBUyxFQUFFO0FBQ3pCLGlCQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDN0IsZ0JBQVUsRUFBRSxhQUFhLENBQUMsZ0JBQWdCO0FBQzFDLGVBQVMsRUFBRSxTQUFTO0tBQ3JCLENBQUMsQ0FBQztHQUNKO0NBQ0YsQ0FBQzs7aUJBRWEsV0FBVzs7O0FDN0MxQixZQUFZLENBQUM7Ozs7SUFFTixLQUFLLDJCQUFNLGNBQWM7O0lBQ3pCLFNBQVMsMkJBQU0scUJBQXFCOztJQUNwQyxZQUFZLDJCQUFNLHdCQUF3Qjs7QUFFakQsSUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRXZDLFFBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQzs7QUFFcEQsaUJBQWUsRUFBQSwyQkFBRztBQUNoQixXQUFPO0FBQ0wsb0JBQWMsRUFBRSxTQUFTLENBQUMsaUJBQWlCLEVBQUU7S0FDOUMsQ0FBQztHQUNIO0FBQ0QsUUFBTSxFQUFBLGtCQUFHO0FBQ1AsUUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7O0FBRXJDLFdBQ0U7O1FBQUssRUFBRSxFQUFDLGlCQUFpQjtNQUN0QixFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBTSxFQUFFLEtBQUs7ZUFDcEI7O1lBQUksR0FBRyxFQUFFLEtBQUssQUFBQztVQUNaLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsQ0FBQzttQkFBSzs7Z0JBQUksR0FBRyxFQUFFLENBQUMsQUFBQztjQUFFLEtBQUs7YUFBTTtXQUFBLENBQUMsQ0FBQyxPQUFPLEVBQUU7U0FDMUQ7T0FDTixDQUFDLENBQUMsT0FBTyxFQUFFO0tBQ1IsQ0FDTjtHQUNIO0FBQ0QsZUFBYSxFQUFBLHlCQUFHO0FBQ2QsUUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLG9CQUFjLEVBQUUsU0FBUyxDQUFDLGlCQUFpQixFQUFFO0tBQzlDLENBQUMsQ0FBQztHQUNKO0NBQ0YsQ0FBQyxDQUFDOztpQkFFWSxjQUFjOzs7QUNuQzdCLFlBQVksQ0FBQzs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsU0FBUywyQkFBTSxxQkFBcUI7O0lBQ3BDLFdBQVcsMkJBQU0sd0JBQXdCOztBQUVoRCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFN0IsV0FBUyxFQUFFO0FBQ1QsTUFBRSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDckMsU0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDeEMsU0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVTtBQUMzRCxpQkFBYSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDOUMsdUJBQW1CLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUNwRCxhQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtHQUMzQztBQUNELFFBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDOztBQUV0QyxpQkFBZSxFQUFBLDJCQUFHO0FBQ2hCLFFBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNuQyxXQUFPO0FBQ0wsa0JBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtBQUNoQyxjQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7QUFDeEIsYUFBTyxFQUFFLEVBQUUsRUFDWixDQUFDO0dBQ0g7QUFDRCxtQkFBaUIsRUFBQSw2QkFBRzs7O0FBQ2xCLFFBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFBLElBQUksRUFBSTtBQUMxQyxpQkFBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3BFLFlBQUssZUFBZSxFQUFFLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0FBQ0gsYUFBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7O0FBRWhELFFBQUksTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLEVBQUUsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7R0FDOUQ7QUFDRCxzQkFBb0IsRUFBQSxnQ0FBRztBQUNyQixhQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztHQUNsRDtBQUNELFFBQU0sRUFBQSxrQkFBRztBQUNQLFdBQ0U7O1FBQUssRUFBRSxFQUFDLGNBQWM7QUFDakIsaUJBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxRQUFRLEdBQUcsSUFBSSxBQUFDO01BRXhEOzs7O09BQWE7TUFDYjs7VUFBRyxTQUFTLEVBQUMsT0FBTztBQUNqQixpQkFBTyxFQUFFLFdBQVcsQ0FBQyxnQkFBZ0IsQUFBQzs7T0FFckM7TUFFSjs7VUFBTyxPQUFPLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxRQUFRO1FBQ2hDLGdDQUFRLEdBQUcsRUFBQyxrQkFBa0IsR0FBRztPQUMzQjtNQUVSOztVQUFJLEVBQUUsRUFBQyxXQUFXLEVBQUMsR0FBRyxFQUFDLE1BQU07UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ2xDOztjQUFJLEdBQUcsRUFBRSxDQUFDLEFBQUMsRUFBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQUFBQztZQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztXQUNwQjtTQUNOLENBQUMsQ0FBQyxPQUFPLEVBQUU7T0FDVDtNQUVMOzs7O09BQWdDO01BRWhDOztVQUFNLEVBQUUsRUFBQyxXQUFXO0FBQ2Qsa0JBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxBQUFDO1FBQ2xDLCtCQUFPLElBQUksRUFBQyxNQUFNO0FBQ1gsYUFBRyxFQUFDLFNBQVM7QUFDYixtQkFBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxBQUFDO0FBQzVCLGtCQUFRLE1BQUE7QUFDUixlQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEFBQUM7QUFDMUIsa0JBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEFBQUMsR0FBRztPQUNyQztLQUNILENBQ047R0FDSDtBQUNELG9CQUFrQixFQUFBLDhCQUFHO0FBQ25CLFFBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztHQUN2RDtBQUNELGtCQUFnQixFQUFBLDBCQUFDLENBQUMsRUFBRTtBQUNsQixRQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztHQUMxQztBQUNELGdCQUFjLEVBQUEsd0JBQUMsQ0FBQyxFQUFFO0FBQ2hCLEtBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDNkIsSUFBSSxDQUFDLEtBQUs7UUFBbkQsRUFBRSxVQUFGLEVBQUU7UUFBRSxLQUFLLFVBQUwsS0FBSztRQUFFLEtBQUssVUFBTCxLQUFLO1FBQUUsbUJBQW1CLFVBQW5CLG1CQUFtQjs7QUFDNUMsUUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7O0FBRW5DLFFBQUksQ0FBQyxtQkFBbUIsRUFBRTtBQUN4QixVQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN0QyxVQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUseUNBQXlDLEdBQ3BFLDBCQUEwQixDQUFDLENBQUM7QUFDOUIsYUFBTztLQUNSOztBQUVELGVBQVcsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLEtBQUssR0FBRyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDNUQsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDOztBQUU3QixNQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtBQUN0QixhQUFPLEVBQUUsT0FBTztBQUNoQixXQUFLLEVBQUUsS0FBSztBQUNaLFdBQUssRUFBRSxLQUFLO0tBQ2IsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxhQUFXLEVBQUEsdUJBQUc7QUFDWixRQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM3QyxZQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7R0FDNUM7QUFDRCxpQkFBZSxFQUFBLDJCQUFHO0FBQ2hCLFFBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7QUFDNUIsVUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdEM7R0FDRjtDQUNGLENBQUMsQ0FBQzs7aUJBRVksSUFBSTs7O0FDakhuQixZQUFZLENBQUM7Ozs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsU0FBUywyQkFBTSxxQkFBcUI7O0lBQ3BDLFdBQVcsMkJBQU0sd0JBQXdCOztJQUN6QyxXQUFXLDJCQUFNLDBCQUEwQjs7SUFDM0MsWUFBWSwyQkFBTSx3QkFBd0I7O0lBQzFDLFlBQVksMkJBQU0sd0JBQXdCOztJQUMxQyxJQUFJLDJCQUFNLGFBQWE7O0lBQ3ZCLEVBQUUsMkJBQU0sWUFBWTs7eUJBQ1UsV0FBVzs7SUFBeEMsR0FBRyxjQUFILEdBQUc7SUFBRSxNQUFNLGNBQU4sTUFBTTtJQUFFLElBQUksY0FBSixJQUFJO0lBQUUsR0FBRyxjQUFILEdBQUc7O0FBRTlCLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEMsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFdEMsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRW5DLFdBQVMsRUFBRTtBQUNULE1BQUUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3JDLFNBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3hDLGtCQUFjLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUMvQyxTQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVO0FBQzNELFlBQVEsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQ3pDLHVCQUFtQixFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7R0FDckQ7QUFDRCxRQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUM7O0FBRXBELGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsUUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7O0FBRTdDLFdBQU87QUFDTCxTQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7QUFDZCxjQUFRLEVBQUUsSUFBSTtBQUNkLGNBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtBQUN4QixpQkFBVyxFQUFFLEtBQUs7S0FDbkIsQ0FBQztHQUNIO0FBQ0QsbUJBQWlCLEVBQUEsNkJBQUc7OztpQkFDRSxJQUFJLENBQUMsS0FBSztRQUF2QixFQUFFLFVBQUYsRUFBRTtRQUFFLEtBQUssVUFBTCxLQUFLOztBQUNoQixhQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsYUFBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUUxQyxNQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFBLElBQUksRUFBSTtBQUNwQixpQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5RCxZQUFLLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7QUFFNUIsVUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDbEIsY0FBSyxTQUFTLEVBQUUsQ0FBQztPQUNsQjs7QUFFRCxVQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7QUFDbkIsWUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RELGFBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7O0FBRS9CLGNBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBSyx3QkFBd0IsQ0FBQyxDQUFDO09BQ2pFO0tBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUU7YUFBTSxNQUFLLFFBQVEsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQztLQUFBLENBQUMsQ0FBQztHQUNsRTtBQUNELHNCQUFvQixFQUFBLGdDQUFHO0FBQ3JCLGFBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM1QyxhQUFTLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7R0FDM0M7QUFDRCxRQUFNLEVBQUEsa0JBQUc7OztpQkFDd0MsSUFBSSxDQUFDLEtBQUs7UUFBbEQsS0FBSyxVQUFMLEtBQUs7UUFBRSxtQkFBbUIsVUFBbkIsbUJBQW1CO1FBQUUsUUFBUSxVQUFSLFFBQVE7aUJBQ0ksSUFBSSxDQUFDLEtBQUs7UUFBbEQsR0FBRyxVQUFILEdBQUc7UUFBRSxRQUFRLFVBQVIsUUFBUTtRQUFFLFFBQVEsVUFBUixRQUFRO1FBQUUsV0FBVyxVQUFYLFdBQVc7O0FBQzNDLFFBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEMsUUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlCLFFBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25ELFFBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3RELFFBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUVqRCxXQUNFOztRQUFPLFNBQVMsRUFBQyxZQUFZO01BQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxTQUFTLEVBQUUsQ0FBQztlQUNyQixvQkFBQyxHQUFHO0FBQ0YsYUFBRyxFQUFFLENBQUMsQUFBQztBQUNQLGNBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxBQUFDO0FBQ25CLG1CQUFTLEVBQUUsU0FBUyxBQUFDO0FBQ3JCLGVBQUssRUFBRSxLQUFLLEFBQUM7QUFDYixvQkFBVSxFQUFFLFVBQVUsSUFBSSxtQkFBbUIsSUFBSSxDQUFDLFFBQVEsQUFBQztBQUMzRCxrQkFBUSxFQUFFLFFBQVEsQUFBQztBQUNuQixrQkFBUSxFQUFFLFFBQVEsQUFBQztBQUNuQixxQkFBVyxFQUFFLE1BQUssWUFBWSxBQUFDO0FBQy9CLHFCQUFXLEVBQUUsV0FBVyxBQUFDO0FBQ3pCLG9CQUFVLEVBQUUsU0FBUyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQUFBQyxHQUFHO09BQUEsQ0FBQztLQUNoRCxDQUNSO0dBQ0g7QUFDRCxlQUFhLEVBQUEsdUJBQUMsRUFBRSxFQUFFO0FBQ2hCLFFBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0FBQzdDLFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixTQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7QUFDZCxjQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7QUFDeEIsaUJBQVcsRUFBRSxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBLEFBQUM7S0FDMUUsRUFBRSxFQUFFLENBQUMsQ0FBQztHQUNSO0FBQ0QsY0FBWSxFQUFBLHNCQUFDLE1BQU0sRUFBRTtBQUNuQixRQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osY0FBUSxFQUFFLE1BQU07S0FDakIsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxZQUFVLEVBQUEsb0JBQUMsSUFBSSxFQUFFO2lCQUNLLElBQUksQ0FBQyxLQUFLO1FBQXZCLEVBQUUsVUFBRixFQUFFO1FBQUUsS0FBSyxVQUFMLEtBQUs7O0FBRWhCLE1BQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQ2xCLFdBQUssRUFBRSxLQUFLO0FBQ1osVUFBSSxFQUFFLElBQUk7S0FDWCxDQUFDLENBQUM7O0FBRUgsY0FBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO0dBQzFDO0FBQ0QsV0FBUyxFQUFBLHFCQUFHO2lCQUNpQixJQUFJLENBQUMsS0FBSztRQUE5QixFQUFFLFVBQUYsRUFBRTtRQUFFLEtBQUssVUFBTCxLQUFLO1FBQUUsS0FBSyxVQUFMLEtBQUs7O0FBRXZCLE1BQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQ25CLFdBQUssRUFBRSxLQUFLO0FBQ1osV0FBSyxFQUFFLEtBQUs7S0FDYixDQUFDLENBQUM7R0FDSjtBQUNELDBCQUF3QixFQUFBLG9DQUFHO0FBQ3pCLFFBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RCxTQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMxQyxVQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0dBQ3BFO0NBQ0YsQ0FBQyxDQUFDOztBQUVILElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUU1QixXQUFTLEVBQUU7QUFDVCxRQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVO0FBQ3pFLGFBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQzVDLFNBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVU7QUFDM0QsY0FBVSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDM0MsWUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtBQUNoQyxZQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO0FBQ2hDLGVBQVcsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzVDLGVBQVcsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVO0FBQ2hFLGNBQVUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVO0dBQ3ZEO0FBQ0QsUUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDOztBQUV0QixRQUFNLEVBQUEsa0JBQUc7OztpQkFDMEIsSUFBSSxDQUFDLEtBQUs7UUFBcEMsSUFBSSxVQUFKLElBQUk7UUFBRSxTQUFTLFVBQVQsU0FBUztRQUFFLEtBQUssVUFBTCxLQUFLOztBQUM3QixRQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLFFBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQ3BELEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO2FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSztLQUM5RCxDQUFDLENBQUMsT0FBTyxFQUFFLEdBRVosU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FDcEIsQ0FBQzs7QUFFRixXQUNFOzs7TUFDRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLENBQUM7ZUFDbkIsb0JBQUMsTUFBTTtBQUNMLGFBQUcsRUFBRSxDQUFDLEFBQUM7QUFDUCxnQkFBTSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxBQUFDO0FBQzVCLGVBQUssRUFBRSxLQUFLLEFBQUM7V0FDVCxJQUFJLENBQUMsTUFBSyxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFJO09BQUEsQ0FBQztLQUMvQyxDQUNMO0dBQ0g7Q0FDRixDQUFDLENBQUM7O0FBRUgsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRS9CLFdBQVMsRUFBRTtBQUNULFVBQU0sRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3pDLFNBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3hDLFNBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVU7QUFDM0QsY0FBVSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDM0MsWUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtBQUNoQyxZQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO0FBQ2hDLGVBQVcsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzVDLGVBQVcsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVO0FBQ2hFLGNBQVUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVO0dBQ3ZEOztBQUVELFFBQU0sRUFBQSxrQkFBRztpQkFFdUMsSUFBSSxDQUFDLEtBQUs7UUFEakQsUUFBUSxVQUFSLFFBQVE7UUFBRSxRQUFRLFVBQVIsUUFBUTtRQUFFLE1BQU0sVUFBTixNQUFNO1FBQUUsS0FBSyxVQUFMLEtBQUs7UUFDakMsVUFBVSxVQUFWLFVBQVU7UUFBRSxXQUFXLFVBQVgsV0FBVztRQUFFLFVBQVUsVUFBVixVQUFVOztBQUMxQyxRQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QyxRQUFNLEdBQUcsR0FBRyxLQUFLLEtBQUssT0FBTyxHQUFHLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDNUQsUUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9DLFFBQU0sV0FBVyxHQUFHLFFBQVEsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV2RCxXQUNFOztRQUFJLFNBQVMsRUFBRSxFQUFFLENBQUM7QUFDWixrQkFBUSxFQUFFLFFBQVEsS0FBSyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO0FBQ3RELGNBQUksRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLE1BQU07QUFDckMsWUFBRSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssTUFBTTtBQUNqQyxtQkFBUyxFQUFFLFdBQVc7U0FDdkIsQ0FBQyxBQUFDO0FBQ0gsZUFBTyxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxBQUFDO0FBQzdDLGtCQUFVLEVBQUUsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxBQUFDO0FBQ2xELGNBQU0sRUFBRSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEFBQUM7TUFFM0MsS0FBSyxHQUNKOztVQUFHLFNBQVMsRUFBRSxXQUFXLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLElBQUksQUFBQztBQUNoRSxpQkFBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEFBQUM7QUFDN0IscUJBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxBQUFDO0FBQy9CLG1CQUFTLEVBQUUsV0FBVyxJQUFJLFVBQVUsQUFBQztRQUNyQyxLQUFLO09BQ0osR0FDTCxJQUFJO0tBQ0YsQ0FDTDtHQUNIO0FBQ0QsZ0JBQWMsRUFBQSwwQkFBRztpQkFDc0MsSUFBSSxDQUFDLEtBQUs7UUFBeEQsVUFBVSxVQUFWLFVBQVU7UUFBRSxLQUFLLFVBQUwsS0FBSztRQUFFLFFBQVEsVUFBUixRQUFRO1FBQUUsTUFBTSxVQUFOLE1BQU07UUFBRSxLQUFLLFVBQUwsS0FBSzs7QUFDakQsUUFBTSxHQUFHLEdBQUcsS0FBSyxLQUFLLE9BQU8sR0FBRyxZQUFZLEdBQUcsWUFBWSxDQUFDOztBQUU1RCxRQUFJLENBQUMsVUFBVSxJQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQUFBQztBQUNoRCxhQUFPO1dBQ0osSUFBSSxRQUFRLElBQUksUUFBUSxLQUFLLE1BQU0sRUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsS0FDMUIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUUvQixXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQ3BFO0FBQ0QsY0FBWSxFQUFBLHNCQUFDLENBQUMsRUFBRTtBQUNkLEtBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQzs7QUFFdEMsS0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUV6QyxRQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQzNDO0FBQ0QsYUFBVyxFQUFBLHFCQUFDLENBQUMsRUFBRTtBQUNiLEtBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixLQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7R0FDcEM7QUFDRCxTQUFPLEVBQUEsaUJBQUMsQ0FBQyxFQUFFO0FBQ1QsS0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUNlLElBQUksQ0FBQyxLQUFLO1FBQXJDLFFBQVEsVUFBUixRQUFRO1FBQUUsTUFBTSxVQUFOLE1BQU07UUFBRSxLQUFLLFVBQUwsS0FBSzs7QUFDOUIsZUFBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztHQUNsRTtDQUNGLENBQUMsQ0FBQzs7aUJBRVksVUFBVTs7O0FDbFB6QixZQUFZLENBQUM7Ozs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsU0FBUywyQkFBTSxxQkFBcUI7O0lBQ3BDLFdBQVcsMkJBQU0sd0JBQXdCOztJQUN6QyxZQUFZLDJCQUFNLHdCQUF3Qjs7SUFDMUMsVUFBVSwyQkFBTSxjQUFjOztJQUM5QixjQUFjLDJCQUFNLGtCQUFrQjs7SUFDdEMsWUFBWSwyQkFBTSxnQkFBZ0I7O0lBQ2xDLElBQUksMkJBQU0sYUFBYTs7QUFFOUIsSUFBTSxtQkFBbUIsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFNUMsV0FBUyxFQUFFO0FBQ1QsTUFBRSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDckMsU0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDeEMsaUJBQWEsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzlDLFNBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVU7QUFDM0QsWUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDM0MsdUJBQW1CLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtHQUNyRDtBQUNELFFBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQzs7QUFFcEQsaUJBQWUsRUFBQSwyQkFBRztBQUNoQixXQUFPLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztHQUM3QjtBQUNELG9CQUFrQixFQUFBLDRCQUFDLFNBQVMsRUFBRTtBQUM1QixRQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFDakMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUNyQyxVQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztLQUMxRDtHQUNGO0FBQ0QsUUFBTSxFQUFBLGtCQUFHO2lCQUNvQyxJQUFJLENBQUMsS0FBSztRQUE5QyxTQUFTLFVBQVQsU0FBUztRQUFFLElBQUksVUFBSixJQUFJO1FBQUUsUUFBUSxVQUFSLFFBQVE7UUFBRSxLQUFLLFVBQUwsS0FBSzs7QUFFdkMsV0FDRTs7UUFBSyxFQUFFLEVBQUMscUJBQXFCLEVBQUMsU0FBUyxFQUFDLFVBQVU7TUFFaEQ7O1VBQU8sT0FBTyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsU0FBUztRQUNqQyxnQ0FBUSxHQUFHLEVBQUMsZUFBZSxHQUFHO09BQ3hCO01BQ1I7O1VBQU8sT0FBTyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsVUFBVTtRQUNsQyxnQ0FBUSxHQUFHLEVBQUMsZ0JBQWdCLEdBQUc7T0FDekI7TUFFUjs7VUFBSyxFQUFFLEVBQUMsZUFBZTtRQUNyQixvQkFBQyxjQUFjLE9BQUc7UUFDbEIsb0JBQUMsVUFBVSxlQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUM7QUFDakQsa0JBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxBQUFDO0FBQ2pDLHdCQUFjLEVBQUUsSUFBSSxDQUFDLGVBQWUsQUFBQyxJQUFHO09BQ3RDO01BRU4sb0JBQUMsWUFBWSxPQUFHO01BRWhCOztVQUFNLFNBQVMsRUFBQyxXQUFXO1FBQ3pCOzs7VUFDRTs7OztXQUF3QjtVQUN4Qjs7Y0FBUSxLQUFLLEVBQUUsU0FBUyxBQUFDO0FBQ2pCLHNCQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixBQUFDO1lBQ3hDOztnQkFBUSxLQUFLLEVBQUMsR0FBRzs7YUFBZTtZQUNoQzs7Z0JBQVEsS0FBSyxFQUFDLEdBQUc7O2FBQWM7WUFDL0I7O2dCQUFRLEtBQUssRUFBQyxHQUFHOzthQUFnQjtZQUNqQzs7Z0JBQVEsS0FBSyxFQUFDLEdBQUc7O2FBQWdCO1dBQzFCO1NBQ0g7T0FDSDtNQUVQOztVQUFNLFNBQVMsRUFBQyxVQUFVO1FBQ3ZCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FDdEI7OztVQUNFOztjQUFNLFNBQVMsRUFBQyxNQUFNO1lBRWxCLElBQUksS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7V0FDckI7Z0JBQ0gsSUFBSSxLQUFLLEdBQUcsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFBO1VBQ25DLEtBQUssR0FBRzs7OztXQUF3QixHQUFHLElBQUk7U0FDbkMsR0FFUDs7O1VBQ0U7O2NBQU0sU0FBUyxFQUFDLE1BQU07WUFDbkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUc7V0FDMUM7VUFDTixJQUFJLENBQUMsbUJBQW1CLEVBQUU7U0FDcEI7T0FFTjtLQUNILENBQ047R0FDSDtBQUNELGVBQWEsRUFBQSx5QkFBRztBQUNkLFFBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7R0FDckM7QUFDRCxvQkFBa0IsRUFBQSw0QkFBQyxDQUFDLEVBQUU7QUFDcEIsZUFBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQzdDO0FBQ0QsaUJBQWUsRUFBQSwyQkFBRztBQUNoQixRQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO0FBQzVCLFVBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQzFFO0dBQ0Y7QUFDRCxxQkFBbUIsRUFBQSwrQkFBRztBQUNwQixRQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0MsUUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pELFFBQU0sS0FBSyxHQUFHLE1BQU0sS0FBSyxPQUFPLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7QUFFckQsV0FBTyxJQUFJLEtBQUssV0FBVyxtQkFBaUIsTUFBTSxjQUNoRCxJQUFJLEtBQUssU0FBUyxRQUFNLEtBQUssd0JBQW1CLE1BQU0sY0FDdEQsSUFBSSxLQUFLLFFBQVEsUUFBTSxLQUFLLHVCQUFrQixNQUFNLGNBQ3BELElBQUksS0FBSyxNQUFNLEdBQUcsT0FBTyxHQUN6QixJQUFJLEtBQUssV0FBVyxHQUFHLG1CQUFtQixHQUMxQyxJQUFJLEtBQUsscUJBQXFCLEdBQUcsOEJBQThCLEdBQy9ELElBQUksS0FBSyxzQkFBc0IsR0FBRyw4QkFBOEIsR0FBRyxFQUFFLENBQUM7R0FDekU7Q0FDRixDQUFDLENBQUM7O2lCQUVZLG1CQUFtQjs7OztBQ3BIbEMsWUFBWSxDQUFDOzs7Ozs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsV0FBVywyQkFBTSx3QkFBd0I7O0FBRWhELElBQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDOztBQUVyRCxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFOUIsV0FBUyxFQUFFO0FBQ1QsTUFBRSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDckMsVUFBTSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVU7R0FDekM7QUFDRCxRQUFNLEVBQUUsQ0FBQyxlQUFlLENBQUM7O0FBRXpCLGlCQUFlLEVBQUEsMkJBQUc7dUNBQ08sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNOztRQUFqQyxDQUFDO1FBQUUsSUFBSTtRQUFFLEdBQUc7O0FBRW5CLFdBQU87QUFDTCxXQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUU7QUFDaEIsV0FBSyxFQUFFLElBQUksR0FBRyxFQUFFO0FBQ2hCLFNBQUcsRUFBRSxHQUFHO0FBQ1IsZUFBUyxFQUFFLElBQUk7S0FDaEIsQ0FBQztHQUNIO0FBQ0QsbUJBQWlCLEVBQUEsNkJBQUc7OztBQUNsQixRQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzs7QUFFekIsTUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQSxJQUFJO2FBQUksTUFBSyxRQUFROzs7bUNBQ3JDLElBQUksQ0FBQyxLQUFLLEVBQUcsSUFBSSxDQUFDLElBQUk7O2dEQUNaLElBQUksQ0FBQyxLQUFLOzs7V0FDckI7S0FBQSxDQUFDLENBQUM7O0FBRUosTUFBRSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxVQUFBLElBQUksRUFBSTtBQUNsQyxZQUFLLFFBQVEsQ0FBQyxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ2pDLGlCQUFXLENBQUMsUUFBUSxDQUFDO0FBQ25CLFlBQUksRUFBRSxTQUFTO0FBQ2YsY0FBTSxFQUFFLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxHQUFHLE9BQU8sR0FBRyxPQUFPO09BQ25ELENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDOUIsWUFBSyxRQUFRLENBQUM7QUFDWixhQUFLLEVBQUUsTUFBSyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7QUFDaEMsYUFBSyxFQUFFLE1BQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO09BQ2pDLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNKO0FBQ0QsUUFBTSxFQUFBLGtCQUFHO0FBQ1AsV0FDRTs7UUFBSSxFQUFFLEVBQUMsT0FBTztNQUNaLG9CQUFDLEtBQUs7QUFDSixhQUFLLEVBQUMsT0FBTztBQUNiLFlBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBQztBQUN2QixpQkFBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxBQUFDLEdBQUc7TUFDckMsb0JBQUMsS0FBSztBQUNKLGFBQUssRUFBQyxPQUFPO0FBQ2IsWUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxBQUFDO0FBQ3ZCLGlCQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEFBQUMsR0FBRztLQUNsQyxDQUNMO0dBQ0g7Q0FDRixDQUFDLENBQUM7O0FBRUgsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRTlCLFFBQU0sRUFBRSxDQUFDLGVBQWUsQ0FBQzs7QUFFekIsUUFBTSxFQUFBLGtCQUFHO2lCQUMwQixJQUFJLENBQUMsS0FBSztRQUFwQyxJQUFJLFVBQUosSUFBSTtRQUFFLEtBQUssVUFBTCxLQUFLO1FBQUUsU0FBUyxVQUFULFNBQVM7O0FBQzdCLFFBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLFFBQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDdEIsUUFBTSxRQUFRLFFBQU0sR0FBRyxVQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUEsQUFBRSxDQUFDOztBQUV4RCxXQUNFOztRQUFJLFNBQVMsRUFBRSxLQUFLLElBQUksS0FBSyxLQUFLLFNBQVMsR0FBRyxVQUFVLEdBQUcsRUFBRSxDQUFBLEFBQUMsQUFBQztNQUM1RCxRQUFRO0tBQ04sQ0FDTDtHQUNIO0NBQ0YsQ0FBQyxDQUFDOztpQkFFWSxLQUFLOzs7QUNsRnBCLFlBQVksQ0FBQzs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsU0FBUywyQkFBTSxxQkFBcUI7O0lBQ3BDLFdBQVcsMkJBQU0sd0JBQXdCOzs7Ozs7SUFJekMsUUFBUSwyQkFBTSxrQkFBa0I7O0lBQ2hDLElBQUksMkJBQU0sYUFBYTs7SUFDdkIsRUFBRSwyQkFBTSxZQUFZOztBQUUzQixJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDbkMsVUFBUyxFQUFFLEVBRVY7QUFDRCxPQUFNLEVBQUUsRUFBRTtBQUNWLGdCQUFlLEVBQUEsMkJBQUc7O0FBRWpCLE1BQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDM0MsU0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25DLFNBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQzs7OztFQUlsQjtBQUNELGtCQUFpQixFQUFBLDZCQUFHO0FBQ25CLFdBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7RUFDNUM7QUFDRCxxQkFBb0IsRUFBQSxnQ0FBRztBQUN0QixXQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBQy9DO0FBQ0QsVUFBUyxFQUFBLHFCQUFHOztBQUVYLE1BQUksQ0FBQyxRQUFRLENBQUM7QUFDYixVQUFPLEVBQUUsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsT0FBTztHQUM5QyxDQUFDLENBQUM7RUFDSDtBQUNELE9BQU0sRUFBQSxrQkFBRzs7O2FBQ2EsSUFBSTs7TUFBcEIsS0FBSyxRQUFMLEtBQUs7QUFBTixNQUFRLEtBQUssUUFBTCxLQUFLLENBQVEsQUFBRSxJQUFDLEtBQUssR0FBSSxLQUFLLENBQWQsS0FBSyxDQUFTLElBQUcsSUFBSSxHQUFJLEtBQUssQ0FBYixJQUFJO01BQzVDLEtBQUssR0FBYSxLQUFLLENBQXZCLEtBQUs7TUFBRSxPQUFPLEdBQUksS0FBSyxDQUFoQixPQUFPOztBQUduQixNQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDbkIsT0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMxQixPQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixRQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzFCLE9BQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBO0lBQ3BCO0FBQ0QsWUFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUNwQjtBQUNELFNBRUM7O0tBQU8sU0FBUyxFQUFDLE9BQU87R0FDdkIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUcsRUFBRSxJQUFJO1dBQ3hCOzs7S0FDRSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLElBQUk7YUFDbkI7O1NBQUksUUFBUSxRQUFNLElBQUksVUFBSyxJQUFJLE1BQUk7T0FDbEMsb0JBQUMsSUFBSSxJQUFDLEdBQUcsUUFBTSxJQUFJLFVBQUssSUFBSSxNQUFJO0FBQy9CLGdCQUFRLFFBQU0sSUFBSSxVQUFLLElBQUksTUFBSTtBQUMvQixZQUFJLEVBQUUsS0FBSyxPQUFLLElBQUksVUFBSyxJQUFJLE9BQUksR0FBRyxLQUFLLE9BQUssSUFBSSxVQUFLLElBQUksT0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLEFBQUM7QUFDNUUsYUFBSyxFQUFFLEtBQUssT0FBSyxJQUFJLFVBQUssSUFBSSxPQUFJLEdBQUcsS0FBSyxPQUFLLElBQUksVUFBSyxJQUFJLE9BQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxBQUFDO0FBQzlFLGFBQUssRUFBRSxPQUFPLE9BQUssSUFBSSxVQUFLLElBQUksT0FBSSxBQUFDO0FBQ3JDLGVBQU8sRUFBRSxNQUFLLFlBQVksQUFBQyxHQUFFO09BQzFCO01BQUEsQ0FDTDtLQUNHO0lBQUEsQ0FDSjtHQUNLLENBQ047RUFDRjs7Q0FFRCxDQUFDLENBQUM7O0FBR0gsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQzlCLFVBQVMsRUFBRSxFQUNWO0FBQ0QsZ0JBQWUsRUFBRSwyQkFBVztBQUN2QixTQUFPO0FBQ04sT0FBSSxFQUFFLE9BQU87QUFDYixhQUFVLEVBQUUsS0FBSztHQUNqQixDQUFDO0VBQ0o7QUFDRCxrQkFBaUIsRUFBQSw2QkFBRyxFQUlyQjs7QUFFRCxtQkFBa0IsRUFBQSw4QkFBRyxFQUlwQjtBQUNELE9BQU0sRUFBRSxFQUFFOztBQUVWLGVBQWMsRUFBQSwwQkFBRztlQUVnQixJQUFJLENBQUMsS0FBSztNQUFuQyxJQUFJLFVBQUosSUFBSTtNQUFFLFFBQVEsVUFBUixRQUFRO01BQUUsS0FBSyxVQUFMLEtBQUs7ZUFDRCxJQUFJLENBQUMsS0FBSztNQUE5QixJQUFJLFVBQUosSUFBSTtNQUFFLFVBQVUsVUFBVixVQUFVOztBQUN2QixNQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztNQUMxQyxLQUFLLEdBQXVCLFVBQVUsQ0FBdEMsS0FBSztNQUFFLE9BQU8sR0FBYyxVQUFVLENBQS9CLE9BQU87TUFBRSxRQUFRLEdBQUksVUFBVSxDQUF0QixRQUFROztBQUc3QixNQUFJLElBQUksRUFBRTtBQUNULE9BQUksQ0FBQyxVQUFVLEVBQUU7Ozs7O0FBS2hCLFFBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUNsQyxXQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBOztBQUUzQixRQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsUUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLFFBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsVUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBUyxJQUFJLEVBQUM7QUFDcEMsU0FBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsU0FBSSxDQUFDLEdBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDeEIsQ0FBQyxHQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsV0FBTSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7S0FDMUIsQ0FBQyxDQUFDOztJQUdILE1BQ0k7QUFDSixXQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7QUFDN0IsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQ25DO0FBQ0QsY0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQzs7R0FFakU7O09BRUk7QUFDSixVQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNyQyxPQUFJLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUM1QyxRQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBQztBQUNwQixZQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLFlBQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ25FLGdCQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3pELFlBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEIsWUFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDN0IsU0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ2I7Ozs7OztBQUFBLElBTUQ7R0FDRDtFQUNEOztBQUVELE1BQUssRUFBQSxpQkFBRztBQUNQLE1BQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLEdBQUksTUFBTSxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7RUFDMUU7O0FBR0QsT0FBTSxFQUFBLGtCQUFFO2VBQ29CLElBQUksQ0FBQyxLQUFLO01BQWhDLElBQUksVUFBSixJQUFJO01BQUUsS0FBSyxVQUFMLEtBQUs7TUFBRSxLQUFLLFVBQUwsS0FBSztNQUVsQixJQUFJLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBbEIsSUFBSTs7QUFHVCxNQUFJLEtBQUssR0FBRztBQUNYLE9BQUksRUFBRSxDQUFDLENBQUMsSUFBSTtBQUNaLFFBQUssRUFBRSxLQUFLO0dBQ1osQ0FBQztBQUNGLE9BQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDbkIsTUFBSSxJQUFJLEVBQUU7QUFDVCxRQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFFBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7R0FDcEI7O0FBRUQsU0FDQzs7O0dBQ0MsNkJBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQUFBQztBQUN6QixXQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQUFBQyxHQUN4QjtHQUNELENBQ0w7RUFDRjs7Q0FFRCxDQUFDLENBQUM7O2lCQUVZLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDOzs7OztBQzFMN0MsWUFBWSxDQUFDOzs7O0lBRU4sS0FBSywyQkFBTSxjQUFjOztJQUN6QixLQUFLLDJCQUFNLFNBQVM7O0lBQ3BCLFNBQVMsMkJBQU0scUJBQXFCOztJQUNwQyxXQUFXLDJCQUFNLHdCQUF3Qjs7SUFDekMsSUFBSSwyQkFBTSxhQUFhOztBQUU5QixJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFbkMsV0FBUyxFQUFFO0FBQ1QsTUFBRSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDckMsVUFBTSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVU7QUFDeEMsU0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVTtBQUMzRCxhQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUMxQyxZQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUN6Qyx1QkFBbUIsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0dBQ3JEO0FBQ0QsUUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7O0FBRXRDLGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsV0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0dBQy9DO0FBQ0QsbUJBQWlCLEVBQUEsNkJBQUc7QUFDbEIsYUFBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQzVDO0FBQ0Qsc0JBQW9CLEVBQUEsZ0NBQUc7QUFDckIsYUFBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQzdDO0FBQ0QsUUFBTSxFQUFBLGtCQUFHO2lCQUM2QyxJQUFJLENBQUMsS0FBSztRQUF2RCxFQUFFLFVBQUYsRUFBRTtRQUFFLE1BQU0sVUFBTixNQUFNO1FBQUUsUUFBUSxVQUFSLFFBQVE7UUFBRSxtQkFBbUIsVUFBbkIsbUJBQW1COztBQUNoRCxRQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7QUFFM0MsV0FDRTs7UUFBUSxTQUFTLEVBQUMsVUFBVTtNQUUxQixvQkFBQyxLQUFLO0FBQ0osVUFBRSxFQUFFLEVBQUUsQUFBQztBQUNQLGNBQU0sRUFBRSxNQUFNLEFBQUMsR0FBRztNQUVwQjs7VUFBTSxFQUFFLEVBQUMsV0FBVzthQUNkLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO09BQ3JCO01BRVA7O1VBQUcsU0FBUyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsR0FBRzs7T0FBYTtNQUV2QyxDQUFDLFFBQVEsSUFBSSxtQkFBbUIsR0FDL0I7O1VBQUcsU0FBUyxFQUFDLHFCQUFxQjtBQUM5QixpQkFBTyxFQUFFLElBQUksQ0FBQyxTQUFTLEFBQUM7O09BRXhCLEdBQ0wsUUFBUSxHQUNQOztVQUFHLFNBQVMsRUFBQyxzQkFBc0I7QUFDaEMsaUJBQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxBQUFDOztPQUV4QixHQUNMLElBQUk7TUFFTDs7VUFBRyxFQUFFLEVBQUMsV0FBVztBQUNkLGlCQUFPLEVBQUUsV0FBVyxDQUFDLGdCQUFnQixBQUFDO1FBQ3RDLFdBQVcsR0FDVjs7WUFBTSxFQUFFLEVBQUMsY0FBYztVQUNwQixXQUFXLEdBQUcsQ0FBQyxHQUFHLFdBQVcsR0FBRyxJQUFJO1NBQ2hDLEdBQ1IsSUFBSTtRQUNMLDZCQUFLLEdBQUcsRUFBQyxlQUFlO0FBQ25CLGVBQUssRUFBQyxJQUFJO0FBQ1YsZ0JBQU0sRUFBQyxJQUFJLEdBQUc7O09BRWpCO0tBQ0csQ0FDVDtHQUNIO0FBQ0QsZUFBYSxFQUFBLHlCQUFHO0FBQ2QsUUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7R0FDdkQ7QUFDRCxXQUFTLEVBQUEscUJBQUc7aUJBQ2tCLElBQUksQ0FBQyxLQUFLO1FBQS9CLEVBQUUsVUFBRixFQUFFO1FBQUUsTUFBTSxVQUFOLE1BQU07UUFBRSxLQUFLLFVBQUwsS0FBSzs7QUFFeEIsTUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDaEIsV0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDaEIsV0FBSyxFQUFFLEtBQUs7S0FDYixDQUFDLENBQUM7R0FDSjtBQUNELFlBQVUsRUFBQSxzQkFBRztpQkFDMEMsSUFBSSxDQUFDLEtBQUs7UUFBeEQsRUFBRSxVQUFGLEVBQUU7UUFBRSxNQUFNLFVBQU4sTUFBTTtRQUFFLFNBQVMsVUFBVCxTQUFTO1FBQUUsbUJBQW1CLFVBQW5CLG1CQUFtQjs7QUFFakQsUUFBSSxDQUFDLG1CQUFtQixFQUFFO0FBQ3hCLGVBQVMsQ0FBQyxNQUFNLEVBQUUsOENBQThDLEdBQzlELHNCQUFzQixDQUFDLENBQUM7QUFDMUIsYUFBTztLQUNSOztBQUVELE1BQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQ3ZCLFdBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ2pCLENBQUMsQ0FBQztBQUNILGFBQVMsQ0FBQyxNQUFNLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztHQUNoRDtDQUNGLENBQUMsQ0FBQzs7aUJBRVksVUFBVTs7O0FDcEd6QixZQUFZLENBQUM7Ozs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsVUFBVSwyQkFBTSxjQUFjOztJQUM5QixJQUFJLDJCQUFNLFFBQVE7O0lBQ2xCLEtBQUssMkJBQU0sU0FBUzs7SUFDcEIsV0FBVywyQkFBTSx3QkFBd0I7O0lBQ3pDLFNBQVMsMkJBQU0scUJBQXFCOztJQUNwQyxtQkFBbUIsMkJBQU0sdUJBQXVCOztJQUNoRCxrQkFBa0IsMkJBQU0sc0JBQXNCOztJQUM3QyxHQUFHLFdBQU8sV0FBVyxFQUFyQixHQUFHOztJQUNILEtBQUssV0FBTyxhQUFhLEVBQXpCLEtBQUs7O0FBRWIsSUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRXRDLFdBQVMsRUFBRTtBQUNULE1BQUUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3JDLFVBQU0sRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVO0dBQ3pDOztBQUVELGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsV0FBTztBQUNMLHlCQUFtQixFQUFFLEtBQUs7QUFDMUIsV0FBSyxFQUFFLE9BQU87QUFDZCxXQUFLLEVBQUUsR0FBRyxDQUFDO0FBQ1QsWUFBSSxFQUFFLEtBQUs7QUFDWCxlQUFPLEVBQUUsRUFBRTtBQUNYLFlBQUksRUFBRSxNQUFNO0FBQ1osaUJBQVMsRUFBRTtBQUNULGNBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtBQUNyQixnQkFBTSxFQUFFLElBQUksQ0FBQyxjQUFjO0FBQzNCLGlCQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWU7U0FDOUI7T0FDRixDQUFDO0FBQ0YsbUJBQWEsRUFBRSxLQUFLO0FBQ3BCLGNBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUTtLQUN4QyxDQUFDO0dBQ0g7QUFDRCxtQkFBaUIsRUFBQSw2QkFBRzs7O2lCQUNHLElBQUksQ0FBQyxLQUFLO1FBQXhCLEVBQUUsVUFBRixFQUFFO1FBQUUsTUFBTSxVQUFOLE1BQU07O0FBRWpCLE1BQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFO2FBQU0sTUFBSyxRQUFRLENBQUM7QUFDekMsYUFBSyxFQUFFLE1BQUssS0FBSyxDQUFDLEtBQUssQ0FDcEIsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FDakIsR0FBRyxDQUFDLFNBQVMsRUFBRSxzQ0FBc0MsQ0FBQyxDQUN0RCxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztPQUN2QixDQUFDO0tBQUEsQ0FBQyxDQUFDOztBQUVKLE1BQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2QsV0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDaEIsVUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0FBQ3BCLFNBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ2YsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUEsSUFBSSxFQUFJO0FBQ3RCLFVBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxPQUFPLEVBQUU7QUFDMUIsY0FBSyxRQUFRLENBQUMsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztPQUNqQztLQUNGLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRTthQUNuQixNQUFLLFFBQVEsQ0FBQyxFQUFDLG1CQUFtQixFQUFFLElBQUksRUFBQyxFQUFFLFlBQU07QUFDL0MsWUFBSSxNQUFLLEtBQUssQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO0FBQ2hDLFlBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQ25CLGlCQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNoQixpQkFBSyxFQUFFLE9BQU87V0FDZixDQUFDLENBQUM7U0FDSjtPQUNGLENBQUM7S0FBQSxDQUFDLENBQUM7O0FBRU4sTUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBTTtBQUNsQixZQUFNLENBQUMsS0FBSyxDQUNWLGtFQUFrRSxDQUFDLENBQUM7QUFDdEUsWUFBTSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7S0FDdkIsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsVUFBQSxJQUFJLEVBQUk7QUFDL0IsaUJBQVcsQ0FBQyxRQUFRLENBQUM7QUFDbkIsWUFBSSxFQUFFLFFBQVE7QUFDZCxjQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxPQUFPLEdBQUcsT0FBTyxHQUFHLE9BQU87T0FDbkQsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUU7YUFDdkIsTUFBSyxVQUFVLENBQUMsT0FBTyxFQUFFLDZDQUE2QyxDQUFDO0tBQUEsQ0FBQyxDQUFDOztBQUUzRSxNQUFFLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFO2FBQ3hCLE1BQUssVUFBVSxDQUFDLE1BQU0sRUFBRSxrQ0FBa0MsQ0FBQztLQUFBLENBQUMsQ0FBQzs7QUFFL0QsTUFBRSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0FBQzlCLGlCQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDdEIsWUFBSyxRQUFRLENBQUM7QUFDWixhQUFLLEVBQUUsTUFBSyxLQUFLLENBQUMsS0FBSyxLQUFLLE9BQU8sR0FBRyxPQUFPLEdBQUcsT0FBTztBQUN2RCxhQUFLLEVBQUUsTUFBSyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO09BQzNDLEVBQUUsWUFBTTtBQUNQLFlBQUksTUFBSyxLQUFLLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtBQUNoQyxZQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNuQixpQkFBSyxFQUFFLE1BQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDM0IsaUJBQUssRUFBRSxPQUFPO1dBQ2YsQ0FBQyxDQUFDO1NBQ0o7T0FDRixDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxZQUFPO0FBQ3BDLFVBQUksQ0FBQyxNQUFLLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ3RDLGNBQUssVUFBVSxDQUFDLE1BQU0sRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO09BQzVEOztBQUVELFlBQUssUUFBUSxDQUFDLEVBQUMsbUJBQW1CLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztLQUM3QyxDQUFDLENBQUM7O0FBRUgsYUFBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQzVDO0FBQ0Qsc0JBQW9CLEVBQUEsZ0NBQUc7QUFDckIsYUFBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQzdDOztBQUtELFFBQU0sRUFBQSxrQkFBRztpQkFDYyxJQUFJLENBQUMsS0FBSztRQUF4QixFQUFFLFVBQUYsRUFBRTtRQUFFLE1BQU0sVUFBTixNQUFNO2lCQUM2QyxJQUFJLENBQUMsS0FBSztRQUFqRSxLQUFLLFVBQUwsS0FBSztRQUFFLGFBQWEsVUFBYixhQUFhO1FBQUUsUUFBUSxVQUFSLFFBQVE7UUFBRSxtQkFBbUIsVUFBbkIsbUJBQW1COztBQUMxRCxRQUFNLFdBQVcsR0FBRztBQUNsQixRQUFFLEVBQUUsRUFBRTtBQUNOLFdBQUssRUFBRSxLQUFLO0FBQ1osZUFBUyxFQUFFLElBQUksQ0FBQyxVQUFVO0FBQzFCLHlCQUFtQixFQUFFLG1CQUFtQjtLQUN6QyxDQUFDOztBQUVGLFdBQ0U7OztNQUNFLG9CQUFDLFVBQVUsZUFDTCxXQUFXO0FBQ2YsY0FBTSxFQUFFLE1BQU0sQUFBQztBQUNmLGdCQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQUFBQyxJQUFHO01BRXRDLG9CQUFDLElBQUksZUFDQyxXQUFXO0FBQ2YsYUFBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQUFBQztBQUNqQixxQkFBYSxFQUFFLGFBQWEsQUFBQyxJQUFHO01BY2hDLG9CQUFDLGtCQUFrQixPQUFHO01BS3hCLG9CQUFDLEtBQUssSUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEFBQUMsR0FBRztLQUM3QixDQUNOO0dBQ0g7O0FBS0QsZUFBYSxFQUFBLHlCQUFHO0FBQ2QsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztHQUMxRDtBQUNELFlBQVUsRUFBQSxvQkFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3hCLFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixXQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQ3BCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQ2pCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQ3ZCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO0tBQ3JCLENBQUMsQ0FBQztHQUNKO0FBQ0QsWUFBVSxFQUFBLHNCQUFHO0FBQ1gsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQztHQUM3RDtBQUNELGdCQUFjLEVBQUEsMEJBQUc7aUJBQ00sSUFBSSxDQUFDLEtBQUs7UUFBeEIsRUFBRSxVQUFGLEVBQUU7UUFBRSxNQUFNLFVBQU4sTUFBTTs7QUFFakIsTUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtBQUN4QixXQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNoQixVQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7QUFDcEIsU0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDZixDQUFDLENBQUM7QUFDSCxRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDbkI7QUFDRCxpQkFBZSxFQUFBLDJCQUFHO2lCQUNLLElBQUksQ0FBQyxLQUFLO1FBQXhCLEVBQUUsVUFBRixFQUFFO1FBQUUsTUFBTSxVQUFOLE1BQU07O0FBRWpCLE1BQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7QUFDekIsV0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDakIsQ0FBQyxDQUFDO0FBQ0gsUUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0dBQ25CO0FBQ0QsZUFBYSxFQUFBLHVCQUFDLENBQUMsRUFBRTtBQUNmLFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixtQkFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhO0tBQ3pDLENBQUMsQ0FBQztHQUNKLEVBQ0YsQ0FBQyxDQUFDOztpQkFFWSxhQUFhOzs7Ozs7Ozs7Ozs7QUMvTTVCLFlBQVksQ0FBQzs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsU0FBUywyQkFBTSxxQkFBcUI7O0lBQ3BDLFdBQVcsMkJBQU0sd0JBQXdCOztJQUN6QyxZQUFZLDJCQUFNLHdCQUF3Qjs7SUFDMUMsVUFBVSwyQkFBTSxjQUFjOztJQUM3QixLQUFLLFdBQU8sYUFBYSxFQUF6QixLQUFLOztJQUNOLGNBQWMsMkJBQU0sa0JBQWtCOztJQUN0QyxZQUFZLDJCQUFNLGdCQUFnQjs7SUFDbEMsSUFBSSwyQkFBTSxhQUFhOzs7O0FBSTlCLElBQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRTVDLFVBQVMsRUFBRSxFQUVWO0FBQ0QsT0FBTSxFQUFFLEVBQUU7QUFDVixnQkFBZSxFQUFBLDJCQUFHO0FBQ2pCLFNBQU8sU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0VBQzVCO0FBQ0QsZ0JBQWUsRUFBQSwyQkFBRyxFQUVqQjtBQUNELG1CQUFrQixFQUFBLDRCQUFDLFNBQVMsRUFBRSxFQUU3QjtBQUNELE9BQU0sRUFBQSxrQkFBRztlQUNtQyxJQUFJLENBQUMsS0FBSztNQUE5QyxTQUFTLFVBQVQsU0FBUztNQUFFLElBQUksVUFBSixJQUFJO01BQUUsUUFBUSxVQUFSLFFBQVE7TUFBRSxLQUFLLFVBQUwsS0FBSzs7QUFDdkMsU0FDQzs7S0FBSyxFQUFFLEVBQUMscUJBQXFCLEVBQUMsU0FBUyxFQUFDLFVBQVU7R0FDakQ7O01BQUssRUFBRSxFQUFDLGVBQWU7SUFFdEIsb0JBQUMsY0FBYyxPQUFHO0lBRWxCLG9CQUFDLEtBQUssSUFBQyxJQUFJLEVBQUUsQ0FBQyxBQUFDLEdBQUU7SUFFWjtHQUVOOztNQUFNLFNBQVMsRUFBQyxVQUFVO0lBQ3hCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FDdkI7OztXQUNLLElBQUksS0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQTtLQUM1QixHQUNQOzs7S0FDQzs7UUFBTSxTQUFTLEVBQUMsTUFBTTtNQUNuQixRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLE9BQU8sR0FBRyxHQUFHLEdBQUcsR0FBRztNQUMxQztLQUNOLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtLQUNuQjtJQUVKO0dBR0YsQ0FDTjtFQUNEOztBQUVELGNBQWEsRUFBQSx5QkFBRztBQUNmLE1BQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7RUFDcEM7O0FBRUQsb0JBQW1CLEVBQUEsK0JBQUc7QUFDckIsb0JBQWtCO0VBQ2xCOztDQUVELENBQUMsQ0FBQzs7aUJBRVksa0JBQWtCOzs7QUN0RWpDLFlBQVksQ0FBQzs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsRUFBRSwyQkFBTSxZQUFZOztBQUUzQixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFOUIsV0FBUyxFQUFFO0FBQ1QsUUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7R0FDeEM7QUFDRCxRQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQzs7QUFFdEMsb0JBQWtCLEVBQUEsOEJBQUc7QUFDbkIsUUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUUzQyxRQUFJLE1BQU0sRUFDUixRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUV0RCxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztHQUM1RDtBQUNELFFBQU0sRUFBQSxrQkFBRztBQUNQLFFBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQzdCLFFBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsUUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFeEMsV0FDRTs7UUFBSyxTQUFTLEVBQUUsRUFBRSxDQUFDO0FBQ1osc0JBQVksRUFBRSxJQUFJO0FBQ2xCLGtCQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7U0FDNUIsQ0FBQyxBQUFDO0FBQ0gsZUFBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEFBQUM7TUFDNUI7OztRQUNFOzs7O1NBQXNCO1FBQ3RCOzs7VUFBTyxJQUFJLEtBQUssTUFBTSxHQUFHLElBQUksR0FBRyxTQUFTO1NBQVE7UUFDakQsK0JBQU07UUFDTjs7OztTQUF3QjtRQUN4Qjs7O1VBQU8sSUFBSSxLQUFLLE1BQU0sR0FBRyxJQUFJLEdBQUcsUUFBUTtTQUFRO09BQzlDO01BRUo7O1VBQUssU0FBUyxFQUFDLE9BQU87QUFDakIsaUJBQU8sRUFBRSxVQUFBLENBQUM7bUJBQUksQ0FBQyxDQUFDLGVBQWUsRUFBRTtXQUFBLEFBQUM7UUFDckM7OztVQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1NBQUs7UUFFM0IsSUFBSSxLQUFLLE1BQU0sR0FDZDs7WUFBRyxTQUFTLEVBQUMsUUFBUTtBQUNsQixtQkFBTyxFQUFFLFNBQVMsQ0FBQyxJQUFJLEFBQUM7O1NBRXZCLEdBQUcsQ0FFUDs7WUFBRyxHQUFHLEVBQUMsR0FBRztBQUNQLHFCQUFTLEVBQUMsS0FBSztBQUNmLGlCQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLEFBQUM7QUFDckIsbUJBQU8sRUFBRSxTQUFTLENBQUMsTUFBTSxBQUFDOztTQUV6QixFQUNKOztZQUFHLEdBQUcsRUFBQyxHQUFHO0FBQ1AscUJBQVMsRUFBQyxjQUFjO0FBQ3hCLGlCQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLEFBQUM7QUFDdEIsbUJBQU8sRUFBRSxTQUFTLENBQUMsT0FBTyxBQUFDOztTQUUxQixDQUNMO09BQ0c7S0FDRixDQUNOO0dBQ0g7QUFDRCxZQUFVLEVBQUEsb0JBQUMsQ0FBQyxFQUFFO0FBQ1osUUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLFFBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFbkQsUUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO0FBQ25CLFVBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDcEMsaUJBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztPQUNsQjtLQUNGLE1BQU0sSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFO0FBQzNCLFVBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDbEIsaUJBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztPQUNwQixNQUFNLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDekIsaUJBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztPQUNyQjtLQUNGO0dBQ0Y7QUFDRCxZQUFVLEVBQUEsc0JBQUc7QUFDWCxRQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDekM7Q0FDRixDQUFDLENBQUM7O2lCQUVZLEtBQUs7OztBQ3ZGcEIsWUFBWSxDQUFDOzs7O0lBRU4sS0FBSywyQkFBTSxjQUFjOztJQUN6QixTQUFTLDJCQUFNLHFCQUFxQjs7SUFDcEMsWUFBWSwyQkFBTSx3QkFBd0I7O0FBRWpELElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUVyQyxRQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUM7O0FBRXBELGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsV0FBTztBQUNMLFdBQUssRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFO0tBQzVCLENBQUM7R0FDSDtBQUNELFFBQU0sRUFBQSxrQkFBRztBQUNQLFdBQ0U7O1FBQU8sRUFBRSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsVUFBVTtNQUNwQzs7O1FBQ0U7OztVQUNFOzs7O1dBQXVCO1NBQ3BCO09BQ0M7TUFDUjs7O1FBQ0csSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUM7aUJBQzNCOztjQUFJLEdBQUcsRUFBRSxDQUFDLEFBQUM7WUFDVDs7O2NBQ0U7OztzQkFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2VBQWE7YUFDM0I7WUFDSixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLENBQUM7cUJBQ2Y7O2tCQUFJLEdBQUcsRUFBRSxDQUFDLEFBQUM7Z0JBQ1Q7OztrQkFBTyxJQUFJO2lCQUFRO2VBQ2hCO2FBQ04sQ0FBQyxDQUFDLE9BQU8sRUFBRTtXQUNUO1NBQ04sQ0FBQyxDQUFDLE9BQU8sRUFBRTtPQUNOO0tBQ0YsQ0FDUjtHQUNIO0FBQ0QsZUFBYSxFQUFBLHlCQUFHO0FBQ2QsUUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLFdBQUssRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFO0tBQzVCLENBQUMsQ0FBQztHQUNKO0NBQ0YsQ0FBQyxDQUFDOztpQkFFWSxZQUFZOzs7Ozs7O0lDL0NwQixTQUFTLDJCQUFNLHFCQUFxQjs7aUJBRTVCLFNBQVMsQ0FBQztBQUN2QixtQkFBaUIsRUFBRSxJQUFJO0FBQ3ZCLGdCQUFjLEVBQUUsSUFBSTtDQUNyQixDQUFDOzs7OztBQ0xGLElBQU0sV0FBVyxHQUFHOzs7QUFHbEIsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHOztBQUVSLEtBQUssR0FBRztBQUNSLEtBQUssR0FBRztBQUNSLEtBQUssR0FBRztBQUNSLEtBQUssR0FBRztBQUNSLEtBQUssR0FBRztBQUNSLEtBQUssR0FBRzs7QUFFUixLQUFHLEVBQUUsU0FBUztDQUNmLENBQUM7O2lCQUVhLFdBQVc7Ozs7Ozs7SUNwQm5CLFNBQVMsMkJBQU0scUJBQXFCOztpQkFFNUIsU0FBUyxDQUFDO0FBQ3ZCLFdBQVMsRUFBRSxJQUFJO0FBQ2YsWUFBVSxFQUFFLElBQUk7QUFDaEIsU0FBTyxFQUFFLElBQUk7QUFDYixNQUFJLEVBQUUsSUFBSTtBQUNWLFdBQVMsRUFBRSxJQUFJO0FBQ2Ysa0JBQWdCLEVBQUUsSUFBSTtDQUN2QixDQUFDOzs7OztJQ1RNLFVBQVUsV0FBTyxNQUFNLEVBQXZCLFVBQVU7O2lCQUVILE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxVQUFVLEVBQUUsRUFBRTs7QUFFN0Msa0JBQWdCLEVBQUUsMEJBQVMsTUFBTSxFQUFFO0FBQ2pDLFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixZQUFNLEVBQUUsYUFBYTtBQUNyQixZQUFNLEVBQUUsTUFBTTtLQUNmLENBQUMsQ0FBQztHQUNKO0NBQ0YsQ0FBQzs7Ozs7QUNWRixJQUFNLFdBQVcsR0FBRztBQUNoQixjQUFZO0FBQ1IsZUFBUztBQUNMLG9CQUFRLEVBQUUsWUFBWTtBQUN0QixvQkFBUSxFQUFFLFlBQVk7QUFDdEIsbUJBQU8sRUFBRSxZQUFZO1NBQ3hCO0FBQ0QsY0FBUTtBQUNKLHFCQUFTLEVBQUUsWUFBWTtBQUN2QixvQkFBUSxFQUFFLFlBQVk7QUFDdEIsbUJBQU8sRUFBRSxZQUFZO1NBQ3hCO0tBQ0o7QUFDRCxZQUFVO0FBQ04sZUFBUztBQUNMLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtBQUNELGNBQVE7QUFDSixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLHFCQUFTLEVBQUUsUUFBUTtBQUNuQixvQkFBUSxFQUFFLFFBQVE7QUFDbEIsb0JBQVEsRUFBRSxRQUFRO1NBQ3JCO0tBQ0o7QUFDRCxjQUFZO0FBQ1IsZUFBUztBQUNMLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG9CQUFRLEVBQUUsTUFBTTtTQUNuQjtBQUNELGNBQVE7QUFDSixvQkFBUSxFQUFFLFFBQVE7QUFDbEIsbUJBQU8sRUFBRSxRQUFRO0FBQ2pCLG1CQUFPLEVBQUUsUUFBUTtBQUNqQixvQkFBUSxFQUFFLFFBQVE7QUFDbEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG9CQUFRLEVBQUUsTUFBTTtTQUNuQjtLQUNKO0FBQ0QsYUFBVztBQUNQLGVBQVM7QUFDTCxvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YscUJBQVMsRUFBRSxRQUFRO0FBQ25CLG9CQUFRLEVBQUUsUUFBUTtBQUNsQixvQkFBUSxFQUFFLFFBQVE7U0FDckI7QUFDRCxjQUFRO0FBQ0osb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsT0FBTztBQUNqQixtQkFBTyxFQUFFLE9BQU87U0FDbkI7S0FDSjtBQUNELGFBQVc7QUFDUCxlQUFTO0FBQ0wsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtBQUNELGNBQVE7QUFDSixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO1NBQ2xCO0tBQ0o7QUFDRCxVQUFRO0FBQ0osZUFBUztBQUNMLG9CQUFRLEVBQUUsT0FBTztBQUNqQixtQkFBTyxFQUFFLE9BQU87U0FDbkI7QUFDRCxjQUFRO0FBQ0osb0JBQVEsRUFBRSxPQUFPO0FBQ2pCLG1CQUFPLEVBQUUsT0FBTztTQUNuQjtLQUNKO0FBQ0QsYUFBVztBQUNQLGVBQVM7QUFDTCxtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO1NBQ25CO0FBQ0QsY0FBUTtBQUNKLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtTQUNuQjtLQUNKO0FBQ0QsWUFBVTtBQUNOLGVBQVM7QUFDTCxxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixtQkFBTyxFQUFFLE1BQU07QUFDZixtQkFBTyxFQUFFLE1BQU07U0FDbEI7QUFDRCxjQUFRO0FBQ0osb0JBQVEsRUFBRSxPQUFPO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO1NBQ2xCO0tBQ0o7QUFDRCxnQkFBYztBQUNWLGVBQVM7QUFDTCxvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO1NBQ25CO0FBQ0QsY0FBUTtBQUNKLG9CQUFRLEVBQUUsUUFBUTtBQUNsQixvQkFBUSxFQUFFLFFBQVE7QUFDbEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtLQUNKO0FBQ0QsY0FBWTtBQUNSLGVBQVM7QUFDTCxvQkFBUSxFQUFFLE9BQU87QUFDakIsbUJBQU8sRUFBRSxPQUFPO0FBQ2hCLHFCQUFTLEVBQUUsTUFBTTtBQUNqQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO1NBQ2xCO0FBQ0QsY0FBUTtBQUNKLHFCQUFTLEVBQUUsTUFBTTtBQUNqQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtLQUNKO0FBQ0QsWUFBVTtBQUNOLGVBQVM7QUFDTCxxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07U0FDbEI7QUFDRCxjQUFRLEVBRVA7S0FDSjtBQUNELGFBQVc7QUFDUCxlQUFTO0FBQ0wscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLHFCQUFTLEVBQUUsTUFBTTtBQUNqQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO1NBQ25CO0FBQ0QsY0FBUTtBQUNKLHFCQUFTLEVBQUUsUUFBUTtBQUNuQixvQkFBUSxFQUFFLFFBQVE7QUFDbEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtLQUNKO0FBQ0QsWUFBVTtBQUNOLGVBQVM7QUFDTCxxQkFBUyxFQUFFLE9BQU87QUFDbEIsb0JBQVEsRUFBRSxPQUFPO0FBQ2pCLG9CQUFRLEVBQUUsT0FBTztBQUNqQixtQkFBTyxFQUFFLE9BQU87U0FDbkI7QUFDRCxjQUFRO0FBQ0oscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO1NBQ2xCO0tBQ0o7QUFDRCxZQUFVO0FBQ04sZUFBUztBQUNMLG9CQUFRLEVBQUUsT0FBTztBQUNqQixtQkFBTyxFQUFFLE9BQU87QUFDaEIscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO1NBQ25CO0FBQ0QsY0FBUTtBQUNKLHFCQUFTLEVBQUUsT0FBTztBQUNsQixvQkFBUSxFQUFFLE9BQU87QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtLQUNKO0FBQ0QsVUFBUTtBQUNKLGVBQVM7QUFDTCxvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLHFCQUFTLEVBQUUsTUFBTTtBQUNqQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtBQUNELGNBQVE7QUFDSixxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtLQUNKO0FBQ0QsWUFBVTtBQUNOLGVBQVM7QUFDTCxxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtBQUNELGNBQVE7QUFDSixxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtLQUNKO0NBQ0osQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBd0JjLFdBQVc7OztBQzlSMUIsWUFBWSxDQUFDOzs7O0lBRU4sRUFBRSwyQkFBTSxrQkFBa0I7O0FBQ2pDLElBQU0sTUFBTSxHQUFHLHVCQUF1QixDQUFDO0FBQ3ZDLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQzs7aUJBRUgsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Ozs7O0FDTjdCLElBQU0sWUFBWSxHQUFHO0FBQ25CLGVBQWEsRUFBQSx1QkFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFO0FBQzdCLFdBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLE1BQU0sS0FBSyxJQUFJLE9BQU8sQ0FBQSxBQUFDLEdBQzVDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxRQUFRLENBQUM7R0FDakM7Q0FDRixDQUFDOztpQkFFYSxZQUFZOzs7Ozs7O0lDUHBCLFNBQVMsMkJBQU0scUJBQXFCOztBQUUzQyxJQUFNLFlBQVksR0FBRztBQUNuQixtQkFBaUIsRUFBQSw2QkFBRztBQUNsQixhQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDNUM7QUFDRCxzQkFBb0IsRUFBQSxnQ0FBRztBQUNyQixhQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDN0M7Q0FDRixDQUFDOztpQkFFYSxZQUFZOzs7QUNYM0IsWUFBWSxDQUFDOzs7O0lBRU4sYUFBYSwyQkFBTSw2QkFBNkI7O0lBQzlCLFlBQVksV0FBTyxlQUFlLEVBQW5ELGFBQWE7O0lBQ2QsYUFBYSwyQkFBTSw0QkFBNEI7O3lCQUM5QixXQUFXOztJQUEzQixJQUFJLGNBQUosSUFBSTtJQUFFLEdBQUcsY0FBSCxHQUFHOztBQUVqQixJQUFNLFlBQVksR0FBRyxRQUFRLENBQUM7O0FBRTlCLElBQUksU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ3ZCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUNyQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7O0FBRXpCLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUU7QUFDMUQsVUFBUSxFQUFBLG9CQUFHO0FBQ1QsV0FBTztBQUNMLGNBQVEsRUFBRSxTQUFTO0FBQ25CLGlCQUFXLEVBQUUsWUFBWTtBQUN6QixrQkFBWSxFQUFFLGFBQWE7S0FDNUIsQ0FBQztHQUNIO0NBQ0YsQ0FBQyxDQUFDOztBQUVILFNBQVMsZ0JBQWdCLEdBQUc7QUFDMUIsZUFBYSxHQUFHLENBQUMsYUFBYSxDQUFDO0FBQy9CLGNBQVksR0FBRyxDQUFDLENBQUM7Q0FDbEI7O0FBRUQsU0FBUyxhQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7QUFDbkQsV0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQzdCLFdBQU8sRUFBRSxPQUFPO0FBQ2hCLGFBQVMsRUFBRSxTQUFTO0dBQ3JCLENBQUMsQ0FBQyxDQUFDOztBQUVKLE1BQUksUUFBUSxJQUFJLGFBQWEsRUFBRTtBQUM3QixnQkFBWSxJQUFJLENBQUMsQ0FBQztHQUNuQjtDQUNGOztBQUVELGFBQWEsQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPLEVBQUk7QUFDaEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7QUFFOUIsVUFBUSxNQUFNLENBQUMsVUFBVTtBQUN2QixTQUFLLGFBQWEsQ0FBQyxpQkFBaUI7QUFDbEMsc0JBQWdCLEVBQUUsQ0FBQztBQUNuQixZQUFNOztBQUFBLEFBRVIsU0FBSyxhQUFhLENBQUMsY0FBYztBQUMvQixtQkFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakUsWUFBTTs7QUFBQSxBQUVSO0FBQ0UsYUFBTyxJQUFJLENBQUM7QUFBQSxHQUNmOztBQUVELFdBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDN0IsU0FBTyxJQUFJLENBQUM7Q0FDYixDQUFDLENBQUM7O2lCQUVZLFNBQVM7OztBQzNEeEIsWUFBWSxDQUFDOzs7O0lBRU4sYUFBYSwyQkFBTSw2QkFBNkI7O0lBQzlCLFlBQVksV0FBTyxlQUFlLEVBQW5ELGFBQWE7O0lBQ2QsYUFBYSwyQkFBTSw0QkFBNEI7O0lBQy9DLFdBQVcsMkJBQU0sMEJBQTBCOztJQUMxQyxLQUFLLFdBQU8sVUFBVSxFQUF0QixLQUFLOzt5QkFDNEIsV0FBVzs7SUFBNUMsSUFBSSxjQUFKLElBQUk7SUFBRSxHQUFHLGNBQUgsR0FBRztJQUFFLFVBQVUsY0FBVixVQUFVO0lBQUUsR0FBRyxjQUFILEdBQUc7Ozs7O0FBSWxDLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQztBQUM5QixJQUFNLFVBQVUsR0FBRyxVQUFVLENBQUM7O0FBRTlCLElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxlQUFlLENBQUM7QUFDcEIsSUFBSSxNQUFNLENBQUM7QUFDWCxJQUFJLFVBQVUsQ0FBQztBQUNmLElBQUksS0FBSyxDQUFDO0FBQ1YsSUFBSSxNQUFNLENBQUM7QUFDWCxJQUFJLFNBQVMsQ0FBQztBQUNkLElBQUksTUFBTSxDQUFDOztBQUVYLElBQUksTUFBTSxHQUFHLEVBQUU7SUFDWCxRQUFRLEdBQUcsRUFBRTtJQUNiLFNBQVMsQ0FBQzs7QUFHZCxlQUFlLEVBQUUsQ0FBQzs7QUFFbEIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLFNBQVMsRUFBRTtBQUN0RCxxQkFBaUIsRUFBRSwyQkFBUyxFQUFFLEVBQUU7QUFDOUIsWUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDM0I7O0FBRUQsd0JBQW9CLEVBQUUsOEJBQVMsRUFBRSxFQUFFO0FBQ2pDLFlBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDN0M7QUFDRCxZQUFRLEVBQUEsb0JBQUc7QUFDUCxlQUFPO0FBQ0gsb0JBQVEsRUFBRSxTQUFTO0FBQ25CLHFCQUFTLEVBQUUsVUFBVTtBQUNyQixnQkFBSSxFQUFFLEtBQUs7QUFDWCxpQkFBSyxFQUFFLE1BQU0sRUFDaEIsQ0FBQztLQUNMO0FBQ0QscUJBQWlCLEVBQUEsNkJBQUc7QUFDaEIsZUFBTyxlQUFlLENBQUM7S0FDMUI7QUFDRCxZQUFRLEVBQUEsb0JBQUc7QUFDUCxlQUFPLE1BQU0sQ0FBQztLQUNqQjtBQUNELHNCQUFrQixFQUFBLDhCQUFHO0FBQ2pCLGVBQU87QUFDSCxlQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUNqQixvQkFBUSxFQUFFLFNBQVM7QUFDbkIsaUJBQUssRUFBRSxNQUFNO1NBQ2hCLENBQUM7S0FDTDs7QUFHRCxxQkFBaUIsRUFBQSw2QkFBRztBQUNoQixlQUFPO0FBQ0gsaUJBQUssRUFBRSxNQUFNO0FBQ2IsbUJBQU8sRUFBRSxRQUFRO0FBQ2pCLG9CQUFRLEVBQUUsU0FBUztTQUN0QixDQUFBO0tBQ0o7O0FBR0QsaUJBQWEsRUFBQSx1QkFBQyxNQUFNLEVBQUU7QUFDbEIsZUFBTyxNQUFNLEdBQUcsR0FBRyxDQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDVCxrQkFBTSxFQUFFLE1BQU07QUFDZCxtQkFBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7bUJBQUksSUFBSSxDQUFDLEVBQUU7U0FBQSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztLQUN4Qzs7QUFFRCxhQUFTLEVBQUEsbUJBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDMUIsWUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ2xDLG1CQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQ3BCLHVCQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDbkMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNmLG9CQUFJLFNBQVMsU0FBTyxJQUFJLENBQUMsQ0FBQyxVQUFLLElBQUksQ0FBQyxDQUFDLE1BQUcsQ0FBQztBQUN6Qyx3QkFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQzthQUM5QixDQUFDLENBQUE7QUFDRixxQkFBUyxHQUFHLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7U0FDMUMsTUFDSTtBQUNILG1CQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3BCLG9CQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2QscUJBQVMsR0FBRyxJQUFJLENBQUM7U0FDbEI7OztBQUdELGVBQU8sSUFBSSxDQUFDOzs7O0tBS2Y7O0NBR0osQ0FBQyxDQUFDOztBQUVILFNBQVMsU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUN6QixRQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO0FBQUUsZUFBTyxLQUFLLENBQUM7S0FBQSxBQUM3RSxJQUFJLFNBQVMsU0FBTyxNQUFNLENBQUMsQ0FBQyxVQUFLLE1BQU0sQ0FBQyxDQUFDLE1BQUcsQ0FBQTs7OztBQUk1QyxXQUFPLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3ZFOztBQUVELFNBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDakMsUUFBSSxTQUFTLFNBQU8sTUFBTSxDQUFDLENBQUMsVUFBSyxNQUFNLENBQUMsQ0FBQyxNQUFHLENBQUM7QUFDN0MsUUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVuQyxRQUFJLFVBQVUsRUFBRTs7QUFFZCxlQUFPLENBQUMsR0FBRyx3QkFBc0IsVUFBVSxDQUFDLEtBQUssQ0FBRyxDQUFDO0FBQ3JELFlBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsS0FBSztBQUFFLG1CQUFPLEtBQUssQ0FBQztTQUFBO0tBQ25EO0FBQ0QsV0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDMUI7O0FBRUQsU0FBUyxlQUFlLEdBQUc7QUFDdkIsYUFBUyxHQUFHLEdBQUcsQ0FBQztBQUNaLGNBQU0sRUFBRSxLQUFLO0FBQ2IsWUFBSSxFQUFFLElBQUk7QUFDVixjQUFNLEVBQUUsSUFBSTtLQUNmLENBQUMsQ0FBQztBQUNILG1CQUFlLEdBQUcsVUFBVSxDQUFDLENBQ3pCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQ2IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDaEIsQ0FBQyxDQUFDO0FBQ0gsVUFBTSxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ2hCLGNBQVUsR0FBRyxHQUFHLENBQUM7QUFDakIsU0FBSyxHQUFHLEdBQUcsQ0FBQztBQUNaLFVBQU0sR0FBRyxLQUFLLENBQUM7QUFDZixhQUFTLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDbEIsYUFBUyxHQUFHLElBQUksQ0FBQzs7O0FBR2pCLFlBQVEsR0FBRyxFQUFFLENBQUM7O0FBRWQsVUFBTSxHQUFHO0FBQ0wsZ0JBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQztBQUMzQyxnQkFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDO0FBQ3hDLGdCQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUM7QUFDM0MsZ0JBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQztBQUMzQyxnQkFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDO0FBQ3hDLGdCQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUM7S0FDOUMsQ0FBQztDQUNMOztBQUVELFNBQVMsSUFBSSxHQUFHLEVBRWY7O0FBRUQsU0FBVSxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRTtBQUN4QixXQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQzs7O0FBRzlDLFFBQUksU0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFHLENBQUE7O0FBRWhDLFdBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUUzQixRQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsV0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzQyxVQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFVBQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDbEIsYUFBUyxHQUFHLElBQUksQ0FBQztBQUNqQixXQUFPLE1BQU0sQ0FBQztDQUNqQjtBQUNMLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRTs7QUFFM0MsZUFBVyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUN0QixRQUFJLFFBQVEsRUFBRTtBQUNWLGlCQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUN2QixnQkFBSSxFQUFFLElBQUk7QUFDVixjQUFFLEVBQUUsRUFBRTtBQUNOLG1CQUFPLEVBQUUsT0FBTztBQUNoQixpQkFBSyxFQUFFLE1BQU07O0FBQUEsU0FFaEIsQ0FBQyxDQUFDO0tBQ047O0FBRUQsV0FBTyxJQUFJLENBQUM7Q0FDZjs7QUFHRCxTQUFTLFFBQVEsQ0FBQyxPQUFPLEVBQUU7QUFDdkIsYUFBUyxHQUFHLFNBQVMsQ0FDaEIsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FDbkIsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQzdCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ2xDOztBQUVELGFBQWEsQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPLEVBQUk7QUFDOUIsUUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUM5QixRQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7O0FBRXJCLFlBQVEsTUFBTSxDQUFDLFVBQVU7QUFDckIsYUFBSyxhQUFhLENBQUMsU0FBUztBQUN4QixxQkFBUyxHQUFHLFFBQVEsQ0FDaEIsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzdELGtCQUFNOztBQUFBLEFBRVYsYUFBSyxhQUFhLENBQUMsVUFBVTtBQUN6QixxQkFBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMxRSxrQkFBTTs7QUFBQSxBQUVWLGFBQUssYUFBYSxDQUFDLGdCQUFnQjtBQUMvQixzQkFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDOUIsa0JBQU07O0FBQUEsQUFFVixhQUFLLGFBQWEsQ0FBQyxJQUFJOztBQUVuQixrQkFBTTs7QUFBQSxBQUVWLGFBQUssYUFBYSxDQUFDLFNBQVM7QUFDeEIsb0JBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsa0JBQU07O0FBQUEsQUFFVixhQUFLLGFBQWEsQ0FBQyxPQUFPO0FBQ3RCLDJCQUFlLEVBQUUsQ0FBQztBQUNsQixrQkFBTTs7QUFBQSxBQUVWO0FBQ0ksbUJBQU8sSUFBSSxDQUFDO0FBQUEsS0FDbkI7O0FBRUQsUUFBSSxTQUFTLEVBQUU7QUFDWCxpQkFBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNoQztBQUNELFdBQU8sSUFBSSxDQUFDO0NBQ2YsQ0FBQyxDQUFDOztpQkFFWSxTQUFTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICdlczYtc2hpbSc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGlvIGZyb20gJy4vaW8nO1xuaW1wb3J0IEdhbWVJbnRlcmZhY2UgZnJvbSAnLi9jb21wb25lbnRzL0dhbWVJbnRlcmZhY2UnO1xuXG5sZXQgcGFyYW1zID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoJy9wbGF5LycsICcnKS5zcGxpdCgnLycpO1xucGFyYW1zWzFdID0gcGFyc2VJbnQocGFyYW1zWzFdLCAxMCk7XG5wYXJhbXNbMl0gPSBwYXJzZUludChwYXJhbXNbMl0sIDEwKTtcblxuUmVhY3QucmVuZGVyKFxuICA8R2FtZUludGVyZmFjZSBpbz17aW99IHBhcmFtcz17cGFyYW1zfSAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpXG4pOyIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTUgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cblxuZnVuY3Rpb24gY2xhc3NOYW1lcygpIHtcblx0dmFyIGNsYXNzZXMgPSAnJztcblx0dmFyIGFyZztcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRpZiAoIWFyZykge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aWYgKCdzdHJpbmcnID09PSB0eXBlb2YgYXJnIHx8ICdudW1iZXInID09PSB0eXBlb2YgYXJnKSB7XG5cdFx0XHRjbGFzc2VzICs9ICcgJyArIGFyZztcblx0XHR9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG5cdFx0XHRjbGFzc2VzICs9ICcgJyArIGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKTtcblx0XHR9IGVsc2UgaWYgKCdvYmplY3QnID09PSB0eXBlb2YgYXJnKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdGlmICghYXJnLmhhc093blByb3BlcnR5KGtleSkgfHwgIWFyZ1trZXldKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2xhc3NlcyArPSAnICcgKyBrZXk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBjbGFzc2VzLnN1YnN0cigxKTtcbn1cblxuLy8gc2FmZWx5IGV4cG9ydCBjbGFzc05hbWVzIGZvciBub2RlIC8gYnJvd3NlcmlmeVxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcbn1cblxuLy8gc2FmZWx5IGV4cG9ydCBjbGFzc05hbWVzIGZvciBSZXF1aXJlSlNcbmlmICh0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0fSk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdJbnZhcmlhbnQgVmlvbGF0aW9uOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBrZXlNaXJyb3JcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZShcIi4vaW52YXJpYW50XCIpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYW4gZW51bWVyYXRpb24gd2l0aCBrZXlzIGVxdWFsIHRvIHRoZWlyIHZhbHVlLlxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqICAgdmFyIENPTE9SUyA9IGtleU1pcnJvcih7Ymx1ZTogbnVsbCwgcmVkOiBudWxsfSk7XG4gKiAgIHZhciBteUNvbG9yID0gQ09MT1JTLmJsdWU7XG4gKiAgIHZhciBpc0NvbG9yVmFsaWQgPSAhIUNPTE9SU1tteUNvbG9yXTtcbiAqXG4gKiBUaGUgbGFzdCBsaW5lIGNvdWxkIG5vdCBiZSBwZXJmb3JtZWQgaWYgdGhlIHZhbHVlcyBvZiB0aGUgZ2VuZXJhdGVkIGVudW0gd2VyZVxuICogbm90IGVxdWFsIHRvIHRoZWlyIGtleXMuXG4gKlxuICogICBJbnB1dDogIHtrZXkxOiB2YWwxLCBrZXkyOiB2YWwyfVxuICogICBPdXRwdXQ6IHtrZXkxOiBrZXkxLCBrZXkyOiBrZXkyfVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xudmFyIGtleU1pcnJvciA9IGZ1bmN0aW9uKG9iaikge1xuICB2YXIgcmV0ID0ge307XG4gIHZhciBrZXk7XG4gIChcInByb2R1Y3Rpb25cIiAhPT0gXCJkZXZlbG9wbWVudFwiID8gaW52YXJpYW50KFxuICAgIG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopLFxuICAgICdrZXlNaXJyb3IoLi4uKTogQXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QuJ1xuICApIDogaW52YXJpYW50KG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopKSk7XG4gIGZvciAoa2V5IGluIG9iaikge1xuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXRba2V5XSA9IGtleTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlNaXJyb3I7XG4iLCJpbXBvcnQgQ2hhdENvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvQ2hhdENvbnN0YW50cyc7XG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInO1xuXG5jb25zdCBDaGF0QWN0aW9ucyA9IHtcbiAgdG9nZ2xlVmlzaWJpbGl0eSgpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogQ2hhdENvbnN0YW50cy5UT0dHTEVfVklTSUJJTElUWVxuICAgIH0pO1xuICB9LFxuICBzdWJtaXRNZXNzYWdlKG1lc3NhZ2UsIGNsYXNzTmFtZSwgcmVjZWl2ZWQpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogQ2hhdENvbnN0YW50cy5TVUJNSVRfTUVTU0FHRSxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgIHJlY2VpdmVkOiByZWNlaXZlZFxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGF0QWN0aW9uczsiLCJpbXBvcnQgR2FtZUNvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvR2FtZUNvbnN0YW50cyc7XG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInO1xuXG5jb25zdCBHYW1lQWN0aW9ucyA9IHtcbiAgbWFrZU1vdmUoZnJvbSwgdG8sIGNhcHR1cmUsIGVtaXRNb3ZlKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuTUFLRV9NT1ZFLFxuICAgICAgZnJvbTogZnJvbSxcbiAgICAgIHRvOiB0byxcbiAgICAgIGNhcHR1cmU6IGNhcHR1cmUsXG4gICAgICBlbWl0TW92ZTogZW1pdE1vdmVcbiAgICB9KTtcbiAgfSxcbiAgc2hvd01vdmVzKHVuaXQsIGZyb20sIGluUmFuZ2UpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5TSE9XX01PVkVTLFxuICAgICAgdW5pdDogdW5pdCxcbiAgICAgIGZyb206IGZyb20sXG4gICAgICBpblJhbmdlOiBpblJhbmdlXG4gICAgfSk7XG4gIH0sXG4gIGRyYXcoKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEdhbWVDb25zdGFudHMuRFJBV1xuICAgIH0pO1xuICB9LFxuICByZW1hdGNoKCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLlJFTUFUQ0hcbiAgICB9KTtcbiAgfSxcbiAgZ2FtZU92ZXIob3B0aW9ucykge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLkdBTUVfT1ZFUixcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICB9KTtcbiAgfSxcbiAgY2hhbmdlUHJvbW90aW9uKHByb21vdGlvbikge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLkNIQU5HRV9QUk9NT1RJT04sXG4gICAgICBwcm9tb3Rpb246IHByb21vdGlvblxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lQWN0aW9uczsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XG5cbmNvbnN0IENhcHR1cmVkUGllY2VzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgb25HYW1lQ2hhbmdlXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhcHR1cmVkUGllY2VzOiBHYW1lU3RvcmUuZ2V0Q2FwdHVyZWRQaWVjZXMoKVxuICAgIH07XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjcCA9IHRoaXMuc3RhdGUuY2FwdHVyZWRQaWVjZXM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImNhcHR1cmVkLXBpZWNlc1wiPlxuICAgICAgICB7Y3AubWFwKChwaWVjZXMsIGNvbG9yKSA9PiAoXG4gICAgICAgICAgPHVsIGtleT17Y29sb3J9PlxuICAgICAgICAgICAge3BpZWNlcy5tYXAoKHBpZWNlLCBpKSA9PiA8bGkga2V5PXtpfT57cGllY2V9PC9saT4pLnRvQXJyYXkoKX1cbiAgICAgICAgICA8L3VsPlxuICAgICAgICApKS50b0FycmF5KCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuICBfb25HYW1lQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2FwdHVyZWRQaWVjZXM6IEdhbWVTdG9yZS5nZXRDYXB0dXJlZFBpZWNlcygpXG4gICAgfSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDYXB0dXJlZFBpZWNlczsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IENoYXRTdG9yZSBmcm9tICcuLi9zdG9yZXMvQ2hhdFN0b3JlJztcbmltcG9ydCBDaGF0QWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0NoYXRBY3Rpb25zJztcblxuY29uc3QgQ2hhdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdG9rZW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcbiAgICBzb3VuZHNFbmFibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgb3Blbk1vZGFsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW5dLFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IENoYXRTdG9yZS5nZXRTdGF0ZSgpO1xuICAgIHJldHVybiB7XG4gICAgICBpc0NoYXRIaWRkZW46IHN0YXRlLmlzQ2hhdEhpZGRlbixcbiAgICAgIG1lc3NhZ2VzOiBzdGF0ZS5tZXNzYWdlcyxcbiAgICAgIG1lc3NhZ2U6ICcnLFxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMuaW8ub24oJ3JlY2VpdmUtbWVzc2FnZScsIGRhdGEgPT4ge1xuICAgICAgQ2hhdEFjdGlvbnMuc3VibWl0TWVzc2FnZShkYXRhLm1lc3NhZ2UsIGRhdGEuY29sb3IgKyAnIGxlZnQnLCB0cnVlKTtcbiAgICAgIHRoaXMuX21heWJlUGxheVNvdW5kKCk7XG4gICAgfSk7XG4gICAgQ2hhdFN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYXRTdG9yZUNoYW5nZSk7XG4gICAgXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gMTM5OSkgQ2hhdEFjdGlvbnMudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBDaGF0U3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYXRTdG9yZUNoYW5nZSk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImNoYXQtd3JhcHBlclwiXG4gICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5pc0NoYXRIaWRkZW4gPyAnaGlkZGVuJyA6IG51bGx9PlxuICAgICAgICBcbiAgICAgICAgPGg0PkNoYXQ8L2g0PlxuICAgICAgICA8YSBjbGFzc05hbWU9XCJjbG9zZVwiXG4gICAgICAgICAgIG9uQ2xpY2s9e0NoYXRBY3Rpb25zLnRvZ2dsZVZpc2liaWxpdHl9PlxuICAgICAgICAgIHhcbiAgICAgICAgPC9hPlxuICAgICAgICBcbiAgICAgICAgPGF1ZGlvIHByZWxvYWQ9XCJhdXRvXCIgcmVmPVwibXNnU25kXCI+XG4gICAgICAgICAgPHNvdXJjZSBzcmM9XCIvc25kL21lc3NhZ2UubXAzXCIgLz5cbiAgICAgICAgPC9hdWRpbz5cbiAgICAgICAgXG4gICAgICAgIDx1bCBpZD1cImNoYXQtbGlzdFwiIHJlZj1cImNoYXRcIj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5tZXNzYWdlcy5tYXAoKG1lc3NhZ2UsIGkpID0+IChcbiAgICAgICAgICAgIDxsaSBrZXk9e2l9IGNsYXNzTmFtZT17bWVzc2FnZS5nZXQoJ2NsYXNzTmFtZScpfT5cbiAgICAgICAgICAgICAge21lc3NhZ2UuZ2V0KCdtZXNzYWdlJyl9XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICkpLnRvQXJyYXkoKX1cbiAgICAgICAgPC91bD5cbiAgICAgICAgXG4gICAgICAgIDxzcGFuPldyaXRlIHlvdXIgbWVzc2FnZTo8L3NwYW4+XG4gICAgICAgIFxuICAgICAgICA8Zm9ybSBpZD1cImNoYXQtZm9ybVwiXG4gICAgICAgICAgICAgIG9uU3VibWl0PXt0aGlzLl9zdWJtaXRNZXNzYWdlfT5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICByZWY9XCJtZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNvbG9yfVxuICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5tZXNzYWdlfVxuICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5fb25DaGFuZ2VNZXNzYWdlfSAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuICBfb25DaGF0U3RvcmVDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShDaGF0U3RvcmUuZ2V0U3RhdGUoKSwgdGhpcy5fc2Nyb2xsQ2hhdCk7XG4gIH0sXG4gIF9vbkNoYW5nZU1lc3NhZ2UoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21lc3NhZ2U6IGUudGFyZ2V0LnZhbHVlfSk7XG4gIH0sXG4gIF9zdWJtaXRNZXNzYWdlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qge2lvLCB0b2tlbiwgY29sb3IsIGlzT3Bwb25lbnRBdmFpbGFibGV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5zdGF0ZS5tZXNzYWdlO1xuXG4gICAgaWYgKCFpc09wcG9uZW50QXZhaWxhYmxlKSB7XG4gICAgICB0aGlzLnJlZnMubWVzc2FnZS5nZXRET01Ob2RlKCkuYmx1cigpO1xuICAgICAgdGhpcy5wcm9wcy5vcGVuTW9kYWwoJ2luZm8nLCAnU29ycnksIHlvdXIgb3Bwb25lbnQgaXMgbm90IGNvbm5lY3RlZC4gJyArXG4gICAgICAgICdZb3UgY2Fu4oCYdCBzZW5kIG1lc3NhZ2VzLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIENoYXRBY3Rpb25zLnN1Ym1pdE1lc3NhZ2UobWVzc2FnZSwgY29sb3IgKyAnIHJpZ2h0JywgZmFsc2UpO1xuICAgIHRoaXMuc2V0U3RhdGUoe21lc3NhZ2U6ICcnfSk7XG5cbiAgICBpby5lbWl0KCdzZW5kLW1lc3NhZ2UnLCB7XG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgdG9rZW46IHRva2VuXG4gICAgfSk7XG4gIH0sXG4gIF9zY3JvbGxDaGF0KCkge1xuICAgIGNvbnN0IGNoYXROb2RlID0gdGhpcy5yZWZzLmNoYXQuZ2V0RE9NTm9kZSgpO1xuICAgIGNoYXROb2RlLnNjcm9sbFRvcCA9IGNoYXROb2RlLnNjcm9sbEhlaWdodDtcbiAgfSxcbiAgX21heWJlUGxheVNvdW5kKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnNvdW5kc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMucmVmcy5tc2dTbmQuZ2V0RE9NTm9kZSgpLnBsYXkoKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDaGF0OyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuaW1wb3J0IENoZXNzUGllY2VzIGZyb20gJy4uL2NvbnN0YW50cy9DaGVzc1BpZWNlcyc7XG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuaW1wb3J0IG1heWJlUmV2ZXJzZSBmcm9tICcuLi9taXhpbnMvbWF5YmVSZXZlcnNlJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7U2VxLCBSZXBlYXQsIExpc3QsIFNldH0gZnJvbSAnaW1tdXRhYmxlJztcblxuY29uc3QgRklMRVMgPSBTZXEuSW5kZXhlZCgnYWJjZGVmZ2gnKTtcbmNvbnN0IFJBTktTID0gU2VxLkluZGV4ZWQoJzEyMzQ1Njc4Jyk7XG5cbmNvbnN0IENoZXNzYm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHRva2VuOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbWF5YmVQbGF5U291bmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgZ2FtZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNPcHBvbmVudEF2YWlsYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluLCBtYXliZVJldmVyc2VdLFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IEdhbWVTdG9yZS5nZXRDaGVzc2JvYXJkU3RhdGUoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBmZW46IHN0YXRlLmZlbixcbiAgICAgIG1vdmVGcm9tOiBudWxsLFxuICAgICAgbGFzdE1vdmU6IHN0YXRlLmxhc3RNb3ZlLFxuICAgICAga2luZ0luQ2hlY2s6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3Qge2lvLCB0b2tlbn0gPSB0aGlzLnByb3BzO1xuICAgIEdhbWVTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25HYW1lQ2hhbmdlKTtcbiAgICBHYW1lU3RvcmUub24oJ25ldy1tb3ZlJywgdGhpcy5fb25OZXdNb3ZlKTtcblxuICAgIGlvLm9uKCdtb3ZlJywgZGF0YSA9PiB7XG4gICAgICBHYW1lQWN0aW9ucy5tYWtlTW92ZShkYXRhLmZyb20sIGRhdGEudG8sIGRhdGEuY2FwdHVyZSwgZmFsc2UpO1xuICAgICAgdGhpcy5wcm9wcy5tYXliZVBsYXlTb3VuZCgpO1xuXG4gICAgICBpZiAoIWRhdGEuZ2FtZU92ZXIpIHtcbiAgICAgICAgdGhpcy5fcnVuQ2xvY2soKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGl0bGUnKVswXTtcbiAgICAgICAgdGl0bGUudGV4dCA9ICcqICcgKyB0aXRsZS50ZXh0O1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlvLm9uKCdyZW1hdGNoLWFjY2VwdGVkJywgKCkgPT4gdGhpcy5zZXRTdGF0ZSh7bW92ZUZyb206IG51bGx9KSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIEdhbWVTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gICAgR2FtZVN0b3JlLm9uKCduZXctbW92ZScsIHRoaXMuX29uTmV3TW92ZSk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7Y29sb3IsIGlzT3Bwb25lbnRBdmFpbGFibGUsIGdhbWVPdmVyfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2ZlbiwgbW92ZUZyb20sIGxhc3RNb3ZlLCBraW5nSW5DaGVja30gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGZlbkFycmF5ID0gZmVuLnNwbGl0KCcgJyk7XG4gICAgY29uc3QgcGxhY2VtZW50ID0gZmVuQXJyYXlbMF07XG4gICAgY29uc3QgaXNJdE15VHVybiA9IGZlbkFycmF5WzFdID09PSBjb2xvci5jaGFyQXQoMCk7XG4gICAgY29uc3Qgcm93cyA9IHRoaXMuX21heWJlUmV2ZXJzZShwbGFjZW1lbnQuc3BsaXQoJy8nKSk7XG4gICAgY29uc3QgcmFua3MgPSB0aGlzLl9tYXliZVJldmVyc2UoUkFOS1MsICd3aGl0ZScpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJjaGVzc2JvYXJkXCI+XG4gICAgICAgIHtyb3dzLm1hcCgocGxhY2VtZW50LCBpKSA9PlxuICAgICAgICAgIDxSb3dcbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIHJhbms9e3JhbmtzLmdldChpKX1cbiAgICAgICAgICAgIHBsYWNlbWVudD17cGxhY2VtZW50fVxuICAgICAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICAgICAgaXNNb3ZlYWJsZT17aXNJdE15VHVybiAmJiBpc09wcG9uZW50QXZhaWxhYmxlICYmICFnYW1lT3Zlcn1cbiAgICAgICAgICAgIG1vdmVGcm9tPXttb3ZlRnJvbX1cbiAgICAgICAgICAgIGxhc3RNb3ZlPXtsYXN0TW92ZX1cbiAgICAgICAgICAgIHNldE1vdmVGcm9tPXt0aGlzLl9zZXRNb3ZlRnJvbX1cbiAgICAgICAgICAgIGtpbmdJbkNoZWNrPXtraW5nSW5DaGVja31cbiAgICAgICAgICAgIHZhbGlkTW92ZXM9e0dhbWVTdG9yZS5nZXRWYWxpZE1vdmVzKG1vdmVGcm9tKX0gLz4pfVxuICAgICAgPC90YWJsZT5cbiAgICApO1xuICB9LFxuICBfb25HYW1lQ2hhbmdlKGNiKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBHYW1lU3RvcmUuZ2V0Q2hlc3Nib2FyZFN0YXRlKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBmZW46IHN0YXRlLmZlbixcbiAgICAgIGxhc3RNb3ZlOiBzdGF0ZS5sYXN0TW92ZSxcbiAgICAgIGtpbmdJbkNoZWNrOiBzdGF0ZS5jaGVjayAmJiAoc3RhdGUuZmVuLnNwbGl0KCcgJylbMV0gPT09ICd3JyA/ICdLJyA6ICdrJylcbiAgICB9LCBjYik7XG4gIH0sXG4gIF9zZXRNb3ZlRnJvbShzcXVhcmUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1vdmVGcm9tOiBzcXVhcmVcbiAgICB9KTtcbiAgfSxcbiAgX29uTmV3TW92ZShtb3ZlKSB7XG4gICAgY29uc3Qge2lvLCB0b2tlbn0gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8uZW1pdCgnbmV3LW1vdmUnLCB7XG4gICAgICB0b2tlbjogdG9rZW4sXG4gICAgICBtb3ZlOiBtb3ZlXG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KHRoaXMucHJvcHMubWF5YmVQbGF5U291bmQsIDApO1xuICB9LFxuICBfcnVuQ2xvY2soKSB7XG4gICAgY29uc3Qge2lvLCB0b2tlbiwgY29sb3J9ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLmVtaXQoJ2Nsb2NrLXJ1bicsIHtcbiAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgIGNvbG9yOiBjb2xvclxuICAgIH0pO1xuICB9LFxuICBfcmVtb3ZlQXN0ZXJpc2tGcm9tVGl0bGUoKSB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RpdGxlJylbMF07XG4gICAgdGl0bGUudGV4dCA9IHRpdGxlLnRleHQucmVwbGFjZSgnKiAnLCAnJyk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fcmVtb3ZlQXN0ZXJpc2tGcm9tVGl0bGUpO1xuICB9XG59KTtcblxuY29uc3QgUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHByb3BUeXBlczoge1xuICAgIHJhbms6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJzEnLCcyJywnMycsJzQnLCc1JywnNicsJzcnLCc4J10pLmlzUmVxdWlyZWQsXG4gICAgcGxhY2VtZW50OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgaXNNb3ZlYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBtb3ZlRnJvbTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsYXN0TW92ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzZXRNb3ZlRnJvbTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBraW5nSW5DaGVjazogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtmYWxzZSwgJ0snLCAnayddKS5pc1JlcXVpcmVkLFxuICAgIHZhbGlkTW92ZXM6IFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKFNldCkuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFttYXliZVJldmVyc2VdLFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7cmFuaywgcGxhY2VtZW50LCBjb2xvcn0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZpbGVzID0gdGhpcy5fbWF5YmVSZXZlcnNlKEZJTEVTKTtcbiAgICBjb25zdCBwaWVjZXMgPSB0aGlzLl9tYXliZVJldmVyc2UocGxhY2VtZW50Lmxlbmd0aCA8IDggP1xuICAgICAgU2VxKHBsYWNlbWVudCkuZmxhdE1hcChwaWVjZSA9PiAoXG4gICAgICAgIC9eXFxkJC8udGVzdChwaWVjZSkgPyBSZXBlYXQoJy0nLCBwYXJzZUludChwaWVjZSwgMTApKSA6IHBpZWNlXG4gICAgICApKS50b0FycmF5KCkgOlxuXG4gICAgICBwbGFjZW1lbnQuc3BsaXQoJycpXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8dHI+XG4gICAgICAgIHtwaWVjZXMubWFwKChwaWVjZSwgaSkgPT5cbiAgICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBzcXVhcmU9e2ZpbGVzLmdldChpKSArIHJhbmt9XG4gICAgICAgICAgICBwaWVjZT17cGllY2V9XG4gICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCAncmFuaycsICdwbGFjZW1lbnQnKX0gLz4pfVxuICAgICAgPC90cj5cbiAgICApO1xuICB9XG59KTtcblxuY29uc3QgQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHByb3BUeXBlczoge1xuICAgIHNxdWFyZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHBpZWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgaXNNb3ZlYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBtb3ZlRnJvbTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsYXN0TW92ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzZXRNb3ZlRnJvbTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBraW5nSW5DaGVjazogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtmYWxzZSwgJ0snLCAnayddKS5pc1JlcXVpcmVkLFxuICAgIHZhbGlkTW92ZXM6IFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKFNldCkuaXNSZXF1aXJlZFxuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7bW92ZUZyb20sIGxhc3RNb3ZlLCBzcXVhcmUsIGNvbG9yLFxuICAgICAgICAgICBpc01vdmVhYmxlLCBraW5nSW5DaGVjaywgdmFsaWRNb3Zlc30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHBpZWNlID0gQ2hlc3NQaWVjZXNbdGhpcy5wcm9wcy5waWVjZV07XG4gICAgY29uc3Qgcmd4ID0gY29sb3IgPT09ICd3aGl0ZScgPyAvXltLUVJCTlBdJC8gOiAvXltrcXJibnBdJC87XG4gICAgY29uc3QgaXNEcmFnZ2FibGUgPSByZ3gudGVzdCh0aGlzLnByb3BzLnBpZWNlKTtcbiAgICBjb25zdCBpc0Ryb3BwYWJsZSA9IG1vdmVGcm9tICYmIHZhbGlkTW92ZXMuaGFzKHNxdWFyZSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHRkIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IG1vdmVGcm9tID09PSBzcXVhcmUgJiYgIXZhbGlkTW92ZXMuaXNFbXB0eSgpLFxuICAgICAgICAgICAgZnJvbTogbGFzdE1vdmUuZ2V0KCdmcm9tJykgPT09IHNxdWFyZSxcbiAgICAgICAgICAgIHRvOiBsYXN0TW92ZS5nZXQoJ3RvJykgPT09IHNxdWFyZSxcbiAgICAgICAgICAgIGRyb3BwYWJsZTogaXNEcm9wcGFibGVcbiAgICAgICAgICB9KX1cbiAgICAgICAgICBvbkNsaWNrPXshcGllY2UgPyB0aGlzLl9vbkNsaWNrU3F1YXJlIDogbnVsbH1cbiAgICAgICAgICBvbkRyYWdPdmVyPXtpc0Ryb3BwYWJsZSA/IHRoaXMuX29uRHJhZ092ZXIgOiBudWxsfVxuICAgICAgICAgIG9uRHJvcD17aXNEcm9wcGFibGUgPyB0aGlzLl9vbkRyb3AgOiBudWxsfT5cblxuICAgICAgICB7cGllY2UgP1xuICAgICAgICAgIDxhIGNsYXNzTmFtZT17a2luZ0luQ2hlY2sgPT09IHRoaXMucHJvcHMucGllY2UgPyAnaW4tY2hlY2snIDogbnVsbH1cbiAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9vbkNsaWNrU3F1YXJlfVxuICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXt0aGlzLl9vbkRyYWdTdGFydH1cbiAgICAgICAgICAgICBkcmFnZ2FibGU9e2lzRHJhZ2dhYmxlICYmIGlzTW92ZWFibGV9PlxuICAgICAgICAgICAge3BpZWNlfVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgOm51bGx9XG4gICAgICA8L3RkPlxuICAgICk7XG4gIH0sXG4gIF9vbkNsaWNrU3F1YXJlKCkge1xuICAgIGNvbnN0IHtpc01vdmVhYmxlLCBjb2xvciwgbW92ZUZyb20sIHNxdWFyZSwgcGllY2V9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCByZ3ggPSBjb2xvciA9PT0gJ3doaXRlJyA/IC9eW0tRUkJOUF0kLyA6IC9eW2txcmJucF0kLztcblxuICAgIGlmICghaXNNb3ZlYWJsZSB8fCAoIW1vdmVGcm9tICYmICFyZ3gudGVzdChwaWVjZSkpKVxuICAgICAgcmV0dXJuO1xuICAgIGVsc2UgaWYgKG1vdmVGcm9tICYmIG1vdmVGcm9tID09PSBzcXVhcmUpXG4gICAgICB0aGlzLnByb3BzLnNldE1vdmVGcm9tKG51bGwpO1xuICAgIGVsc2UgaWYgKHJneC50ZXN0KHBpZWNlKSlcbiAgICAgIHRoaXMucHJvcHMuc2V0TW92ZUZyb20oc3F1YXJlKTtcbiAgICBlbHNlXG4gICAgICBHYW1lQWN0aW9ucy5tYWtlTW92ZShtb3ZlRnJvbSwgc3F1YXJlLCBDaGVzc1BpZWNlc1twaWVjZV0sIHRydWUpO1xuICB9LFxuICBfb25EcmFnU3RhcnQoZSkge1xuICAgIGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gICAgLy8gc2V0RGF0YSBpcyByZXF1aXJlZCBieSBmaXJlZm94XG4gICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsICcnKTtcblxuICAgIHRoaXMucHJvcHMuc2V0TW92ZUZyb20odGhpcy5wcm9wcy5zcXVhcmUpO1xuICB9LFxuICBfb25EcmFnT3ZlcihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gIH0sXG4gIF9vbkRyb3AoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB7bW92ZUZyb20sIHNxdWFyZSwgcGllY2V9ID0gdGhpcy5wcm9wcztcbiAgICBHYW1lQWN0aW9ucy5tYWtlTW92ZShtb3ZlRnJvbSwgc3F1YXJlLCBDaGVzc1BpZWNlc1twaWVjZV0sIHRydWUpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hlc3Nib2FyZDsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XG5pbXBvcnQgQ2hlc3Nib2FyZCBmcm9tICcuL0NoZXNzYm9hcmQnO1xuaW1wb3J0IENhcHR1cmVkUGllY2VzIGZyb20gJy4vQ2FwdHVyZWRQaWVjZXMnO1xuaW1wb3J0IFRhYmxlT2ZNb3ZlcyBmcm9tICcuL1RhYmxlT2ZNb3Zlcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmNvbnN0IENoZXNzYm9hcmRJbnRlcmZhY2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHRva2VuOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc291bmRzRW5hYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnd2hpdGUnLCAnYmxhY2snXSkuaXNSZXF1aXJlZCxcbiAgICBnYW1lT3ZlcjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgb25HYW1lQ2hhbmdlXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIEdhbWVTdG9yZS5nZXRTdGF0ZSgpO1xuICB9LFxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSAmJlxuICAgICAgICAhcHJldlByb3BzLmdhbWVPdmVyLmdldCgnc3RhdHVzJykpIHtcbiAgICAgIHRoaXMucHJvcHMub3Blbk1vZGFsKCdpbmZvJywgdGhpcy5fZ2V0R2FtZU92ZXJNZXNzYWdlKCkpO1xuICAgIH1cbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtwcm9tb3Rpb24sIHR1cm4sIGdhbWVPdmVyLCBjaGVja30gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJib2FyZC1tb3Zlcy13cmFwcGVyXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cbiAgICAgICAgXG4gICAgICAgIDxhdWRpbyBwcmVsb2FkPVwiYXV0b1wiIHJlZj1cIm1vdmVTbmRcIj5cbiAgICAgICAgICA8c291cmNlIHNyYz1cIi9zbmQvbW92ZS5tcDNcIiAvPlxuICAgICAgICA8L2F1ZGlvPlxuICAgICAgICA8YXVkaW8gcHJlbG9hZD1cImF1dG9cIiByZWY9XCJjaGVja1NuZFwiPlxuICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiL3NuZC9jaGVjay5tcDNcIiAvPlxuICAgICAgICA8L2F1ZGlvPlxuXG4gICAgICAgIDxkaXYgaWQ9XCJib2FyZC13cmFwcGVyXCI+XG4gICAgICAgICAgPENhcHR1cmVkUGllY2VzIC8+XG4gICAgICAgICAgPENoZXNzYm9hcmRcbiAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsICdzb3VuZHNFbmFibGVkJywgJ2dhbWVPdmVyJyl9XG4gICAgICAgICAgICBnYW1lT3Zlcj17Z2FtZU92ZXIuZ2V0KCdzdGF0dXMnKX1cbiAgICAgICAgICAgIG1heWJlUGxheVNvdW5kPXt0aGlzLl9tYXliZVBsYXlTb3VuZH0gLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPFRhYmxlT2ZNb3ZlcyAvPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInByb21vdGlvblwiPlxuICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIDxzcGFuPlByb21vdGlvbjogPC9zcGFuPlxuICAgICAgICAgICAgPHNlbGVjdCB2YWx1ZT17cHJvbW90aW9ufVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5fb25Qcm9tb3Rpb25DaGFuZ2V9PlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicVwiPlF1ZWVuPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyXCI+Um9vazwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYlwiPkJpc2hvcDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiblwiPktuaWdodDwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZlZWRiYWNrXCI+XG4gICAgICAgICAgeyFnYW1lT3Zlci5nZXQoJ3N0YXR1cycpID8gXG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgIHsvKiBGIC0+IHdoaXRlIGtpbmcsIGYgLT4gYmxhY2sga2luZyovXG4gICAgICAgICAgICAgICAgICB0dXJuID09PSAndycgPyAnRicgOiAnZid9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAge2Ake3R1cm4gPT09ICd3JyA/ICdXaGl0ZScgOiAnQmxhY2snfSB0byBtb3ZlLmB9XG4gICAgICAgICAgICAgIHtjaGVjayA/IDxzdHJvbmc+IENoZWNrLjwvc3Ryb25nPiA6IG51bGx9XG4gICAgICAgICAgICA8L3NwYW4+IDpcblxuICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgIHtnYW1lT3Zlci5nZXQoJ3dpbm5lcicpID09PSAnV2hpdGUnID8gJ0YnIDogJ2YnfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIHt0aGlzLl9nZXRHYW1lT3Zlck1lc3NhZ2UoKX1cbiAgICAgICAgICAgIDwvc3Ryb25nPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgX29uR2FtZUNoYW5nZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKEdhbWVTdG9yZS5nZXRTdGF0ZSgpKTtcbiAgfSxcbiAgX29uUHJvbW90aW9uQ2hhbmdlKGUpIHtcbiAgICBHYW1lQWN0aW9ucy5jaGFuZ2VQcm9tb3Rpb24oZS50YXJnZXQudmFsdWUpO1xuICB9LFxuICBfbWF5YmVQbGF5U291bmQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc291bmRzRW5hYmxlZCkge1xuICAgICAgdGhpcy5yZWZzW3RoaXMuc3RhdGUuY2hlY2sgPyAnY2hlY2tTbmQnIDogJ21vdmVTbmQnXS5nZXRET01Ob2RlKCkucGxheSgpO1xuICAgIH1cbiAgfSxcbiAgX2dldEdhbWVPdmVyTWVzc2FnZSgpIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5wcm9wcy5nYW1lT3Zlci5nZXQoJ3R5cGUnKTtcbiAgICBjb25zdCB3aW5uZXIgPSB0aGlzLnByb3BzLmdhbWVPdmVyLmdldCgnd2lubmVyJyk7XG4gICAgY29uc3QgbG9zZXIgPSB3aW5uZXIgPT09ICdXaGl0ZScgPyAnQmxhY2snIDogJ1doaXRlJztcblxuICAgIHJldHVybiB0eXBlID09PSAnY2hlY2ttYXRlJyA/IGBDaGVja21hdGUuICR7d2lubmVyfSB3aW5zIWAgOlxuICAgICAgdHlwZSA9PT0gJ3RpbWVvdXQnID8gYCR7bG9zZXJ94oCYcyB0aW1lIGlzIG91dC4gJHt3aW5uZXJ9IHdpbnMhYCA6XG4gICAgICB0eXBlID09PSAncmVzaWduJyA/IGAke2xvc2VyfSBoYXMgcmVzaWduZWQuICR7d2lubmVyfSB3aW5zIWAgOlxuICAgICAgdHlwZSA9PT0gJ2RyYXcnID8gJ0RyYXcuJyA6XG4gICAgICB0eXBlID09PSAnc3RhbGVtYXRlJyA/ICdEcmF3IChTdGFsZW1hdGUpLicgOlxuICAgICAgdHlwZSA9PT0gJ3RocmVlZm9sZFJlcGV0aXRpb24nID8gJ0RyYXcgKFRocmVlZm9sZCBSZXBldGl0aW9uKS4nIDpcbiAgICAgIHR5cGUgPT09ICdpbnN1ZmZpY2llbnRNYXRlcmlhbCcgPyAnRHJhdyAoSW5zdWZmaWNpZW50IE1hdGVyaWFsKScgOiAnJztcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENoZXNzYm9hcmRJbnRlcmZhY2U7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcblxuY29uc3QgUHVyZVJlbmRlck1peGluID0gUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbjtcblxuY29uc3QgQ2xvY2sgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHBhcmFtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUHVyZVJlbmRlck1peGluXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3QgW18sIHRpbWUsIGluY10gPSB0aGlzLnByb3BzLnBhcmFtcztcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgd2hpdGU6IHRpbWUgKiA2MCxcbiAgICAgIGJsYWNrOiB0aW1lICogNjAsXG4gICAgICBpbmM6IGluYyxcbiAgICAgIGNvdW50ZG93bjogbnVsbFxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IGlvID0gdGhpcy5wcm9wcy5pbztcblxuICAgIGlvLm9uKCdjb3VudGRvd24nLCBkYXRhID0+IHRoaXMuc2V0U3RhdGUoe1xuICAgICAgW2RhdGEuY29sb3JdOiBkYXRhLnRpbWUsXG4gICAgICBjb3VudGRvd246IGRhdGEuY29sb3JcbiAgICB9KSk7XG5cbiAgICBpby5vbignY291bnRkb3duLWdhbWVvdmVyJywgZGF0YSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtjb3VudGRvd246IG51bGx9KTtcbiAgICAgIEdhbWVBY3Rpb25zLmdhbWVPdmVyKHtcbiAgICAgICAgdHlwZTogJ3RpbWVvdXQnLFxuICAgICAgICB3aW5uZXI6IGRhdGEuY29sb3IgPT09ICdibGFjaycgPyAnV2hpdGUnIDogJ0JsYWNrJ1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpby5vbigncmVtYXRjaC1hY2NlcHRlZCcsICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB3aGl0ZTogdGhpcy5wcm9wcy5wYXJhbXNbMV0gKiA2MCxcbiAgICAgICAgYmxhY2s6IHRoaXMucHJvcHMucGFyYW1zWzFdICogNjBcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBpZD1cImNsb2NrXCI+XG4gICAgICAgIDxUaW1lclxuICAgICAgICAgIGNvbG9yPVwid2hpdGVcIlxuICAgICAgICAgIHRpbWU9e3RoaXMuc3RhdGUud2hpdGV9XG4gICAgICAgICAgY291bnRkb3duPXt0aGlzLnN0YXRlLmNvdW50ZG93bn0gLz5cbiAgICAgICAgPFRpbWVyXG4gICAgICAgICAgY29sb3I9XCJibGFja1wiXG4gICAgICAgICAgdGltZT17dGhpcy5zdGF0ZS5ibGFja31cbiAgICAgICAgICBjb3VudGRvd249e3RoaXMuc3RhdGUuY291bnRkb3dufSAvPlxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG59KTtcblxuY29uc3QgVGltZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgbWl4aW5zOiBbUHVyZVJlbmRlck1peGluXSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3RpbWUsIGNvbG9yLCBjb3VudGRvd259ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBtaW4gPSBNYXRoLmZsb29yKHRpbWUgLyA2MCk7XG4gICAgY29uc3Qgc2VjID0gdGltZSAlIDYwO1xuICAgIGNvbnN0IHRpbWVMZWZ0ID0gYCR7bWlufToke3NlYyA8IDEwID8gJzAnICsgc2VjIDogc2VjfWA7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT17Y29sb3IgKyAoY29sb3IgPT09IGNvdW50ZG93biA/ICcgdGlja2luZycgOiAnJyl9PlxuICAgICAgICB7dGltZUxlZnR9XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDbG9jazsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcbi8vaW1wb3J0IENoZXNzUGllY2VzIGZyb20gJy4uL2NvbnN0YW50cy9DaGVzc1BpZWNlcyc7XG4vL2ltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XG4vL2ltcG9ydCBtYXliZVJldmVyc2UgZnJvbSAnLi4vbWl4aW5zL21heWJlUmV2ZXJzZSc7XG5pbXBvcnQgYmVoYXZpb3IgZnJvbSAnLi4vZ2FtZS9iZWhhdmlvcic7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IEdhbWVCb2FyZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cblx0fSxcblx0bWl4aW5zOiBbXSxcblx0Z2V0SW5pdGlhbFN0YXRlKCkge1xuXHRcdC8vcmV0dXJuIG51bGw7XG5cdFx0dGhpcy5zdGF0ZSA9IEdhbWVTdG9yZS5nZXRHYW1lYm9hcmRTdGF0ZSgpO1xuXHRcdGNvbnNvbGUubG9nKFwic3RhdGU/IFwiLCB0aGlzLnN0YXRlKTtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZTtcblx0XHQvLyB7XG5cdFx0Ly8gXHRib2FyZDogc3RhdGUuYm9hcmQ7XG5cdFx0Ly8gfVxuXHR9LFxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRHYW1lU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5fb25DaGFuZ2UpO1xuXHR9LFxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRHYW1lU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5fb25DaGFuZ2UpO1xuXHR9LFxuXHRfb25DaGFuZ2UoKSB7XG5cdFxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bGlnaHR1cDogR2FtZVN0b3JlLmdldEdhbWVib2FyZFN0YXRlKCkubGlnaHR1cFxuXHRcdH0pO1xuXHR9LFxuXHRyZW5kZXIoKSB7XG5cdFx0dmFyIHtzdGF0ZSwgcHJvcHN9ID0gdGhpcywge2JvYXJkfSA9IHN0YXRlLCB7c2l6ZX0gPSBwcm9wcztcblx0XHR2YXIge2JvYXJkLCBsaWdodHVwfSA9IHN0YXRlO1xuXG5cblx0XHR2YXIgY2VsbEFycmF5ID0gW107XG5cdFx0Zm9yICh2YXIgaT0wOyBpPHNpemU7IGkrKykge1xuXHRcdFx0dmFyIHJvdyA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaj0wOyBqPHNpemU7IGorKykge1xuXHRcdFx0XHRyb3cucHVzaCh7eDpqLCB5Oml9KVxuXHRcdFx0fVxuXHRcdFx0Y2VsbEFycmF5LnB1c2gocm93KTtcblx0XHR9XG5cdFx0cmV0dXJuIChcblxuXHRcdFx0PHRhYmxlIGNsYXNzTmFtZT1cImJvYXJkXCI+XG5cdFx0XHR7Y2VsbEFycmF5Lm1hcCgocm93LCBpZHgxKSA9PiBcblx0XHRcdFx0PHRyPlxuXHRcdFx0XHRcdHtyb3cubWFwKChjZWxsLCBpZHgyKSA9PlxuXHRcdFx0XHRcdFx0PHRkIHBvc2l0aW9uPXtgWyR7aWR4Mn0sICR7aWR4MX1dYH0+XG5cdFx0XHRcdFx0XHRcdDxDZWxsIHJlZj17YFske2lkeDJ9LCAke2lkeDF9XWB9XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHQgcG9zaXRpb249e2BbJHtpZHgyfSwgJHtpZHgxfV1gfSBcblx0XHRcdFx0XHRcdFx0XHR1bml0PXtib2FyZFtgWyR7aWR4Mn0sICR7aWR4MX1dYF0gPyBib2FyZFtgWyR7aWR4Mn0sICR7aWR4MX1dYF0udW5pdCA6IG51bGx9IFxuXHRcdFx0XHRcdFx0XHRcdGNvbG9yPXtib2FyZFtgWyR7aWR4Mn0sICR7aWR4MX1dYF0gPyBib2FyZFtgWyR7aWR4Mn0sICR7aWR4MX1dYF0uY29sb3IgOiBudWxsfVxuXHRcdFx0XHRcdFx0XHRcdGxpdHVwPXtsaWdodHVwW2BbJHtpZHgyfSwgJHtpZHgxfV1gXX1cblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLl9vbkNlbGxDbGlja30vPlxuXHRcdFx0XHRcdFx0PC90ZD5cblx0XHRcdFx0XHQpfVxuXHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHQpfVxuXHRcdDwvdGFibGU+XG5cdFx0KTtcblx0fVxuXG59KTtcblxuXG5jb25zdCBDZWxsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6IHtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICBcdCByZXR1cm4ge1xuICAgIFx0IFx0c2lkZTogJ2Zyb250JyxcbiAgICBcdCBcdGlzU2VsZWN0ZWQ6IGZhbHNlXG4gICAgXHQgfTtcbiAgXHR9LFxuICBcdGNvbXBvbmVudERpZE1vdW50KCkge1xuXG5cdFx0IC8vY29uc29sZS5sb2coXCJwb3NpdGlvbiBpcyBcIiwgdGhpcy5wcm9wcy5wb3NpdGlvbik7XG5cdFx0XG5cdH0sXG5cblx0Y29tcG9uZW50V2lsbE1vdW50KCkge1xuXHRcdFxuXHRcdFxuXHRcdFxuXHR9LFxuXHRtaXhpbnM6IFtdLFxuXG5cdF9vbkNsaWNrU3F1YXJlKCkge1xuXG5cdFx0Y29uc3Qge3VuaXQsIHBvc2l0aW9uLCBjb2xvcn0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHtzaWRlLCBpc1NlbGVjdGVkfSA9IHRoaXMuc3RhdGU7XG5cdFx0dmFyIGJvYXJkU3RhdGUgPSBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKTtcblx0XHR2YXIge2JvYXJkLCBsaWdodHVwLCBzZWxlY3RlZH0gPSBib2FyZFN0YXRlO1xuXG5cblx0XHRpZiAodW5pdCkge1xuXHRcdFx0aWYgKCFpc1NlbGVjdGVkKSB7XG5cdFx0XHRcdC8vY2hlY2sgaWYgdGhlIG9uY2xpY2sgdW5pdCBoYXMgdGhlIHNhbWUgY29sb3IgYXMgdGhlIHBsYXllclxuXHRcdFx0XHQvL3RoZW4gc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0XHQvL2lmKGNvbG9yID09PSApXG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtpc1NlbGVjdGVkOiB0cnVlfSk7XHRcblx0XHRcdFx0Y29uc29sZS5sb2coJ2JvYXJkIHNlbGVjdCcpXG5cblx0XHRcdFx0dmFyIHJhbmdlcyA9IFtdO1xuXHRcdFx0XHR2YXIgbW92ZXMgPSBiZWhhdmlvclt1bml0XVtzaWRlXTtcblx0XHRcdFx0dmFyIHBvcyA9IEpTT04ucGFyc2UocG9zaXRpb24pO1xuXHRcdFx0XHRPYmplY3Qua2V5cyhtb3ZlcykubWFwKGZ1bmN0aW9uKG1vdmUpe1xuXHRcdFx0XHRcdG1vdmUgPSBKU09OLnBhcnNlKG1vdmUpO1xuXHRcdFx0XHRcdHZhciB4ID0gIHBvc1swXSArIG1vdmVbMF0sIFxuXHRcdFx0XHRcdFx0eSA9ICBwb3NbMV0gKyBtb3ZlWzFdO1xuXHRcdFx0XHRcdHJhbmdlcy5wdXNoKHt4OiB4LCB5OiB5fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKGJlaGF2aW9yW3VuaXRdKTtcblxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdib2FyZCBkZXNlbGVjdCcpXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2lzU2VsZWN0ZWQ6IGZhbHNlfSk7XG5cdFx0XHR9XG5cdFx0XHRHYW1lQWN0aW9ucy5zaG93TW92ZXMoeyB1bml0OiB1bml0LCBjb2xvcjogY29sb3IgfSwgcG9zLCByYW5nZXMpO1xuXHRcdFx0Ly90aGlzLl9mbGlwKCk7XG5cdFx0fVxuXHRcdC8vdGhpcyBpcyB0aGUgY29uZGl0aW9uIHdoZXJlIHRoZSBwbGF5ZXIgc2VsZWN0cyBpdHMgb3duIHVuaXQsIGFuZCB0cnkgdG8gbW92ZSB0byBleGlzdGluZyB2YWxpZCBwb3NpdGlvblxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc29sZS5sb2coXCJ3ZSBnb3QgaGVyZVwiLCBzZWxlY3RlZCk7XG5cdFx0XHRpZiAoc2VsZWN0ZWQgJiYgT2JqZWN0LmtleXMobGlnaHR1cCkubGVuZ3RoKSB7XG5cdFx0XHRcdGlmKGxpZ2h0dXBbcG9zaXRpb25dKXtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIndoYXQgaXMgc2VsZWN0ZWQ/IFwiLCBzZWxlY3RlZCk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJ3aGF0IGlzIGN1cnJlbnQgdW5pdCBhbmQgcG9zaXRpb24/IFwiLCB1bml0LCBwb3NpdGlvbik7XG5cdFx0XHRcdFx0R2FtZUFjdGlvbnMubWFrZU1vdmUoc2VsZWN0ZWQucG9zaXRpb24sIHBvc2l0aW9uLCBmYWxzZSk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJtb3ZlZCFcIik7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJib2FyZD9cIiwgYm9hcmQpO1xuXHRcdFx0XHRcdHRoaXMuX2ZsaXAoKTtcblx0XHRcdFx0fVxuXHRcdFx0Ly9jaGVjayBpZiBjdXJyZW50IHBvc2l0aW9uIGlzIGluIGxpZ2h0dXBcblx0XHRcdC8vaWYgaXQgZG9lcywgdGhlbiByZW1vdmUgdGhlIGN1cnJlbnQgdW5pdCBhbmQgYWRkIGl0IHRvIGRlc2lnbmF0ZWQgcG9zaXRpb25cblx0XHRcdC8vc2V0IHNlbGVjdGVkIGFzIGZhbHNlXG5cdFx0XHQvL3RoaXMuc3RhdGUuc2lkZSBjaGFuZ2UgdG8gYmFjayAoaWYgaXQncyBmcm9udCwgdmljZSB2ZXJzYSlcblx0XHRcdC8vY2xlYXIgbGlnaHR1cFxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRfZmxpcCgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgc2lkZTogKHRoaXMuc3RhdGUuc2lkZSA9PT0gJ2Zyb250JykgPyAnYmFjaycgOiAnZnJvbnQnIH0pO1xuXHR9LFxuXG5cblx0cmVuZGVyKCl7XG5cdFx0dmFyIHt1bml0LCBjb2xvciwgbGl0dXB9ID0gdGhpcy5wcm9wcztcblxuXHRcdHZhciB7c2lkZX0gPSB0aGlzLnN0YXRlO1xuXG5cblx0XHR2YXIgY3hPYmogPSB7XHRcblx0XHRcdHVuaXQ6ICEhdW5pdCxcblx0XHRcdGxpdHVwOiBsaXR1cFxuXHRcdH07XG5cdFx0Y3hPYmpbc2lkZV0gPSB0cnVlO1xuXHRcdGlmICh1bml0KSB7XG5cdFx0XHRjeE9ialt1bml0XSA9IHRydWU7XG5cdFx0XHRjeE9ialtjb2xvcl0gPSB0cnVlO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2N4KGN4T2JqKX1cblx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLl9vbkNsaWNrU3F1YXJlfT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7Qm9hcmQ6IEdhbWVCb2FyZCwgQ2VsbDogQ2VsbH07IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBDbG9jayBmcm9tICcuL0Nsb2NrJztcbmltcG9ydCBDaGF0U3RvcmUgZnJvbSAnLi4vc3RvcmVzL0NoYXRTdG9yZSc7XG5pbXBvcnQgQ2hhdEFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9DaGF0QWN0aW9ucyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmNvbnN0IEdhbWVIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHBhcmFtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgb3Blbk1vZGFsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdhbWVPdmVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbl0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiBvbWl0KENoYXRTdG9yZS5nZXRTdGF0ZSgpLCAnbWVzc2FnZXMnKTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgQ2hhdFN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYXRDaGFuZ2UpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBDaGF0U3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYXRDaGFuZ2UpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXMsIGdhbWVPdmVyLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdW5zZWVuQ291bnQgPSB0aGlzLnN0YXRlLnVuc2VlbkNvdW50O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cblxuICAgICAgICA8Q2xvY2tcbiAgICAgICAgICBpbz17aW99XG4gICAgICAgICAgcGFyYW1zPXtwYXJhbXN9IC8+XG5cbiAgICAgICAgPHNwYW4gaWQ9XCJnYW1lLXR5cGVcIj5cbiAgICAgICAgICB7YCR7cGFyYW1zWzFdfXwke3BhcmFtc1syXX1gfVxuICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuXCIgaHJlZj1cIi9cIj5OZXcgZ2FtZTwvYT5cblxuICAgICAgICB7IWdhbWVPdmVyICYmIGlzT3Bwb25lbnRBdmFpbGFibGUgP1xuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tLXJlZCByZXNpZ25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9vblJlc2lnbn0+XG4gICAgICAgICAgICBSZXNpZ25cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDpnYW1lT3ZlciA/XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi0tcmVkIHJlbWF0Y2hcIlxuICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uUmVtYXRjaH0+XG4gICAgICAgICAgICBSZW1hdGNoXG4gICAgICAgICAgPC9hPlxuICAgICAgICA6bnVsbH1cblxuICAgICAgICA8YSBpZD1cImNoYXQtaWNvblwiXG4gICAgICAgICAgIG9uQ2xpY2s9e0NoYXRBY3Rpb25zLnRvZ2dsZVZpc2liaWxpdHl9PlxuICAgICAgICAgIHt1bnNlZW5Db3VudCA/XG4gICAgICAgICAgICA8c3BhbiBpZD1cImNoYXQtY291bnRlclwiPlxuICAgICAgICAgICAgICB7dW5zZWVuQ291bnQgPCA5ID8gdW5zZWVuQ291bnQgOiAnOSsnfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDpudWxsfVxuICAgICAgICAgIDxpbWcgc3JjPVwiL2ltZy9jaGF0LnN2Z1wiXG4gICAgICAgICAgICAgICB3aWR0aD1cIjUwXCJcbiAgICAgICAgICAgICAgIGhlaWdodD1cIjUwXCIgLz5cbiAgICAgICAgICBDaGF0XG4gICAgICAgIDwvYT5cbiAgICAgIDwvaGVhZGVyPlxuICAgICk7XG4gIH0sXG4gIF9vbkNoYXRDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShvbWl0KENoYXRTdG9yZS5nZXRTdGF0ZSgpLCAnbWVzc2FnZXMnKSk7XG4gIH0sXG4gIF9vblJlc2lnbigpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtcywgY29sb3J9ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLmVtaXQoJ3Jlc2lnbicsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICBjb2xvcjogY29sb3JcbiAgICB9KTtcbiAgfSxcbiAgX29uUmVtYXRjaCgpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtcywgb3Blbk1vZGFsLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWlzT3Bwb25lbnRBdmFpbGFibGUpIHtcbiAgICAgIG9wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9wcG9uZW50IGhhcyBkaXNjb25uZWN0ZWQuIFlvdSBuZWVkIHRvICcgK1xuICAgICAgICAnZ2VuZXJhdGUgYSBuZXcgbGluay4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpby5lbWl0KCdyZW1hdGNoLW9mZmVyJywge1xuICAgICAgdG9rZW46IHBhcmFtc1swXVxuICAgIH0pO1xuICAgIG9wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9mZmVyIGhhcyBiZWVuIHNlbnQuJyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lSGVhZGVyOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZUhlYWRlciBmcm9tICcuL0dhbWVIZWFkZXInO1xuaW1wb3J0IENoYXQgZnJvbSAnLi9DaGF0JztcbmltcG9ydCBNb2RhbCBmcm9tICcuL01vZGFsJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgQ2hlc3Nib2FyZEludGVyZmFjZSBmcm9tICcuL0NoZXNzYm9hcmRJbnRlcmZhY2UnO1xuaW1wb3J0IEdhbWVib2FyZEludGVyZmFjZSBmcm9tICcuL0dhbWVib2FyZEludGVyZmFjZSc7XG5pbXBvcnQge01hcH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkJztcblxuY29uc3QgR2FtZUludGVyZmFjZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgcGFyYW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNPcHBvbmVudEF2YWlsYWJsZTogZmFsc2UsXG4gICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgIG1vZGFsOiBNYXAoe1xuICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogJycsXG4gICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgaGlkZTogdGhpcy5faGlkZU1vZGFsLFxuICAgICAgICAgIGFjY2VwdDogdGhpcy5fYWNjZXB0UmVtYXRjaCxcbiAgICAgICAgICBkZWNsaW5lOiB0aGlzLl9kZWNsaW5lUmVtYXRjaFxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHNvdW5kc0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgZ2FtZU92ZXI6IEdhbWVTdG9yZS5nZXRTdGF0ZSgpLmdhbWVPdmVyXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXN9ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLm9uKCd0b2tlbi1pbnZhbGlkJywgKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb2RhbDogdGhpcy5zdGF0ZS5tb2RhbFxuICAgICAgICAuc2V0KCdvcGVuJywgdHJ1ZSlcbiAgICAgICAgLnNldCgnbWVzc2FnZScsICdHYW1lIGxpbmsgaXMgaW52YWxpZCBvciBoYXMgZXhwaXJlZC4nKVxuICAgICAgICAuc2V0KCd0eXBlJywgJ2luZm8nKVxuICAgIH0pKTtcblxuICAgIGlvLmVtaXQoJ2pvaW4nLCB7XG4gICAgICB0b2tlbjogcGFyYW1zWzBdLFxuICAgICAgdGltZTogcGFyYW1zWzFdICogNjAsXG4gICAgICBpbmM6IHBhcmFtc1syXVxuICAgIH0pO1xuXG4gICAgaW8ub24oJ2pvaW5lZCcsIGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEuY29sb3IgPT09ICdibGFjaycpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29sb3I6ICdibGFjayd9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlvLm9uKCdib3RoLWpvaW5lZCcsICgpID0+XG4gICAgICB0aGlzLnNldFN0YXRlKHtpc09wcG9uZW50QXZhaWxhYmxlOiB0cnVlfSwgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb2xvciA9PT0gJ3doaXRlJykge1xuICAgICAgICAgIGlvLmVtaXQoJ2Nsb2NrLXJ1bicsIHtcbiAgICAgICAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICBpby5vbignZnVsbCcsICgpID0+IHtcbiAgICAgIHdpbmRvdy5hbGVydChcbiAgICAgICAgJ1RoaXMgZ2FtZSBhbHJlYWR5IGhhcyB0d28gcGxheWVycy4gWW91IGhhdmUgdG8gY3JlYXRlIGEgbmV3IG9uZS4nKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvJztcbiAgICB9KTtcblxuICAgIGlvLm9uKCdwbGF5ZXItcmVzaWduZWQnLCBkYXRhID0+IHtcbiAgICAgIEdhbWVBY3Rpb25zLmdhbWVPdmVyKHtcbiAgICAgICAgdHlwZTogJ3Jlc2lnbicsXG4gICAgICAgIHdpbm5lcjogZGF0YS5jb2xvciA9PT0gJ2JsYWNrJyA/ICdXaGl0ZScgOiAnQmxhY2snXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlvLm9uKCdyZW1hdGNoLW9mZmVyZWQnLCAoKSA9PlxuICAgICAgdGhpcy5fb3Blbk1vZGFsKCdvZmZlcicsICdZb3VyIG9wcG9uZW50IGhhcyBzZW50IHlvdSBhIHJlbWF0Y2ggb2ZmZXIuJykpO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtZGVjbGluZWQnLCAoKSA9PlxuICAgICAgdGhpcy5fb3Blbk1vZGFsKCdpbmZvJywgJ1JlbWF0Y2ggb2ZmZXIgaGFzIGJlZW4gZGVjbGluZWQuJykpO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtYWNjZXB0ZWQnLCAoKSA9PiB7XG4gICAgICBHYW1lQWN0aW9ucy5yZW1hdGNoKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29sb3I6IHRoaXMuc3RhdGUuY29sb3IgPT09ICd3aGl0ZScgPyAnYmxhY2snIDogJ3doaXRlJyxcbiAgICAgICAgbW9kYWw6IHRoaXMuc3RhdGUubW9kYWwuc2V0KCdvcGVuJywgZmFsc2UpXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbG9yID09PSAnd2hpdGUnKSB7XG4gICAgICAgICAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMucHJvcHMucGFyYW1zWzBdLFxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpby5vbignb3Bwb25lbnQtZGlzY29ubmVjdGVkJywgKCkgPT4gIHtcbiAgICAgIGlmICghdGhpcy5zdGF0ZS5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpKSB7XG4gICAgICAgIHRoaXMuX29wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9wcG9uZW50IGhhcyBkaXNjb25uZWN0ZWQuJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzT3Bwb25lbnRBdmFpbGFibGU6IGZhbHNlfSk7XG4gICAgfSk7XG5cbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIEdhbWVTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH0sXG5cblxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2NvbG9yLCBzb3VuZHNFbmFibGVkLCBnYW1lT3ZlciwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNvbW1vblByb3BzID0ge1xuICAgICAgaW86IGlvLFxuICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgb3Blbk1vZGFsOiB0aGlzLl9vcGVuTW9kYWwsXG4gICAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBpc09wcG9uZW50QXZhaWxhYmxlXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8R2FtZUhlYWRlclxuICAgICAgICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICAgICAgICBwYXJhbXM9e3BhcmFtc31cbiAgICAgICAgICBnYW1lT3Zlcj17Z2FtZU92ZXIuZ2V0KCdzdGF0dXMnKX0gLz5cblxuICAgICAgICA8Q2hhdFxuICAgICAgICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICAgICAgICB0b2tlbj17cGFyYW1zWzBdfVxuICAgICAgICAgIHNvdW5kc0VuYWJsZWQ9e3NvdW5kc0VuYWJsZWR9IC8+XG5cbiAgICAgICAgICB7LypcbiAgICAgICAgPENoZXNzYm9hcmRJbnRlcmZhY2VcbiAgICAgICAgICB7Li4uY29tbW9uUHJvcHN9XG4gICAgICAgICAgdG9rZW49e3BhcmFtc1swXX1cbiAgICAgICAgICBzb3VuZHNFbmFibGVkPXtzb3VuZHNFbmFibGVkfVxuICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlcn0gLz5cbiAgICAgICAgKi99XG4gICAgICAgICAgXG4gICAgICAgIHsvKn1cbiAgICAgICAgPEJvYXJkIC8+XG4gICAgICAgICovfVxuXG4gICAgICAgICAgPEdhbWVib2FyZEludGVyZmFjZSAvPlxuXG5cblxuXG4gICAgICAgIDxNb2RhbCBkYXRhPXt0aGlzLnN0YXRlLm1vZGFsfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuXG5cblxuICBfb25HYW1lQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2dhbWVPdmVyOiBHYW1lU3RvcmUuZ2V0U3RhdGUoKS5nYW1lT3Zlcn0pO1xuICB9LFxuICBfb3Blbk1vZGFsKHR5cGUsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1vZGFsOiB0aGlzLnN0YXRlLm1vZGFsXG4gICAgICAgIC5zZXQoJ29wZW4nLCB0cnVlKVxuICAgICAgICAuc2V0KCdtZXNzYWdlJywgbWVzc2FnZSlcbiAgICAgICAgLnNldCgndHlwZScsIHR5cGUpXG4gICAgfSk7XG4gIH0sXG4gIF9oaWRlTW9kYWwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW9kYWw6IHRoaXMuc3RhdGUubW9kYWwuc2V0KCdvcGVuJywgZmFsc2UpfSk7XG4gIH0sXG4gIF9hY2NlcHRSZW1hdGNoKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpby5lbWl0KCdyZW1hdGNoLWFjY2VwdCcsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICB0aW1lOiBwYXJhbXNbMV0gKiA2MCxcbiAgICAgIGluYzogcGFyYW1zWzJdXG4gICAgfSk7XG4gICAgdGhpcy5faGlkZU1vZGFsKCk7XG4gIH0sXG4gIF9kZWNsaW5lUmVtYXRjaCgpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtc30gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8uZW1pdCgncmVtYXRjaC1kZWNsaW5lJywge1xuICAgICAgdG9rZW46IHBhcmFtc1swXVxuICAgIH0pO1xuICAgIHRoaXMuX2hpZGVNb2RhbCgpO1xuICB9LFxuICBfdG9nZ2xlU291bmRzKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNvdW5kc0VuYWJsZWQ6ICF0aGlzLnN0YXRlLnNvdW5kc0VuYWJsZWRcbiAgICB9KTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcbmltcG9ydCBDaGVzc2JvYXJkIGZyb20gJy4vQ2hlc3Nib2FyZCc7XG5pbXBvcnQge0JvYXJkfSBmcm9tICcuL0dhbWVCb2FyZCc7XG5pbXBvcnQgQ2FwdHVyZWRQaWVjZXMgZnJvbSAnLi9DYXB0dXJlZFBpZWNlcyc7XG5pbXBvcnQgVGFibGVPZk1vdmVzIGZyb20gJy4vVGFibGVPZk1vdmVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuLyogdGhlIHN0YXRlIG9mIHRoZSBnYW1lYm9hcmQgaXMgbWFuYWdlZCBieSBHYW1lU3RvcmUgKi9cblxuY29uc3QgR2FtZWJvYXJkSW50ZXJmYWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHByb3BUeXBlczoge1xuXG5cdH0sXG5cdG1peGluczogW10sXG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcblx0XHRyZXR1cm4gR2FtZVN0b3JlLmdldFN0YXRlKCk7XG5cdH0sXG5cdGdldERlZmF1bHRQcm9wcygpIHtcblxuXHR9LFxuXHRjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG5cblx0fSxcblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtwcm9tb3Rpb24sIHR1cm4sIGdhbWVPdmVyLCBjaGVja30gPSB0aGlzLnN0YXRlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgaWQ9XCJib2FyZC1tb3Zlcy13cmFwcGVyXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cblx0XHRcdFx0PGRpdiBpZD1cImJvYXJkLXdyYXBwZXJcIj5cblxuXHRcdFx0XHRcdDxDYXB0dXJlZFBpZWNlcyAvPlxuXG5cdFx0XHRcdFx0PEJvYXJkIHNpemU9ezZ9Lz5cblxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJmZWVkYmFja1wiPlxuXHRcdFx0XHRcdHshZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSA/XG5cdFx0XHRcdFx0XHQ8c3Bhbj5cblx0XHRcdFx0XHRcdFx0e2Ake3R1cm49PT0ndycgPyAnV2hpdGUnIDogJ0JsYWNrJ30gdG8gbW92ZS5gfVxuXHRcdFx0XHRcdFx0PC9zcGFuPiA6XG5cdFx0XHRcdFx0XHQ8c3Ryb25nPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+XG5cdFx0XHRcdFx0XHRcdCAge2dhbWVPdmVyLmdldCgnd2lubmVyJykgPT09ICdXaGl0ZScgPyAnRicgOiAnZid9XG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0e3RoaXMuX2dldEdhbWVPdmVyTWVzc2FnZSgpfVxuXHRcdFx0XHRcdFx0PC9zdHJvbmc+XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L3NwYW4+XG5cblxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9LFxuXG5cdF9vbkdhbWVDaGFuZ2UoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZShHYW1lU3RvcmUuZ2V0U3RhdGUoKSk7XG5cdH0sXG5cblx0X2dldEdhbWVPdmVyTWVzc2FnZSgpIHtcblx0XHRyZXR1cm4gYHlvdSBsb3NlYDtcblx0fVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IE1vZGFsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW5dLFxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCBpc09wZW4gPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCdvcGVuJyk7XG5cbiAgICBpZiAoaXNPcGVuKVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5ZG93bik7XG4gICAgZWxzZVxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5ZG93bik7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5wcm9wcy5kYXRhO1xuICAgIGNvbnN0IHR5cGUgPSBkYXRhLmdldCgndHlwZScpO1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IGRhdGEuZ2V0KCdjYWxsYmFja3MnKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICdtb2RhbC1tYXNrJzogdHJ1ZSxcbiAgICAgICAgICAgICAnaGlkZGVuJzogIWRhdGEuZ2V0KCdvcGVuJylcbiAgICAgICAgICAgfSl9XG4gICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX2hpZGVNb2RhbH0+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDxzdHJvbmc+RXNjOiA8L3N0cm9uZz5cbiAgICAgICAgICA8c3Bhbj57dHlwZSA9PT0gJ2luZm8nID8gJ09LJyA6ICdEZWNsaW5lJ308L3NwYW4+XG4gICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgPHN0cm9uZz5FbnRlcjogPC9zdHJvbmc+XG4gICAgICAgICAgPHNwYW4+e3R5cGUgPT09ICdpbmZvJyA/ICdPSycgOiAnQWNjZXB0J308L3NwYW4+XG4gICAgICAgIDwvcD5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCJcbiAgICAgICAgICAgICBvbkNsaWNrPXtlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9PlxuICAgICAgICAgIDxwPntkYXRhLmdldCgnbWVzc2FnZScpfTwvcD5cblxuICAgICAgICAgIHt0eXBlID09PSAnaW5mbycgPyBcbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBva1wiXG4gICAgICAgICAgICAgICBvbkNsaWNrPXtjYWxsYmFja3MuaGlkZX0+XG4gICAgICAgICAgICAgIE9LXG4gICAgICAgICAgICA8L2E+IDogW1xuXG4gICAgICAgICAgICA8YSBrZXk9XCJhXCJcbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0blwiXG4gICAgICAgICAgICAgICBzdHlsZT17e2xlZnQ6ICc0ZW0nfX1cbiAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NhbGxiYWNrcy5hY2NlcHR9PlxuICAgICAgICAgICAgICBBY2NlcHRcbiAgICAgICAgICAgIDwvYT4sXG4gICAgICAgICAgICA8YSBrZXk9XCJiXCJcbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tLXJlZFwiXG4gICAgICAgICAgICAgICBzdHlsZT17e3JpZ2h0OiAnNGVtJ319XG4gICAgICAgICAgICAgICBvbkNsaWNrPXtjYWxsYmFja3MuZGVjbGluZX0+XG4gICAgICAgICAgICAgIERlY2xpbmVcbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICBdfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIF9vbktleWRvd24oZSkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0KCd0eXBlJyk7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5wcm9wcy5kYXRhLmdldCgnY2FsbGJhY2tzJyk7XG5cbiAgICBpZiAodHlwZSA9PT0gJ2luZm8nKSB7XG4gICAgICBpZiAoZS53aGljaCA9PT0gMTMgfHwgZS53aGljaCA9PT0gMjcpIHtcbiAgICAgICAgY2FsbGJhY2tzLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgIGlmIChlLndoaWNoID09PSAxMykge1xuICAgICAgICBjYWxsYmFja3MuYWNjZXB0KCk7XG4gICAgICB9IGVsc2UgaWYgKGUud2hpY2ggPT09IDI3KSB7XG4gICAgICAgIGNhbGxiYWNrcy5kZWNsaW5lKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBfaGlkZU1vZGFsKCkge1xuICAgIHRoaXMucHJvcHMuZGF0YS5nZXQoJ2NhbGxiYWNrcycpLmhpZGUoKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcblxuY29uc3QgVGFibGVPZk1vdmVzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgb25HYW1lQ2hhbmdlXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vdmVzOiBHYW1lU3RvcmUuZ2V0TW92ZXMoKVxuICAgIH07XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHRhYmxlIGlkPVwibW92ZXNcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoPlRhYmxlIG9mIG1vdmVzPC90aD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAge3RoaXMuc3RhdGUubW92ZXMubWFwKChyb3csIGkpID0+IChcbiAgICAgICAgICAgIDx0ciBrZXk9e2l9PlxuICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz57YCR7aSArIDF9LmB9PC9zdHJvbmc+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIHtyb3cubWFwKChtb3ZlLCBqKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRkIGtleT17an0+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57bW92ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgKSkudG9BcnJheSgpfVxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICApKS50b0FycmF5KCl9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgICk7XG4gIH0sXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb3ZlczogR2FtZVN0b3JlLmdldE1vdmVzKClcbiAgICB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlT2ZNb3ZlczsiLCJpbXBvcnQga2V5TWlycm9yIGZyb20gJ3JlYWN0L2xpYi9rZXlNaXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBrZXlNaXJyb3Ioe1xuICBUT0dHTEVfVklTSUJJTElUWTogbnVsbCxcbiAgU1VCTUlUX01FU1NBR0U6IG51bGxcbn0pOyIsImNvbnN0IENoZXNzUGllY2VzID0ge1xuICAvLyBrZXk6IHBpZWNlIGZyb20gRkVOLCB2YWx1ZTogcGllY2UgZnJvbSBTbWFydCBSZWd1bGFyIGNoZXNzIGZvbnRcbiAgLy8gd2hpdGUgcGllY2VzXG4gICdLJzogJ0YnLFxuICAnUSc6ICdFJyxcbiAgJ1InOiAnRCcsXG4gICdCJzogJ0MnLFxuICAnTic6ICdCJyxcbiAgJ1AnOiAnQScsXG4gIC8vIGJsYWNrIHBpZWNlc1xuICAnayc6ICdmJyxcbiAgJ3EnOiAnZScsXG4gICdyJzogJ2QnLFxuICAnYic6ICdjJyxcbiAgJ24nOiAnYicsXG4gICdwJzogJ2EnLFxuICAvLyBlbXB0eSBzcXVhcmVcbiAgJy0nOiB1bmRlZmluZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoZXNzUGllY2VzOyIsImltcG9ydCBrZXlNaXJyb3IgZnJvbSAncmVhY3QvbGliL2tleU1pcnJvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGtleU1pcnJvcih7XG4gIE1BS0VfTU9WRTogbnVsbCxcbiAgU0hPV19NT1ZFUzogbnVsbCxcbiAgUkVNQVRDSDogbnVsbCxcbiAgRFJBVzogbnVsbCxcbiAgR0FNRV9PVkVSOiBudWxsLFxuICBDSEFOR0VfUFJPTU9USU9OOiBudWxsXG59KTsiLCJpbXBvcnQge0Rpc3BhdGNoZXJ9IGZyb20gJ2ZsdXgnO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKG5ldyBEaXNwYXRjaGVyKCksIHtcbiAgLy8gQHBhcmFtIHtvYmplY3R9IGFjdGlvbiBUaGUgZGF0YSBjb21pbmcgZnJvbSB0aGUgdmlldy5cbiAgaGFuZGxlVmlld0FjdGlvbjogZnVuY3Rpb24oYWN0aW9uKSB7XG4gICAgdGhpcy5kaXNwYXRjaCh7XG4gICAgICBzb3VyY2U6ICdWSUVXX0FDVElPTicsXG4gICAgICBhY3Rpb246IGFjdGlvblxuICAgIH0pO1xuICB9XG59KTsiLCJjb25zdCBUaWxlQWN0aW9ucyA9IHtcbiAgICBcIkFzc2Fzc2luXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXAgc2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0yLDJdXCI6IFwianVtcCBzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcImp1bXAgc2xpZGVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcCBzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wIHNsaWRlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcCBzbGlkZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiQm93bWFuXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwwXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzAsMl1cIjogXCJqdW1wXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJzdHJpa2VcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIkNoYW1waW9uXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMCwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0yLDBdXCI6IFwianVtcFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiRHJhZ29vblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJzdHJpa2VcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcInNsaWRlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJEdWNoZXNzXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlsxLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiRHVrZVwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcInNsaWRlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJzbGlkZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiRm9vdG1hblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbMCwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiS25pZ2h0XCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlstMSwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsxLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJtb3ZlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJMb25nYm93bWFuXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMF1cIjogXCJtb3ZlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWzAsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlswLC0zXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiTWFyc2hhbGxcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWy0xLDBdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJzbGlkZVwiLFxuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiT3JhY2xlXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiUGlrZW1hblwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsyLC0yXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTEsLTJdXCI6IFwic3RyaWtlXCIsXG4gICAgICAgICAgICBcIlsxLC0yXVwiOiBcInN0cmlrZVwiLFxuICAgICAgICAgICAgXCJbMCwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMCwyXVwiOiBcIm1vdmVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIlByaWVzdFwiOiB7XG4gICAgICAgIFwiZnJvbnRcIjoge1xuICAgICAgICAgICAgXCJbLTEsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsLTFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWzEsMV1cIjogXCJzbGlkZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0yLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDJdXCI6IFwianVtcFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiUmFuZ2VyXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlswLDFdXCI6IFwic2xpZGVcIixcbiAgICAgICAgICAgIFwiWy0xLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzEsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsLTFdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwtMV1cIjogXCJqdW1wXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJiYWNrXCI6IHtcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcInNsaWRlXCIsXG4gICAgICAgICAgICBcIlstMSwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzEsMl1cIjogXCJqdW1wXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJTZWVyXCI6IHtcbiAgICAgICAgXCJmcm9udFwiOiB7XG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWy0xLDFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwxXVwiOiBcIm1vdmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImJhY2tcIjoge1xuICAgICAgICAgICAgXCJbLTIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlstMiwyXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJXaXphcmRcIjoge1xuICAgICAgICBcImZyb250XCI6IHtcbiAgICAgICAgICAgIFwiWy0xLC0xXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsLTFdXCI6IFwibW92ZVwiLFxuICAgICAgICAgICAgXCJbMSwtMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwwXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzEsMF1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlstMSwxXVwiOiBcIm1vdmVcIixcbiAgICAgICAgICAgIFwiWzAsMV1cIjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBcIlsxLDFdXCI6IFwibW92ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFja1wiOiB7XG4gICAgICAgICAgICBcIlstMiwtMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLC0yXVwiOiBcImp1bXBcIixcbiAgICAgICAgICAgIFwiWzIsLTJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMF1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlsyLDBdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbLTIsMl1cIjogXCJqdW1wXCIsXG4gICAgICAgICAgICBcIlswLDJdXCI6IFwianVtcFwiLFxuICAgICAgICAgICAgXCJbMiwyXVwiOiBcImp1bXBcIlxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8vIHZhciBuZXdVbml0cyA9IHt9O1xuLy8gZm9yICh2YXIgdW5pdEtleSBpbiBUaWxlQWN0aW9ucykge1xuLy8gICAgIHZhciB1bml0ID0gVGlsZUFjdGlvbnNbdW5pdEtleV07XG4vLyAgICAgdmFyIG5ld1NpZGVzID0ge307XG4vLyAgICAgZm9yICh2YXIgc2lkZUtleSBpbiB1bml0KSB7XG4vLyAgICAgICAgIHZhciBkaXIgPSB1bml0W3NpZGVLZXldO1xuLy8gICAgICAgICB2YXIgbmV3RGlyID0ge307XG4vLyAgICAgICAgIGZvciAodmFyIGNvb3JkcyBpbiBkaXIpIHtcbi8vICAgICAgICAgICAgIHZhciBwYXJzZWQgPSBKU09OLnBhcnNlKGNvb3Jkcyk7XG4vLyAgICAgICAgICAgICB2YXIgbmV3Q29vcmRzID0gSlNPTi5zdHJpbmdpZnkoW3BhcnNlZFsxXSwgcGFyc2VkWzBdXSk7XG4vLyAgICAgICAgICAgICBuZXdEaXJbbmV3Q29vcmRzXSA9IGRpcltjb29yZHNdO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIG5ld1NpZGVzW3NpZGVLZXldID0gbmV3RGlyO1xuLy8gICAgIH1cbi8vICAgICBuZXdVbml0c1t1bml0S2V5XSA9IG5ld1NpZGVzO1xuLy8gfVxuLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobmV3VW5pdHMpKTtcblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgVGlsZUFjdGlvbnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmNvbnN0IE9SSUdJTiA9ICdodHRwOi8vbG9jYWxob3N0OjEzMzcnO1xuY29uc3QgV1MgPSBPUklHSU47XG5cbmV4cG9ydCBkZWZhdWx0IGlvLmNvbm5lY3QoV1MpOyIsImNvbnN0IG1heWJlUmV2ZXJzZSA9IHtcbiAgX21heWJlUmV2ZXJzZShpdGVyYWJsZSwgY29sb3IpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jb2xvciA9PT0gKGNvbG9yIHx8ICdibGFjaycpID9cbiAgICAgIGl0ZXJhYmxlLnJldmVyc2UoKSA6IGl0ZXJhYmxlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtYXliZVJldmVyc2U7IiwiaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcblxuY29uc3Qgb25HYW1lQ2hhbmdlID0ge1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIEdhbWVTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG9uR2FtZUNoYW5nZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XG5pbXBvcnQge0V2ZW50RW1pdHRlcjIgYXMgRXZlbnRFbWl0dGVyfSBmcm9tICdldmVudGVtaXR0ZXIyJztcbmltcG9ydCBDaGF0Q29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9DaGF0Q29uc3RhbnRzJztcbmltcG9ydCB7TGlzdCwgTWFwfSBmcm9tICdpbW11dGFibGUnO1xuXG5jb25zdCBDSEFOR0VfRVZFTlQgPSAnY2hhbmdlJztcbiAgXG52YXIgX21lc3NhZ2VzID0gTGlzdCgpO1xudmFyIF91bnNlZW5Db3VudCA9IDA7XG52YXIgX2lzQ2hhdEhpZGRlbiA9IHRydWU7XG5cbmNvbnN0IENoYXRTdG9yZSA9IE9iamVjdC5hc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2VzOiBfbWVzc2FnZXMsXG4gICAgICB1bnNlZW5Db3VudDogX3Vuc2VlbkNvdW50LFxuICAgICAgaXNDaGF0SGlkZGVuOiBfaXNDaGF0SGlkZGVuXG4gICAgfTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHRvZ2dsZVZpc2liaWxpdHkoKSB7XG4gIF9pc0NoYXRIaWRkZW4gPSAhX2lzQ2hhdEhpZGRlbjtcbiAgX3Vuc2VlbkNvdW50ID0gMDtcbn1cblxuZnVuY3Rpb24gc3VibWl0TWVzc2FnZShtZXNzYWdlLCBjbGFzc05hbWUsIHJlY2VpdmVkKSB7XG4gIF9tZXNzYWdlcyA9IF9tZXNzYWdlcy5wdXNoKE1hcCh7XG4gICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZVxuICB9KSk7XG5cbiAgaWYgKHJlY2VpdmVkICYmIF9pc0NoYXRIaWRkZW4pIHtcbiAgICBfdW5zZWVuQ291bnQgKz0gMTtcbiAgfVxufVxuXG5BcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKHBheWxvYWQgPT4ge1xuICBjb25zdCBhY3Rpb24gPSBwYXlsb2FkLmFjdGlvbjtcblxuICBzd2l0Y2ggKGFjdGlvbi5hY3Rpb25UeXBlKSB7XG4gICAgY2FzZSBDaGF0Q29uc3RhbnRzLlRPR0dMRV9WSVNJQklMSVRZOlxuICAgICAgdG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIENoYXRDb25zdGFudHMuU1VCTUlUX01FU1NBR0U6XG4gICAgICBzdWJtaXRNZXNzYWdlKGFjdGlvbi5tZXNzYWdlLCBhY3Rpb24uY2xhc3NOYW1lLCBhY3Rpb24ucmVjZWl2ZWQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBDaGF0U3RvcmUuZW1pdChDSEFOR0VfRVZFTlQpO1xuICByZXR1cm4gdHJ1ZTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDaGF0U3RvcmU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIyIGFzIEV2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRlbWl0dGVyMic7XG5pbXBvcnQgR2FtZUNvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvR2FtZUNvbnN0YW50cyc7XG5pbXBvcnQgQ2hlc3NQaWVjZXMgZnJvbSAnLi4vY29uc3RhbnRzL0NoZXNzUGllY2VzJztcbmltcG9ydCB7Q2hlc3N9IGZyb20gJ2NoZXNzLmpzJztcbmltcG9ydCB7TGlzdCwgTWFwLCBPcmRlcmVkTWFwLCBTZXR9IGZyb20gJ2ltbXV0YWJsZSc7XG4vL2ltcG9ydCBVdGlscyBmcm9tICcuLi9nYW1lL3V0aWxzJztcbi8vIGltcG9ydCBiZWhhdmlvciBmcm9tICcuLi9nYW1lL2JlaGF2aW9yJztcblxuY29uc3QgQ0hBTkdFX0VWRU5UID0gJ2NoYW5nZSc7XG5jb25zdCBNT1ZFX0VWRU5UID0gJ25ldy1tb3ZlJztcblxudmFyIF9nYW1lT3ZlcjtcbnZhciBfY2FwdHVyZWRQaWVjZXM7XG52YXIgX21vdmVzO1xudmFyIF9wcm9tb3Rpb247XG52YXIgX3R1cm47XG52YXIgX2NoZWNrO1xudmFyIF9sYXN0TW92ZTtcbnZhciBfY2hlc3M7XG5cbnZhciBfYm9hcmQgPSB7fSxcbiAgICBfbGlnaHR1cCA9IHt9LFxuICAgIF9zZWxlY3RlZDtcblxuXG5zZXRJbml0aWFsU3RhdGUoKTtcblxudmFyIEdhbWVTdG9yZSA9IE9iamVjdC5hc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICBhZGRDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24oY2IpIHtcbiAgICAgIHRoaXMub24oQ0hBTkdFX0VWRU5ULCBjYik7XG4gICAgfSxcblxuICAgIHJlbW92ZUNoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihjYikge1xuICAgICAgdGhpcy5yZW1vdmVDaGFuZ2VMaXN0ZW5lcihDSEFOR0VfRVZFTlQsIGNiKTtcbiAgICB9LFxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2FtZU92ZXI6IF9nYW1lT3ZlcixcbiAgICAgICAgICAgIHByb21vdGlvbjogX3Byb21vdGlvbixcbiAgICAgICAgICAgIHR1cm46IF90dXJuLFxuICAgICAgICAgICAgY2hlY2s6IF9jaGVjayxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldENhcHR1cmVkUGllY2VzKCkge1xuICAgICAgICByZXR1cm4gX2NhcHR1cmVkUGllY2VzO1xuICAgIH0sXG4gICAgZ2V0TW92ZXMoKSB7XG4gICAgICAgIHJldHVybiBfbW92ZXM7XG4gICAgfSxcbiAgICBnZXRDaGVzc2JvYXJkU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmZW46IF9jaGVzcy5mZW4oKSxcbiAgICAgICAgICAgIGxhc3RNb3ZlOiBfbGFzdE1vdmUsXG4gICAgICAgICAgICBjaGVjazogX2NoZWNrXG4gICAgICAgIH07XG4gICAgfSxcblxuXG4gICAgZ2V0R2FtZWJvYXJkU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBib2FyZDogX2JvYXJkLFxuICAgICAgICAgICAgbGlnaHR1cDogX2xpZ2h0dXAsXG4gICAgICAgICAgICBzZWxlY3RlZDogX3NlbGVjdGVkXG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICBnZXRWYWxpZE1vdmVzKHNxdWFyZSkge1xuICAgICAgICByZXR1cm4gc3F1YXJlID8gU2V0KFxuICAgICAgICAgICAgX2NoZXNzLm1vdmVzKHtcbiAgICAgICAgICAgICAgICBzcXVhcmU6IHNxdWFyZSxcbiAgICAgICAgICAgICAgICB2ZXJib3NlOiB0cnVlXG4gICAgICAgICAgICB9KS5tYXAobW92ZSA9PiBtb3ZlLnRvKSkgOiBTZXQoKTtcbiAgICB9LFxuXG4gICAgc2hvd01vdmVzKHVuaXQsIGZyb20sIGluUmFuZ2UpIHtcbiAgICAgICAgIGlmICghT2JqZWN0LmtleXMoX2xpZ2h0dXApLmxlbmd0aCkge1xuICAgICAgICAgIGluUmFuZ2UuZmlsdGVyKHJhbmdlID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWRNb3ZlKHVuaXQsIHJhbmdlKTtcbiAgICAgICAgICB9KS5mb3JFYWNoKG1vdmUgPT4ge1xuICAgICAgICAgICAgICB2YXIgY29vcmRzU3RyID0gYFske21vdmUueH0sICR7bW92ZS55fV1gO1xuICAgICAgICAgICAgICBfbGlnaHR1cFtjb29yZHNTdHJdID0gdHJ1ZTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIF9zZWxlY3RlZCA9IHtwb3NpdGlvbjogZnJvbSwgdW5pdDogdW5pdH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2Vsc2UnKTtcbiAgICAgICAgICBfbGlnaHR1cCA9IHt9O1xuICAgICAgICAgIF9zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy90aGlzLnNldFN0YXRlKHtfbGlnaHR1cDogdmFsaWRNb3Zlc30pO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZ2V0U3RhdGUoKSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd2YWxpZCBNb3ZlczonKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWxpZE1vdmVzKTtcblxuICAgIH1cblxuXG59KTtcblxuZnVuY3Rpb24gaXNPbkJvYXJkKGNvb3Jkcykge1xuICBpZiAoIWNvb3Jkcy5oYXNPd25Qcm9wZXJ0eSgneCcpIHx8ICFjb29yZHMuaGFzT3duUHJvcGVydHkoJ3knKSkgcmV0dXJuIGZhbHNlO1xuICB2YXIgY29vcmRzU3RyID0gYFske2Nvb3Jkcy55fSwgJHtjb29yZHMueH1dYFxuICAvL2NvbnNvbGUubG9nKCdjb29yZHNTdHI6JywgY29vcmRzU3RyKTtcbiAgLy9jb25zb2xlLmxvZygnX2JvYXJkOicsIF9ib2FyZCk7XG4gIC8vIGNvbnNvbGUubG9nKGBvbiB0aWxlICR7Y29vcmRzU3RyfWAsIF9ib2FyZFtjb29yZHNTdHJdKTtcbiAgcmV0dXJuIGNvb3Jkcy54ID49IDAgJiYgY29vcmRzLnkgPj0gMCAmJiBjb29yZHMueCA8IDYgJiYgY29vcmRzLnkgPCA2O1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkTW92ZSh1bml0LCBjb29yZHMpIHtcbiAgdmFyIGNvb3Jkc1N0ciA9IGBbJHtjb29yZHMueH0sICR7Y29vcmRzLnl9XWA7XG4gIHZhciB0YXJnZXRVbml0ID0gX2JvYXJkW2Nvb3Jkc1N0cl07XG5cbiAgaWYgKHRhcmdldFVuaXQpIHtcbiAgICAvL2NvbnNvbGUubG9nKGB1bml0LmNvbG9yOiAke3VuaXQuY29sb3J9YCk7XG4gICAgY29uc29sZS5sb2coYHRhcmdldFVuaXQuY29sb3I6ICR7dGFyZ2V0VW5pdC5jb2xvcn1gKTtcbiAgICBpZiAodW5pdC5jb2xvciA9PT0gdGFyZ2V0VW5pdC5jb2xvcikgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBpc09uQm9hcmQoY29vcmRzKTtcbn1cblxuZnVuY3Rpb24gc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIF9nYW1lT3ZlciA9IE1hcCh7XG4gICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgIHdpbm5lcjogbnVsbFxuICAgIH0pO1xuICAgIF9jYXB0dXJlZFBpZWNlcyA9IE9yZGVyZWRNYXAoW1xuICAgICAgICBbJ3cnLCBMaXN0KCldLFxuICAgICAgICBbJ2InLCBMaXN0KCldXG4gICAgXSk7XG4gICAgX21vdmVzID0gTGlzdCgpO1xuICAgIF9wcm9tb3Rpb24gPSAncSc7XG4gICAgX3R1cm4gPSAndyc7XG4gICAgX2NoZWNrID0gZmFsc2U7XG4gICAgX2xhc3RNb3ZlID0gTWFwKCk7XG4gICAgX3NlbGVjdGVkID0gbnVsbDtcbiAgICAvL19jaGVzcyA9IG5ldyBDaGVzcygpO1xuXG4gICAgX2xpZ2h0dXAgPSBbXTtcblxuICAgIF9ib2FyZCA9IHtcbiAgICAgICAgJ1sxLCAwXSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnYmxhY2snfSxcbiAgICAgICAgJ1syLCAwXSc6IHt1bml0OiAnRHVrZScsIGNvbG9yOiAnYmxhY2snfSxcbiAgICAgICAgJ1szLCAwXSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnYmxhY2snfSxcbiAgICAgICAgJ1syLCA1XSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnd2hpdGUnfSxcbiAgICAgICAgJ1szLCA1XSc6IHt1bml0OiAnRHVrZScsIGNvbG9yOiAnd2hpdGUnfSxcbiAgICAgICAgJ1s0LCA1XSc6IHt1bml0OiAnRm9vdG1hbicsIGNvbG9yOiAnd2hpdGUnfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGRyYXcoKSB7XG5cbn1cblxuZnVuY3Rpb24gIHVwZGF0ZUJvYXJkKGZyb20sIHRvKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwid2hhdCBpcyBmcm9tIGFuZCB0b1wiLCBmcm9tLCB0byk7XG4gICAgICAgIFxuICAgICAgIC8vZnJvbSA9IEpTT04uc3RyaW5naWZ5KGZyb20pLnJlcGxhY2UoLywvZywgJywgJyk7XG4gICAgICAgZnJvbSA9IGBbJHtmcm9tWzBdfSwgJHtmcm9tWzFdfV1gXG4gICAgICAgLy90byA9IEpTT04uc3RyaW5naWZ5KHRvKS5yZXBsYWNlKC8sL2csICcsICcpO1xuICAgICAgICBjb25zb2xlLmxvZygnZnJvbScsIGZyb20pO1xuXG4gICAgICAgdmFyIHVuaXQgPSBfYm9hcmRbZnJvbV07XG4gICAgICAgY29uc29sZS5sb2coJ3doYXQgaXMgdGhlIGZyb20gdW5pdCcsIHVuaXQpO1xuICAgICAgIF9ib2FyZFtmcm9tXSA9IG51bGw7XG4gICAgICAgIF9ib2FyZFt0b10gPSB1bml0O1xuICAgICAgICBfc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICByZXR1cm4gX2JvYXJkO1xuICAgIH1cbmZ1bmN0aW9uIG1ha2VNb3ZlKGZyb20sIHRvLCBjYXB0dXJlLCBlbWl0TW92ZSkge1xuICAgXG4gICAgdXBkYXRlQm9hcmQoZnJvbSwgdG8pO1xuICAgIC8vIGNvbnN0IG1vdmUgPSBfY2hlc3MubW92ZSh7XG4gICAgLy8gICAgIGZyb206IGZyb20sXG4gICAgLy8gICAgIHRvOiB0byxcbiAgICAvLyB9KTtcblxuICAgIC8vIGlmICghbW92ZSkge1xuICAgIC8vICAgICAvLyBtb3ZlIGlzIG5vdCB2YWxpZCwgcmV0dXJuIGZhbHNlIGFuZCBkb24ndCBlbWl0IGFueSBldmVudC5cbiAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xuICAgIC8vIH1cblxuICAgIC8vIF90dXJuID0gX2NoZXNzLnR1cm4oKTtcbiAgICAvLyBfY2hlY2sgPSBfY2hlc3MuaW5fY2hlY2soKTtcbiAgICAvLyBfbGFzdE1vdmUgPSBfbGFzdE1vdmUuc2V0KCdmcm9tJywgZnJvbSkuc2V0KCd0bycsIHRvKTtcbiAgICAvLyBfbW92ZXMgPSBfbW92ZXMuaXNFbXB0eSgpIHx8IF9tb3Zlcy5sYXN0KCkuc2l6ZSA9PT0gMiA/XG4gICAgLy8gICAgIF9tb3Zlcy5wdXNoKExpc3QoW21vdmUuc2FuXSkpIDpcbiAgICAvLyAgICAgX21vdmVzLnVwZGF0ZShfbW92ZXMuc2l6ZSAtIDEsIGxpc3QgPT4gbGlzdC5wdXNoKG1vdmUuc2FuKSk7XG5cbiAgICAvLyBpZiAoY2FwdHVyZSB8fCBtb3ZlLmZsYWdzID09PSAnZScpIHtcbiAgICAvLyAgICAgY29uc3QgY2FwdHVyZWRQaWVjZSA9IGNhcHR1cmUgfHxcbiAgICAvLyAgICAgICAgIENoZXNzUGllY2VzW190dXJuID09PSAndycgPyAnUCcgOiAncCddOyAvLyBlbiBwYXNzYW50XG5cbiAgICAvLyAgICAgX2NhcHR1cmVkUGllY2VzID0gX2NhcHR1cmVkUGllY2VzXG4gICAgLy8gICAgICAgICAudXBkYXRlKF90dXJuLCBsaXN0ID0+IGxpc3QucHVzaChjYXB0dXJlZFBpZWNlKSk7XG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKF9jaGVzcy5nYW1lX292ZXIoKSkge1xuICAgIC8vICAgICBjb25zdCB0eXBlID0gX2NoZXNzLmluX2NoZWNrbWF0ZSgpID8gJ2NoZWNrbWF0ZScgOlxuICAgIC8vICAgICAgICAgX2NoZXNzLmluX3N0YWxlbWF0ZSgpID8gJ3N0YWxlbWF0ZScgOlxuICAgIC8vICAgICAgICAgX2NoZXNzLmluX3RocmVlZm9sZF9yZXBldGl0aW9uKCkgPyAndGhyZWVmb2xkUmVwZXRpdGlvbicgOlxuICAgIC8vICAgICAgICAgX2NoZXNzLmluc3VmZmljaWVudF9tYXRlcmlhbCgpID8gJ2luc3VmZmljaWVudE1hdGVyaWFsJyA6XG4gICAgLy8gICAgICAgICBfY2hlc3MuaW5fZHJhdygpID8gJ2RyYXcnIDogbnVsbDtcblxuICAgIC8vICAgICBnYW1lT3Zlcih7XG4gICAgLy8gICAgICAgICB3aW5uZXI6IF90dXJuID09PSAnYicgPyAnV2hpdGUnIDogJ0JsYWNrJyxcbiAgICAvLyAgICAgICAgIHR5cGU6IHR5cGVcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfVxuXG4gICAgaWYgKGVtaXRNb3ZlKSB7XG4gICAgICAgIEdhbWVTdG9yZS5lbWl0KE1PVkVfRVZFTlQsIHtcbiAgICAgICAgICAgIGZyb206IGZyb20sXG4gICAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgICBjYXB0dXJlOiBjYXB0dXJlLFxuICAgICAgICAgICAgYm9hcmQ6IF9ib2FyZCAgICBcbiAgICAgICAgICAgIC8vZ2FtZU92ZXI6IF9jaGVzcy5nYW1lX292ZXIoKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiBnYW1lT3ZlcihvcHRpb25zKSB7XG4gICAgX2dhbWVPdmVyID0gX2dhbWVPdmVyXG4gICAgICAgIC5zZXQoJ3N0YXR1cycsIHRydWUpXG4gICAgICAgIC5zZXQoJ3dpbm5lcicsIG9wdGlvbnMud2lubmVyKVxuICAgICAgICAuc2V0KCd0eXBlJywgb3B0aW9ucy50eXBlKTtcbn1cblxuQXBwRGlzcGF0Y2hlci5yZWdpc3RlcihwYXlsb2FkID0+IHtcbiAgICBjb25zdCBhY3Rpb24gPSBwYXlsb2FkLmFjdGlvbjtcbiAgICBsZXQgZW1pdEV2ZW50ID0gdHJ1ZTtcblxuICAgIHN3aXRjaCAoYWN0aW9uLmFjdGlvblR5cGUpIHtcbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLk1BS0VfTU9WRTpcbiAgICAgICAgICAgIGVtaXRFdmVudCA9IG1ha2VNb3ZlKFxuICAgICAgICAgICAgICAgIGFjdGlvbi5mcm9tLCBhY3Rpb24udG8sIGFjdGlvbi5jYXB0dXJlLCBhY3Rpb24uZW1pdE1vdmUpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLlNIT1dfTU9WRVM6XG4gICAgICAgICAgICBlbWl0RXZlbnQgPSBHYW1lU3RvcmUuc2hvd01vdmVzKGFjdGlvbi51bml0LCBhY3Rpb24uZnJvbSwgYWN0aW9uLmluUmFuZ2UpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkNIQU5HRV9QUk9NT1RJT046XG4gICAgICAgICAgICBfcHJvbW90aW9uID0gYWN0aW9uLnByb21vdGlvbjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EUkFXOlxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuR0FNRV9PVkVSOlxuICAgICAgICAgICAgZ2FtZU92ZXIoYWN0aW9uLm9wdGlvbnMpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLlJFTUFUQ0g6XG4gICAgICAgICAgICBzZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZW1pdEV2ZW50KSB7XG4gICAgICAgIEdhbWVTdG9yZS5lbWl0KENIQU5HRV9FVkVOVCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVTdG9yZTtcbiJdfQ==
