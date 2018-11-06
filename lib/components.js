"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Break = exports.Text = exports.Section = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//  strict
var Border =
/*#__PURE__*/
function () {
  function Border(_ref) {
    var vertical = _ref.vertical,
        horizontal = _ref.horizontal,
        cornerTopLeft = _ref.cornerTopLeft,
        cornerTopRight = _ref.cornerTopRight,
        cornerBottomLeft = _ref.cornerBottomLeft,
        cornerBottomRight = _ref.cornerBottomRight;

    _classCallCheck(this, Border);

    _defineProperty(this, "vertical", void 0);

    _defineProperty(this, "horizontal", void 0);

    _defineProperty(this, "cornerTopLeft", void 0);

    _defineProperty(this, "cornerTopRight", void 0);

    _defineProperty(this, "cornerBottomLeft", void 0);

    _defineProperty(this, "cornerBottomRight", void 0);

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

var Section = function Section(_ref2) {
  var _ref2$useHorizontalOr = _ref2.useHorizontalOrientation,
      useHorizontalOrientation = _ref2$useHorizontalOr === void 0 ? false : _ref2$useHorizontalOr,
      _ref2$align = _ref2.align,
      align = _ref2$align === void 0 ? "left" : _ref2$align,
      _ref2$border = _ref2.border,
      border = _ref2$border === void 0 ? {} : _ref2$border,
      maxHeight = _ref2.maxHeight;

  _classCallCheck(this, Section);

  _defineProperty(this, "orientation", void 0);

  _defineProperty(this, "align", void 0);

  _defineProperty(this, "children", []);

  _defineProperty(this, "border", void 0);

  _defineProperty(this, "maxHeight", void 0);

  this.orientation = useHorizontalOrientation ? "horizontal" : "vertical";
  this.align = align;
  this.border = new Border(border);
  this.maxHeight = maxHeight;
};

exports.Section = Section;

_defineProperty(Section, "type", "div");

var Text = function Text(text) {
  _classCallCheck(this, Text);

  _defineProperty(this, "text", void 0);

  this.text = text;
};

exports.Text = Text;

var Break = function Break() {
  _classCallCheck(this, Break);
};

exports.Break = Break;

_defineProperty(Break, "type", "br");