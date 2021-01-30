/* eslint-disable prettier/prettier */
const LicensePlatesCar = (type, props) => {
  let data;
  switch (type) {
    case 'Input':
      data = props.replace('-', ' ');
      data = data.slice(-5);
      break;
    case 'Output':
      data = props.replace(' ', '-');
      break;
  }
  return data;
};

export default LicensePlatesCar;
