import styled from "styled-components";

import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";
import Heading from "./Heading";

const StyledErrorFallback = styled.main`
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
  min-height: 100svh;

  @supports not (min-height: 100svh) {
    /* Fallback for browsers without svh(small viewport height) support */
    min-height: 100vh;
  }
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono", monospace;
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />

      <StyledErrorFallback>
        <Box>
          <Heading as="h1">Something went wrong 🧐</Heading>

          <p>{error.message}</p>

          <Button size="large" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}
