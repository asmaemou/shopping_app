import React, { useState, useEffect, useCallback, useRef } from "react";
import Carousel from 'react-native-snap-carousel';
import { Dimensions,TextInput } from 'react-native';

import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import MasonryList from "reanimated-masonry-list";
import { BlurView } from "expo-blur";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../components/CustomBackdrop";
import FilterView from "../components/FilterView";
import { TabsStackScreenProps } from "../navigators/TabsNavigator";
import { useAuth } from "../../app/context/AuthContext";
import { useShoppingCart } from "../../app/context/ShoppingCartContext";

const CATEGORIES = ["Shirts", "Shoes", "Skirt", "Coat"];
const CATEGORY_MAP = {
  1: "Shirts",
  2: "Shoes",
  3: "Skirt",
  4: "Coat",
};
const CATEGORY_IDS = [1, 2, 3, 4]; // Define category IDs
const screenWidth = Dimensions.get('window').width;

const API_URL = "http://10.126.110.98:8000";
const AVATAR_URL =
  "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";

const HomeScreen = ({ navigation }: TabsStackScreenProps<"Home">) => {
  const { colors } = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { onLogout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [newCollections, setNewCollections] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');


  interface Product {
    category: number;
    description: string;
    stock: string;
    rating: string;
    name: string;
    amount: number;
    status: string;
    manufacturer: string;
    picture: string;
  }

  const openFilterModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products/`);
      const data = await response.json();
      setProducts(data); // Store the fetched data in the products state

      // Log the entire array of products
      console.log("Fetched Products:", data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchNewCollections = async () => {
    try {
      const response = await fetch(`${API_URL}/newcollections/`); 
      const data = await response.json();
      setNewCollections(data);
    } catch (error) {
      console.error("Error fetching new collections:", error);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };
  

  useEffect(() => {
    fetchProducts();
    fetchNewCollections();
  }, []);

  // Function to filter products based on the selected category ID
  let filteredProducts = products;
  if (categoryIndex > 0) { // Check if a specific category is selected
    
    filteredProducts = products.filter(
      (product) => product.category == categoryIndex
    );
  }

  if (searchQuery !== '') {
    filteredProducts = filteredProducts.filter(
      (product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const renderCarouselItem = ({ item, index }) => {
    return (
      <Card
        key={index}
        price={item.amount}
        imageUrl={item.picture}
        onPress={() => {
          navigation.navigate("Details", { id: item.id });
        }}
      />
    );
  };


  return (
    <ScrollView>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        {/* Header Section */}
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Image
            source={{
              uri: AVATAR_URL,
            }}
            style={{ width: 52, aspectRatio: 1, borderRadius: 52 }}
            resizeMode="cover"
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 8,
                color: colors.text,
              }}
              numberOfLines={1}
            >
              Hi, Asmae 👋
            </Text>
            <Text
              style={{ color: colors.text, opacity: 0.75 }}
              numberOfLines={1}
            >
              Discover fashion that suits your style
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Icons
              name="logout"
              size={24}
              color={colors.text}
              onPress={onLogout}
            />
          </TouchableOpacity>
        </View>


        {/* Grid Collection View */}
        <View style={{ paddingHorizontal: 24 }}>
          {/* Title bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "700", color: colors.text }}
            >
              New Collections
            </Text>
            <Carousel
          data={newCollections}
          renderItem={renderCarouselItem}
          sliderWidth={screenWidth} 
          itemWidth={screenWidth-60} 
          layout={'default'}
          containerCustomStyle={{ flexGrow: 0 }}
        />
            <TouchableOpacity>
              {/* <Text style={{ color: colors.primary }}>See All</Text> */}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", height: 200, gap: 12 }}>
            {newCollections.map((collection) => (
              <Card
                key={collection.name} // Use an appropriate unique key
                onPress={() => {
                  navigation.navigate("Details", { id: collection }); // Adjust as needed
                }}
                price={collection.amount}
                imageUrl={collection.picture}
              />
            ))}
          </View>
        </View>

        {/* Search Bar Section */}
<View style={{ flexDirection: "row", paddingHorizontal: 24, gap: 12 }}>
  <TextInput
    style={{
      flex: 1,
      height: 52,
      borderRadius: 52,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      paddingHorizontal: 24,
      flexDirection: "row",
      gap: 12,
    }}
    placeholder="Search"
    value={searchQuery}
    onChangeText={handleSearchChange}
  />
  <TouchableOpacity
  onPress={openFilterModal}
  style={{
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 52,
    marginLeft: 12, // Added to create some space between search bar and filter button
    backgroundColor: colors.primary, // Use the primary color from your theme
  }}
>
  <Icons name="tune" size={24} color={colors.background} />
</TouchableOpacity>
</View>



        {/* Categories Section */}
        <FlatList
          data={["All", ...CATEGORIES]} // Include "All" as the first option
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 12,
          }}
          renderItem={({ item, index }) => {
            const isSelected = categoryIndex === index;
            return (
              <TouchableOpacity
                onPress={() => setCategoryIndex(index)}
                style={{
                  backgroundColor: isSelected ? colors.primary : colors.card,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 100,
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  style={{
                    color: isSelected ? colors.background : colors.text,
                    fontWeight: "600",
                    fontSize: 14,
                    opacity: isSelected ? 1 : 0.5,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Masonry */}
        <MasonryList
          data={filteredProducts} // Use the fetched data from your API
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const product = item as Product;
            return (
              <View style={{ padding: 6 }}>
                <View
                  style={{
                    aspectRatio: 1,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 24,
                  }}
                >
                  <Image
                    source={{ uri: product.picture }}
                    resizeMode="cover"
                    style={StyleSheet.absoluteFill}
                  />
                  <View
                    style={[
                      StyleSheet.absoluteFill,
                      {
                        padding: 12,
                      },
                    ]}
                  >
                    <View style={{ flexDirection: "row", gap: 8, padding: 4 }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#fff",
                          textShadowColor: "rgba(0,0,0,0.2)",
                          textShadowOffset: {
                            height: 1,
                            width: 0,
                          },
                          textShadowRadius: 4,
                        }}
                      >
                        {product.name}
                      </Text>
                      <View
                        style={{
                          backgroundColor: colors.card,
                          borderRadius: 100,
                          height: 32,
                          aspectRatio: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icons
                          name="favorite-border"
                          size={20}
                          color={colors.text}
                        />
                      </View>
                    </View>
                    <View style={{ flex: 1 }} />
                    <BlurView
                      style={{
                        flexDirection: "row",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        alignItems: "center",
                        padding: 6,
                        borderRadius: 100,
                        overflow: "hidden",
                      }}
                      intensity={20}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#fff",
                          marginLeft: 8,
                        }}
                        numberOfLines={1}
                      >
                        ${product.amount}
                      </Text>
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 100,
                          backgroundColor: "#fff",
                        }}
                      >
                        <Icons
                          name="add-shopping-cart"
                          size={18}
                          color="#000"
                        />
                      </TouchableOpacity>
                    </BlurView>
                  </View>
                </View>
              </View>
            );
          }}
          onEndReachedThreshold={0.1}
        />
      </SafeAreaView>

      <BottomSheetModal
        snapPoints={["85%"]}
        index={0}
        ref={bottomSheetModalRef}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.card,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
      >
        <FilterView />
      </BottomSheetModal>
    </ScrollView>
  );
};

export default HomeScreen;

const Card = ({
  price,
  imageUrl,
  onPress,
}: {
  price: number;
  imageUrl: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
      }}
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 12,
          top: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: "rgba(0,0,0,0.25)",
          borderRadius: 100,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
          ${price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
