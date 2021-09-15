import list_data from './js_list_data.js'
import list_node from './js_list_node.js'
import log from '../log.js'

export default class list {
  constructor(data) {
    this.list_head = new list_node(data);
  };
  
  init_head_node(data){
    if(!this.list_head==false ){
      this.list_head.set_data(data);
      this.list_head.init_node();
    } else {
      this.list_head = new list_node(data);
    }
  }

  get_head_node(){
    return this.list_head;
  }


  _del_node(node_pre, node_next) {
    node_next.push_pre_node(node_pre);
    node_pre.push_next_node(node_next);
  }

  _add_node(node_new, node_pre, node_next) {
    node_next.push_pre_node(node_new);
    node_new.push_next_node(node_next);
    node_new.push_pre_node(node_pre);
    node_pre.push_next_node(node_new);
  }

  push_front_in_node(node, in_node){
    if (node != null && (node instanceof list_node)) {
      if (node.is_myself() == false){
        return;
      }  
      let cur_node = in_node;
      this._add_node(node, cur_node, cur_node.get_next_node());
    }
  }

  push_back_in_node(node, in_node){
    if (node != null && (node instanceof list_node)) {
      if (node.is_myself() == false){
        log('js_list.push_back_in_node() node is not itself!!!!',  1)
        return;
      }  
      // if(in_node.is_myself() == true){
      //   log('js_list.push_back_in_node() in_node is itself!!!!',  1)
      //   return;
      // }
      if(in_node == node){
        log('js_list.push_back_in_node() in_node == node!!!!',  1)
        return;
      }

      let cur_node = in_node;
      this._add_node(node, cur_node.get_pre_node(), cur_node);
      log('js_list.push_back_in_node() _add_node!!!!',  1)
    } else {
      log('js_list.push_back_in_node() node is null or not list node!!!!',  1)
    }
  }

  push_back_node(node, index = 0) {
    if (node != null && (node instanceof list_node)) {
      if (node.is_myself() == false){
        return;
      }     
      if (index < 0) {
        index = 0;
      }
      let cur_node = this.list_head;
      let head_node = this.list_head;
      let i = 0;
      while (cur_node.get_pre_node() != head_node) {
        if (i == index) {
          break;
        } else {
          i++;
          cur_node = cur_node.get_pre_node();
        }
      }

      this._add_node(node, cur_node.get_pre_node(), cur_node);
    }
  }

  push_front_node(node, index = 0) {
    if (node != null && (node instanceof list_node)) {
      if (node.is_myself() == false) {
        return;
      }
      
      if (index < 0) {
        index = 0;
      }

      let cur_node = this.list_head;
      let head_node = this.list_head;
      let i = 0;
      while (cur_node.get_next_node() != head_node) {
        if (i == index) {
          break;
        } else {
          i++;
          cur_node = cur_node.get_next_node();
        }
      }

      this._add_node(node, cur_node, cur_node.get_next_node());
    }
  };

  delete_node(node) {
    if (isNaN(node) == true) {
      if (node != null && (node instanceof list_node)) {
        let cur_pre_node = node.get_pre_node();
        let cur_next_node = node.get_next_node();

        this._del_node(cur_pre_node, cur_next_node);
        node.init_node();
      }
      return;
    }
    let del_node = this.find_node(node);
    this._del_node(del_node.get_pre_node(), del_node.get_next_node());
    del_node.init_node();
  }

  find_node(index) {
    if (index < 0) {
      index = 0;
    }

    let cur_node = this.list_head;
    let head_node = this.list_head;
    let i = 0;
    while (cur_node.get_next_node() != head_node) {
      if (i == index) {
        break;
      } else {
        i++;
        cur_node = cur_node.get_next_node();
      }

      return cur_node;
    }
  }

  for_each_list_reverse(onforeach, node) {
    let cur_node = this.list_head;
    let head_node = this.list_head;

   if (node instanceof list_node) { //used more time??
     cur_node = node;
   }

  //  if (!node == false) { 
  //    cur_node = node;
  //  }
    
    do {
      let result = onforeach(cur_node);
      if (result == true) {
        break;
      }
      cur_node = cur_node.get_pre_node();
    } while (cur_node != head_node)
  }

  //onforeach for each list call_back
  // node   first node of for_each node 
  for_each_list(onforeach, node) {

    let cur_node = this.list_head;
    let head_node = this.list_head;

    if (node instanceof list_node) { //used more time
     cur_node = node;
    }
   
    do {
      let result = onforeach(cur_node);
      if (result == true) {
        break;
      }
      cur_node = cur_node.get_next_node();
    } while (cur_node != head_node)
  }
}