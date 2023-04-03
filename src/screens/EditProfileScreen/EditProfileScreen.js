import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
// import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { updateUser } from "../../graphql/mutations";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [username, setUserName] = useState("");
  const [users, setUsers] = useState([]);

  // const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await Auth.currentSession();
        setUserName(user.idToken.payload.name);
        setId(user.accessToken.payload.client_id);

        console.log("user name  is: ", user.accessToken.payload.client_id);
        // console.log("user name  is: ", user.idToken.payload.name);
        // console.log("user id  is: ", user.idToken.payload.sub);
      } catch (err) {
        console.log(err);
      }
    };

    getUserInfo();
  }, []);

  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");

  const Profile = () => {
    navigation.navigate("Profile");
  };
  const EditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const updateUserInfo = async () => {
    try {
      const input = {
        id,
        phonenumber,
        title,
        company,
      };
      const result = await API.graphql(graphqlOperation(updateUser, { input }));

      const newUser = result.data.updateUser;
      const updatedUser = [newUser, ...users];

      alert("User updated!");

      setUsers(updatedUser);
      // setName("");
      // setId("");
      setPhonenumber("");
      setTitle("");
      setCompany("");
    } catch (e) {
      console.log("error here is :", e);
    }

    // try {
    //   const userDetails = {
    //     id: id,
    //     phonenumber: phonenumber,
    //     title: title,
    //     company: company,
    //   };

    //   const updatedUser = await API.graphql({
    //     query: updateUser,
    //     variables: { input: userDetails },
    //   });

    //   setUsers(updatedUser);

    //   // setId("");
    //   setPhonenumber("");
    //   setTitle("");
    //   setCompany("");
    // } catch (e) {
    //   console.log("error message: ", e);
    // }
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
              Edit Profile
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
            height: 150,
            width: 150,
            borderRadius: 150 / 2,
            backgroundColor: "gray",
            marginBottom: 20,
          }}
        />

        {/* <TextInput
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
          placeholder="Full Name"
          value={name}
          onChangeText={(string) => setName(string)}
        /> */}

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
          placeholder="random string for Id"
          value={id}
          // onChangeText={(number) => setId(number)}
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
          placeholder="Phone number"
          value={phonenumber}
          onChangeText={(number) => setPhonenumber(number)}
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
          placeholder="Job title"
          value={title}
          onChangeText={(string) => setTitle(string)}
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
          placeholder="Company"
          value={company}
          onChangeText={(string) => setCompany(string)}
        />
        <View
          style={{
            marginTop: 80,
            display: "flex",

            flexDirection: "row",
            padding: 20,
          }}
        >
          <CustomButton
            text="Update"
            onPress={updateUserInfo}
            type="PROFILE_EDIT"
          />
          <CustomButton
            text="Cancel"
            onPress={EditProfile}
            type="PROFILE_EDIT_CANCEL"
          />
        </View>
      </View>
    </View>
  );
};

export default EditProfileScreen;
