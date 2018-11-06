// @flow strict

import { Section, Text, Break } from "./components";
import Reconciler from "react-reconciler";

const ReconcilerConfig = {
  appendInitialChild(parentInstance, child) {
    parentInstance.children.push(child);
  },

  createInstance(type, props) {
    // valid types: section, break
    switch (type) {
      case Break.type:
        return new Break();
      case Section.type:
        return new Section({
          useHorizontalOrientation: props.horizontal,
          align: props.align,
          border: props.border,
          height: props.height
        });
      default:
        // throw error?
        return false;
    }
  },

  createTextInstance(text) {
    return new Text(text);
  },

  finalizeInitialChildren() {
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareUpdate() {
    return true;
  },

  resetAfterCommit(rootContainerInstance) {
    rootContainerInstance.update();
  },

  getChildHostContext() {
    return {};
  },

  shouldSetTextContent() {
    return false;
  },

  now: () => {},

  supportsMutation: true,

  appendChild(parentInstance, child) {
    parentInstance.children.push(child);
  },

  appendChildToContainer(parentInstance, child) {
    parentInstance.root = child;
  },

  removeChild(parentInstance, child) {
    parentInstance.splice(parentInstance.children.indexOf(child), 1);
  },

  removeChildFromContainer(parentInstance, child) {
    parentInstance.splice(parentInstance.children.indexOf(child), 1);
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText;
  },

  prepareForCommit() {},
  resetTextContent() {},
  getRootHostContext() {},
  insertBefore() {},
  commitUpdate() {},
  commitMount() {}
};

export default Reconciler(ReconcilerConfig);
