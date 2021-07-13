import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  PixelRatio,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const HEIGHT_SCREEN = Dimensions.get('window').height;
export const WIDTH_SCREEN = Dimensions.get('window').width;
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const widthBaseScale = SCREEN_WIDTH / 414;
const heightBaseScale = SCREEN_HEIGHT / 896;
function normalize(size, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
//for width  pixel
const widthPixel = size => {
  return normalize(size, 'width');
};
//for height  pixel
const heightPixel = size => {
  return normalize(size, 'height');
};
//for font  pixel
const fontPixel = size => {
  return heightPixel(size);
};
//for Margin and Padding vertical pixel
const pixelSizeVertical = size => {
  return heightPixel(size);
};
//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = size => {
  return widthPixel(size);
};
const useScreenDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  console.log(screenData);

  useEffect(() => {
    const onChange = result => {
      setScreenData(result.screen);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  });

  return {
    ...screenData,
    isLandscape: screenData.width > screenData.height,
  };
};

const T = [
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
  console.log(isLandscape, 'isLandscape');
  const insets = useSafeAreaInsets();
  console.log(insets);
  const renderItem = ({item, index}) => {
    return (
      <View style={{margin: 4}}>
        <FastImage
          source={{uri: item.url}}
          style={{
            width: isLandscape ? width / 5 - 8 - insets.bottom : width / 3 - 8,
            height: isLandscape ? width / 5 - 8 - insets.bottom : width / 3 - 8,
            backgroundColor: 'green',
          }}
          resizeMode={'cover'}
        />
        <Text style={{fontSize: 10, textAlign: 'center'}} numberOfLines={2}>
          {item.name}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        key={isLandscape ? '1' : '2'}
        numColumns={isLandscape ? 5 : 3}
        data={T}
        renderItem={renderItem}
        keyExtractor={(it, i) => `${i}`}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
