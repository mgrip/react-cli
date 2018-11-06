// @flow strict

import React from "react";
import TestRender from "./test-render";
import { Section } from "../../index";

TestRender(
  "Rows should render on new lines",
  <Section>
    1st row
    <br />
    2nd row
    <br />
    3rd row
  </Section>
);
