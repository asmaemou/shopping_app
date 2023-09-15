import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";

const AVATAR_URL =
"https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";

const ProfileScreen = () => {
  const { colors } = useTheme();

  return (
    <ScrollView>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: AVATAR_URL,
          }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileUsername}>Hi, Asmae 👋</Text>
          <Text style={styles.profileDescription}>
            Discover fashion that suits your style
          </Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            // Handle logout logic
          }}
        >
          <Icons name="logout" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Profile Content */}
      <View style={styles.profileContent}>
        {/* Add your profile content here */}
        <Text style={styles.sectionTitle}>My Profile</Text>
        {/* Add more profile details, posts, or any other information here */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 24,
  },
  avatar: {
    width: 52,
    aspectRatio: 1,
    borderRadius: 52,
  },
  profileInfo: {
    flex: 1,
  },
  profileUsername: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  profileDescription: {
    opacity: 0.75,
  },
  logoutButton: {
    width: 52,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 52,
    borderWidth: 1,
  },
  profileContent: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  // Add more styles for your profile content here
});

export default ProfileScreen;
