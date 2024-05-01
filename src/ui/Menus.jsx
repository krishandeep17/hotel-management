import { createContext, useContext, useState } from "react";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const StyledList = styled.ul`
  position: absolute;
  top: 4rem;
  right: 0;
  z-index: 10;
  width: 17.5rem;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  padding-block: 0.8rem;
`;

const StyledButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: background-color 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-200);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const MenusContext = createContext();

export default function Menus({ children }) {
  const [openId, setOpenId] = useState("");

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, close, open }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open } = useContext(MenusContext);

  const isClose = openId === "" || openId !== id;

  function handleClick(e) {
    e.stopPropagation();

    isClose ? open(id) : close();
  }

  return (
    <StyledToggle
      title={isClose ? "Open Menu" : "Close Menu"}
      onClick={handleClick}
    >
      <HiOutlineEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children, id }) {
  const { openId, close } = useContext(MenusContext);

  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return <StyledList ref={ref}>{children}</StyledList>;
}

function Button({ children, onClick, icon }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <StyledButton title={children} onClick={handleClick}>
      {icon} <span>{children}</span>
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
