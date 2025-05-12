import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

import React from 'react';
// import Header from './components/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Login } from './Views/Login.tsx'

const client = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <QueryClientProvider client={client}>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>

      </Router>
    </QueryClientProvider>
    </>
  )
}

export default App;
