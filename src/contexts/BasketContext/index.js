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
    DataStore.query(Basket, (b) =>
      b.restaurantID("eq", restaurant.id).userID("eq", dbUser.id)
    ).then((baskets) => setBasket(baskets[0]));
  }, [dbUser, restaurant]);

  useEffect(() => {
    if (basket) {
      DataStore.query(BasketDish, (bd) => bd.basketID("eq", basket.id)).then(
        setBasketDishes
      );
    }
  }, [basket]);

  const addDishToBasket = async (dish, quantity) => {
    // let theBasket;
    // // get the existing basket or create a new one
    // if (!basket) {
    //   theBasket = await createNewBasket();
    // } else {
    //   theBasket = basket;
    // }
    let theBasket = basket || (await createNewBasket());

    // create a BasketDish item and save to Datastore
    const newDish = await DataStore.save(
      new BasketDish({ quantity, Dish: dish, basketID: theBasket.id })
    );
    setBasketDishes([...basketDishes, newDish]);
  };
  const createNewBasket = async () => {
    // DataStore.save(
    //   new Basket({ userID: dbUser.id, restaurantID: restaurant.id })
    // ).then(setBasket);
    const newBasket = await DataStore.save(
      new Basket({ userID: dbUser.id, restaurantID: restaurant.id })
    );
    setBasket(newBasket);
    return newBasket;
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
