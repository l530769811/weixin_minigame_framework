
const _action_mgr_symbol = {
  action_mgr_symbol: Symbol('action_mgr_symbol')
};

export default class action_source {
  constructor() {
    this[_action_mgr_symbol.action_mgr_symbol] = null;
  }

  bindActionManager(mgr){
    this[_action_mgr_symbol.action_mgr_symbol] = mgr;
  }

  get_action_manager(){
    return this[_action_mgr_symbol.action_mgr_symbol];
  }
}