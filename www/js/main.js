
function main(){
    
	// location.reload(true);

	var config = {
	    type: Phaser.WEBGL,
// 	    width: 600,
// 	    height: 850,
		scale: {
            mode: Phaser.Scale.FIT,
            parent: 'ld45',
            autoCenter: Phaser.Scale.CELDER_HORIZOLDALLY,
            width: LD.Globals.gameWidth,
            height: LD.Globals.gameHeight
        },
	    physics: {
	        default: 'arcade',
	        arcade: {
	            debug: false
	        }
	    },
	    audio: {
	        disableWebAudio: true,
	        noAudio: false
	    },
	    scene: [LD.Scenes.Intro, 
	    	LD.Scenes.Intro2, 
	    	LD.Scenes.Play, 
	    	LD.Scenes.WinLose]
	};

	var game = new Phaser.Game(config);

}

