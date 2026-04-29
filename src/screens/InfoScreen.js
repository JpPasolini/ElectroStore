import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MEMBERS = [
  { name: 'Integrante 1 — Coloque seu nome', ra: 'RA: 000001' },
  { name: 'Integrante 2 — Coloque seu nome', ra: 'RA: 000002' },
  { name: 'Integrante 3 — Coloque seu nome', ra: 'RA: 000003' },
  { name: 'Integrante 4 — Coloque seu nome', ra: 'RA: 000004' },
];

export default function InfoScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.icon}>⚡</Text>
        <Text style={styles.appName}>ElectroStore</Text>
        <Text style={styles.appDesc}>
          Aplicativo mobile desenvolvido com React Native e Expo, consumindo dados da Fake Store API. Permite navegar por produtos eletrônicos, filtrar por categoria e visualizar detalhes de cada item.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>👨‍💻 Equipe de Desenvolvimento</Text>

      {MEMBERS.map((member, index) => (
        <View key={index} style={styles.memberCard}>
          <View style={styles.memberAvatar}>
            <Text style={styles.memberAvatarText}>{index + 1}</Text>
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberRa}>{member.ra}</Text>
          </View>
        </View>
      ))}

      <View style={styles.techCard}>
        <Text style={styles.techTitle}>🛠️ Tecnologias Utilizadas</Text>
        <Text style={styles.techItem}>• React Native + Expo</Text>
        <Text style={styles.techItem}>• JavaScript</Text>
        <Text style={styles.techItem}>• React Navigation (Stack)</Text>
        <Text style={styles.techItem}>• Axios</Text>
        <Text style={styles.techItem}>• Fake Store API</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a2e',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#12123a',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#00d4ff22',
  },
  icon: {
    fontSize: 40,
    marginBottom: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 10,
    letterSpacing: 2,
  },
  appDesc: {
    fontSize: 13,
    color: '#8888aa',
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 12,
  },
  memberCard: {
    backgroundColor: '#12123a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00d4ff22',
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memberAvatarText: {
    color: '#0a0a2e',
    fontWeight: 'bold',
    fontSize: 16,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  memberRa: {
    fontSize: 12,
    color: '#8b5cf6',
    marginTop: 2,
  },
  techCard: {
    backgroundColor: '#12123a',
    borderRadius: 16,
    padding: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#00d4ff22',
  },
  techTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 10,
  },
  techItem: {
    fontSize: 13,
    color: '#aaaacc',
    marginBottom: 6,
  },
});
