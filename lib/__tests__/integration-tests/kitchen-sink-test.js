"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _testRender = require("./test-render");

var _testRender2 = _interopRequireDefault(_testRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  strict

(0, _testRender2.default)("Columns and rows should work together", _react2.default.createElement(
  "div",
  null,
  "Some text",
  _react2.default.createElement(
    "div",
    { horizontal: true },
    _react2.default.createElement(
      "div",
      null,
      "Column A"
    ),
    _react2.default.createElement(
      "div",
      null,
      "Column B"
    ),
    _react2.default.createElement(
      "div",
      null,
      "Column C"
    )
  ),
  "Other text"
));

(0, _testRender2.default)("Columns should work nested within other columns", _react2.default.createElement(
  "div",
  { horizontal: true },
  _react2.default.createElement(
    "div",
    null,
    "Column A"
  ),
  _react2.default.createElement(
    "div",
    null,
    "Column B",
    _react2.default.createElement(
      "div",
      { horizontal: true, align: "center" },
      "Some other text that should probably wrap",
      _react2.default.createElement("br", null),
      "And heres the other column"
    )
  ),
  _react2.default.createElement(
    "div",
    null,
    "Column C"
  )
));