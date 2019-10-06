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
        this.load.image('black_center', 'img/background_win_lose.png');
	    this.load.image('tinySquare', 'img/tinySquare.png');

        
        LD.Sounds.preload(this);


    },

    create: function ()
    {

        LD.Sounds.create(this);

        
        
        // LD.Sounds.musicAudio.play();


    	var black_center = this.add.sprite(0,0, 'black_center');
	    black_center.setDisplayOrigin(0);

        LD.Messages.introText = this.add.text(160, 80, 
                                    LD.Messages.introTextMsg , 
                                    { fontFamily: 'Anton', fontSize: '48px', fill: '#fff' });
        LD.Messages.introText.setStroke('#000', 5); 
        LD.Messages.introText.setX( (LD.Globals.gameWidth - LD.Messages.introText.width)/2 ); 


        this.pointerUp = false;
        this.input.once('pointerup', function () {

            // this.scene.start('play');
            this.pointerUp = true;


        }, this);

        this.input.once('pointerdown', function () {
            LD.Sounds.myPlay('emptySound');
        }, this);


    },

    update: function (){
        if(this.pointerUp && LD.Sounds.emptySound.isPlaying){
            console.log("audio loaded!");
            this.scene.start('play');
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
    },

    preload: function ()
    {
	    // this.load.image('teal_border', 'img/backgrounds_teal_border.png');
	    this.load.image('black_center', 'img/missing.png');

    },

    create: function ()
    {
    	// var teal_border = this.add.image(0, 0, 'teal_border');
	    // teal_border.setDisplayOrigin(0);
        LD.Sounds.emptySound.play();


    	var black_center = this.add.sprite(0,0, 'black_center').setInteractive();
	    black_center.setDisplayOrigin(0);

        // console.log("seconds ",LD.Messages.savedTimeFormatted());
        LD.Messages.timeText = this.add.text(40, LD.Globals.vertOneThird*2.8, 
                                    LD.Messages.timeTextPrefix + LD.Messages.savedTimeFormatted() , 
                                    { fontFamily: 'Anton', fontSize: '36px', fill: '#fff' });
        LD.Messages.timeText.setStroke('#000', 5);        


        var specificMessage = this.inText;
        // var specificMessage = "you lost bruh";
		var loseText = this.add.text(LD.Globals.horizontalOffset, 80, 
	    	LD.Messages.loseTextMsg + "\n" + specificMessage, 
	    	{ align: 'center', 
	    		font: '48px Anton', 
	    		fill: '#fff', 
	    		wordWrap: {width: LD.Globals.gameWidth - (LD.Globals.horizontalOffset*2)} 
	    	});
        loseText.setStroke('#000', 5);	    
        loseText.setX( (LD.Globals.gameWidth - loseText.width)/2 ); 

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


        



    },

    update: function ()
    {

        

        var player = LD.Player.updatePlayer();
        LD.Monsters.updateMonsters();
        
        var hpRatio =  148 * (LD.Player.currentHP / LD.Player.totalHP);
        LD.Messages.healthBarCurrentRect.setSize(hpRatio,20);

        if(LD.Player.currentHP <= 0){
            thisGame.scene.start('winlose', { id: 2, text:  "you kildzt lol"  });
        }

        if(LD.Monsters.monsters.health <= 0){
            LD.Monsters.monsters.destroy();
        }
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
            thisGame.scene.start('winlose', { id: 2, text:  "you got all wood heh"  });
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

        LD.Monsters.monsters.health -= LD.Player.attackDamage;

        // thisGame.scene.start('lose', { id: 2, text:  "you lost lol"  });
    }
    

});










