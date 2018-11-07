// @flow strict

import * as React from "react";
import ReactCLI, { Section } from "../index";

test("columns containing emojis should render the correct width", done => {
  ReactCLI(
    <Section border={{ horizontal: "*", vertical: "*" }}>
      Row 1 <br /> Row 2 🎉🍾🎉
    </Section>,
    undefined,
    50,
    outputString => {
      expect(outputString).toMatchSnapshot();
      done();
    },
    "+"
  );
});
