import button_data from './button_data.js'
import log from '../log.js'
import {
  TtemTextWrapped,
  ItemTextAlign
} from './item.js'
import {
  WIDGET_TOUCH_EVENT
} from './widget.js'

const _is_select_symbol = {
  is_select_symbol: Symbol('is_select_symbol')
};
const _text_align_symbol = {
  text_align_symbol: Symbol('text_align_symbol')
}
const _text_Wrapped_symbol = {
  text_Wrapped_symbol: Symbol('text_Wrapped_symbol')
}


const _set_check_for_callback_symbol = {
  set_check_for_callback_symbol: Symbol('set_check_for_callback_symbol')
}

const _item_bind_data_symbol = {
  item_bind_data_symbol: Symbol('item_bind_data_symbol')
}

export default class item_data extends button_data {
  constructor(name, arg) {
    super(name,  arg);
    this[_is_select_symbol.is_select_symbol] = false;
    this[_text_align_symbol.text_align_symbol] = ItemTextAlign.ITA_Hor;
    this[_text_Wrapped_symbol.text_Wrapped_symbol] = TtemTextWrapped.ITW_Left;
    this[_set_check_for_callback_symbol.set_check_for_callback_symbol] = function(check) {
      let isChanged = !(this[_is_select_symbol.is_select_symbol] == check)
      this[_is_select_symbol.is_select_symbol] = check;
      if (isChanged) {
        let call_back_fn = this.get_onchangechecked_callback();
        if ((!call_back_fn) == false) {
          call_back_fn(this.get_name(), this[_is_select_symbol.is_select_symbol]);
        } else {
          log('item_data.setChecked call_back_fn is null===========');
        }
      }
    }
    this[_item_bind_data_symbol.item_bind_data_symbol] = null;
  }

  bind_data(data) {
    this[_item_bind_data_symbol.item_bind_data_symbol] = data;
  }

  abtain_data() {
    return this[_item_bind_data_symbol.item_bind_data_symbol];
  }

  getTextAlign() {
    return this[_text_align_symbol.text_align_symbol];
  }
  setTextAlign(align) {
    this[_text_align_symbol.text_align_symbol] = align;
  }

  getTextWrapped() {
    return this[_text_Wrapped_symbol.text_Wrapped_symbol];
  }

  setTextWrapped(wrepped) {
    this[_text_Wrapped_symbol.text_Wrapped_symbol] = wrepped
  }

  setChecked(check) {
    this[_is_select_symbol.is_select_symbol] = check;
  }

  getChecked() {
    return this[_is_select_symbol.is_select_symbol];
  }

  set_onchangechecked_callback(callback) {
    this.set_messages_callback('onchangechecked', callback);
  }

  get_onchangechecked_callback() {
    return this.get_messages_callback('onchangechecked');
  }

  on_message(id, kind, x, y) {
    switch (kind) {
      case WIDGET_TOUCH_EVENT.WTE_TouchClick:
        this[_set_check_for_callback_symbol.set_check_for_callback_symbol](!this[_is_select_symbol.is_select_symbol]);
        break;
      default:
        break;
    }
  }
}