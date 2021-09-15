import widget from './widget/widget.js'
import scene from './render/scene_unit.js'
import list from './common/js_list.js'
import list_data from './common/js_list_data.js'
import list_node from './common/js_list_node.js'
import scene_manager_listener from './listener/scene_manager_listener.js'
import log from './log.js'
import duty_unit from './duty_unit.js'
import dialog_scene from './render/dialog_scene.js'

const _root_scenes_symbol = {
  root_scenes_symbol: Symbol('root_scenes_symbol')
}
const _valid_scene_list_symbol = {
  valid_scene_list: Symbol('valid_scene_list')
}

const _dialog_sets_symbol = {
  variate: Symbol('_dialog_sets_symbol')
}

var Listen_Type = {
  LTP_display_show: 0,
  LTP_display_hide: 1
}

export {
  Listen_Type
}

export default class scene_manager extends duty_unit {
  constructor(ctx) {
    //log('scene_manager constructor');
    super();
    this.listener = new scene_manager_listener(this);
    this[_root_scenes_symbol.root_scenes_symbol] = {};
    this[_dialog_sets_symbol.variate] = new dialog_scene('dialog_sets_scene', this);
    this[_dialog_sets_symbol.variate].set_background_color('#00ff00');
    this[_valid_scene_list_symbol.valid_scene_list] = new list(this[_dialog_sets_symbol.variate]);
    this.debug_count = 0;
    this.ctx = ctx;
  }

  get_context(){
    return this.ctx;
  }
 
  make_valid_scene(scene) {
    let ret = false;
    if ((scene[0] instanceof list_data) && (scene[0] instanceof widget)) {
      let owner = scene[0].obtain_owner();
      if ((!scene[1]==false) && (scene[1] instanceof list_data) && (scene[1] instanceof widget)) {
        let parent_owner = scene[1].obtain_owner();
        this[_valid_scene_list_symbol.valid_scene_list].push_back_in_node(owner, parent_owner);
        log('scene_manager.make_valid_scene() scene[0].name = ' + scene[0].get_name() + '  scene[1].name = ' + scene[1].get_name() );
      }  else {
        log('scene_manager.make_valid_scene() <scene[1] is null> scene[0].name = ' + scene[0].get_name() );
        this[_valid_scene_list_symbol.valid_scene_list].push_front_node(owner);
      }
     
      ret = true;      
    } else {
      log('scene_manager.make_valid_scene() scene[0] no is list_data');
    }
    return ret;
  }

  make_invalid_scene(scene) {
    let ret = false;
    if (scene[0] instanceof list_data  ) {
      let owner = scene[0].obtain_owner();
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
        this[_root_scenes_symbol.root_scenes_symbol][name].add_listener(this.listener, 0);
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
      let node_data = cur_node.get_data();
      if (node_data instanceof widget) {
        node_data.duty(ctx, times,);
      } 
      i++;
    });

    if (this.debug_count <= 0) {
      log("scene_manager.duty() node mun = " + i, 1);
      this.debug_count++;
    }
  }

  getAllLayers() {
    return this[_root_scenes_symbol.root_scenes_symbol]
  }
}