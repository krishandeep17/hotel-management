import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema } from "../../models/authModel";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";
import ValidatedInputField from "../../ui/ValidatedInputField";
import useLogin from "./useLogin";

export default function LoginForm() {
  const { isPending, login } = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "krishandeep@example.com", // PRE-FILL FOR DEV PURPOSES
      password: "Password1234", // PRE-FILL FOR DEV PURPOSES
    },
    resolver: zodResolver(loginSchema),
  });

  function onSubmit({ email, password }) {
    if (!email || !password) return;

    login({ email, password });

    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow vertical>
        <ValidatedInputField
          type="email"
          name="email"
          // This makes this form better for password managers
          autoComplete="username"
          label="Email address"
          disabled={isPending}
          register={register}
          error={errors?.email?.message}
        />
      </FormRow>

      <FormRow vertical>
        <ValidatedInputField
          type="password"
          name="password"
          autoComplete="current-password"
          label="Password"
          disabled={isPending}
          register={register}
          error={errors?.password?.message}
        />
      </FormRow>

      <FormRow vertical>
        <Button type="submit" disabled={isPending} size="large">
          {!isPending ? "Login" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}
