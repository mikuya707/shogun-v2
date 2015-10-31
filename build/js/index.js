(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/js/index.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var io = _interopRequire(require("./io"));

var Index = _interopRequire(require("./components/Index"));

React.render(React.createElement(Index, { io: io }), document.getElementById("container"));

},{"./components/Index":"/Users/Jay/Fullstack/shogun-v2/src/js/components/Index.js","./io":"/Users/Jay/Fullstack/shogun-v2/src/js/io.js","react":"react"}],"/Users/Jay/Fullstack/shogun-v2/node_modules/browserify/node_modules/os-browserify/browser.js":[function(require,module,exports){
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

},{}],"/Users/Jay/Fullstack/shogun-v2/node_modules/browserify/node_modules/process/browser.js":[function(require,module,exports){
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

},{}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/CreateGameForm.js":[function(require,module,exports){
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

},{"react/addons":"react/addons"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/Index.js":[function(require,module,exports){
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
        "Click the button to create a game. Send the link to your friend. Once the link is opened your friend‘s browser, game should begin shortly. Colors are picked randomly by computer."
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

},{"../io":"/Users/Jay/Fullstack/shogun-v2/src/js/io.js","./CreateGameForm":"/Users/Jay/Fullstack/shogun-v2/src/js/components/CreateGameForm.js","react":"react"}],"/Users/Jay/Fullstack/shogun-v2/src/js/io.js":[function(require,module,exports){
(function (process){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var io = _interopRequire(require("socket.io-client"));

var os = _interopRequire(require("os"));

var hostname = os.hostname();

var port = process.env.PORT || 1337;
var ORIGIN = hostname.includes("herokuapp.com") ? hostname : hostname + ":" + port;

module.exports = io.connect(ORIGIN);

}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9KYXkvRnVsbHN0YWNrL3Nob2d1bi12Mi9zcmMvanMvaW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFlBQVksQ0FBQzs7OztJQUVOLEVBQUUsMkJBQU0sa0JBQWtCOztJQUMxQixFQUFFLDJCQUFPLElBQUk7O0FBQ3BCLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7QUFFL0IsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBQ3RDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDOztpQkFFbEUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IG9zIGZyb20gIFwib3NcIjtcbmNvbnN0IGhvc3RuYW1lID0gb3MuaG9zdG5hbWUoKTtcblxuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMTMzNztcbmNvbnN0IE9SSUdJTiA9IGhvc3RuYW1lLmluY2x1ZGVzKCdoZXJva3VhcHAuY29tJykgPyBob3N0bmFtZSA6IGhvc3RuYW1lK1wiOlwiK3BvcnQ7XG5cbmV4cG9ydCBkZWZhdWx0IGlvLmNvbm5lY3QoT1JJR0lOKTsiXX0=
},{"_process":"/Users/Jay/Fullstack/shogun-v2/node_modules/browserify/node_modules/process/browser.js","os":"/Users/Jay/Fullstack/shogun-v2/node_modules/browserify/node_modules/os-browserify/browser.js","socket.io-client":"socket.io-client"}]},{},["./src/js/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL29zLWJyb3dzZXJpZnkvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvQ3JlYXRlR2FtZUZvcm0uanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2NvbXBvbmVudHMvSW5kZXguanMiLCJzcmMvanMvaW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7SUFFTixLQUFLLDJCQUFNLE9BQU87O0lBQ2xCLEVBQUUsMkJBQU0sTUFBTTs7SUFDZCxLQUFLLDJCQUFNLG9CQUFvQjs7QUFFdEMsS0FBSyxDQUFDLE1BQU0sQ0FDVixvQkFBQyxLQUFLLElBQUMsRUFBRSxFQUFFLEVBQUUsQUFBQyxHQUFHLEVBQ2pCLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQ3JDLENBQUM7OztBQ1RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q3hDLFNBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLGFBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztLQUMxQyxDQUFDLENBQUM7O0FBRUgsUUFBSSxTQUFTLEVBQUU7O0FBRWIsYUFBTyxNQUFNLENBQUMsS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7S0FDekUsTUFBTTtBQUNMLFVBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUM3QjtHQUNGO0NBQ0YsQ0FBQyxDQUFDOztpQkFFWSxLQUFLOzs7QUNuR3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgaW8gZnJvbSAnLi9pbyc7XG5pbXBvcnQgSW5kZXggZnJvbSAnLi9jb21wb25lbnRzL0luZGV4JztcblxuUmVhY3QucmVuZGVyKFxuICA8SW5kZXggaW89e2lvfSAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpXG4pOyIsImV4cG9ydHMuZW5kaWFubmVzcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdMRScgfTtcblxuZXhwb3J0cy5ob3N0bmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gbG9jYXRpb24uaG9zdG5hbWVcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gJyc7XG59O1xuXG5leHBvcnRzLmxvYWRhdmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXSB9O1xuXG5leHBvcnRzLnVwdGltZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDAgfTtcblxuZXhwb3J0cy5mcmVlbWVtID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBOdW1iZXIuTUFYX1ZBTFVFO1xufTtcblxuZXhwb3J0cy50b3RhbG1lbSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcbn07XG5cbmV4cG9ydHMuY3B1cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdIH07XG5cbmV4cG9ydHMudHlwZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdCcm93c2VyJyB9O1xuXG5leHBvcnRzLnJlbGVhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufTtcblxuZXhwb3J0cy5uZXR3b3JrSW50ZXJmYWNlc1xuPSBleHBvcnRzLmdldE5ldHdvcmtJbnRlcmZhY2VzXG49IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHt9IH07XG5cbmV4cG9ydHMuYXJjaCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdqYXZhc2NyaXB0JyB9O1xuXG5leHBvcnRzLnBsYXRmb3JtID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJ2Jyb3dzZXInIH07XG5cbmV4cG9ydHMudG1wZGlyID0gZXhwb3J0cy50bXBEaXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICcvdG1wJztcbn07XG5cbmV4cG9ydHMuRU9MID0gJ1xcbic7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IHRydWU7XG4gICAgdmFyIGN1cnJlbnRRdWV1ZTtcbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgdmFyIGkgPSAtMTtcbiAgICAgICAgd2hpbGUgKCsraSA8IGxlbikge1xuICAgICAgICAgICAgY3VycmVudFF1ZXVlW2ldKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xufVxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICBxdWV1ZS5wdXNoKGZ1bik7XG4gICAgaWYgKCFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcblxuY29uc3QgQ3JlYXRlR2FtZUZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgbGluazogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRpbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBpbmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZUZvcm06IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY3JlYXRlR2FtZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluXSxcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLnByb3BzLmNyZWF0ZUdhbWV9PlxuICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgPGxhYmVsID5cbiAgICAgICAgICAgIDxzcGFuPk1pbnV0ZXMgcGVyIHNpZGU6IDwvc3Bhbj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgbmFtZT1cInRpbWVcIlxuICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy50aW1lfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkNoYW5nZUZvcm19XG4gICAgICAgICAgICAgIG1pbj1cIjFcIlxuICAgICAgICAgICAgICBtYXg9XCI1MFwiXG4gICAgICAgICAgICAgIHJlcXVpcmVkIC8+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8bGFiZWwgc3R5bGU9e3twYWRkaW5nTGVmdDogJzJlbSd9fT5cbiAgICAgICAgICAgIDxzcGFuPkluY3JlbWVudCBpbiBzZWNvbmRzOiA8L3NwYW4+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgIG5hbWU9XCJpbmNcIlxuICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5pbmN9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hhbmdlRm9ybX1cbiAgICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgICAgIG1heD1cIjUwXCJcbiAgICAgICAgICAgICAgcmVxdWlyZWQgLz5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBpZD1cImdhbWUtbGlua1wiXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmxpbmsgfHwgJ0dhbWUgbGluayB3aWxsIGJlIGdlbmVyYXRlZCBoZXJlLid9XG4gICAgICAgICAgb25DbGljaz17ZSA9PiBlLnRhcmdldC5zZWxlY3QoKX1cbiAgICAgICAgICByZWFkT25seSAvPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG5cIj5QbGF5PC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENyZWF0ZUdhbWVGb3JtOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDcmVhdGVHYW1lRm9ybSBmcm9tICcuL0NyZWF0ZUdhbWVGb3JtJztcbmltcG9ydCBpbyBmcm9tICcuLi9pbyc7XG5cbmNvbnN0IEluZGV4ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGluazogJycsXG4gICAgICBoYXNFeHBpcmVkOiBmYWxzZSxcbiAgICAgIHRpbWU6ICczMCcsXG4gICAgICBpbmM6ICcwJ1xuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IGlvID0gdGhpcy5wcm9wcy5pbztcblxuICAgIGlvLm9uKCdjcmVhdGVkJywgZGF0YSA9PiB7XG4gICAgICBjb25zdCB7dGltZSwgaW5jfSA9IHRoaXMuc3RhdGU7XG4gICAgICBjb25zdCBsb2MgPSB3aW5kb3cubG9jYXRpb247XG5cbiAgICAgIGNvbnN0IG9yaWdpbiA9IGxvYy5vcmlnaW4gfHwgYCR7bG9jLnByb3RvY29sfS8vJHtsb2MuaG9zdG5hbWV9YCArXG4gICAgICAgIChsb2MucG9ydCA/ICc6JyArIGxvYy5wb3J0IDogJycpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbGluazogYCR7b3JpZ2lufS9wbGF5LyR7ZGF0YS50b2tlbn0vJHt0aW1lfS8ke2luY31gLFxuICAgICAgICBoYXNFeHBpcmVkOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaW8ub24oJ3JlYWR5JywgKCkgPT4ge1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gdGhpcy5zdGF0ZS5saW5rO1xuICAgIH0pO1xuICAgIGlvLm9uKCd0b2tlbi1leHBpcmVkJywgKCkgPT4gdGhpcy5zZXRTdGF0ZSh7aGFzRXhwaXJlZDogdHJ1ZX0pKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aW1nIHNyYz1cIi9pbWcvc2hvdWd1bi5wbmdcIlxuICAgICAgICAgICAgIHdpZHRoPVwiMTIyXCJcbiAgICAgICAgICAgICBoZWlnaHQ9XCIxMjJcIlxuICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNob3VndW5cIiAvPlxuICAgICAgICA8aDE+U2hvZ3VuPC9oMT5cblxuICAgICAgICA8ZGl2IGlkPVwiY3JlYXRlLWdhbWVcIj5cbiAgICAgICAgICA8Q3JlYXRlR2FtZUZvcm1cbiAgICAgICAgICAgIGxpbms9e3RoaXMuc3RhdGUubGlua31cbiAgICAgICAgICAgIHRpbWU9e3RoaXMuc3RhdGUudGltZX1cbiAgICAgICAgICAgIGluYz17dGhpcy5zdGF0ZS5pbmN9XG4gICAgICAgICAgICBvbkNoYW5nZUZvcm09e3RoaXMuX29uQ2hhbmdlRm9ybX1cbiAgICAgICAgICAgIGNyZWF0ZUdhbWU9e3RoaXMuX2NyZWF0ZUdhbWV9IC8+XG4gICAgICAgICAgICBcbiAgICAgICAgICA8cCBpZD1cImdhbWUtc3RhdHVzXCI+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5oYXNFeHBpcmVkID9cbiAgICAgICAgICAgICAgJ0dhbWUgbGluayBoYXMgZXhwaXJlZCwgZ2VuZXJhdGUgYSBuZXcgb25lJ1xuICAgICAgICAgICAgOnRoaXMuc3RhdGUubGluayA/XG4gICAgICAgICAgICAgICdXYWl0aW5nIGZvciBvcHBvbmVudCB0byBjb25uZWN0J1xuICAgICAgICAgICAgOm51bGx9XG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8cD5cbiAgICAgICAgICBDbGljayB0aGUgYnV0dG9uIHRvIGNyZWF0ZSBhIGdhbWUuIFNlbmQgdGhlIGxpbmsgdG8geW91ciBmcmllbmQuXG4gICAgICAgICAgT25jZSB0aGUgbGluayBpcyBvcGVuZWQgeW91ciBmcmllbmTigJhzIGJyb3dzZXIsIGdhbWUgc2hvdWxkIGJlZ2luIFxuICAgICAgICAgIHNob3J0bHkuIENvbG9ycyBhcmUgcGlja2VkIHJhbmRvbWx5IGJ5IGNvbXB1dGVyLlxuICAgICAgICA8L3A+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDxhIGhyZWY9XCIvYWJvdXRcIiBjbGFzc05hbWU9XCJhbHBoYVwiPlJlYWQgbW9yZSBhYm91dCBTaG9ndW48L2E+XG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cbiAgX29uQ2hhbmdlRm9ybShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7W2UudGFyZ2V0Lm5hbWVdOiBlLnRhcmdldC52YWx1ZX0pO1xuICB9LFxuICBfY3JlYXRlR2FtZShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3Qge3RpbWUsIGluY30gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGlzSW52YWxpZCA9IFt0aW1lLCBpbmNdLnNvbWUodmFsID0+IHtcbiAgICAgIHZhbCA9IHBhcnNlSW50KHZhbCwgMTApO1xuICAgICAgcmV0dXJuIGlzTmFOKHZhbCkgfHwgdmFsIDwgMCB8fCB2YWwgPiA1MDtcbiAgICB9KTtcblxuICAgIGlmIChpc0ludmFsaWQpIHtcbiAgICAgIC8vIGZhbGxiYWNrIGZvciBvbGQgYnJvd3NlcnNcbiAgICAgIHJldHVybiB3aW5kb3cuYWxlcnQoJ0Zvcm0gaXMgaW52YWxpZC4gRW50ZXIgbnVtYmVycyBiZXR3ZWVuIDAgYW5kIDUwLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLmlvLmVtaXQoJ3N0YXJ0Jyk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgSW5kZXg7IiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iajsgfTtcblxudmFyIGlvID0gX2ludGVyb3BSZXF1aXJlKHJlcXVpcmUoXCJzb2NrZXQuaW8tY2xpZW50XCIpKTtcblxudmFyIG9zID0gX2ludGVyb3BSZXF1aXJlKHJlcXVpcmUoXCJvc1wiKSk7XG5cbnZhciBob3N0bmFtZSA9IG9zLmhvc3RuYW1lKCk7XG5cbnZhciBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAxMzM3O1xudmFyIE9SSUdJTiA9IGhvc3RuYW1lLmluY2x1ZGVzKFwiaGVyb2t1YXBwLmNvbVwiKSA/IGhvc3RuYW1lIDogaG9zdG5hbWUgKyBcIjpcIiArIHBvcnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gaW8uY29ubmVjdChPUklHSU4pO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpOVZjMlZ5Y3k5S1lYa3ZSblZzYkhOMFlXTnJMM05vYjJkMWJpMTJNaTl6Y21NdmFuTXZhVzh1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJMRmxCUVZrc1EwRkJRenM3T3p0SlFVVk9MRVZCUVVVc01rSkJRVTBzYTBKQlFXdENPenRKUVVNeFFpeEZRVUZGTERKQ1FVRlBMRWxCUVVrN08wRkJRM0JDTEVsQlFVMHNVVUZCVVN4SFFVRkhMRVZCUVVVc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF6czdRVUZGTDBJc1NVRkJUU3hKUVVGSkxFZEJRVWNzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRWxCUVVrc1NVRkJTU3hEUVVGRE8wRkJRM1JETEVsQlFVMHNUVUZCVFN4SFFVRkhMRkZCUVZFc1EwRkJReXhSUVVGUkxFTkJRVU1zWlVGQlpTeERRVUZETEVkQlFVY3NVVUZCVVN4SFFVRkhMRkZCUVZFc1IwRkJReXhIUVVGSExFZEJRVU1zU1VGQlNTeERRVUZET3p0cFFrRkZiRVVzUlVGQlJTeERRVUZETEU5QlFVOHNRMEZCUXl4TlFVRk5MRU5CUVVNaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVhVzF3YjNKMElHbHZJR1p5YjIwZ0ozTnZZMnRsZEM1cGJ5MWpiR2xsYm5Rbk8xeHVhVzF3YjNKMElHOXpJR1p5YjIwZ0lGd2liM05jSWp0Y2JtTnZibk4wSUdodmMzUnVZVzFsSUQwZ2IzTXVhRzl6ZEc1aGJXVW9LVHRjYmx4dVkyOXVjM1FnY0c5eWRDQTlJSEJ5YjJObGMzTXVaVzUyTGxCUFVsUWdmSHdnTVRNek56dGNibU52Ym5OMElFOVNTVWRKVGlBOUlHaHZjM1J1WVcxbExtbHVZMngxWkdWektDZG9aWEp2YTNWaGNIQXVZMjl0SnlrZ1B5Qm9iM04wYm1GdFpTQTZJR2h2YzNSdVlXMWxLMXdpT2x3aUszQnZjblE3WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUdsdkxtTnZibTVsWTNRb1QxSkpSMGxPS1RzaVhYMD0iXX0=
