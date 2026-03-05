import React from "react";
import { motion } from "framer-motion";
import type { PackageData } from "../types";

interface PackageCardProps extends PackageData {
  adults: number;
  children: number;
  arrivingDate: string;
  onDateChange: (value: string) => void;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onBook: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  image,
  startTime,
  title,
  timeRange,
  price,
  taxNote,
  featuresLeft,
  featuresRight,
  adults,
  children,
  arrivingDate,
  onDateChange,
  onAdultsChange,
  onChildrenChange,
  onBook,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="
        bg-white border border-[#e7c9a5] shadow-sm
        max-w-6xl mx-auto
        flex flex-col lg:flex-row
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative overflow-hidden flex-shrink-0
          w-full h-[220px]
          sm:h-[260px]
          lg:w-[380px] lg:h-[260px]
          xl:w-[420px] xl:h-[280px]
        "
      >
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />

        <span className="absolute top-3 left-3 bg-green-900 text-white text-xs font-semibold px-3 py-1">
          {startTime}
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
        {/* TOP */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {title}
            </h2>
            <p className="text-sm italic text-gray-500 mt-1">{timeRange}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-4 text-sm">
              {[...featuresLeft, ...featuresRight].map((item, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-orange-500">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PRICE */}
          <div className="sm:text-right">
            <p className="text-xl sm:text-2xl font-bold text-gray-800">
              ₹{price}
            </p>
            <p className="text-xs text-gray-500">{taxNote}</p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-dashed my-5" />

        {/* BOTTOM */}
        <div
          className="
            flex flex-col sm:flex-row
            gap-4 sm:items-center sm:justify-between
          "
        >
          {/* DATE + COUNTERS */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            {/* Arriving Date */}
            <div>
              <p className="text-xs text-gray-400 mb-1">ARRIVING DATE</p>
              <input
                type="date"
                value={arrivingDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => onDateChange(e.target.value)}
                className="border rounded px-3 py-1 text-sm"
              />
              <div className="text-xs text-red-600 min-h-[16px]"></div>
            </div>

            {/* Adults */}
            <div>
              <p className="text-xs text-gray-400 mb-1">ADULTS</p>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => onAdultsChange(adults - 1)}
                  disabled={adults <= 1}
                  className="px-3 py-1 hover:bg-gray-100 active:scale-90"
                >
                  −
                </button>
                <span className="px-4">{adults}</span>
                <button
                  onClick={() => onAdultsChange(adults + 1)}
                  className="px-3 py-1 hover:bg-gray-100 active:scale-90"
                >
                  +
                </button>
              </div>
              <div className="text-xs text-red-600">Adults (10+ yrs)</div>
            </div>

            {/* Children */}
            <div>
              <p className="text-xs text-gray-400 mb-1">CHILDREN</p>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => onChildrenChange(children - 1)}
                  disabled={children <= 0}
                  className="px-3 py-1 hover:bg-gray-100 active:scale-90"
                >
                  −
                </button>
                <span className="px-4">{children}</span>
                <button
                  onClick={() => onChildrenChange(children + 1)}
                  className="px-3 py-1 hover:bg-gray-100 active:scale-90"
                >
                  +
                </button>
              </div>
              <div className="text-xs text-red-600">Children (5–10 yrs)</div>
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBook}
            className="
              bg-green-900 text-white
              w-full sm:w-auto
              px-8 sm:px-12 py-3
              text-sm font-semibold tracking-wide
            "
          >
            BOOK PACKAGE NOW
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;
