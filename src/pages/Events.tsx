import { useState, useMemo } from "react";
import { events, EventsCarousel } from "@/components/EventsCarousel";
import { RegistrationFormModal } from "@/components/RegistrationFormModal";
import { EventFilters, EventFiltersState } from "@/components/EventFilters";
import { parse, isEqual } from "date-fns";
import Header from "@/components/Header";

const Events = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | undefined>();
  const [filters, setFilters] = useState<EventFiltersState>({
    name: "",
    date: undefined,
    capacity: "all",
    time: "",
  });

  const handleRegister = (eventId: number) => {
    setSelectedEventId(eventId);
    setIsModalOpen(true);
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Filter by name
      if (filters.name && !event.title.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }

      // Filter by date
      if (filters.date) {
        try {
          const eventDate = parse(event.date.split(",")[0].trim(), "MMMM d", new Date());
          if (!isEqual(
            new Date(filters.date.getFullYear(), filters.date.getMonth(), filters.date.getDate()),
            new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate())
          )) {
            return false;
          }
        } catch (e) {
          // If date parsing fails, skip this filter
        }
      }

      // Filter by capacity
      if (filters.capacity !== "all") {
        const capacity = event.totalCapacity;
        if (filters.capacity === "small" && capacity >= 150) return false;
        if (filters.capacity === "medium" && (capacity < 150 || capacity > 500)) return false;
        if (filters.capacity === "large" && capacity <= 500) return false;
      }

      // Filter by time
      if (filters.time && !event.time.toLowerCase().includes(filters.time.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text">
            Próximos eventos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra eventos e experiências incríveis. Inscreva-se agora para garantir sua vaga!
          </p>
        </div>

        {/* Filters Section */}
        <section className="px-4 md:px-8 pb-2 pt-10">
          <div className="max-w-7xl mx-auto">
            <EventFilters filters={filters} onFiltersChange={setFilters} />
          </div>
        </section>
      </section>

      {/* Events Carousel Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <EventsCarousel onRegister={handleRegister} />
        </div>
      </section>

      {/* Registration Modal */}
      <RegistrationFormModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialEventId={selectedEventId}
      />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Eventos Duzepesqueiro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Events;