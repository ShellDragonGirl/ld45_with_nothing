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
        var tiles2 = LD.Maps.tiles2;

        LD.Maps.layer0 = map.createStaticLayer(0, tiles ); // background
        LD.Maps.layer1 = map.createStaticLayer(1, [tiles, tiles2] ); // colliabes
        LD.Maps.layer2 = map.createStaticLayer(2, [tiles, tiles2] ); // pass thru/above/in front

        LD.Maps.layer1.setCollisionBetween(1,9999);

        // LD.Maps.layer1.setCollisionFromCollisionGroup();

        var testtt = map.getLayer(1);
        console.log(testtt);

        LD.Maps.objectLayer = map.getObjectLayer('Object Layer 1');
        var obLs = LD.Maps.objectLayer;

        obLs.objects.forEach(
            (ob) => {
                // console.log(ob);
                // pretendName = "name|10|behavior|7";
                // var res = pretendName.split("|");
                console.log("res is:", res);
                if(ob.type == "enemy"){
                    // if(ob.name == "baddie"){
                    //     // new sprite baddie.png
                    // }else if(ob.name == "second bruh"){

                    // }

                    // ob.name = "baddie|derp|10|behavior"
                    var obSplit = ob.name.split('|');
                    var name = obSplit[0];
                    var hp = obSplit[2];
                    // var imgpath = obSplit[2]
                    // var behavior = obSplit[3]
                    // var res = ob.name.split("|");
                    // console.log("res is:", res);

                    LD.Monsters.activateChild(ob.x,ob.y, name,hp);



                }else if(ob.type == "scenechange"){

                    // ob.name = "baddie|10|baddie.png|behavior"
                    var name = ob.name[0]
                    var hp = ob.name[1]
                    var imgpath = ob.name[2]
                    var behavior = ob.name[3]



                }
        });

	}
};


