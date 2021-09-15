const _host_symbol = {
  host_symbol: Symbol('host_symbol')
}

const _name_symbol = {
  name_symbol: Symbol('name_symbol')
}

export default class data {
  constructor(name) {
    this[_host_symbol.host_symbol] = null;
    this[_name_symbol.name_symbol] = (name);
  }

  get_name() {
    return this[_name_symbol.name_symbol];
  }

  get_host() {
    return this[_host_symbol.host_symbol];
  }

  set_host(host) {
    this[_host_symbol.host_symbol] = host;
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