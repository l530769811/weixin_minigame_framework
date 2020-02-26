import layer from '../widget/layer.js'
import log from '../log.js'

export default class scene_unit extends layer {
  constructor(name, parentDuty, on_message_callback, site) {
    super(name, parentDuty, on_message_callback, site); 
  }

  hide() {
    let dutys = super.get_duty();
    for (var i in dutys) {
      let duty = super.get_duty(i);
      if ((duty instanceof layer)) {
        if (duty != null) {
          duty.hide();
        } else {
          log('hide() duty == null', 2);
        }
      }
    }

    super.hide();
    log(this.get_name() + ' scene hide', 1);
  }

  show() {
    let dutys = super.get_duty();
    for (var i in dutys) {
      let duty = super.get_duty(i);
      if ((duty instanceof layer)) {
        if (duty != null) {
          duty.show();
        } else {
          log('show() duty == null', 2);
        }
      }
    }

    super.show();
    log(this.get_name() + ' scene show', 1);
  }

  duty(arg, us_timestamp) {
    let dutys = super.get_duty();   
    for (var i in dutys) {
      let duty = super.get_duty(i);
      if (duty != null) {
        
        duty.duty(arg, us_timestamp);
      }else {
        log('scene_unit.duty() duty == null', 2);
      }
    }
  }

  on_touch_input(e) {
    let ret = false;
    let dutys = super.get_duty();
    for (var i in dutys) {
      let duty = super.get_duty(i);
      if (duty != null && (duty instanceof layer)) {
        ret = duty.on_touch_input(e);
        if (ret == true) {
          break;
        }
      }
    }
    return ret;
  }

}