import React,{useEffect, useState} from 'react';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import Card from './../UI/Card';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch('https://react-order-app-f50a7-default-rtdb.firebaseio.com/meals.json');
      const responseData = await response.json();

      const loadedMeals = [];
      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loadedMeals);
    };
    fetchMeals();
  },[])

  const mealsList = meals.map(meal=> (
  <MealItem 
    id={meal.id}
    key={meal.id} 
    meal={meal}
    name={meal.name} 
    description={meal.description} 
    price={meal.price}/>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
     
    </section>
  );
};

export default AvailableMeals;