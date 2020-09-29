import React from "react";
import styled from "styled-components";
import { BiPlus } from "react-icons/bi";
import { EDITOR_TYPES } from "config/constants";
import { editorListStyles } from "config/styles";
import { EditorBox } from "components/EditorsList/EditorBox";
import { SmallHoverIconButton } from "components/common/HoverIconButton";

const EditorListContainer = styled.div`
  background-color: ${editorListStyles.backgroundColor};
  height: 100%;
`;

const EditorListHeaderContainer = styled.div`
  display: grid;
  grid-template: "title action" auto / 1fr auto;
`;

const EditorListTitle = styled.span`
  grid-area: title;
  font-family: "Oswald";
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  align-self: center;
  padding-inline-start: 1rem;
`;

const AddMoreButton = styled(SmallHoverIconButton)`
  align-self: center;
`;

export const EditorList = () => {
  return (
    <EditorListContainer>
      <EditorListHeaderContainer>
        <EditorListTitle>All your editors</EditorListTitle>
        <AddMoreButton
          aria-label="Add more"
          icon={BiPlus}
          variant="ghost"
          variantColor="white"
          onClick={() => {}}
        ></AddMoreButton>
      </EditorListHeaderContainer>
      <EditorBox
        isActive
        title="Untitled editor 1 fdsf sdf sd"
        type={EDITOR_TYPES.CODE}
      ></EditorBox>
      <EditorBox title="Untitled editor 2" type={EDITOR_TYPES.CODE}></EditorBox>
      <EditorBox
        title="Untitled editor 3"
        type={EDITOR_TYPES.PLAIN_TEXT}
      ></EditorBox>
      <EditorBox
        title="Untitled editor 4"
        type={EDITOR_TYPES.RICH_TEXT}
      ></EditorBox>
    </EditorListContainer>
  );
};
