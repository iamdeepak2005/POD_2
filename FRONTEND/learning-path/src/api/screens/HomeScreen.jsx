import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Welcome back 👋</Text>

      {/* AI CARD */}
      <LinearGradient
        colors={["#6C63FF", "#8E7CFF"]}
        style={styles.card}
      >
        <Text style={styles.cardTitle}>AI that works for you</Text>
        <Text style={styles.cardText}>
          Stay ahead with AI skills 🚀
        </Text>
      </LinearGradient>

      {/* SKILLS CARD */}
      <LinearGradient
        colors={["#36D1DC", "#5B86E5"]}
        style={styles.card}
      >
        <Text style={styles.cardTitle}>Check your skills</Text>
        <Text style={styles.cardText}>
          Discover your strengths
        </Text>
      </LinearGradient>

      {/* LEARNING PATH BUTTON */}
      <TouchableOpacity
        style={styles.learningPathBtn}
        onPress={() => navigation.navigate("LearningPaths")}
      >
        <Text style={styles.btnText}>Explore Learning Paths</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f6fa",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    color: "#fff",
    marginTop: 5,
  },
  learningPathBtn: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});