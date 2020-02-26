import list_data from './common/js_list_data.js'
import listenr from './listener/listener.js'
import log from './log.js'
import data from './data.js'

const _name_symbol = {
  name_symbol: Symbol('name_symbol')
};
const _parent_symbol = {
  parent_symbol: Symbol('parent_symbol')
}

const _data_symbol = {
  data_symbol: Symbol('data_symbol')
}

export default class duty_unit extends list_data {
  constructor(name, parentDuty, arg) {
    super()
    this[_data_symbol.data_symbol] = null;
    this[_data_symbol.data_symbol] = this.create_data(name, arg);
    this[_data_symbol.data_symbol].set_host(this);

    this.listeners = [];
    this[_name_symbol.name_symbol] = new String(name);
    this[_parent_symbol.parent_symbol] = null;
    if (parentDuty instanceof duty_unit) {
      if(parentDuty.add_duty(name, this) == true){
        this.set_parent(parentDuty);  
      }        
    } else {; // log('parentDuty no duty_unit')
      
    }    
  }

  get_data() {
    return this[_data_symbol.data_symbol];
  }

  create_data(name, arg) {
    return new data(name, arg);
  }

  add_duty(name, duty) {
    return false;
  }

  get_duty(name){
    return null;
  }

  get_name() {
    return this[_name_symbol.name_symbol];
  }

  get_parent() {
    return this[_parent_symbol.parent_symbol];
  }

  set_parent(parent){        
    this[_parent_symbol.parent_symbol] = parent;   
  }

  add_listener(listener) {
    // log('duty_unit add_listener');
    this.listeners.push(listener);
  }

  notify(type) {
    let i = 0;
    this.listeners.forEach.bind(this);
    let func = function(value, index, array) {
      value.notify(type, this);
    };
    let f = func.bind(this);
    this.listeners.forEach(f);
  }

  duty(arg, us_timestamp) {
    ;
  }

  update(arg) {
   return true;
  }

}