if(LD === undefined) {
  var LD = {};
}

LD.Monsters = {

	// unchangle properties go here
	totalHP: 10,

    lineDelay: 500,

    maxVel: 120,
    // nothingOffset: {x:50,y:50},

	refresh: function (){
		// refresh every game propeties goes here
        LD.Monsters.currentHP = 10;
	},

	createMonsters: function(){
		thisGame = LD.Globals.game;
		LD.Monsters.refresh();

        LD.Monsters.monsters = thisGame.physics.add.sprite(400, 400, 'baddie');

      
        LD.Monsters.monsters.setCollideWorldBounds(true);

        

        LD.Monsters.buildAnims("baddie");

        

        LD.Monsters.timedEvent = thisGame.time.addEvent({ delay: LD.Monsters.lineDelay, 
                                                callback: LD.Monsters.timerEventBaddieMove, 
                                                callbackScope: thisGame, 
                                                loop: true });


		// return LD.Monsters.monsters;
	},

	updateTicks: function(){
		var tickMult = 1;
		if(LD.Monsters.speedBoost > 1){
			tickMult = LD.Monsters.speedBoost * 1.5;
		}
		LD.Monsters.runTicks += 1 * (tickMult + LD.Monsters.thisSheet.tickFactorIncrease);
	},

    timerEventBaddieMove: function(){
        LD.Monsters.baddieMoveVert = LD.Globals.randomNumber(0,2); // 0, U, D
        LD.Monsters.baddieMoveHorz = LD.Globals.randomNumber(0,2); // 0, L, R
    }, 

	updateMonsters: function(){


        var monsters = LD.Monsters.monsters;

        if (LD.Globals.gameOver)
        {
            return;
        }

        // monsters.anims.pause({frame: 4});
        // monsters.currentAnim.pause();

        monsters.setVelocity(0);
        // console.log(monsters.anims.currentAnim);
        if(!monsters.anims.currentAnim){
            LD.Monsters.setAnimOfBoth('stopped');
        }else if(monsters.anims.currentAnim != "baddiestopped"){
            LD.Monsters.setAnimOfBoth('stopped');
        }

        
        if (LD.Monsters.baddieMoveHorz == 1)
        {
            monsters.setVelocityX(-LD.Monsters.maxVel);
            LD.Monsters.setAnimOfBoth('left');
        }
        else if (LD.Monsters.baddieMoveHorz == 2)
        {
            monsters.setVelocityX(LD.Monsters.maxVel);

            LD.Monsters.setAnimOfBoth('right');
        }

        if (LD.Monsters.baddieMoveVert == 1)
        {
            monsters.setVelocityY(-LD.Monsters.maxVel);
            
            LD.Monsters.setAnimOfBoth('up');
        }
        else if (LD.Monsters.baddieMoveVert == 2) 
        {
            monsters.setVelocityY(LD.Monsters.maxVel);
            
            LD.Monsters.setAnimOfBoth('down');
        } 


		return monsters;
	},



    buildAnims: function (item, index) {
        thisGame.anims.create({
            key: item+'left',
            frames: thisGame.anims.generateFrameNumbers(item, { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        thisGame.anims.create({
            key: item+'down',
            frames: thisGame.anims.generateFrameNumbers(item, {  start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        thisGame.anims.create({
            key: item+'right',
            frames: thisGame.anims.generateFrameNumbers(item, { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        thisGame.anims.create({
            key: item+'up',
            frames: thisGame.anims.generateFrameNumbers(item, {
                start: 9, end: 11}),
            frameRate: 10,
            repeat: -1
        });

        thisGame.anims.create({
            key: item+'stopped',
            frames: [ { key: item, frame: 4 } ],
            frameRate: 1
        });
    },


    setAnimOfBoth: function (anim){
        LD.Monsters.monsters.anims.play('baddie'+anim, true);
    }

	

	

};