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

    introTextMsg:   "Don't you think It's time we got \n\t started?   \n\t...Isn't time you WAKE UP!",
    selectTextMsg:   "Select your Runner!",
    winloseTextMsg:   "",
    restartTextMsg:   "Click to restart!",

    gotSwordText: "There's a note it reads: \n\t\t\tHey kid I left you my old sword",

    winloseTexts: {
        zeroHP: "How am I going to get anything done \n\t if you're dead",
        nothingMaxed: "Thanks I'll take it from here",
        levelOneCleared: "Ah... The fire is nice \n\t and let's take a nap"
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

