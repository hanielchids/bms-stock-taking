import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const Home = () => {
    navigation.navigate("Home");
  };

  return (
    <View>
      <View style={{ height: "20%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={Home}>
              <Icon name="arrow-left-circle" size={40} color="#000000" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                marginLeft: 20,
              }}
            >
              Profile
            </Text>
          </View>

          <View>
            <TouchableOpacity onPress={""}>
              <Icon name="user" size={40} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          paddingBottom: 20,
          paddingHorizontal: 20,
          height: "40%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: "50%",
            backgroundColor: "gray",
          }}
        />
        <Text>Fullname</Text>
        <Text>Job title</Text>

        <View style={{ marginTop: "2%", fontWeight: "bold" }}>
          <Text style={{ fontWeight: "bold" }}>Phone Number: </Text>
          <Text style={{ fontWeight: "bold" }}>Email: </Text>
          <Text style={{ fontWeight: "bold" }}>Company Name: </Text>
        </View>
      </View>

      <View style={{ height: "40%", padding: 20 }}>
        <Text>Edit Profile</Text>
        <Text>Settings</Text>
        <Text>Help and Support</Text>
        <Text style={{ color: "red" }}>Sign Out</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
