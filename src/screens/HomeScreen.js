import { translateToPT } from '../utils/autoTranslate';
import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';

const CATEGORIES = ['Eletrônicos', 'Jóias', "Roupas Masculinas", "Roupas Femininas"];

function formatBRL(price) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchProducts = useCallback(async (category) => {
    setLoading(true);

    try {
      const url = category
        ? `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
        : 'https://fakestoreapi.com/products';

      const response = await axios.get(url);
      const data = response.data;


      const translatedProducts = await Promise.all(
        data.map(async (item) => {
          try {
            const translatedTitle = await translateToPT(item.title);

            return {
              ...item,
              translatedTitle,
            };

          } catch (error) {
            console.log("Erro ao traduzir:", error);

            return {
              ...item,
              translatedTitle: item.title,
            };
          }
        })
      );

      setProducts(translatedProducts);

    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory, fetchProducts]);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('ProductDetail', { productId: item.id })
        }
      >
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="contain"
        />

        <View style={styles.cardInfo}>
          <Text
            style={styles.productName}
            numberOfLines={2}
          >
            {item.translatedTitle || item.title}
          </Text>

          <Text style={styles.productPrice}>
            {formatBRL(item.price)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

          <TouchableOpacity
            style={[
              styles.filterBtn,
              selectedCategory === null && styles.filterBtnActive
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === null && styles.filterTextActive
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>

          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterBtn,
                selectedCategory === cat && styles.filterBtnActive
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === cat && styles.filterTextActive
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}

        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00d4ff" />
          <Text style={styles.loadingText}>
            Carregando produtos...
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a2e',
  },

  filterContainer: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#12123a',
    borderBottomWidth: 1,
    borderBottomColor: '#00d4ff22',
  },

  filterBtn: {
    borderWidth: 1,
    borderColor: '#00d4ff55',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    backgroundColor: '#1e1e4a',
  },

  filterBtnActive: {
    backgroundColor: '#00d4ff',
    borderColor: '#00d4ff',
  },

  filterText: {
    color: '#00d4ff',
    fontWeight: '600',
    fontSize: 13,
  },

  filterTextActive: {
    color: '#0a0a2e',
  },

  list: {
    padding: 12,
  },

  row: {
    justifyContent: 'space-between',
  },

  card: {
    backgroundColor: '#12123a',
    borderRadius: 14,
    marginBottom: 14,
    width: '48%',
    borderWidth: 1,
    borderColor: '#00d4ff22',
    overflow: 'hidden',
  },

  productImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#fff',
  },

  cardInfo: {
    padding: 10,
  },

  productName: {
    fontSize: 12,
    color: '#ccccee',
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 17,
  },

  productPrice: {
    fontSize: 14,
    color: '#00d4ff',
    fontWeight: 'bold',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    color: '#00d4ff',
    fontSize: 15,
  },
});