import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SignUpSchema } from "../../models/authModel";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import ValidatedInputField from "../../ui/ValidatedInputField";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  function onSubmit(data) {
    console.log(data);

    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <ValidatedInputField
          type="text"
          name="fullName"
          label="Full name"
          register={register}
          error={errors?.fullName?.message}
        />
      </FormRow>

      <FormRow>
        <ValidatedInputField
          type="email"
          name="email"
          label="Email address"
          register={register}
          error={errors?.email?.message}
        />
      </FormRow>

      <FormRow>
        <ValidatedInputField
          type="password"
          name="password"
          label="Password (min 8 characters)"
          register={register}
          error={errors?.password?.message}
        />
      </FormRow>

      <FormRow>
        <ValidatedInputField
          type="password"
          name="confirmPassword"
          label="Confirm password"
          register={register}
          error={errors?.confirmPassword?.message}
        />
      </FormRow>

      <FormRow>
        <Button type="reset" variation="secondary" onClick={() => reset()}>
          Cancel
        </Button>

        <Button type="submit">Create new user</Button>
      </FormRow>
    </Form>
  );
}
