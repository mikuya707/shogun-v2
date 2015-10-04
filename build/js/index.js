(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/js/index.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var io = _interopRequire(require("./io"));

var Index = _interopRequire(require("./components/Index"));

React.render(React.createElement(Index, { io: io }), document.getElementById("container"));

},{"./components/Index":"/Users/Jay/Fullstack/shogun-v2/src/js/components/Index.js","./io":"/Users/Jay/Fullstack/shogun-v2/src/js/io.js","react":"react"}],"/Users/Jay/Fullstack/shogun-v2/src/js/components/CreateGameForm.js":[function(require,module,exports){
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
          "Read more about Reti Chess"
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
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var io = _interopRequire(require("socket.io-client"));

var ORIGIN = "http://localhost:1337";
var WS = ORIGIN;

module.exports = io.connect(WS);

},{"socket.io-client":"socket.io-client"}]},{},["./src/js/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvSmF5L0Z1bGxzdGFjay9zaG9ndW4tdjIvc3JjL2pzL2luZGV4LmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0NyZWF0ZUdhbWVGb3JtLmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0luZGV4LmpzIiwiL1VzZXJzL0pheS9GdWxsc3RhY2svc2hvZ3VuLXYyL3NyYy9qcy9pby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7OztJQUVOLEtBQUssMkJBQU0sT0FBTzs7SUFDbEIsRUFBRSwyQkFBTSxNQUFNOztJQUNkLEtBQUssMkJBQU0sb0JBQW9COztBQUV0QyxLQUFLLENBQUMsTUFBTSxDQUNWLG9CQUFDLEtBQUssSUFBQyxFQUFFLEVBQUUsRUFBRSxBQUFDLEdBQUcsRUFDakIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FDckMsQ0FBQzs7O0FDVEYsWUFBWSxDQUFDOzs7O0lBRU4sS0FBSywyQkFBTSxjQUFjOztBQUVoQyxJQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFdkMsV0FBUyxFQUFFO0FBQ1QsUUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDdkMsUUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDdkMsT0FBRyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDdEMsZ0JBQVksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzdDLGNBQVUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0dB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cUJBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztHQUNsRDtBQUNELGFBQVcsRUFBQSxxQkFBQyxDQUFDLEVBQUU7QUFDYixLQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O2lCQUVDLElBQUksQ0FBQyxLQUFLO1FBQXZCLElBQUksVUFBSixJQUFJO1FBQUUsR0FBRyxVQUFILEdBQUc7O0FBQ2hCLFFBQU0sU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsRUFBSTtBQUN4QyxTQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN4QixhQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7S0FDMUMsQ0FBQyxDQUFDOztBQUVILFFBQUksU0FBUyxFQUFFOztBQUViLGFBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0tBQ3pFLE1BQU07QUFDTCxVQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDN0I7R0FDRjtDQUNGLENBQUMsQ0FBQzs7aUJBRVksS0FBSzs7O0FDbkdwQixZQUFZLENBQUM7Ozs7SUFFTixFQUFFLDJCQUFNLGtCQUFrQjs7QUFDakMsSUFBTSxNQUFNLEdBQUcsdUJBQXVCLENBQUM7QUFDdkMsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDOztpQkFFSCxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgaW8gZnJvbSAnLi9pbyc7XG5pbXBvcnQgSW5kZXggZnJvbSAnLi9jb21wb25lbnRzL0luZGV4JztcblxuUmVhY3QucmVuZGVyKFxuICA8SW5kZXggaW89e2lvfSAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpXG4pOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0L2FkZG9ucyc7XG5cbmNvbnN0IENyZWF0ZUdhbWVGb3JtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHByb3BUeXBlczoge1xuICAgIGxpbms6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB0aW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgaW5jOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2VGb3JtOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNyZWF0ZUdhbWU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfSxcbiAgbWl4aW5zOiBbUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbl0sXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5wcm9wcy5jcmVhdGVHYW1lfT5cbiAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIDxzcGFuPk1pbnV0ZXMgcGVyIHNpZGU6IDwvc3Bhbj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgbmFtZT1cInRpbWVcIlxuICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy50aW1lfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkNoYW5nZUZvcm19XG4gICAgICAgICAgICAgIG1pbj1cIjFcIlxuICAgICAgICAgICAgICBtYXg9XCI1MFwiXG4gICAgICAgICAgICAgIHJlcXVpcmVkIC8+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8bGFiZWwgc3R5bGU9e3twYWRkaW5nTGVmdDogJzJlbSd9fT5cbiAgICAgICAgICAgIDxzcGFuPkluY3JlbWVudCBpbiBzZWNvbmRzOiA8L3NwYW4+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgIG5hbWU9XCJpbmNcIlxuICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5pbmN9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hhbmdlRm9ybX1cbiAgICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgICAgIG1heD1cIjUwXCJcbiAgICAgICAgICAgICAgcmVxdWlyZWQgLz5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBpZD1cImdhbWUtbGlua1wiXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmxpbmsgfHwgJ0dhbWUgbGluayB3aWxsIGJlIGdlbmVyYXRlZCBoZXJlLid9XG4gICAgICAgICAgb25DbGljaz17ZSA9PiBlLnRhcmdldC5zZWxlY3QoKX1cbiAgICAgICAgICByZWFkT25seSAvPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG5cIj5QbGF5PC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENyZWF0ZUdhbWVGb3JtOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDcmVhdGVHYW1lRm9ybSBmcm9tICcuL0NyZWF0ZUdhbWVGb3JtJztcbmltcG9ydCBpbyBmcm9tICcuLi9pbyc7XG5cbmNvbnN0IEluZGV4ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgcHJvcFR5cGVzOiB7XG4gICAgaW86IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGluazogJycsXG4gICAgICBoYXNFeHBpcmVkOiBmYWxzZSxcbiAgICAgIHRpbWU6ICczMCcsXG4gICAgICBpbmM6ICcwJ1xuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IGlvID0gdGhpcy5wcm9wcy5pbztcblxuICAgIGlvLm9uKCdjcmVhdGVkJywgZGF0YSA9PiB7XG4gICAgICBjb25zdCB7dGltZSwgaW5jfSA9IHRoaXMuc3RhdGU7XG4gICAgICBjb25zdCBsb2MgPSB3aW5kb3cubG9jYXRpb247XG5cbiAgICAgIGNvbnN0IG9yaWdpbiA9IGxvYy5vcmlnaW4gfHwgYCR7bG9jLnByb3RvY29sfS8vJHtsb2MuaG9zdG5hbWV9YCArXG4gICAgICAgIChsb2MucG9ydCA/ICc6JyArIGxvYy5wb3J0IDogJycpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbGluazogYCR7b3JpZ2lufS9wbGF5LyR7ZGF0YS50b2tlbn0vJHt0aW1lfS8ke2luY31gLFxuICAgICAgICBoYXNFeHBpcmVkOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaW8ub24oJ3JlYWR5JywgKCkgPT4ge1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gdGhpcy5zdGF0ZS5saW5rO1xuICAgIH0pO1xuICAgIGlvLm9uKCd0b2tlbi1leHBpcmVkJywgKCkgPT4gdGhpcy5zZXRTdGF0ZSh7aGFzRXhwaXJlZDogdHJ1ZX0pKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aW1nIHNyYz1cIi9pbWcvc2hvdWd1bi5wbmdcIlxuICAgICAgICAgICAgIHdpZHRoPVwiMTIyXCJcbiAgICAgICAgICAgICBoZWlnaHQ9XCIxMjJcIlxuICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNob3VndW5cIiAvPlxuICAgICAgICA8aDE+U2hvZ3VuPC9oMT5cblxuICAgICAgICA8ZGl2IGlkPVwiY3JlYXRlLWdhbWVcIj5cbiAgICAgICAgICA8Q3JlYXRlR2FtZUZvcm1cbiAgICAgICAgICAgIGxpbms9e3RoaXMuc3RhdGUubGlua31cbiAgICAgICAgICAgIHRpbWU9e3RoaXMuc3RhdGUudGltZX1cbiAgICAgICAgICAgIGluYz17dGhpcy5zdGF0ZS5pbmN9XG4gICAgICAgICAgICBvbkNoYW5nZUZvcm09e3RoaXMuX29uQ2hhbmdlRm9ybX1cbiAgICAgICAgICAgIGNyZWF0ZUdhbWU9e3RoaXMuX2NyZWF0ZUdhbWV9IC8+XG4gICAgICAgICAgICBcbiAgICAgICAgICA8cCBpZD1cImdhbWUtc3RhdHVzXCI+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5oYXNFeHBpcmVkID9cbiAgICAgICAgICAgICAgJ0dhbWUgbGluayBoYXMgZXhwaXJlZCwgZ2VuZXJhdGUgYSBuZXcgb25lJ1xuICAgICAgICAgICAgOnRoaXMuc3RhdGUubGluayA/XG4gICAgICAgICAgICAgICdXYWl0aW5nIGZvciBvcHBvbmVudCB0byBjb25uZWN0J1xuICAgICAgICAgICAgOm51bGx9XG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8cD5cbiAgICAgICAgICBDbGljayB0aGUgYnV0dG9uIHRvIGNyZWF0ZSBhIGdhbWUuIFNlbmQgdGhlIGxpbmsgdG8geW91ciBmcmllbmQuXG4gICAgICAgICAgT25jZSB0aGUgbGluayBpcyBvcGVuZWQgeW91ciBmcmllbmTigJhzIGJyb3dzZXIsIGdhbWUgc2hvdWxkIGJlZ2luIFxuICAgICAgICAgIHNob3J0bHkuIENvbG9ycyBhcmUgcGlja2VkIHJhbmRvbWx5IGJ5IGNvbXB1dGVyLlxuICAgICAgICA8L3A+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDxhIGhyZWY9XCIvYWJvdXRcIiBjbGFzc05hbWU9XCJhbHBoYVwiPlJlYWQgbW9yZSBhYm91dCBSZXRpIENoZXNzPC9hPlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG4gIF9vbkNoYW5nZUZvcm0oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1tlLnRhcmdldC5uYW1lXTogZS50YXJnZXQudmFsdWV9KTtcbiAgfSxcbiAgX2NyZWF0ZUdhbWUoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IHt0aW1lLCBpbmN9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBpc0ludmFsaWQgPSBbdGltZSwgaW5jXS5zb21lKHZhbCA9PiB7XG4gICAgICB2YWwgPSBwYXJzZUludCh2YWwsIDEwKTtcbiAgICAgIHJldHVybiBpc05hTih2YWwpIHx8IHZhbCA8IDAgfHwgdmFsID4gNTA7XG4gICAgfSk7XG5cbiAgICBpZiAoaXNJbnZhbGlkKSB7XG4gICAgICAvLyBmYWxsYmFjayBmb3Igb2xkIGJyb3dzZXJzXG4gICAgICByZXR1cm4gd2luZG93LmFsZXJ0KCdGb3JtIGlzIGludmFsaWQuIEVudGVyIG51bWJlcnMgYmV0d2VlbiAwIGFuZCA1MC4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5pby5lbWl0KCdzdGFydCcpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEluZGV4OyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuY29uc3QgT1JJR0lOID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNyc7XG5jb25zdCBXUyA9IE9SSUdJTjtcblxuZXhwb3J0IGRlZmF1bHQgaW8uY29ubmVjdChXUyk7Il19
