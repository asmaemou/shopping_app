import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "../../app/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.126.110.98:8000";
const defaultProfileImage = require("../assets/images/user.jpeg");

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picture: null,
  });

  const [order, setOrder] = useState({
    orderId: "",
    totalAmount: 0,
    date: "",
    items: [],
  });

  const [orderHistory, setOrderHistory] = useState([]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { onLogout } = useAuth();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setDatePickerVisibility(Platform.OS === "ios");
    if (currentDate && !isNaN(currentDate.getTime())) {
      setUserData({
        ...userData,
      });
    }
  };

  const handleInputChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const fetchUserData = async () => {
    try {
      // Retrieve the user data from AsyncStorage
      const userString = await AsyncStorage.getItem("currentUser");
      const userData = JSON.parse(userString);

      if (userData) {
        console.log("Data Received:", userData);
        setUserData(userData);
      } else {
        console.error("No user data found in local storage.");
      }
    } catch (error) {
      console.error("Error fetching user data from local storage:", error);
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const orderHistoryString = await AsyncStorage.getItem("UserOrder");
      const orderHistoryData = JSON.parse(orderHistoryString);

      if (orderHistoryData && Array.isArray(orderHistoryData)) {
        console.log("Order History Data Received:", orderHistoryData);
        setOrderHistory(orderHistoryData); // Directly set the state if it's an array
      } else {
        console.error(
          "No order history data found in local storage or the data is not an array."
        );
      }
    } catch (error) {
      console.error("Error fetching order history from local storage:", error);
    }
  };
  useEffect(() => {
    // Fetches order history periodically
    const intervalId = setInterval(fetchOrderHistory, 10000); // Refresh every 10 seconds

    return () => clearInterval(intervalId); // Clears the interval when the component unmounts
  }, []);

  const saveUserData = async () => {
    try {
      const response = await fetch(`${API_URL}/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log("User data saved successfully:", updatedData);
      } else {
        console.error("Failed to save user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchOrderHistory();
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
        >{`${userData.firstName} ${userData.lastName}`}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            value={userData.firstName}
            onChangeText={(text) => handleInputChange("fname", text)}
            placeholder="Enter your first name"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            value={userData.lastName}
            onChangeText={(text) => handleInputChange("lname", text)}
            placeholder="Enter your last name"
            style={styles.input}
          />
        </View>

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

        {/* <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <Text style={styles.buttonText}>Select Date of Birth</Text>
        </TouchableOpacity> */}
        {/* {isDatePickerVisible && (
          <DateTimePicker
            value={userData.dob && !isNaN(new Date(userData.dob).getTime()) ? new Date(userData.dob) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}        */}

        {/* <TouchableOpacity style={styles.button} onPress={saveUserData}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity> */}

        <View style={styles.infoSection}>
        <Text style={styles.label}>Order History:</Text>
          <FlatList
            data={orderHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <FlatList
                  data={item.items}
                  keyExtractor={(subItem, subIndex) => subIndex.toString()}
                  renderItem={({ item: subItem }) => (
                    <View style={styles.productItemContainer}>
                      <Text
                        style={styles.productItemText}
                      >{`Name: ${subItem.name}`}</Text>
                      <Text
                        style={styles.productItemText}
                      >{`Size: ${subItem.size}`}</Text>
                      <Text
                        style={styles.productItemText}
                      >{`Quantity: ${subItem.quantity}`}</Text>
                      <Text
                        style={styles.productItemText}
                      >{`Price: $${subItem.price}`}</Text>
                      <Text
                        style={styles.productItemText}
                      >{`Total Amount: $${item.totalAmount}`}</Text>
                      <Text
                        style={styles.productItemText}
                      >{`Date: ${item.date}`}</Text>
                      <Text style={styles.productItemText}>{`Items:`}</Text>
                    </View>
                  )}
                />
                <Text>{`\n`}</Text>
              </View>
            )}
          />
        </View>
      </View>

      <Icons
        name="logout"
        size={24}
        color="#007AFF"
        onPress={onLogout}
        style={styles.logoutIcon}
      />
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
    marginTop: 20,
    alignSelf: "center",
  },
  productItemContainer: {
    backgroundColor: "#f5f5f5", // light grey background for the container
    borderRadius: 5, // slightly rounded corners
    padding: 10, // spacing inside the container
    marginVertical: 5, // vertical spacing between each item
    borderWidth: 1, // border width
    borderColor: "#ddd", // light grey border
  },

  productItemText: {
    fontSize: 16, // font size for text inside the container
    color: "#333", // dark color for text
  },
  label: {
    textAlign: 'center', // Centers the text
    fontWeight: 'bold', // Makes the text bold
    fontSize: 18, // Adjust the font size as needed
    padding: 10, // Padding inside the border
    marginVertical: 10, // Vertical margin for spacing
    borderWidth: 2, // Width of the border
    borderColor: 'green', // Color of the border
    borderRadius: 5, // Rounded corners for the border
  },
});

export default ProfileScreen;
