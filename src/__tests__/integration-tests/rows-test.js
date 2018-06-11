// @flow strict

import React from "react";
import TestRender from "./test-render";

TestRender(
  "Rows should render on new lines",
  <div>
    1st row
    <br />
    2nd row
    <br />
    3rd row
  </div>
);
