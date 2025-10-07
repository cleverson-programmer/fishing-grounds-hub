import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Clock, Package, Info } from "lucide-react";
import { RentalItem } from "@/pages/FishingGear";

interface RentalCardProps {
  item: RentalItem;
  onSelect: () => void;
}

export const RentalCard = ({ item, onSelect }: RentalCardProps) => {
  return (
    <Card className="overflow-hidden border-2 hover:border-primary/50 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 group bg-gradient-card">
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {item.available > 0 ? (
            <Badge className="bg-primary/95 backdrop-blur-md shadow-lg border border-primary-foreground/20">
              <Package className="h-3 w-3 mr-1" />
              {item.available} Available
            </Badge>
          ) : (
            <Badge variant="secondary" className="backdrop-blur-md shadow-lg">
              Sold Out
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
              <h4 className="text-sm font-semibold">Quick Info</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <CardHeader className="space-y-3">
        <CardTitle className="text-xl line-clamp-1 group-hover:text-primary transition-colors">
          {item.name}
        </CardTitle>
        <CardDescription className="line-clamp-2">{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">Hourly Rate</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-3xl font-bold bg-gradient-primary bg-clip-text">
              R${item.hourlyPrice}
            </span>
            <span className="text-sm text-muted-foreground">/hr</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
          <Package className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{item.available} units in stock</span>
        </div>
        <Button
          onClick={onSelect}
          disabled={item.available === 0}
          className="w-full shadow-lg"
          variant="secondary"
          size="lg"
        >
          {item.available > 0 ? "View Details & Rent" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  );
};
