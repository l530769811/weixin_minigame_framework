import log from '../log.js'
const _queue_symbol = {
  queue_symbol: Symbol('queue_symbol')
};
export default class js_queue{
  constructor(){
    this[_queue_symbol.queue_symbol] = [];
  }

  push(data){
    return this[_queue_symbol.queue_symbol].push(data);
  }

  pop(){
    this[_queue_symbol.queue_symbol].shift();
  }

  front(){
    return this[_queue_symbol.queue_symbol][0];
  }

  empty(){
     return (this[_queue_symbol.queue_symbol].length<=0);
  }
  
  length(){
    
    return this[_queue_symbol.queue_symbol].length;
  }
   
}