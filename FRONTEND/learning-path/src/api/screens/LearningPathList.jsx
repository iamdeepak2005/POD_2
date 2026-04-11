import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { searchPaths } from "../pathApi";
import PathCard from "../../components/PathCard";

export default function LearningPathList({ navigation }) {
  const [query, setQuery] = useState("");
  const [paths, setPaths] = useState([]);

  const handleSearch = async () => {
    const data = await searchPaths(query);
    setPaths(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learning Paths</Text>

      <TextInput
        placeholder="Search paths..."
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />

      <FlatList
        data={paths}
        keyExtractor={(item) => item.path_id}
        renderItem={({ item }) => (
          <PathCard
            path={item}
            onPress={() =>
              navigation.navigate("PathDetail", {
                pathId: item.path_id,
              })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#586ab4" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
});