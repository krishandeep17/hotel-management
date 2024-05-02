import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema } from "../../models/authModel";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import ValidatedInputField from "../../ui/ValidatedInputField";

function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data) {
    console.log(data);
    reset();
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow vertical>
        <ValidatedInputField
          type="email"
          name="email"
          autoComplete="email"
          label="Email address"
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
          register={register}
          error={errors?.password?.message}
        />
      </FormRow>

      <FormRow>
        <Button type="submit" size="large">
          Login
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
