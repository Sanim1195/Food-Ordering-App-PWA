import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';



const MealItem = (props) => {
    // formating the price so that we can have 2 decimal places and a dollar sign
    const price = `$${props.price.toFixed(2)}`;
    return (
        
        <li className={classes.meal}>
            <div>
                {/* Thr props stores the data of the list of dummy meals */}
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                {/* this id is passed from the props and matches the input with its label */}
                <MealItemForm id = {props.id} />
            </div>
        </li>
    );
}

export default MealItem;