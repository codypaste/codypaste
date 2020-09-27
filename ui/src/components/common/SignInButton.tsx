import React from "react";
import { Button } from "@chakra-ui/core";
import styled from "styled-components";
import { BiLogIn } from "react-icons/bi";

interface SignInButtonProps {
  onClick: () => void;
}

const CustomSignInButton = styled(Button)`
  background-color: rgba(0, 0, 0, 0) !important;
  color: rgba(255, 255, 255, 0.6) !important;

  :hover {
    background-color: rgba(0, 0, 0, 0) !important;
    color: rgba(255, 255, 255, 1) !important;
  }
`;

export const SignInButton = ({ onClick }: SignInButtonProps) => {
  return (
    <CustomSignInButton
      leftIcon={BiLogIn}
      variant="solid"
      variantColor="white"
      onClick={onClick}
    >
      <span>Sign in</span>
    </CustomSignInButton>
  );
};
