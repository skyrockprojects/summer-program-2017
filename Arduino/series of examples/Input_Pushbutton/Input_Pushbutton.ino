int buttonPin = 2;

void setup() {
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    Serial.println("OFF");
  } else if (digitalRead(buttonPin) == HIGH) {
    Serial.println("ON");
  }
  delay(100);

}
