import log from '../log.js'
import duty_unit from '../duty_unit.js'
import widget from './widget.js'
import layer_data from './layer_data.js'
import list from '../common/js_list.js'
import list_data from '../common/js_list_data.js'
import list_node from '../common/js_list_node.js'

const _duty_sets_symbol = {
  duty_sets_symbol: Symbol('_duty_sets_symbol')
}

const _loading_widget_index_symbol = {
  variate: Symbol('loading_widget_index_symbol')
}

const _load_widget_count_per_fps_symbol = {
  variate: Symbol('load_widget_count_per_fps_symbol')
}

const _root_widget_symbol = {
  variate: Symbol('_root_widget_symbol')
}


export default class layer extends widget {

  constructor(name, parentDuty, site, widget_id) {
    super(name, parentDuty, site, widget_id);
    // this[_root_scenes_symbol.root_scenes_symbol] = {};
   // this[_root_widget_symbol.variate] = new list(null);

    // this[_duty_sets_symbol.duty_sets_symbol] = {};
    this[_duty_sets_symbol.duty_sets_symbol] = [];
    this[_loading_widget_index_symbol.variate] = [];
    this[_load_widget_count_per_fps_symbol.variate] = 2;
    this.set_alpha(1.0);
  }

  init_for_adapter() {;
  }

  get_count() {
    let _data = this.get_data();
    return _data.get_count();
  }

  get_current_count() {
    let _data = this.get_data();
    return _data.get_current_count();;
  }

  push_loading_widget_index(index) {
    let _data = this.get_data();
    let _adapter = _data.get_adapter();
    if (!_adapter == false) {
      log('layer.push_loading_widget_index( index = ' + index + ' )' + ' name = ' + this.get_name(), 1);
      this[_loading_widget_index_symbol.variate].push(index);
    }
  }

  create_data(name, arg) {
    return new layer_data(name, arg);
  }

  set_adapter(adapter) {
    let _data = this.get_data();
    _data.set_adapter(adapter);
    this.init_for_adapter();
  }

  load_widget(widget_index) {
    let _data = this.get_data();
    let _adapter = _data.get_adapter();
    if (!_adapter == false) {
      _adapter.upload_widget(this, widget_index);
    }
  }

  add_widget(name, _widget) {
    let ret = false;
    if (_widget instanceof widget) {
         
      if (!this[_duty_sets_symbol.duty_sets_symbol][name]) {
        this[_duty_sets_symbol.duty_sets_symbol][name] = _widget;
        this[_duty_sets_symbol.duty_sets_symbol][name].set_parent(this);

        // if (_widget instanceof list_data) {
        //   let owner = _widget.obtain_owner();
        //   this[_root_widget_symbol.variate].push_front_node(owner);        
        // } else {
        //   log('layer.add_widget() _widget is not list_data', 2);
        // }
        let listener = this.get_listener(0);
        if(!listener==false){        
          _widget.add_listener(listener, 0); 
          _widget.show();         
        }  else {
          log('layer.add_widget() listener is null, parent widget name = ' + this.get_name() + ' widget name = ' + _widget.get_name())
        }    
       
        ret = true;
      }
    } else {
      log('layer.add_widget() _widget is not widget', 2);
    }
    return ret;
  }

  add_duty(name, duty) {
    let ret = false;
    ret = this.add_widget(name, duty);

    if (ret) {
      let _data = this.get_data();
      let _widget_zone = duty.get_widget_zone();
      _data.add_widget(name, _widget_zone.x, _widget_zone.y, _widget_zone.w, _widget_zone.h)
      _data.increase_count();
     
    }
    return ret;
  }

  remove_duty(name) {
    if (!this[_duty_sets_symbol.duty_sets_symbol][name] == false) {
      // let _widget = this[_duty_sets_symbol.duty_sets_symbol][name];
      // if (_widget instanceof list_data) {
      //   let owner = _widget.obtain_owner();
      //   this[_root_widget_symbol.variate].delete_node(owner);
      // }
      delete this[_duty_sets_symbol.duty_sets_symbol][name];
    }
  }

  get_duty(name) {
    if (!name) { //name=null or name=undefined    
      return this[_duty_sets_symbol.duty_sets_symbol];
    }

    return this[_duty_sets_symbol.duty_sets_symbol][name];
  }

  on_touch_input(e) {
    let ret = false;

    if (this.isValid() == false || this.isVisible() == false) {
      return ret;
    }
    // let head_node = this[_root_widget_symbol.variate].get_head_node();
    // let for_each_firsh_node = head_node.get_next_node();
    // this[_root_widget_symbol.variate].for_each_list(function(cur_node) {
    //   let _widget = cur_node.get_data();      
    //   if (_widget instanceof widget) {
    //     ret = _widget.on_touch_input(e);
    //     if (ret == true) {
    //       return ret;
    //     }
    //   } else {
    //     log('layer. on_touch_input()  _widget is not a widget', 2);
    //   }
    // }.bind(this), for_each_firsh_node);
    let _data = this.get_data();
    if (!_data == false && this.isVisible() == true) {
      ret = _data.on_touch_input(e);
    }

    return ret;
  }

  draw_other(ctx, us_timestamp, _zone) {
    // let head_node = this[_root_widget_symbol.variate].get_head_node();
    // let for_each_begin_node = head_node.get_pre_node();
    // this[_root_widget_symbol.variate].for_each_list_reverse(function(cur_node) {
    //   let _widget = cur_node.get_data();
    //   if (_widget instanceof widget) {
    //     _widget.duty(ctx, us_timestamp);
    //   } else {
    //     log('layer. draw_other()  _widget is not a widget', 1);
    //   }
    // }, for_each_begin_node);
  }

  duty_load_widget() {
    if (this[_loading_widget_index_symbol.variate].length > 0) {
      for (let i = 0; i < this[_load_widget_count_per_fps_symbol.variate]; i++) {
        let _widget_index_ = this[_loading_widget_index_symbol.variate].shift();
        let _widget_count = this.get_count();
        if ((_widget_index_ || _widget_index_ == 0) && (_widget_count > _widget_index_)) {
          this.load_widget(_widget_index_);
        } else {
          log('layer.duty_load_widget() _widget_count <= _widget_index_  _widget_count = ' + _widget_count + ' _widget_index_ = ' + _widget_index_ + ' i = ' + i, 2)
        }
      }
    } else {; // log('layer.duty_load_widget() this[_loading_widget_index_symbol.variate].length  = ' + this[_loading_widget_index_symbol.variate].length, 2)
    }
  }

  duty(arg, us_timestamp) {
    this.duty_load_widget();
    super.duty(arg, us_timestamp);
    }
}