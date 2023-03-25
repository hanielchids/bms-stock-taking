import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Logo from "../../../assets/Logo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";
import { Alert } from "react-native";

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.signIn(data.username, data.password);

      console.log(response);
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
    setLoading(false);

    // validate user
    // navigation.navigate("Home");
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.25 }]}
          resizeMode="contain"
        />
      </View>

      <Text
        style={{
          marginTop: -80,
          textAlign: "left",
          paddingLeft: 20,
          fontStyle: "normal",
          fontWeight: 700,
          fontSize: 20,
          //   fontFamily: "Space Grotesk",
        }}
      >
        Login
      </Text>
      <View style={styles.root}>
        <CustomInput
          name="username"
          placeholder="Work Email"
          control={control}
          rules={{ required: "Email is required" }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password should be minimum 3 characters long",
            },
          }}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="NOBG"
        />

        <View
          style={{ marginTop: "35%", marginBottom: "8%", alignItems: "center" }}
        >
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
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={onSignUpPress}>
              <Text
                style={{
                  color: "#008BF0",
                  fontWeight: 600,
                }}
              >
                {" "}
                Sign Up Here
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: "#0D0D0D",
              opacity: 0.3,
              fontSize: 12,
              marginTop: "1%",
              textAlign: "center",
            }}
          >
            StockHive uses cookies for analytics. By using StockHive’s services
            you agree to this use of cookies. Learn More
          </Text>
        </View>
        <CustomButton
          style={{ marginTop: "3%" }}
          text={loading ? "Loading..." : "Continue"}
          onPress={handleSubmit(onSignInPressed)}
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
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 150,
  },
});

export default SignInScreen;
