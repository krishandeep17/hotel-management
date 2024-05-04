import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children }) {
  // 1. Load the authenticated user
  const { isPending, isAuthenticated } = useUser();

  // 2. If there is no authenticated user, redirect to the `/login`
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !isPending) {
      navigate("/login", { replace: true, state: { path: location.pathname } });
    }
  }, [isAuthenticated, isPending, navigate, location]);

  // 3. While loading, show a spinner
  if (isPending) return <Spinner type="fullPage" />;

  // 4. If there is an user, render the app
  return isAuthenticated && children;
}
