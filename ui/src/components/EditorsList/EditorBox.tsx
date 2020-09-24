import React, { useState } from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import { Box, IconButton } from "@chakra-ui/core";
import { BiCode, BiDotsHorizontalRounded, BiPen, BiText } from "react-icons/bi";
import { EditorTypesType, EDITOR_TYPES } from "config/constants";
import { IconType } from "react-icons/lib";
import { EditorMenu } from "components/EditorsList/EditorMenu";

interface TitleContainerProps {
  active?: boolean;
}
const TitleContainer = styled.div<TitleContainerProps>`
  grid-area: title;
  align-self: center;
  margin-inline-start: 1rem;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  margin-inline-end: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BigIconButton = styled(IconButton)`
  opacity: 0;
  svg {
    width: 32px;
    height: 32px;
  }
`;

const EditorBoxContainer = styled.div`
  width: 100%;
  height: 4rem;

  display: grid;
  grid-template:
    "icon . ." auto
    "icon title menu" auto
    "icon . ." auto / auto 1fr auto;

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

interface EditorBoxProps {
  type: EditorTypesType;
  title: string;
  isActive?: boolean;
}

const getIcon = (type: EditorTypesType): IconType => {
  switch (type) {
    case EDITOR_TYPES.PLAIN_TEXT: {
      return BiText;
    }
    case EDITOR_TYPES.RICH_TEXT: {
      return BiPen;
    }
    case EDITOR_TYPES.CODE: {
      return BiCode;
    }
    default:
      return BiText;
  }
};

export const EditorBox = ({ type, title, isActive }: EditorBoxProps) => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const icon = getIcon(type);

  return (
    <EditorBoxContainer>
      <IconContainer>
        <Box as={icon} size="32px" />
      </IconContainer>
      <TitleContainer active={isActive}>{title}</TitleContainer>
      <MenuContainer>
        <Tippy
          placement="right"
          interactive={true}
          arrow={true}
          content={<EditorMenu />}
          visible={visible}
          onClickOutside={hide}
        >
          <BigIconButton
            onClick={visible ? hide : show}
            isRound
            variant="ghost"
            variantColor="white"
            aria-label="Editor menu"
            icon={BiDotsHorizontalRounded}
          />
        </Tippy>
      </MenuContainer>
    </EditorBoxContainer>
  );
};
