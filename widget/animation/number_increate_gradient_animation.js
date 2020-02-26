import animation from './animation.js'
import log from '../../log.js'

import number_gradient_frames from './number_gradient_frames.js'

const _number_frame_template_symbol = {
  number_frame_template_symbol: Symbol('number_frame_template_symbol')
}

export default class number_increase_gradient_animation extends animation {
  constructor(name,  end_number, frame_template) {
     
    let _end_number = end_number;
 
    let number_len = (_end_number) > 0 ? (_end_number ) : -(_end_number);
    const least_speed = 20;

    let longer_number_len = number_len;
    let frame_interval = 1;
    let frames_count = 1;
    if (longer_number_len > least_speed) {
      frame_interval = frame_interval + Math.ceil((longer_number_len - least_speed) / least_speed);
    }
    frames_count = Math.floor(longer_number_len / frame_interval);
    if (frames_count <= 0) {
      frames_count = 1;
    }

    //purpose the upsite code is calculate out the rames_count;
  
    super(name, undefined, frames_count, least_speed);


    if (!frame_template) {
      this[_number_frame_template_symbol.number_frame_template_symbol] = new number_gradient_frames(null, 0);
    } else {
      this[_number_frame_template_symbol.number_frame_template_symbol] = frame_template;
    }

    let remain_number = (_end_number ) % (frames_count);
    let clone_frames = this[_number_frame_template_symbol.number_frame_template_symbol].clone();
    if (remain_number != 0 ) {
      // log('number_increase_gradient_animation.构造 add_frame remain_number=  ' + remain_number , 1);
      clone_frames.set_number(remain_number);
      this.add_frames(clone_frames);
    }

    let gradient_interval_number = (_end_number) / (frames_count);

    gradient_interval_number = gradient_interval_number > 0 ? Math.floor(gradient_interval_number) : Math.ceil(gradient_interval_number);
 
    let x = gradient_interval_number;

    for (var i = 0; i < frames_count; i++) {
      if ((((x * i) >= _end_number) && _end_number > 0) || (((x * i + 0) <= _end_number) && _end_number < 0)) {
        x = 0;
      }    

      clone_frames = this[_number_frame_template_symbol.number_frame_template_symbol].clone();
      // log('number_increase_gradient_animation.构造 add_frame number  =  ' + x , 1);
      clone_frames.set_number(x);
      this.add_frames(clone_frames);
    }

  }
}