export default function log(log, flag = 2) {
  switch (flag) {
    case 0: //log
      console.log('this is log = { ' + log + ' }');
      break;
    case 1: //debug log
      console.log('this is debug log = { ' + log + ' }');
      break;
    case 2: //warn log
      console.log('this is warn log = { ' + log + ' }');
      break;
    default:
      ;
  }
}