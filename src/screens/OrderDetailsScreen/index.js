import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import orders from "../../../assets/data/orders.json";
import restaurant from "../../../assets/data/restaurants.json";
import styles from "./styles";
import OrderDetailsHeader from "./Header";
import BasketDishItem from "../../components/BasketDishItem";
const order = orders[0];

const OrderDetailsScreen = () => {
  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
      data={restaurant[0].dishes}
      renderItem={({ item }) => <BasketDishItem basketDish={item} />}
    />
  );
};

export default OrderDetailsScreen;
