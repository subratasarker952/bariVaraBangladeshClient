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
        const response = await axios.get("https://barivarabangladeshserver.vercel.app/properties", {
          params: { ...filters, page: currentPage },
        });
        setAllProperties(response.data.properties);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchAllProperties();
    const publishProperties = allProperties.filter(
      (property) => property.publishStatus == "public"
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
      {publishProperties.length > 1 && (
        <p> Search Result: {publishProperties.length} </p>
      )}

      <section className="py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
          {publishProperties?.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
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
