import button_data from './button_data.js'
import widget from './widget.js'
import {
  widget_type
} from './widget.js'
import { draw_circular_arc_rect } from '../draw/draw.js'
import log from '../log.js'
export default class button extends widget {
  constructor(name, parentLayer, site, widget_id) {
    super(name, parentLayer, site, widget_id);  
  }

  create_data(name, arg) {
    return new button_data(name, arg);
  }

  set_onclik_callback(callback) {
   let _data = this.get_data();
   _data.set_onclik_callback(callback);
  }

  draw_background(ctx, us_timestamp, _zone){
    let zone = this.get_render_zone();
    let _image = this.get_image();
    let _data = this.get_data();
    if(_image.image == null){     
      let background_color = _data.get_background_color();
      draw_circular_arc_rect(ctx, zone.x, zone.y, zone.x + zone.w, zone.y + zone.h, zone.h / 2, background_color, background_color, 0, true);
    } else {
      ctx.drawImage(_image.image, 
      _image.src_x, _image.src_y, _image.src_w, _image.src_h,
       zone.x, zone.y, zone.w, zone.h);
    }
  }

  draw_text(ctx, us_timestamp, _zone) {
    let _data = this.get_data();
    ctx.fillStyle = _data.get_text_color();   
    let render_zone = this.get_render_zone();
    let text = this.get_text();
    let font_h = render_zone.h*2/3;
    ctx.font = font_h + "px Arial"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle'
   // log('button.draw_text ' + (render_zone.y + render_zone.h / 2 + 15/2));
    ctx.fillText(text, render_zone.x + render_zone.w / 2 , render_zone.y + render_zone.h / 2);
  }
}