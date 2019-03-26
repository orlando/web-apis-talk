import React, { Component } from "react";
import "./Bluetooth.scss";

// Taken from https://github.com/WebBluetoothCG/demos/blob/gh-pages/heart-rate-sensor/heartRateSensor.js#L53
const parseHeartRate = value => {
  // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
  value = value.buffer ? value : new DataView(value);
  let flags = value.getUint8(0);
  let rate16Bits = flags & 0x1;
  let result = {};
  let index = 1;
  if (rate16Bits) {
    result.heartRate = value.getUint16(index, /*littleEndian=*/ true);
    index += 2;
  } else {
    result.heartRate = value.getUint8(index);
    index += 1;
  }
  let contactDetected = flags & 0x2;
  let contactSensorPresent = flags & 0x4;
  if (contactSensorPresent) {
    result.contactDetected = !!contactDetected;
  }
  let energyPresent = flags & 0x8;
  if (energyPresent) {
    result.energyExpended = value.getUint16(index, /*littleEndian=*/ true);
    index += 2;
  }
  let rrIntervalPresent = flags & 0x10;
  if (rrIntervalPresent) {
    let rrIntervals = [];
    for (; index + 1 < value.byteLength; index += 2) {
      rrIntervals.push(value.getUint16(index, /*littleEndian=*/ true));
    }
    result.rrIntervals = rrIntervals;
  }
  return result;
};

class Bluetooth extends Component {
  state = {
    battery: 0,
    heartRate: 0
  };

  componentWillUnmount() {
    this.disconnect();
  }

  disconnect() {
    if (this.batteryCharacteristic) {
      this.batteryCharacteristic.removeEventListener(
        "characteristicvaluechanged",
        this.onBatteryChange
      );
    }

    if (this.heartRateCharacteristic) {
      this.heartRateCharacteristic.removeEventListener(
        "characteristicvaluechanged",
        this.onHeartRateChange
      );
    }

    if (this.batteryDevice) {
      this.batteryDevice.gatt.disconnect();
      this.batteryDevice = null;
    }

    if (this.heartRateDevice) {
      this.heartRateDevice.gatt.disconnect();
      this.heartRateDevice = null;
    }
  }

  getBattery = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["battery_service"] }]
      });

      this.batteryDevice = device;

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("battery_service");
      this.batteryCharacteristic = await service.getCharacteristic(
        "battery_level"
      );

      // listen for events
      this.batteryCharacteristic.startNotifications();

      // add event listener
      this.batteryCharacteristic.addEventListener(
        "characteristicvaluechanged",
        this.onBatteryChange
      );

      // read value
      const value = await this.batteryCharacteristic.readValue();

      // set value here, new values will come through notifications
      this.setState({
        battery: value.getUint8(0)
      });
    } catch (error) {
      console.log(error);
    }
  };

  getHeartRate = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["heart_rate"] }]
      });
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("heart_rate");
      this.heartRateCharacteristic = await service.getCharacteristic(
        "heart_rate_measurement"
      );

      // listen for events
      this.heartRateCharacteristic.startNotifications();

      // add event listener
      this.heartRateCharacteristic.addEventListener(
        "characteristicvaluechanged",
        this.onHeartRateChange
      );
    } catch (error) {
      console.log(error);
    }
  };

  onBatteryChange = event => {
    this.setState({
      battery: event.target.value.getUint8(0)
    });
  };

  onHeartRateChange = event => {
    const value = parseHeartRate(event.target.value);
    const heartRate = value.heartRate;

    this.setState({
      heartRate
    });
  };

  render() {
    return (
      <div className="bluetooth">
        <button onClick={this.getBattery}>Battery</button>
        <button onClick={this.getHeartRate}>Heart Rate</button>

        <div className="values">
          <div className="value">
            {this.state.battery}{" "}
            <span role="img" aria-label="img">
              🔋
            </span>
          </div>
          <div className="value">
            {this.state.heartRate}{" "}
            <span role="img" aria-label="img">
              ❤️
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Bluetooth;
