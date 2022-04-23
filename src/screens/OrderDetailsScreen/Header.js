import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import orders from "../../../assets/data/orders.json";
import styles from "./styles";

const order = orders[0];

const OrderDetailsHeader = ({ order }) => {
  return (
    <View>
      <LinearGradient
        // Button Linear Gradient
        colors={["rgba(0,0,0,0.2)", "transparent"]}
      >
        <View style={styles.page}>
          <Image
            source={{ uri: order.Restaurant.image }}
            style={styles.image}
          />
          <View style={styles.container}>
            <Text style={styles.title}>{order.Restaurant.name}</Text>
            <Text style={styles.subtitle}>
              {order.status} &#8226; 2 days ago
            </Text>
            <Text style={styles.menuTitle}>Your orders</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default OrderDetailsHeader;
