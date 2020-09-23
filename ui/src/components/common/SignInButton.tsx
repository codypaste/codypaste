import React from "react";
import { Button } from "@chakra-ui/core";
import { BiLogIn } from "react-icons/bi";

interface SignInButtonProps {
  onClick: () => void;
}

export const SignInButton = ({ onClick }: SignInButtonProps) => {
  return (
    <Button
      leftIcon={BiLogIn}
      variant="solid"
      variantColor="white"
      onClick={onClick}
    >
      <span>Sign in</span>
    </Button>
  );
};
