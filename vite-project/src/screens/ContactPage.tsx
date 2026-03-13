import { useEffect, useState } from "react";
import { Phone, MapPin, Mail } from "lucide-react";
import { getContactInfo } from "../services/gateway.service";

interface ContactInfo {
  MobileNo: string;
  Address: string;
  Email: string;
}

const ContactPage = () => {
  const [contact, setContact] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data: ContactInfo = await getContactInfo();
        setContact(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContact();
  }, []);

  if (!contact) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Blue Strip */}
      <div className="bg-[#123a63] h-20 w-full"></div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 pb-16">
        <div className="bg-white rounded-xl shadow-md p-10 text-center">

          {/* Heading */}
          <h1 className="text-4xl font-serif text-[#123a63] mb-6">
            Contact Us
          </h1>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-3 gap-10 mt-6">

            {/* CALL */}
            <div className="flex flex-col items-center">
              <Phone size={40} className="text-[#b89b72] mb-4" />
              <h3 className="text-xl font-semibold text-[#123a63] mb-2">
                CALL US
              </h3>
              <p className="text-gray-700">{contact.MobileNo}</p>
            </div>

            {/* ADDRESS */}
            <div className="flex flex-col items-center">
              <MapPin size={40} className="text-[#b89b72] mb-4" />
              <h3 className="text-xl font-semibold text-[#123a63] mb-2">
                ADDRESS
              </h3>
              <p className="text-gray-700 text-center whitespace-pre-line">
                {contact.Address}
              </p>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col items-center">
              <Mail size={40} className="text-[#b89b72] mb-4" />
              <h3 className="text-xl font-semibold text-[#123a63] mb-2">
                EMAIL US
              </h3>
              <p className="text-gray-700">{contact.Email}</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;