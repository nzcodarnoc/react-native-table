import React from "react";
import { TransactionRowData } from "./TransactionTable";
import { StyleSheet, View } from "react-native";
import { DataTable } from "react-native-paper";
import TransactionCell from "./TransactionCell";
interface TransactionRowRowProps {
  labels: Array<TransactionRowData>;
  transaction: TransactionRowData;
  index: number;
}

const TransactionRow = ({ labels, transaction, index }: TransactionRowRowProps) => {
  const odd = index % 2 === 0;
  const match = !!transaction.value[9];
  const style = match
    ? styles.containerMatched
    : odd
    ? styles.containerOdd
    : styles.containerEven;
  return (
    <>
      <DataTable.Row style={style}>
        <View style={styles.row}>
          {labels.map((label) => {
            return (
              <TransactionCell
                label={label}
                value={transaction.value[parseInt(label.key)]}
                key={label.key}
              />
            );
          })}
        </View>
      </DataTable.Row>
    </>
  );
};

const container = {
  paddingTop: 5,
  paddingBottom: 5,
};
const styles = StyleSheet.create({
  row: {
    flexWrap: "nowrap",
    display: "flex",
    flexGrow: 100,
  },
  containerOdd: {
    ...container,
    backgroundColor: "#ffffff",
  },
  containerEven: {
    ...container,
    backgroundColor: "#eeeeee",
  },
  containerMatched: {
    ...container,
    backgroundColor: "#ddffdd",
  },
});

export default TransactionRow;
