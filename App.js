import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import InfoScreen from './src/screens/InfoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0a0a2e' },
          headerTintColor: '#00d4ff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Produtos',
            headerLeft: () => (
              <TouchableOpacity
                style={styles.headerBtn}
                onPress={() => navigation.replace('Login')}
              >
                <Text style={styles.headerBtnText}>Logout</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerBtn}
                onPress={() => navigation.navigate('Info')}
              >
                <Text style={styles.headerBtnText}>Informações</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'Detalhes do Produto' }}
        />
        <Stack.Screen
          name="Info"
          component={InfoScreen}
          options={{ title: 'Informações do Grupo' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerBtn: {
    marginHorizontal: 12,
    backgroundColor: '#00d4ff22',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00d4ff',
  },
  headerBtnText: {
    color: '#00d4ff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
