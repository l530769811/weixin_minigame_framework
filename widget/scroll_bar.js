  import widget from './widget.js'
  import scroll_bar_data from './scroll_bar_data.js'
  import {
    draw_circular_arc_rect
  } from '../draw/draw.js'

  const _move_scroll_bar_zone_symbol = {
    move_scroll_bar_zone_symbol: Symbol('move_scroll_bar_zone_symbol')
  }


  var SCROLL_BAR_DIRECTION = {
    SBD_Hor: 0,
    SBD_Ver: 1
  }

  export {
    SCROLL_BAR_DIRECTION
  }

  export default class scroll_bar extends widget {
    constructor(name, parentLayer, arg, widget_id) {
      super(name, parentLayer, arg, widget_id);
      this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol] = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      };
      this.set_alpha(0.8);
      this.set_background_color('#c8c8c8');
    }

    create_data(name,  arg) {
      return new scroll_bar_data(name,  arg);
    }

    set_onscroll_callback(callback) {
     let _data = this.get_data();
      _data.set_onscroll_callback(callback);
    }

    draw_background(ctx, us_timestamp, _zone) {
      let zone = this.get_render_zone();
      let _image = this.get_image();
      let _data = this.get_data();
      let direction = _data.get_scroll_direction();
      let radius1 = 1;
      let radius2 = 1;
      this._init_move_scroll_bar();
      switch (direction) {
        case SCROLL_BAR_DIRECTION.SBD_Hor:
          radius1 = zone.h / 2;
          radius2 = this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].h / 2;
          break;
        case SCROLL_BAR_DIRECTION.SBD_Ver:
          radius1 = zone.w / 2;
          radius2 = this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].w / 2;
          break;
      }
      // if (_image.image == null) {
      //   let _background_color = _data.get_background_color();
      //   draw_circular_arc_rect(ctx,
      //     zone.x, zone.y,
      //     zone.x + zone.w, zone.y + zone.h, radius1, _background_color, '#808080', 1, true);
      // } else {
      //   ctx.drawImage(_image.image,
      //     _image.src_x, _image.src_y, _image.src_w, _image.src_h,
      //     zone.x, zone.y, zone.w, zone.h);
      // }
     
      draw_circular_arc_rect(ctx, this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].x, this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].y,
        this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].x + this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].w, this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].y + this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].h, radius2, '#646464', '#646464', 1, true);
    }

    draw_text(ctx, us_timestamp, _zone) {;
    }

    on_touch_input(e, old_e) {
      return false;
    }


    _init_move_scroll_bar() {
      let _data = this.get_data();
      let total_range = _data.get_total_scroll_range();
      let has_scroll_rander = _data.get_has_scroll_range();
      let no_need_scroll_range = _data.get_no_need_scroll_range();
      let _zone = this.get_render_zone();
      let direction = _data.get_scroll_direction();
      let move_scroll_bar_length = Math.floor(no_need_scroll_range * no_need_scroll_range / total_range);
      let interval_of = 3;
      switch (direction) {
        case SCROLL_BAR_DIRECTION.SBD_Hor:
          move_scroll_bar_length = Math.floor((_zone.w - Math.floor(_zone.h / interval_of) * 2) * no_need_scroll_range / total_range);
          this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].x = _zone.x + Math.floor(_zone.h / interval_of) + Math.floor((has_scroll_rander * (_zone.w - Math.floor(_zone.h / interval_of) * 2)) / total_range - move_scroll_bar_length);          
          this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].y = _zone.y + Math.floor(_zone.h / interval_of);
          this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].w = move_scroll_bar_length;
          this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].h = _zone.h - Math.floor(_zone.h / interval_of) * 2;
          break;
        case SCROLL_BAR_DIRECTION.SBD_Ver:
          move_scroll_bar_length = Math.floor((_zone.h - Math.floor(_zone.w / interval_of) * 2) * no_need_scroll_range / total_range);
          this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].x = _zone.x + Math.floor(_zone.w / interval_of);
          // this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].y = _zone.y + Math.floor((has_scroll_rander * _zone.h) / no_need_scroll_range) - _zone.h;
          this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].y = _zone.y + Math.floor(_zone.w / interval_of) + Math.floor((has_scroll_rander * (_zone.h - Math.floor(_zone.w / interval_of)*2)) / total_range - move_scroll_bar_length);
          this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].w = _zone.w - Math.floor(_zone.w / interval_of) * 2;
          this[_move_scroll_bar_zone_symbol.move_scroll_bar_zone_symbol].h = move_scroll_bar_length;


          break;
        default:
          break;
      }
    }

    _show_or_hide(){
      let _data = this.get_data();
      let total_scroll_range = _data.get_total_scroll_range();
      let no_need_scroll_range = _data.get_no_need_scroll_range();
      if (total_scroll_range <= no_need_scroll_range){
        if(this.isVisible()){
          this.hide();
        }
      } else {
        if (this.isVisible()== false) {
          this.show();
        }
      }
    }

    set_total_scroll_range(distance) {
      let _data = this.get_data();
      _data.set_total_scroll_range(distance);
      this._init_move_scroll_bar();
      this._show_or_hide();
    }

    set_no_need_scroll_range(distance) {
      let _data = this.get_data();
      _data.set_no_need_scroll_range(distance);
      this._init_move_scroll_bar();
      this._show_or_hide();
    }

    set_has_scroll_range(distance) {
      let _data = this.get_data();
      _data.set_has_scroll_range(distance);
      this._init_move_scroll_bar();
    }

    get_total_scroll_range() {
      let _data = this.get_data();
      return _data.get_total_scroll_range();
    }

    get_no_need_scroll_range() {
      let _data = this.get_data();
      return _data.get_no_need_scroll_range();
    }

    get_has_scroll_range() {
      let _data = this.get_data();
      return _data.get_has_scroll_range();
    }

    scroll_to(_scroll_distance) {
      let _data = this.get_data();
      let ret = _data.scroll_to(_scroll_distance);
      
      return ret;
    }
  }