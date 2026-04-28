import { translateToPT } from '../utils/autoTranslate';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

function formatBRL(price) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}

export default function ProductDetailScreen({ route }) {
  const { productId } = route.params;

  const [product, setProduct] = useState(null);
  const [translatedTitle, setTranslatedTitle] = useState('');
  const [translatedDescription, setTranslatedDescription] = useState('');
  const [translatedCategory, setTranslatedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );

        const data = response.data;
        setProduct(data);

        // Traduz os textos
        try {
          const titlePT = await translateToPT(data.title);
          const descPT = await translateToPT(data.description);
          const categoryPT = await translateToPT(data.category);

          setTranslatedTitle(titlePT);
          setTranslatedDescription(descPT);
          setTranslatedCategory(categoryPT);

        } catch (err) {
          console.log("Erro ao traduzir:", err);
        }

      } catch {
        Alert.alert('Erro', 'Não foi possível carregar o produto.');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00d4ff" />
        <Text style={styles.loadingText}>
          Carregando produto...
        </Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Produto não encontrado.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <View style={styles.imageCard}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.infoCard}>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {translatedCategory || product.category}
          </Text>
        </View>

        <Text style={styles.name}>
          {translatedTitle || product.title}
        </Text>

        <Text style={styles.price}>
          {formatBRL(product.price)}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.descriptionTitle}>
          Descrição
        </Text>

        <Text style={styles.description}>
          {translatedDescription || product.description}
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.ratingLabel}>
            ⭐ Avaliação:
          </Text>

          <Text style={styles.ratingValue}>
            {product.rating?.rate} ({product.rating?.count} avaliações)
          </Text>
        </View>

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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a2e',
  },

  loadingText: {
    marginTop: 12,
    color: '#00d4ff',
    fontSize: 16,
  },

  imageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 240,
  },

  infoCard: {
    backgroundColor: '#12123a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#00d4ff22',
  },

  badge: {
    backgroundColor: '#00d4ff22',
    borderWidth: 1,
    borderColor: '#00d4ff55',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },

  badgeText: {
    color: '#00d4ff',
    fontWeight: '600',
    fontSize: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    lineHeight: 25,
  },

  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 16,
  },

  divider: {
    height: 1,
    backgroundColor: '#00d4ff22',
    marginBottom: 16,
  },

  descriptionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: '#aaaacc',
    lineHeight: 22,
    marginBottom: 16,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  ratingLabel: {
    fontSize: 14,
    color: '#aaaacc',
    fontWeight: '600',
  },

  ratingValue: {
    fontSize: 14,
    color: '#ffffff',
  },
});