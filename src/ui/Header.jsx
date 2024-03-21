import styled from "styled-components";

const StyledHeader = styled.header`
  grid-area: header;

  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  position: sticky;
  top: 0;
  z-index: 20;
`;

export default function Header() {
  return <StyledHeader>Header</StyledHeader>;
}
