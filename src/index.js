// @flow strict

import Reconciler from "./reconciler";
import * as React from "react";
import wrapAnsiNewLine from "wrap-ansi";
import logUpdate from "log-update";
// this module is helpful for dealing with ansi characters, but it returns a
// string with embedded new lines. We need it as an array, so we'll split it here
const wrapAnsi = (input: string, columns: number): Array<string> =>
  wrapAnsiNewLine(input, columns).split("\n");

export class Section {
  orientation: "vertical" | "horizontal";
  align: "left" | "center" | "right";
  children: Array<Section | Text | Break> = [];
  static type: "div" = "div";

  constructor(
    useHorizontalOrientation: boolean = false,
    align: "left" | "center" | "right" = "left"
  ) {
    this.orientation = useHorizontalOrientation ? "horizontal" : "vertical";
    this.align = align;
  }
}

export class Text {
  text: string;

  constructor(text: string) {
    this.text = text;
  }
}

export class Break {
  static type: "br" = "br";
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
    this.handler = handler ? handler : outputString => logUpdate(outputString);
    this.spacing = spacing || " ";
  }

  update() {
    type ColumnOutput = {
      width: number,
      columns: Array<OutputType>,
      type: "horizontal"
    };
    type RowOutput = {
      width: number,
      rows: Array<OutputType>,
      type: "vertical"
    };
    type TextOutput = {
      width: number,
      text: Array<string>,
      type: "text",
      align: "left" | "center" | "right"
    };
    type OutputType = ColumnOutput | RowOutput | TextOutput;
    const widthCheck = (section: Section, totalWidth: number): OutputType => {
      // If we have multiple text nodes in a row, first combine them into one
      const combinedChildren: Array<Text | Section | Break> = [];
      let textBuffer = [];
      section.children.forEach((child, index) => {
        if (child instanceof Text) {
          textBuffer.push(child);
        } else {
          if (textBuffer.length > 0) {
            combinedChildren.push(
              new Text(textBuffer.map(textObject => textObject.text).join(""))
            );
            textBuffer = [];
          }
          combinedChildren.push(child);
        }
        if (index === section.children.length - 1 && textBuffer.length > 0) {
          combinedChildren.push(
            new Text(textBuffer.map(textObject => textObject.text).join(""))
          );
        }
      });
      if (section.orientation === "horizontal") {
        const columnNumber = section.children.reduce(
          (acc, child) => (child instanceof Break ? acc : acc + 1),
          0
        );
        return {
          width: totalWidth,
          columns: combinedChildren.reduce((acc, child) => {
            if (child instanceof Section) {
              return acc.concat(widthCheck(child, totalWidth / columnNumber));
            } else if (child instanceof Text) {
              return acc.concat({
                width: totalWidth / columnNumber,
                text: wrapAnsi(child.text, totalWidth / columnNumber),
                type: "text",
                align: section.align
              });
            }
            return acc;
          }, []),
          type: "horizontal"
        };
      } else {
        return {
          width: totalWidth,
          rows: combinedChildren.reduce((acc, child) => {
            if (child instanceof Section) {
              return acc.concat(widthCheck(child, totalWidth));
            } else if (child instanceof Text) {
              return acc.concat({
                width: totalWidth,
                text: wrapAnsi(child.text, totalWidth),
                type: "text",
                align: section.align
              });
            }
            return acc;
          }, []),
          type: "vertical"
        };
      }
    };
    const output = widthCheck(this.root, this.consoleWidth);

    const getOutputLineLength = (outputObject: OutputType): number => {
      if (outputObject.type === "horizontal") {
        return outputObject.columns.reduce((max, column) => {
          const columnLength = getOutputLineLength(column);
          return columnLength > max ? columnLength : max;
        }, 0);
      } else if (outputObject.type === "text") {
        return outputObject.text.length;
      } else {
        return outputObject.rows.reduce((acc, child) => {
          return acc + getOutputLineLength(child);
        }, 0);
      }
    };

    let outputString = "";
    let currentLineIndex = 0;
    const generateOutput = (
      outputObject: OutputType,
      lineIndex: number
    ): void => {
      if (outputObject.type === "horizontal") {
        const maxColumnHeight = outputObject.columns.reduce((acc, column) => {
          const currentColumnHeight = getOutputLineLength(column);
          return currentColumnHeight > acc ? currentColumnHeight : acc;
        }, 0);
        outputObject.columns.forEach(column => {
          if (currentLineIndex >= lineIndex + getOutputLineLength(column)) {
            if (currentLineIndex < lineIndex + maxColumnHeight) {
              outputString += "".padEnd(column.width, this.spacing);
            }
          } else {
            generateOutput(column, lineIndex);
          }
        });
      } else if (outputObject.type === "text") {
        if (
          currentLineIndex >= lineIndex &&
          currentLineIndex < lineIndex + outputObject.text.length
        ) {
          const potentialOutput =
            outputObject.text[currentLineIndex - lineIndex];
          switch (outputObject.align) {
            case "left":
              outputString += (potentialOutput || "").padEnd(
                outputObject.width,
                this.spacing
              );
              break;
            case "right":
              outputString += (potentialOutput || "").padStart(
                outputObject.width,
                this.spacing
              );
              break;
            case "center":
              outputString += (potentialOutput || "")
                .padStart(
                  outputObject.width / 2 + potentialOutput.length / 2,
                  this.spacing
                )
                .padEnd(outputObject.width, this.spacing);
              break;
          }
        }
      } else {
        let tempLineIndex = lineIndex;
        outputObject.rows.forEach(child => {
          if (tempLineIndex <= currentLineIndex) {
            generateOutput(child, tempLineIndex);
            tempLineIndex += getOutputLineLength(child);
          }
        });
      }
    };
    while (currentLineIndex < getOutputLineLength(output)) {
      generateOutput(output, 0);
      outputString += "\n";
      currentLineIndex++;
    }
    this.handler(outputString);
  }
}

export default {
  render(
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
};
