import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface EventFiltersState {
  name: string;
  date: Date | undefined;
  capacity: string;
  time: string;
}

interface EventFiltersProps {
  filters: EventFiltersState;
  onFiltersChange: (filters: EventFiltersState) => void;
}

export const EventFilters = ({ filters, onFiltersChange }: EventFiltersProps) => {
  const updateFilter = (key: keyof EventFiltersState, value: string | Date | undefined) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      name: "",
      date: undefined,
      capacity: "all",
      time: "",
    });
  };

  const hasActiveFilters = filters.name || filters.date || filters.capacity !== "all" || filters.time;

  return (
    <div className="w-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 space-y-4 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filtrar Eventos</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Limpar Filtros
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Name Filter */}
        <div className="space-y-2">
          <Label htmlFor="name-filter">Nome do Evento</Label>
          <Input
            id="name-filter"
            placeholder="Buscar por nome..."
            value={filters.name}
            onChange={(e) => updateFilter("name", e.target.value)}
          />
        </div>

        {/* Date Filter */}
        <div className="space-y-2">
          <Label>Data do Evento</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.date ? format(filters.date, "dd/MM/yyyy") : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.date}
                onSelect={(date) => updateFilter("date", date)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Capacity Filter */}
        <div className="space-y-2">
          <Label htmlFor="capacity-filter">Capacidade</Label>
          <Select
            value={filters.capacity}
            onValueChange={(value) => updateFilter("capacity", value)}
          >
            <SelectTrigger id="capacity-filter">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="small">Pequena (&lt; 150)</SelectItem>
              <SelectItem value="medium">Média (150-500)</SelectItem>
              <SelectItem value="large">Grande (&gt; 500)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Time Filter */}
        <div className="space-y-2">
          <Label htmlFor="time-filter">Horário</Label>
          <Input
            id="time-filter"
            placeholder="Ex: 9:00 AM"
            value={filters.time}
            onChange={(e) => updateFilter("time", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};