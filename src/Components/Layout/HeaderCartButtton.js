import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCart.module.css';


const HeaderCartButton = (props) => {
    return <button className={classes.button} onClick={props.onClick} >
    <span classes = {classes.CartIcon}>
        <CartIcon />
    </span>
    <span>
        Your Cart
    </span>
    <span className={classes.badge}>
        3/Items
    </span>

    </button>
}


export default HeaderCartButton;