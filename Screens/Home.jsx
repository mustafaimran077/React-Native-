// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
//   Image,
// } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import api from "../utils/api"; // axios instance
// import { Colors } from "../theme/theme";

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = width * 0.42;

// export default function HomeScreen({ navigation }) {
//   const [user, setUser] = useState(null);
//   const [upcomingAppointments, setUpcomingAppointments] = useState([]);
//   const [recentRecords, setRecentRecords] = useState([]);
//   const [notifications, setNotifications] = useState([
//     "Don't forget your upcoming checkup!",
//     "New message from Dr. Ahmed",
//   ]);

//   // Health metrics
//   const [heartRate, setHeartRate] = useState(72);
//   const [sleepHours, setSleepHours] = useState(7);
//   const [bp, setBP] = useState("120/80");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [profileRes, upcomingRes, recordsRes] = await Promise.all([
//           api.get("/user/profile"),
//           api.get("/appoinment/upcoming"),
//           api.get("/records"),
//         ]);
//         setUser(profileRes.data);
//         setUpcomingAppointments(upcomingRes.data.slice(0, 3)); // latest 3 appointments
//         setRecentRecords(recordsRes.data.slice(0, 3)); // latest 3 records
//       } catch (err) {
//         console.log("Error fetching data:", err.message);
//         Alert.alert("Error", "Could not fetch data from server.");
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.greeting}>Good Morning,</Text>
//           <Text style={styles.userName}>{user?.userName || "User"}!</Text>
//         </View>
//         <Image
//           source={{ uri: user?.profileImage || "https://i.pravatar.cc/150" }}
//           style={styles.profileImage}
//         />
//       </View>

//       {/* Quick Actions */}
//       <View style={styles.quickActionsRow}>
//         <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate("Appointments")}>
//           <LinearGradient colors={["#137fec20", "#137fec40"]} style={styles.quickIcon}>
//             <Ionicons name="calendar-outline" size={26} color={Colors.primary} />
//           </LinearGradient>
//           <Text style={styles.quickActionText}>Book Appointment</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate("Doctors")}>
//           <LinearGradient colors={["#137fec20", "#137fec40"]} style={styles.quickIcon}>
//             <Ionicons name="person-outline" size={26} color={Colors.primary} />
//           </LinearGradient>
//           <Text style={styles.quickActionText}>Find Doctor</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.quickAction} onPress={() => navigation.jumpTo("Records")}>
//           <LinearGradient colors={["#137fec20", "#137fec40"]} style={styles.quickIcon}>
//             <Ionicons name="file-tray-full-outline" size={26} color={Colors.primary} />
//           </LinearGradient>
//           <Text style={styles.quickActionText}>Medical Records</Text>
//         </TouchableOpacity>

       
//       </View>

//       {/* Health Metrics */}
//       <Text style={styles.sectionTitle}>Health Metrics</Text>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsRow}>
//         <LinearGradient colors={["#FF8A65", "#FF7043"]} style={styles.metricCard}>
//           <Ionicons name="heart-outline" size={28} color="#fff" />
//           <Text style={styles.metricValue}>{heartRate} bpm</Text>
//           <Text style={styles.metricLabel}>Heart Rate</Text>
//         </LinearGradient>

//         <LinearGradient colors={["#42A5F5", "#1E88E5"]} style={styles.metricCard}>
//           <Ionicons name="moon-outline" size={28} color="#fff" />
//           <Text style={styles.metricValue}>{sleepHours} hrs</Text>
//           <Text style={styles.metricLabel}>Sleep</Text>
//         </LinearGradient>

//         <LinearGradient colors={["#66BB6A", "#43A047"]} style={styles.metricCard}>
//           <Ionicons name="speedometer-outline" size={28} color="#fff" />
//           <Text style={styles.metricValue}>{bp}</Text>
//           <Text style={styles.metricLabel}>Blood Pressure</Text>
//         </LinearGradient>
//       </ScrollView>

//       {/* Upcoming Appointments */}
//       <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
//       {upcomingAppointments.length === 0 && (
//         <Text style={styles.noDataText}>No upcoming appointments</Text>
//       )}
//       {upcomingAppointments.map((item, index) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.card}
//           onPress={() => navigation.navigate("Appointments")}
//         >
//           <Ionicons name="calendar-outline" size={28} color={Colors.primary} />
//           <View style={{ marginLeft: 15 }}>
//             <Text style={styles.cardTitle}>{item.doctorId.name}</Text>
//             <Text style={styles.cardSubText}>
//               {item.date} at {item.time}
//             </Text>
//             <Text style={styles.cardSubText}>Status: {item.status}</Text>
//           </View>
//         </TouchableOpacity>
//       ))}

//       {/* Recent Medical Records */}
//       <Text style={styles.sectionTitle}>Recent Medical Records</Text>
//       {recentRecords.length === 0 && <Text style={styles.noDataText}>No records available</Text>}
//       {recentRecords.map((record, index) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.card}
//           onPress={() => navigation.navigate("Records")}
//         >
//           <Ionicons name="file-tray-full-outline" size={28} color={Colors.primary} />
//           <View style={{ marginLeft: 15 }}>
//             <Text style={styles.cardTitle}>{record.title}</Text>
//             <Text style={styles.cardSubText}>
//               {record.date ? new Date(record.date).toLocaleDateString() : "No date"}
//             </Text>
//             <Text style={styles.cardSubText}>
//               Type: {record.type || "General"}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ))}

//       {/* Notifications / Tips */}
//       <Text style={styles.sectionTitle}>Health Tips & Notifications</Text>
//       {notifications.map((note, index) => (
//         <View key={index} style={styles.notificationCard}>
//           <Ionicons name="notifications-outline" size={24} color={Colors.primary} />
//           <Text style={styles.notificationText}>{note}</Text>
//         </View>
//       ))}

//       <View style={{ height: 50 }} /> {/* Spacer at bottom */}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#fff",
//     flexGrow: 1,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 25,
//   },
//   greeting: {
//     fontSize: 20,
//     fontWeight: "500",
//     color: Colors.textSecondary,
//   },
//   userName: {
//     fontSize: 26,
//     fontWeight: "700",
//     color: Colors.primary,
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   quickActionsRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     marginBottom: 25,
//   },
//   quickAction: {
//     width: CARD_WIDTH,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   quickIcon: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   quickActionText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: Colors.text,
//     textAlign: "center",
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: Colors.text,
//     marginBottom: 12,
//     marginTop: 10,
//   },
//   metricsRow: {
//     flexDirection: "row",
//     marginBottom: 25,
//   },
//   metricCard: {
//     width: CARD_WIDTH,
//     borderRadius: 20,
//     padding: 20,
//     marginRight: 15,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   metricValue: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginTop: 8,
//     color: "#fff",
//   },
//   metricLabel: {
//     fontSize: 14,
//     color: "#fff",
//     marginTop: 4,
//   },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 18,
//     borderRadius: 20,
//     backgroundColor: "#f9f9f9",
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: Colors.text,
//   },
//   cardSubText: {
//     fontSize: 14,
//     color: Colors.textSecondary,
//     marginTop: 2,
//   },
//   noDataText: {
//     fontSize: 14,
//     color: Colors.textSecondary,
//     marginBottom: 10,
//     marginLeft: 5,
//   },
//   notificationCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E3F2FD",
//     borderRadius: 15,
//     padding: 12,
//     marginBottom: 10,
//   },
//   notificationText: {
//     marginLeft: 10,
//     fontSize: 14,
//     color: Colors.text,
//     flexShrink: 1,
//   },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/api";
import { Colors } from "../theme/theme";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.42;

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentRecords, setRecentRecords] = useState([]);
  const [heartRate, setHeartRate] = useState(72);
  const [bp, setBP] = useState("120/80");
  const [sleepHours, setSleepHours] = useState(7);
  const [notifications, setNotifications] = useState([
    "Don't forget your upcoming checkup!",
    "New message from Dr. Ahmed",
  ]);

  // Fetch user & data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, upcomingRes, recordsRes] = await Promise.all([
          api.get("/users/profile"),
          api.get("/appoinment/upcoming"),
          api.get("/records"),
        ]);
        setUser(profileRes.data);
        setUpcomingAppointments(upcomingRes.data.slice(0, 3));
        setRecentRecords(recordsRes.data.slice(0, 3));
      } catch (err) {
        console.log(err.message);
        Alert.alert("Error", "Could not fetch data from server.");
      }
    };
    fetchData();
  }, []);

  // Logout function
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("token");
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch (err) {
            console.log(err);
            Alert.alert("Error", "Failed to logout.");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 16 }}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome</Text>
          <Text style={styles.userName}>{user?.userName || "User"}!</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={28} color={Colors.primary} />
          </TouchableOpacity>
          <Image
            source={{ uri: user?.profileImage || "https://i.pravatar.cc/150" }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <QuickAction
          icon="calendar"
          text="Book Appointment"
          onPress={() => navigation.navigate("Appointments")}
        />
 
        <QuickAction
          icon="folder"
          text="Medical Records"
          onPress={() => navigation.navigate("Records")}
        />
        <QuickAction icon="log-out-outline" text="Logout" onPress={handleLogout} />
      </View>

      {/* Health Metrics */}
      <Text style={styles.sectionTitle}>My Vitals</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsContainer}>
        <MetricCard icon="heart" label="Heart Rate" value={`${heartRate} bpm`} />
        <MetricCard icon="moon" label="Sleep" value={`${sleepHours} hrs`} />
        <MetricCard icon="speedometer" label="Blood Pressure" value={bp} />
      </ScrollView>

      {/* Upcoming Appointments */}
      <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
      {upcomingAppointments.map((item) => (
        <AppointmentCard key={item._id} item={item} navigation={navigation} />
      ))}

      {/* Recent Records */}
      <Text style={styles.sectionTitle}>Recent Records</Text>
      {recentRecords.map((record) => (
        <RecordCard key={record._id} record={record} navigation={navigation} />
      ))}

      {/* Notifications */}
      <Text style={styles.sectionTitle}>Notifications</Text>
      {notifications.map((note, idx) => (
        <View key={idx} style={styles.notificationCard}>
          <Ionicons name="notifications-outline" size={20} color={Colors.primary} />
          <Text style={styles.notificationText}>{note}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// --- Quick Action ---
const QuickAction = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress}>
    <View style={styles.quickIcon}>
      <Ionicons name={icon} size={24} color={Colors.primary} />
    </View>
    <Text style={styles.quickActionText}>{text}</Text>
  </TouchableOpacity>
);

// --- Metric Card ---
const MetricCard = ({ icon, label, value }) => (
  <LinearGradient colors={["#137fec20", "#137fec40"]} style={styles.metricCard}>
    <Ionicons name={icon} size={28} color={Colors.primary} />
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </LinearGradient>
);

// --- Appointment Card ---
const AppointmentCard = ({ item, navigation }) => (
  <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Appointments")}>
    <Ionicons name="calendar-outline" size={26} color={Colors.primary} />
    <View style={{ marginLeft: 12 }}>
      <Text style={styles.cardTitle}>{item.doctorId.name}</Text>
      <Text style={styles.cardSubText}>
        {item.date} at {item.time}
      </Text>
      <Text style={styles.cardSubText}>Status: {item.status}</Text>
    </View>
  </TouchableOpacity>
);

// --- Record Card ---
const RecordCard = ({ record, navigation }) => (
  <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Records")}>
    <Ionicons name="file-tray-full-outline" size={26} color={Colors.primary} />
    <View style={{ marginLeft: 12 }}>
      <Text style={styles.cardTitle}>{record.title}</Text>
      <Text style={styles.cardSubText}>{record.date?.slice(0, 10)}</Text>
      <Text style={styles.cardSubText}>Type: {record.type || "General"}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backgroundLight },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  greeting: { fontSize: 18, color: Colors.textSecondary },
  userName: { fontSize: 22, fontWeight: "700", color: Colors.primary },
  headerRight: { flexDirection: "row", alignItems: "center" },
  logoutButton: { marginRight: 12 },
  avatar: { width: 50, height: 50, borderRadius: 25 },

  quickActions: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", paddingHorizontal: 16, marginBottom: 16 },
  quickAction: { width: CARD_WIDTH, height: 100, marginBottom: 12, backgroundColor: "#e6f0ff", borderRadius: 12, justifyContent: "center", alignItems: "center" },
  quickIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#137fec20", justifyContent: "center", alignItems: "center", marginBottom: 6 },
  quickActionText: { fontSize: 14, fontWeight: "600", textAlign: "center", color: Colors.text },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginVertical: 8, paddingHorizontal: 16, color: Colors.text },
  metricsContainer: { paddingLeft: 16, paddingVertical: 8 },
  metricCard: { width: CARD_WIDTH, padding: 16, borderRadius: 12, marginRight: 12, alignItems: "center" },
  metricValue: { fontSize: 18, fontWeight: "700", marginTop: 6 },
  metricLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },

  card: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 12, backgroundColor: "#fff", marginHorizontal: 16, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  cardSubText: { fontSize: 12, color: Colors.textSecondary },

  notificationCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#E3F2FD", borderRadius: 12, padding: 10, marginHorizontal: 16, marginBottom: 8 },
  notificationText: { marginLeft: 8, fontSize: 12, flexShrink: 1 },
});

