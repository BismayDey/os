'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Taskbar from './Taskbar'
import StartMenu from './StartMenu'
import Window from './Window'
import Clock from './Clock'
import DesktopIcons from './DesktopIcons'
import Calculator from './Calculator'
import Notepad from './Notepad'
import About from './About'
import Weather from './Weather'
import FileExplorer from './FileExplorer'
import MusicPlayer from './MusicPlayer'
import Settings from './Settings'
import Calendar from './Calendar'
import Terminal from './Terminal'
import Gallery from './Gallery'
import Snake from './Snake'
import TicTacToe from './TicTacToe'
import Browser from './Browser'
import AnimeApp from './AnimeApp'
import LoadingScreen from './LoadingScreen'

export default function Desktop() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [openApps, setOpenApps] = useState<string[]>([])
  const [minimizedApps, setMinimizedApps] = useState<string[]>([])
  const [activeApp, setActiveApp] = useState<string | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isLoading, setIsLoading] = useState(false)

  const toggleStartMenu = () => setIsStartMenuOpen(!isStartMenuOpen)

  const openApp = (appName: string) => {
    setIsLoading(true)
    setTimeout(() => {
      if (!openApps.includes(appName)) {
        setOpenApps([...openApps, appName])
      }
      setActiveApp(appName)
      setMinimizedApps(minimizedApps.filter(app => app !== appName))
      setIsStartMenuOpen(false)
      setIsLoading(false)
    }, 1500) // Simulating loading time
  }

  const closeApp = (appName: string) => {
    setOpenApps(openApps.filter(app => app !== appName))
    setMinimizedApps(minimizedApps.filter(app => app !== appName))
    if (activeApp === appName) {
      setActiveApp(openApps[openApps.length - 2] || null)
    }
  }

  const minimizeApp = (appName: string) => {
    setMinimizedApps([...minimizedApps, appName])
    setActiveApp(openApps[openApps.length - 2] || null)
  }

  const maximizeApp = (appName: string) => {
    setMinimizedApps(minimizedApps.filter(app => app !== appName))
    setActiveApp(appName)
  }

  const focusApp = (appName: string) => {
    setActiveApp(appName)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`relative h-screen w-screen overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-400 to-purple-500'}`}>
      <DesktopIcons openApp={openApp} theme={theme} />
      <AnimatePresence>
        {openApps.map(app => (
          <Window 
            key={app} 
            title={app} 
            onClose={() => closeApp(app)}
            onMinimize={() => minimizeApp(app)}
            isActive={activeApp === app}
            isMinimized={minimizedApps.includes(app)}
            onFocus={() => focusApp(app)}
            theme={theme}
          >
            {app === 'Calculator' && <Calculator />}
            {app === 'Notepad' && <Notepad />}
            {app === 'About' && <About />}
            {app === 'Weather' && <Weather />}
            {app === 'File Explorer' && <FileExplorer theme={theme} />}
            {app === 'Music Player' && <MusicPlayer />}
            {app === 'Settings' && <Settings theme={theme} toggleTheme={toggleTheme} />}
            {app === 'Calendar' && <Calendar theme={theme} />}
            {app === 'Terminal' && <Terminal theme={theme} />}
            {app === 'Gallery' && <Gallery theme={theme} />}
            {app === 'Snake' && <Snake />}
            {app === 'Tic-Tac-Toe' && <TicTacToe />}
            {app === 'Browser' && <Browser />}
            {app === 'Anime App' && <AnimeApp />}
          </Window>
        ))}
      </AnimatePresence>
      <Taskbar 
        toggleStartMenu={toggleStartMenu} 
        openApps={openApps} 
        minimizedApps={minimizedApps}
        activeApp={activeApp}
        focusApp={focusApp}
        maximizeApp={maximizeApp}
        theme={theme}
      />
      <AnimatePresence>
        {isStartMenuOpen && (
          <StartMenu openApp={openApp} theme={theme} />
        )}
      </AnimatePresence>
      <Clock theme={theme} />
      <AnimatePresence>
        {isLoading && <LoadingScreen theme={theme} />}
      </AnimatePresence>
    </div>
  )
}

