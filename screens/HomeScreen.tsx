import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Box,
  Button,
  VStack,
  Text,
  ScrollView,
  Avatar,
  HStack,
} from 'native-base';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PostCard } from '../components/posts/PostCard';
import { Platform } from 'react-native';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [myDailypost, setMyDailyPost] = useState<any>();
  const [followersPosts, setFollowersPosts] = useState<any[]>([]);

  const getMyDailyPost = async () => {
    const response = await axios.get('/me/posts/daily');
    console.log(await response.data);
    setMyDailyPost(await response.data);
  };

  const getFollowersPosts = async () => {
    const response = await axios.get('/posts/daily');
    setFollowersPosts(await response.data);
  };

  useEffect(() => {
    getMyDailyPost();
    getFollowersPosts();
  }, []);

  return (
    <Box
      paddingTop={Platform.OS === 'android' ? insets.top : 0}
      paddingBottom={Platform.OS === 'android' ? insets.bottom : 0}
      paddingLeft={Platform.OS === 'android' ? insets.left : 0}
      paddingRight={Platform.OS === 'android' ? insets.right : 0}
    >
      <ScrollView>
        <Box mx={5} mt={10}>
          {/* My posts */}
          <Text
            mb={5}
            textAlign={'center'}
            fontSize={'2xl'}
            fontWeight={'bold'}
          >
            My post
          </Text>

          <VStack>
            {myDailypost ? (
              <PostCard post={myDailypost} refreshPosts={getMyDailyPost} />
            ) : (
              <Text>No daily post yet</Text>
            )}
          </VStack>

          {/* Followers posts */}
          <Text
            my={5}
            textAlign={'center'}
            fontSize={'2xl'}
            fontWeight={'bold'}
          >
            Followers post
          </Text>

          <VStack>
            {followersPosts.length === 0 && (
              <Text textAlign={'center'}>No daily posts yet</Text>
            )}

            {followersPosts.map((post, idx) => (
              <Box key={'followers-post-' + idx}>
                <HStack alignItems={'center'} my={2}>
                  <Avatar
                    w={30}
                    h={30}
                    source={{
                      uri: post.creator.image
                        ? 'http://192.168.1.14:3000/api' + post.creator.image
                        : 'https://picsum.photos/200',
                    }}
                  />
                  <Text ml={3} fontSize={'lg'}>
                    {post.creator.name}
                  </Text>
                </HStack>
                <PostCard post={post} refreshPosts={getFollowersPosts} />
              </Box>
            ))}
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
