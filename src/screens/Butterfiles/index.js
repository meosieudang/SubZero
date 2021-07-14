import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, FlatList, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useScreenDimensions} from '../../hooks/useScreenDimensions';

const DATA = [
  {
    url: 'https://vmpic2.science4you.org/images/preview/nabeat/S763257_535x535.jpg',
    name: 'Danaus chrysippus',
  },
  {
    url: 'https://vmpic2.science4you.org/images/preview/nabeat/S763259_535x535.jpg',
    name: 'Junonia almana',
  },
  {
    url: 'https://vmpic2.science4you.org/images/preview/nabeat/S763261_535x535.jpg',
    name: 'Junonia atlites',
  },
  {
    url: 'https://vmpic2.science4you.org/images/preview/nabeat/S763262_535x535.jpg',
    name: 'Junonia lemonias',
  },
  {
    url: 'https://vmpic2.science4you.org/images/preview/nabeat/S763263_535x535.jpg',
    name: 'Cyrestis thyodamas',
  },
  {
    url: 'https://vmpic2.science4you.org/images/preview/nabeat/S763208_535x535.jpg',
    name: 'Kaniska canace',
  },
  {
    url: 'https://vmpic2.science4you.org/images/preview/nabeat/S763264_535x535.jpg',
    name: 'Catopsilia pomona',
  },
  {
    url: 'https://vmpic2.science4you.org/images/preview/nabeat/S763265_535x535.jpg',
    name: 'Doleschallia bisaltide',
  },
  {
    url: 'https://vmpic2.science4you.org/images/preview/nabeat/S763258_535x535.jpg',
    name: 'Amathusia phidippus',
  },
  {
    url: 'https://vmpic2.science4you.org/images/preview/nabeat/S763252_535x535.jpg',
    name: 'Graphium agamemnon',
  },
  {
    url: 'https://vmpic2.science4you.org/images/preview/nabeat/S763253_535x535.jpg',
    name: 'Graphium sarpedon',
  },
  {
    url: 'https://vmpic2.science4you.org/images/preview/nabeat/S763249_535x535.jpg',
    name: 'Papilio demolion',
  },
];

export const Butterflies = () => {
  const {isLandscape, width} = useScreenDimensions();
  const insets = useSafeAreaInsets();
  const [state, setState] = useState({visible: false, detail: null});

  const pressItem = item => setState({visible: true, detail: item.name});

  const renderItem = ({item}) => {
    const widthItem = isLandscape
      ? width / 5 - 8 - insets.bottom
      : width / 3 - 8;

    return (
      <Pressable style={{margin: 4}} onPress={() => pressItem(item)}>
        <FastImage
          source={{uri: item.url}}
          style={{
            width: widthItem,
            height: widthItem,
            backgroundColor: 'green',
          }}
          resizeMode={'cover'}
        />
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <FlatList
        key={isLandscape ? '1' : '2'}
        numColumns={isLandscape ? 5 : 3}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(it, i) => `${i}`}
      />
      <ModalDetail
        isVisible={state.visible}
        name={state.detail}
        onClose={() => setState({visible: false, detail: null})}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 10,
    textAlign: 'center',
  },
  modal: {flex: 1, margin: 0, justifyContent: 'flex-end'},
  body: {backgroundColor: 'white', flex: 0.5},
  nameModal: {
    margin: 16,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  nameModalWrap: {
    margin: 16,
    textAlign: 'left',
    fontSize: 16,
  },
});

const ModalDetail = ({isVisible = false, name = '', onClose}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <SafeAreaView style={styles.body} edges={['left', 'right']}>
        <Text style={styles.nameModalWrap}>
          {`Species:`} <Text style={styles.nameModal}>{name}</Text>
        </Text>
      </SafeAreaView>
    </Modal>
  );
};
