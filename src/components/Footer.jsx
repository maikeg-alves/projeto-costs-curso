import { Container, Row, Nav } from "react-bootstrap"
import {FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import './Footer.css'

function Footer() {
    return(
        
         <footer>
             <Nav variant="dark" bg="dark">
              <Container>
               <Row className="justify-content-center m-5">
                   <div className="col-5 d-flex justify-content-center">
                     <FaFacebook className="col-1"/> 
                     <FaInstagram  className="col-1"/>
                     <FaLinkedin  className="col-1"/>
                   </div>
               </Row>
              </Container>
             </Nav>
         </footer>

    )
}

export default Footer