// @flow strict

import React from "react";
import TestRender from "./test-render";
import { Section } from "../../index";

TestRender(
  "Columns and rows should work together",
  <Section>
    Some text
    <Section horizontal>
      <Section>Column A</Section>
      <Section>Column B</Section>
      <Section>Column C</Section>
    </Section>
    Other text
  </Section>
);

TestRender(
  "Columns should work nested within other columns",
  <Section horizontal>
    <Section>Column A</Section>
    <Section>
      Column B
      <Section horizontal align="center">
        Some other text that should probably wrap
        <br />
        And heres the other column
      </Section>
    </Section>
    <Section>Column C</Section>
  </Section>
);

TestRender(
  "Columns, rows, section styles should all work together",
  <Section align="center" border={{ horizontal: "#", vertical: "#" }}>
    Some App
    <br />
    <Section horizontal>
      <Section align="center" border={{ horizontal: "*", vertical: "*" }}>
        ✔︎ Step 1<br />◯ Step 2<br />◯ Step 3
      </Section>
      <Section border={{ horizontal: "-", vertical: "|" }}>
        Some messages for this app
      </Section>
    </Section>
    <Section align="center">
      Some stuff for this app is done! 🤘
      <br />
      Heres some more informative stuff about your app
      <br />
      browser
      <br />
      ↙↗ ↖↘
      <Section horizontal>
        <Section align="center" border={{ horizontal: "-", vertical: "|" }}>
          server
          <br />
          (initial response)
          <br />
          localhost:3000
        </Section>
        <Section align="center" border={{ horizontal: "-", vertical: "|" }}>
          dev-server
          <br />
          (app bundle)
          <br />
          localhost:8080
          <br />
          websocket server (for HMR)
          <br />
          localhost:8081
        </Section>
      </Section>
    </Section>
  </Section>
);
