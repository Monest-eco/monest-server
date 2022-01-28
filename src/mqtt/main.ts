import { Esp32Data } from 'src/@types/esp32';
import { Esp32Service } from 'src/esp32/esp32.service';
import { MqttController } from './mqtt';

/**
 * Create and run MQTT client
 */
export async function MQTTClient() {
  const mqttEspClient = new MqttController();
  await mqttEspClient.init();
  const esp = new Esp32Service();

  mqttEspClient.onConnect(() => {
    console.log('Connected');
    mqttEspClient.subscribe(['esp32/watt'], () => {
      console.log(`Subscribe to 'esp32/watt' '${'esp32/watt'}'`);
    });
  });

  mqttEspClient.onMessage((topic, payload) => {
    console.log('Received Message:', topic, payload.toString());
    const data: Esp32Data = {
      date: new Date(),
      watt: parseInt(payload.toString(), 10),
    };
    esp.create(data);
  });

  process.on('SIGINT', () => {
    mqttEspClient.end();
  });
}
