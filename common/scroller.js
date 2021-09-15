import log from '../log.js'
const _scroll_range_symbol = {
  scroll_range_symbol: Symbol('scroll_range_symbol')
}

export default class scroller {
  constructor(_total_range = 0, _no_need_scroll_range = 0, _has_scroll_range = 0) {
    this[_scroll_range_symbol.scroll_range_symbol] = {
      no_need_scroll_range: _no_need_scroll_range,
      total_range: _total_range,
      has_scroll_range: _has_scroll_range,
    }
  }

  set_total_scroll_range(distance) {
    this[_scroll_range_symbol.scroll_range_symbol].total_range = Math.ceil(distance);
  }

  set_no_need_scroll_range(distance) {
    this[_scroll_range_symbol.scroll_range_symbol].no_need_scroll_range = Math.ceil(distance);
  }

  set_has_scroll_range(distance) {
    this[_scroll_range_symbol.scroll_range_symbol].has_scroll_range = Math.ceil(distance);
  }

  get_total_scroll_range() {
    return this[_scroll_range_symbol.scroll_range_symbol].total_range;
  }

  get_no_need_scroll_range() {
    return this[_scroll_range_symbol.scroll_range_symbol].no_need_scroll_range;
  }

  get_has_scroll_range() {
    return this[_scroll_range_symbol.scroll_range_symbol].has_scroll_range;
  }

  can_be_scroll(_scroll_distance){
    let ret = {
      scroll_distance: Math.ceil(_scroll_distance),
      is_scroll: false
    }

    let scroll_range = 0;
    let has_scroll_range = this[_scroll_range_symbol.scroll_range_symbol].has_scroll_range;
    let no_need_scroll_range = this[_scroll_range_symbol.scroll_range_symbol].no_need_scroll_range;
    let total_range = this[_scroll_range_symbol.scroll_range_symbol].total_range;
    scroll_range = this[_scroll_range_symbol.scroll_range_symbol].has_scroll_range - (ret.scroll_distance);


    if ((scroll_range < no_need_scroll_range) && (has_scroll_range > no_need_scroll_range)) {
      ret.scroll_distance = ret.scroll_distance - (no_need_scroll_range - scroll_range);
      scroll_range = no_need_scroll_range;
    }
    if ((scroll_range > total_range) && (has_scroll_range < total_range)) {
      ret.scroll_distance = ret.scroll_distance - (total_range - scroll_range);
      scroll_range = total_range;
    }

    if ((scroll_range >= no_need_scroll_range) && (scroll_range <= total_range)) {     
      ret.is_scroll = true;
    }

    return ret;
  }
  
 
  scroll_to(_scroll_distance) {
    let ret = {
      scroll_distance: Math.ceil(_scroll_distance),
      is_scroll: false
    }

    let scroll_range = 0;
    let has_scroll_range = this[_scroll_range_symbol.scroll_range_symbol].has_scroll_range;
    let no_need_scroll_range = this[_scroll_range_symbol.scroll_range_symbol].no_need_scroll_range;
    let total_range = this[_scroll_range_symbol.scroll_range_symbol].total_range;
    scroll_range = this[_scroll_range_symbol.scroll_range_symbol].has_scroll_range - (ret.scroll_distance);

   
    if ((scroll_range < no_need_scroll_range) && (has_scroll_range > no_need_scroll_range)){
      ret.scroll_distance = ret.scroll_distance - (no_need_scroll_range-scroll_range);
      scroll_range = no_need_scroll_range;
    }
    if ((scroll_range > total_range) && (has_scroll_range < total_range)){
      ret.scroll_distance = ret.scroll_distance - (total_range-scroll_range);
      scroll_range = total_range;
    }

    if ((scroll_range >= no_need_scroll_range) && (scroll_range <= total_range)) {
      this[_scroll_range_symbol.scroll_range_symbol].has_scroll_range = this[_scroll_range_symbol.scroll_range_symbol].has_scroll_range - (ret.scroll_distance);;
      ret.is_scroll = true;
    }   

    return ret;
  }


}