package com.optek.guitartunes.ble;

import com.optek.fretlight.sdk.FretlightGuitar;

import android.content.Context;
import android.content.ContentResolver;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;

import io.sentry.Sentry;
import io.sentry.event.BreadcrumbBuilder;

import java.util.Map;
import java.util.HashMap;
import java.lang.Thread;
import java.lang.Object;

public class GTGuitarController extends ReactContextBaseJavaModule {
  ReactApplicationContext context;
  private Guitars mGuitars;
  GuitarEmitter guitarEmitter;

  private static final String TAG = "GT-GuitarController";

  public GTGuitarController(ReactApplicationContext context) {
    super(context);

    this.context = context;
    mGuitars = Guitars.getInstance();

    guitarEmitter = GuitarEmitter.getInstance();

    logSentry("GTGuitarController instantiated");
    mGuitars.setListener(new Guitars.ChangeListener() {
      @Override
      public void onChange(String action, String guitarId) {
        if (action == "connect") {
          guitarEmitter.emit("GUITAR_CONNECTED", guitarId);
          logSentry("GTGuitarController connected to guitar: " + guitarId);
          stopScanning();
          restartScanning();
        } else {
          logSentry("GTGuitarController disconnected from guitar: " + guitarId);
          guitarEmitter.emit("GUITAR_DISCONNECTED", guitarId);
        }
      }
    });
  }

  @Override
  public String getName() {
    return "GTGuitarController";
  }

  private void logSentry(String message) {
    // throw new RuntimeException("TEST - Sentry Client Crash");
    Sentry.record(new BreadcrumbBuilder().setMessage(message).build());
  }

  private FretlightGuitar checkForConnectedGuitar(String guitarId) {
    FretlightGuitar guitar = mGuitars.getById(guitarId);
    if (guitar != null) {
      return guitar;
    } else {
      guitarEmitter.emit("GUITAR_LOST", guitarId);
      logSentry("GTGuitarController lost guitar: " + guitarId);
      for (FretlightGuitar mGuit : mGuitars) {
        logSentry("still connected guitar: " + mGuit.getName());
      }
      return null;
    }
  }

  // REGISTER EMITTER

  @ReactMethod
  public void registerEmitter() {
    guitarEmitter.setContext(context);
  }

  // SCANNING

  @ReactMethod
  public void startScanning() {
    logSentry("GTGuitarController startScanning");
    Intent intent = new Intent(context, ScanningActivity.class);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    context.startActivity(intent);
  }

  @ReactMethod
  public void stopScanning() {
    logSentry("GTGuitarController stopScanning");
    Intent intent = new Intent(context, ScanningActivity.class);
    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    intent.putExtra("EXIT", true);
    context.startActivity(intent);
  }

  private void restartScanning() {
    logSentry("GTGuitarController restartScanning");
    Intent intent = new Intent(context, ScanningActivity.class);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    context.startActivity(intent);
  }

  // LIGHTING

  @ReactMethod
  public void lightAll(String guitarId) {
    FretlightGuitar guitar = checkForConnectedGuitar(guitarId);
    if (guitar != null) {
      guitar.allOn();
    }
  }

  @ReactMethod
  public void lightString(int string, String guitarId) {
    for (int i = 0; i < 23; i++) {
      setNote(string, i, true, guitarId);
    }
  }

  @ReactMethod
  public void setNote(int string, int fret, boolean isOn, String guitarId) {
    FretlightGuitar guitar = checkForConnectedGuitar(guitarId);
    if (guitar != null) {
      guitar.setNote(string, fret, isOn);
    }
  }

  @ReactMethod
  public void setNotes(ReadableArray notes, String guitarId) {
    FretlightGuitar guitar = checkForConnectedGuitar(guitarId);

    if (guitar != null) {
      for (int i = 0; i < notes.size(); i++) {
        ReadableMap note = (ReadableMap) notes.getMap(i);
        //Log.d(TAG, "string: " + note.getInt("string") + "fret: " + note.getInt("fret") + "isOn: " + note.getBoolean("isOn"));
        guitar.setNote(note.getInt("string"), note.getInt("fret"), note.getBoolean("isOn"));
      }
    }
  }

  // CLEARING

  @ReactMethod
  public void clearAll(String guitarId) {
    Log.d(TAG, "clearing guitar");
    FretlightGuitar guitar = checkForConnectedGuitar(guitarId);
    if (guitar != null) {
      guitar.allOff();
    }
  }

  @ReactMethod
  public void clearAllGuitars() {
    Log.d(TAG, "clearing all guitars");
    for (FretlightGuitar mGuit : mGuitars) {
      FretlightGuitar guitar = checkForConnectedGuitar(mGuit.getName());
      if (guitar != null) {
        guitar.allOff();
      }
    }
  }

  // SETTINGS

  @ReactMethod
  public boolean getLeft(String guitarId) {
    FretlightGuitar guitar = checkForConnectedGuitar(guitarId);
    return guitar != null ? guitar.isLefty() : false;
  }

  @ReactMethod
  public boolean getBass(String guitarId) {
    FretlightGuitar guitar = checkForConnectedGuitar(guitarId);
    return guitar != null ? guitar.isBass() : false;
  }

  @ReactMethod
  public void setLeft(boolean isLeft, String guitarId) {
    FretlightGuitar guitar = checkForConnectedGuitar(guitarId);
    if (guitar != null) {
      guitar.setLefty(isLeft);
    }
  }

  @ReactMethod
  public void setBass(boolean isBass, String guitarId) {
    FretlightGuitar guitar = checkForConnectedGuitar(guitarId);
    if (guitar != null) {
      guitar.setBass(isBass);
    }
  }
}
