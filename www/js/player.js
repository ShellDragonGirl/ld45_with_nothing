if(LD === undefined) {
  var LD = {};
}

LD.Player = {

	// unchangle properties go here
	totalHP: 10,

	refresh: function (){
		// refresh every game propeties goes here
        LD.Player.currentHP = 10;
		LD.Player.score = 0;
	},

	createPlayer: function(){
		thisGame = LD.Globals.game;
		LD.Player.refresh();

		LD.Player.player = thisGame.physics.add.sprite(200, 200, 'boy');

      
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

        var cursors = LD.Globals.cursors;
        var player = LD.Player.player;

        if (LD.Globals.gameOver)
        {
            return;
        }
        player.setVelocity(0);
        
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        if (cursors.up.isDown)
        {
            player.setVelocityY(-160);
            
            player.anims.play('up', true);
        }
        else if (cursors.down.isDown) 
        {
            player.setVelocityY(160);
            
            player.anims.play('down', true);
        } 


		return player;
	}

	

	

};