if(LD === undefined) {
  var LD = {};
}

LD.Player = {

	// unchangle properties go here
	totalHP: 10,

	refresh: function (){
		// refresh every game propeties goes here
		LD.Player.currentHP = 10;
	},

	createPlayer: function(){
		thisGame = LD.Globals.game;
		LD.Player.refresh();

		LD.Player.player = thisGame.physics.add.sprite(100, 450, 'boy');

      
        LD.Player.player.setCollideWorldBounds(true);

        

        thisGame.cameras.main.setBounds(0, 0, 
        					LD.Maps.map.widthInPixels, 
        					LD.Maps.map.heightInPixels);
        thisGame.cameras.main.startFollow(LD.Player.player);

        thisGame.anims.create({
            key: 'left',
            frames: thisGame.anims.generateFrameNumbers('boy', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        thisGame.anims.create({
            key: 'down',
            frames: thisGame.anims.generateFrameNumbers('boy', {  start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        thisGame.anims.create({
            key: 'right',
            frames: thisGame.anims.generateFrameNumbers('boy', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        thisGame.anims.create({
            key: 'up',
            frames: thisGame.anims.generateFrameNumbers('boy', {
                start: 9, end: 11}),
            frameRate: 10,
            repeat: -1
        });


		return LD.Player.player;
	},

	updateTicks: function(){
		var tickMult = 1;
		if(LD.Player.speedBoost > 1){
			tickMult = LD.Player.speedBoost * 1.5;
		}
		LD.Player.runTicks += 1 * (tickMult + LD.Player.thisSheet.tickFactorIncrease);
	},

	updatePlayer: function(){


		return LD.Player.player;
	}

	

	

};