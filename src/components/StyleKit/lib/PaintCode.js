import React, { Component } from "react";
import PropTypes from "prop-types";

import BSTestView from "./BSTestView";

export const PaintCode = class extends Component {
  state = {
    nativeArgs: []
  };

  render() {
    // console.log(this.state);
    return (
      <BSTestView
        drawMethod={this.props.drawMethod}
        drawArgs={this.state.nativeArgs}
        style={{
          width: 50,
          height: 50,
          ...this.props.style
        }}
      />
    );
  }

  componentWillMount() {
    const nativeArgs = this.makeNativeArgs(this.props, this.props.drawArgs);

    const newState = {
      nativeArgs
    };

    // console.log({ newState });

    this.setState(newState);
  }

  componentWillReceiveProps(newProps) {
    const nativeArgs = this.makeNativeArgs(newProps, this.props.drawArgs);

    const newState = {
      nativeArgs
    };

    this.setState(newState);
  }

  makeNativeArgs = (props, args = []) => {
    // allow the user to not specify drawArgs if there is only 1 prop
    if (args.length === 0) {
      for (key in props) {
        if (key !== "drawMethod" && key !== "style") {
          const singleArg = [props[key]];
          return singleArg;
        }
      }
    }

    const nativeArgs = args.map(arg => {
      const p = props[arg];
      return p !== undefined ? p : null;
    });

    return nativeArgs;
  };
};

PaintCode.propTypes = {
  drawMethod: PropTypes.string.isRequired,
  drawArgs: PropTypes.arrayOf(PropTypes.string)
};
