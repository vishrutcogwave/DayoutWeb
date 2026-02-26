import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state || {};

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [showTerms, setShowTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const subtotal = bookingData?.total || 0;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + tax;

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => {
      const updated = { ...prev };

      if (field === "firstName" && value.trim()) delete updated.firstName;
      if (field === "lastName" && value.trim()) delete updated.lastName;
      if (field === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        delete updated.email;
      if (field === "phone" && /^[0-9]{10}$/.test(value))
        delete updated.phone;

      return updated;
    });
  };

  const validate = () => {
    const newErrors: Partial<typeof form> = {};

    if (!form.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!form.lastName.trim())
      newErrors.lastName = "Last name is required";

    if (!form.email.trim())
      newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.phone.trim())
      newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    setShowTerms(true);
  };

  const handleFinalConfirm = () => {
    if (!acceptedTerms) {
      alert("Please accept the Terms & Conditions to proceed.");
      return;
    }

    console.log("Booking Confirmed:", {
      ...form,
      ...bookingData,
      grandTotal,
    });

    alert("Booking Confirmed Successfully 🎉");
    navigate("/");
  };

  return (
    <div className="bg-[#f7f3ee] min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 mb-6"
        >
          <ArrowLeft size={16} /> Back to Packages
        </button>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Guest Details */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-5">
                Guest Details
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input
                    placeholder="First Name"
                    className="border p-3 rounded text-sm w-full"
                    value={form.firstName}
                    onChange={(e) =>
                      handleChange("firstName", e.target.value)
                    }
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    placeholder="Last Name"
                    className="border p-3 rounded text-sm w-full"
                    value={form.lastName}
                    onChange={(e) =>
                      handleChange("lastName", e.target.value)
                    }
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <input
                  placeholder="Email Address"
                  className="border p-3 rounded text-sm w-full"
                  value={form.email}
                  onChange={(e) =>
                    handleChange("email", e.target.value)
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <input
                  placeholder="Phone Number"
                  className="border p-3 rounded text-sm w-full"
                  value={form.phone}
                  onChange={(e) =>
                    handleChange("phone", e.target.value)
                  }
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-white border rounded shadow-sm p-6 h-fit">
            <h3 className="text-lg font-semibold mb-4">
              Booking Summary
            </h3>

            <div className="text-sm space-y-3 border-b pb-4">
              <div className="flex justify-between">
                <span>Package</span>
                <span>{bookingData?.packageTitle}</span>
              </div>

              <div className="flex justify-between">
                <span>Adults</span>
                <span>{bookingData?.adults}</span>
              </div>

              <div className="flex justify-between">
                <span>Children</span>
                <span>{bookingData?.children}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(0)}</span>
              </div>
            </div>

            <div className="flex justify-between mt-4 font-bold text-lg">
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(0)}</span>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full mt-6 bg-[#d8b074] hover:bg-[#c59a58] text-white py-3 font-semibold tracking-wide"
            >
              CONFIRM BOOKING
            </button>
          </div>
        </div>

        {/* Terms Modal */}
        {showTerms && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white max-w-xl w-full rounded shadow-lg p-6">

              <div className="text-xs text-gray-700 space-y-2 max-h-72 overflow-y-auto leading-relaxed">

                <h4 className="text-center font-semibold underline mb-2">
                  Terms & Conditions
                </h4>

                <p>1. Photo ID Required – Valid photo ID mandatory at check-in.</p>
                <p>2. PAN Not Accepted – PAN cards are not valid ID.</p>
                <p>3. Pets – Pets are not permitted.</p>
                <p>4. Inappropriate Behaviour – Resort reserves right to take action.</p>
                <p>5. Rooms allotted from 12:00 PM. NO SMOKING INSIDE ROOMS.</p>
                <p>6. Guaranteed number will be charged.</p>
                <p>7. Dress code & swimwear mandatory for pool use.</p>
                <p>8. No pool/activity if under alcohol influence.</p>
                <p>9. Taxes applicable as per reservation time.</p>
                <p>10. General hospitality policies apply.</p>
                <p className="font-semibold underline">11. Cancellation & Postponement</p>
                <p>a. No cancellation/postponement once confirmed.</p>
                <p>b. 50% advance mandatory.</p>
                <p>c. Remaining 50% on arrival.</p>

                <p className="text-center font-semibold mt-4">
                  We look forward to welcoming you to Mayans Resort, Kanakapura.
                </p>
              </div>

              <div className="flex items-center mt-4 gap-2">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <label className="text-sm">
                  I agree to the Terms & Conditions
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowTerms(false)}
                  className="px-4 py-2 text-sm border"
                >
                  Cancel
                </button>

                <button
                  onClick={handleFinalConfirm}
                  className="px-4 py-2 text-sm bg-[#d8b074] text-white"
                >
                  Accept & Confirm
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default PaymentPage;