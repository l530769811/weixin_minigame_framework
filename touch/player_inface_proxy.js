import log from '../log.js'
import widget from '../widget/widget.js'
import list from '../common/js_list.js'
import list_data from '../common/js_list_data.js'
import list_node from '../common/js_list_node.js'
import scene_manager from '../scene_manager.js'
import touch_event from './touch_event.js'

const _interval_symbol = {
  interval_symbol: Symbol('interval_symbol')
}
const _be_optimization_symbol = {
  be_optimization_symbol: Symbol('be_optimization_symbol')
}
const _last_optimize_event_symbol = {
  last_optimize_event: Symbol('last_optimize_event')
}

var MyPlayerInfaceKind = {
  PIK_TouchStart: 0,
  PIK_TouchEnd: 1,
  PIK_TouchMove: 2,
  PIK_TouchCanel: 3
};

export {
  MyPlayerInfaceKind
};

export default class player_inface {
  constructor(context) {
    this.valid_scene_list = null;
    if (context instanceof scene_manager) {
      this.valid_scene_list = context.get_valid_scene_list();
    }
    this[_interval_symbol.interval_symbol] = 0;
    this[_be_optimization_symbol.be_optimization_symbol] = false;
    if (this[_interval_symbol.interval_symbol] > 0) {
      this[_be_optimization_symbol.be_optimization_symbol] = true;
    }
    // this.old_touch_event = new touch_event();
    // this.cur_touch_event = new touch_event();
    this[_last_optimize_event_symbol.last_optimize_event] = new touch_event();
    this.bindInputContext();
  }

  optimize_touch_interval(n) {
    this[_interval_symbol.interval_symbol] = n;
  
    if (this[_interval_symbol.interval_symbol] > 0) {
      this[_be_optimization_symbol.be_optimization_symbol] = true;
    } else {
      this[_be_optimization_symbol.be_optimization_symbol] = false;
    }
  }

  in_optimize(e) {
    if (this[_be_optimization_symbol.be_optimization_symbol]) {
      if ((e.changedTouches[0].identifier == this[_last_optimize_event_symbol.last_optimize_event].changedTouches[0].identifier) &&
        (e.kind == this[_last_optimize_event_symbol.last_optimize_event].kind) && ((e.timeStamp - this[_last_optimize_event_symbol.last_optimize_event].timeStamp) <= this[_interval_symbol.interval_symbol])) {
        return true;
      }
    }

    this[_last_optimize_event_symbol.last_optimize_event].touches = e.touches.slice();
    this[_last_optimize_event_symbol.last_optimize_event].changedTouches = e.changedTouches.slice();
    this[_last_optimize_event_symbol.last_optimize_event].kind = e.kind;
    this[_last_optimize_event_symbol.last_optimize_event].timeStamp = e.timeStamp;

    return false;
  }

  bindInputContext(){
    // wx.onTouchStart(this.onTouchStart.bind(this));
    // wx.onTouchEnd(this.onTouchEnd.bind(this));
    // wx.onTouchMove(this.onTouchMove.bind(this));
    // wx.onTouchCancel(this.onTouchCancel.bind(this));
    // this.optimize_touch_interval(100);
    ;
  }

  on_touch_input(e) {
    let result = false;   
    if (this.in_optimize(e) == true) {
      return result;
    }

    if (this.valid_scene_list != null) {
      
      this.valid_scene_list.for_each_list(function(cur_node) {

        let scene_list_data = cur_node.get_data();
        if (scene_list_data instanceof widget) {
          result = scene_list_data.on_touch_input(e);
          if (result == true) {
            return result;
          }
        } else {
          log("player_inface onTouchInput() scene_list_data is not widget");
        }
      })
      return result;
    }
  }

  onTouchStart(e) {
    e.kind = MyPlayerInfaceKind.PIK_TouchStart;
    this.on_touch_input(e);
  }

  onTouchEnd(e) {
    e.kind = MyPlayerInfaceKind.PIK_TouchEnd;
    this.on_touch_input(e);
  }

  onTouchMove(e) {
    // log('onTouchMove', 0);
    // log('widget touch onTouchMove e.changedTouches.length = ' + e.changedTouches.length + ' e.changedTouches[0].identifier = ' + e.changedTouches[0].identifier + ' x= ' + e.changedTouches[0].clientX + ' y=' + e.changedTouches[0].clientY + ' timeStamp=' + e.timeStamp)
    // if (e.changedTouches.length > 1) {
    //   let i = 1;
    //   for (i = 1; i <= e.changedTouches.length; i++) {
    //     log('widget touch onTouchMove e.changedTouches.length = ' + e.changedTouches.length + ' e.changedTouches[' + i + '].identifier = ' + e.changedTouches[i].identifier + ' x= ' + e.changedTouches[i].clientX + ' y=' + e.changedTouches[i].clientY + ' timeStamp=' + e.timeStamp)
    //   }
    // }
    e.kind = MyPlayerInfaceKind.PIK_TouchMove;
    this.on_touch_input(e);
  }

  onTouchCancel(e) {
    e.kind = MyPlayerInfaceKind.PIK_TouchCanel;
    this.on_touch_input(e);
  }
}