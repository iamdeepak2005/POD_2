import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { getPathDetail, enrollPath } from "../pathApi";

export default function PathDetail({ route }) {
  const { pathId } = route.params;
  const [path, setPath] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getPathDetail(pathId);
    setPath(data);
  };

  const handleEnroll = async () => {
    await enrollPath(pathId, "user-123");
    alert("Enrolled successfully!");
  };

  if (!path) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{path.title}</Text>
      <Text>{path.description}</Text>

      <Button title="Enroll" onPress={handleEnroll} />

      <Text style={styles.section}>Courses</Text>

      <FlatList
        data={path.items}
        keyExtractor={(item) => item.playlist_id}
        renderItem={({ item }) => (
          <Text style={styles.course}>{item.title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 22, fontWeight: "bold" },
  section: { marginTop: 20, fontSize: 18 },
  course: {
    padding: 10,
    backgroundColor: "#eee",
    marginVertical: 5,
    borderRadius: 10,
  },
});