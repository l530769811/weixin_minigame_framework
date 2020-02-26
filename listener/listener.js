import log  from '../log.js'
export default class listener{
  notify(type, objs){
    log('listener notify type = ' + type)
    this.listen(type, objs);
  }

    listen(type, objs){
      ;
    }
}