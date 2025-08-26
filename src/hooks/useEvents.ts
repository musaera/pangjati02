import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Event {
  id: number;
  nama: string;
  tanggal: string;
  lokasi: string;
  created_at?: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("tanggal", { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengambil data events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData: Omit<Event, "id" | "created_at">) => {
    try {
      const { data, error } = await supabase
        .from("events")
        .insert([eventData])
        .select()
        .single();

      if (error) throw error;
      setEvents([...events, data]);
      toast({
        title: "Sukses",
        description: "Event berhasil ditambahkan",
      });
      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menambahkan event",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateEvent = async (id: number, eventData: Partial<Event>) => {
    try {
      const { data, error } = await supabase
        .from("events")
        .update(eventData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      setEvents(events.map(event => event.id === id ? data : event));
      toast({
        title: "Sukses",
        description: "Event berhasil diupdate",
      });
      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengupdate event",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setEvents(events.filter(event => event.id !== id));
      toast({
        title: "Sukses",
        description: "Event berhasil dihapus",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus event",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    addEvent,
    updateEvent,
    deleteEvent,
    refetch: fetchEvents,
  };
};