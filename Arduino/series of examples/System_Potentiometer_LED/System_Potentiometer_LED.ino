int RLED = 3;
int YLED = 4;
int GLED = 5;

void setup() {
  // put your setup code here, to run once:
  pinMode(RLED, OUTPUT);
  pinMode(YLED, OUTPUT);
  pinMode(GLED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(RLED,HIGH);
  delay(500);
  digitalWrite(YLED,HIGH);
  delay(500);
  digitalWrite(GLED,HIGH);
  delay(500);
  
}



