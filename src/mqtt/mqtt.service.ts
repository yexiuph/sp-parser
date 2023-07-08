import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { IClientOptions, connect } from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private mqttClient;

  constructor() {}

  onModuleInit() {
    const clientId = `edge_${Math.random().toString(16).slice(3)}`;

    const connectionUrl = `mqtt://localhost:1883`;
    const topic = 'control/inbound';

    const mqttOptions: IClientOptions = {
      clientId,
      protocolId: 'MQIsdp',
      protocolVersion: 3,
      connectTimeout: 1000,
      reconnectPeriod: 1000,
    };

    this.mqttClient = connect(connectionUrl, mqttOptions);

    this.mqttClient.on('connect', () => {
      Logger.log('Connected to MQTT', 'MQTT Service');
      this.mqttClient.subscribe(topic, function (err: any) {
        if (!err) Logger.log(`Subscribed to topic: ${topic}`, 'MQTT Service');
        else Logger.error(err, 'MQTT Service');
      });
    });

    this.mqttClient.on('error', function () {
      Logger.error('Error connecting to the MQTT broker', 'MQTT Service');
    });

    this.mqttClient.on('message', (topic: string, message) => {
      Logger.log(`Recieved something from ${topic}`);
      Logger.log(`${message}`);
    });
  }

  public mqttPublish(topic: string, message) {
    this.mqttClient.public(topic, message);
  }
}
