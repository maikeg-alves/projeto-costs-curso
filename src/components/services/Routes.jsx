import React from "react";

import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Projetos from "../pages/Projetos";
import Empresa from "../pages/Empresa";
import Contato from "../pages/Contato";
import Createproject from "../pages/Createproject";

export default function Routess() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Projetos" element={<Projetos />} />
        <Route path="/Empresa" element={<Empresa />} />
        <Route path="/Contato" element={<Contato />} />
        <Route path="/Createproject" element={<Createproject />} />
      </Routes>
    </>
  );
}
