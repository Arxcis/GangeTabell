/* Regnestykker.js */

$(document).ready(function(){

	REGNESTYKKER = {

		1 : ['1 x 0', '1 x 1', '1 x 2', '1 x 3', '1 x 4', '1 x 5', '1 x 6', '1 x 7', '1 x 8', '1 x 9', '1 x 10'],
		2 : ['2 x 3356262378']

	}
	PICKER = 0;
	FPS = 30;
	CEILING = REGNESTYKKER[1].length;

	var clock = 0;
	var currentKey = 0;

	var $clock = $('#clock');
	var $kalk = $('#kalkulasjon');
	var $prog = $('#progress');


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
			if(PICKER < 10){
				PICKER += 1;
				console.log(REGNESTYKKER[1][PICKER]);
				$kalk.html(REGNESTYKKER[1][PICKER] + ' = ');
				$prog.html((PICKER+1).toString() + '/' + CEILING.toString());
				timebuffer = Date.now();
			};
			break;

		/*case 16:
			if(PICKER > 0){
				PICKER -= 1;
				console.log(REGNESTYKKER[1][PICKER]);
				$kalk.html(REGNESTYKKER[1][PICKER] + ' = ');
				$prog.html((PICKER+1).toString() + '/' + CEILING.toString());
				timebuffer = Date.now();
			
			break;*/
		default:
			break;
	};
}); 


// GAME loop
setInterval(function(){

	clock += 1;
	$clock.html('Tid: ' + clock.toString());


}, 1000);

});


