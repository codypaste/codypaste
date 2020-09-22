import React from "react";
import styled from "styled-components";

const LoginButtonLabel = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
`;

const LoginButtonContainer = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  display: grid;
  align-items: center;
  justify-items: center;
  padding-block-start: 0.8rem;
  padding-block-end: 0.8rem;
  padding-inline-start: 2rem;
  padding-inline-end: 2rem;
  background-color: rgba(255, 255, 255, 0);

  :hover {
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 1);
    ${LoginButtonLabel} {
      color: #fff;
    }
  }
`;

export const LoginButton = () => {
  return (
    <LoginButtonContainer>
      <LoginButtonLabel>Login</LoginButtonLabel>
    </LoginButtonContainer>
  );
};
