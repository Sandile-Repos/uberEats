import { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import DishListItem from "../../components/DishListItem";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Header";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Restaurant, Dish } from "../../models";

const RestaurantDetailsScreen = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  const id = route.params.id;

  useEffect(() => {
    // fetch the restaurants with the id
    DataStore.query(Restaurant, id).then(setRestaurant);
    DataStore.query(Dish, (dish) => dish.restaurantID("eq", id)).then(
      setDishes
    );
  }, []);

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
    </View>
  );
};

export default RestaurantDetailsScreen;
