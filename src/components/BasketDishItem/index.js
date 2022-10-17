import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import restaurants from "../../../assets/data/restaurants.json";

const BasketDishItem = ({ basketDish }) => {
  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text>{basketDish.quantity}</Text>
      </View>
      <Text style={{ fontWeight: "600" }}>{basketDish.Dish.name}</Text>
      <Text style={{ marginLeft: "auto" }}>R {basketDish.Dish.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  quantityContainer: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: 10,
  },
});

export default BasketDishItem;
