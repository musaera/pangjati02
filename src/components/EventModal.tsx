import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Event } from "@/hooks/useEvents";

interface EventModalProps {
  event?: Event;
  onSave: (data: Omit<Event, "id" | "created_at">) => Promise<void>;
  trigger: React.ReactNode;
}

const EventModal = ({ event, onSave, trigger }: EventModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    tanggal: "",
    lokasi: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setFormData({
        nama: event.nama,
        tanggal: event.tanggal,
        lokasi: event.lokasi
      });
    } else {
      setFormData({
        nama: "",
        tanggal: "",
        lokasi: ""
      });
    }
  }, [event, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      setOpen(false);
    } catch (error) {
      console.error("Error saving event:", error);
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
                  {event ? "Edit Event" : "Tambah Event Baru"}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="nama">Nama Event</Label>
                  <Input
                    id="nama"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tanggal">Tanggal</Label>
                  <Input
                    id="tanggal"
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="lokasi">Lokasi</Label>
                  <Input
                    id="lokasi"
                    value={formData.lokasi}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
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

export default EventModal;