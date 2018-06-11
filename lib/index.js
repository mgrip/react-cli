"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Break = exports.Text = exports.Section = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reconciler = require("./reconciler");

var _reconciler2 = _interopRequireDefault(_reconciler);

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _wrapAnsi = require("wrap-ansi");

var _wrapAnsi2 = _interopRequireDefault(_wrapAnsi);

var _logUpdate = require("log-update");

var _logUpdate2 = _interopRequireDefault(_logUpdate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } //  strict

// this module is helpful for dealing with ansi characters, but it returns a
// string with embedded new lines. We need it as an array, so we'll split it here
var wrapAnsi = function wrapAnsi(input, columns) {
  return (0, _wrapAnsi2.default)(input, columns).split("\n");
};

var Section = exports.Section = function Section() {
  var useHorizontalOrientation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var align = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "left";

  _classCallCheck(this, Section);

  this.children = [];

  this.orientation = useHorizontalOrientation ? "horizontal" : "vertical";
  this.align = align;
};

Section.type = "div";

var Text = exports.Text = function Text(text) {
  _classCallCheck(this, Text);

  this.text = text;
};

var Break = exports.Break = function Break() {
  _classCallCheck(this, Break);
};

Break.type = "br";

var Console = function () {
  function Console(_ref) {
    var handler = _ref.handler,
        spacing = _ref.spacing,
        width = _ref.width;

    _classCallCheck(this, Console);

    // use width override, then console width, then hardcoded default as last resort
    this.consoleWidth = width ? width : typeof process.stdout.columns === "number" ? process.stdout.columns - 10 : 100;
    this.handler = handler ? handler : function (outputString) {
      return (0, _logUpdate2.default)(outputString);
    };
    this.spacing = spacing || " ";
  }

  _createClass(Console, [{
    key: "update",
    value: function update() {
      var _this = this;

      var widthCheck = function widthCheck(section, totalWidth) {
        // If we have multiple text nodes in a row, first combine them into one
        var combinedChildren = [];
        var textBuffer = [];
        section.children.forEach(function (child, index) {
          if (child instanceof Text) {
            textBuffer.push(child);
          } else {
            if (textBuffer.length > 0) {
              combinedChildren.push(new Text(textBuffer.map(function (textObject) {
                return textObject.text;
              }).join("")));
              textBuffer = [];
            }
            combinedChildren.push(child);
          }
          if (index === section.children.length - 1 && textBuffer.length > 0) {
            combinedChildren.push(new Text(textBuffer.map(function (textObject) {
              return textObject.text;
            }).join("")));
          }
        });
        if (section.orientation === "horizontal") {
          var columnNumber = section.children.reduce(function (acc, child) {
            return child instanceof Break ? acc : acc + 1;
          }, 0);
          return {
            width: totalWidth,
            columns: combinedChildren.reduce(function (acc, child) {
              if (child instanceof Section) {
                return acc.concat(widthCheck(child, totalWidth / columnNumber));
              } else if (child instanceof Text) {
                return acc.concat({
                  width: totalWidth / columnNumber,
                  text: wrapAnsi(child.text, totalWidth / columnNumber),
                  type: "text",
                  align: section.align
                });
              }
              return acc;
            }, []),
            type: "horizontal"
          };
        } else {
          return {
            width: totalWidth,
            rows: combinedChildren.reduce(function (acc, child) {
              if (child instanceof Section) {
                return acc.concat(widthCheck(child, totalWidth));
              } else if (child instanceof Text) {
                return acc.concat({
                  width: totalWidth,
                  text: wrapAnsi(child.text, totalWidth),
                  type: "text",
                  align: section.align
                });
              }
              return acc;
            }, []),
            type: "vertical"
          };
        }
      };
      var output = widthCheck(this.root, this.consoleWidth);

      var getOutputLineLength = function getOutputLineLength(outputObject) {
        if (outputObject.type === "horizontal") {
          return outputObject.columns.reduce(function (max, column) {
            var columnLength = getOutputLineLength(column);
            return columnLength > max ? columnLength : max;
          }, 0);
        } else if (outputObject.type === "text") {
          return outputObject.text.length;
        } else {
          return outputObject.rows.reduce(function (acc, child) {
            return acc + getOutputLineLength(child);
          }, 0);
        }
      };

      var outputString = "";
      var currentLineIndex = 0;
      var generateOutput = function generateOutput(outputObject, lineIndex) {
        if (outputObject.type === "horizontal") {
          var maxColumnHeight = outputObject.columns.reduce(function (acc, column) {
            var currentColumnHeight = getOutputLineLength(column);
            return currentColumnHeight > acc ? currentColumnHeight : acc;
          }, 0);
          outputObject.columns.forEach(function (column) {
            if (currentLineIndex >= lineIndex + getOutputLineLength(column)) {
              if (currentLineIndex < lineIndex + maxColumnHeight) {
                outputString += "".padEnd(column.width, _this.spacing);
              }
            } else {
              generateOutput(column, lineIndex);
            }
          });
        } else if (outputObject.type === "text") {
          if (currentLineIndex >= lineIndex && currentLineIndex < lineIndex + outputObject.text.length) {
            var potentialOutput = outputObject.text[currentLineIndex - lineIndex];
            switch (outputObject.align) {
              case "left":
                outputString += (potentialOutput || "").padEnd(outputObject.width, _this.spacing);
                break;
              case "right":
                outputString += (potentialOutput || "").padStart(outputObject.width, _this.spacing);
                break;
              case "center":
                outputString += (potentialOutput || "").padStart(outputObject.width / 2 + potentialOutput.length / 2, _this.spacing).padEnd(outputObject.width, _this.spacing);
                break;
            }
          }
        } else {
          var tempLineIndex = lineIndex;
          outputObject.rows.forEach(function (child) {
            if (tempLineIndex <= currentLineIndex) {
              generateOutput(child, tempLineIndex);
              tempLineIndex += getOutputLineLength(child);
            }
          });
        }
      };
      while (currentLineIndex < getOutputLineLength(output)) {
        generateOutput(output, 0);
        outputString += "\n";
        currentLineIndex++;
      }
      this.handler(outputString);
    }
  }]);

  return Console;
}();

exports.default = {
  render: function render(element, callback, width, handler, spacing) {
    var container = new Console({ handler: handler, spacing: spacing, width: width });
    var node = _reconciler2.default.createContainer(container);
    _reconciler2.default.updateContainer(element, node, null, callback);
  }
};