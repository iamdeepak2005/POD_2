import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";

import { searchPaths, createPath } from "../pathApi";
import PathCard from "../../components/PathCard";

export default function LearningPathList({ navigation }) {
  const [query, setQuery] = useState("");
  const [paths, setPaths] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editorName, setEditorName] = useState("");
  const [rating, setRating] = useState("");

  const ADMIN_TOKEN = ""; // 🔥 replace this

  const handleSearch = async () => {
    try {
      const data = await searchPaths(query);
      setPaths(data);
    } catch (err) {
      Alert.alert("Error", "Failed to fetch paths");
    }
  };

  const handleCreatePath = async () => {
    if (!title || !description || !editorName || !rating) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const payload = {
        title,
        description,
        editor_name: editorName,
        rating: parseFloat(rating),
      };

      await createPath(payload, ADMIN_TOKEN);

      Alert.alert("Success", "Path created successfully!");

      setModalVisible(false);

      // Refresh list
      handleSearch();

      // Reset form
      setTitle("");
      setDescription("");
      setEditorName("");
      setRating("");
    } catch (err) {
      Alert.alert("Error", "Failed to create path");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learning Paths</Text>

      {/* SEARCH */}
      <TextInput
        placeholder="Search paths..."
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />

      {/* ADD PATH BUTTON */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.btnText}>+ Add Path</Text>
      </TouchableOpacity>

      {/* PATH LIST */}
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

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create Learning Path</Text>

          <TextInput
            placeholder="Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            placeholder="Description"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />

          <TextInput
            placeholder="Editor Name"
            style={styles.input}
            value={editorName}
            onChangeText={setEditorName}
          />

          <TextInput
            placeholder="Rating (e.g. 4.5)"
            style={styles.input}
            value={rating}
            onChangeText={setRating}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.createBtn}
            onPress={handleCreatePath}
          >
            <Text style={styles.btnText}>Create</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

/* 🔥 STYLES INCLUDED IN SAME FILE */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#586ab4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: "#6C63FF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  createBtn: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelText: {
    textAlign: "center",
    marginTop: 15,
    color: "red",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});