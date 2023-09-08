import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons"

const AVATAR_URL = 'https://media.istockphoto.com/id/1319763895/photo/smiling-mixed-race-mature-man-on-grey-background.jpg?s=1024x1024&w=is&k=20&c=N8tCKAiS77uX8ZGltdjkhzh5pXzvuNHg48acJETZfs8=';

const HomeScreen = () => {
    const {colors} = useTheme()
    return (
        <ScrollView>
            <SafeAreaView>
                <View style={{
                    paddingHorizontal: 24,
                    paddingVertical: 24,
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
            </SafeAreaView>
        </ScrollView>
    );
};

export default HomeScreen;
