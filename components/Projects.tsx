'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaShoppingCart, FaChartBar, FaMobileAlt, FaComments } from 'react-icons/fa'

const projectsData = [
  {
    id: 1,
    title: 'Platform E-Commerce',
    description: 'Solusi e-commerce full-stack dengan integrasi pembayaran, manajemen inventori, dan analytics real-time.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB'],
    icon: FaShoppingCart,
    color: 'from-blue-500 to-cyan-500',
    stats: { users: '50K+', growth: '+200%' }
  },
  {
    id: 2,
    title: 'Dashboard SaaS',
    description: 'Dashboard interaktif dengan visualisasi data real-time, manajemen pengguna, dan fitur analytics advanced.',
    tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    icon: FaChartBar,
    color: 'from-purple-500 to-pink-500',
    stats: { users: '10K+', uptime: '99.9%' }
  },
  {
    id: 3,
    title: 'Aplikasi Mobile',
    description: 'Aplikasi mobile cross-platform dengan kemampuan offline, push notifications, dan sinkronisasi seamless.',
    tags: ['React Native', 'Firebase', 'Redux'],
    icon: FaMobileAlt,
    color: 'from-green-500 to-emerald-500',
    stats: { downloads: '100K+', rating: '4.8★' }
  },
  {
    id: 4,
    title: 'Platform Chat AI',
    description: 'Platform messaging real-time bertenaga AI, dengan natural language processing dan rekomendasi smart.',
    tags: ['Next.js', 'WebSocket', 'OpenAI', 'Tailwind'],
    icon: FaComments,
    color: 'from-orange-500 to-red-500',
    stats: { messages: '1M+', response: '<100ms' }
  }
]

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  return (
    <section id="projects" className="py-32 px-4 container-custom">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Proyek Unggulan
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-light rounded-full mb-16" />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {projectsData.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            whileHover={{ y: -15 }}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative h-full"
          >
            <motion.div
              animate={{
                boxShadow: hoveredId === project.id
                  ? '0 20px 60px rgba(59, 130, 246, 0.3)'
                  : '0 10px 30px rgba(59, 130, 246, 0.1)',
              }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-2xl glass-effect overflow-hidden h-full flex flex-col border border-accent/20 hover:border-accent/40"
            >
              {/* Background Gradient */}
              <motion.div
                animate={{
                  opacity: hoveredId === project.id ? 0.2 : 0.1,
                  scale: hoveredId === project.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-2xl`}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <motion.div
                  animate={{
                    scale: hoveredId === project.id ? 1.3 : 1,
                    rotate: hoveredId === project.id ? 10 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl mb-4 text-white/50 group-hover/card:text-accent/70 transition-colors"
                >
                  <project.icon />
                </motion.div>

                <h3 className="text-2xl font-bold mb-3 gradient-text group-hover:text-accent-light transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-t border-accent/20">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <motion.div
                      key={key}
                      animate={{
                        opacity: hoveredId === project.id ? 1 : 0.7,
                      }}
                      className="text-center"
                    >
                      <p className="text-accent font-bold text-lg">{value}</p>
                      <p className="text-xs text-gray-400 capitalize">{key}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.2 + idx * 0.05,
                      }}
                      viewport={{ once: true }}
                      className="px-3 py-1 rounded-full bg-accent/10 text-accent-light text-xs font-medium border border-accent/30 hover:border-accent/60 transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* View Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    opacity: hoveredId === project.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="mt-6 px-6 py-2 bg-accent/20 border border-accent/50 text-accent-light rounded-lg font-semibold hover:bg-accent/30 transition-all w-full"
                >
                  Lihat Proyek →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
