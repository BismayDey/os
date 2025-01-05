"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Anime {
  id: number;
  title: string;
  image: string;
}

const dummyAnimeData: Anime[] = [
  { id: 1, title: "Naruto", image: "/placeholder.svg?height=200&width=150" },
  { id: 2, title: "One Piece", image: "/placeholder.svg?height=200&width=150" },
  {
    id: 3,
    title: "Attack on Titan",
    image: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 4,
    title: "My Hero Academia",
    image: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 5,
    title: "Death Note",
    image: "/placeholder.svg?height=200&width=150",
  },
];

export default function AnimeApp() {
  const [animeList, setAnimeList] = useState<Anime[]>(dummyAnimeData);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredAnime = dummyAnimeData.filter((anime) =>
      anime.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAnimeList(filteredAnime);
  }, [searchTerm]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-2 p-2 bg-gray-100">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search anime..."
          className="flex-grow"
        />
      </div>
      <div className="flex-grow overflow-auto p-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {animeList.map((anime) => (
            <motion.div
              key={anime.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={anime.image}
                alt={anime.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{anime.title}</h3>
                <Button className="mt-2">View Details</Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
