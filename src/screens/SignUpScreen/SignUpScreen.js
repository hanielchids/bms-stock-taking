import React, { useState } from "react";
import Logo from "../../../assets/Logo.png";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");
  const navigation = useNavigation();

  const { height } = useWindowDimensions();

  const onRegisterPressed = async (data) => {
    const { username, password, email, name } = data;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, name, preferred_username: username },
      });

      navigation.navigate("ConfirmEmail", { username });
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed");
  };

  const onPrivacyPressed = () => {
    console.warn("onPrivacyPressed");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.2 }]}
          resizeMode="contain"
        />
      </View>
      <Text
        style={{
          marginTop: -40,
          textAlign: "left",
          paddingLeft: 20,
          fontStyle: "normal",
          fontWeight: 700,
          fontSize: 20,
          //   fontFamily: "Space Grotesk",
        }}
      >
        Sign Up
      </Text>
      <View style={styles.root}>
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
          placeholder="Username"
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
          placeholder="Email"
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

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            marginBottom: "10%",
          }}
        >
          <Text
            style={{
              color: "#0D0D0D",
              fontWeight: 600,
            }}
          >
            Already have an account?
          </Text>
          <TouchableOpacity onPress={onSignInPress}>
            <Text
              style={{
                color: "#008BF0",
                fontWeight: 600,
              }}
            >
              {" "}
              Login Here
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>
          StockHive uses{" "}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            cookies for analytics.
          </Text>{" "}
          By using StockHive’s services you agree to this use of cookies.
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Learn More
          </Text>{" "}
          and{" "}
        </Text>

        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});

export default SignUpScreen;
