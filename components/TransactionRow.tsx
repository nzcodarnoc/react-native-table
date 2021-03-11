import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface TransactionRowRowProps {
  transaction: Array<string>;
}

const TransactionRow = (props: TransactionRowRowProps) => {
  return (
    <>
      <Text style={styles.item}>
        {props.transaction[1]}
      </Text>
    </>
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

export default TransactionRow;
