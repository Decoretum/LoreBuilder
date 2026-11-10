// Layout.jsx
import React, { JSX } from 'react';
import { Sidebar } from '../../Components/Sidebar.tsx';
import { Footer } from '../../Components/Footer.tsx';
import TimeDisplay from './TimeDisplay.tsx';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode
}

export function Layout({ children } : LayoutProps) : JSX.Element {
  const path = useLocation().pathname;
  function menuBlock()
  {
    if (path === "/") return <></>;
    else return <Sidebar />;
  }
  return (
    <div>
      <main>
        { menuBlock() }
        <TimeDisplay />
        { children }
        <Footer />
      </main>
    </div>
  );
}
