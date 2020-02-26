import action from './action.js'

const _actions_symbol = {
  actions_symbol: Symbol('actions_symbol')
};

export default class action_manager{
  constructor(){
    this[_actions_symbol.actions_symbol] = [];
  }
  addAction(name, act){
    if (this[_actions_symbol.actions_symbol][name] != null){
      return false;
    }
   this[_actions_symbol.actions_symbol][name] = act;
    return true;
  }

  removeAction(name){
    delete this[_actions_symbol.actions_symbol][name];
  }
  
  executeActions(){
    for (i in this[_actions_symbol.actions_symbol]){
      if (this[_actions_symbol.actions_symbol][i] instanceof action){
        if (this[_actions_symbol.actions_symbol][i].isDone()){
          this.removeAction(i);
        } else {
          this[_actions_symbol.actions_symbol][i].do_action();
        }        
      }
    }
  }
}