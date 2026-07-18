import { useState } from 'react'
import './App.css'
import data from "./data/videojuegos.js";
import TablaVideojuegos from './components/TablaVideojuegos.jsx'

function App() {

  const [videojuegos] = useState(data);

  return (
    <div>
      <br />
      <h2>Tabla de Videojuegos</h2>
      
      <TablaVideojuegos videojuegos={videojuegos}/>
    </div>
  );

}

export default App
