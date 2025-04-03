import { useEffect, useState } from "react";
import jobType from "./types/jobType";
import apiClient from "./services/apiClient";
import JobFilter from "./components/JobFilter";
import Pagination from "./components/Pagination";
import { NavLink } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { setItem, getItem } from "./utils/localStorage";

function App() {
  const [jobs, setJobs] = useState<jobType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<jobType[]>(jobs);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const handlePrevPage = (prevPage: number) => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = (nextPage: number) => {
    setPage((nextPage) => nextPage + 1);
  };

  useEffect(() => {
    apiClient
      .get("/jobs")
      .then((response) => {
        setJobs(response.data);
        setFilteredJobs(response.data);
        setTotalPages(totalPages);
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des jobs :", error)
      );
  }, [page]);

  const handleAddFavorite = (job: jobType) => {
    const favorites = getItem("favorites") || [];
    const isAlreadyFavorite = favorites.some(
      (fav: jobType) => fav.id === job.id
    );
    if (!isAlreadyFavorite) {
      setItem("favorites", [...favorites, job]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 ">
      <div className="font-bold text-3xl flex justify-center mb-5">Job App</div>
      <NavLink to="/FavoriteJobs">
        <button className="font-bold text-3xl flex justify-center mb-5 cursor-pointer">
          Favoris
        </button>
      </NavLink>
      <main>
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
        <JobFilter jobs={jobs} setFilteredJobs={setFilteredJobs} />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredJobs.map((job) => (
            <div key={job.id} className="border p-4 h-auto bg-white shadow-lg ">
              <h1 className="text-xl font-bold mb-4">{job.title}</h1>
              <p className="text-gray-700 mb-2">{job.description}</p>
              <p className="text-blue-500 mb-2">
                <span className="font-semibold">Location : </span>
                {job.location}
              </p>
              <CiHeart onClick={() => handleAddFavorite(job)} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
