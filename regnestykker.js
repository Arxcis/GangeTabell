/* Regnestykker.js */

$(document).ready(function(){

	// --- CONSTANTS ---

	REGNESTYKKER = {

		1 : ['1 x 0', '1 x 1', '1 x 2', '1 x 3', '1 x 4', '1 x 5', '1 x 6', '1 x 7', '1 x 8', '1 x 9', '1 x 10'],
		2 : ['2 x 0', '2 x 1', '2 x 2', '2 x 3', '2 x 4', '2 x 5', '2 x 6', '2 x 7', '2 x 8', '2 x 9', '2 x 10'],
		3 : ['3 x 0', '3 x 1', '3 x 2', '3 x 3', '3 x 4', '3 x 5', '3 x 6', '3 x 7', '3 x 8', '3 x 9', '3 x 10'],
		4 : ['4 x 0', '4 x 1', '4 x 2', '4 x 3', '4 x 4', '4 x 5', '4 x 6', '4 x 7', '4 x 8', '4 x 9', '4 x 10'],
		5 : ['5 x 0', '5 x 1', '5 x 2', '5 x 3', '5 x 4', '5 x 5', '5 x 6', '5 x 7', '5 x 8', '5 x 9', '5 x 10'],
		6 : ['6 x 0', '6 x 1', '6 x 2', '6 x 3', '6 x 4', '6 x 5', '6 x 6', '6 x 7', '6 x 8', '6 x 9', '6 x 10'],
		7 : ['7 x 0', '7 x 1', '7 x 2', '7 x 3', '7 x 4', '7 x 5', '7 x 6', '7 x 7', '7 x 8', '7 x 9', '7 x 10'],
		8 : ['8 x 0', '8 x 1', '8 x 2', '8 x 3', '8 x 4', '8 x 5', '8 x 6', '8 x 7', '8 x 8', '8 x 9', '8 x 10'],
		9 : ['9 x 0', '9 x 1', '9 x 2', '9 x 3', '9 x 4', '9 x 5', '9 x 6', '9 x 7', '9 x 8', '9 x 9', '9 x 10'],
	   10 : ['10 x 0', '10 x 1', '10 x 2', '10 x 3', '10 x 4', '10 x 5', '10 x 6', '10 x 7', '10 x 8', '10 x 9', '10 x 10'],
	}

	FASIT = {

		1 : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		2 : [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
		3 : [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
		4 : [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
		5 : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
		6 : [0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60],
		7 : [0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70],
		8 : [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80],
		9 : [0, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90],
		10 : [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
	}

	
	FPS = 30;
	CEILING = REGNESTYKKER[1].length;

	// ---- jQuery-objects

	$main = $('main');
	$clock = $('#clock');
	$kalk = $('#kalkulasjon');
	$prog = $('#progress');

	// ---- Variables ----
	var PICKER = 0;
	var completed = 0;
	var tid = 0;
	var currentKey = 0;
	var poeng = 0;
	var exluded_tasks = {};

	$prog.html((PICKER + 1).toString() + '/' + CEILING.toString());
	$kalk.html(REGNESTYKKER[1][PICKER] + ' = ');


// Key-logger
$(document).keydown(function(e){
/*
	Enter = 13
	Backspace = 8
	0 - 9 ---> 48 - 57
*/  
	switch(e.which){

		case 48:
		case 49:
		case 50:
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56:
		case 57:
			$kalk.append((e.which - 48).toString());
			break;

		case 8:
			tempstring = $kalk.html();
			if(tempstring.length > 8){
				$kalk.html(tempstring.slice(0, -1));
			};
			break;

		case 13:
			tempstring = $kalk.html();

			if (tempstring.slice(-2, tempstring.length).toString() == FASIT[1][PICKER])
				{ poeng += 1; console.log('Poeng =>' + poeng); }

			if(completed < CEILING - 1){
				
				/* A couple of things about Math.random():
					- The return value is a floating-point number between 0 and 1,
					   not including 0 and 1.
					- To specify a range of random numbers we have to multiply this
					   seed. If the range starts with 0  and goes to a positive integer, 
					   it is enough to do it like we have done below. If you need an algoritm
					   that is more general you can use | Math.random() * (max - min) + min |
					- It is tempting to use Math.round() here, but that will give a non-uniform 
					  distribution, because sometimes it will round up, sometimes down.
					  That is why we specify the range to be range + 1, and then always round 
					  down to an integer.
				------------------------------------------------ Jonas --------------- */
				PICKER = Math.floor(Math.random() * CEILING);
				completed += 1;

				$kalk.html(REGNESTYKKER[1][PICKER] + ' = ');
				$prog.html((completed+1).toString() + '/' + CEILING.toString());

			} else if (completed >= 10){
				$main.html('Poengsum = ' + poeng + '.   Tid brukt = ' + tid + ' sekunder.');
			};
			break;

		/*case 16:
			if(PICKER > 0){
				PICKER -= 1;
				$kalk.html(REGNESTYKKER[1][PICKER] + ' = ');
				$prog.html((PICKER+1).toString() + '/' + CEILING.toString());
			
			break;*/
		default:
			break;
	};
}); 


// GAME loop
setInterval(function(){

	tid += 1;
	$clock.html('Tid: ' + tid.toString());


}, 1000);

});


