import { useState, useEffect, ActivityIndicator } from "react";
import { StyleSheet, FlatList } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import { DataStore } from "aws-amplify";
import { Restaurant } from "../../models";

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    DataStore.query(Restaurant)
      .then(setRestaurants)
      .catch((error) => console.log(error));
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
