import React from "react";
import { View, Text, FlatList } from "react-native";
import OrderListItem from "../../components/OrderListItem";
import { useOrderContext } from "../../contexts/OrderContext";

const OrderScreen = () => {
  const { orders } = useOrderContext();
  return (
    <View style={{ flex: 1, width: "100%", paddingTop: 20 }}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};

export default OrderScreen;
