import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { settingSchema } from "../../models/settingModel";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import ValidatedInputField from "../../ui/ValidatedInputField";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

export default function UpdateSettingsForm() {
  const { isPending, settings } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingSchema),
  });

  if (isPending) return <Spinner />;

  function onSubmit(data) {
    updateSetting(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ValidatedInputField
        type="number"
        name="minBookingLength"
        label="Minimum nights/booking"
        disabled={isUpdating}
        register={register}
        error={errors?.minBookingLength?.message}
        defaultValue={settings?.minBookingLength}
      />

      <ValidatedInputField
        type="number"
        name="maxBookingLength"
        label="Maximum nights/booking"
        disabled={isUpdating}
        register={register}
        error={errors?.maxBookingLength?.message}
        defaultValue={settings?.maxBookingLength}
      />

      <ValidatedInputField
        type="number"
        name="maxGuestPerBooking"
        label="Maximum guests/booking"
        disabled={isUpdating}
        register={register}
        error={errors?.maxGuestPerBooking?.message}
        defaultValue={settings?.maxGuestPerBooking}
      />

      <ValidatedInputField
        type="number"
        name="breakfastPrice"
        label="Breakfast price"
        disabled={isUpdating}
        register={register}
        error={errors?.breakfastPrice?.message}
        defaultValue={settings?.breakfastPrice}
      />

      <FormRow>
        <Button type="submit" disabled={isUpdating}>
          Update settings
        </Button>

        <Button
          disabled={isUpdating}
          variation="secondary"
          onClick={() => reset()}
        >
          Restore Defaults
        </Button>
      </FormRow>
    </Form>
  );
}
