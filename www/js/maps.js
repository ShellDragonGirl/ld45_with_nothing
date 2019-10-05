if(LD === undefined) { 
  var LD = {};
}

LD.Maps = {


	preload: function (thisGame){

	},

	create: function (thisGame){
		LD.Maps.map = thisGame.make.tilemap({ key: 'forestcabin' });
		var map = LD.Maps.map;

        LD.Maps.tiles = map.addTilesetImage('winter_outdoorsTileSheet', 'tileset1');
        var tiles = LD.Maps.tiles;
        
        LD.Maps.tiles2 = map.addTilesetImage('cabin', 'tileset2');

        LD.Maps.layer0 = map.createStaticLayer(0, tiles );
        LD.Maps.layer1 = map.createStaticLayer(1, tiles, tiles2 );
        LD.Maps.layer2 = map.createStaticLayer(2, tiles );
	}
};


