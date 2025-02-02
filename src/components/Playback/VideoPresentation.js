import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import Midi from "./Midi";
import PlaybackVideoPrimary from "./PlaybackVideoPrimary";
import PlaybackTimeline from "./PlaybackTimeline";
import PlaybackSecondary from "./PlaybackSecondary";
import { playerBackground } from "../../design";
import { BtnVideoExitFullScreen, BtnToggleFretboard } from "../StyleKit";
import { BtnChapterModal } from "../modals";

const VideoPresentation = props => {
  return (
    <View
      style={{
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: props.isFullscreen ? "black" : playerBackground,
        margin: props.isFullscreen ? 0 : 4,
        paddingVertical: props.isFullscreen ? 0 : 4,
        paddingHorizontal: props.isFullscreen ? 0 : 12,
        borderRadius: props.isFullscreen ? 0 : 6
      }}
    >
      <Midi
        midi={props.midiFile}
        onData={props.onMidiData}
        clearMidiData={props.onClearMidiData}
        clearMidi={props.onClearMidi}
        loadMidi={props.onLoadMidi}
      />

      <View style={{ width: "100%", height: "100%" }}>
        <PlaybackVideoPrimary
          mediaId={props.mediaId}
          title={props.title}
          artist={props.artist}
          artworkURL={props.artworkURL}
          tempo={props.tempo}
          videoUri={props.videoUri}
          duration={props.duration}
          markers={props.videoChapters}
          currentChapter={props.currentVideoChapter}
          currentMarker={props.currentVideoMarker}
          isPlaying={props.isPlaying}
          isPhone={props.isPhone}
          isFullscreen={props.isFullscreen}
          areControlsVisible={props.areControlsVisible}
          onVideoLoad={props.onVideoLoad}
          onProgress={props.onProgress}
          onEnd={props.onEnd}
          onError={props.onError}
          onPlayerRegister={props.onPlayerRegister}
          onPreviousPress={props.onPreviousPress}
          onBackPress={props.onBackPress}
          onPlayPausePress={props.onPlayPausePress}
          onForwardPress={props.onForwardPress}
          onNextPress={props.onNextPress}
          onMarkerPress={props.onMarkerPress}
          onDisplayControls={props.onDisplayControls}
          onFullscreen={props.onFullscreen}
          onForceControlsVisible={props.onForceControlsVisible}
        />

        {(props.areControlsVisible || !props.isFullscreen) && (
          <View
            style={{
              flex: -1,
              position: props.isFullscreen ? "absolute" : "relative",
              bottom: 0,
              width: "100%"
            }}
          >
            {props.isFullscreen &&
              !props.isPhone && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: "100%",
                    height: 60,
                    paddingRight: 10,
                    paddingBottom: 10
                  }}
                >
                  <BtnVideoExitFullScreen
                    style={{
                      width: 50,
                      height: 50
                    }}
                    color={"#FFFFFF"}
                    onPress={props.onFullscreen}
                  />
                </View>
              )}

            <View
              style={{
                flex: -1,
                width: "100%",
                paddingBottom: props.isPhone ? 4 : 10,
                backgroundColor: props.isFullscreen
                  ? "rgba(255, 255, 255, 0.85)"
                  : "rgba(0, 0, 0, 0)"
              }}
            >
              {props.isFullscreen && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingHorizontal: 10,
                    height: props.isPhone ? 36 : 50,
                    marginBottom: props.isPhone ? -16 : 0
                  }}
                >
                  <BtnChapterModal
                    isPhone={props.isPhone}
                    videoMarkers={props.videoChapters}
                    currentChapter={props.currentVideoChapter}
                    currentMarker={props.currentVideoMarker}
                    onMarkerPress={props.onMarkerPress}
                    onForceControlsVisible={props.onForceControlsVisible}
                  />
                  <BtnToggleFretboard
                    style={{
                      width: props.isPhone ? 36 : 50,
                      height: props.isPhone ? 36 : 50
                    }}
                    color={"#FFFFFF"}
                    onPress={() => {
                      props.onToggleFretboards();
                    }}
                  />
                </View>
              )}

              <PlaybackTimeline
                duration={props.duration}
                currentLoop={props.currentLoop}
                loopIsEnabled={props.loopIsEnabled}
                videoMarkers={props.videoMarkers}
                currentVideoChapter={props.currentVideoChapter}
                currentVideoMarker={props.currentVideoMarker}
                iisPhone={props.isPhone}
                isVideo={true}
                isFullscreen={props.isFullscreen}
                onSeekStart={props.onSeekStart}
                onSeek={props.onSeek}
                onSeekEnd={props.onSeekEnd}
                onLoopEnable={props.onLoopEnable}
                onForceControlsVisible={props.onForceControlsVisible}
              />
              <PlaybackSecondary
                mediaId={props.mediaId}
                tempo={props.tempo}
                loopIsEnabled={props.loopIsEnabled}
                isPhone={props.isPhone}
                isVideo={true}
                isFullscreen={props.isFullscreen}
                currentLoop={props.currentLoop}
                currentVideoMidiFile={props.currentVideoMidiFile}
                quickLoops={props.quickLoops}
                connectedDevices={props.connectedDevices}
                onSelectTempo={props.onSelectTempo}
                onLoopEnable={props.onLoopEnable}
                onLoopBegin={props.onLoopBegin}
                onLoopEnd={props.onLoopEnd}
                onSetCurrentLoop={props.onSetCurrentLoop}
                onClearCurrentLoop={props.onClearCurrentLoop}
                onPrevStep={props.onPrevStep}
                onNextStep={props.onNextStep}
                onDisplayInfo={props.onDisplayInfo}
                onForceControlsVisible={props.onForceControlsVisible}
                onToggleFretlightAdmin={props.onToggleFretlightAdmin}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

VideoPresentation.propTypes = {
  mediaId: PropTypes.string.isRequired,
  midiFile: PropTypes.string,
  videoUri: PropTypes.string,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  artworkURL: PropTypes.string.isRequired,
  tempo: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  videoChapters: PropTypes.array.isRequired,
  videoMarkers: PropTypes.array.isRequired,
  currentVideoChapter: PropTypes.object.isRequired,
  currentVideoMarker: PropTypes.object.isRequired,
  quickLoops: PropTypes.array.isRequired,
  connectedDevices: PropTypes.number.isRequired,
  currentVideoMidiFile: PropTypes.string,
  currentLoop: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isPhone: PropTypes.bool.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  areControlsVisible: PropTypes.bool.isRequired,
  loopIsEnabled: PropTypes.bool.isRequired,
  onVideoLoad: PropTypes.func.isRequired,
  onLoadMidi: PropTypes.func.isRequired,
  onMidiData: PropTypes.func.isRequired,
  onClearMidi: PropTypes.func.isRequired,
  onClearMidiData: PropTypes.func.isRequired,
  onProgress: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onPlayerRegister: PropTypes.func.isRequired,
  onPreviousPress: PropTypes.func.isRequired,
  onBackPress: PropTypes.func.isRequired,
  onPlayPausePress: PropTypes.func.isRequired,
  onForwardPress: PropTypes.func.isRequired,
  onNextPress: PropTypes.func.isRequired,
  onMarkerPress: PropTypes.func.isRequired,
  onSeekStart: PropTypes.func.isRequired,
  onSeek: PropTypes.func.isRequired,
  onSeekEnd: PropTypes.func.isRequired,
  onSelectTempo: PropTypes.func.isRequired,
  onLoopEnable: PropTypes.func.isRequired,
  onLoopBegin: PropTypes.func.isRequired,
  onLoopEnd: PropTypes.func.isRequired,
  onSetCurrentLoop: PropTypes.func.isRequired,
  onClearCurrentLoop: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
  onDisplayInfo: PropTypes.func.isRequired,
  onDisplayControls: PropTypes.func.isRequired,
  onForceControlsVisible: PropTypes.func.isRequired,
  onFullscreen: PropTypes.func.isRequired,
  onToggleFretboards: PropTypes.func.isRequired,
  onToggleFretlightAdmin: PropTypes.func.isRequired
};

export default VideoPresentation;
