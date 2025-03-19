import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CardViewer } from "./components/CardViewer";
import { DeckBuilder } from "./components/DeckBuilder";
import { AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { CardViewerRoute, DeckBuilderRoute, RouteNames } from "./types/RouteNames";

// Define the type for navigation parameters
export type RootTabParamList = Record<RouteNames, undefined>;

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "CardViewer") {
              return <MaterialCommunityIcons name="cards" size={size} color={color} />;
            } else if (route.name === "DeckBuilder") {
              return <Entypo name="book" size={size} color={color} />;
            }

            return <AntDesign name="question" size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray"
        })}
      >
        <Tab.Screen
          name={CardViewerRoute}
          component={CardViewer}
          options={{ title: "Card Viewer" }}
        />
        <Tab.Screen
          name={DeckBuilderRoute}
          component={DeckBuilder}
          options={{ title: "Deck Builder" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
