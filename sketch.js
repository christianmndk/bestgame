
// array til appelsiner
let appelsiner = [];

//
const grav = 0.1;
const col = [220,110,0];

// Turbanen
let turban;

// Øvrige
let score = 0;
let missed = 0;
const maxliv = 8 // bruges til at beregne hvor mange appelsiner man ikke har grebet
let liv = maxliv;
let removed = 0; // holder styr på om der er blevet slettet flere end 1 appelsin
				 // når vi sletter dem for appelsiner
let spilIgang = true;   // flag
let spilWon = false;    // har vi vundet eller tabt

let game; // the one game currenlty being played

let newlife = 0; // counting for every ten catch you get some extra life

let xmaxspeed;
let scorelist =[0];
console.log(typeof(scorelist))
function setup() {  // kører kun en gang, når programmet startes
	createCanvas(750, 600);
	textAlign(CENTER, CENTER);

	scorelist = document.getElementById("list")
	scorelist.innerHTML ="<br>";

// Check browser support
if (typeof(Storage) !== "undefined") {
	// Store
	if("score" in localStorage)
	{
		scorelist = JSON.parse(localStorage.getItem("score"));
		console.log(scorelist);
		// chekker om scorelisten er en array
		if(!(Array.isArray(scorelist))&&false)
		{
			console.log("cookie er ikke en array, så overskriver den til en blank")
			scorelist = [0];
		}
		console.log(scorelist);
	}
	else
	{
		scorelist = [];
	}
	// Ret6rieve
  } else {
	scorelist.innerHTML = "Sorry, your browser does not support Web Storage...";
  }
	  
  opdatescoreboard();



	for(let i = 0; i<10;i++)
	{
		

		shootNew();
		appelsiner[i].tid += 30*i;
	}
	// parametrene til Kurv-konstruktøren er (x, y, bredde, dybde, speed)
	turban = new Kurv(670, 100, 70, 50, 10);
}

function draw() {
	background(0);
	
	if (spilIgang) {
		move();
		checkScore();
		display();
		turban.move()
	}
	else if (!spilWon){ // så er Game Over det der skal vises
		fill(col);
		textSize(46);
		text("Game Over", width/2 + random(-5,5), height/2 + random(3 ));
		text("Score: "+score, width/2, height/2 + 50);
	}
	else {
		fill([0,255,0]);
		textSize(46);
		text("Game Won", width/2 + random(-5,5), height/2 + random(3 ));
		text("Score: "+score, width/2, height/2 + 50);
	}
}

function display() {
	fill(255);
	textSize(12);
	text("Score: " + score, width-80, 30);
	text("Liv: " + liv, width-160, 30);
	text("Tabt: " + (maxliv - liv), width-240, 30);
	
	// Vi får appesinerne til at chekke om de skal tegnes
	appelsiner.forEach(appelsin => {
		appelsin.tegn();
	});

	// Her vises turbanen
	turban.tegn();
};
	
function move() {

	// vi lader appelsinerne håndtere deres bevægelse
	appelsiner.forEach(appelsin => {
		appelsin.move()
	});

	checkMiss();
};

function checkMiss() {
	removed = 0;
	for (let i = 0; i < appelsiner.length; i++) {
		if (appelsiner[i].x > width || appelsiner[i].y > height) {
			appelsiner.splice(i, 1);
			removed += 1;
			i -= 1; // fordi vi nu har fjernet en skal indekset rykkes
			miss();
		}
	}
	for (i = 0; i < removed; i++) {
		shootNew();
	}
};

function miss() {
	missed += 1;
	liv -= 1;
	checkWinLoss()
};

function checkScore() {
	removed = 0
	// Her checkes om turbanen har fanget appelsinen. Hvis ja, skydes en ny appelsin afsted
	// loopet er måske lidt for kompliceret, da det er usandsynlugt at man
	// griber 2 eller flere appelsiner i samme frame
	for (let i = 0; i < appelsiner.length; i++) {
		if (appelsiner[i].yspeed!= 0) {
			if (turban.grebet(appelsiner[i]) ){
				appelsiner.splice(i, 1);
				removed += 1;
				i -= 1 // fordi vi nu har fjernet en skal indekset rykkes
				score += 1;
				// count every 10 catch
				newlife += 1;
				if(newlife == 10)
				{
					liv += 2;
					newlife = 0;
				}
				//console.log("boldt fjernet");
			}
		}
	}

	checkWinLoss()

	// vi tilføjer efter vi har slettet
	// kan eventuelt slettes så nye appelsiner håndteres et andet sted
	for (i = 0; i < removed; i++) {
		shootNew();
	}
};

function checkWinLoss() {
	if (liv < 1&&spilIgang == true) {
		spilIgang = false;
		console.log("game lost");
		addgame();
		
	}
}    

function shootNew() {

	//Her skal vi sørge for at en ny appelsin skydes afsted
	y = random(height/10*3, height/10*9);

	appelsiner.push(new Appelsin(y))
}

function keyPressed() {
	// Funktionen gør ingenting lige nu
	return false;  // Forebygger evt. browser default behaviour
}
function addgame()
{
	scorelist.push(score);
	scorelist = scorelist.sort();
	scorelist.reverse();
	localStorage.setItem("score", JSON.stringify(scorelist));
	console.log(scorelist);

}
function opdatescoreboard()
{
	for( game in scorelist)
	{
	  scorelist.innerHTML += game.toString(10); + "<br>";
	}
}