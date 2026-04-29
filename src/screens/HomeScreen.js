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

/* 🔥 MAPEAMENTO CORRETO DAS CATEGORIAS */
const CATEGORIES = [
  { label: 'Eletrônicos', value: 'electronics' },
  { label: 'Jóias', value: 'jewelery' },
  { label: 'Roupas Masculinas', value: "men's clothing" },
  { label: 'Roupas Femininas', value: "women's clothing" },
];

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

  /* 🔥 BUSCAR PRODUTOS */
  const fetchProducts = useCallback(async (category) => {
    setLoading(true);

    try {
      const url = category
        ? `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
        : 'https://fakestoreapi.com/products';

      const response = await axios.get(url);
      const data = response.data;

      /* 🔥 TRADUZIR TITULOS AUTOMATICAMENTE */
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

  /* 🔥 CARD PRODUTO */
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
          <Text style={styles.productName} numberOfLines={2}>
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
      
      {/* 🔥 FILTROS */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

          {/* TODOS */}
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

          {/* CATEGORIAS */}
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.value}
              style={[
                styles.filterBtn,
                selectedCategory === cat.value && styles.filterBtnActive
              ]}
              onPress={() => setSelectedCategory(cat.value)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === cat.value && styles.filterTextActive
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}

        </ScrollView>
      </View>

      {/* 🔥 LOADING OU LISTA */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8b5cf6" />
          <Text style={styles.loadingText}>Carregando produtos...</Text>
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

/* 🎨 ESTILOS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07071c',
  },

  filterContainer: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#12123a',
    borderBottomWidth: 1,
    borderBottomColor: '#00d4ff22',
  },

  filterBtn: {
    borderWidth: 1,
    borderColor: '#00d4ff55',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#1e1e4a',
  },

  filterBtnActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },

  filterText: {
    color: '#8b5cf6',
    fontWeight: '600',
    fontSize: 13,
  },

  filterTextActive: {
    color: '#0a0a2e',
  },

  list: {
    padding: 14,
    paddingBottom: 20,
  },

  row: {
    justifyContent: 'space-between',
  },

  card: {
    backgroundColor: '#12123a',
    borderRadius: 18,
    marginBottom: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: '#00d4ff22',
    overflow: 'hidden',
    shadowColor: '#8b5cf6',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#fff',
    padding: 10,
  },

  cardInfo: {
    padding: 10,
  },

  productName: {
    fontSize: 13,
    color: '#e0e0ff',
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 18,
  },

  productPrice: {
    fontSize: 15,
    color: '#8b5cf6',
    fontWeight: 'bold',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    color: '#8b5cf6',
    fontSize: 15,
    fontWeight: '500',
  },
});