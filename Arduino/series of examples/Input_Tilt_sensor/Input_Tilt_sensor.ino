int sensorPin = 2;

void setup() {
  pinMode(sensorPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(sensorPin) == LOW) {
    Serial.println("ON");
  } else if (digitalRead(sensorPin) == HIGH) {
    Serial.println("OFF");
  }
  delay(100);

}
