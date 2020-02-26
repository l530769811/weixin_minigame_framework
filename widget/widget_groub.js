import widget from './widget.js'
import log  from '../log.js'
import duty_unit from '../duty_unit.js'
import { draw_circular_arc_rect } from '../draw/draw.js'
import { create_button, create_groub } from './create_proxy.js'

const _color_symbol = {
  color_symbol: Symbol('background_color_symbol')
}

const _widget_sets_symbol = {
  widget_sets_symbol: Symbol('widget_sets_symbol')
}

const _callback_name_symbol = {
  callback_name_symbol: Symbol('callback_name_symbol')
}

export default class widget_groub extends widget {
  constructor(name, parentDuty, site,  on_callback){
    super(name, parentDuty, site, on_callback);
    this[_callback_name_symbol.callback_name_symbol] = {};
    this[_widget_sets_symbol.widget_sets_symbol] = {};
    this[_color_symbol.color_symbol] = '#000000';
  }

  add_duty(name, duty) {

    if (this[_widget_sets_symbol.widget_sets_symbol][name] != null) {
      log('layer.add_duty() this[_duty_sets_symbol.duty_sets_symbol][name] != null')
      return false;
    }
    this[_widget_sets_symbol.widget_sets_symbol][name] = duty;
    return true;
  }

  remove_duty(name) {
    this[_widget_sets_symbol.widget_sets_symbol][name] = null;
  }


  get_duty(name) {
    if (!name) { //name=null or name=undefined    
      return this[_widget_sets_symbol.widget_sets_symbol];
    }

    return this[_widget_sets_symbol.widget_sets_symbol][name];
  }

  set_background_color(color) {
    this[_color_symbol.color_symbol] = color;
  }

  widget_groub_call_back(name, kind, status){
    this[_callback_name_symbol.callback_name_symbol][name](name, kind, status);
  } 
  
  on_touch_input(e) {
    let ret = false;
    
    for (var i in this[_widget_sets_symbol.widget_sets_symbol]) {
      if (this[_widget_sets_symbol.widget_sets_symbol][i] instanceof widget) {
        ret = this[_widget_sets_symbol.widget_sets_symbol][i].on_touch_input(e)
        if (ret == true) {
          break;
        }
      } else {
        log('widget_groub.on_touch_input() is not a widget');
      }

    }

    if (ret == true) {
      return ret;
    }

    let _data = this.get_data();
    if (!_data == false && this.isVisible() == true) {
      ret = _data.on_touch_input(e);
    }else{
      log('widget_groub.on_touch_input() data is null or undefined or widget is unvisible');
    }

    return ret;
  }

  duty(arg, us_timestamp) {
    super.duty(arg, us_timestamp);

    for (var i in this[_widget_sets_symbol.widget_sets_symbol]) {
      if (this[_widget_sets_symbol.widget_sets_symbol][i] instanceof duty_unit) {
        //log('widget_groub.duty() name = ' + i);
        this[_widget_sets_symbol.widget_sets_symbol][i].duty(arg,  us_timestamp);
      }
    }
  }

  draw_background(ctx, us_timestamp) {
    let zone = this.get_render_zone();
   // log('widget_groub.draw_background() ' + zone.x + ' ' + zone.y + ' '+ zone.w + ' ' + zone.h);
    let _image = this.get_image();
    if (_image.image == null) {
      draw_circular_arc_rect(ctx, zone.x, zone.y, zone.x + zone.w, zone.y + zone.h, zone.h / 2, this[_color_symbol.color_symbol], this[_color_symbol.color_symbol],2, false);
    } else {
      ctx.drawImage(_image.image,
        _image.src_x, _image.src_y, _image.src_w, _image.src_h,
        zone.x, zone.y, zone.w, zone.h);
    }   
  }

  draw_text(ctx, us_timestamp) {
    ;
  }
}