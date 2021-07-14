import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import BottomSheet from 'reanimated-bottom-sheet';

const URL =
  'https://docs.mapbox.com/mapbox-gl-js/assets/ne_110m_admin_1_states_provinces_shp.geojson';

const TOKEN_MAPBOX =
  'pk.eyJ1IjoibWVvcG9wIiwiYSI6ImNrcjB2Z294dzFuc2Iyb3J6dGNtOXp3NnAifQ.ln4D-1xcBqmgqpUAP1VXgg';

MapboxGL.setAccessToken(TOKEN_MAPBOX);

const MapboxComp = () => {
  const [filter, setFilter] = useState(['in', 'diss_me', '']);
  const [loadingMap, setLoadingMap] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [coordinates, setCoordinates] = useState([0, 0]);
  const map = useRef();
  const sheetRef = useRef(null);
  const refUserLocation = useRef(null);

  useEffect(() => {
    if (refUserLocation.current) {
      setCoordinates(refUserLocation.current.state.coordinates);
    }
  }, [refUserLocation.current]);

  const renderContent = () => (
    <View style={styles.content}>
      {selectedDetail && (
        <>
          <Text>{`Name: ${selectedDetail?.name}`}</Text>
          <Text>{`Region: ${selectedDetail?.region}`}</Text>
          <Text>{`Wikipedia: ${selectedDetail?.wikipedia}`}</Text>
        </>
      )}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const onPressShapeSource = async e => {
    setCoordinates([e.coordinates.longitude, e.coordinates.latitude]);
    map.current
      .queryRenderedFeaturesAtPoint([e.point.x, e.point.y], null, ['polygon'])
      .then(async data => {
        console.log(data.features.length);
        if (data.features.length > 0) {
          sheetRef.current.snapTo(0);
          setSelectedDetail(data.features[0]?.properties);
          const filter = data.features.reduce(
            function (memo, feature) {
              memo.push(feature.properties.diss_me);
              return memo;
            },
            ['in', 'diss_me'],
          );

          setFilter(filter);
          await map.current.setSourceVisibility(true, 'highlight', 'highlight');
        }
      })
      .catch(() => setFilter(['in', 'diss_me', '']));
  };

  const onPressMapView = e => {
    sheetRef.current.snapTo(2);
    setFilter(['in', 'diss_me', '']);
  };

  return (
    <View style={styles.page} edges={[]}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[250, 100, 0]}
        renderContent={renderContent}
        renderHeader={renderHeader}
        initialSnap={2}
        callbackThreshold={1}
      />
      <MapboxGL.MapView
        style={styles.map}
        ref={map}
        onDidFinishRenderingMapFully={() => setLoadingMap(false)}
        onPress={onPressMapView}>
        <MapboxGL.UserLocation visible={true} ref={refUserLocation} />

        {loadingMap ? (
          <ActivityIndicator />
        ) : (
          <>
            <MapboxGL.Camera
              followUserMode={'normal'}
              animationMode={'flyTo'}
              animationDuration={400}
              zoomLevel={3.5}
              centerCoordinate={coordinates}
            />

            <MapboxGL.ShapeSource
              id="polygonSource"
              maxZoomLevel={12}
              url={URL}
              onPress={onPressShapeSource}>
              <MapboxGL.FillLayer id="polygon" style={layerStyles.polygon} />
              <MapboxGL.FillLayer
                id="highlight"
                style={layerStyles.highlight}
                filter={filter}
              />
            </MapboxGL.ShapeSource>
          </>
        )}
      </MapboxGL.MapView>
    </View>
  );
};

export const Mapbox = React.memo(MapboxComp);

const layerStyles = {
  highlight: {
    fillOpacity: 0.7,
    fillColor: '#0080ff',
    fillOutlineColor: '#0080ff',
  },
  polygon: {
    fillOpacity: 0.7,
    fillColor: 'rgba(200, 100, 240, 0.4)',
    fillOutlineColor: 'rgba(200, 100, 240, 1)',
  },
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  content: {
    backgroundColor: '#f7f5eee8',
    padding: 16,
    height: 450,
  },
});
