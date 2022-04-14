import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';

/* rotas */
import Projetos from './components/pages/Projetos'
import Empresa from './components/pages/Empresa'
import Contato from './components/pages/Contato'
import Createproject from './components/pages/Createproject';
import Editproject from './components/pages/Editproject'
import App from "./App";

import './index.css'
const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
  <NavBar/>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path='/Projetos' element={<Projetos/>} />
      <Route path='/Empresa' element={<Empresa/>} />
      <Route path='/Contato' element={<Contato/>} />
      <Route path='/Createproject' element={<Createproject/>}/>
      <Route path='/Editproject'  element={<Editproject/>}/>
    </Routes>
  <Footer/>
  </BrowserRouter>,
  rootElement
);