import * as mqtt from 'mqtt';
import { Esp32Data } from 'src/@types/esp32';
import config from 'src/configs/deafult.config';
import { Esp32Service } from 'src/esp32/esp32.service';
import { connectToDatabase } from './database/connect';

/**
 * Create and run MQTT client
 */
export async function MQTTClient() {
  await connectToDatabase();
  const esp = new Esp32Service();
  const client = mqtt.connect(
    `mqtt://${config.hosting.url}:${config.hosting.port}`,
    {
      clean: config.mqtt.clean,
      connectTimeout: config.mqtt.connectTimeout,
      reconnectPeriod: config.mqtt.reconnectPeriod,
    },
  );

  client.on('connect', () => {
    console.log('Connected');
    client.subscribe(['esp32/watt'], () => {
      console.log(`Subscribe to 'esp32/watt' '${'esp32/watt'}'`);
    });
  });
  client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString());
    const data: Esp32Data = {
      date: new Date(),
      watt: parseInt(payload.toString(), 10),
    };
    esp.create(data);
  });
}
