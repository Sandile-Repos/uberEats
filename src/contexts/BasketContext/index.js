import { DataStore } from "aws-amplify";
import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "../AuthContext";
import { Basket, BasketDish } from "../../models";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();

  const [restaurant, setRestaurant] = useState(null);
  const [basket, setBasket] = useState(null);
  const [basketDishes, setBasketDishes] = useState([]);

  const totalPrice = basketDishes.reduce(
    (sum, basketDish) => sum + basketDish.quantity * basketDish.Dish.price,
    restaurant?.deliveryFee
  );

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    DataStore.query(Basket, (b) =>
      b.restaurantID("eq", restaurant.id).userID("eq", dbUser.id)
    )
      .then((baskets) => setBasket(baskets[0]))
      .catch((error) => console.log(error));
  }, [dbUser, restaurant]);

  useEffect(() => {
    if (basket) {
      DataStore.query(BasketDish, (bd) => bd.basketID("eq", basket.id))
        .then(setBasketDishes)
        .catch((error) => console.log(error));
      console.log("Hello basket dishes: ", basket);
    }
  }, [basket]);

  const addDishToBasket = async (dish, quantity) => {
    let theBasket = basket || (await createNewBasket());

    // create a BasketDish item and save to Datastore
    try {
      const newDish = await DataStore.save(
        new BasketDish({ quantity, Dish: dish, basketID: theBasket.id })
      );
      setBasketDishes([...basketDishes, newDish]);
      console.log(basketDishes);
    } catch (error) {
      console.log(error);
    }
  };
  const createNewBasket = async () => {
    try {
      const newBasket = await DataStore.save(
        new Basket({ userID: dbUser.id, restaurantID: restaurant.id })
      );
      setBasket(newBasket);
      return newBasket;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BasketContext.Provider
      value={{
        addDishToBasket,
        setRestaurant,
        restaurant,
        basket,
        basketDishes,
        totalPrice,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
