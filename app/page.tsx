"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { DesktopProvider } from '../context/DesktopContext';

const Desktop = dynamic(() => import('../components/Desktop'), { ssr: false });

export default function Home() {
  return (
    <DesktopProvider>
      <main className="h-screen w-screen overflow-hidden bg-[#060010]">
        <Desktop />
      </main>
    </DesktopProvider>
  );
}
