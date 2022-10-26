import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";
import DishListItem from "../../components/DishListItem";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Header";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Restaurant, Dish } from "../../models";
import { useBasketContext } from "../../contexts/BasketContext";

const RestaurantDetailsScreen = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  const id = route.params?.id;

  const {
    setRestaurant: setBasketRestaurant,
    basket,
    basketDishes,
  } = useBasketContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    //setBasketRestaurant of previous restaurant to null before querying another restaurant
    setBasketRestaurant(null);
    // fetch the restaurants with the id
    DataStore.query(Restaurant, id)
      .then(setRestaurant)
      .catch((error) => console.log(error));
    DataStore.query(Dish, (dish) => dish.restaurantID("eq", id))
      .then(setDishes)
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    //passing restaurant to Basket context so we can get the restaurant id when adding to the basket
    setBasketRestaurant(restaurant);
  }, [restaurant]);

  if (!restaurant) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }
  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        data={dishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DishListItem dish={item} />}
      />
      <Ionicons
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
        onPress={() => navigation.goBack()}
      />
      {basket && (
        <Pressable
          onPress={() => navigation.navigate("Basket")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Open basket ({basketDishes.length})
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RestaurantDetailsScreen;
