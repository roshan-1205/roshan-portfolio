import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Award, ExternalLink, X } from 'lucide-react';

const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const certificates = [
    {
      title: 'Web Development',
      issuer: 'AKS University',
      date: '2024',
      image: 'https://res.cloudinary.com/dptci2jft/image/upload/v1773516901/WebDev_zeblqc.jpg',
      description: 'Completed comprehensive Web development course covering HTML5, CSS3, JavaScript ES6, React.js, and MongoDB',
      credentialUrl: 'https://res.cloudinary.com/dptci2jft/image/upload/v1773516901/WebDev_zeblqc.jpg',
    },
    {
      title: 'Software Developer (IT-ITES Sector)',
      issuer: 'Skill India Mission (PMKVY)',
      date: '2024',
      image: 'https://res.cloudinary.com/dptci2jft/image/upload/v1773516900/Skill-Ind_pz0qyj.jpg',
      description: 'I’ve successfully completed the Software Developer (IT-ITES Sector) course under the Skill India Mission (PMKVY), certified by NCVET.',
      credentialUrl: 'https://res.cloudinary.com/dptci2jft/image/upload/v1773516900/Skill-Ind_pz0qyj.jpg',
    },
    {
      title: 'Thrillx 1.0 - Hackathon',
      issuer: 'ADSC',
      date: '2023',
      image: 'https://res.cloudinary.com/dptci2jft/image/upload/v1773516900/ThrillX_l9eucx.jpg',
      description: 'Excited to Have Completed My First Hackathon – THRILLX 1.0!',
      credentialUrl: 'https://res.cloudinary.com/dptci2jft/image/upload/v1773516900/ThrillX_l9eucx.jpg',
    },
  ];

  return (
    <section id="certificates" ref={ref} className="py-section bg-background">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-darkText mb-3 md:mb-4">
            Certificates & Achievements
          </h2>
          <p className="text-base md:text-xl text-darkText/70 max-w-2xl mx-auto px-4">
            Professional certifications and learning milestones
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="bg-background rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              onClick={() => setSelectedCertificate(certificate)}
            >
              {/* Certificate Image - Full Card Display */}
              <div className="relative h-full min-h-[400px] overflow-hidden bg-background flex items-center justify-center p-6">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-darkText/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedCertificate(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-background rounded-2xl md:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 p-2 hover:bg-lightAccent rounded-full transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Certificate Image */}
            <div className="mb-6 rounded-xl md:rounded-2xl overflow-hidden bg-lightAccent/20">
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Certificate Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Award className="text-primaryAccent flex-shrink-0 mt-1" size={32} />
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-darkText mb-2">
                    {selectedCertificate.title}
                  </h2>
                  <p className="text-lg md:text-xl text-darkText/70 font-medium">
                    {selectedCertificate.issuer}
                  </p>
                  <p className="text-base md:text-lg text-primaryAccent font-semibold mt-1">
                    {selectedCertificate.date}
                  </p>
                </div>
              </div>

              <p className="text-base md:text-lg text-darkText/80 leading-relaxed">
                {selectedCertificate.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <motion.a
                  href={selectedCertificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 md:px-8 py-3 md:py-4 gradient-primary text-darkText rounded-full font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
                >
                  View Credential
                  <ExternalLink size={20} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Certificates;
