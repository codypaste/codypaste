import React from "react";
import styled from "styled-components";
import Topbar from "components/Topbar/Topbar";

const PageLayout = styled.div`
  display: grid;
  grid-template:
    "topbar" auto
    "content" 1fr / 1fr;
`;

const TopbarWrapper = styled(Topbar)`
  grid-area: topbar;
`;

const ContentWrapper = styled.div`
  grid-area: content;
`;

interface DefaultPageProps {
  children: React.ReactNode;
}

export const DefaultPageWrapper = ({ children }: DefaultPageProps) => {
  return (
    <PageLayout>
      <TopbarWrapper>
        <Topbar></Topbar>
      </TopbarWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </PageLayout>
  );
};
