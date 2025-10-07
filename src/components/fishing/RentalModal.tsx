import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Clock, Calendar as CalendarIcon, DollarSign, CheckCircle } from "lucide-react";
import { RentalItem } from "@/pages/FishingGear";

interface RentalModalProps {
  item: RentalItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RentalModal = ({ item, open, onOpenChange }: RentalModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [hours, setHours] = useState<number>(1);
  const [startTime, setStartTime] = useState<string>("09:00");

  if (!item) return null;

  const totalPrice = (item.hourlyPrice * hours).toFixed(2);

  const isDateUnavailable = (date: Date) => {
    return item.unavailableDates.some(
      (unavailableDate) =>
        date.toDateString() === unavailableDate.toDateString()
    );
  };

  const handleConfirmRental = () => {
    if (!selectedDate) {
      toast.error("Please select a rental date");
      return;
    }

    toast.success("Rental Confirmed!", {
      description: `${item.name} reserved for ${hours} hour${hours > 1 ? "s" : ""} on ${selectedDate.toLocaleDateString()} at ${startTime}. Total: $${totalPrice}`,
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
    });

    onOpenChange(false);
    setSelectedDate(undefined);
    setHours(1);
    setStartTime("09:00");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{item.name}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Image and Description */}
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">
                {item.fullDescription}
              </p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  ${item.hourlyPrice}
                </div>
                <div className="text-sm text-muted-foreground">per hour</div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {item.available}
                </div>
                <div className="text-sm text-muted-foreground">available</div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="space-y-6">
            <div>
              <Label className="flex items-center gap-2 mb-3">
                <CalendarIcon className="h-4 w-4" />
                Select Rental Date
              </Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) =>
                  date < new Date() || isDateUnavailable(date)
                }
                className="rounded-md border pointer-events-auto"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Days marked in red are unavailable
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="time" className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4" />
                  Start Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  min="06:00"
                  max="20:00"
                />
              </div>
              <div>
                <Label htmlFor="hours" className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4" />
                  Duration (hours)
                </Label>
                <Input
                  id="hours"
                  type="number"
                  min="1"
                  max="24"
                  value={hours}
                  onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Hourly Rate:</span>
                <span className="font-medium">${item.hourlyPrice}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{hours} hour{hours > 1 ? "s" : ""}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Total Amount:
                </span>
                <span className="text-2xl font-bold text-primary">
                  ${totalPrice}
                </span>
              </div>
            </div>

            <Button
              onClick={handleConfirmRental}
              className="w-full"
              size="lg"
              variant="secondary"
            >
              Confirm Rental
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};