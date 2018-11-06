// @flow strict

import Reconciler from "./reconciler";
import * as React from "react";
import ansiEscapes from "ansi-escapes";
import { Section } from "./components";
import getOutputFromSection from "./output";

let previousLineCount = 0;
function writeToConsole(output: string) {
  process.stdout.write(ansiEscapes.eraseLines(previousLineCount) + output);
  previousLineCount = output.split("\n").length;
}

class Console {
  consoleWidth: number;
  root: Section;
  handler: (output: string) => void;
  spacing: string;

  constructor({
    handler,
    spacing,
    width
  }: {
    handler?: string => void,
    spacing?: string,
    width?: number
  }) {
    // use width override, then console width, then hardcoded default as last resort
    this.consoleWidth = width
      ? width
      : typeof process.stdout.columns === "number"
        ? process.stdout.columns - 10
        : 100;
    this.handler = handler
      ? handler
      : outputString => writeToConsole(outputString);
    this.spacing = spacing || " ";
  }

  update() {
    const output = getOutputFromSection({
      section: this.root,
      width: this.consoleWidth
    });

    let outputString = "";
    let currentLineIndex = 0;
    while (currentLineIndex < output.getLineLength()) {
      outputString += output.generateOutput({
        currentLineIndex,
        spacing: this.spacing,
        startLineIndex: 0
      });
      outputString += "\n";
      currentLineIndex++;
    }
    this.handler(outputString);
  }
}

function SectionComponent(props: {
  horizontal?: boolean,
  align?: "left" | "center" | "right",
  border?: {
    vertical?: string,
    horizontal?: string,
    cornerTopLeft?: string,
    cornerTopRight?: string,
    cornerBottomLeft?: string,
    cornerBottomRight?: string
  },
  height?: number
}) {
  return <div {...props} />;
}
export { SectionComponent as Section };

export default function render(
  element: React.Node,
  callback?: () => void,
  width?: number,
  handler?: (output: string) => void,
  spacing?: string
) {
  const container = new Console({ handler, spacing, width });
  const node = Reconciler.createContainer(container);
  Reconciler.updateContainer(element, node, null, callback);
}
