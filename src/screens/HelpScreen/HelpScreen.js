import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import { Auth } from "aws-amplify";

const HelpScreen = () => {
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

  const Home = () => {
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
            <TouchableOpacity onPress={Home}>
              <Icon name="arrow-left-circle" size={40} color="#000000" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 28,
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                marginLeft: 20,
              }}
            >
              Help and Support
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
          name="support"
          style={{
            marginBottom: 20,
            marginLeft: 20,
          }}
          size={100}
          color="#000000"
        />

        <View style={{ padding: 20 }}>
          <CustomButton
            text="Frequently asked Questions"
            onPress={""}
            type="SETTINGS"
          />
          <CustomButton text="Technical Support" onPress={""} type="SETTINGS" />
          <CustomButton text="Feedback" onPress={""} type="SETTINGS" />
          <CustomButton text="Contact" onPress={""} type="SETTINGS" />
        </View>
      </View>
    </View>
  );
};

export default HelpScreen;
