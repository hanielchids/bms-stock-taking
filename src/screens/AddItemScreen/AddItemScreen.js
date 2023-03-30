import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
// import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../components/CustomInput";
import SectionCustomInput from "../../components/SectionCustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { Auth, API, graphqlOperation } from "aws-amplify";

import { createItem, updateItem } from "../../graphql/mutations";
import { TextInput } from "react-native";

const AddItemScreen = () => {
  const navigation = useNavigation();

  const [username, setUserName] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await Auth.currentSession();
        setUserName(user.idToken.payload.name);

        console.log("user name  is: ", user.idToken.payload.name);
      } catch (err) {
        console.log(err);
      }
    };

    getUserInfo();
  }, []);

  const { control, handleSubmit, watch } = useForm();

  const [items, setItems] = useState([]);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [location, setLocation] = useState("");
  const [branchcode, setBranchCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  const Profile = () => {
    navigation.navigate("Home");
  };
  const AddItem = async () => {
    try {
      const input = {
        name,
        code,
        location,
        branchcode,
        quantity,
        notes,
      };
      const result = await API.graphql(graphqlOperation(createItem, { input }));

      const newItem = result.data.createItem;
      const updatedItem = [newItem, ...items];

      alert("Item added!!");

      setItems(updatedItem);
      setName("");
      setCode("");
      setLocation("");
      setBranchCode("");
      setQuantity("");
      setNotes("");
    } catch (e) {
      console.log("error here is :", e);
    }
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
            <TouchableOpacity onPress={Profile}>
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
              Add Items
            </Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={""}
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
                {username.charAt(0)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: -10,
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
            height: 180,
            width: "100%",
            backgroundColor: "gray",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>Upload Image</Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <TextInput
            style={{
              backgroundColor: "#A0A0A0",
              width: "49%",
              color: "#0D0D0D",
              borderColor: "#e8e8e8",
              borderWidth: 1,
              borderRadius: 5,
              paddingVertical: 20,
              paddingHorizontal: 10,
              marginVertical: 5,
              marginRight: 5,
            }}
            value={name}
            onChangeText={(string) => setName(string)}
            placeholder="Item Name"
          />

          <TextInput
            style={{
              backgroundColor: "#A0A0A0",
              width: "49%",
              color: "#0D0D0D",
              borderColor: "#e8e8e8",
              borderWidth: 1,
              borderRadius: 5,
              paddingVertical: 20,
              paddingHorizontal: 10,
              marginVertical: 5,
              marginRight: 5,
            }}
            placeholder="SKU Code"
            value={code}
            onChangeText={(string) => setCode(string)}
          />
        </View>

        <TextInput
          style={{
            backgroundColor: "#A0A0A0",
            width: "100%",
            color: "#0D0D0D",
            borderColor: "#e8e8e8",
            borderWidth: 1,
            borderRadius: 5,
            paddingVertical: 20,
            paddingHorizontal: 10,
            marginVertical: 5,
            marginRight: 5,
          }}
          placeholder="Bin Location"
          value={location}
          onChangeText={(string) => setLocation(string)}
        />
        <TextInput
          style={{
            backgroundColor: "#A0A0A0",
            width: "100%",
            color: "#0D0D0D",
            borderColor: "#e8e8e8",
            borderWidth: 1,
            borderRadius: 5,
            paddingVertical: 20,
            paddingHorizontal: 10,
            marginVertical: 5,
            marginRight: 5,
          }}
          placeholder="Warehouse No. or Branch Code"
          value={branchcode}
          onChangeText={(string) => setBranchCode(string)}
        />
        <TextInput
          style={{
            backgroundColor: "#A0A0A0",
            width: "100%",
            color: "#0D0D0D",
            borderColor: "#e8e8e8",
            borderWidth: 1,
            borderRadius: 5,
            paddingVertical: 20,
            paddingHorizontal: 10,
            marginVertical: 5,
            marginRight: 5,
          }}
          placeholder="Quantity"
          value={quantity}
          onChangeText={(number) => setQuantity(number)}
        />
        <TextInput
          style={{
            backgroundColor: "#A0A0A0",
            width: "100%",
            color: "#0D0D0D",
            borderColor: "#e8e8e8",
            borderWidth: 1,
            borderRadius: 5,
            paddingVertical: 20,
            paddingHorizontal: 10,
            marginVertical: 5,
            marginRight: 5,
          }}
          placeholder="Additional Information"
          value={notes}
          onChangeText={(string) => setNotes(string)}
        />

        <View
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",

            padding: 20,
          }}
        >
          <CustomButton text="Save" onPress={AddItem} type="PRIMARY" />
        </View>
      </View>
    </View>
  );
};

export default AddItemScreen;
