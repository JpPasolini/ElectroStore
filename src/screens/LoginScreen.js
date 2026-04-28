import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      const usersResponse = await axios.get('https://fakestoreapi.com/users');
      const users = usersResponse.data;

      const userExists = users.find(
        (u) => u.username === username.trim() && u.password === password.trim()
      );

      if (!userExists) {
        Alert.alert('Erro', 'Usuário ou senha inválidos.');
        setLoading(false);
        return;
      }

      await axios.post('https://fakestoreapi.com/auth/login', {
        username: username.trim(),
        password: password.trim(),
      });

      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro', 'Falha na conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>⚡ ElectroStore</Text>
        <Text style={styles.tagline}>Os melhores eletrônicos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Entrar na sua conta</Text>

        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          placeholderTextColor="#555"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#555"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#0a0a2e" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.hint}>
          Consulte os usuários disponíveis em:{'\n'}fakestoreapi.com/users
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a2e',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00d4ff',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    color: '#8888aa',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#12123a',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#00d4ff33',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 13,
    color: '#00d4ff',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1e1e4a',
    borderWidth: 1,
    borderColor: '#00d4ff44',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 15,
    color: '#fff',
  },
  button: {
    backgroundColor: '#00d4ff',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#0a0a2e',
    fontWeight: 'bold',
    fontSize: 16,
  },
  hint: {
    marginTop: 16,
    fontSize: 11,
    color: '#555577',
    textAlign: 'center',
    lineHeight: 18,
  },
});
