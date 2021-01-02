/* eslint-disable prettier/prettier */
const Money = (props) => {
  return props.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export default Money;
