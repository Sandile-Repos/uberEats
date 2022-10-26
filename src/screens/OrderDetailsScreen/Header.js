import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";

const OrderDetailsHeader = ({ order }) => {
  console.log(order);
  const DEFAULT_IMAGE =
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant4.jpeg";
  return (
    <View>
      <LinearGradient
        // Button Linear Gradient
        colors={["rgba(0,0,0,0.2)", "transparent"]}
      >
        <View style={styles.page}>
          <Image
            source={{
              uri: order?.Restaurant?.image.startsWith("http")
                ? order?.Restaurant?.image
                : DEFAULT_IMAGE,
            }}
            style={styles.image}
          />
          <View style={styles.container}>
            <Text style={styles.title}>{order?.Restaurant?.name}</Text>
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
