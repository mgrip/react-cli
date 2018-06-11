"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./index");

var _reactReconciler = require("react-reconciler");

var _reactReconciler2 = _interopRequireDefault(_reactReconciler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  strict

var ReconcilerConfig = {
  appendInitialChild: function appendInitialChild(parentInstance, child) {
    parentInstance.children.push(child);
  },
  createInstance: function createInstance(type, props) {
    // valid types: section, break
    switch (type) {
      case _index.Break.type:
        return new _index.Break();
      case _index.Section.type:
        return new _index.Section(props.horizontal, props.align);
      default:
        // throw error?
        return false;
    }
  },
  createTextInstance: function createTextInstance(text) {
    return new _index.Text(text);
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

exports.default = (0, _reactReconciler2.default)(ReconcilerConfig);