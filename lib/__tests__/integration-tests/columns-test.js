"use strict";

var _react = _interopRequireDefault(require("react"));

var _testRender = _interopRequireDefault(require("./test-render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  strict
(0, _testRender.default)("Horizontal sections should render as columns", _react.default.createElement("div", {
  horizontal: true
}, "1st column", _react.default.createElement("br", null), "2nd column", _react.default.createElement("br", null), "3rd column"));