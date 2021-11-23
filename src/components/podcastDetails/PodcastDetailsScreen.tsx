import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {FlatList, Image, StyleSheet} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {SearchStackRouteParamsList} from '../../navigators/types';

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;

const PodcastDetailsScreen = () => {
  const {data} = useRoute<NavigationParams>().params ?? {};

  return (
    <Box f={1} bg="white">
      <FlatList
        ListHeaderComponent={
          <>
            <Box dir="row" px="sm" mt="sm" mb="md">
              {data.thumbnail && (
                <Box mr={10}>
                  <Image source={{uri: data.thumbnail}} style={s.thumbnail} />
                </Box>
              )}
              <Box f={1}>
                <Text size="lg" bold numberOfLines={2}>
                  {data.podcastName}
                </Text>
                <Text size="xs" color="grey">
                  {data.artist}
                </Text>
                <Text color="blueLight" size="xs">
                  Subscribe
                </Text>
              </Box>
            </Box>

            <Box px="sm" mb="md">
              <Text>Play last episode</Text>
            </Box>
            <Box px="sm" mb="md">
              <Text bold size="lg">
                Episodes
              </Text>
            </Box>
          </>
        }
        data={[{id: 1}, {id: 2}]}
        ItemSeparatorComponent={() => (
          <Box w="100%" px="sm" my="sm">
            <Box style={{height: StyleSheet.hairlineWidth}} bg="greyLighter" />
          </Box>
        )}
        renderItem={() => (
          <Box px="sm">
            <Text size="sm" color="grey">
              Friday
            </Text>
            <Text bold>#123 - titile here</Text>
            <Text size="sm" color="grey" numberOfLines={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              aut asperiores a quidem sint libero voluptatem, cum, rem ullam
              officia fugit numquam saepe omnis quod fugiat ab cupiditate
              voluptatum aliquid?
            </Text>
            <Text size="sm" color="grey">
              3 hrs. 15 mins
            </Text>
          </Box>
        )}
        keyExtractor={item => item.id}
      />
    </Box>
  );
};

const s = StyleSheet.create({
  thumbnail: {
    height: 100,
    width: 100,
  },
});

export default PodcastDetailsScreen;
