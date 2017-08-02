#include <LiquidCrystal.h>
int sensorValue;
float temperature;
int sensorPin = A0;
float voltage;
// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  pinMode(sensorPin, INPUT);
  Serial.begin(9600);
  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
  // Print a message to the LCD.
  lcd.print("hello, world!");
}

void loop() {
  sensorValue = analogRead(sensorPin);
  voltage = (float)(voltage);
  voltage = (sensorValue / 1024.01) * 5;
  temperature = (float)(temperature);
  temperature = (voltage - 0.5) * 100;
  // set the cursor to column 0, line 1
  // (note: line 1 is the second row, since counting begins with 0):
  lcd.setCursor(0, 1);
  // print the number of seconds since reset:
  lcd.print("degrees C:");
  lcd.print(temperature);
  delay(1000);
}
