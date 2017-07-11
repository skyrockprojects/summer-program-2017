int rCLED=1;
int gCLED=2;
int yCLED=3;
int rPLED= 4;
int gPLED = 5;
int SWITCH = A1;


// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(rCLED, OUTPUT);
  pinMode(gCLED, OUTPUT);
  pinMode(yCLED, OUTPUT);
  pinMode(rPLED, OUTPUT);
  pinMode(gPLED, OUTPUT);
  pinMode(SWITCH, INPUT);
}

// the loop function runs over and over again forever

//--------------------------------------------

void pred () {
  digitalWrite(gPLED, LOW);
  digitalWrite(rPLED, HIGH);
  }

void pgreen () {
  digitalWrite(rPLED, LOW);
  digitalWrite(gPLED, HIGH); 
  }

void cred () {
  digitalWrite(gCLED, LOW); 
  digitalWrite(yCLED, LOW); 
  digitalWrite(rCLED, HIGH);                                           
  
  }

void cgreen () {
  digitalWrite(yCLED, LOW); 
  digitalWrite(rCLED, LOW);   
  digitalWrite(gCLED, HIGH); 
     
  
  }

void cyellow () {
  digitalWrite(gCLED, LOW); 
  digitalWrite(rCLED, LOW); 
  digitalWrite(yCLED, HIGH);        
  
  }

//--------------------------------------------
 
void carON ()  {
  cyellow ();
  delay(1000);
  cgreen();
  
  }

void carOFF () {
  cyellow ();
  delay(1000);
  cred();  
  
  }


//--------------------------------------------

void person () {
  delay (1000);
  carOFF();
  pgreen();
  delay(2000);
  pred();
  delay(500);
  carON();
  }


  

  
void loop() {
  cgreen ();
  pred ();
  if (digitalRead(SWITCH) == HIGH) {
    delay(1000);
    person ();
    }

    


}


