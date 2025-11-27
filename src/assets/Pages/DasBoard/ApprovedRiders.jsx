import { useQuery } from "@tanstack/react-query";

import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Link } from "react-router";
import { FaUserCheck } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import Swal from "sweetalert2";
const ApprovedRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      console.log(res.data);
      return res.data;
    },
  });
  // const handleApproval = (id) => {
  //   const updateInfo = { status: "Approved" };
  //   axiosSecure.patch(`/riders/${id}`, updateInfo).then((res) => {
  //     if (res.data.modifiedCount) {
  //       Swal.fire({
  //         title: "Approved!",
  //         text: "Rider has been approved successfully.",
  //         icon: "success",
  //         confirmButtonText: "OK",
  //       });
  //       refetch();
  //     }
  //   });
  // };
  // const handleReject = (id) => {
  //   const updateInfo = { status: "Rejected" };

  //   axiosSecure
  //     .patch(`/riders/${id}`, updateInfo)
  //     .then((res) => {
  //       if (res.data.modifiedCount) {
  //         Swal.fire({
  //           title: "Rejected!",
  //           text: "Rider has been rejected successfully.",
  //           icon: "error",
  //           confirmButtonText: "OK",
  //         });
  //         refetch();
  //       }
  //     })
  //     .catch(() => {
  //       Swal.fire({
  //         title: "Error!",
  //         text: "Something went wrong.",
  //         icon: "error",
  //         confirmButtonText: "Close",
  //       });
  //     });
  // };
  const handleApproval = (rider) => {
    const updateInfo = { ...rider, status: "Approved" };

    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Approved!",
          text: "Rider has been approved successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        refetch();
      }
    });
  };

  const handleReject = (rider) => {
    const updateInfo = { ...rider, status: "Rejected" };

    axiosSecure
      .patch(`/riders/${rider._id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Rejected!",
            text: "Rider has been rejected successfully.",
            icon: "error",
            confirmButtonText: "OK",
          });
          refetch();
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          confirmButtonText: "Close",
        });
      });
  };

  return (
    <div>
      <p>Approved Riders Pending : {riders.length}</p>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td
                  className={
                    rider.status === "Approved"
                      ? "text-green-500 font-semibold"
                      : "text-red-500 font-semibold"
                  }
                >
                  {rider.status}
                </td>
                <td>{rider.district}</td>
                {/* <td>
                  <div className="flex gap-2">
                    <Link
                      onClick={() => {
                        handleApproval(rider._id);
                      }}
                      className="text-green-500"
                    >
                      <FaUserCheck size={20} />
                    </Link>
                    <Link
                      onClick={() => handleReject(rider._id)}
                      className="text-red-500"
                    >
                      <FaUserAltSlash size={20} />
                    </Link>
                    <Link></Link>
                  </div>
                </td> */}
                <td>
                  <div className="flex gap-2">
                    <Link
                      onClick={() => handleApproval(rider)}
                      className="text-green-500"
                    >
                      <FaUserCheck size={20} />
                    </Link>

                    <Link
                      onClick={() => handleReject(rider)}
                      className="text-red-500"
                    >
                      <FaUserAltSlash size={20} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedRiders;
