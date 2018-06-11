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
