import React, { Component } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  KeyboardAvoidingView
} from "react-native";
import PropTypes from "prop-types";
import { ModalType, ModalTypePropType } from "./ModalType";

const positionStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)"
};

const centerStyle = {
  ...positionStyle,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

const fullStyle = {
  ...centerStyle
};

const styleForType = type => {
  switch (type) {
    case ModalType.Center:
      return centerStyle;
    case ModalType.Full:
      return fullStyle;
    default:
      return positionStyle;
  }
};

const Popover = ({ type, style, children, isVisible, onDismiss }) => (
  <Modal
    animationType={type === ModalType.Full ? "slide" : "fade"}
    transparent={type !== ModalType.Full}
    visible={isVisible}
    onRequestClose={() => {
      onDismiss();
    }}
  >
    <View style={styleForType(type)}>
      <TouchableOpacity
        style={{
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
        onPress={() => {
          onDismiss();
        }}
      />

      <KeyboardAvoidingView style={style} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </View>
  </Modal>
);

Popover.propTypes = {
  type: ModalTypePropType.isRequired,
  style: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isVisible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Popover;
