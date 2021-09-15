import listener from './listener.js'
import duty_unit from '../duty_unit.js'
//import scene_manager from '../scene_manager.js'
//import { Listen_Type } from '../scene_manager.js'
import widget from '../widget/widget.js'
import log from '../log.js'

export default class layer_widgets_listener extends listener {
  constructor(listenfrom) {
    super();
    this.listenfrom = listenfrom;
  } 

  listen(type, objs) {

    // if (this.listenfrom instanceof scene_manager) {
    //   switch (type) {
    //     case Listen_Type.LTP_display_show:
    //       if (objs instanceof scene) {
    //         this.listenfrom.make_valid_scene(objs);

    //       } else {
    //         log('scene_manager_listener listen type = ' + type + ' objs[0] is not scene objs[0] = ' + objs)
    //       }
    //       break;

    //     case Listen_Type.LTP_display_hide:
    //       if (objs instanceof scene) {
    //         this.listenfrom.make_invalid_scene(objs);
    //       } else {
    //         log('scene_manager_listener listen type = ' + type + ' objs[0] is not scene objs[0] = ' + objs)
    //       }
    //       break;

    //     default:
    //       log('scene_manager_listener switch default');
    //       break;
    //   }
   // }
  }

}