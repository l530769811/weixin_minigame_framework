import frames from './frames.js'

const _coordinate_symbol = {
  coordinate_symbol: Symbol('coordinate_symbol')
}
const _coordinate_gradient_callback = {
  coordinate_gradient_callback: Symbol('coordinate_gradient_callback')
}
export default class coordinate_gradient_frames extends frames {
  
  constructor(coordinate_gradient_callback, _x=0, _y=0) {
    super();
    this[_coordinate_gradient_callback.coordinate_gradient_callback] = coordinate_gradient_callback;
    this[_coordinate_symbol.coordinate_symbol] = {
      x: _x,
      y: _y
    }
  }

  render(arg) {
    if (typeof this[_coordinate_gradient_callback.coordinate_gradient_callback] === 'function' 
    && (!this[_coordinate_gradient_callback.coordinate_gradient_callback])==false) {
      this[_coordinate_gradient_callback.coordinate_gradient_callback](this[_coordinate_symbol.coordinate_symbol].x, this[_coordinate_symbol.coordinate_symbol].y);
    }

  }

  clone(arg) {
    return new coordinate_gradient_frames(this[_coordinate_gradient_callback.coordinate_gradient_callback], this[_coordinate_symbol.coordinate_symbol].x, this[_coordinate_symbol.coordinate_symbol].y);
  }

  set_coordinate(x, y) {
    this[_coordinate_symbol.coordinate_symbol].x = x;
    this[_coordinate_symbol.coordinate_symbol].y = y;
  }
}