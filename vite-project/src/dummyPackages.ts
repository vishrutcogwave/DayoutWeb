import type { PackageData } from "./types";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const dummyPackages: PackageData[] = [
  {
    id: 1,
    image: img("photo-1500530855697-b586d89ba3ee"), // Resort sunset
    startTime: "03:00 PM START",
    title: "Day out Package 01",
    timeRange: "03:00 PM TO 09:00 PM",
    price: 999,
    taxNote: "+5% TAX / PAX",
    featuresLeft: [
      "Welcome Drink",
      "Dinner",
      "Swimming Pool",
      "Rain dance",
    ],
    featuresRight: [
      "Hi tea",
      "Common Campfire",
      "Indoor & Outdoor Games",
      "10 Adventure activities",
    ],
  },

  {
    id: 2,
    image: img("photo-1566073771259-6a8506099945"), // Pool view
    startTime: "09:00 AM START",
    title: "Day out Package 02",
    timeRange: "09:00 AM TO 06:00 PM",
    price: 1099,
    taxNote: "+5% TAX / PAX",
    featuresLeft: ["Welcome Drink", "Breakfast", "Lunch"],
    featuresRight: [
      "Hi tea",
      "Swimming Pool",
      "Rain dance",
      "Indoor & Outdoor Games",
      "10 Adventure activities",
    ],
  },

  {
    id: 3,
    image: img("photo-1571896349842-33c89424de2d"), // Resort room & pool
    startTime: "11:00 AM START",
    title: "Day out Package 03",
    timeRange: "11:00 AM TO 06:00 PM",
    price: 999,
    taxNote: "+5% TAX / PAX",
    featuresLeft: ["Welcome Drink", "Lunch"],
    featuresRight: [
      "Hi tea",
      "Swimming Pool",
      "Rain dance",
      "Indoor & Outdoor Games",
      "10 Adventure activities",
    ],
  },

  {
    id: 4,
    image: img("photo-1501785888041-af3ef285b470"), // Campfire nature
    startTime: "01:00 PM START",
    title: "Day out Package 04",
    timeRange: "01:00 PM TO 09:00 PM",
    price: 1199,
    taxNote: "+5% TAX / PAX",
    featuresLeft: ["Welcome Drink", "Lunch", "Dinner"],
    featuresRight: [
      "Hi tea",
      "Common Campfire",
      "Swimming Pool",
      "Rain dance",
      "Indoor & Outdoor Games",
      "10 Adventure activities",
    ],
  },

  {
    id: 5,
    image: img("photo-1528605248644-14dd04022da1"), // Resort dining
    startTime: "09:00 AM START",
    title: "Day out Package 05",
    timeRange: "09:00 AM TO 10:00 PM",
    price: 1399,
    taxNote: "+5% TAX / PAX",
    featuresLeft: [
      "Welcome Drink",
      "Breakfast",
      "Lunch",
      "Dinner",
    ],
    featuresRight: [
      "Hi tea",
      "Common Campfire",
      "Swimming Pool",
      "Rain dance",
      "Indoor & Outdoor Games",
      "10 Adventure activities",
    ],
  },
];