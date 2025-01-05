import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

interface StartMenuProps {
  openApp: (appName: string) => void;
  theme: "light" | "dark";
}

const apps = [
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
];

export default function StartMenu({ openApp, theme }: StartMenuProps) {
  return (
    <motion.div
      className={`absolute bottom-12 left-0 w-64 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
      } border border-gray-300 rounded-lg shadow-lg overflow-hidden`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{
        duration: 0.2,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <div className="grid grid-cols-2 gap-2 p-4">
        {apps.map(({ name, Icon }) => (
          <motion.div
            key={name}
            whileHover={{
              scale: 1.05,
              backgroundColor:
                theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => openApp(name)}
              variant="ghost"
              className={`w-full justify-start ${
                theme === "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              <Icon className="mr-2 h-4 w-4" />
              {name}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
