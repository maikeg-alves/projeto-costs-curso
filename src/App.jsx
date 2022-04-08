import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap"
import BemVindo from '../src/img/savings.svg' 

import './App.css'

function App() {

    return (

    <div className="App">
        <Container>
            <Row>
          
                <div className="col-12 ">
                   <h1 className="d-flex justify-content-center mt-5 fw-bold fs-1">Bem-vindo ao <p className="coats ms-2">Coats</p></h1>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <h3 className="fs-4">Comece a gerenciar seus projetos agrora mesmo!</h3>
                </div>
                <div className="d-flex justify-content-center mt-3">
                <Button className="btn-dark">
                    <Link to='/Createproject'>Criar Projeto</Link>
                 </Button>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <img src={BemVindo} alt=''/>
                </div>

            </Row>
        </Container>
    <Outlet/>
    </div>

  );
}

export default App;
