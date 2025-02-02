import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { pure } from "recompose";
import { LoopLeft, LoopRight } from "../StyleKit";

const LoopFlag = ({ type, left, isEnabled }) => (
  <View
    style={{
      position: "absolute",
      top: 0,
      left: type === "begin" ? left - 1 : left - 29,
      width: 30,
      height: 30
    }}
  >
    {type === "begin" ? (
      <LoopLeft isEnabled={isEnabled} style={{ width: 30, height: 30 }} />
    ) : (
      <LoopRight isEnabled={isEnabled} style={{ width: 30, height: 30 }} />
    )}
  </View>
);

LoopFlag.propTypes = {
  type: PropTypes.string.isRequired,
  left: PropTypes.number.isRequired,
  isEnabled: PropTypes.bool.isRequired
};

export default pure(LoopFlag);
