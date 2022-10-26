import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";

import OrderDetailsHeader from "./Header";
import BasketDishItem from "../../components/BasketDishItem";

import { useOrderContext } from "../../contexts/OrderContext";

const OrderDetailsScreen = ({ id }) => {
  const [order, setOrder] = useState();
  const { getOrder } = useOrderContext();

  useEffect(() => {
    getOrder(id)
      .then(setOrder)
      .catch((error) => console.log(error));
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
