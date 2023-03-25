import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import ConfirmButton from "../../components/ConfirmButton";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const ForgotPasswordScreen = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const onSendPressed = async (data) => {
    setLoading(true);
    try {
      await Auth.forgotPassword(data.username);

      navigation.navigate("NewPassword");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
    setLoading(false);
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
        <Text style={styles.title}>Password Reset</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            marginBottom: "10%",
          }}
        >
          {loading ? (
            <>
              <Text
                style={{
                  color: "#0D0D0D",
                  fontWeight: 600,
                }}
              >
                We’ve sent a Reset Code to your email.
              </Text>
              <Text>
                <Text
                  style={{
                    color: "#008BF0",
                    fontWeight: 600,
                  }}
                >
                  {" "}
                  Send Code Again
                </Text>
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  color: "#0D0D0D",
                  fontWeight: 400,
                  textAlign: "center",
                }}
              >
                Enter your email so we can begin the password reset flow.
              </Text>
            </>
          )}
        </View>

        <CustomInput
          name="username"
          control={control}
          placeholder="Work Email"
          rules={{
            required: "Email is required",
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
              marginBottom: "5%",
              textAlign: "center",
            }}
          >
            StockHive uses cookies for analytics. By using StockHive’s services
            you agree to this use of cookies. Learn More
          </Text>
        </View>
        <CustomButton text="Continue" onPress={handleSubmit(onSendPressed)} />
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

export default ForgotPasswordScreen;
