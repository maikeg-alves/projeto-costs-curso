import { Outlet , Link} from 'react-router-dom'
import { Container, Navbar} from 'react-bootstrap'
import logo from '../img/costs_logo.png' 
import './Navbar.css'


function NavBar(){
    return (
        <>
        
        <Navbar variant="dark" bg="dark">
            <Container>
                <Navbar.Brand className='col-5' >
                    <img src={logo}
                    width="50"
                    height="50"
                    alt=''/>
                </Navbar.Brand>
                <div className='navmenu col-5'>
                <Link to='/'> Home </Link>
                <Link to='/Projetos'> Projetos </Link>
                <Link to='/Empresa'> Empresa </Link>
                <Link to='/Contato'> Contato  </Link>                
                </div>
            </Container>
         </Navbar>
         <Outlet />
        </>
    )
}

export default NavBar