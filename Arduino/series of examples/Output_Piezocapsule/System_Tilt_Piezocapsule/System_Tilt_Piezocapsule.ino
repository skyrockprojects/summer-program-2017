int sensorPin = 2;

void setup() {
  pinMode(sensorPin, INPUT);
  Serial.begin(9600);
  pinMode(8, OUTPUT);

}

void loop() {
  if (digitalRead(sensorPin) == LOW) {
    Serial.println("ON");
  } else {
    Serial.println("OFF");
    for (int count = 0; count < 10; count++) {
      tone(8,1000);
      delay(50);
      tone(8,500);
      delay(50);
    }
    noTone(8);
  }
  delay(100);

}
