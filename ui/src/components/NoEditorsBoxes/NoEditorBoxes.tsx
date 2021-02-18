import React, { Fragment } from "react";
import styled from "styled-components";
import { Box } from "@chakra-ui/core";
import { connect, ConnectedProps } from "react-redux";
import { BiCode, BiPen, BiText } from "react-icons/bi";
import { RootState } from "types/RootState";
import { addEditor } from "state/editors/actions";
import { EditorTypesType, EDITOR_TYPES } from "config/constants";

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`;

const BoxesContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2rem;
`;

const OptionBox = styled.button`
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  text-align: left;
  width: 20rem;
  height: 100%;
  display: grid;
  grid-template:
    "icon" auto
    "title" auto
    "description" 1fr / 1fr;
  grid-gap: 0.5rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.25rem;
  :hover {
    box-shadow: ${(props) =>
      props.disabled ? "none" : "2px 2px 2px 1px rgba(0, 0, 0, 0.1)"};
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }
`;

const Icon = styled(Box)`
  opacity: 0.8;
  svg {
  }
`;

const IconContainer = styled.div`
  width: 3rem;
  height: 3rem;
  grid-area: icon;
  border-radius: 50%;
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: #34384c;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const NoEditorBoxes = ({ addEditor }: Props) => {
  const handleAddEditor = (editorType: EditorTypesType) => {
    addEditor({
      title: "",
      type: editorType,
    });
  };

  return (
    <Fragment>
      <Container>
        <BoxesContainer>
          <OptionBox
            onClick={() => {
              handleAddEditor(EDITOR_TYPES.CODE);
            }}
          >
            <IconContainer>
              <Icon size="24px" as={BiCode} color="#fff" />
            </IconContainer>
            <Title>Code</Title>
            <span>
              Editor with syntax highlight, line number etc. The best choice for
              code purposes.
            </span>
          </OptionBox>
          <OptionBox
            disabled
            onClick={() => {
              handleAddEditor(EDITOR_TYPES.RICH_TEXT);
            }}
          >
            <IconContainer>
              <Icon size="24px" as={BiPen} color="#fff" />
            </IconContainer>
            <Title>Rich text editor</Title>
            <span>WYSIWYG editor, best for notes and other stuff</span>
          </OptionBox>
          <OptionBox
            disabled
            onClick={() => {
              handleAddEditor(EDITOR_TYPES.PLAIN_TEXT);
            }}
          >
            <IconContainer>
              <Icon size="24px" as={BiText} color="#fff" />
            </IconContainer>
            <Title>Plain text</Title>
            <span>Plain text, best for mobile devices and basic stuff</span>
          </OptionBox>
        </BoxesContainer>
      </Container>
    </Fragment>
  );
};

const mapState = (state: RootState) => {
  return {};
};
const mapDispatch = {
  addEditor,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

export default connector(NoEditorBoxes);
