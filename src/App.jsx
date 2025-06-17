import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';

// import Authentication from './components/Authentication/Authentication.jsx';
import './App.css'

// function App() {
 

//   return (
//     <>
//       <div>
//         <Authentication/>
//       </div>
//     </>
//   )
// }

const App = () => {
    return (
        <Router>
            <Home />
        </Router>
    );
};

export default App;

// export default App
