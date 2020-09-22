import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { RootState } from "types/RootState";
import { topbarStyles } from "config/styles";
import { isUserLoggedInSelector } from "state/app/selectors";
import { LoginButton } from "components/common/LoginButton";

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
  return (
    <TopbarContainer>
      <TopbarLabel>CODYPASTE</TopbarLabel>
      <AccountBox>
        <LoginButton></LoginButton>
      </AccountBox>
    </TopbarContainer>
  );
};

export default connect((state: RootState) => {
  return {
    isUserLoggedIn: isUserLoggedInSelector(state),
  };
})(Topbar);
