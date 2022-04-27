import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

const Header = ({ restaurant }) => {
  return (
    <LinearGradient colors={["rgba(0,0,0,0.2)", "transparent"]}>
      <View style={styles.page}>
        <Image source={{ uri: restaurant.image }} style={styles.image} />

        <View style={styles.container}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.subtitle}>
            R {restaurant.deliveryFee} &#8226; {restaurant.minDeliveryTime}-
            {restaurant.maxDeliveryTime} minutes
          </Text>
        </View>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>
    </LinearGradient>
  );
};

export default Header;
