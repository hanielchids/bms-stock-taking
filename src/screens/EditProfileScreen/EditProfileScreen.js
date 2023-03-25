import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
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

  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");

  const Home = () => {
    navigation.navigate("Home");
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
              Edit Profile
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
          placeholder="Work Email"
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
          //   value={username}
          //   setValue={setUsername}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Confirm Email"
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
          //   value={email}
          //   setValue={setEmail}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long",
            },
          }}
          //   value={password}
          //   setValue={setPassword}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: (value) => value === pwd || "Password do not match",
          }}
          //   value={passwordRepeat}
          //   setValue={setPasswordRepeat}
        />
      </View>

      <View style={{ height: "40%", padding: 20 }}></View>
    </View>
  );
};

export default EditProfileScreen;
