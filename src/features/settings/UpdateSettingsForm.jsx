import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

export default function UpdateSettingsForm() {
  const { isPending, settings } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();

  if (isPending) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;

    updateSetting({ [field]: value });
  }

  return (
    <div>UpdateSettingsForm</div>
    // Temporary Comment
    // <Form>
    //   <FormRow label="Minimum nights/booking">
    //     <Input
    //       type="number"
    //       id="min-nights"
    //       defaultValue={settings.minBookingLength}
    //       disabled={isUpdating}
    //       onBlur={(e) => handleUpdate(e, "minBookingLength")}
    //     />
    //   </FormRow>
    //   <FormRow label="Maximum nights/booking">
    //     <Input
    //       type="number"
    //       id="max-nights"
    //       defaultValue={settings.maxBookingLength}
    //       disabled={isUpdating}
    //       onBlur={(e) => handleUpdate(e, "maxBookingLength")}
    //     />
    //   </FormRow>
    //   <FormRow label="Maximum guests/booking">
    //     <Input
    //       type="number"
    //       id="max-guests"
    //       defaultValue={settings.maxGuestPerBooking}
    //       disabled={isUpdating}
    //       onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
    //     />
    //   </FormRow>
    //   <FormRow label="Breakfast price">
    //     <Input
    //       type="number"
    //       id="breakfast-price"
    //       defaultValue={settings.breakfastPrice}
    //       disabled={isUpdating}
    //       onBlur={(e) => handleUpdate(e, "breakfastPrice")}
    //     />
    //   </FormRow>
    // </Form>
  );
}
