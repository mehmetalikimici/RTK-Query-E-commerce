import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Basket from '../features/basket/Basket';

function Header() {
    
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-4" data-bs-theme='dark'>
      <Container>
        <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex align-items-center ms-5">
            <Nav.Link href="/">Anasayfa</Nav.Link>
            <Basket/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;