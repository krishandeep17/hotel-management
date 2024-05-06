import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiInformationCircle } from "react-icons/hi2";

import { SignUpSchema } from "../../models/authModel";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import ValidatedInputField from "../../ui/ValidatedInputField";
import useSignUp from "./useSignUp";

export default function SignUpForm() {
  const { isPending, signUp } = useSignUp();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  function onSubmit({ fullName, email, password }) {
    if (!fullName || !email || !password) return;

    signUp(
      { fullName, email, password },
      {
        onSuccess: () => {
          toast.success("Account created successfully!");

          toast("Please verify the new account from the user's email address", {
            icon: (
              <HiInformationCircle
                style={{
                  height: "2.4rem",
                  width: "2.4rem",
                  minWidth: "2.4rem",
                  color: "#0ea5e9",
                }}
              />
            ),
            duration: 6000,
          });
        },

        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <ValidatedInputField
          type="text"
          name="fullName"
          label="Full name"
          disabled={isPending}
          register={register}
          error={errors?.fullName?.message}
        />
      </FormRow>

      <FormRow>
        <ValidatedInputField
          type="email"
          name="email"
          label="Email address"
          disabled={isPending}
          register={register}
          error={errors?.email?.message}
        />
      </FormRow>

      <FormRow>
        <ValidatedInputField
          type="password"
          name="password"
          label="Password (min 8 characters)"
          disabled={isPending}
          register={register}
          error={errors?.password?.message}
        />
      </FormRow>

      <FormRow>
        <ValidatedInputField
          type="password"
          name="confirmPassword"
          label="Confirm password"
          disabled={isPending}
          register={register}
          error={errors?.confirmPassword?.message}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          disabled={isPending}
          variation="secondary"
          onClick={() => reset()}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isPending}>
          {!isPending ? "Create new user" : "Creating..."}
        </Button>
      </FormRow>
    </Form>
  );
}
