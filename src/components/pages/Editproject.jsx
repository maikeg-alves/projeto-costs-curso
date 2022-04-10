import { FormControl, FormGroup, Input, InputLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Api from "../../services/api";
import Basevalues from "../Basevalues";
import ButtonGeneric from "../ButtonGeneric";

/* styles module */
import styles from "./Editproject.module.css";

export default function Editproject({titulo, categoria, orcamento, total, id }) {

  const [barstatus, setBarstatus] = useState(false);
  const [servico, setServico] = useState(false);
  const [sentinel, setSentinel] = useState(false);

  const [editproject, setEditproject] = useState([]);
  const { register, handleSubmit } = useForm();

  const [addservice, setAddservice] = useState([{}]);


  const [totalvalue, setTotalvalue] = useState(0)
  
  /* Edit Project */
  function ediprofile() {
    setBarstatus(true);
    setServico(false)
  }

  const onSubmit = (data) => {

    const article = {
      name: data.name,
      orcamento: data.orcamento,
      select: data.select,
      services: [ ]
    };
    
    if (data.name && data.orcamento && data.select !== "") {
      
      console.log("dados prenchidos");
      Api.put(`/posts/${id}`, article)
      .then((resp) =>
      setEditproject([resp.data]), 
      setSentinel(true)
      );

      Api.patch(`/posts/${id}`, data.services, { teste: 'teste' })

    } else {
      console.log("valores invalidos");
    }
    
    
    
    setBarstatus(false)
  };

  /* CREATE SERVICE */

  function createservice() {
    setServico(true);
    setBarstatus(false);
  }

  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g
     ,(c) => {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
   })};

  const onSubmitService = async (data) => {

    const service = { 
      nome: data.serviconame,
      descricao: data.descricao,
      custo: data.custo,
      id: uuid()
    }

    const dadosdoprojeto = await Api.get(`/posts/${id}`)

    const servicosexite = dadosdoprojeto.data.services

    if (data.serviconame && data.descricao && data.custo !== "") {
      
        Api.patch('/posts/'+id, {
          services: [
            ...servicosexite,
            service
          ]
        })
        
    }else{
      console.log("valores invalidos");
    }

  }
  
  useEffect(() => {
      setEditproject(editproject)
  }, [editproject])

  return (
    <Container key={id} className={styles.container}>
      <Row>
        {/* edit project */}
      {!sentinel ? ( 
          <>
              <Basevalues 
              OdifyProject={ediprofile}
              titulo={`Projeto: `+ titulo}
              categoria={categoria} 
              orcamento={orcamento} 
              total={totalvalue} 
              />  
          </>
         ):( 
          editproject.map(
            (resp) => 
              <Basevalues 
              OdifyProject={ediprofile}
              titulo={`Projeto:`+ resp.name}
              categoria={resp.select} 
              orcamento={resp.orcamento} 
              total={totalvalue} 
              />   
              )
         )} 
        {barstatus && (
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

        <div className={`d-flex navbar p-3  align-items-center ${styles.servico_box}`}>
          <div>
            <h1 className={`fs-2 fw-bold`}>Adiconar um Serviço:</h1>
          </div>
          <ButtonGeneric
            onClick={createservice}
            ButtonName={"Adiconar Serviço"}
          />
        </div>

        {servico && (
          <Form onSubmit={handleSubmit(onSubmitService)}>
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor="my-input">Nome do serviço</InputLabel>
                <Input
                  {...register("serviconame")}
                  type="text"
                  name="serviconame"
                  placeholder="insira o nome do serviço"
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="my-input">Custo do serviço</InputLabel>
                <Input
                  {...register("custo")}
                  type="number"
                  name="custo"
                  placeholder="insira o valor do serviço"
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
