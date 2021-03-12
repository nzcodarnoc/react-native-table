import React, { useState, useEffect } from "react";
import {
  sortNumbersAsc,
  sortDatesAsc,
  sortStringsAsc,
  sortNumbersDesc,
  sortDatesDesc,
  sortStringsDesc,
} from "./helpers/sort";
import { StyleSheet, View, FlatList } from "react-native";
import { DataTable } from "react-native-paper";
import TransactionRow from "./TransactionRow";
import SortControl from "./SortControl";

export interface TransactionRowData {
  key: string;
  value: Array<string> | string;
}
interface TransactionTableProps {
  tableData?: {
    columnLabels: Array<TransactionRowData>;
    transactions: Array<TransactionRowData>;
  };
}

const itemsPerPage = 10;

const TransactionTable = ({ tableData }: TransactionTableProps) => {
  const [visibleTransactions, setVisibleTransactions] = useState<
    Array<TransactionRowData>
  >([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Array<TransactionRowData>
  >([]);
  const [ascendingDirection, setAscendingDirection] = useState(true);
  const [sortBy, setSortBy] = useState(1);
  const [hideUnmatched, setHideUnmatched] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const from = (page: number) => page * itemsPerPage;
  const to = (page: number) => (page + 1) * itemsPerPage;

  useEffect(() => {
    if (!tableData) return;

    // TODO: remove this "any" type for a precise type definition
    // and refactor magic colum numbers
    let sortFunction: any;
    switch (sortBy) {
      case 0:
        sortFunction = ascendingDirection ? sortNumbersAsc : sortNumbersDesc;
        break;
      case 2:
      case 5:
        sortFunction = ascendingDirection ? sortDatesAsc : sortDatesDesc;
        break;
      default:
        sortFunction = ascendingDirection ? sortStringsAsc : sortStringsDesc;
    }

    let transactions: Array<TransactionRowData> = [...tableData.transactions];

    if (hideUnmatched) transactions = filterMatched(transactions);
    setFilteredTransactions(transactions);
    setNumberOfPages(Math.ceil(transactions.length / itemsPerPage));
    transactions.sort(sortFunction);
    setVisibleTransactions(
      transactions.slice(from(currentPage), to(currentPage))
    );
  }, [tableData, ascendingDirection, sortBy, hideUnmatched, currentPage]);

  function filterMatched(transactions: Array<TransactionRowData>) {
    // set page to 0 to stop the thing blowing up if number of
    // pages shrinks
    // TODO: refactor magic number
    return transactions.filter(
      (transaction) => !!transaction.value[9] === true
    );
  }

  const onChangeDirection = (direction: boolean) => {
    setAscendingDirection(!direction);
  };

  const onChangeSortBy = (column: number) => {
    setSortBy(column);
  };

  const onChangeHideUnmatched = (hide: number) => {
    setCurrentPage(0);
    setHideUnmatched(!hide);
  };

  return (
    <View style={styles.container}>
      {!!tableData && (
        <>
          <SortControl
            onChangeDirection={onChangeDirection}
            onChangeSortBy={onChangeSortBy}
            onChangeHideUnmatched={onChangeHideUnmatched}
            labels={tableData.columnLabels}
            ascendingDirection={ascendingDirection}
            sortBy={sortBy}
            hideUnmatched={hideUnmatched}
          />
          <DataTable>
            <DataTable.Pagination
              page={currentPage}
              numberOfPages={numberOfPages}
              onPageChange={(page) => setCurrentPage(page)}
              label={`${from(currentPage) + 1}-${
                to(currentPage) > filteredTransactions.length
                  ? filteredTransactions.length
                  : to(currentPage)
              } of ${filteredTransactions.length}`}
            />
            <DataTable.Header>
              <DataTable.Title>Transactions</DataTable.Title>
            </DataTable.Header>
          </DataTable>
          <FlatList
            data={visibleTransactions}
            extraData={currentPage}
            renderItem={({ item, index }) => (
              <TransactionRow
                labels={tableData.columnLabels}
                transaction={item}
                index={index}
              />
            )}
            keyExtractor={(item) => item.key}
          />
        </>
      )}
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
