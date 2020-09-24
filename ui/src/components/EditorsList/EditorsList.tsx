import React from "react";
import styled from "styled-components";
import { BiPlus } from "react-icons/bi";
import { Button } from "@chakra-ui/core";
import { EDITOR_TYPES } from "config/constants";
import { EditorBox } from "components/EditorsList/EditorBox";

const EditorListContainer = styled.div`
  display: grid;
  margin-block-start: 1rem;
`;

const EditorListHeaderContainer = styled.div`
  display: grid;
  grid-template: "title action" auto / 1fr auto;
`;

const EditorListTitle = styled.span`
  grid-area: title;
  font-family: "Oswald";
  font-size: 2rem;
  color: rgba(0, 0, 0, 0, 0.8);
  align-self: center;
`;

const AddMoreButton = styled(Button)`
  align-self: center;
`;

export const EditorList = () => {
  return (
    <EditorListContainer>
      <EditorListHeaderContainer>
        <EditorListTitle>All your editors</EditorListTitle>
        <AddMoreButton
          leftIcon={BiPlus}
          variant="solid"
          variantColor="red"
          onClick={() => {}}
        >
          <span>Add</span>
        </AddMoreButton>
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
