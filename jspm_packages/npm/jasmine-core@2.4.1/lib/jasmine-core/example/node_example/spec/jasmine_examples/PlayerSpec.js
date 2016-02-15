/* */ 
describe("Player", function() {
  var Player = require('../../lib/jasmine_examples/Player');
  var Song = require('../../lib/jasmine_examples/Song');
  var player;
  var song;
  beforeEach(function() {
    player = new Player();
    song = new Song();
  });
  it("should be able to play a Song", function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);
    expect(player).toBePlaying(song);
  });
  describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });
    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).toBeFalsy();
      expect(player).not.toBePlaying(song);
    });
    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');
    player.play(song);
    player.makeFavorite();
    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);
      expect(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
});
