import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ShoppingCart, Package, Info, Star } from "lucide-react";
import { ShopItem } from "@/pages/FishingGear";
import { toast } from "sonner";

interface ShopCardProps {
  item: ShopItem;
  onAddToCart: (item: ShopItem) => void;
}

export const ShopCard = ({ item, onAddToCart }: ShopCardProps) => {
  const handleAddToCart = () => {
    onAddToCart(item);
    toast.success("Added to cart!", {
      description: `${item.name} has been added to your cart`,
    });
  };

  return (
    <Card className="overflow-hidden border-2 hover:border-primary/50 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full bg-gradient-card">
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
          <Badge className="bg-accent/95 backdrop-blur-md shadow-lg border border-accent-foreground/20">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Premium
          </Badge>
          {item.stock > 0 ? (
            <Badge className="bg-primary/95 backdrop-blur-md shadow-lg border border-primary-foreground/20">
              <Package className="h-3 w-3 mr-1" />
              {item.stock} in stock
            </Badge>
          ) : (
            <Badge variant="destructive" className="backdrop-blur-md shadow-lg">
              Out of Stock
            </Badge>
          )}
        </div>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-4 right-4 z-20 h-8 w-8 rounded-full shadow-lg backdrop-blur-md bg-background/80"
            >
              <Info className="h-4 w-4" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Product Details</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Stock:</span>
                <span className="font-medium">{item.stock} available</span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <CardHeader className="flex-grow space-y-3">
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {item.name}
        </CardTitle>
        <CardDescription className="line-clamp-2">{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Separator />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span className="font-medium">{item.stock} available</span>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ${item.price.toFixed(2)}
            </div>
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={item.stock === 0}
          className="w-full shadow-lg"
          variant={item.stock > 0 ? "secondary" : "default"}
          size="lg"
        >
          {item.stock > 0 ? (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          ) : (
            "Out of Stock"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};