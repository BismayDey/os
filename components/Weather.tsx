'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react'

const weatherIcons = {
  'Clear': Sun,
  'Clouds': Cloud,
  'Rain': CloudRain,
  'Snow': Snowflake,
}

export default function Weather() {
  const [weather, setWeather] = useState<any>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      // This is a mock API call. In a real application, you would call an actual weather API.
      const mockWeather = {
        main: { temp: 20 },
        weather: [{ main: 'Clear' }],
        name: 'Sample City'
      }
      setWeather(mockWeather)
    }

    fetchWeather()
  }, [])

  if (!weather) return <div>Loading...</div>

  const WeatherIcon = weatherIcons[weather.weather[0].main as keyof typeof weatherIcons] || Cloud

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <WeatherIcon className="w-16 h-16 text-blue-500" />
      </motion.div>
      <motion.h2
        className="text-2xl font-bold mt-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {weather.name}
      </motion.h2>
      <motion.p
        className="text-4xl font-bold"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {Math.round(weather.main.temp)}°C
      </motion.p>
      <motion.p
        className="text-gray-500"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {weather.weather[0].main}
      </motion.p>
    </motion.div>
  )
}

