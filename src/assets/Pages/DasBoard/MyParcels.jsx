import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // tanstach query ar maddome instant ui update

        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          refetch();
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your parcel request has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <p className="text-2xl font-bold text-secondary">
        My All Parcels: {parcels.length}
      </p>
      <div className="overflow-x-auto rounded-box shadow-2xl bg-white mt-4">
        <table className="table">
          <thead>
            <tr className="border border-amber-600">
              <th>Serial</th>
              <th>Parcel Name</th>

              <th>Cost (TK)</th>
              <th>Payment Status</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr className="text-secondary" key={parcel._id}>
                <th>{index + 1}</th>
                <th>{parcel.name}</th>

                <td>{parcel.cost}</td>
                <td>
                  {parcel.paymentStatus == "paid" ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <Link to={`/dasboard/payment/${parcel._id}`}>
                      {" "}
                      <button className="btn btn-sm bg-primary"> Pay</button>
                    </Link>
                  )}
                </td>
                <td className="px-4 py-2 text-lg  flex gap-2">
                  <a>
                    <FaEdit className="text-blue-500 hover:text-blue-700 " />
                  </a>
                  <a onClick={() => handleParcelDelete(parcel._id)}>
                    <FaTrash className="text-red-500 hover:text-red-700" />
                  </a>
                  <a>
                    <FaMagnifyingGlass className="text-green-500 hover:text-green-700" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
