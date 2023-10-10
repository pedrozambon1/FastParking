//COMPONENTES
import React from 'react';
import "./style.css";
import LoginForm from './components/Login/LoginForm';
import Carrossel from './components/Carrossel/Carrossel';

import img1 from "./components/Carrossel/imagens/img1.jpg"
import img2 from "./components/Carrossel/imagens/img2.jpg"
import img3 from "./components/Carrossel/imagens/img3.jpg"
import img4 from "./components/Carrossel/imagens/img4.jpg"

//PÀGINAS
import Login from './pages/Login';
import Home from './pages/Home';

export default function App() {
  const imgs = [img1, img2, img3, img4];
  return (
    <div className='App'>
      <Carrossel images={imgs}/>
    </div>
  );
}


