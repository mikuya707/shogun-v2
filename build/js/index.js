(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/js/index.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var io = _interopRequire(require("./io"));

var Index = _interopRequire(require("./components/Index"));

React.render(React.createElement(Index, { io: io }), document.getElementById("container"));

},{"./components/Index":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/Index.js","./io":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/io.js","react":"react"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/CreateGameForm.js":[function(require,module,exports){
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

},{"react/addons":"react/addons"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/Index.js":[function(require,module,exports){
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

},{"../io":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/io.js","./CreateGameForm":"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/components/CreateGameForm.js","react":"react"}],"/Users/karenmaoMac/FS_Seniors/shougun/shogun-v2/src/js/io.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var io = _interopRequire(require("socket.io-client"));

var ORIGIN = "http://localhost:1337";
var WS = ORIGIN;

module.exports = io.connect(WS);

},{"socket.io-client":"socket.io-client"}]},{},["./src/js/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvaW5kZXguanMiLCIvVXNlcnMva2FyZW5tYW9NYWMvRlNfU2VuaW9ycy9zaG91Z3VuL3Nob2d1bi12Mi9zcmMvanMvY29tcG9uZW50cy9DcmVhdGVHYW1lRm9ybS5qcyIsIi9Vc2Vycy9rYXJlbm1hb01hYy9GU19TZW5pb3JzL3Nob3VndW4vc2hvZ3VuLXYyL3NyYy9qcy9jb21wb25lbnRzL0luZGV4LmpzIiwiL1VzZXJzL2thcmVubWFvTWFjL0ZTX1NlbmlvcnMvc2hvdWd1bi9zaG9ndW4tdjIvc3JjL2pzL2lvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7O0lBRU4sS0FBSywyQkFBTSxPQUFPOztJQUNsQixFQUFFLDJCQUFNLE1BQU07O0lBQ2QsS0FBSywyQkFBTSxvQkFBb0I7O0FBRXRDLEtBQUssQ0FBQyxNQUFNLENBQ1Ysb0JBQUMsS0FBSyxJQUFDLEVBQUUsRUFBRSxFQUFFLEFBQUMsR0FBRyxFQUNqQixRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUNyQyxDQUFDOzs7QUNURixZQUFZLENBQUM7Ozs7SUFFTixLQUFLLDJCQUFNLGNBQWM7O0FBRWhDLElBQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUV2QyxXQUFTLEVBQUU7QUFDVCxRQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN2QyxRQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN2QyxPQUFHLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN0QyxnQkFBWSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDN0MsY0FBVSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7R0FDNUM7QUFDRCxRQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQzs7QUFFdEMsUUFBTSxFQUFBLGtCQUFHO0FBQ1AsV0FDRTs7UUFBTSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEFBQUM7TUFDcEM7OztRQUNFOzs7VUFDRTs7OztXQUErQjtVQUMvQjtBQUNFLGdCQUFJLEVBQUMsUUFBUTtBQUNiLGdCQUFJLEVBQUMsTUFBTTtBQUNYLGlCQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEFBQUM7QUFDdkIsb0JBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQUFBQztBQUNsQyxlQUFHLEVBQUMsR0FBRztBQUNQLGVBQUcsRUFBQyxJQUFJO0FBQ1Isb0JBQVEsTUFBQSxHQUFHO1NBQ1A7UUFDUjs7WUFBTyxLQUFLLEVBQUUsRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFDLEFBQUM7VUFDakM7Ozs7V0FBbUM7VUFDbkM7QUFDRSxnQkFBSSxFQUFDLFFBQVE7QUFDYixnQkFBSSxFQUFDLEtBQUs7QUFDVixpQkFBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxBQUFDO0FBQ3RCLG9CQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEFBQUM7QUFDbEMsZUFBRyxFQUFDLEdBQUc7QUFDUCxlQUFHLEVBQUMsSUFBSTtBQUNSLG9CQUFRLE1BQUEsR0FBRztTQUNQO09BQ0M7TUFDWDtBQUNFLFVBQUUsRUFBQyxXQUFXO0FBQ2QsWUFBSSxFQUFDLE1BQU07QUFDWCxhQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksbUNBQW1DLEFBQUM7QUFDOUQsZUFBTyxFQUFFLFVBQUEsQ0FBQztpQkFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtTQUFBLEFBQUM7QUFDaEMsZ0JBQVEsTUFBQSxHQUFHO01BQ2I7O1VBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSzs7T0FBYztLQUM5QyxDQUNQO0dBQ0g7Q0FDRixDQUFDLENBQUM7O2lCQUVZLGNBQWM7OztBQ3REN0IsWUFBWSxDQUFDOzs7Ozs7SUFFTixLQUFLLDJCQUFNLE9BQU87O0lBQ2xCLGNBQWMsMkJBQU0sa0JBQWtCOztJQUN0QyxFQUFFLDJCQUFNLE9BQU87O0FBRXRCLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUU5QixXQUFTLEVBQUU7QUFDVCxNQUFFLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtHQUN0Qzs7QUFFRCxpQkFBZSxFQUFBLDJCQUFHO0FBQ2hCLFdBQU87QUFDTCxVQUFJLEVBQUUsRUFBRTtBQUNSLGdCQUFVLEVBQUUsS0FBSztBQUNqQixVQUFJLEVBQUUsSUFBSTtBQUNWLFNBQUcsRUFBRSxHQUFHO0tBQ1QsQ0FBQztHQUNIO0FBQ0QsbUJBQWlCLEVBQUEsNkJBQUc7OztBQUNsQixRQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzs7QUFFekIsTUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBQSxJQUFJLEVBQUk7bUJBQ0gsTUFBSyxLQUFLO1VBQXZCLElBQUksVUFBSixJQUFJO1VBQUUsR0FBRyxVQUFILEdBQUc7O0FBQ2hCLFVBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7O0FBRTVCLFVBQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksS0FBRyxHQUFHLENBQUMsUUFBUSxVQUFLLEdBQUcsQ0FBQyxRQUFRLElBQzFELEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFBLEFBQUMsQ0FBQzs7QUFFbkMsWUFBSyxRQUFRLENBQUM7QUFDWixZQUFJLE9BQUssTUFBTSxjQUFTLElBQUksQ0FBQyxLQUFLLFNBQUksSUFBSSxTQUFJLEdBQUcsQUFBRTtBQUNuRCxrQkFBVSxFQUFFLEtBQUs7T0FDbEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBTTtBQUNuQixZQUFNLENBQUMsUUFBUSxHQUFHLE1BQUssS0FBSyxDQUFDLElBQUksQ0FBQztLQUNuQyxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRTthQUFNLE1BQUssUUFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0tBQUEsQ0FBQyxDQUFDO0dBQ2pFO0FBQ0QsUUFBTSxFQUFBLGtCQUFHO0FBQ1AsV0FDRTs7O01BQ0UsNkJBQUssR0FBRyxFQUFDLGtCQUFrQjtBQUN0QixhQUFLLEVBQUMsS0FBSztBQUNYLGNBQU0sRUFBQyxLQUFLO0FBQ1osaUJBQVMsRUFBQyxTQUFTLEdBQUc7TUFDM0I7Ozs7T0FBZTtNQUVmOztVQUFLLEVBQUUsRUFBQyxhQUFhO1FBQ25CLG9CQUFDLGNBQWM7QUFDYixjQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEFBQUM7QUFDdEIsY0FBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxBQUFDO0FBQ3RCLGFBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQUFBQztBQUNwQixzQkFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLEFBQUM7QUFDakMsb0JBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxBQUFDLEdBQUc7UUFFbEM7O1lBQUcsRUFBRSxFQUFDLGFBQWE7VUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQ3BCLDJDQUEyQyxHQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FDZCxpQ0FBaUMsR0FDbEMsSUFBSTtTQUNIO09BQ0E7TUFFTjs7OztPQUlJO01BQ0o7OztRQUNFOztZQUFHLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLE9BQU87O1NBQTJCO09BQzNEO0tBQ0EsQ0FDTjtHQUNIOztBQUVELGVBQWEsRUFBQSx1QkFBQyxDQUFDLEVBQUU7QUFDZixRQUFJLENBQUMsUUFBUSxxQkFBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0dBQ2xEO0FBQ0QsYUFBVyxFQUFBLHFCQUFDLENBQUMsRUFBRTtBQUNiLEtBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7aUJBRUMsSUFBSSxDQUFDLEtBQUs7UUFBdkIsSUFBSSxVQUFKLElBQUk7UUFBRSxHQUFHLFVBQUgsR0FBRzs7QUFDaEIsUUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRyxFQUFJO0FBQ3hDLFNBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLGFBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztLQUMxQyxDQUFDLENBQUM7O0FBRUgsUUFBSSxTQUFTLEVBQUU7O0FBRWIsYUFBTyxNQUFNLENBQUMsS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7S0FDekUsTUFBTTtBQUNMLFVBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUM3QjtHQUNGO0NBQ0YsQ0FBQyxDQUFDOztpQkFFWSxLQUFLOzs7QUNuR3BCLFlBQVksQ0FBQzs7OztJQUVOLEVBQUUsMkJBQU0sa0JBQWtCOztBQUNqQyxJQUFNLE1BQU0sR0FBRyx1QkFBdUIsQ0FBQztBQUN2QyxJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUM7O2lCQUVILEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpbyBmcm9tICcuL2lvJztcbmltcG9ydCBJbmRleCBmcm9tICcuL2NvbXBvbmVudHMvSW5kZXgnO1xuXG5SZWFjdC5yZW5kZXIoXG4gIDxJbmRleCBpbz17aW99IC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcbik7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QvYWRkb25zJztcblxuY29uc3QgQ3JlYXRlR2FtZUZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgbGluazogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRpbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBpbmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZUZvcm06IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY3JlYXRlR2FtZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9LFxuICBtaXhpbnM6IFtSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluXSxcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLnByb3BzLmNyZWF0ZUdhbWV9PlxuICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgPHNwYW4+TWludXRlcyBwZXIgc2lkZTogPC9zcGFuPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICBuYW1lPVwidGltZVwiXG4gICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnRpbWV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hhbmdlRm9ybX1cbiAgICAgICAgICAgICAgbWluPVwiMVwiXG4gICAgICAgICAgICAgIG1heD1cIjUwXCJcbiAgICAgICAgICAgICAgcmVxdWlyZWQgLz5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDxsYWJlbCBzdHlsZT17e3BhZGRpbmdMZWZ0OiAnMmVtJ319PlxuICAgICAgICAgICAgPHNwYW4+SW5jcmVtZW50IGluIHNlY29uZHM6IDwvc3Bhbj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgbmFtZT1cImluY1wiXG4gICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmluY31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMub25DaGFuZ2VGb3JtfVxuICAgICAgICAgICAgICBtaW49XCIwXCJcbiAgICAgICAgICAgICAgbWF4PVwiNTBcIlxuICAgICAgICAgICAgICByZXF1aXJlZCAvPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGlkPVwiZ2FtZS1saW5rXCJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMubGluayB8fCAnR2FtZSBsaW5rIHdpbGwgYmUgZ2VuZXJhdGVkIGhlcmUuJ31cbiAgICAgICAgICBvbkNsaWNrPXtlID0+IGUudGFyZ2V0LnNlbGVjdCgpfVxuICAgICAgICAgIHJlYWRPbmx5IC8+XG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0blwiPlBsYXk8L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICApO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlR2FtZUZvcm07IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENyZWF0ZUdhbWVGb3JtIGZyb20gJy4vQ3JlYXRlR2FtZUZvcm0nO1xuaW1wb3J0IGlvIGZyb20gJy4uL2lvJztcblxuY29uc3QgSW5kZXggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIFxuICBwcm9wVHlwZXM6IHtcbiAgICBpbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsaW5rOiAnJyxcbiAgICAgIGhhc0V4cGlyZWQ6IGZhbHNlLFxuICAgICAgdGltZTogJzMwJyxcbiAgICAgIGluYzogJzAnXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgaW8gPSB0aGlzLnByb3BzLmlvO1xuXG4gICAgaW8ub24oJ2NyZWF0ZWQnLCBkYXRhID0+IHtcbiAgICAgIGNvbnN0IHt0aW1lLCBpbmN9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGNvbnN0IGxvYyA9IHdpbmRvdy5sb2NhdGlvbjtcblxuICAgICAgY29uc3Qgb3JpZ2luID0gbG9jLm9yaWdpbiB8fCBgJHtsb2MucHJvdG9jb2x9Ly8ke2xvYy5ob3N0bmFtZX1gICtcbiAgICAgICAgKGxvYy5wb3J0ID8gJzonICsgbG9jLnBvcnQgOiAnJyk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBsaW5rOiBgJHtvcmlnaW59L3BsYXkvJHtkYXRhLnRva2VufS8ke3RpbWV9LyR7aW5jfWAsXG4gICAgICAgIGhhc0V4cGlyZWQ6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpby5vbigncmVhZHknLCAoKSA9PiB7XG4gICAgICB3aW5kb3cubG9jYXRpb24gPSB0aGlzLnN0YXRlLmxpbms7XG4gICAgfSk7XG4gICAgaW8ub24oJ3Rva2VuLWV4cGlyZWQnLCAoKSA9PiB0aGlzLnNldFN0YXRlKHtoYXNFeHBpcmVkOiB0cnVlfSkpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxpbWcgc3JjPVwiL2ltZy9zaG91Z3VuLnBuZ1wiXG4gICAgICAgICAgICAgd2lkdGg9XCIxMjJcIlxuICAgICAgICAgICAgIGhlaWdodD1cIjEyMlwiXG4gICAgICAgICAgICAgY2xhc3NOYW1lPVwic2hvdWd1blwiIC8+XG4gICAgICAgIDxoMT5TaG9ndW48L2gxPlxuXG4gICAgICAgIDxkaXYgaWQ9XCJjcmVhdGUtZ2FtZVwiPlxuICAgICAgICAgIDxDcmVhdGVHYW1lRm9ybVxuICAgICAgICAgICAgbGluaz17dGhpcy5zdGF0ZS5saW5rfVxuICAgICAgICAgICAgdGltZT17dGhpcy5zdGF0ZS50aW1lfVxuICAgICAgICAgICAgaW5jPXt0aGlzLnN0YXRlLmluY31cbiAgICAgICAgICAgIG9uQ2hhbmdlRm9ybT17dGhpcy5fb25DaGFuZ2VGb3JtfVxuICAgICAgICAgICAgY3JlYXRlR2FtZT17dGhpcy5fY3JlYXRlR2FtZX0gLz5cbiAgICAgICAgICAgIFxuICAgICAgICAgIDxwIGlkPVwiZ2FtZS1zdGF0dXNcIj5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmhhc0V4cGlyZWQgP1xuICAgICAgICAgICAgICAnR2FtZSBsaW5rIGhhcyBleHBpcmVkLCBnZW5lcmF0ZSBhIG5ldyBvbmUnXG4gICAgICAgICAgICA6dGhpcy5zdGF0ZS5saW5rID9cbiAgICAgICAgICAgICAgJ1dhaXRpbmcgZm9yIG9wcG9uZW50IHRvIGNvbm5lY3QnXG4gICAgICAgICAgICA6bnVsbH1cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxwPlxuICAgICAgICAgIENsaWNrIHRoZSBidXR0b24gdG8gY3JlYXRlIGEgZ2FtZS4gU2VuZCB0aGUgbGluayB0byB5b3VyIGZyaWVuZC5cbiAgICAgICAgICBPbmNlIHRoZSBsaW5rIGlzIG9wZW5lZCB5b3VyIGZyaWVuZOKAmHMgYnJvd3NlciwgZ2FtZSBzaG91bGQgYmVnaW4gXG4gICAgICAgICAgc2hvcnRseS4gQ29sb3JzIGFyZSBwaWNrZWQgcmFuZG9tbHkgYnkgY29tcHV0ZXIuXG4gICAgICAgIDwvcD5cbiAgICAgICAgPHA+XG4gICAgICAgICAgPGEgaHJlZj1cIi9hYm91dFwiIGNsYXNzTmFtZT1cImFscGhhXCI+UmVhZCBtb3JlIGFib3V0IFNob2d1bjwvYT5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuICBfb25DaGFuZ2VGb3JtKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtbZS50YXJnZXQubmFtZV06IGUudGFyZ2V0LnZhbHVlfSk7XG4gIH0sXG4gIF9jcmVhdGVHYW1lKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCB7dGltZSwgaW5jfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgaXNJbnZhbGlkID0gW3RpbWUsIGluY10uc29tZSh2YWwgPT4ge1xuICAgICAgdmFsID0gcGFyc2VJbnQodmFsLCAxMCk7XG4gICAgICByZXR1cm4gaXNOYU4odmFsKSB8fCB2YWwgPCAwIHx8IHZhbCA+IDUwO1xuICAgIH0pO1xuXG4gICAgaWYgKGlzSW52YWxpZCkge1xuICAgICAgLy8gZmFsbGJhY2sgZm9yIG9sZCBicm93c2Vyc1xuICAgICAgcmV0dXJuIHdpbmRvdy5hbGVydCgnRm9ybSBpcyBpbnZhbGlkLiBFbnRlciBudW1iZXJzIGJldHdlZW4gMCBhbmQgNTAuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMuaW8uZW1pdCgnc3RhcnQnKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBJbmRleDsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmNvbnN0IE9SSUdJTiA9ICdodHRwOi8vbG9jYWxob3N0OjEzMzcnO1xuY29uc3QgV1MgPSBPUklHSU47XG5cbmV4cG9ydCBkZWZhdWx0IGlvLmNvbm5lY3QoV1MpOyJdfQ==
