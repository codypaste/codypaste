import React from "react";
import styled from "styled-components";
import { BiX, BiEdit } from "react-icons/bi";
import { Button } from "@chakra-ui/core";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomMenuButton = styled(Button)`
  background-color: rgba(0, 0, 0, 0) !important;
  color: rgba(255, 255, 255, 0.6) !important;

  :hover {
    background-color: rgba(0, 0, 0, 0) !important;
    color: rgba(255, 255, 255, 1) !important;
  }
`;

export const EditorMenu = () => {
  return (
    <MenuContainer>
      <CustomMenuButton leftIcon={BiX} variant="ghost">
        Remove
      </CustomMenuButton>
      <CustomMenuButton leftIcon={BiEdit} variant="ghost">
        Rename
      </CustomMenuButton>
    </MenuContainer>
  );
};
