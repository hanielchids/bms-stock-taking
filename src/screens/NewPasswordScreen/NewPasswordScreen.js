import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const NewPasswordScreen = () => {
  const { control, handleSubmit } = useForm();

  const navigation = useNavigation();

  const onSubmitPressed = async (data) => {
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      Alert.alert("Success", "Password reset successful!");
      navigation.navigate("SignIn");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ paddingLeft: 20, paddingTop: 20 }}>
        <TouchableOpacity onPress={onSignInPress}>
          <Icon name="arrow-left-circle" size={40} color="#000000" />
        </TouchableOpacity>
      </View>
      <View style={styles.viewOne}></View>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          placeholder="Work Email"
          name="username"
          control={control}
          rules={{ required: "Email is required" }}
        />

        <CustomInput
          placeholder="Verification Code"
          name="code"
          control={control}
          rules={{ required: "Code is required" }}
        />

        <CustomInput
          placeholder="Enter your new password"
          name="password"
          control={control}
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long",
            },
          }}
        />

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "50%",
          }}
        >
          <Text
            style={{
              color: "#0D0D0D",
              opacity: 0.3,
              fontSize: 12,
              marginBottom: "3%",
              textAlign: "center",
            }}
          >
            StockHive uses cookies for analytics. By using StockHive’s services
            you agree to this use of cookies. Learn More
          </Text>
        </View>

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewOne: {
    display: "flex",
    flex: 1,
    height: 180,
  },
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0D0D0D",
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

export default NewPasswordScreen;
