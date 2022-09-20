import { Fragment,useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";

// Important: The <main> tag is used to group the content of the body of a document, that is, the content that is not the header, footer or navigation menu.


function App() { 
  const [cartIsShown,setCartIsShown] = useState(false);
  
// Funcction that shows the cart items
  const showCartHandler = () => {
    setCartIsShown(true);
  };

// Function that is called when the close button is clicked
  const hideCartHandler = () => {
    setCartIsShown(false);
  };




  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart = {showCartHandler}/>
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
