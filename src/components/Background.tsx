"use client";
import { motion } from "framer-motion";
import Image from "next/image";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120 },
  },
};

const scaleVariant = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 130, delay: 0.4 },
  },
};

const Background = () => {
  return (
    <div className="relative h-[400px]">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Image
          src="/marr.jpg"
          alt="Event Background"
          fill
          className="object-cover"
          priority
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.div
          className="max-w-4xl space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 font-playfair"
            variants={childVariants}
          >
            Craft Your Dream Event <br className="hidden md:block" />
            <motion.span
              className="text-amber-400 inline-block"
              variants={scaleVariant}
            >
              Effortlessly
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-200 font-light"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.6 } },
            }}
          >
            Curated venues, premium services, and seamless planning - Your
            perfect event starts here
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Background;
