import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import networkMock from "./__mocks__/network-mock";

networkMock();

export default function App() {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch("/api/transactions").then((res) => setState(res.data));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{JSON.stringify(state)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
