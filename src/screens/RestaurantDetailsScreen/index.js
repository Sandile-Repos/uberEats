import { View, FlatList, Text } from "react-native";
import restaurants from "../../../assets/data/restaurants.json";
import DishListItem from "../../components/DishListItem";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Header";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
const restaurant = restaurants[0];

const RestaurantDetailsScreen = () => {
  const route = useRoute();
  const id = route.params.id;
  const navigation = useNavigation();

  console.warn(id);
  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        data={restaurant.dishes}
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
