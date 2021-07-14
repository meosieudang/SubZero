import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootContainer from './src/navigations';

const App = () => {
  return (
    <SafeAreaProvider>
      <RootContainer />
    </SafeAreaProvider>
  );
};

export default App;
