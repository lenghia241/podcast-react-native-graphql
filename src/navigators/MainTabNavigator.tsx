import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListenNowScreen from '../components/listenNow/ListenNowScreen';
import LibraryScreen from '../components/library/LibraryScreen';
import SearchScreen from '../components/search/SearchScreen';
import PodcastDetailsScreen from '../components/podcastDetails/PodcastDetailsScreen';
import {theme} from '../constants/theme';
const MainTab = createBottomTabNavigator();

const ListenNowStack = createNativeStackNavigator();

const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator>
      <ListenNowStack.Screen
        options={{title: 'Listen Now'}}
        name="listenNow"
        component={ListenNowScreen}
      />
    </ListenNowStack.Navigator>
  );
};

const LibraryStack = createNativeStackNavigator();

const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        options={{title: 'Library'}}
        name="Library"
        component={LibraryScreen}
      />
    </LibraryStack.Navigator>
  );
};

const SearchStack = createNativeStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTintColor: theme.color.blueLight,
      }}>
      <SearchStack.Screen
        options={{title: 'Search'}}
        name="Search"
        component={SearchScreen}
      />
      <SearchStack.Screen
        options={{headerTitle: ''}}
        name="PodcastDetails"
        component={PodcastDetailsScreen}
      />
    </SearchStack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator screenOptions={{headerShown: false}}>
      <MainTab.Screen
        name="ListenNowTab"
        options={{title: 'Listen Now'}}
        component={ListenNowStackNavigator}
      />
      <MainTab.Screen
        name="LibraryTab"
        options={{title: 'Library'}}
        component={LibraryStackNavigator}
      />
      <MainTab.Screen
        name="SearchTab"
        options={{title: 'Search'}}
        component={SearchStackNavigator}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
