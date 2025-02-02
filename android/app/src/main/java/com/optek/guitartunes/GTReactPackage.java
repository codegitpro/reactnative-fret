package com.optek.guitartunes;

import com.optek.guitartunes.ble.GTGuitarController;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class GTReactPackage implements ReactPackage {

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList(new BSTestViewManager());
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    modules.add(new BSVolumeController(reactContext));
    modules.add(new GTGuitarController(reactContext));
    modules.add(new GTIdleTimerController(reactContext));
    modules.add(new GTCrypto(reactContext));
    modules.add(new GTMidiNotePlayer(reactContext));

    return modules;
  }
}