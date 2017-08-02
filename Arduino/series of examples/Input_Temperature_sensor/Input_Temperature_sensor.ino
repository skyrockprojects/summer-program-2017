int sensorValue;
float voltage;
float temperature;
int sensorPin = A0;

void setup() {
  pinMode(sensorPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  sensorValue = analogRead(sensorPin);
  voltage = (float)(voltage);
  voltage = (sensorValue / 1024.01) * 5;
  temperature = (float)(temperature);
  temperature = (voltage - 0.5) * 100;

  Serial.print("Sensor Value:  ");
  Serial.print(sensorValue);
  Serial.print(" , Volt:");
  Serial.print(voltage);
  Serial.print(" , degrees C:");
  Serial.println(temperature);
  delay(100);

}
