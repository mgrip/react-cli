# ReactCLI

ReactCLI is a react renderer for the command line. All of the benefits of React, right in your terminal.

![react-cli-demo](/.github/demo.svg)

```javascript
const ReactCLI, { Section } = require("./index");
const React = require("react");
const chalk = require("chalk");

class MyReactCLIApp extends React.Component {
  state = {
    step: 0
  };

  render() {
    return (
      <Section border={{ horizontal: "*", vertical: "*" }} align="center">
        My {chalk.blue("New")} {chalk.magenta("ReactCLI App")} 🚀
        <Section horizontal>
          <Section align="center">
            {this.state.step >= 1 ? chalk.green("✔︎") : "◯"} Step 1<br />
            {this.state.step >= 2 ? chalk.green("✔︎") : "◯"} Step 2<br />
            {this.state.step >= 3 ? chalk.green("✔︎") : "◯"} Step 3
          </Section>
          <Section border={{ horizontal: "-", vertical: "|" }} align="center">
            Number of steps done:{" "}
            {chalk.bold.magenta(this.state.step.toString())}
          </Section>
        </Section>
      </Section>
    );
  }
}

const appReference = React.createRef();
ReactCLI(<MyReactCLIApp ref={appReference} />, undefined, 60);
setTimeout(
  () => appReference.current && appReference.current.setState({ step: 1 }),
  1000
);
setTimeout(
  () => appReference.current && appReference.current.setState({ step: 2 }),
  2000
);
setTimeout(
  () => appReference.current && appReference.current.setState({ step: 3 }),
  3000
);
```

## Getting started

### yarn

```bash
yarn add react react-cli-renderer
```

### npm

```bash
npm install --save react react-cli-renderer
```

## About

ReactCLI is analogous to ReactDOM or ReactNative. It just renders any updates dictated by React and the React reconciler to the command line. This means that you get all of the core features of React for free, like stateful components, context, refs, etc - in addition to being able to use third party libraries for things like state management. It also provides a couple core components that are useful for building out command line interfaces.

## Usage

#### Components

ReactCLI provides two components for building command line interfaces.

- Section
  A new section is denoted by `Section`. A section can either be vertical, or horizontal. The children of a section can be a mix of text, or more sections. A section can also align text left, right, or center.

  ```javascript
  <Section horizontal>
    <Section>Column 1</Section>
    <Section>Column 2</Section>
  </Section>
  ```

- break
  Break components allow you to define columns and/or rows within a section (as opposed to using nested sections).

  ```javascript
  <Section>
    Row 1<br />
    Row 2
  </Section>
  ```

#

Contributions welcome!

### 👨‍🎤👩‍🔬👨‍🎨

#
