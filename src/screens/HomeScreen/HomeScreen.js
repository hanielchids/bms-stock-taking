import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const onIcon = () => {
    navigation.navigate("Profile");
  };

  return (
    <View>
      <View style={{ height: "60%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: "Space Grotesk",
              fontWeight: "700",
            }}
          >
            Inventory
          </Text>
          <View>
            <TouchableOpacity onPress={onIcon}>
              <Icon name="user" size={40} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ height: "40%" }}>
        <Text>haha</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
