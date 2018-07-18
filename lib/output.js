"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //  strict

exports.default = getOutputFromSection;

var _components = require("./components");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function combineChildren(section) {
  // If we have multiple text nodes in a row, first combine them into one
  var combinedChildren = [];
  var textBuffer = [];
  section.children.forEach(function (child, index) {
    if (child instanceof _components.Text) {
      textBuffer.push(child);
    } else {
      if (textBuffer.length > 0) {
        combinedChildren.push(new _components.Text(textBuffer.map(function (textObject) {
          return textObject.text;
        }).join("")));
        textBuffer = [];
      }
      combinedChildren.push(child);
    }
    if (index === section.children.length - 1 && textBuffer.length > 0) {
      combinedChildren.push(new _components.Text(textBuffer.map(function (textObject) {
        return textObject.text;
      }).join("")));
    }
  });
  return combinedChildren;
}

function getOutputFromSection(_ref) {
  var section = _ref.section,
      width = _ref.width;

  if (section.orientation === "vertical") {
    return new RowOutput({ width: width, section: section });
  } else {
    return new ColumnOutput({ width: width, section: section });
  }
}

var RowOutput = function () {
  function RowOutput(_ref2) {
    var width = _ref2.width,
        section = _ref2.section;

    _classCallCheck(this, RowOutput);

    this.width = width;
    this.section = section;

    var combinedChildren = combineChildren(section);
    this.rows = combinedChildren.reduce(function (acc, child) {
      if (child instanceof _components.Section) {
        return acc.concat(getOutputFromSection({ section: child, width: width }));
      } else if (child instanceof _components.Text) {
        return acc.concat(new TextOutput(section.convertTextToArray(child, width)));
      }
      return acc;
    }, []);
  }

  _createClass(RowOutput, [{
    key: "getLineLength",
    value: function getLineLength() {
      var rowsLineLength = this.rows.reduce(function (acc, child) {
        return acc + child.getLineLength();
      }, 0);
      return rowsLineLength + this.section.border.verticalHeight();
    }
  }, {
    key: "padText",
    value: function padText(_ref3) {
      var text = _ref3.text,
          spacing = _ref3.spacing;

      var border = this.section.border.vertical || "";

      var innerText = void 0;
      switch (this.section.align) {
        case "left":
          innerText = text.padEnd(this.width - border.length * 2, spacing);
          break;
        case "right":
          innerText = text.padStart(this.width - border.length * 2, spacing);
          break;
        default:
          innerText = text.padStart((this.width - border.length * 2) / 2 + text.length / 2, spacing).padEnd(this.width - border.length * 2, spacing);
          break;
      }
      return border + innerText + border;
    }
  }, {
    key: "generateOutput",
    value: function generateOutput(_ref4) {
      var _this = this;

      var currentLineIndex = _ref4.currentLineIndex,
          startLineIndex = _ref4.startLineIndex,
          spacing = _ref4.spacing;

      var topBorderLength = Math.max((this.section.border.horizontal || "").length, (this.section.border.cornerTopLeft || "").length, (this.section.border.cornerTopRight || "").length);
      var bottomBorderLength = Math.max((this.section.border.horizontal || "").length, (this.section.border.cornerBottomLeft || "").length, (this.section.border.cornerBottomRight || "").length);

      var outputString = "";

      // print top border
      if (topBorderLength > 0 && currentLineIndex < startLineIndex + topBorderLength && currentLineIndex >= startLineIndex) {
        // @TODO need to account for corners and borders more than 1 length
        return outputString.padEnd(this.width, this.section.border.horizontal || "");
      }

      // print bottom border
      if (bottomBorderLength > 0 && currentLineIndex < startLineIndex + this.getLineLength() && currentLineIndex >= startLineIndex + this.getLineLength() - bottomBorderLength) {
        // @TODO need to account for corners and borders more than 1 length
        return outputString.padEnd(this.width, this.section.border.horizontal || "");
      }

      var tempLineIndex = startLineIndex + topBorderLength;
      this.rows.forEach(function (child) {
        if (currentLineIndex >= tempLineIndex && currentLineIndex < tempLineIndex + child.getLineLength()) {
          if (child instanceof RowOutput || child instanceof ColumnOutput) {
            outputString += _this.padText({
              spacing: spacing,
              text: child.generateOutput({
                currentLineIndex: currentLineIndex,
                startLineIndex: tempLineIndex,
                spacing: spacing
              })
            });
          } else if (child instanceof TextOutput) {
            if (currentLineIndex >= tempLineIndex && currentLineIndex < tempLineIndex + child.getLineLength()) {
              var potentialOutput = child.text[currentLineIndex - tempLineIndex] || "";
              outputString += _this.padText({ spacing: spacing, text: potentialOutput });
            }
          }
        }
        tempLineIndex += child.getLineLength();
      });
      return outputString;
    }
  }]);

  return RowOutput;
}();

var ColumnOutput = function () {
  function ColumnOutput(_ref5) {
    var width = _ref5.width,
        section = _ref5.section;

    _classCallCheck(this, ColumnOutput);

    this.width = width;
    this.section = section;

    var combinedChildren = combineChildren(section);
    var columnNumber = combinedChildren.reduce(function (acc, child) {
      return child instanceof _components.Break ? acc : acc + 1;
    }, 0);
    this.columns = combinedChildren.reduce(function (acc, child) {
      if (child instanceof _components.Section) {
        return acc.concat(getOutputFromSection({ section: child, width: width / columnNumber }));
      } else if (child instanceof _components.Text) {
        return acc.concat(new TextOutput(section.convertTextToArray(child, width / columnNumber)));
      }
      return acc;
    }, []);
  }

  _createClass(ColumnOutput, [{
    key: "getLineLength",
    value: function getLineLength() {
      var maxColumnHeight = this.columns.reduce(function (max, column) {
        var columnLength = column.getLineLength();
        return columnLength > max ? columnLength : max;
      }, 0);
      return maxColumnHeight + this.section.border.verticalHeight();
    }
  }, {
    key: "padText",
    value: function padText(_ref6) {
      var text = _ref6.text,
          spacing = _ref6.spacing,
          index = _ref6.index;

      var border = this.section.border.vertical || "";
      var innerWidth = this.width - this.section.border.horizontalWidth();
      var innerText = void 0;

      switch (this.section.align) {
        case "left":
          innerText = text.padEnd(innerWidth / this.columns.length, spacing);
          break;
        case "right":
          innerText = text.padStart(innerWidth / this.columns.length, spacing);
          break;
        default:
          innerText = text.padStart(innerWidth / this.columns.length / 2 + text.length / 2, spacing).padEnd(innerWidth / this.columns.length, spacing);
          break;
      }
      if (index === 0) {
        return border + innerText;
      } else if (index === this.columns.length - 1) {
        return innerText + border;
      }
      return innerText;
    }
  }, {
    key: "generateOutput",
    value: function generateOutput(_ref7) {
      var _this2 = this;

      var currentLineIndex = _ref7.currentLineIndex,
          startLineIndex = _ref7.startLineIndex,
          spacing = _ref7.spacing;

      var maxColumnHeight = this.columns.reduce(function (acc, column) {
        var currentColumnHeight = column.getLineLength();
        return currentColumnHeight > acc ? currentColumnHeight : acc;
      }, 0);
      var topBorderLength = Math.max((this.section.border.horizontal || "").length, (this.section.border.cornerTopLeft || "").length, (this.section.border.cornerTopRight || "").length);
      var bottomBorderLength = Math.max((this.section.border.horizontal || "").length, (this.section.border.cornerBottomLeft || "").length, (this.section.border.cornerBottomRight || "").length);

      var outputString = "";

      // print top border
      if (topBorderLength > 0 && currentLineIndex < startLineIndex + topBorderLength && currentLineIndex >= startLineIndex) {
        // @TODO need to account for corners and borders more than 1 length
        return outputString.padEnd(this.width, this.section.border.horizontal || "");
      }

      // print bottom border
      if (bottomBorderLength > 0 && currentLineIndex < startLineIndex + this.getLineLength() && currentLineIndex >= startLineIndex + this.getLineLength() - bottomBorderLength) {
        // @TODO need to account for corners and borders more than 1 length
        return outputString.padEnd(this.width, this.section.border.horizontal || "");
      }

      this.columns.forEach(function (column, columnIndex) {
        if (currentLineIndex >= startLineIndex + topBorderLength + column.getLineLength()) {
          if (currentLineIndex < startLineIndex + topBorderLength + maxColumnHeight) {
            outputString += _this2.padText({
              text: "",
              spacing: spacing,
              index: columnIndex
            });
          }
        } else {
          if (column instanceof RowOutput || column instanceof ColumnOutput) {
            outputString += _this2.padText({
              text: column.generateOutput({
                currentLineIndex: currentLineIndex,
                startLineIndex: startLineIndex + topBorderLength,
                spacing: spacing
              }),
              spacing: spacing,
              index: columnIndex
            });
          } else if (column instanceof TextOutput) {
            var potentialOutput = column.text[currentLineIndex - topBorderLength - startLineIndex] || "";
            outputString += _this2.padText({
              spacing: spacing,
              text: potentialOutput,
              index: columnIndex
            });
          }
        }
      });
      return outputString;
    }
  }]);

  return ColumnOutput;
}();

var TextOutput = function () {
  function TextOutput(text) {
    _classCallCheck(this, TextOutput);

    this.text = text;
  }

  _createClass(TextOutput, [{
    key: "getLineLength",
    value: function getLineLength() {
      return this.text.length;
    }
  }]);

  return TextOutput;
}();