import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';

import Authentication from './pages/Authentication';
import './App.css'

function App() {
 
  return (
    <>
      <div>
        <Authentication/>
      </div>
    </>
  )
}

export default App;

// export default App
