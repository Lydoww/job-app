import { useEffect, useState } from "react";
import jobType from "./types/jobType";
import apiClient from "./services/apiClient";
import JobFilter from "./components/JobFilter";

import { CiHeart } from "react-icons/ci";

function App() {
  const [jobs, setJobs] = useState<jobType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<jobType[]>(jobs);

  useEffect(() => {
    apiClient
      .get("/jobs")
      .then((response) => {
        setJobs(response.data);
        setFilteredJobs(response.data);
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des jobs :", error)
      );
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 ">
      <div className="font-bold text-3xl flex justify-center mb-5">Job App</div>
      <main>
        <JobFilter jobs={jobs} setFilteredJobs={setFilteredJobs} />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredJobs.map((job) => (
            <div key={job.id} className="border p-4 h-auto bg-white shadow-lg transform hover:scale-105 ease-in-out transition-all">
              <h1 className="text-xl font-bold mb-4">{job.title}</h1>
              <p className="text-gray-700 mb-2">{job.description}</p>
              <p className="text-blue-500 mb-2">
                <span className="font-semibold">Location : </span>
                {job.location}
              </p>
              <CiHeart className="hover:scale-110"/>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
