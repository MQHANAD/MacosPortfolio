"use client";
import React from 'react';
import { DesktopProvider } from '../context/DesktopContext';
import Desktop from '../components/Desktop';

export default function Home() {
  return (
    <DesktopProvider>
      <main className="h-screen w-screen overflow-hidden">
        <Desktop />
      </main>
    </DesktopProvider>
  );
}
