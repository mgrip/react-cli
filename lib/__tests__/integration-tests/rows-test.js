"use strict";

var _react = _interopRequireDefault(require("react"));

var _testRender = _interopRequireDefault(require("./test-render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  strict
(0, _testRender.default)("Rows should render on new lines", _react.default.createElement("div", null, "1st row", _react.default.createElement("br", null), "2nd row", _react.default.createElement("br", null), "3rd row"));