import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import Tag from "../../ui/Tag";
import CheckOutButton from "./CheckOutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0.2rem;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis; /* Show ellipsis for truncated text */
`;

export default function TodayItem({ activity }) {
  const {
    id: bookingId,
    status,
    numNights,
    guests: { fullName, countryFlag, nationality },
  } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={countryFlag} alt={`Flag of ${nationality}`} />

      <Guest>{fullName}</Guest>

      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button
          variation="primary"
          size="small"
          as={Link}
          to={`/check-in/${bookingId}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckOutButton bookingId={bookingId} />}
    </StyledTodayItem>
  );
}
