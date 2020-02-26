import list_node from './js_list_node.js'

export default class list_data{
  constructor(){
    this.owner = new list_node(this);
  }
  // bindOwner(owner){
  //   this.owner = owner;
  // }
  obtain_owner(){
    return this.owner;
  }

  // clearOwner(){
  //   this.owner = null;
  // }
  is_has_owner(){
    return this.owner == null;
  }
}