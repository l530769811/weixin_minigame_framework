import layer from '../layer.js'
import view_pager_data from './view_pager_data.js'

const _pager_widget_symbol = {
  pager_widget_symbol: Symbol('pager_widget_symbol')
}

export default class view_pager extends layer {
  constructor(name, parent_layer, site) {
    super(name, parent_layer,  site)
  }

  create_data(name, arg) {
    return new view_pager_data(name, arg);
  }

  set_count(count) {
    let _data = this.get_data();
    _data.set_count(count);
  }

  on_move_widget(x, y, w, h) {
;
  }
    
}