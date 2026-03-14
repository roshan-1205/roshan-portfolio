import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <Github size={20} />, href: 'https://github.com/roshan-1205' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/roshan-kumar-singh-9b9191299' },
    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/roshan_singh_1205' },
    { icon: <Mail size={20} />, href: 'mailto:roshankumarsingh021@gmail.com' },
  ];

  return (
    <footer className="bg-darkText text-background py-12">
      <div className="max-w-container mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              className="inline-block mb-4"
            >
              <img
                src="https://res.cloudinary.com/dptci2jft/image/upload/v1773487313/mylogo_cwszst.png"
                alt="Roshan Kumar Singh"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </motion.a>
            <p className="text-background/70">
              MERN Developer & AI Builder
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-background/70 hover:text-primaryAccent transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-background/10 rounded-full hover:bg-primaryAccent transition-colors"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-background/70 flex items-center justify-center gap-2">
            Made with <Heart size={16} className="text-primaryAccent" /> by Roshan Kumar Singh © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
