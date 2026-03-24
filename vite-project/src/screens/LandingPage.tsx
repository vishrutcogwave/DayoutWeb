import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dummyPackages } from "../dummyPackages";
import PackageCard from "../components/PackageCard";
import type { CountState } from "../types";
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import logo from "../assets/logo_1.png";

const paidActivities = [
  { name: "Target Shooting", note: "(5 PELLETS)", price: 100 },
  { name: "Rocket Ejector", note: "", price: 200 },
  { name: "ATV Bike Ride", note: "(2 LAP)", price: 300 },
  { name: "Water Roller", note: "", price: 100 },
  { name: "Meltdown", note: "", price: 100 },
  { name: "Land zorbing", note: "", price: 100 },
];

const sliderImages = [
  "/images/resort1.jpg",
  "/images/resort2.jpg",
  "/images/resort3.jpg",
];

function LandingPage() {
  const [counts, setCounts] = useState<Record<number, CountState>>({});
  const [arrivingDate, setArrivingDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [_currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

return (
  <div className="bg-[#faf7f2] min-h-screen">

    {/* 🔥 FULL WIDTH HERO */}
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
      className="relative w-full h-[320px] sm:h-[400px] lg:h-[500px] overflow-hidden"
    >
        <img
    src={logo}  // Replace with your logo path
    alt="Logo"
    className="absolute top-4 left-4 w-24 h-auto z-20 object-contain"
  />
      <img
        src={img4}
        alt="Resort"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold"
        >
          Day Outing Packages
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-4 text-sm sm:text-base text-gray-200"
        >
          Home <span className="mx-2">»</span> Packages
        </motion.p>
      </div>
    </motion.div>

    {/* ✅ FIX: ADD PROPER SPACING + CONTAINER */}
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ✅ ABOUT SECTION (RESTORED PROPERLY) */}
       <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="max-w-7xl mx-auto mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
>
  {/* LEFT CONTENT */}
  <div>
    <h2 className="text-4xl font-serif font-bold text-gray-900 relative inline-block">
      About Mayans Resort
      <span className="block w-16 h-[3px] bg-[#c8a97e] mt-3"></span>
    </h2>

    <p className="mt-6 font-semibold text-gray-800">
      We will be so proud to be our guest.
    </p>

    <p className="text-gray-600 mt-4 leading-relaxed">
      Mayans Resort redefines luxury and comfort, offering guests an unforgettable
      escape surrounded by natural beauty and world-class amenities. From elegantly
      appointed rooms and suites to rejuvenating wellness and spa experiences,
      every detail is designed for relaxation and indulgence.
    </p>

    {/* FEATURES */}
    {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
      {[ 
        {
          title: "Restaurants",
          desc: "Experience exquisite dining at our resort’s restaurants."
        },
        {
          title: "Cottage Stay",
          desc: "Enjoy beautifully designed cottages amidst lush greenery."
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          whileHover={{ y: -5 }}
          className="bg-gray-100 p-5 rounded shadow-sm"
        >
          <h3 className="font-semibold text-lg text-gray-900">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div> */}
  </div>

  {/* RIGHT IMAGE DESIGN */}
{/* RIGHT IMAGE DESIGN */}
<div className="relative flex justify-center items-center min-h-[400px]">

  {/* Background block */}
  <div className="absolute w-[75%] h-[75%] bg-[#c8a97e] right-0 top-0 z-0"></div>

  {/* Main Image */}
  <motion.img
    src={img1}
    alt="Resort"
    initial={{ scale: 1.1, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="relative z-20 w-[70%] h-[300px] object-cover shadow-xl rounded"
  />

  {/* Top small image */}
  <motion.img
    src={img2}
    alt="Resort"
    initial={{ x: 40, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="absolute z-30 w-[120px] h-[120px] object-cover top-0 left-10 shadow-lg rounded"
  />

  {/* Bottom small image */}
  <motion.img
    src={img3}
    alt="Resort"
    initial={{ x: -40, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="absolute z-30 w-[140px] h-[140px] object-cover bottom-0 right-10 shadow-lg rounded"
  />

  {/* Extra layer image */}
  <motion.img
    src={img4}
    alt="Resort"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 0.6 }}
    transition={{ delay: 0.7 }}
    className="absolute z-10 w-[60%] h-[200px] object-cover bottom-10 left-0 rounded"
  />
</div>
</motion.section>



        {/* Packages (UNCHANGED) */}
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
                whileHover={{ scale: 1.02 }}
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
                    const total =
                      pkg.price * current.adults +
                      pkg.price * 0.5 * current.children;

                    navigate("/payment", {
                      state: {
                        packageId: pkg.id,
                        timeRange:pkg.timeRange,
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

        {/* Paid Activities (UNCHANGED) */}
        <div className="max-w-6xl mx-auto mt-16 bg-white border rounded-lg p-6 sm:p-8">
          <div className="flex items-center gap-3 pb-4 border-b">
            <div className="bg-[#d8b074] p-2 rounded">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">
              Paid Adventure Activities
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mt-6">
            {paidActivities.map((activity, index) => (
              <div key={index} className="flex justify-between py-3 border-b">
                <div>
                  <p className="font-medium">{activity.name}</p>
                  {activity.note && (
                    <p className="text-xs text-gray-400">
                      {activity.note}
                    </p>
                  )}
                </div>
                <p className="font-semibold">₹{activity.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="text-center mt-10 text-xs text-gray-400">
          Version {APP_VERSION}
        </div> */}

      </div>
    </div>
  </div>
);
}

export default LandingPage;