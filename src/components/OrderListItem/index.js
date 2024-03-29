import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const OrderListItem = ({ order }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Order", { id: order.id });
  };
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: order?.Restaurant?.image }}
          style={styles.image}
        />
        <View style={styles.order}>
          <Text style={styles.name}>{order?.Restaurant?.name}</Text>
          <Text style={styles.price}>3 items &#8226; R56.40</Text>
          <Text style={styles.status}>
            {order?.Restaurant?.updatedAt} &#8226; {order?.status}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "lightgrey",
          marginBottom: 10,
          marginLeft: 10,
        }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    width: 75,
    height: 75,
    marginLeft: 5,
  },
  order: {
    paddingLeft: 10,
  },
  name: {
    fontSize: 16,
    color: "black",
  },
  price: {
    marginTop: 5,
    color: "grey",
  },
  status: {
    marginVertical: 5,
    color: "grey",
  },
});

export default OrderListItem;
