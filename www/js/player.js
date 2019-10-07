if(LD === undefined) {
  var LD = {};
}

LD.Player = {

	// unchangle properties go here
	totalHP: 10,
    nothingOffset: {x:50,y:50},
    swordOffset: {xL:-16,yL:0,xR:22,yR:0},
    
    swipeDegrees: 150,
    swipeInc: 15,

    attackDamage: 4,

    maxVel: 160,
    voidMultFactor: 2,

    nothingTallyMax: 10,
    nothingScaleMax: 4,

	refresh: function (){
		// refresh every game propeties goes here
        LD.Player.currentHP = 10;
        LD.Player.nothingTally = 0;
        LD.Player.score = 0;
        LD.Player.swipeAngle = 0;
		LD.Player.vel = {x:0,y:0};
	},

	createPlayer: function(){
		thisGame = LD.Globals.game;
		LD.Player.refresh();

        LD.Player.player = thisGame.physics.add.sprite(200, 200, 'boy');
        LD.Player.nothing = thisGame.physics.add.sprite(330, 330, 'nothing');
        LD.Player.sword = thisGame.physics.add.sprite(330, 330, 'sword2');
        LD.Player.sword.setScale(1,2.5);
        LD.Player.sword.setOrigin(0.5,1);
        LD.Player.sword.setImmovable();


      
        LD.Player.player.setCollideWorldBounds(true);
        LD.Player.player.setSize(31,54).setOffset(9,7);

        

        thisGame.cameras.main.setBounds(0, 0,
                            LD.Maps.map.widthInPixels, 
                            LD.Maps.map.heightInPixels);
        thisGame.cameras.main.startFollow(LD.Player.player);

        var animKeys = ["boy","nothing"];
        animKeys.forEach(LD.Player.buildAnims);

        
        var voidShootAnimation = thisGame.anims.create({
            key: 'void_shoot',
            frames: thisGame.anims.generateFrameNumbers('void'),
            frameRate: 5,
            repeat: -1
        });
        LD.Player.voids = thisGame.physics.add.group({
            defaultKey: 'void',
            maxSize: LD.Player.voidMaxTotal,
            name: "void",
            createCallback: function (child) {
                // child.setName('void');
                // child.sprite = thisGame.physics.add.sprite(0, 0, 'void');
                child.setCollideWorldBounds(true);
                child.body.onWorldBounds = true;

                child.body.world.on('worldbounds', function(body) {
                  // Check if the body's game object is the sprite you are listening for
                  if (body.gameObject === this) {
                    // Stop physics and render updates for this object
                    this.setActive(false);
                    this.setVisible(false);
                    console.log("collide world bounds", child.name);
                  }
                }, child);
                // child.publicName = LD.Bullets.publicName;
                // console.log('Created', void.name);
            },
            removeCallback: function (child) {
                // console.log('Removed', void.name);
            }
        });
        LD.Player.voids.createMultiple({
            visible: false,
            active: false,
            key: LD.Player.voids.defaultKey,
            repeat: LD.Player.voids.maxSize - 1
        });
        

        thisGame.input.on('pointerdown', function (pointer) {

            console.log('down');

            // this.add.image(pointer.x, pointer.y, 'logo');

            LD.Player.activateBullet(pointer);

        }, thisGame);




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
        var myKeys = LD.Globals.myKeys;
        var player = LD.Player.player;
        var nothing = LD.Player.nothing;
        var sword = LD.Player.sword;

        var swordLR = LD.Player.swordOffset.xL;
        var swordR = 0;

        if (LD.Globals.gameOver)
        {
            return;
        }

        // console.log(player);
        // if(player.isTinted){
        //     player.clearTint();
        // }

        // player.anims.pause({frame: 4});
        // player.currentAnim.pause();

        player.setVelocity(0);
        LD.Player.vel.x = 0;
        LD.Player.vel.y = 0;
        // console.log(player.anims.currentAnim);
        if(!player.anims.currentAnim){
            LD.Player.setAnimOfBoth('stopped');
        }else if(player.anims.currentAnim != "boystopped"){
            LD.Player.setAnimOfBoth('stopped');
        }

        
        if (cursors.left.isDown || myKeys.A.isDown)
        {
            LD.Player.vel.x = -LD.Player.maxVel;
            player.setVelocityX(-LD.Player.maxVel);
            LD.Player.setAnimOfBoth('left');
            swordLR = LD.Player.swordOffset.xL;
        }
        else if (cursors.right.isDown || myKeys.D.isDown)
        {
            LD.Player.vel.x = LD.Player.maxVel;
            player.setVelocityX(LD.Player.maxVel);

            LD.Player.setAnimOfBoth('right');
            swordLR = LD.Player.swordOffset.xR;

        }
        if (cursors.up.isDown || myKeys.W.isDown)
        {
            LD.Player.vel.y = -LD.Player.maxVel;
            player.setVelocityY(-LD.Player.maxVel);
            
            LD.Player.setAnimOfBoth('up');
        }
        else if (cursors.down.isDown || myKeys.S.isDown) 
        {
            LD.Player.vel.y = LD.Player.maxVel;
            player.setVelocityY(LD.Player.maxVel);
            
            LD.Player.setAnimOfBoth('down');
        } 

        if( myKeys.SPACE.isDown ){
            console.log("swipeAngle",LD.Player.swipeAngle);
            if(swordLR == LD.Player.swordOffset.xR){
                LD.Player.swipeAngle += LD.Player.swipeInc;
            }else{
                LD.Player.swipeAngle -= LD.Player.swipeInc;
            }
            sword.setVisible(true);
            sword.body.enable = true;
        }else{
            LD.Player.swipeAngle = 0;
            sword.setVisible(false);
            sword.body.enable = false;

        }



        if(sword.angle != LD.Player.swipeAngle){
            

            if(LD.Player.swipeDegrees < Math.max(Math.abs(sword.angle), Math.abs(LD.Player.swipeAngle)) ){
                LD.Player.swipeAngle = 0;
                sword.setAngle(0);
            }else{
                sword.setAngle(LD.Player.swipeAngle);
            }
            
        }


        // nothing.setPosition(player.getBottomRight());
        // console.log(player.getBottomRight());
        nothing.setPosition(player.x + LD.Player.nothingOffset.x,
                            player.y + LD.Player.nothingOffset.y);

        sword.setPosition(player.x + swordLR,
                            player.y + LD.Player.swordOffset.yR);


        

		return player;
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
        LD.Player.player.anims.play('boy'+anim, true);
        LD.Player.nothing.anims.play('nothing'+anim, true);
    },

    activateBullet: function (pointer) {

        var child = LD.Player.voids.get(LD.Globals.horzCenter, LD.Globals.vertOneThird);

        if (!child) return; // None free



        child
        .setActive(true)
        .setVisible(true)
        // .setTint(Phaser.Display.Color.RGBToString(LD.Globals.randomNumber(50,255), 255 , 255 ))
        // .setTint(Phaser.Display.Color.RandomRGB().color)
        .clearTint()
        .setScale(5)
        .play('void_shoot');

        child.name = "void";


        var player = LD.Player.player;
        var vel =  LD.Player.vel; 
        var mult =  LD.Player.voidMultFactor; 

        child.setPosition(player.x, player.y);

        if(vel.x == 0 && vel.y == 0){
            child.setVelocity(0, LD.Player.maxVel * mult);
        }else{
            child.setVelocity(vel.x * mult, vel.y * mult);
        }
        

//voids.killAndHide(child)
    }

	

	

};