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

// 'use strict';

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
		console.log("state? ", this.state.setup);
		return this.state;
		// {
		// 	setup: state.setup;
		// }
	},
	componentDidMount: function componentDidMount() {},
	componentWillUnmount: function componentWillUnmount() {},
	render: function render() {
		var _ref = this;

		var state = _ref.state;var setup = state.setup;

		console.log("setup ", setup);
		var cellArray = [];
		for (var i = 0; i < 6; i++) {
			var row = [];
			for (var j = 0; j < 6; j++) {
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
								unit: setup["[" + idx2 + ", " + idx1 + "]"] ? setup["[" + idx2 + ", " + idx1 + "]"][0] : null,
								color: setup["[" + idx2 + ", " + idx1 + "]"] ? setup["[" + idx2 + ", " + idx1 + "]"][1] : null })
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
	componentDidMount: function componentDidMount() {

		console.log("position is ", this.props.position);
	},

	componentWillMount: function componentWillMount() {},
	mixins: [],

	_onClickSquare: function _onClickSquare() {
		console.log("what the hell is this dom node thing? ", this.getDOMNode());
		var _props = this.props;
		var unit = _props.unit;
		var position = _props.position;
		var color = _props.color;
		var side = this.state.side;

		if (unit) {
			var ranges = [];
			var moves = behavior[unit][side];
			Object.keys(moves).map(function (move) {
				move = JSON.parse(move);
				var pos = JSON.parse(position);
				// if(!Array.isArray(position))

				var y = pos[0] + move[0];
				var x = pos[1] + move[1];
				ranges.push({ x: x, y: y });
				console.log("what is refs", this.refs);
			});
			console.log(moves);
			// position = JSON.parse(position);
			// var range =  position[0] + moves[]
			console.log("hi " + unit + "!");
			console.log(behavior[unit]);
			this._flip();
		}
	},

	_flip: function _flip() {
		this.setState({ side: this.state.side === "front" ? "back" : "front" });
	},

	render: function render() {
		var _props = this.props;
		var unit = _props.unit;
		var color = _props.color;
		var side = this.state.side;

		var cxObj = {
			unit: !!unit };
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
				React.createElement(Board, null)
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

setInitialState();

var GameStore = Object.assign({}, EventEmitter.prototype, {
  getState: function getState() {
    return {
      gameOver: _gameOver,
      promotion: _promotion,
      turn: _turn,
      check: _check
    };
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
    var initialBoard = {
      "[1, 0]": ["Footman", "black"],
      "[2, 0]": ["Duke", "black"],
      "[3, 0]": ["Footman", "black"],
      "[2, 5]": ["Footman", "white"],
      "[3, 5]": ["Duke", "white"],
      "[4, 5]": ["Footman", "white"]
    };
    return {
      setup: initialBoard
    };
  },

  getValidMoves: function getValidMoves(square) {
    return square ? Set(_chess.moves({
      square: square,
      verbose: true
    }).map(function (move) {
      return move.to;
    })) : Set();
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
  _chess = new Chess();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvcGxheS5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2tleU1pcnJvci5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9hY3Rpb25zL0NoYXRBY3Rpb25zLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2FjdGlvbnMvR2FtZUFjdGlvbnMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DYXB0dXJlZFBpZWNlcy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0NoYXQuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DaGVzc2JvYXJkLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ2hlc3Nib2FyZEludGVyZmFjZS5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0Nsb2NrLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUJvYXJkLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvR2FtZUhlYWRlci5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0dhbWVJbnRlcmZhY2UuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9HYW1lYm9hcmRJbnRlcmZhY2UuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9Nb2RhbC5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL1RhYmxlT2ZNb3Zlcy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hhdENvbnN0YW50cy5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb25zdGFudHMvQ2hlc3NQaWVjZXMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29uc3RhbnRzL0dhbWVDb25zdGFudHMuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2dhbWUvYmVoYXZpb3IuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvaW8uanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvbWl4aW5zL21heWJlUmV2ZXJzZS5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9taXhpbnMvb25HYW1lQ2hhbmdlLmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL3N0b3Jlcy9DaGF0U3RvcmUuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvc3RvcmVzL0dhbWVTdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7OztRQUVOLFVBQVU7O0lBQ1YsS0FBSywyQkFBTSxPQUFPOztJQUNsQixFQUFFLDJCQUFNLE1BQU07O0lBQ2QsYUFBYSwyQkFBTSw0QkFBNEI7O0FBRXRELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVwQyxLQUFLLENBQUMsTUFBTSxDQUNWLG9CQUFDLGFBQWEsSUFBQyxFQUFFLEVBQUUsRUFBRSxBQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sQUFBQyxHQUFHLEVBQ3pDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQ3JDLENBQUM7OztBQ2RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztJQ25ETyxhQUFhLDJCQUFNLDRCQUE0Qjs7SUFDL0MsYUFBYSwyQkFBTSw2QkFBNkI7O0FBRXZELElBQU0sV0FBVyxHQUFHO0FBQ2xCLGtCQUFnQixFQUFBLDRCQUFHO0FBQ2pCLGlCQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDN0IsZ0JBQVUsRUFBRSxhQUFhLENBQUMsaUJBQWlCO0tBQzVDLENBQUMsQ0FBQztHQUNKO0FBQ0QsZUFBYSxFQUFBLHVCQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFO0FBQzFDLGlCQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDN0IsZ0JBQVUsRUFBRSxhQUFhLENBQUMsY0FBYztBQUN4QyxhQUFPLEVBQUUsT0FBTztBQUNoQixlQUFTLEVBQUUsU0FBUztBQUNwQixjQUFRLEVBQUUsUUFBUTtLQUNuQixDQUFDLENBQUM7R0FDSjtDQUNGLENBQUM7O2lCQUVhLFdBQVc7Ozs7Ozs7SUNuQm5CLGFBQWEsMkJBQU0sNEJBQTRCOztJQUMvQyxhQUFhLDJCQUFNLDZCQUE2Qjs7QUFFdkQsSUFBTSxXQUFXLEdBQUc7QUFDbEIsVUFBUSxFQUFBLGtCQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRTtBQUNwQyxpQkFBYSxDQUFDLGdCQUFnQixDQUFDO0FBQzdCLGdCQUFVLEVBQUUsYUFBYSxDQUFDLFNBQVM7QUFDbkMsVUFBSSxFQUFFLElBQUk7QUFDVixRQUFFLEVBQUUsRUFBRTtBQUNOLGFBQU8sRUFBRSxPQUFPO0FBQ2hCLGNBQVEsRUFBRSxRQUFRO0tBQ25CLENBQUMsQ0FBQztHQUNKO0FBQ0QsTUFBSSxFQUFBLGdCQUFHO0FBQ0wsaUJBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztBQUM3QixnQkFBVSxFQUFFLGFBQWEsQ0FBQyxJQUFJO0tBQy9CLENBQUMsQ0FBQztHQUNKO0FBQ0QsU0FBTyxFQUFBLG1CQUFHO0FBQ1IsaUJBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztBQUM3QixnQkFBVSxFQUFFLGFBQWEsQ0FBQyxPQUFPO0tBQ2xDLENBQUMsQ0FBQztHQUNKO0FBQ0QsVUFBUSxFQUFBLGtCQUFDLE9BQU8sRUFBRTtBQUNoQixpQkFBYSxDQUFDLGdCQUFnQixDQUFDO0FBQzdCLGdCQUFVLEVBQUUsYUFBYSxDQUFDLFNBQVM7QUFDbkMsYUFBTyxFQUFFLE9BQU87S0FDakIsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxpQkFBZSxFQUFBLHlCQUFDLFNBQVMsRUFBRTtBQUN6QixpQkFBYSxDQUFDLGdCQUFnQixDQUFDO0FBQzdCLGdCQUFVLEVBQUUsYUFBYSxDQUFDLGdCQUFnQjtBQUMxQyxlQUFTLEVBQUUsU0FBUztLQUNyQixDQUFDLENBQUM7R0FDSjtDQUNGLENBQUM7O2lCQUVhLFdBQVc7OztBQ3JDMUIsWUFBWSxDQUFDOzs7O0lBRU4sS0FBSywyQkFBTSxjQUFjOztJQUN6QixTQUFTLDJCQUFNLHFCQUFxQjs7SUFDcEMsWUFBWSwyQkFBTSx3QkFBd0I7O0FBRWpELElBQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUV2QyxRQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUM7O0FBRXBELGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsV0FBTztBQUNMLG9CQUFjLEVBQUUsU0FBUyxDQUFDLGlCQUFpQixFQUFFO0tBQzlDLENBQUM7R0FDSDtBQUNELFFBQU0sRUFBQSxrQkFBRztBQUNQLFFBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDOztBQUVyQyxXQUNFOztRQUFLLEVBQUUsRUFBQyxpQkFBaUI7TUFDdEIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQU0sRUFBRSxLQUFLO2VBQ3BCOztZQUFJLEdBQUcsRUFBRSxLQUFLLEFBQUM7VUFDWixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLENBQUM7bUJBQUs7O2dCQUFJLEdBQUcsRUFBRSxDQUFDLEFBQUM7Y0FBRSxLQUFLO2FBQU07V0FBQSxDQUFDLENBQUMsT0FBTyxFQUFFO1NBQzFEO09BQ04sQ0FBQyxDQUFDLE9BQU8sRUFBRTtLQUNSLENBQ047R0FDSDtBQUNELGVBQWEsRUFBQSx5QkFBRztBQUNkLFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixvQkFBYyxFQUFFLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRTtLQUM5QyxDQUFDLENBQUM7R0FDSjtDQUNGLENBQUMsQ0FBQzs7aUJBRVksY0FBYzs7O0FDbkM3QixZQUFZLENBQUM7Ozs7SUFFTixLQUFLLDJCQUFNLGNBQWM7O0lBQ3pCLFNBQVMsMkJBQU0scUJBQXFCOztJQUNwQyxXQUFXLDJCQUFNLHdCQUF3Qjs7QUFFaEQsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRTdCLFdBQVMsRUFBRTtBQUNULE1BQUUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3JDLFNBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3hDLFNBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVU7QUFDM0QsaUJBQWEsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzlDLHVCQUFtQixFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDcEQsYUFBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7R0FDM0M7QUFDRCxRQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQzs7QUFFdEMsaUJBQWUsRUFBQSwyQkFBRztBQUNoQixRQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbkMsV0FBTztBQUNMLGtCQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVk7QUFDaEMsY0FBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO0FBQ3hCLGFBQU8sRUFBRSxFQUFFLEVBQ1osQ0FBQztHQUNIO0FBQ0QsbUJBQWlCLEVBQUEsNkJBQUc7OztBQUNsQixRQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsVUFBQSxJQUFJLEVBQUk7QUFDMUMsaUJBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNwRSxZQUFLLGVBQWUsRUFBRSxDQUFDO0tBQ3hCLENBQUMsQ0FBQztBQUNILGFBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUVoRCxRQUFJLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxFQUFFLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0dBQzlEO0FBQ0Qsc0JBQW9CLEVBQUEsZ0NBQUc7QUFDckIsYUFBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7R0FDbEQ7QUFDRCxRQUFNLEVBQUEsa0JBQUc7QUFDUCxXQUNFOztRQUFLLEVBQUUsRUFBQyxjQUFjO0FBQ2pCLGlCQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsUUFBUSxHQUFHLElBQUksQUFBQztNQUV4RDs7OztPQUFhO01BQ2I7O1VBQUcsU0FBUyxFQUFDLE9BQU87QUFDakIsaUJBQU8sRUFBRSxXQUFXLENBQUMsZ0JBQWdCLEFBQUM7O09BRXJDO01BRUo7O1VBQU8sT0FBTyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsUUFBUTtRQUNoQyxnQ0FBUSxHQUFHLEVBQUMsa0JBQWtCLEdBQUc7T0FDM0I7TUFFUjs7VUFBSSxFQUFFLEVBQUMsV0FBVyxFQUFDLEdBQUcsRUFBQyxNQUFNO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUNsQzs7Y0FBSSxHQUFHLEVBQUUsQ0FBQyxBQUFDLEVBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEFBQUM7WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7V0FDcEI7U0FDTixDQUFDLENBQUMsT0FBTyxFQUFFO09BQ1Q7TUFFTDs7OztPQUFnQztNQUVoQzs7VUFBTSxFQUFFLEVBQUMsV0FBVztBQUNkLGtCQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQUFBQztRQUNsQywrQkFBTyxJQUFJLEVBQUMsTUFBTTtBQUNYLGFBQUcsRUFBQyxTQUFTO0FBQ2IsbUJBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBQztBQUM1QixrQkFBUSxNQUFBO0FBQ1IsZUFBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxBQUFDO0FBQzFCLGtCQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixBQUFDLEdBQUc7T0FDckM7S0FDSCxDQUNOO0dBQ0g7QUFDRCxvQkFBa0IsRUFBQSw4QkFBRztBQUNuQixRQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7R0FDdkQ7QUFDRCxrQkFBZ0IsRUFBQSwwQkFBQyxDQUFDLEVBQUU7QUFDbEIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7R0FDMUM7QUFDRCxnQkFBYyxFQUFBLHdCQUFDLENBQUMsRUFBRTtBQUNoQixLQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7aUJBQzZCLElBQUksQ0FBQyxLQUFLO1FBQW5ELEVBQUUsVUFBRixFQUFFO1FBQUUsS0FBSyxVQUFMLEtBQUs7UUFBRSxLQUFLLFVBQUwsS0FBSztRQUFFLG1CQUFtQixVQUFuQixtQkFBbUI7O0FBQzVDLFFBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDOztBQUVuQyxRQUFJLENBQUMsbUJBQW1CLEVBQUU7QUFDeEIsVUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdEMsVUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLHlDQUF5QyxHQUNwRSwwQkFBMEIsQ0FBQyxDQUFDO0FBQzlCLGFBQU87S0FDUjs7QUFFRCxlQUFXLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxLQUFLLEdBQUcsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzVELFFBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQzs7QUFFN0IsTUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7QUFDdEIsYUFBTyxFQUFFLE9BQU87QUFDaEIsV0FBSyxFQUFFLEtBQUs7QUFDWixXQUFLLEVBQUUsS0FBSztLQUNiLENBQUMsQ0FBQztHQUNKO0FBQ0QsYUFBVyxFQUFBLHVCQUFHO0FBQ1osUUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDN0MsWUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO0dBQzVDO0FBQ0QsaUJBQWUsRUFBQSwyQkFBRztBQUNoQixRQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO0FBQzVCLFVBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3RDO0dBQ0Y7Q0FDRixDQUFDLENBQUM7O2lCQUVZLElBQUk7OztBQ2pIbkIsWUFBWSxDQUFDOzs7Ozs7SUFFTixLQUFLLDJCQUFNLGNBQWM7O0lBQ3pCLFNBQVMsMkJBQU0scUJBQXFCOztJQUNwQyxXQUFXLDJCQUFNLHdCQUF3Qjs7SUFDekMsV0FBVywyQkFBTSwwQkFBMEI7O0lBQzNDLFlBQVksMkJBQU0sd0JBQXdCOztJQUMxQyxZQUFZLDJCQUFNLHdCQUF3Qjs7SUFDMUMsSUFBSSwyQkFBTSxhQUFhOztJQUN2QixFQUFFLDJCQUFNLFlBQVk7O3lCQUNVLFdBQVc7O0lBQXhDLEdBQUcsY0FBSCxHQUFHO0lBQUUsTUFBTSxjQUFOLE1BQU07SUFBRSxJQUFJLGNBQUosSUFBSTtJQUFFLEdBQUcsY0FBSCxHQUFHOztBQUU5QixJQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RDLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRXRDLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUVuQyxXQUFTLEVBQUU7QUFDVCxNQUFFLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUNyQyxTQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN4QyxrQkFBYyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDL0MsU0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVTtBQUMzRCxZQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUN6Qyx1QkFBbUIsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0dBQ3JEO0FBQ0QsUUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDOztBQUVwRCxpQkFBZSxFQUFBLDJCQUFHO0FBQ2hCLFFBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDOztBQUU3QyxXQUFPO0FBQ0wsU0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO0FBQ2QsY0FBUSxFQUFFLElBQUk7QUFDZCxjQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7QUFDeEIsaUJBQVcsRUFBRSxLQUFLO0tBQ25CLENBQUM7R0FDSDtBQUNELG1CQUFpQixFQUFBLDZCQUFHOzs7aUJBQ0UsSUFBSSxDQUFDLEtBQUs7UUFBdkIsRUFBRSxVQUFGLEVBQUU7UUFBRSxLQUFLLFVBQUwsS0FBSzs7QUFDaEIsYUFBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLGFBQVMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFMUMsTUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQSxJQUFJLEVBQUk7QUFDcEIsaUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUQsWUFBSyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRTVCLFVBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2xCLGNBQUssU0FBUyxFQUFFLENBQUM7T0FDbEI7O0FBRUQsVUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO0FBQ25CLFlBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RCxhQUFLLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDOztBQUUvQixjQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQUssd0JBQXdCLENBQUMsQ0FBQztPQUNqRTtLQUNGLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFO2FBQU0sTUFBSyxRQUFRLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7S0FBQSxDQUFDLENBQUM7R0FDbEU7QUFDRCxzQkFBb0IsRUFBQSxnQ0FBRztBQUNyQixhQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDNUMsYUFBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0dBQzNDO0FBQ0QsUUFBTSxFQUFBLGtCQUFHOzs7aUJBQ3dDLElBQUksQ0FBQyxLQUFLO1FBQWxELEtBQUssVUFBTCxLQUFLO1FBQUUsbUJBQW1CLFVBQW5CLG1CQUFtQjtRQUFFLFFBQVEsVUFBUixRQUFRO2lCQUNJLElBQUksQ0FBQyxLQUFLO1FBQWxELEdBQUcsVUFBSCxHQUFHO1FBQUUsUUFBUSxVQUFSLFFBQVE7UUFBRSxRQUFRLFVBQVIsUUFBUTtRQUFFLFdBQVcsVUFBWCxXQUFXOztBQUMzQyxRQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLFFBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QixRQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuRCxRQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN0RCxRQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFakQsV0FDRTs7UUFBTyxTQUFTLEVBQUMsWUFBWTtNQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsU0FBUyxFQUFFLENBQUM7ZUFDckIsb0JBQUMsR0FBRztBQUNGLGFBQUcsRUFBRSxDQUFDLEFBQUM7QUFDUCxjQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQUFBQztBQUNuQixtQkFBUyxFQUFFLFNBQVMsQUFBQztBQUNyQixlQUFLLEVBQUUsS0FBSyxBQUFDO0FBQ2Isb0JBQVUsRUFBRSxVQUFVLElBQUksbUJBQW1CLElBQUksQ0FBQyxRQUFRLEFBQUM7QUFDM0Qsa0JBQVEsRUFBRSxRQUFRLEFBQUM7QUFDbkIsa0JBQVEsRUFBRSxRQUFRLEFBQUM7QUFDbkIscUJBQVcsRUFBRSxNQUFLLFlBQVksQUFBQztBQUMvQixxQkFBVyxFQUFFLFdBQVcsQUFBQztBQUN6QixvQkFBVSxFQUFFLFNBQVMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEFBQUMsR0FBRztPQUFBLENBQUM7S0FDaEQsQ0FDUjtHQUNIO0FBQ0QsZUFBYSxFQUFBLHVCQUFDLEVBQUUsRUFBRTtBQUNoQixRQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztBQUM3QyxRQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osU0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO0FBQ2QsY0FBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO0FBQ3hCLGlCQUFXLEVBQUUsS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQSxBQUFDO0tBQzFFLEVBQUUsRUFBRSxDQUFDLENBQUM7R0FDUjtBQUNELGNBQVksRUFBQSxzQkFBQyxNQUFNLEVBQUU7QUFDbkIsUUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLGNBQVEsRUFBRSxNQUFNO0tBQ2pCLENBQUMsQ0FBQztHQUNKO0FBQ0QsWUFBVSxFQUFBLG9CQUFDLElBQUksRUFBRTtpQkFDSyxJQUFJLENBQUMsS0FBSztRQUF2QixFQUFFLFVBQUYsRUFBRTtRQUFFLEtBQUssVUFBTCxLQUFLOztBQUVoQixNQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNsQixXQUFLLEVBQUUsS0FBSztBQUNaLFVBQUksRUFBRSxJQUFJO0tBQ1gsQ0FBQyxDQUFDOztBQUVILGNBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztHQUMxQztBQUNELFdBQVMsRUFBQSxxQkFBRztpQkFDaUIsSUFBSSxDQUFDLEtBQUs7UUFBOUIsRUFBRSxVQUFGLEVBQUU7UUFBRSxLQUFLLFVBQUwsS0FBSztRQUFFLEtBQUssVUFBTCxLQUFLOztBQUV2QixNQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNuQixXQUFLLEVBQUUsS0FBSztBQUNaLFdBQUssRUFBRSxLQUFLO0tBQ2IsQ0FBQyxDQUFDO0dBQ0o7QUFDRCwwQkFBd0IsRUFBQSxvQ0FBRztBQUN6QixRQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEQsU0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUMsVUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztHQUNwRTtDQUNGLENBQUMsQ0FBQzs7QUFFSCxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFNUIsV0FBUyxFQUFFO0FBQ1QsUUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVTtBQUN6RSxhQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUM1QyxTQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVO0FBQzNELGNBQVUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzNDLFlBQVEsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU07QUFDaEMsWUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtBQUNoQyxlQUFXLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUM1QyxlQUFXLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVTtBQUNoRSxjQUFVLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVTtHQUN2RDtBQUNELFFBQU0sRUFBRSxDQUFDLFlBQVksQ0FBQzs7QUFFdEIsUUFBTSxFQUFBLGtCQUFHOzs7aUJBQzBCLElBQUksQ0FBQyxLQUFLO1FBQXBDLElBQUksVUFBSixJQUFJO1FBQUUsU0FBUyxVQUFULFNBQVM7UUFBRSxLQUFLLFVBQUwsS0FBSzs7QUFDN0IsUUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxRQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUNwRCxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSzthQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUs7S0FDOUQsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUVaLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQ3BCLENBQUM7O0FBRUYsV0FDRTs7O01BQ0csTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxDQUFDO2VBQ25CLG9CQUFDLE1BQU07QUFDTCxhQUFHLEVBQUUsQ0FBQyxBQUFDO0FBQ1AsZ0JBQU0sRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQUFBQztBQUM1QixlQUFLLEVBQUUsS0FBSyxBQUFDO1dBQ1QsSUFBSSxDQUFDLE1BQUssS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsRUFBSTtPQUFBLENBQUM7S0FDL0MsQ0FDTDtHQUNIO0NBQ0YsQ0FBQyxDQUFDOztBQUVILElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUUvQixXQUFTLEVBQUU7QUFDVCxVQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN6QyxTQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN4QyxTQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVO0FBQzNELGNBQVUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzNDLFlBQVEsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU07QUFDaEMsWUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtBQUNoQyxlQUFXLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUM1QyxlQUFXLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVTtBQUNoRSxjQUFVLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVTtHQUN2RDs7QUFFRCxRQUFNLEVBQUEsa0JBQUc7aUJBRXVDLElBQUksQ0FBQyxLQUFLO1FBRGpELFFBQVEsVUFBUixRQUFRO1FBQUUsUUFBUSxVQUFSLFFBQVE7UUFBRSxNQUFNLFVBQU4sTUFBTTtRQUFFLEtBQUssVUFBTCxLQUFLO1FBQ2pDLFVBQVUsVUFBVixVQUFVO1FBQUUsV0FBVyxVQUFYLFdBQVc7UUFBRSxVQUFVLFVBQVYsVUFBVTs7QUFDMUMsUUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUMsUUFBTSxHQUFHLEdBQUcsS0FBSyxLQUFLLE9BQU8sR0FBRyxZQUFZLEdBQUcsWUFBWSxDQUFDO0FBQzVELFFBQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQyxRQUFNLFdBQVcsR0FBRyxRQUFRLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFdkQsV0FDRTs7UUFBSSxTQUFTLEVBQUUsRUFBRSxDQUFDO0FBQ1osa0JBQVEsRUFBRSxRQUFRLEtBQUssTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtBQUN0RCxjQUFJLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxNQUFNO0FBQ3JDLFlBQUUsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLE1BQU07QUFDakMsbUJBQVMsRUFBRSxXQUFXO1NBQ3ZCLENBQUMsQUFBQztBQUNILGVBQU8sRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQUFBQztBQUM3QyxrQkFBVSxFQUFFLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQUFBQztBQUNsRCxjQUFNLEVBQUUsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxBQUFDO01BRTNDLEtBQUssR0FDSjs7VUFBRyxTQUFTLEVBQUUsV0FBVyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxJQUFJLEFBQUM7QUFDaEUsaUJBQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxBQUFDO0FBQzdCLHFCQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksQUFBQztBQUMvQixtQkFBUyxFQUFFLFdBQVcsSUFBSSxVQUFVLEFBQUM7UUFDckMsS0FBSztPQUNKLEdBQ0wsSUFBSTtLQUNGLENBQ0w7R0FDSDtBQUNELGdCQUFjLEVBQUEsMEJBQUc7aUJBQ3NDLElBQUksQ0FBQyxLQUFLO1FBQXhELFVBQVUsVUFBVixVQUFVO1FBQUUsS0FBSyxVQUFMLEtBQUs7UUFBRSxRQUFRLFVBQVIsUUFBUTtRQUFFLE1BQU0sVUFBTixNQUFNO1FBQUUsS0FBSyxVQUFMLEtBQUs7O0FBQ2pELFFBQU0sR0FBRyxHQUFHLEtBQUssS0FBSyxPQUFPLEdBQUcsWUFBWSxHQUFHLFlBQVksQ0FBQzs7QUFFNUQsUUFBSSxDQUFDLFVBQVUsSUFBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEFBQUM7QUFDaEQsYUFBTztXQUNKLElBQUksUUFBUSxJQUFJLFFBQVEsS0FBSyxNQUFNLEVBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQzFCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsS0FFL0IsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztHQUNwRTtBQUNELGNBQVksRUFBQSxzQkFBQyxDQUFDLEVBQUU7QUFDZCxLQUFDLENBQUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7O0FBRXRDLEtBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFekMsUUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUMzQztBQUNELGFBQVcsRUFBQSxxQkFBQyxDQUFDLEVBQUU7QUFDYixLQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsS0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0dBQ3BDO0FBQ0QsU0FBTyxFQUFBLGlCQUFDLENBQUMsRUFBRTtBQUNULEtBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDZSxJQUFJLENBQUMsS0FBSztRQUFyQyxRQUFRLFVBQVIsUUFBUTtRQUFFLE1BQU0sVUFBTixNQUFNO1FBQUUsS0FBSyxVQUFMLEtBQUs7O0FBQzlCLGVBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDbEU7Q0FDRixDQUFDLENBQUM7O2lCQUVZLFVBQVU7OztBQ2xQekIsWUFBWSxDQUFDOzs7Ozs7SUFFTixLQUFLLDJCQUFNLGNBQWM7O0lBQ3pCLFNBQVMsMkJBQU0scUJBQXFCOztJQUNwQyxXQUFXLDJCQUFNLHdCQUF3Qjs7SUFDekMsWUFBWSwyQkFBTSx3QkFBd0I7O0lBQzFDLFVBQVUsMkJBQU0sY0FBYzs7SUFDOUIsY0FBYywyQkFBTSxrQkFBa0I7O0lBQ3RDLFlBQVksMkJBQU0sZ0JBQWdCOztJQUNsQyxJQUFJLDJCQUFNLGFBQWE7O0FBRTlCLElBQU0sbUJBQW1CLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRTVDLFdBQVMsRUFBRTtBQUNULE1BQUUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3JDLFNBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3hDLGlCQUFhLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUM5QyxTQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVO0FBQzNELFlBQVEsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQzNDLHVCQUFtQixFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7R0FDckQ7QUFDRCxRQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUM7O0FBRXBELGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsV0FBTyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7R0FDN0I7QUFDRCxvQkFBa0IsRUFBQSw0QkFBQyxTQUFTLEVBQUU7QUFDNUIsUUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQ2pDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDckMsVUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7S0FDMUQ7R0FDRjtBQUNELFFBQU0sRUFBQSxrQkFBRztpQkFDb0MsSUFBSSxDQUFDLEtBQUs7UUFBOUMsU0FBUyxVQUFULFNBQVM7UUFBRSxJQUFJLFVBQUosSUFBSTtRQUFFLFFBQVEsVUFBUixRQUFRO1FBQUUsS0FBSyxVQUFMLEtBQUs7O0FBRXZDLFdBQ0U7O1FBQUssRUFBRSxFQUFDLHFCQUFxQixFQUFDLFNBQVMsRUFBQyxVQUFVO01BRWhEOztVQUFPLE9BQU8sRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLFNBQVM7UUFDakMsZ0NBQVEsR0FBRyxFQUFDLGVBQWUsR0FBRztPQUN4QjtNQUNSOztVQUFPLE9BQU8sRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLFVBQVU7UUFDbEMsZ0NBQVEsR0FBRyxFQUFDLGdCQUFnQixHQUFHO09BQ3pCO01BRVI7O1VBQUssRUFBRSxFQUFDLGVBQWU7UUFDckIsb0JBQUMsY0FBYyxPQUFHO1FBQ2xCLG9CQUFDLFVBQVUsZUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDO0FBQ2pELGtCQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQUFBQztBQUNqQyx3QkFBYyxFQUFFLElBQUksQ0FBQyxlQUFlLEFBQUMsSUFBRztPQUN0QztNQUVOLG9CQUFDLFlBQVksT0FBRztNQUVoQjs7VUFBTSxTQUFTLEVBQUMsV0FBVztRQUN6Qjs7O1VBQ0U7Ozs7V0FBd0I7VUFDeEI7O2NBQVEsS0FBSyxFQUFFLFNBQVMsQUFBQztBQUNqQixzQkFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQUFBQztZQUN4Qzs7Z0JBQVEsS0FBSyxFQUFDLEdBQUc7O2FBQWU7WUFDaEM7O2dCQUFRLEtBQUssRUFBQyxHQUFHOzthQUFjO1lBQy9COztnQkFBUSxLQUFLLEVBQUMsR0FBRzs7YUFBZ0I7WUFDakM7O2dCQUFRLEtBQUssRUFBQyxHQUFHOzthQUFnQjtXQUMxQjtTQUNIO09BQ0g7TUFFUDs7VUFBTSxTQUFTLEVBQUMsVUFBVTtRQUN2QixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQ3RCOzs7VUFDRTs7Y0FBTSxTQUFTLEVBQUMsTUFBTTtZQUVsQixJQUFJLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1dBQ3JCO2dCQUNILElBQUksS0FBSyxHQUFHLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQTtVQUNuQyxLQUFLLEdBQUc7Ozs7V0FBd0IsR0FBRyxJQUFJO1NBQ25DLEdBRVA7OztVQUNFOztjQUFNLFNBQVMsRUFBQyxNQUFNO1lBQ25CLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHO1dBQzFDO1VBQ04sSUFBSSxDQUFDLG1CQUFtQixFQUFFO1NBQ3BCO09BRU47S0FDSCxDQUNOO0dBQ0g7QUFDRCxlQUFhLEVBQUEseUJBQUc7QUFDZCxRQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0dBQ3JDO0FBQ0Qsb0JBQWtCLEVBQUEsNEJBQUMsQ0FBQyxFQUFFO0FBQ3BCLGVBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUM3QztBQUNELGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsUUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtBQUM1QixVQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUMxRTtHQUNGO0FBQ0QscUJBQW1CLEVBQUEsK0JBQUc7QUFDcEIsUUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdDLFFBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqRCxRQUFNLEtBQUssR0FBRyxNQUFNLEtBQUssT0FBTyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUM7O0FBRXJELFdBQU8sSUFBSSxLQUFLLFdBQVcsbUJBQWlCLE1BQU0sY0FDaEQsSUFBSSxLQUFLLFNBQVMsUUFBTSxLQUFLLHdCQUFtQixNQUFNLGNBQ3RELElBQUksS0FBSyxRQUFRLFFBQU0sS0FBSyx1QkFBa0IsTUFBTSxjQUNwRCxJQUFJLEtBQUssTUFBTSxHQUFHLE9BQU8sR0FDekIsSUFBSSxLQUFLLFdBQVcsR0FBRyxtQkFBbUIsR0FDMUMsSUFBSSxLQUFLLHFCQUFxQixHQUFHLDhCQUE4QixHQUMvRCxJQUFJLEtBQUssc0JBQXNCLEdBQUcsOEJBQThCLEdBQUcsRUFBRSxDQUFDO0dBQ3pFO0NBQ0YsQ0FBQyxDQUFDOztpQkFFWSxtQkFBbUI7Ozs7QUNwSGxDLFlBQVksQ0FBQzs7Ozs7Ozs7SUFFTixLQUFLLDJCQUFNLGNBQWM7O0lBQ3pCLFdBQVcsMkJBQU0sd0JBQXdCOztBQUVoRCxJQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQzs7QUFFckQsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRTlCLFdBQVMsRUFBRTtBQUNULE1BQUUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3JDLFVBQU0sRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVO0dBQ3pDO0FBQ0QsUUFBTSxFQUFFLENBQUMsZUFBZSxDQUFDOztBQUV6QixpQkFBZSxFQUFBLDJCQUFHO3VDQUNPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTs7UUFBakMsQ0FBQztRQUFFLElBQUk7UUFBRSxHQUFHOztBQUVuQixXQUFPO0FBQ0wsV0FBSyxFQUFFLElBQUksR0FBRyxFQUFFO0FBQ2hCLFdBQUssRUFBRSxJQUFJLEdBQUcsRUFBRTtBQUNoQixTQUFHLEVBQUUsR0FBRztBQUNSLGVBQVMsRUFBRSxJQUFJO0tBQ2hCLENBQUM7R0FDSDtBQUNELG1CQUFpQixFQUFBLDZCQUFHOzs7QUFDbEIsUUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7O0FBRXpCLE1BQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUEsSUFBSTthQUFJLE1BQUssUUFBUTs7O21DQUNyQyxJQUFJLENBQUMsS0FBSyxFQUFHLElBQUksQ0FBQyxJQUFJOztnREFDWixJQUFJLENBQUMsS0FBSzs7O1dBQ3JCO0tBQUEsQ0FBQyxDQUFDOztBQUVKLE1BQUUsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsVUFBQSxJQUFJLEVBQUk7QUFDbEMsWUFBSyxRQUFRLENBQUMsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUNqQyxpQkFBVyxDQUFDLFFBQVEsQ0FBQztBQUNuQixZQUFJLEVBQUUsU0FBUztBQUNmLGNBQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxLQUFLLE9BQU8sR0FBRyxPQUFPLEdBQUcsT0FBTztPQUNuRCxDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0FBQzlCLFlBQUssUUFBUSxDQUFDO0FBQ1osYUFBSyxFQUFFLE1BQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0FBQ2hDLGFBQUssRUFBRSxNQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtPQUNqQyxDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7R0FDSjtBQUNELFFBQU0sRUFBQSxrQkFBRztBQUNQLFdBQ0U7O1FBQUksRUFBRSxFQUFDLE9BQU87TUFDWixvQkFBQyxLQUFLO0FBQ0osYUFBSyxFQUFDLE9BQU87QUFDYixZQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEFBQUM7QUFDdkIsaUJBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQUFBQyxHQUFHO01BQ3JDLG9CQUFDLEtBQUs7QUFDSixhQUFLLEVBQUMsT0FBTztBQUNiLFlBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBQztBQUN2QixpQkFBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxBQUFDLEdBQUc7S0FDbEMsQ0FDTDtHQUNIO0NBQ0YsQ0FBQyxDQUFDOztBQUVILElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUU5QixRQUFNLEVBQUUsQ0FBQyxlQUFlLENBQUM7O0FBRXpCLFFBQU0sRUFBQSxrQkFBRztpQkFDMEIsSUFBSSxDQUFDLEtBQUs7UUFBcEMsSUFBSSxVQUFKLElBQUk7UUFBRSxLQUFLLFVBQUwsS0FBSztRQUFFLFNBQVMsVUFBVCxTQUFTOztBQUM3QixRQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNsQyxRQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLFFBQU0sUUFBUSxRQUFNLEdBQUcsVUFBSSxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBLEFBQUUsQ0FBQzs7QUFFeEQsV0FDRTs7UUFBSSxTQUFTLEVBQUUsS0FBSyxJQUFJLEtBQUssS0FBSyxTQUFTLEdBQUcsVUFBVSxHQUFHLEVBQUUsQ0FBQSxBQUFDLEFBQUM7TUFDNUQsUUFBUTtLQUNOLENBQ0w7R0FDSDtDQUNGLENBQUMsQ0FBQzs7aUJBRVksS0FBSzs7Ozs7Ozs7O0lDaEZiLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsU0FBUywyQkFBTSxxQkFBcUI7O0lBQ3BDLFdBQVcsMkJBQU0sd0JBQXdCOzs7Ozs7SUFJekMsUUFBUSwyQkFBTSxrQkFBa0I7O0lBQ2hDLElBQUksMkJBQU0sYUFBYTs7SUFDdkIsRUFBRSwyQkFBTSxZQUFZOztBQUUzQixJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDbkMsVUFBUyxFQUFFLEVBRVY7QUFDRCxPQUFNLEVBQUUsRUFBRTtBQUNWLGdCQUFlLEVBQUEsMkJBQUc7O0FBRWpCLE1BQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDM0MsU0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QyxTQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7Ozs7RUFJbEI7QUFDRCxrQkFBaUIsRUFBQSw2QkFBRyxFQUduQjtBQUNELHFCQUFvQixFQUFBLGdDQUFHLEVBRXRCO0FBQ0QsT0FBTSxFQUFBLGtCQUFHO2FBQ00sSUFBSTs7QUFBZCxNQUFDLEtBQUssUUFBTCxLQUFLLENBQVEsSUFBRyxLQUFLLEdBQUksS0FBSyxDQUFkLEtBQUs7O0FBRTFCLFNBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzdCLE1BQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNuQixPQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3ZCLE9BQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNiLFFBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdkIsT0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDcEI7QUFDRCxZQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ3BCO0FBQ0QsU0FFQzs7S0FBTyxTQUFTLEVBQUMsT0FBTztHQUN2QixTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRyxFQUFFLElBQUk7V0FDeEI7OztLQUNFLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLEVBQUUsSUFBSTthQUNuQjs7U0FBSSxRQUFRLFFBQU0sSUFBSSxVQUFLLElBQUksTUFBSTtPQUNsQyxvQkFBQyxJQUFJLElBQUMsR0FBRyxRQUFNLElBQUksVUFBSyxJQUFJLE1BQUk7QUFDL0IsZ0JBQVEsUUFBTSxJQUFJLFVBQUssSUFBSSxNQUFJO0FBQy9CLFlBQUksRUFBRSxLQUFLLE9BQUssSUFBSSxVQUFLLElBQUksT0FBSSxHQUFHLEtBQUssT0FBSyxJQUFJLFVBQUssSUFBSSxPQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUUsSUFBSSxBQUFDO0FBQ3pFLGFBQUssRUFBRSxLQUFLLE9BQUssSUFBSSxVQUFLLElBQUksT0FBSSxHQUFHLEtBQUssT0FBSyxJQUFJLFVBQUssSUFBSSxPQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUUsSUFBSSxBQUFDLEdBQUU7T0FDekU7TUFBQSxDQUNMO0tBQ0c7SUFBQSxDQUNKO0dBQ0ssQ0FDTjtFQUNGOztDQUVELENBQUMsQ0FBQzs7QUFHSCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDOUIsVUFBUyxFQUFFLEVBQ1Y7QUFDRCxnQkFBZSxFQUFFLDJCQUFXO0FBQ3ZCLFNBQU87QUFDTixPQUFJLEVBQUUsT0FBTztBQUNiLGNBQVcsRUFBRSxLQUFLO0dBQ2xCLENBQUM7RUFDSjtBQUNELGtCQUFpQixFQUFBLDZCQUFHOztBQUVwQixTQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBRWxEOztBQUVELG1CQUFrQixFQUFBLDhCQUFHLEVBSXBCO0FBQ0QsT0FBTSxFQUFFLEVBQUU7O0FBRVYsZUFBYyxFQUFBLDBCQUFHO0FBQ2hCLFNBQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7ZUFDekMsSUFBSSxDQUFDLEtBQUs7TUFBbkMsSUFBSSxVQUFKLElBQUk7TUFBRSxRQUFRLFVBQVIsUUFBUTtNQUFFLEtBQUssVUFBTCxLQUFLO01BQ3JCLElBQUksR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFsQixJQUFJOztBQUNYLE1BQUksSUFBSSxFQUFFO0FBQ1QsT0FBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLE9BQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQyxTQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFTLElBQUksRUFBQztBQUNwQyxRQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixRQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7QUFHL0IsUUFBSSxDQUFDLEdBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBRTtBQUMzQixRQUFJLENBQUMsR0FBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFFO0FBQzNCLFVBQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQzFCLFdBQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV2QyxDQUFDLENBQUM7QUFDSCxVQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7QUFHbkIsVUFBTyxDQUFDLEdBQUcsU0FBTyxJQUFJLE9BQUksQ0FBQztBQUMzQixVQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzVCLE9BQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztHQUNiO0VBQ0Q7O0FBRUQsTUFBSyxFQUFBLGlCQUFHO0FBQ1AsTUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxBQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sR0FBSSxNQUFNLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQztFQUMxRTs7QUFFRCxPQUFNLEVBQUEsa0JBQUU7ZUFDYSxJQUFJLENBQUMsS0FBSztNQUF6QixJQUFJLFVBQUosSUFBSTtNQUFFLEtBQUssVUFBTCxLQUFLO01BQ1gsSUFBSSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQWxCLElBQUk7O0FBRVQsTUFBSSxLQUFLLEdBQUc7QUFDWCxPQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFDWixDQUFDO0FBQ0YsT0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNuQixNQUFJLElBQUksRUFBRTtBQUNULFFBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDbkIsUUFBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztHQUNwQjs7QUFFRCxTQUNDOzs7R0FDQyw2QkFBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxBQUFDO0FBQ3pCLFdBQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxBQUFDLEdBQ3hCO0dBQ0QsQ0FDTDtFQUNGOztDQUVELENBQUMsQ0FBQzs7aUJBRVksRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUM7OztBQ2hKN0MsWUFBWSxDQUFDOzs7O0lBRU4sS0FBSywyQkFBTSxjQUFjOztJQUN6QixLQUFLLDJCQUFNLFNBQVM7O0lBQ3BCLFNBQVMsMkJBQU0scUJBQXFCOztJQUNwQyxXQUFXLDJCQUFNLHdCQUF3Qjs7SUFDekMsSUFBSSwyQkFBTSxhQUFhOztBQUU5QixJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFbkMsV0FBUyxFQUFFO0FBQ1QsTUFBRSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDckMsVUFBTSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVU7QUFDeEMsU0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVTtBQUMzRCxhQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUMxQyxZQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUN6Qyx1QkFBbUIsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0dBQ3JEO0FBQ0QsUUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7O0FBRXRDLGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsV0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0dBQy9DO0FBQ0QsbUJBQWlCLEVBQUEsNkJBQUc7QUFDbEIsYUFBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQzVDO0FBQ0Qsc0JBQW9CLEVBQUEsZ0NBQUc7QUFDckIsYUFBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQzdDO0FBQ0QsUUFBTSxFQUFBLGtCQUFHO2lCQUM2QyxJQUFJLENBQUMsS0FBSztRQUF2RCxFQUFFLFVBQUYsRUFBRTtRQUFFLE1BQU0sVUFBTixNQUFNO1FBQUUsUUFBUSxVQUFSLFFBQVE7UUFBRSxtQkFBbUIsVUFBbkIsbUJBQW1COztBQUNoRCxRQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7QUFFM0MsV0FDRTs7UUFBUSxTQUFTLEVBQUMsVUFBVTtNQUUxQixvQkFBQyxLQUFLO0FBQ0osVUFBRSxFQUFFLEVBQUUsQUFBQztBQUNQLGNBQU0sRUFBRSxNQUFNLEFBQUMsR0FBRztNQUVwQjs7VUFBTSxFQUFFLEVBQUMsV0FBVzthQUNkLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO09BQ3JCO01BRVA7O1VBQUcsU0FBUyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsR0FBRzs7T0FBYTtNQUV2QyxDQUFDLFFBQVEsSUFBSSxtQkFBbUIsR0FDL0I7O1VBQUcsU0FBUyxFQUFDLHFCQUFxQjtBQUM5QixpQkFBTyxFQUFFLElBQUksQ0FBQyxTQUFTLEFBQUM7O09BRXhCLEdBQ0wsUUFBUSxHQUNQOztVQUFHLFNBQVMsRUFBQyxzQkFBc0I7QUFDaEMsaUJBQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxBQUFDOztPQUV4QixHQUNMLElBQUk7TUFFTDs7VUFBRyxFQUFFLEVBQUMsV0FBVztBQUNkLGlCQUFPLEVBQUUsV0FBVyxDQUFDLGdCQUFnQixBQUFDO1FBQ3RDLFdBQVcsR0FDVjs7WUFBTSxFQUFFLEVBQUMsY0FBYztVQUNwQixXQUFXLEdBQUcsQ0FBQyxHQUFHLFdBQVcsR0FBRyxJQUFJO1NBQ2hDLEdBQ1IsSUFBSTtRQUNMLDZCQUFLLEdBQUcsRUFBQyxlQUFlO0FBQ25CLGVBQUssRUFBQyxJQUFJO0FBQ1YsZ0JBQU0sRUFBQyxJQUFJLEdBQUc7O09BRWpCO0tBQ0csQ0FDVDtHQUNIO0FBQ0QsZUFBYSxFQUFBLHlCQUFHO0FBQ2QsUUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7R0FDdkQ7QUFDRCxXQUFTLEVBQUEscUJBQUc7aUJBQ2tCLElBQUksQ0FBQyxLQUFLO1FBQS9CLEVBQUUsVUFBRixFQUFFO1FBQUUsTUFBTSxVQUFOLE1BQU07UUFBRSxLQUFLLFVBQUwsS0FBSzs7QUFFeEIsTUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDaEIsV0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDaEIsV0FBSyxFQUFFLEtBQUs7S0FDYixDQUFDLENBQUM7R0FDSjtBQUNELFlBQVUsRUFBQSxzQkFBRztpQkFDMEMsSUFBSSxDQUFDLEtBQUs7UUFBeEQsRUFBRSxVQUFGLEVBQUU7UUFBRSxNQUFNLFVBQU4sTUFBTTtRQUFFLFNBQVMsVUFBVCxTQUFTO1FBQUUsbUJBQW1CLFVBQW5CLG1CQUFtQjs7QUFFakQsUUFBSSxDQUFDLG1CQUFtQixFQUFFO0FBQ3hCLGVBQVMsQ0FBQyxNQUFNLEVBQUUsOENBQThDLEdBQzlELHNCQUFzQixDQUFDLENBQUM7QUFDMUIsYUFBTztLQUNSOztBQUVELE1BQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQ3ZCLFdBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ2pCLENBQUMsQ0FBQztBQUNILGFBQVMsQ0FBQyxNQUFNLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztHQUNoRDtDQUNGLENBQUMsQ0FBQzs7aUJBRVksVUFBVTs7O0FDcEd6QixZQUFZLENBQUM7Ozs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsVUFBVSwyQkFBTSxjQUFjOztJQUM5QixJQUFJLDJCQUFNLFFBQVE7O0lBQ2xCLEtBQUssMkJBQU0sU0FBUzs7SUFDcEIsV0FBVywyQkFBTSx3QkFBd0I7O0lBQ3pDLFNBQVMsMkJBQU0scUJBQXFCOztJQUNwQyxtQkFBbUIsMkJBQU0sdUJBQXVCOztJQUNoRCxrQkFBa0IsMkJBQU0sc0JBQXNCOztJQUM3QyxHQUFHLFdBQU8sV0FBVyxFQUFyQixHQUFHOztJQUNILEtBQUssV0FBTyxhQUFhLEVBQXpCLEtBQUs7O0FBRWIsSUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRXRDLFdBQVMsRUFBRTtBQUNULE1BQUUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3JDLFVBQU0sRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVO0dBQ3pDOztBQUVELGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsV0FBTztBQUNMLHlCQUFtQixFQUFFLEtBQUs7QUFDMUIsV0FBSyxFQUFFLE9BQU87QUFDZCxXQUFLLEVBQUUsR0FBRyxDQUFDO0FBQ1QsWUFBSSxFQUFFLEtBQUs7QUFDWCxlQUFPLEVBQUUsRUFBRTtBQUNYLFlBQUksRUFBRSxNQUFNO0FBQ1osaUJBQVMsRUFBRTtBQUNULGNBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtBQUNyQixnQkFBTSxFQUFFLElBQUksQ0FBQyxjQUFjO0FBQzNCLGlCQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWU7U0FDOUI7T0FDRixDQUFDO0FBQ0YsbUJBQWEsRUFBRSxLQUFLO0FBQ3BCLGNBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUTtLQUN4QyxDQUFDO0dBQ0g7QUFDRCxtQkFBaUIsRUFBQSw2QkFBRzs7O2lCQUNHLElBQUksQ0FBQyxLQUFLO1FBQXhCLEVBQUUsVUFBRixFQUFFO1FBQUUsTUFBTSxVQUFOLE1BQU07O0FBRWpCLE1BQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFO2FBQU0sTUFBSyxRQUFRLENBQUM7QUFDekMsYUFBSyxFQUFFLE1BQUssS0FBSyxDQUFDLEtBQUssQ0FDcEIsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FDakIsR0FBRyxDQUFDLFNBQVMsRUFBRSxzQ0FBc0MsQ0FBQyxDQUN0RCxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztPQUN2QixDQUFDO0tBQUEsQ0FBQyxDQUFDOztBQUVKLE1BQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2QsV0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDaEIsVUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0FBQ3BCLFNBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ2YsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUEsSUFBSSxFQUFJO0FBQ3RCLFVBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxPQUFPLEVBQUU7QUFDMUIsY0FBSyxRQUFRLENBQUMsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztPQUNqQztLQUNGLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRTthQUNuQixNQUFLLFFBQVEsQ0FBQyxFQUFDLG1CQUFtQixFQUFFLElBQUksRUFBQyxFQUFFLFlBQU07QUFDL0MsWUFBSSxNQUFLLEtBQUssQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO0FBQ2hDLFlBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQ25CLGlCQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNoQixpQkFBSyxFQUFFLE9BQU87V0FDZixDQUFDLENBQUM7U0FDSjtPQUNGLENBQUM7S0FBQSxDQUFDLENBQUM7O0FBRU4sTUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBTTtBQUNsQixZQUFNLENBQUMsS0FBSyxDQUNWLGtFQUFrRSxDQUFDLENBQUM7QUFDdEUsWUFBTSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7S0FDdkIsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsVUFBQSxJQUFJLEVBQUk7QUFDL0IsaUJBQVcsQ0FBQyxRQUFRLENBQUM7QUFDbkIsWUFBSSxFQUFFLFFBQVE7QUFDZCxjQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxPQUFPLEdBQUcsT0FBTyxHQUFHLE9BQU87T0FDbkQsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUU7YUFDdkIsTUFBSyxVQUFVLENBQUMsT0FBTyxFQUFFLDZDQUE2QyxDQUFDO0tBQUEsQ0FBQyxDQUFDOztBQUUzRSxNQUFFLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFO2FBQ3hCLE1BQUssVUFBVSxDQUFDLE1BQU0sRUFBRSxrQ0FBa0MsQ0FBQztLQUFBLENBQUMsQ0FBQzs7QUFFL0QsTUFBRSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0FBQzlCLGlCQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDdEIsWUFBSyxRQUFRLENBQUM7QUFDWixhQUFLLEVBQUUsTUFBSyxLQUFLLENBQUMsS0FBSyxLQUFLLE9BQU8sR0FBRyxPQUFPLEdBQUcsT0FBTztBQUN2RCxhQUFLLEVBQUUsTUFBSyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO09BQzNDLEVBQUUsWUFBTTtBQUNQLFlBQUksTUFBSyxLQUFLLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtBQUNoQyxZQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNuQixpQkFBSyxFQUFFLE1BQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDM0IsaUJBQUssRUFBRSxPQUFPO1dBQ2YsQ0FBQyxDQUFDO1NBQ0o7T0FDRixDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxZQUFPO0FBQ3BDLFVBQUksQ0FBQyxNQUFLLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ3RDLGNBQUssVUFBVSxDQUFDLE1BQU0sRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO09BQzVEOztBQUVELFlBQUssUUFBUSxDQUFDLEVBQUMsbUJBQW1CLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztLQUM3QyxDQUFDLENBQUM7O0FBRUgsYUFBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQzVDO0FBQ0Qsc0JBQW9CLEVBQUEsZ0NBQUc7QUFDckIsYUFBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQzdDOztBQUtELFFBQU0sRUFBQSxrQkFBRztpQkFDYyxJQUFJLENBQUMsS0FBSztRQUF4QixFQUFFLFVBQUYsRUFBRTtRQUFFLE1BQU0sVUFBTixNQUFNO2lCQUM2QyxJQUFJLENBQUMsS0FBSztRQUFqRSxLQUFLLFVBQUwsS0FBSztRQUFFLGFBQWEsVUFBYixhQUFhO1FBQUUsUUFBUSxVQUFSLFFBQVE7UUFBRSxtQkFBbUIsVUFBbkIsbUJBQW1COztBQUMxRCxRQUFNLFdBQVcsR0FBRztBQUNsQixRQUFFLEVBQUUsRUFBRTtBQUNOLFdBQUssRUFBRSxLQUFLO0FBQ1osZUFBUyxFQUFFLElBQUksQ0FBQyxVQUFVO0FBQzFCLHlCQUFtQixFQUFFLG1CQUFtQjtLQUN6QyxDQUFDOztBQUVGLFdBQ0U7OztNQUNFLG9CQUFDLFVBQVUsZUFDTCxXQUFXO0FBQ2YsY0FBTSxFQUFFLE1BQU0sQUFBQztBQUNmLGdCQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQUFBQyxJQUFHO01BRXRDLG9CQUFDLElBQUksZUFDQyxXQUFXO0FBQ2YsYUFBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQUFBQztBQUNqQixxQkFBYSxFQUFFLGFBQWEsQUFBQyxJQUFHO01BY2hDLG9CQUFDLGtCQUFrQixPQUFHO01BS3hCLG9CQUFDLEtBQUssSUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEFBQUMsR0FBRztLQUM3QixDQUNOO0dBQ0g7O0FBS0QsZUFBYSxFQUFBLHlCQUFHO0FBQ2QsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztHQUMxRDtBQUNELFlBQVUsRUFBQSxvQkFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3hCLFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixXQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQ3BCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQ2pCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQ3ZCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO0tBQ3JCLENBQUMsQ0FBQztHQUNKO0FBQ0QsWUFBVSxFQUFBLHNCQUFHO0FBQ1gsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQztHQUM3RDtBQUNELGdCQUFjLEVBQUEsMEJBQUc7aUJBQ00sSUFBSSxDQUFDLEtBQUs7UUFBeEIsRUFBRSxVQUFGLEVBQUU7UUFBRSxNQUFNLFVBQU4sTUFBTTs7QUFFakIsTUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtBQUN4QixXQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNoQixVQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7QUFDcEIsU0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDZixDQUFDLENBQUM7QUFDSCxRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDbkI7QUFDRCxpQkFBZSxFQUFBLDJCQUFHO2lCQUNLLElBQUksQ0FBQyxLQUFLO1FBQXhCLEVBQUUsVUFBRixFQUFFO1FBQUUsTUFBTSxVQUFOLE1BQU07O0FBRWpCLE1BQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7QUFDekIsV0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDakIsQ0FBQyxDQUFDO0FBQ0gsUUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0dBQ25CO0FBQ0QsZUFBYSxFQUFBLHVCQUFDLENBQUMsRUFBRTtBQUNmLFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixtQkFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhO0tBQ3pDLENBQUMsQ0FBQztHQUNKLEVBQ0YsQ0FBQyxDQUFDOztpQkFFWSxhQUFhOzs7Ozs7Ozs7Ozs7QUMvTTVCLFlBQVksQ0FBQzs7OztJQUVOLEtBQUssMkJBQU0sY0FBYzs7SUFDekIsU0FBUywyQkFBTSxxQkFBcUI7O0lBQ3BDLFdBQVcsMkJBQU0sd0JBQXdCOztJQUN6QyxZQUFZLDJCQUFNLHdCQUF3Qjs7SUFDMUMsVUFBVSwyQkFBTSxjQUFjOztJQUM3QixLQUFLLFdBQU8sYUFBYSxFQUF6QixLQUFLOztJQUNOLGNBQWMsMkJBQU0sa0JBQWtCOztJQUN0QyxZQUFZLDJCQUFNLGdCQUFnQjs7SUFDbEMsSUFBSSwyQkFBTSxhQUFhOzs7O0FBSTlCLElBQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRTVDLFVBQVMsRUFBRSxFQUVWO0FBQ0QsT0FBTSxFQUFFLEVBQUU7QUFDVixnQkFBZSxFQUFBLDJCQUFHO0FBQ2pCLFNBQU8sU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0VBQzVCO0FBQ0QsZ0JBQWUsRUFBQSwyQkFBRyxFQUVqQjtBQUNELG1CQUFrQixFQUFBLDRCQUFDLFNBQVMsRUFBRSxFQUU3QjtBQUNELE9BQU0sRUFBQSxrQkFBRztlQUNtQyxJQUFJLENBQUMsS0FBSztNQUE5QyxTQUFTLFVBQVQsU0FBUztNQUFFLElBQUksVUFBSixJQUFJO01BQUUsUUFBUSxVQUFSLFFBQVE7TUFBRSxLQUFLLFVBQUwsS0FBSzs7QUFDdkMsU0FDQzs7S0FBSyxFQUFFLEVBQUMscUJBQXFCLEVBQUMsU0FBUyxFQUFDLFVBQVU7R0FDakQ7O01BQUssRUFBRSxFQUFDLGVBQWU7SUFFdEIsb0JBQUMsY0FBYyxPQUFHO0lBRWxCLG9CQUFDLEtBQUssT0FBRztJQUVKO0dBRU47O01BQU0sU0FBUyxFQUFDLFVBQVU7SUFDeEIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUN2Qjs7O1dBQ0ssSUFBSSxLQUFHLEdBQUcsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFBO0tBQzVCLEdBQ1A7OztLQUNDOztRQUFNLFNBQVMsRUFBQyxNQUFNO01BQ25CLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHO01BQzFDO0tBQ04sSUFBSSxDQUFDLG1CQUFtQixFQUFFO0tBQ25CO0lBRUo7R0FHRixDQUNOO0VBQ0Q7O0FBRUQsY0FBYSxFQUFBLHlCQUFHO0FBQ2YsTUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztFQUNwQzs7QUFFRCxvQkFBbUIsRUFBQSwrQkFBRztBQUNyQixvQkFBa0I7RUFDbEI7O0NBRUQsQ0FBQyxDQUFDOztpQkFFWSxrQkFBa0I7OztBQ3RFakMsWUFBWSxDQUFDOzs7O0lBRU4sS0FBSywyQkFBTSxjQUFjOztJQUN6QixFQUFFLDJCQUFNLFlBQVk7O0FBRTNCLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUU5QixXQUFTLEVBQUU7QUFDVCxRQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtHQUN4QztBQUNELFFBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDOztBQUV0QyxvQkFBa0IsRUFBQSw4QkFBRztBQUNuQixRQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTNDLFFBQUksTUFBTSxFQUNSLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBRXRELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0dBQzVEO0FBQ0QsUUFBTSxFQUFBLGtCQUFHO0FBQ1AsUUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDN0IsUUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QixRQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUV4QyxXQUNFOztRQUFLLFNBQVMsRUFBRSxFQUFFLENBQUM7QUFDWixzQkFBWSxFQUFFLElBQUk7QUFDbEIsa0JBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztTQUM1QixDQUFDLEFBQUM7QUFDSCxlQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQUFBQztNQUM1Qjs7O1FBQ0U7Ozs7U0FBc0I7UUFDdEI7OztVQUFPLElBQUksS0FBSyxNQUFNLEdBQUcsSUFBSSxHQUFHLFNBQVM7U0FBUTtRQUNqRCwrQkFBTTtRQUNOOzs7O1NBQXdCO1FBQ3hCOzs7VUFBTyxJQUFJLEtBQUssTUFBTSxHQUFHLElBQUksR0FBRyxRQUFRO1NBQVE7T0FDOUM7TUFFSjs7VUFBSyxTQUFTLEVBQUMsT0FBTztBQUNqQixpQkFBTyxFQUFFLFVBQUEsQ0FBQzttQkFBSSxDQUFDLENBQUMsZUFBZSxFQUFFO1dBQUEsQUFBQztRQUNyQzs7O1VBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7U0FBSztRQUUzQixJQUFJLEtBQUssTUFBTSxHQUNkOztZQUFHLFNBQVMsRUFBQyxRQUFRO0FBQ2xCLG1CQUFPLEVBQUUsU0FBUyxDQUFDLElBQUksQUFBQzs7U0FFdkIsR0FBRyxDQUVQOztZQUFHLEdBQUcsRUFBQyxHQUFHO0FBQ1AscUJBQVMsRUFBQyxLQUFLO0FBQ2YsaUJBQUssRUFBRSxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQUFBQztBQUNyQixtQkFBTyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEFBQUM7O1NBRXpCLEVBQ0o7O1lBQUcsR0FBRyxFQUFDLEdBQUc7QUFDUCxxQkFBUyxFQUFDLGNBQWM7QUFDeEIsaUJBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsQUFBQztBQUN0QixtQkFBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPLEFBQUM7O1NBRTFCLENBQ0w7T0FDRztLQUNGLENBQ047R0FDSDtBQUNELFlBQVUsRUFBQSxvQkFBQyxDQUFDLEVBQUU7QUFDWixRQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekMsUUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVuRCxRQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7QUFDbkIsVUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRTtBQUNwQyxpQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDO09BQ2xCO0tBQ0YsTUFBTSxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7QUFDM0IsVUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRTtBQUNsQixpQkFBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO09BQ3BCLE1BQU0sSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRTtBQUN6QixpQkFBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO09BQ3JCO0tBQ0Y7R0FDRjtBQUNELFlBQVUsRUFBQSxzQkFBRztBQUNYLFFBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUN6QztDQUNGLENBQUMsQ0FBQzs7aUJBRVksS0FBSzs7O0FDdkZwQixZQUFZLENBQUM7Ozs7SUFFTixLQUFLLDJCQUFNLGNBQWM7O0lBQ3pCLFNBQVMsMkJBQU0scUJBQXFCOztJQUNwQyxZQUFZLDJCQUFNLHdCQUF3Qjs7QUFFakQsSUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRXJDLFFBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQzs7QUFFcEQsaUJBQWUsRUFBQSwyQkFBRztBQUNoQixXQUFPO0FBQ0wsV0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUU7S0FDNUIsQ0FBQztHQUNIO0FBQ0QsUUFBTSxFQUFBLGtCQUFHO0FBQ1AsV0FDRTs7UUFBTyxFQUFFLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxVQUFVO01BQ3BDOzs7UUFDRTs7O1VBQ0U7Ozs7V0FBdUI7U0FDcEI7T0FDQztNQUNSOzs7UUFDRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQztpQkFDM0I7O2NBQUksR0FBRyxFQUFFLENBQUMsQUFBQztZQUNUOzs7Y0FDRTs7O3NCQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7ZUFBYTthQUMzQjtZQUNKLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLEVBQUUsQ0FBQztxQkFDZjs7a0JBQUksR0FBRyxFQUFFLENBQUMsQUFBQztnQkFDVDs7O2tCQUFPLElBQUk7aUJBQVE7ZUFDaEI7YUFDTixDQUFDLENBQUMsT0FBTyxFQUFFO1dBQ1Q7U0FDTixDQUFDLENBQUMsT0FBTyxFQUFFO09BQ047S0FDRixDQUNSO0dBQ0g7QUFDRCxlQUFhLEVBQUEseUJBQUc7QUFDZCxRQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osV0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUU7S0FDNUIsQ0FBQyxDQUFDO0dBQ0o7Q0FDRixDQUFDLENBQUM7O2lCQUVZLFlBQVk7Ozs7Ozs7SUMvQ3BCLFNBQVMsMkJBQU0scUJBQXFCOztpQkFFNUIsU0FBUyxDQUFDO0FBQ3ZCLG1CQUFpQixFQUFFLElBQUk7QUFDdkIsZ0JBQWMsRUFBRSxJQUFJO0NBQ3JCLENBQUM7Ozs7O0FDTEYsSUFBTSxXQUFXLEdBQUc7OztBQUdsQixLQUFLLEdBQUc7QUFDUixLQUFLLEdBQUc7QUFDUixLQUFLLEdBQUc7QUFDUixLQUFLLEdBQUc7QUFDUixLQUFLLEdBQUc7QUFDUixLQUFLLEdBQUc7O0FBRVIsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHO0FBQ1IsS0FBSyxHQUFHOztBQUVSLEtBQUcsRUFBRSxTQUFTO0NBQ2YsQ0FBQzs7aUJBRWEsV0FBVzs7Ozs7OztJQ3BCbkIsU0FBUywyQkFBTSxxQkFBcUI7O2lCQUU1QixTQUFTLENBQUM7QUFDdkIsV0FBUyxFQUFFLElBQUk7QUFDZixTQUFPLEVBQUUsSUFBSTtBQUNiLE1BQUksRUFBRSxJQUFJO0FBQ1YsV0FBUyxFQUFFLElBQUk7QUFDZixrQkFBZ0IsRUFBRSxJQUFJO0NBQ3ZCLENBQUM7Ozs7O0lDUk0sVUFBVSxXQUFPLE1BQU0sRUFBdkIsVUFBVTs7aUJBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFVBQVUsRUFBRSxFQUFFOztBQUU3QyxrQkFBZ0IsRUFBRSwwQkFBUyxNQUFNLEVBQUU7QUFDakMsUUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLFlBQU0sRUFBRSxhQUFhO0FBQ3JCLFlBQU0sRUFBRSxNQUFNO0tBQ2YsQ0FBQyxDQUFDO0dBQ0o7Q0FDRixDQUFDOzs7OztBQ1ZGLElBQU0sV0FBVyxHQUFHO0FBQ2hCLFlBQVEsRUFBRTtBQUNOLGFBQUssRUFBRTtBQUNILG9CQUFRLEVBQUUsWUFBWTtBQUN0QixvQkFBUSxFQUFFLFlBQVk7QUFDdEIsbUJBQU8sRUFBRSxZQUFZO1NBQ3hCO0FBQ0QsWUFBSSxFQUFFO0FBQ0YscUJBQVMsRUFBRSxZQUFZO0FBQ3ZCLG9CQUFRLEVBQUUsWUFBWTtBQUN0QixtQkFBTyxFQUFFLFlBQVk7U0FDeEI7S0FDSjtBQUNELFVBQU0sRUFBRTtBQUNKLGFBQUssRUFBRTtBQUNILG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtBQUNELFlBQUksRUFBRTtBQUNGLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLHNCQUFVLEVBQUUsUUFBUTtBQUNwQixxQkFBUyxFQUFFLFFBQVE7QUFDbkIscUJBQVMsRUFBRSxRQUFRO1NBQ3RCO0tBQ0o7QUFDRCxZQUFRLEVBQUU7QUFDTixhQUFLLEVBQUU7QUFDSCxvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07U0FDbkI7QUFDRCxZQUFJLEVBQUU7QUFDSCxvQkFBUSxFQUFFLFFBQVE7QUFDakIsbUJBQU8sRUFBRSxRQUFRO0FBQ2pCLG1CQUFPLEVBQUUsUUFBUTtBQUNqQixvQkFBUSxFQUFFLFFBQVE7QUFDbEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG9CQUFRLEVBQUUsTUFBTTtTQUNuQjtLQUNKO0FBQ0QsV0FBTyxFQUFFO0FBQ0wsYUFBSyxFQUFFO0FBQ0gsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLHFCQUFTLEVBQUUsUUFBUTtBQUNuQixvQkFBUSxFQUFFLFFBQVE7QUFDbEIsb0JBQVEsRUFBRSxRQUFRO1NBQ3JCO0FBQ0QsWUFBSSxFQUFFO0FBQ0Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLHFCQUFTLEVBQUUsT0FBTztBQUNsQixvQkFBUSxFQUFFLE9BQU87U0FDcEI7S0FDSjtBQUNELFdBQU8sRUFBRTtBQUNMLGFBQUssRUFBRTtBQUNILG1CQUFPLEVBQUUsTUFBTTtBQUNmLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07U0FDbEI7QUFDRCxZQUFJLEVBQUU7QUFDSCxtQkFBTyxFQUFFLE1BQU07QUFDZCxvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO1NBQ2xCO0tBQ0o7QUFDRCxRQUFJLEVBQUU7QUFDRixhQUFLLEVBQUU7QUFDSCxvQkFBUSxFQUFFLE9BQU87QUFDakIsbUJBQU8sRUFBRSxPQUFPO1NBQ25CO0FBQ0QsWUFBSSxFQUFFO0FBQ0Ysb0JBQVEsRUFBRSxPQUFPO0FBQ2pCLG1CQUFPLEVBQUUsT0FBTztTQUNuQjtLQUNKO0FBQ0QsV0FBTyxFQUFFO0FBQ0wsYUFBSyxFQUFFO0FBQ0gsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG9CQUFRLEVBQUUsTUFBTTtTQUNuQjtBQUNELFlBQUksRUFBRTtBQUNGLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtTQUNuQjtLQUNKO0FBQ0QsVUFBTSxFQUFFO0FBQ0osYUFBSyxFQUFFO0FBQ0gscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YsbUJBQU8sRUFBRSxNQUFNO0FBQ2YsbUJBQU8sRUFBRSxNQUFNO1NBQ2xCO0FBQ0QsWUFBSSxFQUFFO0FBQ0Ysb0JBQVEsRUFBRSxPQUFPO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO1NBQ2xCO0tBQ0o7QUFDRCxjQUFVLEVBQUU7QUFDUixhQUFLLEVBQUU7QUFDSCxvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO1NBQ25CO0FBQ0QsWUFBSSxFQUFFO0FBQ0gsb0JBQVEsRUFBRSxRQUFRO0FBQ2xCLG9CQUFRLEVBQUUsUUFBUTtBQUNsQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNLEVBQ2pCO0tBQ0o7QUFDRCxZQUFRLEVBQUU7QUFDTixhQUFLLEVBQUU7QUFDSCxvQkFBUSxFQUFFLE9BQU87QUFDakIsbUJBQU8sRUFBRSxPQUFPO0FBQ2hCLHFCQUFTLEVBQUUsTUFBTTtBQUNqQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO1NBQ2xCO0FBQ0QsWUFBSSxFQUFFO0FBQ0YscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO1NBQ2xCO0tBQ0o7QUFDRCxVQUFNLEVBQUU7QUFDSixhQUFLLEVBQUU7QUFDSCxxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07U0FDbEI7QUFDRCxZQUFJLEVBQUUsRUFBRTtLQUNYO0FBQ0QsV0FBTyxFQUFFO0FBQ0wsYUFBSyxFQUFFO0FBQ0gscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLHFCQUFTLEVBQUUsTUFBTTtBQUNqQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO1NBQ25CO0FBQ0QsWUFBSSxFQUFFO0FBQ0YscUJBQVMsRUFBRSxRQUFRO0FBQ25CLG9CQUFRLEVBQUUsUUFBUTtBQUNsQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YsbUJBQU8sRUFBRSxNQUFNO1NBQ2xCO0tBQ0o7QUFDRCxVQUFNLEVBQUU7QUFDSixhQUFLLEVBQUU7QUFDSCxxQkFBUyxFQUFFLE9BQU87QUFDbEIsb0JBQVEsRUFBRSxPQUFPO0FBQ2pCLG9CQUFRLEVBQUUsT0FBTztBQUNqQixtQkFBTyxFQUFFLE9BQU87U0FDbkI7QUFDRCxZQUFJLEVBQUU7QUFDSCxxQkFBUyxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07U0FDbEI7S0FDSjtBQUNELFVBQU0sRUFBRTtBQUNKLGFBQUssRUFBRTtBQUNILG9CQUFRLEVBQUUsT0FBTztBQUNqQixtQkFBTyxFQUFFLE9BQU87QUFDaEIscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO1NBQ25CO0FBQ0QsWUFBSSxFQUFFO0FBQ0gscUJBQVMsRUFBRSxPQUFPO0FBQ2pCLG9CQUFRLEVBQUUsT0FBTztBQUNqQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNLEVBQ2xCO0tBQ0o7QUFDRCxRQUFJLEVBQUU7QUFDRixhQUFLLEVBQUU7QUFDSCxvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2YsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLHFCQUFTLEVBQUUsTUFBTTtBQUNqQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtTQUNsQjtBQUNELFlBQUksRUFBRTtBQUNGLHFCQUFTLEVBQUUsTUFBTTtBQUNqQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNOztTQUVsQjtLQUNKO0FBQ0QsVUFBTSxFQUFFO0FBQ0osYUFBSyxFQUFFO0FBQ0gscUJBQVMsRUFBRSxNQUFNO0FBQ2pCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixtQkFBTyxFQUFFLE1BQU07QUFDZixtQkFBTyxFQUFFLE1BQU0sRUFDbEI7QUFDRCxZQUFJLEVBQUU7QUFDRixxQkFBUyxFQUFFLE1BQU07QUFDakIsb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG9CQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBUSxFQUFFLE1BQU07QUFDaEIsbUJBQU8sRUFBRSxNQUFNO0FBQ2Ysb0JBQVEsRUFBRSxNQUFNO0FBQ2hCLG1CQUFPLEVBQUUsTUFBTTtBQUNmLG1CQUFPLEVBQUUsTUFBTSxFQUNsQjtLQUNKLEVBQ0osQ0FBQTs7aUJBRWMsV0FBVzs7O0FDdlExQixZQUFZLENBQUM7Ozs7SUFFTixFQUFFLDJCQUFNLGtCQUFrQjs7QUFDakMsSUFBTSxNQUFNLEdBQUcsdUJBQXVCLENBQUM7QUFDdkMsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDOztpQkFFSCxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzs7Ozs7QUNON0IsSUFBTSxZQUFZLEdBQUc7QUFDbkIsZUFBYSxFQUFBLHVCQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUU7QUFDN0IsV0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssTUFBTSxLQUFLLElBQUksT0FBTyxDQUFBLEFBQUMsR0FDNUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQztHQUNqQztDQUNGLENBQUM7O2lCQUVhLFlBQVk7Ozs7Ozs7SUNQcEIsU0FBUywyQkFBTSxxQkFBcUI7O0FBRTNDLElBQU0sWUFBWSxHQUFHO0FBQ25CLG1CQUFpQixFQUFBLDZCQUFHO0FBQ2xCLGFBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztHQUM1QztBQUNELHNCQUFvQixFQUFBLGdDQUFHO0FBQ3JCLGFBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztHQUM3QztDQUNGLENBQUM7O2lCQUVhLFlBQVk7OztBQ1gzQixZQUFZLENBQUM7Ozs7SUFFTixhQUFhLDJCQUFNLDZCQUE2Qjs7SUFDOUIsWUFBWSxXQUFPLGVBQWUsRUFBbkQsYUFBYTs7SUFDZCxhQUFhLDJCQUFNLDRCQUE0Qjs7eUJBQzlCLFdBQVc7O0lBQTNCLElBQUksY0FBSixJQUFJO0lBQUUsR0FBRyxjQUFILEdBQUc7O0FBRWpCLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQzs7QUFFOUIsSUFBSSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDdkIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQzs7QUFFekIsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLFNBQVMsRUFBRTtBQUMxRCxVQUFRLEVBQUEsb0JBQUc7QUFDVCxXQUFPO0FBQ0wsY0FBUSxFQUFFLFNBQVM7QUFDbkIsaUJBQVcsRUFBRSxZQUFZO0FBQ3pCLGtCQUFZLEVBQUUsYUFBYTtLQUM1QixDQUFDO0dBQ0g7Q0FDRixDQUFDLENBQUM7O0FBRUgsU0FBUyxnQkFBZ0IsR0FBRztBQUMxQixlQUFhLEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFDL0IsY0FBWSxHQUFHLENBQUMsQ0FBQztDQUNsQjs7QUFFRCxTQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTtBQUNuRCxXQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDN0IsV0FBTyxFQUFFLE9BQU87QUFDaEIsYUFBUyxFQUFFLFNBQVM7R0FDckIsQ0FBQyxDQUFDLENBQUM7O0FBRUosTUFBSSxRQUFRLElBQUksYUFBYSxFQUFFO0FBQzdCLGdCQUFZLElBQUksQ0FBQyxDQUFDO0dBQ25CO0NBQ0Y7O0FBRUQsYUFBYSxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sRUFBSTtBQUNoQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDOztBQUU5QixVQUFRLE1BQU0sQ0FBQyxVQUFVO0FBQ3ZCLFNBQUssYUFBYSxDQUFDLGlCQUFpQjtBQUNsQyxzQkFBZ0IsRUFBRSxDQUFDO0FBQ25CLFlBQU07O0FBQUEsQUFFUixTQUFLLGFBQWEsQ0FBQyxjQUFjO0FBQy9CLG1CQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqRSxZQUFNOztBQUFBLEFBRVI7QUFDRSxhQUFPLElBQUksQ0FBQztBQUFBLEdBQ2Y7O0FBRUQsV0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUM3QixTQUFPLElBQUksQ0FBQztDQUNiLENBQUMsQ0FBQzs7aUJBRVksU0FBUzs7O0FDM0R4QixZQUFZLENBQUM7Ozs7SUFFTixhQUFhLDJCQUFNLDZCQUE2Qjs7SUFDOUIsWUFBWSxXQUFPLGVBQWUsRUFBbkQsYUFBYTs7SUFDZCxhQUFhLDJCQUFNLDRCQUE0Qjs7SUFDL0MsV0FBVywyQkFBTSwwQkFBMEI7O0lBQzFDLEtBQUssV0FBTyxVQUFVLEVBQXRCLEtBQUs7O3lCQUM0QixXQUFXOztJQUE1QyxJQUFJLGNBQUosSUFBSTtJQUFFLEdBQUcsY0FBSCxHQUFHO0lBQUUsVUFBVSxjQUFWLFVBQVU7SUFBRSxHQUFHLGNBQUgsR0FBRzs7OztBQUdsQyxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUM7QUFDOUIsSUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDOztBQUU5QixJQUFJLFNBQVMsQ0FBQztBQUNkLElBQUksZUFBZSxDQUFDO0FBQ3BCLElBQUksTUFBTSxDQUFDO0FBQ1gsSUFBSSxVQUFVLENBQUM7QUFDZixJQUFJLEtBQUssQ0FBQztBQUNWLElBQUksTUFBTSxDQUFDO0FBQ1gsSUFBSSxTQUFTLENBQUM7QUFDZCxJQUFJLE1BQU0sQ0FBQzs7QUFFWCxlQUFlLEVBQUUsQ0FBQzs7QUFFbEIsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLFNBQVMsRUFBRTtBQUMxRCxVQUFRLEVBQUEsb0JBQUc7QUFDVCxXQUFPO0FBQ0wsY0FBUSxFQUFFLFNBQVM7QUFDbkIsZUFBUyxFQUFFLFVBQVU7QUFDckIsVUFBSSxFQUFFLEtBQUs7QUFDWCxXQUFLLEVBQUUsTUFBTTtLQUNkLENBQUM7R0FDSDtBQUNELG1CQUFpQixFQUFBLDZCQUFHO0FBQ2xCLFdBQU8sZUFBZSxDQUFDO0dBQ3hCO0FBQ0QsVUFBUSxFQUFBLG9CQUFHO0FBQ1QsV0FBTyxNQUFNLENBQUM7R0FDZjtBQUNELG9CQUFrQixFQUFBLDhCQUFHO0FBQ25CLFdBQU87QUFDTCxTQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUNqQixjQUFRLEVBQUUsU0FBUztBQUNuQixXQUFLLEVBQUUsTUFBTTtLQUNkLENBQUM7R0FDSDs7QUFHSCxtQkFBaUIsRUFBQSw2QkFBRztBQUNsQixRQUFJLFlBQVksR0FBRztBQUNqQixjQUFRLEVBQUcsQ0FBQyxTQUFTLEVBQUMsT0FBTyxDQUFDO0FBQzlCLGNBQVEsRUFBRyxDQUFDLE1BQU0sRUFBQyxPQUFPLENBQUM7QUFDM0IsY0FBUSxFQUFHLENBQUMsU0FBUyxFQUFDLE9BQU8sQ0FBQztBQUM5QixjQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUMsT0FBTyxDQUFDO0FBQzdCLGNBQVEsRUFBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFDNUIsY0FBUSxFQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztLQUNoQyxDQUFBO0FBQ0QsV0FBTztBQUNMLFdBQUssRUFBRSxZQUFZO0tBQ3BCLENBQUE7R0FDRjs7QUFHQyxlQUFhLEVBQUEsdUJBQUMsTUFBTSxFQUFFO0FBQ3BCLFdBQU8sTUFBTSxHQUFHLEdBQUcsQ0FDakIsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNYLFlBQU0sRUFBRSxNQUFNO0FBQ2QsYUFBTyxFQUFFLElBQUk7S0FDZCxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTthQUFJLElBQUksQ0FBQyxFQUFFO0tBQUEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7R0FDcEM7Q0FDRixDQUFDLENBQUM7O0FBRUgsU0FBUyxlQUFlLEdBQUc7QUFDekIsV0FBUyxHQUFHLEdBQUcsQ0FBQztBQUNkLFVBQU0sRUFBRSxLQUFLO0FBQ2IsUUFBSSxFQUFFLElBQUk7QUFDVixVQUFNLEVBQUUsSUFBSTtHQUNiLENBQUMsQ0FBQztBQUNILGlCQUFlLEdBQUcsVUFBVSxDQUFDLENBQzNCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQ2IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDZCxDQUFDLENBQUM7QUFDSCxRQUFNLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDaEIsWUFBVSxHQUFHLEdBQUcsQ0FBQztBQUNqQixPQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ1osUUFBTSxHQUFHLEtBQUssQ0FBQztBQUNmLFdBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNsQixRQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztDQUN0Qjs7QUFFRCxTQUFTLElBQUksR0FBRyxFQUVmOztBQUVELFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRTtBQUM3QyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3ZCLFFBQUksRUFBRSxJQUFJO0FBQ1YsTUFBRSxFQUFFLEVBQUU7QUFDTixhQUFTLEVBQUUsVUFBVTtHQUN0QixDQUFDLENBQUM7O0FBRUgsTUFBSSxDQUFDLElBQUksRUFBRTs7QUFFVCxXQUFPLEtBQUssQ0FBQztHQUNkOztBQUVELE9BQUssR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdEIsUUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUMzQixXQUFTLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN0RCxRQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsVUFBQSxJQUFJO1dBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0dBQUEsQ0FBQyxDQUFDOztBQUU5RCxNQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEdBQUcsRUFBRTs7QUFDakMsVUFBTSxhQUFhLEdBQUcsT0FBTyxJQUMzQixXQUFXLENBQUMsS0FBSyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7O0FBRXpDLHFCQUFlLEdBQUcsZUFBZSxDQUM5QixNQUFNLENBQUMsS0FBSyxFQUFFLFVBQUEsSUFBSTtlQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO09BQUEsQ0FBQyxDQUFDOztHQUNwRDs7QUFFRCxNQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRTtBQUN0QixRQUFNLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLEdBQUcsV0FBVyxHQUM5QyxNQUFNLENBQUMsWUFBWSxFQUFFLEdBQUcsV0FBVyxHQUNuQyxNQUFNLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxxQkFBcUIsR0FDeEQsTUFBTSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsc0JBQXNCLEdBQ3ZELE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDOztBQUVuQyxZQUFRLENBQUM7QUFDUCxZQUFNLEVBQUUsS0FBSyxLQUFLLEdBQUcsR0FBRyxPQUFPLEdBQUcsT0FBTztBQUN6QyxVQUFJLEVBQUUsSUFBSTtLQUNYLENBQUMsQ0FBQztHQUNKOztBQUVELE1BQUksUUFBUSxFQUFFO0FBQ1osYUFBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDekIsVUFBSSxFQUFFLElBQUk7QUFDVixRQUFFLEVBQUUsRUFBRTtBQUNOLGFBQU8sRUFBRSxPQUFPO0FBQ2hCLGNBQVEsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFO0tBQzdCLENBQUMsQ0FBQztHQUNKOztBQUVELFNBQU8sSUFBSSxDQUFDO0NBQ2I7O0FBRUQsU0FBUyxRQUFRLENBQUMsT0FBTyxFQUFFO0FBQ3pCLFdBQVMsR0FBRyxTQUFTLENBQ2xCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQ25CLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUM3QixHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUM5Qjs7QUFFRCxhQUFhLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxFQUFJO0FBQ2hDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDOUIsTUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDOztBQUVyQixVQUFRLE1BQU0sQ0FBQyxVQUFVO0FBQ3ZCLFNBQUssYUFBYSxDQUFDLFNBQVM7QUFDMUIsZUFBUyxHQUFHLFFBQVEsQ0FDbEIsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNELFlBQU07O0FBQUEsQUFFUixTQUFLLGFBQWEsQ0FBQyxnQkFBZ0I7QUFDakMsZ0JBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQzlCLFlBQU07O0FBQUEsQUFFUixTQUFLLGFBQWEsQ0FBQyxJQUFJOztBQUVyQixZQUFNOztBQUFBLEFBRVIsU0FBSyxhQUFhLENBQUMsU0FBUztBQUMxQixjQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLFlBQU07O0FBQUEsQUFFUixTQUFLLGFBQWEsQ0FBQyxPQUFPO0FBQ3hCLHFCQUFlLEVBQUUsQ0FBQztBQUNsQixZQUFNOztBQUFBLEFBRVI7QUFDRSxhQUFPLElBQUksQ0FBQztBQUFBLEdBQ2Y7O0FBRUQsTUFBSSxTQUFTLEVBQUU7QUFDYixhQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0dBQzlCO0FBQ0QsU0FBTyxJQUFJLENBQUM7Q0FDYixDQUFDLENBQUM7O2lCQUVZLFNBQVMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ2VzNi1zaGltJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgaW8gZnJvbSAnLi9pbyc7XG5pbXBvcnQgR2FtZUludGVyZmFjZSBmcm9tICcuL2NvbXBvbmVudHMvR2FtZUludGVyZmFjZSc7XG5cbmxldCBwYXJhbXMgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgnL3BsYXkvJywgJycpLnNwbGl0KCcvJyk7XG5wYXJhbXNbMV0gPSBwYXJzZUludChwYXJhbXNbMV0sIDEwKTtcbnBhcmFtc1syXSA9IHBhcnNlSW50KHBhcmFtc1syXSwgMTApO1xuXG5SZWFjdC5yZW5kZXIoXG4gIDxHYW1lSW50ZXJmYWNlIGlvPXtpb30gcGFyYW1zPXtwYXJhbXN9IC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcbik7IiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNSBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuXG5mdW5jdGlvbiBjbGFzc05hbWVzKCkge1xuXHR2YXIgY2xhc3NlcyA9ICcnO1xuXHR2YXIgYXJnO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0YXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdGlmICghYXJnKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBhcmcgfHwgJ251bWJlcicgPT09IHR5cGVvZiBhcmcpIHtcblx0XHRcdGNsYXNzZXMgKz0gJyAnICsgYXJnO1xuXHRcdH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcblx0XHRcdGNsYXNzZXMgKz0gJyAnICsgY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdH0gZWxzZSBpZiAoJ29iamVjdCcgPT09IHR5cGVvZiBhcmcpIHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0aWYgKCFhcmcuaGFzT3duUHJvcGVydHkoa2V5KSB8fCAhYXJnW2tleV0pIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjbGFzc2VzICs9ICcgJyArIGtleTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGNsYXNzZXMuc3Vic3RyKDEpO1xufVxuXG4vLyBzYWZlbHkgZXhwb3J0IGNsYXNzTmFtZXMgZm9yIG5vZGUgLyBicm93c2VyaWZ5XG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xufVxuXG4vLyBzYWZlbHkgZXhwb3J0IGNsYXNzTmFtZXMgZm9yIFJlcXVpcmVKU1xuaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHR9KTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ0ludmFyaWFudCBWaW9sYXRpb246ICcgK1xuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGtleU1pcnJvclxuICogQHR5cGVjaGVja3Mgc3RhdGljLW9ubHlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwiLi9pbnZhcmlhbnRcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhbiBlbnVtZXJhdGlvbiB3aXRoIGtleXMgZXF1YWwgdG8gdGhlaXIgdmFsdWUuXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKlxuICogICB2YXIgQ09MT1JTID0ga2V5TWlycm9yKHtibHVlOiBudWxsLCByZWQ6IG51bGx9KTtcbiAqICAgdmFyIG15Q29sb3IgPSBDT0xPUlMuYmx1ZTtcbiAqICAgdmFyIGlzQ29sb3JWYWxpZCA9ICEhQ09MT1JTW215Q29sb3JdO1xuICpcbiAqIFRoZSBsYXN0IGxpbmUgY291bGQgbm90IGJlIHBlcmZvcm1lZCBpZiB0aGUgdmFsdWVzIG9mIHRoZSBnZW5lcmF0ZWQgZW51bSB3ZXJlXG4gKiBub3QgZXF1YWwgdG8gdGhlaXIga2V5cy5cbiAqXG4gKiAgIElucHV0OiAge2tleTE6IHZhbDEsIGtleTI6IHZhbDJ9XG4gKiAgIE91dHB1dDoge2tleTE6IGtleTEsIGtleTI6IGtleTJ9XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9ialxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG52YXIga2V5TWlycm9yID0gZnVuY3Rpb24ob2JqKSB7XG4gIHZhciByZXQgPSB7fTtcbiAgdmFyIGtleTtcbiAgKFwicHJvZHVjdGlvblwiICE9PSBcImRldmVsb3BtZW50XCIgPyBpbnZhcmlhbnQoXG4gICAgb2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KG9iaiksXG4gICAgJ2tleU1pcnJvciguLi4pOiBBcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdC4nXG4gICkgOiBpbnZhcmlhbnQob2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KG9iaikpKTtcbiAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldFtrZXldID0ga2V5O1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU1pcnJvcjtcbiIsImltcG9ydCBDaGF0Q29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9DaGF0Q29uc3RhbnRzJztcbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XG5cbmNvbnN0IENoYXRBY3Rpb25zID0ge1xuICB0b2dnbGVWaXNpYmlsaXR5KCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBDaGF0Q29uc3RhbnRzLlRPR0dMRV9WSVNJQklMSVRZXG4gICAgfSk7XG4gIH0sXG4gIHN1Ym1pdE1lc3NhZ2UobWVzc2FnZSwgY2xhc3NOYW1lLCByZWNlaXZlZCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBDaGF0Q29uc3RhbnRzLlNVQk1JVF9NRVNTQUdFLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgcmVjZWl2ZWQ6IHJlY2VpdmVkXG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoYXRBY3Rpb25zOyIsImltcG9ydCBHYW1lQ29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9HYW1lQ29uc3RhbnRzJztcbmltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcic7XG5cbmNvbnN0IEdhbWVBY3Rpb25zID0ge1xuICBtYWtlTW92ZShmcm9tLCB0bywgY2FwdHVyZSwgZW1pdE1vdmUpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5NQUtFX01PVkUsXG4gICAgICBmcm9tOiBmcm9tLFxuICAgICAgdG86IHRvLFxuICAgICAgY2FwdHVyZTogY2FwdHVyZSxcbiAgICAgIGVtaXRNb3ZlOiBlbWl0TW92ZVxuICAgIH0pO1xuICB9LFxuICBkcmF3KCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBHYW1lQ29uc3RhbnRzLkRSQVdcbiAgICB9KTtcbiAgfSxcbiAgcmVtYXRjaCgpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5SRU1BVENIXG4gICAgfSk7XG4gIH0sXG4gIGdhbWVPdmVyKG9wdGlvbnMpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5HQU1FX09WRVIsXG4gICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgfSk7XG4gIH0sXG4gIGNoYW5nZVByb21vdGlvbihwcm9tb3Rpb24pIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogR2FtZUNvbnN0YW50cy5DSEFOR0VfUFJPTU9USU9OLFxuICAgICAgcHJvbW90aW9uOiBwcm9tb3Rpb25cbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZUFjdGlvbnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuXG5jb25zdCBDYXB0dXJlZFBpZWNlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG9uR2FtZUNoYW5nZV0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjYXB0dXJlZFBpZWNlczogR2FtZVN0b3JlLmdldENhcHR1cmVkUGllY2VzKClcbiAgICB9O1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY3AgPSB0aGlzLnN0YXRlLmNhcHR1cmVkUGllY2VzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjYXB0dXJlZC1waWVjZXNcIj5cbiAgICAgICAge2NwLm1hcCgocGllY2VzLCBjb2xvcikgPT4gKFxuICAgICAgICAgIDx1bCBrZXk9e2NvbG9yfT5cbiAgICAgICAgICAgIHtwaWVjZXMubWFwKChwaWVjZSwgaSkgPT4gPGxpIGtleT17aX0+e3BpZWNlfTwvbGk+KS50b0FycmF5KCl9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgKSkudG9BcnJheSgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgX29uR2FtZUNoYW5nZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNhcHR1cmVkUGllY2VzOiBHYW1lU3RvcmUuZ2V0Q2FwdHVyZWRQaWVjZXMoKVxuICAgIH0pO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FwdHVyZWRQaWVjZXM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBDaGF0U3RvcmUgZnJvbSAnLi4vc3RvcmVzL0NoYXRTdG9yZSc7XG5pbXBvcnQgQ2hhdEFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9DaGF0QWN0aW9ucyc7XG5cbmNvbnN0IENoYXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHRva2VuOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgc291bmRzRW5hYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIG9wZW5Nb2RhbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBDaGF0U3RvcmUuZ2V0U3RhdGUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGF0SGlkZGVuOiBzdGF0ZS5pc0NoYXRIaWRkZW4sXG4gICAgICBtZXNzYWdlczogc3RhdGUubWVzc2FnZXMsXG4gICAgICBtZXNzYWdlOiAnJyxcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLmlvLm9uKCdyZWNlaXZlLW1lc3NhZ2UnLCBkYXRhID0+IHtcbiAgICAgIENoYXRBY3Rpb25zLnN1Ym1pdE1lc3NhZ2UoZGF0YS5tZXNzYWdlLCBkYXRhLmNvbG9yICsgJyBsZWZ0JywgdHJ1ZSk7XG4gICAgICB0aGlzLl9tYXliZVBsYXlTb3VuZCgpO1xuICAgIH0pO1xuICAgIENoYXRTdG9yZS5vbignY2hhbmdlJywgdGhpcy5fb25DaGF0U3RvcmVDaGFuZ2UpO1xuICAgIFxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDEzOTkpIENoYXRBY3Rpb25zLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgQ2hhdFN0b3JlLm9mZignY2hhbmdlJywgdGhpcy5fb25DaGF0U3RvcmVDaGFuZ2UpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjaGF0LXdyYXBwZXJcIlxuICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuc3RhdGUuaXNDaGF0SGlkZGVuID8gJ2hpZGRlbicgOiBudWxsfT5cbiAgICAgICAgXG4gICAgICAgIDxoND5DaGF0PC9oND5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiY2xvc2VcIlxuICAgICAgICAgICBvbkNsaWNrPXtDaGF0QWN0aW9ucy50b2dnbGVWaXNpYmlsaXR5fT5cbiAgICAgICAgICB4XG4gICAgICAgIDwvYT5cbiAgICAgICAgXG4gICAgICAgIDxhdWRpbyBwcmVsb2FkPVwiYXV0b1wiIHJlZj1cIm1zZ1NuZFwiPlxuICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiL3NuZC9tZXNzYWdlLm1wM1wiIC8+XG4gICAgICAgIDwvYXVkaW8+XG4gICAgICAgIFxuICAgICAgICA8dWwgaWQ9XCJjaGF0LWxpc3RcIiByZWY9XCJjaGF0XCI+XG4gICAgICAgICAge3RoaXMuc3RhdGUubWVzc2FnZXMubWFwKChtZXNzYWdlLCBpKSA9PiAoXG4gICAgICAgICAgICA8bGkga2V5PXtpfSBjbGFzc05hbWU9e21lc3NhZ2UuZ2V0KCdjbGFzc05hbWUnKX0+XG4gICAgICAgICAgICAgIHttZXNzYWdlLmdldCgnbWVzc2FnZScpfVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICApKS50b0FycmF5KCl9XG4gICAgICAgIDwvdWw+XG4gICAgICAgIFxuICAgICAgICA8c3Bhbj5Xcml0ZSB5b3VyIG1lc3NhZ2U6PC9zcGFuPlxuICAgICAgICBcbiAgICAgICAgPGZvcm0gaWQ9XCJjaGF0LWZvcm1cIlxuICAgICAgICAgICAgICBvblN1Ym1pdD17dGhpcy5fc3VibWl0TWVzc2FnZX0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgcmVmPVwibWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jb2xvcn1cbiAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uQ2hhbmdlTWVzc2FnZX0gLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgX29uQ2hhdFN0b3JlQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoQ2hhdFN0b3JlLmdldFN0YXRlKCksIHRoaXMuX3Njcm9sbENoYXQpO1xuICB9LFxuICBfb25DaGFuZ2VNZXNzYWdlKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlOiBlLnRhcmdldC52YWx1ZX0pO1xuICB9LFxuICBfc3VibWl0TWVzc2FnZShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHtpbywgdG9rZW4sIGNvbG9yLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMuc3RhdGUubWVzc2FnZTtcblxuICAgIGlmICghaXNPcHBvbmVudEF2YWlsYWJsZSkge1xuICAgICAgdGhpcy5yZWZzLm1lc3NhZ2UuZ2V0RE9NTm9kZSgpLmJsdXIoKTtcbiAgICAgIHRoaXMucHJvcHMub3Blbk1vZGFsKCdpbmZvJywgJ1NvcnJ5LCB5b3VyIG9wcG9uZW50IGlzIG5vdCBjb25uZWN0ZWQuICcgK1xuICAgICAgICAnWW91IGNhbuKAmHQgc2VuZCBtZXNzYWdlcy4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBDaGF0QWN0aW9ucy5zdWJtaXRNZXNzYWdlKG1lc3NhZ2UsIGNvbG9yICsgJyByaWdodCcsIGZhbHNlKTtcbiAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlOiAnJ30pO1xuXG4gICAgaW8uZW1pdCgnc2VuZC1tZXNzYWdlJywge1xuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgIHRva2VuOiB0b2tlblxuICAgIH0pO1xuICB9LFxuICBfc2Nyb2xsQ2hhdCgpIHtcbiAgICBjb25zdCBjaGF0Tm9kZSA9IHRoaXMucmVmcy5jaGF0LmdldERPTU5vZGUoKTtcbiAgICBjaGF0Tm9kZS5zY3JvbGxUb3AgPSBjaGF0Tm9kZS5zY3JvbGxIZWlnaHQ7XG4gIH0sXG4gIF9tYXliZVBsYXlTb3VuZCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zb3VuZHNFbmFibGVkKSB7XG4gICAgICB0aGlzLnJlZnMubXNnU25kLmdldERPTU5vZGUoKS5wbGF5KCk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdDsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcbmltcG9ydCBDaGVzc1BpZWNlcyBmcm9tICcuLi9jb25zdGFudHMvQ2hlc3NQaWVjZXMnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcbmltcG9ydCBtYXliZVJldmVyc2UgZnJvbSAnLi4vbWl4aW5zL21heWJlUmV2ZXJzZSc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQge1NlcSwgUmVwZWF0LCBMaXN0LCBTZXR9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmNvbnN0IEZJTEVTID0gU2VxLkluZGV4ZWQoJ2FiY2RlZmdoJyk7XG5jb25zdCBSQU5LUyA9IFNlcS5JbmRleGVkKCcxMjM0NTY3OCcpO1xuXG5jb25zdCBDaGVzc2JvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB0b2tlbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG1heWJlUGxheVNvdW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIGdhbWVPdmVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbiwgbWF5YmVSZXZlcnNlXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBHYW1lU3RvcmUuZ2V0Q2hlc3Nib2FyZFN0YXRlKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZmVuOiBzdGF0ZS5mZW4sXG4gICAgICBtb3ZlRnJvbTogbnVsbCxcbiAgICAgIGxhc3RNb3ZlOiBzdGF0ZS5sYXN0TW92ZSxcbiAgICAgIGtpbmdJbkNoZWNrOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHtpbywgdG9rZW59ID0gdGhpcy5wcm9wcztcbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gICAgR2FtZVN0b3JlLm9uKCduZXctbW92ZScsIHRoaXMuX29uTmV3TW92ZSk7XG5cbiAgICBpby5vbignbW92ZScsIGRhdGEgPT4ge1xuICAgICAgR2FtZUFjdGlvbnMubWFrZU1vdmUoZGF0YS5mcm9tLCBkYXRhLnRvLCBkYXRhLmNhcHR1cmUsIGZhbHNlKTtcbiAgICAgIHRoaXMucHJvcHMubWF5YmVQbGF5U291bmQoKTtcblxuICAgICAgaWYgKCFkYXRhLmdhbWVPdmVyKSB7XG4gICAgICAgIHRoaXMuX3J1bkNsb2NrKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RpdGxlJylbMF07XG4gICAgICAgIHRpdGxlLnRleHQgPSAnKiAnICsgdGl0bGUudGV4dDtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9yZW1vdmVBc3Rlcmlza0Zyb21UaXRsZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpby5vbigncmVtYXRjaC1hY2NlcHRlZCcsICgpID0+IHRoaXMuc2V0U3RhdGUoe21vdmVGcm9tOiBudWxsfSkpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBHYW1lU3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xuICAgIEdhbWVTdG9yZS5vbignbmV3LW1vdmUnLCB0aGlzLl9vbk5ld01vdmUpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2NvbG9yLCBpc09wcG9uZW50QXZhaWxhYmxlLCBnYW1lT3Zlcn0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtmZW4sIG1vdmVGcm9tLCBsYXN0TW92ZSwga2luZ0luQ2hlY2t9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBmZW5BcnJheSA9IGZlbi5zcGxpdCgnICcpO1xuICAgIGNvbnN0IHBsYWNlbWVudCA9IGZlbkFycmF5WzBdO1xuICAgIGNvbnN0IGlzSXRNeVR1cm4gPSBmZW5BcnJheVsxXSA9PT0gY29sb3IuY2hhckF0KDApO1xuICAgIGNvbnN0IHJvd3MgPSB0aGlzLl9tYXliZVJldmVyc2UocGxhY2VtZW50LnNwbGl0KCcvJykpO1xuICAgIGNvbnN0IHJhbmtzID0gdGhpcy5fbWF5YmVSZXZlcnNlKFJBTktTLCAnd2hpdGUnKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPVwiY2hlc3Nib2FyZFwiPlxuICAgICAgICB7cm93cy5tYXAoKHBsYWNlbWVudCwgaSkgPT5cbiAgICAgICAgICA8Um93XG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICByYW5rPXtyYW5rcy5nZXQoaSl9XG4gICAgICAgICAgICBwbGFjZW1lbnQ9e3BsYWNlbWVudH1cbiAgICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICAgIGlzTW92ZWFibGU9e2lzSXRNeVR1cm4gJiYgaXNPcHBvbmVudEF2YWlsYWJsZSAmJiAhZ2FtZU92ZXJ9XG4gICAgICAgICAgICBtb3ZlRnJvbT17bW92ZUZyb219XG4gICAgICAgICAgICBsYXN0TW92ZT17bGFzdE1vdmV9XG4gICAgICAgICAgICBzZXRNb3ZlRnJvbT17dGhpcy5fc2V0TW92ZUZyb219XG4gICAgICAgICAgICBraW5nSW5DaGVjaz17a2luZ0luQ2hlY2t9XG4gICAgICAgICAgICB2YWxpZE1vdmVzPXtHYW1lU3RvcmUuZ2V0VmFsaWRNb3Zlcyhtb3ZlRnJvbSl9IC8+KX1cbiAgICAgIDwvdGFibGU+XG4gICAgKTtcbiAgfSxcbiAgX29uR2FtZUNoYW5nZShjYikge1xuICAgIGNvbnN0IHN0YXRlID0gR2FtZVN0b3JlLmdldENoZXNzYm9hcmRTdGF0ZSgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZmVuOiBzdGF0ZS5mZW4sXG4gICAgICBsYXN0TW92ZTogc3RhdGUubGFzdE1vdmUsXG4gICAgICBraW5nSW5DaGVjazogc3RhdGUuY2hlY2sgJiYgKHN0YXRlLmZlbi5zcGxpdCgnICcpWzFdID09PSAndycgPyAnSycgOiAnaycpXG4gICAgfSwgY2IpO1xuICB9LFxuICBfc2V0TW92ZUZyb20oc3F1YXJlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb3ZlRnJvbTogc3F1YXJlXG4gICAgfSk7XG4gIH0sXG4gIF9vbk5ld01vdmUobW92ZSkge1xuICAgIGNvbnN0IHtpbywgdG9rZW59ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLmVtaXQoJ25ldy1tb3ZlJywge1xuICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgbW92ZTogbW92ZVxuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCh0aGlzLnByb3BzLm1heWJlUGxheVNvdW5kLCAwKTtcbiAgfSxcbiAgX3J1bkNsb2NrKCkge1xuICAgIGNvbnN0IHtpbywgdG9rZW4sIGNvbG9yfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpby5lbWl0KCdjbG9jay1ydW4nLCB7XG4gICAgICB0b2tlbjogdG9rZW4sXG4gICAgICBjb2xvcjogY29sb3JcbiAgICB9KTtcbiAgfSxcbiAgX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKCkge1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0aXRsZScpWzBdO1xuICAgIHRpdGxlLnRleHQgPSB0aXRsZS50ZXh0LnJlcGxhY2UoJyogJywgJycpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX3JlbW92ZUFzdGVyaXNrRnJvbVRpdGxlKTtcbiAgfVxufSk7XG5cbmNvbnN0IFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBwcm9wVHlwZXM6IHtcbiAgICByYW5rOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWycxJywnMicsJzMnLCc0JywnNScsJzYnLCc3JywnOCddKS5pc1JlcXVpcmVkLFxuICAgIHBsYWNlbWVudDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIGlzTW92ZWFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgbW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFzdE1vdmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc2V0TW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAga2luZ0luQ2hlY2s6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbZmFsc2UsICdLJywgJ2snXSkuaXNSZXF1aXJlZCxcbiAgICB2YWxpZE1vdmVzOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihTZXQpLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbbWF5YmVSZXZlcnNlXSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3JhbmssIHBsYWNlbWVudCwgY29sb3J9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmaWxlcyA9IHRoaXMuX21heWJlUmV2ZXJzZShGSUxFUyk7XG4gICAgY29uc3QgcGllY2VzID0gdGhpcy5fbWF5YmVSZXZlcnNlKHBsYWNlbWVudC5sZW5ndGggPCA4ID9cbiAgICAgIFNlcShwbGFjZW1lbnQpLmZsYXRNYXAocGllY2UgPT4gKFxuICAgICAgICAvXlxcZCQvLnRlc3QocGllY2UpID8gUmVwZWF0KCctJywgcGFyc2VJbnQocGllY2UsIDEwKSkgOiBwaWVjZVxuICAgICAgKSkudG9BcnJheSgpIDpcblxuICAgICAgcGxhY2VtZW50LnNwbGl0KCcnKVxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHRyPlxuICAgICAgICB7cGllY2VzLm1hcCgocGllY2UsIGkpID0+XG4gICAgICAgICAgPENvbHVtblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgc3F1YXJlPXtmaWxlcy5nZXQoaSkgKyByYW5rfVxuICAgICAgICAgICAgcGllY2U9e3BpZWNlfVxuICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgJ3JhbmsnLCAncGxhY2VtZW50Jyl9IC8+KX1cbiAgICAgIDwvdHI+XG4gICAgKTtcbiAgfVxufSk7XG5cbmNvbnN0IENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBwcm9wVHlwZXM6IHtcbiAgICBzcXVhcmU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBwaWVjZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyd3aGl0ZScsICdibGFjayddKS5pc1JlcXVpcmVkLFxuICAgIGlzTW92ZWFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgbW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFzdE1vdmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc2V0TW92ZUZyb206IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAga2luZ0luQ2hlY2s6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbZmFsc2UsICdLJywgJ2snXSkuaXNSZXF1aXJlZCxcbiAgICB2YWxpZE1vdmVzOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihTZXQpLmlzUmVxdWlyZWRcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge21vdmVGcm9tLCBsYXN0TW92ZSwgc3F1YXJlLCBjb2xvcixcbiAgICAgICAgICAgaXNNb3ZlYWJsZSwga2luZ0luQ2hlY2ssIHZhbGlkTW92ZXN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBwaWVjZSA9IENoZXNzUGllY2VzW3RoaXMucHJvcHMucGllY2VdO1xuICAgIGNvbnN0IHJneCA9IGNvbG9yID09PSAnd2hpdGUnID8gL15bS1FSQk5QXSQvIDogL15ba3FyYm5wXSQvO1xuICAgIGNvbnN0IGlzRHJhZ2dhYmxlID0gcmd4LnRlc3QodGhpcy5wcm9wcy5waWVjZSk7XG4gICAgY29uc3QgaXNEcm9wcGFibGUgPSBtb3ZlRnJvbSAmJiB2YWxpZE1vdmVzLmhhcyhzcXVhcmUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx0ZCBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBtb3ZlRnJvbSA9PT0gc3F1YXJlICYmICF2YWxpZE1vdmVzLmlzRW1wdHkoKSxcbiAgICAgICAgICAgIGZyb206IGxhc3RNb3ZlLmdldCgnZnJvbScpID09PSBzcXVhcmUsXG4gICAgICAgICAgICB0bzogbGFzdE1vdmUuZ2V0KCd0bycpID09PSBzcXVhcmUsXG4gICAgICAgICAgICBkcm9wcGFibGU6IGlzRHJvcHBhYmxlXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgb25DbGljaz17IXBpZWNlID8gdGhpcy5fb25DbGlja1NxdWFyZSA6IG51bGx9XG4gICAgICAgICAgb25EcmFnT3Zlcj17aXNEcm9wcGFibGUgPyB0aGlzLl9vbkRyYWdPdmVyIDogbnVsbH1cbiAgICAgICAgICBvbkRyb3A9e2lzRHJvcHBhYmxlID8gdGhpcy5fb25Ecm9wIDogbnVsbH0+XG5cbiAgICAgICAge3BpZWNlID9cbiAgICAgICAgICA8YSBjbGFzc05hbWU9e2tpbmdJbkNoZWNrID09PSB0aGlzLnByb3BzLnBpZWNlID8gJ2luLWNoZWNrJyA6IG51bGx9XG4gICAgICAgICAgICAgb25DbGljaz17dGhpcy5fb25DbGlja1NxdWFyZX1cbiAgICAgICAgICAgICBvbkRyYWdTdGFydD17dGhpcy5fb25EcmFnU3RhcnR9XG4gICAgICAgICAgICAgZHJhZ2dhYmxlPXtpc0RyYWdnYWJsZSAmJiBpc01vdmVhYmxlfT5cbiAgICAgICAgICAgIHtwaWVjZX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDpudWxsfVxuICAgICAgPC90ZD5cbiAgICApO1xuICB9LFxuICBfb25DbGlja1NxdWFyZSgpIHtcbiAgICBjb25zdCB7aXNNb3ZlYWJsZSwgY29sb3IsIG1vdmVGcm9tLCBzcXVhcmUsIHBpZWNlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgcmd4ID0gY29sb3IgPT09ICd3aGl0ZScgPyAvXltLUVJCTlBdJC8gOiAvXltrcXJibnBdJC87XG5cbiAgICBpZiAoIWlzTW92ZWFibGUgfHwgKCFtb3ZlRnJvbSAmJiAhcmd4LnRlc3QocGllY2UpKSlcbiAgICAgIHJldHVybjtcbiAgICBlbHNlIGlmIChtb3ZlRnJvbSAmJiBtb3ZlRnJvbSA9PT0gc3F1YXJlKVxuICAgICAgdGhpcy5wcm9wcy5zZXRNb3ZlRnJvbShudWxsKTtcbiAgICBlbHNlIGlmIChyZ3gudGVzdChwaWVjZSkpXG4gICAgICB0aGlzLnByb3BzLnNldE1vdmVGcm9tKHNxdWFyZSk7XG4gICAgZWxzZVxuICAgICAgR2FtZUFjdGlvbnMubWFrZU1vdmUobW92ZUZyb20sIHNxdWFyZSwgQ2hlc3NQaWVjZXNbcGllY2VdLCB0cnVlKTtcbiAgfSxcbiAgX29uRHJhZ1N0YXJ0KGUpIHtcbiAgICBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIC8vIHNldERhdGEgaXMgcmVxdWlyZWQgYnkgZmlyZWZveFxuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCAnJyk7XG5cbiAgICB0aGlzLnByb3BzLnNldE1vdmVGcm9tKHRoaXMucHJvcHMuc3F1YXJlKTtcbiAgfSxcbiAgX29uRHJhZ092ZXIoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICB9LFxuICBfb25Ecm9wKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qge21vdmVGcm9tLCBzcXVhcmUsIHBpZWNlfSA9IHRoaXMucHJvcHM7XG4gICAgR2FtZUFjdGlvbnMubWFrZU1vdmUobW92ZUZyb20sIHNxdWFyZSwgQ2hlc3NQaWVjZXNbcGllY2VdLCB0cnVlKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENoZXNzYm9hcmQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG5pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuaW1wb3J0IENoZXNzYm9hcmQgZnJvbSAnLi9DaGVzc2JvYXJkJztcbmltcG9ydCBDYXB0dXJlZFBpZWNlcyBmcm9tICcuL0NhcHR1cmVkUGllY2VzJztcbmltcG9ydCBUYWJsZU9mTW92ZXMgZnJvbSAnLi9UYWJsZU9mTW92ZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5jb25zdCBDaGVzc2JvYXJkSW50ZXJmYWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB0b2tlbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHNvdW5kc0VuYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgZ2FtZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG9uR2FtZUNoYW5nZV0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiBHYW1lU3RvcmUuZ2V0U3RhdGUoKTtcbiAgfSxcbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLmdhbWVPdmVyLmdldCgnc3RhdHVzJykgJiZcbiAgICAgICAgIXByZXZQcm9wcy5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpKSB7XG4gICAgICB0aGlzLnByb3BzLm9wZW5Nb2RhbCgnaW5mbycsIHRoaXMuX2dldEdhbWVPdmVyTWVzc2FnZSgpKTtcbiAgICB9XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7cHJvbW90aW9uLCB0dXJuLCBnYW1lT3ZlciwgY2hlY2t9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiYm9hcmQtbW92ZXMtd3JhcHBlclwiIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XG4gICAgICAgIFxuICAgICAgICA8YXVkaW8gcHJlbG9hZD1cImF1dG9cIiByZWY9XCJtb3ZlU25kXCI+XG4gICAgICAgICAgPHNvdXJjZSBzcmM9XCIvc25kL21vdmUubXAzXCIgLz5cbiAgICAgICAgPC9hdWRpbz5cbiAgICAgICAgPGF1ZGlvIHByZWxvYWQ9XCJhdXRvXCIgcmVmPVwiY2hlY2tTbmRcIj5cbiAgICAgICAgICA8c291cmNlIHNyYz1cIi9zbmQvY2hlY2subXAzXCIgLz5cbiAgICAgICAgPC9hdWRpbz5cblxuICAgICAgICA8ZGl2IGlkPVwiYm9hcmQtd3JhcHBlclwiPlxuICAgICAgICAgIDxDYXB0dXJlZFBpZWNlcyAvPlxuICAgICAgICAgIDxDaGVzc2JvYXJkXG4gICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCAnc291bmRzRW5hYmxlZCcsICdnYW1lT3ZlcicpfVxuICAgICAgICAgICAgZ2FtZU92ZXI9e2dhbWVPdmVyLmdldCgnc3RhdHVzJyl9XG4gICAgICAgICAgICBtYXliZVBsYXlTb3VuZD17dGhpcy5fbWF5YmVQbGF5U291bmR9IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxUYWJsZU9mTW92ZXMgLz5cblxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwcm9tb3Rpb25cIj5cbiAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8c3Bhbj5Qcm9tb3Rpb246IDwvc3Bhbj5cbiAgICAgICAgICAgIDxzZWxlY3QgdmFsdWU9e3Byb21vdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uUHJvbW90aW9uQ2hhbmdlfT5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInFcIj5RdWVlbjwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiclwiPlJvb2s8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJcIj5CaXNob3A8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm5cIj5LbmlnaHQ8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmZWVkYmFja1wiPlxuICAgICAgICAgIHshZ2FtZU92ZXIuZ2V0KCdzdGF0dXMnKSA/IFxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb25cIj5cbiAgICAgICAgICAgICAgICB7LyogRiAtPiB3aGl0ZSBraW5nLCBmIC0+IGJsYWNrIGtpbmcqL1xuICAgICAgICAgICAgICAgICAgdHVybiA9PT0gJ3cnID8gJ0YnIDogJ2YnfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIHtgJHt0dXJuID09PSAndycgPyAnV2hpdGUnIDogJ0JsYWNrJ30gdG8gbW92ZS5gfVxuICAgICAgICAgICAgICB7Y2hlY2sgPyA8c3Ryb25nPiBDaGVjay48L3N0cm9uZz4gOiBudWxsfVxuICAgICAgICAgICAgPC9zcGFuPiA6XG5cbiAgICAgICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb25cIj5cbiAgICAgICAgICAgICAgICB7Z2FtZU92ZXIuZ2V0KCd3aW5uZXInKSA9PT0gJ1doaXRlJyA/ICdGJyA6ICdmJ31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB7dGhpcy5fZ2V0R2FtZU92ZXJNZXNzYWdlKCl9XG4gICAgICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIF9vbkdhbWVDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShHYW1lU3RvcmUuZ2V0U3RhdGUoKSk7XG4gIH0sXG4gIF9vblByb21vdGlvbkNoYW5nZShlKSB7XG4gICAgR2FtZUFjdGlvbnMuY2hhbmdlUHJvbW90aW9uKGUudGFyZ2V0LnZhbHVlKTtcbiAgfSxcbiAgX21heWJlUGxheVNvdW5kKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnNvdW5kc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMucmVmc1t0aGlzLnN0YXRlLmNoZWNrID8gJ2NoZWNrU25kJyA6ICdtb3ZlU25kJ10uZ2V0RE9NTm9kZSgpLnBsYXkoKTtcbiAgICB9XG4gIH0sXG4gIF9nZXRHYW1lT3Zlck1lc3NhZ2UoKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMucHJvcHMuZ2FtZU92ZXIuZ2V0KCd0eXBlJyk7XG4gICAgY29uc3Qgd2lubmVyID0gdGhpcy5wcm9wcy5nYW1lT3Zlci5nZXQoJ3dpbm5lcicpO1xuICAgIGNvbnN0IGxvc2VyID0gd2lubmVyID09PSAnV2hpdGUnID8gJ0JsYWNrJyA6ICdXaGl0ZSc7XG5cbiAgICByZXR1cm4gdHlwZSA9PT0gJ2NoZWNrbWF0ZScgPyBgQ2hlY2ttYXRlLiAke3dpbm5lcn0gd2lucyFgIDpcbiAgICAgIHR5cGUgPT09ICd0aW1lb3V0JyA/IGAke2xvc2VyfeKAmHMgdGltZSBpcyBvdXQuICR7d2lubmVyfSB3aW5zIWAgOlxuICAgICAgdHlwZSA9PT0gJ3Jlc2lnbicgPyBgJHtsb3Nlcn0gaGFzIHJlc2lnbmVkLiAke3dpbm5lcn0gd2lucyFgIDpcbiAgICAgIHR5cGUgPT09ICdkcmF3JyA/ICdEcmF3LicgOlxuICAgICAgdHlwZSA9PT0gJ3N0YWxlbWF0ZScgPyAnRHJhdyAoU3RhbGVtYXRlKS4nIDpcbiAgICAgIHR5cGUgPT09ICd0aHJlZWZvbGRSZXBldGl0aW9uJyA/ICdEcmF3IChUaHJlZWZvbGQgUmVwZXRpdGlvbikuJyA6XG4gICAgICB0eXBlID09PSAnaW5zdWZmaWNpZW50TWF0ZXJpYWwnID8gJ0RyYXcgKEluc3VmZmljaWVudCBNYXRlcmlhbCknIDogJyc7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDaGVzc2JvYXJkSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG5cbmNvbnN0IFB1cmVSZW5kZXJNaXhpbiA9IFJlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW47XG5cbmNvbnN0IENsb2NrID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBwYXJhbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG4gIH0sXG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IFtfLCB0aW1lLCBpbmNdID0gdGhpcy5wcm9wcy5wYXJhbXM7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIHdoaXRlOiB0aW1lICogNjAsXG4gICAgICBibGFjazogdGltZSAqIDYwLFxuICAgICAgaW5jOiBpbmMsXG4gICAgICBjb3VudGRvd246IG51bGxcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBpbyA9IHRoaXMucHJvcHMuaW87XG5cbiAgICBpby5vbignY291bnRkb3duJywgZGF0YSA9PiB0aGlzLnNldFN0YXRlKHtcbiAgICAgIFtkYXRhLmNvbG9yXTogZGF0YS50aW1lLFxuICAgICAgY291bnRkb3duOiBkYXRhLmNvbG9yXG4gICAgfSkpO1xuXG4gICAgaW8ub24oJ2NvdW50ZG93bi1nYW1lb3ZlcicsIGRhdGEgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y291bnRkb3duOiBudWxsfSk7XG4gICAgICBHYW1lQWN0aW9ucy5nYW1lT3Zlcih7XG4gICAgICAgIHR5cGU6ICd0aW1lb3V0JyxcbiAgICAgICAgd2lubmVyOiBkYXRhLmNvbG9yID09PSAnYmxhY2snID8gJ1doaXRlJyA6ICdCbGFjaydcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtYWNjZXB0ZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgd2hpdGU6IHRoaXMucHJvcHMucGFyYW1zWzFdICogNjAsXG4gICAgICAgIGJsYWNrOiB0aGlzLnByb3BzLnBhcmFtc1sxXSAqIDYwXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgaWQ9XCJjbG9ja1wiPlxuICAgICAgICA8VGltZXJcbiAgICAgICAgICBjb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICB0aW1lPXt0aGlzLnN0YXRlLndoaXRlfVxuICAgICAgICAgIGNvdW50ZG93bj17dGhpcy5zdGF0ZS5jb3VudGRvd259IC8+XG4gICAgICAgIDxUaW1lclxuICAgICAgICAgIGNvbG9yPVwiYmxhY2tcIlxuICAgICAgICAgIHRpbWU9e3RoaXMuc3RhdGUuYmxhY2t9XG4gICAgICAgICAgY291bnRkb3duPXt0aGlzLnN0YXRlLmNvdW50ZG93bn0gLz5cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufSk7XG5cbmNvbnN0IFRpbWVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHt0aW1lLCBjb2xvciwgY291bnRkb3dufSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWluID0gTWF0aC5mbG9vcih0aW1lIC8gNjApO1xuICAgIGNvbnN0IHNlYyA9IHRpbWUgJSA2MDtcbiAgICBjb25zdCB0aW1lTGVmdCA9IGAke21pbn06JHtzZWMgPCAxMCA/ICcwJyArIHNlYyA6IHNlY31gO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9e2NvbG9yICsgKGNvbG9yID09PSBjb3VudGRvd24gPyAnIHRpY2tpbmcnIDogJycpfT5cbiAgICAgICAge3RpbWVMZWZ0fVxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2xvY2s7IiwiLy8gJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgR2FtZUFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9HYW1lQWN0aW9ucyc7XG4vL2ltcG9ydCBDaGVzc1BpZWNlcyBmcm9tICcuLi9jb25zdGFudHMvQ2hlc3NQaWVjZXMnO1xuLy9pbXBvcnQgb25HYW1lQ2hhbmdlIGZyb20gJy4uL21peGlucy9vbkdhbWVDaGFuZ2UnO1xuLy9pbXBvcnQgbWF5YmVSZXZlcnNlIGZyb20gJy4uL21peGlucy9tYXliZVJldmVyc2UnO1xuaW1wb3J0IGJlaGF2aW9yIGZyb20gJy4uL2dhbWUvYmVoYXZpb3InO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBHYW1lQm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXG5cdH0sXG5cdG1peGluczogW10sXG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcblx0XHQvL3JldHVybiBudWxsO1xuXHRcdHRoaXMuc3RhdGUgPSBHYW1lU3RvcmUuZ2V0R2FtZWJvYXJkU3RhdGUoKTtcblx0XHRjb25zb2xlLmxvZyhcInN0YXRlPyBcIiwgdGhpcy5zdGF0ZS5zZXR1cCk7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGU7XG5cdFx0Ly8ge1xuXHRcdC8vIFx0c2V0dXA6IHN0YXRlLnNldHVwO1xuXHRcdC8vIH1cblx0fSxcblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0XG5cblx0fSxcblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cblx0fSxcblx0cmVuZGVyKCkge1xuXHRcdHZhciB7c3RhdGV9ID0gdGhpcywge3NldHVwfSA9IHN0YXRlO1xuXG5cdFx0Y29uc29sZS5sb2coXCJzZXR1cCBcIiwgc2V0dXApO1xuXHRcdHZhciBjZWxsQXJyYXkgPSBbXTtcblx0XHRmb3IgKHZhciBpPTA7IGk8NjsgaSsrKSB7XG5cdFx0XHR2YXIgcm93ID0gW107XG5cdFx0XHRmb3IgKHZhciBqPTA7IGo8NjsgaisrKSB7XG5cdFx0XHRcdHJvdy5wdXNoKHt4OmosIHk6aX0pXG5cdFx0XHR9XG5cdFx0XHRjZWxsQXJyYXkucHVzaChyb3cpO1xuXHRcdH1cblx0XHRyZXR1cm4gKFxuXG5cdFx0XHQ8dGFibGUgY2xhc3NOYW1lPVwiYm9hcmRcIj5cblx0XHRcdHtjZWxsQXJyYXkubWFwKChyb3csIGlkeDEpID0+IFxuXHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0e3Jvdy5tYXAoKGNlbGwsIGlkeDIpID0+XG5cdFx0XHRcdFx0XHQ8dGQgcG9zaXRpb249e2BbJHtpZHgyfSwgJHtpZHgxfV1gfT5cblx0XHRcdFx0XHRcdFx0PENlbGwgcmVmPXtgWyR7aWR4Mn0sICR7aWR4MX1dYH1cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdCBwb3NpdGlvbj17YFske2lkeDJ9LCAke2lkeDF9XWB9IFxuXHRcdFx0XHRcdFx0XHRcdHVuaXQ9e3NldHVwW2BbJHtpZHgyfSwgJHtpZHgxfV1gXSA/IHNldHVwW2BbJHtpZHgyfSwgJHtpZHgxfV1gXVswXTogbnVsbH0gXG5cdFx0XHRcdFx0XHRcdFx0Y29sb3I9e3NldHVwW2BbJHtpZHgyfSwgJHtpZHgxfV1gXSA/IHNldHVwW2BbJHtpZHgyfSwgJHtpZHgxfV1gXVsxXTogbnVsbH0vPlxuXHRcdFx0XHRcdFx0PC90ZD5cblx0XHRcdFx0XHQpfVxuXHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHQpfVxuXHRcdDwvdGFibGU+XG5cdFx0KTtcblx0fVxuXG59KTtcblxuXG5jb25zdCBDZWxsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6IHtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICBcdCByZXR1cm4ge1xuICAgIFx0IFx0c2lkZTogJ2Zyb250JyxcbiAgICBcdCBcdGhpZ2hsaWdodGVkOiBmYWxzZVxuICAgIFx0IH07XG4gIFx0fSxcbiAgXHRjb21wb25lbnREaWRNb3VudCgpIHtcblxuXHRcdCBjb25zb2xlLmxvZyhcInBvc2l0aW9uIGlzIFwiLCB0aGlzLnByb3BzLnBvc2l0aW9uKTtcblx0XHRcblx0fSxcblxuXHRjb21wb25lbnRXaWxsTW91bnQoKSB7XG5cdFx0XG5cdFx0XG5cdFx0XG5cdH0sXG5cdG1peGluczogW10sXG5cblx0X29uQ2xpY2tTcXVhcmUoKSB7XG5cdFx0Y29uc29sZS5sb2coXCJ3aGF0IHRoZSBoZWxsIGlzIHRoaXMgZG9tIG5vZGUgdGhpbmc/IFwiLCB0aGlzLmdldERPTU5vZGUoKSk7XG5cdFx0Y29uc3Qge3VuaXQsIHBvc2l0aW9uLCBjb2xvcn0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHtzaWRlfSA9IHRoaXMuc3RhdGU7XG5cdFx0aWYgKHVuaXQpIHtcblx0XHRcdHZhciByYW5nZXMgPSBbXTtcblx0XHRcdHZhciBtb3ZlcyA9IGJlaGF2aW9yW3VuaXRdW3NpZGVdO1xuXHRcdFx0T2JqZWN0LmtleXMobW92ZXMpLm1hcChmdW5jdGlvbihtb3ZlKXtcblx0XHRcdFx0bW92ZSA9IEpTT04ucGFyc2UobW92ZSk7XG5cdFx0XHRcdHZhciBwb3MgPSBKU09OLnBhcnNlKHBvc2l0aW9uKTtcblx0XHRcdFx0Ly8gaWYoIUFycmF5LmlzQXJyYXkocG9zaXRpb24pKSBcblxuXHRcdFx0XHR2YXIgeSA9ICBwb3NbMF0gKyBtb3ZlWzBdIDtcblx0XHRcdFx0dmFyIHggPSAgcG9zWzFdICsgbW92ZVsxXSA7XG5cdFx0XHRcdHJhbmdlcy5wdXNoKHt4OiB4LCB5OiB5fSk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwid2hhdCBpcyByZWZzXCIsIHRoaXMucmVmcyk7XG5cblx0XHRcdH0pO1xuXHRcdFx0Y29uc29sZS5sb2cobW92ZXMpO1xuXHRcdFx0Ly8gcG9zaXRpb24gPSBKU09OLnBhcnNlKHBvc2l0aW9uKTtcblx0XHRcdC8vIHZhciByYW5nZSA9ICBwb3NpdGlvblswXSArIG1vdmVzW11cblx0XHRcdGNvbnNvbGUubG9nKGBoaSAke3VuaXR9IWApO1xuXHRcdFx0Y29uc29sZS5sb2coYmVoYXZpb3JbdW5pdF0pO1xuXHRcdFx0dGhpcy5fZmxpcCgpO1xuXHRcdH1cblx0fSxcblxuXHRfZmxpcCgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgc2lkZTogKHRoaXMuc3RhdGUuc2lkZSA9PT0gJ2Zyb250JykgPyAnYmFjaycgOiAnZnJvbnQnIH0pO1xuXHR9LFxuXG5cdHJlbmRlcigpe1xuXHRcdHZhciB7dW5pdCwgY29sb3J9ID0gdGhpcy5wcm9wcztcblx0XHR2YXIge3NpZGV9ID0gdGhpcy5zdGF0ZTtcblxuXHRcdHZhciBjeE9iaiA9IHtcdFxuXHRcdFx0dW5pdDogISF1bml0LFxuXHRcdH07XG5cdFx0Y3hPYmpbc2lkZV0gPSB0cnVlO1xuXHRcdGlmICh1bml0KSB7XG5cdFx0XHRjeE9ialt1bml0XSA9IHRydWU7XG5cdFx0XHRjeE9ialtjb2xvcl0gPSB0cnVlO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2N4KGN4T2JqKX1cblx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLl9vbkNsaWNrU3F1YXJlfT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7Qm9hcmQ6IEdhbWVCb2FyZCwgQ2VsbDogQ2VsbH07IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcbmltcG9ydCBDbG9jayBmcm9tICcuL0Nsb2NrJztcbmltcG9ydCBDaGF0U3RvcmUgZnJvbSAnLi4vc3RvcmVzL0NoYXRTdG9yZSc7XG5pbXBvcnQgQ2hhdEFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9DaGF0QWN0aW9ucyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmNvbnN0IEdhbWVIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHBhcmFtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3doaXRlJywgJ2JsYWNrJ10pLmlzUmVxdWlyZWQsXG4gICAgb3Blbk1vZGFsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdhbWVPdmVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzT3Bwb25lbnRBdmFpbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbl0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiBvbWl0KENoYXRTdG9yZS5nZXRTdGF0ZSgpLCAnbWVzc2FnZXMnKTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgQ2hhdFN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYXRDaGFuZ2UpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBDaGF0U3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYXRDaGFuZ2UpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXMsIGdhbWVPdmVyLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdW5zZWVuQ291bnQgPSB0aGlzLnN0YXRlLnVuc2VlbkNvdW50O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cblxuICAgICAgICA8Q2xvY2tcbiAgICAgICAgICBpbz17aW99XG4gICAgICAgICAgcGFyYW1zPXtwYXJhbXN9IC8+XG5cbiAgICAgICAgPHNwYW4gaWQ9XCJnYW1lLXR5cGVcIj5cbiAgICAgICAgICB7YCR7cGFyYW1zWzFdfXwke3BhcmFtc1syXX1gfVxuICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuXCIgaHJlZj1cIi9cIj5OZXcgZ2FtZTwvYT5cblxuICAgICAgICB7IWdhbWVPdmVyICYmIGlzT3Bwb25lbnRBdmFpbGFibGUgP1xuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tLXJlZCByZXNpZ25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9vblJlc2lnbn0+XG4gICAgICAgICAgICBSZXNpZ25cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDpnYW1lT3ZlciA/XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi0tcmVkIHJlbWF0Y2hcIlxuICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uUmVtYXRjaH0+XG4gICAgICAgICAgICBSZW1hdGNoXG4gICAgICAgICAgPC9hPlxuICAgICAgICA6bnVsbH1cblxuICAgICAgICA8YSBpZD1cImNoYXQtaWNvblwiXG4gICAgICAgICAgIG9uQ2xpY2s9e0NoYXRBY3Rpb25zLnRvZ2dsZVZpc2liaWxpdHl9PlxuICAgICAgICAgIHt1bnNlZW5Db3VudCA/XG4gICAgICAgICAgICA8c3BhbiBpZD1cImNoYXQtY291bnRlclwiPlxuICAgICAgICAgICAgICB7dW5zZWVuQ291bnQgPCA5ID8gdW5zZWVuQ291bnQgOiAnOSsnfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDpudWxsfVxuICAgICAgICAgIDxpbWcgc3JjPVwiL2ltZy9jaGF0LnN2Z1wiXG4gICAgICAgICAgICAgICB3aWR0aD1cIjUwXCJcbiAgICAgICAgICAgICAgIGhlaWdodD1cIjUwXCIgLz5cbiAgICAgICAgICBDaGF0XG4gICAgICAgIDwvYT5cbiAgICAgIDwvaGVhZGVyPlxuICAgICk7XG4gIH0sXG4gIF9vbkNoYXRDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShvbWl0KENoYXRTdG9yZS5nZXRTdGF0ZSgpLCAnbWVzc2FnZXMnKSk7XG4gIH0sXG4gIF9vblJlc2lnbigpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtcywgY29sb3J9ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLmVtaXQoJ3Jlc2lnbicsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICBjb2xvcjogY29sb3JcbiAgICB9KTtcbiAgfSxcbiAgX29uUmVtYXRjaCgpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtcywgb3Blbk1vZGFsLCBpc09wcG9uZW50QXZhaWxhYmxlfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWlzT3Bwb25lbnRBdmFpbGFibGUpIHtcbiAgICAgIG9wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9wcG9uZW50IGhhcyBkaXNjb25uZWN0ZWQuIFlvdSBuZWVkIHRvICcgK1xuICAgICAgICAnZ2VuZXJhdGUgYSBuZXcgbGluay4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpby5lbWl0KCdyZW1hdGNoLW9mZmVyJywge1xuICAgICAgdG9rZW46IHBhcmFtc1swXVxuICAgIH0pO1xuICAgIG9wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9mZmVyIGhhcyBiZWVuIHNlbnQuJyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lSGVhZGVyOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZUhlYWRlciBmcm9tICcuL0dhbWVIZWFkZXInO1xuaW1wb3J0IENoYXQgZnJvbSAnLi9DaGF0JztcbmltcG9ydCBNb2RhbCBmcm9tICcuL01vZGFsJztcbmltcG9ydCBHYW1lQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL0dhbWVBY3Rpb25zJztcbmltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5pbXBvcnQgQ2hlc3Nib2FyZEludGVyZmFjZSBmcm9tICcuL0NoZXNzYm9hcmRJbnRlcmZhY2UnO1xuaW1wb3J0IEdhbWVib2FyZEludGVyZmFjZSBmcm9tICcuL0dhbWVib2FyZEludGVyZmFjZSc7XG5pbXBvcnQge01hcH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkJztcblxuY29uc3QgR2FtZUludGVyZmFjZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGlvOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgcGFyYW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNPcHBvbmVudEF2YWlsYWJsZTogZmFsc2UsXG4gICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgIG1vZGFsOiBNYXAoe1xuICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogJycsXG4gICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgaGlkZTogdGhpcy5faGlkZU1vZGFsLFxuICAgICAgICAgIGFjY2VwdDogdGhpcy5fYWNjZXB0UmVtYXRjaCxcbiAgICAgICAgICBkZWNsaW5lOiB0aGlzLl9kZWNsaW5lUmVtYXRjaFxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHNvdW5kc0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgZ2FtZU92ZXI6IEdhbWVTdG9yZS5nZXRTdGF0ZSgpLmdhbWVPdmVyXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3Qge2lvLCBwYXJhbXN9ID0gdGhpcy5wcm9wcztcblxuICAgIGlvLm9uKCd0b2tlbi1pbnZhbGlkJywgKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb2RhbDogdGhpcy5zdGF0ZS5tb2RhbFxuICAgICAgICAuc2V0KCdvcGVuJywgdHJ1ZSlcbiAgICAgICAgLnNldCgnbWVzc2FnZScsICdHYW1lIGxpbmsgaXMgaW52YWxpZCBvciBoYXMgZXhwaXJlZC4nKVxuICAgICAgICAuc2V0KCd0eXBlJywgJ2luZm8nKVxuICAgIH0pKTtcblxuICAgIGlvLmVtaXQoJ2pvaW4nLCB7XG4gICAgICB0b2tlbjogcGFyYW1zWzBdLFxuICAgICAgdGltZTogcGFyYW1zWzFdICogNjAsXG4gICAgICBpbmM6IHBhcmFtc1syXVxuICAgIH0pO1xuXG4gICAgaW8ub24oJ2pvaW5lZCcsIGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEuY29sb3IgPT09ICdibGFjaycpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29sb3I6ICdibGFjayd9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlvLm9uKCdib3RoLWpvaW5lZCcsICgpID0+XG4gICAgICB0aGlzLnNldFN0YXRlKHtpc09wcG9uZW50QXZhaWxhYmxlOiB0cnVlfSwgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb2xvciA9PT0gJ3doaXRlJykge1xuICAgICAgICAgIGlvLmVtaXQoJ2Nsb2NrLXJ1bicsIHtcbiAgICAgICAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICBpby5vbignZnVsbCcsICgpID0+IHtcbiAgICAgIHdpbmRvdy5hbGVydChcbiAgICAgICAgJ1RoaXMgZ2FtZSBhbHJlYWR5IGhhcyB0d28gcGxheWVycy4gWW91IGhhdmUgdG8gY3JlYXRlIGEgbmV3IG9uZS4nKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvJztcbiAgICB9KTtcblxuICAgIGlvLm9uKCdwbGF5ZXItcmVzaWduZWQnLCBkYXRhID0+IHtcbiAgICAgIEdhbWVBY3Rpb25zLmdhbWVPdmVyKHtcbiAgICAgICAgdHlwZTogJ3Jlc2lnbicsXG4gICAgICAgIHdpbm5lcjogZGF0YS5jb2xvciA9PT0gJ2JsYWNrJyA/ICdXaGl0ZScgOiAnQmxhY2snXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlvLm9uKCdyZW1hdGNoLW9mZmVyZWQnLCAoKSA9PlxuICAgICAgdGhpcy5fb3Blbk1vZGFsKCdvZmZlcicsICdZb3VyIG9wcG9uZW50IGhhcyBzZW50IHlvdSBhIHJlbWF0Y2ggb2ZmZXIuJykpO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtZGVjbGluZWQnLCAoKSA9PlxuICAgICAgdGhpcy5fb3Blbk1vZGFsKCdpbmZvJywgJ1JlbWF0Y2ggb2ZmZXIgaGFzIGJlZW4gZGVjbGluZWQuJykpO1xuXG4gICAgaW8ub24oJ3JlbWF0Y2gtYWNjZXB0ZWQnLCAoKSA9PiB7XG4gICAgICBHYW1lQWN0aW9ucy5yZW1hdGNoKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29sb3I6IHRoaXMuc3RhdGUuY29sb3IgPT09ICd3aGl0ZScgPyAnYmxhY2snIDogJ3doaXRlJyxcbiAgICAgICAgbW9kYWw6IHRoaXMuc3RhdGUubW9kYWwuc2V0KCdvcGVuJywgZmFsc2UpXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbG9yID09PSAnd2hpdGUnKSB7XG4gICAgICAgICAgaW8uZW1pdCgnY2xvY2stcnVuJywge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMucHJvcHMucGFyYW1zWzBdLFxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpby5vbignb3Bwb25lbnQtZGlzY29ubmVjdGVkJywgKCkgPT4gIHtcbiAgICAgIGlmICghdGhpcy5zdGF0ZS5nYW1lT3Zlci5nZXQoJ3N0YXR1cycpKSB7XG4gICAgICAgIHRoaXMuX29wZW5Nb2RhbCgnaW5mbycsICdZb3VyIG9wcG9uZW50IGhhcyBkaXNjb25uZWN0ZWQuJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzT3Bwb25lbnRBdmFpbGFibGU6IGZhbHNlfSk7XG4gICAgfSk7XG5cbiAgICBHYW1lU3RvcmUub24oJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIEdhbWVTdG9yZS5vZmYoJ2NoYW5nZScsIHRoaXMuX29uR2FtZUNoYW5nZSk7XG4gIH0sXG5cblxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2NvbG9yLCBzb3VuZHNFbmFibGVkLCBnYW1lT3ZlciwgaXNPcHBvbmVudEF2YWlsYWJsZX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNvbW1vblByb3BzID0ge1xuICAgICAgaW86IGlvLFxuICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgb3Blbk1vZGFsOiB0aGlzLl9vcGVuTW9kYWwsXG4gICAgICBpc09wcG9uZW50QXZhaWxhYmxlOiBpc09wcG9uZW50QXZhaWxhYmxlXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8R2FtZUhlYWRlclxuICAgICAgICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICAgICAgICBwYXJhbXM9e3BhcmFtc31cbiAgICAgICAgICBnYW1lT3Zlcj17Z2FtZU92ZXIuZ2V0KCdzdGF0dXMnKX0gLz5cblxuICAgICAgICA8Q2hhdFxuICAgICAgICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICAgICAgICB0b2tlbj17cGFyYW1zWzBdfVxuICAgICAgICAgIHNvdW5kc0VuYWJsZWQ9e3NvdW5kc0VuYWJsZWR9IC8+XG5cbiAgICAgICAgICB7LypcbiAgICAgICAgPENoZXNzYm9hcmRJbnRlcmZhY2VcbiAgICAgICAgICB7Li4uY29tbW9uUHJvcHN9XG4gICAgICAgICAgdG9rZW49e3BhcmFtc1swXX1cbiAgICAgICAgICBzb3VuZHNFbmFibGVkPXtzb3VuZHNFbmFibGVkfVxuICAgICAgICAgIGdhbWVPdmVyPXtnYW1lT3Zlcn0gLz5cbiAgICAgICAgKi99XG4gICAgICAgICAgXG4gICAgICAgIHsvKn1cbiAgICAgICAgPEJvYXJkIC8+XG4gICAgICAgICovfVxuXG4gICAgICAgICAgPEdhbWVib2FyZEludGVyZmFjZSAvPlxuXG5cblxuXG4gICAgICAgIDxNb2RhbCBkYXRhPXt0aGlzLnN0YXRlLm1vZGFsfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuXG5cblxuICBfb25HYW1lQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2dhbWVPdmVyOiBHYW1lU3RvcmUuZ2V0U3RhdGUoKS5nYW1lT3Zlcn0pO1xuICB9LFxuICBfb3Blbk1vZGFsKHR5cGUsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1vZGFsOiB0aGlzLnN0YXRlLm1vZGFsXG4gICAgICAgIC5zZXQoJ29wZW4nLCB0cnVlKVxuICAgICAgICAuc2V0KCdtZXNzYWdlJywgbWVzc2FnZSlcbiAgICAgICAgLnNldCgndHlwZScsIHR5cGUpXG4gICAgfSk7XG4gIH0sXG4gIF9oaWRlTW9kYWwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW9kYWw6IHRoaXMuc3RhdGUubW9kYWwuc2V0KCdvcGVuJywgZmFsc2UpfSk7XG4gIH0sXG4gIF9hY2NlcHRSZW1hdGNoKCkge1xuICAgIGNvbnN0IHtpbywgcGFyYW1zfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpby5lbWl0KCdyZW1hdGNoLWFjY2VwdCcsIHtcbiAgICAgIHRva2VuOiBwYXJhbXNbMF0sXG4gICAgICB0aW1lOiBwYXJhbXNbMV0gKiA2MCxcbiAgICAgIGluYzogcGFyYW1zWzJdXG4gICAgfSk7XG4gICAgdGhpcy5faGlkZU1vZGFsKCk7XG4gIH0sXG4gIF9kZWNsaW5lUmVtYXRjaCgpIHtcbiAgICBjb25zdCB7aW8sIHBhcmFtc30gPSB0aGlzLnByb3BzO1xuXG4gICAgaW8uZW1pdCgncmVtYXRjaC1kZWNsaW5lJywge1xuICAgICAgdG9rZW46IHBhcmFtc1swXVxuICAgIH0pO1xuICAgIHRoaXMuX2hpZGVNb2RhbCgpO1xuICB9LFxuICBfdG9nZ2xlU291bmRzKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNvdW5kc0VuYWJsZWQ6ICF0aGlzLnN0YXRlLnNvdW5kc0VuYWJsZWRcbiAgICB9KTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lSW50ZXJmYWNlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5pbXBvcnQgR2FtZVN0b3JlIGZyb20gJy4uL3N0b3Jlcy9HYW1lU3RvcmUnO1xuaW1wb3J0IEdhbWVBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvR2FtZUFjdGlvbnMnO1xuaW1wb3J0IG9uR2FtZUNoYW5nZSBmcm9tICcuLi9taXhpbnMvb25HYW1lQ2hhbmdlJztcbmltcG9ydCBDaGVzc2JvYXJkIGZyb20gJy4vQ2hlc3Nib2FyZCc7XG5pbXBvcnQge0JvYXJkfSBmcm9tICcuL0dhbWVCb2FyZCc7XG5pbXBvcnQgQ2FwdHVyZWRQaWVjZXMgZnJvbSAnLi9DYXB0dXJlZFBpZWNlcyc7XG5pbXBvcnQgVGFibGVPZk1vdmVzIGZyb20gJy4vVGFibGVPZk1vdmVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuLyogdGhlIHN0YXRlIG9mIHRoZSBnYW1lYm9hcmQgaXMgbWFuYWdlZCBieSBHYW1lU3RvcmUgKi9cblxuY29uc3QgR2FtZWJvYXJkSW50ZXJmYWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHByb3BUeXBlczoge1xuXG5cdH0sXG5cdG1peGluczogW10sXG5cdGdldEluaXRpYWxTdGF0ZSgpIHtcblx0XHRyZXR1cm4gR2FtZVN0b3JlLmdldFN0YXRlKCk7XG5cdH0sXG5cdGdldERlZmF1bHRQcm9wcygpIHtcblxuXHR9LFxuXHRjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG5cblx0fSxcblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtwcm9tb3Rpb24sIHR1cm4sIGdhbWVPdmVyLCBjaGVja30gPSB0aGlzLnN0YXRlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgaWQ9XCJib2FyZC1tb3Zlcy13cmFwcGVyXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cblx0XHRcdFx0PGRpdiBpZD1cImJvYXJkLXdyYXBwZXJcIj5cblxuXHRcdFx0XHRcdDxDYXB0dXJlZFBpZWNlcyAvPlxuXG5cdFx0XHRcdFx0PEJvYXJkIC8+XG5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZmVlZGJhY2tcIj5cblx0XHRcdFx0XHR7IWdhbWVPdmVyLmdldCgnc3RhdHVzJykgP1xuXHRcdFx0XHRcdFx0PHNwYW4+XG5cdFx0XHRcdFx0XHRcdHtgJHt0dXJuPT09J3cnID8gJ1doaXRlJyA6ICdCbGFjayd9IHRvIG1vdmUuYH1cblx0XHRcdFx0XHRcdDwvc3Bhbj4gOlxuXHRcdFx0XHRcdFx0PHN0cm9uZz5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiaWNvblwiPlxuXHRcdFx0XHRcdFx0XHQgIHtnYW1lT3Zlci5nZXQoJ3dpbm5lcicpID09PSAnV2hpdGUnID8gJ0YnIDogJ2YnfVxuXHRcdFx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdHt0aGlzLl9nZXRHYW1lT3Zlck1lc3NhZ2UoKX1cblx0XHRcdFx0XHRcdDwvc3Ryb25nPlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC9zcGFuPlxuXG5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fSxcblxuXHRfb25HYW1lQ2hhbmdlKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoR2FtZVN0b3JlLmdldFN0YXRlKCkpO1xuXHR9LFxuXG5cdF9nZXRHYW1lT3Zlck1lc3NhZ2UoKSB7XG5cdFx0cmV0dXJuIGB5b3UgbG9zZWA7XG5cdH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZEludGVyZmFjZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIHByb3BUeXBlczoge1xuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluXSxcblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgY29uc3QgaXNPcGVuID0gdGhpcy5wcm9wcy5kYXRhLmdldCgnb3BlbicpO1xuXG4gICAgaWYgKGlzT3BlbilcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleWRvd24pO1xuICAgIGVsc2VcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleWRvd24pO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcbiAgICBjb25zdCB0eXBlID0gZGF0YS5nZXQoJ3R5cGUnKTtcbiAgICBjb25zdCBjYWxsYmFja3MgPSBkYXRhLmdldCgnY2FsbGJhY2tzJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAnbW9kYWwtbWFzayc6IHRydWUsXG4gICAgICAgICAgICAgJ2hpZGRlbic6ICFkYXRhLmdldCgnb3BlbicpXG4gICAgICAgICAgIH0pfVxuICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9oaWRlTW9kYWx9PlxuICAgICAgICA8cD5cbiAgICAgICAgICA8c3Ryb25nPkVzYzogPC9zdHJvbmc+XG4gICAgICAgICAgPHNwYW4+e3R5cGUgPT09ICdpbmZvJyA/ICdPSycgOiAnRGVjbGluZSd9PC9zcGFuPlxuICAgICAgICAgIDxiciAvPlxuICAgICAgICAgIDxzdHJvbmc+RW50ZXI6IDwvc3Ryb25nPlxuICAgICAgICAgIDxzcGFuPnt0eXBlID09PSAnaW5mbycgPyAnT0snIDogJ0FjY2VwdCd9PC9zcGFuPlxuICAgICAgICA8L3A+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiXG4gICAgICAgICAgICAgb25DbGljaz17ZSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfT5cbiAgICAgICAgICA8cD57ZGF0YS5nZXQoJ21lc3NhZ2UnKX08L3A+XG5cbiAgICAgICAgICB7dHlwZSA9PT0gJ2luZm8nID8gXG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4gb2tcIlxuICAgICAgICAgICAgICAgb25DbGljaz17Y2FsbGJhY2tzLmhpZGV9PlxuICAgICAgICAgICAgICBPS1xuICAgICAgICAgICAgPC9hPiA6IFtcblxuICAgICAgICAgICAgPGEga2V5PVwiYVwiXG4gICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG5cIlxuICAgICAgICAgICAgICAgc3R5bGU9e3tsZWZ0OiAnNGVtJ319XG4gICAgICAgICAgICAgICBvbkNsaWNrPXtjYWxsYmFja3MuYWNjZXB0fT5cbiAgICAgICAgICAgICAgQWNjZXB0XG4gICAgICAgICAgICA8L2E+LFxuICAgICAgICAgICAgPGEga2V5PVwiYlwiXG4gICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLS1yZWRcIlxuICAgICAgICAgICAgICAgc3R5bGU9e3tyaWdodDogJzRlbSd9fVxuICAgICAgICAgICAgICAgb25DbGljaz17Y2FsbGJhY2tzLmRlY2xpbmV9PlxuICAgICAgICAgICAgICBEZWNsaW5lXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgXX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuICBfb25LZXlkb3duKGUpIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5wcm9wcy5kYXRhLmdldCgndHlwZScpO1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMucHJvcHMuZGF0YS5nZXQoJ2NhbGxiYWNrcycpO1xuXG4gICAgaWYgKHR5cGUgPT09ICdpbmZvJykge1xuICAgICAgaWYgKGUud2hpY2ggPT09IDEzIHx8IGUud2hpY2ggPT09IDI3KSB7XG4gICAgICAgIGNhbGxiYWNrcy5oaWRlKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2ZmZXInKSB7XG4gICAgICBpZiAoZS53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgY2FsbGJhY2tzLmFjY2VwdCgpO1xuICAgICAgfSBlbHNlIGlmIChlLndoaWNoID09PSAyNykge1xuICAgICAgICBjYWxsYmFja3MuZGVjbGluZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgX2hpZGVNb2RhbCgpIHtcbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0KCdjYWxsYmFja3MnKS5oaWRlKCk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBNb2RhbDsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdC9hZGRvbnMnO1xuaW1wb3J0IEdhbWVTdG9yZSBmcm9tICcuLi9zdG9yZXMvR2FtZVN0b3JlJztcbmltcG9ydCBvbkdhbWVDaGFuZ2UgZnJvbSAnLi4vbWl4aW5zL29uR2FtZUNoYW5nZSc7XG5cbmNvbnN0IFRhYmxlT2ZNb3ZlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW4sIG9uR2FtZUNoYW5nZV0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtb3ZlczogR2FtZVN0b3JlLmdldE1vdmVzKClcbiAgICB9O1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDx0YWJsZSBpZD1cIm1vdmVzXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cbiAgICAgICAgPHRoZWFkPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0aD5UYWJsZSBvZiBtb3ZlczwvdGg+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90aGVhZD5cbiAgICAgICAgPHRib2R5PlxuICAgICAgICAgIHt0aGlzLnN0YXRlLm1vdmVzLm1hcCgocm93LCBpKSA9PiAoXG4gICAgICAgICAgICA8dHIga2V5PXtpfT5cbiAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+e2Ake2kgKyAxfS5gfTwvc3Ryb25nPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICB7cm93Lm1hcCgobW92ZSwgaikgPT4gKFxuICAgICAgICAgICAgICAgIDx0ZCBrZXk9e2p9PlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e21vdmV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICkpLnRvQXJyYXkoKX1cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgKSkudG9BcnJheSgpfVxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC90YWJsZT5cbiAgICApO1xuICB9LFxuICBfb25HYW1lQ2hhbmdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbW92ZXM6IEdhbWVTdG9yZS5nZXRNb3ZlcygpXG4gICAgfSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBUYWJsZU9mTW92ZXM7IiwiaW1wb3J0IGtleU1pcnJvciBmcm9tICdyZWFjdC9saWIva2V5TWlycm9yJztcblxuZXhwb3J0IGRlZmF1bHQga2V5TWlycm9yKHtcbiAgVE9HR0xFX1ZJU0lCSUxJVFk6IG51bGwsXG4gIFNVQk1JVF9NRVNTQUdFOiBudWxsXG59KTsiLCJjb25zdCBDaGVzc1BpZWNlcyA9IHtcbiAgLy8ga2V5OiBwaWVjZSBmcm9tIEZFTiwgdmFsdWU6IHBpZWNlIGZyb20gU21hcnQgUmVndWxhciBjaGVzcyBmb250XG4gIC8vIHdoaXRlIHBpZWNlc1xuICAnSyc6ICdGJyxcbiAgJ1EnOiAnRScsXG4gICdSJzogJ0QnLFxuICAnQic6ICdDJyxcbiAgJ04nOiAnQicsXG4gICdQJzogJ0EnLFxuICAvLyBibGFjayBwaWVjZXNcbiAgJ2snOiAnZicsXG4gICdxJzogJ2UnLFxuICAncic6ICdkJyxcbiAgJ2InOiAnYycsXG4gICduJzogJ2InLFxuICAncCc6ICdhJyxcbiAgLy8gZW1wdHkgc3F1YXJlXG4gICctJzogdW5kZWZpbmVkXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGVzc1BpZWNlczsiLCJpbXBvcnQga2V5TWlycm9yIGZyb20gJ3JlYWN0L2xpYi9rZXlNaXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBrZXlNaXJyb3Ioe1xuICBNQUtFX01PVkU6IG51bGwsXG4gIFJFTUFUQ0g6IG51bGwsXG4gIERSQVc6IG51bGwsXG4gIEdBTUVfT1ZFUjogbnVsbCxcbiAgQ0hBTkdFX1BST01PVElPTjogbnVsbFxufSk7IiwiaW1wb3J0IHtEaXNwYXRjaGVyfSBmcm9tICdmbHV4JztcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihuZXcgRGlzcGF0Y2hlcigpLCB7XG4gIC8vIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gVGhlIGRhdGEgY29taW5nIGZyb20gdGhlIHZpZXcuXG4gIGhhbmRsZVZpZXdBY3Rpb246IGZ1bmN0aW9uKGFjdGlvbikge1xuICAgIHRoaXMuZGlzcGF0Y2goe1xuICAgICAgc291cmNlOiAnVklFV19BQ1RJT04nLFxuICAgICAgYWN0aW9uOiBhY3Rpb25cbiAgICB9KTtcbiAgfVxufSk7IiwiY29uc3QgVGlsZUFjdGlvbnMgPSB7XG4gICAgQXNzYXNzaW46IHtcbiAgICAgICAgZnJvbnQ6IHtcbiAgICAgICAgICAgICdbLTIsMF0nOiAnanVtcCBzbGlkZScsXG4gICAgICAgICAgICAnWzIsLTJdJzogJ2p1bXAgc2xpZGUnLFxuICAgICAgICAgICAgJ1syLDJdJzogJ2p1bXAgc2xpZGUnXG4gICAgICAgIH0sXG4gICAgICAgIGJhY2s6IHtcbiAgICAgICAgICAgICdbLTIsLTJdJzogJ2p1bXAgc2xpZGUnLFxuICAgICAgICAgICAgJ1stMiwyXSc6ICdqdW1wIHNsaWRlJyxcbiAgICAgICAgICAgICdbMiwwXSc6ICdqdW1wIHNsaWRlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBCb3dtYW46IHtcbiAgICAgICAgZnJvbnQ6IHtcbiAgICAgICAgICAgICdbLTEsMF0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzAsMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzAsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLC0yXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMCwyXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMiwwXSc6ICdqdW1wJ1xuICAgICAgICB9LFxuICAgICAgICBiYWNrOiB7XG4gICAgICAgICAgICAnWy0xLDBdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1sxLCAtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzEsIDFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMSwgLTFdJzogJ3N0cmlrZScsXG4gICAgICAgICAgICAnWy0yLCAwXSc6ICdzdHJpa2UnLFxuICAgICAgICAgICAgJ1stMSwgMV0nOiAnc3RyaWtlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBDaGFtcGlvbjoge1xuICAgICAgICBmcm9udDoge1xuICAgICAgICAgICAgJ1stMSwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMCwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMCwtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWy0yLDBdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1swLDJdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1syLDBdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1swLC0yXSc6ICdqdW1wJ1xuICAgICAgICB9LFxuICAgICAgICBiYWNrOiB7XG4gICAgICAgICAgICdbLTEsMF0nOiAnc3RyaWtlJyxcbiAgICAgICAgICAgICdbMCwxXSc6ICdzdHJpa2UnLFxuICAgICAgICAgICAgJ1sxLDBdJzogJ3N0cmlrZScsXG4gICAgICAgICAgICAnWzAsLTFdJzogJ3N0cmlrZScsXG4gICAgICAgICAgICAnWy0yLDBdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1swLDJdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1syLDBdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1swLC0yXSc6ICdqdW1wJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBEcmFnb29uOiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWzAsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLDFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMiwtMl0nOiAnc3RyaWtlJyxcbiAgICAgICAgICAgICdbLTIsMF0nOiAnc3RyaWtlJyxcbiAgICAgICAgICAgICdbLTIsMl0nOiAnc3RyaWtlJ1xuICAgICAgICB9LFxuICAgICAgICBiYWNrOiB7XG4gICAgICAgICAgICAnWy0xLDBdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMiwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbLTIsLTFdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1stMiwxXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMSwgLTFdJzogJ3NsaWRlJyxcbiAgICAgICAgICAgICdbMSwgMV0nOiAnc2xpZGUnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIER1Y2hlc3M6IHtcbiAgICAgICAgZnJvbnQ6IHtcbiAgICAgICAgICAgICdbMCwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMCwtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzIsMF0nOiAnbW92ZSdcbiAgICAgICAgfSxcbiAgICAgICAgYmFjazoge1xuICAgICAgICAgICAnWzAsMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzAsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1syLDBdJzogJ21vdmUnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIER1a2U6IHtcbiAgICAgICAgZnJvbnQ6IHtcbiAgICAgICAgICAgICdbMCwtMV0nOiAnc2xpZGUnLFxuICAgICAgICAgICAgJ1swLDFdJzogJ3NsaWRlJyAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIGJhY2s6IHtcbiAgICAgICAgICAgICdbLTEsMF0nOiAnc2xpZGUnLFxuICAgICAgICAgICAgJ1sxLDBdJzogJ3NsaWRlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBGb290bWFuOiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWzEsMF0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWy0xLDBdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLDFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLC0xXSc6ICdtb3ZlJ1xuICAgICAgICB9LFxuICAgICAgICBiYWNrOiB7XG4gICAgICAgICAgICAnWy0yLDBdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1sxLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbLTEsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMSwxXSc6ICdtb3ZlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBLbmlnaHQ6IHtcbiAgICAgICAgZnJvbnQ6IHtcbiAgICAgICAgICAgICdbLTIsLTFdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1stMiwxXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMCwtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzAsMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzEsMF0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzIsMF0nOiAnbW92ZSdcbiAgICAgICAgfSxcbiAgICAgICAgYmFjazoge1xuICAgICAgICAgICAgJ1stMSwwXSc6ICdzbGlkZScsXG4gICAgICAgICAgICAnWzEsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1sxLDFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1syLC0yXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMiwyXSc6ICdtb3ZlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBMb25nYm93bWFuOiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWy0xLDBdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLDFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1sxLDBdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLC0xXSc6ICdtb3ZlJ1xuICAgICAgICB9LFxuICAgICAgICBiYWNrOiB7XG4gICAgICAgICAgICdbLTIsMF0nOiAnc3RyaWtlJyxcbiAgICAgICAgICAgJ1stMywwXSc6ICdzdHJpa2UnLFxuICAgICAgICAgICAnWzEsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAnWzEsMV0nOiAnbW92ZScsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIE1hcnNoYWxsOiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWzAsLTFdJzogJ3NsaWRlJyxcbiAgICAgICAgICAgICdbMCwxXSc6ICdzbGlkZScsXG4gICAgICAgICAgICAnWy0yLC0yXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbLTIsMl0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzIsMF0nOiAnanVtcCdcbiAgICAgICAgfSxcbiAgICAgICAgYmFjazoge1xuICAgICAgICAgICAgJ1stMSwtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWy0xLDBdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMSwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMCwtMl0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzAsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLDFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLDJdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1sxLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwxXSc6ICdtb3ZlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBPcmFjbGU6IHtcbiAgICAgICAgZnJvbnQ6IHtcbiAgICAgICAgICAgICdbLTEsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMSwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzEsMV0nOiAnbW92ZSdcbiAgICAgICAgfSxcbiAgICAgICAgYmFjazoge31cbiAgICB9LFxuICAgIFBpa2VtYW46IHtcbiAgICAgICAgZnJvbnQ6IHtcbiAgICAgICAgICAgICdbLTIsLTJdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMSwtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWy0xLDFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMiwyXSc6ICdtb3ZlJ1xuICAgICAgICB9LFxuICAgICAgICBiYWNrOiB7XG4gICAgICAgICAgICAnWy0yLC0xXSc6ICdzdHJpa2UnLFxuICAgICAgICAgICAgJ1stMiwxXSc6ICdzdHJpa2UnLFxuICAgICAgICAgICAgJ1stMSwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMiwwXSc6ICdtb3ZlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBQcmllc3Q6IHtcbiAgICAgICAgZnJvbnQ6IHtcbiAgICAgICAgICAgICdbLTEsLTFdJzogJ3NsaWRlJyxcbiAgICAgICAgICAgICdbLTEsMV0nOiAnc2xpZGUnLFxuICAgICAgICAgICAgJ1sxLC0xXSc6ICdzbGlkZScsXG4gICAgICAgICAgICAnWzEsMV0nOiAnc2xpZGUnXG4gICAgICAgIH0sXG4gICAgICAgIGJhY2s6IHtcbiAgICAgICAgICAgJ1stMSwtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWy0xLDFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1sxLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwxXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbLTIsLTJdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1stMiwyXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMiwtMl0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzIsMl0nOiAnanVtcCdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUmFuZ2VyOiB7XG4gICAgICAgIGZyb250OiB7XG4gICAgICAgICAgICAnWy0xLDBdJzogJ3NsaWRlJyxcbiAgICAgICAgICAgICdbMSwwXSc6ICdzbGlkZScsXG4gICAgICAgICAgICAnWy0yLC0xXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbLTIsMV0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWy0xLC0yXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbLTEsMl0nOiAnanVtcCdcbiAgICAgICAgfSxcbiAgICAgICAgYmFjazoge1xuICAgICAgICAgICAnWy0xLC0xXSc6ICdzbGlkZScsXG4gICAgICAgICAgICAnWy0xLDFdJzogJ3NsaWRlJyxcbiAgICAgICAgICAgICdbMiwtMV0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzIsMV0nOiAnanVtcCcsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFNlZXI6IHtcbiAgICAgICAgZnJvbnQ6IHtcbiAgICAgICAgICAgICdbLTIsMF0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzAsMl0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzIsMF0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzAsLTJdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1stMSwtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWy0xLDFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1sxLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwxXSc6ICdtb3ZlJ1xuICAgICAgICB9LFxuICAgICAgICBiYWNrOiB7XG4gICAgICAgICAgICAnWy0yLC0yXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbLTIsMl0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzIsLTJdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1syLDJdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1stMSwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMCwtMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzAsMV0nOiAnbW92ZSdcblxuICAgICAgICB9XG4gICAgfSxcbiAgICBXaXphcmQ6IHtcbiAgICAgICAgZnJvbnQ6IHtcbiAgICAgICAgICAgICdbLTEsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1stMSwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbLTEsMV0nOiAnbW92ZScsXG4gICAgICAgICAgICAnWzAsLTFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1swLDFdJzogJ21vdmUnLFxuICAgICAgICAgICAgJ1sxLC0xXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwwXSc6ICdtb3ZlJyxcbiAgICAgICAgICAgICdbMSwxXSc6ICdtb3ZlJyxcbiAgICAgICAgfSxcbiAgICAgICAgYmFjazoge1xuICAgICAgICAgICAgJ1stMiwtMl0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWy0yLDBdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1stMiwyXSc6ICdqdW1wJyxcbiAgICAgICAgICAgICdbMCwtMl0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzAsMl0nOiAnanVtcCcsXG4gICAgICAgICAgICAnWzIsLTJdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1syLDBdJzogJ2p1bXAnLFxuICAgICAgICAgICAgJ1syLDJdJzogJ2p1bXAnLFxuICAgICAgICB9XG4gICAgfSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGlsZUFjdGlvbnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5jb25zdCBPUklHSU4gPSAnaHR0cDovL2xvY2FsaG9zdDoxMzM3JztcbmNvbnN0IFdTID0gT1JJR0lOO1xuXG5leHBvcnQgZGVmYXVsdCBpby5jb25uZWN0KFdTKTsiLCJjb25zdCBtYXliZVJldmVyc2UgPSB7XG4gIF9tYXliZVJldmVyc2UoaXRlcmFibGUsIGNvbG9yKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY29sb3IgPT09IChjb2xvciB8fCAnYmxhY2snKSA/XG4gICAgICBpdGVyYWJsZS5yZXZlcnNlKCkgOiBpdGVyYWJsZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWF5YmVSZXZlcnNlOyIsImltcG9ydCBHYW1lU3RvcmUgZnJvbSAnLi4vc3RvcmVzL0dhbWVTdG9yZSc7XG5cbmNvbnN0IG9uR2FtZUNoYW5nZSA9IHtcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgR2FtZVN0b3JlLm9uKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBHYW1lU3RvcmUub2ZmKCdjaGFuZ2UnLCB0aGlzLl9vbkdhbWVDaGFuZ2UpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBvbkdhbWVDaGFuZ2U7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIyIGFzIEV2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRlbWl0dGVyMic7XG5pbXBvcnQgQ2hhdENvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMvQ2hhdENvbnN0YW50cyc7XG5pbXBvcnQge0xpc3QsIE1hcH0gZnJvbSAnaW1tdXRhYmxlJztcblxuY29uc3QgQ0hBTkdFX0VWRU5UID0gJ2NoYW5nZSc7XG4gIFxudmFyIF9tZXNzYWdlcyA9IExpc3QoKTtcbnZhciBfdW5zZWVuQ291bnQgPSAwO1xudmFyIF9pc0NoYXRIaWRkZW4gPSB0cnVlO1xuXG5jb25zdCBDaGF0U3RvcmUgPSBPYmplY3QuYXNzaWduKHt9LCBFdmVudEVtaXR0ZXIucHJvdG90eXBlLCB7XG4gIGdldFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlczogX21lc3NhZ2VzLFxuICAgICAgdW5zZWVuQ291bnQ6IF91bnNlZW5Db3VudCxcbiAgICAgIGlzQ2hhdEhpZGRlbjogX2lzQ2hhdEhpZGRlblxuICAgIH07XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiB0b2dnbGVWaXNpYmlsaXR5KCkge1xuICBfaXNDaGF0SGlkZGVuID0gIV9pc0NoYXRIaWRkZW47XG4gIF91bnNlZW5Db3VudCA9IDA7XG59XG5cbmZ1bmN0aW9uIHN1Ym1pdE1lc3NhZ2UobWVzc2FnZSwgY2xhc3NOYW1lLCByZWNlaXZlZCkge1xuICBfbWVzc2FnZXMgPSBfbWVzc2FnZXMucHVzaChNYXAoe1xuICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVcbiAgfSkpO1xuXG4gIGlmIChyZWNlaXZlZCAmJiBfaXNDaGF0SGlkZGVuKSB7XG4gICAgX3Vuc2VlbkNvdW50ICs9IDE7XG4gIH1cbn1cblxuQXBwRGlzcGF0Y2hlci5yZWdpc3RlcihwYXlsb2FkID0+IHtcbiAgY29uc3QgYWN0aW9uID0gcGF5bG9hZC5hY3Rpb247XG5cbiAgc3dpdGNoIChhY3Rpb24uYWN0aW9uVHlwZSkge1xuICAgIGNhc2UgQ2hhdENvbnN0YW50cy5UT0dHTEVfVklTSUJJTElUWTpcbiAgICAgIHRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBDaGF0Q29uc3RhbnRzLlNVQk1JVF9NRVNTQUdFOlxuICAgICAgc3VibWl0TWVzc2FnZShhY3Rpb24ubWVzc2FnZSwgYWN0aW9uLmNsYXNzTmFtZSwgYWN0aW9uLnJlY2VpdmVkKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgQ2hhdFN0b3JlLmVtaXQoQ0hBTkdFX0VWRU5UKTtcbiAgcmV0dXJuIHRydWU7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdFN0b3JlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyMiBhcyBFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50ZW1pdHRlcjInO1xuaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzL0dhbWVDb25zdGFudHMnO1xuaW1wb3J0IENoZXNzUGllY2VzIGZyb20gJy4uL2NvbnN0YW50cy9DaGVzc1BpZWNlcyc7XG5pbXBvcnQge0NoZXNzfSBmcm9tICdjaGVzcy5qcyc7XG5pbXBvcnQge0xpc3QsIE1hcCwgT3JkZXJlZE1hcCwgU2V0fSBmcm9tICdpbW11dGFibGUnO1xuLy8gaW1wb3J0IGJlaGF2aW9yIGZyb20gJy4uL2dhbWUvYmVoYXZpb3InO1xuXG5jb25zdCBDSEFOR0VfRVZFTlQgPSAnY2hhbmdlJztcbmNvbnN0IE1PVkVfRVZFTlQgPSAnbmV3LW1vdmUnO1xuICBcbnZhciBfZ2FtZU92ZXI7XG52YXIgX2NhcHR1cmVkUGllY2VzO1xudmFyIF9tb3ZlcztcbnZhciBfcHJvbW90aW9uO1xudmFyIF90dXJuO1xudmFyIF9jaGVjaztcbnZhciBfbGFzdE1vdmU7XG52YXIgX2NoZXNzO1xuXG5zZXRJbml0aWFsU3RhdGUoKTtcblxuY29uc3QgR2FtZVN0b3JlID0gT2JqZWN0LmFzc2lnbih7fSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2FtZU92ZXI6IF9nYW1lT3ZlcixcbiAgICAgIHByb21vdGlvbjogX3Byb21vdGlvbixcbiAgICAgIHR1cm46IF90dXJuLFxuICAgICAgY2hlY2s6IF9jaGVja1xuICAgIH07XG4gIH0sXG4gIGdldENhcHR1cmVkUGllY2VzKCkge1xuICAgIHJldHVybiBfY2FwdHVyZWRQaWVjZXM7XG4gIH0sXG4gIGdldE1vdmVzKCkge1xuICAgIHJldHVybiBfbW92ZXM7XG4gIH0sXG4gIGdldENoZXNzYm9hcmRTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmVuOiBfY2hlc3MuZmVuKCksXG4gICAgICBsYXN0TW92ZTogX2xhc3RNb3ZlLFxuICAgICAgY2hlY2s6IF9jaGVja1xuICAgIH07XG4gIH0sXG5cblxuZ2V0R2FtZWJvYXJkU3RhdGUoKSB7XG4gIHZhciBpbml0aWFsQm9hcmQgPSB7XG4gICAgJ1sxLCAwXScgOiBbXCJGb290bWFuXCIsXCJibGFja1wiXSxcbiAgICAnWzIsIDBdJyA6IFtcIkR1a2VcIixcImJsYWNrXCJdLFxuICAgICdbMywgMF0nIDogW1wiRm9vdG1hblwiLFwiYmxhY2tcIl0sXG4gICAgJ1syLCA1XSc6IFtcIkZvb3RtYW5cIixcIndoaXRlXCJdLFxuICAgICdbMywgNV0nIDogW1wiRHVrZVwiLCBcIndoaXRlXCJdLFxuICAgICdbNCwgNV0nIDogW1wiRm9vdG1hblwiLCBcIndoaXRlXCJdXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBzZXR1cDogaW5pdGlhbEJvYXJkXG4gIH1cbn0sXG5cblxuICBnZXRWYWxpZE1vdmVzKHNxdWFyZSkge1xuICAgIHJldHVybiBzcXVhcmUgPyBTZXQoXG4gICAgICBfY2hlc3MubW92ZXMoe1xuICAgICAgICBzcXVhcmU6IHNxdWFyZSxcbiAgICAgICAgdmVyYm9zZTogdHJ1ZVxuICAgICAgfSkubWFwKG1vdmUgPT4gbW92ZS50bykpIDogU2V0KCk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBzZXRJbml0aWFsU3RhdGUoKSB7XG4gIF9nYW1lT3ZlciA9IE1hcCh7XG4gICAgc3RhdHVzOiBmYWxzZSxcbiAgICB0eXBlOiBudWxsLFxuICAgIHdpbm5lcjogbnVsbFxuICB9KTtcbiAgX2NhcHR1cmVkUGllY2VzID0gT3JkZXJlZE1hcChbXG4gICAgWyd3JywgTGlzdCgpXSxcbiAgICBbJ2InLCBMaXN0KCldXG4gIF0pO1xuICBfbW92ZXMgPSBMaXN0KCk7XG4gIF9wcm9tb3Rpb24gPSAncSc7XG4gIF90dXJuID0gJ3cnO1xuICBfY2hlY2sgPSBmYWxzZTtcbiAgX2xhc3RNb3ZlID0gTWFwKCk7XG4gIF9jaGVzcyA9IG5ldyBDaGVzcygpO1xufVxuXG5mdW5jdGlvbiBkcmF3KCkge1xuICBcbn1cblxuZnVuY3Rpb24gbWFrZU1vdmUoZnJvbSwgdG8sIGNhcHR1cmUsIGVtaXRNb3ZlKSB7XG4gIGNvbnN0IG1vdmUgPSBfY2hlc3MubW92ZSh7XG4gICAgZnJvbTogZnJvbSxcbiAgICB0bzogdG8sXG4gICAgcHJvbW90aW9uOiBfcHJvbW90aW9uXG4gIH0pO1xuXG4gIGlmICghbW92ZSkge1xuICAgIC8vIG1vdmUgaXMgbm90IHZhbGlkLCByZXR1cm4gZmFsc2UgYW5kIGRvbid0IGVtaXQgYW55IGV2ZW50LlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIF90dXJuID0gX2NoZXNzLnR1cm4oKTtcbiAgX2NoZWNrID0gX2NoZXNzLmluX2NoZWNrKCk7XG4gIF9sYXN0TW92ZSA9IF9sYXN0TW92ZS5zZXQoJ2Zyb20nLCBmcm9tKS5zZXQoJ3RvJywgdG8pO1xuICBfbW92ZXMgPSBfbW92ZXMuaXNFbXB0eSgpIHx8IF9tb3Zlcy5sYXN0KCkuc2l6ZSA9PT0gMiA/XG4gICAgX21vdmVzLnB1c2goTGlzdChbbW92ZS5zYW5dKSkgOlxuICAgIF9tb3Zlcy51cGRhdGUoX21vdmVzLnNpemUgLSAxLCBsaXN0ID0+IGxpc3QucHVzaChtb3ZlLnNhbikpO1xuXG4gIGlmIChjYXB0dXJlIHx8IG1vdmUuZmxhZ3MgPT09ICdlJykge1xuICAgIGNvbnN0IGNhcHR1cmVkUGllY2UgPSBjYXB0dXJlIHx8XG4gICAgICBDaGVzc1BpZWNlc1tfdHVybiA9PT0gJ3cnID8gJ1AnIDogJ3AnXTsgLy8gZW4gcGFzc2FudFxuXG4gICAgX2NhcHR1cmVkUGllY2VzID0gX2NhcHR1cmVkUGllY2VzXG4gICAgICAudXBkYXRlKF90dXJuLCBsaXN0ID0+IGxpc3QucHVzaChjYXB0dXJlZFBpZWNlKSk7XG4gIH1cblxuICBpZiAoX2NoZXNzLmdhbWVfb3ZlcigpKSB7XG4gICAgY29uc3QgdHlwZSA9IF9jaGVzcy5pbl9jaGVja21hdGUoKSA/ICdjaGVja21hdGUnIDpcbiAgICAgIF9jaGVzcy5pbl9zdGFsZW1hdGUoKSA/ICdzdGFsZW1hdGUnIDpcbiAgICAgIF9jaGVzcy5pbl90aHJlZWZvbGRfcmVwZXRpdGlvbigpID8gJ3RocmVlZm9sZFJlcGV0aXRpb24nIDpcbiAgICAgIF9jaGVzcy5pbnN1ZmZpY2llbnRfbWF0ZXJpYWwoKSA/ICdpbnN1ZmZpY2llbnRNYXRlcmlhbCcgOlxuICAgICAgX2NoZXNzLmluX2RyYXcoKSA/ICdkcmF3JyA6IG51bGw7XG5cbiAgICBnYW1lT3Zlcih7XG4gICAgICB3aW5uZXI6IF90dXJuID09PSAnYicgPyAnV2hpdGUnIDogJ0JsYWNrJyxcbiAgICAgIHR5cGU6IHR5cGVcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChlbWl0TW92ZSkge1xuICAgIEdhbWVTdG9yZS5lbWl0KE1PVkVfRVZFTlQsIHtcbiAgICAgIGZyb206IGZyb20sXG4gICAgICB0bzogdG8sXG4gICAgICBjYXB0dXJlOiBjYXB0dXJlLFxuICAgICAgZ2FtZU92ZXI6IF9jaGVzcy5nYW1lX292ZXIoKVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdhbWVPdmVyKG9wdGlvbnMpIHtcbiAgX2dhbWVPdmVyID0gX2dhbWVPdmVyXG4gICAgLnNldCgnc3RhdHVzJywgdHJ1ZSlcbiAgICAuc2V0KCd3aW5uZXInLCBvcHRpb25zLndpbm5lcilcbiAgICAuc2V0KCd0eXBlJywgb3B0aW9ucy50eXBlKTtcbn1cblxuQXBwRGlzcGF0Y2hlci5yZWdpc3RlcihwYXlsb2FkID0+IHtcbiAgY29uc3QgYWN0aW9uID0gcGF5bG9hZC5hY3Rpb247XG4gIGxldCBlbWl0RXZlbnQgPSB0cnVlO1xuXG4gIHN3aXRjaCAoYWN0aW9uLmFjdGlvblR5cGUpIHtcbiAgICBjYXNlIEdhbWVDb25zdGFudHMuTUFLRV9NT1ZFOlxuICAgICAgZW1pdEV2ZW50ID0gbWFrZU1vdmUoXG4gICAgICAgIGFjdGlvbi5mcm9tLCBhY3Rpb24udG8sIGFjdGlvbi5jYXB0dXJlLCBhY3Rpb24uZW1pdE1vdmUpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEdhbWVDb25zdGFudHMuQ0hBTkdFX1BST01PVElPTjpcbiAgICAgIF9wcm9tb3Rpb24gPSBhY3Rpb24ucHJvbW90aW9uO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEdhbWVDb25zdGFudHMuRFJBVzpcblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEdhbWVDb25zdGFudHMuR0FNRV9PVkVSOlxuICAgICAgZ2FtZU92ZXIoYWN0aW9uLm9wdGlvbnMpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEdhbWVDb25zdGFudHMuUkVNQVRDSDpcbiAgICAgIHNldEluaXRpYWxTdGF0ZSgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoZW1pdEV2ZW50KSB7XG4gICAgR2FtZVN0b3JlLmVtaXQoQ0hBTkdFX0VWRU5UKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lU3RvcmU7Il19
