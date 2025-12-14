/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, JournalArticle } from "./types";

// Local file path for the JSON dataset
export const JSON_DATA_URL = "Descriptions_of_innovations.json";

export const BRAND_NAME = "CGIAR MFL";

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Aura One",
    tagline: "Pure sound, purely simple.",
    description:
      "A monolithic speaker carved from a single block of sandstone.",
    longDescription:
      "The Aura One is not just a speaker; it is a sculpture. We worked with master stonemasons in Kyoto to create a housing that eliminates resonance and looks beautiful in any room. The driver is custom-tuned for vocal clarity and acoustic instrumentation.",
    price: 350,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800",
    features: [
      "Solid Sandstone Enclosure",
      "Bluetooth 5.2 & WiFi",
      "10-hour Battery",
      "USB-C Charging",
    ],
  },
  {
    id: "p2",
    name: "Silence Earbuds",
    tagline: "Disconnect to connect.",
    description:
      "Noise-canceling earbuds made from recycled aluminum and organic silicone.",
    price: 180,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1610432360893-57782343c49f?auto=format&fit=crop&q=80&w=800",
    features: [
      "Active Noise Cancellation",
      "Transparency Mode",
      "IPX4 Water Resistant",
      "Wireless Charging Case",
    ],
  },
  {
    id: "p3",
    name: "Terra Watch",
    tagline: "Time, reclaimed.",
    description:
      "A smartwatch with an e-ink display that only shows notifications when you ask for them.",
    price: 250,
    category: "Wearable",
    imageUrl:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800",
    features: [
      "E-Ink Display",
      "3-Week Battery Life",
      "Heart Rate Monitor",
      "Sleep Tracking",
    ],
  },
  {
    id: "p4",
    name: "Slate Phone",
    tagline: "Less screen, more life.",
    description:
      "A minimalist smartphone designed to reduce screen time and digital addiction.",
    price: 600,
    category: "Mobile",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
    features: [
      "Monochrome Mode",
      "Physical Privacy Switches",
      "Durable Ceramic Body",
      "Secure OS",
    ],
  },
  {
    id: "p5",
    name: "Loom Lamp",
    tagline: "Light that feels like sun.",
    description:
      "A smart lamp that mimics the natural circadian rhythm of sunlight.",
    price: 120,
    category: "Home",
    imageUrl:
      "https://images.unsplash.com/photo-1507473888900-52a1973529d2?auto=format&fit=crop&q=80&w=800",
    features: [
      "Circadian Lighting",
      "Hand-woven Shade",
      "Voice Control",
      "Energy Efficient",
    ],
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 1,
    title: "The Art of Slow Living",
    date: "April 12, 2025",
    excerpt: "Why we need to disconnect to reconnect with ourselves.",
    image:
      "https://images.unsplash.com/photo-1470790376778-a9fcd48d50e1?auto=format&fit=crop&q=80&w=1200",
    content:
      "In a world that demands constant attention, silence is an act of rebellion. We explore the philosophy behind our design process and how nature influences every curve and material we choose.",
  },
  {
    id: 2,
    title: "Materiality: Sandstone",
    date: "March 28, 2025",
    excerpt:
      "A deep dive into the sourcing and crafting of our signature material.",
    image:
      "https://images.unsplash.com/photo-1453896570773-4537151e222f?auto=format&fit=crop&q=80&w=1200",
    content:
      "Sandstone is not just a rock; it is compressed history. Each vein tells a story of wind, water, and time. We work with quarries that practice sustainable extraction, ensuring that the earth is respected.",
  },
  {
    id: 3,
    title: "Design for Longevity",
    date: "March 10, 2025",
    excerpt: "Creating objects that get better with age, not obsolete.",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200",
    content:
      "Planned obsolescence is the enemy of sustainability. We design our products to be repaired, not replaced. Software updates are supported for 10 years, and hardware is modular.",
  },
];
