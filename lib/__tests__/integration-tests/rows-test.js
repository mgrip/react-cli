"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _testRender = require("./test-render");

var _testRender2 = _interopRequireDefault(_testRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  strict

(0, _testRender2.default)("Rows should render on new lines", _react2.default.createElement(
  "div",
  null,
  "1st row",
  _react2.default.createElement("br", null),
  "2nd row",
  _react2.default.createElement("br", null),
  "3rd row"
));