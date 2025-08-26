import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Jadwal } from "@/hooks/useJadwal";

interface JadwalModalProps {
  jadwal?: Jadwal;
  onSave: (data: Omit<Jadwal, "id" | "created_at">) => Promise<void>;
  trigger: React.ReactNode;
}

const JadwalModal = ({ jadwal, onSave, trigger }: JadwalModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    kegiatan: "",
    waktu: "",
    tempat: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jadwal) {
      const waktuFormatted = jadwal.waktu ? new Date(jadwal.waktu).toISOString().slice(0, 16) : "";
      setFormData({
        kegiatan: jadwal.kegiatan,
        waktu: waktuFormatted,
        tempat: jadwal.tempat
      });
    } else {
      setFormData({
        kegiatan: "",
        waktu: "",
        tempat: ""
      });
    }
  }, [jadwal, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      setOpen(false);
    } catch (error) {
      console.error("Error saving jadwal:", error);
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
                  {jadwal ? "Edit Jadwal" : "Tambah Jadwal Baru"}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="kegiatan">Kegiatan</Label>
                  <Input
                    id="kegiatan"
                    value={formData.kegiatan}
                    onChange={(e) => setFormData({ ...formData, kegiatan: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="waktu">Waktu</Label>
                  <Input
                    id="waktu"
                    type="datetime-local"
                    value={formData.waktu}
                    onChange={(e) => setFormData({ ...formData, waktu: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tempat">Tempat</Label>
                  <Input
                    id="tempat"
                    value={formData.tempat}
                    onChange={(e) => setFormData({ ...formData, tempat: e.target.value })}
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

export default JadwalModal;