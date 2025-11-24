import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const PaymentSyccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentInfo, setPaymentInfo] = useState({});
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            trackingId: res.data.trackingId,
            transactionId: res.data.transactionId,
          });
        });
    }
  }, [axiosSecure, sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-gray-200">
        <h2 className="text-3xl font-bold" style={{ color: "#03373d" }}>
          Payment Successful 🎉
        </h2>

        <p className="text-gray-600 mt-2">
          Your payment has been successfully completed.
        </p>

        <div className="mt-6 bg-gray-50 p-4 rounded-xl text-left border border-gray-200">
          <p className="text-sm font-semibold text-gray-700">Tracking ID:</p>
          <p className="text-lg font-bold mt-1" style={{ color: "#caeb66" }}>
            {paymentInfo.trackingId || "Loading..."}
          </p>

          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-700">
              Transaction ID:
            </p>
            <p className="text-lg font-bold mt-1" style={{ color: "#caeb66" }}>
              {paymentInfo.transactionId || "Loading..."}
            </p>
          </div>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 w-full py-2 rounded-xl text-white font-semibold shadow-md transition-all"
          style={{
            backgroundColor: "#03373d",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSyccess;
