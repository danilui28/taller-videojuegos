import { useState, useEffect } from 'react'
import './App.css'
import data from "./data/videojuegos.js";
import TablaVideojuegos from './components/TablaVideojuegos.jsx'
import FormularioVideojuego from './components/FormularioVideojuego.jsx';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoEncontrada from './components/PaginaNoEncontrada.jsx';
import AlertaNotificacion from "./components/AlertaNotificacion";

function App() {

  const [mensaje, setMensaje] = useState("");

  const [videojuegos, setVideojuegos ] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");
    return datosGuardados
        ? JSON.parse(datosGuardados)
        : data;
  });  

  useEffect(() => {
    localStorage.setItem(
        "lista_videojuegos",
        JSON.stringify(videojuegos)
    );
  }, [videojuegos]);
  

  function agregarJuego(nuevoJuego) {
    setVideojuegos([...videojuegos, nuevoJuego])
  }

  function eliminarJuego(id) {
    const filtrados = videojuegos.filter((juego) => juego.id !== id);
    setVideojuegos(filtrados)
    setMensaje("Videojuego eliminado correctamente.");
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
      setMensaje("Videojuego editado correctamente.");
    }else{
      agregarJuego(videojuego);
      setMensaje("Videojuego agregado correctamente.");
    }
  }

  return (
    <BrowserRouter>
    {mensaje && (
    <AlertaNotificacion mensaje={mensaje} onCerrar={() => setMensaje("")} />
    )}
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
