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

	refresh: function (){
		// refresh every game propeties goes here
        LD.Player.currentHP = 10;
        LD.Player.score = 0;
		LD.Player.swipeAngle = 0;
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

        

        thisGame.cameras.main.setBounds(0, 0,
                            LD.Maps.map.widthInPixels, 
                            LD.Maps.map.heightInPixels);
        thisGame.cameras.main.startFollow(LD.Player.player);

        var animKeys = ["boy","nothing"];
        animKeys.forEach(LD.Player.buildAnims);

        

        


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

        // player.anims.pause({frame: 4});
        // player.currentAnim.pause();

        player.setVelocity(0);
        // console.log(player.anims.currentAnim);
        if(!player.anims.currentAnim){
            LD.Player.setAnimOfBoth('stopped');
        }else if(player.anims.currentAnim != "boystopped"){
            LD.Player.setAnimOfBoth('stopped');
        }

        
        if (cursors.left.isDown || myKeys.A.isDown)
        {
            player.setVelocityX(-160);
            LD.Player.setAnimOfBoth('left');
            swordLR = LD.Player.swordOffset.xL;
        }
        else if (cursors.right.isDown || myKeys.D.isDown)
        {
            player.setVelocityX(160);

            LD.Player.setAnimOfBoth('right');
            swordLR = LD.Player.swordOffset.xR;

        }
        if (cursors.up.isDown || myKeys.W.isDown)
        {
            player.setVelocityY(-160);
            
            LD.Player.setAnimOfBoth('up');
        }
        else if (cursors.down.isDown || myKeys.S.isDown) 
        {
            player.setVelocityY(160);
            
            LD.Player.setAnimOfBoth('down');
        } 

        if( myKeys.SPACE.isDown ){
            console.log("swipeAngle",LD.Player.swipeAngle);
            if(swordLR == LD.Player.swordOffset.xR){
                LD.Player.swipeAngle += LD.Player.swipeInc;
            }else{
                LD.Player.swipeAngle -= LD.Player.swipeInc;
            }
            
        }else{
            LD.Player.swipeAngle = 0;
            // sword.setVisible(false);
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
    }

	

	

};