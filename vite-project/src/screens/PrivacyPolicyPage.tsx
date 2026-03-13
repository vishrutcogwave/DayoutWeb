import { useEffect, useState } from "react";
import { getPrivacyPolicy } from "../services/gateway.service";

interface PrivacyPolicy {
  Header: string;
  Particulars: string;
}

const PrivacyPolicyPage: React.FC = () => {
  const [policy, setPolicy] = useState<PrivacyPolicy | null>(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const data: PrivacyPolicy = await getPrivacyPolicy();
        setPolicy(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPolicy();
  }, []);

  if (!policy) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-[#123a63] h-20 w-full"></div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 pb-16">
        <div className="bg-white rounded-xl shadow-md p-10">
          <h1 className="text-3xl font-bold text-[#123a63] mb-6">
            {policy.Header}
          </h1>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {policy.Particulars}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;