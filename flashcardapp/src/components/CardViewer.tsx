import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../App";

type CardViewerNavigationProp = BottomTabNavigationProp<RootTabParamList, "CardViewer">;

type Props = {
  navigation: CardViewerNavigationProp;
};

export function CardViewer({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Welcome to FlashCard App!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  }
});
