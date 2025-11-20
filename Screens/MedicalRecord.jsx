import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import api from "../utils/api";
import { Colors } from "../theme/theme";

const screenWidth = Dimensions.get("window").width;

export default function MedicalRecords({ navigation }) {
  const [records, setRecords] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Other");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    try {
      const res = await api.get("/records");
      setRecords(res.data);
    } catch (err) {
      console.log(err.message);
      Alert.alert("Error", "Failed to fetch records.");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const uploadRecord = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/records/upload", {
        title: title.trim(),
        fileUrl: imageUrl.trim() || "no-file",
        type,
        doctorId: doctorId.trim() || undefined,
        date: date.trim() || undefined,
      });
      Alert.alert("Success", "Medical record uploaded!");
      setTitle("");
      setType("Other");
      setDoctorId("");
      setDate("");
      setImageUrl("");
      fetchRecords();
    } catch (err) {
      console.log(err.message);
      Alert.alert("Error", "Failed to upload record.");
    } finally {
      setLoading(false);
    }
  };

  const renderRecord = ({ item }) => (
    <LinearGradient
      colors={["#e0f0ff", "#cde8ff"]}
      style={styles.recordCard}
    >
      {item.fileUrl && item.fileUrl !== "no-file" ? (
        <Image source={{ uri: item.fileUrl }} style={styles.recordImage} />
      ) : (
        <Ionicons name="file-tray-full-outline" size={50} color={Colors.primary} />
      )}
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.recordTitle}>{item.title}</Text>
        <Text style={styles.recordType}>{item.type || "Other"}</Text>
        {item.doctorId?.name && (
          <Text style={styles.recordDoctor}>Doctor: {item.doctorId.name}</Text>
        )}
        {item.date && <Text style={styles.recordDate}>Date: {item.date}</Text>}
      </View>
    </LinearGradient>
  );

  return (
    <LinearGradient colors={["#f0f4f8", "#e0f0ff"]} style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Records</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.sectionTitle}>Upload New Record</Text>

        <TextInput
          style={styles.input}
          placeholder="Title (required)"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Type (Prescription / Lab Report / X-ray / Other)"
          placeholderTextColor="#999"
          value={type}
          onChangeText={setType}
        />
        <TextInput
          style={styles.input}
          placeholder="Doctor ID (optional)"
          placeholderTextColor="#999"
          value={doctorId}
          onChangeText={setDoctorId}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (optional, e.g., 2025-11-16)"
          placeholderTextColor="#999"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL (optional)"
          placeholderTextColor="#999"
          value={imageUrl}
          onChangeText={setImageUrl}
        />

        <TouchableOpacity
          style={[styles.uploadButton, { opacity: loading ? 0.6 : 1 }]}
          onPress={uploadRecord}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.uploadButtonText}>Upload Record</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>My Records</Text>
        <FlatList
          data={records}
          keyExtractor={(item) => item._id}
          renderItem={renderRecord}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: Colors.primary },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginVertical: 12, color: Colors.primary },

  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 12,
    backgroundColor: "#fff",
    color: Colors.text,
  },

  uploadButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  recordCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },

  recordImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    resizeMode: "cover",
  },

  recordTitle: { fontSize: 16, fontWeight: "600", color: Colors.primary },
  recordType: { fontSize: 12, color: Colors.textSecondary },
  recordDoctor: { fontSize: 12, color: Colors.textSecondary },
  recordDate: { fontSize: 12, color: Colors.textSecondary },
});
