
import Card from '../UI/Cards';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];
const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map(meal => (
    <MealItem
      // The key is a special string attribute you need to include when creating lists of elements
      // The Id is a unique identifier for each meal which matches the label with the input 
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}

    />
  ));


  return <section className={classes.meals}>
    <Card>
      <ul>
        {mealsList}
      </ul>
    </Card>
  </section>
}


export default AvailableMeals;