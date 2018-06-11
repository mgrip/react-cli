"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //  strict

var TestComponent = function (_React$Component) {
  _inherits(TestComponent, _React$Component);

  function TestComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TestComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TestComponent.__proto__ || Object.getPrototypeOf(TestComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      count: 0
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TestComponent, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        "Counter: ",
        this.state.count
      );
    }
  }]);

  return TestComponent;
}(React.Component);

var componentReference = React.createRef();
var updateCount = 0;
test("components should be able to use local state to manage updates", function (done) {
  _index2.default.render(React.createElement(TestComponent, { ref: componentReference }), function () {
    if (componentReference.current) {
      componentReference.current.setState({ count: 1 });
    }
  }, 50, function (outputString) {
    updateCount++;
    // this should get called twice
    expect(outputString).toMatchSnapshot();
    if (updateCount === 2) {
      done();
    }
  }, "+");
});