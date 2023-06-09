import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { fetchBooks } from "./src/services/api";

const API_URL = "https://www.googleapis.com/books/v1/volumes";
const GENRES = ["fiction", "romance", "mystery"];

export default function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetcheddBooks = await fetchBooks({ GENRES, API_URL });
        console.log(JSON.stringify(fetcheddBooks, null, 2));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
