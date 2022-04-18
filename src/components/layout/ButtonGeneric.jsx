import { Button } from "react-bootstrap"

export default function ButtonGeneric({ButtonName,type, onClick,icon, stylebtn}) {
    return (
        <>
          <Button className={stylebtn} type={type} onClick={onClick}>
                     {icon}
                    {ButtonName}
          </Button>
        </>
    )
}