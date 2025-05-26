// Layout.jsx
import React, { JSX } from 'react';
import { Sidebar } from '../../Components/Sidebar.tsx';
import { Footer } from '../../Components/Footer.tsx';

interface LayoutProps {
    children: React.ReactNode
}

export function Layout({ children } : LayoutProps) : JSX.Element {
  return (
    <div>
      <Sidebar />
      <main>
        { children }
      </main>
      <Footer />
    </div>
  );
}
