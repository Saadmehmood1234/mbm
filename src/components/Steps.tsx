"use client"
import React from "react";
import { motion } from "framer-motion";

const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Steps = () => {
  return (
    <motion.section
      className="py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold mb-16 font-playfair">
          Simple Three-Step Process
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              step: "1",
              title: "Discover & Design",
              description:
                "Browse our curated collection and build your vision",
            },
            {
              step: "2",
              title: "Secure & Confirm",
              description:
                "Instant booking confirmation with flexible payment",
            },
            {
              step: "3",
              title: "Celebrate & Enjoy",
              description:
                "Relax while we handle every detail of your event",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="relative pt-16"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                {step.step}
              </motion.div>
              <div className="pt-10 px-6">
                <h3 className="text-2xl font-semibold mb-4 text-purple-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Steps;
