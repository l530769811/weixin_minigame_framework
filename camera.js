import log from './log.js'


var camera_rect = {
  left : 0,
  right : 0,
  top : 0,
  bottom : 0
};

export default class camera{
  constructor(){
    this.left = 0;
    this.top  = 0;
    this.right = window.innerWidth;
    this.bottom = window.innerHeight;
    this.cameraCenterX = this.left + (this.right-this.left)/2;
    this.cameraCenterY = this.top + (this.bottom - this.top) / 2;

    this.move_x = 0;
    this.move_y = 0;
    //log(this.right+ "+" + this.bottom + '+' + this.cameraCenterX + '+' + this.cameraCenterY);
  }

  move(x, y){ 
    this.move_x = x;
    this.move_y = y;
  }

  translate_camera(x, y, callback){
    x = x - this.move_x;
    y = y - this.move_y;
    if(call != null){
        if(typeof callback === "function"){
          callback(x, y);
        }
    }
  }

}