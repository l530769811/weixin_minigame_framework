import layer from '../layer.js'
import widget from '../widget.js'
import log from '../../log.js'
import view_pager_data from './view_pager_data.js'
import coordinate_increase_gradient_animation from '../animation/coordinate_increase_gradient_animation.js'
import coordinate_gradient_frames from '../animation/coordinate_gradient_frames.js'
import elastic from '../../common/elastic.js'
import {
  WIDGET_TOUCH_EVENT
} from '../widget.js'

const _pager_widget_symbol = {
  pager_widget_symbol: Symbol('pager_widget_symbol')
}
const _elastic_symbol = {
  variate: Symbol('_elastic_symbol')
}

export default class view_pager extends layer {
  constructor(name, parent_layer, site) {
    super(name, parent_layer, site)
    let _limit = 20;
    if (site){
      _limit = Math.ceil(site.w/4);
    }
    this[_elastic_symbol.variate] = new elastic(_limit);
    let _data = this.get_data();
    let fun = this.on_move.bind(this);
    _data.set_onmove_callback(fun);
    this.last_touch_point = {
      x: undefined,
      y: undefined
    };
  }

  create_data(name, arg) {
    return new view_pager_data(name, arg);
  }

  set_count(count) {
    let _data = this.get_data();
    _data.set_count(count);
  }

  add_widget(name, _widget, pager_index = -1) {
    let ret = false;

    if (pager_index >= 0 && (_widget instanceof widget)) {
      
      let _data = this.get_data();
      let _pager_zone = _data.get_pager_widget_zone(pager_index);
      if(_pager_zone){
        ret = super.add_widget(name, _widget);
        _widget.set_reference_render_zone(_pager_zone);
        let debug_zone = _widget.get_render_zone();
        log('view_pager.add_widger() pager_index = ' + pager_index + ' debug_zone.x = ' + debug_zone.x + ' debug_zone.y = ' + debug_zone.y, 1);        
      }
     
    }

    return ret;
  }

  create_pager(_pager_index) {
    let pager_index = -1;
    let _data = this.get_data();
    //let _pager_count = _data.get_current_pager_count();
    let init_result = _data.init_pager_zone(_pager_index);
    if (init_result) {
      _data.increase_pager_count();
      pager_index = _pager_index;
      log('pager_view.create_pager() pager_index = ' + pager_index, 1)
    }

    return pager_index;
  }

  init_for_adapter() {
    let _data = this.get_data();
    let _cur_pager_index = _data.get_pager_index();
    let _pager_count = _data.get_pager_count();
    log('view_pager.init_for_adapter() _cur_pager_index = ' + _cur_pager_index + ' _pager_count = ' + _pager_count, 1);
    if (_cur_pager_index >= 0 && _pager_count > 0) {
      if (_cur_pager_index >= 0 && _cur_pager_index < _pager_count) {
        this.push_loading_widget_index(_cur_pager_index);
      }

      if ((_cur_pager_index - 1) >= 0 && (_cur_pager_index - 1) < _pager_count) {
        this.push_loading_widget_index(_cur_pager_index - 1);
      }

      if ((_cur_pager_index + 1) >= 0 && (_cur_pager_index + 1) < _pager_count) {
        this.push_loading_widget_index(_cur_pager_index + 1);
      }
    }


  }

  turn_to_pager(pager_index) {
    let ret = false;
    let _data = this.get_data();
    ret = _data.turn_to_pager(pager_index);

    let _pager_count = _data.get_pager_count();
    let _cur_pager_index = pager_index;
    if (_cur_pager_index >= 0 && _pager_count > 0) {
      if (_cur_pager_index >= 0 && _cur_pager_index < _pager_count) {
        this.push_loading_widget_index(_cur_pager_index);
      }

      if ((_cur_pager_index - 1) >= 0 && (_cur_pager_index - 1) < _pager_count) {
        this.push_loading_widget_index(_cur_pager_index - 1);
      }

      if ((_cur_pager_index + 1) >= 0 && (_cur_pager_index + 1) < _pager_count) {
        this.push_loading_widget_index(_cur_pager_index + 1);
      }
    }

    return ret;
  }

  _slide_move(_x, _y) {
    let _data = this.get_data();
    _data.move_pager_zone(_x, _y);
  }

  slide_move(_x, _y) {


    let _data = this.get_data();
    let _cur_pager = _data.get_pager_index();
    let _pager_count = _data.get_pager_count();
    let _zone = _data.get_widget_zone();

    //when elastic recover, the _shape is recover count; nor is increase count;
    let _shape = this[_elastic_symbol.variate].get_shape_increase();
    log('view_pager.slide_move() _x = ' + _x + ' _y = ' + _y + ' _shape = ' + _shape + '_+_+_+before++_+_+_+', 1);
    if (this[_elastic_symbol.variate].is_recover()) {
      if (this[_elastic_symbol.variate].is_break()) {

        let turn_pager_index = 0;
        let _tmp_shape = _shape;
        if (_shape < 0) {
          turn_pager_index = _cur_pager - 1;
          _tmp_shape = _zone.w + _shape;
        } else {
          turn_pager_index = _cur_pager + 1;
          _tmp_shape = -_zone.w + _shape;
        }

        if (this.turn_to_pager(turn_pager_index)) {
          _shape = _tmp_shape;
        }

        log('view_pager.slide_move() _x = ' + _x + ' _y = ' + _y + ' _shape = ' + _shape + ' can turn_to_pager (' + turn_pager_index + ' )', 1);

      }
    }

    log('view_pager.slide_move() _x = ' + _x + ' _y = ' + _y + ' _shape = ' + _shape + ' this[_elastic_symbol.variate].is_break() = ' + this[_elastic_symbol.variate].is_break(), 1);

    let func = this._slide_move.bind(this);
    let frames = new coordinate_gradient_frames(func, 0, 0);
    let start_coordinate = {
      x: 0,
      y: 0
    };
    let end_coordinate = {
      x: _shape,
      y: 0
    }
    log('list_view.move_all_item(_x, _y) -y = ' + end_coordinate.y, 1);
    let animation = new coordinate_increase_gradient_animation('tmp_animation', start_coordinate, end_coordinate, frames);
    this.push_render_animation(animation)



  }

  on_move(widget_object, widget_id, name, kind, _x, _y) {

    switch (name) {
      case this.get_name():
        if (kind == WIDGET_TOUCH_EVENT.WTE_TouchStart) {
          this.last_touch_point = {
            x: _x,
            y: _y
          };

          this[_elastic_symbol.variate].start_force(this.last_touch_point.x);
          log('view_pager.on_move() kind = ' + 'WIDGET_TOUCH_EVENT.WTE_TouchStart', 1);
        } else if (kind == WIDGET_TOUCH_EVENT.WTE_TouchMoving) {
          if (this.last_touch_point.x != undefined && this.last_touch_point.x != undefined) {
            let hor_move = (_x - this.last_touch_point.x) < 0 ? -(_x - this.last_touch_point.x) : (_x - this.last_touch_point.x);
            let ver_move = (_y - this.last_touch_point.y) < 0 ? -(_y - this.last_touch_point.y) : (_y - this.last_touch_point.y);
            let l = 0.0
            if (hor_move != 0) {
              l = ver_move / hor_move;
            } else {
              l = 3.14 / 2;
            }


            if (l > 1.0) {;

            } else {
              //mean touch move left or right
              let move_distance = Math.ceil((_x - this.last_touch_point.x));
              this[_elastic_symbol.variate].do_force(move_distance);
              this.slide_move(move_distance, 0);
            }
          }
          this.last_touch_point = {
            x: _x,
            y: _y
          };
          log('view_pager.on_move() kind = ' + 'WIDGET_TOUCH_EVENT.WTE_TouchMoving', 1);
        } else if (kind == WIDGET_TOUCH_EVENT.WTE_TouchEnd) {
          this[_elastic_symbol.variate].shop_force(_x);
          this.slide_move(0, 0);
          log('view_pager.on_move() kind = ' + 'WIDGET_TOUCH_EVENT.WTE_TouchEnd', 1);
        }
        break;
      default:
        break;
    }
  }

}