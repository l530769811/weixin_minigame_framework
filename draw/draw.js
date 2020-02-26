function draw_circular_arc_rect(ctx, left, top, right, bottom, radius, color = '#000000', stroke_color = '#000000',lineWidth = 0, is_fill = false) {
  
  
  let left_up_x = left;
  let left_up_y = top;
  let left_down_x = left;
  let left_dwon_y = bottom;

  let right_up_x = right;
  let right_up_y = top;
  let right_down_x = right;
  let right_down_y = bottom;
 
  ctx.beginPath();  
  ctx.strokeStyle = stroke_color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.moveTo(left_up_x, left_up_y + radius);
  ctx.arcTo(left_up_x, left_up_y, left_up_x + radius, left_up_y, radius);
  ctx.lineTo(right_up_x - radius, right_up_y);
  ctx.arcTo(right_up_x, right_up_y, right_up_x, right_up_y + radius, radius);
  ctx.lineTo(right_down_x, right_down_y - radius);
  ctx.arcTo(right_down_x, right_down_y, right_down_x - radius, right_down_y, radius);
  ctx.lineTo(left_down_x + radius, left_dwon_y);
  ctx.arcTo(left_down_x, left_dwon_y, left_down_x, left_dwon_y - radius, radius);
  ctx.closePath();
  if (is_fill) {
    ctx.fill();
  }
  
  ctx.stroke();
}


function draw_dotted_rect(ctx, left, top, right, bottom, color='#000000', lineWidth = 2, is_fill = false) {
  let left_up_x = left;
  let left_up_y = top;
  let left_down_x = left;
  let left_dwon_y = bottom;

  let right_up_x = right;
  let right_up_y = top;
  let right_down_x = right;
  let right_down_y = bottom;

  let hor_interval = (right - left) / 5;
  let ver_interval = (bottom - top) / 5;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;

  ctx.moveTo(left_up_x, left_up_y + ver_interval);
  ctx.lineTo(left_up_x, left_up_y);
  ctx.moveTo(left_up_x, left_up_y);
  ctx.lineTo(left_up_x + hor_interval, left_up_y)

  ctx.moveTo(left_up_x + 2 * hor_interval, left_up_y);
  ctx.lineTo(left_up_x + 3 * hor_interval, left_up_y);

  ctx.moveTo(right_up_x - hor_interval, right_up_y);
  ctx.lineTo(right_up_x, right_up_y);
  ctx.moveTo(right_up_x, right_up_y);
  ctx.lineTo(right_up_x, right_up_y + ver_interval);

  ctx.moveTo(right_up_x, right_up_y + 2 * ver_interval);
  ctx.lineTo(right_up_x, right_up_y + 3 * ver_interval);

  ctx.moveTo(right_down_x, right_down_y - ver_interval);
  ctx.lineTo(right_down_x, right_down_y);
  ctx.moveTo(right_down_x, right_down_y);
  ctx.lineTo(right_down_x - hor_interval, right_down_y);

  ctx.moveTo(right_down_x - 2 * hor_interval, right_down_y);
  ctx.lineTo(right_down_x - 3 * hor_interval, right_down_y);

  ctx.moveTo(left_down_x + hor_interval, left_dwon_y);
  ctx.lineTo(left_down_x, left_dwon_y);
  ctx.moveTo(left_down_x, left_dwon_y);
  ctx.lineTo(left_down_x, left_dwon_y-ver_interval);

  ctx.moveTo(left_down_x, left_dwon_y-2*ver_interval);
  ctx.lineTo(left_down_x, left_dwon_y - 3 * ver_interval);
  
  ctx.closePath();
  if (is_fill) {
    ctx.fillRect(left, top, right - left, bottom - left);
  }
  ctx.stroke();
  
}

function draw_rect(ctx, left, top, right, bottom, color = '#000000', lineWidth = 1, is_fill = false) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;  
  let left_up_x = left;
  let left_up_y = top;
  let left_down_x = left;
  let left_dwon_y = bottom;

  let right_up_x = right;
  let right_up_y = top;
  let right_down_x = right;
  let right_down_y = bottom;
  ctx.beginPath();

  ctx.moveTo(left_up_x, left_up_y);
  ctx.lineTo(right_up_x, left_up_y);
  ctx.lineTo(right_down_x, right_down_y);
  ctx.lineTo(left_down_x, left_dwon_y);
  ctx.closePath();
  if (is_fill) {
    ctx.fill();
  }  
  ctx.stroke();
}

export {
  draw_circular_arc_rect, 
  draw_dotted_rect,
  draw_rect
}