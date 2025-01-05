"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const songs = [
  { title: "Song 1", artist: "Artist 1", src: "/path/to/song1.mp3" },
  { title: "Song 2", artist: "Artist 2", src: "/path/to/song2.mp3" },
  { title: "Song 3", artist: "Artist 3", src: "/path/to/song3.mp3" },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => setCurrentSong((currentSong + 1) % songs.length);
  const prevSong = () =>
    setCurrentSong((currentSong - 1 + songs.length) % songs.length);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (newProgress: number) => {
    if (audioRef.current) {
      const time = (newProgress / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(newProgress);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Music Player</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold">{songs[currentSong].title}</h3>
          <p className="text-gray-600">{songs[currentSong].artist}</p>
        </div>
        <audio
          ref={audioRef}
          src={songs[currentSong].src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={nextSong}
        />
        <Slider
          value={[progress]}
          max={100}
          step={1}
          onValueChange={(values) => handleSeek(values[0])}
          className="mb-4"
        />
        <div className="flex justify-center space-x-4 mb-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button onClick={prevSong} variant="ghost" size="icon">
              <SkipBack className="h-6 w-6" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button onClick={togglePlay} variant="ghost" size="icon">
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button onClick={nextSong} variant="ghost" size="icon">
              <SkipForward className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>
        <div className="flex items-center mt-4">
          <Button onClick={toggleMute} variant="ghost" size="icon">
            {isMuted ? (
              <VolumeX className="h-6 w-6" />
            ) : (
              <Volume className="h-6 w-6" />
            )}
          </Button>
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={(values) => handleVolumeChange(values[0] / 100)}
            className="ml-2"
          />
        </div>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Playlist</h4>
          {songs.map((song, index) => (
            <div
              key={index}
              className={`p-2 rounded cursor-pointer ${
                index === currentSong ? "bg-blue-100" : "hover:bg-gray-200"
              }`}
              onClick={() => {
                setCurrentSong(index);
                setIsPlaying(true);
              }}
            >
              {song.title} - {song.artist}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
