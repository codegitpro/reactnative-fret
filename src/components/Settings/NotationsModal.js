import React from "react";
import PropTypes from "prop-types";
import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { PrimaryBlue } from "../../design";

const NotationsModal = ({ origin, currentNotation, onSelect, onClose }) => {
  return (
    <Modal animationType="fade" transparent={true} onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.container}
        onPress={onClose}
        activeOpacity={1}
      >
        <View
          style={[styles.content, { top: origin.y - 5, left: origin.x - 180 }]}
        >
          <NotationsModalRow
            currentNotation={currentNotation}
            notation={"Flats"}
            onSelect={onSelect}
          />
          <NotationsModalRow
            currentNotation={currentNotation}
            notation={"Sharps"}
            onSelect={onSelect}
          />
          <NotationsModalRow
            currentNotation={currentNotation}
            notation={"None"}
            onSelect={onSelect}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const NotationsModalRow = ({ currentNotation, notation, onSelect }) => (
  <TouchableOpacity
    style={styles.row}
    onPress={() => {
      onSelect(notation);
    }}
  >
    <Text style={styles.label}>{currentNotation === notation ? "✔" : ""}</Text>
    <Text style={styles.button}>{notation}</Text>
  </TouchableOpacity>
);

NotationsModal.propTypes = {
  origin: PropTypes.object.isRequired,
  currentNotation: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(1,1,1,0.5)",
    width: "100%",
    height: "100%"
  },
  content: {
    position: "absolute",
    width: 150,
    height: 120,
    backgroundColor: "#dddddd"
  },
  row: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    alignItems: "flex-start",
    paddingHorizontal: 10
  },
  label: {
    fontSize: 18,
    width: 18,
    height: "100%",
    textAlignVertical: "center",
    marginRight: 10
  },
  button: {
    fontSize: 18,
    flex: 1,
    height: "100%",
    color: PrimaryBlue,
    textAlignVertical: "center"
  }
});

export default NotationsModal;
