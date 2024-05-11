import styled from "styled-components";

import darkLogo from "../assets/logo-dark.png";
import lightLogo from "../assets/logo-light.png";
import { useDarkMode } from "../contexts/DarkModeContext";

const Img = styled.img`
  margin-inline: auto;
  width: 13.5rem;
`;

export default function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <picture>
      <Img
        src={isDarkMode ? darkLogo : lightLogo}
        alt="Logo"
        width="150"
        height="107"
        loading="lazy"
      />
    </picture>
  );
}
