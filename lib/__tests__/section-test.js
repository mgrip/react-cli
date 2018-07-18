"use strict";

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//  strict

test("sections should be able to render horizontally", function (done) {
  _index2.default.render(React.createElement(
    "div",
    { horizontal: true },
    "Column 1 ",
    React.createElement("br", null),
    " Column 2"
  ), undefined, 50, function (outputString) {
    expect(outputString).toMatchSnapshot();
    done();
  }, "+");
});

test("sections should be able to render vertically", function (done) {
  _index2.default.render(React.createElement(
    "div",
    null,
    "Row 1 ",
    React.createElement("br", null),
    " Row 2"
  ), undefined, 50, function (outputString) {
    expect(outputString).toMatchSnapshot();
    done();
  }, "+");
});

test("sections should be able to align text left", function (done) {
  _index2.default.render(React.createElement(
    "div",
    { align: "left" },
    "Left text"
  ), undefined, 50, function (outputString) {
    expect(outputString).toMatchSnapshot();
    done();
  }, "+");
});

test("sections should be able to align text right", function (done) {
  _index2.default.render(React.createElement(
    "div",
    { align: "right" },
    "Right text"
  ), undefined, 50, function (outputString) {
    expect(outputString).toMatchSnapshot();
    done();
  }, "+");
});

test("sections should be able to align text center", function (done) {
  _index2.default.render(React.createElement(
    "div",
    { align: "center" },
    "Center text"
  ), undefined, 50, function (outputString) {
    expect(outputString).toMatchSnapshot();
    done();
  }, "+");
});

test("sections should be able to render a border", function (done) {
  _index2.default.render(React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      {
        align: "center",
        border: {
          horizontal: "-",
          vertical: "|",
          cornerTopLeft: "*",
          cornerTopRight: "*",
          cornerBottomLeft: "*",
          cornerBottomRight: "*"
        }
      },
      "Test section with border"
    )
  ), undefined, 50, function (outputString) {
    expect(outputString).toMatchSnapshot();
    done();
  }, "+");

  _index2.default.render(React.createElement(
    "div",
    { horizontal: true, border: { horizontal: "*", vertical: "*" } },
    "Some Text",
    React.createElement(
      "div",
      {
        align: "center",
        border: {
          horizontal: "-",
          vertical: "|",
          cornerTopLeft: "*",
          cornerTopRight: "*",
          cornerBottomLeft: "*",
          cornerBottomRight: "*"
        }
      },
      "Test section with border"
    )
  ), undefined, 50, function (outputString) {
    expect(outputString).toMatchSnapshot();
    done();
  }, "+");
});