"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Star,
  IndianRupee,
  HeartHandshake,
} from "lucide-react";
import { Button } from "./ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      when: "beforeChildren",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120 },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 130 },
  },
};

const HeroMiddle = () => {
  return (
    <motion.section
      className="py-24 px-4 bg-gradient-to-b from-purple-25 to-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full"
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      >
        <div className="absolute inset-0 bg-[url('/assets/svg/diamond-pattern.svg')] opacity-10" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-block relative">
            <motion.h2
              className="text-4xl lg:text-5xl font-bold font-playfair text-purple-900 mb-4"
              variants={fadeInRight}
            >
              Why Elevate Events?
            </motion.h2>
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-amber-400 rounded-full"
              variants={scaleUp}
            />
          </div>
          <motion.p
            className="text-lg text-purple-700 max-w-2xl mx-auto mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Discover the unparalleled experience that sets us apart in creating
            your dream celebrations
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            {
              title: "Curated Excellence",
              icon: <Star className="h-10 w-10" strokeWidth={1.5} />,
              text: "Handpicked venues meeting our premium standards",
              bg: "from-purple-600 to-indigo-600",
            },
            {
              title: "Transparent Pricing",
              icon: <IndianRupee className="h-10 w-10" strokeWidth={1.5} />,
              text: "No hidden charges with price-match guarantee",
              bg: "from-amber-500 to-orange-500",
            },
            {
              title: "Stress-Free Planning",
              icon: <HeartHandshake className="h-10 w-10" strokeWidth={1.5} />,
              text: "Dedicated coordinator from start to finish",
              bg: "from-emerald-500 to-cyan-600",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="group relative p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl"
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bg} opacity-0 group-hover:opacity-10`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <div className="relative">
                <motion.div
                  className={`mb-8 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.bg} p-4 shadow-lg`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: index * 0.2 + 0.4 }}
                >
                  <motion.div
                    className="text-white"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    {feature.icon}
                  </motion.div>
                </motion.div>

                <h3 className="text-2xl lg:text-3xl font-semibold text-purple-900 mb-4 font-playfair">
                  {feature.title}
                </h3>
                <p className="text-lg text-purple-700 leading-relaxed">
                  {feature.text}
                </p>
              </div>

              <motion.div
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-100/40 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: index * 0.2 + 0.6 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            variant="ghost"
            className="text-purple-900 hover:bg-purple-50 text-lg font-semibold"
            asChild
          >
            <Link href={"/signin"}>
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer flex gap-2 justify-center items-center"
              >
                Explore Our Promise
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.div>
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroMiddle;
