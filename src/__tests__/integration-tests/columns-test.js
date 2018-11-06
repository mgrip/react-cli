// @flow strict

import React from "react";
import TestRender from "./test-render";
import { Section } from "../../index";

TestRender(
  "Horizontal sections should render as columns",
  <Section horizontal>
    1st column
    <br />
    2nd column
    <br />
    3rd column
  </Section>
);
