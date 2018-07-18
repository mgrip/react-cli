// @flow strict

import React from "react";
import TestRender from "./test-render";

TestRender(
  "Columns and rows should work together",
  <div>
    Some text
    <div horizontal>
      <div>Column A</div>
      <div>Column B</div>
      <div>Column C</div>
    </div>
    Other text
  </div>
);

TestRender(
  "Columns should work nested within other columns",
  <div horizontal>
    <div>Column A</div>
    <div>
      Column B
      <div horizontal align="center">
        Some other text that should probably wrap
        <br />
        And heres the other column
      </div>
    </div>
    <div>Column C</div>
  </div>
);

TestRender(
  "Columns, rows, section styles should all work together",
  <div align="center" border={{ horizontal: "#", vertical: "#" }}>
    Some App
    <br />
    <div horizontal>
      <div align="center" border={{ horizontal: "*", vertical: "*" }}>
        ✔︎ Step 1
        <br />
        ◯ Step 2
        <br />
        ◯ Step 3
      </div>
      <div border={{ horizontal: "-", vertical: "|" }}>
        Some messages for this app
      </div>
    </div>
    <div align="center">
      Some stuff for this app is done! 🤘
      <br />
      Heres some more informative stuff about your app
      <br />
      browser
      <br />
      ↙↗ ↖↘
      <div horizontal>
        <div align="center" border={{ horizontal: "-", vertical: "|" }}>
          server
          <br />
          (initial response)
          <br />
          localhost:3000
        </div>
        <div align="center" border={{ horizontal: "-", vertical: "|" }}>
          dev-server<br />(app bundle)<br />localhost:8080<br />websocket server
          (for HMR)<br />localhost:8081
        </div>
      </div>
    </div>
  </div>
);
