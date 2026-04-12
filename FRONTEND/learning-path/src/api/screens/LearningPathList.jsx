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

import {
  searchPaths,
  createPath,
  addItemsToPath,
} from "../pathApi";

import PathCard from "../../components/PathCard";

export default function LearningPathList({ navigation }) {
  const [query, setQuery] = useState("");
  const [paths, setPaths] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [itemsModalVisible, setItemsModalVisible] = useState(false);

  const [selectedPathId, setSelectedPathId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editorName, setEditorName] = useState("");
  const [rating, setRating] = useState("");

  const [playlistInput, setPlaylistInput] = useState("");

  const ADMIN_TOKEN = "YOUR_ADMIN_TOKEN";

  // SEARCH
  const handleSearch = async () => {
    try {
      const data = await searchPaths(query);
      setPaths(data);
    } catch {
      Alert.alert("Error", "Failed to fetch paths");
    }
  };

  // CREATE PATH
  const handleCreatePath = async () => {
    try {
      await createPath(
        {
          title,
          description,
          editor_name: editorName,
          rating: parseFloat(rating),
        },
        ADMIN_TOKEN
      );

      Alert.alert("Success", "Path created!");
      setModalVisible(false);
      handleSearch();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  // OPEN ADD ITEMS MODAL
  const openAddItemsModal = (pathId) => {
    setSelectedPathId(pathId);
    setItemsModalVisible(true);
  };

  // ADD ITEMS
  const handleAddItems = async () => {
    try {
      const playlistIds = playlistInput
        .split(",")
        .map((id) => id.trim());

      await addItemsToPath(
        selectedPathId,
        playlistIds,
        ADMIN_TOKEN
      );

      Alert.alert("Success", "Items added!");
      setItemsModalVisible(false);
      setPlaylistInput("");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
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

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.btnText}>+ Add Path</Text>
      </TouchableOpacity>

      <FlatList
        data={paths}
        keyExtractor={(item) => item.path_id}
        renderItem={({ item }) => (
          <View>
            <PathCard
              path={item}
              onPress={() =>
                navigation.navigate("PathDetail", {
                  pathId: item.path_id,
                })
              }
            />

            <TouchableOpacity
              style={styles.itemBtn}
              onPress={() => openAddItemsModal(item.path_id)}
            >
              <Text style={styles.btnText}>Add Items</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* CREATE PATH MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create Path</Text>

          <TextInput placeholder="Title" style={styles.input} onChangeText={setTitle} />
          <TextInput placeholder="Description" style={styles.input} onChangeText={setDescription} />
          <TextInput placeholder="Editor Name" style={styles.input} onChangeText={setEditorName} />
          <TextInput placeholder="Rating" style={styles.input} keyboardType="numeric" onChangeText={setRating} />

          <TouchableOpacity style={styles.createBtn} onPress={handleCreatePath}>
            <Text style={styles.btnText}>Create</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* ADD ITEMS MODAL */}
      <Modal visible={itemsModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Playlist IDs</Text>

          <TextInput
            placeholder="Enter IDs (comma separated)"
            style={styles.input}
            value={playlistInput}
            onChangeText={setPlaylistInput}
          />

          <TouchableOpacity style={styles.createBtn} onPress={handleAddItems}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setItemsModalVisible(false)}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

// CLEAN STYLES (NO DUPLICATES)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#586ab4" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff" },
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
    marginVertical: 10,
    alignItems: "center",
  },
  itemBtn: {
    backgroundColor: "#ff9800",
    padding: 10,
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
  btnText: { color: "#fff", fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", padding: 20 },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  cancel: {
    textAlign: "center",
    marginTop: 10,
    color: "red",
  },
});