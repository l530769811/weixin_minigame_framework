import layers from './widget/layer.js'
import scene from './render/scene_unit.js'
import list from './common/js_list.js'
import list_data from './common/js_list_data.js'
import list_node from './common/js_list_node.js'
import scene_manager_listener from './listener/scene_manager_listener.js'
import log from './log.js'
import duty_unit from './duty_unit.js'

const _root_scenes_symbol = {
  root_scenes_symbol: Symbol('root_scenes_symbol')
}
const _valid_scene_list_symbol = {
  valid_scene_list: Symbol('valid_scene_list')
}

var Listen_Type = {
  LTP_valid_scene: 0,
  LTP_invalid_scene: 1
}

export {
  Listen_Type
}

export default class scene_manager extends duty_unit {
  constructor() {
    //log('scene_manager constructor');
    super();
    this.listener = new scene_manager_listener(this);
    this[_root_scenes_symbol.root_scenes_symbol] = {};
    this[_valid_scene_list_symbol.valid_scene_list] = new list(null);
  }

  make_valid_scene(scene) {
    let ret = false;
    if (scene instanceof list_data) {
      let owner = scene.obtain_owner();
      this[_valid_scene_list_symbol.valid_scene_list].push_front_node(owner);
      ret = true;
      
    } else {
      log('scene_manager.make_valid_scene() scene no is list_data');
    }


    return ret;
  }

  make_invalid_scene(scene) {
    let ret = false;
    if (scene instanceof list_data) {
      let owner = scene.obtain_owner();
      this[_valid_scene_list_symbol.valid_scene_list].delete_node(owner);
      ret = true;
     
    } else {
      log('scene_manager.make_invalid_scene() scene no is list_data');
    }
    return ret;
  }

  get_valid_scene_list() {
    return this[_valid_scene_list_symbol.valid_scene_list];
  }

  add_duty(name, lyr) {
    let ret = false;

    if (lyr instanceof duty_unit) {
      if (this[_root_scenes_symbol.root_scenes_symbol][name] == null) {
        this[_root_scenes_symbol.root_scenes_symbol][name] = lyr;
        this[_root_scenes_symbol.root_scenes_symbol][name].add_listener(this.listener);
        ret = true;
      }
    } else {
      log('addScene no is scene=====');
    }
    return ret;
  }

  create_scene(name, alloc) {
    let ret = null;

    if (this[_root_scenes_symbol.root_scenes_symbol][name] == null) {
      this[_root_scenes_symbol.root_scenes_symbol][name] = new scene(name, this);
      ret = this[_root_scenes_symbol.root_scenes_symbol][name];
    }

    return ret;
  }

  destory_scene(name) {
    ret = false;
    if (this[_root_scenes_symbol.root_scenes_symbol][name] != null) {
      this[_root_scenes_symbol.root_scenes_symbol][name] = null;
      ret = true;
    }
    return ret;
  }

  duty(ctx, times) {
    let i = 0;
    this[_valid_scene_list_symbol.valid_scene_list].for_each_list_reverse(function(cur_node) {
      let scene_list_data = cur_node.get_data();
      if (scene_list_data instanceof scene) {
        scene_list_data.duty(ctx);
      } else {
        //log(scene_list_data)
        // log("scene_manager render() scene_list_data is not scene");
      }
      i++;

    })

    if (i > 2) {
      log("scene_manager.duty() node mun = " + i, 1);
    }
  }

  getAllLayers() {
    return this[_root_scenes_symbol.root_scenes_symbol]
  }
}