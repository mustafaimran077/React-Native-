import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import api from "../utils/api";
import { BASE_URL } from "../config/config.js";

// --- Theme Colors ---
const PRIMARY_COLOR = "#137fec"; 
const CARD_BACKGROUND = "#FFFFFF";
const BACKGROUND_COLOR_SCROLL = "#F0F4FF";
const TEXT_PRIMARY = "#1C1C1E";
const TEXT_SECONDARY = "#8E8E93";
const DEFAULT_AVATAR_URL = "https://png.pngtree.com/png-vector/20230304/ourmid/pngtree-male-avator-icon-vector-png-image_6631112.png";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(DEFAULT_AVATAR_URL);

  const fetchProfile = async () => {
    try {
      const res = await api.get(`${BASE_URL}/users/profile`);
      const userData = res.data;
      setUser(userData);
      setUserName(userData.userName || "");
      setEmail(userData.email || "");
    } catch (err) {
      console.log(err.message);
      Alert.alert("Error", "Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    setUpdating(true);
    try {
      const res = await api.put(`${BASE_URL}/users/update`, { userName, email });
      setUser(res.data.user);
      Alert.alert("Success", "Profile updated!");
      setEditMode(false);
    } catch (err) {
      console.log(err.message);
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </View>
    );
  }

  const renderProfileInfo = (label, value) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <LinearGradient colors={["#F0F4FF", "#E0F0FF"]} style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>
        
        {/* --- Custom Back Arrow --- */}
        <TouchableOpacity
          style={styles.backArrowContainer}
          onPress={() => navigation.navigate("Home")}
        >
          <LinearGradient
            colors={["#56a0ff", "#137fec"]}
            style={styles.backArrowCircle}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Avatar */}
        <View style={styles.profileBlock}>
          <LinearGradient colors={["#56a0ff", "#137fec"]} style={styles.avatarBorder}>
            <Image source={require('../Image/avator.png')} style={styles.avatar} />
          </LinearGradient>
          <Text style={styles.displayName}>{userName}</Text>
          <Text style={styles.displayEmail}>{email}</Text>
        </View>

        {/* Account Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{editMode ? "Edit Details" : "Account Details"}</Text>
          {editMode ? (
            <View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput style={styles.input} value={userName} onChangeText={setUserName} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
              </View>
              <TouchableOpacity
                style={[styles.updateButton, { opacity: updating ? 0.7 : 1 }]}
                onPress={updateProfile}
                disabled={updating}
              >
                <Text style={styles.updateButtonText}>{updating ? "Saving..." : "Save Changes"}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {renderProfileInfo("User Name", userName)}
              {renderProfileInfo("Email", email)}
            </View>
          )}
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },

  // --- Custom Back Arrow ---
  backArrowContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  backArrowCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },

  profileBlock: { alignItems: "center", paddingVertical: 20, marginBottom: 10 },
  avatarBorder: { width: 130, height: 130, borderRadius: 65, alignItems: "center", justifyContent: "center", marginBottom: 15 },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: "#fff" },
  displayName: { fontSize: 26, fontWeight: "700", color: TEXT_PRIMARY },
  displayEmail: { fontSize: 16, color: TEXT_SECONDARY, marginTop: 4 },

  card: { backgroundColor: CARD_BACKGROUND, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 15, marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.08, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10, elevation: 6 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 15, color: TEXT_PRIMARY, borderBottomWidth: 1, borderBottomColor: "#F0F0F0", paddingBottom: 10 },

  infoRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  infoLabel: { fontSize: 16, color: TEXT_SECONDARY, fontWeight: "500" },
  infoValue: { fontSize: 16, fontWeight: "600", color: TEXT_PRIMARY },

  inputGroup: { marginBottom: 15 },
  inputLabel: { fontSize: 14, color: TEXT_SECONDARY, marginBottom: 5, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#EBEBEB", borderRadius: 12, paddingHorizontal: 15, paddingVertical: 12, fontSize: 16, backgroundColor: "#FAFAFA", color: TEXT_PRIMARY },

  updateButton: { backgroundColor: PRIMARY_COLOR, paddingVertical: 15, borderRadius: 12, alignItems: "center", marginTop: 10 },
  updateButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
