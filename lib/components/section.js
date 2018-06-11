"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } //  strict


var Section = function Section() {
  _classCallCheck(this, Section);

  this.vertical = false;
  this.children = [];
} // @TODO: use this
;

exports.default = Section;