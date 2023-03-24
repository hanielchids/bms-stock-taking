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
import { Alert } from "react-native";

const SignInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onSignInPressed = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.signIn(username, password);

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
          placeholder="Work Email"
          value={username}
          setValue={setUsername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
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
          onPress={onSignInPressed}
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
