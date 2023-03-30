import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
// import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../components/CustomInput";
import SectionCustomInput from "../../components/SectionCustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const AddItemScreen = () => {
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

  const { control, handleSubmit, watch } = useForm();

  const Profile = () => {
    navigation.navigate("Home");
  };
  const AddItem = () => {
    navigation.navigate("AddItem");
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
              Add Items
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
            backgroundColor: "gray",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>Upload Image</Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <SectionCustomInput
            name="name"
            control={control}
            placeholder="Item Name"
            rules={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters long",
              },
              maxLength: {
                value: 24,
                message: "Name should be max 24 characters long",
              },
            }}
          />

          <SectionCustomInput
            name="name"
            control={control}
            placeholder="SKU Code"
            rules={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters long",
              },
              maxLength: {
                value: 24,
                message: "Name should be max 24 characters long",
              },
            }}
          />
        </View>

        <CustomInput
          name="name"
          control={control}
          placeholder="Bin Location"
          rules={{
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name should be at least 3 characters long",
            },
            maxLength: {
              value: 24,
              message: "Name should be max 24 characters long",
            },
          }}
        />
        <CustomInput
          name="name"
          control={control}
          placeholder="Warehouse No. or Branch Code"
          rules={{
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name should be at least 3 characters long",
            },
            maxLength: {
              value: 24,
              message: "Name should be max 24 characters long",
            },
          }}
        />
        <CustomInput
          name="name"
          control={control}
          placeholder="Quantity"
          rules={{
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name should be at least 3 characters long",
            },
            maxLength: {
              value: 24,
              message: "Name should be max 24 characters long",
            },
          }}
        />
        <CustomInput
          name="name"
          control={control}
          placeholder="Additional Information"
          rules={{
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name should be at least 3 characters long",
            },
            maxLength: {
              value: 24,
              message: "Name should be max 24 characters long",
            },
          }}
        />

        <View
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",

            padding: 20,
          }}
        >
          <CustomButton text="Save" onPress={AddItem} type="PRIMARY" />
        </View>
      </View>
    </View>
  );
};

export default AddItemScreen;
