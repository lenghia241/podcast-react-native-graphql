import {useLazyQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {theme} from '../../constants/theme';
import searchQuery from '../../graphql/query/searchQuery';
import {
  SearchQuery,
  SearchQueryVariables,
  SearchQuery_search,
} from '../../types/graphql';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [term, setTerm] = React.useState<string>('');
  const [search, {data, loading, error}] = useLazyQuery<
    SearchQuery,
    SearchQueryVariables
  >(searchQuery, {variables: {term}});

  const onSearch = async () => {
    console.log('term', term);
    try {
      await search();
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Box f={1} bg="white">
      <Box h={50} w="100%" px="sm" my="sm">
        <TextInput
          style={styles.input}
          placeholder="Search Podcast"
          selectionColor={theme.color.blueLight}
          onChangeText={setTerm}
          autoCorrect={false}
          autoCapitalize="none"
          onSubmitEditing={onSearch}
          value={term}
        />
      </Box>

      {error ? (
        <Box f={1} center>
          <Text color="red">{error.message}</Text>
        </Box>
      ) : (
        <FlatList<SearchQuery_search>
          keyboardShouldPersistTaps="never"
          contentContainerStyle={styles.listContentContainer}
          data={data?.search ?? []}
          ListHeaderComponent={
            <>
              {loading && (
                <Box f={1} center>
                  <ActivityIndicator
                    size="large"
                    color={theme.color.blueLight}
                  />
                </Box>
              )}
            </>
          }
          ListEmptyComponent={
            <>
              {!loading && (
                <Box f={1} center>
                  <Text color="grey">No podcast please search...</Text>
                </Box>
              )}
            </>
          }
          renderItem={({item}: {item: SearchQuery_search}) => (
            <Box h={90} dir="row" align="center" px="sm">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PodcastDetails', {data: item})
                }
                style={styles.clickable}>
                <Box h={70} w={70} bg="blueLight" radius={10} mr={10}>
                  {item.thumbnail && (
                    <Image style={styles.img} source={{uri: item.thumbnail}} />
                  )}
                </Box>
                <Box f={1}>
                  <Text bold numberOfLines={1}>
                    {item.podcastName}
                  </Text>
                  <Text size="xs" color="grey">
                    {item.artist}
                  </Text>
                  <Text size="xs" color="blueLight">
                    {item.episodesCount} episodes
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          )}
          keyExtractor={item => String(item.feedUrl)}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    flex: 1,
    backgroundColor: theme.color.greyLightest,
    borderRadius: 10,
    paddingHorizontal: theme.space.sm,
    fontSize: theme.text.size.md,
  },
  listContentContainer: {
    // flex: 1,
    paddingBottom: 90,
  },
  img: {
    flex: 1,
    borderRadius: 10,
  },
  clickable: {
    flexDirection: 'row',
  },
});

export default SearchScreen;
