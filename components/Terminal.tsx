"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface TerminalProps {
  theme: "light" | "dark";
}

export default function Terminal({ theme }: TerminalProps) {
  const [commands, setCommands] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCommands([
        ...commands,
        `$ ${currentCommand}`,
        `Output: ${currentCommand} executed`,
      ]);
      setCurrentCommand("");
    }
  };

  return (
    <div
      className={`p-4 ${
        theme === "dark"
          ? "bg-black text-green-400"
          : "bg-gray-100 text-gray-800"
      } font-mono`}
    >
      <div className="mb-4">
        {commands.map((cmd, index) => (
          <div key={index}>{cmd}</div>
        ))}
      </div>
      <Input
        type="text"
        value={currentCommand}
        onChange={(e) => setCurrentCommand(e.target.value)}
        onKeyPress={handleCommand}
        placeholder="Enter command..."
        className={`${
          theme === "dark"
            ? "bg-black text-green-400"
            : "bg-gray-100 text-gray-800"
        } border-none`}
      />
    </div>
  );
}
