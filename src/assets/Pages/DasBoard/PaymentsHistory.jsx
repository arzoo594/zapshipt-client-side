import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const PaymentsHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const { data: payments } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <p className="text-lg font-semibold mb-4 text-gray-700">
        This is payments history:{" "}
        <span className="text-green-600">{payments?.length || 0}</span>
      </p>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          {/* head */}
          <thead className="bg-[#03373d] text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium uppercase">
                Serial No
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium uppercase">
                Product Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium uppercase">
                Tracking Id
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium uppercase">
                Transaction Id
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium uppercase">
                Payment Info
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {payments?.map((payment, index) => (
              <tr
                key={payment._id}
                className="border-b hover:bg-[#caeb66]/20 transition-colors"
              >
                <th className="py-2 px-4 text-gray-700">{index + 1}</th>
                <td className="py-2 px-4 font-medium text-gray-800">
                  {payment.parcelName}
                </td>
                <td className="py-2 px-4 text-gray-600">
                  {payment.trackingId}
                </td>
                <td className="py-2 px-4 text-gray-600">
                  {payment.transactionId}
                </td>

                <td className="py-2 px-4 text-gray-700">
                  {payment.amount && (
                    <>
                      <span className="font-semibold text-[#03373d]">
                        {payment.amount}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">$ Paid</span>
                    </>
                  )}
                </td>

                <td className="py-2 px-4">
                  <button className="btn btn-sm bg-[#03373d] text-white hover:bg-[#caeb66] hover:text-[#03373d] transition-colors">
                    View
                  </button>
                </td>
              </tr>
            ))}
            {!payments ||
              (payments.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No payment records found.
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsHistory;
