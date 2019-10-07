if(LD === undefined) {
  var LD = {};
}

LD.Monsters = {

	// unchangle properties go here
	totalHP: 10,

    lineDelay: 500,

    maxVel: 120,

    attackThreshold: 100,
    attackDamage: 0.2,
    monstersMaxTotal: 10,
    monstersMaxMap1: 4,



	refresh: function (){
		// refresh every game propeties goes here
        LD.Monsters.currentHP = 10;
        LD.Monsters.baddiesSpawned = 0;
	},

	createMonsters: function(){
		thisGame = LD.Globals.game;
		LD.Monsters.refresh();

        LD.Monsters.monsters = thisGame.physics.add.group({
            defaultKey: 'baddie',
            maxSize: LD.Monsters.monstersMaxTotal,
            name: "baddie",
            createCallback: function (child) {
                // child.setName('void');
                // child.sprite = thisGame.physics.add.sprite(0, 0, 'void');
                child = thisGame.physics.add.sprite(400, 400, 'baddie');

      
                child.setCollideWorldBounds(true);
                child.setBounce(true);
                child.health = 10;
                child.setName("baddie");

                child.setSize(33,42).setOffset(8,4);
                // child.publicName = LD.Bullets.publicName;
                // console.log('Created', void.name);
            },
            removeCallback: function (child) {
                // console.log('Removed', void.name);
            }
        });
        LD.Monsters.monsters.createMultiple({
            visible: false,
            active: false,
            key: LD.Monsters.monsters.defaultKey,
            repeat: LD.Monsters.monsters.maxSize - 1
        });


        LD.Monsters.buildAnims("baddie");

        

        LD.Monsters.timedEvent = thisGame.time.addEvent({ delay: LD.Monsters.lineDelay, 
                                                callback: LD.Monsters.timerEventBaddieMove, 
                                                callbackScope: thisGame, 
                                                loop: true });

        LD.Monsters.activateChild();
		return LD.Monsters.monsters;
	},



    timerEventBaddieMove: function(){
        LD.Monsters.monsters.children.iterate(function (child) {
            if(child.active){
                child.baddieMoveVert = LD.Globals.randomNumber(0,2); // 0, U, D
                child.baddieMoveHorz = LD.Globals.randomNumber(0,2); // 0, L, R
            }
        });
    }, 

	updateMonsters: function(){


        var monsters = LD.Monsters.monsters;
        var player = LD.Player.player;


        monsters.children.iterate(function (child) {
            if(child.active){
                child.setVelocity(0);
                // console.log(monsters.anims.currentAnim);
                if(!child.anims.currentAnim){
                    LD.Monsters.setAnimOfBoth(child, 'stopped');
                }else if(child.anims.currentAnim != "baddiestopped"){
                    LD.Monsters.setAnimOfBoth(child, 'stopped');
                }

                
                if (child.baddieMoveHorz == 1)
                {
                    child.setVelocityX(-LD.Monsters.maxVel);
                    LD.Monsters.setAnimOfBoth(child, 'left');
                }
                else if (child.baddieMoveHorz == 2)
                {
                    child.setVelocityX(LD.Monsters.maxVel);

                    LD.Monsters.setAnimOfBoth(child, 'right');
                }

                if (child.baddieMoveVert == 1)
                {
                    child.setVelocityY(-LD.Monsters.maxVel);
                    
                    LD.Monsters.setAnimOfBoth(child, 'up');
                }
                else if (child.baddieMoveVert == 2) 
                {
                    child.setVelocityY(LD.Monsters.maxVel);
                    
                    LD.Monsters.setAnimOfBoth(child, 'down');
                } 

                // get x , y diff

                var diffX = player.x - child.x;
                var diffY = player.y - child.y;
                var trueDistance = Math.sqrt( Math.pow(diffX,2), Math.pow(diffY,2) );
                var absDist = Math.abs(trueDistance);

                if(LD.Monsters.attackThreshold > absDist){
                    thisGame.physics.moveToObject(child, LD.Player.player, LD.Monsters.mavVel);
                }
            }
        });

        // monsters.anims.pause({frame: 4});
        // monsters.currentAnim.pause();

       

        // find the true distance

        //set velx and vely

        

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


    setAnimOfBoth: function (child, anim){
        child.anims.play('baddie'+anim, true);
    },

    activateChild: function () {

        var child = LD.Monsters.monsters.get(LD.Globals.horzCenter, LD.Globals.vertOneThird);

        if (!child) return; // None free

        LD.Monsters.baddiesSpawned += 1;

        child
        .setActive(true)
        .setVisible(true)
        // .setTint(Phaser.Display.Color.RGBToString(LD.Globals.randomNumber(50,255), 255 , 255 ))
        // .setTint(Phaser.Display.Color.RandomRGB().color)
        .clearTint();

        child.name = "baddie";
        child.health = LD.Monsters.totalHP;
        child.setCollideWorldBounds(true);
        child.setBounce(true);
        child.body.enable = true;


        var player = LD.Player.player;
        var vel =  LD.Player.vel; 
        var mult =  LD.Player.voidMultFactor; 

        var spawn = LD.Globals.randomSpawn(200,250);
        child.setPosition(spawn.x, spawn.y);


        
    },

    killBaddie: function(child){
        child.setActive(false).setVisible(false);
        child.body.enable = false;
        if(LD.Monsters.baddiesSpawned <= LD.Monsters.monstersMaxMap1){
            LD.Monsters.activateChild();
        }
        
    }

	

	

};