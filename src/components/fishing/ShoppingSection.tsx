import { ShopCard } from "./ShopCard";
import { CartSummary } from "./CartSummary";
import { ShopItem, CartItem } from "@/pages/FishingGear";

// Mock data
const shopItems: ShopItem[] = [
  {
    id: 101,
    name: "Fishing Line Premium 500m",
    description: "High-strength monofilament line, 0.30mm diameter",
    price: 24.99,
    stock: 25,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=500&fit=crop",
  },
  {
    id: 102,
    name: "Lure Set - 10 Pieces",
    description: "Assorted artificial lures for various fish species",
    price: 39.99,
    stock: 15,
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=500&h=500&fit=crop",
  },
  {
    id: 103,
    name: "Fishing Gloves",
    description: "Waterproof gloves with anti-slip grip",
    price: 18.50,
    stock: 30,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop",
  },
  {
    id: 104,
    name: "Bait Container Set",
    description: "3-piece set of airtight bait containers",
    price: 15.99,
    stock: 20,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=500&fit=crop",
  },
  {
    id: 105,
    name: "Fishing Pliers Multi-Tool",
    description: "Stainless steel pliers with line cutter and hook remover",
    price: 29.99,
    stock: 18,
    image: "https://images.unsplash.com/photo-1534281519845-d0e0e0a76c6c?w=500&h=500&fit=crop",
  },
  {
    id: 106,
    name: "Waterproof Tackle Bag",
    description: "Large capacity bag with multiple compartments",
    price: 54.99,
    stock: 10,
    image: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?w=500&h=500&fit=crop",
  },
  {
    id: 107,
    name: "Hook Set - 100 Pieces",
    description: "Assorted sizes, rust-resistant hooks",
    price: 12.99,
    stock: 40,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=500&fit=crop",
  },
  {
    id: 108,
    name: "Fishing Hat with UV Protection",
    description: "Wide-brim hat with UPF 50+ sun protection",
    price: 22.99,
    stock: 0,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=500&fit=crop",
  },
];

interface ShoppingSectionProps {
  cartItems: CartItem[];
  onAddToCart: (item: ShopItem) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export const ShoppingSection = ({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
}: ShoppingSectionProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {shopItems.map((item) => (
          <ShopCard key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>

      {cartItems.length > 0 && (
        <CartSummary cartItems={cartItems} onUpdateQuantity={onUpdateQuantity} />
      )}
    </div>
  );
};
