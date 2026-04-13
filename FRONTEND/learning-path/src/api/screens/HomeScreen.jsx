import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";


export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 🔷 HEADER */}
      <LinearGradient
        colors={["#6C63FF", "#5A55CA"]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Text style={styles.logo}>HEXAWORKS</Text>
          <Icon name="person-circle-outline" size={30} color="#fff" />
        </View>

        <Text style={styles.welcome}>Welcome back 👋</Text>

        {/* 🔍 SEARCH */}
        <View style={styles.searchBox}>
          <Icon name="search" size={20} color="#888" />
          <TextInput
            placeholder="Search courses..."
            style={styles.searchInput}
          />
        </View>
      </LinearGradient>

      {/* 🔷 FEATURE CARDS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.cardRow}>
          <LinearGradient colors={["#7F7FD5", "#86A8E7"]} style={styles.card}>
            <Text style={styles.cardTitle}>AI for You</Text>
            <Text style={styles.cardSub}>Upgrade your skills</Text>
          </LinearGradient>

          <LinearGradient colors={["#43C6AC", "#191654"]} style={styles.card}>
            <Text style={styles.cardTitle}>Check Skills</Text>
            <Text style={styles.cardSub}>Test yourself</Text>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* 🔷 CATEGORY CHIPS */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chipRow}>
          {["AI", "Cloud", "Data", "DevOps", "Java", "React"].map((item) => (
            <TouchableOpacity key={item} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 🔷 LEARNING PATH BUTTON */}
      <Text style={styles.sectionTitle}>Learning</Text>

      <TouchableOpacity
        style={styles.learningCard}
        onPress={() => navigation.navigate("LearningPaths")}
      >
        <View>
          <Text style={styles.learningTitle}>Learning Paths</Text>
          <Text style={styles.learningSub}>
            Structured courses for your growth
          </Text>
        </View>
        <Icon name="arrow-forward-circle" size={30} color="#6C63FF" />
      </TouchableOpacity>

      {/* 🔷 MY LEARNING */}
      <Text style={styles.sectionTitle}>My Learning</Text>

      {[1, 2].map((item) => (
        <View key={item} style={styles.courseCard}>
          <Image
            source={{
              uri: "https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
            }}
            style={styles.courseImage}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.courseTitle}>
              Python for Beginners
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "60%" }]} />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FB",
  },

  header: {
    padding: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  welcome: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },

  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
  },

  cardRow: {
    flexDirection: "row",
    padding: 15,
  },

  card: {
    width: 200,
    height: 120,
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    justifyContent: "center",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  cardSub: {
    color: "#fff",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginTop: 10,
  },

  chipRow: {
    flexDirection: "row",
    padding: 15,
  },

  chip: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },

  chipText: {
    color: "#fff",
  },

  learningCard: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  learningTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  learningSub: {
    color: "#666",
  },

  courseCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },

  courseImage: {
    width: 80,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },

  courseTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },

  progressBar: {
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginTop: 8,
  },

  progressFill: {
    height: 6,
    backgroundColor: "#6C63FF",
    borderRadius: 10,
  },
});