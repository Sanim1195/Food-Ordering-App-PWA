import classes from './Cart.module.css';
import Modal from '../UI/Modal';

// Cart component is a modal component taking in props from the CartButton component that shows the items in the cart
const Cart = (props) => {
    // cartItems is an array of objects that contains the items in the cart and we map through it to display the items in the cart
    const cartItems = <ul className={classes['cart-items']}>{[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map(item => <li>{item.name}</li>)} </ul>;
    
    // The modal component is a reusable component that takes in props and displays the items in the cart
    return (<Modal onClose = {props.onClose}>
        {cartItems}
        <div className={classes.total} >
            <span>Total Amount</span>
            <span>35.62</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            <button className={classes.button}>Order</button>
        </div>
    </Modal>);

    
}

export default Cart;