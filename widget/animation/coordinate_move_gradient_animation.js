import log from '../../log.js'
import coordinate_gradient_frames from './coordinate_gradient_frames.js'
import queue_animation from './queue_animation.js'

const _coordinate_range_symbol = {
  coordinate_range_symbol: Symbol('coordinate_range_symbol')
}
const _gradient_speed_symbol = {
  gradient_speed_symbol: Symbol('gradient_speed_symbol')
}
const _coordinate_frame_interval = {
  coordinate_frame_interval: Symbol('coordinate_frame_interval')
}
const _coordinate_frame_template_symbol = {
  coordinate_frame_template_symbol: Symbol('coordinate_frame_template_symbol')
}

export default class coordinate_move_gradient_animation extends queue_animation {
  constructor(name, _start_coordinate, _end_coordinate, coordinate_frame_template) {
    let _start_coordinate_x = _start_coordinate.x;
    let _start_coordinate_y = _start_coordinate.y;
    let _end_coordinate_x = _end_coordinate.x;
    let _end_coordinate_y = _end_coordinate.y;

    let x_coordinate_len = (_end_coordinate_x - (_start_coordinate_x)) > 0 ? (_end_coordinate_x - (_start_coordinate_x)) : -(_end_coordinate_x - (_start_coordinate_x));
    let y_coordinate_len = (_end_coordinate_y - (_start_coordinate_y)) > 0 ? (_end_coordinate_y - (_start_coordinate_y)) : -(_end_coordinate_y - (_start_coordinate_y));
    let frames_count = 0;
    const least_speed = 20;

    let longer_coordinate_len = x_coordinate_len > y_coordinate_len ? x_coordinate_len : y_coordinate_len;
    let coordinate_frame_interval = 1;
    if (longer_coordinate_len > least_speed) {
      coordinate_frame_interval = coordinate_frame_interval + Math.ceil((longer_coordinate_len - least_speed) / least_speed);
    }
    frames_count = Math.floor(longer_coordinate_len / coordinate_frame_interval);
    if (frames_count <= 0) {
      frames_count = 1;
    }

    //purpose the upsite code is calculate out the rames_count;
    log('coordinate_move_gradient_animation.构造 frames_count = ' + frames_count + ' coordinate_frame_interval = ' + coordinate_frame_interval);
    super(name, undefined, frames_count);
    if (!coordinate_frame_template) {
      this[_coordinate_frame_template_symbol.coordinate_frame_template_symbol] = new coordinate_gradient_frames(null, 0, 0);
    } else {
      this[_coordinate_frame_template_symbol.coordinate_frame_template_symbol] = coordinate_frame_template;
    }


    this[_coordinate_frame_interval.coordinate_frame_interval] = coordinate_frame_interval;
    this[_gradient_speed_symbol.gradient_speed_symbol] = {
      x_speed: 1,
      y_speed: 1
    }

    this[_coordinate_range_symbol.coordinate_range_symbol] = {
      start_coordinate: {
        _start_coordinate_x,
        _start_coordinate_y
      },
      end_coordinate: {
        _end_coordinate_x,
        _end_coordinate_y
      }
    }

    let remain_x = (_end_coordinate_x - (_start_coordinate_x)) % (frames_count);
    let remain_y = (_end_coordinate_y - (_start_coordinate_y)) % (frames_count);
    let clone_frames = this[_coordinate_frame_template_symbol.coordinate_frame_template_symbol].clone();
    if (remain_x != 0 || remain_y != 0) {
      log('coordinate_move_gradient_animation.构造 add_frame remain_x=  ' + remain_x + ' remain_y = ' + remain_y, 1);
      clone_frames.set_coordinate(remain_x, remain_y);
      this.add_frames(clone_frames);
    }


    let gradient_interval_x = ((_end_coordinate_x - (_start_coordinate_x)) / (frames_count));
    let gradient_interval_y = ((_end_coordinate_y - (_start_coordinate_y)) / (frames_count));
    gradient_interval_x = gradient_interval_x > 0 ? Math.floor(gradient_interval_x) : Math.ceil(gradient_interval_x);
    gradient_interval_y = gradient_interval_y > 0 ? Math.floor(gradient_interval_y) : Math.ceil(gradient_interval_y);

    let x = _start_coordinate_x;
    let y = _start_coordinate_y;
    
    for (var i = 0; i < frames_count; i++) {
      x = _start_coordinate_x + gradient_interval_x * i;
      y = _start_coordinate_x + gradient_interval_y * i;
      if ((x < _end_coordinate_x && _start_coordinate_x > _end_coordinate_x) ||
        (x > _end_coordinate_x && _start_coordinate_x < _end_coordinate_x)) {
        x = _end_coordinate_x;
      }

      if ((y < _end_coordinate_y && _start_coordinate_y > _end_coordinate_y) ||
        (y > _end_coordinate_y && _start_coordinate_y < _end_coordinate_y)) {
        y = _end_coordinate_y;
      }

      let clone_frames = this[_coordinate_frame_template_symbol.coordinate_frame_template_symbol].clone();
      
      log('coordinate_move_gradient_animation.构造 add_frame coor x =  ' + x + ' coor y = ' + y, 1);
      clone_frames.set_coordinate(x, y);
      this.add_frames(clone_frames);
    }

  }
}