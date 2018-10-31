"use strict";

var _react = _interopRequireDefault(require("react"));

var _testRender = _interopRequireDefault(require("./test-render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  strict
(0, _testRender.default)("Columns and rows should work together", _react.default.createElement("div", null, "Some text", _react.default.createElement("div", {
  horizontal: true
}, _react.default.createElement("div", null, "Column A"), _react.default.createElement("div", null, "Column B"), _react.default.createElement("div", null, "Column C")), "Other text"));
(0, _testRender.default)("Columns should work nested within other columns", _react.default.createElement("div", {
  horizontal: true
}, _react.default.createElement("div", null, "Column A"), _react.default.createElement("div", null, "Column B", _react.default.createElement("div", {
  horizontal: true,
  align: "center"
}, "Some other text that should probably wrap", _react.default.createElement("br", null), "And heres the other column")), _react.default.createElement("div", null, "Column C")));
(0, _testRender.default)("Columns, rows, section styles should all work together", _react.default.createElement("div", {
  align: "center",
  border: {
    horizontal: "#",
    vertical: "#"
  }
}, "Some App", _react.default.createElement("br", null), _react.default.createElement("div", {
  horizontal: true
}, _react.default.createElement("div", {
  align: "center",
  border: {
    horizontal: "*",
    vertical: "*"
  }
}, "\u2714\uFE0E Step 1", _react.default.createElement("br", null), "\u25EF Step 2", _react.default.createElement("br", null), "\u25EF Step 3"), _react.default.createElement("div", {
  border: {
    horizontal: "-",
    vertical: "|"
  }
}, "Some messages for this app")), _react.default.createElement("div", {
  align: "center"
}, "Some stuff for this app is done! \uD83E\uDD18", _react.default.createElement("br", null), "Heres some more informative stuff about your app", _react.default.createElement("br", null), "browser", _react.default.createElement("br", null), "\u2199\u2197 \u2196\u2198", _react.default.createElement("div", {
  horizontal: true
}, _react.default.createElement("div", {
  align: "center",
  border: {
    horizontal: "-",
    vertical: "|"
  }
}, "server", _react.default.createElement("br", null), "(initial response)", _react.default.createElement("br", null), "localhost:3000"), _react.default.createElement("div", {
  align: "center",
  border: {
    horizontal: "-",
    vertical: "|"
  }
}, "dev-server", _react.default.createElement("br", null), "(app bundle)", _react.default.createElement("br", null), "localhost:8080", _react.default.createElement("br", null), "websocket server (for HMR)", _react.default.createElement("br", null), "localhost:8081")))));