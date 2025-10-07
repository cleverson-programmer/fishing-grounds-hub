import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EventCard } from "./EventCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Import event images
import techConference from "@/assets/event-tech-conference.jpg";
import musicFestival from "@/assets/event-music-festival.jpg";
import artExhibition from "@/assets/event-art-exhibition.jpg";
import networking from "@/assets/event-networking.jpg";

export const events = [
  {
    id: 1,
    title: "Tech Innovation Summit 2025",
    date: "March 15, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "San Francisco, CA",
    description: "Join industry leaders and innovators for a day of cutting-edge technology discussions, networking opportunities, and hands-on workshops.",
    rules: "Professional attire required. Must be 18+ to attend. Registration required.",
    currentAttendees: 145,
    totalCapacity: 200,
    image: techConference,
  },
  {
    id: 2,
    title: "Summer Music Festival",
    date: "June 20-22, 2025",
    time: "2:00 PM - 11:00 PM",
    location: "Austin, TX",
    description: "Experience three days of incredible live music performances from top artists across multiple genres in an unforgettable outdoor setting.",
    rules: "All ages welcome. No outside food or drinks. Camping available.",
    currentAttendees: 3200,
    totalCapacity: 5000,
    image: musicFestival,
  },
  {
    id: 3,
    title: "Modern Art Exhibition",
    date: "April 8, 2025",
    time: "10:00 AM - 8:00 PM",
    location: "New York, NY",
    description: "Explore contemporary art from emerging and established artists in an exclusive gallery opening featuring interactive installations.",
    rules: "Photography allowed without flash. Children must be supervised.",
    currentAttendees: 78,
    totalCapacity: 150,
    image: artExhibition,
  },
  {
    id: 4,
    title: "Business Networking Night",
    date: "May 10, 2025",
    time: "6:00 PM - 10:00 PM",
    location: "Chicago, IL",
    description: "Connect with entrepreneurs, investors, and business professionals in a relaxed atmosphere perfect for building meaningful relationships.",
    rules: "Business casual attire. Bring business cards. RSVP required.",
    currentAttendees: 89,
    totalCapacity: 120,
    image: networking,
  },
];

interface EventsCarouselProps {
  onRegister: (eventId: number) => void;
}

export const EventsCarousel = ({ onRegister }: EventsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {events.map((event) => (
            <div key={event.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
              <EventCard {...event} onRegister={() => onRegister(event.id)} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 shadow-elegant hover:scale-110 transition-transform"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 shadow-elegant hover:scale-110 transition-transform"
        onClick={scrollNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === selectedIndex
                ? "bg-primary w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};