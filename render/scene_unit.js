import layer from '../widget/layer.js'
import log from '../log.js'
import widget from '../widget/widget.js'
export default class scene_unit extends layer {
  constructor(name, parentDuty) {
    super(name, parentDuty); 
  }

  hide() {
    let dutys = super.get_duty();
    for (var i in dutys) {
      let duty = super.get_duty(i);
      if ((duty instanceof widget)) {
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
      if ((duty instanceof widget)) {
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

  //duty(arg, us_timestamp) {
    // let dutys = super.get_duty();   
    // for (var i in dutys) {
    //   let tmp_duty = super.get_duty(i);
    //   if (tmp_duty != null) {        
    //     tmp_duty.duty(arg, us_timestamp,);
    //   }else {
    //     log('scene_unit.duty() duty == null', 2);
    //   }
    // }    
  //}

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