import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

import {
  checkPaymentStatus,
  sendBookingConfirmation,
  submitDayOutData,
  getContactInfo,
} from "../services/gateway.service";
import { downloadBookingPDF, generateBookingPDFBase64 } from "../components/pdfGenerator";



function SuccessPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [contact, setContact] = useState<any>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const verifyPayment = async () => {
      try {
        const merchantOrderId =
          new URLSearchParams(window.location.search).get("merchantOrderId") ||
          sessionStorage.getItem("merchantOrderId") ||
          localStorage.getItem("merchantOrderId");

        if (!merchantOrderId) throw new Error("Payment reference missing");

        /* ---------------- PAYMENT ---------------- */
        const paymentResponse = await checkPaymentStatus(merchantOrderId);

        if (paymentResponse.state !== "COMPLETED") {
          throw new Error("Payment failed or cancelled");
        }

        /* ---------------- PAYLOAD ---------------- */
        const payloadStr =
          sessionStorage.getItem("bookingPayload") ||
          localStorage.getItem("bookingPayload");

        if (!payloadStr) throw new Error("Booking data not found");

        const payload = JSON.parse(payloadStr);

        /* ---------------- BOOKING ---------------- */
        const bookingResponse = await submitDayOutData(
          payload,
          paymentResponse
        );

        const finalData = {
          ...payload,
          bookingId: bookingResponse.bookingid,
          transactionId: merchantOrderId,
        };

        /* ---------------- CONTACT API ---------------- */
        let contactData = null;

        try {
          contactData = await getContactInfo();
        } catch {
          console.warn("Using fallback contact info");
        }

        setContact(contactData);

        /* ---------------- PDF + SEND ---------------- */
        try {
          const pdfBase64 = generateBookingPDFBase64(
            finalData,
            contactData
          );

          let phone = finalData.customerDetails.phone || "";
          phone = phone.replace(/^\+/, "").replace(/^91/, "");

          await sendBookingConfirmation({
            base64_file: pdfBase64,
            GuestName:
              finalData.customerDetails.firstName +
              " " +
              finalData.customerDetails.lastName,
            MobileNo: phone,
            EmailId: finalData.customerDetails.email,
            BookingNo: finalData.bookingId,
            HotelName: "Mayan Resort",
          });
        } catch (err) {
          console.warn("PDF send failed", err);
        }

        setData(finalData);

        sessionStorage.clear();
        localStorage.removeItem("merchantOrderId");
        localStorage.removeItem("bookingPayload");

        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Confirming your booking...</p>
      </div>
    );
  }

  /* ---------- ERROR ---------- */
  if (error) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-red-600 text-xl">Payment Failed</h2>
        <p>{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  if (!data) return null;

  const c = data.customerDetails;

  const contactInfo = {
    address:
      contact?.Address ||
      "Javanammana Doddi, Virupasandra, Karnataka 562117",
    phone: contact?.MobileNo || "+91 7899192277",
    email:
      contact?.Email?.trim() ||
      "infomayansresort@gmail.com",
  };



  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="max-w-3xl w-full">

        {/* HEADER */}
        <div className="bg-green-500 text-white p-6 rounded-t-xl text-center">
          <CheckCircle size={50} className="mx-auto mb-2" />
          <h1 className="text-2xl font-bold">Booking Confirmed</h1>
          <p className="text-sm">Booking ID: {data.bookingId}</p>
        </div>

        {/* BODY */}
        <div className="bg-white p-6 rounded-b-xl shadow">

          {/* CUSTOMER */}
          <div className="mb-6 border-b pb-4">
            <h2 className="font-semibold text-lg mb-2">
              Customer Details
            </h2>
            <p>{c.firstName} {c.lastName}</p>
            <p className="text-gray-600">{c.email}</p>
            <p className="text-gray-600">{c.phone}</p>
          </div>

          {/* BOOKINGS */}
          {data.bookingSummary.map((b: any, i: number) => (
            <div key={i} className="mb-5 border rounded-lg">
              <div className="bg-gray-100 px-4 py-2 font-semibold">
                {b.packageTitle}
              </div>

              <div className="p-4 text-sm space-y-2">
                <p>📅 {b.bookingDate}</p>
                <p>🚪 {b.arrivingDate}</p>
                <p>👥 {b.adults} Adults, {b.children} Children</p>

                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{b.subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{b.tax}</span>
                  </div>

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">
                      ₹{b.grandTotal}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CONTACT INFO */}
          <div className="mt-6 border-t pt-4 text-center text-sm text-gray-600">
            <p className="font-semibold mb-1">
              Thank you for choosing Mayan Resort
            </p>
            <p>📞 {contactInfo.phone}</p>
            <p>✉️ {contactInfo.email}</p>
            <p>{contactInfo.address}</p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => downloadBookingPDF(data, contact)}
              className="flex-1 bg-black text-white py-3 rounded"
            >
              Download PDF
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex-1 border py-3 rounded"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
