import { Button } from "react-bootstrap"

export default function ButtonGeneric({ButtonName, onClick,icon, stylebtn}) {
    return (
        <>
          <Button className={stylebtn} onClick={onClick}>
                     {icon}
                    {ButtonName}
          </Button>
        </>
    )
}