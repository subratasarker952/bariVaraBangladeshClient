import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import {
  divisionsData,
  districtsData,
  upaZilasData,
  postOfficesData,
} from "../../../../public/bangladeshAddress";
import { rentalTypes } from "../../../../public/RentalTypes";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const navigate=useNavigate()
  const { user } = useAuth();
  const [property, setProperty] = useState({
    title: "",
    description: "",
    price: "",
    listingType: "",
    division: "",
    district: "",
    upazila: "",
    postOffice: "",
    state: "",
    phone: "",
    whatsApp: "",
    type: "",
    images: [],
    amenities: "",
    condition: "",
    email: "",
    paymentStatus: "due",
    publishStatus: "hidden",
    owner: user?.email || "",
  });
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

    setProperty({
      ...property,
      division: division.name,
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
    setProperty({
      ...property,
      district: district.name,
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

    setProperty({ ...property, upazila: upazilaName });
  };

  const handlePostOfficeChange = (event) => {
    setSelectedPostOffice(event.target.value);
    setProperty({ ...property, postOffice: event.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    let files = e.target.files;

    if (files?.length > 6) {
      toast.error("upto 6 images");
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < files?.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const response = await axios.post(
        `https://barivarabangladeshserver.vercel.app/imageUpload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProperty({
        ...property,
        images: response.data,
      });
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Failed to create property");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://barivarabangladeshserver.vercel.app/properties`,
        property,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Property created successfully");
        navigate('/dashboard/myProperty')
      } else {
        toast.error("Failed to create property");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Failed to create property");
    }
  };

  return (
    <div className="max-w-4xl mx-auto  py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Add New Property</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white p-8 rounded shadow-md md:w-[500px]"
      >
        <div className="mb-4">
          <label className="block text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            maxLength={40}
            placeholder="Modern 3-Bedroom House with Garden"
            required
            value={property.title}
            onChange={handleChange}
            className="p-2 border rounded capitalize w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            maxLength={400}
            required
            placeholder="This beautiful house has 3 bedrooms, 2 bathrooms, a spacious living room, and a modern kitchen. It is located in a quiet neighborhood and is perfect for a family. The house also includes a garage and a large backyard."
            value={property.description}
            rows={4}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Price (BDT/month) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            required
            placeholder="5000"
            value={property.price}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="listingType" className="block text-gray-700">
            Listing Type <span className="text-red-500">*</span>
          </label>
          <select
            id="listingType"
            name="listingType"
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          >
            <option value="">Select One</option>
            <option value="For-Rent">For Rent</option>
            <option value="For-Sale">For Sale</option>
            <option value="For-Lease">For Lease</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="condition" className="block text-gray-700">
            Condition <span className="text-red-500">*</span>
          </label>
          <select
            id="condition"
            name="condition"
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          >
            <option value="">Select One</option>
            <option value="new">New</option>
            <option value="good">Good</option>
            <option value="Needs-Renovation">Needs Renovation</option>
          </select>
        </div>
        <div className="mb-4"></div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Images (Maximum 6 images)
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="p-2 border rounded w-full"
            multiple
            accept="image/png, image/jpeg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Amenities (comma separated) <span className="text-red-500">*</span>
          </label>

          <textarea
            type="text"
            required
            rows={4}
            name="amenities"
            maxLength={400}
            value={property.amenities}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            placeholder="3 bedrooms, 2 bathrooms, 1 kitchen, 1 diningRoom, Swimming Pool, Garage, Garden"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            className="p-2 border rounded w-full block]"
            name="type"
            value={property.type}
            required
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
        <div>
          <div className=" sm:flex justify-between gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">
                Division <span className="text-red-500">*</span>
              </label>
              <select
                className="p-2 border rounded w-[200px]"
                name="division"
                required
                onChange={handleDivisionChange}
                value={selectedDivision}
              >
                <option value="">Select Division</option>
                {divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                District <span className="text-red-500">*</span>
              </label>
              <select
                className="p-2 border rounded w-[200px]"
                onChange={handleDistrictChange}
                value={selectedDistrict}
                required
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
          </div>
          <div className=" sm:flex justify-between gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">
                Upazila <span className="text-red-500">*</span>
              </label>
              <select
                className="p-2 border rounded w-[200px]"
                onChange={handleUpazilaChange}
                value={selectedUpazila}
                required
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

            <div className="mb-4">
              <label className="block text-gray-700">
                Post Office <span className="text-red-500">*</span>
              </label>

              <select
                className="p-2 border rounded w-[200px]"
                onChange={handlePostOfficeChange}
                value={selectedPostOffice}
                required
              >
                <option value="">Select Post Office </option>
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
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            State <span className="text-red-500">*</span>{" "}
          </label>
          <input
            type="text"
            name="state"
            placeholder="123 Main Street"
            value={property.state}
            maxLength={100}
            onChange={handleChange}
            required
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="01500000000"
            minLength={11}
            maxLength={11}
            value={property.phone}
            required
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Whats app</label>
          <input
            type="tel"
            name="whatsApp"
            placeholder="01500000000"
            minLength={11}
            maxLength={11}
            value={property.whatsApp}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email "
            name="email"
            placeholder="example@gmail.com"
            maxLength={100}
            value={property.email}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 w-full py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
