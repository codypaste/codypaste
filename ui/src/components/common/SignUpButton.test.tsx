import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";
import { SignUpButton } from "components/common/SignUpButton";

describe("SignUpButton", () => {
  test("renders sing up button", () => {
    const { getByText } = render(
      <ThemeProvider>
        <SignUpButton onClick={() => undefined} />
      </ThemeProvider>
    );
    const linkElement = getByText(/Sign up/i);
    expect(linkElement).toBeInTheDocument();
  });
});
