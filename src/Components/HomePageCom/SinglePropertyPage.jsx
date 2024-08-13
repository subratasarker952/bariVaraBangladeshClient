import { useLoaderData } from "react-router-dom";

const SinglePropertyPage = () => {
  const property = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8">{property.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Property Images */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold mb-4">Images</h3>
          <div className="grid grid-cols-2 gap-4">
            {property?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={property.title}
                className="w-full h-64 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Property Details</h3>
          <p>
            <strong>Price:</strong> BDT {property.price} /month
          </p>
          <p>
            <strong>Listing Type:</strong> {property.listingType}
          </p>

          <p>
            <strong>Condition:</strong> {property.condition}
          </p>
          <p>
            <strong>Type:</strong> {property.type}
          </p>
          <p>
            <strong>Description:</strong> {property.description}
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <div>
            <h3 className="text-2xl font-bold my-4"> Property Location</h3>
            <p>
              <strong>Division:</strong> {property.division}
            </p>
            <p>
              <strong>District:</strong> {property.district}
            </p>
            <p>
              <strong>Upazila:</strong> {property.upazila}
            </p>
            <p>
              <strong>Post Office:</strong> {property.postOffice}
            </p>
            <p>
              <strong>State:</strong> {property.state}
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold my-4">Contact Information</h3>
            <p>
              <strong>Email:</strong> {property.email}
            </p>
            <p>
              <strong>Phone:</strong> {property.phone}
            </p>
            <p>
              <strong>WhatsApp:</strong> {property.whatsApp}
            </p>
          </div>
        </div>

        {/* Amenities */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold mb-4">Amenities</h3>
          <ul className="list-disc list-inside mb-8">
            {property?.amenities?.map((amenity, index) => (
              <li key={index}>{amenity} </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SinglePropertyPage;
