import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const Home = () => {
    navigation.navigate("Home");
  };
  const EditProfile = () => {
    navigation.navigate("EditProfile");
  };
  const Settings = () => {
    navigation.navigate("Settings");
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
          marginTop: -50,
          paddingBottom: 20,
          paddingHorizontal: 20,
          height: "40%",
          display: "flex",
          flexDirection: "column",
          marginBottom: "20%",
        }}
      >
        <View
          style={{
            height: 150,
            width: 150,
            borderRadius: 150 / 2,
            backgroundColor: "gray",
            marginBottom: 20,
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            textTransform: "uppercase",
          }}
        >
          Fullname
        </Text>
        <Text
          style={{
            textTransform: "uppercase",
          }}
        >
          Job title
        </Text>

        <View style={{ marginTop: "8%", fontWeight: "bold" }}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginBottom: 10 }}>
            Phone Number:{" "}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginBottom: 10 }}>
            Email:{" "}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginBottom: 10 }}>
            Company Name:{" "}
          </Text>
        </View>
      </View>

      <View style={{ height: "40%", padding: 20 }}>
        <CustomButton
          text="Edit Profile"
          onPress={EditProfile}
          type="PROFILE"
        />
        <CustomButton text="Settings" onPress={Settings} type="PROFILE" />
        <CustomButton text="Help and Support" onPress={""} type="PROFILE" />
        <CustomButton text="Sign Out" onPress={""} type="SIGN_OUT" />
      </View>
    </View>
  );
};

export default ProfileScreen;
