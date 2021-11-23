import {UtilityThemeProvider} from 'react-native-design-utility';
import React from 'react';
import {theme} from './src/constants/theme';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigators/MainStackNavigator';

import {ApolloProvider} from '@apollo/client';
import {client} from './src/graphql/client';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UtilityThemeProvider theme={theme}>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </UtilityThemeProvider>
    </ApolloProvider>
  );
};

export default App;
