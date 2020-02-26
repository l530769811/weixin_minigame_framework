const _ui_data_symbol = {
  variate: Symbol('ui_data_symbnol')
}

export default class widget_adapter {
  constructor() {
    this[_ui_data_symbol.variate] = null;
  }

  upload_widget(object, widget_index) {
    let ret = null;
    if (this.is_upload(widget_index) == false){
      ret = this.instance_widget(object, widget_index);
    }

    return ret;
  }

  is_upload(widget_index){
    return false;
  }

  set_ui_data(data) {
    this[_ui_data_symbol.variate] = data;
  }

  get_ui_data() {
    this.updata_ui_data();
    return this[_ui_data_symbol.variate];
  }

  get_count() {
    return 0;
  }

  instance_widget(object, widget_index) {
    return null;
  }

  destory_widget(object, widget_index) {
    ;

  }

  updata_ui_data() {;
  }

}