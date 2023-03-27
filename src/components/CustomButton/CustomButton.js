import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "70%",

    padding: 20,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: "black",
  },

  container_SECONDARY: {
    borderColor: "#3B71F3",
    borderWidth: 2,
  },

  container_TERTIARY: {},

  container_PROFILE: {
    paddingLeft: 0,
    alignItems: "flex-start",
    paddingBottom: 0,
  },
  container_SETTINGS: {
    paddingLeft: 0,
    alignItems: "flex-start",
    paddingBottom: 0,
  },

  container_NOBG: {
    marginTop: -10,
  },
  container_SIGN_OUT: {
    paddingLeft: 0,
    alignItems: "flex-start",
  },
  container_PROFILE_EDIT: {
    width: "60%",
    backgroundColor: "black",
    marginRight: 20,
    marginLeft: -20,
  },
  container_PROFILE_EDIT_CANCEL: {
    width: "45%",
    backgroundColor: "red",
  },

  text: {
    fontWeight: "bold",
    color: "white",
  },

  text_SECONDARY: {
    color: "#3B71F3",
  },

  text_TERTIARY: {
    color: "gray",
  },
  text_NOBG: {
    color: "#008BF0",
    fontWeight: 600,
  },
  text_PROFILE: {
    color: "#0D0D0D",
    fontSize: 20,
    fontWeight: 500,
  },
  text_SETTINGS: {
    color: "#0D0D0D",
    fontSize: 25,
    fontWeight: 500,
  },
  text_SIGN_OUT: {
    color: "red",
    fontSize: 20,
    fontWeight: 500,
  },
});

export default CustomButton;
