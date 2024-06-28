import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = ({header}) => {
  return (
    <View style={styles.headerView}>
      <Text style={styles.headerText}>{header}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: '10%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    letterSpacing: 2,
  },
});
