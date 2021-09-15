import layer_data from '../layer_data.js'
import empty_widget from '../empty_widget.js'
import {
  WIDGET_TOUCH_EVENT
} from '../widget.js'
import log from '../../log.js'


const _current_pager_index_symbol = {
  current_pager_index_symbol: Symbol('_current_pager_symbol')
}

const _pager_zone_info_symbol = {
  pager_zone_info_symbol: Symbol('pager_zone_info_symbol')
}
const _pager_zone_info_reference_symbol = {
  variate: Symbol('_pager_zone_info_reference_symbol')
}

const _pager_count_symbol = {
  variate: Symbol('pager_count_symbol')
}

export default class view_pager_data extends layer_data {
  constructor(name, site) {
    super(name, site);


    this[_current_pager_index_symbol.current_pager_index_symbol] = 0;
    this[_pager_zone_info_reference_symbol.variate] = new empty_widget('pager_zone_info_reference', null, {
      x: site.w * this[_current_pager_index_symbol.current_pager_index_symbol],
      y: 0,
      w: site.w,
      h: site.h
    });    
    let _host = this.get_host();
    this[_pager_zone_info_reference_symbol.variate].set_reference_render_zone(_host);
    let debug_zone = this[_pager_zone_info_reference_symbol.variate].get_widget_zone();
    log('view_pager_data.constructor() pager_index = ' + this[_current_pager_index_symbol.current_pager_index_symbol] + ' debug_zone.x = ' + debug_zone.x + ' debug_zone.y = ' + debug_zone.y, 1);   
    
    let _zone = this.get_widget_zone();
    this[_pager_zone_info_symbol.pager_zone_info_symbol] = [];
    this[_pager_count_symbol.variate] = 0;
  }

  turn_to_pager(pager_index) {
    let pager_count = this.get_count();
    if (pager_index >= pager_count || pager_index < 0) {
      return false;
    }

    this[_current_pager_index_symbol.current_pager_index_symbol] = pager_index;
    return true;
  }

  init_pager_zone(pager_index) {
    let ret = false;
    //let _cur_pager_index = this.get_pager_index();
    let _widget_zone = this.get_widget_zone();
    let _index_diff = pager_index - 0;
    let _pager_count = this.get_pager_count();
    if (pager_index >= 0 && pager_index < (_pager_count)) {
      let _pager_zone = this._get_pager_zone(pager_index);
      if (!_pager_zone==false){    
        let _host = this.get_host();
        this[_pager_zone_info_reference_symbol.variate].set_reference_render_zone(_host);   
        _pager_zone.set_reference_render_zone(this[_pager_zone_info_reference_symbol.variate]);
        _pager_zone.move_widget(0 + _index_diff * _widget_zone.w, 0, _widget_zone.w, _widget_zone.h);
        let debug_zone = _pager_zone.get_render_zone();

        log('view_pager_data.init_pager_zone(' + pager_index + ')' + ' name = ' + _pager_zone.get_name() + ' debug_zone.x = ' + debug_zone.x + ' _pager_zone.y = ' + debug_zone.y, 1);
        ret = true;
      }      
    }

    return ret;

  }

  _get_pager_zone(pager_index) {
    let pager_count = this.get_pager_count();
    if (pager_index >= pager_count) {
      return null;
    }

    if (pager_index < 0) {
      return null;
    }

    if (!this[_pager_zone_info_symbol.pager_zone_info_symbol][pager_index]) {
      this[_pager_zone_info_symbol.pager_zone_info_symbol][pager_index] = {};
    }

    return this[_pager_zone_info_symbol.pager_zone_info_symbol][pager_index]['_zone'] || (this[_pager_zone_info_symbol.pager_zone_info_symbol][pager_index]['_zone'] = new empty_widget('pager_zone_' + pager_index, null, {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    }));
  }

  get_pager_widget_zone(index) {
    return this._get_pager_zone(index);
  }

  move_pager_zone(distance_x, distance_y) {
    let _zone = this.get_widget_zone();
    
    let pager_zone = this[_pager_zone_info_reference_symbol.variate].get_widget_zone();
    //for (var index in this[_pager_zone_info_symbol.pager_zone_info_symbol]) {
      //let _pager_widget_zone = this.get_pager_widget_zone(index);
      //let pager_zone = _pager_widget_zone.get_widget_zone();
      pager_zone.x += distance_x;
      pager_zone.y += distance_y;
    //}
  }



  get_pager_index(kind = 0) {
    let ret = -1;
    let _count = this.get_count();
    switch (kind) {
      case -1:
        // pre pager index
        ret = (this[_current_pager_index_symbol.current_pager_index_symbol] - 1) < 0 ? ret : (this[_current_pager_index_symbol.current_pager_index_symbol] - 1);
        break;
      case 0:
        //cur pager index
        ret = (this[_current_pager_index_symbol.current_pager_index_symbol]);
        break;
      case 1:
        //next pager index
        ret = (this[_current_pager_index_symbol.current_pager_index_symbol] + 1) > (_count - 1) ? ret : (this[_current_pager_index_symbol.current_pager_index_symbol] + 1);
        break;
    }
    return ret;
  }

  get_pager_count() {
    let _adapter = this.get_adapter();
    if (!_adapter == false) {
      let _count = _adapter.get_count();
      return _count;
    }
    return this.get_current_pager_count();
  }

  get_current_pager_count() {
    return this[_pager_count_symbol.variate];
  }

  increase_pager_count() {
    this[_pager_count_symbol.variate]++;
  }

  set_onmove_callback(callback) {
    this.set_messages_callback('on_move', callback);
  }

  get_onmove_callback() {
    return this.get_messages_callback('on_move');
  }

  on_message(widget_object, widget_id, name, kind, x, y) {
    let call_back_fn = this.get_onmove_callback();
    let ret = false;
    switch (kind) {
      case WIDGET_TOUCH_EVENT.WTE_TouchStart:

        if ((!call_back_fn) == false) {
          call_back_fn(widget_object, widget_id, this.get_name(), WIDGET_TOUCH_EVENT.WTE_TouchStart, x, y);
        } else {
          log('pager_view_data.on_message() call_back_fn == false', 2);
        }
        break;
      case WIDGET_TOUCH_EVENT.WTE_TouchEnd:      
        if ((!call_back_fn) == false) {
          call_back_fn(widget_object, widget_id, this.get_name(), WIDGET_TOUCH_EVENT.WTE_TouchEnd, x, y);
        } else {
          log('pager_view_data.on_message() call_back_fn == false', 2);
        }
        break;
      case WIDGET_TOUCH_EVENT.WTE_TouchMoving:
        if ((!call_back_fn) == false) {
          call_back_fn(widget_object, widget_id, this.get_name(), WIDGET_TOUCH_EVENT.WTE_TouchMoving, x, y);
        } else {
          log('pager_view_data.on_message() call_back_fn == false', 2);
        }
        break;
      case WIDGET_TOUCH_EVENT.WTE_TouchMoveIn:
        if ((!call_back_fn) == false) {
          call_back_fn(widget_object, widget_id, this.get_name(), WIDGET_TOUCH_EVENT.WTE_TouchStart, x, y);
        } else {
          log('pager_view_data.on_message() call_back_fn == false', 2);
        }
      break;
      case WIDGET_TOUCH_EVENT.WTE_TouchMoveOut:
        if ((!call_back_fn) == false) {
          call_back_fn(widget_object, widget_id, this.get_name(), WIDGET_TOUCH_EVENT.WTE_TouchEnd, x, y);
        } else {
          log('pager_view_data.on_message() call_back_fn == false', 2);
        }
      break;
      default:
        break;
    }
    return ret;
  }
}