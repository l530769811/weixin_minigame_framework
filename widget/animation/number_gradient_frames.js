
import frames from './frames.js'

const _number_symbol = {
  number_symbol: Symbol('number_symbol')
}
const _number_gradient_callback = {
  number_gradient_callback: Symbol('number_gradient_callback')
}
export default class number_gradient_frames extends frames {

  constructor(number_gradient_callback, _number = 0) {
    super();
    this[_number_gradient_callback.number_gradient_callback] = number_gradient_callback;
    this[_number_symbol.number_symbol] = {
      number: _number,
    }
  }

  render(arg) {
    if (typeof this[_number_gradient_callback.number_gradient_callback] === 'function'
      && (!this[_number_gradient_callback.number_gradient_callback]) == false) {
      this[_number_gradient_callback.number_gradient_callback](this[_number_symbol.number_symbol].number);
    }

  }

  clone(arg) {
    return new number_gradient_frames(this[_number_gradient_callback.number_gradient_callback], this[_number_symbol.number_symbol].number);
  }

  set_number(x) {
    this[_number_symbol.number_symbol].number = x;
  }
}