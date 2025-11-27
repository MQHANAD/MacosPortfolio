import { createContext, useContext, useState, ReactNode } from 'react';

type WindowId = 'finder' | 'safari' | 'terminal' | 'mail' | 'calculator' | 'snake';

interface WindowState {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}

interface DesktopContextType {
  windows: Record<WindowId, WindowState>;
  activeWindow: WindowId | null;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updateWindowPosition: (id: WindowId, position: { x: number; y: number }) => void;
  updateWindowSize: (id: WindowId, size: { width: number; height: number }) => void;
}

const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

const initialWindows: Record<WindowId, WindowState> = {
  finder: { id: 'finder', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  safari: { id: 'safari', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 2 },
  terminal: { id: 'terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 3 },
  mail: { id: 'mail', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 4 },
  calculator: { id: 'calculator', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 5 },
  snake: { id: 'snake', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 6 },
};

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(initialWindows);
  const [activeWindow, setActiveWindow] = useState<WindowId | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);

  const focusWindow = (id: WindowId) => {
    setWindows((prev) => {
      const newZIndex = maxZIndex + 1;
      setMaxZIndex(newZIndex);
      return {
        ...prev,
        [id]: { ...prev[id], zIndex: newZIndex, isMinimized: false },
      };
    });
    setActiveWindow(id);
  };

  const openWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false },
    }));
    focusWindow(id);
  };

  const closeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isMinimized: false },
    }));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const minimizeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const maximizeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
    focusWindow(id);
  };

  const updateWindowPosition = (id: WindowId, position: { x: number; y: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], position },
    }));
  };

  const updateWindowSize = (id: WindowId, size: { width: number; height: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], size },
    }));
  };

  return (
    <DesktopContext.Provider
      value={{
        windows,
        activeWindow,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  const context = useContext(DesktopContext);
  if (context === undefined) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
}
