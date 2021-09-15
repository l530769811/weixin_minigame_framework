import log from '../log.js'
export default  class list_node {
  constructor(data) {
    this.data = data;
    this.next_node = this;
    this.pre_node = this;
  //  log('list_node.constructor() data.name = ' + this.data.get_name(), 1)
  }

  init_node(){
    this.next_node = this;
    this.pre_node = this;
   // log('list_node.init_node()  data.name = ' + this.data.get_name(), 1)
  }

  is_myself(){
    return (this.next_node == this.pre_node)
  }

  next_node_is_null() {
    return this.next_node == null;
  }
  pre_node_is_null() {
    return this.pre_node == null;
  }

  get_next_node() {
    return this.next_node;
  }

  get_pre_node() {
    return this.pre_node;
  }

  push_next_node(node) {
    this.next_node = node;
  }

  push_pre_node(node) {
    this.pre_node = node;
  }

  push_node_in_next(node){
    let node_new = node;
    let node_pre = this;
    let node_next = this.get_next_node();
    node_next.push_pre_node(node_new);
    node_new.push_next_node(node_next);
    node_new.push_pre_node(node_pre);
    node_pre.push_next_node(node_new);
  }

  report_lost_node() {
    this.next_node = null;
    this.pre_node = null;
  }
  set_data(){
    this.data = data;
  }
  get_data() {
    return this.data;
  }

};