import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addCounter, delCounter } from "../Store/Slice/CounterSlice"; // adjust path



export default function Counter_Comp() {
  const count = useSelector((state) => state.counterReducer.value); // access counter state
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Counter: {count}</Text>

      <TouchableOpacity
        onPress={() => dispatch(addCounter())}
        style={{
          backgroundColor: "green",
          padding: 10,
          marginBottom: 10,
          width: 120,
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>Increment</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => dispatch(delCounter())}
        style={{
          backgroundColor: "red",
          padding: 10,
          width: 120,
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>Decrement</Text>
      </TouchableOpacity>
    </View>
  );
}
