import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Code, Mail, Github, Download } from 'lucide-react';

const CommandPalette = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const commands = [
    { icon: <FileText size={18} />, label: 'Open Projects', action: () => window.location.hash = 'projects' },
    { icon: <Code size={18} />, label: 'Open Skills', action: () => window.location.hash = 'skills' },
    { icon: <FileText size={18} />, label: 'Open About', action: () => window.location.hash = 'about' },
    { icon: <Download size={18} />, label: 'Download Resume', action: () => { const link = document.createElement('a'); link.href = '/resume.pdf'; link.download = 'Roshan_Kumar_Singh_Resume.pdf'; link.click(); } },
    { icon: <Github size={18} />, label: 'Go to GitHub', action: () => window.open('https://github.com/roshan-1205') },
    { icon: <Mail size={18} />, label: 'Contact Me', action: () => window.location.hash = 'contact' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-darkText/50 backdrop-blur-sm z-50"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <Command className="bg-background rounded-2xl shadow-2xl border-2 border-lightAccent overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-lightAccent">
                <Search size={20} className="text-darkText/50" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent outline-none text-darkText placeholder:text-darkText/50"
                />
                <kbd className="px-2 py-1 bg-lightAccent rounded text-xs text-darkText font-medium">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-96 overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-darkText/50">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Actions" className="text-darkText/70 text-sm font-semibold px-2 py-2">
                  {commands.map((command, index) => (
                    <Command.Item
                      key={index}
                      onSelect={() => {
                        command.action();
                        setOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-lightAccent transition-colors text-darkText"
                    >
                      {command.icon}
                      <span>{command.label}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
