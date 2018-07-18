"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Break = exports.Text = exports.Section = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //  strict

var _wrapAnsi = require("wrap-ansi");

var _wrapAnsi2 = _interopRequireDefault(_wrapAnsi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// this module is helpful for dealing with ansi characters, but it returns a
// string with embedded new lines. We need it as an array, so we'll split it here
var wrapAnsi = function wrapAnsi(input, columns) {
  return (0, _wrapAnsi2.default)(input, columns).split("\n");
};

var Border = function () {
  function Border(_ref) {
    var vertical = _ref.vertical,
        horizontal = _ref.horizontal,
        cornerTopLeft = _ref.cornerTopLeft,
        cornerTopRight = _ref.cornerTopRight,
        cornerBottomLeft = _ref.cornerBottomLeft,
        cornerBottomRight = _ref.cornerBottomRight;

    _classCallCheck(this, Border);

    this.vertical = vertical;
    this.horizontal = horizontal;
    this.cornerTopLeft = cornerTopLeft;
    this.cornerTopRight = cornerTopRight;
    this.cornerBottomLeft = cornerBottomLeft;
    this.cornerBottomRight = cornerBottomRight;
  }

  _createClass(Border, [{
    key: "horizontalWidth",
    value: function horizontalWidth() {
      return Math.max(this.vertical ? this.vertical.length : 0, this.cornerTopLeft ? this.cornerTopLeft.length : 0, this.cornerBottomLeft ? this.cornerBottomLeft.length : 0) + Math.max(this.vertical ? this.vertical.length : 0, this.cornerTopRight ? this.cornerTopRight.length : 0, this.cornerBottomRight ? this.cornerBottomRight.length : 0);
    }
  }, {
    key: "verticalHeight",
    value: function verticalHeight() {
      return Math.max(this.horizontal ? this.horizontal.length : 0, this.cornerTopLeft ? this.cornerTopLeft.length : 0, this.cornerTopRight ? this.cornerTopRight.length : 0) + Math.max(this.horizontal ? this.horizontal.length : 0, this.cornerBottomLeft ? this.cornerBottomLeft.length : 0, this.cornerBottomRight ? this.cornerBottomRight.length : 0);
    }
  }]);

  return Border;
}();

var Section = exports.Section = function () {
  function Section(_ref2) {
    var _ref2$useHorizontalOr = _ref2.useHorizontalOrientation,
        useHorizontalOrientation = _ref2$useHorizontalOr === undefined ? false : _ref2$useHorizontalOr,
        _ref2$align = _ref2.align,
        align = _ref2$align === undefined ? "left" : _ref2$align,
        _ref2$border = _ref2.border,
        border = _ref2$border === undefined ? {} : _ref2$border;

    _classCallCheck(this, Section);

    this.children = [];

    this.orientation = useHorizontalOrientation ? "horizontal" : "vertical";
    this.align = align;
    this.border = new Border(border);
  }

  _createClass(Section, [{
    key: "convertTextToArray",
    value: function convertTextToArray(text, totalWidth) {
      return wrapAnsi(text.text, totalWidth - this.border.horizontalWidth());
    }
  }]);

  return Section;
}();

Section.type = "div";

var Text = exports.Text = function Text(text) {
  _classCallCheck(this, Text);

  this.text = text;
};

var Break = exports.Break = function Break() {
  _classCallCheck(this, Break);
};

Break.type = "br";