import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../config/config";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function BookAppointment({ navigation }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("Upcoming");

  const dates = ["2025-11-17", "2025-11-18", "2025-11-19", "2025-11-20"];
  const times = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00"];

  const formatDate = (dateString) => {
    try {
      const options = { weekday: "short", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString("en-US", options);
    } catch {
      return dateString;
    }
  };

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/doctors`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(res.data);
      } catch (err) {
        console.log(err.message);
        Alert.alert("Error", "Unable to fetch doctors.");
      }
    };
    fetchDoctors();
  }, []);

  // Book appointment
  const handleBook = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      Alert.alert("Error", "Please select doctor, date, and time.");
      return;
    }

    Alert.alert(
      "Confirm Appointment",
      `Book ${selectedDoctor.name} on ${formatDate(
        selectedDate
      )} at ${selectedTime}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Book Now",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              await axios.post(
                `${BASE_URL}/appoinment/book`,
                {
                  doctorId: selectedDoctor._id,
                  date: selectedDate,
                  time: selectedTime,
                },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              Alert.alert("Success", "Appointment Booked Successfully!");
              navigation.goBack();
            } catch (err) {
              console.log(err.message);
              Alert.alert("Error", "Failed to book appointment.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-sharp" size={28} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointments</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color="#1C1C1E" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Date Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((date) => (
              <TouchableOpacity
                key={date}
                style={[
                  styles.chip,
                  selectedDate === date && styles.chipSelected,
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedDate === date && styles.chipTextSelected,
                  ]}
                >
                  {formatDate(date)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Doctor Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Doctor</Text>
          <FlatList
            data={doctors}
            horizontal
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.doctorCard,
                  selectedDoctor?._id === item._id && styles.doctorCardSelected,
                ]}
                onPress={() => setSelectedDoctor(item)}
              >
                <Text style={styles.doctorName}>{item.name}</Text>
                <Text style={styles.doctorSpec}>{item.specialization}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {times.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.chip,
                  selectedTime === time && styles.chipSelected,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedTime === time && styles.chipTextSelected,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Book Button */}
      <View style={styles.bottomButton}>
        <TouchableOpacity style={styles.bookBtn} onPress={handleBook}>
          <Text style={styles.bookBtnText}>Confirm Booking</Text>
          <Ionicons
            name="arrow-forward-sharp"
            size={20}
            color="white"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7f8" },
  scrollContainer: { paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingBottom: 8,
    backgroundColor: "#f6f7f8",
  },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "700", color: "#1C1C1E" },
  section: { marginVertical: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1C1C1E", marginBottom: 8 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#e5e7eb",
    marginRight: 8,
  },
  chipSelected: { backgroundColor: "#137fec" },
  chipText: { color: "#1C1C1E", fontSize: 14 },
  chipTextSelected: { color: "#fff", fontWeight: "700" },
  doctorCard: {
    width: 130,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  doctorCardSelected: {
    borderWidth: 2,
    borderColor: "#137fec",
  },
  doctorName: { fontWeight: "700", fontSize: 14, color: "#1C1C1E" },
  doctorSpec: { fontSize: 12, color: "#6b7280", textAlign: "center" },
  bottomButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  bookBtn: {
    backgroundColor: "#137fec",
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bookBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
