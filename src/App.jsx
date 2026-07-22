import { useState } from 'react'
import './App.css'
import data from "./data/videojuegos.js";
import TablaVideojuegos from './components/TablaVideojuegos.jsx'
import FormularioVideojuego from './components/FormularioVideojuego.jsx';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoEncontrada from './components/PaginaNoEncontrada.jsx';

function App() {

  const [videojuegos, setVideojuegos ] = useState(data);

  function agregarJuego(nuevoJuego) {
    setVideojuegos([...videojuegos, nuevoJuego])
  }

  function eliminarJuego(id) {
    const filtrados = videojuegos.filter((juego) => juego.id !== id);
    setVideojuegos(filtrados)
  }

  function editarJuego(juegoEditado) {
    const actualizados = videojuegos.map((juego) => {
      if(juego.id === juegoEditado.id) {
        return juegoEditado;
      } else {
        return juego;
      }
    });

    setVideojuegos(actualizados)
  }

  function manejarGuardar(videojuego){
    const existe = videojuegos.find((juego)=> juego.id === videojuego.id)
    if(existe){
      editarJuego(videojuego);
    }else{
      agregarJuego(videojuego);
    }
  }

  return (
    <BrowserRouter>
      <Navbar />
       <Routes>
        <Route 
          path="/"
          element={
            <TablaVideojuegos videojuegos={videojuegos} onEliminar={eliminarJuego}/>
          }
        />
        <Route 
          path="/Registrar"
          element={
            <FormularioVideojuego onGuardar={manejarGuardar}/>
          }
        />
        <Route 
          path="/Editar"
          element={
            <FormularioVideojuego onGuardar={manejarGuardar}/>
          }
        />
        <Route 
          path="*"
          element={
            <NoEncontrada />
          }
        />
       </Routes>
    </BrowserRouter>
  );

}

export default App
