import duty_unit from '../duty_unit.js'
import widget_data from './widget_data.js'
import log from '../log.js'
import {
  Listen_Type
} from '../scene_manager.js'
import {
  draw_rect
} from '../draw/draw.js'
import scene_manager from '../scene_manager.js'

const _widget_type_symbol = {
  widget_type_symbol: Symbol('widget_type_symbol')
};

const _valid_symbol = {
  valid_symbol: Symbol('valid_symbol')
}

const _widget_alpha_symbol = {
  widget_alpha_symbol: Symbol('widget_alpha_symbol')
}


const _background_canvas_symbol = {
  background_canvas_symbol: Symbol('background_canvas_symbol')
}

const _canvas_context_symbol = {
  canvas_context_symbol: Symbol('canvas_context_symbol')
}

const _image_symbol = {
  image_symbol: Symbol('image_symbol')
}

const _text_symbol = {
  text_symbol: Symbol('text_symbol')
}

const _reference_render_zone_symbol = {
  reference_render_zone_symbol: Symbol('reference_render_zone_symbol')
}

const _canvas_render_zone_symbol = {
  canvas_render_zone_symbol: Symbol('canvas_render_zone_symbol')
}
const _out_canvas_symbol = {
  variate: Symbol('out_canvas')
}

const widget_id_symbol = {
  variate: Symbol('widget_id_symbol')
}

var WIDGET_TOUCH_EVENT = {
  WTE_None: -1,
  WTE_TouchStart: 0,
  WTE_TouchEnd: 1,
  WTE_TouchMoveIn: 2,
  WTE_TouchMoveOut: 3,
  WTE_TouchMoving: 4,
  WTE_TouchClick: 5
};

export {
  WIDGET_TOUCH_EVENT
}

var global_widget_id = 0;

export default class widget extends duty_unit {
  constructor(name, parentLayer, site, widget_id = 0) {
    super(name, parentLayer, site)

    log('widget.constructor() global_widget_id = ' + global_widget_id, 1);
    this[widget_id_symbol.variate] = 0;
    if (widget_id <= 0) {
      global_widget_id++;
    } else {
      global_widget_id = widget_id;
    }
    this[widget_id_symbol.variate] = global_widget_id;


    this[_background_canvas_symbol.background_canvas_symbol] = wx.createCanvas();
    this[_canvas_context_symbol.canvas_context_symbol] = this[_background_canvas_symbol.background_canvas_symbol].getContext('2d');
    this[_image_symbol.image_symbol] = {
      image: null,
      src_x: 0,
      src_y: 0,
      src_w: 0,
      src_h: 0
    };
    this[_text_symbol.text_symbol] = '';

    if (!site) {
      ;
    } else {
      log('widget.constructor name = ' + this.get_name() + ' site = ' + site, 1);
      this.set_widget_zone(site.x, site.y, site.w, site.h);
    }

    this[_reference_render_zone_symbol.reference_render_zone_symbol] = null;
    this[_canvas_render_zone_symbol.canvas_render_zone_symbol] = null;
    this[_out_canvas_symbol.variate] = false;
    if ((!parentLayer == false) && (parentLayer instanceof widget)) {
      this[_canvas_render_zone_symbol.canvas_render_zone_symbol] = parentLayer.get_render_zone();
    } else {
      log('widget.constructor() parent is no a widget', 2);
    }
  }

  get_context(){
    return this[_canvas_context_symbol.canvas_context_symbol];
  }

  get_widget_id() {
    return this[widget_id_symbol.variate];
  }

  _is_out_canvas() {
    let ret_is_out = false;
    let _render_zone = this.get_render_zone();
    let _canvas_render_zone = this[_canvas_render_zone_symbol.canvas_render_zone_symbol];
    if (!_canvas_render_zone) {
      ret_is_out = false;
    } else {
      let min_x = _render_zone.x;
      let max_x = _render_zone.x + _render_zone.w;
      let min_y = _render_zone.y;
      let max_y = _render_zone.y + _render_zone.h;

      let canvas_min_x = _canvas_render_zone.x;
      let canvas_max_x = _canvas_render_zone.x + _canvas_render_zone.w;
      let canvas_min_y = _canvas_render_zone.y;
      let canvas_max_y = _canvas_render_zone.y + _canvas_render_zone.h;

      if (!!(((min_x >= canvas_min_x && min_x <= canvas_max_x) || (canvas_min_x >= min_x && canvas_min_x <= max_x)) &&
          ((min_y >= canvas_min_y && min_y <= canvas_max_y) || (canvas_min_y >= min_y && canvas_min_y <= max_y)))) {
        ret_is_out = false;
      } else {
        ret_is_out = true;
      }
    }

    return ret_is_out;
  }

  set_reference_render_zone(zone) {
    this[_reference_render_zone_symbol.reference_render_zone_symbol] = zone;
  }

  get_reference_render_zone() {
    return this[_reference_render_zone_symbol.reference_render_zone_symbol];
  }

  set_alpha(alpha) {
    let _data = this.get_data();
    if (!_data) {
      this[_widget_alpha_symbol.widget_alpha_symbol] = alpha;
    } else {
      _data.set_alpha(alpha);
    }
  }

  invalid() {
    this[_canvas_context_symbol.canvas_context_symbol].globalAlpha = 0.4;
    let _data = this.get_data();
    _data.invalid();
  }

  valid() {
    this[_canvas_context_symbol.canvas_context_symbol].globalAlpha = this[_widget_alpha_symbol.widget_alpha_symbol]
    let _data = this.get_data();
    _data.valid();

  }

  isValid() {
    let _data = this.get_data();

    return _data.isValid();
  }

  diplayNotify(type){
    let  objs = []
    let parent = this.get_parent();
    objs[0] = this;
    objs[1] = parent;
    let i = 0;
    this.listeners.forEach.bind(this);
    let func = function(value, index, array) {
      value.notify(type, objs);
    };
    let f = func.bind(this);
    this.listeners.forEach(f);
  }

  hide() {
    let _data = this.get_data();
    _data.hide();
    
    log(this.get_name() + ' widget hide', 0);
    this.diplayNotify(Listen_Type.LTP_display_hide);
  }

  show() {
    let _data = this.get_data();
    _data.show();

    log(this.get_name() + ' widget show', 0);
    this.diplayNotify(Listen_Type.LTP_display_show);
  }

  isVisible() {
    let _data = this.get_data();
    return _data.isVisible();
  }

  create_data(name, arg) {
    return new widget_data(name, arg);
  }

  on_move_widget(x, y, w, h) {
    ;
  }

  move_widget(x, y, w, h) {
    this.set_widget_zone(x, y, w, h);
    this.on_move_widget(x, y, w, h);
  }

  set_image(image, x = 0, y = 0, w = image.width, h = image.height) {
    this[_image_symbol.image_symbol].image = image;
    this[_image_symbol.image_symbol].src_x = x;
    this[_image_symbol.image_symbol].src_y = y;
    this[_image_symbol.image_symbol].src_w = w;
    this[_image_symbol.image_symbol].src_h = h;
  }
  get_image() {
    return this[_image_symbol.image_symbol];
  }

  set_text(text) {
    this[_text_symbol.text_symbol] = text;
  }

  get_text() {
    return this[_text_symbol.text_symbol];
  }

  get_widget_zone() {
    let _data_ = this.get_data();
    return _data_.get_widget_zone();
  }

  get_render_zone() {
    let ret = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
    let _data_ = this.get_data();
    let _zone = _data_.get_widget_zone();

    ret.x = _zone.x;
    ret.y = _zone.y;
    ret.w = _zone.w;
    ret.h = _zone.h;

    let _parent_zone = null;
    if (!this[_reference_render_zone_symbol.reference_render_zone_symbol] == false) {
      _parent_zone = this[_reference_render_zone_symbol.reference_render_zone_symbol].get_render_zone();;
    } else {
      let _parent = this.get_parent();
      if (!_parent == false && (_parent instanceof widget)) {
        _parent_zone = _parent.get_render_zone();
      } else {
        ; // log('widget.get_render_zone() _parent null or not is widget_+_+_+_+_+_ name ='+ this.get_name() + ' _parent = ' + _parent, 2);
      }
    }

    if (!_parent_zone == false) {
      ret.x = ret.x + _parent_zone.x;
      ret.y = ret.y + _parent_zone.y;
    }

    return ret;
  }

  set_widget_zone(x, y, w, h) {
    let _data_ = this.get_data();
    _data_.move_widget(x, y, w, h);
  }

  reset_touch_zone(minx, miny, maxx, maxy) {
    let _data_ = this.get_data();
    if (_data_ != null) {
      _data_.reset_touch_zone(minx, miny, maxx, maxy);
    }
  }

  set_text_color(color) {
    let _data_ = this.get_data();
    if (_data_ != null) {
      _data_.set_text_color(color);
    }
  }

  set_background_color(color) {
    let _data_ = this.get_data();
    if (_data_ != null) {
      _data_.set_background_color(color);
    }
  }

  update(data) {
    this[_valid_symbol.valid_symbol] = data.isValid();
    this[_widget_alpha_symbol.widget_alpha_symbol] = data.get_alpha();
  }

  _get_render_context() {
    return this[_canvas_context_symbol.canvas_context_symbol];
  }

  draw_background(ctx, us_timestamp, _zone) {
    let zone = this.get_render_zone();
    let _image = this.get_image();
    if (_image.image == null) {
      let _data = this.get_data();
      let background_color = _data.get_background_color();
      draw_rect(ctx,
        zone.x, zone.y,
        zone.x + zone.w, zone.y + zone.h, background_color, 2, true);
    } else {
      ctx.drawImage(_image.image,
        _image.src_x, _image.src_y, _image.src_w, _image.src_h,
        zone_tmp.x, zone_tmp.y, zone_tmp.w, zone_tmp.h);
    }
  }

  draw_text(ctx, us_timestamp, _zone) {
    ;
  }

  draw_other(ctx, us_timestamp, _zone) {
    ;
  }

  push_render_animation(animation) {
    let _data = this.get_data();
    _data.push_render_animation(animation);
  }


  draw_animation(ctx, us_timestamp, _zone) {
    let _data = this.get_data();
    let animations = _data.get_all_animation();
    if(!animations==false){
      animations.duty(ctx, us_timestamp);
    }   
  }

  clear_canves(_zone) {
    this[_canvas_context_symbol.canvas_context_symbol].clearRect(_zone.x, _zone.y, _zone.w, _zone.h)
  }


  duty(arg, us_timestamp) {
    if (this._is_out_canvas() == true) {
     return;
    }
    let _parent = this.get_parent();
    if(!_parent==false && (_parent instanceof widget) ){
      if(this.isVisible() == false) {
        return;
      }
    }

    if (this.isVisible() == true) {
      let _data = this.get_data();
      if (!_data == false) {
        this.update(_data);
      }
      if (this.isValid()) {
        this[_canvas_context_symbol.canvas_context_symbol].globalAlpha = this[_widget_alpha_symbol.widget_alpha_symbol];
      }
      let _zone = this.get_render_zone();
      this.clear_canves(_zone);
      this.draw_background(this[_canvas_context_symbol.canvas_context_symbol], us_timestamp, _zone);
      let text_zone = {
        x: _zone.x + 3,
        y: _zone.y + 3,
        w: _zone.w - 6,
        h: _zone.h - 6
      }
      this.draw_text(this[_canvas_context_symbol.canvas_context_symbol], us_timestamp, text_zone);
      this.draw_animation(this[_canvas_context_symbol.canvas_context_symbol], us_timestamp, _zone);
      let parent = this.get_parent();
      let ctxs = arg;
     // if(!parent == false){
        //  ctxs = parent.get_context()
     // } 
      this.render(ctxs, us_timestamp, _zone);
    }
  }

  render(ctx, us_timestamp, _zone) {
     this.draw_other(this[_canvas_context_symbol.canvas_context_symbol], us_timestamp, _zone);
    ctx.drawImage(this[_background_canvas_symbol.background_canvas_symbol],
      _zone.x, _zone.y, _zone.w, _zone.h,
      _zone.x, _zone.y, _zone.w, _zone.h);
  }

  get_scene_manager() {
    let _parent = this.get_parent();
    let _ret = null
    if (_parent instanceof scene_manager) {
      _ret = _parent;
    } else {
      if (!_parent == false) {
        _parent = _parent.get_parent();
      }
    }
    return _ret;
  }

  on_touch_input(e, old_e) {
    let ret = false;
    if (this.isValid() == false) {
      return ret;
    }
    if (this.isVisible() == false) {
      return ret;
    }

    let _data = this.get_data();
    if ((!_data) == false) {
      ret = _data.on_touch_input(e, old_e);
    } else {
      log('widget.on_touch_input() data is null or undefined');
    }
    return ret;
  }
}