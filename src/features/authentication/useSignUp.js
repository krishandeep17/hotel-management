import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { signUp as signUpApi } from "../../services/apiAuth";

export default function useSignUp() {
  const { isPending, mutate: signUp } = useMutation({
    mutationFn: signUpApi,

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, signUp };
}
