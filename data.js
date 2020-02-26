import AabbBox from './common/aabb_box.js'

const _aabb_box_symbol = {
  aabb_box_symbol: Symbol('aabb_box_symbol')
}

const _host_symbol = {
  host_symbol: Symbol('host_symbol')
}

const _name_symbol = {
  name_symbol: Symbol('name_symbol')
}

export default class data {
  constructor(name) {
    this[_aabb_box_symbol.aabb_box_symbol] = new AabbBox(0, 0, 0, 0);
    this[_host_symbol.host_symbol] = null;
    this[_name_symbol.name_symbol] = name;
  }

  create_aabb_box(minx, miny, maxx, maxy) {
    if (this[_aabb_box_symbol.aabb_box_symbol] == false) {
      this[_aabb_box_symbol.aabb_box_symbol] = new AabbBox(minx, miny, maxx, maxy);
    } else {
      this[_aabb_box_symbol.aabb_box_symbol].reset(minx, miny, maxx, maxy);
    }

  }

  get_name() {
    return this[_name_symbol.name_symbol];
  }

  get_host() {
    return this[_host_symbol.host_symbol];
  }
  
  set_host(host){
    this[_host_symbol.host_symbol] = host;
  }

  get_aabb_box() {
    return this[_aabb_box_symbol.aabb_box_symbol];
  }

  on_touch_input(e) {;
  }

  update_data(update_case) {;
  }

  checkInRect(x, y, left, top, right, bottom) {
    const deviation = 2

    return !!(x >= left - deviation &&
      y >= top - deviation &&
      x <= right + deviation &&
      y <= bottom + deviation)
  }
}