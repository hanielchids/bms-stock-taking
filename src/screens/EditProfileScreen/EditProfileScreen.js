import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
// import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const EditProfileScreen = () => {
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
  const pwd = watch("password");

  const Profile = () => {
    navigation.navigate("Profile");
  };
  const EditProfile = () => {
    navigation.navigate("EditProfile");
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
              Edit Profile
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
            height: 150,
            width: 150,
            borderRadius: 150 / 2,
            backgroundColor: "gray",
            marginBottom: 20,
          }}
        />

        <CustomInput
          name="name"
          control={control}
          placeholder="Full Name"
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
          name="username"
          control={control}
          placeholder="Phone number"
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username should be at least 3 characters long",
            },
            maxLength: {
              value: 24,
              message: "Username should be max 24 characters long",
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Company name"
          rules={{
            required: "Email is required",
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Title"
          rules={{
            required: "Email is required",
          }}
        />

        <View
          style={{
            marginTop: 80,
            display: "flex",

            flexDirection: "row",
            padding: 20,
          }}
        >
          <CustomButton
            text="Update"
            onPress={EditProfile}
            type="PROFILE_EDIT"
          />
          <CustomButton
            text="Cancel"
            onPress={EditProfile}
            type="PROFILE_EDIT_CANCEL"
          />
        </View>
      </View>
    </View>
  );
};

export default EditProfileScreen;
