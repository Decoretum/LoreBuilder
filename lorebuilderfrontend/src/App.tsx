import { useState,  createContext } from 'react'
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
import { CharacterOrigin } from './Views/Creation/CharacterOrigin.tsx'
import { Layout } from './Views/Recurring/Layout.tsx'
import store from './Redux/store.tsx'

const client = new QueryClient();

function App() {
  // User Authentication


  // Character Building Sections


  return (
    <>
    <QueryClientProvider client={client}>
      <Router>
        <Layout>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/'  element={<Home />}  />
            <Route path='/characters' element={<Characters />} />
            <Route path='/characters/creation/origins' element={<CharacterOrigin />} />
            <Route path='/characters/creation/origins-images' element={<Characters />} />
            <Route path='/characters/creation/personal-attributes' element={<Characters />} />
            <Route path='/characters/creation/personal-attributes-images' element={<Characters />} />
            <Route path='/characters/creation/present-goals' element={<Characters />} />
            <Route path='/characters/creation/present-goals-images' element={<Characters />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
    </>
  )
}

export default App;
