(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/js/index.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var io = _interopRequire(require("./io"));

var Index = _interopRequire(require("./components/Index"));

React.render(React.createElement(Index, { io: io }), document.getElementById("container"));

},{"./components/Index":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\Index.js","./io":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\io.js","react":"react"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\browserify\\node_modules\\os-browserify\\browser.js":[function(require,module,exports){
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

},{}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\CreateGameForm.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react/addons"));

var CreateGameForm = React.createClass({
  displayName: "CreateGameForm",

  propTypes: {
    link: React.PropTypes.string.isRequired,
    time: React.PropTypes.string.isRequired,
    inc: React.PropTypes.string.isRequired,
    onChangeForm: React.PropTypes.func.isRequired,
    createGame: React.PropTypes.func.isRequired
  },
  mixins: [React.addons.PureRenderMixin],

  render: function render() {
    return React.createElement(
      "form",
      { onSubmit: this.props.createGame },
      React.createElement(
        "fieldset",
        null,
        React.createElement(
          "label",
          null,
          React.createElement(
            "span",
            null,
            "Minutes per side: "
          ),
          React.createElement("input", {
            type: "number",
            name: "time",
            value: this.props.time,
            onChange: this.props.onChangeForm,
            min: "1",
            max: "50",
            required: true })
        ),
        React.createElement(
          "label",
          { style: { paddingLeft: "2em" } },
          React.createElement(
            "span",
            null,
            "Increment in seconds: "
          ),
          React.createElement("input", {
            type: "number",
            name: "inc",
            value: this.props.inc,
            onChange: this.props.onChangeForm,
            min: "0",
            max: "50",
            required: true })
        )
      ),
      React.createElement("input", {
        id: "game-link",
        type: "text",
        value: this.props.link || "Game link will be generated here.",
        onClick: function (e) {
          return e.target.select();
        },
        readOnly: true }),
      React.createElement(
        "button",
        { type: "submit", className: "btn" },
        "Play"
      )
    );
  }
});

module.exports = CreateGameForm;

},{"react/addons":"react/addons"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\Index.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var React = _interopRequire(require("react"));

var CreateGameForm = _interopRequire(require("./CreateGameForm"));

var io = _interopRequire(require("../io"));

var Index = React.createClass({
  displayName: "Index",

  propTypes: {
    io: React.PropTypes.object.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      link: "",
      hasExpired: false,
      time: "30",
      inc: "0"
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var io = this.props.io;

    io.on("created", function (data) {
      var _state = _this.state;
      var time = _state.time;
      var inc = _state.inc;

      var loc = window.location;

      var origin = loc.origin || "" + loc.protocol + "//" + loc.hostname + (loc.port ? ":" + loc.port : "");

      _this.setState({
        link: "" + origin + "/play/" + data.token + "/" + time + "/" + inc,
        hasExpired: false
      });
    });
    io.on("ready", function () {
      window.location = _this.state.link;
    });
    io.on("token-expired", function () {
      return _this.setState({ hasExpired: true });
    });
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement("img", { src: "/img/shougun.png",
        width: "122",
        height: "122",
        className: "shougun" }),
      React.createElement(
        "h1",
        null,
        "Shogun"
      ),
      React.createElement(
        "div",
        { id: "create-game" },
        React.createElement(CreateGameForm, {
          link: this.state.link,
          time: this.state.time,
          inc: this.state.inc,
          onChangeForm: this._onChangeForm,
          createGame: this._createGame }),
        React.createElement(
          "p",
          { id: "game-status" },
          this.state.hasExpired ? "Game link has expired, generate a new one" : this.state.link ? "Waiting for opponent to connect" : null
        )
      ),
      React.createElement(
        "p",
        null,
        "Click the Play button to create a new game, then send the generated URL to a friend. The game will begin once your friend opens the link in his or her browser. Each player will be randomly assigned to be White or Black."
      ),
      React.createElement(
        "p",
        null,
        React.createElement(
          "a",
          { href: "/about", className: "alpha" },
          "Read more about Shogun"
        )
      )
    );
  },

  _onChangeForm: function _onChangeForm(e) {
    this.setState(_defineProperty({}, e.target.name, e.target.value));
  },
  _createGame: function _createGame(e) {
    e.preventDefault();

    var _state = this.state;
    var time = _state.time;
    var inc = _state.inc;

    var isInvalid = [time, inc].some(function (val) {
      val = parseInt(val, 10);
      return isNaN(val) || val < 0 || val > 50;
    });

    if (isInvalid) {
      // fallback for old browsers
      return window.alert("Form is invalid. Enter numbers between 0 and 50.");
    } else {
      this.props.io.emit("start");
    }
  }
});

module.exports = Index;

},{"../io":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\io.js","./CreateGameForm":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\components\\CreateGameForm.js","react":"react"}],"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\src\\js\\io.js":[function(require,module,exports){
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
},{"_process":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\browserify\\node_modules\\process\\browser.js","os":"C:\\Users\\Jay\\Desktop\\JS\\shogun-v2\\node_modules\\browserify\\node_modules\\os-browserify\\browser.js","socket.io-client":"socket.io-client"}]},{},["./src/js/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL29zLWJyb3dzZXJpZnkvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ3JlYXRlR2FtZUZvcm0uanMiLCJDOi9Vc2Vycy9KYXkvRGVza3RvcC9KUy9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvSW5kZXguanMiLCJzcmMvanMvaW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7SUFFTixLQUFLLDJCQUFNLE9BQU87O0lBQ2xCLEVBQUUsMkJBQU0sTUFBTTs7SUFDZCxLQUFLLDJCQUFNLG9CQUFvQjs7QUFFdEMsS0FBSyxDQUFDLE1BQU0sQ0FDVixvQkFBQyxLQUFLLElBQUMsRUFBRSxFQUFFLEVBQUUsQUFBQyxHQUFHLEVBQ2pCLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQ3JDLENBQUM7OztBQ1RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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RyxFQUFJO0FBQ3hDLFNBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLGFBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztLQUMxQyxDQUFDLENBQUM7O0FBRUgsUUFBSSxTQUFTLEVBQUU7O0FBRWIsYUFBTyxNQUFNLENBQUMsS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7S0FDekUsTUFBTTtBQUNMLFVBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUM3QjtHQUNGO0NBQ0YsQ0FBQyxDQUFDOztpQkFFWSxLQUFLOzs7QUNuR3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgaW8gZnJvbSAnLi9pbyc7XHJcbmltcG9ydCBJbmRleCBmcm9tICcuL2NvbXBvbmVudHMvSW5kZXgnO1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxJbmRleCBpbz17aW99IC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKVxyXG4pOyIsImV4cG9ydHMuZW5kaWFubmVzcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdMRScgfTtcblxuZXhwb3J0cy5ob3N0bmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gbG9jYXRpb24uaG9zdG5hbWVcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gJyc7XG59O1xuXG5leHBvcnRzLmxvYWRhdmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXSB9O1xuXG5leHBvcnRzLnVwdGltZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDAgfTtcblxuZXhwb3J0cy5mcmVlbWVtID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBOdW1iZXIuTUFYX1ZBTFVFO1xufTtcblxuZXhwb3J0cy50b3RhbG1lbSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcbn07XG5cbmV4cG9ydHMuY3B1cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdIH07XG5cbmV4cG9ydHMudHlwZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdCcm93c2VyJyB9O1xuXG5leHBvcnRzLnJlbGVhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufTtcblxuZXhwb3J0cy5uZXR3b3JrSW50ZXJmYWNlc1xuPSBleHBvcnRzLmdldE5ldHdvcmtJbnRlcmZhY2VzXG49IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHt9IH07XG5cbmV4cG9ydHMuYXJjaCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdqYXZhc2NyaXB0JyB9O1xuXG5leHBvcnRzLnBsYXRmb3JtID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJ2Jyb3dzZXInIH07XG5cbmV4cG9ydHMudG1wZGlyID0gZXhwb3J0cy50bXBEaXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICcvdG1wJztcbn07XG5cbmV4cG9ydHMuRU9MID0gJ1xcbic7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IHRydWU7XG4gICAgdmFyIGN1cnJlbnRRdWV1ZTtcbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgdmFyIGkgPSAtMTtcbiAgICAgICAgd2hpbGUgKCsraSA8IGxlbikge1xuICAgICAgICAgICAgY3VycmVudFF1ZXVlW2ldKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xufVxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICBxdWV1ZS5wdXNoKGZ1bik7XG4gICAgaWYgKCFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XHJcblxyXG5jb25zdCBDcmVhdGVHYW1lRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBsaW5rOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICB0aW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBpbmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIG9uQ2hhbmdlRm9ybTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIGNyZWF0ZUdhbWU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxuICB9LFxyXG4gIG1peGluczogW1JlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW5dLFxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5wcm9wcy5jcmVhdGVHYW1lfT5cclxuICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICA8bGFiZWwgPlxyXG4gICAgICAgICAgICA8c3Bhbj5NaW51dGVzIHBlciBzaWRlOiA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxyXG4gICAgICAgICAgICAgIG5hbWU9XCJ0aW1lXCJcclxuICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy50aW1lfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hhbmdlRm9ybX1cclxuICAgICAgICAgICAgICBtaW49XCIxXCJcclxuICAgICAgICAgICAgICBtYXg9XCI1MFwiXHJcbiAgICAgICAgICAgICAgcmVxdWlyZWQgLz5cclxuICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICA8bGFiZWwgc3R5bGU9e3twYWRkaW5nTGVmdDogJzJlbSd9fT5cclxuICAgICAgICAgICAgPHNwYW4+SW5jcmVtZW50IGluIHNlY29uZHM6IDwvc3Bhbj5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXHJcbiAgICAgICAgICAgICAgbmFtZT1cImluY1wiXHJcbiAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuaW5jfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hhbmdlRm9ybX1cclxuICAgICAgICAgICAgICBtaW49XCIwXCJcclxuICAgICAgICAgICAgICBtYXg9XCI1MFwiXHJcbiAgICAgICAgICAgICAgcmVxdWlyZWQgLz5cclxuICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgPC9maWVsZHNldD5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgIGlkPVwiZ2FtZS1saW5rXCJcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmxpbmsgfHwgJ0dhbWUgbGluayB3aWxsIGJlIGdlbmVyYXRlZCBoZXJlLid9XHJcbiAgICAgICAgICBvbkNsaWNrPXtlID0+IGUudGFyZ2V0LnNlbGVjdCgpfVxyXG4gICAgICAgICAgcmVhZE9ubHkgLz5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG5cIj5QbGF5PC9idXR0b24+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENyZWF0ZUdhbWVGb3JtOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBDcmVhdGVHYW1lRm9ybSBmcm9tICcuL0NyZWF0ZUdhbWVGb3JtJztcclxuaW1wb3J0IGlvIGZyb20gJy4uL2lvJztcclxuXHJcbmNvbnN0IEluZGV4ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIFxyXG4gIHByb3BUeXBlczoge1xyXG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxyXG4gIH0sXHJcblxyXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxpbms6ICcnLFxyXG4gICAgICBoYXNFeHBpcmVkOiBmYWxzZSxcclxuICAgICAgdGltZTogJzMwJyxcclxuICAgICAgaW5jOiAnMCdcclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGNvbnN0IGlvID0gdGhpcy5wcm9wcy5pbztcclxuXHJcbiAgICBpby5vbignY3JlYXRlZCcsIGRhdGEgPT4ge1xyXG4gICAgICBjb25zdCB7dGltZSwgaW5jfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgIGNvbnN0IGxvYyA9IHdpbmRvdy5sb2NhdGlvbjtcclxuXHJcbiAgICAgIGNvbnN0IG9yaWdpbiA9IGxvYy5vcmlnaW4gfHwgYCR7bG9jLnByb3RvY29sfS8vJHtsb2MuaG9zdG5hbWV9YCArXHJcbiAgICAgICAgKGxvYy5wb3J0ID8gJzonICsgbG9jLnBvcnQgOiAnJyk7XHJcblxyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBsaW5rOiBgJHtvcmlnaW59L3BsYXkvJHtkYXRhLnRva2VufS8ke3RpbWV9LyR7aW5jfWAsXHJcbiAgICAgICAgaGFzRXhwaXJlZDogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGlvLm9uKCdyZWFkeScsICgpID0+IHtcclxuICAgICAgd2luZG93LmxvY2F0aW9uID0gdGhpcy5zdGF0ZS5saW5rO1xyXG4gICAgfSk7XHJcbiAgICBpby5vbigndG9rZW4tZXhwaXJlZCcsICgpID0+IHRoaXMuc2V0U3RhdGUoe2hhc0V4cGlyZWQ6IHRydWV9KSk7XHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxpbWcgc3JjPVwiL2ltZy9zaG91Z3VuLnBuZ1wiXHJcbiAgICAgICAgICAgICB3aWR0aD1cIjEyMlwiXHJcbiAgICAgICAgICAgICBoZWlnaHQ9XCIxMjJcIlxyXG4gICAgICAgICAgICAgY2xhc3NOYW1lPVwic2hvdWd1blwiIC8+XHJcbiAgICAgICAgPGgxPlNob2d1bjwvaDE+XHJcblxyXG4gICAgICAgIDxkaXYgaWQ9XCJjcmVhdGUtZ2FtZVwiPlxyXG4gICAgICAgICAgPENyZWF0ZUdhbWVGb3JtXHJcbiAgICAgICAgICAgIGxpbms9e3RoaXMuc3RhdGUubGlua31cclxuICAgICAgICAgICAgdGltZT17dGhpcy5zdGF0ZS50aW1lfVxyXG4gICAgICAgICAgICBpbmM9e3RoaXMuc3RhdGUuaW5jfVxyXG4gICAgICAgICAgICBvbkNoYW5nZUZvcm09e3RoaXMuX29uQ2hhbmdlRm9ybX1cclxuICAgICAgICAgICAgY3JlYXRlR2FtZT17dGhpcy5fY3JlYXRlR2FtZX0gLz5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICA8cCBpZD1cImdhbWUtc3RhdHVzXCI+XHJcbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmhhc0V4cGlyZWQgP1xyXG4gICAgICAgICAgICAgICdHYW1lIGxpbmsgaGFzIGV4cGlyZWQsIGdlbmVyYXRlIGEgbmV3IG9uZSdcclxuICAgICAgICAgICAgOnRoaXMuc3RhdGUubGluayA/XHJcbiAgICAgICAgICAgICAgJ1dhaXRpbmcgZm9yIG9wcG9uZW50IHRvIGNvbm5lY3QnXHJcbiAgICAgICAgICAgIDpudWxsfVxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8cD5cclxuICAgICAgICAgIENsaWNrIHRoZSBQbGF5IGJ1dHRvbiB0byBjcmVhdGUgYSBuZXcgZ2FtZSwgdGhlbiBzZW5kIHRoZSBnZW5lcmF0ZWQgVVJMIHRvIGEgZnJpZW5kLlxyXG4gICAgICAgICAgVGhlIGdhbWUgd2lsbCBiZWdpbiBvbmNlIHlvdXIgZnJpZW5kIG9wZW5zIHRoZSBsaW5rIGluIGhpcyBvciBoZXJcclxuICAgICAgICAgIGJyb3dzZXIuIEVhY2ggcGxheWVyIHdpbGwgYmUgcmFuZG9tbHkgYXNzaWduZWQgdG8gYmUgV2hpdGUgb3IgQmxhY2suXHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIi9hYm91dFwiIGNsYXNzTmFtZT1cImFscGhhXCI+UmVhZCBtb3JlIGFib3V0IFNob2d1bjwvYT5cclxuICAgICAgICA8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9LFxyXG5cclxuICBfb25DaGFuZ2VGb3JtKGUpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1tlLnRhcmdldC5uYW1lXTogZS50YXJnZXQudmFsdWV9KTtcclxuICB9LFxyXG4gIF9jcmVhdGVHYW1lKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCB7dGltZSwgaW5jfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCBpc0ludmFsaWQgPSBbdGltZSwgaW5jXS5zb21lKHZhbCA9PiB7XHJcbiAgICAgIHZhbCA9IHBhcnNlSW50KHZhbCwgMTApO1xyXG4gICAgICByZXR1cm4gaXNOYU4odmFsKSB8fCB2YWwgPCAwIHx8IHZhbCA+IDUwO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGlzSW52YWxpZCkge1xyXG4gICAgICAvLyBmYWxsYmFjayBmb3Igb2xkIGJyb3dzZXJzXHJcbiAgICAgIHJldHVybiB3aW5kb3cuYWxlcnQoJ0Zvcm0gaXMgaW52YWxpZC4gRW50ZXIgbnVtYmVycyBiZXR3ZWVuIDAgYW5kIDUwLicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wcm9wcy5pby5lbWl0KCdzdGFydCcpO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbmRleDsiLCIoZnVuY3Rpb24gKHByb2Nlc3Mpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmUgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqOyB9O1xuXG52YXIgaW8gPSBfaW50ZXJvcFJlcXVpcmUocmVxdWlyZShcInNvY2tldC5pby1jbGllbnRcIikpO1xuXG52YXIgb3MgPSBfaW50ZXJvcFJlcXVpcmUocmVxdWlyZShcIm9zXCIpKTtcblxudmFyIGhvc3RuYW1lID0gb3MuaG9zdG5hbWUoKTtcblxudmFyIHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDEzMzc7XG52YXIgT1JJR0lOID0gaG9zdG5hbWUuaW5kZXhPZihcImhlcm9rdWFwcC5jb21cIikgIT09IC0xID8gaG9zdG5hbWUgOiBob3N0bmFtZSArIFwiOlwiICsgcG9ydDtcblxubW9kdWxlLmV4cG9ydHMgPSBpby5jb25uZWN0KE9SSUdJTik7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpKVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWtNNkwxVnpaWEp6TDBwaGVTOUVaWE5yZEc5d0wwcFRMM05vYjJkMWJpMTJNaTl6Y21NdmFuTXZhVzh1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJMRmxCUVZrc1EwRkJRenM3T3p0SlFVVk9MRVZCUVVVc01rSkJRVTBzYTBKQlFXdENPenRKUVVNeFFpeEZRVUZGTERKQ1FVRlBMRWxCUVVrN08wRkJRM0JDTEVsQlFVMHNVVUZCVVN4SFFVRkhMRVZCUVVVc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF6czdRVUZGTDBJc1NVRkJUU3hKUVVGSkxFZEJRVWNzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRWxCUVVrc1NVRkJTU3hEUVVGRE8wRkJRM1JETEVsQlFVMHNUVUZCVFN4SFFVRkhMRkZCUVZFc1EwRkJReXhQUVVGUExFTkJRVU1zWlVGQlpTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRWRCUVVjc1VVRkJVU3hIUVVGSExGRkJRVkVzUjBGQlF5eEhRVUZITEVkQlFVTXNTVUZCU1N4RFFVRkRPenRwUWtGRmVFVXNSVUZCUlN4RFFVRkRMRTlCUVU4c1EwRkJReXhOUVVGTkxFTkJRVU1pTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjY2x4dVhISmNibWx0Y0c5eWRDQnBieUJtY205dElDZHpiMk5yWlhRdWFXOHRZMnhwWlc1MEp6dGNjbHh1YVcxd2IzSjBJRzl6SUdaeWIyMGdJRndpYjNOY0lqdGNjbHh1WTI5dWMzUWdhRzl6ZEc1aGJXVWdQU0J2Y3k1b2IzTjBibUZ0WlNncE8xeHlYRzVjY2x4dVkyOXVjM1FnY0c5eWRDQTlJSEJ5YjJObGMzTXVaVzUyTGxCUFVsUWdmSHdnTVRNek56dGNjbHh1WTI5dWMzUWdUMUpKUjBsT0lEMGdhRzl6ZEc1aGJXVXVhVzVrWlhoUFppZ25hR1Z5YjJ0MVlYQndMbU52YlNjcElDRTlQU0F0TVNBL0lHaHZjM1J1WVcxbElEb2dhRzl6ZEc1aGJXVXJYQ0k2WENJcmNHOXlkRHRjY2x4dVhISmNibVY0Y0c5eWRDQmtaV1poZFd4MElHbHZMbU52Ym01bFkzUW9UMUpKUjBsT0tUc2lYWDA9Il19
