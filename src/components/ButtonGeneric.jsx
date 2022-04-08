import { Button } from "react-bootstrap"

export default function ButtonGeneric({ButtonName, onClick}) {
    return (
        <>
          <Button className="btn-dark" onClick={onClick}>
                    {ButtonName}
          </Button>
        </>
    )
}