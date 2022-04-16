import { FormControl, FormGroup, Input, InputLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Api from "../../services/api";
import Basevalues from "../Basevalues";
import ButtonGeneric from "../ButtonGeneric";
import Modalservice from '../modalserice/Modalservice'
import { BsFillTrashFill } from "react-icons/bs";
/* styles module */
import styles from "./Editproject.module.css";

export default function Editproject({ titulo, categoria, orcamento, total, id }) {
  const { register, handleSubmit } = useForm();

  const [barstatus, setBarstatus] = useState(false);
  const [servico, setServico] = useState(false);
  const [sentinel, setSentinel] = useState(false);
  const [sentinel2, setSentinel2] = useState(false);

  const [editproject, setEditproject] = useState([]);

  const [base, setBase] = useState([]);
  const [costs, setCoats] = useState([]);


  useEffect(() => {

    Api.get(`/posts/${id}`)
    .then((resp) => 
    setBase(resp.data.services))
    setSentinel2(true)

  },[]); // eslint-disable-line react-hooks/exhaustive-deps
  
  
  useEffect(() => {
    Api.get(`/posts/${id}`)
    .then((data)=> 
    setCoats(data.data.costs))
  },[base]) // eslint-disable-line react-hooks/exhaustive-deps
  /* buttom show input Edit Project */
  
  
  function ediprofile() {
    setBarstatus(true);
    setServico(false);
  }

  const onSubmit = (data) => {
    const article = {
      name: data.name,
      orcamento: data.orcamento - data.data.costs,
      select: data.select,
    };

    if (data.name && data.orcamento && data.select !== "") {
      console.log("dados prenchidos");
      
      Api.patch(`/posts/${id}`, article)
      .then((resp) => setEditproject([resp.data]),
       setSentinel(true));

    } else {
      console.log("valores invalidos");
    }

    setBarstatus(false);
  }

  /* buttom show input service */
  function createservice() {
    setServico(true);
    setBarstatus(false);
  }

  /* id dos serviços criados  */
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const somar = async () => {
    const converting = base.map(({ custo }) =>  parseInt(custo) );
    if (converting.length > 0 ) {

      const total = converting.reduce((total, currentValue) => total + currentValue, 0);
      
      const over =  {
        valor: total
      }
      
      Api.patch(`/posts/${id}`, { costs : [ over ]})
    }
  }



  const onSubmitService = async (data) => {

    /* dados sendo prenchidos do services */
    const service = {
      nome: data.serviconame,
      descricao: data.descricao,
      custo: data.custo,
      id: uuid(),
    };

    const dadosdoprojeto = await Api.get(`/posts/${id}`);

    const servicosexites = dadosdoprojeto.data.services;
    
    if (data.serviconame && data.descricao && data.custo !== "") {
      Api.patch("/posts/" + id, {
        services: [
          ...servicosexites,
           service
          ],
      })
      .then((resp) => 
      setBase(resp.data.services))
      
    } else {
      console.log("valores invalidos");
    }
    
    setServico(false);
  }

  function handleRemove(){

    Api.patch(`/posts/${id}`,{services: []} ) 
    .then((resp) => setBase(resp.data.services))

    Api.patch(`/posts/${id}`,{ costs: [ {valor:0} ]} ) 
    .then((resp) => setCoats(resp.data.costs))

  }

  somar()

  return (
    <Container key={id} className={styles.container}>
      <Row>
        {/* edit project */}
        {!sentinel ? (
            <Basevalues
              OdifyProject={ediprofile}
              titulo={`Projeto: ` + titulo}
              categoria={categoria}
              orcamento={orcamento}
              total={ costs.map(({valor})=> parseInt(valor))}
              />
                /* costs.length > 0 ? (
                  costs.map(({valor})=> parseInt(valor))  
                ) : ( 0 ) */
        ) : (
          editproject.map((resp) => (
            <Basevalues
              OdifyProject={ediprofile}
              titulo={`Projeto:` + resp.name}
              categoria={resp.select}
              orcamento={resp.orcamento}
              total={costs.map(({valor})=> parseInt(valor))}
            />
          ))
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

            <Button type="submit" className="btn-dark" >
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
          <ButtonGeneric
            stylebtn={'btn-dark'}
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

            <Button type="submit" className="btn-dark" onClick={somar}>
              Criar serviço
            </Button>
          </Form>
        )}

        {/* list services */}
        <div className={`d-flex navbar align-items-center `}>
          <div>
            <h1 className={`fs-2 fw-bold`}>Serviços:</h1>
          </div>
          {base.length > 0 && ( 
            <ButtonGeneric 
              stylebtn={"btn btn-danger d-flex align-items-center"}
              onClick={handleRemove} 
              ButtonName={`  Excluir Serviços`}
              icon={<BsFillTrashFill/>}
            />
          )}
        </div>

        <div className={styles.services}>
        {sentinel2 ? (
          base.map((resp) => 
           <Modalservice
            id={resp.id}
            name={resp.nome}
            orc={resp.custo}
            descricao={resp.descricao}
           /> )
          ):(
          <div>
            <p>Não há serviços cadastrados</p>
          </div>
        )}
    
        </div>
        
      </Row>
    </Container>
  );
}
