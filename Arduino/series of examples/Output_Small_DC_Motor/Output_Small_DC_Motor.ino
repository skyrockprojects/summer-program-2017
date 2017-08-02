int motorPin = 3;

void setup() {
  pinMode(motorPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  analogWrite(motorPin, 255);

}
