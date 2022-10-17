import { useState, useEffect, ActivityIndicator } from "react";
import { StyleSheet, FlatList } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import { DataStore } from "aws-amplify";
import { Restaurant } from "../../models";

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);

  // const fetchRestaurants = async () => {
  //   const results = await DataStore.query(Restaurant);
  //   setRestaurants(results);
  // };

  useEffect(() => {
    // fetchRestaurants();
    DataStore.query(Restaurant).then(setRestaurants);
  }, []);

  if (!restaurants) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }
  return (
    <FlatList
      data={restaurants}
      renderItem={({ item }) => <RestaurantItem restaurant={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({});
