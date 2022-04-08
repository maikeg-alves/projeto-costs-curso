import { FormControl, FormGroup, Input, InputLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import ButtonGeneric from "../ButtonGeneric";

/* styles module */
import styles from "./Editproject.module.css";

export default function Editproject({ titulo, categoria, orcamento, total }) {
  
  const [editname, setName] = useState(false);
  const [servico, setServico] = useState(false);
  const { register, handleSubmit } = useForm();


  function ediprofile() {
    setName(true);
  }

  function createservice() {
    setServico(true);
  }

  const onSubmit = (data) => {console.log(data)}

  return (
    <Container className={styles.container}>
      <Row>
        {/* edit project */}
        <div className="d-flex navbar  align-items-center">
          <div>
            <h1 className={`fs-2 fw-bold ${styles.titulo}`}>{titulo}</h1>
          </div>
          <ButtonGeneric onClick={ediprofile} ButtonName={"Editar Projeto"} />
        </div>

        <div>
          <p>Categoria: {categoria}</p>

          <p>
            Total do Orçamento:<strong> R${orcamento} </strong>{" "}
          </p>

          <p>
            Total utilizado:<strong> R${total}</strong>{" "}
          </p>
        </div>

        {editname && (
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
        )}

        {/* add service */}
        <div
          className={`d-flex navbar p-3  align-items-center ${styles.servico_box}`}
        >
          <div>
            <h1 className={`fs-2 fw-bold`}>Adiconar um Serviço:</h1>
          </div>
          <ButtonGeneric onClick={createservice} ButtonName={"Adiconar Serviço"} />
        </div>
         {servico && (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor="my-input">Nome do serviço</InputLabel>
                <Input
                  {...register("servico")}
                  type="text"
                  name="servico"
                  placeholder="insira o nome do serviço"
                />
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="my-input">Descrição do Serviço</InputLabel>
                <Input
                  {...register("descricao")}
                  type="text"
                  name="descricao"
                  placeholder="Insira uma descrição do serviço"
                />
              </FormControl>
            </FormGroup>

            <Button type="submit" className="btn-dark">
              Criar serviço
            </Button>
          </Form>
         )}
 
        {/* list services */}
        <div className={`d-flex navbar  align-items-center `}>
          <div>
            <h1 className={`fs-2 fw-bold`}>Serviços:</h1>
          </div>
        </div>
        <div>
          <p>Não há serviços cadastrados</p>
        </div>
      </Row>
    </Container>
  );
}
