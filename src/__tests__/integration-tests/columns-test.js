// @flow strict

import React from "react";
import TestRender from "./test-render";

TestRender(
  "Horizontal sections should render as columns",
  <div horizontal>
    1st column
    <br />
    2nd column
    <br />
    3rd column
  </div>
);
