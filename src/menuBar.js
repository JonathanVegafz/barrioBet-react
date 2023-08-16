import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './menuBar.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'reactstrap';
export const MenuBar = () => {
  // const history = useHistory();

  useEffect(() => {
    // Función para manejar la animación de la barra horizontal
    const handleNavbarAnimation = () => {
      var tabsNewAnim = document.getElementById('navbarSupportedContent');
      //var selectorNewAnim = document.getElementById('navbarSupportedContent').querySelectorAll('li').length;
      var activeItemNewAnim = tabsNewAnim.querySelector('.active');
      var activeWidthNewAnimHeight = activeItemNewAnim.offsetHeight;
      var activeWidthNewAnimWidth = activeItemNewAnim.offsetWidth;
      var itemPosNewAnimTop = activeItemNewAnim.offsetTop;
      var itemPosNewAnimLeft = activeItemNewAnim.offsetLeft;
      var horiSelector = document.querySelector('.hori-selector');

      horiSelector.style.height = activeWidthNewAnimHeight + 'px';
      horiSelector.style.width = activeWidthNewAnimWidth + 'px';
      horiSelector.style.top = itemPosNewAnimTop + 'px';
      horiSelector.style.left = itemPosNewAnimLeft + 'px';
    };

    // Activar animación al cargar y al redimensionar la ventana
    handleNavbarAnimation();
    window.addEventListener('resize', handleNavbarAnimation);
    
    return () => {
      window.removeEventListener('resize', handleNavbarAnimation);
    };
  }, []);

  // Agregar clase activa al enlace en la página actual
  const handleActiveLink = () => {
    const path = window.location.pathname;
    const links = document.querySelectorAll('#navbarSupportedContent ul li a');

    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (path.includes(href)) {
        link.parentNode.classList.add('active');
      } else {
        link.parentNode.classList.remove('active');
      }
    });
  };

  useEffect(() => {
    handleActiveLink();
  }, []);

  return (
    <Navbar expand="md" className="navbar-mainbg">
      <Navbar.Brand as={NavLink} to="/" className="navbar-logo">
        Navbar
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent">
        <i className="fas fa-bars text-white"></i>
      </Navbar.Toggle>
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="ml-auto">
          <div className="hori-selector">
            <div className="left"></div>
            <div className="right"></div>
          </div>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/dashboard">
              <i className="fas fa-tachometer-alt"></i>Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/address-book">
              <i className="far fa-address-book"></i>Address Book
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/components">
              <i className="far fa-clone"></i>Components
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/calendar">
              <i className="far fa-calendar-alt"></i>Calendar
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/charts">
              <i className="far fa-chart-bar"></i>Charts
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/documents">
              <i className="far fa-copy"></i>Documents
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
