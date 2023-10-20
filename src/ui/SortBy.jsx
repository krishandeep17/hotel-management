import { useSearchParams } from "react-router-dom";

import Select from "./Select";

export default function SortBy({ sortByOptions }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      value={sortBy}
      options={sortByOptions}
      handleChange={handleChange}
      type="white"
    />
  );
}
