/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useDesktop } from "../context/DesktopContext";
import { motion, AnimatePresence } from "framer-motion";

interface AppIconProps {
  id: "finder" | "safari" | "terminal" | "mail" | "calculator";
  name: string;
  icon: string;
  isDock?: boolean;
}

export default function AppIcon({
  id,
  name,
  icon,
  isDock = false,
}: AppIconProps) {
  const { openWindow, windows, minimizeWindow, focusWindow } = useDesktop();
  const isOpen = windows[id].isOpen;
  const isMinimized = windows[id].isMinimized;

  const handleClick = () => {
    if (isOpen) {
      if (isMinimized) {
        focusWindow(id);
      } else {
        // If already open and focused, minimize it?
        // macOS behavior: if focused, nothing. if not focused, focus.
        // if minimized, restore.
        // Let's just focus for now, or minimize if it's already active?
        // Actually if you click dock icon of active window, nothing usually happens or it just stays focused.
        // But if we want to toggle minimize:
        // if (activeWindow === id) minimizeWindow(id);
        // else focusWindow(id);
        focusWindow(id);
      }
    } else {
      openWindow(id);
    }
  };

  if (isDock) {
    return (
      <div className="group flex flex-col items-center relative cursor-pointer overflow-visible">
        <motion.button
          whileHover={{ scale: 1.2, translateY: -10 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          className="w-18 h-18 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer overflow-visible"
        >
          <img
            src={icon}
            alt={name}
            className="w-full h-full object-cover drop-shadow-lg rounded-2xl"
          />
        </motion.button>
        <div
          className={`w-1 h-1 rounded-full bg-gray-400 absolute bottom-2 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <span className="absolute -top-10 bg-gray-800/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm border border-white/10">
          {name}
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center gap-2 w-24 p-2 rounded-lg hover:bg-white/10 transition-colors group focus:outline-none focus:bg-white/20 cursor-pointer"
    >
      <img
        src={icon}
        alt={name}
        className="w-16 h-16 object-contain drop-shadow-lg"
      />
      <span className="text-white text-xs font-medium drop-shadow-md px-1 rounded leading-tight">
        {name}
      </span>
    </button>
  );
}
