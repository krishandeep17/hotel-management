import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  height: 100svh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;

  @supports not (height: 100svh) {
    /* Fallback for browsers without svh(small viewport height) support */
    height: 100vh;
  }
`;

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const StyledSpinner = styled.div`
  margin: 4.8rem auto;

  width: 6.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000)
      top/10px 10px no-repeat,
    conic-gradient(#0000 30%, var(--color-brand-600));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;

export default function Spinner({ type }) {
  return type === "fullPage" ? (
    <Wrapper>
      <StyledSpinner />
    </Wrapper>
  ) : (
    <StyledSpinner />
  );
}
