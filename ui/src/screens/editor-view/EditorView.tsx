import Topbar from "components/Topbar/Topbar";
import React from "react";
import { RouteProps } from "react-router-dom";
import styled from "styled-components";

interface EditorViewProps extends RouteProps {}

const EditorViewContainer = styled.div`
  display: grid;
`;

export const EditorView = (props: EditorViewProps) => {
  return <EditorViewContainer>
      <Topbar></Topbar>
  </EditorViewContainer>;
};
