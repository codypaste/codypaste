import React from "react";
import styled from "styled-components";
import { connect, ConnectedProps } from "react-redux";
import { BiPlus } from "react-icons/bi";
import { editorListStyles } from "config/styles";
import { EditorBox } from "components/EditorsList/EditorBox";
import { SmallHoverIconButton } from "components/common/HoverIconButton";
import { RootState } from "types/RootState";
import { getAllEditors } from "state/editors/selectors";
import { addEditor } from "state/editors/actions";
import { Button } from "@chakra-ui/core";

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
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  align-self: center;
  padding-inline-start: 1rem;
`;

const AddMoreButton = styled(SmallHoverIconButton)`
  align-self: center;
`;

const NoEditorsContainer = styled.div`
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const EditorList = ({ allEditors, addEditor }: Props) => {
  const handleAddMore = () => {
    addEditor({ title: "", type: "" });
  };

  const NoEditors = () => {
    return (
      <NoEditorsContainer>
        <Button onClick={handleAddMore} variantColor="red">
          Add editor
        </Button>
      </NoEditorsContainer>
    );
  };

  return (
    <EditorListContainer>
      <EditorListHeaderContainer>
        <EditorListTitle>All your editors</EditorListTitle>
        <AddMoreButton
          aria-label="Add more"
          icon={BiPlus}
          variant="ghost"
          variantColor="white"
          onClick={handleAddMore}
        ></AddMoreButton>
      </EditorListHeaderContainer>
      {allEditors.map((editor) => {
        return (
          <EditorBox
            key={editor.id}
            id={editor.id}
            title={editor.title}
            type={editor.type}
          ></EditorBox>
        );
      })}
      {allEditors.length === 0 && <NoEditors></NoEditors>}
    </EditorListContainer>
  );
};

const mapState = (state: RootState) => {
  return {
    allEditors: getAllEditors(state),
  };
};
const mapDispatch = {
  addEditor,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

export default connector(EditorList);
