'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const INITIAL_DIRECTION = { x: 1, y: 0 }

export default function Snake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState(INITIAL_FOOD)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)

  const moveSnake = useCallback(() => {
    if (gameOver) return

    const newSnake = [...snake]
    const head = { ...newSnake[0] }
    head.x += direction.x
    head.y += direction.y

    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setGameOver(true)
      return
    }

    if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true)
      return
    }

    newSnake.unshift(head)

    if (head.x === food.x && head.y === food.y) {
      setFood({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      })
    } else {
      newSnake.pop()
    }

    setSnake(newSnake)
  }, [snake, direction, food, gameOver])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    const gameLoop = setInterval(moveSnake, 100)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      clearInterval(gameLoop)
    }
  }, [moveSnake])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection(INITIAL_DIRECTION)
    setGameOver(false)
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Snake Game</h2>
      <div 
        className="border-2 border-gray-300 relative" 
        style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
      >
        {snake.map((segment, index) => (
          <motion.div
            key={index}
            className="absolute bg-green-500"
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
          />
        ))}
        <motion.div
          className="absolute bg-red-500"
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      </div>
      {gameOver && (
        <motion.div
          className="mt-4 text-xl font-bold text-red-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Game Over!
        </motion.div>
      )}
      <Button onClick={resetGame} className="mt-4">
        {gameOver ? 'Play Again' : 'Reset Game'}
      </Button>
    </div>
  )
}

