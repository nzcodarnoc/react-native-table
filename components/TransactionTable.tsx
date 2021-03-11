import React from "react";
import { sortNumbersAsc, sortDatesAsc } from "./helpers/sort";
import { FlatList, StyleSheet, View } from "react-native";
import TransactionRow from "./TransactionRow";

interface TransactionTableProps {
  tableData: {
    columnLabels: Array<string>;
    transactions: Array<Array<string>>;
  };
  sortColumn: number
}

const TransactionTable = (props: TransactionTableProps) => {
  props.tableData.transactions.sort(sortDatesAsc);
  return (
    <View style={styles.container}>
      <FlatList
        data={props.tableData.transactions}
        renderItem={({ item }) => <TransactionRow transaction={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default TransactionTable;
