import React, { Component } from "react";
import "./Bluetooth.scss";

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
        "characteristicvaluechanged"
      );
    }

    if (this.heartRateCharacteristic) {
      this.heartRateCharacteristic.removeEventListener(
        "characteristicvaluechanged"
      );
    }
  }

  getBattery = async () => {
    this.disconnect();

    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["battery_service"] }]
      });
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("battery_service");
      this.batteryCharacteristic = await service.getCharacteristic(
        "battery_level"
      );

      // listen to battery level changes
      this.batteryCharacteristic.addEventListener(
        "characteristicvaluechanged",
        this.onBatteryChange
      );

      const value = await this.batteryCharacteristic.readValue();

      console.log(`Battery: ${value.getUint8(0)}`);
    } catch (error) {
      console.log(error);
    }
  };

  getHeartRate = async () => {
    this.disconnect();

    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["heart_rate"] }]
      });
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("heart_rate");
      this.heartRateCharacteristic = await service.getCharacteristic(
        "battery_level"
      );

      // listen to battery level changes
      this.batteryCharacteristic.addEventListener(
        "characteristicvaluechanged",
        this.onHeartRateChange
      );

      const value = await this.heartRateCharacteristic.readValue();

      console.log(`Heart Rate: ${value}`);
    } catch (error) {
      console.log(error);
    }
  };

  onBatteryChange = event => {
    this.setState({
      battery: event.target.value
    });
  };

  onHeartRateChange = event => {
    this.setState({
      heartRate: event.target.value
    });
  };

  render() {
    return (
      <div className="bluetooth">
        <button onClick={this.getBattery}>Battery</button>
        <button onClick={this.getHeartRate}>Heart Rate</button>

        <div className="values">
          <div className="value">
            {this.state.battery} <span>🔋</span>
          </div>
          <div className="value">
            {this.state.heartRate} <span>❤️</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Bluetooth;
