import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

import React from 'react';
// import Header from './components/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Login } from './Views/Navigation/Login.tsx'
import { Home } from './Views/Navigation/Home.tsx'
import { Characters } from './Views/Navigation/Characters.tsx'
// import { Sidebar } from './Components/Sidebar.tsx'
import { Layout } from './Views/Recurring/Layout.tsx'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme.ts'
import { CssVarsProvider } from '@mui/joy/styles'

const client = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <QueryClientProvider client={client}>
      <Router>
        <Layout>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/home'  element={<Home />}  />
            <Route path='/characters' element={<Characters />} />
            <Route path='/characters/creations/origins' element={<Characters />} />
            <Route path='/characters/creations/origins-images' element={<Characters />} />
            <Route path='/characters/creations/personal-attributes' element={<Characters />} />
            <Route path='/characters/creations/personal-attributes-images' element={<Characters />} />
            <Route path='/characters/creations/present-goals' element={<Characters />} />
            <Route path='/characters/creations/present-goals-images' element={<Characters />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
    </>
  )
}

export default App;
