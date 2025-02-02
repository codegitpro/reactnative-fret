import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { BtnPhoneTempo } from "../StyleKit";

const TempoText = ({ color, tempo, isPhone, withTitle }) => (
  <View
    style={{
      height: "100%",
      flexDirection: "row",
      alignItems: "center"
    }}
  >
    {withTitle &&
      !isPhone && (
        <Text
          style={{
            height: "100%",
            textAlignVertical: "center",
            fontSize: 20,
            marginHorizontal: 2,
            color: color
          }}
        >
          Tempo:
        </Text>
      )}

    {withTitle &&
      isPhone && (
        <BtnPhoneTempo
          style={{
            width: 40,
            height: 40,
            marginLeft: 5
          }}
          color={color}
        />
      )}

    {tempo > 0 ? (
      <Text
        style={{
          height: "100%",
          textAlignVertical: "center",
          fontSize: isPhone ? 16 : 20,
          color: color
        }}
      >
        {`${parseInt(tempo * 100)}%`}
      </Text>
    ) : (
      <View
        style={{
          height: "100%",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            height: "100%",
            textAlignVertical: "center",
            fontWeight: "800",
            fontSize: 20,
            color: color
          }}
        >
          NOTE
        </Text>
        <Text
          style={{
            height: "100%",
            textAlignVertical: "center",
            fontSize: 20,
            color: color
          }}
        >
          Step™
        </Text>
      </View>
    )}
  </View>
);

TempoText.propTypes = {
  color: PropTypes.string.isRequired,
  tempo: PropTypes.number.isRequired,
  isPhone: PropTypes.bool.isRequired,
  withTitle: PropTypes.bool.isRequired
};

export default TempoText;
