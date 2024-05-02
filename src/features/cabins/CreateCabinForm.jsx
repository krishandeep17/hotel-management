import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { createCabinSchema, updateCabinSchema } from "../../models/cabinModel";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import ValidatedInputField from "../../ui/ValidatedInputField";
import ValidatedInputFile from "../../ui/ValidatedInputFile";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

export default function CreateCabinForm({
  cabinToUpdate = {},
  handleCloseModal,
}) {
  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();
  const isWorking = isCreating || isUpdating;

  const { id: updateId, ...updateValues } = cabinToUpdate;
  const isUpdateSession = Boolean(updateId);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
    resolver: zodResolver(
      isUpdateSession ? updateCabinSchema : createCabinSchema
    ),
  });

  function onSubmit(data) {
    if (isUpdateSession) {
      updateCabin(
        { updateCabinData: data, id: updateId },
        {
          onSuccess: () => {
            reset();
            handleCloseModal?.();
          },
        }
      );
    } else {
      createCabin(data, {
        onSuccess: () => {
          reset();
          handleCloseModal?.();
        },
      });
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={handleCloseModal ? "modal" : "regular"}
    >
      <FormRow>
        <ValidatedInputField
          type="text"
          name="name"
          label="Cabin name"
          disabled={isWorking}
          register={register}
          error={errors?.name?.message}
        />
      </FormRow>

      <FormRow>
        <ValidatedInputField
          type="number"
          name="maxCapacity"
          label="Max Capacity"
          disabled={isWorking}
          register={register}
          error={errors?.maxCapacity?.message}
        />
      </FormRow>

      <FormRow>
        <ValidatedInputField
          type="number"
          name="regularPrice"
          label="Regular price"
          disabled={isWorking}
          register={register}
          error={errors?.regularPrice?.message}
        />
      </FormRow>

      <FormRow>
        <ValidatedInputField
          type="number"
          name="discount"
          label="Discount"
          disabled={isWorking}
          register={register}
          error={errors?.discount?.message}
        />
      </FormRow>

      <FormRow>
        <ValidatedInputField
          type="textarea"
          name="description"
          label="Description for website"
          disabled={isWorking}
          register={register}
          error={errors?.description?.message}
        />
      </FormRow>

      <FormRow>
        <Controller
          disabled={isWorking}
          name="image"
          control={control}
          render={({ field }) => (
            <ValidatedInputFile
              label="Cabin photo"
              error={errors?.image?.message}
              field={field}
              accept="image/*"
            />
          )}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          disabled={isWorking}
          variation="secondary"
          onClick={() => handleCloseModal?.()}
        >
          Cancel
        </Button>

        {isUpdateSession ? (
          <Button type="submit" disabled={isWorking}>
            {isWorking ? "Updating..." : "Update cabin"}
          </Button>
        ) : (
          <Button type="submit" disabled={isWorking}>
            {isWorking ? "Creating..." : "Create new cabin"}
          </Button>
        )}
      </FormRow>
    </Form>
  );
}
