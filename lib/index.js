"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //  strict

var _reconciler = require("./reconciler");

var _reconciler2 = _interopRequireDefault(_reconciler);

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _logUpdate = require("log-update");

var _logUpdate2 = _interopRequireDefault(_logUpdate);

var _components = require("./components");

var _output = require("./output");

var _output2 = _interopRequireDefault(_output);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
      var output = (0, _output2.default)({
        section: this.root,
        width: this.consoleWidth
      });

      var outputString = "";
      var currentLineIndex = 0;
      while (currentLineIndex < output.getLineLength()) {
        outputString += output.generateOutput({
          currentLineIndex: currentLineIndex,
          spacing: this.spacing,
          startLineIndex: 0
        });
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