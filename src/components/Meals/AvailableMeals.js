import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect } from "react";
import { useState } from "react";

const AvailableMeals = ()=>{
  const [meals , setMeals]=useState([]);
  const [isLoading , setIsLoading] = useState(true);
  const [httpError , setHttpError] = useState(null);
  const fetchMeals = async ()=>{
    const response = await fetch('https://c-hook-default-rtdb.firebaseio.com/meals.json');

    if(!response.ok){
      throw new Error("Something is Wrong");
    }
    const data = await response.json();

    const loadedMeals = [];
    for(const key in data){
      loadedMeals.push({
        id:key,
        name:data[key].name,
        describe:data[key].description,
        price:data[key].price
      });
    }
    setMeals(loadedMeals);
    setIsLoading(false);
  }


  useEffect(()=>{
      fetchMeals().catch(error=>{
        setIsLoading(false);
        setHttpError(error.message);
      });
    
  },[]);

  
  if(isLoading){
    return <section className={classes.MealsLoading}>
      <p>Loading....</p>
    </section>
  }
  if(httpError){
    return <section className={classes.MealsError}>
    {httpError}
  </section>
  }



    const mealsList = meals.map(meal => <MealItem key ={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>);
    return (
        <section className={classes.meals}>
        <Card>
        <ul>
            {mealsList}
        </ul>
        </Card>
        </section>
           
    )

}
export default AvailableMeals;