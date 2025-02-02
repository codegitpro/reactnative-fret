import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const LabelRow = ({ children, label, color = "black", onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    {children}
    <Text style={[{ color: color }, styles.label]}>{label}</Text>
  </TouchableOpacity>
);

LabelRow.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    alignItems: "center",
    paddingHorizontal: 12
  },
  image: {
    flex: 1
  },
  label: { fontSize: 18, marginLeft: 8 }
});

export default LabelRow;
