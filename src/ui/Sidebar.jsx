import { useState } from "react";
import styled from "styled-components";

import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";

const StyledSidebar = styled.aside`
  --padding-block: 2.4rem;
  --padding-inline: 1.6rem;

  grid-area: sidebar;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 20;
  width: ${(props) => (props.isCollapsed ? "8.08rem" : "26rem")};
  transition: width 0.4s;
  height: 100svh;

  @supports not (height: 100svh) {
    /* Fallback for browsers without svh(small viewport height) support */
    height: 100vh;
  }

  background-color: var(--color-grey-0);
  padding: var(--padding-block) var(--padding-inline);
  border-right: 1px solid var(--color-grey-100);

  & button {
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    transform: translateX(-5px);
  }

  &:hover button {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
    transform: translateX(0);
  }
`;

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <StyledSidebar isCollapsed={isCollapsed}>
      <SidebarHeader
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <SidebarNav isCollapsed={isCollapsed} />
    </StyledSidebar>
  );
}
