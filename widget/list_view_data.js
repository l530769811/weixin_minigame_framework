import layer_data from './layer_data.js'
import log from '../log.js'
import {
  WIDGET_TOUCH_EVENT
} from './widget.js'
import {
  LIST_ITEM_ALIGN
} from './list_view.js'
import {
  LIST_ITEM_SELECTEDE
} from './list_view.js'


const _item_state_symbol = {
  item_state_symbol: Symbol('item_state_symbol')
};

const _item_size_symbol = {
  item_size_symbol: Symbol('item_size_symbol')
}

const _item_align_symbol = {
  item_align_symbol: Symbol('item_align_symbol')
}

const _item_selected_symbol = {
  item_selected_symbol: Symbol('item_selected_symbol')
}

const _list_render_row_col_symbol = {
  variate: Symbol('_list_render_row_col_symbol')
}

export default class list_view_data extends layer_data {
  constructor(name, arg) {
    super(name, arg);
    this[_item_state_symbol.item_state_symbol] = {};
    this[_item_size_symbol.item_size_symbol] = {
      w: 0,
      h: 0
    };
    this[_item_align_symbol.item_align_symbol] = LIST_ITEM_ALIGN.LIA_Ver;
    this[_item_selected_symbol.item_selected_symbol] = LIST_ITEM_SELECTEDE.LIS_Single;
    this[_list_render_row_col_symbol.variate] = {
      min_row: 0,
      max_row: 0,
      min_col: 0,
      max_col: 0
    }
  }

  set_render_row_col(_min_row,
    _max_row,
    _min_col,
    _max_col) {
    this[_list_render_row_col_symbol.variate].min_row = _min_row;
    this[_list_render_row_col_symbol.variate].max_row = _max_row;
    this[_list_render_row_col_symbol.variate].min_col = _min_col;
    this[_list_render_row_col_symbol.variate].max_col = _max_col;
  }

  get_render_row_col() {
    return this[_list_render_row_col_symbol.variate];
  }

  set_item_selection(selection) {
    this[_item_selected_symbol.item_selected_symbol] = selection;
  }

  get_item_selection() {
    return this[_item_selected_symbol.item_selected_symbol];
  }

  get_item_selection() {
    return this[_item_selected_symbol.item_selected_symbol];
  }

  get_item_count() {
    return this.get_count();
  }
  _set_item_count(count) {
    this.set_count(count);
  }

  set_item_size(w, h) {
    this[_item_size_symbol.item_size_symbol].w = w;
    this[_item_size_symbol.item_size_symbol].h = h;
  }

  get_item_size() {
    return this[_item_size_symbol.item_size_symbol];
  }

  set_item_align(align) {
    this[_item_align_symbol.item_align_symbol] = align;
  }

  get_item_align() {
    return this[_item_align_symbol.item_align_symbol];
  }

  set_onmove_callback(callback) {
    this.set_messages_callback('on_move', callback);
  }

  get_onmove_callback() {
    return this.get_messages_callback('on_move');
  }

  on_message(id, kind, x, y) {
    let call_back_fn = this.get_onmove_callback();
    switch (kind) {
      case WIDGET_TOUCH_EVENT.WTE_TouchStart:

        if ((!call_back_fn) == false) {
          call_back_fn(this.get_name(), WIDGET_TOUCH_EVENT.WTE_TouchStart, x, y);
        } else {
          log('list_view_data.on_message() call_back_fn == false');
        }
        break;
      case WIDGET_TOUCH_EVENT.WTE_TouchEnd:
        break;
      case WIDGET_TOUCH_EVENT.WTE_TouchMoving:
        if ((!call_back_fn) == false) {
          call_back_fn(this.get_name(), WIDGET_TOUCH_EVENT.WTE_TouchMoving, x, y);
        } else {
          log('list_view_data.on_message() call_back_fn == false');
        }
        break;
      default:
        break;
    }
  }

}