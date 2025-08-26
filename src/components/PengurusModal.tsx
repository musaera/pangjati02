import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pengurus } from "@/hooks/usePengurus";

interface PengurusModalProps {
  pengurus?: Pengurus;
  onSave: (data: Omit<Pengurus, "id" | "created_at">) => Promise<void>;
  trigger: React.ReactNode;
}

const PengurusModal = ({ pengurus, onSave, trigger }: PengurusModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    kontak: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pengurus) {
      setFormData({
        nama: pengurus.nama,
        jabatan: pengurus.jabatan,
        kontak: pengurus.kontak
      });
    } else {
      setFormData({
        nama: "",
        jabatan: "",
        kontak: ""
      });
    }
  }, [pengurus, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      setOpen(false);
    } catch (error) {
      console.error("Error saving pengurus:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <AnimatePresence>
        {open && (
          <DialogContent className="sm:max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle>
                  {pengurus ? "Edit Pengurus" : "Tambah Pengurus Baru"}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="nama">Nama Pengurus</Label>
                  <Input
                    id="nama"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="jabatan">Jabatan</Label>
                  <Input
                    id="jabatan"
                    value={formData.jabatan}
                    onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="kontak">Kontak</Label>
                  <Input
                    id="kontak"
                    value={formData.kontak}
                    onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
                    Batal
                  </Button>
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? "Menyimpan..." : "Simpan"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default PengurusModal;