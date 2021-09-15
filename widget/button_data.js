import widget_data from './widget_data.js'
import log from '../log.js'
import touch_event from '../touch/touch_event.js'
import {
  WIDGET_TOUCH_EVENT
} from './widget.js'

const _render_src_zone_symbol = {
  render_src_zone_symbol: Symbol('render_src_zone_symbol')
}

export default class button_data extends widget_data {
  constructor(name, arg) {
    super(name);
    this[_render_src_zone_symbol.render_src_zone_symbol] = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };    
  }

  set_onclik_callback(callback){
    this.set_messages_callback('onclick', callback );
  }

  get_onclik_callback(){
    return this.get_messages_callback('onclick');
  }

  move_widget(x, y, w, h) {
    this[_render_src_zone_symbol.render_src_zone_symbol]['x'] = x;
    this[_render_src_zone_symbol.render_src_zone_symbol]['y'] = y;
    this[_render_src_zone_symbol.render_src_zone_symbol]['w'] = w;
    this[_render_src_zone_symbol.render_src_zone_symbol]['h'] = h;
    super.move_widget(x, y, w, h);
  }

  update_data(update_case) {;
  }

  on_message(widget_object, widget_id, name, kind, touch_x, touch_y) {
    let offset_x = 20;
    let offset_y = 10;
    let call_back_fn = this.get_onclik_callback();
   let ret = false;
    switch(kind){
      case WIDGET_TOUCH_EVENT.WTE_TouchStart:
        //log('button_data.on_message() WIDGET_TOUCH_EVENT.WTE_TouchStart')
      
        this.set_widget_zone(this[_render_src_zone_symbol.render_src_zone_symbol].x + this[_render_src_zone_symbol.render_src_zone_symbol].w / offset_x,
          this[_render_src_zone_symbol.render_src_zone_symbol].y + this[_render_src_zone_symbol.render_src_zone_symbol].h / offset_y,
          this[_render_src_zone_symbol.render_src_zone_symbol].w - 2 * this[_render_src_zone_symbol.render_src_zone_symbol].w / offset_x,
          this[_render_src_zone_symbol.render_src_zone_symbol].h - 2 * this[_render_src_zone_symbol.render_src_zone_symbol].h / offset_y
        );       
      break;

      case WIDGET_TOUCH_EVENT.WTE_TouchEnd:
        log('button_data.on_message() WIDGET_TOUCH_EVENT.WTE_TouchEnd')
        this.set_widget_zone(this[_render_src_zone_symbol.render_src_zone_symbol].x,
          this[_render_src_zone_symbol.render_src_zone_symbol].y,
          this[_render_src_zone_symbol.render_src_zone_symbol].w,
          this[_render_src_zone_symbol.render_src_zone_symbol].h
        );       
        break;
        case WIDGET_TOUCH_EVENT.WTE_TouchClick:
        this.set_widget_zone(this[_render_src_zone_symbol.render_src_zone_symbol].x,
          this[_render_src_zone_symbol.render_src_zone_symbol].y,
          this[_render_src_zone_symbol.render_src_zone_symbol].w,
          this[_render_src_zone_symbol.render_src_zone_symbol].h
        ); 
        if ((!call_back_fn) == false) {
          call_back_fn(widget_object, widget_id, this.get_name(), WIDGET_TOUCH_EVENT.WTE_TouchStart);
        } else {
          log('button_data.on_message() call_back_fn is null or undefined kind = ' + WIDGET_TOUCH_EVENT.WTE_TouchStart);
        }
        ret = true;
        break;
        
      case WIDGET_TOUCH_EVENT.WTE_TouchMoveIn:
        //log('button_data.on_message() WIDGET_TOUCH_EVENT.WTE_TouchMoveIn')
        this.set_widget_zone(this[_render_src_zone_symbol.render_src_zone_symbol].x + this[_render_src_zone_symbol.render_src_zone_symbol].w / offset_x,
          this[_render_src_zone_symbol.render_src_zone_symbol].y + this[_render_src_zone_symbol.render_src_zone_symbol].h / offset_y,
          this[_render_src_zone_symbol.render_src_zone_symbol].w - 2 * this[_render_src_zone_symbol.render_src_zone_symbol].w / offset_x,
          this[_render_src_zone_symbol.render_src_zone_symbol].h - 2 * this[_render_src_zone_symbol.render_src_zone_symbol].h / offset_y
        );
        break;

      case WIDGET_TOUCH_EVENT.WTE_TouchMoveOut:        
        this.set_widget_zone(this[_render_src_zone_symbol.render_src_zone_symbol].x,
          this[_render_src_zone_symbol.render_src_zone_symbol].y,
          this[_render_src_zone_symbol.render_src_zone_symbol].w,
          this[_render_src_zone_symbol.render_src_zone_symbol].h
        );
        break;
        default: 
       // log('button+data kind+++ = +++++ MyPlayerInfaceKind.PIK_TouchMoveOut = ' + WIDGET_TOUCH_EVENT.WTE_TouckMoveOut)
        break;
    }
    return ret;
  }
}