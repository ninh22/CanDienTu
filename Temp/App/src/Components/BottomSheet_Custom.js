/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {ListItem, Divider, BottomSheet} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';
import ScalableText from 'react-native-text';
const Item = (items) => {
  return (
    <TouchableOpacity
      onPress={items.onPress}
      style={{
        flexDirection: 'row',
        height: items.height,
      }}>
      <View
        style={[
          styles.view_item,
          {
            width: '10%',
          },
        ]}>
        <Icon name={items.nameIcon} size={25} color="#309045" />
      </View>
      <View
        style={[
          styles.view_item,
          {
            width: '90%',
          },
        ]}>
        <ScalableText style={styles.text} numberOfLines={2}>
          {items.text}
        </ScalableText>
      </View>
    </TouchableOpacity>
  );
};
const BottomSheetCustom = ({visible, setVisible, listItem, title}) => {
  return (
    <BottomSheet isVisible={visible}>
      <View style={styles.parent}>
        <View style={styles.parent_title}>
          <ScalableText
            style={[styles.text, {fontWeight: 'bold', color: 'white'}]}>
            {title}
          </ScalableText>
        </View>
        <View style={{padding: '3%'}}>
          {listItem.map((l, i) => (
            <ListItem key={i} containerStyle={styles.parent_item}>
              <Item
                text={l.title}
                nameIcon={l.icon}
                onPress={l.onPress}
                height="100%"
              />
            </ListItem>
          ))}
        </View>
        <Divider style={{backgroundColor: 'black'}} />
        <View style={{padding: '3%'}}>
          <Item
            text="Thoát"
            nameIcon="close"
            onPress={() => setVisible(false)}
            height={Response_Size('hg', 0, 5)}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  parent_title: {
    height: Response_Size('hg', 0, 8),
    backgroundColor: '#309045',
    padding: '3%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
  },
  parent_item: {
    width: '100%',
    height: Response_Size('hg', 0, 7),
    padding: 0,
  },
  view_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default BottomSheetCustom;
