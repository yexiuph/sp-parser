import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SerialPort, ReadlineParser } from 'serialport';
import { MqttService } from 'src/mqtt/mqtt.service';

@Injectable()
export class SerialportService implements OnModuleInit {
  private readonly serial = SerialPort;
  private readonly readLineParser = ReadlineParser;
  private path;
  constructor(private readonly mqtt: MqttService) {}

  async onModuleInit() {
    Logger.log('Initializing SerialPort');
    this.path = new this.serial({ path: 'COM5', baudRate: 9600 });

    const parser = new this.readLineParser();
    this.path.pipe(parser);

    parser.on('open', () => {
      Logger.log('Connecting..');
    });

    parser.on('data', (data) => {
      if (data === 'START') {
        Logger.log(`Start button pressed.`);
        this.mqtt.mqttPublish('control/button1', data);
      }
      if (data === 'RESET') {
        Logger.log(`Reset button pressed.`);
        this.mqtt.mqttPublish('control/button2', data);
      }
      const newData = data.substring(6);
      if (data.startsWith('DATA01')) {
        Logger.log(`Data from Sensor 1 : ${newData}`);
        this.mqtt.mqttPublish('control/outbound1', newData);
      }
      if (data.startsWith('DATA02')) {
        Logger.log(`Data from Sensor 2 : ${newData}`);
        this.mqtt.mqttPublish('control/outbound2', newData);
      }
    });
  }
}
