import scene_manager  from './scene_manager.js'
import player_inface  from './touch/player_inface_proxy.js'
import layer_data         from '../framework/widget/layer_data.js'
import log            from  './log.js'
import action_manager from './action/action_manager.js'

const _scene_mgr_symbol = {
  scene_mgr_symbol: Symbol('scene_mgr_symbol')
}

const _game_state_symbol = {
  game_states: Symbol('game_states') 
};

const _action_mgr_symbol = {
  action_mgr_symbol: Symbol('action_mgr_symbol')
}


class layer_data_struct{
  constructor(){
    this.layer = null;
    this.data = null;
  }
}

export default class game_progress{
  constructor(ctx){
    this[_scene_mgr_symbol.scene_mgr_symbol] = new scene_manager(ctx);
    this[_action_mgr_symbol.action_mgr_symbol] =  new action_manager();
    this[_game_state_symbol.game_states] = [];
    this.pre_state = null;
    this.cur_state = null; 
    this.performance = wx.getPerformance();  
  }

  add_game_state(name, state){ 
    if (this[_game_state_symbol.game_states][name] != null) {
      return false;
    }
    this[_game_state_symbol.game_states][name] = (state);
    return true;
  }

  change_state(state_case_from){
    this.pre_state = this.cur_state;
    this.cur_state = this.cur_state.next_state(state_case_from)
    return this.cur_state;
  }

  set_cur_game_state(state){
    this.cur_state = state;
  }

  get_cur_game_state(){
    return this.cur_state;
  }

  get_scene_manager(){
    return this[_scene_mgr_symbol.scene_mgr_symbol];
  }

  get_action_manager() {
    return this[_action_mgr_symbol.action_mgr_symbol];
  }

  do_game_controll(){
    ;
  }

  do_game_progress(arg){
    this.do_game_controll();
    this[_action_mgr_symbol.action_mgr_symbol].executeActions();
    
    if ( (!this.performance)==false){
      let us_timestamp = this.performance.now();     
      this[_scene_mgr_symbol.scene_mgr_symbol].duty(arg, us_timestamp);  
      
    }
   
  }
}