import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../App";

type DeckBuilderNavigationProp = BottomTabNavigationProp<RootTabParamList, "DeckBuilder">;

type Props = {
  navigation: DeckBuilderNavigationProp;
};

export function DeckBuilder({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Deck Builder</Text>
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
