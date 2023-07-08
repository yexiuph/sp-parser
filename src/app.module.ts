import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerialportModule } from './serialport/serialport.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [SerialportModule, MqttModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
