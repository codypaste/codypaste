import React from "react";
import styled from "styled-components";
import { sidebarStyles } from "config/styles";
import Topbar from "components/Topbar/Topbar";
import { Sidebar } from "components/Sidebar/Sidebar";

const PageLayout = styled.div`
  display: grid;
  grid-template:
    "sidebar topbar" auto
    "sidebar content" 1fr / auto 1fr;
`;

const TopbarWrapper = styled(Topbar)`
  grid-area: topbar;
`;

const ContentWrapper = styled.div`
  grid-area: content;
`;

const SidebarWrapper = styled.div`
  grid-area: sidebar;
  background-color: #eee;
  width: 4rem;
  background-color: ${sidebarStyles.backgroundColor};
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
      <SidebarWrapper>
        <Sidebar></Sidebar>
      </SidebarWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </PageLayout>
  );
};
