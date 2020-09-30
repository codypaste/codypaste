import React, { Suspense } from "react";
import styled from "styled-components";
import { RouteProps } from "react-router-dom";
import { DefaultPageWrapper } from "components/common/DefaultPageWrapper";
import EditorList from "components/EditorsList/EditorsList";
import { ShareCenter } from "components/ShareCenter/ShareCenter";

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

export const EditorView = (props: EditorViewProps) => {
  return (
    <DefaultPageWrapper>
      <EditorViewContainer>
        <EditorsListContainer>
          <EditorList />
        </EditorsListContainer>
        <EditorContainer>
          <Suspense fallback={<div>Loading...</div>}>
            <CodeEditor />
          </Suspense>
        </EditorContainer>
        <ShareContainter>
          <ShareCenter></ShareCenter>
        </ShareContainter>
      </EditorViewContainer>
    </DefaultPageWrapper>
  );
};
