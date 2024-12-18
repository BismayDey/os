import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

interface TaskbarProps {
  toggleStartMenu: () => void
  openApps: string[]
  minimizedApps: string[]
  activeApp: string | null
  focusApp: (appName: string) => void
  maximizeApp: (appName: string) => void
  theme: 'light' | 'dark'
}

export default function Taskbar({ toggleStartMenu, openApps, minimizedApps, activeApp, focusApp, maximizeApp, theme }: TaskbarProps) {
  return (
    <motion.div
      className={`absolute bottom-0 left-0 right-0 h-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} bg-opacity-80 backdrop-blur-md flex items-center px-2`}
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button onClick={toggleStartMenu} variant="ghost" className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Start
        </Button>
      </motion.div>
      <div className="flex-1 flex items-center ml-4 space-x-2 overflow-x-auto">
        {openApps.map(app => (
          <motion.div
            key={app}
            className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} px-3 py-1 rounded-md cursor-pointer ${activeApp === app ? 'ring-2 ring-blue-500' : ''} ${minimizedApps.includes(app) ? 'opacity-50' : ''}`}
            onClick={() => minimizedApps.includes(app) ? maximizeApp(app) : focusApp(app)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {app}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

