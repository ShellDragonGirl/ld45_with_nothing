if(LD === undefined) { 
  var LD = {};
}

LD.Globals = {
	game: 0,

	gameWidth: 600,
	gameHeight: 840,



	randomNumber: function (min, max) {  
	    var min = Math.ceil(min); 
	    var max = Math.floor(max); 
	    return Math.floor(Math.random() * (max - min + 1)) + min; 
	}, 

	randomFloat: function (min, max) {
        return Math.random() * (max - min) + min;
	}


}



