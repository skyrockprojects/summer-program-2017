int LED_red = 5;
int LED_yellow = 4;
int LED_blue = 3;
int LED_green = 2;

void setup() {
  pinMode(LED_red, OUTPUT);
  pinMode(LED_yellow, OUTPUT);
  pinMode(LED_blue, OUTPUT);
  pinMode(LED_green, OUTPUT);
}

void loop() {
  digitalWrite(LED_red, HIGH);
  delay(1000);
  digitalWrite(LED_red, LOW);
  digitalWrite(LED_yellow, HIGH);
  delay(1000);
  digitalWrite(LED_yellow, LOW);
  digitalWrite(LED_blue, HIGH);
  delay(1000);
  digitalWrite(LED_blue, LOW);
  digitalWrite(LED_green, HIGH);
  delay(1000);
  digitalWrite(LED_green, LOW);

}
