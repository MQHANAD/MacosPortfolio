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
  }, // Using Messages icon as Mail alternative since Mail icon is hard to get
] as const;

export default function Dock() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex items-end z-50">
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
