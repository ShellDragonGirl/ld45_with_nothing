if(LD === undefined) { 
  var LD = {};
}

LD.Sounds = {

	allSounds: [
		{
			name: 'emptySound',
			volume: 0.01,
			loop: false
		}
	],

	myPlay: function (name, vol=1){
		console.log("sounds", name, LD.Sounds);
		var tune = LD.Sounds.findTuneByName(name);
		LD.Sounds[tune.name].play({volume: tune.volume * vol, loop: tune.loop});
	},

	findTuneByName: function (name){
		var i;
		for(i=0;i<LD.Sounds.allSounds.length;++i){
			var tune = LD.Sounds.allSounds[i];
			if(tune.name == name){
				return tune;
			}
		}
	},

	preload: function (thisGame){
		var i;
		for(i=0;i<LD.Sounds.allSounds.length;++i){
			var tune = LD.Sounds.allSounds[i];
			thisGame.load.audio(tune.name, ['audio/'+tune.name+'.mp3','audio/'+tune.name+'.ogg']);
		}
	},

	create: function (thisGame){
		var i;
		for(i=0;i<LD.Sounds.allSounds.length;++i){
			var tune = LD.Sounds.allSounds[i];
			LD.Sounds[tune.name] = thisGame.sound.add(tune.name, {volume: tune.volume, loop: tune.loop});
		}
		console.log("create sounds", LD.Sounds);
	}
};


