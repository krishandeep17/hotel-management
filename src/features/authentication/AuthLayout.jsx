import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Logo from "../../ui/Logo";
import Spinner from "../../ui/Spinner";
import useUser from "./useUser";

const StyledAuthLayout = styled.main`
  min-height: 100svh;
  padding: 4rem 1rem 6.4rem;
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

export default function AuthLayout() {
  // 1. Load the authenticated user
  const { isPending, isAuthenticated } = useUser();

  // 2. If there is authenticated user, redirect to the `/dashboard`
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (isAuthenticated && !isPending)
      navigate(state?.path || "/dashboard", { replace: true });
  }, [isAuthenticated, isPending, navigate, state]);

  // 3. While loading, show a spinner
  if (isPending) return <Spinner type="fullPage" />;

  // 4. If there is no user, render the auth routes
  return (
    !isAuthenticated && (
      <StyledAuthLayout>
        <Logo />

        <Outlet />
      </StyledAuthLayout>
    )
  );
}
