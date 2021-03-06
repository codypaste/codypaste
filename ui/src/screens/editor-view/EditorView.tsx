import React, { Suspense } from "react";
import styled from "styled-components";
import { RouteProps } from "react-router-dom";
import { DefaultPageWrapper } from "components/common/DefaultPageWrapper";
import EditorList from "components/EditorsList/EditorsList";
import { ShareCenter } from "components/ShareCenter/ShareCenter";
import { EDITOR_TYPES } from "config/constants";
import {
  hasAnyEditor,
  getActiveEditor,
  shouldShowNewEditorBoxes,
} from "state/editors/selectors";
import { RootState } from "types/RootState";
import { connect, ConnectedProps } from "react-redux";
import NoEditorBoxes from "components/NoEditorsBoxes/NoEditorBoxes";
import { saveEditorContent } from "state/editors/actions";

const CodeEditor = React.lazy(() => import("components/CodeEditor/CodeEditor"));

interface EditorViewProps extends RouteProps {}

const EditorViewContainer = styled.div`
  display: grid;
  grid-template: "editors-list editor share" 1fr / minmax(300px, 1fr) 5fr 1fr;
  height: 100%;
`;

const EditorsListContainer = styled.div`
  grid-area: editors-list;
  height: 100%;
`;

const ShareContainter = styled.div`
  grid-area: share;
  height: 100%;
`;

const EditorContainer = styled.div`
  grid-area: editor;
  height: 100%;
`;

export const EditorView = ({
  hasAnyEditor,
  activeEditor,
  saveEditorContent,
  shouldShowNewEditorBoxes,
}: Props) => {
  const handleEditorContentSave = (id: string, content: string) => {
    if (content !== activeEditor.content) {
      saveEditorContent({
        content,
        editorId: activeEditor.id,
      });
    }
  };

  const shouldShowEditor = () => {
    return !shouldShowNewEditorBoxes && hasAnyEditor;
  };

  return (
    <DefaultPageWrapper>
      <EditorViewContainer>
        <EditorsListContainer>
          <EditorList />
        </EditorsListContainer>
        <EditorContainer>
          {shouldShowNewEditorBoxes && <NoEditorBoxes />}
          {shouldShowEditor() && (
            <Suspense fallback={<div></div>}>
              {activeEditor.type === EDITOR_TYPES.CODE && (
                <CodeEditor
                  content={activeEditor.content}
                  id={activeEditor.id}
                  onSave={handleEditorContentSave}
                />
              )}
            </Suspense>
          )}
        </EditorContainer>
        <ShareContainter>
          {hasAnyEditor && <ShareCenter></ShareCenter>}
        </ShareContainter>
      </EditorViewContainer>
    </DefaultPageWrapper>
  );
};

const mapState = (state: RootState) => {
  return {
    hasAnyEditor: hasAnyEditor(state),
    activeEditor: getActiveEditor(state),
    shouldShowNewEditorBoxes: shouldShowNewEditorBoxes(state),
  };
};
const mapDispatch = {
  saveEditorContent,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & EditorViewProps;

export default connector(EditorView);
