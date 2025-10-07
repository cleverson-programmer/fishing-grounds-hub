import { useState } from "react";
import { RentalCard } from "./RentalCard";
import { RentalModal } from "./RentalModal";
import { RentalItem } from "@/pages/FishingGear";

// Mock data
const rentalItems: RentalItem[] = [
  {
    id: 1,
    name: "Professional Fishing Rod",
    description: "High-quality carbon fiber rod, 2.7m",
    hourlyPrice: 15,
    available: 5,
    image: "https://images.unsplash.com/photo-1534281519845-d0e0e0a76c6c?w=500&h=500&fit=crop",
    fullDescription:
      "Premium carbon fiber fishing rod with excellent sensitivity and strength. Perfect for both freshwater and light saltwater fishing. Includes rod holder and carrying case.",
    unavailableDates: [
      new Date(2025, 9, 10),
      new Date(2025, 9, 11),
      new Date(2025, 9, 15),
    ],
  },
  {
    id: 2,
    name: "Reel Set Premium",
    description: "Spinning reel with smooth drag system",
    hourlyPrice: 12,
    available: 8,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=500&fit=crop",
    fullDescription:
      "Professional spinning reel with 6+1 ball bearings for ultra-smooth operation. Features anti-reverse mechanism and adjustable drag system. Compatible with most rod types.",
    unavailableDates: [new Date(2025, 9, 12), new Date(2025, 9, 13)],
  },
  {
    id: 3,
    name: "Tackle Box Complete",
    description: "Organized tackle box with various lures and hooks",
    hourlyPrice: 8,
    available: 10,
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=500&h=500&fit=crop",
    fullDescription:
      "Complete tackle box with multiple compartments. Includes assorted hooks, sinkers, swivels, artificial lures, and bobbers. Everything you need for a successful fishing trip.",
    unavailableDates: [new Date(2025, 9, 14)],
  },
  {
    id: 4,
    name: "Fishing Net",
    description: "Large landing net with telescopic handle",
    hourlyPrice: 5,
    available: 12,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop",
    fullDescription:
      "Durable landing net with rubber mesh to protect fish. Telescopic handle extends up to 2 meters. Lightweight aluminum construction with comfortable grip.",
    unavailableDates: [],
  },
  {
    id: 5,
    name: "Fishing Chair",
    description: "Comfortable folding chair with rod holder",
    hourlyPrice: 6,
    available: 6,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=500&fit=crop",
    fullDescription:
      "Portable fishing chair with padded seat and backrest. Features integrated rod holder, side pockets for tackle, and adjustable legs for uneven terrain. Folds compactly for easy transport.",
    unavailableDates: [new Date(2025, 9, 10), new Date(2025, 9, 16)],
  },
  {
    id: 6,
    name: "Ice Cooler",
    description: "30L insulated cooler to keep your catch fresh",
    hourlyPrice: 7,
    available: 4,
    image: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?w=500&h=500&fit=crop",
    fullDescription:
      "High-performance cooler with thick insulation keeps ice for up to 24 hours. Includes drainage plug and comfortable carry handles. Perfect size for a day of fishing.",
    unavailableDates: [new Date(2025, 9, 11), new Date(2025, 9, 15)],
  },
];

export const RentalSection = () => {
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rentalItems.map((item) => (
          <RentalCard
            key={item.id}
            item={item}
            onSelect={() => setSelectedItem(item)}
          />
        ))}
      </div>

      <RentalModal
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      />
    </div>
  );
};
