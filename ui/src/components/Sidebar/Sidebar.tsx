import React from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import { BiFile } from "react-icons/bi";
import { HoverIconButton } from "components/common/HoverIconButton";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SidebarEntry = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  padding-block-start: 1rem;
  padding-block-end: 1rem;
`;

export const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarEntry>
        <Tippy arrow={true} placement="right" content={"Editors"}>
          <HoverIconButton
            aria-label="Documents button"
            variant="ghost"
            variantColor="white"
            icon={BiFile}
          ></HoverIconButton>
        </Tippy>
      </SidebarEntry>
    </SidebarContainer>
  );
};
