import list_node from './js_list_node.js'

export default class list_data{
  constructor(){
    this.owner =  null;
  }
  init(){
    this.owner =  new list_node(this);
  }

  obtain_owner(){
    return this.owner;
  }

 
  is_has_owner(){
    return this.owner == null;
  }
}