import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Pengurus", path: "/pengurus" },
    { name: "Jadwal", path: "/jadwal" }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold"
          >
            Pangjati App
          </motion.h1>
          
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-primary-foreground/10"
                  }`}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;