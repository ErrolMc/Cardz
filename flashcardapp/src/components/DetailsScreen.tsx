import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../App';

type DetailsScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Details'>;

type Props = {
  navigation: DetailsScreenNavigationProp;
};

export function DetailsScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
}); 