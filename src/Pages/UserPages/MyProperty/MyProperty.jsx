import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "../../../Components/SharedComponent/Loading";

const MyProperty = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState(null);
  useEffect(() => {
    try {
      axios
        .get(
          `https://barivarabangladeshserver.vercel.app/properties/email?email=${user?.email}`,
          {
            headers: {
              authorization: `barer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => setProperties(response.data));
    } catch (error) {
      toast.error(error.message);
    }
  }, [user, properties]);

  const handleDelete = async (property) => {
    const sure = window.confirm("Are You Sure? Delete " + property.title);
    if (sure) {
      fetch(
        `https://barivarabangladeshserver.vercel.app/properties/${property._id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `barer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => console.log(response))
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Item Deleted");
          } else if (data.message) {
            toast.error(data.message);
          }
        });
    }
  };

  const handlePay = (id) => {
    const patchField = {
      paymentStatus: "due",
      publishStatus: "hidden",
      amount: 100,
    };
    axios
      .patch(
        `https://barivarabangladeshserver.vercel.app/payment/${id}?email=${user?.email}`,
        patchField
      )
      .then((res) => {
        window.location.replace(res.data.url);

        // if (res.data.modifiedCount) {
        //     refetchOrders()
        // }
      });
  };
  if (!properties) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Properties</h1>

      {properties?.length ? (
        <table className="w-full bg-white ">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">SL</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties?.map((property, index) => (
              <tr key={property._id} className="text-center capitalize">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/properties/${property._id}`}>
                    {property.title}
                  </Link>
                </td>
                <td className="py-2 px-4 border-b">{property.type}</td>
                <td className="py-2 px-4 border-b">{property.publishStatus}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/dashboard/editProperty/${property._id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(property)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Delete
                  </button>
                  {property.paymentStatus === "due" && (
                    <button
                      onClick={() => handlePay(property._id)}
                      title={`100 tk pay for public its a fake payment system`}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">You have no property</p>
      )}
    </div>
  );
};

export default MyProperty;
