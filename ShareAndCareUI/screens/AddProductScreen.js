import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import LeftArrowIcon from "../components/icons/LeftArrowIcon";
import * as ImagePicker from "expo-image-picker";

export default function AddProductScreen() {
  const navigation = useNavigation();
  const [buttonOpacity, setButtonOpacity] = useState(1);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const handlePressIn = () => {
    setButtonOpacity(0.5);
  };

  const handlePressOut = () => {
    setButtonOpacity(1);
  };

  const handleImagePicker = async () => {
    // Request camera roll permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImageUrl(result.uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
      <SafeAreaView style={styles.container}>
        <Pressable
          style={{
            marginTop: 50,
            marginLeft: 20,
            opacity: buttonOpacity,
            flex: 1,
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => navigation.goBack()}
        >
          <LeftArrowIcon />
        </Pressable>
        <Text style={styles.headerText}>Adding Product</Text>
      </SafeAreaView>

      <SafeAreaView style={styles.itemContainer}>
        <Pressable
          style={[
            styles.imageFrame,
            selectedImageUrl && { borderColor: "#38A59F" },
          ]}
          onPress={handleImagePicker}
        >
          {selectedImageUrl ? (
            <Image source={{ uri: selectedImageUrl }} style={styles.image} />
          ) : (
            <Text style={styles.imageText}>Tap to select image</Text>
          )}
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginBottom: 10
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    padding: 5,
    marginVertical: 10
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    marginLeft: 20,
    flex: 9,
    paddingLeft: 60,
    textAlignVertical: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
  imageFrame: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#38A59F',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
