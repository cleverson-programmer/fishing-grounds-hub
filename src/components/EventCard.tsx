import { useState } from "react";
import { Calendar, MapPin, Clock, Users, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  rules: string;
  currentAttendees: number;
  totalCapacity: number;
  image: string;
  onRegister: () => void;
}

export const EventCard = ({ 
  title, 
  date, 
  time,
  location, 
  description, 
  rules,
  currentAttendees,
  totalCapacity,
  image,
  onRegister
}: EventCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const availableSpaces = totalCapacity - currentAttendees;

  return (
    <Card 
      className="overflow-hidden border-none shadow-soft hover:shadow-elegant transition-all duration-500 group"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-foreground">
          <h3 className="text-3xl font-bold mb-3 animate-fade-in-up">{title}</h3>
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-accent" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>
        
        <div 
          className={cn(
            "overflow-hidden transition-all duration-500 ease-in-out space-y-4",
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="pt-4 border-t border-border/50 space-y-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Regras</p>
                <p className="text-sm text-muted-foreground">{rules}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {currentAttendees} / {totalCapacity} participantes
                </p>
                <p className="text-xs text-muted-foreground">
                  {availableSpaces} vagas disponíveis
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button 
          onClick={onRegister}
          variant="secondary"
          className="w-full mt-4"
        >
          Cadastre-se agora
        </Button>
      </CardContent>
    </Card>
  );
};