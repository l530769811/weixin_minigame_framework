export default function log(log, flag = 0) {
  switch (flag) {
    case 0: //log
      console.log('{ ' + log + ' } = this is log');
      break;
    case 1: //debug log
      console.debug('{ ' + log + ' } = this is debug log');
      break;
    case 2: //warn log
      console.warn('{ ' + log + ' } = this is warn log ');
      break;
    default:
      ;
  }
}