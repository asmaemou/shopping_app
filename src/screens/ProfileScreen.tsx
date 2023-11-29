import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from "../../app/context/AuthContext";
import Icons from "@expo/vector-icons/MaterialIcons";

const API_URL = "http://10.126.110.98:8000";
const defaultProfileImage = require("../../assets/asmae picture.jpeg");

const UserProfile = () => {
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    dob: "",
    country: "",
    status: "",
    role: "",
    picture: null,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { onLogout } = useAuth();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setDatePickerVisibility(Platform.OS === "ios");
    if (currentDate && !isNaN(currentDate.getTime())) {
      // Check that currentDate is a valid date
      setUserData({
        ...userData,
        dob: currentDate.toISOString().split("T")[0],
      }); // Format YYYY-MM-DD
    }
  };

  const handleInputChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_URL}/users/`);
      console.log("Response Status:", response.status);
      const data = await response.json();
      console.log("Data Received:", data);
      setUserData(data[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to handle saving the user data
  const saveUserData = async () => {
    try {
      const response = await fetch(`${API_URL}/users/update`, {
        // Replace '/users/update' with your actual endpoint
        method: "PUT", // or 'PATCH' if your backend supports it
        headers: {
          "Content-Type": "application/json",
          // Include other headers like authorization if needed
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log("User data saved successfully:", updatedData);
        // Handle successful save (e.g., display a success message)
      } else {
        console.error("Failed to save user data:", response.statusText);
        // Handle errors (e.g., display an error message)
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      // Handle network errors (e.g., display an error message)
    }
  };
  {
    /* Save button*/
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={
            userData.picture ? { uri: userData.picture } : defaultProfileImage
          }
          style={styles.profileImage}
          onError={(e) => console.log(e.nativeEvent.error)}
        />
        <Text
          style={styles.profileName}
        >{`${userData.fname} ${userData.lname}`}</Text>
      </View>

      <View style={styles.infoSection}>
        {/* First Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            value={userData.fname}
            onChangeText={(text) => handleInputChange("fname", text)}
            placeholder="Enter your first name"
            style={styles.input}
          />
        </View>

        {/* Last Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            value={userData.lname}
            onChangeText={(text) => handleInputChange("lname", text)}
            placeholder="Enter your last name"
            style={styles.input}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={userData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            placeholder="Enter your email"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        {/* Date of Birth Picker */}
        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <Text style={styles.buttonText}>Select Date of Birth</Text>
        </TouchableOpacity>
        {isDatePickerVisible && (
          <DateTimePicker
            value={
              userData.dob && !isNaN(new Date(userData.dob).getTime())
                ? new Date(userData.dob)
                : new Date()
            }
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()} // Optional: to prevent future dates
          />
        )}

        {/* Country Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            value={userData.country}
            onChangeText={(text) => handleInputChange("country", text)}
            placeholder="Enter your country"
            style={styles.input}
          />
        </View>

        {/* Status Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Status</Text>
          <TextInput
            value={userData.status}
            onChangeText={(text) => handleInputChange("status", text)}
            placeholder="Enter your status"
            style={styles.input}
          />
        </View>

        {/* Role Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Role</Text>
          <TextInput
            value={userData.role}
            onChangeText={(text) => handleInputChange("role", text)}
            placeholder="Enter your role"
            style={styles.input}
          />
        </View>
        {/* Add Save Button */}
        <TouchableOpacity style={styles.button} onPress={saveUserData}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
        {/* Logout Icon */}
        <Icons
          name="logout"
          size={24}
          color="#007AFF" // You can adjust the color as needed
          onPress={onLogout}
          style={styles.logoutIcon}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F0F0F0",
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#E0E0E0",
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333333",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutIcon: {
    marginTop: 20, // Adjust the margin as needed
    alignSelf: "center", // Aligns the icon to the center, you can adjust this as needed
    // Add other styling properties as required
  },
});

export default UserProfile;
