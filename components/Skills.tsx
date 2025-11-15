'use client'

import { motion } from 'framer-motion'
import { FaReact, FaNode, FaTools, FaLightbulb } from 'react-icons/fa'
import { useState } from 'react'

const skillsData = [
  {
    category: 'Frontend',
    icon: FaReact,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  },
  {
    category: 'Backend',
    icon: FaNode,
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST API']
  },
  {
    category: 'Tools',
    icon: FaTools,
    skills: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code']
  },
  {
    category: 'Soft Skills',
    icon: FaLightbulb,
    skills: ['Problem Solving', 'Team Leadership', 'Communication', 'UI/UX Design']
  }
]

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="skills" className="py-32 px-4 container-custom">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Skill & Keahlian
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-light rounded-full mb-16" />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {skillsData.map((skillGroup, index) => (
          <motion.div
            key={skillGroup.category}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative group"
          >
            <motion.div
              animate={{
                boxShadow: hoveredIndex === index
                  ? '0 0 40px rgba(59, 130, 246, 0.4)'
                  : '0 0 20px rgba(59, 130, 246, 0.1)',
              }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-2xl glass-effect hover:glass-effect transition-all duration-300 h-full border border-accent/20 hover:border-accent/40"
            >
              <motion.div
                animate={{
                  scale: hoveredIndex === index ? 1.2 : 1,
                  rotate: hoveredIndex === index ? 10 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="text-5xl mb-4 text-accent/70 group-hover:text-accent"
              >
                <skillGroup.icon />
              </motion.div>

              <h3 className="text-2xl font-bold mb-6 gradient-text">
                {skillGroup.category}
              </h3>

              <div className="space-y-3">
                {skillGroup.skills.map((skill, idx) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + idx * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <motion.span
                      className="w-2 h-2 rounded-full"
                      animate={{
                        backgroundColor: hoveredIndex === index
                          ? 'rgba(96, 165, 250, 1)'
                          : 'rgba(59, 130, 246, 0.5)',
                      }}
                    />
                    <span className="text-gray-300 hover:text-accent-light transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-accent/0"
                animate={{
                  borderColor: hoveredIndex === index
                    ? 'rgba(96, 165, 250, 0.5)'
                    : 'rgba(59, 130, 246, 0)',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
