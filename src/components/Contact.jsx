import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Github, Linkedin, Send, Instagram } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent! (Demo only)');
  };

  const socialLinks = [
    { icon: <Github size={24} />, href: 'https://github.com/roshan-1205', label: 'GitHub' },
    { icon: <Linkedin size={24} />, href: 'https://www.linkedin.com/in/roshan-kumar-singh-9b9191299', label: 'LinkedIn' },
    { icon: <Instagram size={24} />, href: 'https://www.instagram.com/roshan_singh_1205', label: 'Instagram' },
    { icon: <Mail size={24} />, href: 'mailto:roshankumarsingh021@gmail.com', label: 'Email' },
  ];

  return (
    <section id="contact" ref={ref} className="py-section bg-lightAccent/20">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-darkText mb-3 md:mb-4">Get In Touch</h2>
          <p className="text-base md:text-xl text-darkText/70 max-w-2xl mx-auto px-4">
            Let's collaborate on your next project
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Social Links Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:space-y-8 order-2 md:order-1"
          >
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-darkText mb-3 md:mb-4">Let's Connect</h3>
              <p className="text-base md:text-lg text-darkText/70 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-4 md:p-5 bg-background rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all active:shadow-sm"
                >
                  <div className="text-primaryAccent flex-shrink-0">{link.icon}</div>
                  <span className="text-base md:text-lg font-medium text-darkText">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-background rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl space-y-5 md:space-y-6 order-1 md:order-2"
          >
            <div>
              <label className="block text-darkText font-medium mb-2 text-sm md:text-base">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 md:py-3.5 rounded-lg md:rounded-xl border-2 border-lightAccent focus:border-primaryAccent outline-none transition-colors bg-background text-darkText text-base"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-darkText font-medium mb-2 text-sm md:text-base">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 md:py-3.5 rounded-lg md:rounded-xl border-2 border-lightAccent focus:border-primaryAccent outline-none transition-colors bg-background text-darkText text-base"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-darkText font-medium mb-2 text-sm md:text-base">Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 md:py-3.5 rounded-lg md:rounded-xl border-2 border-lightAccent focus:border-primaryAccent outline-none transition-colors bg-background text-darkText resize-none text-base"
                placeholder="Your message..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 md:px-8 py-3.5 md:py-4 gradient-primary text-darkText rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow text-base md:text-lg active:shadow-md"
            >
              Send Message
              <Send size={20} />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
