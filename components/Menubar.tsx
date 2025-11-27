import React, { useState, useEffect } from "react";
import { useDesktop } from "../context/DesktopContext";
import { format } from "date-fns";
import { Apple, Battery, Wifi, Search, RotateCcw } from "lucide-react";

export default function Menubar() {
  const { activeWindow } = useDesktop();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getAppName = (id: string | null) => {
    if (!id) return "Finder";
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-[#ffffff66] backdrop-blur-2xl border-b border-[#ffffff20] flex justify-between items-center px-5 text-[13px] text-white shadow-sm z-50 select-none">
      <div className="flex items-center gap-6">
        <img
          src="/apple.svg"
          alt="Apple"
          className="w-5 h-5"
        />
        <span className="font-bold tracking-wide">
          {getAppName(activeWindow)}
        </span>
        <div className="hidden sm:flex gap-6 font-normal opacity-100">
          <span className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors cursor-default">
            File
          </span>
          <span className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors cursor-default">
            Edit
          </span>
          <span className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors cursor-default">
            View
          </span>
          <span className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors cursor-default">
            Go
          </span>
          <span className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors cursor-default">
            Window
          </span>
          <span className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors cursor-default">
            Help
          </span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden sm:flex gap-4 items-center">
          <Wifi size={18} />
          <div className="flex items-center gap-1">
            <span>64%</span>
            <img
              src="/bettary.svg"
              alt="Apple"
              className="w-5 h-5"
            />
          </div>
          <RotateCcw size={16} />
        </div>
        <span>{format(time, "EEE d MMM HH:mm")}</span>
      </div>
    </div>
  );
}
