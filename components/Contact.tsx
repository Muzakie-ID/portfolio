'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

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
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="contact" className="py-32 px-4 container-custom">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Hubungi Saya
        </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto mb-8" />
          <p className="text-xl text-gray-300">
            Punya proyek di pikiran? Mari berkolaborasi dan ciptakan sesuatu yang amazing bersama-sama.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {[
            { icon: FaEnvelope, title: 'Email', value: 'hello@example.com' },
            { icon: FaPhone, title: 'Telepon', value: '+62 (555) 123-4567' },
            { icon: FaMapMarkerAlt, title: 'Lokasi', value: 'Jakarta, Indonesia' }
          ].map((contact, index) => (
            <motion.div
              key={contact.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl glass-effect border border-accent/20 hover:border-accent/40 transition-all text-center"
            >
              <motion.div
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                className="text-4xl mb-3 text-accent/70 hover:text-accent transition-colors"
              >
                <contact.icon />
              </motion.div>
              <h3 className="font-semibold mb-2 text-accent">{contact.title}</h3>
              <p className="text-gray-300">{contact.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="p-10 rounded-2xl glass-effect border border-accent/20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <label className="block text-sm font-medium mb-2 text-gray-300">Nama</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Anda"
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-accent/30 text-white placeholder-gray-500 focus:outline-none focus:border-accent/60 transition-colors"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@anda.com"
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-accent/30 text-white placeholder-gray-500 focus:outline-none focus:border-accent/60 transition-colors"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <label className="block text-sm font-medium mb-2 text-gray-300">Pesan</label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Pesan Anda..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-accent/30 text-white placeholder-gray-500 focus:outline-none focus:border-accent/60 transition-colors resize-none"
                required
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all duration-300"
            >
              {isSubmitted ? '✓ Pesan Terkirim!' : 'Kirim Pesan'}
            </motion.button>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-4 bg-accent/20 border border-accent/50 rounded-lg text-accent text-center font-medium"
            >
              Terima kasih telah menghubungi! Saya akan segera membalas Anda.
            </motion.div>
          )}
        </motion.form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center text-gray-400"
        >
          <p>© 2024 Muhammad Adib Muzakki. Semua hak dilindungi. Dibuat dengan ❤️ dan banyak kopi.</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
