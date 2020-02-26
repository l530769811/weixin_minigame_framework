import widget_data from './widget_data.js'
const _adapter_symbol = {
  adapter_symbol: Symbol('adapter_symbol')
}

const _count_symbol = {
  count_symbol: Symbol('count_symbol')
}

export default class layer_data extends widget_data {
  constructor(name, arg) {
    super(name,  arg);
    this[_adapter_symbol.adapter_symbol] = null;
    this[_count_symbol.count_symbol] = 0;
  }

  add_widget(name, _widget, x, y, w, h, widget_index) {
    ;
  }


  set_adapter(adapter) {
    this[_adapter_symbol.adapter_symbol] = adapter;    
  }

  get_adapter() {
    return this[_adapter_symbol.adapter_symbol];
  }

  set_count(count) {
    this[_count_symbol.count_symbol] = count;
  }

  get_count() {
    if (!this[_adapter_symbol.adapter_symbol] == false) {
      let _count = this[_adapter_symbol.adapter_symbol].get_count();
      return _count;
    }
    return this[_count_symbol.count_symbol];
  }

  get_current_count() {
    return this[_count_symbol.count_symbol]
  }

  increase_count(){
    this[_count_symbol.count_symbol]++;
  }

  decrease_count(){
    this[_count_symbol.count_symbol]--;
  }

  update_data(update_case) {;
  }
}