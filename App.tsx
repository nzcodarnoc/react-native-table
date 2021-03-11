import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TransactionTable from "./components/TransactionTable";

import networkMock from "./__mocks__/network-mock";
networkMock();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState({
    columnLabels: [],
    transactions: [[]],
  });
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/transactions")
      .then((response) => response.json())
      .then((json) => {
        setTableData(json);
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && <TransactionTable tableData={tableData} />}
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
