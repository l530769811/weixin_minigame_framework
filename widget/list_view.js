import layer from './layer.js'
import widget from './widget.js'
import item from './item.js'
import scroll_bar from './scroll_bar.js'
import log from '../log.js'
import list_view_data from './list_view_data.js'
import {
  draw_rect
} from '../draw/draw.js'
import {
  WIDGET_TOUCH_EVENT
} from './widget.js'
import js_queue from '../common/js_queue.js'
import scroller from '../common/scroller.js'
import coordinate_increase_gradient_animation from './animation/coordinate_increase_gradient_animation.js'
import coordinate_gradient_frames from './animation/coordinate_gradient_frames.js'
import empty_layer from './empty_layer.js'

var LIST_ITEM_ALIGN = {
  LIA_Hor: 0,
  LIA_Ver: 1
}

export {
  LIST_ITEM_ALIGN
}

var LIST_ITEM_SELECTEDE = {
  LIS_None: 0,
  LIS_Multiple: 1,
  LIS_Single: 2
}
export {
  LIST_ITEM_SELECTEDE
}

const _widget_frame_size_symbol = {
  widget_frame_size_symbol: Symbol('widget_frame_size_symbol')
}

const _item_size_symbol = {
  item_size_symbol: Symbol('item_size_symbol')
}

const _next_item_site_symbol = {
  next_item_site: Symbol('next_item_site')
}
const _item_interval_symbol = {
  item_interval_symbol: Symbol('item_inval_symbol')
}

const _scroller_symbol = {
  scroller_symbol: Symbol('scroller_symbol')
}

const _scroll_bar_symbol = {
  scroll_bar_symbol: Symbol('scroll_bar_symbol')
}

const _item_widget_groub_symbol = {
  item_widget_groub_symbol: Symbol('item_widget_groub_symbol')
}

export default class list_view extends layer {
  constructor(name, parentDuty, site, item_align = LIST_ITEM_ALIGN.LIA_Ver) {
    super(name, parentDuty, site);
    // this[_render_animation_symbol.render_animation_symbol] = new js_queue();
    let _data = this.get_data();
    _data.set_item_align(item_align)
    this[_widget_frame_size_symbol.widget_frame_size_symbol] = 8;

    this[_scroll_bar_symbol.scroll_bar_symbol] = new scroll_bar(
      'list_view_scroll_bar', null, {
        x: site.x + site.w - 8 - 1,
        y: site.y + 3,
        w: 8,
        h: site.h - 6
      }, undefined
    );

    let fn_scroll_bar_message = this.on_scroll_bar_message.bind(this);
    this[_scroll_bar_symbol.scroll_bar_symbol].set_onscroll_callback(fn_scroll_bar_message);

    this[_item_widget_groub_symbol.item_widget_groub_symbol] = {
      x: site.x,
      y: site.y,
      w: site.w,
      h: site.h
    };

    this[_scroller_symbol.scroller_symbol] = new scroller();
    this.reset_scroll_range();

    this[_item_interval_symbol.item_interval_symbol] = {
      hor: 3,
      ver: 3
    };
    this._reset_next_item_site();
  
    let fun = this.on_move.bind(this);

    _data.set_onmove_callback(fun);
    _data.set_item_size(40, 40);
  }

  init_for_adapter(){
    let _max_loading_widget = this.calculate_max_item_count();
    let _count = this.get_count();
    _max_loading_widget = (_count > _max_loading_widget) ? _max_loading_widget : _count;
    for (let i = 0; i < _max_loading_widget; i++) {
      log('list_view.init_for_adapter() push_loading_widget_index = ' + i + ' _max_loading_widget = ' + _max_loading_widget, 1);
      this.push_loading_widget_index(i);
    }
  }

  on_scroll_bar_message(x, kind) {
    this.move_all_item(0, x);
  }

  set_item_checked(index, checked) {
    let ret = false;

    let items = this.get_duty(null);
    let key_arr = Object.keys(items);
    if (index < key_arr.length) {
      let cur_item = this.get_duty(key_arr[index]);
      if (!item == false && (cur_item instanceof item)) {
        item.setChecked(checked);
        ret = true;
      }
    }
    return ret;
  }

  get_item_checked(index) {
    let ret = undefined;

    let items = this.get_duty(null);
    let key_arr = Object.keys(items);
    if (index < key_arr.length) {
      let cur_item = this.get_duty(key_arr[index]);
      if (!item == false && (cur_item instanceof item)) {
        ret = item.getChecked(checked);
      }
    }
    return ret;
  }

  get_selected_item_index() {
    let index_arr = [];
    let items = this.get_duty(null);
    let key_arr = Object.keys(items);
    for (var index in key_arr) {
      let cur_item = this.get_duty(key_arr[index]);
      if (!item == false && (cur_item instanceof item)) {
        if (cur_item.getChecked() == true) {
          index_arr.push(index);
        }
      }
    }

    return index_arr;
  }

  set_item_selection(selection) {
    let _data = this.get_data();
    _data.set_item_selection(selection);
  }

  get_row_count() {
    let ret_count = 0;
    let _data = this.get_data();
    let _zone = this.get_render_zone();
    let item_size = _data.get_item_size();
    let _item_row_count = 0
    ret_count = Math.floor((_zone.h - this[_widget_frame_size_symbol.widget_frame_size_symbol] * 2) / (item_size.h));
    return ret_count;
  }

  get_col_count() {
    let ret_count = 0;
    let _data = this.get_data();
    let _zone = this.get_render_zone();
    let item_align = _data.get_item_align();
    let item_size = _data.get_item_size();
    let _item_colum_count = 0;
    switch (item_align) {
      case LIST_ITEM_ALIGN.LIA_Hor:
        ret_count = Math.floor((_zone.w - this[_widget_frame_size_symbol.widget_frame_size_symbol] * 2) / (item_size.w));

        break;
      case LIST_ITEM_ALIGN.LIA_Ver:
        ret_count = 1;

        break;
      default:
        break;
    }


    return ret_count;
  }

  calculate_max_item_count() {
    let ret_count = 0;

    let _item_colum_count = this.get_col_count();
    let _item_row_count = this.get_row_count();

    ret_count = _item_colum_count * _item_row_count;
    return ret_count;
  }

  calculate_total_scroll_range() {
    let _zone = this.get_render_zone();
    let _item_count = this.get_count();
    let _data = this.get_data();
    let item_align = _data.get_item_align();
    let item_size = _data.get_item_size();
    let item_colum_count = 0;
    let _item_row_count = 0
    switch (item_align) {
      case LIST_ITEM_ALIGN.LIA_Hor:
        item_colum_count = Math.floor((_zone.w - this[_widget_frame_size_symbol.widget_frame_size_symbol] * 2) / (item_size.w));
        _item_row_count = (_item_count / item_colum_count);
        break;
      case LIST_ITEM_ALIGN.LIA_Ver:
        item_colum_count = 1;
        _item_row_count = Math.floor(_item_count / item_colum_count);
        break;
      default:
        break;
    }

    this[_scroller_symbol.scroller_symbol].set_total_scroll_range((_item_row_count * item_size.h + this[_widget_frame_size_symbol.widget_frame_size_symbol] * 2 + (_item_row_count + 1) * this[_item_interval_symbol.item_interval_symbol].ver));
    this[_scroll_bar_symbol.scroll_bar_symbol].set_total_scroll_range((_item_row_count * item_size.h + this[_widget_frame_size_symbol.widget_frame_size_symbol] * 2 + (_item_row_count + 1) * this[_item_interval_symbol.item_interval_symbol].ver));
  }

  reset_scroll_range() {
    let _zone = this.get_render_zone();
    this[_scroller_symbol.scroller_symbol].set_total_scroll_range(_zone.h);
    this[_scroller_symbol.scroller_symbol].set_no_need_scroll_range(_zone.h);
    this[_scroller_symbol.scroller_symbol].set_has_scroll_range(_zone.h);

    this[_scroll_bar_symbol.scroll_bar_symbol].set_total_scroll_range(_zone.h);
    this[_scroll_bar_symbol.scroll_bar_symbol].set_no_need_scroll_range(_zone.h);
    this[_scroll_bar_symbol.scroll_bar_symbol].set_has_scroll_range(_zone.h);
  }


  calculate_item_interval() {
    let _zone = this.get_render_zone();
    // log('list_view.calculate_item_interval() _zone.x = ' + _zone.x + ' _zone.y' + _zone.y + ' _zone.w = ' + _zone.w, 1);
    let _data = this.get_data();
    let item_size = _data.get_item_size();
    let _hor_item_count = ((_zone.w - this[_widget_frame_size_symbol.widget_frame_size_symbol] * 2) / (item_size.w));
    let _ver_item_count = (_zone.h - this[_widget_frame_size_symbol.widget_frame_size_symbol] * 2) / item_size.h;
    let _hor_free_space = ((_zone.w - this[_widget_frame_size_symbol.widget_frame_size_symbol] * 2) % item_size.w);
    let _ver_free_space = ((_zone.h - this[_widget_frame_size_symbol.widget_frame_size_symbol] * 2) % item_size.h);
    let item_align = _data.get_item_align();
    switch (item_align) {
      case LIST_ITEM_ALIGN.LIA_Hor:
        this[_item_interval_symbol.item_interval_symbol].hor = Math.ceil(_hor_free_space / (_hor_item_count + 1));
        this[_item_interval_symbol.item_interval_symbol].hor = this[_item_interval_symbol.item_interval_symbol].hor < 0 ? 0 : this[_item_interval_symbol.item_interval_symbol].hor;

        this[_item_interval_symbol.item_interval_symbol].ver = Math.ceil(_ver_free_space / (_ver_item_count + 1));
        this[_item_interval_symbol.item_interval_symbol].ver = this[_item_interval_symbol.item_interval_symbol].ver < 0 ? 0 : this[_item_interval_symbol.item_interval_symbol].ver;
        break;
      case LIST_ITEM_ALIGN.LIA_Ver:
        this[_item_interval_symbol.item_interval_symbol].hor = Math.ceil(_hor_free_space / (1 + 1));
        this[_item_interval_symbol.item_interval_symbol].hor = this[_item_interval_symbol.item_interval_symbol].hor < 0 ? 0 : this[_item_interval_symbol.item_interval_symbol].hor;

        this[_item_interval_symbol.item_interval_symbol].ver = Math.ceil(_ver_free_space / (_ver_item_count + 1));
        this[_item_interval_symbol.item_interval_symbol].ver = this[_item_interval_symbol.item_interval_symbol].ver < 0 ? 0 : this[_item_interval_symbol.item_interval_symbol].ver;
        break;
      default:
        break;
    }
  }

  calculate_render_row_col(item_index){
    let row_count = this.get_row_count();
    let col_count = this.get_col_count();
;

  }

  get_item_count() {
    let _data = this.get_data()
    return _data.get_count();
  }

  calculate_next_item_site() {
    let _zone = this.get_render_zone();
    let _data = this.get_data();
    let item_align = _data.get_item_align();
    let item_size = _data.get_item_size();
    switch (item_align) {
      case LIST_ITEM_ALIGN.LIA_Hor:
        this[_next_item_site_symbol.next_item_site].x = this[_next_item_site_symbol.next_item_site].x + (item_size.w) + this[_item_interval_symbol.item_interval_symbol].hor;

        let is_out_of_hor = false;
        if ((0 + _zone.w) <= (this[_next_item_site_symbol.next_item_site].x + item_size.w + this[_item_interval_symbol.item_interval_symbol].hor)) {
          is_out_of_hor = true;
        }

        if (is_out_of_hor) {
          this[_next_item_site_symbol.next_item_site].x = 0 + this[_widget_frame_size_symbol.widget_frame_size_symbol];
          this[_next_item_site_symbol.next_item_site].y = this[_next_item_site_symbol.next_item_site].y + item_size.h + this[_item_interval_symbol.item_interval_symbol].ver;
        }
        break;
      case LIST_ITEM_ALIGN.LIA_Ver:
        this[_next_item_site_symbol.next_item_site].y = this[_next_item_site_symbol.next_item_site].y + item_size.h + this[_item_interval_symbol.item_interval_symbol].ver;
        this[_next_item_site_symbol.next_item_site].x = 0 +
          this[_widget_frame_size_symbol.widget_frame_size_symbol];
        break;
      default:
        break;
    }
  }

  create_data(name, arg) {
    return new list_view_data(name, arg);
  }

  create_item(name, text, x, y, w, h, call_back) {
    let _item_widget = null;

    _item_widget = new item(name, this, {
      x: x,
      y: y,
      w: w,
      h: h
    });
    _item_widget.set_text(text);
    _item_widget.set_onchangechecked_callback(call_back);

    this.add_item(_item_widget);

    return _item_widget;
  }

  add_item(item) {

    if (item instanceof widget) {
      let _w = 0;
      let _h = 0;
      let _x = this[_next_item_site_symbol.next_item_site].x;
      let _y = this[_next_item_site_symbol.next_item_site].y;
      this.calculate_item_interval();
      this.calculate_next_item_site();

      let _zone = this.get_render_zone();
      let _data = this.get_data();
      let item_size = _data.get_item_size();
      let item_align = _data.get_item_align();
      switch (item_align) {
        case LIST_ITEM_ALIGN.LIA_Hor:
          _w = item_size.w;
          _h = item_size.h
          break;
        case LIST_ITEM_ALIGN.LIA_Ver:
          _w = _zone.w - this[_widget_frame_size_symbol.widget_frame_size_symbol] * 2;
          _h = item_size.h
          break;
        default:
          break;
      }

      this.add_duty(item.get_name(), item);
      item.move_widget(_x, _y, _w, _h);
      if (!this[_item_widget_groub_symbol.item_widget_groub_symbol] == false) {
        item.set_reference_render_zone(this[_item_widget_groub_symbol.item_widget_groub_symbol]);
      }

      this.calculate_total_scroll_range();
    }
  }

  set_item_align(align) {
    let _data = this.get_data();
    _data.set_item_align(align);
  }

  on_move_widget(x, y, w, h) {
    this[_item_widget_groub_symbol.item_widget_groub_symbol].x = x;
    this[_item_widget_groub_symbol.item_widget_groub_symbol].y = y;
    this[_item_widget_groub_symbol.item_widget_groub_symbol].w = w;
    this[_item_widget_groub_symbol.item_widget_groub_symbol].h = h;
    this.reset_scroll_range();
    this.remove_all_item_site();
  }

  remove_all_item_site() {
    let items = this.get_duty(null);
    let _w = 0;
    let _h = 0;
    let _zone = this.get_render_zone();
    this._reset_next_item_site();
    this.calculate_item_interval();
    this.calculate_total_scroll_range();

    let _data = this.get_data();
    let item_size = _data.get_item_size();
    let item_align = _data.get_item_align();
    for (var i in items) {
      if (items[i] instanceof item) {

        let _x = this[_next_item_site_symbol.next_item_site].x;
        let _y = this[_next_item_site_symbol.next_item_site].y;
        this.calculate_next_item_site();
        switch (item_align) {
          case LIST_ITEM_ALIGN.LIA_Hor:
            _w = item_size.w;
            _h = item_size.h
            break;
          case LIST_ITEM_ALIGN.LIA_Ver:
            _w = _zone.w - this[_widget_frame_size_symbol.widget_frame_size_symbol] * 2;
            _h = item_size.h
            break;
          default:
            break;
        }

        let _render_zone = {
          x: _x,
          y: _y,
          w: _w,
          h: _h
        };

        items[i].move_widget(_render_zone.x, _render_zone.y, _render_zone.w, _render_zone.h);
        // let list_view_render_zone = this.get_render_zone();
        // if (((_render_zone.y) >= (list_view_render_zone.y + list_view_render_zone.h)) ||
        //   ((_render_zone.y + _render_zone.h) <= (list_view_render_zone.y))) {
        //   if (items[i].isVisible() == true) {
        //     items[i].hide();
        //   }
        // } else {
        //   if (items[i].isVisible() == false) {
        //     items[i].show();
        //   }
        // }
      }
    }

  }
  _move_all_item(x, y) {

    this[_item_widget_groub_symbol.item_widget_groub_symbol].x = this[_item_widget_groub_symbol.item_widget_groub_symbol].x + x;
    this[_item_widget_groub_symbol.item_widget_groub_symbol].y = this[_item_widget_groub_symbol.item_widget_groub_symbol].y + y;

    // let items = this.get_duty(null);
    // for (var i in items) {
    //   if (items[i] instanceof item) {
    //     let _render_zone = items[i].get_widget_zone();
    //     items[i].move_widget(_render_zone.x + x, _render_zone.y + y, _render_zone.w, _render_zone.h);
    //     // let list_view_render_zone = this.get_render_zone();
    //     // if (((_render_zone.y + y) > (list_view_render_zone.y + list_view_render_zone.h)) ||
    //     //   ((_render_zone.y + y + _render_zone.h) < (list_view_render_zone.y))) {
    //     //   if (items[i].isVisible() == true) {
    //     //     items[i].hide();
    //     //   }
    //     // } else {
    //     //   if (items[i].isVisible() == false) {
    //     //     items[i].show();
    //     //   }
    //     // }
    //   }
    // }
  }

  move_all_item(_x, _y) {

    let scroll_info = this[_scroller_symbol.scroller_symbol].scroll_to(_y);

    if (scroll_info.is_scroll == false) {
      return;
    } else {
      _y = scroll_info.scroll_distance;
    }


    let func = this._move_all_item.bind(this);
    let frames = new coordinate_gradient_frames(func, 0, 0);
    let start_coordinate = {
      x: 0,
      y: 0
    };
    let end_coordinate = {
      x: 0,
      y: _y
    }
    log('list_view.move_all_item(_x, _y) -y = ' + end_coordinate.y, 1);
    let animation = new coordinate_increase_gradient_animation('tmp_animation', start_coordinate, end_coordinate, frames);
    this.push_render_animation('scroll_to_move_item', animation)

    // this[_next_item_site_symbol.next_item_site].x = this[_next_item_site_symbol.next_item_site].x + _x;
    // this[_next_item_site_symbol.next_item_site].y = this[_next_item_site_symbol.next_item_site].y + _y;
  }

  _reset_next_item_site() {
    this.calculate_item_interval();
    let _zone = this.get_render_zone();
    this[_next_item_site_symbol.next_item_site] = {
      x: (0 + this[_widget_frame_size_symbol.widget_frame_size_symbol]),
      y: (0 + this[_widget_frame_size_symbol.widget_frame_size_symbol])
    }

  }

  set_item_size(w, h) {
    let _data = this.get_data();
    _data.set_item_size(w, h);
    this.remove_all_item_site();
  }

  // bind_parent_callback() {
  //   let fn = this.on_item_changechecked.bind(this);
  //   return fn;
  // }

  on_item_changechecked(name, check) {
    let _data = this.get_data();
    let cur_item = null;
    cur_item = this.get_duty(name);
    let items = this.get_duty(null);

    let selection = _data.get_item_selection();
    log(' list_view.on_item_changechecked() by name = ' + name, 1);
    switch (selection) {
      case LIST_ITEM_SELECTEDE.LIS_Multiple:
        break;
      case LIST_ITEM_SELECTEDE.LIS_Single:
        if (check == false) {
          cur_item.setChecked(!check);
        } else {
          for (var _name in items) {
            if (_name != name) {
              let _item = this.get_duty(_name);
              if (!_item == false && (_item instanceof item)) {
                _item.setChecked(false);
              }
            }
          }
        }

        break;
      case LIST_ITEM_SELECTEDE.LIS_None:

        if (!cur_item == false && (cur_item instanceof item)) {
          cur_item.setChecked(false);
        }
        break;
      default:
        break;
    }
  }

  on_move(name, kind, _x, _y) {
    switch (name) {
      case 'this.get_name()':
        break;
      default:
        if (kind == WIDGET_TOUCH_EVENT.WTE_TouchStart) {
          this.last_touch_point = {
            x: _x,
            y: _y
          };
        } else if (kind == WIDGET_TOUCH_EVENT.WTE_TouchMoving) {
          let hor_move = (_x - this.last_touch_point.x) < 0 ? -(_x - this.last_touch_point.x) : (_x - this.last_touch_point.x);
          let ver_move = (_y - this.last_touch_point.y) < 0 ? -(_y - this.last_touch_point.y) : (_y - this.last_touch_point.y);
          let l = 0.0
          if (hor_move != 0) {
            l = ver_move / hor_move;
          } else {
            l = 3.14 / 2;
          }


          if (l > 1.0) {
            let move_distance = Math.ceil((_y - this.last_touch_point.y));
            this[_scroll_bar_symbol.scroll_bar_symbol].scroll_to(move_distance);
            //this.move_all_item(0, move_distance);
          } else {
            //mean touch move left or right
          }
          this.last_touch_point = {
            x: _x,
            y: _y
          };
        }
        break;
    }
  }

  draw_background(ctx, us_timestamp) {
    let zone = this.get_render_zone();
    let _image = this.get_image();
    if (_image.image == null) {
      let _data = this.get_data();
      let background_color = _data.get_background_color();
      draw_rect(ctx,
        zone.x, zone.y,
        zone.x + zone.w, zone.y + zone.h, background_color, 2);
    } else {
      ctx.drawImage(_image.image,
        _image.src_x, _image.src_y, _image.src_w, _image.src_h,
        zone_tmp.x, zone_tmp.y, zone_tmp.w, zone_tmp.h);
    }
  }

  draw_text(ctx, us_timestamp) {;
  }

  draw_other(ctx, us_timestamp, _zone) {
    super.draw_other(ctx, us_timestamp, _zone);
    this[_scroll_bar_symbol.scroll_bar_symbol].duty(ctx, us_timestamp, _zone);
  }
}