if(NT === undefined) {
  var NT = {};
}

NT.Signs = {
	
	startFrame: 1,
	startTick: 1,

	spriteScale: 2,
	spriteAngle: -5,

	signMaxTotal: 10,
	signSpeedBoost: 1.05,

	threshold: 1000,

	relativeDepth: 10,

	signTriggerText: ["Hello World","Second hello"],

	refresh: function (){
		NT.Signs.frameMult = NT.Globals.baseFrameMult * NT.Player.thisSheet.frameMult;
		NT.Signs.timedEvent;
		NT.Signs.signUp = false;
		NT.Signs.signFullClick = false;
		NT.Signs.signTriggerFrames = [110,220];

	},


	createChildren: function (){
		NT.Signs.refresh();
		NT.Signs.group = thisGame.add.group({
	        defaultKey: 'sign',
	        maxSize: NT.Signs.signMaxTotal,
	        createCallback: function (child) {
	            child.setName('sign' + this.getLength());
	            child
				    .setActive(false)
				    .setVisible(false);
	        },
	        removeCallback: function (child) {
	        }
	    });

	    NT.Signs.group.createMultiple({
	        visible: false,
	        active: false,
	        key: NT.Signs.group.defaultKey,
	        repeat: NT.Signs.group.maxSize - 1
	    });
	    
		// console.log("Signs:",NT.Signs.group);


	},

	updateTicks: function(){
		var percentComplete = 1 - (NT.Globals.winGameTicks - NT.Player.runTicks)/NT.Globals.winGameTicks;
		var levelAcelAdded =  NT.Globals.progressFrameMultAdded * percentComplete;
		// console.log("levelAcel" , levelAcelAdded);

		NT.Signs.group.children.iterate(function (child) {
			if(child.active){
				child.nowTick *= (NT.Signs.frameMult + levelAcelAdded) * NT.Player.speedBoost;
				child.nowFrame *= (NT.Signs.frameMult + levelAcelAdded) * NT.Player.speedBoost;
			}
		});
	},
	
	updateChildren: function(){
		
		NT.Signs.group.children.iterate(function (child) {
			// console.log("update: ", sign.name,sign);
			if(child.active){
				var horzOffset = (NT.Globals.horzCenter) - NT.Player.relativeHorz;
				var frameOffset = (child.nowFrame/100);
				var angle = NT.Signs.spriteAngle *  (horzOffset/NT.Globals.gameHeight);

				var x = NT.Globals.horzCenter + (horzOffset * frameOffset) + (child.uniqueHorzOffset * frameOffset);
				var y = (NT.Globals.gameHeight - NT.Globals.vertOneThird) * frameOffset + NT.Globals.vertOneThird;
				child.setScale(frameOffset * NT.Signs.spriteScale);
				child.setAngle(angle);
				child.setPosition(x,y);
				child.setDepth(NT.Signs.relativeDepth + child.nowFrame);

				if(child.nowFrame >= 100){
					NT.Signs.group.killAndHide(child);
				}
			}
	    });

	},

	activateChild: function (child, uniqueHorzOffset=0, text="default") {
	    child
	    .setActive(true)
	    .setVisible(true);

	    child.nowTick = NT.Signs.startFrame;
		child.nowFrame = NT.Signs.startTick;
		child.text = text;

		if(uniqueHorzOffset){
			child.uniqueHorzOffset = uniqueHorzOffset;
		}else{
			child.uniqueHorzOffset = NT.Globals.randomNumber(
	            				-NT.Signs.threshold,
	            				NT.Signs.threshold);
		}

	},

	addChild: function (uniqueHorzOffset=0, text) {
	    var child = NT.Signs.group.get(NT.Globals.horzCenter, NT.Globals.vertOneThird);

	    if (!child) return; // None free

	    NT.Signs.activateChild(child, uniqueHorzOffset, text);
	},

	checkTapped: function (pointer) {
		NT.Signs.group.children.iterate(function (child) {
			if(child.active){
				var bounds = child.getBounds();

				if(pointer.downX > bounds.left
					&& pointer.downX < bounds.right
					&& pointer.downY < bounds.bottom
					&& pointer.downY > bounds.top
					){
					console.log("tapped:",child.name, child.text);

					NT.Signs.toggleSign();
					NT.Messages.signText.setText(child.text); 

				}
			}
	    });
	},

	toggleSign: function (){
		var doPause = !NT.Signs.signUp;
		NT.Signs.signUp = doPause;

		console.log("toggleSign", NT.Signs.signUp, doPause );
		NT.Globals.pauseGame(doPause);
		NT.Globals.pauseGraphics.setVisible(doPause); 
		NT.Messages.signText.setVisible(doPause);

		if(doPause){
			NT.Sounds.hitsign.play();
			NT.Player.player.anims.pause();
		}else{
			NT.Player.player.anims.resume();
		}

	}

};

