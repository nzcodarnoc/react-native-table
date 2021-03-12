import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import TransactionTable from "./components/TransactionTable";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import networkMock from "./__mocks__/network-mock";
networkMock();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState();
  /*
  A note:
  All of this deserves to be in a redux store, especially because we
  have to marshall the API response into a key/value form that the
  React framework expect when using map() to iterate through the collections.
  In the interest of time, this has been left a future work
  */
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/transactions")
      .then((response) => response.json())
      .then((json) => {
        json.transactions = json.transactions.map(
          (item: string, index: string) => {
            return { key: String(index), value: item };
          }
        );
        json.columnLabels = json.columnLabels.map(
          (item: string, index: string) => {
            return { key: String(index), value: item };
          }
        );
        setTableData(json);
        setIsLoading(false);
      });
  }, []);
  /* END of future work */

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          {isLoading && <Text>Loading...</Text>}
          {!isLoading && <TransactionTable tableData={tableData} />}
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  safe: {
    flex: 1
  }
});
