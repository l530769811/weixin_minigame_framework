
const _game_state_symbol = {
  game_state_symbol: Symbol('game_state_symbol')
};

const _scenes_symbol = {
  scenes_symbol: Symbol('scenes_symbol')
};

export default  class game_state{
  constructor(){
    this[_game_state_symbol.game_state_symbol] = {};
    this[_scenes_symbol.scenes_symbol] = {};
  }

  add_next_state(name, state){
    this[_game_state_symbol.game_state_symbol][name] = state;
  }

  get_next_state(name){
    return this[_game_state_symbol.game_state_symbol][name];
  }

  next_state(cur_state, state_case){
    return this;
  }

  before_state(){
    ;
  }
  in_state(){
    ;
  }
  after_state(){
    ;
  }

  game_action(act){
    ;
  }

  bind_scene(name , scene){
    this[_scenes_symbol.scenes_symbol][name] = scene;
  }

  obtain_scene(name){
    return this[_scenes_symbol.scenes_symbol][name];
  }
  
}