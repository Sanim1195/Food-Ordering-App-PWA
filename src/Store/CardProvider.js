import CardContext from "./CardContext";



//  This component manages the card context data and provide that data to the components that need it
const CardProvider = (props) => {

    const addItemToCartHandler = (item) => {};
    const removeItemFromCartHandler = (id) => {};

    const cardContext = {
        items : [],
        totalAmount : 0,
        addItem : (item) => {},
        removeItem : (id) => {}
    }
    return(
    <CardContext.Provider> 
        {props.children}
    </CardContext.Provider>
    );  
};

export default CardProvider;