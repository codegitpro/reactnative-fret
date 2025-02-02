import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { createOrUpdateLoop, getLoops } from "../../models/Loops";
import { getIsPhone } from "../../utils";

import ModalButton from "./ModalButton";
import Popover from "./Popover";
import { BtnPhoneLoopSave } from "../StyleKit";
import { ModalType } from "./ModalType";
import { trackLoopSave } from "../../metrics";

class BtnSaveLoopModal extends React.Component {
  state = {
    modalIsVisible: false,
    inputText: "",
    myLoops: []
  };

  render() {
    const existingName = this.props.currentLoop.get("name");
    const isPhone = getIsPhone();
    const top = isPhone ? 0 : -300;
    const disabled = !this.props.isEnabled || false;
    const color = disabled ? "#888888" : "#222222";

    return (
      <ModalButton disabled={disabled} onPress={this.displayModal}>
        {isPhone ? (
          <BtnPhoneLoopSave style={{ width: 36, height: 36 }} color={color} />
        ) : (
          <Text style={[this.props.style, { color }]}>Save Loop</Text>
        )}

        {this.state.modalIsVisible && (
          <Popover
            type={ModalType.Center}
            style={{
              width: 500,
              height: 200,
              marginTop: top,
              padding: 20,
              backgroundColor: "white"
            }}
            isVisible={this.state.modalIsVisible}
            onDismiss={this.dismissModal}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 22,
                  fontWeight: "800"
                }}
              >
                {existingName ? "Rename Loop" : "Name Your Loop"}
              </Text>

              <Text
                style={{
                  flex: 1,
                  fontSize: 18,
                  fontWeight: "400"
                }}
              >
                {existingName
                  ? `Please enter a new name for '${existingName}'`
                  : "Please enter a name for the new loop"}
              </Text>

              <TextInput
                style={{
                  flex: 1,
                  fontSize: 22,
                  fontWeight: "400"
                }}
                autoFocus={!isPhone}
                placeholder={"Loop name"}
                defaultValue={existingName}
                autoCapitalize={"words"}
                onChangeText={this.handleTextInput}
              />

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{ flex: -1 }}
                  onPress={this.dismissModal}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      textAlign: "right"
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flex: -1, marginLeft: 50 }}
                  onPress={this.saveLoop}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "200",
                      textAlign: "right"
                    }}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Popover>
        )}
      </ModalButton>
    );
  }

  async componentWillMount() {
    this.setState({ myLoops: await getLoops(this.props.mediaId) });
  }

  displayModal = async () => {
    const begin = this.props.currentLoop.get("begin");
    const end = this.props.currentLoop.get("end");
    if (begin === undefined && end == undefined) {
      Alert.alert(
        "Loop Times",
        "Please set a begin and end time for your loop"
      );
    } else {
      if (this.props.onForceControlsVisible !== undefined) {
        this.props.onForceControlsVisible(true);
      }
      this.props.presentModal();
      let myLoops = await getLoops(this.props.mediaId);
      this.setState({ modalIsVisible: true, myLoops });
    }
  };

  dismissModal = () => {
    if (this.props.onForceControlsVisible !== undefined) {
      this.props.onForceControlsVisible(false);
    }
    this.props.dismissModal();
    this.setState({ modalIsVisible: false });
  };

  handleTextInput = text => {
    this.setState({ inputText: text });
  };

  saveLoop = async () => {
    const name = this.state.inputText;

    if (name === "") {
      Alert.alert("Loop Name", "Please enter a name with at least 1 character");
    } else {
      const matching = this.state.myLoops.filter(loop => loop.name === name);
      if (matching.length > 0) {
        Alert.alert(
          "Existing Name",
          `You already have a loop named ${name} for this media. Please give it a different name`
        );
      } else {
        const loop = this.props.currentLoop.set("name", name);
        this.props.onSetCurrentLoop(loop);
        createOrUpdateLoop(loop.toJS(), this.props.mediaId);
        trackLoopSave(name);
        this.dismissModal();
      }
    }
  };
}

BtnSaveLoopModal.propTypes = {
  isEnabled: PropTypes.bool,
  style: PropTypes.object.isRequired,
  mediaId: PropTypes.string.isRequired,
  currentLoop: PropTypes.object.isRequired,
  onSetCurrentLoop: PropTypes.func.isRequired,
  onForceControlsVisible: PropTypes.func,
  presentModal: PropTypes.func.isRequired,
  dismissModal: PropTypes.func.isRequired
};

export default connect(null, actions)(BtnSaveLoopModal);
