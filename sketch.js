//DAT405 / GAD405
//Final_Project

var xOff = 0;
var yOff = 0;
var cosX;
var sinY;
var angle = 0;
var topColour = '#000000';
var circleColour = '#DDDDDD';
var r = 0;
var g = 0;
var b = 0;
var a;
var c;
var pollutionHeight = 275;
var speedHeight = 1;
var wordChoice;
var opacityInc = 0;
var d;
//Default number for perlin increment
var increment = 0.05;
//sets amount of frames project will defualt to
var frames = 30;

//Initialization function
function setup() {
  //Set the size of rendering window - pixels
  createCanvas(594, 841);

  topColour = 255; //Sets colour as blue for background.
  b = 0; n = 0; m = 255; //Sets colour as blue for background rectangle layer.
  //Sets frame rate (tick speed) to 30fps.
  frameRate(30);
}



//Rendering function
function draw() {
  //Renders background with opacity defined as 2, allowing generated objects
  //to still be seen. Takes on colour of sky.
  background(topColour,2);
  //Splits page in half with two colour blocks. Will layer above background,
  //allows colourc changes to be more easily noticed.
  noStroke();
  fill(b,n,m,2);
  //Overlays background, allowing colour to show.
  rect(0,0,width, height/0.2);
  noFill();
  //Calls function to generate sun/day cycle.
  sun();
  //Prevents translate from moving text
  push();
  //Moves landscape shapes further down canvas to allow room for day/night cycle.
  translate(0,200);
  //Calls function that generates landscape.
  landscape();
  pop();
  //Calls pollution function
  pollution();
}

//Function generates a orange/yellow circle rotating on an angle to represent a sun cycle.
//Gradients toward yellow at midday.
function sun() {
  //Increments angle, making the circle move.
  angle+=0.04;
  //Creates angles from integer value (var angle).
  var cosX = cos(angle);
  var sinY = sin(angle);
  //Maps the range created by Sin and Cos and coverts them into X & Y coordinates.
  let a = map(cosX, -1, 1, 10, width-50);
  let c = map(sinY, -1, 1, 10, height-70);
  fill(r,g,b,2);
  //Checks position  of ball relative to top half or bottom half of the page. Changes state
  //depending on balls position on the y axis. Changes colour variables depending on argument result.
  if (c >= height/2) {
    //Adjusts style presets of sun, allowing it to become invisible while it's
    //below the landscape. Also changes backgrounds to black. (night)
    r = 0; g = 0; b = 0;
    b = 0; n = 0; m = 0;
    topColour = 0;
    noFill();
    noStroke();
  } else {
    //Changes colour of background rectangle layer to blue. Initiates daytime.
    b = 0; n = 0; m = 255;
    //Takes height(Y) of sun and maps to opacity, divided to only generate on top half of page.
    //Creates brightness effect. Sun is brightest at midday.
    fill(255,map(c, 0, height/2+60, 255, 100) ,0,map(c, 0, height/2-30, 200, 50));
    strokeWeight(3);
    topColour = 255;
  }
//Takes values generated along cos & sin axis and adds twenty to each ellipse.
//This ensures it is not off the page.(starting at 0)
ellipse(20+a, 20+c, 50, 50);
}

//Function uses perlin noise to generate landscape.
function landscape() {
  //Maps position of mouse height to colour value. Used for lanscape.
  var mouseVal = map(mouseY,0,height,0, 255);
  beginShape();
    for (var x = 0; x <= width; x+=10) {
      //Maps position of mouse along x axis to incrementer values between 0.01 and 0.1
      increment = map(mouseX,0,height,0.01,0.1);
      // Maps perlin noise values to Y coordinates.
      var y = map(noise(xOff,yOff),0,1,0,height);

  //Finds shapes generated below a point, creating a sense of distance
  //between landscape colours, also creates a sunset effect.
      if (y > 300) {
        stroke(mouseVal,255,100,100);
        strokeWeight(2);
        //Takes original colour and subtracts each by the opacity incrementor
        //mapped to colour values, subtracting towards black.
        //Greens.
        fill(115-d,255-d,100-d,80);
      } else {
          stroke(255,201,21,100);
          strokeWeight(2);
          //Takes value of mouse position mapped to colour, creates darkening effect
          //when user moves mouse.
          fill(mouseVal-d,mouseVal-d,mouseVal-d,50);
      }
      //Creates vertex points out of generated values.
      vertex(x, y);
      //Adjusts perlin values every loop to generate new shapes.
      xOff += increment;
    }
    //yOff = map(mouseY,0,height,0, 10);
    yOff += 0.01;

  //Creates a container for the graph allowing it to be positioned at the bottom
  //of the page. Added margins to width (50) to remove visibility from canvas.
    vertex(width+50, height);
    vertex(0-50, height);
    endShape(CLOSE);

}

//Function creates a pollution effect using text generated towards the top of
//of the canvas. The incrementor influencing the climate change effects
//(landscape colour shift and sky colour shift) is stored here.
 function pollution() {
   //Increments the opacity variable. Which is then mapped to a colour value up to 255.
   opacityInc += 0.5;
   d = map(opacityInc, 0, 255, 0, 255);
   //Sets array for randomly generated words, theme of pollution.
   var words = ['GREENHOUSE', 'GASES', 'POLLUTION', 'CONTAMINATE', 'DESTROY'];
   //Rounds random value to an integer, and Math.abs ensures the value is not negative.
   //Number is between 0-25 to generate sense of space between text, mapped to opacityInc
   //to reduce space/frequency of words as other items are incremented.
   var wordChoice = round(random(0, Math.abs(19-map(opacityInc,0,255,0,14))));
   //Selects word and places in variable to use.
   var word = words[wordChoice];
   //pollutionHeight defines starting point (y value) of pollution text. Subtracted by
   //predefined speed to move text up the page.
   pollutionHeight = pollutionHeight - speedHeight;
   //Statement resets text when it hits the top of the page.
   if (pollutionHeight < 0) {
      pollutionHeight = 350;
   }
   //Checks progress of mapped opacity value, if above value of colour
   //(that would turn landscape to black), if true then rotates generated text
   //and changes to bold. Increases incrementor after this also.
   if (d >= 250) {
     opacityInc +=0.7;
      textStyle(BOLD);
      rotate(random(0,30));
   } else if (d > 150) {
     opacityInc +=0.6;
     rotate(random(0,30));
   }

   //If program has been running till this amount of ticks. Backgrounds will shift
   //to black to show damage done to environment by pollution.
   if (d >= 1600) {
     r = 0; g = 0; b = 0;
     b = 0; n = 0; m = 0;
     topColour = 0;
   }
  //Random generation of black shade for text, appearance of smoke/fumes. Opacity changes with incrementer.
  fill(0,0,random(0,40),opacityInc);
  noStroke();
  //Text size is mapped to opacity incrementer, increasing size of text within parameters
  //as other objects also change with incrementer.
  textSize(map(opacityInc, 0, 100, 5, 12));
  //If statement checks if selected array value is a word. Allows wordChoice variable to run
  //and create frequency (better explained in comment for variable).
  if (wordChoice <= 4) {
    //Draws word, positioned randomly along X axis and moves along Y axis using
    //pollutionHeight variable defined above. Moved -10 along due to spacing issue noticed.
    text(word, random(-10, width), pollutionHeight);
  }
  //returns value of opacityIncs colour mapping for continued use.
  return d;
 }
