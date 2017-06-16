
#include <Servo.h>

#define TOLERANCE_a 40
#define TOLERANCE_b 20


String readString;
float xf;
float yf;

Servo servo_a;
Servo servo_b;

int servo_a_val;
int servo_b_val;

int oldVal_a = 0;
int oldVal_b = 0;

void setup(){
    Serial.begin(9600);
    Serial.setTimeout(50);
    // sets the maximum milliseconds to wait for serial data 

    servo_a.attach(9);
    servo_b.attach(10);

}
void loop(){
  readCoord();
  
  servo_a_val = mapf(xf, -1.00, 1.00, 0 , 180);
  servo_b_val = mapf(yf, -1.00, 1.00, 0 , 180);

  int diff_a = abs(servo_a_val - oldVal_a);
  int diff_b = abs(servo_b_val - oldVal_b);
  
  if (diff_a > TOLERANCE_a){
    oldVal_a = servo_a_val;
    servo_a.write(servo_a_val);
  }
  
  if (diff_b > TOLERANCE_b){
    oldVal_b = servo_b_val;
    servo_b.write(servo_b_val);
  }
  
  delay(15);
  Serial.println(); 
}

void readCoord(){
  while (Serial.available()) {
      readString = Serial.readString();
      
      int index_a = readString.indexOf(',');
      String x = readString.substring(0, index_a);
      int index_b = readString.indexOf(',', index_a+1);
      String y = readString.substring(index_a+1, index_b);
      xf = x.toFloat();
      yf = y.toFloat();
      //Serial.print("x = ");
      //Serial.println(xf); 
    }
}

double mapf(double x, double in_min, double in_max, double out_min, double out_max)
{
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

