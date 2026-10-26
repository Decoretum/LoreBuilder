// Layout.jsx
import React, { JSX } from 'react';
import { Sidebar } from '../../Components/Sidebar.tsx';
import { Footer } from '../../Components/Footer.tsx';
import TimeDisplay from './TimeDisplay.tsx';

interface LayoutProps {
    children: React.ReactNode
}

export function Layout({ children } : LayoutProps) : JSX.Element {
  return (
    <div>
      <main>
        <Sidebar />
        <TimeDisplay />
        { children }
        <Footer />
      </main>
    </div>
  );
}
