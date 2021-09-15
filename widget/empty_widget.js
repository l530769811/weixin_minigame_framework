
import widget from './layer.js'

export default class empty_widget extends widget {
  constructor(name, parentDuty, arg, site) {
    super(name, parentDuty, site);
  }

  duty(arg, us_timestamp) {
    ;
  }

  on_touch_input(e, old_e) {
    return false;
  }
}