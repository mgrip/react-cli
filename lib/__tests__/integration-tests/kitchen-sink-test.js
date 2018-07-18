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

(0, _testRender2.default)("Columns, rows, section styles should all work together", _react2.default.createElement(
  "div",
  { align: "center", border: { horizontal: "#", vertical: "#" } },
  "Some App",
  _react2.default.createElement("br", null),
  _react2.default.createElement(
    "div",
    { horizontal: true },
    _react2.default.createElement(
      "div",
      { align: "center", border: { horizontal: "*", vertical: "*" } },
      "\u2714\uFE0E Step 1",
      _react2.default.createElement("br", null),
      "\u25EF Step 2",
      _react2.default.createElement("br", null),
      "\u25EF Step 3"
    ),
    _react2.default.createElement(
      "div",
      { border: { horizontal: "-", vertical: "|" } },
      "Some messages for this app"
    )
  ),
  _react2.default.createElement(
    "div",
    { align: "center" },
    "Some stuff for this app is done! \uD83E\uDD18",
    _react2.default.createElement("br", null),
    "Heres some more informative stuff about your app",
    _react2.default.createElement("br", null),
    "browser",
    _react2.default.createElement("br", null),
    "\u2199\u2197 \u2196\u2198",
    _react2.default.createElement(
      "div",
      { horizontal: true },
      _react2.default.createElement(
        "div",
        { align: "center", border: { horizontal: "-", vertical: "|" } },
        "server",
        _react2.default.createElement("br", null),
        "(initial response)",
        _react2.default.createElement("br", null),
        "localhost:3000"
      ),
      _react2.default.createElement(
        "div",
        { align: "center", border: { horizontal: "-", vertical: "|" } },
        "dev-server",
        _react2.default.createElement("br", null),
        "(app bundle)",
        _react2.default.createElement("br", null),
        "localhost:8080",
        _react2.default.createElement("br", null),
        "websocket server (for HMR)",
        _react2.default.createElement("br", null),
        "localhost:8081"
      )
    )
  )
));