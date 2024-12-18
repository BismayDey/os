"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";

export default function Browser() {
  const [url, setUrl] = useState("https://example.com");
  const [history, setHistory] = useState<string[]>([url]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigate = (newUrl: string) => {
    setUrl(newUrl);
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), newUrl]);
    setHistoryIndex((prev) => prev + 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setUrl(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setUrl(history[historyIndex + 1]);
    }
  };

  const refresh = () => {
    setUrl(history[historyIndex]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-2 p-2 bg-gray-100">
        <Button
          variant="ghost"
          size="icon"
          onClick={goBack}
          disabled={historyIndex === 0}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goForward}
          disabled={historyIndex === history.length - 1}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={refresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && navigate(url)}
          className="flex-grow"
        />
      </div>
      <motion.div
        className="flex-grow bg-white p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4">Simulated Web Content</h2>
        <p>This is a simulated web page for {url}</p>
        <p>In a real browser, this would display actual web content.</p>
      </motion.div>
    </div>
  );
}
