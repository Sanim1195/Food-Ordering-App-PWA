import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [sides, setSides] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    // fetchig data from database
    const fetchMeals = async () => {
      // getting response from database
      const response = await fetch(
        'https://himeals-default-rtdb.firebaseio.com/meals.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];
      //  looping through the data and storing it in loadedMeals array
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    // FETCHING DRINKS
    const fetchDrinks = async () => {
      // getting response from database
      const response = await fetch(
        'https://himeals-default-rtdb.firebaseio.com/drinks.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedDrinks = [];
      //  looping through the data and storing it in loadedDrinks array
      for (const key in responseData) {
        loadedDrinks.push({
          id: key,
          name: responseData[key].name,
          // description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setDrinks(loadedDrinks);
      setIsLoading(false);
    }
    fetchDrinks().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    // SIDES
    const fetchSides = async () => {
      // getting response from database
      const response = await fetch(
        'https://himeals-default-rtdb.firebaseio.com/sides.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedDrinks = [];
      //  looping through the data and storing it in loadedDrinks array
      for (const key in responseData) {
        loadedDrinks.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
        });
      }
      setSides(loadedDrinks);
      setIsLoading(false);
    }
    fetchSides().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    // DESSERTS
    const fetchDesserts = async () => {
      // getting response from database
      const response = await fetch(
        'https://himeals-default-rtdb.firebaseio.com/desserts.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedDrinks = [];
      //  looping through the data and storing it in loadedDrinks array
      for (const key in responseData) {
        loadedDrinks.push({
          id: key,
          name: responseData[key].name,
          // description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setDesserts(loadedDrinks);
      setIsLoading(false);
    }
    fetchDesserts().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  const drinksList = drinks.map((drink) => (
    <MealItem
      key={drink.id}
      id={drink.id}
      name={drink.name}
      // description={drink.description}
      price={drink.price}
    />
  ));

  const sidesList = sides.map((side) => (
    <MealItem
      key={side.id}
      id={side.id}
      name={side.name}
      // description={drink.description}
      price={side.price}
    />
  ));
  
  const dessertsList = desserts.map((dessert) => (
    <MealItem
      key={dessert.id}
      id={dessert.id}
      name={dessert.name}
      // description={drink.description}
      price={dessert.price}
    />
  ));



  return (
    <section className={classes.meals}>
      <Card id={"hungry"}>
        <ul>{mealsList}</ul>
      </Card>
      <h2>Sides</h2>
      <Card id={"sides"}>
        <ul>{sidesList}</ul>
      </Card>
      <h2>Drinks</h2>
      <Card id={"drinks"}>
        <ul>{drinksList}</ul>
      </Card>
      <h2>Dessert</h2>
      <Card id={"dessert"}>
        <ul>{dessertsList}</ul>
      </Card>


    </section>
  );
};

export default AvailableMeals;
