import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { createCabinSchema, updateCabinSchema } from "../../models/cabinModel";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
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
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name")}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", { valueAsNumber: true })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", { valueAsNumber: true })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", { valueAsNumber: true })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <Controller
          disabled={isWorking}
          name="image"
          control={control}
          render={({ field: { disabled, name, onBlur, onChange, ref } }) => (
            <FileInput
              type="file"
              accept="image/*"
              id="image"
              disabled={disabled}
              name={name}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.files?.[0])}
              ref={ref}
            />
          )}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isWorking}
          variation="secondary"
          type="reset"
          onClick={() => handleCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isUpdateSession ? "Update cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}
