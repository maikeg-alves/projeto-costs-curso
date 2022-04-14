import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Api from "../../services/api";
import ButtonLink from "../ButtonLink";
import Loading from "../Loading";
import Modall from "../modal";
import Editproject from "./Editproject";

import styles from "./Projetos.module.css";

function Projetos() {
  const [base, setBase] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [update, setUp] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setTimeout(
      () =>
        Api.get("/posts").then((resposta) => {
          setBase(resposta.data);
          setRemoveLoading(true);
        }),
      300
    );
  }, []);

   /* remover projeto */
    function projetoRemover(id) {
      Api.delete(`/posts/${id}`)
      .then((data) => {
        setBase(base.filter((posts) => posts.id !== id))
        console.log('Projeto removido com sucesso!')
      })
    }

    function Teste(id){
       Api.get(`/posts/${id}`)
       .then((resp) => setUp([resp.data]))
       setStatus(true)
    }

    useEffect(() => {
      setUp(update)
    }, [update]);
   
  return (
    <> 
    {status ? (
      update.map((resp) => 
       
       <Editproject
       key={resp.id}
       id={resp.id}
       titulo={resp.name}
       categoria={resp.select}
       orcamento={resp.orcamento}
       total={resp.orcamento > 0 ? ( 0 ):( resp.orcamento)  }
       />

     )

    ):(
    <Container className={styles.corp_project}>
      <Row>
        <div className="d-flex navbar  align-items-center">
          <div>
            <h1 className="fs-2 fw-bold">Meus Projetos</h1>
          </div>
          <ButtonLink 
            link={'/Createproject'}
            buttonName={'Criar Projeto'}
          />
        </div>
      </Row>
      <Row>
        {base.length > 0 &&
          base.map((project) => (
            <Modall
              key={project.id}
              id={project.id}
              name={project.name}
              orc={project.orcamento}
              select={project.select}
              handleUpdate={Teste}
              handleRemove={projetoRemover}
              
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && base.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Row>
    </Container>
)}    </>
  );
}

export default Projetos;
