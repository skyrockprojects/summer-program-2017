int sensorValue;

void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);
}

void loop() {
  sensorValue = analogRead(A0);
  Serial.println(sensorValue);
  delay(100);

}
