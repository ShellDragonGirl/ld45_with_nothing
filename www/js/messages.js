if(LD === undefined) {
  var LD = {};
}

LD.Messages = {
    woodText:  "",
    woodTextPrefix:   "Need Wood: ",
    woodTextSuffix:   "/9",

    nothingText:  "",
    nothingTextPrefix:   "Nothing: ",
    nothingTextSuffix:   "/"+LD.Player.nothingTallyMax,

    movesText:  "",
    movesTextPrefix:   "Moves: ",

    levelText:  "",
    levelTextPrefix :   "Level: ",

    ticksText:  "",
    ticksTextPrefix :   "Distance: ",

    debugText:  "",
    debugTextPrefix :   "debug: ",

    timeText:  "",
    timeTextPrefix :   "Time: ",
    savedTime: 0,

    introTextMsg:   "Don't you think It's time we got "
                    +"\n\t started?   "
                    +"\n\t...Isn't time you WAKE UP!",
    introTextMsg2:   "Hey kid,"
                    +"\n\n\tI found you passed out at the gate, "
                    +"\nnot the best place for a nap even when there isn't "
                    +"\n4 feet of snow on the ground."
                    +"\n\n\tAnyway I went to get some supplies, "
                    +"\ntry to keep the fire going..."
                    +"\n\n\tShould be some wood around but don't go too far "
                    +"\nthe specters out there will kill you faster than the snow.",
    
    selectTextMsg:   "Select your Runner!",
    winloseTextMsg:   "",
    restartTextMsg:   "Click to restart!",

    gotSwordText: "there's a note it reads: \n\t\t\they kid i left you  my old sword",

    winloseTexts: {
        zeroHP:"how am i going to get anything done if you're dead",
        nothingMaxed: "thanks i'll take it from here",
        levelOneCleared: "ah the fire is nice and let's take a nap"
      },

    textDepth: 200,


    savedTimeFormatted: function(){
        return LD.Messages.msToTime(LD.Messages.savedTime);
    },

    msToTime: function(s) {

  // Pad to 2 or 3 digits, default is 2
      function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
      }

      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;

      // return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
      return pad(mins) + ':' + pad(secs) + '.' + pad(ms);
    }
};

