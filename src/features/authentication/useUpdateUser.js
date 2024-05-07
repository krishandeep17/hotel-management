import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateCurrentUser } = useMutation({
    mutationFn: updateCurrentUserApi,

    onSuccess: (data) => {
      // Manually set data into the React Query cache
      queryClient.setQueryData(["user"], data?.user);

      toast.success("User account updated successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateCurrentUser };
}
