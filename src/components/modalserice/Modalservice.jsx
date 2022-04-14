import styled from 'styled-components';

import { TitileSerice } from "./styles/Titileservice";

export const Modalbord = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.5) ;
    margin: 20px;
`;


export default function Modalservice ({name, id, orc, descricao}){
   

return(

    <Modalbord key={id} className={`col-3 p-3`} >

      <TitileSerice>
        <h3 className="text-break">{name}</h3>
      </TitileSerice>

      <div>
        <p className='mb-2'>
          <strong>Custo total</strong> R${orc}
        </p>
      </div>
      <div className="col-auto">
          <p className='mb-2'> <strong>Descrição: </strong> </p>
          <p className="text-break">
              {descricao}
          </p>
      </div>
    </Modalbord>
)}

