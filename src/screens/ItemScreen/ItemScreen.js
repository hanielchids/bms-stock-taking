import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import CustomButton from "../../components/CustomButton";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Auth } from "aws-amplify";

const ItemScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params?.item;

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
    navigation.navigate("Home");
  };
  const Item = () => {
    navigation.navigate("Item");
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
              Item
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
          marginTop: -10,
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
            height: 180,
            width: "100%",
            backgroundColor: "#A0A0A0",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}> Image</Text>
        </View>

        <View
          style={{
            height: 180,
            width: "100%",
            backgroundColor: "#A0A0A0",
            marginBottom: 20,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            paddingTop: 20,
            paddingLeft: 20,
          }}
        >
          {/* <Text>Item Name: {id} </Text> */}
          <Text style={{ color: "white" }}>Item Name: {item.name} </Text>
          <Text style={{ color: "white" }}>Item Code: {item.code} </Text>
          <Text style={{ color: "white" }}>
            Quantity: {item.quantity} Units
          </Text>
          <Text style={{ color: "white" }}>Bin Location: {item.location} </Text>
        </View>

        <View
          style={{
            marginTop: 80,
            display: "flex",

            flexDirection: "row",
            padding: 20,
          }}
        >
          <CustomButton text="Update" onPress={""} type="PROFILE_EDIT" />
          <CustomButton text="Cancel" onPress={""} type="PROFILE_EDIT_CANCEL" />
        </View>
      </View>
    </View>
  );
};

export default ItemScreen;
