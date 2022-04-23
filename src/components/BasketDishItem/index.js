import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import restaurants from "../../../assets/data/restaurants.json";

const BasketDishItem = ({ basketDish }) => {
  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text>1</Text>
      </View>
      <Text style={{ fontWeight: "600" }}>{basketDish.name}</Text>
      <Text style={{ marginLeft: "auto" }}>R12</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  //   page: {
  //     flex: 1,
  //     width: "100%",
  //     paddingVertical: 30, //temp fix
  //     padding: 10,
  //   },
  //   name: {
  //     fontSize: 24,
  //     fontWeight: "600",
  //     marginVertical: 10,
  //   },
  //   separator: {
  //     height: 1,
  //     backgroundColor: "lightgrey",
  //     marginVertical: 10,
  //   },
  row: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    marginTop: 20,
  },
  quantityContainer: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: 10,
  },
  //   button: {
  //     backgroundColor: "black",
  //     marginTop: "auto",
  //     padding: 20,
  //     alignItems: "center",
  //   },
  //   buttonText: {
  //     color: "white",
  //     fontWeight: "600",
  //     fontSize: 18,
  //   },
});

export default BasketDishItem;
