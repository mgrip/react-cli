// @flow strict

import Reconciler from "./reconciler";
import * as React from "react";
import ansiEscapes from "ansi-escapes";
import { Section } from "./components";
import getOutputFromSection from "./output";
import interceptStdout from "intercept-stdout";

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
    if (handler) {
      this.handler = handler;
    } else {
      let stopIntercept;
      this.handler = outputString => {
        if (stopIntercept) {
          stopIntercept();
        }
        writeToConsole(outputString);
        // if any other console output comes in, first print that, then re-print
        // our node tree underneath
        // @TODO: figure out if there's a bettre way to do this, or if we could
        // pass it to the component being rendered so client's can handle output
        stopIntercept = interceptStdout(stdoutText => {
          stdOutListeners.forEach(listener => {
            listener(stdoutText.split("\n"));
          });
        });
      };
    }
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

const stdOutListeners = [];
export function watchStdout(callback: (Array<string>) => void) {
  stdOutListeners.push(callback);
}
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
