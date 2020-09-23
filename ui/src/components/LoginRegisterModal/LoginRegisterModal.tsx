import React from "react";
import { MODAL_TYPES, ModalValues } from "config/modals";
import { ModalWrapper } from "components/common/ModalWrapper/Modal";
import { LoginForm } from "components/LoginRegisterModal/LoginForm";
import { RegisterForm } from "components/LoginRegisterModal/RegisterForm";

interface LoginRegisterModalProps {
  isOpen: boolean;
  handleOnClose: () => void;
  modalType?: ModalValues;
}

export const LoginRegisterModal = ({
  isOpen,
  handleOnClose,
  modalType,
}: LoginRegisterModalProps) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={handleOnClose}>
      {modalType === MODAL_TYPES.LOGIN_MODAL && <LoginForm />}
      {modalType === MODAL_TYPES.REGISTER_MODAL && <RegisterForm />}
    </ModalWrapper>
  );
};
