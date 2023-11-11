import React, { useState, useEffect, useCallback, useRef } from "react";
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
import { useAuth } from "../../context/AuthContext";
import axios from "axios";


const CATEGORIES = ["Shirts", "Shoes", "Skirt", "Coat"];


const AVATAR_URL =
 "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";


// Your product data with categories
const MESONARY_LIST_DATA = [
 {
   imageUrl:
     "https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?cs=srgb&dl=pexels-pixabay-267301.jpg&fm=jpg",
   title: "PUMA Everyday Hussle",
   price: 160,
   category: "Shoes",
 },
 {
   imageUrl:
   "https://images.pexels.com/photos/6311139/pexels-photo-6311139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",    title: "PUMA Everyday Hussle",
   price: 180,
   category: "Shirts",
 },
 {
   imageUrl: "https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=800",
   title: "PUMA Everyday Hussle",
   price: 180,
   category: "Skirt",
 },
  {
   imageUrl: "https://images.pexels.com/photos/375880/pexels-photo-375880.jpeg?cs=srgb&dl=pexels-clem-onojeghuo-375880.jpg&fm=jpg",
   title: "PUMA Everyday Hussle",
   price: 180,
   category: "Coat",
 },
 ];


const HomeScreen = ({ navigation }: TabsStackScreenProps<"Home">) => {
 const { colors } = useTheme();
 const [categoryIndex, setCategoryIndex] = useState(0);
 const [filteredProducts, setFilteredProducts] = useState(MESONARY_LIST_DATA);
 const bottomSheetModalRef = useRef<BottomSheetModal>(null);
 const { onLogout } = useAuth();


 const openFilterModal = useCallback(() => {
   bottomSheetModalRef.current?.present();
 }, []);


 useEffect(() => {
    fetchData();
   if (categoryIndex === 0) {
     setFilteredProducts(MESONARY_LIST_DATA);
   } else {
     const selectedCategory = CATEGORIES[categoryIndex - 1];
     const filtered = MESONARY_LIST_DATA.filter(
       (product) => product.category === selectedCategory
     );
     setFilteredProducts(filtered);
   }
 }, [categoryIndex]);




// Your fetchData function goes here
const fetchData = async () => {
 try {
   const response = await axios.get('http://10.126.110.98:8000/products/');
   const imdata = response.data;

   const imageurl = imdata.product_picture;




   // Handle the response data here, for example, set it to a state variable
   console.log(response.data); // You can log the data to the console for testing
 } catch (error) {
   // Handle errors
   console.error(error);
 }
};


// Call fetchData when the component mounts
useEffect(() => {
 fetchData();
}, []);


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
           <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={1}>
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
           <Icons name="logout" size={24} color={colors.text} onPress={onLogout} />
         </TouchableOpacity>
       </View>


       {/* Search Bar Section */}
       <View style={{ flexDirection: "row", paddingHorizontal: 24, gap: 12 }}>
         <TouchableOpacity
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
         >
           <Icons
             name="search"
             size={24}
             color={colors.text}
             style={{ opacity: 0.5 }}
           />
           <Text
             style={{
               flex: 1,
               fontSize: 16,
               color: colors.text,
               opacity: 0.5,
             }}
           >
             Search
           </Text>
         </TouchableOpacity>


         <TouchableOpacity
           onPress={openFilterModal}
           style={{
             width: 52,
             aspectRatio: 1,
             alignItems: "center",
             justifyContent: "center",
             borderRadius: 52,
             backgroundColor: colors.primary,
           }}
         >
           <Icons name="tune" size={24} color={colors.background} />
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
           <Text style={{ fontSize: 20, fontWeight: "700", color: colors.text }}>
             New Collections
           </Text>
           <TouchableOpacity>
             <Text style={{ color: colors.primary }}>See All</Text>
           </TouchableOpacity>
         </View>
         <View style={{ flexDirection: "row", height: 200, gap: 12 }}>
           <Card
             onPress={() => {
               navigation.navigate("Details", {
                 id: "123",
               });
             }}
             price={130}
             imageUrl="https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
           />
           <View style={{ flex: 1, gap: 12 }}>
             <Card
               onPress={() => {
                 navigation.navigate("Details", {
                   id: "456",
                 });
               }}
               price={120}
               imageUrl="https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
             />
             <Card
               onPress={() => {
                 navigation.navigate("Details", {
                   id: "789",
                 });
               }}
               price={170}
               imageUrl="https://images.unsplash.com/photo-1485218126466-34e6392ec754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80"
             />
           </View>
         </View>
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


       {/* Mesonary */}
       <MasonryList
         data={filteredProducts}
         numColumns={2}
         contentContainerStyle={{ paddingHorizontal: 12 }}
         showsVerticalScrollIndicator={false}
         renderItem={({ item, i }: any) => (
           <View style={{ padding: 6 }}>
             <View
               style={{
                 aspectRatio: i === 0 ? 1 : 2 / 3,
                 position: "relative",
                 overflow: "hidden",
                 borderRadius: 24,
               }}
             >
               <Image
                 source={{
                   uri: item.imageUrl,
                 }}
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
                     {item.title}
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
                     ${item.price}
                   </Text>
                   <TouchableOpacity
                     style={{
                       paddingHorizontal: 12,
                       paddingVertical: 8,
                       borderRadius: 100,
                       backgroundColor: "#fff",
                     }}
                   >
                     <Icons name="add-shopping-cart" size={18} color="#000" />
                   </TouchableOpacity>
                 </BlurView>
               </View>
             </View>
           </View>
         )}
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
