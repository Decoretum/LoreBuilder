// app.jsx
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./Views/HomePage.jsx";
import { InputDesign } from './Components/InputDesign.jsx';

// For debugging
console.log('App initializing');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  
  const container = document.getElementById('root');
  
  if (!container) {
    console.error('Root element not found!');
    return;
  }
  
  console.log('Root element found, creating React root');
  const root = createRoot(container);
  const client = new QueryClient();

  // Render with error boundary
  try {
    console.log('Rendering App component');
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={client}>
          <Router>
            <Routes>
              <Route path="/" element={<InputDesign />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </React.StrictMode>
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering React app:', error);
  }
});