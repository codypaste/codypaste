import React from "react";
import styled from "styled-components";
import { RouteProps } from "react-router-dom";
import { DefaultPageWrapper } from "components/common/DefaultPageWrapper";
import { EditorList } from "components/EditorsList/EditorsList";

interface EditorViewProps extends RouteProps {}

const EditorViewContainer = styled.div`
  display: grid;
  grid-template: "editors-list editor share" 1fr / 1fr 5fr 1fr;
  margin-inline-start: 4rem;
`;

const EditorsListContainer = styled.div`
  grid-area: editors-list;
`;

export const EditorView = (props: EditorViewProps) => {
  return (
    <DefaultPageWrapper>
      <EditorViewContainer>
        <EditorsListContainer>
          <EditorList />
        </EditorsListContainer>
      </EditorViewContainer>
    </DefaultPageWrapper>
  );
};
