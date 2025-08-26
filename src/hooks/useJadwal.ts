import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Jadwal {
  id: number;
  kegiatan: string;
  waktu: string;
  tempat: string;
  created_at?: string;
}

export const useJadwal = () => {
  const [jadwal, setJadwal] = useState<Jadwal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchJadwal = async () => {
    try {
      const { data, error } = await supabase
        .from("jadwal")
        .select("*")
        .order("waktu", { ascending: true });

      if (error) throw error;
      setJadwal(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengambil data jadwal",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addJadwal = async (jadwalData: Omit<Jadwal, "id" | "created_at">) => {
    try {
      const { data, error } = await supabase
        .from("jadwal")
        .insert([jadwalData])
        .select()
        .single();

      if (error) throw error;
      setJadwal([...jadwal, data]);
      toast({
        title: "Sukses",
        description: "Jadwal berhasil ditambahkan",
      });
      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menambahkan jadwal",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateJadwal = async (id: number, jadwalData: Partial<Jadwal>) => {
    try {
      const { data, error } = await supabase
        .from("jadwal")
        .update(jadwalData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      setJadwal(jadwal.map(j => j.id === id ? data : j));
      toast({
        title: "Sukses",
        description: "Jadwal berhasil diupdate",
      });
      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengupdate jadwal",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteJadwal = async (id: number) => {
    try {
      const { error } = await supabase
        .from("jadwal")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setJadwal(jadwal.filter(j => j.id !== id));
      toast({
        title: "Sukses",
        description: "Jadwal berhasil dihapus",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus jadwal",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchJadwal();
  }, []);

  return {
    jadwal,
    loading,
    addJadwal,
    updateJadwal,
    deleteJadwal,
    refetch: fetchJadwal,
  };
};