import styled from "styled-components";

const LoginLayout = styled.main`
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

export default function Login() {
  return <LoginLayout>Login</LoginLayout>;
}
