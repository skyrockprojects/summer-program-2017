int buttonPin = 2;
int LED = 3;

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    Serial.println("OFF");
    digitalWrite(LED, LOW);
  } 
  else if (digitalRead(buttonPin) == HIGH) {
    Serial.println("ON");
    digitalWrite(LED, HIGH);    
  }
  delay(100);
}
