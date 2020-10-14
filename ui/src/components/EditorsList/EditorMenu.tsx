import React from "react";
import styled from "styled-components";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "types/RootState";
import { removeEditor } from "state/editors/actions";
import { BiX, BiEdit } from "react-icons/bi";
import { Button } from "@chakra-ui/core";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomMenuButton = styled(Button)`
  background-color: rgba(0, 0, 0, 0) !important;
  color: rgba(255, 255, 255, 0.6) !important;

  :hover {
    background-color: rgba(0, 0, 0, 0) !important;
    color: rgba(255, 255, 255, 1) !important;
  }
`;

export const EditorMenu = ({ removeEditor, editorId }: Props) => {
  const handleRemoval = () => {
    removeEditor(editorId);
  };

  return (
    <MenuContainer>
      <CustomMenuButton onClick={handleRemoval} leftIcon={BiX} variant="ghost">
        Remove
      </CustomMenuButton>
      <CustomMenuButton leftIcon={BiEdit} variant="ghost">
        Rename
      </CustomMenuButton>
    </MenuContainer>
  );
};

const mapState = (state: RootState) => {
  return {};
};
const mapDispatch = {
  removeEditor,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
  editorId: string;
};

export default connector(EditorMenu);
