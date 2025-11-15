'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4 container-custom">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Text Content */}
        <motion.div variants={itemVariants} className="z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-effect text-accent text-sm font-semibold mb-6">
              ✨ Selamat datang di portfolio saya
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Halo, saya{' '}
            <span className="gradient-text">Muhammad Adib Muzakki</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg"
          >
            Developer full-stack dengan pengalaman 5+ tahun membangun aplikasi web yang indah dan responsif. Passionate tentang menciptakan pengalaman pengguna yang seamless dan kode yang clean dan maintainable.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex gap-4 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent/50"
            >
              Lihat Karya Saya
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 glass-effect text-accent font-semibold rounded-lg border border-accent/30 hover:border-accent/60 transition-all duration-300"
            >
              Unduh CV
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex gap-6 mt-12"
          >
            <motion.a
              href="#"
              whileHover={{ y: -3, scale: 1.2 }}
              className="text-gray-400 hover:text-accent-light transition-colors duration-300 text-2xl"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -3, scale: 1.2 }}
              className="text-gray-400 hover:text-accent-light transition-colors duration-300 text-2xl"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -3, scale: 1.2 }}
              className="text-gray-400 hover:text-accent-light transition-colors duration-300 text-2xl"
            >
              <FaTwitter />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Image/Illustration */}
        <motion.div
          variants={imageVariants}
          className="relative h-96 md:h-full flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: isHovered
                ? 'inset 0 0 60px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.2)'
                : 'inset 0 0 40px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.05)',
            }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            animate={{
              y: isHovered ? 0 : [0, -20, 0],
            }}
            transition={{
              duration: isHovered ? 0.2 : 3,
              repeat: isHovered ? 0 : Infinity,
            }}
            className="relative z-10"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl glass-effect overflow-hidden glow-effect">
              <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 right-10 w-20 h-20 rounded-lg glass-effect flex items-center justify-center text-3xl"
          >
            ⚡
          </motion.div>

          <motion.div
            animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-20 left-10 w-20 h-20 rounded-lg glass-effect flex items-center justify-center text-3xl"
          >
            🎨
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-accent/50 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
