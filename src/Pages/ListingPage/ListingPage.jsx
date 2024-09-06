import { useEffect, useState } from "react";
import PropertyCard from "../../Components/HomePageCom/PropertyCard";
import axios from "axios";
import SearchBar from "../../Components/ListingComponent/SearchBar";
import Filter from "../../Components/ListingComponent/Filter";
import PaginationControls from "../../Components/ListingComponent/PaginationControls";
import toast from "react-hot-toast";
import Loading from "../../Components/SharedComponent/Loading";

const ListingsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      axios
        .get(`https://barivarabangladeshserver.vercel.app/properties`, {
          params: { ...filters, page: currentPage },
        })
        .then((response) => {
          setAllProperties(response.data.properties);
          setTotalPages(response.data.totalPages);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }, [filters, currentPage]);

  const handleSearch = (searchTerm) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (loading) return <Loading />;
  return (
    <div className="flex flex-col justify-between min-h-[700px]">
      <div className="mt-4">
        <SearchBar onSearch={handleSearch} />
        <Filter onFilter={setFilters} setCurrentPage={setCurrentPage} />
      </div>

      <section className="py-8">
        <div className="max-w-6xl mx-auto flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {allProperties
              ?.filter((property) => property.publishStatus == "published")
              ?.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
          </div>
        </div>
      </section>
      <div>
        <PaginationControls
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ListingsPage;
