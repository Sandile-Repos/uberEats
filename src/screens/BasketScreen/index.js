import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BasketDishItem from "../../components/BasketDishItem";
import restaurants from "../../../assets/data/restaurants.json";
const restaurant = restaurants[0];

const BasketScreen = () => {
  return (
    <View style={styles.page}>
      <Text style={styles.name}>{restaurant.name}</Text>

      <Text style={styles.itemTitle}>Your items</Text>

      <FlatList
        data={restaurant.dishes}
        renderItem={({ item }) => <BasketDishItem basketDish={item} />}
      />

      <View style={styles.separator} />

      <View style={styles.button}>
        <Text style={styles.buttonText}>Create Order</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 30, //temp fix
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  itemTitle: {
    fontWeight: "bold",
    marginTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default BasketScreen;
