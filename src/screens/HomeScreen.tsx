import { View, Text, ScrollView, Image, TouchableOpacity,StyleSheet,ActivityIndicator, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import MasonryList from 'reanimated-masonry-list';

const AVATAR_URL = 'https://media.istockphoto.com/id/1319763895/photo/smiling-mixed-race-mature-man-on-grey-background.jpg?s=1024x1024&w=is&k=20&c=N8tCKAiS77uX8ZGltdjkhzh5pXzvuNHg48acJETZfs8=';

const GATEGORIES=[
    "Clothing",
    "Shoes",
    "Accesories",
    "Djeans",
    "Skirt",
    "Fitness",
];

const HomeScreen = () => {
    const {colors} = useTheme()
    const [CategoryIndex, setCategoryIndex] = useState(0)
    return (
        <ScrollView>
            <SafeAreaView style={{paddingVertical: 24,gap:24}}>
                {/* Header section*/}
                <View style={{
                    paddingHorizontal: 24,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                }}>
                    <Image
                        source={{
                            uri: AVATAR_URL,
                        }}
                        style={{ width: 52, height: 52, borderRadius: 26 }} // Using height instead of aspectRatio
                        resizeMode="cover"
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={{fontSize:18,fontWeight:"600",marginBottom: 8,color:colors.text}} numberOfLines={1}>Hi,Asmae</Text>
                        <Text style={{color:colors.text,opacity:0.75}}
                        numberOfLines={1}
                        >Discover fashion that suit your style</Text>
                    </View>
                    <TouchableOpacity style={{
                        width:52,
                        aspectRatio:1,
                        alignItems:"center",
                        justifyContent:"center",
                        borderRadius:52, 
                        borderWidth:1,
                        borderColor:colors.border,
                }}>
                    <Icons name="notifications" size={24} color={colors.text}/>
                    </TouchableOpacity>
                </View>
            {/* Search Bar section*/}
            <View style={{flexDirection:'row',paddingHorizontal:24,gap:12}}>
                <TouchableOpacity style={{
                    flex:1,
                    height:52,
                    borderRadius:52,
                    borderWidth:1,
                    borderColor:colors.border,
                    alignItems:"center",
                    paddingHorizontal:24,
                    flexDirection:"row",
                    gap:12,
                    
                    }}
                    >
                        <Icons 
                        name="search" 
                        size={24} 
                        color={colors.text}
                        style={{opacity:0.5}}
                        />
                        <Text style={{
                            flex:1,
                            fontSize:16,
                            color:colors.text,
                            opacity:0.5,
                            }}
                            >
                                Search
                                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                        width:52,
                        aspectRatio:1,
                        alignItems:"center",
                        justifyContent:"center",
                        borderRadius:52, 
                        backgroundColor:colors.primary,
                }}>
                    <Icons name="tune" size={24} color={colors.background}/>
                    </TouchableOpacity>
            </View>
            {/* Grid Collection view */}
            <View style={{paddingHorizontal:24}}>
                {/* Title bar */}
                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between",
                    marginBottom:12,
                    }}>
                    <Text style={{
                        fontSize:20,
                        fontWeight:"700"
                        }}>New Collections</Text>
                    <TouchableOpacity>
                        <Text>See All</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:"row",height:200,gap:12}}>
                    {/* Card */}
                    {/* <View style={{
                        flex:1,
                        // height:200,
                        // position:"relative",
                        // overflow:"hidden",
                        }}>
                    </View> */}
                    <Card/>
                    <View style={{flex:1,gap:12}}>
                        <Card/>
                        <Card/>
                    </View>
                </View>
            </View>
            {/*GATEGORIES section */}
            <FlatList 
                data={GATEGORIES} 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal:16,
                    gap:12,

                }}
                renderItem={({item,index}) => {
                const isSelected = CategoryIndex ===index;

                    return(
                        <TouchableOpacity onPress={() => setCategoryIndex(index)}
                        style={{
                            backgroundColor: isSelected ? colors.primary: colors.card,
                            paddingHorizontal:24,
                            paddingVertical:16,
                            borderRadius:100,
                            borderWidth:isSelected ? 0:1 ,
                            borderColor: colors.border,
                        }}>
                        <Text style={{
                            color:isSelected ? colors.background:colors.text,
                            fontWeight:'600',
                            fontSize:16,
                            opacity: isSelected ? 1:0.5,

                        }}>{item}</Text>
                    </TouchableOpacity>
                    )}}
            />
            {/* Mesonary*/}
            <MasonryList
                data={[1,2,3,454,4,56,44]}
                keyExtractor={(item): string => item}
                numColumns={2}
                contentContainerStyle={{paddingHorizontal:24,gap:12}}
                showsVerticalScrollIndicator={false}
                renderItem={({item,i}) => 
                <View style={{
                    aspectRatio: i===0 ? 1: 2/3,
                    position:"relative",
                    overflow:'hidden',
                    backgroundColor:"red",
                    }}>
                    <Image source={{
                        uri:"https://media.istockphoto.com/id/1307568521/photo/its-the-denim-that-does-it-for-me.jpg?s=1024x1024&w=is&k=20&c=LhJXuPZLTEdSHb617yPuomdq_QlCoI0rwcKyoO90Mi0="
                    }} 
                    resizeMode="cover" 
                    style={StyleSheet.absoluteFill}
                    />
                </View>
            }
                onEndReachedThreshold={0.1}
            />
            </SafeAreaView>
        </ScrollView>
    );
};

export default HomeScreen;

const Card = () =>{
    return(
        <View style={{
            flex:1,
            height:200,
            position:"relative",
            overflow:"hidden",
            borderRadius: 24,
            }}>
        <Image 
        source={
            require("../assets/images/collections.avif")
        //     {
            
        //     // uri:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBwcm9maWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        // }
    } 
        resizeMode="cover"
        style={{
            position:"absolute",
            top:0,
            left:0,
            bottom:0,
            right:0,
        }}
        />
        <View style={{
            position:"absolute",
            left:16,
            top:16,
            paddingHorizontal:16,
            paddingVertical:10,
            backgroundColor:"rgba(0,0,0,0.25)",
            borderRadius:100,

            }}>
            <Text style={{
                fontSize:14,
                fontWeight:'600',
                color:'#fff'
                }}>120 MAD</Text>
        </View>
        </View>
    )
};
