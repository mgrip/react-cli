// @flow strict

import * as React from "react";
import ReactCLI from "../../index";

export default (testDescription: string, element: React.Node) => {
  test(testDescription, done => {
    ReactCLI.render(
      element,
      undefined,
      50,
      output => {
        expect(output).toMatchSnapshot();
        done();
      },
      "+"
    );
  });
};
