import widget_data from './widget_data.js'
import log from '../log.js'
import scroller from  '../common/scroller.js'
import { SCROLL_BAR_DIRECTION } from './scroll_bar.js'
import number_increase_gradient_animation from './animation/number_increate_gradient_animation.js'
import number_increase_gradient_frames from './animation/number_gradient_frames.js'


const _scroller_symbol = {
  scroller_symbol: Symbol('scroller_symbol')
}

const _move_scroll_direction_symbol = {
  move_scroll_direction_symbol: Symbol('move_scroll_direction_symbol')
}

export default class scroll_bar extends widget_data {
  constructor(name, arg) {
    super(name, arg);
    this[_scroller_symbol.scroller_symbol] = new scroller();
    this[_move_scroll_direction_symbol.move_scroll_direction_symbol] = SCROLL_BAR_DIRECTION.SBD_Ver;
  }

  set_onscroll_callback(callback){
    this.set_messages_callback('scroll_bar_scroll', callback);
  }

  get_onscroll_callback(){
    return this.get_messages_callback('scroll_bar_scroll');
  }

  set_scroll_direction(direct){
    this[_move_scroll_direction_symbol.move_scroll_direction_symbol] = direct;
  }

  get_scroll_direction() {
    return this[_move_scroll_direction_symbol.move_scroll_direction_symbol];
  }

  set_total_scroll_range(distance) {
    this[_scroller_symbol.scroller_symbol].set_total_scroll_range(distance);
  }

  set_no_need_scroll_range(distance) {
    this[_scroller_symbol.scroller_symbol].set_no_need_scroll_range(distance);
  }

  set_has_scroll_range(distance) {
    this[_scroller_symbol.scroller_symbol].set_has_scroll_range(distance);
  }

  get_total_scroll_range() {
    return this[_scroller_symbol.scroller_symbol].get_total_scroll_range();
  }

  get_no_need_scroll_range() {
    return this[_scroller_symbol.scroller_symbol].get_no_need_scroll_range();
  }

  get_has_scroll_range() {
    return this[_scroller_symbol.scroller_symbol].get_has_scroll_range();
  }

  _scroll_to(distance){
    let ret = this[_scroller_symbol.scroller_symbol].scroll_to(distance);  
    return ret;
  }

  scroll_to(_scroll_distance) {
    let ret = this[_scroller_symbol.scroller_symbol].can_be_scroll(_scroll_distance);
    if (ret.is_scroll){
      let call_back = this._scroll_to.bind(this);
      let tempete_frames = new number_increase_gradient_frames(call_back, ret.scroll_distance);
      let temp_animation = new number_increase_gradient_animation('scroll_bar_scrolling', ret.scroll_distance, tempete_frames);
      this.push_render_animation(temp_animation);
      
      let fn = this.get_onscroll_callback();
      if (typeof fn == 'function') {
        fn(ret.scroll_distance, -1);
      } else {
        log('scroll_bar_data.scroll_to() get_onscroll_callback() is no function  = ' + fn, 1);
      }
    } else {
      log('scroll_bar_data.scroll_to() can not scroll to _+_+_+ distance = ' + ret.scroll_distance, 1);
    }
    
    return ret;
  }
}