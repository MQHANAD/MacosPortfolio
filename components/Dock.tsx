import React from "react";
import AppIcon from "./AppIcon";

const apps = [
  {
    id: "finder",
    name: "Finder",
    icon: "2.svg",
  },
  {
    id: "safari",
    name: "Safari",
    icon: "3.svg",
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "4.svg",
  },
  {
    id: "mail",
    name: "Mail",
    icon: "5.svg",
  },
  {
    id: "snake",
    name: "Snake",
    icon: "snake.svg", // Snake icon
  },
] as const;

export default function Dock() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex items-end z-50 max-w-[90vw] overflow-x-auto p-3 gap-6">
      {apps.map((app) => (
        <AppIcon
          key={app.id}
          id={app.id}
          name={app.name}
          icon={app.icon}
          isDock
        />
      ))}
    </div>
  );
}
