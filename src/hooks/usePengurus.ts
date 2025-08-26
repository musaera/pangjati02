import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Pengurus {
  id: number;
  nama: string;
  jabatan: string;
  kontak: string;
  created_at?: string;
}

export const usePengurus = () => {
  const [pengurus, setPengurus] = useState<Pengurus[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPengurus = async () => {
    try {
      const { data, error } = await supabase
        .from("pengurus")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      setPengurus(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengambil data pengurus",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addPengurus = async (pengurusData: Omit<Pengurus, "id" | "created_at">) => {
    try {
      const { data, error } = await supabase
        .from("pengurus")
        .insert([pengurusData])
        .select()
        .single();

      if (error) throw error;
      setPengurus([...pengurus, data]);
      toast({
        title: "Sukses",
        description: "Pengurus berhasil ditambahkan",
      });
      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menambahkan pengurus",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePengurus = async (id: number, pengurusData: Partial<Pengurus>) => {
    try {
      const { data, error } = await supabase
        .from("pengurus")
        .update(pengurusData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      setPengurus(pengurus.map(p => p.id === id ? data : p));
      toast({
        title: "Sukses",
        description: "Pengurus berhasil diupdate",
      });
      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengupdate pengurus",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deletePengurus = async (id: number) => {
    try {
      const { error } = await supabase
        .from("pengurus")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setPengurus(pengurus.filter(p => p.id !== id));
      toast({
        title: "Sukses",
        description: "Pengurus berhasil dihapus",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus pengurus",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchPengurus();
  }, []);

  return {
    pengurus,
    loading,
    addPengurus,
    updatePengurus,
    deletePengurus,
    refetch: fetchPengurus,
  };
};