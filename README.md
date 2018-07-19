# ReactCLI

ReactCLI is a react renderer for the command line. All of the benefits of React, right in your terminal.

![react-cli-demo](https://raw.githubusercontent.com/mgrip/react-cli/master/.github/demo.svg)

## Getting started

### yarn

```bash
yarn add react react-cli-renderer
```

### npm

```bash
npm install --save react react-cli-renderer
```

### How it works

```javascript
const React = require("react");
const ReactCLI = require("react-cli-renderer");

ReactCLI.render(
  <div horizontal>
    First column
    <div>
      Second column
      <div>
        First row
        <br />
        Second row
      </div>
    </div>
  </div>
);
```

#### About

ReactCLI is analogous to ReactDOM or ReactNative. It just renders any updates dictated by React and the React reconciler to the command line. This means that you get all of the core features of React for free, like stateful components, context, refs, etc - in addition to being able to use third party libraries for things like state management. It also provides a couple core components that are useful for building out command line interfaces.

#### Components

ReactCLI provides two components for building command line interfaces.

- div
  A new section is denoted by `div`. A section can either be vertical, or horizontal. The children of a section can be a mix of text, or more sections. A section can also align text left, right, or center.

  ```javascript
  <div horizontal>
    <div>Column 1</div>
    <div>Column 2</div>
  </div>
  ```

- break
  Break components allow you to define columns and/or rows within a section (as opposed to using nested sections).

  ```javascript
  <div>
    Row 1
    <br />
    Row 2
  </div>
  ```

#

Contributions welcome!

### 👨‍🎤👩‍🔬👨‍🎨

#
