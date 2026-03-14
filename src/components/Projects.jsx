import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: 'HamariBeti',
      description: 'Women safety platform with Aadhaar verification and SOS alerts',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop',
      tech: ['React', 'Node.js', 'MongoDB', 'Aadhaar API'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      details: 'A comprehensive women safety platform featuring real-time SOS alerts, Aadhaar-based verification, location tracking, and emergency contact management.',
    },
    {
      title: 'VAANI',
      description: 'Voice-first AI civic platform with multilingual assistant',
      image: 'https://drive.google.com/file/d/15pzlf2H8nu3Df-r18RwIgQCkfdCjqA-c/view?usp=drive_link',
      tech: ['React', 'AI/ML', 'Voice API', 'NLP'],
      github: 'https://github.com/roshan-1205/VAANI',
      demo: 'https://vaani-ai-assistant-419de.web.app',
      details: 'An innovative voice-first platform enabling citizens to interact with civic services using natural language in multiple Indian languages.',
    },
    {
      title: 'Portfolio Website',
      description: 'Modern developer portfolio with 3D animations',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      tech: ['React', 'Three.js', 'Framer Motion', 'Tailwind'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      details: 'A premium portfolio website featuring 3D interactive elements, smooth animations, and modern UI/UX design principles.',
    },
  ];

  return (
    <section id="projects" ref={ref} className="py-section bg-lightAccent/20">
      <div className="max-w-container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-darkText mb-4">Featured Projects</h2>
          <p className="text-xl text-darkText/70 max-w-2xl mx-auto">
            Building solutions that make a difference
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="bg-background rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* All cards - logo/image only layout */}
              <div className="relative h-full min-h-[400px] overflow-hidden bg-background flex items-center justify-center p-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-darkText/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-background rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 hover:bg-lightAccent rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <div className={`w-full rounded-2xl mb-6 overflow-hidden ${
              selectedProject.title === 'VAANI' ? 'bg-background' : ''
            }`}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className={`w-full rounded-2xl ${
                  selectedProject.title === 'VAANI'
                    ? 'h-64 object-contain p-8'
                    : 'h-64 object-cover'
                }`}
              />
            </div>

            <h2 className="text-3xl font-bold text-darkText mb-4">{selectedProject.title}</h2>
            <p className="text-lg text-darkText/80 mb-6">{selectedProject.details}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-lightAccent rounded-full text-darkText font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={selectedProject.github}
                className="px-6 py-3 gradient-primary rounded-full font-semibold flex items-center gap-2"
              >
                <Github size={20} />
                View Code
              </a>
              <a
                href={selectedProject.demo}
                className="px-6 py-3 border-2 border-primaryAccent rounded-full font-semibold flex items-center gap-2"
              >
                <ExternalLink size={20} />
                Live Demo
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
