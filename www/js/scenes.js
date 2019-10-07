if(LD === undefined) {
  var LD = {};
}

LD.Scenes = {};


LD.Scenes.Intro = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Intro ()
    {
        Phaser.Scene.call(this, { key: 'intro' });
    },

    init: function (data)
    {
        // console.log('init', data);

        this.imageID = data.id;
        this.imageFile = data.image;

        thisGame = this;
        LD.Globals.game = this;
        // LD.Globals.initKeys(this);
    },

    preload: function ()
    {
        this.load.image('black_center', 'img/assets/bg.png');

        
        LD.Sounds.preload(this);


    },

    create: function ()
    {

        LD.Sounds.create(this);

    	var black_center = this.add.sprite(0,0, 'black_center');
	    black_center.setDisplayOrigin(0);

        LD.Messages.introText = this.add.text(160, 80, 
                                    LD.Messages.introTextMsg , 
                                    { fontFamily: 'Anton', fontSize: '48px', fill: '#fff' });
        LD.Messages.introText.setStroke('#000', 5); 
        LD.Messages.introText.setX( (LD.Globals.gameWidth - LD.Messages.introText.width)/2 ); 

        this.input.once('pointerdown', function () {
            LD.Sounds.myPlay('emptySound');
        }, this);
    },

    update: function () {
        if(LD.Sounds.emptySound.isPlaying){
            console.log("intro audio loaded!");
            var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
                                                function(){this.scene.start('intro2')}, 
                                                [], this); 
        }
    }

});



LD.Scenes.Intro2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Intro2 ()
    {
        Phaser.Scene.call(this, { key: 'intro2' });
    },

    init: function (data)
    {
        // console.log('init', data);

        this.imageID = data.id;
        this.imageFile = data.image;

        thisGame = this;
        LD.Globals.game = this;
        // LD.Globals.initKeys(this);
    },

    preload: function ()
    {
        this.load.image('fireplace', 'img/assets/fireplace.png');
    },

    create: function ()
    {


        var fireplace = this.add.sprite(0,0, 'fireplace');
        fireplace.setDisplayOrigin(0);

        LD.Messages.introText2 = this.add.text(160, 80, 
                                    LD.Messages.introTextMsg2 , 
                                    { fontFamily: 'Anton', fontSize: '48px', fill: '#fff' });
        LD.Messages.introText2.setStroke('#000', 5); 
        LD.Messages.introText2.setX( (LD.Globals.gameWidth - LD.Messages.introText2.width)/2 ); 

        this.input.once('pointerdown', function () {
            LD.Sounds.myPlay('emptySound');
        }, this);

    },

    update: function () {
        if(LD.Sounds.emptySound.isPlaying){
            console.log("intro2 audio loaded!");
            var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
                                                function(){this.scene.start('play')}, 
                                                [], this); 
        }
    }

});













LD.Scenes.WinLose = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function WinLose ()
    {
        Phaser.Scene.call(this, { key: 'winlose' });
    },

    init: function (data)
    {
        this.inText = data.text;
        this.inImg = data.img;
    },

    preload: function ()
    {
	    // this.load.image('teal_border', 'img/backgrounds_teal_border.png');
	    this.load.image('show_image', 'img/assets/'+this.inImg+'.png');

    },

    create: function ()
    {
    	// var teal_border = this.add.image(0, 0, 'teal_border');
	    // teal_border.setDisplayOrigin(0);
        LD.Sounds.emptySound.play();


    	var black_center = this.add.sprite(0,0, 'show_image').setInteractive();
	    black_center.setDisplayOrigin(0);

        // console.log("seconds ",LD.Messages.savedTimeFormatted());
        // LD.Messages.timeText = this.add.text(40, LD.Globals.vertOneThird*2.8, 
        //                             LD.Messages.timeTextPrefix + LD.Messages.savedTimeFormatted() , 
        //                             { fontFamily: 'Anton', fontSize: '36px', fill: '#fff' });
        // LD.Messages.timeText.setStroke('#000', 5);        


        var specificMessage = this.inText;
        // var specificMessage = "you lost bruh";
		var winloseText = this.add.text(LD.Globals.horizontalOffset, 80, 
	    	LD.Messages.winloseTextMsg + "\n" + specificMessage, 
	    	{ align: 'center', 
	    		font: '48px Anton', 
	    		fill: '#fff', 
	    		wordWrap: {width: LD.Globals.gameWidth - (LD.Globals.horizontalOffset*2)} 
	    	});
        winloseText.setStroke('#000', 5);	    
        winloseText.setX( (LD.Globals.gameWidth - winloseText.width)/2 ); 

        var restartText = this.add.text(60, LD.Globals.vertOneThird*2.5, 
            LD.Messages.restartTextMsg, 
            { align: 'center', font: '48px Anton', fill: '#fff' });
        restartText.setStroke('#000', 5);
        restartText.setX( (LD.Globals.gameWidth - restartText.width)/2 ); 

	    var fullClick = false;

        this.input.once('pointerup', function () {

            fullClick = true;
            // console.log("pointerup , click!");
            var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
                                                    function(){this.scene.start('play')}, 
                                                    [], this); 

        }, this);

        this.input.once('pointerdown', function () {

            // console.log("pointerdown , click!");
            if(fullClick){
                console.log("fullClick! , select");
                this.scene.start('play');
            }

        }, this);

    }

});






LD.Scenes.Play = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Play ()
    {
        // console.log("Play Scene Play()");
        Phaser.Scene.call(this, 'play');
    },


    preload: function ()
    {

        this.load.image('tileset1', 'img/assets/winter_outdoorsTileSheet.png');
        this.load.image('tileset2', 'img/assets/cabin.png');
        this.load.tilemapTiledJSON('forestcabin', 'json/forestcabin.json');
        
        this.load.image('star', 'img/sprites/wood.png');
        this.load.image('bomb', 'img/sprites/baddies.png');
        this.load.image('sword2', 'img/sprites/sword2.png');
        this.load.spritesheet('boy', 'img/sprites/boy.png', { frameWidth: 48, frameHeight: 64 });
        this.load.spritesheet('nothing', 'img/sprites/nothing.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('baddie', 'img/sprites/baddies.png', { frameWidth: 48, frameHeight: 48 });

        this.load.spritesheet('void', 'img/sprites/void.png', { frameWidth: 9, frameHeight: 9 });

        

    },

    create: function ()
    {
        console.log("Play Scene create()");
        thisGame = this;
        LD.Globals.game = this;

        LD.Globals.gameOver = false;
        // LD.Globals.initKeys(this);

        

      
        var map = LD.Maps.create(this);
        var player = LD.Player.createPlayer();
        var monsters = LD.Monsters.createMonsters();
        var voids = LD.Player.voids;

        // this.physics.world.setBounds(0, 0, 720, 720, true, true, true, true);
        this.physics.world.setBounds(0, 0, 
                        LD.Maps.map.widthInPixels, 
                        LD.Maps.map.heightInPixels, 
                        true, true, true, true);
// /

        // do once


        // LD.Messages.healthBarFullRect = new Phaser.Geom.Rectangle(250, 200, 300, 40);
        // LD.Messages.healthBarFullGraphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
        // LD.Messages.healthBarFullGraphics.fillRectShape(LD.Messages.healthBarFullRect);
        
        // LD.Messages.healthBarCurrentRect = new Phaser.Geom.Rectangle(250, 200, 280, 40);
        // LD.Messages.healthBarCurrentGraphics = this.add.graphics({ fillStyle: { color: 0xFF0000 } });
        // LD.Messages.healthBarCurrentGraphics.fillRectShape(LD.Messages.healthBarCurrentRect);
        
        LD.Messages.healthBarFullRect = this.add.rectangle(200, 200, 148, 20, 0x0000ff);
        LD.Messages.healthBarCurrentRect = this.add.rectangle(200, 200, 130, 20, 0xff0000);

        
        LD.Globals.cursors = this.input.keyboard.createCursorKeys();
        var cursors = LD.Globals.cursors;

        LD.Globals.myKeys = this.input.keyboard.addKeys(
            {
                W:Phaser.Input.Keyboard.KeyCodes.W,
                S:Phaser.Input.Keyboard.KeyCodes.S,
                A:Phaser.Input.Keyboard.KeyCodes.A,
                D:Phaser.Input.Keyboard.KeyCodes.D,
                SPACE:Phaser.Input.Keyboard.KeyCodes.SPACE
            }
        );

        
        stars = this.physics.add.group({
            key: 'star',
            repeat: 12
            // setXY: { x: 10, y: 5, stepX: 70 }
        });

        stars.children.iterate(function (child) {

            var x = LD.Globals.randomNumber(10, LD.Maps.map.widthInPixels-10);
            var y = LD.Globals.randomNumber(10,LD.Maps.map.heightInPixels-10);
            child.setPosition(x,y);
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.setName("star");

        });

        bombs = this.physics.add.group();

        
        // LD.Messages.woodText = this.add.text(16, 16, 
        //                             LD.Messages.woodTextPrefix
        //                             + "0"
        //                             +LD.Messages.woodTextSuffix, 
        //                             { fontSize: '32px', fill: '#000' });

        LD.Messages.woodText = this.add.text(16, 16, 
                                    LD.Messages.woodTextPrefix
                                    + "0"
                                    +LD.Messages.woodTextSuffix,  
                                    { fontFamily: 'Anton', fontSize: '48px', fill: '#fff' });
        LD.Messages.woodText.setStroke('#000', 5); 

        LD.Messages.nothingText = this.add.text(16, 64, 
                                    LD.Messages.nothingTextPrefix
                                    + "0"
                                    +LD.Messages.nothingTextSuffix,  
                                    { fontFamily: 'Anton', fontSize: '48px', fill: '#fff' });
        LD.Messages.nothingText.setStroke('#000', 5); 

        // NT.Messages.woodText.setX( (NT.Globals.gameWidth - NT.Messages.introText.width)/2 ); 

        var layer1 = LD.Maps.layer1;

        this.physics.add.collider(player, layer1);
        this.physics.add.collider(stars, layer1);
        this.physics.add.collider(bombs, layer1);
        this.physics.add.collider(player, layer1);
        
        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        this.physics.add.collider(player, monsters, this.hitMonsters, null, this);
        this.physics.add.collider(LD.Player.sword, monsters, this.hitSword, null, this);
        
        this.physics.add.overlap(voids, monsters, this.hitVoid, null, this);
        this.physics.add.overlap(voids, stars, this.hitVoid, null, this);


        



    },

    update: function ()
    {

        

        var player = LD.Player.updatePlayer();
        LD.Monsters.updateMonsters();
        
        var hpRatio =  148 * (LD.Player.currentHP / LD.Player.totalHP);
        LD.Messages.healthBarCurrentRect.setSize(hpRatio,20);

        if(LD.Player.currentHP <= 0){
            thisGame.scene.start('winlose', { id: 2, 
                                            text:  LD.Messages.winloseTexts.zeroHP ,
                                            img: "bg"   });
        }

        

        LD.Monsters.monsters.children.iterate(function (child) {
            if(child.active){
                if(child.health <= 0){
                    // LD.Monsters.activateChild();
                    // LD.Monsters.activateChild();
                    // child.destroy();
                    LD.Monsters.killBaddie(child);
                }
            }
        });
    },


    collectStar: function (player, star){
        star.disableBody(true, true);

        
        LD.Player.score += 1;
        // LD.Messages.scoreText.setText('Score: ' + LD.Player.score);


        LD.Messages.woodText.setText(LD.Messages.woodTextPrefix
                                    + LD.Player.score
                                    +LD.Messages.woodTextSuffix);

        


        if(LD.Player.score >= 9){
            // Phaser.Scene.call(this, 'lose');
            // thisGame.scene.start('winlose', { id: 2, 
            //                                 text:  "you got all wood heh",
            //                                 img: "bg"  });
            LD.Player.hasSword = true;

            LD.Messages.woodText.setText(LD.Messages.gotSwordText);

        }




        if (stars.countActive(true) === 0)
        {
            
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

        }
    },

    hitBomb: function (player, bomb)
    {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('down');

        LD.Globals.gameOver = true;
    },

    hitMonsters: function (player, monster)
    {
        // this.physics.pause();

        player.setTint(0xff0000);

        // player.anims.play('boydown');

        LD.Player.currentHP -= LD.Monsters.attackDamage;

        // thisGame.scene.start('lose', { id: 2, text:  "you lost lol"  });
    },

    hitSword: function (sword, monster)
    {
        // this.physics.pause();

        // player.setTint(0xff0000);

        // player.anims.play('boydown');

        monster.health -= LD.Player.attackDamage;

        // thisGame.scene.start('lose', { id: 2, text:  "you lost lol"  });
    },

    hitVoid: function (b1, b2)
    {
        console.log(b1,b2);

        if(b1.active && b2.active){
            LD.Player.nothingTally +=1;

            if(LD.Player.nothingTally >= LD.Player.nothingTallyMax){
                thisGame.scene.start('winlose', { id: 2, 
                                            text:  LD.Messages.winloseTexts.nothingMaxed ,
                                            img: "bg"   });

            }

            var nothingScale = LD.Player.nothingScaleMax * (LD.Player.nothingTally / LD.Player.nothingTallyMax)
            LD.Player.nothing.setScale(nothingScale);

            //kill victim
            if(b1.name == "void"){
                var victim = b2;
            }else{
                var victim = b1;
            }
            if(b1.name == "baddie"){
                LD.Monsters.killBaddie(b1);
            }else if(b2.name == "baddie"){
                LD.Monsters.killBaddie(b2);
            }else{
                victim.setActive(false).setVisible(false);
                victim.body.enable = false;
            }
            

            LD.Messages.nothingText.setText(LD.Messages.nothingTextPrefix
                                        + LD.Player.nothingTally
                                        +LD.Messages.nothingTextSuffix);
        }
        //nothing++
        

    }
    

});










