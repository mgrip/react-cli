"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Section = SectionComponent;
exports.watchStdout = watchStdout;
exports.default = render;

var _reconciler = _interopRequireDefault(require("./reconciler"));

var React = _interopRequireWildcard(require("react"));

var _ansiEscapes = _interopRequireDefault(require("ansi-escapes"));

var _components = require("./components");

var _output = _interopRequireDefault(require("./output"));

var _interceptStdout = _interopRequireDefault(require("intercept-stdout"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var previousLineCount = 0;

function writeToConsole(output) {
  process.stdout.write(_ansiEscapes.default.eraseLines(previousLineCount) + output);
  previousLineCount = output.split("\n").length;
}

var Console =
/*#__PURE__*/
function () {
  function Console(_ref) {
    var handler = _ref.handler,
        spacing = _ref.spacing,
        width = _ref.width;

    _classCallCheck(this, Console);

    _defineProperty(this, "consoleWidth", void 0);

    _defineProperty(this, "root", void 0);

    _defineProperty(this, "handler", void 0);

    _defineProperty(this, "spacing", void 0);

    // use width override, then console width, then hardcoded default as last resort
    this.consoleWidth = width ? width : typeof process.stdout.columns === "number" ? process.stdout.columns - 10 : 100;

    if (handler) {
      this.handler = handler;
    } else {
      var stopIntercept;

      this.handler = function (outputString) {
        if (stopIntercept) {
          stopIntercept();
        }

        writeToConsole(outputString); // if any other console output comes in, first print that, then re-print
        // our node tree underneath
        // @TODO: figure out if there's a bettre way to do this, or if we could
        // pass it to the component being rendered so client's can handle output

        stopIntercept = (0, _interceptStdout.default)(function (stdoutText) {
          stdOutListeners.forEach(function (listener) {
            listener(stdoutText.split("\n"));
          });
        });
      };
    }

    this.spacing = spacing || " ";
  }

  _createClass(Console, [{
    key: "update",
    value: function update() {
      var output = (0, _output.default)({
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

function SectionComponent(props) {
  return React.createElement("div", props);
}

var stdOutListeners = [];

function watchStdout(callback) {
  stdOutListeners.push(callback);
}

function render(element, callback, width, handler, spacing) {
  var container = new Console({
    handler: handler,
    spacing: spacing,
    width: width
  });

  var node = _reconciler.default.createContainer(container);

  _reconciler.default.updateContainer(element, node, null, callback);
}