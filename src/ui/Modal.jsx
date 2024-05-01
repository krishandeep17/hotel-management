import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineXMark } from "react-icons/hi2";
import styled from "styled-components";

import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90%;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  overflow: auto;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 100;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: background-color 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// COMPOUND COMPONENT PATTERN //

// 1) Create a context
const ModalContext = createContext();

// 2) Create a parent component
export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, setOpenName, close }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3) Create child components to help implementing the common task
function Open({ children, opens: opensWindowName }) {
  const { setOpenName } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => setOpenName(opensWindowName),
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiOutlineXMark />
        </Button>
        <div>{cloneElement(children, { handleCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// 4) Add child components as properties to parent component
Modal.Open = Open;
Modal.Window = Window;
