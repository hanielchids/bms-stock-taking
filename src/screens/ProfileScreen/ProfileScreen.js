import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import { Auth } from "aws-amplify";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [job, setJob] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await Auth.currentSession();
        setName(user.idToken.payload.name);
        setUser(user.accessToken.payload.username);
        setEmail(user.idToken.payload.email);
        setPhoneNumber(user.idToken.payload.phonenumber);
        setJob(user.idToken.payload.company);
        setTitle(user.idToken.payload.title);

        console.log("user stuff is: ", user.accessToken.payload.username);
        console.log("user name  is: ", user.idToken.payload.name);
        console.log("user email is: ", user.idToken.payload.email);
        console.log("user number is: ", user.idToken.payload.phonenumber);
        console.log("user title is: ", user.idToken.payload.title);
        console.log("user company is: ", user.idToken.payload.company);
      } catch (err) {
        console.log(err);
      }
    };

    getUserInfo();
  }, []);

  async function deleteUser() {
    try {
      const result = await Auth.deleteUser();
      console.log(result);
    } catch (error) {
      console.log("Error deleting user", error);
    }
  }

  const Home = () => {
    navigation.navigate("Home");
  };
  const EditProfile = () => {
    navigation.navigate("EditProfile");
  };
  const Settings = () => {
    navigation.navigate("Settings");
  };
  const Help = () => {
    navigation.navigate("Help");
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
            <TouchableOpacity
              onPress={""}
              style={{
                height: 50,
                width: 50,
                borderRadius: 50 / 2,
                backgroundColor: "#008BF0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Icon name="user" size={40} color="#000000" /> */}
              <Text style={{ fontSize: 30, marginLeft: -5, color: "white" }}>
                {" "}
                {name.charAt(0)}
              </Text>
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
            backgroundColor: "#008BF0",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 90, marginLeft: -12, color: "white" }}>
            {" "}
            {name.charAt(0)}
          </Text>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            textTransform: "uppercase",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            textTransform: "uppercase",
          }}
        >
          {title}
        </Text>

        <View style={{ marginTop: "8%", fontWeight: "bold" }}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginBottom: 10 }}>
            Phone Number: {phoneNumber}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginBottom: 10 }}>
            Email: {email}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginBottom: 10 }}>
            Company Name: {job}
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
        <CustomButton text="Help and Support" onPress={Help} type="PROFILE" />
        <CustomButton
          text="Sign Out"
          onPress={() => {
            Auth.signOut();
          }}
          type="SIGN_OUT"
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
