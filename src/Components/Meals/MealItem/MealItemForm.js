import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

// A form is a component that is used to collect user input or the number of food they want to order
const MealItemForm = (props) => {
    return (
        <form className={classes.form}>
            <Input label="Amount" input ={{
                id: 'amount'+ props.id,
                type: 'number',
                // Minimum value of the input
                min: '1',
                // Maximum value of the input
                max: '5',
                // Step value of the input
                step: '1',
                // initial value of the input
                defaultValue: '1'

            }} />
            <button> Add</button>
        </form>


    );
}

export default MealItemForm;