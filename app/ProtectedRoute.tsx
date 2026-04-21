import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAppStore } from "~/store/useAppStore";
import { LoadingScreen } from "./designs/LoadingScreen";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, isLoadingAuth, checkAuth } = useAppStore();
  const navigate = useNavigate();

  // Redirect if done loading and not authenticated
  useEffect(() => {
    if (!isLoadingAuth && !isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [isLoadingAuth, isAuthenticated, navigate]);

  if (isLoadingAuth) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <>{children}</> : null;
};
