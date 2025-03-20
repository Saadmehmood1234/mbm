"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { Users } from "lucide-react";
import { Button } from "./Button";
import Link from "next/link";
import { HomeServices } from '../lib/data/HomeService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const imageHoverVariants = {
  hover: { scale: 1.05, transition: { duration: 0.4 } }
};

const SignatureServices = () => {
  return (
    <motion.section 
      className="py-16 px-4 bg-gradient-to-b from-purple-100 to-pink-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-4 font-playfair"
            variants={fadeInUp}
          >
            Signature Services
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Explore our most sought-after event solutions curated for
            unforgettable experiences
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {HomeServices.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white shadow-lg shadow-gray-400 border-3 border-purple-600 rounded-2xl overflow-hidden group"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <motion.div 
                className="relative h-60"
                variants={imageHoverVariants}
                whileHover="hover"
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-purple-900/40"
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 0.6 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <motion.div 
                className="p-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
              >
                <motion.h3 
                  className="text-xl font-semibold mb-2 text-purple-900"
                  variants={fadeInUp}
                >
                  {service.name}
                </motion.h3>

                <motion.div 
                  className="flex items-center justify-between mb-4"
                  variants={fadeInUp}
                >
                  <span className="text-2xl font-bold text-amber-600">
                    ₹{service.price.toLocaleString()}
                    <span className="text-sm text-gray-500">/day</span>
                  </span>
                  {service.capacity && (
                    <motion.span 
                      className="text-gray-600 flex items-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Users className="h-5 w-5 mr-2" />
                      {service.capacity}+
                    </motion.span>
                  )}
                </motion.div>

                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { staggerChildren: 0.05 }
                    }
                  }}
                >
                  {service.features.map((feature, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-sm"
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    asChild
                    className="w-full bg-purple-900 text-white hover:bg-purple-800 h-12 text-lg"
                  >
                    <Link href={`/detail`}>
                      <motion.div className="flex items-center justify-center">
                        Explore Options
                        <motion.span
                          className="ml-2"
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SignatureServices;