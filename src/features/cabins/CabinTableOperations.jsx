import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "no-discount", label: "No Discount" },
  { value: "with-discount", label: "With Discount" },
];

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="discount" filterOptions={filterOptions} />
    </TableOperations>
  );
}
