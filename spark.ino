/*
Adafruit Arduino 
*/
int redPin = D1;
int greenPin = D2;
int bluePin = D3;

 
void setup()
{
  Particle.function("setcolor", setColor);    

  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);  
}
 
void loop()
{

}
 
int setColor(String colorParams)
{
  int redLoc = 0;
  int greenLoc = 0;
  int blueLoc = 0;
  
  redLoc = colorParams.indexOf(",");
  int red = colorParams.substring(0,redLoc).toInt();
  
  greenLoc = colorParams.indexOf(",", redLoc + 1);
  int green = colorParams.substring(redLoc + 1,greenLoc).toInt();
 
  blueLoc = colorParams.indexOf(",", greenLoc + 1);
  int blue = colorParams.substring(greenLoc + 1,blueLoc).toInt();

  analogWrite(redPin, red);
  analogWrite(greenPin, green);
  analogWrite(bluePin, blue);  
  
  return 0;
}

