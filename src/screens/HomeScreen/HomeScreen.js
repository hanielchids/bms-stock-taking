import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../components/CustomInput";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

// import { Shadow } from "react-native-shadow-2";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "First Item",
    code: "RS0045",
    quantity: 250,
    location: "CF-30",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Second Item",
    code: "RS0045",
    quantity: 250,
    location: "CF-30",
  },
  {
    id: "4a0f-3da1-471f-bd96-145571e29d72",
    name: "Third Item",
    code: "RS0045",
    quantity: 250,
    location: "CF-30",
  },
  {
    id: "a0f-3da1-",
    name: "Fourth Item",
    code: "RS0045",
    quantity: 250,
    location: "CF-30",
  },
  {
    id: "a0f145571e29d72",
    name: "Fifth Item",
    code: "RS0045",
    quantity: 250,
    location: "CF-30",
  },
  {
    id: "145571e29d72",
    name: "Sixth Item",
    code: "RS0045",
    quantity: 250,
    location: "CF-30",
  },
  {
    id: "94a0f14",
    name: "Seventh Item",
    code: "RS0045",
    quantity: 250,
    location: "CF-30",
  },
];

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const HomeScreen = () => {
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

  const onIcon = () => {
    navigation.navigate("Profile");
  };

  const onAddItem = () => {
    navigation.navigate("AddItem");
  };

  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");

  return (
    <View>
      {/* <View style={{ height: "60%" }}> */}
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
          <TouchableOpacity
            onPress={onIcon}
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
      <View
        style={{
          height: "42%",
        }}
      >
        <View
          style={{
            marginTop: 20,
            paddingBottom: 20,
            paddingHorizontal: 20,
            height: "40%",
            display: "flex",
            flexDirection: "column",
            marginBottom: "2%",
          }}
        >
          <CustomInput
            name="name"
            control={control}
            placeholder="Company"
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
            placeholder="Warehouse No or Branch Code"
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
            placeholder="Bin Location"
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
            placeholder="Item Name"
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
        </View>
      </View>

      <View
        style={{
          height: "5%",
          width: "100%",
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 25 }}>Item Results</Text>
        <Text style={{ color: "gray" }}>Filter Options</Text>
      </View>

      <View style={{ height: "40%" }}>
        {/* <Shadow style={{ height: "100%" }}> */}

        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Item", {
                  item,
                })
              }
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                }}
              >
                {/* Image */}
                <View
                  style={{
                    paddingRight: 5,
                    backgroundColor: "gray",
                    height: 70,
                    width: 70,
                  }}
                ></View>
                {/* Description */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: 20,
                  }}
                >
                  <Text>Item Name: {item.name} </Text>
                  <Text>Item Code: {item.code} </Text>
                  <Text>Quantity: {item.qunatity} Units</Text>
                  <Text>Bin Location: {item.location} </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />

        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "black",
            alignItems: "center",
            justifyContent: "center",
            width: 70,
            position: "absolute",
            top: 150,
            right: 30,
            height: 70,
            backgroundColor: "black",
            borderRadius: 100,
          }}
          onPress={() => navigation.navigate("AddItem")}
        >
          <Icon name="plus" color="white" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "black",
            alignItems: "center",
            justifyContent: "center",
            width: 70,
            position: "absolute",
            top: 230,
            right: 30,
            height: 70,
            backgroundColor: "black",
            borderRadius: 100,
          }}
          onPress={() => {
            alert("Excel feature coming soon!");
          }}
        >
          <Icon name="microsoft-excel" color="white" size={30} />
        </TouchableOpacity>

        {/* </Shadow> */}
      </View>
    </View>
  );
};

export default HomeScreen;
