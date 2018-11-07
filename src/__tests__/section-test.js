// @flow strict

import * as React from "react";
import ReactCLI, { Section } from "../index";

test("sections should be able to render horizontally", done => {
  ReactCLI(
    <Section horizontal>
      Column 1 <br /> Column 2
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

test("sections should be able to render vertically", done => {
  ReactCLI(
    <Section>
      Row 1 <br /> Row 2
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

test("sections should be able to align text left", done => {
  ReactCLI(
    <Section align="left">Left text</Section>,
    undefined,
    50,
    outputString => {
      expect(outputString).toMatchSnapshot();
      done();
    },
    "+"
  );
});

test("sections should be able to align text right", done => {
  ReactCLI(
    <Section align="right">Right text</Section>,
    undefined,
    50,
    outputString => {
      expect(outputString).toMatchSnapshot();
      done();
    },
    "+"
  );
});

test("sections should be able to align text center", done => {
  ReactCLI(
    <Section align="center">Center text</Section>,
    undefined,
    50,
    outputString => {
      expect(outputString).toMatchSnapshot();
      done();
    },
    "+"
  );
});

test("sections should be able to render a border", done => {
  ReactCLI(
    <Section>
      <Section
        align="center"
        border={{
          horizontal: "-",
          vertical: "|",
          cornerTopLeft: "*",
          cornerTopRight: "*",
          cornerBottomLeft: "*",
          cornerBottomRight: "*"
        }}
      >
        Test section with border
      </Section>
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
    <Section horizontal border={{ horizontal: "*", vertical: "*" }}>
      Some Text
      <Section
        align="center"
        border={{
          horizontal: "-",
          vertical: "|",
          cornerTopLeft: "*",
          cornerTopRight: "*",
          cornerBottomLeft: "*",
          cornerBottomRight: "*"
        }}
      >
        Test section with border
      </Section>
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

test("sections should be able to declare a fixed height", done => {
  ReactCLI(
    <Section height={3}>
      Line 1<br />
      Line 2<br />
      Line 3<br />
      Line 4<br />
    </Section>,
    undefined,
    50,
    outputString => {
      expect(outputString).toMatchSnapshot();
      done();
    }
  );

  ReactCLI(
    <Section height={5} border={{ vertical: "*", horizontal: "*" }}>
      Line 1<br />
      Line 2<br />
      Line 3<br />
    </Section>,
    undefined,
    50,
    outputString => {
      expect(outputString).toMatchSnapshot();
      done();
    }
  );

  ReactCLI(
    <Section height={3} horizontal>
      Test
      <Section>
        Line 1<br />
        Line 2<br />
        Line 3<br />
        Line 4<br />
      </Section>
    </Section>,
    undefined,
    50,
    outputString => {
      expect(outputString).toMatchSnapshot();
      done();
    }
  );
});
