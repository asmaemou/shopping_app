import { View, Text, ScrollView, Image, TouchableOpacity,StyleSheet,ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons"

const AVATAR_URL = 'https://media.istockphoto.com/id/1319763895/photo/smiling-mixed-race-mature-man-on-grey-background.jpg?s=1024x1024&w=is&k=20&c=N8tCKAiS77uX8ZGltdjkhzh5pXzvuNHg48acJETZfs8=';

const HomeScreen = () => {
    const {colors} = useTheme()
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
            paddingVertical:12,
            
            }}>
            <Text>120 MAD</Text>
        </View>
        </View>
    )
}
