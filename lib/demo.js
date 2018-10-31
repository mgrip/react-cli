"use strict";

var _index = _interopRequireDefault(require("./index"));

var _react = _interopRequireDefault(require("react"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MyReactCLIApp =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MyReactCLIApp, _React$Component);

  function MyReactCLIApp() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MyReactCLIApp);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MyReactCLIApp)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      step: 0
    });

    return _this;
  }

  _createClass(MyReactCLIApp, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        border: {
          horizontal: "*",
          vertical: "*"
        },
        align: "center"
      }, "My ", _chalk.default.blue("New"), " ", _chalk.default.magenta("ReactCLI App"), " \uD83D\uDE80", _react.default.createElement("div", {
        horizontal: true
      }, _react.default.createElement("div", {
        align: "center"
      }, this.state.step >= 1 ? _chalk.default.green("✔︎") : "◯", " Step 1", _react.default.createElement("br", null), this.state.step >= 2 ? _chalk.default.green("✔︎") : "◯", " Step 2", _react.default.createElement("br", null), this.state.step >= 3 ? _chalk.default.green("✔︎") : "◯", " Step 3"), _react.default.createElement("div", {
        border: {
          horizontal: "-",
          vertical: "|"
        },
        align: "center"
      }, "Number of steps done:", " ", _chalk.default.bold.magenta(this.state.step.toString()))));
    }
  }]);

  return MyReactCLIApp;
}(_react.default.Component);

var appReference = _react.default.createRef();

_index.default.render(_react.default.createElement(MyReactCLIApp, {
  ref: appReference
}), undefined, 60);

setTimeout(function () {
  return appReference.current && appReference.current.setState({
    step: 1
  });
}, 1000);
setTimeout(function () {
  return appReference.current && appReference.current.setState({
    step: 2
  });
}, 2000);
setTimeout(function () {
  return appReference.current && appReference.current.setState({
    step: 3
  });
}, 3000);