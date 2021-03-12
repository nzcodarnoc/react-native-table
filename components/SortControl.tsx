import React, { useState } from "react";
import { Button, Menu } from "react-native-paper";
import { View } from "react-native";
import { TransactionRowData } from "./TransactionTable";

interface SortControlProps {
  onChangeDirection: Function;
  onChangeSortBy: Function;
  onChangeHideUnmatched: Function;
  labels: Array<TransactionRowData>;
  ascendingDirection: boolean;
  sortBy: number;
  hideUnmatched: boolean;
}

const SortControl = ({
  onChangeDirection,
  onChangeSortBy,
  onChangeHideUnmatched,
  labels,
  ascendingDirection,
  sortBy,
  hideUnmatched,
}: SortControlProps) => {
  const didChangeDirection = () => {
    onChangeDirection(ascendingDirection);
  };
  const didChangeSortBy = (key: number) => {
    onChangeSortBy(key);
    closeMenu();
  };
  const didChangeUnmatched = () => {
    onChangeHideUnmatched(hideUnmatched);
  };
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <>
      {!!labels && (
        <>
          <Button
            icon={hideUnmatched ? "filter" : "filter-remove"}
            onPress={didChangeUnmatched}
          >
            {hideUnmatched ? "show all" : "show matched"}
          </Button>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button onPress={openMenu}>Sort by {labels[sortBy].value}</Button>
            }
          >
            {labels.map((label) => {
              return (
                <View key={label.key}>
                  {parseInt(label.key) !== 8 && (
                    <Menu.Item
                      onPress={() => didChangeSortBy(parseInt(label.key))}
                      title={label.value}
                    />
                  )}
                </View>
              );
            })}
          </Menu>
          <Button
            icon={ascendingDirection ? "arrow-up" : "arrow-down"}
            onPress={didChangeDirection}
          >
            sort direction
          </Button>
        </>
      )}
    </>
  );
};

export default SortControl;
