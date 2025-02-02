import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import MarkerFull from "./MarkerFull";
import MarkerAbbreviated from "./MarkerAbbreviated";

class PlaybackMarkers extends React.Component {
  render() {
    return (
      <View
        style={{
          position: "absolute",
          top: 25,
          left: 0,
          width: this.props.width,
          height: this.props.height + 10
        }}
      >
        {this.buttonsForMarkers()}
      </View>
    );
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.markers) return false;
    return (
      !nextProps.markers.equals(this.props.markers) ||
      nextProps.duration !== this.props.duration ||
      nextProps.width !== this.props.width ||
      nextProps.height !== this.props.height
    );
  }

  buttonsForMarkers() {
    const {
      left,
      width,
      height,
      duration,
      markers,
      onMarkerPress,
      onMarkerLongPress
    } = this.props;

    var operationalWidth = width - left * 2;

    if (
      markers &&
      duration > 0 &&
      markers.count() > 0 &&
      operationalWidth > 10
    ) {
      var buttons = [];

      buttons = markers.map((marker, index) => {
        var percent = marker.time / duration;
        var x = left - 15 + operationalWidth * percent;

        var end =
          index < markers.count() - 1 ? markers.get(index + 1).time : duration;

        if (height > 100) {
          return (
            <MarkerFull
              key={index}
              marker={marker}
              end={end}
              left={Math.round(x)}
              onMarkerPress={onMarkerPress}
              onMarkerLongPress={onMarkerLongPress}
              height={height}
            />
          );
        } else {
          return (
            <MarkerAbbreviated
              key={index}
              marker={marker}
              end={end}
              left={x}
              onMarkerPress={onMarkerPress}
              onMarkerLongPress={onMarkerLongPress}
            />
          );
        }
      });

      return buttons;
    } else {
      return <View />;
    }
  }
}

PlaybackMarkers.propTypes = {
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  markers: PropTypes.object.isRequired,
  onMarkerPress: PropTypes.func.isRequired,
  onMarkerLongPress: PropTypes.func.isRequired
};

export default PlaybackMarkers;
