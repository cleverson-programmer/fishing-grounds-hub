import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { events } from "./EventsCarousel";

const formSchema = z.object({
  eventId: z.string().min(1, {
    message: "Please select an event.",
  }),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }).max(100, {
    message: "Full name must be less than 100 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }).max(15, {
    message: "Phone number must be less than 15 characters.",
  }),
  age: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 1 && num <= 120;
  }, {
    message: "Please enter a valid age between 1 and 120.",
  }),
});

interface RegistrationFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialEventId?: number;
}

export const RegistrationFormModal = ({ 
  open, 
  onOpenChange, 
  initialEventId 
}: RegistrationFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>(
    initialEventId?.toString() || ""
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventId: initialEventId?.toString() || "",
      fullName: "",
      phoneNumber: "",
      age: "",
    },
  });

  useEffect(() => {
    if (initialEventId) {
      const eventIdStr = initialEventId.toString();
      setSelectedEventId(eventIdStr);
      form.setValue("eventId", eventIdStr);
    }
  }, [initialEventId, form]);

  const selectedEvent = events.find(e => e.id.toString() === selectedEventId);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const event = events.find(e => e.id.toString() === values.eventId);
      console.log("Registration submitted:", {
        ...values,
        event: event?.title,
      });
      toast.success("Registration successful!", {
        description: `You've been registered for ${event?.title}`,
      });
      form.reset();
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Event Registration</DialogTitle>
          <DialogDescription>
            Fill out the form below to register for your selected event.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="eventId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Event</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedEventId(value);
                    }} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an event" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {events.map((event) => (
                        <SelectItem key={event.id} value={event.id.toString()}>
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedEvent && (
              <div className="p-4 rounded-lg bg-secondary/20 border border-border/50 space-y-3">
                <h3 className="font-semibold text-lg">{selectedEvent.title}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-muted-foreground">{selectedEvent.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-muted-foreground">{selectedEvent.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{selectedEvent.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-muted-foreground">
                        {selectedEvent.currentAttendees} / {selectedEvent.totalCapacity} registered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              variant="secondary"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Complete Registration"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};