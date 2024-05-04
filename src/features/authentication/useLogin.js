import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import { login as loginApi } from "../../services/apiAuth";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { isPending, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      // Manually set data into the React Query cache
      queryClient.setQueryData(["user"], data?.user);

      navigate(state?.path || "/dashboard", { replace: true });

      toast("Welcome back!", { icon: "🎉" });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, login };
}
