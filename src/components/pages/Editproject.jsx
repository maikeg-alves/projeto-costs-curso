import { Container, Row } from "react-bootstrap";
import { Form, Input, Select } from "../SmartForm/Formcomponent";

import Basevalues from "../layout/Basevalues";
import ButtonGeneric from "../layout/ButtonGeneric";
import Modalservice from "../modalserice/Modalservice";
import { BsFillTrashFill } from "react-icons/bs";
/* styles module */
import Api from "../services/api";
import { useEffect, useState } from "react";

import styles from "./Editproject.module.css";

export default function Editproject({
  titulo,
  categoria,
  orcamento,
  total,
  id,
}) {

  const [showproject, setShowProject] = useState(false);
  const [showservice, setShowService] = useState(false);

  const [sentinel, setSentinel] = useState(false);
  const [sentinel2, setSentinel2] = useState(false);

  const [costs, setCosts] = useState();
  const [services, setServices] = useState([]);
  const [projeto, setProjeto] = useState([]);

  useEffect(() => {
    Api.get(`/posts/${id}`).then(
      (data) => (
        setProjeto([data.data]),
        setServices(data.data.services),
        setCosts(data.data.costs)
      )
    );

    setSentinel2(true);
  }, [costs]);

  function ediprofile() {
    setShowProject(true);
    setShowService(false);
  }

  const onSubmit = (data) => {
    const article = {
      name: data.name,
      orcamento: data.orcamento,
      select: data.select,
    };

    if (data.name && data.orcamento && data.select !== "") {
      console.log("dados prenchidos");

      Api.patch(`/posts/${id}`, article).then(
        (resp) => setProjeto([resp.data]),
        setSentinel(true)
      );
    } else {
      console.log("valores invalidos");
    }

    setShowProject(false);
  };

  /* buttom show input service */
  function createservice() {
    setShowService(true);
    setShowProject(false);
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
    const converting = services.map(({ custo }) => parseInt(custo));
    if (converting.length > 0) {
      const total = converting.reduce(
        (total, currentValue) => total + currentValue
      );

      Api.patch(`/posts/${id}`, { costs: total }).then((resp) =>
        setCosts(resp.data.costs)
      );

      return total;
    }
  };

  /* create services  */
  const onSubmitService = async (data) => {
    /* dados sendo prenchidos do services */
    const service = {
      nome: data.serviconame,
      descricao: data.descricao,
      custo: data.custo,
      id: uuid(),
    };

    const dadosdoprojeto = await Api.get(`/posts/${id}`);

    const servicoexites = dadosdoprojeto.data.services;

    if (data.serviconame && data.descricao && data.custo !== "") {
      Api.patch("/posts/" + id, {
        services: [...servicoexites, service],
      }).then((resp) => setServices(resp.data.services));
    } else {
      console.log("valores invalidos");
    }

    setShowService(false);
  };

  function handleRemove() {
    Api.patch(`/posts/${id}`, { costs: 0, services: [] }).then((resp) =>
      setServices(resp.data.services)
    );

    Api.patch(`/posts/${id}`, { costs: 0 }).then((resp) =>
      setProjeto(resp.data.costs)
    );
  }

  somar();

  return (
    <Container key={id} className={styles.container}>
      <Row>
        {/* edit project */}
        {!sentinel ? (
          <Basevalues
            OdifyProject={ediprofile}
            titulo={`Projeto: ` + titulo}
            categoria={categoria}
            orcamento={orcamento - costs}
            total={projeto.length > 0 ? costs : 0}
          />
        ) : (
          projeto.map((resp) => (
            <Basevalues
              OdifyProject={ediprofile}
              titulo={`Projeto:` + resp.name}
              categoria={resp.select}
              orcamento={resp.orcamento - costs}
              total={projeto.length > 0 ? costs : 0}
            />
          ))
        )}

        {showproject && (
          <Form onSubmit={onSubmit}>
            <Input name="name" placeholder={"insira o nome do projeto"} />
            <Input name="orcamento" placeholder={"Insira um valor"} />
            <Select
              name="select"
              options={[
                "🟠Infra",
                "🔵Desing",
                "🟡Planejamento",
                "🟢Desenvolvimento",
              ]}
            />
            <ButtonGeneric
              stylebtn={"btn-dark"}
              ButtonName={"Editar Projeto"}
            />
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
            stylebtn={"btn-dark"}
            onClick={createservice}
            ButtonName={"Adiconar Serviço"}
          />
        </div>

        {showservice && (
          <Form onSubmit={onSubmitService}>
            <Input name="serviconame" placeholder={"Nome do serviço"} />
            <Input name="custo" placeholder={"insira o valor do serviço"} />
            <Input name="descricao" placeholder={"Insira uma descrição do serviço"}/>
            
            <ButtonGeneric stylebtn={"btn-dark"} ButtonName={"Criar serviço"} />
          </Form>
        )}

        {/* list services */}
        <div className={`d-flex navbar align-items-center `}>
          <div>
            <h1 className={`fs-2 fw-bold`}>Serviços:</h1>
          </div>
          {services.length > 0 && (
            <ButtonGeneric
              stylebtn={"btn btn-danger d-flex align-items-center"}
              onClick={handleRemove}
              ButtonName={`  Excluir Serviços`}
              icon={<BsFillTrashFill />}
            />
          )}
        </div>

        <div className={styles.services}>
          {sentinel2 ? (
            services.map((services) => (
              <Modalservice
                id={services.id}
                name={services.nome}
                orc={services.custo}
                descricao={services.descricao}
              />
            ))
          ) : (
            <div>
              <p>Não há serviços cadastrados</p>
            </div>
          )}
        </div>
      </Row>
    </Container>
  );
}
