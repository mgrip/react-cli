"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //  strict-local

var MyReactCLIApp = function (_React$Component) {
  _inherits(MyReactCLIApp, _React$Component);

  function MyReactCLIApp() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MyReactCLIApp);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyReactCLIApp.__proto__ || Object.getPrototypeOf(MyReactCLIApp)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      step: 0
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MyReactCLIApp, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { border: { horizontal: "*", vertical: "*" }, align: "center" },
        "My ",
        _chalk2.default.blue("New"),
        " ",
        _chalk2.default.magenta("ReactCLI App"),
        " \uD83D\uDE80",
        _react2.default.createElement(
          "div",
          { horizontal: true },
          _react2.default.createElement(
            "div",
            { align: "center" },
            this.state.step >= 1 ? _chalk2.default.green("✔︎") : "◯",
            " Step 1",
            _react2.default.createElement("br", null),
            this.state.step >= 2 ? _chalk2.default.green("✔︎") : "◯",
            " Step 2",
            _react2.default.createElement("br", null),
            this.state.step >= 3 ? _chalk2.default.green("✔︎") : "◯",
            " Step 3"
          ),
          _react2.default.createElement(
            "div",
            { border: { horizontal: "-", vertical: "|" }, align: "center" },
            "Number of steps done:",
            " ",
            _chalk2.default.bold.magenta(this.state.step.toString())
          )
        )
      );
    }
  }]);

  return MyReactCLIApp;
}(_react2.default.Component);

var appReference = _react2.default.createRef();
_index2.default.render(_react2.default.createElement(MyReactCLIApp, { ref: appReference }), undefined, 60);
setTimeout(function () {
  return appReference.current && appReference.current.setState({ step: 1 });
}, 1000);
setTimeout(function () {
  return appReference.current && appReference.current.setState({ step: 2 });
}, 2000);
setTimeout(function () {
  return appReference.current && appReference.current.setState({ step: 3 });
}, 3000);