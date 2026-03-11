import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import {
  checkPaymentStatus,
  submitDayOutData,
} from "../services/gateway.service";

interface BookingConfirmationResponse {
  bookingId: string;
  packageTitle: string;
  adults: number;
  children: number;
  totalAmount: number;
  guestName: string;
  message: string;
}

function SuccessPage() {
  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] =
    useState<BookingConfirmationResponse | null>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        /* ---------------- GET ORDER ID ---------------- */

        const merchantOrderId =
          new URLSearchParams(window.location.search).get("merchantOrderId") ||
          sessionStorage.getItem("merchantOrderId") ||
          localStorage.getItem("merchantOrderId");

        console.log("merchantOrderId", merchantOrderId);

        if (!merchantOrderId) {
          setError("Payment reference not found.");
          setLoading(false);
          return;
        }

        /* ---------------- CHECK PAYMENT STATUS ---------------- */

        const paymentResponse = await checkPaymentStatus(merchantOrderId);
        console.log("paymentResponse", paymentResponse);

        if (paymentResponse.state !== "COMPLETED") {
          setError("Payment failed or cancelled.");
          setLoading(false);
          return;
        }

        /* ---------------- GET BOOKING PAYLOAD ---------------- */

        let payloadStr =
          sessionStorage.getItem("bookingPayload") ||
          localStorage.getItem("bookingPayload");

        console.log("bookingPayload raw", payloadStr);

        if (!payloadStr) {
          setError("Booking data not found.");
          setLoading(false);
          return;
        }

        const payload = JSON.parse(payloadStr);

        /* ---------------- SUBMIT BOOKING ---------------- */

        const bookingResponse = await submitDayOutData(
          payload,
          paymentResponse
        );

        console.log("bookingResponse", bookingResponse);

        const booking = payload.bookingSummary[0];

        /* ---------------- SET CONFIRMATION ---------------- */

        setConfirmation({
          bookingId: bookingResponse.bookingid,
          packageTitle: booking.packageTitle,
          adults: booking.adults,
          children: booking.children,
          totalAmount: booking.grandTotal,
          guestName: `${payload.customerDetails.firstName} ${payload.customerDetails.lastName}`,
          message:
            "Booking confirmed successfully! Enjoy your stay at Mayan Resort.",
        });

        /* ---------------- CLEAR STORAGE ---------------- */

        sessionStorage.removeItem("merchantOrderId");
        sessionStorage.removeItem("bookingPayload");

        localStorage.removeItem("merchantOrderId");
        localStorage.removeItem("bookingPayload");

        setLoading(false);
      } catch (err) {
        console.error("Payment verification failed:", err);
        setError("Unable to verify payment.");
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-md animate-pulse">
          <p className="text-gray-500 text-lg font-medium">
            Confirming your booking...
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */

  if (error) {
    return (
      <div className="flex justify-center px-4">
        <div className="max-w-lg w-full mt-20 p-8 bg-white rounded-lg shadow-xl border border-red-200 text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Payment Failed
          </h2>

          <p className="text-gray-600 mb-6">{error}</p>

          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 text-white px-6 py-3 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!confirmation) return null;

  /* ---------------- SUCCESS UI ---------------- */

  return (
    <div className="flex justify-center px-4">
      <div className="max-w-4xl w-full mt-20 p-8 bg-white rounded-lg shadow-xl border border-gray-200">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
        </div>

        <h2 className="text-3xl font-serif font-bold mb-8 text-center text-gray-900 px-6 py-2 bg-green-100 rounded-lg">
          Booking Confirmed
        </h2>

        <section className="mb-8 space-y-3 text-gray-800">
          <p className="text-lg font-semibold">
            Booking ID:{" "}
            <span className="text-green-600">{confirmation.bookingId}</span>
          </p>

          <p className="text-lg">Guest Name: {confirmation.guestName}</p>
          <p className="text-lg">Package: {confirmation.packageTitle}</p>
          <p className="text-lg">Adults: {confirmation.adults}</p>
          <p className="text-lg">Children: {confirmation.children}</p>

          <p className="text-2xl font-bold text-green-700 mt-6">
            Total Paid: ₹{confirmation.totalAmount.toFixed(0)}
          </p>
        </section>

        <section className="mt-12 text-center text-gray-600 font-serif text-lg italic mb-6">
          {confirmation.message}
        </section>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;