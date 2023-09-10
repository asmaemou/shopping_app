import { View, Text, ScrollView, Image, TouchableOpacity,StyleSheet,ActivityIndicator, FlatList } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import MasonryList from 'reanimated-masonry-list';
import { BlurView} from 'expo-blur';
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../components/CustomBackdrop";
import FilterView from "../components/FilterView";
// import FilterView from '../components/FilterView'; // Adjust the path as needed


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
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openFilterModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
      }, []);
 
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
                <TouchableOpacity 
                    onPress={openFilterModal} // Use onPress to specify the function
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
                contentContainerStyle={{paddingHorizontal:24}}

                containerStyle={{ padding:16, }}
                showsVerticalScrollIndicator={false}
                renderItem={({item,i}) => 
                <View style={{
                    aspectRatio: i===0 ? 1: 2/3,
                    position:"relative",
                    overflow:'hidden',
                    backgroundColor:"red",
                    marginTop:16,
                    borderRadius:24,
                    }}>
                    <Image source={{
                        uri:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                    }} 
                    resizeMode="cover" 
                    style={[StyleSheet.absoluteFill]}/>
                    <View style={[StyleSheet.absoluteFill,
                    {
                        padding:12,
                    },
                    ]}>
                        <View style={{flexDirection:'row',gap:8,padding:4}}>
                            <Text style={{
                                flex:1,
                                fontSize:14,
                                fontWeight:'600',
                                color:colors.text,
                                }}>
                                PUMA everywhere 
                            </Text>
                            <View style={{
                                backgroundColor: colors.background,
                                borderRadius:100,
                                height:32,
                                aspectRatio:1,
                                alignItems:'center',
                                justifyContent:'center'}}>
                                    <Icons 
                                    name="favorite-border" 
                                    size={20} 
                                    color={colors.text}/>
                            </View>
                        </View>
                                <View style={{flex:1}}/>
                        <BlurView style={{
                            flexDirection:'row',
                            backgroundColor:"rgba(0,0,0,0.5)",
                            alignItems:"center",
                            padding:8,
                            borderRadius:100,
                            overflow:"hidden",
                            }} 
                            intensity={20}>
                                <Text style={{
                                    flex:1,
                                    fontSize:16,
                                    fontWeight:"600",
                                    color:"#fff",
                                    marginLeft:4,
                                    }}numberOfLines={1}>160.00 MAD</Text>
                                    <TouchableOpacity style={{
                                        paddingHorizontal:12,
                                        paddingVertical:8,
                                        borderRadius:100,
                                        backgroundColor:"#fff",
                                        }}>
                                        <Icons name="add-shopping-cart" size={20} color='#000'/>
                                    </TouchableOpacity>
                            </BlurView>
                    </View>
                </View>
            }
                onEndReachedThreshold={0.1}
            />
            </SafeAreaView>
            <BottomSheetModal
                snapPoints={["67%"]}
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
