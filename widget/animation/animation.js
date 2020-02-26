import duty_unit from '../../duty_unit.js'
import frames_type from './frames.js'
import log from '../../log.js'

const _is_play_symbol = {
  is_play_symbol: Symbol('is_play_symbol')
}
const _frames_arr_symbol = {
  frames_arr_symbol: Symbol('frames_arr_symbol')
}

const _frames_count_symbol = {
  frames_count_symbol: Symbol('frames_count_symbol')
}
const _current_play_frames_symbol = {
  current_play_frames_symbol: Symbol('_current_play_frames_symbol')
}

const _play_speed_symbol = {
  play_speed_symbol: Symbol('play_speed_symbol')
}

const _is_loop_play_symbol = {
  is_loop_play_symbol: Symbol('is_roll_play_symbol')
}

const _interval_mstime_symbol = {
  interval_mstime_symbol: Symbol('interval_mstime_symbol')
}

const _last_play_frame_ustime_symbol = {
  last_play_frame_ustime_symbol: Symbol('last_play_frame_ustime_symbol')
}

const _play_animation_symbol = {
  play_animation_symbol: Symbol('play_animation_symbol')
}

export default class animation extends duty_unit {
  constructor(name, parentDuty, speed = 60) {
    super(name, parentDuty);
    this[_frames_arr_symbol.frames_arr_symbol] = [];
    this[_frames_count_symbol.frames_count_symbol] = 0;
    this[_is_play_symbol.is_play_symbol] = true;
    this[_current_play_frames_symbol.current_play_frames_symbol] = 0;
    this[_play_speed_symbol.play_speed_symbol] = speed;
    this[_is_loop_play_symbol.is_loop_play_symbol] = false;
    this[_interval_mstime_symbol.interval_mstime_symbol] = 1000 / this[_play_speed_symbol.play_speed_symbol];
    this[_last_play_frame_ustime_symbol.last_play_frame_ustime_symbol] = 0;

    this[_play_animation_symbol.play_animation_symbol] = function(arg, us_timestamp) {
      if (this.is_playing() == false) {
        return;
      }

      if ((us_timestamp - this[_last_play_frame_ustime_symbol.last_play_frame_ustime_symbol]) >= this[_interval_mstime_symbol.interval_mstime_symbol]) {
        //time is no larger then interverl time;
        return;
      }


      let frame = this[_frames_arr_symbol.frames_arr_symbol][this[_current_play_frames_symbol.current_play_frames_symbol]];
      this.play_animation(arg, frame);

      if (this[_current_play_frames_symbol.current_play_frames_symbol] >= this[_frames_count_symbol.frames_count_symbol]) {

        this[_current_play_frames_symbol.current_play_frames_symbol] = 0;
        if (this[_is_loop_play_symbol.is_loop_play_symbol] == false) {
          // log('animation.constructor this[_play_animation_symbol.play_animation_symbol] function no loop stop animation', 1);
          this.stop();
        } 
      } else {
        this[_current_play_frames_symbol.current_play_frames_symbol]++;
      }
    }
  }

  add_frames(frame) {
    this[_frames_arr_symbol.frames_arr_symbol].push(frame);
    this[_frames_count_symbol.frames_count_symbol]++;
  }

  set_speed(speed) {
    if (speed > this[_frames_count_symbol.frames_count_symbol]) {
      this[_play_speed_symbol.play_speed_symbol] = this[_frames_count_symbol.frames_count_symbol];
    } else {
      this[_play_speed_symbol.play_speed_symbol] = speed;
    }

    this[_interval_mstime_symbol.interval_mstime_symbol] = 1000 / this[_play_speed_symbol.play_speed_symbol];
  }

  set_play_position(pos) {
    if (pos > this[_frames_count_symbol.frames_count_symbol]) {
      this[_current_play_frames_symbol.current_play_frames_symbol] = this[_frames_count_symbol.frames_count_symbol];
    } else {
      this[_current_play_frames_symbol.current_play_frames_symbol] = pos;
    }

    if (pos < 0) {
      this[_current_play_frames_symbol.current_play_frames_symbol] = 0;
    } else {
      this[_current_play_frames_symbol.current_play_frames_symbol] = pos;
    }
  }

  get_current_play_position() {
    return this[_current_play_frames_symbol.current_play_frames_symbol];
  }

  set_loop_play(is_loop) {
    this[_is_loop_play_symbol.is_loop_play_symbol] = is_loop;
  }

  get_frames_count() {
    return this[_frames_count_symbol.frames_count_symbol];
  }

  is_loop_play() {
    return this[_is_loop_play_symbol.is_loop_play_symbol];
  }

  is_playing() {
    return this[_is_play_symbol.is_play_symbol];
  }

  stop() {
    this[_is_play_symbol.is_play_symbol] = false;
    this[_current_play_frames_symbol.current_play_frames_symbol] = 0
  }

  pause() {
    this[_is_play_symbol.is_play_symbol] = false;
  }

  play() {
    this[_is_play_symbol.is_play_symbol] = true;
  }

  play_animation(arg, frame) {
    if (frame instanceof frames_type && (!frame) == false) {
      frame.render(arg);
    }
  }

  duty(arg, us_timestamp) {
    this[_play_animation_symbol.play_animation_symbol](arg, us_timestamp);
  }

}