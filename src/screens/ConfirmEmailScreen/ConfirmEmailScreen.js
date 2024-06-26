import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  Alert,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import ConfirmButton from "../../components/ConfirmButton";
import Logo from "../../../assets/Logo.png";

const ConfirmEmailScreen = () => {
  const route = useRoute();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { username: route?.params?.username },
  });

  const { height } = useWindowDimensions();

  const username = watch("username");

  const navigation = useNavigation();

  const onConfirmPressed = async (data) => {
    try {
      await Auth.confirmSignUp(data.username, data.code);
      navigation.navigate("SignIn");

      Alert.alert("Success", "Registration was succesful");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert("Success", "Code was resent to your email");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
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
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: "Username code is required",
          }}
        />

        <CustomInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: "Confirmation code is required",
          }}
        />

        <ConfirmButton
          text="Confirm"
          onPress={handleSubmit(onConfirmPressed)}
        />

        <ConfirmButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Login"
          onPress={onSignInPress}
          type="TERTIARY"
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

export default ConfirmEmailScreen;
