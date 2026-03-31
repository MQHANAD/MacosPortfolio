"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { DesktopProvider } from '../context/DesktopContext';
import ErrorBoundary from '../components/ErrorBoundary';

const Desktop = dynamic(() => import('../components/Desktop'), { ssr: false });

export default function Home() {
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
