"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _testRender = require("./test-render");

var _testRender2 = _interopRequireDefault(_testRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  strict

(0, _testRender2.default)("Horizontal sections should render as columns", _react2.default.createElement(
  "div",
  { horizontal: true },
  "1st column",
  _react2.default.createElement("br", null),
  "2nd column",
  _react2.default.createElement("br", null),
  "3rd column"
));