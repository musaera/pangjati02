import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Users, Clock } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-primary mb-6"
          >
            Pangjati App
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Platform untuk mengelola kegiatan, pengurus, dan jadwal organisasi dengan mudah dan efisien
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/events">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 hover:scale-105 transition-transform"
              >
                Lihat Events
              </Button>
            </Link>
            <Link to="/pengurus">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 hover:scale-105 transition-transform"
              >
                Data Pengurus
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Calendar,
              title: "Manajemen Events",
              description: "Kelola semua event dan acara organisasi dengan mudah",
              link: "/events"
            },
            {
              icon: Users,
              title: "Data Pengurus",
              description: "Simpan dan kelola informasi pengurus organisasi",
              link: "/pengurus"
            },
            {
              icon: Clock,
              title: "Jadwal Kegiatan",
              description: "Atur dan pantau jadwal kegiatan secara terorganisir",
              link: "/jadwal"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-card p-6 rounded-lg shadow-lg border"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Link to={feature.link}>
                <Button variant="outline" className="w-full">
                  Lihat Detail
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="bg-primary text-primary-foreground py-16"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "100+", label: "Events Terkelola" },
              { number: "50+", label: "Pengurus Aktif" },
              { number: "200+", label: "Kegiatan Terjadwal" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
              >
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;