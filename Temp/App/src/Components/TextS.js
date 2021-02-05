/* eslint-disable prettier/prettier */
import React from 'react';
import ScalableText from 'react-native-text';

const TextS = (props) => {
  return (
    <ScalableText style={props.style} numberOfLines={1}>
      {props.text}
    </ScalableText>
  );
};

export default TextS;
