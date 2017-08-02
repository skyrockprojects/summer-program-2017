void setup() {
  pinMode(8, OUTPUT);

}

void loop() {
  for (int count = 0; count < 10; count++) {
    tone(8,1000);
    delay(50);
    tone(8,500);
    delay(50);
  }
  noTone(8);
  delay(2000);

}
