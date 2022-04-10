import { React, useState } from "react";
import { Container, Row, Form, Button,  } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Api from "../../services/api";
import Alerta from "../Alert";
import { Input, InputLabel, FormControl, FormGroup} from "@material-ui/core";

export default function Createproject() {
  /* chmando states */
  const { register, handleSubmit } = useForm();
  const [state, setState] = useState(false);
  const [registered, setRegister] = useState(false)
  
  if (registered === true ) {
     window.location = '/Projetos'
  }

  /* validando e upando dados para json server  */
  const onSubmit = (data) => {

    if (data.name === "" || data.orcamento === "" || data.select === "") {
      setState(true);
      console.log(`dados não prencidos ${state}`);

    } else {
      data.services = []
      
       Api
       .post("/posts", data, {
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
  };

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

          <Form onSubmit={handleSubmit(onSubmit)}>

            <FormGroup>
              <FormControl>
                <InputLabel htmlFor="my-input">Nome do Projeto</InputLabel>
                <Input
                  {...register("name")}
                  type="text"
                  name="name"
                  placeholder="insira o nome do projeto"
                />
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="my-input">Orçamento do Projeto</InputLabel>
                <Input
                  {...register("orcamento")}
                  type="number"
                  name="orcamento"
                  placeholder="Insira um valor"
                />
              </FormControl>
            </FormGroup>

            <Form.Group className="mb-3">
              <Form.Label>
                Selecione a Categoria
                <Form.Select {...register("select")}>
                  <option value=""> Selecione uma opção</option>
                  <option value="🟠Infra"> Infra</option>
                  <option value="🟢Desenvolvimento">Desenvolvimento</option>
                  <option value="🔵Desing"> Desing</option>
                  <option value="🟡Planejamento"> Planejamento</option>
                </Form.Select>
              </Form.Label>
            </Form.Group>

            <Button type="submit" className="btn-dark">
              Crira Projeto
            </Button>
          </Form>

        </div>
      </Row>
    </Container>
  );
}
