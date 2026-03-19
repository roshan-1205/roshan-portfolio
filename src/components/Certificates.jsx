import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink, X, Calendar, Building } from 'lucide-react';

const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const certificates = [
    {
      id: 1,
      title: 'Web Development',
      issuer: 'AKS University',
      date: '2024',
      image: 'https://res.cloudinary.com/dptci2jft/image/upload/v1773516901/WebDev_zeblqc.jpg',
      description: 'Comprehensive web development certification covering modern technologies',
      longDescription: 'Completed comprehensive Web development course covering HTML5, CSS3, JavaScript ES6, React.js, and MongoDB. This certification demonstrates proficiency in modern web development technologies and frameworks, including responsive design, API integration, and database management.',
      credentialUrl: 'https://res.cloudinary.com/dptci2jft/image/upload/v1773516901/WebDev_zeblqc.jpg',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'MongoDB'],
      category: 'Development'
    },
    {
      id: 2,
      title: 'Software Developer (IT-ITES Sector)',
      issuer: 'Skill India Mission (PMKVY)',
      date: '2024',
      image: 'https://res.cloudinary.com/dptci2jft/image/upload/v1773516900/Skill-Ind_pz0qyj.jpg',
      description: 'Government certified software development program',
      longDescription: 'Successfully completed the Software Developer (IT-ITES Sector) course under the Skill India Mission (PMKVY), certified by NCVET. This program covers comprehensive software development skills, industry best practices, and professional development standards.',
      credentialUrl: 'https://res.cloudinary.com/dptci2jft/image/upload/v1773516900/Skill-Ind_pz0qyj.jpg',
      skills: ['Software Development', 'IT-ITES', 'PMKVY', 'Industry Standards'],
      category: 'Certification'
    },
    {
      id: 3,
      title: 'Thrillx 1.0 - Hackathon',
      issuer: 'ADSC',
      date: '2023',
      image: 'https://res.cloudinary.com/dptci2jft/image/upload/v1773516900/ThrillX_l9eucx.jpg',
      description: 'First hackathon completion certificate',
      longDescription: 'Successfully completed my first hackathon – THRILLX 1.0 organized by ADSC! This event challenged participants to develop innovative solutions within a limited timeframe, fostering creativity, technical problem-solving skills, and team collaboration.',
      credentialUrl: 'https://res.cloudinary.com/dptci2jft/image/upload/v1773516900/ThrillX_l9eucx.jpg',
      skills: ['Hackathon', 'Innovation', 'Problem Solving', 'Team Work'],
      category: 'Competition'
    },
  ];

  const openModal = (certificate) => {
    console.log('Opening certificate:', certificate.title);
    setSelectedCertificate(certificate);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    console.log('Closing modal');
    setSelectedCertificate(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="certificates" ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Certificates & Achievements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional certifications and learning milestones that showcase my commitment to continuous growth
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
              onClick={() => openModal(certificate)}
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                {/* Certificate Image */}
                <div className="aspect-[4/3] bg-gray-100 p-6 flex items-center justify-center">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden flex-col items-center justify-center text-gray-500">
                    <Award size={48} className="mb-2" />
                    <span className="text-sm font-medium">{certificate.title}</span>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {certificate.category}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {certificate.date}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {certificate.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <Building size={16} className="mr-2" />
                    <span className="text-sm">{certificate.issuer}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {certificate.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="p-8 pb-0">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Award size={32} className="text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedCertificate.title}
                  </h2>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Building size={18} className="mr-2" />
                      <span className="font-medium">{selectedCertificate.issuer}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2" />
                      <span>{selectedCertificate.date}</span>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {selectedCertificate.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Certificate Image */}
            <div className="px-8 py-6">
              <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="max-w-full max-h-80 object-contain"
                />
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-8 pb-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About this Certificate</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedCertificate.longDescription}
                </p>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCertificate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex gap-4">
                <a
                  href={selectedCertificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <ExternalLink size={20} className="mr-2" />
                  View Certificate
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Certificates;