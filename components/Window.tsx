import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Minimize, Maximize, Minus } from "lucide-react";

interface WindowProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  children: React.ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  onFocus: () => void;
  theme: "light" | "dark";
}

export default function Window({
  title,
  onClose,
  onMinimize,
  children,
  isActive,
  isMinimized,
  onFocus,
  theme,
}: WindowProps) {
  const [isFullScreen, setIsFullScreen] = useState(true);
  const windowRef = useRef<HTMLDivElement>(null);

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        windowRef.current &&
        !windowRef.current.contains(event.target as Node)
      ) {
        onFocus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onFocus]);

  if (isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      className={`fixed ${
        isFullScreen
          ? "inset-0"
          : "w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      } ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } rounded-lg shadow-lg overflow-hidden flex flex-col`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      style={{ zIndex: isActive ? 10 : 1 }}
      onMouseDown={onFocus}
    >
      <motion.div
        className={`flex justify-between items-center p-2 ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        }`}
        whileHover={{
          backgroundColor: theme === "dark" ? "#4A5568" : "#E2E8F0",
        }}
      >
        <h2 className="text-sm font-semibold">{title}</h2>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={onMinimize}>
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
            {isFullScreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
      <motion.div
        className="flex-1 overflow-auto p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
