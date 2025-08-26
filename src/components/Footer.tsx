import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-primary text-primary-foreground py-8 mt-16"
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <motion.h3
            whileHover={{ scale: 1.05 }}
            className="text-lg font-semibold mb-2"
          >
            Pangjati App
          </motion.h3>
          <p className="text-primary-foreground/80">
            Platform untuk mengelola kegiatan dan informasi organisasi
          </p>
          <div className="mt-4">
            <p className="text-sm text-primary-foreground/60">
              © 2024 Pangjati App. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;