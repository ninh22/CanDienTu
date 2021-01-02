/* eslint-disable prettier/prettier */
const Regex = (input, type) => {
  const usernameCheck = /^[a-zA-Z][a-zA-Z0-9_-]{2,9}$/;
  const passwordCheck = /^[a-zA-Z0-9_-]{8,}$/;
  const nameCheck = /^[a-zA-Z0-9 ]{2,}$/;
  const mailCheck = /\S+@\S+\.\S+/;
  const phoneNumberCheck = /^\d{10,11}$/g;
  const addressCheck = /^.{3,}$/;
  const licensePlatesCheck = /^[a-zA-Z0-9_-][a-zA-Z0-9_-]{0,}$/;
  const matchCheck = (props) => {
    return input.match(props);
  };
  switch (type) {
    case 'username':
      // console.log(input.match(usernameCheck));
      if (input.match(usernameCheck) == null) {
        return false;
      } else {
        return true;
      }
    case 'password':
      // console.log(input.match(usernameCheck));
      if (matchCheck(passwordCheck) == null) {
        return false;
      } else {
        return true;
      }
    case 'name':
      // console.log(matchCheck(nameCheck));
      if (matchCheck(nameCheck) == null) {
        return false;
      } else {
        return true;
      }
    case 'phonenumber':
      // console.log(matchCheck(nameCheck));
      if (matchCheck(phoneNumberCheck) == null) {
        return false;
      } else {
        return true;
      }
    case 'address':
      // console.log(matchCheck(nameCheck));
      if (matchCheck(addressCheck) == null) {
        return false;
      } else {
        return true;
      }
    case 'licensePlates':
      // console.log(matchCheck(nameCheck));
      if (matchCheck(licensePlatesCheck) == null) {
        return false;
      } else {
        return true;
      }
  }
};

export default Regex;
