import { React, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Api from "../services/api";
import Alerta from "../layout/Alert";  
import ButtonGeneric from "../layout/ButtonGeneric";

import { Form, Input, Select } from '../SmartForm/Formcomponent'


export default function Createproject() {
  /* chmando states */
  const [state, setState] = useState(false);
  const [registered, setRegister] = useState(false)
  
  if (registered === true ) {
     window.location = '/Projetos'
  }

  /* validando e upando dados para json server  */
  const onSubmit = (data) => {
    
    console.log('chegou aqui')

    const dadosprojeto = {
      name: data.name,
      orcamento: parseInt(data.orcamento),
      select: data.select,
      services: [],
      costs: 0,
    }

    if (data.name === "" || data.orcamento === "" || data.select === "") {
      setState(true);
      console.log(`dados não prencidos ${state}`);

    } else {
      
       Api.post("/posts", dadosprojeto, {
          headers: { "Content-Type": "application/json" },
         })
         .then((resposta) => {
            console.log(resposta.data);
         })
         .catch((err) => {
            console.log("Ops! ocoreu um erro menó " + err);
         });
         setRegister(true)

    }
  }

  return (
    <Container>
      <Row className="flex-column align-items-center">
        <div className="col-auto p-5">

          <div className="mt-4">
            <div className="mb-3">
              <h1 className="fs-2 fw-bold">Criar Projeto</h1>
            </div>
            <div className="mt-2">
              <p>
                Crie seu projeto para depois adicionar os <br />
                os serviços.
              </p>
            </div>
          </div>

          {/* msg de erro e redirect  */}
          {state && (
            <Alerta
              msgerro={"Erro! dados em falta"}
              msg={"Por Favor, preencha todos os dados necessários"}
            />
          )}

          {registered && console.log("cadastrou")}

          <Form onSubmit={onSubmit}>
          <Input name="name" placeholder={'insira o nome do projeto'}/>
          <Input name="orcamento" placeholder={'Insira um valor'}/>
          <Select name="select" 
          options={[
            "🟠Infra",
             "🔵Desing",
            "🟡Planejamento",
            "🟢Desenvolvimento"]}  
            />
           <ButtonGeneric
           stylebtn={"btn-dark"}
           ButtonName={'Crira Projeto'}
           />
          </Form>

        </div>
      </Row>
    </Container>
  );
}
