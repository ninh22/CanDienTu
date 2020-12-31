/* eslint-disable prettier/prettier */
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import React, {useState} from 'react';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Wait = ({show, setShow, title, waitDone, error}) => {
  const check = (loading, fail, success) => {
    return waitDone ? (error ? fail : success) : loading;
  };
  const theme = () => {
    return check('default', 'danger', 'success');
  };
  return (
    <SCLAlert
      theme={theme()}
      show={show}
      title={check('Vui lòng chờ...', 'Thất bại', 'Thành công')}
      subtitle={title}
      headerIconComponent={check(
        <Image
          style={{
            width: 50, //30
            height: 50, //30
          }}
          source={require('../Images/loading/Spin-1s-200px.gif')}
        />,
        <Icon name="close-circle" size={35} color="#fff" />,
        <Icon name="checkmark-circle" size={35} color="#fff" />,
      )}
      cancellable={false}>
      {waitDone ? (
        <SCLAlertButton
          theme={theme()}
          onPress={() => {
            setShow(false);
          }}>
          Xác nhận
        </SCLAlertButton>
      ) : null}
    </SCLAlert>
  );
};

export default Wait;
