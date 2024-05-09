import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isPending: isPending1, bookings } = useRecentBookings();
  const { isPending: isPending2, stays, confirmedStays } = useRecentStays();

  if (isPending1 || isPending2) return <Spinner />;

  console.log(bookings);
  console.log(stays);

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}
