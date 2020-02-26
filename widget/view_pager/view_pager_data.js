import layer_data from '../layer_data.js'


const _current_pager_index_symbol = {
  current_pager_index_symbol: Symbol('_current_pager_symbol')
}

const _pager_zone_info_symbol = {
  pager_zone_info_symbol: Symbol('pager_zone_info_symbol')
}

export default class view_pager_data extends layer_data {
  constructor(name, arg) {
    super(name, arg);
   

    this[_current_pager_index_symbol.current_pager_index_symbol] = 0;
    let _zone = this.get_widget_zone();
    this[_pager_zone_info_symbol.pager_zone_info_symbol] = [];
  }

  turn_to_pager(pager_index) {
    let pager_count = this.get_count();
    if (pager_index >= pager_count || pager_index < 0) {
      return;
    }

    this[_current_pager_index_symbol.current_pager_index_symbol] = pager_index;
  }

  get_pager_zone(pager_index) {
    let pager_count = this.get_count();;
    if (pager_index >= pager_count) {
      pager_index = pager_count - 1;
    }

    if (pager_index < 0) {
      pager_index = 0;
    }
    
    if (!this[_pager_zone_info_symbol.pager_zone_info_symbol][pager_index]) {
      this[_pager_zone_info_symbol.pager_zone_info_symbol][pager_index] = {};
    }

    return this[_pager_zone_info_symbol.pager_zone_info_symbol][pager_index]['_zone'] || (this[_pager_zone_info_symbol.pager_zone_info_symbol][pager_index]['_zone'] = { x: 0, y: 0, w: 0, h: 0 });
  }
 
  get_pager_zone(index) {
    let ret = { x: 0, y: 0, w: 0, h: 0 };
    let _zone = this.get_widget_zone();
    let _pager_zone = this.get_pager_zone(index);
    ret.x = _zone.x + _pager_zone.x;
    ret.y = _zone.y + _pager_zone.y;
    ret.w = _pager_zone.w;
    ret.h = _pager_zone.h;
    return ret;
  }

  move_pager_zone(distance_x, distance_y) {
    let _zone = this.get_widget_zone();

    for (var index in this[_pager_zone_info_symbol.pager_zone_info_symbol]) {
      let pager_zone = this.get_pager_zone(index);
      pager_zone.x += distance_x;
      pager_zone.y += distance_y;
    }
  }



  get_pager_index(kind) {
    let ret = -1;
    let _count = this.get_count();
    switch(kind){
      case -1:
        ret = (this[_current_pager_index_symbol.current_pager_index_symbol] - 1) < 0 ? ret : (this[_current_pager_index_symbol.current_pager_index_symbol] - 1);
      break;
      case 0:
        ret = (this[_current_pager_index_symbol.current_pager_index_symbol] );
        break;
      case 1:
        ret = (this[_current_pager_index_symbol.current_pager_index_symbol] + 1) > (_count-1) ? ret : (this[_current_pager_index_symbol.current_pager_index_symbol] + 1);
        break;
    }
    return ret;
  }

  get_pager_count() {
    return this.get_count();
  }

  set_pager_count(count) {
    this.set_count(count);
  }

  add_widget(name, _widget, x, y, w, h, pager_index) {
  
  }
}