"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _testRender = require("./test-render");

var _testRender2 = _interopRequireDefault(_testRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  strict

(0, _testRender2.default)("Renderer should output text", _react2.default.createElement(
  "div",
  null,
  "Basic test"
));