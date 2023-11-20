import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export default function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const { id: bookingId, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/check-in/${bookingId}`)}>
            Check in
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
