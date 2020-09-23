import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { RootState } from "types/RootState";
import { topbarStyles, mediaBreakpoints } from "config/styles";
import { MODAL_TYPES, ModalValues } from "config/modals";
import { isUserLoggedInSelector } from "state/app/selectors";
import { SignInButton } from "components/common/SignInButton";
import { SignUpButton } from "components/common/SignUpButton";
import { LoginRegisterModal } from "components/LoginRegisterModal/LoginRegisterModal";

const TopbarContainer = styled.div`
  background-color: ${topbarStyles.backgroundColor};
  height: 4rem;
  display: grid;
  grid-template: "label . account" auto / auto 1fr auto;
  align-items: center;
`;

const TopbarLabel = styled.span`
  color: ${topbarStyles.labelColor};
  font-weight: bold;
  font-size: 1rem;
  grid-area: label;
  margin-inline-start: 1rem;

  @media only screen and (min-width: ${mediaBreakpoints.xlarge}) {
    margin-inline-start: 4rem;
    font-size: 2rem;
  }
`;

const AccountBox = styled.div`
  grid-area: account;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: auto auto;
  margin-inline-end: 1rem;

  @media only screen and (min-width: ${mediaBreakpoints.xlarge}) {
    margin-inline-end: 4rem;
    grid-gap: 1rem;
  }
`;

interface TopBarProps {
  isUserLoggedIn: boolean;
}

const Topbar = (props: TopBarProps) => {
  const [openedModalType, setOpenedModalType] = useState<
    ModalValues | undefined
  >();

  const openLoginModal = () => {
    setOpenedModalType(MODAL_TYPES.LOGIN_MODAL);
  };

  const openRegisterModal = () => {
    setOpenedModalType(MODAL_TYPES.REGISTER_MODAL);
  };

  const closeModal = () => {
    setOpenedModalType(undefined);
  };

  return (
    <Fragment>
      <LoginRegisterModal
        isOpen={openedModalType !== undefined}
        handleOnClose={closeModal}
        modalType={openedModalType}
      />
      <TopbarContainer>
        <TopbarLabel>CODYPASTE</TopbarLabel>
        <AccountBox>
          <SignInButton onClick={openLoginModal}></SignInButton>
          <SignUpButton onClick={openRegisterModal} />
        </AccountBox>
      </TopbarContainer>
    </Fragment>
  );
};

export default connect((state: RootState) => {
  return {
    isUserLoggedIn: isUserLoggedInSelector(state),
  };
})(Topbar);
