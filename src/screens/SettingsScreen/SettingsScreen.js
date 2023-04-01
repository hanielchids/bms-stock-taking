import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import { Auth } from "aws-amplify";

const SettingsScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await Auth.currentSession();
        setName(user.idToken.payload.name);

        console.log("user name  is: ", user.idToken.payload.name);
      } catch (err) {
        console.log(err);
      }
    };

    getUserInfo();
  }, []);

  //   Graphql delete user
  //   https://docs.amplify.aws/lib/auth/delete_user/q/platform/react-native/

  async function deleteUser() {
    try {
      const result = await Auth.deleteUser();
      console.log(result);
      navigation.navigate("SignIn");
    } catch (error) {
      console.log("Error deleting user", error);
    }
  }

  const Profile = () => {
    navigation.navigate("Profile");
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
            <TouchableOpacity onPress={Profile}>
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
              Settings
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
          marginTop: 20,
          paddingBottom: 20,
          paddingHorizontal: 20,
          height: "40%",
          display: "flex",
          flexDirection: "column",
          marginBottom: "20%",
        }}
      >
        <Icon
          name="settings"
          style={{
            marginBottom: 20,
            marginLeft: 20,
          }}
          size={100}
          color="#000000"
        />

        <View style={{ padding: 20 }}>
          <CustomButton
            text="Profile Preferences"
            onPress={""}
            type="SETTINGS"
          />
          <CustomButton text="App Settings" onPress={""} type="SETTINGS" />
          <CustomButton text="Export Options" onPress={""} type="SETTINGS" />
          <CustomButton
            text="Delete Account"
            onPress={deleteUser}
            type="SIGN_OUT"
          />
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;
