"use client"; // Add this at the top

import { createContext, useContext, useEffect, useState } from "react";

// Import API function
import { getEvents } from "@/actions/get-events.actions"; // Adjust path if needed
interface Event {
  id: string;
  title: string;
  members: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organiser: string;
  registrations:string
  sponsors: string;
  category: string;
  coordinator: string;
  time: string;
  duration: string;
  contact: number;
  fees: number;
  image: string;
  tags: string[];
}
interface EventContextType {
  events: Event[];
  loading: boolean;
}
const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events once
  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getEvents(); // Call API
      const formattedEvents: Event[] = fetchedEvents.map((eventData: any) => ({
        id: eventData.id,
        title: eventData.title,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        image: eventData.imageUrl,
        location: eventData.location,
        description: eventData.description,
        organiser: eventData.organiser,
        members: eventData.members,
        time: eventData.time,
        registrations:eventData.registrations,
        sponsors: eventData.sponsors,
        tags: eventData.tags,
        category: eventData.category,
        coordinator: eventData.coordinator,
        fees: eventData.fees,
        duration: eventData.duration,
        contact: eventData.contact,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, loading }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom Hook for accessing context
export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context)
    throw new Error("useEvents must be used within an EventProvider");
  return context;
};
