// These constants won't change.  They're used to give names
// to the pins used:
const int analogInPin = A0;  // Analog input pin that the potentiometer is attached to
const int analogInPin_b = A1;
const int analogOutPin = 9; // Analog output pin that the LED is attached to

int sensorValue = 0;        // value read from the pot
int sensorValue_b = 0; 
int outputValue = 0;        // value output to the PWM (analog out)
int outputValue_b = 0;

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
}

void loop() {
  // read the analog in value:
  sensorValue = analogRead(analogInPin);
  sensorValue_b = analogRead(analogInPin_b);
  // map it to the range of the analog out:
  outputValue = map(sensorValue, 0, 1023, 0, 255);
  outputValue_b = map(sensorValue_b, 0, 1023, 0, 255);
  // change the analog out value:
  analogWrite(analogOutPin, outputValue_b);
  
  // print the results to the serial monitor:
  //Serial.print("sensor = ");
  //Serial.print(sensorValue);
  //Serial.print("\t output = ");
  //Serial.println(outputValue);
/*
  byte out[] = new byte[2];
  out[0] = byte(outputValue)
  out[1] = byte(outputValue_b)
  Serial.write(out);
  */

  Serial.write(outputValue);
  Serial.write(outputValue_b);
  
  // wait 2 milliseconds before the next loop
  // for the analog-to-digital converter to settle
  // after the last reading:
  delay(2);
}
