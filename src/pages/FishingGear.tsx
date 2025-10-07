import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RentalSection } from "@/components/fishing/RentalSection";
import { ShoppingSection } from "@/components/fishing/ShoppingSection";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

export interface RentalItem {
  id: number;
  name: string;
  description: string;
  hourlyPrice: number;
  available: number;
  image: string;
  fullDescription: string;
  unavailableDates: Date[];
}

export interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export interface CartItem extends ShopItem {
  quantity: number;
}

const FishingGear = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: ShopItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text">
            Equipamentos de Pesca
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Alugue ou compre equipamentos de pesca de qualidade para sua próxima aventura
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="rental" className="w-full">
            <div className="flex justify-between items-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="rental">Aluguel de equipamentos</TabsTrigger>
                <TabsTrigger value="purchase" className="relative">
                  Comprar produtos
                  {totalItems > 0 && (
                    <Badge
                      variant="destructive"
                      className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              {totalItems > 0 && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="font-medium">{totalItems} items no carrinho</span>
                </div>
              )}
            </div>

            <TabsContent value="rental" className="mt-0">
              <RentalSection />
            </TabsContent>

            <TabsContent value="purchase" className="mt-0">
              <ShoppingSection
                cartItems={cartItems}
                onAddToCart={addToCart}
                onUpdateQuantity={updateCartQuantity}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Duzepesqueiro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default FishingGear;
