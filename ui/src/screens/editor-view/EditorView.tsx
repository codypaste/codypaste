import React from "react";
import styled from "styled-components";
import { RouteProps } from "react-router-dom";
import { DefaultPageWrapper } from "components/common/DefaultPageWrapper";

interface EditorViewProps extends RouteProps {}

const EditorViewContainer = styled.div`
  display: grid;
`;

export const EditorView = (props: EditorViewProps) => {
  return (
    <DefaultPageWrapper>
      <EditorViewContainer></EditorViewContainer>
    </DefaultPageWrapper>
  );
};
