import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { logout as logoutApi } from "../../services/apiAuth";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      // Remove all queries from the React Query cache
      queryClient.removeQueries();

      navigate("/login", { replace: true });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, logout };
}
