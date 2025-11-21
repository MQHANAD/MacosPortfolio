/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { motion, useDragControls, useMotionValue } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';

interface WindowProps {
  id: 'finder' | 'safari' | 'terminal' | 'mail' | 'calculator';
  title: string;
  children: React.ReactNode;
}

export default function Window({ id, title, children }: WindowProps) {
  const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useDesktop();
  const windowState = windows[id];
  const dragControls = useDragControls();
  
  // Center the window initially
  // We can't easily get window inner width/height in SSR, so we might need a useEffect or just CSS centering initially.
  // But since we are using framer motion drag, it's better to handle position with state or motion values.
  
  if (!windowState.isOpen) return null;

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ scale: 0.8, opacity: 0, y: 100 }}
      animate={{ 
        scale: windowState.isMinimized ? 0.1 : windowState.isMaximized ? 1 : 1,
        opacity: windowState.isMinimized ? 0 : 1,
        y: windowState.isMinimized ? 500 : 0,
        width: windowState.isMaximized ? '100vw' : '60vw',
        height: windowState.isMaximized ? 'calc(100vh - 2rem)' : '60vh',
        top: windowState.isMaximized ? '2rem' : '10%',
        left: windowState.isMaximized ? 0 : '20%',
        x: windowState.isMaximized ? 0 : undefined // Reset x when maximized
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      onPointerDown={() => focusWindow(id)}
      style={{ zIndex: windowState.zIndex, position: 'absolute' }}
      className={`bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200`}
    >
      {/* Title Bar */}
      <div 
        onPointerDown={(e) => {
          dragControls.start(e);
          focusWindow(id);
        }}
        className="h-10 bg-[#dcdce0] border-b border-[#b6b6b6] flex items-center px-4 shrink-0 cursor-default select-none"
      >
        <div className="flex gap-2 group">
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }} 
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 flex items-center justify-center text-black/0 hover:text-black/50 transition-colors cursor-pointer border border-[#e0443e]"
          >
            <X size={6} strokeWidth={4} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
            className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/80 flex items-center justify-center text-black/0 hover:text-black/50 transition-colors cursor-pointer border border-[#d89e24]"
          >
            <Minus size={6} strokeWidth={4} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
            className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 flex items-center justify-center text-black/0 hover:text-black/50 transition-colors cursor-pointer border border-[#1aab29]"
          >
            <Maximize2 size={6} strokeWidth={4} />
          </button>
        </div>
        <div className="flex-1 text-center text-sm font-bold text-[#4d4d4d] tracking-wide">{title}</div>
        <div className="w-14"></div> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-white relative">
        {children}
      </div>
    </motion.div>
  );
}
