import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useUser() {
  const {
    isPending,
    isFetching,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isPending,
    isFetching,
    isAuthenticated: user?.role === "authenticated",
  };
}
