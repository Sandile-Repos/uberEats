import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import BasketDishItem from "../../components/BasketDishItem";
import { useBasketContext } from "../../contexts/BasketContext";
import { useOrderContext } from "../../contexts/OrderContext";

const BasketScreen = () => {
  const { restaurant, basketDishes, totalPrice } = useBasketContext();
  const { createOrder } = useOrderContext();
  const navigation = useNavigation();

  const onCreateOrder = async () => {
    const newOrder = await createOrder();
    navigation.navigate("OrdersTab", {
      screen: "OrderDetails",
      params: { id: newOrder.id },
    });
  };
  return (
    <View style={styles.page}>
      <Text style={styles.name}>{restaurant?.name}</Text>

      <Text style={styles.itemTitle}>Your items</Text>

      <FlatList
        data={basketDishes}
        renderItem={({ item }) => <BasketDishItem basketDish={item} />}
      />

      <View style={styles.separator} />

      <Pressable onPress={onCreateOrder} style={styles.button}>
        <Text style={styles.buttonText}>
          Create Order &#8226; R{totalPrice.toFixed(2)}
        </Text>
      </Pressable>
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
    fontSize: 19,
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
