import log from './log.js'

const _music_symbol = {
  music_symbol: Symbol('music_symbol')
};

export default class game_music{
  constructor(){
    this[_music_symbol.music_symbol] = {};
  }

  _getGameMusic(){
    return this[_music_symbol.music_symbol][name] || (this[_music_symbol.music_symbol][name] = {});
  }

  AddGameMusic(name, game_music){

  }
}