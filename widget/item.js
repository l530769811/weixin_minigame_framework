import widget from './widget.js'
import item_data from './item_data.js'
import {
  draw_dotted_rect,
  draw_rect
} from '../draw/draw.js'
import log from '../log.js'

var TtemTextWrapped = {
  ITW_Top: 0,
  ITW_Right: 1,
  ITW_Bottom: 2,
  ITW_Left: 3,
  ITW_Center: 4
}

var ItemTextAlign = {
  ITA_Hor: 0,
  ITA_Ver: 1
}
export {
  TtemTextWrapped,
  ItemTextAlign
};

export default class item extends widget {
  constructor(name, parentLayer, site, widget_id) {
    super(name, parentLayer, site, widget_id);
  }


  bind_data(data) {
    let _data_ = this.get_data();
    if (!_data_ == false && (_data_ instanceof item_data)) {
      _data_.bind_data(data);
    }
  }

  abtain_data() {
    let _data_ = this.get_data();
    if (!_data_ == false && (_data_ instanceof item_data)) {
      return _data_.abtain_data();
    }
    return null;
  }


  setChecked(check) {
    let _data_ = this.get_data();
    if (_data_ != null) {
      _data_.setChecked(check);
    }

  }
  getChecked() {
    let _data_ = this.get_data();
    if (_data_ != null) {
      return _data_.getChecked();
    }
    return false;
  }

  getTextAlign() {
    let _data_ = this.get_data();
    if (_data_ != null) {
      return _data_.getTextAlign();
    }
  }
  setTextAlign(align) {
    let _data_ = this.get_data();
    if (_data_ != null) {
      _data_.setTextAlign(align);
    }
  }

  getTextWrapped() {
    let _data_ = this.get_data();
    if (_data_ != null) {
      return _data_.getTextWrapped();
    }
  }

  setTextWrapped(wrepped) {
    let _data_ = this.get_data();
    if (_data_ != null) {
      _data_.setTextWrapped(wrepped);
    }
  }

  create_data(name, arg) {
    return new item_data(name, arg);
  }

  draw_background(ctx, us_timestamp) {
    let zone = this.get_render_zone();

    let _image = this.get_image();
    if (_image.image == null) {
      let _data = this.get_data();
      let _background_color = _data.get_background_color();
      draw_rect(ctx,
        zone.x, zone.y,
        zone.x + zone.w, zone.y + zone.h, _background_color, 3, true);
    } else {
      ctx.drawImage(_image.image,
        _image.src_x, _image.src_y, _image.src_w, _image.src_h,
        zone.x, zone.y, zone.w, zone.h);
    }
    let ischecked = this.getChecked();
    let line_width = 5;
    if (ischecked) {
      draw_dotted_rect(ctx,
        zone.x, zone.y,
        zone.x + zone.w, zone.y + zone.h,
        '#1e1e1e', line_width);
    }
  }

  set_onchangechecked_callback(callback) {
    let _data = this.get_data();
    _data.set_onchangechecked_callback(callback);
  }

  draw_text(ctx, us_timestamp, zone) {
    // let zone = this.get_render_zone();
    let text = this.get_text();
    let wrapped = this.getTextWrapped();
    let font_h = zone.h / 4;

    let _data = this.get_data();
    ctx.fillStyle = _data.get_text_color();
    ctx.font = font_h + "px Arial"

    switch (wrapped) {
      case TtemTextWrapped.ITW_Bottom:
        //  log('item.draw_text text.length = ' + escape(text).length);  
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom'
        ctx.fillText(text, zone.x + zone.w / 2,
          zone.y + zone.h);
        break;
      case TtemTextWrapped.ITW_Top:
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top'
        ctx.fillText(text, zone.x + zone.w / 2,
          zone.y);
        break;
      case TtemTextWrapped.ITW_Center:
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle'
        ctx.fillText(text, zone.x + zone.w / 2,
          zone.y + zone.h / 2);
        break;
      case TtemTextWrapped.ITW_Left:
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle'
        ctx.fillText(text, zone.x + 2,
          zone.y + zone.h / 2);
        break;
      case TtemTextWrapped.ITW_Right:
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle'
        ctx.fillText(text, zone.x + zone.w - 2,
          zone.y + zone.h / 2);
        break;
      default:
        break;
    }
  }
}