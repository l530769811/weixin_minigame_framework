import { MyPlayerInfaceKind } from './player_inface_proxy.js'

export default class touch_event{
  constructor(){
    this.touches = [{}];
    this.changedTouches = [{}]
    this.kind = MyPlayerInfaceKind.PIK_TouchCanel;
    this.timeStamp = 0;
  }

  copy_event(e){
    this.touches = e.touches.slice();
    this.changedTouches = e.changedTouches.slice();
    this.kind = e.kind;
    this.timeStamp = e.timeStamp;
  }
}