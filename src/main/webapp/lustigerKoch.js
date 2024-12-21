	//globale variablen für das Scoreboard
	let leben = 3;
	let score = 0;
	let milliesekunden = 1000;
	
function spielfeldErstellen(){
	//Anweisung zum Spielstart erstellen
	let header = document.createElement("header");
	let anweisung = document.createElement("h1");
	let umbruch = document.createElement("br");
	anweisung.innerText = "Press Spacebar to start!";
	header.appendChild(anweisung);
	header.appendChild(umbruch);
	
	//Lebensanzeige, Geschwindigkeitsanzeige und Score
	let footer = document.createElement("footer");
	let scoreboard = document.createElement("div");
	scoreboard.innerText = "Score: ";
	scoreboard.id = "score";
	let geschwindigkeit = document.createElement("div");
	geschwindigkeit.id = "geschwindigkeit";
	geschwindigkeit.innerText = "Pace: ";
	let leben = document.createElement("div");
	leben.id = "leben";
	leben.innerText = "Leben: ";
	footer.appendChild(scoreboard);
	footer.appendChild(geschwindigkeit);
	footer.appendChild(leben);

	//Spielfeld erstellen
	let spielfeld = document.createElement("main");
	spielfeld.class = "flex-container";
	spielfeld.id = "spielfeld";

	for (let i = 1; i < 7; i++){
		for (let j = 1; j < 5; j++){
			let neuesDiv = document.createElement("div");
			neuesDiv.id = i + "" + j;
			neuesDiv.className = "spielfelder";
			spielfeld.appendChild(neuesDiv);	
		}
		let br1 = document.createElement("br");
        spielfeld.appendChild(br1);
	}
	//Header, mainund footer ans document anbinden
	document.body.appendChild(header);
	document.body.appendChild(spielfeld);
	document.body.appendChild(footer);
	
	//Koch erstellen
	let koch = document.createElement("i");
	koch.className = "bi bi-caret-up-square";
	koch.id = "koch";

	let feld62 = document.getElementById("62");
	feld62.appendChild(koch);
	
	//Zufallsfelder erstellen
	zufall1 = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
	zufall2 = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
	zufall3 = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
	zufall4 = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

	//Cookies erstellen mit zufälligen Startfeldern
 	let cookie1 = document.createElement("i");
	cookie1.className = "bi bi-cookie";
	cookie1.id = "cookie1";
	let zufallsfeld1 = document.getElementById(zufall1 + "1");
	zufallsfeld1.appendChild(cookie1);
	
	let cookie2 = document.createElement("i");
	cookie2.className = "bi bi-cookie";
	cookie2.id = "cookie2";
	let zufallsfeld2 = document.getElementById(zufall2 + "2");
	zufallsfeld2.appendChild(cookie2);
	
	let cookie3 = document.createElement("i");
	cookie3.className = "bi bi-cookie";
	cookie3.id = "cookie3";
	let zufallsfeld3 = document.getElementById(zufall3 + "3");
	zufallsfeld3.appendChild(cookie3);
	
	let cookie4 = document.createElement("i");
	cookie4.className = "bi bi-cookie";
	cookie4.id = "cookie4";
	let zufallsfeld4 = document.getElementById(zufall4 + "4");
	zufallsfeld4.appendChild(cookie4);
	
}

spielfeldErstellen();

	//Koch und möglich Felder zu bewegen bestimmen
	let koch = document.getElementById("koch");
	let feld61 = document.getElementById("61");
	let feld62 = document.getElementById("62");
	let feld63 = document.getElementById("63");
	let feld64 = document.getElementById("64");
	let aktuellesFeld = feld62;
	
	//Event zum Bewegen erstellen
	document.addEventListener("keydown", function(event){ 
		if (event.key === "ArrowLeft") {
			if (aktuellesFeld === feld64){
				feld63.appendChild(koch);
				aktuellesFeld = feld63;
			}
			else if (aktuellesFeld === feld63){
				feld62.appendChild(koch);
				aktuellesFeld = feld62;
			}
			else if (aktuellesFeld === feld62){
				feld61.appendChild(koch);
				aktuellesFeld = feld61;
			}
		}
		if (event.key === "ArrowRight") {
			if (aktuellesFeld === feld61){
				feld62.appendChild(koch);
				aktuellesFeld = feld62;
			}
			else if (aktuellesFeld === feld62){
				feld63.appendChild(koch);
				aktuellesFeld = feld63;
			}
			else if (aktuellesFeld === feld63){
				feld64.appendChild(koch);
				aktuellesFeld = feld64;
			}
		}
	});
	
function spielstart(){
	//Cookies bewegen lassen:
	interval = setInterval(gravity, milliesekunden);
	
	// damit ich nicht alle Cookies gleichzeitig bewegen. 
	// Counter erstellt mit 4 verschiedenen Funktionen
	let counter = 1;
	let down1 = true;
	let down2 = true;
	let down3 = true;
	let down4 = true;
	let cookie1 = document.getElementById("cookie1");
	let cookie2 = document.getElementById("cookie2");
	let cookie3 = document.getElementById("cookie3");
	let cookie4 = document.getElementById("cookie4");

	//Scoreboard aktualisieren
	function scoreboard(){
		let scoreAnzeige = document.getElementById("score");
		let geschwindigkeitAnzeige = document.getElementById("geschwindigkeit");
		let lebenAnzeige = document.getElementById("leben");
		scoreAnzeige.innerText = "Score: " + score;
		geschwindigkeitAnzeige.innerText = "Pace: " + milliesekunden;
		lebenAnzeige.innerText = "Leben: " + leben;
	}
	
	
	function gravity(){
		scoreboard();
		if (counter === 1 ) {
			gravityColumn(down1, cookie1, 1);
			counter++;
			}
		else if (counter === 2){
			gravityColumn(down2, cookie2, 2);
			counter++;
		}
		else if (counter === 3){
			gravityColumn(down3, cookie3, 3);
			counter++;
		}
		else if (counter === 4){
			gravityColumn(down4, cookie4, 4);
			counter = 1;
		}
	}
	
	function gravityColumn(down, cookie, column){
		// Deklarieren der variablen
		let id = cookie.parentElement.id;
		let koch = document.getElementById("koch");
		let kochId = koch.parentElement.id;
		
		// Überprüfen obs nach unten fällt:
		if (down === true){
			cookie.style.color = "green";		
			//id muss in Zehner schritten addiert werden, damits nach unten fällt.
			id = (id - 10) + 20;
			// Überprüfung ob id vom Koch und vom Cookie übereinstimmen:
			if (id == kochId) {
				//Cookie fällt nicht mehr runter, sonder hoch!
				//Erstellen einer Zufallszahl zwischen (11-34) um zu bestimmen wie hoch der Cookie fliegt
				if (column === 1) {
					down1 = false;
					zufallsZahl1 = (Math.round(Math.random() * (4 - 1)) + 1) * 10 + column;
					score++;
				}
				if (column === 2) {
					down2 = false;
					zufallsZahl2 = (Math.round(Math.random() * (4 - 1)) + 1) * 10 + column;
					score++;
				}
				if (column === 3) {
					down3 = false;
					zufallsZahl3 = (Math.round(Math.random() * (4 - 1)) + 1) * 10 + column;
					score++;
				}
				if (column === 4) {
					down4 = false;
					zufallsZahl4 = (Math.round(Math.random() * (4 - 1)) + 1) * 10 + column;
					score++;
				}
				//Aktualiserung des Scoreboards
				scoreboard ();
				// wenn der score hochgeht geht die Geschwindigkeit hoch
				if (score % 5 === 0 && score !== 0){
					clearInterval(interval);
					milliesekunden *= 0.90;
					milliesekunden = Math.round(milliesekunden);
					interval = setInterval(gravity, milliesekunden);;
				}
				
				//Cookie soll nicht auf der untersten Ebene stehen bleiben, sondern sofort hoch gehen.
				cookie.style.color = "blue";		
				id = id - 20;
				//Da id hier schon sofort geändert wird, damit die Cookies sofort nach oben fliegen, 
				// muss auch hier eine Überprüfung stattfinden, denn sonst kann der Cookie nicht sofort 
				// wieder umdrehen und fliegt mindestens zwei Stufen hoch
				if (column === 1) {
					if(zufallsZahl1 === id){
					down1 = true;
					}
				}
				if (column === 2) {
					if (zufallsZahl2 === id){
					down2 = true;
					}
				}
				if (column === 3) {
					if (zufallsZahl3 === id){
					down3 = true;
					}
				}
				if (column === 4) {
					if(zufallsZahl4 === id){
					down4 = true;
					}
				}
			}
			//Wenn Cookie unter den Boden fallen würde, leben abziehen und nach oben teleportieren*/
			if (id == 70 + column) {
				leben--;
				cookie.style.color = "red";		
				scoreboard ();
				id = 10 + column;
			}
			//Wenn Cookie auf Höhe des Kochs ist, wird dieser Rot, da gleich ein Leben abgezogen wird
			if (id == 60 + column) {
				cookie.style.color = "red";		
			}
			if (leben === 0){
				clearInterval(interval);
				}
			// Das zielfeld / neues aktuelle Feld wird mit der neu berechneten id in eine letiable gepackt
			let aktuellesFeld = document.getElementById(id);
			// Der Cookie wird in dieses Feld reinappended
			aktuellesFeld.appendChild(cookie);	
		}
		
		//Cookie fliegt nicht runter sondern hoch
		if(down === false){
			cookie.style.color = "blue";	
			//Id des Cookies wird dafür immer kleiner
			id = id - 10;
			let aktuellesFeld = document.getElementById(id);
			aktuellesFeld.appendChild(cookie);	
			//Boolean spezifisch für jeden Column richtig setzen
			if (column === 1) {
				if(zufallsZahl1 == id){
				down1 = true;
				}
			}
			if (column === 2) {
				if (zufallsZahl2 == id){
				down2 = true;
				}
			}
			if (column === 3) {
				if (zufallsZahl3 == id){
				down3 = true;
				}
			}
			if (column === 4) {
				if(zufallsZahl4 == id){
				down4 = true;
				}
			}
		}
	}
}

	//Leertaste zum Spielstart
	document.addEventListener("keydown", function(event){ 
		if (event.keyCode === 32){
			spielstart();
		}
	});

