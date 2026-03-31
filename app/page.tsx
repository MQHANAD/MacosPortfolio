"use client";
import React, { useState, useEffect } from 'react';
import { DesktopProvider } from '../context/DesktopContext';
import ErrorBoundary from '../components/ErrorBoundary';
import Desktop from '../components/Desktop';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="h-screen w-screen overflow-hidden bg-[#060010]" />
    );
  }

  return (
    <ErrorBoundary>
      <DesktopProvider>
        <main className="h-screen w-screen overflow-hidden bg-[#060010]">
          <Desktop />
        </main>
      </DesktopProvider>
    </ErrorBoundary>
  );
}
