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

  ReactCLI(
    <Section border={{ horizontal: "*", vertical: "*" }}>
      Emoji test line one, its a lont line that takes space 🤘
      <br />
      🛠 Multiple emojis in the same line! 🍾 🛫
      <br />
      🛠 Some more emojis with elipsis... 🕸
      <br />
      An emoji in the middle 🛠 thats so {'"--crazy"'}
      <br />
      one more for good measure... 🕸
      <br />
    </Section>,
    undefined,
    50,
    outputString => {
      expect(outputString).toMatchSnapshot();
      done();
    },
    "+"
  );

  ReactCLI(
    <Section border={{ horizontal: "*", vertical: "*" }} align="center">
      ✔︎ Step 1<br />◯ Step 2<br />◯ Step 3
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
