import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dummyPackages } from "../dummyPackages";
import PackageCard from "../components/PackageCard";
import type { CountState } from "../types";
const APP_VERSION = "v1.0.0"; 
/* Paid Adventure Activities Data */
const paidActivities = [
  { name: "Target Shooting", note: "(5 PELLETS)", price: 100 },
  { name: "Rocket Ejector", note: "", price: 200 },
  { name: "ATV Bike Ride", note: "(1 LAP)", price: 200 },
  { name: "Paint ball shooting", note: "(5 PELLETS)", price: 100 },
  { name: "Water Roller", note: "", price: 100 },
  { name: "Meltdown", note: "", price: 100 },
  { name: "Land zorbing", note: "", price: 100 },
];

function LandingPage() {
  const [counts, setCounts] = useState<Record<number, CountState>>({});
const [arrivingDate, setArrivingDate] = useState(
  new Date().toISOString().split("T")[0]
);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("counts", counts);
  }, [counts]);

  return (
    <div className="bg-[#faf7f2] min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-900">
            Day Outing Packages
          </h1>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-3">
            <span className="h-px w-8 sm:w-12 bg-orange-300" />
            <p className="text-[10px] sm:text-xs tracking-widest text-orange-400">
              MAYAN RESORT EXPERIENCE
            </p>
            <span className="h-px w-8 sm:w-12 bg-orange-300" />
          </div>
        </div>

        {/* Packages Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="space-y-8 sm:space-y-10"
        >
          {dummyPackages.map((pkg) => {
            const current = counts[pkg.id] || {
              adults: 1,
              children: 0,
            };

            return (
              <motion.div
                key={pkg.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <PackageCard
                  {...pkg}
                  adults={current.adults}
                  arrivingDate={arrivingDate}
                  onDateChange={setArrivingDate}
                  children={current.children}
                  onAdultsChange={(value) =>
                    setCounts((prev) => ({
                      ...prev,
                      [pkg.id]: {
                        adults: Math.max(1, value),
                        children: current.children,
                      },
                    }))
                  }
                  onChildrenChange={(value) =>
                    setCounts((prev) => ({
                      ...prev,
                      [pkg.id]: {
                        adults: current.adults,
                        children: Math.max(0, value),
                      },
                    }))
                  }
                  onBook={() => {
                    // 🔹 Price Calculation (Adult + Children same price)
                    const adultTotal = pkg.price * current.adults;
                    const childTotal = pkg.price * 0.5 * current.children;
                    const total = adultTotal + childTotal;

                    navigate("/payment", {
                      state: {
                        packageId: pkg.id,
                        packageTitle: pkg.title,
                        adults: current.adults,
                        children: current.children,
                        arrivingDate,
                        total,
                      },
                    });
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Paid Adventure Activities */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto mt-16 bg-white border border-[#f0e6d8] rounded-lg p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 pb-4 border-b">
            <div className="bg-[#d8b074] p-2 rounded flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-semibold text-gray-800">
              Paid Adventure Activities
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mt-6">
            {paidActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div>
                  <p className="font-medium text-gray-800">{activity.name}</p>
                  {activity.note && (
                    <p className="text-xs text-gray-400">{activity.note}</p>
                  )}
                </div>

                <p className="font-semibold text-gray-800">₹{activity.price}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t text-xs text-gray-500 flex gap-2">
            <span>ℹ️</span>
            <p>
              Paid activities are not included in the base package price. Prices
              mentioned are per person / per attempt. Please check with the
              adventure coordinator.
            </p>
          </div>
        </motion.div>
        <div className="text-center mt-10 text-xs text-gray-400">
  Version {APP_VERSION}
</div>
      </div>
    </div>
  );
}

export default LandingPage;
