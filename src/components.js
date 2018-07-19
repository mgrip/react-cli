// @flow strict

class Border {
  vertical: ?string;
  horizontal: ?string;
  cornerTopLeft: ?string;
  cornerTopRight: ?string;
  cornerBottomLeft: ?string;
  cornerBottomRight: ?string;

  constructor({
    vertical,
    horizontal,
    cornerTopLeft,
    cornerTopRight,
    cornerBottomLeft,
    cornerBottomRight
  }) {
    this.vertical = vertical;
    this.horizontal = horizontal;
    this.cornerTopLeft = cornerTopLeft;
    this.cornerTopRight = cornerTopRight;
    this.cornerBottomLeft = cornerBottomLeft;
    this.cornerBottomRight = cornerBottomRight;
  }

  horizontalWidth(): number {
    return (
      Math.max(
        this.vertical ? this.vertical.length : 0,
        this.cornerTopLeft ? this.cornerTopLeft.length : 0,
        this.cornerBottomLeft ? this.cornerBottomLeft.length : 0
      ) +
      Math.max(
        this.vertical ? this.vertical.length : 0,
        this.cornerTopRight ? this.cornerTopRight.length : 0,
        this.cornerBottomRight ? this.cornerBottomRight.length : 0
      )
    );
  }

  verticalHeight(): number {
    return (
      Math.max(
        this.horizontal ? this.horizontal.length : 0,
        this.cornerTopLeft ? this.cornerTopLeft.length : 0,
        this.cornerTopRight ? this.cornerTopRight.length : 0
      ) +
      Math.max(
        this.horizontal ? this.horizontal.length : 0,
        this.cornerBottomLeft ? this.cornerBottomLeft.length : 0,
        this.cornerBottomRight ? this.cornerBottomRight.length : 0
      )
    );
  }
}
export class Section {
  orientation: "vertical" | "horizontal";
  align: "left" | "center" | "right";
  children: Array<Section | Text | Break> = [];
  border: Border;
  static type: "div" = "div";

  constructor({
    useHorizontalOrientation = false,
    align = "left",
    border = {}
  }: {
    useHorizontalOrientation: boolean,
    align: "left" | "center" | "right",
    border: {
      vertical?: string,
      horizontal?: string,
      cornerTopLeft?: string,
      cornerTopRight?: string,
      cornerBottomLeft?: string,
      cornerBottomRight?: string
    }
  }) {
    this.orientation = useHorizontalOrientation ? "horizontal" : "vertical";
    this.align = align;
    this.border = new Border(border);
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
