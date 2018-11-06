"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = require("./components");

var _reactReconciler = _interopRequireDefault(require("react-reconciler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  strict
var ReconcilerConfig = {
  appendInitialChild: function appendInitialChild(parentInstance, child) {
    parentInstance.children.push(child);
  },
  createInstance: function createInstance(type, props) {
    // valid types: section, break
    switch (type) {
      case _components.Break.type:
        return new _components.Break();

      case _components.Section.type:
        return new _components.Section({
          useHorizontalOrientation: props.horizontal,
          align: props.align,
          border: props.border,
          maxHeight: props.maxHeight
        });

      default:
        // throw error?
        return false;
    }
  },
  createTextInstance: function createTextInstance(text) {
    return new _components.Text(text);
  },
  finalizeInitialChildren: function finalizeInitialChildren() {
    return false;
  },
  getPublicInstance: function getPublicInstance(inst) {
    return inst;
  },
  prepareUpdate: function prepareUpdate() {
    return true;
  },
  resetAfterCommit: function resetAfterCommit(rootContainerInstance) {
    rootContainerInstance.update();
  },
  getChildHostContext: function getChildHostContext() {
    return {};
  },
  shouldSetTextContent: function shouldSetTextContent() {
    return false;
  },
  now: function now() {},
  supportsMutation: true,
  appendChild: function appendChild(parentInstance, child) {
    parentInstance.children.push(child);
  },
  appendChildToContainer: function appendChildToContainer(parentInstance, child) {
    parentInstance.root = child;
  },
  removeChild: function removeChild(parentInstance, child) {
    parentInstance.splice(parentInstance.children.indexOf(child), 1);
  },
  removeChildFromContainer: function removeChildFromContainer(parentInstance, child) {
    parentInstance.splice(parentInstance.children.indexOf(child), 1);
  },
  commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText;
  },
  prepareForCommit: function prepareForCommit() {},
  resetTextContent: function resetTextContent() {},
  getRootHostContext: function getRootHostContext() {},
  insertBefore: function insertBefore() {},
  commitUpdate: function commitUpdate() {},
  commitMount: function commitMount() {}
};

var _default = (0, _reactReconciler.default)(ReconcilerConfig);

exports.default = _default;