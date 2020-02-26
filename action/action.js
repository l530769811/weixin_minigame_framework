const _is_done_symbol = {
  is_done_symbol: Symbol('is_done_symbol')
};

export default class action {
  constructor(){
    this[_is_done_symbol.is_done_symbol] = 0;
  }

  isDone(){
    return (this[_is_done_symbol.is_done_symbol]==1);
  }
  
  updateActionState(state){
    this[_is_done_symbol.is_done_symbol] = state;
  }

  do_action(){
      ;
    }
}