import React from "react";
import styled from "styled-components";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "types/RootState";
import { editorListStyles } from "config/styles";
import EditorBox from "components/EditorsList/EditorBox";
import { getAllEditors, getActiveEditorId } from "state/editors/selectors";
import { addEditor } from "state/editors/actions";

const EditorListContainer = styled.div`
  background-color: ${editorListStyles.backgroundColor};
  height: 100%;
`;

const EditorListHeaderContainer = styled.div`
  display: grid;
  grid-template: "title title" auto / 1fr auto;
  padding-block-start: 0.5rem;
`;

const EditorListTitle = styled.span`
  grid-area: title;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  align-self: center;
  padding-inline-start: 1rem;
`;

const EditorList = ({ allEditors, addEditor, activeEditorId }: Props) => {
  return (
    <EditorListContainer>
      <EditorListHeaderContainer>
        <EditorListTitle>All your editors</EditorListTitle>
      </EditorListHeaderContainer>
      {allEditors.map((editor) => {
        return (
          <EditorBox
            isActive={activeEditorId === editor.id}
            key={editor.id}
            id={editor.id}
            title={editor.title}
            type={editor.type}
          ></EditorBox>
        );
      })}
    </EditorListContainer>
  );
};

const mapState = (state: RootState) => {
  return {
    allEditors: getAllEditors(state),
    activeEditorId: getActiveEditorId(state),
  };
};
const mapDispatch = {
  addEditor,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

export default connector(EditorList);
