import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

export default function CheckOutButton({ bookingId }) {
  const { isCheckingOut, checkOut } = useCheckOut();

  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingOut}
      onClick={() => checkOut(bookingId)}
    >
      Check out
    </Button>
  );
}
