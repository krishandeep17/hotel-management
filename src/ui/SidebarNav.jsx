import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const NavItem = styled.li`
  a {
    &:any-link {
      display: flex;
      align-items: center;
      gap: 1.2rem;

      position: relative;
      border-radius: var(--border-radius-sm);
      color: var(--color-grey-600);
      font-size: 1.6rem;
      font-weight: 500;
      padding: 1.2rem;
      transition: background-color 0.3s, color 0.2s;
    }

    /* This works because react-router places the active class on the active NavLink */
    &:hover,
    &:active,
    &.active:any-link {
      background-color: var(--color-brand-50);
      color: var(--color-brand-600);
    }

    & svg {
      height: 2.4rem;
      width: 2.4rem;
      min-width: 2.4rem;
      color: var(--color-grey-600);
      transition: color 0.2s;
    }

    &:hover svg,
    &:active svg,
    &.active:any-link svg {
      color: var(--color-brand-600);
    }

    & span {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
      transition: opacity 0.3s;
    }

    ${(props) =>
      props.isCollapsed &&
      css`
        &::before,
        &::after {
          position: absolute;
          top: 50%;

          opacity: 0;
          pointer-events: none;
          visibility: hidden;
          transform: translate(-5px, -50%);
          transition: 0.2s;
        }

        &::before {
          content: attr(data-tooltip);
          background-color: var(--color-grey-800);
          color: var(--color-brand-50);
          border-radius: var(--border-radius-sm);
          font-weight: 500;
          font-size: 1.4rem;
          padding: 0.44rem 0.8rem;
          left: calc(100% + var(--padding-inline) + 5px);
        }

        &::after {
          content: "";
          border: 5px solid transparent;
          border-right-color: var(--color-grey-800);
          border-left: none;
          left: calc(100% + var(--padding-inline) + 1px);
        }

        &:hover::before,
        &:hover::after,
        &:focus::before,
        &:focus::after {
          opacity: 1;
          pointer-events: auto;
          visibility: visible;
          transform: translate(0, -50%);
        }

        & span {
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
        }
      `}
  }
`;

const navLinks = [
  { name: "Home", icon: <HiOutlineHome />, url: "/home" },
  { name: "Bookings", icon: <HiOutlineCalendarDays />, url: "/bookings" },
  { name: "Cabins", icon: <HiOutlineHomeModern />, url: "/cabins" },
  { name: "Users", icon: <HiOutlineUsers />, url: "/users" },
  { name: "Settings", icon: <HiOutlineCog6Tooth />, url: "/settings" },
];

export default function SidebarNav({ isCollapsed }) {
  return (
    <nav>
      <NavList>
        {navLinks.map((link) => (
          <NavItem key={link.name} isCollapsed={isCollapsed}>
            <NavLink to={link.url} title={link.name} data-tooltip={link.name}>
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </nav>
  );
}
