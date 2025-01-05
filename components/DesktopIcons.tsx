import { motion } from "framer-motion";
import {
  Calculator,
  FileText,
  Info,
  Cloud,
  Folder,
  Music,
  Settings,
  Calendar,
  Terminal,
  Image,
  Chrome,
  Gamepad2,
} from "lucide-react";

interface DesktopIconsProps {
  openApp: (appName: string) => void;
  theme: "light" | "dark";
}

const icons = [
  { name: "Calculator", Icon: Calculator },
  { name: "Notepad", Icon: FileText },
  { name: "About", Icon: Info },
  { name: "Weather", Icon: Cloud },
  { name: "File Explorer", Icon: Folder },
  { name: "Music Player", Icon: Music },
  { name: "Settings", Icon: Settings },
  { name: "Calendar", Icon: Calendar },
  { name: "Terminal", Icon: Terminal },
  { name: "Gallery", Icon: Image },
  { name: "Snake", Icon: Gamepad2 },
  { name: "Tic-Tac-Toe", Icon: Gamepad2 },
  { name: "Browser", Icon: Chrome },
  { name: "Anime App", Icon: Chrome },
];

export default function DesktopIcons({ openApp, theme }: DesktopIconsProps) {
  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {icons.map(({ name, Icon }) => (
        <motion.div
          key={name}
          className={`flex flex-col items-center cursor-pointer ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => openApp(name)}
        >
          <div
            className={`${
              theme === "dark" ? "bg-gray-700" : "bg-white bg-opacity-20"
            } p-3 rounded-lg mb-2`}
          >
            <Icon className="w-8 h-8" />
          </div>
          <span className="text-sm text-center">{name}</span>
        </motion.div>
      ))}
    </div>
  );
}
