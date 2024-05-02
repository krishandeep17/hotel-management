import styled from "styled-components";

import lightLogo from "../assets/logo-light.png";

const Img = styled.img`
  margin-inline: auto;
  width: 13.5rem;
`;

export default function Logo() {
  return (
    <picture>
      <Img src={lightLogo} alt="Logo" width="150" height="107" loading="lazy" />
    </picture>
  );
}
