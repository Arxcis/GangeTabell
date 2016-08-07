/* Regnestykker.js */

$(document).ready(function(){

	// --- CONSTANTS ---

	FPS = 30;
	CEILING = 30;


	// --- jQuery-objects ---

	$main = $('main');
	$clock = $('#clock');
	$kalk = $('#kalk');
	$prog = $('#progress');
	$svar = $('#svar');


	// ---- Variables ----
	var completed = 0;
	var tid = 0;
	var currentKey = 0;
	var poeng = 0;
	var used_strings = [];


	// --- FUNCTIONS ---

	var regnestykke = '';
	var num_1 = 0;
	var num_2 = 0;
	var used = true;
	var fasit = 0;

	function generate_regnestykke() {

		used = true;

		while(used){
			num_1 = Math.floor(Math.random()*11);
			num_2 = Math.floor(Math.random()*11);
			fasit = num_1 * num_2;

			regnestykke = num_1.toString() + ' x ' + num_2.toString() + ' =  ';


			if (used_strings.indexOf(regnestykke) != -1){
				console.log(regnestykke + 'Already taken');
				continue;
			} else {
				used_strings.push(regnestykke);
				used = false;
			};
		}; 
	};


// --- KEY-SWITCHER ---
$(document).keydown(function(e){
/*
	Enter = 13
	Backspace = 8
	0 - 9 ---> 48 - 57 */  
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
			$svar.append((e.which - 48).toString());
			break;

		case 8:
			tempstring = $svar.html();
			$.html(tempstring.slice(0, -1));
			break;

		case 13:
			completed += 1;

			if (parseInt($svar.html()) == fasit)
				{ poeng += 1; }

			console.log('Completed=' + completed + '. Poeng=' + poeng);

			if(completed < CEILING){
				
				generate_regnestykke();

				$kalk.html(regnestykke);
				$svar.html('');
				$prog.html((completed).toString() + '/' + CEILING.toString());

			} else if (completed >= CEILING){
				$main.html('Poengsum = ' + poeng + '.   Tid brukt = ' + tid + ' sekunder.');
			};
			break;

		case 16:
			break;
		default:
			break;
	};
}); 

// --- GAME LOOP ---
setInterval(function(){

	tid += 1;
	$clock.html('Tid: ' + tid.toString());

}, 1000);


// --- MAIN ---
generate_regnestykke();
$prog.html('1 /' + CEILING.toString());
$kalk.html(regnestykke);


});

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

