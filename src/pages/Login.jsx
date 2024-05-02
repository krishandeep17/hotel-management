import { Link } from "react-router-dom";
import styled from "styled-components";

import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

const LoginLayout = styled.main`
  min-height: 100svh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  @supports not (min-height: 100svh) {
    /* Fallback for browsers without svh(small viewport height) support */
    min-height: 100vh;
  }
`;

export default function Login() {
  return (
    <LoginLayout>
      <Link to="/">
        <Logo />
      </Link>
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}
