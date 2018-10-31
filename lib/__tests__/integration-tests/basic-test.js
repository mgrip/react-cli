"use strict";

var _react = _interopRequireDefault(require("react"));

var _testRender = _interopRequireDefault(require("./test-render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  strict
(0, _testRender.default)("Renderer should output text", _react.default.createElement("div", null, "Basic test"));