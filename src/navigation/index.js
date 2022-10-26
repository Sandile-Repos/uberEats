import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation, FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import RestaurantDetailsScreen from "../screens/RestaurantDetailsScreen";
import DishDetailsScreen from "../screens/DishDetailsScreen";
import BasketScreen from "../screens/BasketScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useAuthContext } from "../contexts/AuthContext";
import OrderDetailsNavigator from "./OrderDetailsNavigator";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { dbUser, loading } = useAuthContext();
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color="grey" />
      </View>
    );
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {dbUser ? (
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      ) : (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      )}
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "white" },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="list-alt" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Restaurants" component={HomeScreen} />
      <HomeStack.Screen
        name="Restaurant"
        component={RestaurantDetailsScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Dish" component={DishDetailsScreen} />
      <HomeStack.Screen name="Basket" component={BasketScreen} />
    </HomeStack.Navigator>
  );
};

const OrderStack = createNativeStackNavigator();
const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen name="Orders" component={OrdersScreen} />
      <OrderStack.Screen
        name="Order"
        component={OrderDetailsNavigator}
        screenOptions={{ headerShown: false }}
      />
    </OrderStack.Navigator>
  );
};

export default RootNavigator;
