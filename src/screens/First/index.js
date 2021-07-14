import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const First = () => {
  const navi = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Button
        title={'Butterflies'}
        onPress={() => navi.navigate('ButterfliesScreen')}
      />
      <Button title={'Mapbox'} onPress={() => navi.navigate('MapboxScreen')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
