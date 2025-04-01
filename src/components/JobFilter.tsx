import { useState } from "react";
import jobType from "../types/jobType";

interface JobFilterProps {
  jobs: jobType[];
  setFilteredJobs: React.Dispatch<React.SetStateAction<jobType[]>>;
}

const JobFilter = ({ jobs, setFilteredJobs }: JobFilterProps) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value;
    setFilter(filterValue);
    const filtered = jobs.filter((job) => {
      return job.location.toLowerCase().includes(filter.toLowerCase());
    });
    setFilteredJobs(filtered);
  };

  return (
    <div className="mb-5">
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter by location"
        className="border p-2"
      />
    </div>
  );
};

export default JobFilter;
