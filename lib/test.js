"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //  strict

var Test = function (_React$Component) {
  _inherits(Test, _React$Component);

  function Test(props) {
    _classCallCheck(this, Test);

    var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

    _this.state = {
      counter: 0
    };
    setTimeout(function () {
      _this.setState(function (prevState) {
        return { counter: prevState.counter + 1 };
      });
      setTimeout(function () {
        return _this.setState(function (prevState) {
          return { counter: prevState.counter + 1 };
        });
      }, 1000);
    }, 1000);
    return _this;
  }

  _createClass(Test, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        "AAAAAAA AAAAAAAAAAA AAAAAAAAAAAAAAAA AAAAAAAAAAAAA AAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAA A",
        _react2.default.createElement("br", null),
        "BBBBBBBBBBBBBBBB BBBBBBBBBBBB count: ",
        this.state.counter
      );
    }
  }]);

  return Test;
}(_react2.default.Component);

_index2.default.render(_react2.default.createElement(
  "div",
  null,
  _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(Test, null),
    _react2.default.createElement(
      "div",
      null,
      "CCCCCCCCCCCCCCCCCCCCc CCCCCCCCCCCCCc CCCCCCCCCCCCCCCCCCC CCCCCCCCCCCCCCc CCCCCCCCCCCCc CCCCCCCCCCCCCC CCCCCCCCCCCC CCCCCCCCCCCCCC CCCCCCCCCCCCCC CCCCCCCCCCCCCC CCCCCCC"
    )
  ),
  _react2.default.createElement(
    "div",
    null,
    "DDDDDDDDDDDDDDD DDDDDDDDDDDDDDDDDD DDDDDDDDDDDDDDDDDDDd DDDDD"
  )
));