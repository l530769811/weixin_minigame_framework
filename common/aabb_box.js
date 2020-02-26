import log from '../log.js'

export default class aabb_box {
  constructor(minx, miny, maxx, maxy) {
    this.min_x = minx;
    this.min_y = miny;
    this.max_x = maxx;
    this.max_y = maxy;
  }

  reset(minx, miny, maxx, maxy) {
    this.min_x = minx;
    this.min_y = miny;
    this.max_x = maxx;
    this.max_y = maxy;
  }

  is_hit_box(aabb) {
    
    return !!(((this.min_x >= aabb.min_x && this.min_x <= aabb.max_x) || (aabb.min_x >= this.min_x && aabb.min_x <= this.max_x)) &&
      ((this.min_y >= aabb.min_y && this.min_y <= aabb.max_y) || (aabb.min_y >= this.min_y && aabb.min_y <= this.max_y)));
  }

  is_hit_point(x, y, offset_x = 0, offset_y = 0) {
    const deviation = 2;
    
    return !!(x >= this.min_x + offset_x - deviation &&
      y >= this.min_y + offset_y - deviation &&
      x <= this.max_x + offset_x + deviation &&
      y <= this.max_y + offset_y+ deviation)
  }
}