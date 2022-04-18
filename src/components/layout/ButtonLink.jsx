import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function ButtonLink({link,icon, handleStatus, buttonName}) {
    
    const Overclick = (e) => {
        e.preventDefault();
        handleStatus(e)
    }
 
    return (
        <>
         <Button className="btn-dark" onClick={Overclick} >
            <Link to={link} >
                  {icon}
                  {buttonName}
            </Link>
         </Button>  
        </>
    )
}