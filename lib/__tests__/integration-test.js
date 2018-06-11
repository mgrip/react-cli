"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  strict

test("base console test", function (done) {
  _index2.default.render(_react2.default.createElement(
    "div",
    { horizontal: true },
    "1st column",
    _react2.default.createElement("br", null),
    "2nd column",
    _react2.default.createElement("br", null),
    "3rd column"
  ), function (output) {
    expect(output).toMatchSnapshot();
    done();
  }, undefined, "+");
});

test("base console rows", function (done) {
  _index2.default.render(_react2.default.createElement(
    "div",
    null,
    "1st row",
    _react2.default.createElement("br", null),
    "2nd row",
    _react2.default.createElement("br", null),
    "3rd row"
  ), function (output) {
    expect(output).toMatchSnapshot();
    done();
  }, undefined, "+");
});

test("nested", function (done) {
  _index2.default.render(_react2.default.createElement(
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
  ), function (output) {
    expect(output).toMatchSnapshot();
    done();
  }, undefined, "+");
});

test("nested 2", function (done) {
  _index2.default.render(_react2.default.createElement(
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
        { horizontal: true },
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
  ), function (output) {
    expect(output).toMatchSnapshot();
    done();
  }, undefined, "+");
});