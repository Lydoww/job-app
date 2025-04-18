import { getItem, setItem } from "../utils/localStorage";
import { useNavigate } from "react-router";
import jobType from "../types/jobType";

import { RxCross2 } from "react-icons/rx";

const FavoriteJobs = () => {
  const navigate = useNavigate();
  const favorites = (getItem("favorites") as jobType[]) || [];

  const handleRemoveFavorites = (job: jobType) => {
    const favorites = getItem("favorites") || [];
    const updateFavorites = favorites.filter((fav: jobType) => {
      return fav.id !== job.id;
    });
    setItem("favorites", updateFavorites);
    window.location.reload();
  };

  return favorites.length === 0 ? (
    <div className="max-w-7xl mx-auto px-4 py-8 text-center mt-8 flex flex-col">
      No likes for the moment
      <button
        onClick={() => navigate("/")}
        className="font-semibold text-blue-600 cursor-pointer hover:underline"
      >
        Back
      </button>
    </div>
  ) : (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center my-5">Favorite Jobs</h1>
      <button
        className="mb-5 font-semibold text-blue-600 cursor-pointer hover:underline"
        onClick={() => navigate("/")}
      >
        Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {favorites.map((job: jobType) => (
          <div key={job.id} className="border p-4 h-auto bg-white shadow-lg">
            <h1 className="text-xl font-bold mb-4">{job.title}</h1>
            <p className="text-gray-700 mb-2">{job.description}</p>
            <p className="text-blue-500 mb-2">
              <span className="font-semibold">Location : </span>
              {job.location}
            </p>
            <RxCross2 onClick={() => handleRemoveFavorites(job)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteJobs;
