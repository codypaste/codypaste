import React from "react";
import { Button } from "@chakra-ui/core";
import { BiLogIn } from "react-icons/bi";

interface LoginButtonProps {
  onClick: () => void;
}

export const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <Button
      leftIcon={BiLogIn}
      variant="solid"
      variantColor="red"
      onClick={onClick}
    >
      <span>Login</span>
    </Button>
  );
};
