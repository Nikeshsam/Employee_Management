import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Landing from './pages/Landing';
import Authentication from './pages/Authentication';
import './App.css'

function App() {
 
  return (
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Authentication" element={<Authentication />} />
    </Routes>
  )
}

export default App;

// export default App
