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











LD.Scenes.Win = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Win ()
    {
        Phaser.Scene.call(this, { key: 'win' });
    },

    init: function (data)
    {
        this.inText = data.text;
    },

    preload: function ()
    {
	    // this.load.image('teal_border', 'img/backgrounds_teal_border.png');
	    this.load.image('black_center', 'img/background_win_lose.png');
        this.load.spritesheet('booty_shorts', 'img/booty_shorts.png', { frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet('dancing_alien1', 'img/dancing_alien1.png', { frameWidth: 210, frameHeight: 630 });
        this.load.spritesheet('hoops', 'img/hoops.png', { frameWidth: 100, frameHeight: 100 });
        
    },

    create: function ()
    {
    	var black_center = this.add.sprite(0,0, 'black_center').setInteractive();
	    black_center.setDisplayOrigin(0);

        LD.Sounds.emptySound.play();


        var booty_shortsAnimation = this.anims.create({
            key: 'booty_shorts',
            frames: this.anims.generateFrameNumbers('booty_shorts'),
            frameRate: 16,
            yoyo: true,
            repeat: -1
        });

        var booty_shorts = this.add.sprite(LD.Globals.horzCenter,
                                            LD.Globals.vertOneThird * 2.5, 
                                            'booty_shorts');
        booty_shorts.anims.play('booty_shorts');



        var dancing_alien1Animation = this.anims.create({
            key: 'dancing_alien1',
            frames: this.anims.generateFrameNumbers('dancing_alien1'),
            frameRate: 12,
            yoyo: true,
            repeat: -1
        });

        var dancing_alien1 = this.add.sprite(LD.Globals.vertOneThird*0.5,
                                            LD.Globals.vertOneThird, 
                                            'dancing_alien1');
        dancing_alien1.anims.play('dancing_alien1');



        var hoopsAnimation = this.anims.create({
            key: 'hoops',
            frames: this.anims.generateFrameNumbers('hoops'),
            // frames: thisGame.anims.generateFrameNumbers('hoops',{
            //             frames:[0-3,16-21,4-6,8-14,22,24,25-30,32-38]}),
            frameRate: 12,
            repeat: -1
        });

        var hoops = this.add.sprite(LD.Globals.horzCenter*1.5,
                                            LD.Globals.vertOneThird*1.5, 
                                            'hoops');
        hoops.setScale(2);
        hoops.anims.play('hoops');


	    var winText = this.add.text(LD.Globals.horizontalOffset, 80, 
	    	LD.Messages.winTextMsg + "\n" + this.inText, 
	    	{ align: 'center', 
	    		font: '48px Anton', 
	    		fill: '#fff', 
	    		wordWrap: {width: LD.Globals.gameWidth - (LD.Globals.horizontalOffset*2)} 
	    	});
        winText.setStroke('#000', 5);        
        winText.setX( (LD.Globals.gameWidth - winText.width)/2 ); 


	    var restartText = this.add.text(60, LD.Globals.vertOneThird*2.5, 
            LD.Messages.restartTextMsg, 
            { align: 'center', font: '48px Anton', fill: '#fff' });
        restartText.setStroke('#000', 5);        
        restartText.setX( (LD.Globals.gameWidth - restartText.width)/2 ); 


        LD.Messages.timeText = this.add.text(40, LD.Globals.vertOneThird*2.8, 
                                    LD.Messages.timeTextPrefix + LD.Messages.savedTimeFormatted() , 
                                    { fontFamily: 'Anton', fontSize: '36px', fill: '#fff' });
        LD.Messages.timeText.setStroke('#000', 5);        



        var fullClick = false;

        this.input.once('pointerup', function () {

            fullClick = true;
            // console.log("pointerup , click!");
            var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
                                                    function(){this.scene.start('select')}, 
                                                    [], this); 

        }, this);

        this.input.once('pointerdown', function () {

            // console.log("pointerdown , click!");
            if(fullClick){
                console.log("fullClick! , select");
                this.scene.start('select');
            }

        }, this);

    }

});




LD.Scenes.Lose = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Lose ()
    {
        Phaser.Scene.call(this, { key: 'lose' });
    },

    init: function (data)
    {
        this.inText = data.text;
    },

    preload: function ()
    {
	    // this.load.image('teal_border', 'img/backgrounds_teal_border.png');
	    this.load.image('black_center', 'img/background_win_lose.png');

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
                                                    function(){this.scene.start('select')}, 
                                                    [], this); 

        }, this);

        this.input.once('pointerdown', function () {

            // console.log("pointerdown , click!");
            if(fullClick){
                console.log("fullClick! , select");
                this.scene.start('select');
            }

        }, this);


        
        if (location.protocol == 'https:'){
            FB.getLoginStatus(function(response) {
              if (response.status === 'connected') {
                // The user is logged in and has authenticated your
                // app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed
                // request, and the time the access token 
                // and signed request each expire.
                // var uid = response.authResponse.userID;
                // var accessToken = response.authResponse.accessToken;
                FB.ui({
                  method: 'share',
                  href: 'https://storm51game.com/',
                  hashtag: '#storm51game',
                  quote: LD.Messages.loseTextMsg + "\n" + specificMessage,
                }, function(response){});
              } else if (response.status === 'not_authorized') {
                // The user hasn't authorized your application.  They
                // must click the Login button, or you must call FB.login
                // in response to a user gesture, to launch a login dialog.
              } else {
                // The user isn't logged in to Facebook. You can launch a
                // login dialog with a user gesture, but the user may have
                // to log in to Facebook before authorizing your application.
              }
             });
        }


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
        this.load.spritesheet('boy', 'img/sprites/boy.png', { frameWidth: 48, frameHeight: 64 });

        

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

        // this.physics.world.setBounds(0, 0, 720, 720, true, true, true, true);
        this.physics.world.setBounds(0, 0, 3000, 3000, true, true, true, true);
// /

        // do once
        
        
        
        LD.Globals.cursors = this.input.keyboard.createCursorKeys();
        var cursors = LD.Globals.cursors;

        
        stars = this.physics.add.group({
            key: 'star',
            repeat: 10,
            setXY: { x: 10, y: 5, stepX: 70 }
        });

        stars.children.iterate(function (child) {

           
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        bombs = this.physics.add.group();

        
        LD.Messages.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        var layer1 = LD.Maps.layer1;

        this.physics.add.collider(player, layer1);
        this.physics.add.collider(stars, layer1);
        this.physics.add.collider(bombs, layer1);
        this.physics.add.collider(player, layer1);
        
        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);


        



    },

    update: function ()
    {

        

        var player = LD.Player.updatePlayer();
        

       
    },


    collectStar: function (player, star){
        star.disableBody(true, true);

        
        LD.Player.score += 10;
        LD.Messages.scoreText.setText('Score: ' + LD.Player.score);

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
    }
    

});










