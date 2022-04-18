import { Button } from "react-bootstrap";
import styles from "./modal.module.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

export default function Modal({
  name,
  orc,
  id,
  select,
  handleRemove,
  handleUpdate,
}) {
  const deleteposty = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  function update(e) {
    e.preventDefault();
    handleUpdate(id);
  }

  return (
    <div key={id} className={`col-auto p-3 ${styles.style_modal}`}>
      <div className={`${styles.backgroud}`}>
        <h3 className="text-break">{name}</h3>
      </div>
      <div>
        <p>
          <strong>Custo total</strong> R${orc}
        </p>
      </div>
      <div>
        <p>{select}</p>
      </div>
      <div className="hstack gap-3">

      <Button onClick={update} className="btn-dark btn-primary">
          <BsPencil className="me-2" /> Editar
        </Button>

        <Button onClick={deleteposty} className="btn-dark btn-primary">
          <BsFillTrashFill className="me-2" />
          Deletar
        </Button>
      </div>
    </div>
  );
}
