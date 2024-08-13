const PaginationControls = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="bg-gray-300 p-2 rounded"
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="bg-gray-300 p-2 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
