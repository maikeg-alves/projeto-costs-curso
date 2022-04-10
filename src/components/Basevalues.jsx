import ButtonGeneric from "./ButtonGeneric";
import Titile from "./TitileStyled";

export default function Basevalues({categoria, orcamento, OdifyProject, titulo, total}) {

   function Odify(e){
     OdifyProject(e)
   }

  return (
    <>
       <div className="d-flex navbar  align-items-center">
          <div>
            <Titile className="fs-2 fw-bold"> {titulo} </Titile>
          </div>
          <ButtonGeneric onClick={Odify} ButtonName={"Editar Projeto"} />
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
    </>
  );
}