/* eslint-disable prettier/prettier */
import moment from 'moment';

const GetDate = (props) => {
  return moment().format(props);
};

export default GetDate;
