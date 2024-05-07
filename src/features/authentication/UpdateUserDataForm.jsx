import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";

import ValidatedInputField from "../../ui/ValidatedInputField";
import ValidatedInputFile from "../../ui/ValidatedInputFile";
import useUser from "./useUser";
import { UpdateUserDataSchema } from "../../models/authModel";
import useUpdateUser from "./useUpdateUser";

export default function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();

  const { isUpdating, updateCurrentUser } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email,
      fullName: user?.user_metadata?.fullName,
    },
    resolver: zodResolver(UpdateUserDataSchema),
  });

  function onSubmit({ fullName, avatar }) {
    if (!fullName) return;

    updateCurrentUser({ fullName, avatar }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <ValidatedInputField
          type="email"
          name="email"
          label="Email address"
          disabled={true}
          register={register}
          error={errors?.email?.message}
        />
      </FormRow>

      <FormRow>
        <ValidatedInputField
          type="text"
          name="fullName"
          label="Full name"
          disabled={isUpdating}
          register={register}
          error={errors?.fullName?.message}
        />
      </FormRow>

      <FormRow>
        <Controller
          disabled={isUpdating}
          name="avatar"
          control={control}
          render={({ field }) => (
            <ValidatedInputFile
              label="Avatar image"
              error={errors?.image?.message}
              field={field}
              accept="image/*"
            />
          )}
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
          {!isUpdating ? "Update account" : "Updating..."}
        </Button>
      </FormRow>
    </Form>
  );
}
