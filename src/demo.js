// @flow strict-local

import ReactCLI, { Section } from "./index";
import React from "react";
import chalk from "chalk";

class MyReactCLIApp extends React.Component<{}, { step: number }> {
  state = {
    step: 0
  };

  componentDidMount() {
    setTimeout(() => this.setState({ step: 1 }), 1000);
    setTimeout(() => this.setState({ step: 2 }), 2000);
    setTimeout(() => this.setState({ step: 3 }), 3000);
  }

  render() {
    return (
      <Section border={{ horizontal: "*", vertical: "*" }} align="cener">
        My {chalk.blue("New")} {chalk.magenta("ReactCLI App")} 🚀
        <br />
        🛠 Emojis are difficult with monospaced text... 🕸
        <Section horizontal>
          <Section align="center">
            {this.state.step >= 1 ? chalk.green("✓") : "◯"} Step 1<br />
            {this.state.step >= 2 ? chalk.green("✓") : "◯"} Step 2<br />
            {this.state.step >= 3 ? chalk.green("✓") : "◯"} Step 3
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

ReactCLI(<MyReactCLIApp />, undefined, 60);
