import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import jobType from "../types/jobType";

const JobLists = () => {
  const [jobs, setJobs] = useState<jobType[]>([]);

  useEffect(() => {
    apiClient
      .get("/jobs")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des jobs :", error)
      );
  }, []);

  return (
    <div className="grid grid-cols-3 gap-8">
      {jobs.map((job) => (
        <div key={job.id} className="border p-4 h-auto bg-white shadow-md">
          <h1 className="text-xl font-bold mb-4">{job.title}</h1>
          <p className="text-gray-700 mb-2">{job.description}</p>
          <p className="text-blue-500 mb-2">
            <span className="font-semibold">Location : </span>
            {job.location}
          </p>
        </div>
      ))}
    </div>
  );
};

export default JobLists;
