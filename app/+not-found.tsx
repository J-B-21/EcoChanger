import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen does not exist.</ThemedText>
        <Link href="/(tabs)/HomeScreen" style={styles.link}>
            <ThemedText type="link" onPress={() => navigation.navigate('WelcomeScreen')}>
            Go to welcome screen!
            </ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});