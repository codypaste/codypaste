import React from "react";
import styled from "styled-components";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "types/RootState";
import { BiPlus } from "react-icons/bi";
import { editorListStyles } from "config/styles";
import EditorBox from "components/EditorsList/EditorBox";
import { SmallHoverIconButton } from "components/common/HoverIconButton";
import { getAllEditors, getActiveEditorId } from "state/editors/selectors";
import { showNewEditorBoxes } from "state/editors/actions";

const EditorListContainer = styled.div`
  background-color: ${editorListStyles.backgroundColor};
  height: 100%;
`;

const EditorListHeaderContainer = styled.div`
  display: grid;
  grid-template: "title action" auto / 1fr auto;
  min-height: 40px;
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

const EditorList = ({
  allEditors,
  showNewEditorBoxes,
  activeEditorId,
}: Props) => {
  const handleAddMore = () => {
    showNewEditorBoxes();
  };

  return (
    <EditorListContainer>
      <EditorListHeaderContainer>
        <EditorListTitle>All your editors</EditorListTitle>
        {allEditors.length > 0 && (
          <AddMoreButton
            aria-label="Add more"
            icon={BiPlus}
            variant="ghost"
            variantColor="white"
            onClick={handleAddMore}
          ></AddMoreButton>
        )}
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
  showNewEditorBoxes,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

export default connector(EditorList);
