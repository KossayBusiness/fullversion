import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers } from 'react-icons/fa';

/**
 * Composant qui affiche un indicateur social de type "X% des utilisateurs ont répondu comme vous"
 */
interface SocialProofIndicatorProps {
  percentage?: number;
  message?: string;
  delay?: number;
  className?: string;
}

const SocialProofIndicator: React.FC<SocialProofIndicatorProps> = ({
  percentage = 78,
  message = "des utilisateurs ont répondu comme vous",
  delay = 3000,
  className = ""
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed bottom-4 left-4 bg-white shadow-lg rounded-lg p-3 max-w-xs flex items-center text-sm border border-gray-200 z-50 ${className}`}
    >
      <div className="mr-3 bg-blue-100 p-2 rounded-full text-blue-600">
        <FaUsers size={18} />
      </div>
      <div>
        <span className="font-bold">{percentage}%</span> {message}
      </div>
    </motion.div>
  );
};

export default SocialProofIndicator;