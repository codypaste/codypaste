import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { RootState } from "types/RootState";
import { topbarStyles } from "config/styles";
import { isUserLoggedInSelector } from "state/app/selectors";
import { LoginButton } from "components/common/LoginButton";
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
  font-size: 2rem;
  grid-area: label;
  margin-inline-start: 4rem;
`;

const AccountBox = styled.div`
  grid-area: account;
  margin-inline-end: 4rem;
`;

interface TopBarProps {
  isUserLoggedIn: boolean;
}

const Topbar = (props: TopBarProps) => {
  const [isLoginRegisterModalOpen, setLoginRegisterModalOpen] = useState(false);

  const toggleLoginRegisterModal = () => {
    setLoginRegisterModalOpen(!isLoginRegisterModalOpen);
  };

  return (
    <Fragment>
      <LoginRegisterModal
        isOpen={isLoginRegisterModalOpen}
        handleOnClose={toggleLoginRegisterModal}
      />
      <TopbarContainer>
        <TopbarLabel>CODYPASTE</TopbarLabel>
        <AccountBox>
          <LoginButton onClick={toggleLoginRegisterModal}></LoginButton>
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
