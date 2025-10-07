import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Minus, Plus, Trash2, ShoppingBag, Info, ChevronDown, Package2 } from "lucide-react";
import { CartItem } from "@/pages/FishingGear";
import { toast } from "sonner";

interface CartSummaryProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export const CartSummary = ({ cartItems, onUpdateQuantity }: CartSummaryProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleFinalize = () => {
    setIsSubmitting(true);
    
    // Simulate order submission
    setTimeout(() => {
      toast.success("Order Submitted!", {
        description: "Your order has been registered. Please visit Fish and Pay store to complete payment.",
      });
      
      // Clear cart
      cartItems.forEach(item => onUpdateQuantity(item.id, 0));
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="sticky top-24 shadow-elegant border-2 border-primary/20 bg-gradient-card">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-lg">
                  <ShoppingBag className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <CardTitle className="text-xl">Shopping Cart</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Package2 className="h-3 w-3" />
                    {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                  </CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </Button>
            </div>
          </CollapsibleTrigger>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Cart Items */}
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden border border-border/50 hover:border-primary/50 transition-colors">
                    <div className="flex gap-3 p-3">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm line-clamp-2 flex-1">
                            {item.name}
                          </h4>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                            onClick={() => onUpdateQuantity(item.id, 0)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </span>
                          <Badge variant="secondary" className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            max={item.stock}
                            value={item.quantity}
                            onChange={(e) =>
                              onUpdateQuantity(
                                item.id,
                                Math.min(item.stock, Math.max(1, parseInt(e.target.value) || 1))
                              )
                            }
                            className="h-7 w-16 text-center"
                          />
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <Separator />

            {/* Total */}
            <div className="space-y-3 p-4 rounded-lg bg-muted/30">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total:</span>
                <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Payment Notice */}
            <Alert className="border-primary/50 bg-primary/10">
              <Info className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm">
                Payment is made in person at the <strong>Fish and Pay</strong> store.
                This order is a reservation only.
              </AlertDescription>
            </Alert>

            {/* Finalize Button */}
            <Button
              onClick={handleFinalize}
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full shadow-lg"
              size="lg"
              variant="secondary"
            >
              {isSubmitting ? (
                <>
                  <Package2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Finalize Order
                </>
              )}
            </Button>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
