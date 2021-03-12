import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { TransactionRowData } from "./TransactionTable";

interface TransactionCellProps {
  label: TransactionRowData;
  value: string;
}

const NOTES_INDEX = 8;

const TransactionCell = ({ value, label }: TransactionCellProps) => {
  // TODO: get rid of magic numbers, in this case 8 is
  // the column that has the notes download path
  // 0 is the column with a currency type
  return (
    <View style={styles.container} key={label.key}>
      {parseInt(label.key) !== 8 && (
        <View style={styles.cell}>
          <Text style={styles.label}>{label.value}</Text>
          <Text style={styles.value}>
            {parseInt(label.key) === 0 && <Text>${value}</Text>}
            {parseInt(label.key) !== 0 && value}
          </Text>
        </View>
      )}
      {parseInt(label.key) === 8 && value.length > 0 && (
        <Button icon="file-download">Download notes</Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  cell: {
    flexDirection: "row"
  },
  label: {
    fontSize: 14,
    width: 90,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default TransactionCell;
