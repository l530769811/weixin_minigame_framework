import log from '../log.js'
import duty_unit from '../duty_unit.js'
import widget from './widget.js'
import layer_data from './layer_data.js'

const _duty_sets_symbol = {
  duty_sets_symbol: Symbol('_duty_sets_symbol')
}

const _loading_widget_index_symbol = {
  variate: Symbol('loading_widget_index_symbol')
}

const _load_widget_count_per_fps_symbol = {
  variate: Symbol('load_widget_count_per_fps_symbol')
}

export default class layer extends widget {

  constructor(name, parentDuty, site) {
    super(name, parentDuty, site);
    this[_duty_sets_symbol.duty_sets_symbol] = {};
    this[_loading_widget_index_symbol.variate] = [];
    this[_load_widget_count_per_fps_symbol.variate] = 2;
    this.set_alpha(1.0);
  }

  init_for_adapter(){
;
  }

  get_count() {
    let _data = this.get_data();
    return _data.get_count();
  }

  get_current_count(){
    let _data = this.get_data();
    return _data.get_current_count();;
  }

  push_loading_widget_index(index) {
    let _data = this.get_data();
    let _adapter = _data.get_adapter();
    if (!_adapter == false) {
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
        ret = true;
      } else {
        // log('layer.add_duty() this[_duty_sets_symbol.duty_sets_symbol][name] != null')
      }
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

    for (var i in this[_duty_sets_symbol.duty_sets_symbol]) {
      if (this[_duty_sets_symbol.duty_sets_symbol][i] instanceof widget) {
        ret = this[_duty_sets_symbol.duty_sets_symbol][i].on_touch_input(e)
        if (ret == true) {
          break;
        }
      } else {
        log('layer. on_touch_input() is not a widget');
      }

    }

    let _data = this.get_data();
    if (!_data == false && this.isVisible() == true) {
      ret = _data.on_touch_input(e);
    }

    return ret;
  }

  draw_other(ctx, us_timestamp, _zone) {
    for (var i in this[_duty_sets_symbol.duty_sets_symbol]) {
      if (this[_duty_sets_symbol.duty_sets_symbol][i] instanceof duty_unit) {
        this[_duty_sets_symbol.duty_sets_symbol][i].duty(ctx, us_timestamp);
      }
    }
  }

  duty_load_widget() {
    if (this[_loading_widget_index_symbol.variate].length > 0) {
      for (let i = 0; i < this[_load_widget_count_per_fps_symbol.variate]; i++) {
        let _widget_index_ = this[_loading_widget_index_symbol.variate].shift();
        let _widget_count = this.get_count();
        if ((_widget_index_ || _widget_index_ == 0) && (_widget_count > _widget_index_)) {
          this.load_widget(_widget_index_);
        } else {
          log('layer.duty_load_widget() _widget_count <= _widget_index_  _widget_count = ' + _widget_count + ' _widget_index_ = ' + _widget_index_, 2)
        }
      }
    } else {
     ;// log('layer.duty_load_widget() this[_loading_widget_index_symbol.variate].length  = ' + this[_loading_widget_index_symbol.variate].length, 2)
    }
  }

  duty(arg, us_timestamp) {
    this.duty_load_widget();
    super.duty(arg, us_timestamp);
  }
}