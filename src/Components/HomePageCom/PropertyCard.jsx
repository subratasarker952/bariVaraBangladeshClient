const PropertyCard = ({ property }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      {/* Property Image */}
      <div
        className="h-48 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${property.images[0]})` }}
      ></div>

      {/* Property Details */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-2">
          {" "}
          {property.description.substring(0, 100)}...
        </p>
        <p className="text-lg font-bold text-blue-600 mb-4">
          ${property.price}
        </p>

        {/* Location */}
        <p className="text-gray-600">
          {property.upazila}, {property.district}, {property.division}
        </p>

        {/* Amenities */}

        <div className="mt-4">
          <h4 className="text-gray-800 font-semibold mb-2">Amenities</h4>
          <ul className="list-disc list-inside text-gray-600">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
            {property.amenities.length > 3 && <li>and more...</li>}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 flex justify-between">
        <button className="text-blue-500 hover:underline">
          <a href={`/properties/${property._id}`}>View Details</a>
        </button>
        <button className="text-red-500 hover:underline">
          <a href={`/properties/${property._id}`}>Contact Owner</a>
        </button>
      </div>
    </div>
  );
  // return (
  //   <div className="max-w-sm rounded-lg overflow-hidden shadow-lg capitalize bg-white">
  //     <img
  //       className="w-full h-48 object-cover"
  //       src={property.images[0]}
  //       alt={property.title}
  //     />
  //     <div className="px-6 py-4">
  //       <div className="font-bold text-xl mb-2">{property.title}</div>
  //       <div className="font-bold text-xl mb-2">
  //         <p>{property.state && property.state}</p>

  //         <p>
  //           {property.upazila +
  //             ", " +
  //             property.district +
  //             ", " +
  //             property.division}
  //         </p>
  //       </div>
  //       <p className="text-gray-700 text-base">
  //         {property.description.substring(0, 100)}...
  //       </p>
  //     </div>
  //     <div className="px-6 py-4 flex justify-between items-center">
  //       <span className="font-bold text-lg">${property.price}/month</span>
  //       <a
  //         href={`/properties/${property._id}`}
  //         className="text-blue-500 hover:underline"
  //       >
  //         View Details
  //       </a>
  //     </div>
  //   </div>
  // );
};

export default PropertyCard;
