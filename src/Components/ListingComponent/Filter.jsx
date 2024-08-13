import { useEffect, useState } from "react";
import {
  districtsData,
  divisionsData,
  postOfficesData,
  upaZilasData,
} from "../../../public/bangladeshAddress";
import { rentalTypes } from "../../../public/RentalTypes";

const Filter = ({ onFilter }) => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [postOffices, setPostOffices] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedPostOffice, setSelectedPostOffice] = useState("");

  useEffect(() => {
    setDivisions(divisionsData);
    setDistricts(districtsData);
    setUpazilas(upaZilasData);
    setPostOffices(postOfficesData);
  }, [divisions, districts, upazilas, postOffices]);

  const [filters, setFilters] = useState({
    division: "",
    district: "",
    upazila: "",
    postOffice: "",
    type: "",
  });

  const handleDivisionChange = (event) => {
    const divisionId = event.target.value;
    setSelectedDivision(divisionId);
    const division = divisions.find((division) => division.id == divisionId);
    const filteredDistricts = districts.filter(
      (district) => district.division_id === divisionId
    );
    setDistricts(filteredDistricts);

    setSelectedDistrict("");
    setSelectedUpazila("");
    setSelectedPostOffice("");
    setUpazilas([]);
    setPostOffices([]);

    setFilters({
      division: division?.name || "",
      district: "",
      upazila: "",
      postOffice: "",
      type: "",
      maxPrice: Number,
    });
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    const district = districts.find((district) => district.id == districtId);
    const filteredUpazilas = upazilas.filter(
      (upazila) => upazila.district_id === districtId
    );
    setUpazilas(filteredUpazilas);
    setSelectedUpazila("");
    setSelectedPostOffice("");
    setPostOffices([]);
    setFilters({
      ...filters,
      district: district?.name || "",
    });
  };

  const handleUpazilaChange = (event) => {
    const upazilaName = event.target.value;
    setSelectedUpazila(upazilaName);
    const filteredPostOffices = postOffices.filter(
      (postOffice) =>
        postOffice.district_id === selectedDistrict &&
        postOffice.division_id === selectedDivision
    );
    setPostOffices(filteredPostOffices);

    setSelectedPostOffice("");

    setFilters({ ...filters, upazila: upazilaName });
  };

  const handlePostOfficeChange = (event) => {
    setSelectedPostOffice(event.target.value);
    setFilters({ ...filters, postOffice: event.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleFilter = () => {
    onFilter({ ...filters });
  };

  return (
    <div>
      <div>
        <div className="flex justify-center items-center p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-0">
            <div className="mx-1 ">
              <select
                className="p-2 border rounded w-full block"
                onChange={handleDivisionChange}
                value={selectedDivision}
                name="division"
              >
                <option value="">All Division</option>
                {divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mx-1 ">
              <select
                className="p-2 border rounded  w-full block"
                onChange={handleDistrictChange}
                name="district"
                value={selectedDistrict}
              >
                <option value="">Select District</option>
                {districts
                  .filter(
                    (district) => district.division_id === selectedDivision
                  )
                  .map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mx-1 ">
              <select
                className="p-2 border rounded  w-full block"
                onChange={handleUpazilaChange}
                value={selectedUpazila}
              >
                <option value="">Select Upazila</option>
                {upazilas
                  .filter((upazila) => upazila.district_id === selectedDistrict)
                  .map((upazila) => (
                    <option key={upazila.id} value={upazila.name}>
                      {upazila.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mx-1 ">
              <select
                className="p-2 border rounded  w-full block"
                onChange={handlePostOfficeChange}
                value={selectedPostOffice}
              >
                <option value="">Select Post Office</option>
                {postOffices
                  .filter(
                    (postOffice) =>
                      postOffice.district_id === selectedDistrict &&
                      postOffice.division_id === selectedDivision
                  )
                  .map((postOffice) => (
                    <option
                      key={postOffice.postOffice}
                      value={postOffice.postOffice}
                    >
                      {postOffice.postOffice}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mx-1 ">
              <select
                className="p-2 border rounded  w-full block"
                name="type"
                value={filters.type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                {rentalTypes.map((rentalType, index) => (
                  <option key={index} value={rentalType} className="capitalize">
                    {rentalType}
                  </option>
                ))}
              </select>
            </div>
            <div className="mx-1 ">
              <input
                type="number"
                className="p-2 border rounded  w-full block"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="Maximum Price"
              />
            </div>
            <div className="mx-1">
              <button
                onClick={handleFilter}
                className="bg-green-500 text-white p-2  w-full block"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
