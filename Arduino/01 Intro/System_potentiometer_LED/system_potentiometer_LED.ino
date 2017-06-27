int sensorValue;
int brightness;
int sensorPin = A0;
int LED = 3;

void setup() {
  pinMode(sensorPin, INPUT);
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  sensorValue = analogRead(sensorPin);
  brightness = sensorValue / 4;
  Serial.println(brightness);
  analogWrite(LED, brightness);
  delay(100);

}
