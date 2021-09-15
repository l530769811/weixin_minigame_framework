const _shape_source_count_symbol = {
  variate: Symbol('_shape_source_count_symbol')
}

const _shape_change_count_symbol = {
  variate: Symbol('_shape_count_symbol')
}

const _limite_shape_symnol = {
  variate: Symbol('_limite_shape_symnol')
}
const _is_recover_symbol = {
  variate: Symbol('_is_recover_symbol')
}

export default class elastic {
  constructor(_limite) {
   
    this[_limite_shape_symnol.variate] = _limite;
    this[_is_recover_symbol.variate] = false;
    this[_shape_change_count_symbol.variate] = 0;
    this[_shape_source_count_symbol.variate] = 0;
  }
  start_force(force){
    this[_is_recover_symbol.variate] = false;
    this[_shape_change_count_symbol.variate] = 0;
    this[_shape_source_count_symbol.variate] = 0;
  }

  do_force(force) {
    this.shape_increate(force);
  }

  shop_force(force){
     this.recover();
  }

  is_break(){
    let ret = false;
    let shape_count = 0;
    shape_count = (this[_shape_source_count_symbol.variate] < 0) ? 0 - this[_shape_source_count_symbol.variate] : this[_shape_source_count_symbol.variate];
    
    if(shape_count > this[_limite_shape_symnol.variate]){
      ret = true;
    }

    return ret;
  }

  recover(){
    this[_is_recover_symbol.variate] = true;
    this[_shape_source_count_symbol.variate] = this[_shape_change_count_symbol.variate];
    this[_shape_change_count_symbol.variate] = 0;
  }

  is_recover(){
    return this[_is_recover_symbol.variate];
  }
  
  shape_increate(count){
    this[_shape_source_count_symbol.variate] = this[_shape_change_count_symbol.variate];
    this[_shape_change_count_symbol.variate] = this[_shape_change_count_symbol.variate] + count;
  }
  
  get_shape_increase() {
    return this[_shape_change_count_symbol.variate] - this[_shape_source_count_symbol.variate];
  }

  get_shape_count() {
    return this[_shape_count_symbol.variate];
  }
}