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


};




LD.Globals.squarePxHalf = LD.Globals.squarePx/2;

LD.Globals.horizontalOffset = LD.Globals.squarePxHalf 
				+ (LD.Globals.gameWidth - (LD.Globals.squarePx * LD.Globals.squareWidth))/2;

// finds the number of px on each side of play area, sans alloted openspace at top
LD.Globals.verticalOffset = LD.Globals.squarePxHalf 
				+ ((LD.Globals.gameHeight - LD.Globals.verticalOpenSpace) 
				- (LD.Globals.squarePx * LD.Globals.squareHeight))/2;

LD.Globals.verticalOffsetTop = LD.Globals.verticalOpenSpace + LD.Globals.verticalOffset;

LD.Globals.vertOneThird = LD.Globals.gameHeight / 3;	
LD.Globals.horzCenter = LD.Globals.gameWidth / 2;	



