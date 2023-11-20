import { useEffect, useState } from "react";
import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useCheckIn } from "./useCheckIn";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "../bookings/BookingDataBox";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

export default function CheckInBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { isLoading, booking } = useBooking();
  const { checkIn, isCheckingIn } = useCheckIn();
  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    isPaid,
    status,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckIn() {
    if (!confirmPaid) return;

    checkIn(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          disabled={isPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            onClick={handleCheckIn}
            disabled={!confirmPaid || isCheckingIn}
          >
            Check in booking #{bookingId}
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
