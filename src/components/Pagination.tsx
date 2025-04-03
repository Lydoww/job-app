interface Props {
  currentPage: number;
  totalPages: number;
  handleNextPage: (page: number) => void;
  handlePrevPage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
}: Props) => {
  return (
    <div className="mb-5">
      <button className="hover:underline cursor-pointer mr-2"
        onClick={() => handlePrevPage(currentPage)}
        disabled={currentPage === 1}
      >
        &larr;
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button className="hover:underline cursor-pointer ml-2"
        onClick={() => handleNextPage(currentPage)}
        disabled={currentPage === totalPages}
      >
        &rarr;
      </button>
    </div>
  );
};

export default Pagination;
