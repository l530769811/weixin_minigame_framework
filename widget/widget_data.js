import data from '../data.js'
import log from '../log.js'
import touch_event from '../touch/touch_event.js'
import {
  MyPlayerInfaceKind
} from '../touch/player_inface_proxy.js'
import {
  WIDGET_TOUCH_EVENT
} from './widget.js'
import js_queue from '../common/js_queue.js'
import AabbBox from '../common/aabb_box.js'
//import animation from './animation/animation'

const _aabb_box_symbol = {
  aabb_box_symbol: Symbol('aabb_box_symbol')
}

const _site_zone_symbol = {
  site_zone_symbol: Symbol('site_zone_symbol')
}

const _touch_messages_symbol = {
  touch_messages_symbol: Symbol('touch_message_symbol')
}

const _text_color_symbol = {
  text_color_symbol: Symbol('text_color_symbol')
}
const _background_color_symbol = {
  background_color_symbol: Symbol('background_color_symbol')
}

const _valid_symbol = {
  valid_symbol: Symbol('valid_symbol')
}

const _widget_alpha_symbol = {
  widget_alpha_symbol: Symbol('widget_alpha_symbol')
}

const _visible_symbol = {
  visible_symbol: Symbol('visible_symbol')
};

const _parent_callback_symbol = {
  parent_callback_symbol: Symbol('parent_callback_symbol')
}

const _render_animation_symbol = {
  render_animation_symbol: Symbol('render_animation_symbol')
}

const _on_messages_callback_symbol = {
  on_messages_callback_symbol: Symbol('on_messages_callback_symbol')
}

const _click_symbol = {
  click_symbol: Symbol('click_symbol')
}


var TouchMessageState = {
  identifier: 0,
  isAvailable: false,
  event: new touch_event()
}



export default class widget_data extends data {
  constructor(name) {
    super(name);
    this[_aabb_box_symbol.aabb_box_symbol] = new AabbBox(0, 0, 0, 0);
    this[_on_messages_callback_symbol.on_messages_callback_symbol] = {};
    this[_render_animation_symbol.render_animation_symbol] = null;//new animation(name + '_of_animation', this);

    this[_touch_messages_symbol.touch_messages_symbol] = [{
        identifier: 0,
        isAvailable: false
      },
      {
        identifier: 1,
        isAvailable: false
      },
      {
        identifier: 2,
        isAvailable: false
      },
      {
        identifier: 3,
        isAvailable: false
      },
      {
        identifier: 4,
        isAvailable: false
      }
    ]
    this[_site_zone_symbol.site_zone_symbol] = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
    this[_text_color_symbol.text_color_symbol] = '#FFFFFF';
    this[_background_color_symbol.background_color_symbol] = '#c8c8c8';
    this[_valid_symbol.valid_symbol] = true;
    this[_widget_alpha_symbol.widget_alpha_symbol] = 1.0;
    this[_visible_symbol.visible_symbol] = true;
    this[_parent_callback_symbol.parent_callback_symbol] = null;
    this[_click_symbol.click_symbol] = {
      id: -1,
      kind: WIDGET_TOUCH_EVENT.WTE_None,
      is_click: false
    }
  }


  create_aabb_box(minx, miny, maxx, maxy) {
    if (this[_aabb_box_symbol.aabb_box_symbol] == false) {
      this[_aabb_box_symbol.aabb_box_symbol] = new AabbBox(minx, miny, maxx, maxy);
    } else {
      this[_aabb_box_symbol.aabb_box_symbol].reset(minx, miny, maxx, maxy);
    }
  }

  get_aabb_box() {
    return this[_aabb_box_symbol.aabb_box_symbol];
  }

  set_messages_callback(name, callback) {
    if (typeof callback === "function") {
      this[_on_messages_callback_symbol.on_messages_callback_symbol][name] = callback;
    } else {
      log('widget_data.set_messages_callback() callback is not a function', 2);
    }

  }
  get_messages_callback(name) {
    return this[_on_messages_callback_symbol.on_messages_callback_symbol][name];
  }
  
  push_render_animation(animation) {
    if( !this[_render_animation_symbol.render_animation_symbol] == false ){
      this[_render_animation_symbol.render_animation_symbol].add_animation(animation);
      log('widget.push_render_animation() add_animation++++++++')
    } else {
      this[_render_animation_symbol.render_animation_symbol] = animation; 
    }    
  }

  get_all_animation() {
    return this[_render_animation_symbol.render_animation_symbol];
  }

  front_render_animation(name) {
    //return this[_render_animation_symbol.render_animation_symbol].front();
  }

  pop_render_animation(name) {

    // if (!this[_render_animation_symbol.render_animation_symbol][name]) {
    //   return null;
    // }
    //return this[_render_animation_symbol.render_animation_symbol].pop();
  }

  render_animation_is_empty(name) {
    return  !this[_render_animation_symbol.render_animation_symbol]==false && this[_render_animation_symbol.render_animation_symbol].empty();
  }

  bind_parent_callback(callback) {
    this[_parent_callback_symbol.parent_callback_symbol] = callback;
  }

  obtain_parent_callback() {
    return this[_parent_callback_symbol.parent_callback_symbol];
  }

  hide() {
    this[_visible_symbol.visible_symbol] = false;

  }

  show() {
    this[_visible_symbol.visible_symbol] = true;
  }

  isVisible() {
    return this[_visible_symbol.visible_symbol];
  }

  set_alpha(alpha) {
    this[_widget_alpha_symbol.widget_alpha_symbol] = alpha;
  }
  get_alpha() {
    return this[_widget_alpha_symbol.widget_alpha_symbol];
  }

  invalid() {
    this[_valid_symbol.valid_symbol] = false;
  }

  valid() {
    this[_valid_symbol.valid_symbol] = true;
  }

  isValid() {
    return this[_valid_symbol.valid_symbol];
  }

  move_widget(x, y, w, h) {
    this.set_widget_zone(x, y, w, h);
    this.create_aabb_box(x, y, x + w, y + h);
  }



  set_widget_zone(x, y, w, h) {
    this[_site_zone_symbol.site_zone_symbol]['x'] = x;
    this[_site_zone_symbol.site_zone_symbol]['y'] = y;
    this[_site_zone_symbol.site_zone_symbol]['w'] = w;
    this[_site_zone_symbol.site_zone_symbol]['h'] = h;
  }

  get_widget_zone() {
    return this[_site_zone_symbol.site_zone_symbol];
  }

  reset_touch_zone(minx, miny, maxx, maxy) {    
    this.create_aabb_box(minx, miny, maxx, maxy);
  }

  get_touch_zone() {
    return this[_touch_zone_symbol._touch_zone_symbol];
  }

  set_text_color(color) {
    this[_text_color_symbol.text_color_symbol] = color;
  }

  get_text_color() {
    return this[_text_color_symbol.text_color_symbol];
  }

  set_background_color(color) {
    this[_background_color_symbol.background_color_symbol] = color;
  }
  get_background_color() {
    return this[_background_color_symbol.background_color_symbol];
  }
  
  update_data(update_case) {;
  }

  on_touch_input(e) {
    let ret = false;
    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;
    let widget_aabb = this.get_aabb_box();
    let _host = this.get_host();
    let _host_zone = _host.get_render_zone();
    let _data_zone = this.get_widget_zone();
    let _widget_id = _host.get_widget_id();
    let _name = this.get_name();
    let kind = e.kind;
    let id = e.changedTouches[0].identifier;
    let is_hit = false;
    is_hit = widget_aabb.is_hit_point(x, y, (_host_zone.x - _data_zone.x), (_host_zone.y - _data_zone.y));
    ret = is_hit;
    if (is_hit == false) {
      this[_click_symbol.click_symbol].id = -1;
      this[_click_symbol.click_symbol].kind = MyPlayerInfaceKind.WTE_None;
      this[_click_symbol.click_symbol].is_click = false;
      //log('widget_data.on_touch_input() is_hit = false name = ' + this.get_name(), 1);
    }

    switch (kind) {
      case MyPlayerInfaceKind.PIK_TouchStart:

        if (this[_touch_messages_symbol.touch_messages_symbol][e.changedTouches[0].identifier].isAvailable == false && is_hit == true) {
          ret = this.on_message(_host, _widget_id, _name,  WIDGET_TOUCH_EVENT.WTE_TouchStart, x, y);
          this[_touch_messages_symbol.touch_messages_symbol][e.changedTouches[0].identifier].isAvailable = is_hit;
          this[_touch_messages_symbol.touch_messages_symbol][e.changedTouches[0].identifier].identifier = e.changedTouches[0].identifier;
        }
        this[_click_symbol.click_symbol].id = id;
        this[_click_symbol.click_symbol].kind = kind;
        this[_click_symbol.click_symbol].is_click = true;
        break;
      case MyPlayerInfaceKind.PIK_TouchEnd:

        if (this[_touch_messages_symbol.touch_messages_symbol][e.changedTouches[0].identifier].isAvailable == true && is_hit == true) {
          if (this[_click_symbol.click_symbol].is_click && this[_click_symbol.click_symbol].id == id && this[_click_symbol.click_symbol].kind == WIDGET_TOUCH_EVENT.WTE_TouchStart) {
            if (!(ret = this.on_message(_host, _widget_id, _name, WIDGET_TOUCH_EVENT.WTE_TouchClick, x, y))) {
              ret = this.on_message(_host, _widget_id, _name, WIDGET_TOUCH_EVENT.WTE_TouchEnd, x, y);
            }
          } else {
            ret = this.on_message(_host, _widget_id, _name, WIDGET_TOUCH_EVENT.WTE_TouchEnd, x, y);
          }

          this[_touch_messages_symbol.touch_messages_symbol][e.changedTouches[0].identifier].isAvailable = false;
          this[_touch_messages_symbol.touch_messages_symbol][e.changedTouches[0].identifier].identifier = e.changedTouches[0].identifier;
        }
        break;
      case MyPlayerInfaceKind.PIK_TouchMove:

        if (this[_touch_messages_symbol.touch_messages_symbol][e.changedTouches[0].identifier].isAvailable == true && is_hit == true) {

         ret =  this.on_message(_host, _widget_id, _name, WIDGET_TOUCH_EVENT.WTE_TouchMoving, x, y);
        } else if (this[_touch_messages_symbol.touch_messages_symbol][e.changedTouches[0].identifier].isAvailable == false && is_hit == true) {

          ret = this.on_message(_host, _widget_id, _name,  WIDGET_TOUCH_EVENT.WTE_TouchMoveIn, x, y);
        } else if (this[_touch_messages_symbol.touch_messages_symbol][e.changedTouches[0].identifier].isAvailable == true && is_hit == false) {

          ret = this.on_message(_host, _widget_id, _name,  WIDGET_TOUCH_EVENT.WTE_TouchMoveOut, x, y);
        } else {;
        }

        this[_touch_messages_symbol.touch_messages_symbol][e.changedTouches[0].identifier].isAvailable = is_hit;
        this[_touch_messages_symbol.touch_messages_symbol][e.changedTouches[0].identifier].identifier = e.changedTouches[0].identifier;
        break;
      default:
        break;
    }

    return ret;
  }

  on_message(widget_object, widget_id, name, kind, x, y) {
    return false;
  }
}