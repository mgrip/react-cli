// @flow strict

import { Section, Text, Break } from "./components";
import stripAnsi from "strip-ansi";
import wrapAnsiNewLine from "wrap-ansi";
import emojiRegex from "emoji-regex/es2015/text.js";
// this module is helpful for dealing with ansi characters, but it returns a
// string with embedded new lines. We need it as an array, so we'll split it here
const wrapAnsi = (input: string, columns: number): Array<string> =>
  wrapAnsiNewLine(input, columns).split("\n");

function combineChildren(section: Section): Array<Text | Section | Break> {
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
  return combinedChildren;
}

export default function getOutputFromSection({
  section,
  width
}: {
  section: Section,
  width: number
}): RowOutput | ColumnOutput {
  if (section.orientation === "vertical") {
    return new RowOutput({ width, section });
  } else {
    return new ColumnOutput({ width, section });
  }
}

function textColumnCount(text: string): number {
  const characters: string = stripAnsi(text);
  let fullWidthCharacterCount = 0;

  // emojis technically consist of 2 characters of unicode, but only take up
  // 1 column of output, so we need to account for that
  const regex = emojiRegex();
  let match;
  while ((match = regex.exec(text))) {
    // not all matches take up 2 columns (numbers are technically emoji) - so
    // check the actual length of the match
    fullWidthCharacterCount += match[0].length - 1;
  }
  return characters.length - fullWidthCharacterCount;
}

class RowOutput {
  width: number;
  rows: Array<OutputType>;
  section: Section;

  constructor({ width, section }: { width: number, section: Section }) {
    this.width = width;
    this.section = section;

    const combinedChildren = combineChildren(section);
    this.rows = combinedChildren.reduce((acc, child) => {
      if (child instanceof Section) {
        return acc.concat(
          getOutputFromSection({
            section: child,
            width: width - this.section.border.horizontalWidth()
          })
        );
      } else if (child instanceof Text) {
        return acc.concat(
          new TextOutput(
            wrapAnsi(child.text, width - this.section.border.horizontalWidth())
          )
        );
      }
      return acc;
    }, []);
    // @TODO i think we need to actually manipulate the section contents here.
    // might need to pass a temp fixed height down the tree as well
  }

  getLineLength(): number {
    const rowsLineLength = this.rows.reduce((acc, child) => {
      return acc + child.getLineLength();
    }, 0);
    return (
      (this.section.height ? this.section.height : rowsLineLength) +
      this.section.border.verticalHeight()
    );
  }

  padText({ text, spacing }: { text: string, spacing: string }): string {
    const border = this.section.border.vertical || "";
    const innerWidth = this.width - this.section.border.horizontalWidth();

    let innerText;
    switch (this.section.align) {
      case "left":
        innerText =
          text + "".padStart(innerWidth - textColumnCount(text), spacing);
        break;
      case "right":
        innerText =
          "".padStart(innerWidth - textColumnCount(text), spacing) + text;
        break;
      default:
        innerText =
          "".padStart((innerWidth - textColumnCount(text)) / 2, spacing) +
          text +
          "".padStart(
            (innerWidth - textColumnCount(text)) / 2 +
              ((innerWidth - textColumnCount(text)) % 2),
            spacing
          );
        break;
    }
    // @TODO: need to handle if the corners are wider than the border
    return border + innerText + border;
  }

  generateOutput({
    currentLineIndex,
    startLineIndex,
    spacing
  }: {
    currentLineIndex: number,
    startLineIndex: number,
    spacing: string
  }): string {
    const topBorderLength = Math.max(
      (this.section.border.horizontal || "").length,
      (this.section.border.cornerTopLeft || "").length,
      (this.section.border.cornerTopRight || "").length
    );
    const bottomBorderLength = Math.max(
      (this.section.border.horizontal || "").length,
      (this.section.border.cornerBottomLeft || "").length,
      (this.section.border.cornerBottomRight || "").length
    );

    let outputString = "";

    // print top border
    if (
      topBorderLength > 0 &&
      currentLineIndex < startLineIndex + topBorderLength &&
      currentLineIndex >= startLineIndex
    ) {
      // @TODO need to account for corners and borders more than 1 length
      return outputString.padEnd(
        this.width,
        this.section.border.horizontal || ""
      );
    }

    // print bottom border
    if (
      bottomBorderLength > 0 &&
      currentLineIndex < startLineIndex + this.getLineLength() &&
      currentLineIndex >=
        startLineIndex + this.getLineLength() - bottomBorderLength
    ) {
      // @TODO need to account for corners and borders more than 1 length
      return outputString.padEnd(
        this.width,
        this.section.border.horizontal || ""
      );
    }

    let tempLineIndex = startLineIndex + topBorderLength;
    this.rows.forEach(child => {
      if (
        currentLineIndex >= tempLineIndex &&
        currentLineIndex < tempLineIndex + child.getLineLength()
      ) {
        if (child instanceof RowOutput || child instanceof ColumnOutput) {
          outputString += this.padText({
            spacing,
            text: child.generateOutput({
              currentLineIndex,
              startLineIndex: tempLineIndex,
              spacing
            })
          });
        } else if (child instanceof TextOutput) {
          if (
            currentLineIndex >= tempLineIndex &&
            currentLineIndex < tempLineIndex + child.getLineLength()
          ) {
            const potentialOutput =
              child.text[currentLineIndex - tempLineIndex] || "";
            outputString += this.padText({ spacing, text: potentialOutput });
          }
        }
      }
      tempLineIndex += child.getLineLength();
    });
    return outputString;
  }
}

class ColumnOutput {
  width: number;
  columns: Array<OutputType>;
  section: Section;

  constructor({ width, section }: { width: number, section: Section }) {
    this.width = width;
    this.section = section;

    const combinedChildren = combineChildren(section);
    const columnNumber = combinedChildren.reduce(
      (acc, child) => (child instanceof Break ? acc : acc + 1),
      0
    );
    this.columns = combinedChildren.reduce((acc, child, index) => {
      let childWidth = Math.floor(
        (width - this.section.border.horizontalWidth()) / columnNumber
      );
      if (index === combinedChildren.length - 1) {
        childWidth +=
          (width - this.section.border.horizontalWidth()) % columnNumber;
      }
      if (child instanceof Section) {
        return acc.concat(
          getOutputFromSection({
            section: child,
            width: childWidth
          })
        );
      } else if (child instanceof Text) {
        return acc.concat(new TextOutput(wrapAnsi(child.text, childWidth)));
      }
      return acc;
    }, []);
  }

  getLineLength(): number {
    const maxColumnHeight = this.columns.reduce((max, column) => {
      const columnLength = column.getLineLength();
      return columnLength > max ? columnLength : max;
    }, 0);
    return (
      (this.section.height ? this.section.height : maxColumnHeight) +
      this.section.border.verticalHeight()
    );
  }

  padText({
    text,
    spacing,
    index
  }: {
    text: string,
    spacing: string,
    index: number
  }): string {
    const innerWidth = this.width - this.section.border.horizontalWidth();
    let columnWidth = Math.floor(innerWidth / this.columns.length);
    if (index == this.columns.length - 1) {
      columnWidth += innerWidth % this.columns.length;
    }

    let innerText;
    switch (this.section.align) {
      case "left":
        innerText =
          text + "".padStart(columnWidth - textColumnCount(text), spacing);
        break;
      case "right":
        innerText =
          "".padStart(columnWidth - textColumnCount(text), spacing) + text;
        break;
      default:
        innerText =
          "".padStart((columnWidth - textColumnCount(text)) / 2, spacing) +
          text +
          "".padStart(
            (columnWidth - textColumnCount(text)) / 2 +
              ((columnWidth - textColumnCount(text)) % 2),
            spacing
          );
        break;
    }
    const border = this.section.border.vertical || "";
    if (index === 0) {
      return border + innerText;
    } else if (index === this.columns.length - 1) {
      return innerText + border;
    }
    // @TODO: need to handle if the corners are wider than the border
    return innerText;
  }

  generateOutput({
    currentLineIndex,
    startLineIndex,
    spacing
  }: {
    currentLineIndex: number,
    startLineIndex: number,
    spacing: string
  }): string {
    const maxColumnHeight = this.columns.reduce((acc, column) => {
      const currentColumnHeight = column.getLineLength();
      return currentColumnHeight > acc ? currentColumnHeight : acc;
    }, 0);
    const topBorderLength = Math.max(
      (this.section.border.horizontal || "").length,
      (this.section.border.cornerTopLeft || "").length,
      (this.section.border.cornerTopRight || "").length
    );
    const bottomBorderLength = Math.max(
      (this.section.border.horizontal || "").length,
      (this.section.border.cornerBottomLeft || "").length,
      (this.section.border.cornerBottomRight || "").length
    );

    let outputString = "";

    // print top border
    if (
      topBorderLength > 0 &&
      currentLineIndex < startLineIndex + topBorderLength &&
      currentLineIndex >= startLineIndex
    ) {
      // @TODO need to account for corners and borders more than 1 length
      return outputString.padEnd(
        this.width,
        this.section.border.horizontal || ""
      );
    }

    // print bottom border
    if (
      bottomBorderLength > 0 &&
      currentLineIndex < startLineIndex + this.getLineLength() &&
      currentLineIndex >=
        startLineIndex + this.getLineLength() - bottomBorderLength
    ) {
      // @TODO need to account for corners and borders more than 1 length
      return outputString.padEnd(
        this.width,
        this.section.border.horizontal || ""
      );
    }

    this.columns.forEach((column, columnIndex) => {
      if (
        currentLineIndex >=
        startLineIndex + topBorderLength + column.getLineLength()
      ) {
        if (
          currentLineIndex <
          startLineIndex + topBorderLength + maxColumnHeight
        ) {
          outputString += this.padText({
            text: "",
            spacing,
            index: columnIndex
          });
        }
      } else {
        if (column instanceof RowOutput || column instanceof ColumnOutput) {
          outputString += this.padText({
            text: column.generateOutput({
              currentLineIndex,
              startLineIndex: startLineIndex + topBorderLength,
              spacing
            }),
            spacing,
            index: columnIndex
          });
        } else if (column instanceof TextOutput) {
          const potentialOutput =
            column.text[currentLineIndex - topBorderLength - startLineIndex] ||
            "";
          outputString += this.padText({
            spacing,
            text: potentialOutput,
            index: columnIndex
          });
        }
      }
    });
    return outputString;
  }
}

class TextOutput {
  text: Array<string>;

  constructor(text: Array<string>) {
    this.text = text;
  }

  getLineLength(): number {
    return this.text.length;
  }
}
type OutputType = RowOutput | TextOutput | ColumnOutput;
