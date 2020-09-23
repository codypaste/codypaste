import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { IconButton } from "@chakra-ui/core";
import { BiX } from "react-icons/bi";
import "components/common/ModalWrapper/Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalBody = styled.div`
  display: grid;
  grid-template:
    ". closeButton" auto
    "content content" 1fr / 1fr;
  padding: 0.5rem;
`;

const CloseButtonContainer = styled.div`
  grid-area: closeButton;
`;

const ModalContent = styled.div`
  grid-area: content;
`;

export const ModalWrapper = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="ReactModal__Overlay__LoginRegister"
      className="ReactModal__Content__LoginRegister"
    >
      <ModalBody>
        <CloseButtonContainer>
          <IconButton
            variant="ghost"
            onClick={onClose}
            aria-label="Search database"
            icon={BiX}
          />
        </CloseButtonContainer>
        <ModalContent>{children}</ModalContent>
      </ModalBody>
    </Modal>
  );
};
