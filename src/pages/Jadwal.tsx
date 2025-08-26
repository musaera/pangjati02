import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Clock, MapPin } from "lucide-react";
import { useJadwal, Jadwal } from "@/hooks/useJadwal";
import JadwalModal from "@/components/JadwalModal";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const JadwalPage = () => {
  const { jadwal, loading, addJadwal, updateJadwal, deleteJadwal } = useJadwal();

  const handleSave = async (jadwalData: Omit<Jadwal, "id" | "created_at">) => {
    await addJadwal(jadwalData);
  };

  const handleUpdate = (id: number) => async (jadwalData: Omit<Jadwal, "id" | "created_at">) => {
    await updateJadwal(id, jadwalData);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus jadwal ini?")) {
      await deleteJadwal(id);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Manajemen Jadwal</h1>
        <JadwalModal
          onSave={handleSave}
          trigger={
            <Button className="hover:scale-105 transition-transform">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Jadwal
            </Button>
          }
        />
      </div>

      {jadwal.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-12"
        >
          <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Belum ada jadwal</h3>
          <p className="text-muted-foreground mb-4">Mulai dengan menambahkan jadwal pertama</p>
          <JadwalModal
            onSave={handleSave}
            trigger={
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Jadwal Pertama
              </Button>
            }
          />
        </motion.div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Daftar Jadwal ({jadwal.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="overflow-x-auto"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kegiatan</TableHead>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Tempat</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jadwal.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium">{item.kegiatan}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {format(new Date(item.waktu), "dd MMM yyyy, HH:mm", { locale: id })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {item.tempat}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <JadwalModal
                            jadwal={item}
                            onSave={handleUpdate(item.id)}
                            trigger={
                              <Button
                                size="sm"
                                variant="outline"
                                className="hover:scale-110 transition-transform"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            }
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:scale-110 transition-transform text-destructive hover:text-destructive"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default JadwalPage;