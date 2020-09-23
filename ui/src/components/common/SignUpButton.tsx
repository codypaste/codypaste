import React from "react";
import { Button } from "@chakra-ui/core";
import { BiLogIn } from "react-icons/bi";

interface SignUpButtonProps {
  onClick: () => void;
}

export const SignUpButton = ({ onClick }: SignUpButtonProps) => {
  return (
    <Button
      leftIcon={BiLogIn}
      variant="solid"
      variantColor="red"
      onClick={onClick}
    >
      <span>Sign up</span>
    </Button>
  );
};
