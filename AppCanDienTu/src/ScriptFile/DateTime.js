/* eslint-disable prettier/prettier */
import moment from 'moment';

const DateTime = (props) => {
  return moment(props).format('DD/MM/YYYY HH:mm');
};

export default DateTime;
