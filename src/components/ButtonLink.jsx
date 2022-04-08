import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function ButtonLink({link, buttonName}) {
 
    return (
        <>
         <Button className="btn-dark">
            <Link to={link}>
                  {buttonName}
            </Link>
         </Button>  
        </>
    )
}