// @flow strict-local

import ReactCLI, { Section } from "./index";
import React from "react";
import chalk from "chalk";

class MyReactCLIApp extends React.Component<{}, { step: number }> {
  state = {
    step: 0
  };

  render() {
    return (
      <Section border={{ horizontal: "*", vertical: "*" }} align="cener">
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
