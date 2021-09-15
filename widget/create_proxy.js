import button from './button.js'
import widget_groub from './widget_groub.js'
import item from './item.js'
import list_view from './list_view.js'
import {
  LIST_ITEM_ALIGN
} from './list_view.js'
import pager_view from './view_pager/view_pager.js'

var WIDGET_TYPE = {
  WTP_Button: 0,
  WTP_Groub: 1,
  WTP_Item: 2,
  WTP_ListView: 3,
  WTP_PagerView: 4
};

function create_widget(parent, name, text, x, y, w, h, call_back, widget_type = 0, widget_id = 0) {
  let widget = null;
  switch (widget_type) {
    case WIDGET_TYPE.WTP_Button:
      widget = create_button(name, parent, text, x, y, w, h, call_back, widget_id);
      break;
    case WIDGET_TYPE.WTP_Groub:
      widget = create_groub(name, parent, text, x, y, w, h, call_back, widget_id);
      break;
    case WIDGET_TYPE.WTP_Item:
      widget = create_item(name, parent, text, x, y, w, h, call_back, widget_id);
      break;
    case WIDGET_TYPE.WTP_ListView:
      widget = create_list_view(name, parent, text, x, y, w, h, LIST_ITEM_ALIGN.LIA_Ver, call_back, widget_id);
      break;
    case WIDGET_TYPE.WTP_PagerView:
      widget = create_pager_view(name, parent, text, x, y, w, h, LIST_ITEM_ALIGN.LIA_Ver, call_back, widget_id);
      break;
    default:
      break;
  }
  return widget;
}

function create_button(name, parent_widget, text, x, y, w, h, call_back, widget_id) {
  let widget = null;
  widget = new button(name, parent_widget, {
    x: x,
    y: y,
    w: w,
    h: h
  }, widget_id);
  widget.set_onclik_callback(call_back);
  widget.move_widget(x, y, w, h);
  widget.set_text(text);
  return widget;
}

function create_groub(name, parent_widget, text, x, y, w, h, call_back, widget_id) {
  let widget = null;
  widget = new widget_groub(name, parent_widget, {
    x: x,
    y: y,
    w: w,
    h: h
  }, widget_id);
  widget.move_widget(x, y, w, h);
  widget.set_text(text);
  return widget;
}

function create_item(name, parent_widget, text, x, y, w, h, call_back, widget_id) {
  let widget = null;
  let site = {
    x: x,
    y: y,
    w: w,
    h: h
  }
  widget = new item(name, parent_widget, site, widget_id);
  widget.set_onchangechecked_callback(call_back);
  widget.move_widget(x, y, w, h);
  widget.set_text(text);
  return widget;
}

function create_list_view(name, parent_widget, text, x, y, w, h, align, call_back, widget_id) {
  let widget = null;
  let site = {
    x: x,
    y: y,
    w: w,
    h: h
  }
  widget = new list_view(name, parent_widget, site, align, widget_id);
  widget.set_text(text);
  return widget;
}

function create_pager_view(name, parent_widget, text, x, y, w, h, align, call_back, widget_id) {
  let widget = null;
  let site = {
    x: x,
    y: y,
    w: w,
    h: h
  }
  widget = new pager_view(name, parent_widget, site, widget_id);
  return widget;
}


export {
  create_widget,
  create_button,
  create_groub,
  create_item,
  create_list_view,
  WIDGET_TYPE
};