import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";

import OrderDetailsHeader from "./Header";
import BasketDishItem from "../../components/BasketDishItem";

import { useRoute } from "@react-navigation/native";
import { useOrderContext } from "../../contexts/OrderContext";

const OrderDetailsScreen = () => {
  const [order, setOrder] = useState();
  const { getOrder } = useOrderContext();
  const route = useRoute();
  const id = route.params?.id;

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, []);

  if (!order) {
    return <ActivityIndicator size={"large"} color={"grey"} />;
  }
  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
      data={order.dishes}
      renderItem={({ item }) => <BasketDishItem basketDish={item} />}
    />
  );
};

export default OrderDetailsScreen;
