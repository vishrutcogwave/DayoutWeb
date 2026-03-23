import type { PackageData } from "./types";
import img1 from "./assets/img1.jpeg";
import img2 from "./assets/img2.jpeg";
import img3 from "./assets/img3.jpeg";
import img4 from "./assets/img4.jpeg";
import img5 from "./assets/img5.jpg";

export const dummyPackages: PackageData[] = [
  {
    id: 1,
    image: img1, // Resort sunset
    startTime: "03:00 PM START",
    title: "Day out Package 01",
    timeRange: "03:00 PM TO 09:00 PM",
    price: 1200,
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
    image:img2,
    startTime: "09:00 AM START",
    title: "Day out Package 02",
    timeRange: "09:00 AM TO 06:00 PM",
    price: 1750,
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
    image: img3,
    startTime: "11:00 AM START",
    title: "Day out Package 03",
    timeRange: "11:00 AM TO 06:00 PM",
    price: 1500,
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
    image:img4,
    startTime: "01:00 PM START",
    title: "Day out Package 04",
    timeRange: "01:00 PM TO 09:00 PM",
    price: 1850,
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
    image: img5,
    startTime: "09:00 AM START",
    title: "Day out Package 05",
    timeRange: "09:00 AM TO 10:00 PM",
    price: 2400,
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