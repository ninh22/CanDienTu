/* eslint-disable prettier/prettier */
const DataNull = (props) => {
  switch (props) {
    case '':
    case null:
    case undefined:
    case 'Invalid date':
      return '(trống)';
    default:
      return props;
  }
  // if (
  //   props == '' ||
  //   props == null ||
  //   props == undefined ||
  //   props == 'Invalid date'
  // ) {
  //   return '(Trống)';
  // } else {
  //   return props;
  // }
};
export default DataNull;
