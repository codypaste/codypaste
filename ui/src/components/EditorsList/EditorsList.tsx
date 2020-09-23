import React, { useState } from "react";
import styled from "styled-components";
import { Box, IconButton } from "@chakra-ui/core";
import {
  BiCode,
  BiDotsHorizontalRounded,
  BiPen,
  BiNotepad,
} from "react-icons/bi";
import Tippy from "@tippyjs/react";

const EditorListContainer = styled.div`
  display: grid;
  margin-block-start: 1rem;
`;

interface TitleContainerProps {
  active?: boolean;
}
const TitleContainer = styled.div<TitleContainerProps>`
  grid-area: title;
  align-self: center;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

const BigIconButton = styled(IconButton)`
  opacity: 0;
  svg {
    width: 32px;
    height: 32px;
  }
`;

const EditorListTitle = styled.span`
  font-family: "Oswald";
  font-size: 2rem;
  color: rgba(0, 0, 0, 0, 0.8);
`;

const EditorBox = styled.div`
  width: 100%;
  height: 4rem;

  display: grid;
  grid-template:
    "icon . ." auto
    "icon title menu" auto
    "icon . ." auto / 1fr 2fr auto;

  :hover {
    cursor: pointer;
    font-weight: bold;
    ${TitleContainer} {
      font-weight: bold;
    }

    ${BigIconButton} {
      opacity: 1;
    }
  }
`;

const IconContainer = styled.div`
  grid-area: icon;
  align-self: center;
`;

const MenuContainer = styled.div`
  grid-area: menu;
  align-self: center;
`;

export const EditorList = () => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <EditorListContainer>
      <EditorListTitle>All your editors</EditorListTitle>
      <EditorBox>
        <IconContainer>
          <Box as={BiCode} size="32px" />
        </IconContainer>
        <TitleContainer active>Untitled editor code</TitleContainer>
        <MenuContainer>
          <Tippy
            placement="right"
            interactive={true}
            arrow={true}
            content="Tooltip"
            visible={visible}
            onClickOutside={hide}
          >
            <BigIconButton
              onClick={visible ? hide : show}
              isRound
              variant="ghost"
              variantColor="white"
              aria-label="Search database"
              icon={BiDotsHorizontalRounded}
            />
          </Tippy>
        </MenuContainer>
      </EditorBox>

      <EditorBox>
        <IconContainer>
          <Box as={BiPen} size="32px" />
        </IconContainer>
        <TitleContainer>Untitled editor 2 text</TitleContainer>
        <MenuContainer>
          <Tippy
            placement="right"
            interactive={true}
            arrow={true}
            content="Tooltip"
            visible={visible}
            onClickOutside={hide}
          >
            <BigIconButton
              onClick={visible ? hide : show}
              isRound
              variant="ghost"
              variantColor="white"
              aria-label="Search database"
              icon={BiDotsHorizontalRounded}
            />
          </Tippy>
        </MenuContainer>
      </EditorBox>

      <EditorBox>
        <IconContainer>
          <Box as={BiNotepad} size="32px" />
        </IconContainer>
        <TitleContainer>Untitled editor 2 plain</TitleContainer>
        <MenuContainer>
          <Tippy
            placement="right"
            interactive={true}
            arrow={true}
            content="Tooltip"
            visible={visible}
            onClickOutside={hide}
          >
            <BigIconButton
              onClick={visible ? hide : show}
              isRound
              variant="ghost"
              variantColor="white"
              aria-label="Search database"
              icon={BiDotsHorizontalRounded}
            />
          </Tippy>
        </MenuContainer>
      </EditorBox>
    </EditorListContainer>
  );
};
