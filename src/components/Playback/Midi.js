import React from "react";
import { View, Alert } from "react-native";
import PropTypes from "prop-types";

class Midi extends React.PureComponent {
  render() {
    return <View style={{ position: "absolute" }} />;
  }

  componentDidMount() {
    this.resetMidi(this.props.midi);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.midi !== this.props.midi) {
      this.resetMidi(newProps.midi);
    }
  }

  resetMidi = midi => {
    this.props.clearMidiData();
    this.loadMidi(midi);
    this.props.clearMidi();
  };

  loadMidi = path => {
    if (path !== null && path !== undefined) {
      this.props
        .loadMidi(path)
        .then(midi => {
          this.props.onData(midi);
        })
        .catch(err => {
          Alert.alert(
            "MIDI Error",
            `(2) We encountered an error when loading MIDI from file: ${err}`,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
          console.debug("error loading midi");
          console.debug(err);
        });
    } else {
      console.log("no midi to load");
    }
  };
}

Midi.propTypes = {
  loadMidi: PropTypes.func.isRequired,
  clearMidi: PropTypes.func.isRequired,
  clearMidiData: PropTypes.func.isRequired,
  onData: PropTypes.func.isRequired,
  midi: PropTypes.string
};

export default Midi;
