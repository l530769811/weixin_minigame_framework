export default  class list_node {
  constructor(data) {
    this.data = data;
    this.next_node = this;
    this.pre_node = this;
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

  report_lost_node() {
    this.next_node = null;
    this.pre_node = null;
  }
  get_data() {
    return this.data;
  }

};