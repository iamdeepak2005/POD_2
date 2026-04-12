import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PathCard({ path, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{path.title}</Text>
      <Text>{path.description}</Text>

      <View style={styles.row}>
        <Text>⭐ {path.rating}</Text>
        <Text>📚 {path.course_count} courses</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});