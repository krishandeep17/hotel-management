import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { UpdatePasswordSchema } from "../../models/authModel";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import ValidatedInputField from "../../ui/ValidatedInputField";
import useUpdateUser from "./useUpdateUser";

export default function UpdatePasswordForm() {
  const { isUpdating, updateCurrentUser } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdatePasswordSchema),
  });

  function onSubmit({ password }) {
    updateCurrentUser({ password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <ValidatedInputField
          type="password"
          name="password"
          label="Password (min 8 characters)"
          disabled={isUpdating}
          register={register}
          error={errors?.password?.message}
        />
      </FormRow>

      <FormRow>
        <ValidatedInputField
          type="password"
          name="confirmPassword"
          label="Confirm password"
          disabled={isUpdating}
          register={register}
          error={errors?.confirmPassword?.message}
        />
      </FormRow>

      <FormRow>
        <Button
          type="button"
          disabled={isUpdating}
          variation="secondary"
          onClick={() => reset()}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isUpdating}>
          {!isUpdating ? "Update password" : "Updating..."}
        </Button>
      </FormRow>
    </Form>
  );
}
