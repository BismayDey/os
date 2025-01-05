"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryProps {
  theme: "light" | "dark";
}

const images = [
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
];

export default function Gallery({ theme }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSlideshow, setIsSlideshow] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSlideshow) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isSlideshow]);

  const nextImage = () => setCurrentIndex((currentIndex + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  const toggleSlideshow = () => setIsSlideshow(!isSlideshow);

  return (
    <div
      className={`p-4 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Gallery</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-auto cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedImage(image);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
      <Button onClick={toggleSlideshow}>
        {isSlideshow ? "Stop Slideshow" : "Start Slideshow"}
      </Button>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="relative">
              <motion.img
                src={images[currentIndex]}
                alt="Selected image"
                className="max-w-full max-h-[80vh]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              />
              <Button
                className="absolute top-2 right-2"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </Button>
              <Button
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
                onClick={prevImage}
              >
                <ChevronLeft />
              </Button>
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={nextImage}
              >
                <ChevronRight />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
