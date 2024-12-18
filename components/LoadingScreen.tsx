import { motion } from 'framer-motion'

interface LoadingScreenProps {
  theme: 'light' | 'dark'
}

export default function LoadingScreen({ theme }: LoadingScreenProps) {
  return (
    <motion.div
      className={`fixed inset-0 flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-40 h-40"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <motion.div
            key={index}
            className={`absolute w-4 h-4 rounded-full ${
              theme === 'dark' ? 'bg-blue-500' : 'bg-purple-500'
            }`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.1,
            }}
            style={{
              top: `${Math.sin((index / 8) * Math.PI * 2) * 50 + 50}px`,
              left: `${Math.cos((index / 8) * Math.PI * 2) * 50 + 50}px`,
            }}
          />
        ))}
      </motion.div>
      <motion.div
        className="absolute"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.h2
          className={`text-4xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Loading
        </motion.h2>
      </motion.div>
      <motion.div
        className="absolute bottom-10"
        initial={{ width: 0 }}
        animate={{ width: '60%' }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={`h-1 ${theme === 'dark' ? 'bg-blue-500' : 'bg-purple-500'} rounded-full`}></div>
      </motion.div>
    </motion.div>
  )
}

