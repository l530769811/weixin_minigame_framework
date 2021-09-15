import animation from './animation.js'

export default class queue_animation  extends animation{
  constructor(name, parentDuty){
    super(name, parentDuty)
  }

  duty(arg, us_timestamp, _zone) {
    super.duty(arg, us_timestamp, _zone);
    super.shift_frame();
    super.set_play_position(0);
  }
}