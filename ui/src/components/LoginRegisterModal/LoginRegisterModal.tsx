import React from "react";
import Modal from "react-modal";
import { Button } from "@chakra-ui/core";
import "components/LoginRegisterModal/LoginRegisterModal.scss";

interface LoginRegisterModalProps {
  isOpen: boolean;
  handleOnClose: () => void;
}

export const LoginRegisterModal = ({
  isOpen,
  handleOnClose,
}: LoginRegisterModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleOnClose}
      overlayClassName="ReactModal__Overlay__LoginRegister"
      className="ReactModal__Content__LoginRegister"
    >
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <Button variantColor="purple">Button</Button>
      </form>
    </Modal>
  );
};
