import { Fragment, useState } from 'react';
import { Container } from 'react-bootstrap';
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import { FaHamburger } from 'react-icons/fa';
import Modal from '../UI/Modal';
import SignUp from './SignUp';
import { AuthProvider, useAuth } from '../../store/auth-context';
import { useHistory } from "react-router-dom"
import { Link } from 'react-scroll';

const Header = (props) => {
  const [error, setError] = useState("")
  const [showSignInpage, setShowSignInPage] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const { currentUser, logout } = useAuth();
  const history = useHistory();



  const closeHandler = () => {
    setShowSignInPage(false);
  }

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }

  if (showSignInpage === true) {
    return (
      <AuthProvider>

        <Container className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <SignUp onClose={closeHandler} />
          </div>

        </Container>
      </AuthProvider>
    )
  }


  const showSignIn = () => {
    setShowSignInPage(true);

  };


  const navBarhandler = () => {
    setNavbar(false);

  };

 const  openSideNav = () => {
setNavbar(true);
 }

 if(navbar){
  
    return (
      <>
        <Modal onClose = {navBarhandler} cssClassName = 'sideNav-container' >
          <nav className={classes['sideNav-container']} >
            <div className={classes['login-logout-button']}>
              {/* if user is signed in show signup button or logout button */}
              {currentUser ?
                <>
                  <button  className = {classes.button} onClick={handleLogout}> Logout</button>
                  <p>Welcome back!!</p>
                  
                </>
                : <button  className = {classes.button} onClick={showSignIn}> SignIn</button>}
            </div>
            <ul className={classes.navbarLinksContainer}>
              <li>
                <Link  to="hungry"  spy={true} smooth={true} offset={-110} duration={500}>Hungry</Link>
              </li>
              <li>
                <Link to="sides" spy={true} smooth={true} offset={50} duration={500}>Sides</Link>
              </li>

              <li>
                <Link to="drinks" spy={true} smooth={true} offset={50} duration={500}>Drinks</Link>

              </li>
              <li>
                <Link to="dessert" spy={true} smooth={true} offset={50} duration={500}>Dessert</Link>
              </li>
            </ul>

          </nav>
        </Modal>
      </>
    );
  }





  return (
    <Fragment>

      <header className={classes.header}>
        {/* on click opens the modal navbar */}
        <div className={classes.hamburger}>
          <FaHamburger size ={27} onClick = {openSideNav}/>
        </div>
        <h1>HiMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>

    </Fragment>
  );
};

export default Header;
