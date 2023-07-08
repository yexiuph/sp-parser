import { Module } from '@nestjs/common';
import { SerialportService } from './serialport.service';
import { MqttModule } from 'src/mqtt/mqtt.module';

@Module({
  imports: [MqttModule],
  providers: [SerialportService],
})
export class SerialportModule {}
