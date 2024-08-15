import { useEffect, useState } from "react";
import PropertyCard from "../../Components/HomePageCom/PropertyCard";
import axios from "axios";
import SearchBar from "../../Components/ListingComponent/SearchBar";
import Filter from "../../Components/ListingComponent/Filter";
import PaginationControls from "../../Components/ListingComponent/PaginationControls";

const ListingsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [allProperties, setAllProperties] = useState([]);
  const [publishProperties, setPublishProperties] = useState([]);

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const response = await axios.get(
          `https://barivarabangladeshserver.vercel.app/properties`,
          {
            params: { ...filters, page: currentPage },
          }
        );
        setAllProperties(response.data.properties);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchAllProperties();
    const publishProperties = allProperties?.filter(
      (property) => property.publishStatus == "published"
    );
    setPublishProperties(publishProperties);
  }, [filters, currentPage, allProperties]);

  const handleSearch = (searchTerm) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handleFilter = () => {
    setFilters((prev) => ({ ...filters, ...prev }));
    setCurrentPage(1); // Reset to page 1 on new filter
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col justify-between min-h-[700px]">
      <div className="">
        <SearchBar onSearch={handleSearch} />
        <Filter onFilter={handleFilter} />
      </div>
      {publishProperties?.length > 1 && (
        <p className="text-center"> Search Result: {publishProperties?.length} </p>
      )}

      <section className="py-8">
        <div className="max-w-6xl mx-auto flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {publishProperties?.map((property) => (
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
